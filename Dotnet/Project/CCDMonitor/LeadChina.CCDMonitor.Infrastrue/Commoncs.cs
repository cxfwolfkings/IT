using System;
using System.Web.Script.Serialization;

namespace LeadChina.CCDMonitor.Infrastrue
{
    public static class Commoncs
    {
        public static double GetTimestamp(DateTime d)
        {
            TimeSpan ts = d.ToUniversalTime() - new DateTime(1970, 1, 1);
            return ts.TotalMilliseconds; // 精确到毫秒
        }

        public static string SerializeJson<T>(T entity)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            js.MaxJsonLength = int.MaxValue;
            return js.Serialize(entity);
        }

        public static T DeserializeJson<T>(string json)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Deserialize<T>(json);
        }
    }

    public enum SourceTypeEnum
    {
        Vedio = 1,
        Picture = 2
    }

    public enum RowStatusEnum
    {
        Ready = 2,
        Enable = 1,
        Disable = 0
    }
}
