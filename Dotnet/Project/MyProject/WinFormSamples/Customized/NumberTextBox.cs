using System.Windows.Forms;

namespace Com.Colin.Win.Customized
{
    public partial class NumberTextBox : TextBox
    {
        public NumberTextBox()
        {
            InitializeComponent();
        }

        private void E_TextBox_KeyDown(object sender, KeyEventArgs e)
        {

        }

        private void E_TextBox_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (!((e.KeyChar <= 'z' && e.KeyChar >= 'a') || (e.KeyChar <= 'Z' && e.KeyChar >= 'A') || e.KeyChar == '\b' || e.KeyChar == '\r'))//如果输入的数字
            {
                e.Handled = true;//处理KeyPress事件
            }
        }
    }
}
