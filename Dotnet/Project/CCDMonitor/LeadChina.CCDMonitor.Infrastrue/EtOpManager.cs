namespace LeadChina.CCDMonitor.Infrastrue
{
    public class EtOpManager
    {
        private static AbstractEtFactory factory;

        private EtOpManager()
        {

        }

        public static AbstractEtFactory GetFactory()
        {
            if (factory == null)
            {
                factory = new EtFactory();
            }
            return factory;
        }
    }
}
