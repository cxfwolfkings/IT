using System;
using System.Threading;

public class ThreadPoolDemo
{
    /// <summary>
    /// 线程池示例
    /// </summary>
    static void Demo()
    {
        int nWorkerThreads;
        int nCompletionPortThreads;
        //读取工作线程和I/O线程的最大线程数
        ThreadPool.GetMaxThreads(out nWorkerThreads, out nCompletionPortThreads);
        Console.WriteLine("Max worker threads: {0}, I/O completion threads: {1}", nWorkerThreads, nCompletionPortThreads);

        for (int i = 0; i < 5; i++)
        {
            //传递一个WaitCallback类型的委托，
            //线程池收到这个请求后，就会从池中选择一个线程，来调用该方法
            //如果线程池还没有运行，就会创建一个线程池，并启动第一个线程
            //如果线程池已经在运行，且有一个空闲线程来完成该任务，就把该任务传递给这个线程
            ThreadPool.QueueUserWorkItem(JobForAThread);
        }

        Thread.Sleep(3000);
    }

    static void JobForAThread(object state)
    {
        for (int i = 0; i < 3; i++)
        {
            Console.WriteLine("loop {0}, running inside pooled thread {1}", i,
              Thread.CurrentThread.ManagedThreadId);
            Thread.Sleep(50);
        }
    }
}
