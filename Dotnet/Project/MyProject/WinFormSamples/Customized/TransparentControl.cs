using System.Drawing;
using System.Windows.Forms;

namespace Com.Colin.Win.Customized
{
    public partial class TransparentControl : UserControl
    {
        public TransparentControl()
        {
            InitializeComponent();
        }

        private void TransparencyButton_Paint(object sender, PaintEventArgs e)
        {
            this.BackColor = Color.Transparent;//使当前控件透明
        }
    }
}
