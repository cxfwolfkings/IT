using System;
using System.Windows.Forms;
using System.Workflow.Activities;

namespace DinnerNowActivityLibrary
{
    public partial class FryChickenActivity : SequenceActivity
    {
        public int Temperature { get; set; }

        public TimeSpan FryTime { get; set; }

        public FryChickenActivity()
        {
            InitializeComponent();
        }

        private void Fry(object sender, EventArgs e)
        {
            MessageBox.Show("Fry Chicken at" + Temperature + "with time" + FryTime.ToString());
            System.Threading.Thread.Sleep(3000);
            MessageBox.Show("Fry Chicken down");
        }
    }
}
