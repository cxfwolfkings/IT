using System;
using System.Collections.Concurrent;
using System.Threading;

namespace Com.Colin.Library.RocketMQ.Util
{
    internal class UnbufferedChan<T> : IChan<T>
    {
        private readonly ConcurrentQueue<UnbufferedChanReceiver<T>> _receivers;

        public UnbufferedChan()
        {
            _receivers = new ConcurrentQueue<UnbufferedChanReceiver<T>>();
        }

        public bool IsClosed { get; private set; }

        public void Close()
        {
            IsClosed = true;
        }

        public void Send(T item)
        {
            Send(item, CancellationToken.None);
        }

        public void Send(T item, CancellationToken token)
        {
            if (this.IsClosed) throw new InvalidOperationException("The chan has been closed");
            if (token.IsCancellationRequested)
                throw new OperationCanceledException(token);
            UnbufferedChanReceiver<T> receiver;
            if (_receivers.Count == 0 || !_receivers.TryDequeue(out receiver))
                throw new InvalidOperationException("No alive receiver for this no buffered chan.");
            receiver.WakeUp(() => item);
        }

        public T Receive()
        {
            return Receive(CancellationToken.None);
        }

        public T Receive(CancellationToken token)
        {
            if (token.IsCancellationRequested)
                throw new OperationCanceledException(token);

            if (this.IsClosed) throw new InvalidOperationException("The chan has been closed");

            using (var receiver = new UnbufferedChanReceiver<T>())
            {
                _receivers.Enqueue(receiver);
                return receiver.WaitForValue(token);
            }
        }
    }
}
