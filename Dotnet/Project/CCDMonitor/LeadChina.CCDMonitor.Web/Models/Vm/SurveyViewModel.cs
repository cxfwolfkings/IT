using System.ComponentModel.DataAnnotations;

namespace LeadChina.CCDMonitor.Web.Models.Vm
{
    /// <summary>
    /// 问题录入界面视图模型
    /// </summary>
    public class SurveyViewModel
    {
        /// <summary>
        /// 主键
        /// </summary>
        public long SurveyId { get; set; }

        /// <summary>
        /// 问题编号
        /// </summary>
        [Required(ErrorMessage = "编号不能为空")]
        public string SurveyNo { get; set; }

        /// <summary>
        /// 异常时间
        /// </summary>
        [Required(ErrorMessage = "时间不能为空")]
        public string SurveyDate { get; set; }

        /// <summary>
        /// 问题说明
        /// </summary>
        [Required(ErrorMessage = "说明不能为空")]
        public string SurveyDesc { get; set; }

        /// <summary>
        /// 图片数据
        /// </summary>
        /// <value></value>
        public string SurveyImages { get; set; }

        /// <summary>
        /// 是否只读
        /// </summary>
        public string ReadOnly { get; set; }

        /// <summary>
        /// 编号错误信息
        /// </summary>
        public string ErrorNoMsg { get; set; }

        /// <summary>
        /// 时间错误信息
        /// </summary>
        public string ErrorDateMsg { get; set; }
    }
}
