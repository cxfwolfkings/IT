using ServiceStack.DataAnnotations;
using System;

namespace LeadChina.CCDMonitor.Infrastrue.Entity
{
    [Serializable]
    [Alias("bas_loc")]
    public class LocEntity
    {
        [Alias("loc_no")]
        public string LocNo { get; set; }

        [Alias("loc_name")]
        public string LocName { get; set; }

        [Alias("line_no")]
        public string LineNo { get; set; }

        [Alias("process_no")]
        public string ProcessNo { get; set; }
    }
}
