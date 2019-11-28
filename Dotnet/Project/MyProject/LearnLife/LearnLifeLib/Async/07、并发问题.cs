using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SC.AsyncSamples
{
    /// <summary>
    /// 多线程可以同时运行，但如果访问相同的数据就很容易出问题。使用lock关键字来实现线程同步。
    /// 并发问题
    ///   用多个线程编程并不容易。在启动访问相同数据的多个线程时，会间歇性地遇到难以发现的问题。
    ///   如果使用任务、并行LINQ或Parallel类，也会遇到这些问题。
    ///   为了避免这些问题，必须特别注意同步问题和多个线程可能发生的其他问题。
    ///   下面探讨与线程相关的问题：争用条件和死锁。
    /// </summary>
    class AsyncProblems
    {
        #region 1、争用条件

        /// <summary>
        /// 争用条件
        /// 解决方法：
        ///   1、要避免争用条件，可以锁定共享的对象。这可以在线程中完成<see cref="SampleTask.RaceCondition(object)"/>。
        ///   2、将共享对象设置为线程安全的对象<see cref="StateObject.ChangeState(int)"/>
        /// </summary>
        static void RaceConditions()
        {
            var state = new StateObject();
            for (int i = 0; i < 2; i++)
            {
                Task.Run(() => new SampleTask().RaceCondition(state));
            }
        }

        #endregion

        #region 2、死锁
        /// <summary>
        /// 死锁
        ///   过多的锁定也会有麻烦。在死锁中，至少有两个线程被挂起，并等待对方解除锁定。
        ///   由于两个线程都在等待对方，就出现了死锁，线程将无限等待下去。
        /// 解决方法：
        ///   死锁问题并不总是这么明显。一个线程锁定了s1，接着锁定s2；另一个线程锁定了s2，接着锁定s1。
        ///   在本例中只需要改变锁定顺序，这两个线程就会以相同的顺序进行锁定。但是，锁定可能隐藏在方法的深处。
        ///   为了避免这个问题，可以在应用程序的体系架构中，从一开始就设计好锁定顺序，也可以为锁定定义超时时间。
        /// </summary>
        static void Deadlock()
        {
            var s1 = new StateObject();
            var s2 = new StateObject();
            /** 
             * Deadlock1先锁定s1，再锁定s2；Deadlock2先锁定s2，再锁定s1。可能情况：
             * Deadlock1锁定s1锁，此时出现一次线程切换，Deadlock2开始运行，并锁定s2
             * 第二个线程现在等待s1锁定的解除，因为它需要等待，线程调度器再次调度到第一个线程
             * 但第一个线程在等待s2锁定的解除。这两个线程都在等待
             * 只要锁定块没有结束，就不会解除锁定。这是一个典型的死锁
             */
            Task.Run(() => new SampleTask(s1, s2).Deadlock1());
            Task.Run(() => new SampleTask(s1, s2).Deadlock2());
            Thread.Sleep(100000);
        }
        #endregion
    }

    #region ...
    public class StateObject
    {
        private int state = 5;
        private object sync = new object();

        public void ChangeState(int loop)
        {
            /**
             * 因为只有引用变量才能锁定，所以定义一个sync，将它用于lock语句。
             * 每次state的值更改时，都使用同一个对象来锁定，就不会出现争用条件
             */
            //lock (sync)
            {
                /**
                 * 在给包含5的变量递增了1后，可能认为该变量的值就是6。但事实不一定是这样。
                 * 例如，如果一个线程刚刚执行完 if(state==5) 语句，它就被其它线程抢占，调度器运行另一个线程。
                 * 第二个线程进入if，state递增到6，第一个线程再次被调度，state将被递增到7，这时就发生了争用条件
                 */
                if (state == 5)
                {
                    state++;
                    Trace.Assert(state == 6, "Race condition occurred after " + loop + " loops");
                }
                state = 5;
            }
        }
    }

    /// <summary>
    /// 如果两个或多个线程访问相同的对象，并且对共享状态的访问没有同步，就会出现争用条件。
    /// </summary>
    public class SampleTask
    {
        //internal static int a;
        //private static Object sync = new object();

        public SampleTask()
        {

        }

        public void RaceCondition(object o)
        {
            Trace.Assert(o is StateObject, "o must be of type StateObject");
            StateObject state = o as StateObject;

            int i = 0;
            while (true)
            {
                /**
                 * 用lock锁定线程中共享的state变量，只有一个线程能在锁定块中处理共享的state对象。
                 * 由于这个对象在所有的线程之间共享，因此如果一个线程锁定了state，另一个线程就必须等待该锁定的解除
                 * 一旦接受锁定，线程就拥有该锁定，直到该锁定块的末尾才能解除锁定，此时就不会出现争用条件
                 */
                // lock (state) // no race condition with this lock
                {
                    state.ChangeState(i++);
                }
            }
        }

        public SampleTask(StateObject s1, StateObject s2)
        {
            this.s1 = s1;
            this.s2 = s2;
        }

        StateObject s1;
        StateObject s2;


        public void Deadlock1()
        {
            int i = 0;
            while (true)
            {
                lock (s1)
                {
                    lock (s2)
                    {
                        s1.ChangeState(i);
                        s2.ChangeState(i++);
                        Console.WriteLine("still running, {0}", i);
                    }
                }
            }

        }

        public void Deadlock2()
        {
            int i = 0;
            while (true)
            {
                lock (s2)
                {
                    lock (s1)
                    {
                        s1.ChangeState(i);
                        s2.ChangeState(i++);
                        Console.WriteLine("still running, {0}", i);
                    }
                }
            }
        }

    }
    #endregion
}
