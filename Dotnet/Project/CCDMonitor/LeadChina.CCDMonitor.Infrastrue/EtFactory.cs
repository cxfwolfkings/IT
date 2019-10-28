using System;
using System.Configuration;

namespace LeadChina.CCDMonitor.Infrastrue
{
    public class EtFactory : AbstractEtFactory
    {
        public override BaseEntityOperation<T> GetEntityOperation<T>()
        {
            return new BaseEntityOperation<T>(
                ConfigurationManager.ConnectionStrings["CCDMonitor_DB"].ConnectionString);
        }
    }
}
