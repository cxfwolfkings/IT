using ServiceStack.DataAnnotations;
using System;

namespace LeadChina.CCDMonitor.Infrastrue.Entity
{
    [Serializable]
    [Alias("bas_workshop")]
    public class WorkshopEntity
    {
        [Alias("workshop_no")]
        public string WorkShopNo { get; set; }

        [Alias("workshop_name")]
        public string WorkShopName { get; set; }
    }
}
