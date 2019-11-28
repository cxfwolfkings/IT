using Aspose.Cells;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SC.WebformSamples.Office
{
    public partial class _1_Excel : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            string contentCH = "<p>钢铁侠</p><p><img src=\"http://localhost:56876/upload/image/20181017/6367536397761586382356128.jpg\" alt=\"Penguins.jpg\"/></p>";
            string fileName = Server.MapPath("~/Office/1.html");
            string html = new System.IO.StreamReader(fileName).ReadToEnd();
            html = html.Replace("{{titleCN}}", "钢铁侠").Replace("{{titleEN}}", "ironman").Replace("{{messageCover}}", "")
                .Replace("{{summaryCN}}", "钢铁侠钢铁侠").Replace("{{summaryEN}}", "ironmanironman").Replace("{{contentCN}}", contentCH)
                .Replace("{{contentCN}}", contentCH).Replace("{{isPraise}}", "是").Replace("{{isComment}}", "是");
            MemoryStream stream = new MemoryStream();
            StreamWriter writer = new StreamWriter(stream);
            writer.Write(html);
            writer.Flush();
            LoadOptions lo = new LoadOptions(LoadFormat.Html);
            Workbook wb = new Workbook(stream, lo);
            // 输出到浏览器
            wb.Save(Response, "钢铁侠.xlsx", ContentDisposition.Attachment, new XlsSaveOptions(SaveFormat.Xlsx));
        }
    }
}
