using System.Collections.Generic;

namespace LeadChina.CCDMonitor.Web.Models.Vm
{
    /// <summary>
    /// 监控文件
    /// </summary>
    public class MonitorFile
    {
        /// <summary>
        /// 主键
        /// </summary>
        public long Id { get; set; }

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
        public string CameraNo { get; set; }

        /// <summary>
        /// 时间
        /// </summary>
        public string Datetime { get; set; }

        /// <summary>
        /// 封面
        /// </summary>
        public string CoverFile { get; set; }

        /// <summary>
        /// 相片
        /// </summary>
        public List<string> FileNames { get; set; }

        /// <summary>
        /// 原图后缀
        /// </summary>
        public List<string> FileExtendNames { get; set; }

        /// <summary>
        /// 车间
        /// </summary>
        public string WorkshopName { get; set; }

        /// <summary>
        /// 产线
        /// </summary>
        public string LineName { get; set; }

        /// <summary>
        /// 工序
        /// </summary>
        public string ProcessName { get; set; }

        /// <summary>
        /// 工位
        /// </summary>
        public string LocName { get; set; }

        /// <summary>
        /// 设备
        /// </summary>
        public string DeviceName { get; set; }

        /// <summary>
        /// 相机
        /// </summary>
        public string CameraName { get; set; }
    }
}
