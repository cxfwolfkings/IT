using Messages;
using NServiceBus;
using NServiceBus.Logging;
using System;
using System.Threading.Tasks;

namespace ClientConsole
{
    class Program
    {
        private static ILog log = LogManager.GetLogger<Program>();

        static void Main(string[] args)
        {
            MainAsync().GetAwaiter().GetResult();
        }


        static async Task RunAsync(IEndpointInstance endpointInstance)
        {
            log.Info("Press 'P' to place an order, press 'Q' to quit");
            while (true)
            {
                var key = Console.ReadKey();
                Console.WriteLine();
                switch (key.Key)
                {
                    case ConsoleKey.P:
                        {
                            var command = new PlaceOrder
                            {
                                OrderId = Guid.NewGuid().ToString()
                            };
                            log.Info($"Sending PlaceOrder with OrderId: {command.OrderId}");
                            // 发送到Sales端点
                            await endpointInstance.Send("Sales", command).ConfigureAwait(false);
                            break;
                        }
                    case ConsoleKey.Q:
                        return;
                    default:
                        log.Info("Please try again");
                        break;
                }
            }
        }

        static async Task MainAsync()
        {
            Console.Title = "Client-UI";
            // 设置端点名称
            var config = new EndpointConfiguration("ClientUI");
            // 设置消息管道模式，LearningTransport仅仅用来学习，生产慎用
            config.UseTransport<LearningTransport>();
            // 持久化
            config.UsePersistence<LearningPersistence>(); 
            var endpointInstance = await Endpoint.Start(config).ConfigureAwait(false);
            // RunAsync返回的是Task，所以这里使用ConfigureAwait()
            await RunAsync(endpointInstance).ConfigureAwait(false);
            await endpointInstance.Stop().ConfigureAwait(false);
        }
    }
}
