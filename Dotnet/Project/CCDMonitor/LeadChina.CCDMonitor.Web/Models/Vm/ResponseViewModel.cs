namespace LeadChina.CCDMonitor.Web.Models.Vm
{
    /// <summary>
    /// 返回消息类型
    /// </summary>
    public class ResponseViewModel
    {
        /// <summary>
        /// 状态码
        /// </summary>
        public int Status { get; set; }
        /// <summary>
        /// 消息
        /// </summary>
        public string Msg { get; set; }
        /// <summary>
        /// 数据
        /// </summary>
        public object Data { get; set; }
    }
}