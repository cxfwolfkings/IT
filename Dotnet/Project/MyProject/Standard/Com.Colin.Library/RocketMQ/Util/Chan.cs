using System.Threading;

namespace Com.Colin.Library.RocketMQ.Util
{
    public class Chan<T> : IChan<T>
    {
        private readonly IChan<T> _chan;

        public Chan(int? size = null)
        {
            if (size.HasValue)
            {
                _chan = new BufferedChan<T>(size.Value);
            }
            else
            {
                _chan = new UnbufferedChan<T>();
            }
        }

        public bool IsClosed
        {
            get { return _chan.IsClosed; }
        }

        public void Close()
        {
            _chan.Close();
        }

        public void Send(T item)
        {
            _chan.Send(item);
        }

        public void Send(T item, CancellationToken token)
        {
            _chan.Send(item, token);
        }

        public T Receive()
        {
            return _chan.Receive();
        }

        public T Receive(CancellationToken token)
        {
            return _chan.Receive(token);
        }
    }
}
