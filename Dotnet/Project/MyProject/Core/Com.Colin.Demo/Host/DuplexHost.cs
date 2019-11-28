using Com.Colin.WcfServiceLibrary;
using System;
using System.ServiceModel;

namespace Com.Colin.Demo.Host
{
    public class DuplexHost
    {
        internal static ServiceHost myServiceHost = null;

        internal static void StartService()
        {
            //Instantiate new ServiceHost 
            myServiceHost = new ServiceHost(typeof(MessageService));

            //Open myServiceHost
            myServiceHost.Open();
        }

        internal static void StopService()
        {
            //Call StopService from your shutdown logic (i.e. dispose method)
            if (myServiceHost.State != CommunicationState.Closed)
                myServiceHost.Close();
        }

        public static void Demo()
        {
            StartService();
            Console.WriteLine("Service running; press return to exit");
            Console.ReadLine();
            StopService();
            Console.WriteLine("stopped");
        }
    }
}
