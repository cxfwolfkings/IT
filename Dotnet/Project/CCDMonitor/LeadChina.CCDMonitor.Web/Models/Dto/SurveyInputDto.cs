namespace LeadChina.CCDMonitor.Web.Models.Dto
{
    /// <summary>
    /// 
    /// </summary>
    public class SurveyInputDto
    {
        /// <summary>
        /// 当前页码
        /// </summary>
        public int PageIndex { get; set; }

        /// <summary>
        /// 问题编号
        /// </summary>
        public string SurveyNo { get; set; }

        /// <summary>
        /// 异常时间
        /// </summary>
        public string SurveyDate { get; set; }
    }
}