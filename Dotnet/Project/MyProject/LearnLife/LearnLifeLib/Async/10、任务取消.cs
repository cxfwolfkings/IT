using System;
using System.Threading;
using System.Threading.Tasks;

/// <summary>
/// 在一些请况下，后台任务可能运行很长时间，取消任务就非常有用了。
/// 对于取消任务，从 NET 4.0 开始就提供了一种标准的机制。这种机制可用于基于任务的异步模式。
/// 取消框架基于协助行为，不是强制性的。一个运行时间很长的任务需要检查自己是否被取消，在这种情况下，它的工作就是清理所有己打开的资源，并结束相关工作。
/// 取消基于CancellationTokenSource 类，该类可用于发送取消请求。
/// 请求发送给引用CancellationToken 类的任务，其中CancellationToken类与CancellationTokenSource类相关联。
/// </summary>
public class CancelTaskDemo
{
    #region 1、Task Cancel
    /// <summary>
    /// 任务取消示例，任务最终状态是Canceled
    /// 如何取消自定义任务？
    ///   Task 类的 Run 方法提供了重载版本，它也传递 CancellationToken 参数。但是，对于自定义任务， 需要检查是否请求了取消操作。
    ///   下例中，这是在 for 循环中实现的，可以使用 IsCancellationRequsted 属性检查令牌。
    ///   在抛出异常之前， 如果需要做一些清理工作，最好验证一下是否请求取消操作。
    ///   如果不需要做清理工作，检查之后，会立即用 ThrowIfCancellationRequested 方法触发异常。
    /// </summary>
    static void CancelTask()
    {
        var cts = new CancellationTokenSource();
        cts.Token.Register(() => Console.WriteLine("*** task cancelled"));
        // send a cancel after 500 ms
        cts.CancelAfter(500);
        Task t1 = Task.Run(() =>
        {
            Console.WriteLine("in task");
            for (int i = 0; i < 20; i++)
            {
                Thread.Sleep(100);
                CancellationToken token = cts.Token;
                if (token.IsCancellationRequested)
                {
                    Console.WriteLine("cancelling was requested, cancelling from within the task");
                    // 如果任务取消，抛出AggregateException异常（包含内部异常TaskCanceledException）
                    token.ThrowIfCancellationRequested();
                    break;
                }
                Console.WriteLine("in loop");
            }
            Console.WriteLine("task finished without cancellation");
        }, cts.Token);

        try
        {
            t1.Wait();
        }
        catch (AggregateException ex)
        {
            Console.WriteLine("exception: {0}, {1}", ex.GetType().Name, ex.Message);
            foreach (var innerException in ex.InnerExceptions)
            {
                Console.WriteLine("inner excepion: {0}, {1}", ex.InnerException.GetType().Name, ex.InnerException.Message);
            }
        }
    }
    #endregion

    #region 2、Parallel Cancel
    /// <summary>
    /// Parallel 类验证 CancellationToken 结果，并取消操作，一旦取消操作，For()方法就抛出一个 OperationCanceledException 类型的异常
    /// 使用 CancellationToken 可以注册取消操作时的信息，为此需要调用Register()方法，并传递一个在取消操作时调用的委托
    /// 通过取消操作，所有未启动的迭代操作都在启动之前就取消了。
    /// 启动的迭代操作允许完成，因为取消操作总是以协作方式进行，以避免在取消迭代操作的中间泄露资源。
    /// </summary>
    static void CancelParallelLoop()
    {
        var cts = new CancellationTokenSource();
        cts.Token.ThrowIfCancellationRequested();
        cts.Token.Register(() => Console.WriteLine("** token cancelled"));
        // start a task that sends a cancel after 500 ms      
        cts.CancelAfter(500);
        try
        {
            ParallelLoopResult result = Parallel.For(0, 100,
                new ParallelOptions()
                {
                    CancellationToken = cts.Token
                },
                x =>
                {
                    Console.WriteLine("loop {0} started", x);
                    int sum = 0;
                    for (int i = 0; i < 100; i++)
                    {
                        Thread.Sleep(2);
                        sum += i;
                    }
                    Console.WriteLine("loop {0} finished", x);
                });
        }
        catch (OperationCanceledException ex)
        {
            Console.WriteLine(ex.Message);
        }
    }
    #endregion
}
