using System.ServiceModel;

namespace Com.Colin.WcfServiceLibrary
{
    public interface IMyMessageCallback
    {
        [OperationContract(IsOneWay = true)]
        void OnCallback(string message);
    }

    [ServiceContract(CallbackContract = typeof(IMyMessageCallback))]
    public interface IMyMessage
    {
        [OperationContract]
        void MessageToServer(string message);
    }
}
