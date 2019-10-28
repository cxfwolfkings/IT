using LeadChina.CCDMonitor.Web.ServiceReference1;
using System;

namespace LeadChina.CCDMonitor.Web.Clients
{
    /// <summary>
    /// 
    /// </summary>
    public class WCFInvoke
    {
        /// <summary>
        /// 你需要调用的服务契约
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="func"></param>
        /// <returns></returns>
        public static T Invoke<T>(Func<IMonitorWcfService, T> func)
        {
            IServiceInvoker serviceInvoker = new WCFServiceInvoker();
            return serviceInvoker.InvokeService(func);
        }
    }
}