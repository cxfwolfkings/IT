using Quartz;
using System;
using System.IO;
using System.Threading.Tasks;

namespace BI.Jobs
{
    // PersistJobDataAfterExecution属性：
    //   更新JobDetail的JobDataMap的存储副本，以便下一次执行这个任务接收更新的值而不是原始存储的值
    //   对应情况：这次的参数值是上一次执行后计算的值
    // DisallowConcurrentExecution属性：
    //   防止并发
    [DisallowConcurrentExecution]
    public class QuartzJob1 : IJob
    {
        /// <summary>
        /// 触发器触发之后执行的方法
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public async Task Execute(IJobExecutionContext context)
        {
            /*
            var jobData = context.JobDetail.JobDataMap; // 获取Job中的参数
            var triggerData = context.Trigger.JobDataMap; // 获取Trigger中的参数
            var data = context.MergedJobDataMap; // 获取Job和Trigger中合并的参数
            var value1 = jobData.GetInt("key1");
            var value2 = jobData.GetString("key2");
            */
            // 当Job中的参数和Trigger中的参数名称一样时，用 context.MergedJobDataMap获取参数时，Trigger中的值会覆盖Job中的值。
            string path = @"D:\1.txt";
            string value = DateTime.Now.ToString();
            StreamWriter streamWriter = new StreamWriter(path, true);
            await streamWriter.WriteLineAsync(value);
            streamWriter.Flush();
            streamWriter.Close();
        }
    }
}
