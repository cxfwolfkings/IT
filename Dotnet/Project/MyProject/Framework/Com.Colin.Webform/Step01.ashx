<%@ WebHandler Language="C#" Class="Com.Colin.Web.Step01" %>

using System.Web;
using NVelocity.App;
using NVelocity.Runtime;
using NVelocity;

namespace Com.Colin.Web
{
    /// <summary>
    /// Login2 的摘要说明
    /// </summary>
    public class Step01 : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/html";

            Person person = new Person();
            person.Name = "漩涡鸣人";
            person.Age = 30;

            Person dad = new Person();
            dad.Name = "波风水门";
            dad.Age = 60;

            person.Father = dad;

            VelocityEngine vltEngine = new VelocityEngine();
            vltEngine.SetProperty(RuntimeConstants.RESOURCE_LOADER, "file");
            // 模板文件所在的文件夹
            vltEngine.SetProperty(RuntimeConstants.FILE_RESOURCE_LOADER_PATH, System.Web.Hosting.HostingEnvironment.MapPath("~/Templates"));
            vltEngine.Init();

            VelocityContext vltContext = new VelocityContext();
            // 设置参数，在模板中可以通过$data来引用 
            vltContext.Put("p", person);
            Template vltTemplate = vltEngine.GetTemplate("01.html");
            System.IO.StringWriter vltWriter = new System.IO.StringWriter();
            vltTemplate.Merge(vltContext, vltWriter);

            string html = vltWriter.GetStringBuilder().ToString();
            context.Response.Write(html);
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}