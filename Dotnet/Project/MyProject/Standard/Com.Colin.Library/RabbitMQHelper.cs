using RabbitMQ.Client;
using System.Text;

namespace Com.Colin.Library
{
    /// <summary>
    /// RabbitMQ帮助类
    /// </summary>
    public class RabbitMQHelper
    {
        /// <summary>
        /// 消息发送
        /// </summary>
        /// <param name="hostName"></param>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <param name="msg"></param>
        /// <param name="isPersistent">是否持久化（1:否 2:是）</param>
        public static void SendMessage(string hostName = "localhost", string userName = "", string password = "", string msg = "Hello",
            byte isPersistent = 1)
        {
            var factory = new ConnectionFactory();
            factory.HostName = hostName;
            factory.UserName = userName;
            factory.Password = password;

            using (var connection = factory.CreateConnection())
            {
                using (var channel = connection.CreateModel())
                {
                    channel.QueueDeclare("hello", false, false, false, null);
                    string message = msg;
                    var properties = channel.CreateBasicProperties();
                    properties.DeliveryMode = isPersistent;

                    var body = Encoding.UTF8.GetBytes(message);
                    channel.BasicPublish("", "hello", properties, body);
                    //Console.WriteLine(" set {0}", message);
                }
            }
            //Console.ReadKey();
        }
    }
}
