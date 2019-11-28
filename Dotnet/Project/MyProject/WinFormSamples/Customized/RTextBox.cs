using System.ComponentModel;
using System.Windows.Forms;

namespace Com.Colin.Win.Customized
{
    public partial class RTextBox : TextBox
    {
        public RTextBox()
        {
            InitializeComponent();
        }

        string strleng = "";
        private int TDigit = 10;

        [Browsable(true), Category("限定位数文本框"), Description("位数设置")]
        public int Digit
        {
            get { return TDigit; }
            set
            {
                TDigit = value;
            }
        }

        private void R_TextBox_KeyPress(object sender, KeyPressEventArgs e)
        {
            strleng = Text + e.KeyChar.ToString();
            if (strleng.Length > Digit)
            {
                if (this.SelectedText.Length == 0)
                    e.Handled = true;
            }
        }
    }
}
