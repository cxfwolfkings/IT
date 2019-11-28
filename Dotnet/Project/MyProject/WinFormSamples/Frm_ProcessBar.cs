using System;
using System.Threading;
using System.Windows.Forms;

namespace Com.Colin.Win
{
    public partial class Frm_ProcessBar : Form
    {
        public Frm_ProcessBar()
        {
            InitializeComponent();
        }

        /// <summary>
        /// 鼠标单击事件，显示进度
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void button1_Click(object sender, EventArgs e)
        {
            // 设置进度条控件属性
            toolStripProgressBar1.Minimum = 0; // 进度条控件最小值
            toolStripProgressBar1.Maximum = 100; // 进度条控件最大值

            for (int i = 0; i < 100; i++)
            {
                toolStripProgressBar1.Value++; // 每次进度条值加1
                Application.DoEvents(); // 当前程序处理消息队列内容
                Thread.Sleep(100);
            }
        }
 
    }
}