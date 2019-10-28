using ServiceStack.DataAnnotations;
using System;

namespace LeadChina.CCDMonitor.Infrastrue.Entity
{
    /// <summary>
    /// 
    /// </summary>
    [Serializable]
    [Alias("bas_user")]
    public class UserEntity
    {
        [Alias("id")]
        public long Id { get; set; }

        [Alias("account")]
        public string Account { get; set; }

        [Alias("password")]
        public string Password { get; set; }

        [Alias("user_name")]
        public string UserName { get; set; }

        [Alias("email")]
        public string Email { get; set; }

        [Alias("created_date")]
        public DateTime CreatedDate { get; set; }

        [Alias("update_date")]
        public DateTime UpdateDate { get; set; }
    }
}
