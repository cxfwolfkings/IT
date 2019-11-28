using System;
using System.Drawing;
using System.Windows.Forms;

namespace Com.Colin.Win.Customized
{
    public partial class DigitalClock : UserControl
    {
        public bool Timer1_Enabled
        {
            get
            {
                return timer1.Enabled;
            }
            set
            {
                timer1.Enabled = value;
            }
        }
        public Color LocalTimeLabelBackcolor
        {
            get
            {
                return LocalTimeLabel.BackColor;
            }
            set
            {
                LocalTimeLabel.BackColor = value;
            }
        }
        public event EventHandler RaiseTimer1_Tick;
        private void Timer1_Tick(object sender, EventArgs e)
        {
            LocalTimeLabel.Text = DateTime.Now.ToString();
            if (RaiseTimer1_Tick != null)
                RaiseTimer1_Tick(sender, e);
        }
        public DigitalClock()
        {
            InitializeComponent();
        }
    }
}
