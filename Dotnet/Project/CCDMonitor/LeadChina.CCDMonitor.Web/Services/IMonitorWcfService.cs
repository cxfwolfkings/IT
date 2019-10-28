using LeadChina.CCDMonitor.Web.Models;
using System.ServiceModel;

namespace LeadChina.CCDMonitor.Web.Services
{
    /// <summary>
    /// 注意: 使用“重构”菜单上的“重命名”命令，可以同时更改代码和配置文件中的接口名“IMonitorWcfService”。
    /// </summary>
    [ServiceContract]
    public interface IMonitorWcfService
    {
        /// <summary>
        /// 生成图片文件，并存储数据库
        /// </summary>
        /// <param name="photo"></param>
        [OperationContract]
        void SavePhoto(SourceData photo);
    }
}
