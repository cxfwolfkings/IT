using System.ComponentModel;
using System.Windows.Forms;

namespace Com.Colin.Win.Customized
{
    public class MyControl:Control
    {
        private License license = null;
        public MyControl()
        {
            license = LicenseManager.Validate(typeof(MyControl), this);
        }
        protected override void Dispose(bool disposing)
        {
            if (Disposing)
            {
                if (license != null)
                {
                    license.Dispose();
                    license = null;
                }
            }
            base.Dispose(Disposing);
        }
        ~MyControl()
        {
            Dispose();
        }
    }
}
