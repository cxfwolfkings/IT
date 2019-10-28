using Quartz;
using Quartz.Impl;
using System;
using System.Configuration;
using System.Threading.Tasks;

namespace LeadChina.CCDMonitor.Web.jobs
{
    /// <summary>
    /// 调度程序
    /// </summary>
    public class JobScheduler
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public static void Start()
        {
            // job执行的周期
            int jobIntervalSeconds = Convert.ToInt16(ConfigurationManager.AppSettings["JobIntervalSeconds"]);

            // 删除过期文件Action
            Action delOldFilesAction = async () =>
            {
                await ExecuteScheduleJobAsync<DelFileJob>(jobIntervalSeconds);
            };
            //delOldFilesAction();

            // 生成缩略图Action
            Action createThumbnailsAction = async () =>
            {
                await ExecuteScheduleJobAsync<CreateThumbnailJob>(jobIntervalSeconds);
            };
            createThumbnailsAction();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="intervalSeconds">重复执行的间隔</param>
        /// <returns></returns>
        private static async Task ExecuteScheduleJobAsync<T>(int intervalSeconds) where T : IJob
        {
            // 从工厂中获取一个调度器实例化
            IScheduler scheduler = await StdSchedulerFactory.GetDefaultScheduler();
            // 开始调度器
            await scheduler.Start();
            // 创建一个作业
            IJobDetail job = JobBuilder.Create<T>().Build();
            ITrigger trigger = TriggerBuilder.Create()
                .WithSimpleSchedule(t => t.WithIntervalInSeconds(intervalSeconds) // 触发执行
                    .RepeatForever())          // 重复执行
                    .Build();
            // 把作业，触发器加入调度器。 
            await scheduler.ScheduleJob(job, trigger);
        }
    }
}
