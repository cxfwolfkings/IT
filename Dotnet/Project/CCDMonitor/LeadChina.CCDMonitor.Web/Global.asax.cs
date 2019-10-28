using LeadChina.CCDMonitor.Infrastrue;
using LeadChina.CCDMonitor.Infrastrue.Entity;
using LeadChina.CCDMonitor.Web.jobs;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace LeadChina.CCDMonitor.Web
{
    /// <summary>
    /// 
    /// </summary>
    public class MvcApplication : HttpApplication
    {
        /// <summary>
        /// 
        /// </summary>
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            RegisterLog4Net();

            //数据初始化
            //InitData();

            // 开启Job
            JobScheduler.Start();
        }

        /// <summary>
        /// 注册log4net
        /// </summary>
        private void RegisterLog4Net()
        {
            FileInfo file = new FileInfo(Server.MapPath("~\\log4net.config"));
            log4net.Config.XmlConfigurator.Configure(file);
        }

        private void InitData()
        {
            string imgExts = ".jpg,.bmp,.jpeg,.gif,.png";

            var path = Server.MapPath("~/cameral_shara_1/");
            var dInfo = new DirectoryInfo(path);

            var dSub = dInfo.GetDirectories();
            var imgExtsArray = imgExts.Split(',').ToList();

            BaseEntityOperation<SourceEntity> srcOp = EtOpManager.GetFactory().GetEntityOperation<SourceEntity>();

            var entities = new List<SourceEntity>();

            var now = DateTime.Now;

            dSub.ToList().ForEach(m =>
                {
                    var createdDate = now.AddSeconds(Convert.ToInt16(m.Name));

                    var entity = new SourceEntity
                    {
                        SourceType = (int)SourceTypeEnum.Picture,
                        SourceCameraNo = "C001",
                        SavePathDir = "/cameral_shara_1/" + m.Name + "/",
                        DeviceNo = "D001",
                        CurrentStatus = (int)RowStatusEnum.Enable,
                        CreatedDate = createdDate,
                        CreatedTimestamp = Convert.ToInt64(Commoncs.GetTimestamp(createdDate)),
                    };

                    var sourceFiles = new List<string>();

                    m.GetFiles().ToList().ForEach(x =>
                    {
                            x.MoveTo(x.FullName.Replace(" ", ""));
                            if (imgExtsArray.Any(f => x.Name.EndsWith(f)))
                            {
                                sourceFiles.Add(x.Name.Replace(" ", ""));
                            }
                        });

                    entity.SourceFiles = string.Join(";", sourceFiles);
                    entity.CoverImageName = sourceFiles[0];
                    entities.Add(entity);
                });
            srcOp.CreateBatchData(entities);
        }
    }
}
