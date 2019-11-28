using System;
using System.Windows.Forms;
using System.Workflow.Activities;

namespace DinnerNowActivityLibrary
{
    public partial class PrepareChickenActivity : SequenceActivity
    {
        public string CookerName { get; set; }

        public PrepareChickenActivity()
        {
            InitializeComponent();
        }

        private void PrepareChicken(object sender, EventArgs e)
        {
            System.Threading.Thread.Sleep(1000);
            MessageBox.Show("Chicken Prepared");
        }

        private void PrepareOther(object sender, EventArgs e)
        {
            System.Threading.Thread.Sleep(1000);
            MessageBox.Show("Others Prepared");
        }
    }
}
