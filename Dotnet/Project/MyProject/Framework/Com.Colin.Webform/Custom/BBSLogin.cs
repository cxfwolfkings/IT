using System;
using System.ComponentModel;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Com.Colin.Web
{
    /// <summary>
    /// Summary description for LoginControl
    /// </summary>
    [DefaultProperty("Text")]
    [ToolboxData("<{0}:BBSLogin runat=server></{0}:BBSLogin>")]
    public class BBSLogin: WebControl
    {
        //创建服务器控件
        public TextBox NameTextBox = new TextBox();
        public TextBox PasswordTextBox = new TextBox();
        public Button LoginButton = new Button();

        public event EventHandler LoginClick;

        [Bindable(true)]
        [Category("Appearance")]
        [DefaultValue("")]
        [Localizable(true)]
        public string Text
        {
            get
            {
                string s = (string)ViewState["Text"];
                return ((s == null) ? "[" + ID + "]" : s);
            }

            set
            {
                ViewState["Text"] = value;
            }
        }

        [Bindable(true)]
        [Category("Appearance")]
        [DefaultValue("")]
        [Localizable(true)]
        public string LoignBackGroundColor
        {
            get { return (string)ViewState["LoignBackGroundColor"]; }
            set { ViewState["LoignBackGroundColor"] = value; }
        }

        [Bindable(true)]
        [Category("Appearance")]
        [DefaultValue("")]
        [Localizable(true)]
        public string LoginBorderWidth
        {
            get { return (string)ViewState["LoginBorderWidth"]; }
            set { ViewState["LoginBorderWidth"] = value; }
        }

        [Bindable(true)]
        [Category("Appearance")]
        [DefaultValue("")]
        [Localizable(true)]
        public string LoginPadding
        {
            get { return (string)ViewState["LoginPadding"]; }
            set { ViewState["LoginPadding"] = value; }
        }

        [Bindable(true)]
        [Category("Appearance")]
        [DefaultValue("")]
        [Localizable(true)]
        public string LoginInformation
        {
            get { return (string)ViewState["LoginInformation"]; }
            set { ViewState["LoginInformation"] = value; }
        }

        [Bindable(true)]
        [Category("Appearance")]
        [DefaultValue("")]
        [Localizable(true)]
        public string ResignURL
        {
            get { return (string)ViewState["ResignURL"]; }
            set { ViewState["ResignURL"] = value; }
        }

        public void Submit_Click(object sender, EventArgs e)
        {
            EventArgs arg = new EventArgs();
            LoginClick?.Invoke(LoginButton, arg);
        }

        protected override void RenderContents(HtmlTextWriter output)
        {
            output.RenderBeginTag(HtmlTextWriterTag.Div);
            output.RenderBeginTag(HtmlTextWriterTag.Tr);
            NameTextBox.RenderControl(output);
            output.RenderBeginTag(HtmlTextWriterTag.Td);
            output.RenderBeginTag(HtmlTextWriterTag.Br);
            output.RenderBeginTag(HtmlTextWriterTag.Tr);
            PasswordTextBox.RenderControl(output);
            output.RenderBeginTag(HtmlTextWriterTag.Td);
        }
    }
}
