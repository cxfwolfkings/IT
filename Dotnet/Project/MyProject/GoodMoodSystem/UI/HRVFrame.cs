using Com.Colin.Forms.Properties;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Drawing.Printing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace Com.Colin.Forms.UI
{
    public partial class HRVFrame : Form
    {
        public HRVFrame()
        {
            InitializeComponent();

            PageSettings settings = new PageSettings();
            settings.Margins = new Margins(36, 36, 36, 36);
            printDocument1.DefaultPageSettings = settings;
        }

        int beginXOfMouse;
        int beginYOfMouse;
        int beginXOfForm;
        int beginYOfForm;
        int stateOfMouse = 0;
        private void menuTemplate1_MouseDown(object sender, MouseEventArgs e)
        {
            stateOfMouse = 1;
            beginXOfMouse = e.X;
            beginYOfMouse = e.Y;
            beginXOfForm = Location.X;
            beginYOfForm = Location.Y;
        }

        private void menuTemplate1_MouseUp(object sender, MouseEventArgs e)
        {
            stateOfMouse = 0;
        }

        private void menuTemplate1_MouseMove(object sender, MouseEventArgs e)
        {
            if (stateOfMouse == 1)
            {
                int currentX = Location.X + e.X - beginXOfMouse;
                int currentY = Location.Y + e.Y - beginYOfMouse;
                Location = new Point(currentX, currentY);
            }
            else
                return;
        }

        private void drawState(Graphics g, float baseWidth, float baseHeight,
            float dx, float dy)
        {
            Font font = new Font("微软雅黑", 10);
            Brush brush = Brushes.Black;
            g.FillRectangle(new TextureBrush(Resources.交感活跃区), dx+baseWidth, dy+baseHeight, baseWidth * 5, baseHeight * 10);
            g.DrawString("交", font, brush, dx+baseWidth * 2 + 10, (float)(baseHeight * 2.7+dy));
            g.DrawString("感", font, brush, dx+baseWidth * 2 + 10, (float)(baseHeight * 3.9+dy));
            g.DrawString("活", font, brush, dx+baseWidth * 2 + 10, (float)(baseHeight * 5.1+dy));
            g.DrawString("跃", font, brush, dx+baseWidth * 2 + 10, (float)(baseHeight * 6.3+dy));
            g.DrawString("区", font, brush, dx+baseWidth * 2 + 10, (float)(baseHeight * 7.5+dy));
            g.FillRectangle(new TextureBrush(Resources.交感低活跃区), dx+baseWidth, dy+baseHeight * 11 + 6, baseWidth * 5, baseHeight * 8 - 6);
            g.DrawString("交", font, brush, dx+baseWidth * 2 + 18, (float)(baseHeight * 12 + 6+dy));
            g.DrawString("感", font, brush, dx+baseWidth * 2 + 18, (float)(baseHeight * 13 + 10+dy));
            g.DrawString("低", font, brush, dx+baseWidth * 2 + 2, (float)(baseHeight * 12 + 6+dy));
            g.DrawString("活", font, brush, dx+baseWidth * 2 + 2, (float)(baseHeight * 13 + 10+dy));
            g.DrawString("跃", font, brush, dx+baseWidth * 2 + 2, (float)(baseHeight * 14 + 14+dy));
            g.DrawString("区", font, brush, dx+baseWidth * 2 + 2, (float)(baseHeight * 15 + 18+dy));
            g.FillRectangle(new TextureBrush(Resources.高能量平衡区), dx+baseWidth * 6 + 6, dy+baseHeight, baseWidth * 7, baseHeight * 4);
            g.DrawString("高", font, brush, (float)(dx+baseWidth * 7.25 + 6), (float)(baseHeight * 1.5+dy));
            g.DrawString("能", font, brush, (float)(dx+baseWidth * 8.75 + 6), (float)(baseHeight * 1.5+dy));
            g.DrawString("量", font, brush, (float)(dx+baseWidth * 10.25 + 6), (float)(baseHeight * 1.5+dy));
            g.DrawString("平", font, brush, (float)(dx+baseWidth * 7.25 + 6), (float)(baseHeight * 2.5 + 3+dy));
            g.DrawString("衡", font, brush, (float)(dx+baseWidth * 8.75 + 6), (float)(baseHeight * 2.5 + 3+dy));
            g.DrawString("区", font, brush, (float)(dx+baseWidth * 10.25 + 6), (float)(baseHeight * 2.5 + 3+dy));
            g.FillRectangle(new TextureBrush(Resources.平衡区), dx+baseWidth * 6 + 6, dy+baseHeight * 5 + 6, baseWidth * 7, baseHeight * 6 - 6);
            g.DrawString("平", font, brush, (float)(dx+baseWidth * 7.25 + 6), (float)(baseHeight * 7.5 + 1+dy));
            g.DrawString("衡", font, brush, (float)(dx+baseWidth * 8.75 + 6), (float)(baseHeight * 7.5 + 1+dy));
            g.DrawString("区", font, brush, (float)(dx+baseWidth * 10.25 + 6), (float)(baseHeight * 7.5 + 1+dy));
            g.FillRectangle(new TextureBrush(Resources.平衡低活跃区), dx+baseWidth * 6 + 6, dy+baseHeight * 11 + 6, baseWidth * 7, baseHeight * 8 - 6);
            g.DrawString("平", font, brush, (float)(dx+baseWidth * 9.5 + 9), (float)(baseHeight * 12 + 6+dy));
            g.DrawString("衡", font, brush, (float)(dx+baseWidth * 9.5 + 9), (float)(baseHeight * 13.5 + 2+dy));
            g.DrawString("低", font, brush, (float)(dx+baseWidth * 9.5 - 9), (float)(baseHeight * 12 + 6+dy));
            g.DrawString("活", font, brush, (float)(dx+baseWidth * 9.5 - 9), (float)(baseHeight * 13.5 + 2+dy));
            g.DrawString("跃", font, brush, (float)(dx+baseWidth * 9.5 - 9), (float)(baseHeight * 15 + -2+dy));
            g.DrawString("区", font, brush, (float)(dx+baseWidth * 9.5 - 9), (float)(baseHeight * 16.5 - 4+dy));
            g.FillRectangle(new TextureBrush(Resources.副交感活跃区), dx+baseWidth * 13 + 12, dy+baseHeight, baseWidth * 5, baseHeight * 10);
            g.DrawString("副", font, brush, (float)(dx+baseWidth * 15.5 + 6), (float)(baseHeight * 2.8 - 6+dy));
            g.DrawString("交", font, brush, (float)(dx+baseWidth * 15.5 + 6), (float)(baseHeight * 4 - 6+dy));
            g.DrawString("感", font, brush, (float)(dx+baseWidth * 15.5 + 6), (float)(baseHeight * 5.2 - 6+dy));
            g.DrawString("活", font, brush, (float)(dx+baseWidth * 15.5 + 6), (float)(baseHeight * 6.4 - 6+dy));
            g.DrawString("跃", font, brush, (float)(dx+baseWidth * 15.5 + 6), (float)(baseHeight * 7.6 - 6+dy));
            g.DrawString("区", font, brush, (float)(dx+baseWidth * 15.5 + 6), (float)(baseHeight * 8.8 - 6+dy));
            g.FillRectangle(new TextureBrush(Resources.副交感低活跃区), dx+baseWidth * 13 + 12, dy+baseHeight * 11 + 6, baseWidth * 5, baseHeight * 8 - 6);
            g.DrawString("副", font, brush, (float)(dx+baseWidth * 15.5 + 12), (float)(baseHeight * 13 - 6+dy));
            g.DrawString("交", font, brush, (float)(dx+baseWidth * 15.5 + 12), (float)(baseHeight * 14.3 - 6+dy));
            g.DrawString("感", font, brush, (float)(dx+baseWidth * 15.5 + 12), (float)(baseHeight * 15.6 - 6+dy));
            g.DrawString("低", font, brush, (float)(dx+baseWidth * 15.5 - 3), (float)(baseHeight * 13 - 6+dy));
            g.DrawString("活", font, brush, (float)(dx+baseWidth * 15.5 - 3), (float)(baseHeight * 14.3 - 6+dy));
            g.DrawString("跃", font, brush, (float)(dx+baseWidth * 15.5 - 3), (float)(baseHeight * 15.6 - 6+dy));
            g.DrawString("区", font, brush, (float)(dx+baseWidth * 15.5 - 3), (float)(baseHeight * 17 - 6+dy));
        }

        private void panel9_Paint(object sender, PaintEventArgs e)
        {
            float baseWidth = (float)(panel9.Width * 0.05);
            float baseHeight = (float)(panel9.Height * 0.05);
            drawState(e.Graphics, baseWidth, baseHeight, 0, 0);
        }

        private void button1_Click(object sender, EventArgs e)
        {
            printPreviewDialog1.ShowDialog();
        }

        private void printDocument1_PrintPage(object sender, PrintPageEventArgs e)
        {
            Font font = new Font("微软雅黑", 12);
            e.Graphics.FillRectangle(new TextureBrush(Resources._0130切片_73), e.PageSettings.Margins.Left, e.PageSettings.Margins.Top, e.MarginBounds.Width, 30);
            e.Graphics.DrawString("HRV监测报告", font, Brushes.White, e.PageSettings.Margins.Left + 9, e.PageSettings.Margins.Top + 4);

            e.Graphics.FillRectangle(new TextureBrush(Resources.打印表头背景色), e.PageSettings.Margins.Left + 18, e.PageSettings.Margins.Top + 39, (float)(e.MarginBounds.Width * 0.3), 40);
            e.Graphics.DrawRectangle(Pens.DarkGray, e.PageSettings.Margins.Left + 18, e.PageSettings.Margins.Top + 39, (float)(e.MarginBounds.Width * 0.3), 200);
            e.Graphics.DrawLine(Pens.DarkGray, e.PageSettings.Margins.Left + 18, e.PageSettings.Margins.Top + 79, e.PageSettings.Margins.Left + 18 + (float)(e.MarginBounds.Width * 0.3), e.PageSettings.Margins.Top + 79);
            e.Graphics.DrawString("用户信息", font, Brushes.Black, e.PageSettings.Margins.Left + 28, e.PageSettings.Margins.Top + 48);

            e.Graphics.FillRectangle(new TextureBrush(Resources.打印表头背景色), e.PageSettings.Margins.Left + 38 + (float)(e.MarginBounds.Width * 0.3), e.PageSettings.Margins.Top + 39, (float)(e.MarginBounds.Width * 0.6 + 20), 40);
            e.Graphics.DrawRectangle(Pens.DarkGray, e.PageSettings.Margins.Left + 38+ (float)(e.MarginBounds.Width * 0.3), e.PageSettings.Margins.Top + 39, (float)(e.MarginBounds.Width * 0.6+20), 200);
            e.Graphics.DrawLine(Pens.DarkGray, e.PageSettings.Margins.Left + 38 + (float)(e.MarginBounds.Width * 0.3), e.PageSettings.Margins.Top + 79, e.PageSettings.Margins.Left + 58 + (float)(e.MarginBounds.Width * 0.9), e.PageSettings.Margins.Top + 79);
            e.Graphics.DrawString("记录信息", font, Brushes.Black, e.PageSettings.Margins.Left + 48 + (float)(e.MarginBounds.Width * 0.3), e.PageSettings.Margins.Top + 48);

            e.Graphics.FillRectangle(new TextureBrush(Resources.打印表头背景色), e.PageSettings.Margins.Left + 18, e.PageSettings.Margins.Top + 259, (float)(e.MarginBounds.Width * 0.6 + 20), 40);
            e.Graphics.DrawRectangle(Pens.DarkGray, e.PageSettings.Margins.Left + 18, e.PageSettings.Margins.Top + 259, (float)(e.MarginBounds.Width * 0.6 + 20), 400);
            e.Graphics.DrawLine(Pens.DarkGray, e.PageSettings.Margins.Left + 18, e.PageSettings.Margins.Top + 299, e.PageSettings.Margins.Left + 38 + (float)(e.MarginBounds.Width * 0.6), e.PageSettings.Margins.Top + 299);
            e.Graphics.DrawString("监测数据", font, Brushes.Black, e.PageSettings.Margins.Left + 28, e.PageSettings.Margins.Top + 268);
            e.Graphics.DrawLine(Pens.DarkGray, e.PageSettings.Margins.Left + 18, e.PageSettings.Margins.Top + 339, e.PageSettings.Margins.Left + 38 + (float)(e.MarginBounds.Width * 0.6), e.PageSettings.Margins.Top + 339);
            e.Graphics.DrawLine(Pens.DarkGray, e.PageSettings.Margins.Left + 18, e.PageSettings.Margins.Top + 379, e.PageSettings.Margins.Left + 38 + (float)(e.MarginBounds.Width * 0.6), e.PageSettings.Margins.Top + 379);
            e.Graphics.DrawLine(Pens.DarkGray, e.PageSettings.Margins.Left + 28+ (float)(e.MarginBounds.Width * 0.3), e.PageSettings.Margins.Top + 339, e.PageSettings.Margins.Left + 28 + (float)(e.MarginBounds.Width * 0.3), e.PageSettings.Margins.Top + 659);

            e.Graphics.FillRectangle(new TextureBrush(Resources.打印表头背景色), e.PageSettings.Margins.Left + 58 + (float)(e.MarginBounds.Width * 0.6), e.PageSettings.Margins.Top + 259, (float)(e.MarginBounds.Width * 0.3), 40);
            e.Graphics.DrawRectangle(Pens.DarkGray, e.PageSettings.Margins.Left + 58 + (float)(e.MarginBounds.Width * 0.6), e.PageSettings.Margins.Top + 259, (float)(e.MarginBounds.Width * 0.3), 400);
            e.Graphics.DrawLine(Pens.DarkGray, e.PageSettings.Margins.Left + 58 + (float)(e.MarginBounds.Width * 0.6), e.PageSettings.Margins.Top + 299, e.PageSettings.Margins.Left + 58 + (float)(e.MarginBounds.Width * 0.9), e.PageSettings.Margins.Top + 299);
            e.Graphics.DrawString("自主神经系统状态", font, Brushes.Black, e.PageSettings.Margins.Left + 68 + (float)(e.MarginBounds.Width * 0.6), e.PageSettings.Margins.Top + 268);

            e.Graphics.FillRectangle(new TextureBrush(Resources.打印表头背景色), e.PageSettings.Margins.Left + 18, e.PageSettings.Margins.Top + 679, (float)(e.MarginBounds.Width * 0.9 + 40), 40);
            e.Graphics.DrawRectangle(Pens.DarkGray, e.PageSettings.Margins.Left + 18, e.PageSettings.Margins.Top + 679, (float)(e.MarginBounds.Width * 0.9 + 40), 200);
            e.Graphics.DrawLine(Pens.DarkGray, e.PageSettings.Margins.Left + 18, e.PageSettings.Margins.Top + 719, e.PageSettings.Margins.Left + 58 + (float)(e.MarginBounds.Width * 0.9), e.PageSettings.Margins.Top + 719);
            e.Graphics.DrawString("监测综述", font, Brushes.Black, e.PageSettings.Margins.Left + 28, e.PageSettings.Margins.Top + 688);

            font = new Font("微软雅黑", 10);
            //用户信息
            e.Graphics.DrawString(label2.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 28, e.PageSettings.Margins.Top + 100);
            e.Graphics.DrawString(label3.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 28, e.PageSettings.Margins.Top + 150);
            e.Graphics.DrawString(label4.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 28, e.PageSettings.Margins.Top + 200);
            e.Graphics.DrawString(label5.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 18+ (float)(e.MarginBounds.Width * 0.15), e.PageSettings.Margins.Top + 100);
            e.Graphics.DrawString(label6.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 18 + (float)(e.MarginBounds.Width * 0.15), e.PageSettings.Margins.Top + 150);
            e.Graphics.DrawString(label7.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 18 + (float)(e.MarginBounds.Width * 0.15), e.PageSettings.Margins.Top + 200);

            //记录信息
            e.Graphics.DrawString(label14.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 54 + (float)(e.MarginBounds.Width * 0.3), e.PageSettings.Margins.Top + 100);
            e.Graphics.DrawString(label13.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 54 + (float)(e.MarginBounds.Width * 0.3), e.PageSettings.Margins.Top + 150);
            e.Graphics.DrawString(label11.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 124 + (float)(e.MarginBounds.Width * 0.3), e.PageSettings.Margins.Top + 100);
            e.Graphics.DrawString(label10.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 124 + (float)(e.MarginBounds.Width * 0.3), e.PageSettings.Margins.Top + 150);
            e.Graphics.DrawString(label12.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 78 + (float)(e.MarginBounds.Width * 0.6), e.PageSettings.Margins.Top + 100);
            e.Graphics.DrawString(label15.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 78 + (float)(e.MarginBounds.Width * 0.6), e.PageSettings.Margins.Top + 150);
            e.Graphics.DrawString(label9.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 168 + (float)(e.MarginBounds.Width * 0.6), e.PageSettings.Margins.Top + 100);
            e.Graphics.DrawString(label16.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 168 + (float)(e.MarginBounds.Width * 0.6), e.PageSettings.Margins.Top + 150);

            //监测数据
            e.Graphics.DrawString(label18.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 28, e.PageSettings.Margins.Top + 310);
            e.Graphics.DrawString(label19.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 118, e.PageSettings.Margins.Top + 310);
            e.Graphics.DrawString(label20.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 52 + (float)(e.MarginBounds.Width * 0.3), e.PageSettings.Margins.Top + 310);
            e.Graphics.DrawString(label21.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 142 + (float)(e.MarginBounds.Width * 0.3), e.PageSettings.Margins.Top + 310);

            e.Graphics.DrawString(label22.Text, font, Brushes.Black, e.PageSettings.Margins.Left +(float)(e.MarginBounds.Width * 0.15), e.PageSettings.Margins.Top + 350);
            e.Graphics.DrawString(label23.Text, font, Brushes.Black, e.PageSettings.Margins.Left + (float)(e.MarginBounds.Width * 0.45), e.PageSettings.Margins.Top + 350);

            e.Graphics.DrawString(label26.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 28, e.PageSettings.Margins.Top + 389);
            e.Graphics.DrawString(label27.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 28, e.PageSettings.Margins.Top + 429);
            e.Graphics.DrawString(label28.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 28, e.PageSettings.Margins.Top + 469);
            e.Graphics.DrawString(label29.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 28, e.PageSettings.Margins.Top + 509);
            e.Graphics.DrawString(label30.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 28, e.PageSettings.Margins.Top + 549);
            e.Graphics.DrawString(label31.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 28, e.PageSettings.Margins.Top + 589);
            e.Graphics.DrawString(label32.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 28, e.PageSettings.Margins.Top + 629);
            e.Graphics.DrawString(label33.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 48 + (float)(e.MarginBounds.Width * 0.15), e.PageSettings.Margins.Top + 389);
            e.Graphics.DrawString(label36.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 48 + (float)(e.MarginBounds.Width * 0.15), e.PageSettings.Margins.Top + 429);
            e.Graphics.DrawString(label39.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 48 + (float)(e.MarginBounds.Width * 0.15), e.PageSettings.Margins.Top + 469);
            e.Graphics.DrawString(label40.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 48 + (float)(e.MarginBounds.Width * 0.15), e.PageSettings.Margins.Top + 509);
            e.Graphics.DrawString(label41.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 48 + (float)(e.MarginBounds.Width * 0.15), e.PageSettings.Margins.Top + 549);
            e.Graphics.DrawString(label42.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 48 + (float)(e.MarginBounds.Width * 0.15), e.PageSettings.Margins.Top + 589);
            e.Graphics.DrawString(label43.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 48 + (float)(e.MarginBounds.Width * 0.15), e.PageSettings.Margins.Top + 629);

            e.Graphics.DrawString(label34.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 48+ (float)(e.MarginBounds.Width * 0.3), e.PageSettings.Margins.Top + 389);
            e.Graphics.DrawString(label37.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 48 + (float)(e.MarginBounds.Width * 0.3), e.PageSettings.Margins.Top + 429);
            e.Graphics.DrawString(label44.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 48 + (float)(e.MarginBounds.Width * 0.3), e.PageSettings.Margins.Top + 469);
            e.Graphics.DrawString(label46.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 48 + (float)(e.MarginBounds.Width * 0.3), e.PageSettings.Margins.Top + 509);
            e.Graphics.DrawString(label48.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 48 + (float)(e.MarginBounds.Width * 0.3), e.PageSettings.Margins.Top + 549);
            e.Graphics.DrawString(label50.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 48 + (float)(e.MarginBounds.Width * 0.3), e.PageSettings.Margins.Top + 589);
            e.Graphics.DrawString(label52.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 48 + (float)(e.MarginBounds.Width * 0.3), e.PageSettings.Margins.Top + 629);
            e.Graphics.DrawString(label35.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 68 + (float)(e.MarginBounds.Width * 0.45), e.PageSettings.Margins.Top + 389);
            e.Graphics.DrawString(label38.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 68 + (float)(e.MarginBounds.Width * 0.45), e.PageSettings.Margins.Top + 429);
            e.Graphics.DrawString(label45.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 68 + (float)(e.MarginBounds.Width * 0.45), e.PageSettings.Margins.Top + 469);
            e.Graphics.DrawString(label47.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 68 + (float)(e.MarginBounds.Width * 0.45), e.PageSettings.Margins.Top + 509);
            e.Graphics.DrawString(label49.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 68 + (float)(e.MarginBounds.Width * 0.45), e.PageSettings.Margins.Top + 549);
            e.Graphics.DrawString(label51.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 68 + (float)(e.MarginBounds.Width * 0.45), e.PageSettings.Margins.Top + 589);
            e.Graphics.DrawString(label53.Text, font, Brushes.Black, e.PageSettings.Margins.Left + 68 + (float)(e.MarginBounds.Width * 0.45), e.PageSettings.Margins.Top + 629);

            //自主神经系统状态
            float baseWidth = (float)(e.MarginBounds.Width * 0.015);
            float baseHeight = 18;
            drawState(e.Graphics, baseWidth, baseHeight, e.PageSettings.Margins.Left + 58 + (float)(e.MarginBounds.Width * 0.6), e.PageSettings.Margins.Top + 299);
        }
    }
}
