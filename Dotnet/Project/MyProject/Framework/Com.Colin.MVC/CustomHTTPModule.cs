using System;
using System.Web;

namespace Com.Colin.UI
{
    /// <summary>
    /// 演示如何创建自定义 HTTP 模块以及如何将事件连接到该模块
    /// 该示例演示如何创建自定义 HTTP 模块并将 AcquireRequestState 事件连接到该 HTTP 模块。
    /// HTTP 模块将截获对 Web 应用程序资源的所有请求，从而使您可以筛选客户端请求。
    /// 预订 HttpApplication 事件的任何 HTTP 模块都必须实现 IHttpModule 接口。
    /// 在自定义 HTTP 模块中的事件可以发生之前，必须先修改 Web.config 文件中的配置设置，通知 ASP.NET 有关该 HTTP 模块的信息。
    /// </summary>
    public class CustomHTTPModule : IHttpModule
    {
        public CustomHTTPModule()
        {
            // Class constructor.
        }

        public void Dispose()
        {
            // Add code to clean up the instance variables of a module.
        }

        // Classes that inherit IHttpModule must implement the Init and Dispose methods.
        public void Init(HttpApplication context)
        {
            context.AcquireRequestState += new EventHandler(app_AcquireRequestState);
            context.PostAcquireRequestState += new EventHandler(app_PostAcquireRequestState);
        }

        // Define a custom AcquireRequestState event handler.
        public void app_AcquireRequestState(object o, EventArgs ea)
        {
            HttpApplication httpApp = (HttpApplication)o;
            HttpContext ctx = HttpContext.Current;
            ctx.Response.Write(" Executing AcquireRequestState ");
        }

        // Define a custom PostAcquireRequestState event handler.
        public void app_PostAcquireRequestState(object o, EventArgs ea)
        {
            HttpApplication httpApp = (HttpApplication)o;
            HttpContext ctx = HttpContext.Current;
            ctx.Response.Write(" Executing PostAcquireRequestState ");
        }
    }
}