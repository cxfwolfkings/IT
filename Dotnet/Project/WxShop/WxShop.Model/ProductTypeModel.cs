using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WxShop.Model.Base;

namespace WxShop.Model
{
    /// <summary>
    /// 商品类型
    /// </summary>
    [Table("ws_ProductType")]
    public class ProductTypeModel : EntityBase
    {
        /// <summary>
        /// 商品类型名称
        /// </summary>
        [StringLength(maximumLength: 10, ErrorMessage = "商品类型名称不能超过10个字符")]
        public string Name { get; set; }

        /// <summary>
        /// 父类型ID
        /// </summary>
        public int ParentID { get; set; }
    }
}
