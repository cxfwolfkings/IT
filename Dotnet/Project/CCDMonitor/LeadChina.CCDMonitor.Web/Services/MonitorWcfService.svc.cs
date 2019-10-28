using LeadChina.CCDMonitor.Web.Helper;
using LeadChina.CCDMonitor.Web.Models;

namespace LeadChina.CCDMonitor.Web.Services
{
    /// <summary>
    /// 注意: 使用“重构”菜单上的“重命名”命令，可以同时更改代码、svc 和配置文件中的类名“MonitorWcfService”。
    /// 注意: 为了启动 WCF 测试客户端以测试此服务，请在解决方案资源管理器中选择 MonitorWcfService.svc 或 MonitorWcfService.svc.cs，然后开始调试。
    /// </summary>
    public class MonitorWcfService : IMonitorWcfService
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="photo"></param>
        public void SavePhoto(SourceData photo)
        {
            FileHelper.StreamToFile(photo.ImageStream, "D:\\1.jpg");
        }
    }
}
