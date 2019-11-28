using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Com.Colin.BBS
{
    /// <summary>
    /// 下面的实例验证请求是否来自IP地址的预定义列表
    /// </summary>
    public class ModuleDemo1: IHttpModule
    {
        /// <summary>
        /// 您将需要在网站的 Web.config 文件中配置此模块
        /// 并向 IIS 注册它，然后才能使用它。有关详细信息，
        /// 请参阅以下链接: https://go.microsoft.com/?linkid=8101007
        /// </summary>
        #region IHttpModule Members

        private const string allowedAddressesFile = "AllowedAddresses.txt";
        private List<string> allowedAddresses;
        
        public void Dispose()
        {
            //此处放置清除代码。
        }

        public void Init(HttpApplication context)
        {
            // 下面是如何处理 LogRequest 事件并为其 
            // 提供自定义日志记录实现的示例
            context.LogRequest += new EventHandler(OnLogRequest);
            context.PreRequestHandlerExecute += PreRequestHandlerExecute;
            context.BeginRequest += BeginRequest;
        }

        #endregion

        private void BeginRequest(object sender, EventArgs e)
        {
            LoadAddresses((sender as HttpApplication).Context);
        }

        private void LoadAddresses(HttpContext context)
        {
            if (allowedAddresses == null)
            {
                string path = context.Server.MapPath(allowedAddressesFile);
                allowedAddresses = File.ReadAllLines(path).ToList();

            }
        }

        private void PreRequestHandlerExecute(object sender, EventArgs e)
        {
            HttpApplication app = sender as HttpApplication;
            HttpRequest req = app.Context.Request;
            if (!allowedAddresses.Contains(req.UserHostAddress))
            {
                throw new HttpException(403, "IP address denied");
            }
        }

        public void OnLogRequest(Object source, EventArgs e)
        {
            //可以在此处放置自定义日志记录逻辑
        }
    }
}
