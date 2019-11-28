using SC.AsyncSamples;
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Data;

public class AsyncByTaskDemo
{

    public async void SumTaskBasedAsyncPattern(int start, int num)
    {
        int result = start;
        await Task.Run(() =>
        {
            for (int i = 0; i < 9; i++)
            {
                Thread.Sleep(1000);
                result += num;
            }
        });
        Console.WriteLine(result);
    }

    /// <summary>
    /// 因为Task.Run()在后台执行，如果是在WPF应用中，和以前引用UI代码会遇到同样的问题（不在同一个线程中）。
    /// 以前的解决方案和上面相似，将引用UI代码写在await后面。现在在.NET 4.5中. WPF提供了更好的解决方案。在后台，线程就可以把结果填充到已绑定界面的集合中。
    /// </summary>
    public partial class MainWindow : Window
    {
        private SearchInfo searchInfo;
        private object lockList = new object();

        public MainWindow()
        {
            //InitializeComponent();
            searchInfo = new SearchInfo();
            this.DataContext = searchInfo;
            // searchInfo.List 和 lockList绑定在了一起。在后台线程操作了searchInfo.List，lockList会同步过来。
            BindingOperations.EnableCollectionSynchronization(searchInfo.List, lockList);
        }
        //…
    }

}
