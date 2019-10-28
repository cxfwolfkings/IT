using System.Data;

namespace LeadChina.CCDMonitor.Infrastrue
{
    public class TransactionSave<T> where T : new()
    {
        public T MainData { get; set; }
        public IDbConnection Db { get; set; }
        //public BaseRequestDto Dto { get; set; }
    }
}
