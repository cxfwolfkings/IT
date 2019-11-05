using System.ComponentModel.DataAnnotations;

namespace WxShop.Model.Base
{
    public class EntityBase
    {
        /// <summary>
        /// 主键
        /// </summary>
        [Key]
        public int ID { get; set; }

        /// <summary>
        /// 这个属性用来进行并发性检测
        /// </summary>
        [Timestamp]
        public byte[] Timestamp { get; set; }
    }
}
