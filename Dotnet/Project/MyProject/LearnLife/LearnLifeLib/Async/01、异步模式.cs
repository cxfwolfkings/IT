using System;
using System.Threading;

public class AsyncDemo
{
    /// <summary>
    /// 异步模式
    /// </summary>
    /// <param name="start"></param>
    /// <param name="num"></param>
    /// <returns></returns>
    public void SumAsyncPattern(int start, int num)
    {
        Func<int> BeginGetNum = () =>
        {
            int result = start;
            // 耗时操作
            for (int i = 0; i < 9; i++)
            {
                Thread.Sleep(1000);
                result += num;
            }
            return result;
        };

        Action<int> EndGetNum = result => Console.WriteLine(result);

        /**
         * <summary>
         * BeginInvoke的参数说明：
         * </summary>
         * <param name="">AsyncCallback类型的委托，需要IAsyncResult作为参数，当异步方法执行完成后，将调用这个委托引用的方法</param>
         * <see cref="AsyncCallback"/>
         * <see cref="IAsyncResult"/>
         */
        BeginGetNum.BeginInvoke(_ =>
        {
            int result = BeginGetNum.EndInvoke(_);
            EndGetNum.Invoke(result);
        }, null);
    }
}
