using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SC.AsyncSamples
{
    /// <summary>
    /// 同步
    ///   如果需要共享数据，就必须使用同步技术，确保一次只有一个线程访问和改变共享状态。
    ///   可以用于多个线程的同步技术：
    ///   ● lock
    ///   ● Interlocked
    ///   ● Monitor
    ///   ● SpinLock
    ///   ● WaitHandle
    ///   ● Mutex
    ///   ● Semaphore
    ///   ● Event
    ///   ● Barrier
    ///   ● ReadWriterLockSlim
    ///   lock、Interlocked、Monitor可用于进程内部的同步;
    ///   Mutex、Event、Semaphore、ReadWriterLockSlim提供了多个进程之间的线程同步
    /// 最佳实践：使用锁定需要时间，且并不总是必须的。
    ///   可以创建类的两个版本，一个同步版本，一个异步版本。<see cref="Demo"/>
    ///   
    /// </summary>
    class SyncSkill
    {
        #region 1、lock
        /// <summary>
        /// C#为多个线程的同步提供了自己的关键字：lock语句。lock语句是设置锁定和解除锁定的一种简单方式。
        /// </summary>
        static void SyncSample()
        {
            // 创建一个SharedState对象，并把它传递给20个Task对象的构造函数
            int numTasks = 20;
            var state = new SharedState();
            var tasks = new Task[numTasks];
            // 因为执行了50000次循环，有20个任务，所以写入控制台的值应是1000000。但是，事实常常并非如此
            for (int i = 0; i < numTasks; i++)
            {
                tasks[i] = Task.Run(() => new Job(state).DoTheJob());
            }
            for (int i = 0; i < numTasks; i++)
            {
                tasks[i].Wait();
            }
            Console.WriteLine("summarized {0}", state.State);
        }
        #endregion

        #region 2、Interlocked
        /// <summary>
        /// Interlocked类用于使变量的简单语句原子化，它的操作包括从内存中获取一个值，给该值递增1，再将它存储回内存。
        /// Interlocked类提供了以线程安全的方式递增、递减、交换和读取值的方法。
        /// 与其他同步技术相比，使用Interlocked类会快得多。但是，它只能用于简单的同步问题。
        /// 例如，这里不使用lock语句锁定对someState变量的访问，把它设置为一个新值，以防它是空的，而可以使用Interlocked类，它比较快：
        /// </summary>
        public class InterlockDemo
        {
            string someState;
            string newState;
            int state;
            public void lockTest()
            {
                lock (this)
                {
                    if (someState == null)
                    {
                        someState = newState;
                    }
                }
            }

            public void InterlockTest()
            {
                Interlocked.CompareExchange(ref someState, newState, null);
            }

            // 不是像下面这样在lock语句中执行递增操作
            //public int State
            //{
            //    get
            //    {
            //        lock (this)
            //        {
            //            return ++state;
            //        }
            //    }
            //}
            // 而使用较快的Interlocked.Increment()方法
            public int State
            {
                get
                {
                    return Interlocked.Increment(ref state);
                }
            }
        }

        #endregion

        #region 3、Monitor
        /// <summary>
        /// lock 语句由 C# 编译器解析为使用 Monitor 类。
        /// 使用 Monitor 类的形式，与使用 lock 关键字基本上是一样的，
        /// 不过与 lock 关键字不同的是，Monitor 类还具有 TryEnter、Wait、Pulse 以及 PulseAll 方法。
        /// </summary>
        public class SimpleMonitorClass
        {
            protected ClassCounter m_protectedResource = new ClassCounter();
            protected void IncrementProtectedResourceMethod()
            {
                //lock (m_protectedResource)
                //{
                //  //synchronized region for obj
                //}
                Monitor.Enter(m_protectedResource);
                try
                {
                    m_protectedResource.Increment();
                }
                finally
                {
                    Monitor.Exit(m_protectedResource);
                }
            }
            /// <summary>
            /// TryEnter 方法与 Enter 方法的区别很简单，就是 Enter 方法在返回之前，会无限时等待受保护部分的锁定释放。
            /// 可以添加一个等待被锁定的超时值，这样就不会无限期地等待被锁定。
            /// 可以像下面的例子那样使用 TryEnter 方法，其中给它传递一个超时值，指定等待被锁定的最长时间。
            /// 如果 obj 被锁定，TryEnter() 方法就把布尔型的引用参数设置为 true，并同步地访问由对象 obj 锁定的状态。
            /// 如果另一个钱程锁定 obj 的时间超过了500毫秒，TryEnter 方法就把变量 lockTaken 设置为 false，线程不再等待，而是用于执行其他操作。
            /// 也许在以后，该线程会尝试再次获得锁定。
            /// </summary>
            protected void IncrementProtectedResourceMethod2()
            {
                bool lockTaken = false;
                Monitor.TryEnter(m_protectedResource, 500, ref lockTaken);
                if (lockTaken)
                {
                    try
                    {
                        m_protectedResource.Increment();
                    }
                    finally
                    {
                        Monitor.Exit(m_protectedResource);
                    }
                }
            }

            public static void Demo()
            {
                SimpleMonitorClass exampleClass = new SimpleMonitorClass();
                exampleClass.IncrementProtectedResourceMethod();
            }
        }

        #endregion

        #region 4、SpinLock
        /**
         * 如果基于对象的锁定对象(Monitor)的系统开销由于垃圾回收而过高，就可以使用SpinLock结构。
         * SpinLock 结构是在 .NET 4 开始引入的。如果有大量的锁定（例如，列表中的每个节点都有一个锁定），且锁定的时间总是非常短，SpinLock结构就很有用。
         * 应避免使用多个 SpinLock 结构，也不要调用任何可能阻塞的内容。
         * 除了体系结构上的区别之外，SpinLock 结构的用法非常类似于 Monitor 类。获得锁定使用 Enter() 或 TryEnter() 方法，释放锁定使用 Exist 方法。
         * SpinLock 结构还提供了属性 IsHeld 和 IsHeldByCurrentThread，指定它当前是否是锁定的。
         * 传送 SpinLock 实例时要小心，因为 SpinLock 定义为结构，把一个变量赋予另一个变量会创建一个副本，所以应该总是通过引用传送 SpinLock 实例。
         */
        #endregion

        #region 5、WaitHandle
        delegate int TakesAWhileDelegate(int a, int b);
        /// <summary>
        /// WaitHandle 是一个抽象基类，用于等待一个信号的设置。可以等待不同的信号，因为 WaitHandle 是一个基类，可以从中派生一些类。
        /// 在描述异步委托时，已经使用了 WaitHandle 基类。异步委托的 BeginInvoke() 方法返回一个实现了 IAsycResult 接口的对象。
        /// 使用 IAsycResult 接口，可以用 AsycWaitHandle 属性访问 WaitHandle 基类。
        /// 在调用 WaitOne() 方法时，线程会等待接收一个与等待句柄相关的信号。
        /// 使用 WaitHandle 基类可以等待一个信号的出现（WaitOne()方法）、等待必须发出信号的多个对象（WaitAll()方法）、或者等待多个对象中的一个（WaitAny()方法）。
        /// WaitAll() 和 WaitAny() 是 WaitHandle 类的静态方法，接收一个 WaitHandle 参数数组。
        /// WaitHandle 基类有一个 SafeWaitHandle 属性，其中可以将一个本机句柄赋予一个操作系统资源，并等待该句柄。
        /// 例如，可以指定一个 SafeFileHandle 等待文件 I/O 操作的完成，或者指定自定义的 SafeTransactionHandle。
        /// 因为Murex、EventWaitHandle 和 Semapbore 类派生自 WaitHandle 基类，所以可以在等待时使用它们。
        /// </summary>
        public void WaitHandleDemo()
        {
            TakesAWhileDelegate d1 = TakesAWhile;
            IAsyncResult ar = d1.BeginInvoke(1, 3000, null, null);
            while (true)
            {
                Console.Write(".");
                if (ar.AsyncWaitHandle.WaitOne(50, false))
                {
                    Console.WriteLine("Can get the result now");
                    break;
                }
            }
            int result = d1.EndInvoke(ar);
            Console.WriteLine("result: {0}", result);
        }
        public int TakesAWhile(int a, int b)
        {
            return a + b;
        }
        #endregion

        #region 6、Mutex
        /// <summary>
        /// Mutex（mutual exclusion，互斥）是.NET Framework 中提供跨多个进程同步访问的一个类。
        /// 它非常类似于Monitor类，因为它们都只有一个线程能拥有锁定。只有一个线程能获得互斥锁定，访问受互斥保护的同步代码区域。
        /// 在 Mutex 类的构造函数中，可以指定互斥是否最初应由主调线程拥有，定义互斥的名称，获得互斥是否已存在的信息。
        /// 使用 Mutex 同步，避免多个线程在同一时刻访问同一共享资源 Mutex
        /// </summary>
        public void MutexDemo()
        {
            bool createdNew;
            /**
             * 接收一个表示互斥是否为新建的布尔值(createdNew)。如果返回的值是false，就表示互斥己经定义。
             * 互斥可以在另一个进程中定义，因为操作系统能够识别有名称的互斥，它由不同的进程共享。
             * 如果没有给互斥指定名称，互斥就是未命名的，不在不同的进程之间共享。
             */
            Mutex mutex = new Mutex(false, "ProCSharpMutex", out createdNew);
            // 由于系统能识别有名称的互斥，因此可以使用它禁止应用程序启动两次
            if (!createdNew)
            {
                // 程序关闭
            }
            /**
             * 要打开己有的互斥，还可以使用 Mutex.OpenExisting() 方法，它不需要用构造函数创建互斥时需要的相同 .NET 权限。
             * 由于 Mutex 类派生自基类 WaitHandle，因此可以利用 WaitOne() 方法获得互斥锁定，在该过程中成为该互斥的拥有者。
             * 调用 ReleaseMutex() 方法，即可释放互斥。
             */
            if (mutex.WaitOne())
            {
                try
                {
                    //synchronized region
                }
                finally
                {
                    mutex.ReleaseMutex();
                }
            }
            else
            {
                //some problem happened while waiting
            }
        }
        #endregion

        #region 7、Semaphore
        /// <summary>
        /// Semaphore 信号灯同步限制了访问同一共享资源的线程数量。
        /// 信号量非常类似于互斥，其区别是，信号量可以同时由多个线程使用。信号量是一种计数的互斥锁定。
        /// 使用信号量，可以定义允许同时访问受旗语锁定保护的资源的线程个数。如果需要限制可以访问可用资源的线程数，信号量就很有用。
        /// 例如，如果系统有 3 个物理端口可用，就允许 3 个线程同时访问 I/O 端口，但第 4 个线程需要等待前 3 个线程中的一个释放资源。
        /// .NET4.5 为信号量功能提供了两个类 Semaphore 和 SemaphoreSlim。
        /// Semaphore 类可以命名，使用系统范围内的资源，允许在不同进程之间同步。
        /// SemaphoreSlim 类是对较短等待时间进行了优化的轻型版本。
        /// </summary>
        public void SemaphoreDemo()
        {
            int taskCount = 6;
            int semaphoreCount = 3;
            // 创建一个计数为3的信号量
            // 最初释放的锁定数（第一个参数），锁定个数的计数（第二个参数）
            // 如果参数1小于参数2，它们的差就是已经分配线程的计数值
            // 与互斥一样，也可以给信号量指定名称，使之在不同的进程之间共享。
            // 这里定义信号量时没有指定名称，所以它只能在这个进程中使用。
            var semaphore = new SemaphoreSlim(semaphoreCount, semaphoreCount);
            // 创建6个任务
            var tasks = new Task[taskCount];
            for (int i = 0; i < taskCount; i++)
            {
                // 启动的6个任务都获得了相同的信号量
                tasks[i] = Task.Run(() => TaskMain(semaphore));
            }
            Task.WaitAll(tasks);
            Console.WriteLine("All tasks finished");
        }
        /// <summary>
        /// 任务利用 Wait() 方法锁定信号量，信号量的计数是3，所以有3个任务可以获得锁定。
        /// 第4个任务必须等待，这里还定义了最长的等待时间为600毫秒。如果在该等待时间过后未能获得锁定，任务就把一条消息写入控制台，在循环中继续等待。
        /// 只要获得了锁定，任务就把一条消息写入控制台，睡眠一段时间，然后解除锁定。
        /// 在解除锁定时，在任何情况下一定要解除资源的锁定，这一点很重要。这就是在 finally 处理程序中调用 Semaphote 类的 Release() 方法的原因。
        /// </summary>
        /// <param name="semaphore"></param>
        static void TaskMain(SemaphoreSlim semaphore)
        {
            bool isCompleted = false;
            while (!isCompleted)
            { 
                if (semaphore.Wait(600))
                {
                    try
                    {
                        Console.WriteLine("Task {0} locks the semaphore", Task.CurrentId);
                        Thread.Sleep(2000);
                    }
                    finally
                    {
                        Console.WriteLine("Task {0} releases the semaphore", Task.CurrentId);
                        semaphore.Release();
                        isCompleted = true;
                    }
                }
                else
                {
                    Console.WriteLine("Timeout for task {0}; wait again", Task.CurrentId);
                }
            }
        }
        #endregion

        #region 8、Event
        /// <summary>
        /// Critical Section 临界区同步的作用与 mutex 是一样的，但临界区同步不能跨进程（lock、Monitor、Interlocked、ReaderWriterLock）
        /// Event 事件同步能够通知其他线程执行指定操作（AutoResetEvent、ManualResetEvent、WaitHandle）
        /// 
        /// 与互斥和信号量对象一样，事件也是一个系统范围内的资源同步方法。
        /// 为了从托管代码中使用系统事件，.NET Framework 在 System.Threading 名称空间中提供了 ManualResetEvent、AutoResetEvent、ManualResetEventSlim 和 CountdownEvent 类。
        /// ManualResetEventSlim 和 CountdownEvent 类是 .NET4 新增的。
        /// C# 中的 event 关键字基于委托，和 System.Threading 名称空间中的 event 类没有关系。
        /// 可以使用事件通知其他任务：这里有一些数据，并完成了一些操作等。事件可以发信号，也可以不发信号。
        /// 使用前面介绍的 WaitHandle 类，任务可以等待处于发信号状态的事件。
        /// 调用 Set() 方法，即可向 ManualResetEventSlim 发信号。
        /// 调用 Reset() 方法，可以使之返回不发信号的状态。
        /// 如果多个线程等待向一个事件发信号，并调用了 Set() 方法，就释放所有等待的线程。
        /// 另外，如果一个线程刚刚调用了 WaitOne() 方法，但事件己经发出信号，等待的线程就可以继续等待。
        /// 也可以通过调用 Set() 方法向 AutoResetEvent 发信号。也可以使用 Reset() 方法使之返回不发信号的状态。
        /// 但是，如果一个线程在等待自动重置的事件发信号，当第一个线程的等待状态结束时，该事件会自动变为不发信号的状态。 
        /// 这样，如果多个线程在等待向事件发信号，就只有一个线程结束其等待状态，它不是等待时间最长的线程，而是优先级最高的线程。
        /// 在一个类似的场景中，为了把一些工作分支到多个任务中，并在以后合并结果，使用新的 CountdownEvent 类很有用。
        /// 不需要为每个任务创建一个单独的事件对象，而只需要创建一个事件对象。
        /// CountdownEvent 类为所有设置了事件的任务定义了个初始数字，在到达该计数后，就向 CountdownEvent 类发信号。
        /// 示例方法现在可以简化，使它只需要等待一个事件。如果不像前面那样单独处理结果，这个新版本就很不错。
        /// </summary>
        static void EventDemo()
        {
            const int taskCount = 4;
            // 定义包含 4 个 ManualResetEventSlim 对象的数组
            var mEvents = new ManualResetEventSlim[taskCount];
            var waitHandles = new WaitHandle[taskCount];
            // 包含 4 个 Calculator 对象的数组
            var calcs = new Calculator[taskCount];

            for (int i = 0; i < taskCount; i++)
            {
                int i1 = i;
                mEvents[i] = new ManualResetEventSlim(false);
                /**
                  * 与 ManualResetEvent 对象不同，ManualResetEventSlim 对象不派生自 WaitHandle 类。
                  * 因此有一个 WaitHandle 对象的集合，它在 ManualResetEventSlim 类的 WaitHandle 属性中填充。
                  */
                waitHandles[i] = mEvents[i].WaitHandle;
                // 每个 Calculator 在构造函数中用一个 ManualResetEventSlim 对象初始化
                // 这样每个任务在完成时都有自己的事件对象来发信号
                calcs[i] = new Calculator(mEvents[i]);
                // 使用Task，让不同的任务执行计算任务
                Task.Run(() => calcs[i1].Calculation(i1 + 1, i1 + 3));
            }

            for (int i = 0; i < taskCount; i++)
            {
                // WaitHandle 类现在用于等待数组中的任意一个事件。WaitAny() 方法等待向任意一个事件发信号
                int index = WaitHandle.WaitAny(waitHandles);
                if (index == WaitHandle.WaitTimeout)
                {
                    Console.WriteLine("Timeout!!");
                }
                else
                {
                    // 从 WaitAny 方法返回的 index 值匹配传递给 WaitAny() 方法的事件数组的索引，以提供发信号的事件的相关信息，使用该索引可以从这个事件中读取结果。
                    mEvents[index].Reset();
                    Console.WriteLine("finished task for {0}, result: {1}", index, calcs[index].Result);
                }
            }
        }
        public class Calculator
        {
            private ManualResetEventSlim mEvent;

            public int Result { get; private set; }

            public Calculator(ManualResetEventSlim ev)
            {
                this.mEvent = ev;
            }

            /// <summary>
            /// 任务入口点
            /// </summary>
            /// <param name="x"></param>
            /// <param name="y"></param>
            public void Calculation(int x, int y)
            {
                Console.WriteLine("Task {0} starts calculation", Task.CurrentId);
                Thread.Sleep(new Random().Next(3000));
                // 在随机的一段时间后完成计算
                Result = x + y;
                // signal the event—completed!
                Console.WriteLine("Task {0} is ready", Task.CurrentId);
                // 向事件发信号
                mEvent.Set();
                // cEvent.Signal();
            }
        }
        #endregion

        #region 9、Barrier

        #endregion
    }

    #region ...
    internal class ClassCounter
    {
        internal void Increment()
        {
            throw new NotImplementedException();
        }
    }

    public class SharedState
    {
        private int state = 0;
        public int State { get; set; }
    }

    public class Job
    {
        SharedState sharedState;
        static SharedState staticSharedState;
        private object syncRoot = new object();

        public Job(SharedState sharedState)
        {
            this.sharedState = sharedState;
        }
        public void DoTheJob()
        {
            /**
             * 必须在这个程序中添加同步功能，这可以用lock关键宇实现。
             * 用lock语句定义的对象表示，要等待指定对象的锁定。只能传递引用类型。
             * 锁定值类型只是锁定了一个副本，这没有什么意义。如果对值类型使用了lock语句，C#编译器就会发出个错误。
             * 进行了锁定后（只锁定了一个线程），就可以运行lock语句块。在lock语句块的最后，对象的锁定被解除，另一个等待锁定的线程就可以获得该锁定块了。
             */
            //var syncObj = new object();
            //lock (syncObj)
            /**
             * 使用lock关键字可以将类的实例成员设置为线程安全的。这样，一次只有一个线程能访问相同实例的方法。
             * 但是，因为实例的对象也可以用于外部的同步访问（锁定实例后，实例的同步方法都无法访问！），
             * 而且我们不能在类自身中控制这种访问，所以应采用SyncRoot模式。
             * 通过SyncRoot模式，创建一个私有对象syncRoot，将这个对象用于lock语句。
             */
            //lock(this)
            //lock (syncRoot)
            {
                for (int i = 0; i < 50000; i++)
                {
                    sharedState.State += 1;
                }
            }
        }

        public static void DoStaticJob()
        {
            lock (typeof(Job)) // 要锁定静态成员，可以把锁放在object类型上
            {
                for (int i = 0; i < 50000; i++)
                {
                    staticSharedState.State += 1;
                }
            }
        }
    }

    /// <summary>
    /// Demo类本身不是同步的，但是该类定义了一个内部类SynchronizedDemo
    /// 必须注意，在使用SynchronizedDemo类时，只有方法是同步的，对两个成员的调用没有同步
    /// </summary>
    public class Demo
    {
        private class SynchronizedDemo : Demo
        {
            private object syncRoot = new object();
            private Demo d;

            public SynchronizedDemo(Demo d)
            {
                this.d = d;
            }

            public override bool IsSynchronized
            {
                get { return true; }
            }

            public override void DoThat()
            {
                lock (syncRoot)
                {
                    d.DoThat();
                }
            }

            public override void DoThis()
            {
                lock (syncRoot)
                {
                    d.DoThis();
                }
            }
        }

        public virtual bool IsSynchronized
        {
            get { return false; }
        }

        public static Demo Synchronized(Demo d)
        {
            if (!d.IsSynchronized)
            {
                return new SynchronizedDemo(d);
            }
            return d;
        }

        public virtual void DoThis()
        {

        }

        public virtual void DoThat()
        {

        }
    }

    #endregion  
}
