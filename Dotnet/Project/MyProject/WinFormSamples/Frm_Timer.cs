using System.Windows.Forms;
using System.Threading;
using System;
using Timer = System.Threading.Timer;

namespace Com.Colin.Win
{
    public partial class Frm_Timer : Form
    {
        // 声明委托
        public delegate void UpdateTextDelegate(string msg, string option);
        // 定义委托变量
        public UpdateTextDelegate UpdateText;
        // 定时器变量
        Timer timer;

        public Frm_Timer()
        {
            InitializeComponent();
        }

        private void 定时器_Load(object sender, EventArgs e)
        {
            // 实例化委托
            UpdateText = new UpdateTextDelegate(UpdateTextFunction);
        }

        private void UpdateTextFunction(string msg, string option)
        {
            if (option == "content")
            {
                richTextBox1.AppendText(string.Format("输出信息为：{0}\r", msg));
            }
            else if (option == "start")
            {
                richTextBox1.AppendText(string.Format("{0}\r", msg));
            }
            else if (option == "end")
            {
                richTextBox1.AppendText(string.Format("{0}\r\n\r\n", msg));
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
            // 检查输出内容是否为空
            if (textBox1.Text.Trim() == "")
            {
                MessageBox.Show("对不起，请填写输出信息内容！");
                return;
            }
            int d;
            if (!int.TryParse(textBox2.Text.Trim(), out d))
            {
                MessageBox.Show("对不起，请填写间隔时间！");
                return;
            }
            // 线程中的定时器
            timer = new Timer(new TimerCallback(timer_Tick), null, d * 1000, d * 1000);
            timer.Change(d * 1000, d * 1000);
        }

        /// <summary>
        /// 定时器执行方法
        /// </summary>
        /// <param name="test"></param>
        public void timer_Tick(object test)
        {
            // 线程声明
            Thread thread = new Thread(new ThreadStart(delegate
                {
                    StartWriteMsg();
                }));
            // 线程开始
            thread.Start();
        }

        /// <summary>
        /// 写入信息
        /// </summary>
        public void StartWriteMsg()
        { 
            // 开始
            BeginInvoke(UpdateText, "===========开始===========", "start");
            // 正文
            BeginInvoke(UpdateText, textBox1.Text, "content");
            // 结束
            BeginInvoke(UpdateText, "===========结束===========", "end");
        }

        /// <summary>
        /// 时间间隔，只能输入数字
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void textBox2_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (!char.IsNumber(e.KeyChar) && !char.IsPunctuation(e.KeyChar) && !char.IsControl(e.KeyChar))
            {
                e.Handled = true; // 消除不合适字符
            }
            else if (char.IsPunctuation(e.KeyChar))
            {
                if (e.KeyChar != '.' || textBox2.Text.Length == 0) // 小数点
                {
                    e.Handled = true;
                }
                if (textBox2.Text.LastIndexOf(".") != -1)
                {
                    e.Handled = true;
                }
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            timer.Dispose();
        }
    }
}
