using System.Threading;

namespace Com.Colin.Library.RocketMQ.Util
{
    internal interface IChan<T>
    {
        bool IsClosed { get; }

        void Close();

        void Send(T item);

        void Send(T item, CancellationToken token);

        T Receive();

        T Receive(CancellationToken token);
    }
}
