using System.Windows.Forms;

namespace Com.Colin.Forms.MyControl
{
    public class MyButton : Button
    {
        public MyButton()
        {
        }

        protected override bool ShowFocusCues
        {
            get
            {
                return false;
            }
        }

    }
}
