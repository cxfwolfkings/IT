using Aspose.Words;
using Aspose.Words.Saving;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SC.WebformSamples.Office
{
    public partial class _2_Word : System.Web.UI.Page
    {
        string html = "";

        protected void Page_Load(object sender, EventArgs e)
        {
            string contentCH = "<p>钢铁侠</p><p><img src=\"D:/Projects/Herbalife_Wechat/04 Project Coding/Resouse/Herbalife.WechatFoundation.Web.ManagementPortal/Upload/image/20181017/6367536397761586382356128.jpg\" alt=\"Penguins.jpg\"/></p>";
            string fileName = Server.MapPath("~/Office/1.html");
            html = new System.IO.StreamReader(fileName).ReadToEnd();
            html = html.Replace("{{titleCN}}", "钢铁侠").Replace("{{titleEN}}", "ironman").Replace("{{messageCover}}", "")
                .Replace("{{summaryCN}}", "钢铁侠钢铁侠").Replace("{{summaryEN}}", "ironmanironman").Replace("{{contentCN}}", contentCH)
                .Replace("{{contentCN}}", contentCH).Replace("{{isPraise}}", "是").Replace("{{isComment}}", "是");
        }

        protected void Button1_Click(object sender, EventArgs e)
        {        
            MemoryStream stream = new MemoryStream();
            StreamWriter writer = new StreamWriter(stream);
            writer.Write(html);
            writer.Flush();
            LoadOptions lo = new LoadOptions(LoadFormat.Html, null, null);
            Document doc = new Document(stream, lo);
            // 输出到浏览器
            doc.Save(Response, "钢铁侠.doc", ContentDisposition.Attachment, new DocSaveOptions(SaveFormat.Doc));
        }

        protected void Button2_Click(object sender, EventArgs e)
        {

        }

        protected void Button3_Click(object sender, EventArgs e)
        {
            Response.AppendHeader("Content-Disposition", "attachment;filename=钢铁侠.doc");
            Response.ContentType = "application/msword";
            Response.Charset = "utf-8";
            Response.Write(html);
            Response.End();
        }

        protected void Button4_Click(object sender, EventArgs e)
        {
            var Path = "D:\\File\\Test\\result2.doc"; // word文件保存路径
            StreamWriter sw = new StreamWriter(Path, false, Encoding.GetEncoding("utf-8"));
            sw.WriteLine(html);
            sw.Flush();
            sw.Close();
        }
    }
}