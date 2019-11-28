<%@ WebHandler Language="C#" Class="Com.Colin.Web.Step02" %>

using System.Collections.Generic;
using System.Web;
using NVelocity.App;
using NVelocity.Runtime;
using NVelocity;

namespace Com.Colin.Web
{
    /// <summary>
    /// Login3 的摘要说明
    /// </summary>
    public class Step02 : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/html";
            Dictionary<string, string> dict = new Dictionary<string, string>();
            dict["tom"] = "斯坦福";
            dict["jim"] = "加里敦";
            dict["yzk"] = "哈佛";

            VelocityEngine vltEngine = new VelocityEngine();
            vltEngine.SetProperty(RuntimeConstants.RESOURCE_LOADER, "file");
            vltEngine.SetProperty(RuntimeConstants.FILE_RESOURCE_LOADER_PATH, System.Web.Hosting.HostingEnvironment.MapPath("~/Templates"));//模板文件所在的文件夹
            vltEngine.Init();

            string[] strs = new string[] { "杨中科", "刘德华","阿信" };
            List<Person> persons = new List<Person>();
            persons.Add(new Person { Age = 30, Name = "杨中科" });
            persons.Add(new Person { Age = 10, Name = "王二小" });
            persons.Add(new Person { Age = 50, Name = "周扒皮" });

            Person p = new Person();
            p.Age = 30;
            p.Name = "yzk";
            
            VelocityContext vltContext = new VelocityContext();
            vltContext.Put("ps", dict); // 设置参数，在模板中可以通过$data来引用
            vltContext.Put("mingrens", strs);
            vltContext.Put("persons", persons);
            vltContext.Put("person",p);
            vltContext.Put("age", 3);    

            Template vltTemplate = vltEngine.GetTemplate("02.html");
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