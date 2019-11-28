<%@ WebHandler Language="C#" Class="Com.Colin.Web.Step03" %>

using System;
using System.Web;

namespace Com.Colin.Web
{
    /// <summary>
    /// Login 的摘要说明
    /// </summary>
    public class Step03 : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/html";
            string login = context.Request["Login"];
            if (string.IsNullOrEmpty(login))
            {
                HttpCookie cookie = context.Request.Cookies["UserName"];
                string username;
                if (cookie == null)
                {
                    username = "";
                }
                else
                {
                    username = cookie.Value;
                }
                var data = new { UserName = username };
                context.Response.Write(CommonHelper.RenderHtml("03.html", data, "Model"));
            }
            else
            {
                string username = context.Request["UserName"];
                HttpCookie cookie = new HttpCookie("UserName", username);
                cookie.Expires = DateTime.Now.AddDays(7);
                context.Response.SetCookie(cookie);
                context.Response.Redirect("Step04.ashx");
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
