using Quartz;
using Quartz.Impl;
using System;

namespace BI.Jobs
{
    public class QuartzController
    {
        /// <summary>
        /// 这里有三个参数，name和group 是这个job也就是这个定时任务的身份标识，而cron则是你想要定时的表达式。
        /// cron表达式请看说明文档
        /// </summary>
        /// <param name="name"></param>
        /// <param name="group"></param>
        /// <param name="cron"></param>
        public static async void CreateJob(string name, string group, string cron)
        {
            ISchedulerFactory schedulerFactory = new StdSchedulerFactory();

            // 1、通过调度工厂获得调度器
            IScheduler scheduler = await schedulerFactory.GetScheduler();

            DateTimeOffset startTime = DateBuilder.NextGivenSecondDate(DateTime.Now, 1);
            DateTimeOffset endTime = DateBuilder.NextGivenMinuteDate(DateTime.Now, 10);

            // 2、创建任务
            IJobDetail job = JobBuilder.Create<QuartzJob1>()
                             //.UsingJobData("key1", 123) // 通过Job添加参数值
                             .WithIdentity(name, group)
                             .Build();

            // 3、创建一个触发器
            // 触发器常用的有两种：SimpleTrigger触发器和CronTrigger触发器。
            ICronTrigger cronTrigger = (ICronTrigger)TriggerBuilder.Create()
                                       .StartAt(startTime)
                                       .EndAt(endTime)
                                       //.UsingJobData("key1", 321)  // 通过在Trigger中添加参数值
                                       .WithIdentity(name, group)
                                       .WithCronSchedule(cron)
                                       .Build();

            // 4、将触发器和任务器绑定到调度器中
            await scheduler.ScheduleJob(job, cronTrigger);

            // 5、开启调度器
            await scheduler.Start();
        }
    }
}
