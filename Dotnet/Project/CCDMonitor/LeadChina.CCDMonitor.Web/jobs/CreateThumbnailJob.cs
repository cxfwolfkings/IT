using LeadChina.CCDMonitor.Infrastrue;
using LeadChina.CCDMonitor.Infrastrue.Entity;
using LeadChina.CCDMonitor.Web.Helper;
using Quartz;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Hosting;

namespace LeadChina.CCDMonitor.Web.jobs
{
    /// <summary>
    /// 创建缩略图的job
    /// </summary>
    [DisallowConcurrentExecution]
    public class CreateThumbnailJob : IJob
    {
        private BaseEntityOperation<SourceEntity> srcOp = EtOpManager.GetFactory().GetEntityOperation<SourceEntity>();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public Task Execute(IJobExecutionContext context)
        {
            // 是否生成缩略图
            bool IsCompressed = ConfigurationManager.AppSettings["IsCompressed"] == "Yes";
            string rootPath = HostingEnvironment.MapPath("~/");
            return Task.Factory.StartNew(async () =>
            {
                if (IsCompressed)
                {
                    // 获取没有生成缩略图的记录
                    var list = await srcOp.GetDataByFuncAsync(_ => _.CurrentStatus != (int)RowStatusEnum.Ready);
                    Parallel.ForEach(list, _ =>
                    {
                        ImageHelper.MakeThumbnail(rootPath + _.SavePathDir + _.CoverImageName,
                            rootPath + _.SavePathDir + "thumbnail/" + _.CoverImageName.Substring(0, _.CoverImageName.LastIndexOf(".") + 1) + "jpg",
                            800, 0, ThumbnailMode.W, "jpg");
                        _.SourceFiles.Split(';').ToList().ForEach(s =>
                        {
                            ImageHelper.MakeThumbnail(rootPath + _.SavePathDir + s,
                                rootPath + _.SavePathDir + "thumbnail/" + s.Substring(0, s.LastIndexOf(".") + 1) + "jpg",
                                800, 0, ThumbnailMode.W, "jpg");
                        });
                        _.CurrentStatus = 2;
                        srcOp.Update(_);
                    });
                }
            });
        }
    }
}