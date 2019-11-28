using System;
using System.IO;

namespace Com.Colin.UI
{
    public class FileLogger
    {
        public void LogException(Exception e)
        {
            File.WriteAllLines(DateTime.Now.ToString("yyyy-MM-dd") + ".txt",
                new string[]
                {
                    "Message:"+e.Message,
                    "Stacktrace:"+e.StackTrace
                });
        }
    }
}