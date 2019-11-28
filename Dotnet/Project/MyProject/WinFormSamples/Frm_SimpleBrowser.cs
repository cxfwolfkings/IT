using System.IO;
using System.Security.Permissions;
using System.Windows.Forms;

namespace Com.Colin.Win
{
    // 组件对象模型(COM)必须能够访问脚本对象,若要使窗体对 COM 可见，请将 ComVisibleAttribute 属性添加到窗体类中
    [PermissionSet(SecurityAction.Demand, Name = "FullTrust")]
    [System.Runtime.InteropServices.ComVisible(true)]
    public partial class Frm_SimpleBrowser : Form
    {
        public Frm_SimpleBrowser()
        {
            InitializeComponent();
            // 将 WebBrowser 控件的 AllowWebBrowserDrop 属性设置为 false，以防止 WebBrowser 控件打开拖放到其上的文件。
            webBrowser1.AllowWebBrowserDrop = false;
            // 将该控件的 IsWebBrowserContextMenuEnabled 属性设置为 false，以防止 WebBrowser 控件在用户右击它时显示其快捷菜单.
            webBrowser1.IsWebBrowserContextMenuEnabled = false;
            // 将该控件的 WebBrowserShortcutsEnabled 属性设置为 false，以防止 WebBrowser 控件响应快捷键。
            webBrowser1.WebBrowserShortcutsEnabled = false;
            // 将该控件的 ScriptErrorsSuppressed 属性设置为 true，以防止 WebBrowser 控件显示脚本代码问题的错误信息。
            webBrowser1.ScriptErrorsSuppressed = true;
            // 在窗体的构造函数或者 Load 事件处理程序中设置 ObjectForScripting 属性：将窗体类自身用于脚本对象
            webBrowser1.ObjectForScripting = this;
        }

        private void toolStripButton1_Click(object sender, System.EventArgs e)
        {
            webBrowser1.Document.InvokeScript("msgalert", new string[]{ "Called Javascript code"});
        }

        private void Btn_Click(object sender, HtmlElementEventArgs e)
        {
            MessageBox.Show("Fuck");
        }

        private void webBrowser1_DocumentCompleted(object sender, WebBrowserDocumentCompletedEventArgs e)
        {
            HtmlElement btn = webBrowser1.Document.GetElementById("btn_Test");
            btn.Click += Btn_Click;
        }

        public void ShowMessage(string msg)
        {
            MessageBox.Show(msg);
        }
        /// <summary>
        /// 通过WebBrowser控件获取网页内容
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="filePath"></param>
        private void GetWebContent3(object sender, string filePath)
        {
            WebBrowser web = (WebBrowser)sender;
            HtmlElementCollection ElementCollection = web.Document.GetElementsByTagName("table");
            foreach(HtmlElement item in ElementCollection)
            {
                File.AppendAllText(filePath, item.InnerText);
            }
        }
    }
}
