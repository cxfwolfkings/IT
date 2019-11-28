using System;
using System.ComponentModel;
using System.Threading;

public class AsyncByEventDemo
{
    public void SumAsyncEventPattern(int start, int num)
    {
        BackgroundWorker bgWorker = new BackgroundWorker();

        bgWorker.RunWorkerCompleted += (sender, e) =>
        {
            Console.WriteLine(e.Result);
        };

        bgWorker.DoWork += (sender, e) =>
        {
            int result = start;
            // 耗时操作
            for (int i = 0; i < 9; i++)
            {
                Thread.Sleep(1000);
                result += num;
            }
            e.Result = result;
        };

        bgWorker.RunWorkerAsync();
    }
}
