using ServiceStack.DataAnnotations;
using System;

namespace LeadChina.CCDMonitor.Infrastrue.Entity
{
    [Serializable]
    [Alias("bas_line")]
    public class LineEntity
    {
        [Alias("line_no")]
        public string LineNo { get; set; }

        [Alias("line_name")]
        public string LineName { get; set; }

        [Alias("line_offset")]
        public int LineOffset { get; set; }

        [Alias("workshop_no")]
        public string WorkShopNo { get; set; }
    }
}
