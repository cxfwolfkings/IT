using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using WxShop.Model;

namespace WxShop.Service.Interface
{
    public interface IWxShopService
    {
        /// <summary>
        /// 获取全部商品类型
        /// </summary>
        /// <returns></returns>
        IList<ProductTypeModel> GetProductTypes();

        /// <summary>
        /// 获取商品图片
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        IList<ProductImageModel> GetProductImages(Expression<Func<ProductImageModel, bool>> where);

        /// <summary>
        /// 获取全部商品
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        IList<ProductModel> GetProducts(Expression<Func<ProductModel, bool>> where);
    }
}
