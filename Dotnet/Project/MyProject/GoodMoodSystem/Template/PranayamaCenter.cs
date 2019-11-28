using Com.Colin.Forms.Common;
using Com.Colin.Forms.Properties;
using System;
using System.Collections;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Windows.Forms;

namespace Com.Colin.Forms.Template
{
    public partial class PranayamaCenter : UserControl
    {
        /// <summary>
        /// 代表"调息频率"
        /// </summary>
        Hashtable frequencyMap = new Hashtable();

        public PranayamaCenter()
        {
            InitializeComponent();
            frequencyMap = new Hashtable()
            {
                { button2, 1 }, { button3, 0 }, { myButton6, 0 }, { myButton7, 0 }, { myButton8, 0 }
            };
            CommonFuc.displayTabByButton(frequencyMap, null, null, new Hashtable() {
                { "BackgroundImage", Resources._0130切片_36 },
                { "ForeColor", Color.White }
            });
            button2.Width = button3.Width = myButton6.Width = myButton7.Width = myButton8.Width = (int)(panel2.Width * 0.2);
            myButton8.Location = new Point((int)(panel2.Width * 0.8), myButton8.Location.Y);
            myButton7.Location = new Point((int)(panel2.Width * 0.6), myButton7.Location.Y);
            myButton6.Location = new Point((int)(panel2.Width * 0.4), myButton6.Location.Y);
            button3.Location = new Point((int)(panel2.Width * 0.2), button3.Location.Y);
            button2.Location = new Point(0, button2.Location.Y);
        }

        private void panel10_Paint(object sender, PaintEventArgs e)
        {
            GraphicsPath path = new GraphicsPath();
            double baseX = panel10.Width * 0.05;
            double baseY = panel10.Height * 0.05;
            double x1 = baseX;
            double y1 = baseY * 2;
            for (double x = 1; x <= 2520; x++)
            {
                double y = baseY * 10 - Math.Sin((x + 90) / 180 * Math.PI) * (baseY * 8);
                e.Graphics.DrawLine(Pens.Blue, (float)x1, (float)y1, (float)(x / (2520 / (baseX * 18)) + baseX), (float)y);
                if(x==2520)
                {
                    Image image = Resources._0130切片_25;
                    Rectangle rectangle = new Rectangle((int)(x / (2520 / (baseX * 18)) + baseX - 10), (int)(y - 10), 20, 20);
                    e.Graphics.DrawImage(image, rectangle);
                }
                x1 = x / (2520 / (baseX * 18)) + baseX;
                y1 = y;
            }
        }

        private void panel8_Paint(object sender, PaintEventArgs e)
        {
            CommonFuc.drawHRV(panel8, e.Graphics);
        }

        private void panel11_Paint(object sender, PaintEventArgs e)
        {
            // 画图
            Graphics g = e.Graphics;
            int baseHeight = panel11.Height;
            int baseWidth = panel11.Width;
            int top = (int)(baseHeight * 0.05);
            int left = (int)(baseWidth * 0.1);
            int bmpHeight = (int)(baseHeight * 0.8);
            int bmpWidth = (int)(baseWidth * 0.8);
            Pen grayPen = new Pen(Color.LightGray, 1);
            g.DrawRectangle(grayPen, left, top, bmpWidth, bmpHeight);
            Font font = new Font("微软雅黑", 10);
            StringFormat sf = StringFormat.GenericDefault;
            sf.Alignment = StringAlignment.Far;
            // 画Y轴
            for (int j = 0; j < 4; j++)
            {
                g.DrawLine(grayPen, left, top + (float)((1 - j * 0.28) * bmpHeight), left + bmpWidth, top + (float)((1 - j * 0.28) * bmpHeight));
                g.DrawString(200 * j + "", font, Brushes.Black, left - 6, top + (float)((1 - j * 0.28) * bmpHeight) - 5, sf);
            }
            // 画X轴
            for (int i = 0; i < 6; i++)
            {
                g.DrawLine(grayPen, left + (float)(i * 0.18 * bmpWidth), top + bmpHeight - 15, left + (float)(i * 0.18 * bmpWidth), top + bmpHeight);
                g.DrawString(0.1 * i + "", font, Brushes.Black, left + (float)(i * 0.18 * bmpWidth), top + bmpHeight + 2);
            }
        }

        private void button2_Click(object sender, System.EventArgs e)
        {
            CommonFuc.ButtonClickHandler((Button)sender, frequencyMap, null, 2);
        }

        private void button3_Click(object sender, System.EventArgs e)
        {
            CommonFuc.ButtonClickHandler((Button)sender, frequencyMap, null, 2);
        }

        private void myButton6_Click(object sender, System.EventArgs e)
        {
            CommonFuc.ButtonClickHandler((Button)sender, frequencyMap, null, 2);
        }

        private void myButton7_Click(object sender, System.EventArgs e)
        {
            CommonFuc.ButtonClickHandler((Button)sender, frequencyMap, null, 2);
        }

        private void myButton8_Click(object sender, System.EventArgs e)
        {
            CommonFuc.ButtonClickHandler((Button)sender, frequencyMap, null, 2);
        }
    }
}
