using System;
using System.Collections.Generic;
using System.Linq;

namespace Com.Colin.Core.Models
{
    /// <summary>
    /// 日志模型
    /// </summary>
    public class VisitLog
    {
        public string Url { get; set; }

        public IDictionary<string, string> Headers { get; set; } = new Dictionary<string, string>();

        public string Method { get; set; }

        public string RequestBody { get; set; }

        public DateTime ExcuteStartTime { get; set; }

        public DateTime ExcuteEndTime { get; set; }

        public override string ToString()
        {
            string headers = "[" + string.Join(",", this.Headers.Select(i => "{" + $"\"{i.Key}\":\"{i.Value}\"" + "}")) + "]";
            return $"Url: {this.Url},\r\nHeaders: {headers},\r\nMethod: {this.Method},\r\nRequestBody: {this.RequestBody},\r\nExcuteStartTime: {this.ExcuteStartTime.ToString("yyyy-MM-dd HH:mm:ss.fff")},\r\nExcuteStartTime: {this.ExcuteEndTime.ToString("yyyy-MM-dd HH:mm:ss.fff")}";
        }
    }
}
