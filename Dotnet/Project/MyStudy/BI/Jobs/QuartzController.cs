using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;
using Quartz;
using Quartz.Spi;
using System;
using System.IO;

namespace BI.Jobs
{
    public class QuartzController
    {
        private IScheduler _scheduler;

        private readonly IJobFactory _iocJobfactory;
        private readonly ISchedulerFactory _iSchedulerFactory;

        /// <summary>
        /// 通过构造器注入
        /// </summary>
        /// <param name="iocJobfactory"></param>
        /// <param name="iSchedulerFactory"></param>
        public QuartzController(IJobFactory iocJobfactory, ISchedulerFactory iSchedulerFactory)
        {
            _iocJobfactory = iocJobfactory;
            _iSchedulerFactory = iSchedulerFactory;
        }

        /// <summary>
        /// 这里有三个参数，name和group 是这个job也就是这个定时任务的身份标识，而cron则是你想要定时的表达式。
        /// cron表达式请看说明文档
        /// </summary>
        /// <param name="name"></param>
        /// <param name="group"></param>
        /// <param name="cron"></param>
        public async void Start()
        {
            // 获取配置文件
            var configuration = new ConfigurationBuilder()
               .SetBasePath(Directory.GetCurrentDirectory())
               .Add(new JsonConfigurationSource { Path = "appsettings.json", Optional = false, ReloadOnChange = true }) // 这样的话，可以直接读目录里的json文件，而不是 bin 文件夹下的，所以不用修改复制属性
               .Build();

            //ISchedulerFactory _iSchedulerFactory = new StdSchedulerFactory();

            // 1、通过调度工厂获得调度器
            _scheduler = await _iSchedulerFactory.GetScheduler();

            // 替换默认工厂（默认工厂无法注入参数）
            _scheduler.JobFactory = _iocJobfactory;

            // 2、开启调度器
            await _scheduler.Start();

            DateTimeOffset startTime = DateBuilder.NextGivenSecondDate(DateTime.Now, 1);
            DateTimeOffset endTime = DateBuilder.NextGivenMinuteDate(DateTime.Now, 10);

            // 3、创建任务
            IJobDetail job = JobBuilder.Create<QuartzJob1>()
                             //.UsingJobData("key1", 123) // 通过Job添加参数值
                             .WithIdentity("job1", "BI")
                             .Build();

            // 4、创建一个触发器
            // 触发器常用的有两种：SimpleTrigger触发器和CronTrigger触发器。
            ICronTrigger cronTrigger = (ICronTrigger)TriggerBuilder.Create()
                                       .StartAt(startTime)
                                       .EndAt(endTime)
                                       //.UsingJobData("key1", 321)  // 通过在Trigger中添加参数值
                                       .WithIdentity("job1", "BI")
                                       .WithCronSchedule(configuration["Interval"])
                                       .Build();

            // 5、将触发器和任务器绑定到调度器中
            await _scheduler.ScheduleJob(job, cronTrigger);
        }

        /// <summary>
        /// 服务器停止
        /// </summary>
        public void Stop()
        {
            Shutdown();
        }

        /// <summary>
        /// 定时任务关闭
        /// </summary>
        public void Shutdown()
        {
            if (_scheduler == null)
            {
                return;
            }
            if (_scheduler.Shutdown(waitForJobsToComplete: true).Wait(30000))
            {
                _scheduler = null;
            }
        }

        /// <summary>
        /// 生成使用Cron表达式的job
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="name"></param>
        /// <param name="group"></param>
        /// <param name="cron"></param>
        private async void CreateJobWithCron<T>(string name, string group, string cron) where T : IJob
        {
            // 创建任务
            IJobDetail job = JobBuilder.Create<T>().WithIdentity(name, group).Build();

            // 创建对应触发器
            ICronTrigger cronTrigger = (ICronTrigger)TriggerBuilder.Create()
                .StartNow()
                .WithIdentity(name, group)
                .WithCronSchedule(cron)
                .Build();

            // 将触发器和任务器绑定到调度器中
            await _scheduler.ScheduleJob(job, cronTrigger);
        }

        /// <summary>
        /// 生成简单配置的job
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="name"></param>
        /// <param name="group"></param>
        /// <param name="seconds"></param>
        private async void CreateJobSimple<T>(string name, string group, int seconds) where T : IJob
        {
            // 创建任务
            IJobDetail job = JobBuilder.Create<T>().WithIdentity(name, group).Build();

            // 创建对应触发器
            ICronTrigger cronTrigger = (ICronTrigger)TriggerBuilder.Create()
                .StartNow()
                .WithIdentity(name, group)
                .WithSimpleSchedule(s => s.WithIntervalInSeconds(seconds).RepeatForever())
                .Build();

            // 将触发器和任务器绑定到调度器中
            await _scheduler.ScheduleJob(job, cronTrigger);
        }
    }
}
