using Quartz;
using Quartz.Spi;
using System;

namespace BI.Jobs
{
    public class JobFactory1 : IJobFactory
    {
        private readonly IServiceProvider _serviceProvider;

        public JobFactory1(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public IJob NewJob(TriggerFiredBundle bundle, IScheduler scheduler)
        {
            return _serviceProvider.GetService(bundle.JobDetail.JobType) as IJob;
        }

        public void ReturnJob(IJob job)
        {
            var disposable = job as IDisposable;
            disposable?.Dispose();
        }
    }
}
