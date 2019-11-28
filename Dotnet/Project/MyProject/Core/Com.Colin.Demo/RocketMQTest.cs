using Com.Colin.Library.RocketMQ.Util;
using NUnit.Framework;
using System.Threading;
using System.Threading.Tasks;

namespace Com.Colin.Demo
{
    class MyClass
    {
        public string Name { get; set; }
    }

    [TestFixture]
    public class ChannelTests
    {
        [Test]
        public void UnbufferChannel1()
        {
            var ch = new Chan<int>();
            Task t = Task.Run(() =>
            {
                Thread.Sleep(10);
                ch.Send(1);
            });
            var result = ch.Receive();
            Assert.AreEqual(result, 1);
        }

        [Test]
        public void UnbufferChannel2()
        {
            var ch = new Chan<MyClass>();
            Task t = Task.Run(() =>
            {
                Thread.Sleep(10);
                var s = new MyClass();
                s.Name = "RocketMQ";
                ch.Send(s);
            });
            var result = ch.Receive();
            Assert.AreEqual(result.Name, "RocketMQ");
        }

        [Test]
        public void BufferedChannel1()
        {
            var ch = new Chan<int>(3);
            Task t = Task.Run(() =>
            {
                Thread.Sleep(10);
                ch.Send(1);
                ch.Send(2);
                ch.Send(3);
            });
            var result = ch.Receive();
            Assert.AreEqual(result, 1);
            result = ch.Receive();
            Assert.AreEqual(result, 2);
            result = ch.Receive();
            Assert.AreEqual(result, 3);
        }
    }
}
