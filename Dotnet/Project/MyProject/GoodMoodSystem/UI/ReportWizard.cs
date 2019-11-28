using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using Com.Colin.Forms.Logic;
using System.Collections;
using System.Threading;
using System.IO;

namespace Com.Colin.Forms.UI
{
    public partial class ReportWizard : Form,IProcessProgressObserver
    {

        /// <summary>
        /// 暂存数据文件名称（包含路径）
       /// </summary>
        private string fileName = "";

        private string fileEcgName = "";

        /// <summary>
        /// 接下来三个常量为当前步骤的标志
        /// </summary>
        private const int READING_DATA = 0;

        private const int ARRHYTHMIA = 1;

        private const int ST = 2;

        private const int SAVEDATA = 3;

        /// <summary>
        /// 当前正在进行的步骤，包括读取数据，心律失常检测以及ST段分析
        /// </summary>
        private int currentProcess = READING_DATA;

        /// <summary>
        /// 在读取数据阶段表示已经读取的ECG信号的点数
        /// 在心律失常和ST段分析阶段代表已经分析的QRS个数
        /// </summary>
        private int finishedPoint = 0;

        #region 在dataReadPage用到的变量


        /// <summary>
        /// 标识数据是否已经读取完毕
        /// </summary>
        private bool dataReadFinished = false;

        /// <summary>
        /// 开始绘制的RR间期的起点
        /// </summary>
        private int rrStart = 0;

        /// <summary>
        /// 当前rrStart代表的R波在原始信号中的位置
        /// </summary>
        private int rrOffset = 0;

        /// <summary>
        /// 记录RR间期
        /// </summary>
        private ArrayList rrIntervals = new ArrayList();
        public ArrayList RRIntervals
        {
            get { return rrIntervals; }
            set { rrIntervals = value; }
        }

        /// <summary>
        /// QRS检测线程
        /// </summary>
        private Thread readDataThread;


        
        #endregion

       
        /// <summary>
        /// 用来从数据文件读取数据并做预处理（R波检测）
        /// </summary>
        private RawDataReader rawDataReader;


        /// <summary>
        /// 新建记录是否回滚  added by yulan z 2011-5-31
        /// </summary>
        private bool IsRoolBack = false;
        private bool Isfinsh = false;

        /// <summary>
        /// 设置R波检测精度 ，默认为2 ，1-高，3-低
        /// </summary>
        private int rDetectResolution = 2;

        private const int Browse_DATA = 4;
        public ReportWizard()
        {
            InitializeComponent();
        }

        private void buttonBrowseFile_Click(object sender, EventArgs e)
        {
            OpenFileDialog ofd = new OpenFileDialog();
            ofd.Filter = "*.BIN|*.bin|所有文件(*.*)|*.*"; //添加扩展名 added by yulan zhang 2011-5-26

            if (ofd.ShowDialog(this) == DialogResult.OK)
            {
                textBoxDataFile.Text = ofd.FileName;
            }
        }

        private void wizardPage1_CloseFromNext(object sender, Gui.Wizard.PageEventArgs e)
        {
            fileName = textBoxDataFile.Text;

            if (fileName.Length == 0)
            {
                MessageBox.Show("请重新选择文件");
                e.Page = wizardMain.Pages[e.PageIndex - 1];
                return;
            }

            if (!File.Exists(fileName))
            {
                MessageBox.Show("选择的文件不存在，请重新选择");
                textBoxDataFile.Text = "";
                e.Page = wizardMain.Pages[e.PageIndex - 1];
                return;
            }


            //清空预览数据added by yulan zhang 2011-9-16
            this.rrIntervals.Clear();

            wizardMain.NextEnabled = false;
            wizardMain.BackEnabled = false;
        }

        /// <summary>
        /// 进入该页时调用该函数，完成数据读取、创建文件、数据处理以及结果保存等操作
        /// </summary>
        private void processPage_ShowFromNext(object sender, EventArgs e)
        {
            //设置当前的状态为读取数据
            currentProcess = READING_DATA;

            
            //读入ECG
            labelProcessHint.Text = "正在读入信号";

            wizardMain.BackEnabled = false;
            wizardMain.NextEnabled = false;

            rawDataReader = new RawDataReader(fileName, this);
            
            readDataThread = new Thread(new ThreadStart(rawDataReader.GetSignal));
            readDataThread.Start();
        }

        /// <summary>
        /// 用于非主线程更新显示的Delegate
        /// </summary>
        private delegate void ShowDelegate();

        /// <summary>
        /// 显示进度条的进度，并在处理完成后在newCheckReport中保存数据
        /// </summary>
        private void ShowProgress()
        {
            if (finishedPoint == RawDataReader.FINISHED)
            {
                //保存数据
                //  labelProcessHint.Text = "信号读取完毕，正在保存...";
                readDataThread.Abort();


                rrIntervals = rawDataReader.RRIntervals;
                

                labelProcessHint.Visible = false;
                dataReadFinished = true; //设置完成标识

                //检测信号是否是空信号，若为空信号，不进行后续的检测。
                if (rrIntervals != null &&
                    rrIntervals.Count == 0)
                {
                    MessageBox.Show("没有采集到有效信号，无法进行后续的处理。");
                    wizardMain.NextEnabled = false;
                    return;
                }

                labelProcessHint.Text = labelProcessHint.Text + " 已完成。";
                wizardMain.NextEnabled = true;
                return;
            }

            int seconds = finishedPoint / 300;
            int hours = seconds / 3600;
            int minutes = (seconds % 3600) / 60;
            seconds = seconds % 60;
            labelProcessHint.Text = "已读入 " + hours
                + " 小时 " + minutes + " 分钟 " + seconds + " 秒";
        }

        /// <summary>
        /// 信号处理完毕之后显示完成，点击后关闭向导
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void processPage_CloseFromNext(object sender, Gui.Wizard.PageEventArgs e)
        {
            if (readDataThread != null)
            {
                readDataThread.Abort();
            }

        }



        #region IProcessProgressObserver 成员

        /// <summary>
        /// 更新读取信号的长度
        /// </summary>
        /// <param name="point">已经读取的点数</param>
        public void UpdateProgress(int point)
        {
            if  (currentProcess == READING_DATA) //若当前正在读取数据和做QRS检测
             {
                finishedPoint = point;
                this.BeginInvoke(new ShowDelegate(ShowProgress));
            }
        }

        #endregion

    }
}
