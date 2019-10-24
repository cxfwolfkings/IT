using Pomelo.AspNetCore.TimedJob;
using System;
using System.IO;

namespace BI.Jobs
{
    public class TimeJob1 : Job
    {
        /// <summary>
        /// 每隔20s写入数据
        /// </summary>
        /// <param name="service"></param>
        [Invoke(Begin = "2019-10-24 11:30:00", Interval = 20, IsEnabled = true)]
        public void Test(IServiceProvider service)
        {
            string path = @"D:\1.txt";
            string value = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            if (!File.Exists(path))
            {
                File.Create(path);
            }
            StreamWriter streamWriter = new StreamWriter(path, true);
            streamWriter.WriteLine(value);
            streamWriter.Flush();
            streamWriter.Close();
            GC.Collect();
        }
    }
}
