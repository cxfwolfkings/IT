using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Windows.Forms;

namespace Com.Colin.Win.Customized
{
    /// <summary>
    /// 表面上看是设置前景和后景，实际上都是设置了Control的BackgroundImage
    /// </summary>
    [ToolboxBitmap("MyProcessBar.bmp")]
    public class MyProcessBar : UserControl//为什么不用Control？因为没有默认的Width和Height，创建Image时会抛异常
    {
        public delegate void FinishEventHandler(object sender, FinishEventArgs e);
        public sealed class FinishEventArgs : EventArgs
        {
            private bool IfFinish;
            public bool Flag
            {
                get
                {
                    return IfFinish;
                }
            }
            public FinishEventArgs(bool IfFinish)
            {
                this.IfFinish = IfFinish;
            }
        }
       
        public delegate void ValueChanged(object sender, ValueChangeArgs e);
        public sealed class ValueChangeArgs : EventArgs
        {
            private bool IfValueChanged;
            public bool Flag
            {
                get
                {
                    return IfValueChanged;
                }
            }
            public ValueChangeArgs(bool iff)
            {
                IfValueChanged = iff;
            }
        }

        public enum MyEnum2
        {
            纯色,
            线性渐变,
            图案,
            图片
        }
        public enum MyEnum1
        {
            BackwardDiagonal,
            Cross,
            DarkDownwardDiagonal,
            DarkHorizontal,
            DarkUpwardDiagonal,
            DarkVertical,
            DashedDownwardDiagonal,
            DashedHorizontal,
            DashedUpwardDiagonal,
            DashedVertical,
            DiagonalBrick,
            DiagonalCross,
            Divot,
            DottedDiamond,
            DottedGrid,
            ForwardDiagonal,
            Horizontal,
            HorizontalBrick,
            LargeCheckerBoard,
            LargeConfetti,
            LargeGrid,
            LightDownwardDiagonal,
            LightHorizontal,
            LightUpwardDiagonal,
            LightVertical,
            Max,
            Min,
            NarrowHorizontal,
            NarrowVertical,
            OutlinedDiamond,
            Percent05,
            Percent10,
            Percent20,
            Percent25,
            Percent30,
            Percent40,
            Percent50,
            Percent60,
            Percent70,
            Percent75,
            Percent80,
            Percent90,
            Plaid,
            Shingle,
            SmallCheckerBoard,
            SmallConfetti,
            SmallGrid,
            SolidDiamond,
            Sphere,
            Trellis,
            Vertical,
            Wave,
            Weave,
            WideDownwardDiagonal,
            WideUpwardDiagonal,
            ZigZag
        }

        private List<HatchStyle> MyHss = new List<HatchStyle>();
        private Exception ERROR01 = new Exception("ERROR:\n输入的数字超出界限：透明度应该是【0~255】之间的一个整数！");
        private LinearGradientBrush MyLinearGradientBrush;
        private SolidBrush MySolidBrush;
        private HatchBrush MyHatchBrush;
        private TextureBrush MyTextureBrush;
        private int _MaxValue = 100;
        private int _Value = 0;
        private MyEnum2 _BackDrawMod = MyEnum2.纯色;
        private MyEnum2 _ForeDrawMod = MyEnum2.纯色;
        private Color _BackColor_Start = Color.Gold;
        private Color _BackColor_End = Color.Gold;
        private Color _ForeColor_Start = Color.Green;
        private Color _ForeColor_End = Color.Green;
        private MyEnum1 _ForeImageStyle = MyEnum1.LargeGrid;
        private MyEnum1 _BackImageStyle = MyEnum1.Cross;
        private Image _ForeImage;
        private Image _BackImage;
        private int _ForeFirstColorAlpha = 255;
        private int _ForeSecondColorAlpha = 255;
        private int _BackFirstColorAlpha = 255;
        private int _BackSecondColorAlpha = 255;

        [Category("进度条事件:进度变化结束")]
        public event FinishEventHandler Finished;
        [Category("进度条事件:进度变化")]
        public event ValueChanged MyValueChanged;

        [Category("进度条属性:最大进度")]
        public int MaxValue
        {
            get
            {
                return _MaxValue;
            }
            set
            {
                if (value < 1)
                {
                    _MaxValue = 1;
                }
                else
                {
                    _MaxValue = value;
                }
                if (Value > value)
                {
                    Value = value;
                }
                Image backgroundImage = 进度条();
                BackgroundImage = backgroundImage;
            }
        }

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
                if (value > MaxValue)
                {
                    value = MaxValue;
                }
                if (Value >= MaxValue)
                {
                    FinishEventArgs e = new FinishEventArgs(true);
                    OnFinished(e);
                }
                ValueChangeArgs e2 = new ValueChangeArgs(true);
                OnValueChanged(e2);
                _Value = value;
                Image backgroundImage = 进度条();
                BackgroundImage = backgroundImage;
            }
        }

        [Category("进度条属性:背景填充")]
        public MyEnum2 BackDrawMod
        {
            get
            {
                return _BackDrawMod;
            }
            set
            {
                _BackDrawMod = value;
                Image backgroundImage = 进度条();
                BackgroundImage = backgroundImage;
            }
        }

        [Category("进度条属性:前景填充")]
        public MyEnum2 ForeDrawMod
        {
            get
            {
                return _ForeDrawMod;
            }
            set
            {
                _ForeDrawMod = value;
                Image backgroundImage = 进度条();
                BackgroundImage = backgroundImage;
            }
        }

        [Category("进度条属性:背景填充")]
        public Color BackColor_Start
        {
            get
            {
                return _BackColor_Start;
            }
            set
            {
                _BackColor_Start = value;
                Image backgroundImage = 进度条();
                BackgroundImage = backgroundImage;
            }
        }

        [Category("进度条属性:背景填充")]
        public Color BackColor_End
        {
            get
            {
                return _BackColor_End;
            }
            set
            {
                _BackColor_End = value;
                Image backgroundImage = 进度条();
                BackgroundImage = backgroundImage;
            }
        }

        [Category("进度条属性:前景填充")]
        public Color ForeColor_Start
        {
            get
            {
                return _ForeColor_Start;
            }
            set
            {
                _ForeColor_Start = value;
                Image backgroundImage = 进度条();
                BackgroundImage = backgroundImage;
            }
        }

        [Category("进度条属性:前景填充")]
        public Color ForeColor_End
        {
            get
            {
                return _ForeColor_End;
            }
            set
            {
                _ForeColor_End = value;
                Image backgroundImage = 进度条();
                BackgroundImage = backgroundImage;
            }
        }

        [Category("进度条属性:前景填充")]
        public MyEnum1 ForeImageStyle
        {
            get
            {
                return _ForeImageStyle;
            }
            set
            {
                _ForeImageStyle = value;
                Image backgroundImage = 进度条();
                BackgroundImage = backgroundImage;
            }
        }

        [Category("进度条属性:背景填充")]
        public MyEnum1 BackImageStyle
        {
            get
            {
                return _BackImageStyle;
            }
            set
            {
                _BackImageStyle = value;
                Image backgroundImage = 进度条();
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
                Image backgroundImage = 进度条();
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
                Image backgroundImage = 进度条();
                BackgroundImage = backgroundImage;
            }
        }

        [Category("进度条属性:前景填充")]
        public int ForeFirstColorAlpha
        {
            get
            {
                return _ForeFirstColorAlpha;
            }
            set
            {
                if (value >= 0 && value <= 255)
                {
                    _ForeFirstColorAlpha = value;
                    Image backgroundImage = 进度条();
                    BackgroundImage = backgroundImage;
                    return;
                }
                throw ERROR01;
            }
        }

        [Category("进度条属性:前景填充")]
        public int ForeSecondColorAlpha
        {
            get
            {
                return _ForeSecondColorAlpha;
            }
            set
            {
                if (value >= 0 && value <= 255)
                {
                    _ForeSecondColorAlpha = value;
                    Image backgroundImage = 进度条();
                    BackgroundImage = backgroundImage;
                    return;
                }
                throw ERROR01;
            }
        }

        [Category("进度条属性:背景填充")]
        public int BackFirstColorAlpha
        {
            get
            {
                return _BackFirstColorAlpha;
            }
            set
            {
                if (value >= 0 && value <= 255)
                {
                    _BackFirstColorAlpha = value;
                    Image backgroundImage = 进度条();
                    BackgroundImage = backgroundImage;
                    return;
                }
                throw ERROR01;
            }
        }

        [Category("进度条属性:背景填充")]
        public int BackSecondColorAlpha
        {
            get
            {
                return _BackSecondColorAlpha;
            }
            set
            {
                if (value >= 0 && value <= 255)
                {
                    _BackSecondColorAlpha = value;
                    Image backgroundImage = 进度条();
                    BackgroundImage = backgroundImage;
                    return;
                }
                throw ERROR01;
            }
        }

        private void InitializeComponent()
        {
            SuspendLayout();
            BackColor = Color.FromArgb(255, 128, 0);
            Name = "MyProcessBar";
            Size = new Size(250, 25);
            ResumeLayout(false);
        }

        protected virtual void OnFinished(FinishEventArgs e)
        {
            Finished?.Invoke(this, e);//必须这么写,不能省略判断
        }

        public virtual void OnValueChanged(ValueChangeArgs e)
        {
            MyValueChanged?.Invoke(this, e);
        }

        private HatchStyle FindOneHatchStyle(MyEnum1 em)
        {
            MyHss.Clear();
            MyHss.Add(HatchStyle.BackwardDiagonal);
            MyHss.Add(HatchStyle.Cross);
            MyHss.Add(HatchStyle.DarkDownwardDiagonal);
            MyHss.Add(HatchStyle.DarkHorizontal);
            MyHss.Add(HatchStyle.DarkUpwardDiagonal);
            MyHss.Add(HatchStyle.DarkVertical);
            MyHss.Add(HatchStyle.DashedDownwardDiagonal);
            MyHss.Add(HatchStyle.DashedHorizontal);
            MyHss.Add(HatchStyle.DashedUpwardDiagonal);
            MyHss.Add(HatchStyle.DashedVertical);
            MyHss.Add(HatchStyle.DiagonalBrick);
            MyHss.Add(HatchStyle.DiagonalCross);
            MyHss.Add(HatchStyle.Divot);
            MyHss.Add(HatchStyle.DottedDiamond);
            MyHss.Add(HatchStyle.DottedGrid);
            MyHss.Add(HatchStyle.ForwardDiagonal);
            MyHss.Add(HatchStyle.Horizontal);
            MyHss.Add(HatchStyle.HorizontalBrick);
            MyHss.Add(HatchStyle.LargeCheckerBoard);
            MyHss.Add(HatchStyle.LargeConfetti);
            MyHss.Add(HatchStyle.Cross);
            MyHss.Add(HatchStyle.LightDownwardDiagonal);
            MyHss.Add(HatchStyle.LightHorizontal);
            MyHss.Add(HatchStyle.LightUpwardDiagonal);
            MyHss.Add(HatchStyle.LightVertical);
            MyHss.Add(HatchStyle.Cross);
            MyHss.Add(HatchStyle.Horizontal);
            MyHss.Add(HatchStyle.NarrowHorizontal);
            MyHss.Add(HatchStyle.NarrowVertical);
            MyHss.Add(HatchStyle.OutlinedDiamond);
            MyHss.Add(HatchStyle.Percent05);
            MyHss.Add(HatchStyle.Percent10);
            MyHss.Add(HatchStyle.Percent20);
            MyHss.Add(HatchStyle.Percent25);
            MyHss.Add(HatchStyle.Percent30);
            MyHss.Add(HatchStyle.Percent40);
            MyHss.Add(HatchStyle.Percent50);
            MyHss.Add(HatchStyle.Percent60);
            MyHss.Add(HatchStyle.Percent70);
            MyHss.Add(HatchStyle.Percent75);
            MyHss.Add(HatchStyle.Percent80);
            MyHss.Add(HatchStyle.Percent90);
            MyHss.Add(HatchStyle.Plaid);
            MyHss.Add(HatchStyle.Shingle);
            MyHss.Add(HatchStyle.SmallCheckerBoard);
            MyHss.Add(HatchStyle.SmallConfetti);
            MyHss.Add(HatchStyle.SmallGrid);
            MyHss.Add(HatchStyle.SolidDiamond);
            MyHss.Add(HatchStyle.Sphere);
            MyHss.Add(HatchStyle.Trellis);
            MyHss.Add(HatchStyle.Vertical);
            MyHss.Add(HatchStyle.Wave);
            MyHss.Add(HatchStyle.Weave);
            MyHss.Add(HatchStyle.WideDownwardDiagonal);
            MyHss.Add(HatchStyle.WideUpwardDiagonal);
            MyHss.Add(HatchStyle.ZigZag);
            HatchStyle result = HatchStyle.DashedDownwardDiagonal;
            for (int i = 0; i < MyHss.Count; i++)
            {
                if (MyHss[i].ToString() == em.ToString())
                {
                    result = MyHss[i];
                    break;
                }
            }
            return result;
        }

        public Image DrawSomething(MyEnum2 em2, int width, int height, Color c1, Color c2, Image img, MyEnum1 em1, int alpha1, int alpha2)
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
						//上面的判断不能省略
            Bitmap bitmap = new Bitmap(width, height);
            Graphics graphics = Graphics.FromImage(bitmap);
            switch (em2)
            {
                case MyEnum2.纯色:
                    MySolidBrush = new SolidBrush(Color.FromArgb(alpha1, c1));
                    graphics.FillRectangle(MySolidBrush, 0, 0, width, height);
                    break;
                case MyEnum2.线性渐变:
                    MyLinearGradientBrush = new LinearGradientBrush(new Point(0, 0), new Point(width, 0), Color.FromArgb(alpha1, c1), Color.FromArgb(alpha2, c2));
                    graphics.FillRectangle(MyLinearGradientBrush, 0, 0, width, height);
                    break;
                case MyEnum2.图案:
                    {
                        HatchStyle hatchstyle = FindOneHatchStyle(em1);
                        MyHatchBrush = new HatchBrush(hatchstyle, Color.FromArgb(alpha1, c1), Color.FromArgb(alpha2, c2));
                        graphics.FillRectangle(MyHatchBrush, 0, 0, width, height);
                        break;
                    }
                case MyEnum2.图片:
                    if (img != null)
                    {
                        MyTextureBrush = new TextureBrush(img, WrapMode.Tile);
                        graphics.FillRectangle(MyTextureBrush, 0, 0, width, height);
                    }
                    break;
            }
            return bitmap;
        }

        private Image 进度条()
        {
            Bitmap bitmap = new Bitmap(Width, Height);
            Image image = DrawSomething(BackDrawMod, Width, Height, BackColor_Start, BackColor_End, BackImage, BackImageStyle, _BackFirstColorAlpha, _BackSecondColorAlpha);
            Image image2 = DrawSomething(ForeDrawMod, (Width * Value / MaxValue), Height, ForeColor_Start, ForeColor_End, ForeImage, ForeImageStyle, _ForeFirstColorAlpha, _ForeSecondColorAlpha);
            Graphics graphics = Graphics.FromImage(bitmap);
            graphics.DrawImage(image, 0, 0);
            graphics.DrawImage(image2, 0, 0);
            return bitmap;
        }
    }
}
