using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Security;

namespace Com.Colin.UI.Filters
{
    public class CustomAuthorizationFilter : AuthorizeAttribute
    {
        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            // 获取“控制器”名称
            string controller = filterContext.RequestContext.RouteData.Values["controller"].ToString();
            // 获取“操作”名称
            string action = filterContext.RequestContext.RouteData.Values["action"].ToString();
            // JSON帮助类
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = int.MaxValue;
            // 如果是ajax调用
            if (AjaxRequestExtensions.IsAjaxRequest(filterContext.RequestContext.HttpContext.Request)) 
            {
                // 标记成功（前台ajax调用success），同时返回错误，返回
                filterContext.HttpContext.Response.StatusCode = 200;
                // 身份验证
                if (filterContext.HttpContext.Response.StatusCode == (int)HttpStatusCode.Unauthorized) 
                {
                    // 获取客户请求
                    var referer = filterContext.RequestContext.HttpContext.Request.UrlReferrer == null ? "" 
                        : filterContext.RequestContext.HttpContext.Request.UrlReferrer.ToString();
                    // 获取默认登录URL（web.config配置）
                    var link = FormsAuthentication.LoginUrl;
                    // 默认登录URL加上客户请求，登录成功后直接跳转到用户希望的地址
                    if (!string.IsNullOrEmpty(referer))
                    {
                        link = string.Format(FormsAuthentication.LoginUrl + "?ReturnUrl={0}", HttpUtility.UrlEncode(referer));
                    }
                    // 返回结果，客户端需要继续根据结果进行处理
                    filterContext.Result = new ContentResult
                    {
                        Content = serializer.Serialize(new { Status = HttpStatusCode.Unauthorized, Message = "登录信息过时，请重新登录！", TargetLink = link })
                    };
                }
                // 一般ajax请求不会出现下面这种情况
                else if (filterContext.HttpContext.Response.StatusCode == (int)HttpStatusCode.Forbidden) // 权限不足
                {
                    filterContext.HttpContext.Response.StatusCode = 200;
                    filterContext.Result = new ContentResult
                    {
                        Content = serializer.Serialize(new { Status = HttpStatusCode.Forbidden, Message = "权限不足！" })
                    };
                }
            }
            else // 普通请求
            {
                if (filterContext.HttpContext.Response.StatusCode == (int)HttpStatusCode.Unauthorized) // 身份验证失败，跳转登录页面
                {
                    // 获取用户请求地址
                    string path = filterContext.HttpContext.Request.Url.ToString();
                    // 拼接登录字符串
                    string loginUrl = string.Format(FormsAuthentication.LoginUrl + "?ReturnUrl={0}", HttpUtility.UrlEncode(path));
                    // 直接重定向到登录页面
                    filterContext.Result = new RedirectResult(loginUrl);
                }
                else if (filterContext.HttpContext.Response.StatusCode == (int)HttpStatusCode.Forbidden) // 权限不足，跳转错误页面
                {
                    // 直接重定向到错误页面
                    filterContext.Result = new RedirectResult("~/ErrorPage.html");
                }
            }
        }
    }
}