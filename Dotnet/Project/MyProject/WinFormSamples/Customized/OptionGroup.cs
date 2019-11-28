/*
	Option Group control 
*/

using System;
using System.ComponentModel;
using System.Drawing;
using System.Windows.Forms;

namespace Com.Colin.Win.Customized
{
    /// <summary>
    /// OptionGroup Control 
    /// </summary>
    [ToolboxBitmap(typeof(OptionGroup))]
	[DefaultProperty("Value"), DefaultEvent("ValueChanged"),
	Designer(typeof(OptionGroupDesigner))]
	public class OptionGroup : System.Windows.Forms.GroupBox, ISupportInitialize  
	{

		private int value = 0;
		private int initvalue;
		private InitState initstate = InitState.Working;
		private bool settingvalue = false;

		public event EventHandler ValueChanged;

		public OptionGroup ()
		{
		}

		#region Properties 

		/// <summary>
		// Gets the number of options associated with the control 
		/// </summary>
		[Category("Appearance"), Description("Specifies the number of buttons in an OptionGroup")]
		public int ButtonCount
		{
			get
			{
				// Enumerate through all child controls and process only SelOption controls
				int count = 0;
				foreach (Control control1 in this.Controls)
				{
					if (control1 is SelOption)
					{
						count++;
					}
				}
				return count;
			}
		}

		/// <summary>
		/// Gets or sets the integer value assigned to the control
		/// </summary>
		[Description("Specifies the current state of a control"), Bindable(true), Category("Appearance")]
		public int Value
		{
			get {
				return this.value; 
			}

			set
			{
				// Check whether the initialization of an OptionGroup is over
                // after the EndInit method is called

				if (this.initstate != InitState.StartInit) 
				{
					bool lset = false;
					int oldvalue = this.value; 
					this.value = value;

					// Iterate over the Controls collection and search for a SelOption control that
                    // has Value property matching the new value 
					// And if the search is successful tick this option, 
					// otherwise only assign the new value to an OptionGroup

					try	
					{
						this.settingvalue = true;
						foreach (Control control1 in this.Controls)
						{
							if (control1 is SelOption)
							{
								SelOption option1 = (SelOption) control1;
								if (option1.Value == value && !lset)
								{
									option1.Checked  = true;
									lset = true;
								}
								else
								{
									option1.Checked  = false;
								}
							}
						}
						this.Invalidate();
						this.Update();

						// Raise the event only if initialization is over
						// and a different value is assigned 
						if (this.initstate == InitState.Working && this.value !=oldvalue)
							OnValueChanged(new EventArgs());

					}
					finally
					{
						this.settingvalue = false;
					}

				}
				else
				{
					// Store the value passed in when an OptionGroup is being initialized 
                    // and use it when the EndInit method being called.

					this.initvalue = value;
					this.value = value - 1;
				}
			}
		}

		/// <summary>
		/// Retrieve the currently selected option 
		/// </summary>
		[Browsable(false), Description("OptionGroup selected Item"), DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
		public object SelectedOption
		{
			get 
			{
				foreach (Control control1 in this.Controls)
				{
					if (control1 is SelOption)
					{
						SelOption option1 = (SelOption) control1;
						if (option1.Value == value)
							return option1;
					}
				}
				return null;
			}
		}

		#endregion

		#region Methods 

		/// <summary>
		/// Raises the ValueChanged event
		/// <\summary>
		protected virtual void OnValueChanged(EventArgs e)
		{
			if ( this.ValueChanged != null )
				this.ValueChanged(this, e);
		}

		/// <summary>
		// Begins the initialization of an OptionGroup
		/// </summary>
		public void BeginInit()
		{
			this.initstate = InitState.StartInit;
		}

		/// <summary>
		/// Ends of the OptionGroup initialization 
		/// now the new value can be safely assigned to the control 
		/// as all its SelOption controls have been created 
		/// and added to the Cantrols collection of an OptionGroup  
		/// </summary>

		public void EndInit()
		{
			this.initstate = InitState.FinishingInit;
			this.Value = this.initvalue;
			this.initstate = InitState.Working;
		}
	    
		/// <summary>
		/// Called when a child control is added to the control
		/// If an added control is a SelOption subscribes to its CheckedChanged event 
		/// </summary>
		protected override void OnControlAdded(ControlEventArgs e)
		{
			base.OnControlAdded(e);
			if (e.Control is SelOption)
			{
				SelOption option1 = (SelOption) e.Control;
				option1.CheckedChanged += new EventHandler(this.SelOption_CheckedChanged);
			}
		}

		/// <summary>
		/// This method is called when a child condrol is removed in Win Form Designer
		/// if a removed control is a SelOption discard the subscription to its CheckedChanged event
		/// </summary>
		protected override void OnControlRemoved(ControlEventArgs e)
		{
			base.OnControlRemoved(e);
			if (e.Control is SelOption)
			{
				SelOption option1 = (SelOption) e.Control;
				option1.CheckedChanged -= new EventHandler(this.SelOption_CheckedChanged);
			}
		}

		/// <summary>
		/// Handles the ChekedChanged event of a child SelOption control
		/// The event is handled only if the initialization of an OptionGroup is complete
		/// and if settingvalue is false it means that we do not come here as result of 
		/// setting Checked property in Value's setter.
		/// </summary>

		private void SelOption_CheckedChanged(object sender, EventArgs e)
		{
			if (sender is SelOption && this.initstate==InitState.Working
				&& !this.settingvalue )
			{
				SelOption option1 = (SelOption) sender;
				if (option1.Checked)
					this.Value = option1.Value;
			}
		}

		/// <summary>
		/// A helper method used by the OptionGroup designer to calculate the location
		/// of the first option
		/// </summary>
		internal int GetFontHeight()
		{
			return base.FontHeight / 2;
		}
		#endregion

		/// <summary>
		/// Indicates the current state of the control initialization
		/// </summary>
		private enum InitState
		{ 
			StartInit,
			FinishingInit,
			Working
		}		
	}
}
