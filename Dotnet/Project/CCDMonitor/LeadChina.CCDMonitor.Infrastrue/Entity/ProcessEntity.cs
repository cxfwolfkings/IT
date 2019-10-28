using ServiceStack.DataAnnotations;
using System;

namespace LeadChina.CCDMonitor.Infrastrue.Entity
{
    [Serializable]
    [Alias("bas_process")]
    public class ProcessEntity
    {
        [Alias("process_no")]
        public string ProcessNo { get; set; }

        [Alias("process_name")]
        public string ProcessName { get; set; }
    }
}
