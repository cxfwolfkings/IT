using NServiceBus;
using System;
using System.Threading.Tasks;

namespace Shipping
{
    class Program
    {
        static async Task Main(string[] args)
        {
            Console.Title = "Shipping";

            var config = new EndpointConfiguration("Shipping");
            config.UseTransport<LearningTransport>();
            config.UsePersistence<LearningPersistence>();

            var endpointInstance = await Endpoint.Start(config).ConfigureAwait(false);

            Console.WriteLine("Press Enter to quit...");
            Console.ReadLine();

            await endpointInstance.Stop().ConfigureAwait(false);
        }
    }
}
