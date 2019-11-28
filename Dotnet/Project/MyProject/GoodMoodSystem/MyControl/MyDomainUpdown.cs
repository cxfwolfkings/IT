using System;
using System.ComponentModel;
using System.Windows.Forms;

namespace Com.Colin.Forms.MyControl
{
    public partial class MyDomainUpdown : UserControl
    {
        private int current;
        private string[] items;

        public MyDomainUpdown()
        {
            InitializeComponent();
            current = 0;
            textBox1.Text = "";
        }

        [Category("当前索引")]
        public int Current
        {
            get
            {
                return current;
            }
            set
            {
                if (items != null && value < items.Length && value > 0)
                    current = value;
                else
                    current = 0;
            }
        }

        [Category("数据属性")]
        public string[] Items
        {
            set
            {
                items = value;
                if (items != null && items.Length > 0)
                {
                    textBox1.Text = items[current];
                }
            }
            get
            {
                return items;
            }
        }

        /// <summary>
        /// 按钮点击事件
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void button1_MouseDown(object sender, MouseEventArgs e)
        {
            Button btn = (Button)sender;
            if (e.Y > btn.Location.Y + btn.Height / 2) // 点击下箭头
            {
                if (items != null && current < items.Length - 1)
                {
                    current += 1;
                    textBox1.Text = items[current] as string;
                }
            }
            else // 点击上箭头
            {
                if (items != null && current > 0)
                {
                    current -= 1;
                    textBox1.Text = items[current] as string;
                }
            }
        }

        protected override void OnResize(EventArgs e)
        {
            return;
        }
    }
}
