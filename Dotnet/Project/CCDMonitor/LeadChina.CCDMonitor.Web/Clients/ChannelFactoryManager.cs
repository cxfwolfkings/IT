using System;
using System.Collections.Generic;
using System.ServiceModel;

namespace LeadChina.CCDMonitor.Web.Clients
{
    /// <summary>
    /// 
    /// </summary>
    public class ChannelFactoryManager : IDisposable
    {
        private static readonly Dictionary<Type, ChannelFactory> Factories = new Dictionary<Type, ChannelFactory>();
        private static readonly object SyncRoot = new object();

        /// <summary>
        /// 
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public virtual T CreateChannel<T>() where T : class
        {
            return CreateChannel<T>("*", null);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="endpointConfigurationName"></param>
        /// <returns></returns>
        public virtual T CreateChannel<T>(string endpointConfigurationName) where T : class
        {
            return CreateChannel<T>(endpointConfigurationName, null);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="endpointConfigurationName"></param>
        /// <param name="endpointAddress"></param>
        /// <returns></returns>
        public virtual T CreateChannel<T>(string endpointConfigurationName, string endpointAddress) where T : class
        {
            T local = GetFactory<T>(endpointConfigurationName, endpointAddress).CreateChannel();
            ((IClientChannel)local).Faulted += ChannelFaulted;
            return local;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="endpointConfigurationName"></param>
        /// <param name="endpointAddress"></param>
        /// <returns></returns>
        protected virtual ChannelFactory<T> GetFactory<T>(string endpointConfigurationName, string endpointAddress)
            where T : class
        {
            lock (SyncRoot)
            {
                ChannelFactory factory;
                if (!Factories.TryGetValue(typeof(T), out factory))
                {
                    factory = CreateFactoryInstance<T>(endpointConfigurationName, endpointAddress);
                    Factories.Add(typeof(T), factory);
                }
                return (factory as ChannelFactory<T>);
            }
        }

        private ChannelFactory CreateFactoryInstance<T>(string endpointConfigurationName, string endpointAddress)
        {
            ChannelFactory factory = null;
            factory = !string.IsNullOrEmpty(endpointAddress) ? new ChannelFactory<T>(endpointConfigurationName, new EndpointAddress(endpointAddress)) : new ChannelFactory<T>(endpointConfigurationName);

            factory.Faulted += FactoryFaulted;
            factory.Open();
            return factory;
        }

        private void ChannelFaulted(object sender, EventArgs e)
        {
            var channel = (IClientChannel)sender;
            try
            {
                channel.Close();
            }
            catch
            {
                channel.Abort();
            }
        }

        private void FactoryFaulted(object sender, EventArgs args)
        {
            var factory = (ChannelFactory)sender;
            try
            {
                factory.Close();
            }
            catch
            {
                factory.Abort();
            }
            Type[] genericArguments = factory.GetType().GetGenericArguments();
            if ((genericArguments.Length == 1))
            {
                Type key = genericArguments[0];
                if (Factories.ContainsKey(key))
                {
                    Factories.Remove(key);
                }
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="disposing"></param>
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                lock (SyncRoot)
                {
                    foreach (Type type in Factories.Keys)
                    {
                        ChannelFactory factory = Factories[type];
                        try
                        {
                            factory.Close();
                        }
                        catch
                        {
                            factory.Abort();
                        }
                    }
                    Factories.Clear();
                }
            }
        }
    }
}
