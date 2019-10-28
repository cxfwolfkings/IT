#define Prod
using LeadChina.CCDMonitor.Infrastrue;
using LeadChina.CCDMonitor.Infrastrue.Entity;
using Quartz;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Hosting;

namespace LeadChina.CCDMonitor.Web.jobs
{
    /// <summary>
    /// 删除文件的job
    /// </summary>
    [DisallowConcurrentExecution]
    public class DelFileJob : IJob
    {
        private BaseEntityOperation<SourceEntity> srcOp = EtOpManager.GetFactory().GetEntityOperation<SourceEntity>();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public Task Execute(IJobExecutionContext context)
        {
            string rootPath = HostingEnvironment.MapPath("~/");
            return Task.Factory.StartNew(async () =>
            {
#if Prod
                var list = await srcOp.GetDataByFuncAsync(_ => _.CreatedDate < DateTime.Now.AddDays(-1));
                list.ForEach(_ =>
                {
                    if (!string.IsNullOrEmpty(_.SourceFiles))
                    {
                        _.SourceFiles.Split(';').ToList().ForEach(f =>
                        {
                            File.Delete(rootPath + _.SavePathDir + f);
                        });
                    }
                });
#endif
            });
        }
    }
}
