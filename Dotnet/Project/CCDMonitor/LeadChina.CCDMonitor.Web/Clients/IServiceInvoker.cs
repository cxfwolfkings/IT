using System;

namespace LeadChina.CCDMonitor.Web.Clients
{
    /// <summary>
    /// 
    /// </summary>
    public interface IServiceInvoker
    {
        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="invokeHandler"></param>
        void InvokeService<T>(Action<T> invokeHandler) where T : class;

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <typeparam name="TReslt"></typeparam>
        /// <param name="invokeHandler"></param>
        /// <returns></returns>
        TReslt InvokeService<T, TReslt>(Func<T, TReslt> invokeHandler) where T : class;
    }
}
