using System;
using System.Collections.Generic;
using System.Configuration;
using System.ServiceModel;
using System.ServiceModel.Configuration;

namespace LeadChina.CCDMonitor.Web.Clients
{
    /// <summary>
    /// 
    /// </summary>
    public class WCFServiceInvoker : IServiceInvoker
    {
        private static readonly ChannelFactoryManager FactoryManager = new ChannelFactoryManager();

        private static readonly ClientSection ClientSection =
            ConfigurationManager.GetSection("system.serviceModel/client") as ClientSection;

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="invokeHandler"></param>
        public void InvokeService<T>(Action<T> invokeHandler) where T : class
        {
            KeyValuePair<string, string> endpointNameAddressPair = GetEndpointNameAddressPair(typeof(T));
            var arg = FactoryManager.CreateChannel<T>(endpointNameAddressPair.Key, endpointNameAddressPair.Value);
            var obj2 = (ICommunicationObject)arg;
            try
            {
                invokeHandler(arg);
            }
            finally
            {
                try
                {
                    if (obj2.State != CommunicationState.Faulted)
                    {
                        obj2.Close();
                    }
                }
                catch
                {
                    obj2.Abort();
                }
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <typeparam name="TReslt"></typeparam>
        /// <param name="invokeHandler"></param>
        /// <returns></returns>
        public TReslt InvokeService<T, TReslt>(Func<T, TReslt> invokeHandler) where T : class
        {
            KeyValuePair<string, string> endpointNameAddressPair = GetEndpointNameAddressPair(typeof(T));
            var arg = FactoryManager.CreateChannel<T>(endpointNameAddressPair.Key, endpointNameAddressPair.Value);
            var obj2 = (ICommunicationObject)arg;
            try
            {
                return invokeHandler(arg);
            }
            finally
            {
                try
                {
                    if (obj2.State != CommunicationState.Closed || obj2.State != CommunicationState.Faulted)
                    {
                        obj2.Close();
                    }
                }
                catch
                {
                    obj2.Abort();
                }
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="serviceContractType"></param>
        /// <returns></returns>
        private KeyValuePair<string, string> GetEndpointNameAddressPair(Type serviceContractType)
        {
            var configException =
                new ConfigurationErrorsException(
                    string.Format(
                        "No client endpoint found for type {0}. Please add the section <client><endpoint name=\"myservice\" address=\"http://address/\" binding=\"basicHttpBinding\" contract=\"{0}\"/></client> in the config file.",
                        serviceContractType));
            if (((ClientSection == null) || (ClientSection.Endpoints == null)) || (ClientSection.Endpoints.Count < 1))
            {
                throw configException;
            }
            foreach (ChannelEndpointElement element in ClientSection.Endpoints)
            {
                if (element.Contract == serviceContractType.ToString())
                {
                    return new KeyValuePair<string, string>(element.Name, element.Address.AbsoluteUri);
                }
            }
            throw configException;
        }
    }
}