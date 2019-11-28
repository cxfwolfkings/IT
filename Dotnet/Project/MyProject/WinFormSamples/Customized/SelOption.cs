/*
	SelOption Control represents an option in the Option Group control 
*/

using System;
using System.ComponentModel;
using System.Windows.Forms;

namespace Com.Colin.Win.Customized
{
    /// <summary>
    /// SelOption control represents an option of the OptionGroup Control
    /// </summary>
    [DefaultProperty("Value"),  Designer(typeof(SelOptionDesigner)),    
	DefaultEvent("CheckedChanged"), ToolboxItem(false)]
	public class SelOption : System.Windows.Forms.RadioButton 
	{
		private int optionValue;
        public new event EventHandler Enter;

		public SelOption()
		{
		}

		/// <summary>
		/// Get/set value associated with this option 
		/// when this option is checked its value becomes the Value of an OptionGrid
		/// this option is a child of the Radio Button control
		/// </summary>
		[Description("Specifies the value associated with this option"),
		Category("Appearence")]
		public int Value
		{
			get	
			{
				return this.optionValue;
			}
			set	
			{
				// Check for duplicate values 
                // This is performed only at the design time
				// If duplicate value found throw exception
				int oldvalue = this.optionValue;


				if (this.DesignMode && this.Parent != null && this.Parent.Controls.Count > 0)
				{
					foreach (Control cnt in this.Parent.Controls) 
					{
						if (cnt is SelOption) 
						{
							SelOption selopt = (SelOption) cnt;
							if ((this != selopt) && (value == selopt.Value))
								throw new ArgumentException("Duplicate Value");
						
						}
					}
				}
				this.optionValue = value;

				if (oldvalue != value)
				{
					if (this.Checked) 
					{
						this.Checked = false;
					}
					else
					{
						if (this.Parent !=null && this.Parent is OptionGroup && ((OptionGroup) this.Parent) .Value == value)
						{
							this.Checked =true;
						}
					}
				}
			}
		}

		/// <summary>
		/// Just give a string representation if someone desides to retreive 
		/// </summary>
		public override string ToString()
		{
			string str1 = base.ToString();
			return (str1 + ", Checked: " + this.Checked.ToString());
		}		
	
	
		/// <summary>
		/// Hide the AutoCheck property as it causes undesired behavior of the OptionGroup control
		/// </summary>
		protected new bool AutoCheck
		{
			get { return base.AutoCheck; }
			set 
			{
				base.AutoCheck=value;
			}
		}

		/// <summary>
		/// Reintroduce the OnEnter method that does not perform click when a key pressed 
		/// </summary>
		protected override void OnEnter(EventArgs e)
		{
			if ( this.Enter != null )
				this.Enter(this, e);
		}
	}
}
