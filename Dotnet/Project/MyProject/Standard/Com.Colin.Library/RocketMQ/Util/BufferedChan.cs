using System;
using System.Collections.Concurrent;
using System.Threading;

namespace Com.Colin.Library.RocketMQ.Util
{
    internal class BufferedChan<T> : IChan<T>
    {
        private readonly ManualResetEventSlim _canAddEvent;

        private readonly ManualResetEventSlim _canTakeEvent;

        private readonly ConcurrentQueue<T> _queue;

        private readonly int _size;


        public BufferedChan(int size)
        {
            if (size < 1)
            {
                throw new ArgumentOutOfRangeException("buffered channel size cannot less than 1");
            }
            this._size = size;
            this._queue = new ConcurrentQueue<T>();
            _canTakeEvent = new ManualResetEventSlim(false);
            _canAddEvent = new ManualResetEventSlim(false);
        }

        public int Count
        {
            get
            {
                return this._queue.Count;
            }
        }

        public bool IsClosed { get; private set; }

        public void Close()
        {
            this.IsClosed = true;
        }

        public T Receive()
        {
            return this.Receive(CancellationToken.None);
        }

        public T Receive(CancellationToken token)
        {
            while (true)
            {
                if (token.IsCancellationRequested)
                {
                    throw new OperationCanceledException(token);
                }
                T item;
                if (this._queue.TryDequeue(out item))
                {
                    _canAddEvent.Set();
                    return item;
                }
                if (_queue.Count == 0)
                {
                    if (this.IsClosed) throw new InvalidOperationException("The chan has been closed");
                }
                this._canTakeEvent.Wait(token);
            }
        }

        public void Send(T item)
        {
            this.Send(item, CancellationToken.None);
        }

        public void Send(T item, CancellationToken token)
        {
            while (this._queue.Count == _size)
            {
                if (this.IsClosed) throw new InvalidOperationException("The chan has been closed");
                _canAddEvent.Wait(token);
            }
            if (this.IsClosed) throw new InvalidOperationException("The chan has been closed");
            this._queue.Enqueue(item);
            _canTakeEvent.Set();
        }
    }
}
