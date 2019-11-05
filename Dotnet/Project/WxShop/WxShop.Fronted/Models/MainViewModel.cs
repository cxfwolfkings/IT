using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WxShop.Model;

namespace WxShop.Fronted.Models
{
    public class MainViewModel
    {
        /// <summary>
        /// 商品类别
        /// </summary>
        public IList<ProductTypeModel> ProductTypes;

        /// <summary>
        /// 主页图片
        /// </summary>
        public IList<ProductImageModel> MainPicList;

        /// <summary>
        /// 商品
        /// </summary>
        public IList<ProductModel> Products;
    }
}
