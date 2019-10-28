using LeadChina.CCDMonitor.Infrastrue;
using LeadChina.CCDMonitor.Infrastrue.Entity;
using LeadChina.CCDMonitor.Web.Models.Dto;
using LeadChina.CCDMonitor.Web.Models.Vm;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LeadChina.CCDMonitor.Web.Controllers
{
    /// <summary>
    /// 问题记录控制器
    /// </summary>
    public class SurveyController : Controller
    {
        private BaseEntityOperation<SurveyEntity> qsOp = EtOpManager.GetFactory().GetEntityOperation<SurveyEntity>();

        /// <summary>
        /// 问题记录列表页
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 分页获取问题数据
        /// </summary>
        /// <returns></returns>
        public ActionResult Questions(SurveyInputDto input)
        {
            if (input.PageIndex < 1)
            {
                input.PageIndex = 1;
            }
            string andExpression = "";
            if (!string.IsNullOrEmpty(input.SurveyNo))
            {
                andExpression += " and survey_no like '%" + input.SurveyNo + "%'";
            }
            if (!string.IsNullOrEmpty(input.SurveyDate))
            {
                var dates = input.SurveyDate.Split(new string[] { " - " }, StringSplitOptions.RemoveEmptyEntries);
                var beginDate = dates[0].Trim();
                var endDate = dates[1].Trim();
                andExpression += " and survey_date>='" + beginDate + "'";
                andExpression += " and survey_date<='" + endDate + "'";
            }
            string sql = $"select * from biz_survey where 1=1{andExpression}";
            sql += $" order by survey_date desc limit {(input.PageIndex - 1) * 15}, {15}";
            string countSql = $"select survey_id from biz_survey where 1=1{andExpression}";
            IList<SurveyViewModel> records = qsOp.GetDataByRawSql(sql)
                .Select(_ => new SurveyViewModel
                {
                    SurveyId = _.SurveyId,
                    SurveyNo = _.SurveyNo,
                    SurveyDate = _.SurveyDate.ToString("yyyy-MM-dd HH:mm:ss"),
                    SurveyDesc = _.SurveyDesc == null ? "" : _.SurveyDesc
                }).ToList();
            var total = qsOp.GetRowCount(countSql);
            return Json(new
            {
                data = records,
                total
            }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 编辑页
        /// </summary>
        /// <param name="Id"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public ActionResult Edit(long Id = 0, string type = "")
        {
            var model = new SurveyViewModel();
            if (Id > 0)
            {
                var qs = qsOp.GetSingleData(_ => _.SurveyId == Id);
                model.SurveyId = qs.SurveyId;
                model.SurveyNo = qs.SurveyNo;
                model.SurveyDate = qs.SurveyDate.ToString("yyyy-MM-dd HH:mm:ss");
                model.SurveyDesc = qs.SurveyDesc == null ? "" : qs.SurveyDesc;
                model.SurveyImages = qs.SurveyImages;
            }
            if (type == "read")
            {
                model.ReadOnly = "readonly";
            }
            return View(model);
        }

        /// <summary>
        /// 上传
        /// </summary>
        /// <returns></returns>
        public ActionResult Upload(HttpPostedFileBase[] file, SurveyViewModel model)
        {
            CheckParams(model);
            if (!string.IsNullOrEmpty(model.ErrorNoMsg) || !string.IsNullOrEmpty(model.ErrorDateMsg))
            {
                throw new Exception(model.ErrorNoMsg);
            }
            string dirPath = Server.MapPath("~/Upload/Survey/");
            if (!Directory.Exists(dirPath))
            {
                Directory.CreateDirectory(dirPath);
            }
            //var files = new List<Tuple<string, string>>();
            var files = new List<string>();
            foreach (var f in file)
            {
                //var fileName = Path.GetFileNameWithoutExtension(f.FileName);
                var extension = Path.GetExtension(f.FileName);
                var instanceName = Guid.NewGuid().ToString().Replace("-", "") + extension;
                f.SaveAs(dirPath + instanceName);
                //files.Add(new Tuple<string, string>(f.FileName, instanceName));
                files.Add(f.FileName + "|" + instanceName);
            }

            model.SurveyImages += ";" + string.Join(";", files);
            SaveSurvey(model);

            return Json(new ResponseViewModel
            {
                Status = 200,
                Msg = "OK"
            });
        }

        /// <summary>
        /// 问题录入
        /// </summary>
        /// <returns></returns>
        public ActionResult Save(SurveyViewModel model)
        {
            CheckParams(model);
            if (!string.IsNullOrEmpty(model.ErrorNoMsg) || !string.IsNullOrEmpty(model.ErrorDateMsg))
            {
                return View("Edit", model);
            }

            if (!string.IsNullOrEmpty(model.SurveyImages) && model.SurveyImages.StartsWith(";"))
            {
                model.SurveyImages = model.SurveyImages.Substring(1);
            }

            SaveSurvey(model);
            return RedirectToAction("Index");
        }

        /// <summary>
        /// 保存
        /// </summary>
        /// <param name="model"></param>
        private void SaveSurvey(SurveyViewModel model)
        {
            if (model.SurveyId == 0)
            {
                qsOp.Create(new SurveyEntity
                {
                    SurveyNo = model.SurveyNo,
                    SurveyDesc = model.SurveyDesc,
                    SurveyDate = DateTime.Parse(model.SurveyDate),
                    SurveyImages = model.SurveyImages
                });
            }
            else
            {
                var qs = qsOp.GetSingleData(_ => _.SurveyId == model.SurveyId);
                qs.SurveyDate = Convert.ToDateTime(model.SurveyDate);
                qs.SurveyDesc = model.SurveyDesc;
                string oldFiles = qs.SurveyImages;
                qs.SurveyImages = model.SurveyImages;
                qsOp.Update(qs);
                DelFile(oldFiles, model.SurveyImages);
            }
        }

        private void CheckParams(SurveyViewModel model)
        {
            if (string.IsNullOrEmpty(model.SurveyNo))
            {
                model.ErrorNoMsg = "请输入编号";
            }
            if (string.IsNullOrEmpty(model.SurveyDate))
            {
                model.ErrorDateMsg = "请输入时间";
            }
            if (model.SurveyId == 0)
            {
                var qs = qsOp.GetSingleData(_ => _.SurveyNo == model.SurveyNo);
                if (qs != null)
                {
                    model.ErrorNoMsg = "编号已存在";
                }
            }
        }

        private void DelFile(string oldFiles, string newFiles)
        {
            if (oldFiles != null)
            {
                string dirPath = Server.MapPath("~/Upload/Survey/");
                newFiles = newFiles == null ? "" : newFiles;
                var newFileList = newFiles.Split(';');
                oldFiles.Split(';').Where(_ => !string.IsNullOrEmpty(_)).ToList().ForEach(_ =>
                {
                    // 新上传文件中不包含就删除
                    if (!newFileList.Contains(_))
                    {
                        string fileName = dirPath + _.Split('|')[1];
                        if (System.IO.File.Exists(fileName))
                        {
                            System.IO.File.Delete(fileName);
                        }
                    }
                });
            }
        }
    }
}
