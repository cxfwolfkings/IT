using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Windows.Forms;

namespace Com.Colin.Win.Customized
{
    public partial class CrystalButton : Button   
    {
        private enum MouseActionType
        {
            None,
            Hover,
            Click
        }

        private MouseActionType mouseAction;
        private ImageAttributes imgAttr = new ImageAttributes();
        private Bitmap buttonBitmap;
        private Rectangle buttonBitmapRectangle;

        public CrystalButton()
        {
            InitializeComponent();

            mouseAction = MouseActionType.None;

            //双重缓冲区
            this.SetStyle(ControlStyles.AllPaintingInWmPaint |
                ControlStyles.DoubleBuffer |
                ControlStyles.UserPaint, true);

            //The following defaults are better suited to draw the text outline
            this.Font = new Font("Arial Black", 12, FontStyle.Bold);
            this.BackColor = Color.DarkTurquoise;
            this.Size = new Size(112, 48);
        }

        private GraphicsPath GetGraphicsPath(Rectangle rc, int r)
        {
            int x = rc.X, y = rc.Y, w = rc.Width, h = rc.Height;
            GraphicsPath path = new GraphicsPath();
            path.AddArc(x, y, r, r, 180, 90);				//Upper left corner
            path.AddArc(x + w - r, y, r, r, 270, 90);			//Upper right corner
            path.AddArc(x + w - r, y + h - r, r, r, 0, 90);		//Lower right corner
            path.AddArc(x, y + h - r, r, r, 90, 90);			//Lower left corner
            path.CloseFigure();
            return path;
        }

        protected override void OnPaint(PaintEventArgs e)
        {
            Graphics g = e.Graphics;
            //g.Clear(Color.White);
            g.Clear(SystemColors.ButtonFace);
            Color clr = this.BackColor;
            int shadowOffset = 8;
            int btnOffset = 0;
            switch (mouseAction)
            {
                case MouseActionType.Click:
                    shadowOffset = 4;
                    clr = Color.LightGray;
                    btnOffset = 2;
                    break;
                case MouseActionType.Hover:
                    clr = Color.LightGray;
                    break;
            }
            g.SmoothingMode = SmoothingMode.AntiAlias;

            ///
            /// 创建按钮本身的图形
            /// 
            Rectangle rc = new Rectangle(btnOffset, btnOffset, this.ClientSize.Width - 8 - btnOffset, this.ClientSize.Height - 8 - btnOffset);
            GraphicsPath path1 = this.GetGraphicsPath(rc, 20);
            LinearGradientBrush br1 = new LinearGradientBrush(new Point(0, 0), new Point(0, rc.Height + 6), clr, Color.White);

            ///
            /// 创建按钮阴影
            /// 
            Rectangle rc2 = rc;
            rc2.Offset(shadowOffset, shadowOffset);
            GraphicsPath path2 = this.GetGraphicsPath(rc2, 20);
            PathGradientBrush br2 = new PathGradientBrush(path2);
            br2.CenterColor = Color.Black;
            br2.SurroundColors = new Color[] {SystemColors.ButtonFace};
            //为了更逼真，我们将渐变结束颜色设定为窗体前景颜色，可以根据窗口的前景颜色适当调整
           
            ///
            /// 创建按钮顶部白色渐变
            /// 
            Rectangle rc3 = rc;
            rc3.Inflate(-5, -5);
            rc3.Height = 15;
            GraphicsPath path3 = GetGraphicsPath(rc3, 20);
            LinearGradientBrush br3 = new LinearGradientBrush(rc3, Color.FromArgb(255, Color.White), Color.FromArgb(0, Color.White), LinearGradientMode.Vertical);

            ///
            /// 绘制图形
            ///
            g.FillPath(br2, path2);	//绘制阴影
            g.FillPath(br1, path1); //绘制按钮
            g.FillPath(br3, path3); //绘制顶部白色泡泡

            ///
            ///设定内存位图对象，进行二级缓存绘图操作
            ///
            buttonBitmapRectangle = new Rectangle(rc.Location, rc.Size);
            buttonBitmap = new Bitmap(buttonBitmapRectangle.Width, buttonBitmapRectangle.Height);
            Graphics g_bmp = Graphics.FromImage(buttonBitmap);
            g_bmp.SmoothingMode = SmoothingMode.AntiAlias;
            g_bmp.FillPath(br1, path1);
            g_bmp.FillPath(br3, path3);

            ///
            ///将region赋值给button
            Region rgn = new Region(path1);
            rgn.Union(path2);
            this.Region = rgn;

            ///
            /// 绘制按钮的文本
            /// 
            GraphicsPath path4 = new GraphicsPath();
            RectangleF path1bounds = path1.GetBounds();
            Rectangle rcText = new Rectangle((int)path1bounds.X + btnOffset, (int)path1bounds.Y + btnOffset, (int)path1bounds.Width, (int)path1bounds.Height);

            StringFormat strformat = new StringFormat();
            strformat.Alignment = StringAlignment.Center;
            strformat.LineAlignment = StringAlignment.Center;
            path4.AddString(this.Text, this.Font.FontFamily, (int)this.Font.Style, this.Font.Size, rcText, strformat);

            Pen txtPen = new Pen(this.ForeColor , 1);
            g.DrawPath(txtPen, path4);
            g_bmp.DrawPath(txtPen, path4);
        }

        protected override void OnMouseDown(MouseEventArgs e)
        {
            if (e.Button == MouseButtons.Left)
            {
                this.mouseAction = MouseActionType.Click;
                this.Invalidate();
            }
            base.OnMouseDown(e);
        }

        protected override void OnMouseUp(MouseEventArgs e)
        {
            this.mouseAction = MouseActionType.Hover;
            this.Invalidate();
            base.OnMouseUp(e);
        }

        protected override void OnMouseHover(EventArgs e)
        {
            this.mouseAction = MouseActionType.Hover;
            this.Invalidate();
            base.OnMouseHover(e);
        }

        protected override void OnMouseEnter(EventArgs e)
        {
            this.mouseAction = MouseActionType.Hover;
            this.Invalidate();
            base.OnMouseEnter(e);
        }

        protected override void OnMouseLeave(EventArgs e)
        {
            this.mouseAction = MouseActionType.None;
            this.Invalidate();
            base.OnMouseLeave(e);
        }
    }
}