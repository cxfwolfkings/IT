using ServiceStack.DataAnnotations;
using System;

namespace LeadChina.CCDMonitor.Infrastrue.Entity
{
    [Serializable]
    [Alias("biz_source")]
    public class SourceViewEntity
    {
        [Alias("source_id")]
        public long SourceId { get; set; }

        [Alias("source_type")]
        public int SourceType { get; set; }

        [Alias("source_camera_no")]
        public string SourceCameraNo { get; set; }

        [Alias("save_path_dir")]
        public string SavePathDir { get; set; }

        [Alias("source_files")]
        public string SourceFiles { get; set; }

        [Alias("cover_image_name")]
        public string CoverImageName { get; set; }

        [Alias("current_status")]
        public int CurrentStatus { get; set; }

        [Alias("created_date")]
        public DateTime CreatedDate { get; set; }

        [Alias("created_timestamp")]
        public long CreatedTimestamp { get; set; }

        [Alias("device_no")]
        public string DeviceNo { get; set; }

        /// <summary>
        /// 车间
        /// </summary>
        [Alias("workshop_name")]
        public string WorkshopName { get; set; }

        /// <summary>
        /// 产线
        /// </summary>
        [Alias("line_name")]
        public string LineName { get; set; }

        /// <summary>
        /// 工序
        /// </summary>
        [Alias("process_name")]
        public string ProcessName { get; set; }

        /// <summary>
        /// 工位
        /// </summary>
        [Alias("loc_name")]
        public string LocName { get; set; }

        /// <summary>
        /// 设备
        /// </summary>
        [Alias("device_name")]
        public string DeviceName { get; set; }

        /// <summary>
        /// 相机
        /// </summary>
        [Alias("camera_name")]
        public string CameraName { get; set; }
    }
}
