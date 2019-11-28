using System;
using System.ServiceModel;
using System.ServiceModel.Channels;
using System.Threading.Tasks;

namespace Com.Colin.WcfService
{
    // 注意: 使用“重构”菜单上的“重命名”命令，可以同时更改代码、svc 和配置文件中的类名“Service1”。
    // 注意: 为了启动 WCF 测试客户端以测试此服务，请在解决方案资源管理器中选择 Service1.svc 或 Service1.svc.cs，然后开始调试。
    public class DemoService1 : IDemoService1
    {
        public string GetData(int value)
        {
            return string.Format("You entered: {0}", value);
        }

        public CompositeType GetDataUsingDataContract(CompositeType composite)
        {
            if (composite == null)
            {
                throw new ArgumentNullException("composite");
            }
            if (composite.BoolValue)
            {
                composite.StringValue += "Suffix";
            }
            return composite;
        }

        public async Task StartSendingMessages()
        {
            IDemoCallback callback = OperationContext.Current.GetCallbackChannel<IDemoCallback>();
            int loop = 0;
            while ((callback as IChannel).State == CommunicationState.Opened)
            {
                await callback.SendMessage(string.Format("Hello from the server {0}", loop++));
                await Task.Delay(1000);
            }
        }
    }
}
