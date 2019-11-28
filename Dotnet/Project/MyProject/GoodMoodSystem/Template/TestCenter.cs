using Com.Colin.Forms.Common;
using Com.Colin.Forms.Properties;
using System.Drawing;
using System.Windows.Forms;

namespace Com.Colin.Forms.Template
{
    public partial class TestCenter : UserControl
    {
        public TestCenter()
        {
            InitializeComponent();
        }

        private void panel6_Paint(object sender, PaintEventArgs e)
        {
           CommonFuc.drawHRV(panel6, e.Graphics);
        }

        private void panel7_Paint(object sender, PaintEventArgs e)
        {
            // 画图
            int baseHeight = panel6.Height;
            int baseWidth = panel6.Width;
            int top = (int)(baseHeight * 0.1);
            int left = (int)(baseWidth * 0.1);
            Font font = new Font("微软雅黑", 12);
            Pen pen = Pens.Black;
            // 即时心率
            e.Graphics.DrawString("即时心率", font, Brushes.Black, left - 25, top);
            SizeF sizeF = e.Graphics.MeasureString("即时心率", font);
            font = new Font("微软雅黑", 24, FontStyle.Bold);
            SizeF sizeF2 = e.Graphics.MeasureString("80", font);
            e.Graphics.DrawString("80", font, Brushes.Black, left - 25 - (sizeF2.Width - sizeF.Width) / 2, (float)(baseHeight * 0.20));
            // 即时心能量
            font = new Font("微软雅黑", 12);
            sizeF2 = e.Graphics.MeasureString("即时心能量", font);
            e.Graphics.DrawString("即时心能量", font, Brushes.Black, left - 25 - (sizeF2.Width - sizeF.Width) / 2, (float)(baseHeight * 0.5));
            e.Graphics.DrawImage(Resources._0130切片_09, new Rectangle((int)(left - 80 + sizeF.Width / 2), (int)(baseHeight * 0.65), 110, 60));
            // 心能量比例
            e.Graphics.DrawString("心能量比例", font, Brushes.Black, (float)(baseWidth * 0.4), top);
            sizeF = e.Graphics.MeasureString("心能量比例", font);
            //e.Graphics.DrawEllipse(pen, (float)(baseWidth * 0.4) - (top * 7 - sizeF.Width) / 2, (float)(baseHeight * 0.20), top * 7, top * 7);
            //e.Graphics.DrawEllipse(pen, (float)(baseWidth * 0.4 - top + sizeF.Width / 2), (float)(baseHeight * 0.20 + top * 2.5), top * 2, top * 2);
            e.Graphics.DrawEllipse(pen, (float)(baseWidth * 0.4 - top * 1.5 + sizeF.Width / 2), (float)(baseHeight * 0.20 + top * 2), (top * 3), (top * 3));
            //e.Graphics.DrawPie(pen, (float)(baseWidth * 0.4) - (top * 7 - sizeF.Width) / 2, (float)(baseHeight * 0.20), top * 7, top * 7, -260, 180);
            //e.Graphics.DrawPie(pen, (float)(baseWidth * 0.4) - (top * 7 - sizeF.Width) / 2, (float)(baseHeight * 0.20), top * 7, top * 7, -80, 80);
            //e.Graphics.DrawPie(pen, (float)(baseWidth * 0.4) - (top * 7 - sizeF.Width) / 2, (float)(baseHeight * 0.20), top * 7, top * 7, 0, 100);
            TextureBrush brush = new TextureBrush(Resources._0130切片_61);
            e.Graphics.FillPie(brush, (float)(baseWidth * 0.4) - (top * 7 - sizeF.Width) / 2, (float)(baseHeight * 0.20), top * 7, top * 7, -260, 180);
            brush = new TextureBrush(Resources._0130切片_61_2);
            e.Graphics.FillPie(brush, (float)(baseWidth * 0.4 - top + sizeF.Width / 2-10), (float)(baseHeight * 0.20 + top * 2.5 -10), top * 2+20, top * 2+20, -260, 180);
            brush = new TextureBrush(Resources._0130切片_67);
            e.Graphics.FillPie(brush, (float)(baseWidth * 0.4) - (top * 7 - sizeF.Width) / 2, (float)(baseHeight * 0.20), top * 7, top * 7, -80, 80);
            brush = new TextureBrush(Resources._0130切片_67_2);
            e.Graphics.FillPie(brush, (float)(baseWidth * 0.4 - top + sizeF.Width / 2 - 10), (float)(baseHeight * 0.20 + top * 2.5 - 10), top * 2 + 20, top * 2 + 20, -80, 80);
            brush = new TextureBrush(Resources._0130切片_72);
            e.Graphics.FillPie(brush, (float)(baseWidth * 0.4) - (top * 7 - sizeF.Width) / 2, (float)(baseHeight * 0.20), top * 7, top * 7, 0, 100);
            brush = new TextureBrush(Resources._0130切片_72_2);
            e.Graphics.FillPie(brush, (float)(baseWidth * 0.4 - top + sizeF.Width / 2 - 10), (float)(baseHeight * 0.20 + top * 2.5 - 10), top * 2 + 20, top * 2 + 20, 0, 100);
            e.Graphics.FillEllipse(Brushes.White, (float)(baseWidth * 0.4 - top + sizeF.Width / 2), (float)(baseHeight * 0.20 + top * 2.5), top * 2, top * 2);
            // 心能量指数
            e.Graphics.DrawString("心能量指数", font, Brushes.Black, (float)(baseWidth * 0.8), top);
            font = new Font("微软雅黑", 10);
            pen = new Pen(Color.LightGray, 1);
            e.Graphics.DrawRectangle(pen, (float)(baseWidth * 0.725 + sizeF.Width / 2), (float)(baseHeight * 0.20), (float)(baseWidth * 0.15), (float)(baseHeight * 0.7));
            StringFormat sf = StringFormat.GenericDefault;
            sf.Alignment = StringAlignment.Far;
            // 画Y轴
            for (int j = 0; j < 6; j++)
            {
                e.Graphics.DrawLine(pen, (float)(baseWidth * 0.725 + sizeF.Width / 2 - 5), (float)(baseHeight * 0.9 - j * 0.19 * baseHeight * 0.7), (float)(baseWidth * 0.875 + sizeF.Width / 2), (float)(baseHeight * 0.9 - j * 0.19 * baseHeight * 0.7));
                e.Graphics.DrawString(20 * j + "", font, Brushes.Black, (float)(baseWidth * 0.725 + sizeF.Width / 2 - 10), (float)(baseHeight * 0.9 - j * 0.19 * baseHeight * 0.7) - 5, sf);
            }
            // 高能量、中能量、低能量
            e.Graphics.DrawImage(Resources._0130切片_61, new Rectangle((int)((baseWidth * 0.4) + (top * 7 + sizeF.Width) / 2 + 15), (int)(baseHeight * 0.65), 10, 10));
            e.Graphics.DrawImage(Resources._0130切片_67, new Rectangle((int)((baseWidth * 0.4) + (top * 7 + sizeF.Width) / 2 + 15), (int)(baseHeight * 0.75), 10, 10));
            e.Graphics.DrawImage(Resources._0130切片_72, new Rectangle((int)((baseWidth * 0.4) + (top * 7 + sizeF.Width) / 2 + 15), (int)(baseHeight * 0.85), 10, 10));
            e.Graphics.DrawString("高能量", font, Brushes.Black, (float)(baseWidth * 0.4) + (top * 7 + sizeF.Width) / 2 + 30, (float)(baseHeight * 0.65));
            e.Graphics.DrawString("中能量", font, Brushes.Black, (float)(baseWidth * 0.4) + (top * 7 + sizeF.Width) / 2 + 30, (float)(baseHeight * 0.75));
            e.Graphics.DrawString("低能量", font, Brushes.Black, (float)(baseWidth * 0.4) + (top * 7 + sizeF.Width) / 2 + 30, (float)(baseHeight * 0.85));
        }
    }
}
