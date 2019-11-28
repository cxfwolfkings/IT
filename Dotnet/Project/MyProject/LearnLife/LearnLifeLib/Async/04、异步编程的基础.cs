using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SC.AsyncSamples
{
    /// <summary>
    /// async和await关键字只是编译器功能。编译器会用Task类创建代码。
    /// 如果不使用这两个关键字，也可以用C# 4.0和Task类的方法来实现同样的功能，只是没有那么方便。
    /// </summary>
    class AwaitMonitor
    {

        #region 1、从同步方法Greeting开始
        static string Greeting(string name)
        {
            Console.WriteLine("running greeting in thread {0} and task {1}", Thread.CurrentThread.ManagedThreadId, Task.CurrentId);
            Thread.Sleep(3000);
            return string.Format("Hello, {0}", name);
        }
        #endregion

        #region 2、基于任务的异步模式，指定在异步方法名后加上Async作为后缀，并返回一个任务。
        static Task<string> GreetingAsync(string name)
        {
            return Task.Run(() =>
            {
                Console.WriteLine("running greetingasync in thread {0} and task {1}", Thread.CurrentThread.ManagedThreadId, Task.CurrentId);
                return Greeting(name);
            });
        }
        #endregion

        #region 3、调用异步方法
        /// <summary>
        /// 可以使用await关键字来调用返回任务的异步方法GreetingAsync。
        /// 使用await关键字需要有用async修饰符声明的方法。
        /// 如果异步方法的结果不传递给变量，也可以直接在参数中使用await关键字。
        /// 在GreetingAsync方法完成前，该方法内的其他代码不会继续执行。
        /// 但是，启动CallerWithAsync2方法的线程可以被重用，该线程被阻塞。
        /// </summary>
        private async static void CallerWithAsync2()
        {
            Console.WriteLine("started CallerWithAsync in thread {0} and task {1}", Thread.CurrentThread.ManagedThreadId, Task.CurrentId);
            Console.WriteLine(await GreetingAsync("Stephanie"));
            Console.WriteLine("finished GreetingAsync in thread {0} and task {1}", Thread.CurrentThread.ManagedThreadId, Task.CurrentId);
        }
        #endregion

        #region 4、延续任务
        /// <summary>
        /// GreetingAsync方法返回一个Task<string>对象。该Task<string>对象包含任务创建的信息，并保存到任务完成。
        /// Task类的ContinueWith方法定义了任务完成后将要调用的代码。
        /// 编译器通过把await关键字后的所有代码放进ContinueWith方法的代码块中来转换await关键字。
        /// </summary>
        private static void CallerWithContinuationTask()
        {
            Console.WriteLine("started CallerWithContinuationTask in thread {0} and task {1}", Thread.CurrentThread.ManagedThreadId, Task.CurrentId);
            var t1 = GreetingAsync("Stephanie");
            t1.ContinueWith(t =>
            {
                string result = t.Result;
                Console.WriteLine(result);
                Console.WriteLine("finished CallerWithContinuationTask in thread {0} and task {1}", Thread.CurrentThread.ManagedThreadId, Task.CurrentId);
            });
        }
        #endregion

        #region 5、同步上下文
        /**
         * 必须保证在所有应该完成的后台任务完成之前，至少有一个前台线程仍然在运行。
         * 为执行某些行动，有些应用程序会被绑定到一个指定线程（例如，在WPF应用程序中，只有UI线程才能访问UI元素），这将会是一个问题。
         * 如果使用async和await关键字，当await完成之后，不需要做任何特别处理就能访问界面线程。
         * 默认情况下，生成的代码会把线程转换到拥有同步上下文的线程中。
         * WPF应用程序设置了DispatcherSynchronizationContext属性，WindowsForm应用程序设置了WindowsFormsSynchronizationContext属性。
         * 如果不想使用相同的同步上下文，必须调用Task类的ConfigureAwait(continueOnCapturedContext:false)。
         * 例如，一个WPF应用程序，其await后面的代码没有用到任何的UI元素。在这种情况下，避免切换到同步上下文会执行的更快。
         */
        #endregion

        #region 6、使用多个异步方法

        /// <summary>
        /// 1. 按顺序调用异步方法
        /// </summary>
        private async static void MultipleAsyncMethods()
        {
            string s1 = await GreetingAsync("Stephanie");
            string s2 = await GreetingAsync("Matthias");
            Console.WriteLine("Finished both methods.\n Result 1: {0}\n Result 2: {1}", s1, s2);
        }
        /// <summary>
        /// 2. 使用组合器
        ///   组合器可以帮助实现每个异步方法的并行运行，使程序运行得更快。一个组合器可以接受多个同一类型的参数，并返回同一类型的值。
        /// </summary>
        private async static void MultipleAsyncMethodsWithCombinators1()
        {
            Task<string> t1 = GreetingAsync("Stephanie");
            Task<string> t2 = GreetingAsync("Matthias");
            await Task.WhenAll(t1, t2);
            Console.WriteLine("Finished both methods.\n Result 1: {0}\n Result 2: {1}", t1.Result, t2.Result);
        }
        /// <summary>
        /// GreetingAsync方法返回一个Task<string>，等待返回的结果是一个字符串(string)形式。
        /// 因此，两个任务合并后Task.WhenAll返回一个字符串数组
        /// </summary>
        private async static void MultipleAsyncMethodsWithCombinators2()
        {
            Task<string> t1 = GreetingAsync("Stephanie");
            Task<string> t2 = GreetingAsync("Matthias");
            string[] result = await Task.WhenAll(t1, t2);
            Console.WriteLine("Finished both methods.\n Result 1: {0}\n Result 2: {1}", result[0], result[1]);
        }

        #endregion

        #region 7、转换异步模式
        /// <summary>
        /// 首先模拟异步模式，需要借助于委托
        /// </summary>
        private static Func<string, string> greetingInvoker = Greeting;

        static IAsyncResult BeginGreeting(string name, AsyncCallback callback, object state)
        {
            return greetingInvoker.BeginInvoke(name, callback, state);
        }

        static string EndGreeting(IAsyncResult ar)
        {
            return greetingInvoker.EndInvoke(ar);
        }

        /// <summary>
        /// TaskFactory类定义了FromAsync方法，它可以把使用异步模式的方法转换为基于任务的异步模式的方法(TAP)。
        /// </summary>
        private static async void ConvertingAsyncPattern()
        {
            string r = await Task<string>.Factory.FromAsync(BeginGreeting, EndGreeting, "Angela", null);
            Console.WriteLine(r);
        }
        #endregion
    }

}
