using Messages;
using NServiceBus;
using NServiceBus.Logging;
using System.Threading.Tasks;

namespace Shipping
{
    public class OrderBilledHandler : IHandleMessages<OrderBilled>
    {
        private static ILog log = LogManager.GetLogger<OrderBilledHandler>();

        /// <summary>
        /// 处理OrderBilled订阅事件
        /// </summary>
        /// <param name="message"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        public Task Handle(OrderBilled message, IMessageHandlerContext context)
        {
            log.Info($"Received OrderBilled, OrderId={message.OrderId} Should we ship now?");
            return Task.CompletedTask;
        }
    }
}
