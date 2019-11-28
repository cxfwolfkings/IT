/*
	Designer for SelOption 
*/	

using System.Windows.Forms.Design;

namespace Com.Colin.Win.Customized
{
	public class SelOptionDesigner : ControlDesigner
	{				
		/// <summary>
		/// The control can not be moved outside from its parent container 
		/// But even after that the user can still drag and drop a control from toolbox 
		/// </summary>
		public override bool CanBeParentedTo(System.ComponentModel.Design.IDesigner parentDesigner)
		{
			return false;
		}
	}
}

