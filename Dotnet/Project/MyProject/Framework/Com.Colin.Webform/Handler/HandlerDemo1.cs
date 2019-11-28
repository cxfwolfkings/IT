using System;
using System.Web;

namespace Com.Colin.Web
{
    public class HandlerDemo1: IHttpHandler
    {
        /// <summary>
        /// 您将需要在网站的 Web.config 文件中配置此处理程序 
        /// 并向 IIS 注册它，然后才能使用它。有关详细信息，
        /// 请参阅以下链接: https://go.microsoft.com/?linkid=8101007
        /// </summary>
        #region IHttpHandler Members

        private string responseString = @"
                                        <!DOCTYPE HTML>
                                        <html>
                                        <head>
                                          <meta charset=""UTF-8"">
                                          <title>Sample Handler</title>
                                        </head>
                                        <body>
                                          <h1>Hello from the custom handler</h1>
                                          <div>{0}</div>
                                        </body>
                                        </html>";

        public bool IsReusable
        {
            // 如果无法为其他请求重用托管处理程序，则返回 false。
            // 如果按请求保留某些状态信息，则通常这将为 false。
            get { return true; }
        }

        public void ProcessRequest(HttpContext context)
        {
            //在此处写入您的处理程序实现。
            HttpRequest request = context.Request;
            HttpResponse response = context.Response;
            response.ContentType = "text/html";
            response.Write(string.Format(responseString, request.UserAgent));
        }

        #endregion
    }
}