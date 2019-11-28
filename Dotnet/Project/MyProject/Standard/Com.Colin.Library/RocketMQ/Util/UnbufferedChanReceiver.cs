using System;
using System.Threading;

namespace Com.Colin.Library.RocketMQ.Util
{
    internal class UnbufferedChanReceiver<T> : IDisposable
    {
        private readonly ManualResetEventSlim _eventHandler;
        private Func<T> _getValueFunc;

        public UnbufferedChanReceiver()
        {
            this._eventHandler = new ManualResetEventSlim(false);
        }

        public void Dispose()
        {
            this._eventHandler.Dispose();
        }

        public void WakeUp(Func<T> getValueFunc)
        {
            this._getValueFunc = getValueFunc;
            this._eventHandler.Set();
        }

        public T WaitForValue(CancellationToken token)
        {
            while (_getValueFunc == null)
            {
                this._eventHandler.Wait(token);
            }
            return this._getValueFunc();
        }
    }
}
