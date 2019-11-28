using System.ComponentModel;
using System.Drawing;
using System.Windows.Forms;

namespace Com.Colin.Win.Customized
{
    public enum DrawingMode
    {
        Happy = 0,
        Sad = 1,
        Angry = 2
    }

    public class HelloWorldControl : Control
    {
        protected override void OnPaint(PaintEventArgs e)
        {
            RectangleF rect = new RectangleF(ClientRectangle.X,
                                             ClientRectangle.Y,
                                             ClientRectangle.Width,
                                             ClientRectangle.Height);
            e.Graphics.DrawString(Text, Font, new SolidBrush(ForeColor), rect);
        }

        private DrawingMode myDrawingMode;

        [Browsable(true), Category("Appearance")]
        public DrawingMode MyDrawingMode
        {
            get
            {
                return myDrawingMode;
            }
            set
            {
                myDrawingMode = value;
                SetColors();
            }
        }
        private void SetColors()
        {
            switch (myDrawingMode)
            {
                case DrawingMode.Happy:
                    this.BackColor = Color.Yellow;
                    this.ForeColor = Color.Green;
                    break;
                case DrawingMode.Sad:
                    this.BackColor = Color.LightSlateGray;
                    this.ForeColor = Color.White;
                    break;
                case DrawingMode.Angry:
                    this.BackColor = Color.Red;
                    this.ForeColor = Color.Teal;
                    break;
                default:
                    this.BackColor = Color.Black;
                    this.ForeColor = Color.White;
                    break;
            }
        }

    }

}
