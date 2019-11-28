using Messages;
using NServiceBus;
using NServiceBus.Logging;
using System.Threading.Tasks;

namespace Billing
{
    public class OrderPlacedHandler : IHandleMessages<OrderPlaced>
    {
        static ILog log = LogManager.GetLogger<OrderPlacedHandler>();

        public Task Handle(OrderPlaced message, IMessageHandlerContext context)
        {
            // 订阅OrderPlaced事件
            log.Info($"Billing has received OrderPlaced, OrderId = {message.OrderId}");

            // 发布OrderBilled事件
            var order = new OrderBilled();
            order.OrderId = message.OrderId;
            return context.Publish(order);

            //return Task.CompletedTask;
        }
    }
}
