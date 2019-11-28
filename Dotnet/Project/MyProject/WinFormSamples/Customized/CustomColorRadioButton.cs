using System.ComponentModel;
using System.Drawing;
using System.Windows.Forms;

namespace Com.Colin.Win.Customized
{
    /// <summary>
    /// Summary description for CustomColorRadioButton.
    /// </summary>
    public class CustomColorRadioButton : RadioButton
	{
		// Fields
		private Color checkColor;

		public CustomColorRadioButton()
		{
			this.checkColor = this.ForeColor;
			this.Paint += new PaintEventHandler(this.PaintHandler);
		}

		[Description("The color used to display the check painted in the RadioButton")]
		public Color CheckColor 
		{
			get 
			{
				return checkColor;
			}
			set 
			{
				checkColor = value;
				this.Invalidate();
			}
		}

		private void PaintHandler (object sender, PaintEventArgs pe) 
		{
			if (this.Checked) 
			{
				Point pt = new Point();

				if (this.CheckAlign == ContentAlignment.BottomCenter)
				{
					pt.X = (this.Width / 2) - 3;
					pt.Y = this.Height - 9;
				}
				if (this.CheckAlign == ContentAlignment.BottomLeft)
				{
					pt.X = 4;
					pt.Y = this.Height - 9;
				}
				if (this.CheckAlign == ContentAlignment.BottomRight)
				{
					pt.X = this.Width - 9;
					pt.Y = this.Height - 9;
				}
				if (this.CheckAlign == ContentAlignment.MiddleCenter)
				{
					pt.X = (this.Width / 2) - 3;
					pt.Y = (this.Height / 2) - 3;
				}
				if (this.CheckAlign == ContentAlignment.MiddleLeft)
				{
					pt.X = 4;
					pt.Y = (this.Height / 2) - 3;
				}
				if (this.CheckAlign == ContentAlignment.MiddleRight)
				{
					pt.X = this.Width - 9;
					pt.Y = (this.Height / 2) - 3;
				}
				if (this.CheckAlign == ContentAlignment.TopCenter)
				{
					pt.X = (this.Width / 2) - 3;
					pt.Y = 4;
				}
				if (this.CheckAlign == ContentAlignment.TopLeft)
				{
					pt.X = 4;
					pt.Y = 4;
				}
				if (this.CheckAlign == ContentAlignment.TopRight)
				{
					pt.X = this.Width - 9;
					pt.Y = 4;
				}

				DrawCheck(pe.Graphics, this.checkColor,pt);
			}
		}

		public void DrawCheck(Graphics g, Color c, Point pt) 
		{
			Pen pen = new Pen(this.checkColor);	
			g.DrawLine(pen, pt.X, pt.Y + 1, pt.X + 3, pt.Y + 1);
			g.DrawLine(pen, pt.X, pt.Y + 2, pt.X + 3, pt.Y + 2);
			g.DrawLine(pen, pt.X + 1, pt.Y, pt.X + 1, pt.Y + 3);
			g.DrawLine(pen, pt.X + 2, pt.Y, pt.X + 2, pt.Y + 3);

		}
	}
}
