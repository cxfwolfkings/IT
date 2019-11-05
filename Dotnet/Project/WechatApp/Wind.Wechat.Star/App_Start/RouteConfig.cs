using System.Web.Mvc;
using System.Web.Routing;

namespace Wind.Wechat.Star
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            // 注意：如果创建的是MVC项目，在路由配置中必须加下面的一句代码。意思很明确，以".handler"结尾的url忽视路由配置，也就是不通过路由跳转。
            routes.IgnoreRoute("{resource}.handler/{*pathInfo}");
            routes.IgnoreRoute("{resource}.ashx/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
