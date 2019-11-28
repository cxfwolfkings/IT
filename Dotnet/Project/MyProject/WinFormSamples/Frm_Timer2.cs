using System;
using System.Threading;
using System.Windows.Forms;

namespace Com.Colin.Win
{
    /// <summary>
    /// 异步编程示例
    /// </summary>
    public partial class Frm_Timer2 : Form
    {
        public Frm_Timer2()
        {
            InitializeComponent();
            timer1.Stop();
        }

        private void doSomething()
        {
            Func<int> func = () =>
            {
                int i = 0;
                while (true)
                {
                    if (i == 6)
                        break;
                    i++;
                    Thread.Sleep(1000);
                }
                return i;
            };

            Action<int> action = item =>
            {
                label2.Text = label1.Text;
            };

            func.BeginInvoke(ar =>
            {
                int item = func.EndInvoke(ar);
                this.Invoke(action, item);
            }, null);
        }

        private void button1_Click(object sender, EventArgs e)
        {
            doSomething();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            int i = 0;
            for (; i < 10; i++)
            {
                Thread.Sleep(1000);
            }
            label1.Text = i.ToString();
        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            string currentTimes = label1.Text;
            string prevTimes = label2.Text;
            if (currentTimes.Equals(prevTimes))
            {
                label1.Text = Convert.ToInt32(currentTimes) + 1 + "";
                doSomething();
            }
        }

        private void button3_Click(object sender, EventArgs e)
        {
            if (textBox1.Text == "哈哈")
            {
                textBox1.Text = "呵呵";
            }
            else
            {
                textBox1.Text = "哈哈";
            }
        }

        private void button4_Click(object sender, EventArgs e)
        {
            timer1.Start();
        }

        private void button5_Click(object sender, EventArgs e)
        {
            timer1.Stop();
        }
    }
}
