using System;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Threading;

public class ThreadDemo
{
    #region 1、简单线程
    /// <summary>
    /// Thread 类的构造函数重载为接受 ThreadStart 和 ParameterizedThreadStart 类型的委托参数
    /// </summary>
    public static void simpleThread()
    {
        Console.WriteLine("***********线程简单示例！***********");
        A a = new A();
        // 对于线程需要执行的程序代码而言，ThreadStart 委托就是一个包装程序。在创建 Thread 对象的实例时，将 ThreadStart 委托作为参数传递。
        // 正如所有的委托一样，ThreadStart 委托必须包含相同的参数作为委托声明。用下面这种方法创建一个 ThreadStart 委托。
        Thread s1 = new Thread(new ThreadStart(a.ff));
        s1.Start();
        Console.WriteLine("启动新线程ff()方法后，被Main()线程调用！！");
        Thread s2 = new Thread(new ThreadStart(A.gg));
        s2.Start();
        Console.WriteLine("启动新线程gg()方法后，被Main()线程调用！！");
        Console.ReadLine();
    }
    class A
    {
        public void ff() // 线程启动时调用此方法
        {
            Console.WriteLine("A.ff()方法在另一个线程上运行！！");
            Thread.Sleep(3000); // 将线程阻塞一定时间
            Console.WriteLine("终止工作线程调用此实例方法！！");
        }
        public static void gg()
        {
            Console.WriteLine("A.gg()方法在另一个线程上运行！！");
            Thread.Sleep(5000); // 将线程阻塞一定时间
            Console.WriteLine("终止工作线程调用此静态方法！！");
        }
        public static void kk()
        {
            Console.WriteLine("A.kk()方法在另一个线程上运行！！");
            Thread.Sleep(5000); // 将线程阻塞一定时间
            Console.WriteLine("终止工作线程调用此静态方法！！");
        }
    }
    #endregion

    #region 2、线程传参
    /// <summary>
    /// 给线程传递参数示例
    /// </summary>
    public static void parameterThread()
    {
        var d = new Data { Message = "Info" };
        // 一种方式是使用带 ParameterizedThreadStart 委托参数的 Thread 构造函数
        var t2 = new Thread(ThreadMainWithParameters);
        t2.Start(d);
        // 另一种方式是创建一个自定义类，把线程的方法定义为实例方法，
        //这样就可以初始化实例的数据，之后启动线程
        var obj = new MyThread("info");
        var t3 = new Thread(obj.ThreadMain);
        t3.Start();
    }
    private static void ThreadMainWithParameters(object o)
    {
        Data d = (Data)o;
        Console.WriteLine("Running in a thread, received {0}", d.Message);
    }
    public struct Data
    {
        public string Message;
    }
    public class MyThread
    {
        private string data;

        public MyThread(string data)
        {
            this.data = data;
        }

        public void ThreadMain()
        {
            Console.WriteLine("Running in a thread, data: {0}", data);
        }
    }
    #endregion

    #region 3、线程优先级
    /// <summary>
    /// 线程优先级示例
    /// </summary>
    public static void threadPriorityTest()
    {
        Thread.CurrentThread.Name = "主线程";
        Thread objThreadOne = new Thread(new ThreadStart(A.gg));
        objThreadOne.Name = "子线程1";
        Thread objThreadTwo = new Thread(new ThreadStart(A.kk));
        objThreadTwo.Name = "子线程2";
        // 这将启动子线程
        objThreadOne.Start();
        objThreadTwo.Start();
        objThreadTwo.Priority = ThreadPriority.Highest;
    }
    #endregion
}

public class ParallelDemo
{
    #region 1、Parallel.For()
    /// <summary>
    /// Parallel.For()多次执行一个任务，并行运行迭代，迭代的顺序不定
    /// 前两个参数定义循环的开头和结束，第三个参数是一个Action委托
    /// 返回类型是 ParallelLoopResult 结构，提供了循环是否结束的信息
    /// </summary>
    public void ParallelForDemo1()
    {
        ParallelLoopResult result = Parallel.For(0, 10, i =>
        {
            Console.WriteLine("{0}, task: {1}, thread: {2}", i, Task.CurrentId, Thread.CurrentThread.ManagedThreadId);
            Thread.Sleep(10);
        });
        Console.WriteLine("Is completed: {0}", result.IsCompleted);
    }
    /**
     * 有5个任务和5个线程，任务不一定映射到一个线程上
     * 线程也可以被不同的任务重用
     * 0, task: 1, thread: 8
     * 2, task: 2, thread: 9
     * 4, task: 3, thread: 10
     * 6, task: 4, thread: 11
     * 8, task: 5, thread: 12
     * 1, task: 1, thread: 8
     * 3, task: 2, thread: 9
     * 5, task: 3, thread: 10
     * 9, task: 5, thread: 12
     * 7, task: 4, thread: 11
     * Is completed: True
     */

    /// <summary>
    /// Task.Delay是一个异步方法，用于释放线程供其他任务使用
    /// 下面代码使用 await 关键字，所以一旦完成延迟，就立即开始调用这些代码。
    /// 延迟后执行的代码和延迟前执行的代码可以运行在不同的线程中。
    /// 下面用 Task.Delay 方法修改前面的例子，在延迟一定时间后将任务线程和循环迭代的信息写入控制台
    /// </summary>
    public void ParallelForDemo2()
    {
        ParallelLoopResult result = Parallel.For(0, 10, async i =>
        {
            Console.WriteLine("{0}, task: {1}, thread: {2}", i, Task.CurrentId, Thread.CurrentThread.ManagedThreadId);
            await Task.Delay(10);
            Console.WriteLine("{0}, task: {1}, thread: {2}", i, Task.CurrentId, Thread.CurrentThread.ManagedThreadId);
        });
        Console.WriteLine("Is completed: {0}", result.IsCompleted);
    }
    /**
     * 调用 Task.Delay 后，线程发生了变化，如循环迭代1。还可以看到，任务不再存在，只有线程留下了，而且这里重用了前面的线程。
     * 另一面，Parallel.For 并没有等待延迟，而是直接完成。Parallel 类只等待它创建的任务，而不等待其它后台活动
     * 在延迟后，也有可能完全看不到方法的输出，出现这种情况的原因是：主线程结束，所有的后台线程被终止
     * 0, task: 1, thread: 9
     * 2, task: 2, thread: 10
     * 4, task: 3, thread: 11
     * 3, task: 2, thread: 10
     * 6, task: 4, thread: 12
     * 1, task: 1, thread: 9
     * 8, task: 1, thread: 9
     * 9, task: 1, thread: 9
     * 2, task: , thread: 11
     * 0, task: , thread: 11
     * 4, task: , thread: 14
     * 7, task: 4, thread: 12
     * 5, task: 2, thread: 10
     * Is completed: True
     * 5, task: , thread: 12
     * 1, task: , thread: 12
     * 6, task: , thread: 12
     * 3, task: , thread: 12
     * 8, task: , thread: 14
     * 9, task: , thread: 11
     * 7, task: , thread: 10
     */

    /// <summary>
    /// 提前停止 Parallel.For 使用第三个参数的重载版本
    /// 迭代在值大于15时中断，但其他任务可以同时运行，有其他值的任务也可以运行。
    /// 什么意思：假设有5个任务同时进行，一个任务的值大于15时会中断，但是其它4个任务仍然会运行！
    /// 利用 LowestBreakIteration 属性，可以忽略其他任务的结果
    /// </summary>
    public void ParallelForDemo3()
    {
        ParallelLoopResult result = Parallel.For(10, 40, async (int i, ParallelLoopState pls) =>
        {
            Console.WriteLine("{0} task {1}", i, Task.CurrentId);
            await Task.Delay(10);
            if (i > 15)
                pls.Break();
        });
        Console.WriteLine("Is completed: {0}", result.IsCompleted);
        Console.WriteLine("lowest break iteration: {0}", result.LowestBreakIteration);
    }
    /**
     12 task 1
     22 task 2
     13 task 1
     23 task 2
     14 task 1
     24 task 2
     15 task 1
     25 task 2
     16 task 1
     26 task 2
     31 task 1
     27 task 2
     32 task 1
     28 task 2
     33 task 1
     29 task 2
     34 task 1
     30 task 2
     35 task 1
     38 task 2
     36 task 1
     37 task 1
     Is completed: False
     lowest break iteration: 38
     */

    /// <summary>
    /// Parallel.For()方法可能使用几个线程来执行循环。如果需要对每个线程进行初始化，就可以使用Parallel.For<TLocal>()方法。
    /// 除了 from 和 to 对应的值之外，For()方法的泛型版本还接受 3 个委托参数：
    /// 第一个参数(localInit)的类型是Func<TLocal>，本例中定义为Func<string>，即返回 string 的方法
    ///   这个方法仅对用于执行迭代的每个线程调用一次。
    /// 第二个参数(body)为循环体定义了委托。在示例中，该参数的类型是 Func<int, ParallelLoopState, string>。
    ///   1、循环迭代的值，
    ///   2、ParallelLoopState 允许停止循环
    ///   3、接收从 init 方法返回的值，循环体方法还需要返回一个值，其类型是用泛型 for 参数定义的
    /// 最后一个参数(localFinally)指定一个委托 Action<TLocal>，该示例中，接收一个字符串。
    ///   这个方法仅对于每个线程调用一次，这是一个线程退出方法
    /// </summary>
    public void ParallelForDemo4()
    {
        Parallel.For(0, 20, () =>
        {
            // invoked once for each thread
            Console.WriteLine("init thread {0}, task {1}", Thread.CurrentThread.ManagedThreadId, Task.CurrentId);
            return string.Format("t{0}", Thread.CurrentThread.ManagedThreadId);
        },
        (i, pls, str1) =>
        {
            // invoked for each member
            Console.WriteLine("body i {0} str1 {1} thread {2} task {3}", i, str1, Thread.CurrentThread.ManagedThreadId, Task.CurrentId);
            Thread.Sleep(10);
            return string.Format("i {0}", i);
        },
        (str1) =>
        {
            // final action on each thread
            Console.WriteLine("finally {0}", str1);
        });
    }
    /**
        init thread 10, task 1
        body i 0 str1 t10 thread 10 task 1
        init thread 11, task 2
        body i 5 str1 t11 thread 11 task 2
        init thread 13, task 3
        body i 10 str1 t13 thread 13 task 3
        init thread 12, task 4
        body i 15 str1 t12 thread 12 task 4
        init thread 14, task 5
        body i 1 str1 t14 thread 14 task 5
        body i 2 str1 i 0 thread 10 task 1
        body i 6 str1 i 5 thread 11 task 2
        body i 11 str1 i 10 thread 13 task 3
        body i 16 str1 i 15 thread 12 task 4
        body i 4 str1 i 1 thread 14 task 5
        body i 3 str1 i 2 thread 10 task 1
        body i 7 str1 i 6 thread 11 task 2
        body i 12 str1 i 11 thread 13 task 3
        body i 8 str1 i 4 thread 14 task 5
        body i 17 str1 i 16 thread 12 task 4
        body i 13 str1 i 3 thread 10 task 1
        body i 18 str1 i 7 thread 11 task 2
        finally i 12
        finally i 17
        body i 9 str1 i 8 thread 14 task 5
        body i 14 str1 i 13 thread 10 task 1
        body i 19 str1 i 18 thread 11 task 2
        finally i 9
        finally i 14
        finally i 19
     */
    #endregion

    #region 2、Parallel.ForEach()
    /// <summary>
    /// Parallel.ForEach()方法遍历实现了IEnumerable的集合，类似foreach，但以异步方式遍历，也没有确定遍历顺序
    /// </summary>
    public void ParallelForEachDemo1()
    {
        string[] data = { "zero", "one", "two", "three", "four", "five",
            "six", "seven", "eight", "nine", "ten", "eleven", "twelve" };
        ParallelLoopResult result = Parallel.ForEach(data, s => { Console.WriteLine(s); });
    }

    /// <summary>
    /// 如果需要中断循环，可以使用重载版本的 ParallelLoopState 参数，也可以用于访问索引器，从而获得迭代次数
    /// </summary>
    public void ParallelForEachDemo2()
    {
        string[] data = { "zero", "one", "two", "three", "four", "five",
            "six", "seven", "eight", "nine", "ten", "eleven", "twelve" };
        ParallelLoopResult result = Parallel.ForEach(data, (string s, ParallelLoopState pls, long l) =>
        {
            Console.WriteLine("{0} {1}", s, l);
        });
    }
    #endregion

    #region 3、Parallel.Invoke()
    /// <summary>
    /// Parallel.Invoke()提供了任务并行模式，允许传递一个Action委托数组，在其中可以指定运行的方法
    /// </summary>
    public static void ParallelInvokeDemo()
    {
        Parallel.Invoke(Foo, Bar);
    }

    private static void Foo()
    {
        Console.WriteLine("foo");
    }

    private static void Bar()
    {
        Console.WriteLine("bar");
    }
    #endregion
}

public class TaskDemo
{
    #region 1、Task使用线程池
    /// <summary>
    /// 启动（使用了线程池中线程）任务的不同方式
    /// </summary>
    public static void TaskUsingThreadPool()
    {
        // 1.使用实例化的 TaskFactory 类
        var tf = new TaskFactory();
        Task t1 = tf.StartNew(TaskMethod, "using a task factory");
        // 2.使用 Task 类的静态属性 Factory，与 1 类似，但是对工厂创建的控制没有那么全面
        Task t2 = Task.Factory.StartNew(TaskMethod, "factory via a task");
        // 3.使用 Task 的构造函数，实例化时指定状态为 Created，不会马上启动
        var t3 = new Task(TaskMethod, "uainq a task constructor and Start");
        // 启动任务
        t3.Start();
        // 4.Task类的Run方法，立即启动任务
        Task t4 = Task.Run(() => TaskMethod("using the run method"));
    }
    private static void TaskMethod(object obj)
    {
        Console.WriteLine(obj);
    }
    #endregion

    #region 2、Task同步执行
    /// <summary>
    /// Task 类的 RunSynchronously 方法:
    ///   主线程是一个前台线程，没有任务ID，也不是线程池中的线程。
    ///   调用 RunSynchronously 方法时，会使用相同的线程作为主调线程，但是如果以前没有创建任务，就会创建一个任务
    /// </summary>
    public static void RunSynchronousTask()
    {
        TaskMethod("just the main thread");
        var t1 = new Task(TaskMethod, "run sync");
        t1.RunSynchronously();
    }
    #endregion

    #region 3、Task使用单独线程（不在线程池中获取）
    /// <summary>
    /// 使用单独线程的任务的示例
    /// </summary>
    public static void LongRunningTask()
    {
        var t1 = new Task(TaskMethod, "long running", TaskCreationOptions.LongRunning);
        t1.Start();
    }
    #endregion

    #region 4、Task返回执行结果
    /// <summary>
    /// 返回某个结果的任务示例：
    ///   定义一个返回结果的任务时，要使用泛型类Task<TResult>。泛型参数定义了返回类型。
    ///   通过构造函数，把这个方法传递给 Func 委托，第二个参数定义了输入值。
    ///   启动任务，Task 实例的 Result 属性被禁用，并一直等到任务完成。
    ///   任务完成后，Result 属性包含任务的结果。
    /// </summary>
    public static void simpleTask()
    {
        var t1 = new Task<Tuple<int, int>>(TaskWithResult, Tuple.Create(8, 3));
        t1.Start();
        Console.WriteLine(t1.Result);
        t1.Wait();
        Console.WriteLine("result from task: {O} {1}", t1.Result.Item1, t1.Result.Item2);
    }
    /// <summary>
    /// 由任务调用来返回结果的方法: 本示例利用一个元组返回两个int值
    /// </summary>
    /// <param name="division"></param>
    /// <returns></returns>
    private static Tuple<int, int> TaskWithResult(object division)
    {
        Tuple<int, int> div = (Tuple<int, int>)division;
        int result = div.Item1 / div.Item2;
        int reminder = div.Item1 % div.Item2;
        Console.WriteLine("task creates a result...");
        return Tuple.Create(result, reminder);
    }
    #endregion

    #region 5、Task创建连续任务
    /// <summary>
    /// 连续的任务示例
    /// </summary>
    public static void simpleTask2()
    {
        Task t1 = new Task(DoOnFirst);
        Task t2 = t1.ContinueWith(DoOnSecond);
        Task t3 = t1.ContinueWith(DoOnSecond, TaskContinuationOptions.OnlyOnFaulted);
        Task t4 = t2.ContinueWith(DoOnSecond);
    }
    static void DoOnFirst()
    {
        Console.WriteLine("doing some task {0}", Task.CurrentId);
        Thread.Sleep(3000);
    }
    static void DoOnSecond(Task t1)
    {
        Console.WriteLine("task {0} finished", t1.Id);
        Console.WriteLine("this task id {0}", Task.CurrentId);
        Console.WriteLine("do some cleanup");
        Thread.Sleep(3000);
    }
    #endregion

    #region 6、Task创建任务结构
    /// <summary>
    /// 任务层次结构示例：
    ///   创建子任务的代码与创建父任务的代码相同，唯一的区别是这个任务从另一个任务内部创建。
    ///   如果父任务在子任务之前结束，父任务的状态就显示为 WaitingForChildrenToComplete。
    ///   所有的子任务也结束时，父任务的状态就变成 RanToCompletion。
    ///   当然，如果父任务用 TaskCreationOptions 枚举中的 DetachedFromParent 创建子任务时，这就无效。取消父任务，也会取消子任务。
    /// </summary>
    public static void ParentAndChild()
    {
        var parent = new Task(ParentTask);
        parent.Start();
        Thread.Sleep(2000);
        Console.WriteLine(parent.Status);
        Thread.Sleep(4000);
        Console.WriteLine(parent.Status);
    }
    static void ParentTask()
    {
        Console.WriteLine("task id {0}", Task.CurrentId);
        var child = new Task(ChildTask);
        child.Start();
        Thread.Sleep(1000);
        Console.WriteLine("parent started child");
    }
    static void ChildTask()
    {
        Console.WriteLine("child");
        Thread.Sleep(5000);
        Console.WriteLine("child finished");
    }
    #endregion

    

    #region Foundations
    static void Foundations()
    {
        var ctx = new DispatcherSynchronizationContext();
        SynchronizationContext.SetSynchronizationContext(ctx);

        // CallerWithAsync();
        // CallerWithContinuationTask();
        // CallerWithAwaiter();
        // MultipleAsyncMethods();
        // MultipleAsyncMethodsWithCombinators1();
        // MultipleAsyncMethodsWithCombinators2();
        ConvertingAsyncPattern();
        Console.ReadLine();
    }

    private static async void ConvertingAsyncPattern()
    {
        string r = await Task<string>.Factory.FromAsync(BeginGreeting, EndGreeting, "Angela", null);
        Console.WriteLine(r);
    }


    private async static void MultipleAsyncMethods()
    {
        string s1 = await GreetingAsync("Stephanie");
        string s2 = await GreetingAsync("Matthias");
        Console.WriteLine("Finished both methods.\n Result 1: {0}\n Result 2: {1}", s1, s2);
    }

    private async static void MultipleAsyncMethodsWithCombinators1()
    {
        Task<string> t1 = GreetingAsync("Stephanie");
        Task<string> t2 = GreetingAsync("Matthias");
        await Task.WhenAll(t1, t2);
        Console.WriteLine("Finished both methods.\n Result 1: {0}\n Result 2: {1}", t1.Result, t2.Result);
    }

    private async static void MultipleAsyncMethodsWithCombinators2()
    {
        Task<string> t1 = GreetingAsync("Stephanie");
        Task<string> t2 = GreetingAsync("Matthias");
        string[] result = await Task.WhenAll(t1, t2);
        Console.WriteLine("Finished both methods.\n Result 1: {0}\n Result 2: {1}", result[0], result[1]);
    }

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

    private static void CallerWithAwaiter()
    {
        Console.WriteLine(Thread.CurrentThread.ManagedThreadId);
        string result = GreetingAsync("Matthias").GetAwaiter().GetResult();
        Console.WriteLine(result);
        Console.WriteLine(Thread.CurrentThread.ManagedThreadId);
    }

    private async static void CallerWithAsync()
    {
        Console.WriteLine("started CallerWithAsync in thread {0} and task {1}", Thread.CurrentThread.ManagedThreadId, Task.CurrentId);
        string result = await GreetingAsync("Stephanie");
        Console.WriteLine(result);
        Console.WriteLine("finished GreetingAsync in thread {0} and task {1}", Thread.CurrentThread.ManagedThreadId, Task.CurrentId);
    }

    private async static void CallerWithAsync2()
    {
        Console.WriteLine("started CallerWithAsync in thread {0} and task {1}", Thread.CurrentThread.ManagedThreadId, Task.CurrentId);
        Console.WriteLine(await GreetingAsync("Stephanie"));
        Console.WriteLine("finished GreetingAsync in thread {0} and task {1}", Thread.CurrentThread.ManagedThreadId, Task.CurrentId);
    }

    static Task<string> GreetingAsync(string name)
    {
        return Task.Run(() =>
        {
            Console.WriteLine("running greetingasync in thread {0} and task {1}", Thread.CurrentThread.ManagedThreadId, Task.CurrentId);
            return Greeting(name);
        });
    }

    static string Greeting(string name)
    {
        Console.WriteLine("running greeting in thread {0} and task {1}", Thread.CurrentThread.ManagedThreadId, Task.CurrentId);

        Thread.Sleep(3000);
        return string.Format("Hello, {0}", name);
    }

    private static Func<string, string> greetingInvoker = Greeting;

    static IAsyncResult BeginGreeting(string name, AsyncCallback callback, object state)
    {
        return greetingInvoker.BeginInvoke(name, callback, state);
    }

    static string EndGreeting(IAsyncResult ar)
    {
        return greetingInvoker.EndInvoke(ar);
    }
    #endregion
}
 