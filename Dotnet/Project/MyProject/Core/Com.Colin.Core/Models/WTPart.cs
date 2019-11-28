namespace Com.Colin.Core.Models
{
    public class WTPart
    {
        // 唯一标识
        public long Id { get; set; }
        public string Name { get; set; }
        public long ParentId { get; set; }
        public string[] attachments { get; set; }
        public bool IsComplete { get; set; }
    }
}
