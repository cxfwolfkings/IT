using System;
using System.ComponentModel;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Windows.Forms;

namespace Com.Colin.Win.Customized
{
    public partial class ShadeControl : Panel
    {
        public ShadeControl()
        {
            InitializeComponent();
        }

        private LinearGradientMode LineMode = new LinearGradientMode();

        private Color DShadeColor = Color.Black;
        [Browsable(true), Category("渐变控件的属性设置"), Description("渐变颜色")]
        public Color ShadeColor
        {
            get { return DShadeColor; }
            set
            {
                DShadeColor = value;
                Invalidate();
            }
        }

        public enum AspectStyle
        {
            TopToButtom = 0,//从上到下
            RTopToLButtom = 1,//从右上到左下
            LeftTToRightB = 2,//从左上到右下
            LeftToRight = 3,//从左到右
        }

        private AspectStyle TShadeAspect = AspectStyle.TopToButtom;
        [Browsable(true), Category("渐变控件的属性设置"), Description("渐变方向")]
        public AspectStyle ShadeAspect
        {
            get { return TShadeAspect; }
            set
            {
                TShadeAspect = value;
                switch (Convert.ToInt32(TShadeAspect))
                {
                    case 0: LineMode = LinearGradientMode.Vertical; break;
                    case 1: LineMode = LinearGradientMode.BackwardDiagonal; break;
                    case 2: LineMode = LinearGradientMode.ForwardDiagonal; break;
                    case 3: LineMode = LinearGradientMode.Horizontal; break;
                }
                Invalidate();
            }
        }

        private void T_Control_Paint(object sender, PaintEventArgs e)
        {
            Rectangle rect = new Rectangle(0, 0, this.Width, this.Height);			//设置绘制按钮的矩形区域
            CobOblong(rect, e.Graphics, ShadeColor);
        }

        /// <summary>
        /// 绘制透明按扭的背景色
        /// </summary>
        /// <param rect="Rectangle">绘制按钮的区域</param>
        /// <param g="Graphics">封装一个绘图的类对象</param>
        /// <param fillColor="Color">填充的颜色</param>
        private void CobOblong(Rectangle rect, Graphics g, Color fillColor)
        {
            using (GraphicsPath bh = CreateCobOblong(rect, 2))			//绘制一个圆角矩形
            {

                int opacity = 0x130;								//设置按钮的R色值
                opacity = (int)(.4f * opacity + .5f);							//设置渐变的变化值
                //设置按钮的渐变颜色
                using (LinearGradientBrush br = new LinearGradientBrush(rect, Color.FromArgb(opacity / 10, fillColor), Color.FromArgb(opacity, fillColor), LineMode))
                {
                    g.FillPath(br, bh);									//填充按钮背景
                }
            }
        }

        /// <summary>
        /// 按钮的圆角绘制
        /// </summary>
        /// <param rect="Rectangle">绘制按钮的区域</param>
        /// <param radius="int">圆角的度数</param>
        private static GraphicsPath CreateCobOblong(Rectangle rectangle, int radius)
        {
            GraphicsPath path = new GraphicsPath();							//实例化GraphicsPath类
            int l = rectangle.Left;										//获取矩形左上角的X坐标
            int t = rectangle.Top;										//获取矩形左上角的Y坐标
            int w = rectangle.Width;										//获取矩形的宽度
            int h = rectangle.Height;										//获取矩形的高度
            path.AddArc(l, t, 2 * radius, 2 * radius, 180, 90);					//在矩形的左上角绘制圆角
            path.AddLine(l + radius, t, l + w - radius, t);						//绘制左上角圆角与右上角之间的线段
            path.AddArc(l + w - 2 * radius, t, 2 * radius, 2 * radius, 270, 90);			//绘制右上角的圆角
            //绘制左上角、右上角和右下角所形成的三角形
            path.AddLine(l + w, t + radius, l + w, t + h - radius);
            path.AddArc(l + w - 2 * radius, t + h - 2 * radius, 2 * radius, 2 * radius, 0, 90);	//绘制右下角圆角
            path.AddLine(l + radius, t + h, l + w - radius, t + h);				//绘制右下角圆角与左上角圆之间的线段
            path.AddArc(l, t + h - 2 * radius, 2 * radius, 2 * radius, 90, 90);			//绘制左下角的圆角
            path.AddLine(l, t + radius, l, t + h - radius);						//绘制左上角、左下角和右下角之间的三角形
            return path;
        }


    }
}
