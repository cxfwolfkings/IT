using System.IO;

namespace LeadChina.CCDMonitor.Web.Models
{
    /// <summary>
    /// 源数据
    /// </summary>
    public class SourceData
    {
        /// <summary>
        /// 车间
        /// </summary>
        public string WorkshopNo { get; set; }

        /// <summary>
        /// 产线
        /// </summary>
        public string LineNo { get; set; }

        /// <summary>
        /// 工序
        /// </summary>
        public string ProcessNo { get; set; }

        /// <summary>
        /// 工位
        /// </summary>
        public string LocNo { get; set; }

        /// <summary>
        /// 设备号
        /// </summary>
        public string DeviceNo { get; set; }

        /// <summary>
        /// 相机号
        /// </summary>
        public string SourceCameraNo { get; set; }

        /// <summary>
        /// 图片流
        /// </summary>
        public Stream ImageStream { get; set; }

        /// <summary>
        /// 创建日期（精确到秒）
        /// </summary>
        public string CreatedDate { get; set; }
    }
}