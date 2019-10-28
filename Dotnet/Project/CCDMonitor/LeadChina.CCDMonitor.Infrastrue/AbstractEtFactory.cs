namespace LeadChina.CCDMonitor.Infrastrue
{
    public abstract class AbstractEtFactory
    {
        public abstract BaseEntityOperation<T> GetEntityOperation<T>() where T : new();
    }
}
