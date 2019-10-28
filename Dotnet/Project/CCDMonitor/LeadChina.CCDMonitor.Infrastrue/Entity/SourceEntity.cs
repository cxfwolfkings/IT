using ServiceStack.DataAnnotations;
using System;

namespace LeadChina.CCDMonitor.Infrastrue.Entity
{
    [Serializable]
    [Alias("biz_source")]
    public class SourceEntity
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
    }
}
