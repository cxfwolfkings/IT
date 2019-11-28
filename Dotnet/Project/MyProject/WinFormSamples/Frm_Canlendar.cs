using System;
using System.Windows.Forms;

namespace Com.Colin.Win
{
    public partial class Frm_Canlendar : Form
    {
        public Frm_Canlendar()
        {
            InitializeComponent();
        }

        public static string Var_D = "";

        private void button1_Click(object sender, EventArgs e)
        {
            DialogResult = DialogResult.OK;
            Var_D = monthCalendar1.TodayDate.Date.ToString();
            Close();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            DialogResult = DialogResult.No;
            Close();
        }
    }
}
