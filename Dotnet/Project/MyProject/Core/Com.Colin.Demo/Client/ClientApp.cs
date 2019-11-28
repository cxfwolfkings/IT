using DemoService;
using System;
using System.Collections.Generic;
using System.ServiceModel;
using System.Text;

namespace Com.Colin.Demo.Client
{
    public class ClientApp
    {
        private class CallbackHandler : IDemoCallback
        {
            public void SendMessage(string message)
            {
                Console.WriteLine("message from the server {0}", message);
            }
        }

        static void Main(string[] args)
        {
            Console.WriteLine("client... wait for the server");
            Console.ReadLine();
            StartSendRequest();
            Console.WriteLine("next return to exit");
            Console.ReadLine();
        }

        static async void StartSendRequest()
        {
            var callbackInstance = new InstanceContext(new CallbackHandler());
            var client = new Service1Client(callbackInstance);
            await client.StartSendingMessagesAsync();
        }
    }
}
