using System.Web;
using System.Web.Mvc;

namespace Wind.Wechat.Star
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
