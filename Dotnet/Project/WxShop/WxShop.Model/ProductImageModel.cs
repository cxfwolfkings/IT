using System.ComponentModel.DataAnnotations.Schema;
using WxShop.Model.Base;

namespace WxShop.Model
{
    [Table("ws_ProductImage")]
    public class ProductImageModel : EntityBase
    {
        public int ProductID { get; set; }

        public string Name { get; set; }

        public string ImageType { get; set; }
    }
}
