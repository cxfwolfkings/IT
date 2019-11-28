using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Text;
using System.Threading;

namespace ProjectReceive
{
    /// <summary>
    /// 创建名为ProjectReceive的控制台项目，引用RabbitMQ.Client.dll。作为Consumer消费者，用来接收数据：
    /// 和发送一样，首先需要定义连接，然后声明消息队列。要接收消息，需要定义一个Consume，然后在接收消息的事件中处理数据。
    /// </summary>
    class Program
    {
        static void Main(string[] args)
        {

        }

        static void Hello()
        {
            var factory = new ConnectionFactory();
            factory.HostName = "localhost";
            factory.UserName = "guest";
            factory.Password = "guest";

            using (var connection = factory.CreateConnection())
            {
                using (var channel = connection.CreateModel())
                {
                    channel.QueueDeclare("hello", false, false, false, null);

                    var consumer = new EventingBasicConsumer(channel);
                    channel.BasicConsume("hello", false, consumer);
                    consumer.Received += (model, ea) =>
                    {
                        var body = ea.Body;
                        var message = Encoding.UTF8.GetString(body);
                        Console.WriteLine("已接收： {0}", message);
                    };
                    Console.ReadLine();
                }
            }

            // 现在发送和接收的客户端都写好了，让我们编译执行起来
            // 现在，名为hello的消息队列中，发送了一条消息。这条消息存储到了RabbitMQ的服务器上了。
            // 使用rabbitmqctl 的list_queues可以查看所有的消息队列，以及里面的消息个数，可以看到，目前Rabbitmq上只有一个消息队列，里面只有一条消息
            // 也可以在web管理界面查看此queue的相关信息：http://localhost:15672
            // 消息被接收后，我们再来看queue的内容：可见，消息中的内容在接收之后被删除了。
        }

        /// <summary>
        /// 我们修改接收端，让他根据消息中的逗点的个数来Sleep对应的秒数：
        /// </summary>
        static void WorkQueue()
        {
            var factory = new ConnectionFactory();
            factory.HostName = "localhost";
            factory.UserName = "yy";
            factory.Password = "hello!";

            using (var connection = factory.CreateConnection())
            {
                using (var channel = connection.CreateModel())
                {
                    channel.QueueDeclare("hello", false, false, false, null);

                    var consumer = new QueueingBasicConsumer(channel);

                    // autoAck参数是否开启消息响应
                    channel.BasicConsume("hello", autoAck: true, consumer);

                    while (true)
                    {
                        var ea = consumer.Queue.Dequeue();

                        var body = ea.Body;
                        var message = Encoding.UTF8.GetString(body);

                        int dots = message.Split('.').Length - 1;
                        Thread.Sleep(dots * 1000);

                        Console.WriteLine("Received {0}", message);
                        Console.WriteLine("Done");

                        //channel.BasicAck(ea.DeliveryTag, false);
                    }
                }
            }

            // 轮询分发：
            // 使用工作队列的一个好处就是它能够并行的处理队列。如果堆积了很多任务，我们只需要添加更多的工作者（workers）就可以了，扩展很简单。
            // 现在，我们先启动两个接收端，等待接受消息，然后启动一个发送端开始发送消息。
            // 
            // 在cmd条件下，发送了5条消息，每条消息后面的逗点表示该消息需要执行的时长，来模拟耗时的操作。
            // 然后可以看到，两个接收端依次接收到了发出的消息：
            // 默认，RabbitMQ会将每个消息按照顺序依次分发给下一个消费者。所以每个消费者接收到的消息个数大致是平均的。这种消息分发的方式称之为轮询（round-robin）。
        }
    }
}
