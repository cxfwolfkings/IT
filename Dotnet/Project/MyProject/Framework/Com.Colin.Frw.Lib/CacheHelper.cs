using System;
using System.Collections;
using System.Web;
using System.Web.Caching;

namespace Com.Colin.Frw.Lib
{
    /// <summary>
    /// 缓存帮助类
    ///   在Asp.net中，提供了专门用于缓存数据的Cache对象，它的应用范围是应用程序域。
    ///   生存期是和应用程序紧密相关的，每当应用程序启动的时候就重新创建Cache对象。
    ///   它与Application对象的主要区别就是提供了专门用于缓存管理的特性，比如依赖和过期策略。
    /// </summary>
    public class CacheHelper
    {
        /// <summary>
        /// 获取数据缓存
        /// </summary>
        /// <param name="cacheKey">键</param>
        public static object GetCache(string cacheKey)
        {
            Cache cache = HttpRuntime.Cache;
            return cache[cacheKey];
        }

        /// <summary>
        /// 设置数据缓存
        /// </summary>
        /// <param name="cacheKey"></param>
        /// <param name="cacheValue"></param>
        public static void SetCache(string cacheKey, object cacheValue)
        {
            Cache cache = HttpRuntime.Cache;
            cache.Insert(cacheKey, cacheValue);
        }

        /// <summary>
        /// 设置数据缓存，可设置相对保存时间（离最后一次访问的时间）
        /// </summary>
        /// <param name="cacheKey"></param>
        /// <param name="cacheValue"></param>
        /// <param name="timeout"></param>
        public static void SetCache(string cacheKey, object cacheValue, TimeSpan timeout)
        {
            Cache cache = HttpRuntime.Cache;
            cache.Insert(cacheKey, cacheValue, null, DateTime.MaxValue, timeout, CacheItemPriority.NotRemovable, null);
        }

        /// <summary>
        /// 设置数据缓存，可设置绝对、相对保存时间
        /// </summary>
        public static void SetCache(string cacheKey, object cacheValue, DateTime absoluteExpiration, TimeSpan slidingExpiration)
        {
            Cache cache = HttpRuntime.Cache;
            cache.Insert(cacheKey, cacheValue, null, absoluteExpiration, slidingExpiration);
        }

        /// <summary>
        /// 移除指定数据缓存
        /// </summary>
        public static void RemoveAllCache(string cacheKey)
        {
            Cache _cache = HttpRuntime.Cache;
            _cache.Remove(cacheKey);
        }

        /// <summary>
        /// 移除全部缓存
        /// </summary>
        public static void RemoveAllCache()
        {
            Cache _cache = HttpRuntime.Cache;
            IDictionaryEnumerator cacheEnum = _cache.GetEnumerator();
            while (cacheEnum.MoveNext())
            {
                _cache.Remove(cacheEnum.Key.ToString());
            }
        }
    }
}