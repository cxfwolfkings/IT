using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Com.Colin.Web
{
    public partial class Company : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        public string LabelBottomText
        {
            get
            {
                return LabelBottom.Text;
            }
            set
            {
                LabelBottom.Text = value;
            }
        }
    }
}