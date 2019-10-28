using System;
using System.ServiceModel;
using System.ServiceModel.Channels;

namespace LeadChina.CCDMonitor.Web.Clients
{
    /// <summary>
    /// 
    /// </summary>
    public class WcfInvokeFactory
    {
        #region WCF服务工厂

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="url"></param>
        /// <returns></returns>
        public static T CreateServiceByUrl<T>(string url)
        {
            return CreateServiceByUrl<T>(url, "basicHttpBinding");
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="url"></param>
        /// <param name="bing"></param>
        /// <returns></returns>
        public static T CreateServiceByUrl<T>(string url, string bing)
        {
            try
            {
                if (string.IsNullOrEmpty(url)) throw new NotSupportedException("This url is not Null or Empty!");
                EndpointAddress address = new EndpointAddress(url);
                Binding binding = CreateBinding(bing);
                ChannelFactory<T> factory = new ChannelFactory<T>(binding, address);
                return factory.CreateChannel();
            }
            catch (Exception ex)
            {
                throw new Exception("创建服务工厂出现异常.");
            }
        }

        #endregion

        #region 创建传输协议

        /// <summary>
        /// 创建传输协议
        /// </summary>
        /// <param name="binding">传输协议名称</param>
        /// <returns></returns>
        private static Binding CreateBinding(string binding)
        {
            Binding bindinginstance = null;
            if (binding.ToLower() == "basichttpbinding")
            {
                BasicHttpBinding ws = new BasicHttpBinding();
                ws.MaxBufferSize = 2147483647;
                ws.MaxBufferPoolSize = 2147483647;
                ws.MaxReceivedMessageSize = 2147483647;
                ws.ReaderQuotas.MaxStringContentLength = 2147483647;
                ws.CloseTimeout = new TimeSpan(0, 30, 0);
                ws.OpenTimeout = new TimeSpan(0, 30, 0);
                ws.ReceiveTimeout = new TimeSpan(0, 30, 0);
                ws.SendTimeout = new TimeSpan(0, 30, 0);

                bindinginstance = ws;
            }
            else if (binding.ToLower() == "nettcpbinding")
            {
                NetTcpBinding ws = new NetTcpBinding();
                ws.MaxReceivedMessageSize = 65535000;
                ws.Security.Mode = SecurityMode.None;
                bindinginstance = ws;
            }
            else if (binding.ToLower() == "wshttpbinding")
            {
                WSHttpBinding ws = new WSHttpBinding(SecurityMode.None);
                ws.MaxReceivedMessageSize = 65535000;
                ws.Security.Message.ClientCredentialType = MessageCredentialType.Windows;
                ws.Security.Transport.ClientCredentialType = HttpClientCredentialType.Windows;
                bindinginstance = ws;
            }
            return bindinginstance;
        }

        #endregion
    }
}