using System;
using System.ComponentModel;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Windows.Forms;

namespace Com.Colin.Forms.MyControl
{
    /// <summary>
    /// 表面上看是设置前景和后景，实际上都是设置了Control的BackgroundImage
    /// </summary>
    public class MyProcessBar : UserControl
    {
        public delegate void ValueChanged(object sender, EventArgs e);

        private TextureBrush MyTextureBrush;
        private int _Value = 0;
        private Image _ForeImage;
        private Image _BackImage;
        [Category("进度条事件:进度变化")]
        public event ValueChanged MyValueChanged;

        [Category("进度条属性:进度")]
        public int Value
        {
            get
            {
                return _Value;
            }
            set
            {
                if (value < 0)
                {
                    value = 0;
                }
                if (value > 100)
                {
                    value = 100;
                }
                EventArgs e2 = new EventArgs();
                OnValueChanged(e2);
                _Value = value;
                Image backgroundImage = createImage();
                BackgroundImage = backgroundImage;
            }
        }

        [Category("进度条属性:前景填充")]
        public Image ForeImage
        {
            get
            {
                return _ForeImage;
            }
            set
            {
                _ForeImage = value;
                Image backgroundImage = createImage();
                BackgroundImage = backgroundImage;
            }
        }

        [Category("进度条属性:背景填充")]
        public Image BackImage
        {
            get
            {
                return _BackImage;
            }
            set
            {
                _BackImage = value;
                Image backgroundImage = createImage();
                BackgroundImage = backgroundImage;
            }
        }

        private void InitializeComponent()
        {
            SuspendLayout();
            Name = "MyProcessBar";
            Size = new Size(250, 25);
            ResumeLayout(false);
        }

        /// <summary>
        /// 进度条数值改变事件
        /// </summary>
        /// <param name="e"></param>
        public virtual void OnValueChanged(EventArgs e)
        {
            MyValueChanged?.Invoke(this, e);
        }

        /// <summary>
        /// 进度条大小改变事件
        /// </summary>
        /// <param name="e"></param>
        protected override void OnResize(EventArgs e)
        {
            base.OnResize(e);
            Image backgroundImage = createImage();
            BackgroundImage = backgroundImage;
        }

        /// <summary>
        /// 画“前景色”
        /// </summary>
        /// <param name="width"></param>
        /// <param name="height"></param>
        /// <param name="img"></param>
        /// <returns></returns>
        public Image DrawSomething(int width, int height, Image img)
        {
            if (width < 1)
            {
                width = 1;
            }
            if (height < 5)
            {
                Height = 5;
                height = 5;
            }
            Bitmap bitmap = new Bitmap(width, height);
            Graphics graphics = Graphics.FromImage(bitmap);
            if (img != null)
            {
                MyTextureBrush = new TextureBrush(img, WrapMode.Tile);
                graphics.FillRectangle(MyTextureBrush, 0, 0, width, height);
            }
            return bitmap;
        }

        /// <summary>
        /// 创建图片
        /// </summary>
        /// <returns></returns>
        private Image createImage()
        {
            Bitmap bitmap = new Bitmap(Width, Height);
            Image image = DrawSomething(Width, Height, BackImage);
            Image image2 = DrawSomething((Width * Value / 100), Height, ForeImage);
            Graphics graphics = Graphics.FromImage(bitmap);
            graphics.DrawImage(image, 0, 0);
            graphics.DrawImage(image2, 0, 0);
            return bitmap;
        }
    }
}
