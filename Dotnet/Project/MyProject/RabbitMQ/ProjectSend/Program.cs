using RabbitMQ.Client;
using System;
using System.Text;

namespace ProjectSend
{
    /// <summary>
    /// 首先创建名为ProjectSend的控制台项目，需要引用RabbitMQ.Client.dll。这个程序作为Producer生产者，用来发送数据：
    /// </summary>
    class Program
    {
        static void Main(string[] args)
        {
            
        }

        #region 1. HelloWorld

        /// <summary>
        /// HelloWorld
        /// </summary>
        static void Hello()
        {
            // 首先，需要创建一个ConnectionFactory，设置目标，由于是在本机，所以设置为localhost，
            // 如果RabbitMQ不在本机，只需要设置目标机器的IP地址或者机器名称即可，然后设置前面创建的用户名和密码。
            var factory = new ConnectionFactory();
            factory.HostName = "localhost"; // RabbitMQ服务在本地运行
            factory.UserName = "guest"; // 用户名
            factory.Password = "guest"; // 密码

            using (var connection = factory.CreateConnection())
            {
                // 紧接着要创建一个Channel，如果要发送消息，需要创建一个队列，然后将消息发布到这个队列中。
                // 在创建队列的时候，只有RabbitMQ上该队列不存在，才会去创建。消息是以二进制数组的形式传输的，所以如果消息是实体对象的话，需要序列化和然后转化为二进制数组。
                using (var channel = connection.CreateModel())
                {
                    channel.QueueDeclare("hello", false, false, false, null); // 创建一个名称为hello的消息队列
                    string message = "Hello World"; // 传递的消息内容
                    var body = Encoding.UTF8.GetBytes(message);
                    channel.BasicPublish("", "hello", null, body); // 开始传递
                    Console.WriteLine("已发送： {0}", message);
                    Console.ReadLine();
                }
            }
            // 现在客户端发送代码已经写好了，运行之后，消息会发布到RabbitMQ的消息队列中，现在需要编写服务端的代码连接到RabbitMQ上去获取这些消息。
        }

        #endregion


        #region 2. 工作队列

        /// <summary>
        /// 前面的例子展示了如何在指定的消息队列发送和接收消息。现在我们创建一个工作队列（work queue）来将一些耗时的任务分发给多个工作者（workers）：
        /// 工作队列（work queues, 又称任务队列Task Queues）的主要思想是为了避免立即执行并等待一些占用大量资源、时间的操作完成。而是把任务（Task）当作消息发送到队列中，稍后处理。
        /// 一个运行在后台的工作者（worker）进程就会取出任务然后处理。当运行多个工作者（workers）时，任务会在它们之间共享。
        /// 这个在网络应用中非常有用，它可以在短暂的HTTP请求中处理一些复杂的任务。在一些实时性要求不太高的地方，我们可以处理完主要操作之后，以消息的方式来处理其他的不紧要的操作，比如写日志等等。
        /// 
        /// 准备：
        /// 在第一部分，发送了一个包含"Hello World!"的字符串消息。现在发送一些字符串，把这些字符串当作复杂的任务。这里使用time.sleep() 函数来模拟耗时的任务。
        /// 在字符串中加上点号（.）来表示任务的复杂程度，一个点（.）将会耗时1秒钟。比如"Hello..."就会耗时3秒钟。
        /// </summary>
        static void WorkQueue(string[] args)
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
                    string message = GetMessage(args);
                    var properties = channel.CreateBasicProperties();
                    properties.DeliveryMode = 2;

                    var body = Encoding.UTF8.GetBytes(message);
                    channel.BasicPublish("", "hello", properties, body);
                    Console.WriteLine(" set {0}", message);
                }
            }

            Console.ReadKey();
        }

        private static string GetMessage(string[] args)
        {
            return ((args.Length > 0) ? string.Join(" ", args) : "Hello World!");
        }

        #endregion


        #region 3. 消息响应

        // 当处理一个比较耗时得任务的时候，也许想知道消费者（consumers）是否运行到一半就挂掉。
        // 在当前的代码中，当RabbitMQ将消息发送给消费者（consumers）之后，马上就会将该消息从队列中移除。
        // 此时，如果把处理这个消息的工作者（worker）停掉，正在处理的这条消息就会丢失。同时，所有发送到这个工作者的还没有处理的消息都会丢失。
        // 我们不想丢失任何任务消息。如果一个工作者（worker）挂掉了，我们希望该消息会重新发送给其他的工作者（worker）。
        // 为了防止消息丢失，RabbitMQ提供了消息响应（acknowledgments）机制。消费者会通过一个ack（响应），告诉RabbitMQ已经收到并处理了某条消息，然后RabbitMQ才会释放并删除这条消息。
        // 如果消费者（consumer）挂掉了，没有发送响应，RabbitMQ就会认为消息没有被完全处理，然后重新发送给其他消费者（consumer）。这样，即使工作者（workers）偶尔的挂掉，也不会丢失消息。
        // 消息是没有超时这个概念的；当工作者与它断开连的时候，RabbitMQ会重新发送消息。这样在处理一个耗时非常长的消息任务的时候就不会出问题了。
        // 消息响应默认是开启的。在之前的例子中使用了no_ack=True标识把它关闭。是时候移除这个标识了，当工作者（worker）完成了任务，就发送一个响应。

        // 现在，可以保证，即使正在处理消息的工作者被停掉，这些消息也不会丢失，所有没有被应答的消息会被重新发送给其他工作者。
        // 一个很常见的错误就是忘掉了BasicAck这个方法，这个错误很常见，但是后果很严重。当客户端退出时，待处理的消息就会被重新分发，
        // 但是RabitMQ会消耗越来越多的内存，因为这些没有被应答的消息不能够被释放。

        // 调试这种case，可以使用 rabbitmqct 打印 messages_unacknoledged 字段：rabbitmqctl list_queues name messages_ready messages_unacknowledged

        #endregion


        #region 4. 消息持久化

        // 前面已经搞定了即使消费者down掉，任务也不会丢失，但是，如果RabbitMQ Server停掉了，那么这些消息还是会丢失。
        // 当RabbitMQ Server 关闭或者崩溃，那么里面存储的队列和消息默认是不会保存下来的。如果要让RabbitMQ保存住消息，需要在两个地方同时设置：需要保证队列和消息都是持久化的。
        // 首先，要保证RabbitMQ不会丢失队列，所以要做如下设置：
        // channel.QueueDeclare("hello", durable:true, false, false, null);
        // 虽然在语法上是正确的，但是在目前阶段是不正确的，因为我们之前已经定义了一个非持久化的hello队列。
        // RabbitMQ不允许我们使用不同的参数重新定义一个已经存在的同名队列，如果这样做就会报错。定义另外一个不同名称的队列来进行测试
        // queueDeclare 这个改动需要在发送端和接收端同时设置。

        // 现在保证了消息队列即使在RabbitMQ Server重启之后，队列也不会丢失。然后需要保证消息也是持久化的，这可以通过设置 IBasicProperties.SetPersistent 为 true 来实现：
        // var properties = channel.CreateBasicProperties();
        // properties.SetPersistent(true);

        // 需要注意的是，将消息设置为持久化并不能完全保证消息不丢失。虽然他告诉RabbitMQ将消息保存到磁盘上，但是在RabbitMQ接收到消息和将其保存到磁盘上这之间仍然有一个小的时间窗口。
        // RabbitMQ 可能只是将消息保存到了缓存中，并没有将其写入到磁盘上。持久化是不能够一定保证的，但是对于一个简单任务队列来说已经足够。
        // 如果需要消息队列持久化的强保证，可以使用publisher confirms

        #endregion


        #region 5. 公平分发

        // 你可能会注意到，消息的分发可能并没有如我们想要的那样公平分配。
        // 比如，对于两个工作者。当奇数个消息的任务比较重，但是偶数个消息任务比较轻时，奇数个工作者始终处理忙碌状态，而偶数个工作者始终处理空闲状态。
        // 但是RabbitMQ并不知道这些，他仍然会平均依次的分发消息。

        // 为了改变这一状态，我们可以使用 basicQos 方法，设置 perfetchCount=1 。这样就告诉 RabbitMQ 不要在同一时间给一个工作者发送多于1个的消息。
        // 或者换句话说，在一个工作者还在处理消息，并且没有响应消息之前，不要给他分发新的消息。相反，将这条新的消息发送给下一个不那么忙碌的工作者。
        // channel.BasicQos(0, 1, false);

        #endregion
    }
}
