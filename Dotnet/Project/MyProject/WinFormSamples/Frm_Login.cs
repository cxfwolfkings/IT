using System;
using System.Windows.Forms;

namespace Com.Colin.Win
{
    public partial class Frm_Logon : Form
    {
        public Frm_Logon()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            if (textBox1.Text == "wolfkings" && textBox2.Text == "5609757")
            {
                DialogResult = DialogResult.OK; // 将当前窗体的对话框返回值设为OK
                Close();
            }
            else
            {
                MessageBox.Show("用户名或密码错误。");
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }
    }
}
