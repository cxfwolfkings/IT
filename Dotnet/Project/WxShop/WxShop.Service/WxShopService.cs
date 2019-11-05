using LinqKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using WxShop.DBManager.EF;
using WxShop.Model;
using WxShop.Service.Interface;

namespace WxShop.Service
{
    public class WxShopService : IWxShopService
    {
        private readonly WxShopContext _context;

        public WxShopService(WxShopContext context)
        {
            _context = context;
        }

        public IList<ProductTypeModel> GetProductTypes()
        {
            return _context.ProductTypes.ToList();
        }

        /// <summary>
        /// 根据筛选条件查询商品
        /// </summary>
        /// <param name="where">筛选条件</param>
        /// <returns></returns>
        public IList<ProductModel> GetProducts(Expression<Func<ProductModel, bool>> where)
        {
            return (from i in _context.Products
                    where @where.Invoke(i)
                    select i).ToList();
        }

        /// <summary>
        /// 根据筛选条件查询商品图片
        /// </summary>
        /// <param name="where">筛选条件</param>
        /// <returns></returns>
        public IList<ProductImageModel> GetProductImages(Expression<Func<ProductImageModel, bool>> where)
        {
            return (from i in _context.ProductImages
                         where @where.Invoke(i)
                         select i).ToList();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="query"></param>
        /// <param name="orderColumn"></param>
        /// <param name="totalCount"></param>
        /// <param name="orderType"></param>
        /// <param name="orderColumns"></param>
        /// <param name="pageNo"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        private IEnumerable<T> getTQuery<T>(IQueryable<T> query, string orderColumn, out int totalCount,
            string orderType = "desc",
            Dictionary<string, string> orderColumns = null,
            int pageNo = 0, int pageSize = 0)
        {
            bool isDesc = orderType == "desc" ? true : false;
            query = query.OrderBy(orderColumn, isDesc);
            if (orderColumns != null)
            {
                foreach (string key in orderColumns.Keys)
                {
                    bool isKeyDesc = orderColumns[key] == "desc" ? true : false;
                    query = query.ThenOrderBy(key, isKeyDesc);
                }
            }
            totalCount = query.Count();
            if (pageNo > 0)
            {
                return query.Skip((pageNo - 1) * pageSize).Take(pageSize);
            }
            else
            {
                return query;
            }
        }
    }

    /// <summary>
    /// 
    /// </summary>
    public static class QueryableExtension
    {
        public static IOrderedQueryable<T> OrderBy<T>(this IQueryable<T> query, string propertyName, bool isDesc)
        {
            return _OrderBy(query, propertyName, isDesc);
        }

        public static IOrderedQueryable<T> ThenOrderBy<T>(this IQueryable<T> query, string propertyName, bool isDesc)
        {
            return _ThenOrderBy(query, propertyName, isDesc);
        }

        static IOrderedQueryable<T> _OrderBy<T>(IQueryable<T> query, string propertyName, bool isDesc)
        {
            string methodname = (isDesc) ? "OrderByDescendingInternal" : "OrderByInternal";
            var memberProp = typeof(T).GetProperty(propertyName);
            var method = typeof(QueryableExtension).GetMethod(methodname).MakeGenericMethod(typeof(T), memberProp.PropertyType);
            return (IOrderedQueryable<T>)method.Invoke(null, new object[] { query, memberProp });
        }

        static IOrderedQueryable<T> _ThenOrderBy<T>(IQueryable<T> query, string propertyName, bool isDesc)
        {
            string methodname = (isDesc) ? "ThenOrderByDescendingInternal" : "ThenOrderByInternal";
            var memberProp = typeof(T).GetProperty(propertyName);
            var method = typeof(QueryableExtension).GetMethod(methodname).MakeGenericMethod(typeof(T), memberProp.PropertyType);
            return (IOrderedQueryable<T>)method.Invoke(null, new object[] { query, memberProp });
        }

        public static IOrderedQueryable<T> OrderByInternal<T, TProp>(IQueryable<T> query, PropertyInfo memberProperty)
        {
            return query.OrderBy(_GetLamba<T, TProp>(memberProperty));
        }

        public static IOrderedQueryable<T> OrderByDescendingInternal<T, TProp>(IQueryable<T> query, PropertyInfo memberProperty)
        {
            return query.OrderByDescending(_GetLamba<T, TProp>(memberProperty));
        }

        public static IOrderedQueryable<T> ThenOrderByInternal<T, TProp>(IOrderedQueryable<T> query, PropertyInfo memberProperty)
        {
            return query.ThenBy(_GetLamba<T, TProp>(memberProperty));
        }

        public static IOrderedQueryable<T> ThenOrderByDescendingInternal<T, TProp>(IOrderedQueryable<T> query, PropertyInfo memberProperty)
        {
            return query.ThenByDescending(_GetLamba<T, TProp>(memberProperty));
        }

        static Expression<Func<T, TProp>> _GetLamba<T, TProp>(PropertyInfo memberProperty)
        {
            if (memberProperty.PropertyType != typeof(TProp)) throw new Exception();
            var thisArg = Expression.Parameter(typeof(T));
            var lamba = Expression.Lambda<Func<T, TProp>>(Expression.Property(thisArg, memberProperty), thisArg);
            return lamba;
        }
    }
}
