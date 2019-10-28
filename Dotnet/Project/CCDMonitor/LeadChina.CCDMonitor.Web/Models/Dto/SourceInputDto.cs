using System.Collections.Generic;

namespace LeadChina.CCDMonitor.Web.Models.Dto
{
    /// <summary>
    /// 
    /// </summary>
    public class SourceInputDto
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
        /// 图片列表
        /// </summary>
        public IList<ImageDetail> Images { get; set; }

        /// <summary>
        /// 当前页码
        /// </summary>
        public int PageIndex { get; set; }

        /// <summary>
        /// 起始时间
        /// </summary>
        public string BeginDate { get; set; }

        /// <summary>
        /// 是否压缩
        /// </summary>
        public bool IsCompressed { get; set; }
    }

    /// <summary>
    /// 图片
    /// </summary>
    public class ImageDetail
    {
        /// <summary>
        /// 创建日期（精确到秒）
        /// </summary>
        public string CreatedDate { get; set; }
        /// <summary>
        /// 目录
        /// </summary>
        public string SavePathDir { get; set; }
        /// <summary>
        /// 文件名
        /// </summary>
        public string[] SourceFiles { get; set; }
    }
}
