using System;
using System.Threading;
using System.Windows.Forms;
using System.Workflow.Runtime;

namespace TestWorkFlow
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            
        }

        private void button1_Click(object sender, EventArgs e)
        {
            using (WorkflowRuntime workflowruntime = new WorkflowRuntime())
            {
                AutoResetEvent waitHandle = new AutoResetEvent(false);
                workflowruntime.WorkflowCompleted += delegate(object sender1, WorkflowCompletedEventArgs e1) { waitHandle.Set(); };
                workflowruntime.WorkflowTerminated += delegate(object sender1, WorkflowTerminatedEventArgs e1)
                {
                    Console.WriteLine(e1.Exception.Message);
                    waitHandle.Set();
                };
                WorkflowInstance instance = workflowruntime.CreateWorkflow(typeof(DinnerNowWorkflowLibrary.FryChickenWorkflow));
                instance.Start();
                waitHandle.WaitOne();
                //workflowruntime.WorkflowAborted += new EventHandler<WorkflowEventArgs>(workflowruntime_WorkflowAborted);
            }
        }

        //void workflowruntime_WorkflowAborted(object sender, WorkflowEventArgs e)
        //{
        //    //throw new Exception("The method or operation is not implemented.");
        //    MessageBox.Show("Aborted");
        //}

        //void workflowruntime_WorkflowTerminated(object sender, WorkflowTerminatedEventArgs e)
        //{
        //    //throw new Exception("The method or operation is not implemented.");
        //    MessageBox.Show("Teminated");
        //}

        //void workflowruntime_WorkflowCompleted(object sender, WorkflowCompletedEventArgs e)
        //{
        //    WaitHandle
        //    MessageBox.Show("Workfry complete!");
        //}
    }
}