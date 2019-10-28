using LeadChina.CCDMonitor.Infrastrue;
using LeadChina.CCDMonitor.Infrastrue.Entity;
using LeadChina.CCDMonitor.Web.Clients;
using LeadChina.CCDMonitor.Web.Helper;
using LeadChina.CCDMonitor.Web.Models.Dto;
using LeadChina.CCDMonitor.Web.Models.Vm;
using LeadChina.CCDMonitor.Web.ServiceReference1;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web.Mvc;

namespace LeadChina.CCDMonitor.Web.Controllers
{
    /// <summary>
    /// 主页
    /// </summary>
    public class HomeController : Controller
    {
        private BaseEntityOperation<SourceEntity> srcOp = EtOpManager.GetFactory().GetEntityOperation<SourceEntity>();
        private BaseEntityOperation<UserEntity> usrOp = EtOpManager.GetFactory().GetEntityOperation<UserEntity>();
        private BaseEntityOperation<WorkshopEntity> wpOp = EtOpManager.GetFactory().GetEntityOperation<WorkshopEntity>();
        private BaseEntityOperation<LineEntity> lineOp = EtOpManager.GetFactory().GetEntityOperation<LineEntity>();
        private BaseEntityOperation<ProcessEntity> psOp = EtOpManager.GetFactory().GetEntityOperation<ProcessEntity>();
        private BaseEntityOperation<LocEntity> locOp = EtOpManager.GetFactory().GetEntityOperation<LocEntity>();

        /// <summary>
        /// 首页
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            //test.tst();
            //return View();
            return RedirectToAction("Monitor");
        }

        /// <summary>
        /// 巨幕首页
        /// </summary>
        /// <returns></returns>
        public ActionResult Main()
        {
            // return View();
            return RedirectToAction("Monitor");
        }

        /// <summary>
        /// “生产监控”页面
        /// </summary>
        /// <returns></returns>
        public ActionResult Monitor()
        {
            return View();
        }

        /// <summary>
        /// 登录页
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet]
        public ActionResult Login()
        {
            return View(new LoginViewModel());
        }

        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="model">登录模型</param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost]
        public ActionResult Login(LoginViewModel model)
        {
            //if (ModelState.IsValid)
            //{
            if (string.IsNullOrEmpty(model.Account))
            {
                model.ErrorMsg[0] = "请输入账号";
            }
            if (string.IsNullOrEmpty(model.Password))
            {
                model.ErrorMsg[1] = "请输入密码";
            }
            if (model.ErrorMsg.Count(_ => !string.IsNullOrEmpty(_)) > 0)
            {
                return View(model);
            }
            var loginUser = usrOp.GetSingleData(_ => _.Account == model.Account
                && _.Password == MD5Helper.MD5Encrypt16(model.Password));
            if (loginUser == null)
            {
                ModelState.AddModelError("LoginPwd", "账号或密码不正确，请重新输入！");
                model.ErrorMsg[2] = "账号或密码不正确，请重新输入！";
                return View(model);
            }
            // 当前登录用户信息存入Session
            Session.Add("CurrenyUser", loginUser);
            // 设置ticket票据的名称为用户的id，设置有效时间为60分钟
            FormsAuthHelp.AddFormsAuthCookie(loginUser.Account, loginUser, 1);
            //}
            return Redirect("~/Home/Main");
        }

        /// <summary>
        /// 登出
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult Logout()
        {
            Session.RemoveAll();
            FormsAuthHelp.RemoveFormsAuthCookie();
            return Redirect("~/Home/Login");
        }

        /// <summary>
        /// 获取车间
        /// </summary>
        /// <returns></returns>
        public ActionResult GetWorkShop()
        {
            return Json(wpOp.GetAllData(), JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 获取产线
        /// </summary>
        /// <param name="workshopNo"></param>
        /// <returns></returns>
        public ActionResult GetLine(string workshopNo)
        {
            var list = new List<LineEntity>();
            if (string.IsNullOrWhiteSpace(workshopNo))
            {
                list = lineOp.GetAllData();
            }
            else
            {
                list = lineOp.QueryList(_ => _.WorkShopNo == workshopNo);
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 获取工序
        /// </summary>
        /// <returns></returns>
        public ActionResult GetProcess()
        {
            return Json(psOp.GetAllData(), JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 获取工位
        /// </summary>
        /// <param name="lineNo"></param>
        /// <param name="processNo"></param>
        /// <returns></returns>
        public ActionResult GetLoc(string lineNo, string processNo)
        {
            string sql = "select * from bas_loc where 1=1";
            if (!string.IsNullOrWhiteSpace(lineNo))
            {
                sql += " and line_no='" + lineNo + "'";
            }
            if (!string.IsNullOrWhiteSpace(processNo))
            {
                sql += " and process_no='" + processNo + "'";
            }
            var list = locOp.GetDataByRawSql(sql);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 获取下拉框数据源
        /// </summary>
        /// <returns></returns>
        public ActionResult GetSelectSource()
        {
            return Json(new
            {
                workshops = wpOp.GetAllData(),
                lines = lineOp.GetAllData(),
                processes = psOp.GetAllData(),
                locs = locOp.GetAllData()
            }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 获取图片路径
        /// </summary>
        /// <returns></returns>
        public JsonResult GetMonitorPics(SourceInputDto input)
        {
            var endDate = DateTime.Parse(input.BeginDate).AddMinutes(5).ToString("yyyy-MM-dd HH:mm:ss");
            string andExpression = " and s.created_date >= '" + input.BeginDate + "' and s.created_date <= '" + endDate + "'";
            string joinExpression = "";
            joinExpression += " inner join bas_device d on d.device_no = s.device_no";
            joinExpression += " inner join bas_loc l on l.loc_no = d.loc_no";
            joinExpression += " inner join bas_line ln on ln.line_no = l.line_no";

            if (!string.IsNullOrEmpty(input.LocNo))
            {
                andExpression += " and d.loc_no = '" + input.LocNo + "'";
            }
            if (!string.IsNullOrEmpty(input.ProcessNo))
            {
                andExpression += " and l.process_no = '" + input.ProcessNo + "'";
            }
            if (!string.IsNullOrEmpty(input.LineNo))
            {
                andExpression += " and l.line_no = '" + input.LineNo + "'";
            }
            if (!string.IsNullOrEmpty(input.WorkshopNo))
            {
                andExpression += " and ln.workshop_no = '" + input.WorkshopNo + "'";
            }

            string sql = $"select distinct s.* from biz_source s {joinExpression} where 1=1 {andExpression}";
            sql += $" order by created_date limit {(input.PageIndex - 1) * 20}, {20}";
            string countSql = $"select DISTINCT s.source_id from biz_source s {joinExpression} where 1=1 {andExpression}";
            var total = srcOp.GetRowCount(countSql);
            var imgList = srcOp.GetDataByRawSql<SourceViewEntity>(sql);
            var list = new List<MonitorFile>();

            string isCompressed = ConfigurationManager.AppSettings["IsCompressed"];

            var isRealCompressed = true;
            // 不满足获取压缩图片的条件
            if (isCompressed != "Yes" || !input.IsCompressed
                || imgList.Count(_ => _.CurrentStatus != (int)RowStatusEnum.Ready) > 0)
            {
                isRealCompressed = false;
            }
            GetImages(imgList, list, isRealCompressed);

            return Json(new
            {
                Data = list,
                IsCompressed = isRealCompressed,
                Total = total % 20 == 0 ? total / 20 : total / 20 + 1
            }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 获取图片详情
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public JsonResult GetMonitorPic(long Id)
        {
            string sql = @"
SELECT s.*, c.camera_name, d.device_name, 
  l.loc_name, li.line_name, p.process_name, w.workshop_name 
FROM biz_source s 
INNER JOIN bas_camera c ON s.source_camera_no=c.camera_no
INNER JOIN bas_device d ON s.device_no=d.device_no
INNER JOIN bas_loc l ON l.loc_no=d.loc_no
INNER JOIN bas_line li ON l.line_no=li.line_no
INNER JOIN bas_process p ON l.process_no=p.process_no
INNER JOIN bas_workshop w ON w.workshop_no=li.workshop_no
WHERE s.source_id=" + Id;
            var src = srcOp.GetDataByRawSql<SourceViewEntity>(sql).FirstOrDefault();
            return Json(src, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 测试相片保存的WCFService
        /// </summary>
        /// <returns></returns>
        public ContentResult TestSavePhoto()
        {
            MonitorWcfServiceClient proxy = new MonitorWcfServiceClient();

            //string url = "http://localhost:9320/Services/MonitorWcfService.svc";
            //IMonitorWcfService proxy = WcfInvokeFactory.CreateServiceByUrl<IMonitorWcfService>(url);

            proxy.SavePhoto(new SourceData
            {
                ImageStream = FileHelper.FileToStream(@"D:\CCDMonitor\LeadChina.CCDMonitor.Web\cameral_shara_1\7\1.jpg")
            });

            return Content("OK");
        }

        private void GetImages(List<SourceViewEntity> imgList, List<MonitorFile> list, bool isRealCompressed)
        {
            imgList.ForEach(_ =>
            {
                var obj = new MonitorFile
                {
                    Id = _.SourceId,
                    CameraNo = _.SourceCameraNo,
                    DeviceNo = _.DeviceNo,
                    Datetime = _.CreatedDate.ToString("yyyy-MM-dd HH:mm:ss")
                };
                if (isRealCompressed)
                {
                    obj.CoverFile = _.SavePathDir + "thumbnail/" + _.CoverImageName.Substring(0, _.CoverImageName.LastIndexOf(".") + 1) + "jpg";
                    obj.FileNames = _.SourceFiles.Split(';').ToList().Select(p => _.SavePathDir + "thumbnail/" + p.Substring(0, p.LastIndexOf(".") + 1) + "jpg").ToList();
                    obj.FileExtendNames = _.SourceFiles.Split(';').ToList().Select(p => p.Substring(p.LastIndexOf(".") + 1)).ToList();
                }
                else
                {
                    obj.CoverFile = _.SavePathDir + _.CoverImageName;
                    obj.FileNames = _.SourceFiles.Split(';').ToList().Select(p => _.SavePathDir + p).ToList();
                }
                list.Add(obj);
            });
        }
    }
}
