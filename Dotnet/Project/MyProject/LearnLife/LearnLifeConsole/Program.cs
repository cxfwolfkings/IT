using System;

namespace LearnLifeConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
        }

        /// <summary>
        /// 异步和多线程学习，测试
        /// </summary>
        static void AsyncDemo()
        {
            Console.WriteLine("请选则想要运行的示例（根据编号选择）：");
            Console.WriteLine("1、线程池ThreadPool示例");
            Console.WriteLine("2、线程Thread示例");
            Console.WriteLine("3、Parallel示例");
            Console.WriteLine("4、Task示例");
            Console.WriteLine("5、取消任务示例");
            Console.WriteLine("6、异步模式示例");
            Console.WriteLine("7、基于事件的异步模式示例");
            Console.WriteLine("8、基于任务的异步模式示例");
            while (true)
            {
                var key = Console.ReadKey();
                if (key.Key.ToString().ToString() == "1")
                {

                }
                else if (key.Key.ToString().ToString() == "2")
                {

                }
                else if (key.Key.ToString().ToString() == "3")
                {

                }
                else if (key.Key.ToString().ToString() == "4")
                {

                }
                else if (key.Key.ToString().ToString() == "5")
                {

                }
                else if (key.Key.ToString().ToString() == "6")
                {

                }
                else if (key.Key.ToString().ToString() == "7")
                {

                }
                else if (key.Key.ToString().ToString() == "8")
                {

                }
                else if (key.Key.ToString().ToString() == "q")
                {
                    Console.WriteLine("感谢使用！");
                    break;
                }
                else
                {
                    Console.WriteLine("输入错误！请重试");
                }
            }
        }
    }
}
