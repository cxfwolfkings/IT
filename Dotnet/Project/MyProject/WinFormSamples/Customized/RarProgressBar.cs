///////////////////////////////////////////////////////////////////////////////
//  RarProgressBar.cs
//  仿RAR式进度条
//
//  @version 1.00
//  @remarks For study purpose
//  @author Icebird @date 2006-07-03
///////////////////////////////////////////////////////////////////////////////
using System;
using System.ComponentModel;
using System.Drawing;
using System.Windows.Forms;

namespace Com.Colin.Win.Customized
{
    /// <summary>
    /// RarProgressBar
    /// </summary>
    [DefaultProperty("Value")]
	public class RarProgressBar : System.Windows.Forms.Control
	{
		private Pen whitePen, whitePen2;
		private Pen blackPen;
		private Pen blackPen2;
		private Pen lightGrayPen;
		private Pen lightGrayPen2;
		private Brush foreBrush;

		private int maximum;
		private int minimum;
		private int step;
		private int value;

		/// <summary>
		/// Constructor
		/// </summary>
		public RarProgressBar()
		{
			SetStyle(ControlStyles.Selectable, false);
			SetStyle(ControlStyles.SupportsTransparentBackColor | ControlStyles.ResizeRedraw | ControlStyles.DoubleBuffer |
				ControlStyles.AllPaintingInWmPaint | ControlStyles.UserPaint, true);
			this.minimum = 0;
			this.maximum = 100;
			this.step = 10;
			this.value = 0;
			this.BackColor = ColorTranslator.FromHtml("#946D6B");
			this.ForeColor = ColorTranslator.FromHtml("#D6D7DE");
			this.Height = 12;

			whitePen = new Pen(Color.White);
			whitePen2 = new Pen(ColorTranslator.FromHtml("#EFEBEF"));
			blackPen = new Pen(ColorTranslator.FromHtml("#636163"));
			blackPen2 = new Pen(ColorTranslator.FromHtml("#424142"));
			lightGrayPen = new Pen(ColorTranslator.FromHtml("#B59694"));
			lightGrayPen2 = new Pen(ColorTranslator.FromHtml("#9C8284"));
			foreBrush = new SolidBrush(ForeColor);
		}

		protected override void Dispose( bool disposing )
		{
			if( disposing )
			{
				whitePen.Dispose();
				whitePen2.Dispose();
				blackPen.Dispose();
				blackPen2.Dispose();
				lightGrayPen.Dispose();
				lightGrayPen2.Dispose();
				foreBrush.Dispose();
			}
			base.Dispose( disposing );
		}

		/// <summary>
		/// 当前值增加指定增量
		/// </summary>
		/// <param name="value"> 增量</param>
		public void Increment(int value)
		{
			this.value += value;
			if (this.value < this.minimum)
			{
				this.value = this.minimum;
			}
			if (this.value > this.maximum)
			{
				this.value = this.maximum;
			}
			this.UpdatePos();
		}

		/// <summary>
		/// 当前值增加固定增量(Step)
		/// </summary>
		public void PerformStep()
		{
			this.Increment(this.step);
		}

		/// <summary>
		/// 输出字符串
		/// </summary>
		public override string ToString()
		{
			string s = base.ToString();
			return (s + ", Minimum: " + this.Minimum.ToString() + ", Maximum: " + this.Maximum.ToString() + ", Value: " + this.Value.ToString());
		}

		private void UpdatePos()
		{
			Invalidate();
		}

		[Browsable(false), EditorBrowsable(EditorBrowsableState.Never)]
		public override bool AllowDrop
		{
			get
			{
				return base.AllowDrop;
			}
			set
			{
				base.AllowDrop = value;
			}
		}

		[EditorBrowsable(EditorBrowsableState.Never), Browsable(false)]
		public override Color BackColor
		{
			get
			{
				return base.BackColor;
			}
			set
			{
				base.BackColor = value;
			}
		}

		[Browsable(false), EditorBrowsable(EditorBrowsableState.Never)]
		public override Image BackgroundImage
		{
			get
			{
				return base.BackgroundImage;
			}
			set
			{
				base.BackgroundImage = value;
			}
		}

		protected override System.Windows.Forms.ImeMode DefaultImeMode
		{
			get
			{
				return System.Windows.Forms.ImeMode.Disable;
			}
		}

		protected override Size DefaultSize
		{
			get
			{
				return new Size(100, 12);
			}
		}

		[EditorBrowsable(EditorBrowsableState.Never), Browsable(false)]
		public override System.Drawing.Font Font
		{
			get
			{
				return base.Font;
			}
			set
			{
				base.Font = value;
			}
		}

		[Browsable(false), EditorBrowsable(EditorBrowsableState.Never)]
		public override Color ForeColor
		{
			get
			{
				return base.ForeColor;
			}
			set
			{
				base.ForeColor = value;
			}
		}

		[DescriptionAttribute("此 ProgressBar 正使用的范围的上限"),RefreshProperties(RefreshProperties.Repaint), DefaultValue(100), CategoryAttribute("行为")]
		public int Maximum
		{
			get
			{
				return this.maximum;
			}
			set
			{
				if (this.maximum != value)
				{
					if (value < 0)
					{
						throw new ArgumentException(String.Format("'{1}'不是'{0}'的有效值。'{0}'必须大于或等于 {2}。", new object[] { "maximum", value.ToString(), "0" }));
					}
					if (this.minimum > value)
					{
						this.minimum = value;
					}
					this.maximum = value;
					if (this.value > this.maximum)
					{
						this.value = this.maximum;
					}
					this.UpdatePos();
				}
			}
		}

		[RefreshProperties(RefreshProperties.Repaint), DescriptionAttribute("此 ProgressBar 正使用的范围的下限"), CategoryAttribute("行为"), DefaultValue(0)]
		public int Minimum
		{
			get
			{
				return this.minimum;
			}
			set
			{
				if (this.minimum != value)
				{
					if (value < 0)
					{
						throw new ArgumentException(String.Format("'{1}'不是'{0}'的有效值。'{0}'必须大于或等于 {2}。", new object[] { "minimum", value.ToString(), "0" }));
					}
					if (this.maximum < value)
					{
						this.maximum = value;
					}
					this.minimum = value;
					if (this.value < this.minimum)
					{
						this.value = this.minimum;
					}
					this.UpdatePos();
				}
			}
		}

		[Browsable(false), EditorBrowsable(EditorBrowsableState.Never)]
		public override System.Windows.Forms.RightToLeft RightToLeft
		{
			get
			{
				return base.RightToLeft;
			}
			set
			{
				base.RightToLeft = value;
			}
		}

		[DescriptionAttribute("当调用 Step() 方法时，控件当前值的增量。"), DefaultValue(10), CategoryAttribute("行为")]
		public int Step
		{
			get
			{
				return this.step;
			}
			set
			{
				this.step = value;
			}
		}

		[Bindable(false), Browsable(false), EditorBrowsable(EditorBrowsableState.Never)]
		public override string Text
		{
			get
			{
				return base.Text;
			}
			set
			{
				base.Text = value;
			}
		}

		[DefaultValue(0), DescriptionAttribute("ProgressBar 的当前值，在由最小和最大属性指定的范围之内。"), Bindable(true), CategoryAttribute("行为")]
		public int Value
		{
			get
			{
				return this.value;
			}
			set
			{
				if (this.value != value)
				{
					if ((value < this.minimum) || (value > this.maximum))
					{
						throw new ArgumentException(String.Format("'{1}'不是'{0}'的有效值。'{0}'应介于 '{2}' 和 '{3}' 之间。", new object[] { "value", value.ToString(), "'minimum'", "'maximum'" }));
					}
					this.value = value;
					this.UpdatePos();
				}
			}
		}

		protected override void OnMouseEnter(EventArgs e)
		{
			base.OnMouseEnter (e);
		}

		private int ProgressWidth
		{
			get
			{
				return Convert.ToInt32(Math.Floor(1.0 * ClientSize.Width / Maximum * Value));
			}
		}

		protected override void OnPaint(PaintEventArgs e)
		{
			Graphics g = e.Graphics;

			int pWidth = ProgressWidth;
			Pen pen;
			if (Parent != null)
				pen = new Pen(Parent.BackColor);
			else
				pen = new Pen(ColorTranslator.FromHtml("#EFEBE7"));
			g.DrawRectangle(pen, 0, 0, ClientSize.Width - 1, ClientSize.Height - 1);
			pen.Dispose();

			g.FillRectangle(foreBrush, 0, 0, pWidth, ClientSize.Height - 3 );
			g.DrawRectangle(whitePen, 0, 0, pWidth, ClientSize.Height - 2);
			g.DrawRectangle(whitePen2, 1, 1, pWidth - 2, ClientSize.Height - 4);

			//drawing right progress
			if (Value < Maximum)
			{
				g.DrawRectangle(lightGrayPen, pWidth, 0, ClientSize.Width - pWidth - 2, ClientSize.Height - 3);
				g.DrawRectangle(lightGrayPen2, pWidth + 1, 1, ClientSize.Width - pWidth - 4, ClientSize.Height - 5);
			}

			//drawing separator
			g.DrawLine(blackPen, pWidth, 0, pWidth,  ClientSize.Height - 3);

			//drawing right & bottom borders
			g.DrawLine(blackPen,  0, ClientSize.Height - 2,  ClientSize.Width - 1,  ClientSize.Height - 2);
			g.DrawLine(blackPen2,  1, ClientSize.Height - 1,  ClientSize.Width,  ClientSize.Height - 1);
			g.DrawLine(blackPen2,  ClientSize.Width - 1,  ClientSize.Height - 1,  ClientSize.Width - 1,  2);
		}
	}
}
