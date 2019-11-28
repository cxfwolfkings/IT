using Com.Colin.Forms.Properties;
using System.Drawing;
using System.Windows.Forms;

namespace Com.Colin.Forms.Template
{
    public partial class TableTemplate : UserControl
    {
        public TableTemplate()
        {
            InitializeComponent();
            //tabControl1.DrawMode = TabDrawMode.OwnerDrawFixed;
            tabControl1.ItemSize = new Size((int)(tabControl1.Size.Width * 0.45), 24);
        }

        private void button1_Click(object sender, System.EventArgs e)
        {
            Button button = (Button)sender;
            string value = button.Text;
            if (value.Equals("查看记录"))
            {
                button.Text = "停止检测";
            }
            else
            {
                button.Text = "查看记录";
            }
        }
    }
}
