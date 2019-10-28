using LeadChina.CCDMonitor.Infrastrue;
using LeadChina.CCDMonitor.Infrastrue.Entity;
using LeadChina.CCDMonitor.Web.Helper;
using LeadChina.CCDMonitor.Web.Models.Dto;
using LeadChina.CCDMonitor.Web.Models.Vm;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace LeadChina.CCDMonitor.Api.Controllers
{
    /// <summary>
    /// 资源控制接口
    /// </summary>
    [AllowAnonymous]
    public class SourceController : ApiController
    {
        private BaseEntityOperation<SourceEntity> srcOp = EtOpManager.GetFactory().GetEntityOperation<SourceEntity>();

        /// <summary>
        /// GET api/source
        /// </summary>
        /// <returns></returns>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        /// <summary>
        /// GET api/source/5
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public string Get(int id)
        {
            return "value";
        }

        /// <summary>
        /// POST api/source
        /// 图片目录数据保存接口
        /// </summary>
        public async Task<HttpResponseMessage> PostAsync()
        {
            string data = await Request.Content.ReadAsStringAsync();
            JavaScriptSerializer js = new JavaScriptSerializer();
            js.MaxJsonLength = int.MaxValue;
            Logger.Debug(data);
            SourceInputDto input = js.Deserialize<SourceInputDto>(data);
            srcOp.CreateBatchData(input.Images.Select(_ => new SourceEntity
            {
                SourceType = (int)SourceTypeEnum.Picture,
                DeviceNo = input.DeviceNo,
                SourceCameraNo = input.SourceCameraNo,
                SavePathDir = _.SavePathDir,
                SourceFiles = string.Join(";", _.SourceFiles),
                CoverImageName = _.SourceFiles[0],
                CreatedDate = DateTime.Parse(_.CreatedDate),
                CreatedTimestamp = Convert.ToInt64(Commoncs.GetTimestamp(DateTime.Parse(_.CreatedDate))),
                CurrentStatus = (int)RowStatusEnum.Enable
            }));
            return new HttpResponseMessage
            {
                Content = new StringContent(Commoncs.SerializeJson(new ResponseViewModel
                {
                    Status = (int)HttpStatusCode.OK,
                    Msg = "保存成功！"
                }), Encoding.GetEncoding("UTF-8"), "application/json")
            };
        }

        /// <summary>
        /// PUT api/source/5
        /// </summary>
        /// <param name="id"></param>
        /// <param name="value"></param>
        public void Put(int id, [FromBody]string value)
        {
        }

        /// <summary>
        /// DELETE api/source/5
        /// </summary>
        /// <param name="id"></param>
        public void Delete(int id)
        {
        }
    }
}
