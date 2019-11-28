using System;
using System.Windows.Forms;
using System.Workflow.Activities;

namespace DinnerNowWorkflowLibrary
{
    public sealed partial class FryChickenWorkflow : SequentialWorkflowActivity
    {
        public FryChickenWorkflow()
        {
            InitializeComponent();
        }

        private void IsType1(object sender, ConditionalEventArgs e)
        {
            e.Result = true;
        }

        private void CookType1(object sender, EventArgs e)
        {
            MessageBox.Show("Cooking Type1");
        }

        private void CookType2(object sender, EventArgs e)
        {
            MessageBox.Show("Cooking Type2");
        }

        private void Package(object sender, EventArgs e)
        {
            MessageBox.Show("Package");
        }
    }

}
