using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;

public partial class pageValidator_Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
		string ls_user = Request.QueryString["test1"];
		if(ls_user=="maodong")
			Response.Write("1");
		else
			Response.Write("0");
        //Random rand = new Random();
        //int li_rand = rand.Next();

        //Response.Write(mod(li_rand));
        Response.End();
        return;
    }

    public int mod(int num1)
    {
        return num1 - (2 * (num1 / 2));
    }
}
