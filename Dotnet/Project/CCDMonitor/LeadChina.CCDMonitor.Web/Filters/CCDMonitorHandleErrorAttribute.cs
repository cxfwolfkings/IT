using LeadChina.CCDMonitor.Web.Helper;
using System;
using System.Net;
using System.Web.Mvc;

namespace LeadChina.CCDMonitor.Web.Filters
{
    /// <summary>
    /// 全局异常过滤器
    /// </summary>
    [AttributeUsage(AttributeTargets.Class, Inherited = true, AllowMultiple = false)]
    public class CCDMonitorHandleErrorAttribute : HandleErrorAttribute
    {
        /// <summary>
        /// 异常发生后的处理
        /// </summary>
        /// <param name="filterContext"></param>
        public override void OnException(ExceptionContext filterContext)
        {
            if (!filterContext.ExceptionHandled)
            {
                Exception ex = filterContext.Exception;
                while (ex.InnerException != null)
                {
                    ex = ex.InnerException;
                }

                Logger.Error(string.Format("\r\nHOST: {0}\r\nMETHOD: {1}\r\nURL: {2}\r\nERROR: {3}\r\nSTACK:\r\n {4}\r\n"
                    , filterContext.HttpContext.Request.UserHostAddress
                    , filterContext.HttpContext.Request.RequestType
                    , filterContext.HttpContext.Request.Url
                    , ex.Message, ex.StackTrace));

                // 处理ajax request
                if (IsAjax(filterContext))
                {
                    // Because its a exception raised after ajax invocation, Lets return Json
                    //filterContext.Result = new JsonResult
                    //{
                    //    Data = new
                    //    {
                    //        Status = 500,
                    //        Msg = filterContext.Exception.Message
                    //    },
                    //    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                    //};
                    filterContext.Result = new ContentResult
                    {
                        Content = filterContext.Exception.Message
                    };
                    filterContext.HttpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    filterContext.HttpContext.Response.TrySkipIisCustomErrors = true;
                }
                else
                {
                    filterContext.Result = new RedirectResult("~/ErrorPage.html");
                    filterContext.Controller.TempData["Error"] = ex.Message.ToString();
                }
                filterContext.ExceptionHandled = true;
                filterContext.HttpContext.Response.Clear();
            }
        }

        private bool IsAjax(ExceptionContext filterContext)
        {
            if (filterContext == null) throw new ArgumentNullException("filterContext");
            return filterContext.HttpContext.Request.Headers["X-Requested-With"] == "XMLHttpRequest";
        }
    }
}
