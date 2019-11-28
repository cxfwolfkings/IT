using System.Workflow.Activities;

namespace DinnerNowWorkflowLibrary
{
    partial class FryChickenWorkflow
	{
		#region Designer generated code
		
		/// <summary> 
		/// Required method for Designer support - do not modify 
		/// the contents of this method with the code editor.
		/// </summary>
        [System.Diagnostics.DebuggerNonUserCode]
		private void InitializeComponent()
		{
            this.CanModifyActivities = true;
            System.Workflow.Activities.CodeCondition codecondition1 = new System.Workflow.Activities.CodeCondition();
            this.codeActivity2 = new System.Workflow.Activities.CodeActivity();
            this.codeActivity1 = new System.Workflow.Activities.CodeActivity();
            this.ifElseBranchActivity2 = new System.Workflow.Activities.IfElseBranchActivity();
            this.ifElseBranchActivity1 = new System.Workflow.Activities.IfElseBranchActivity();
            this.codeActivity3 = new System.Workflow.Activities.CodeActivity();
            this.ifElseActivity1 = new System.Workflow.Activities.IfElseActivity();
            this.fryChickenActivity1 = new DinnerNowActivityLibrary.FryChickenActivity();
            this.prepareChickenActivity1 = new DinnerNowActivityLibrary.PrepareChickenActivity();
            // 
            // codeActivity2
            // 
            this.codeActivity2.Name = "codeActivity2";
            this.codeActivity2.ExecuteCode += new System.EventHandler(this.CookType2);
            // 
            // codeActivity1
            // 
            this.codeActivity1.Name = "codeActivity1";
            this.codeActivity1.ExecuteCode += new System.EventHandler(this.CookType1);
            // 
            // ifElseBranchActivity2
            // 
            this.ifElseBranchActivity2.Activities.Add(this.codeActivity2);
            this.ifElseBranchActivity2.Name = "ifElseBranchActivity2";
            // 
            // ifElseBranchActivity1
            // 
            this.ifElseBranchActivity1.Activities.Add(this.codeActivity1);
            codecondition1.Condition += new System.EventHandler<System.Workflow.Activities.ConditionalEventArgs>(this.IsType1);
            this.ifElseBranchActivity1.Condition = codecondition1;
            this.ifElseBranchActivity1.Name = "ifElseBranchActivity1";
            // 
            // codeActivity3
            // 
            this.codeActivity3.Name = "codeActivity3";
            this.codeActivity3.ExecuteCode += new System.EventHandler(this.Package);
            // 
            // ifElseActivity1
            // 
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity1);
            this.ifElseActivity1.Activities.Add(this.ifElseBranchActivity2);
            this.ifElseActivity1.Name = "ifElseActivity1";
            // 
            // fryChickenActivity1
            // 
            this.fryChickenActivity1.FryTime = System.TimeSpan.Parse("00:05:30");
            this.fryChickenActivity1.Name = "fryChickenActivity1";
            this.fryChickenActivity1.Temperature = 95;
            // 
            // prepareChickenActivity1
            // 
            this.prepareChickenActivity1.CookerName = "HUI";
            this.prepareChickenActivity1.Name = "prepareChickenActivity1";
            // 
            // FryChickenWorkflow
            // 
            this.Activities.Add(this.prepareChickenActivity1);
            this.Activities.Add(this.fryChickenActivity1);
            this.Activities.Add(this.ifElseActivity1);
            this.Activities.Add(this.codeActivity3);
            this.Name = "FryChickenWorkflow";
            this.CanModifyActivities = false;

		}

		#endregion

        private DinnerNowActivityLibrary.FryChickenActivity fryChickenActivity1;
        private IfElseBranchActivity ifElseBranchActivity2;
        private IfElseBranchActivity ifElseBranchActivity1;
        private IfElseActivity ifElseActivity1;
        private CodeActivity codeActivity2;
        private CodeActivity codeActivity1;
        private CodeActivity codeActivity3;
        private DinnerNowActivityLibrary.PrepareChickenActivity prepareChickenActivity1;
    }
}
