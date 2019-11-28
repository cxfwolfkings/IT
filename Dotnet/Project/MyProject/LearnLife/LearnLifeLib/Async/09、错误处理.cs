using System;
using System.Threading.Tasks;

namespace SC.AsyncSamples
{
    class ErrorAction
    {
        #region 1、简单示例：单个异步方法的异常处理
        /// <summary>
        /// 从一个简单的方法开始，它在延迟后抛出一个异常
        /// 返回 void 的异步方法不会等待，这是因为从 async void 方法抛出的异常无法捕获。
        /// 因此，异步方法最好返回一个 Task 类型。处理程序方法或重写的基类方法不受此规则限制。
        /// </summary>
        /// <param name="ms"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        static async Task ThrowAfter(int ms, string message)
        {
            await Task.Delay(ms);
            throw new Exception(message);
        }
        /// <summary>
        /// 如果调用异步方法，并且没有等待，将异步方法放在 try/catch 块中，就会捕获不到异常。
        /// 这是因为 DontHandle 方法在 ThrowAfter 抛出异常之前，已经执行完毕。因此要等待 ThrowAfter 方法（用 await 关键字）。
        /// </summary>
        private static void DontHandle()
        {
            try
            {
                ThrowAfter(200, "first");
                // exception is not caught because this method is finished before the exception is thrown
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        /// <summary>
        /// 异步方法异常的一个较好的处理方式，就是使用 await 关键字，将其放在 try/catch 语句中。
        /// 如下示例，异步调用 ThrowAfter 方法后，HandleOneError 方法就会释放线程，但它会在任务完成时保持任务的引用。 
        /// 此时（2s后，抛出异常），会调用匹配的 catch 块内的代码。
        /// </summary>
        private static async void HandleOneError()
        {
            try
            {
                await ThrowAfter(2000, "first");
            }
            catch (Exception ex)
            {
                Console.WriteLine("handled {0}", ex.Message);
            }
        }
        #endregion

        #region 2、多个异步方法的异常处理
        private static async void StartTwoTasks()
        {
            try
            {
                await ThrowAfter(2000, "first");
                await ThrowAfter(1000, "second"); // the second call is not invoked because the first method throws an exception
            }
            catch (Exception ex)
            {
                Console.WriteLine("handled {0}", ex.Message);
            }
        }
        /// <summary>
        /// 并行调用两个 ThrowAfter。使用 Task.WhenAll，不管任务是否抛出异常，都会等到两个任务完成。
        /// 因此，等待 2s 后，Task.WhenAll 结束，异常被 catch 语句捕获到。但是，只能看见传递给 WhenAll 方法的第一个任务的异常信息。
        /// 没有显示先抛出异常的任务（第二个任务），但该任务也在列表中。
        /// 
        /// 有一种方式可以获取所有任务的异常信息，就是在 try 块外声明任务变量 t1 和 t2，使它们可以在 catch 块内访问。
        /// 在这里，可以使用 IsFaulted 属性检查任务的状态，以确认它们是否为出错状态。若出现异常，IsFaulted 属性会返回 true。
        /// 可以使用 Task 类的 Exception.InnerException 访问异常信息本身。另一种获取所有任务的异常信息的更好方式请看下一个方法。
        /// </summary>
        private async static void StartTwoTasksParallel()
        {
            //Task t1;
            //Task t2;
            try
            {
                Task t1 = ThrowAfter(2000, "first");
                Task t2 = ThrowAfter(1000, "second");
                await Task.WhenAll(t1, t2);
            }
            catch (Exception ex)
            {
                // just display the exception information of the first task that is awaited within WhenAll
                Console.WriteLine("handled {0}", ex.Message);
                //if(t1.IsFaulted)
                //{
                //    Console.WriteLine("handled {0}", t1.Exception.InnerException.Message);
                //}
            }
        }
        /// <summary>
        /// 使用AggregateException信息：
        ///   为了得到所有失败任务的异常信息，可以将 Task.WhenAll 返回的结果写到一个Task 变量中。
        ///   这个任务会一直等到所有任务都结束。否则，仍然可能错过抛出的异常。
        ///   上例中，catch 语句只检索到第一个任务的异常。不过，现在可以访问外部任务的Exception 属性了。
        ///   Exception 属性是 AggregateException 类型的。这个异常类型定义了InnerExceptions 属性（不只是InnerException），
        ///   它包含了等待中的所有异常的列表。现在，可以轻松遍历所有异常了。
        /// </summary>
        private static async void ShowAggregatedException()
        {
            Task taskResult = null;
            try
            {
                Task t1 = ThrowAfter(2000, "first");
                Task t2 = ThrowAfter(1000, "second");
                await (taskResult = Task.WhenAll(t1, t2));
            }
            catch
            {
                foreach (var ex1 in taskResult.Exception.InnerExceptions)
                {
                    Console.WriteLine("inner exception {0} from task {1}", ex1.Message, ex1.Source);
                }
            }
        }
        #endregion
    }
}
