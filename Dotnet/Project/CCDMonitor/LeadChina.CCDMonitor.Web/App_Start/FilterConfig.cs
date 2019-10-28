using LeadChina.CCDMonitor.Web.Filters;
using System.Web.Mvc;

namespace LeadChina.CCDMonitor.Web
{
    /// <summary>
    /// 过滤器设置
    /// </summary>
    public class FilterConfig
    {
        /// <summary>
        /// 注册过滤器
        /// </summary>
        /// <param name="filters"></param>
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            // 将内置的权限过滤器添加到全局过滤中
            filters.Add(new AuthorizeAttribute());
            filters.Add(new CCDMonitorHandleErrorAttribute());
        }
    }
}
