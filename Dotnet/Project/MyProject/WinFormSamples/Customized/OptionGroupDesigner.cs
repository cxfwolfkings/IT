/*
	Designer for the OptionGroup Control 
*/	

using System;
using System.ComponentModel;
using System.ComponentModel.Design;
using System.Drawing;
using System.Windows.Forms;
using System.Collections;
using System.Windows.Forms.Design;

namespace Com.Colin.Win.Customized
{
	/// <summary>
	/// OptionGroupDesigner extends the design mode behavior of an OptionGroup control
	/// </summary>
	public class OptionGroupDesigner : ParentControlDesigner
	{
		private DesignerVerbCollection dVerbs;
		private const int padding = 3;
		private OptionGroup myControl;

		public OptionGroupDesigner()
		{
			this.dVerbs = new DesignerVerbCollection();
		}

		/// <summary>
		/// Prevents any control from been moved on the OptionGroup’s surface 
		/// </summary>

		public override bool CanParent(Control control)
		{
			return false;
		}

		/// <summary>
		/// Prevents any control from been moved on the OptionGroup’s surface 
		/// </summary>
		public override bool CanParent(ControlDesigner controlDesigner)
		{
			return false;
		}


		/// <summary>
		/// Initializes the designer 
		/// Obtain the reference to an OptionGroup control this designer is associated with   
		/// </summary>
		public override void Initialize(IComponent component)
		{
			base.Initialize(component);
			this.myControl = (OptionGroup) component;
		}

		/// <summary>
		/// Creates a new SelOption and adds it to the control collection 
		/// </summary>

		private void OnAddOption(object sender, EventArgs e)
		{
			int m_x, m_y, m_ymax=0;
            SelOption selopt;
            int maxvalue = 0;
			bool firstoption = true;

			int toppadding =  myControl.GetFontHeight() + padding ;

			// Define the very lower-down child control 

			foreach (Control cnt in this.myControl.Controls)
			{
				if (cnt is SelOption)
				{
					m_ymax = Math.Max(m_ymax, cnt.Top + cnt.Height);
					selopt = (SelOption)cnt;
					maxvalue = Math.Max(selopt.Value, maxvalue);
                    firstoption = false;
				}
			}

			if (m_ymax == 0)
				m_ymax = toppadding;

			// Check if there is enough room below for a new control  

			if (this.myControl.ClientRectangle.Contains(padding, m_ymax + 4 * padding))
			{
				m_x = padding;
				m_y = m_ymax + padding;
			}
			else
			{
				// As no free space available at the bottom just place a new control in the up-left 
				m_y = 3 * padding + toppadding;
				m_x = 3 * padding;
			}

			SelOption seloption;

			// Get IDesignerHost service and wrap creation of a SelOption in transaction  

            IDesignerHost h = (IDesignerHost) this.GetService(typeof(IDesignerHost));
            IComponentChangeService c  = (IComponentChangeService) this.GetService(typeof(IComponentChangeService));
			DesignerTransaction dt;

			dt = h.CreateTransaction("Add Option");
			seloption = (SelOption) h.CreateComponent(typeof(SelOption));
			int i3=this.myControl.ButtonCount + 1;
			seloption.Text = "Option" + i3.ToString();
			seloption.Top = m_y;
			seloption.Left = m_x;

			// If this is the first SelOption added to an OptionGroup 
			// set its TabStop property to true. 
			// It causes the selection of this option when the user 
			// presses TAB key and none SelOption is checked. 

			if (firstoption) 
			   seloption.TabStop = true;

			seloption.Value = maxvalue + 1;
			c.OnComponentChanging(this.myControl, null);

			// If this is not the first option in an OptionGroup 
			// rearrange the controls collection, so that the new SelOption 
			// will be the first item of the controls collection. 
			// This imitates the Bring to Front method 

			if (this.myControl.Controls.Count > 0)
			{
				int count  = this.myControl.Controls.Count;
				Control[] controls = new Control[count + 1];
				controls[0] = seloption;
				this.myControl.Controls.CopyTo(controls, 1);
				this.myControl.Controls.Clear();
				this.myControl.Controls.AddRange(controls);
				int i1;
				count = this.myControl.Controls.Count - 1;
				for (i1 = 0; i1<=this.myControl.Controls.Count - 1; i1++)
				{
					this.myControl.Controls[i1].TabIndex = count - i1;
				}
			}
			else
			{
				this.myControl.Controls.Add(seloption);
			}

			c.OnComponentChanged(this.myControl, null, null, null);
			dt.Commit();
		}

		/// <summary>
		/// Removes a SelOption from the OptionGroup 
		/// </summary>

		private void OnRemoveOption(SelOption seloption)
		{
			IDesignerHost h = (IDesignerHost) this.GetService(typeof(IDesignerHost));
			IComponentChangeService c = (IComponentChangeService) this.GetService(typeof(IComponentChangeService));
			DesignerTransaction dt = h.CreateTransaction("Remove Option");
			c.OnComponentChanging(this.myControl, null);
			h.DestroyComponent(seloption);
			this.myControl.Controls.Remove(seloption);
			c.OnComponentChanged(this.myControl, null, null, null);
			dt.Commit();
		}

		/// <summary>
		/// Sets the default properties for on OptionGroup
		/// and adds two SelOptions to a new OptionGroup 
		/// after it being instanced in the Win Form designer
		/// </summary>

		public override void OnSetComponentDefaults()
		{
			this.OnAddOption(this, new EventArgs());
			this.OnAddOption(this, new EventArgs());
		}

		/// <summary>
		/// Hides the ButtonCount property of an OptionGroup and activates 
		/// the design-time only property defined in the designer 
		/// </summary>

		protected override void PreFilterProperties(IDictionary properties)
		{
			base.PreFilterProperties(properties);
			Attribute[] attributeArray1 = new Attribute[] { CategoryAttribute.Appearance };
			properties["ButtonCount"] = TypeDescriptor.CreateProperty(typeof(OptionGroupDesigner), "ButtonCount", typeof(int), attributeArray1);
		}
 
		/// <summary>
		/// Gets/sets a number of options this control hosts
		/// </summary>
		[DesignOnly(true)]
		public int ButtonCount
		{
			get
			{
				// Call the original OptionGroup property 

				if (this.myControl != null)
					return this.myControl.ButtonCount;
				return 0;
			}
			set
			{
				// Add new options to an OptionGroup or delete existing 
				IDesignerHost h = (IDesignerHost) this.GetService(typeof(IDesignerHost));
				if (h != null && !h.Loading)
				{
					if (value < 0)
						throw new ArgumentException("Illigal value for this property");

					if (this.myControl.ButtonCount != value)
					{
						int i1;

						// The new value is grater then the number of options, 
						// so create new options and add them to an OptionGroup

						if (value > this.myControl.ButtonCount)
						{
							for (i1 = this.myControl.ButtonCount + 1; i1 <= value; i1++)
								this.OnAddOption(this, new EventArgs());
						}
						else
						{
							// The new value is less then the number of options, 
							// so delete options from a Option Group
							// The deletion starts with the first item in the Controls collection - the last  added 

							int count = this.myControl.ButtonCount - value;
							SelOption seloption;
							do
							{
								seloption = null;
								for (i1 = 0; i1 <= this.myControl.Controls.Count - 1; i1++)
								{
									if (this.myControl.Controls[i1] is SelOption)
									{
										seloption = (SelOption) this.myControl.Controls[i1];
										break;
									}
								}

								if (seloption != null)
								{
									this.OnRemoveOption(seloption);
									count--;
								}
								else
									break;
							}
							while (count > 0);
						}
					}
				}
			}
		}

		/// <summary>
		/// Adds a new item to the context menu of an OptionGroup
		/// </summary>

		public override DesignerVerbCollection Verbs
		{
			get
			{
				DesignerVerbCollection v = new DesignerVerbCollection();
				v.Add(new DesignerVerb("&Add Option", new EventHandler(this.OnAddOption)));
				return v;
			}
		}
	}
}
