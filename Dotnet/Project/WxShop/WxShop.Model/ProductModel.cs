using System.ComponentModel.DataAnnotations.Schema;
using WxShop.Model.Base;

namespace WxShop.Model
{
    /// <summary>
    /// 
    /// </summary>
    [Table("ws_Product")]
    public class ProductModel : EntityBase
    {
        public string Name { get; set; }

        public string ShortName { get; set; }

        public string Content { get; set; }

        public decimal Price { get; set; }

        public decimal ActPrice { get; set; }

        public double level { get; set; }

        public bool isActive { get; set; }
    }
}
