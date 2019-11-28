using NVelocity;
using NVelocity.App;
using NVelocity.Runtime;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace Com.Colin.Web
{
    /// <summary>
    /// ashx要操作Session必须实现IRequiresSessionState接口
    /// </summary>
    public class LoginHandler: IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/html";

            string username = context.Request["username"];
            string password = context.Request["password"];
            if (string.IsNullOrEmpty(username) && string.IsNullOrEmpty(password))
            {
                VelocityEngine vltEngine = new VelocityEngine();
                vltEngine.SetProperty(RuntimeConstants.RESOURCE_LOADER, "file");
                // 模板文件所在的文件夹
                vltEngine.SetProperty(RuntimeConstants.FILE_RESOURCE_LOADER_PATH, System.Web.Hosting.HostingEnvironment.MapPath("~/Templates"));
                vltEngine.Init();

                VelocityContext vltContext = new VelocityContext();
                vltContext.Put("username", ""); // 设置参数，在模板中可以通过$data来引用
                vltContext.Put("password", "");
                vltContext.Put("msg", "");
                Template vltTemplate = vltEngine.GetTemplate("login.html");
                System.IO.StringWriter vltWriter = new System.IO.StringWriter();
                vltTemplate.Merge(vltContext, vltWriter);

                string html = vltWriter.GetStringBuilder().ToString();
                context.Response.Write(html);
            }
            else
            {
                if (username == "admin" && password == "123")
                {
                    // context.Response.Write("登录成功");
                    context.Session["Name"] = "照美冥";
                    context.Response.Redirect("Step01.ashx");
                }
                else
                {
                    VelocityEngine vltEngine = new VelocityEngine();
                    vltEngine.SetProperty(RuntimeConstants.RESOURCE_LOADER, "file");
                    vltEngine.SetProperty(RuntimeConstants.FILE_RESOURCE_LOADER_PATH, System.Web.Hosting.HostingEnvironment.MapPath("~/templates"));//模板文件所在的文件夹
                    vltEngine.Init();

                    VelocityContext vltContext = new VelocityContext();
                    vltContext.Put("username", username); // 设置参数，在模板中可以通过$data来引用
                    vltContext.Put("password", password);
                    vltContext.Put("msg", "用户名或者密码错误");

                    Template vltTemplate = vltEngine.GetTemplate("login.html");
                    System.IO.StringWriter vltWriter = new System.IO.StringWriter();
                    vltTemplate.Merge(vltContext, vltWriter);

                    string html = vltWriter.GetStringBuilder().ToString();
                    context.Response.Write(html);
                }
            }
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