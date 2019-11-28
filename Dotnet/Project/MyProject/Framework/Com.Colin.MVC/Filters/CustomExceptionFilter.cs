using Com.Colin.Lib;
using System;
using System.Web.Mvc;

namespace Com.Colin.UI.Filters
{
    [AttributeUsage(AttributeTargets.Class, Inherited = true, AllowMultiple = false)]
    public class CustomExceptionFilter : HandleErrorAttribute
    {
        public override void OnException(ExceptionContext filterContext)
        {
            // 如果错误没有处理
            if (!filterContext.ExceptionHandled)
            {
                // 重定向到错误页面
                filterContext.Result = new RedirectResult("~/ErrorPage.html");
                // 如果有内部（更细致）错误，获取内部错误
                Exception ex = filterContext.Exception;
                while (ex.InnerException != null)
                {
                    ex = ex.InnerException;
                }
                // 输出日志
                Logger.Error(string.Format("\r\nHOST: {0}\r\nMETHOD: {1}\r\nURL: {2}\r\nERROR: {3}\r\nSTACK:\r\n {4}\r\n"
                    , filterContext.HttpContext.Request.UserHostAddress
                    , filterContext.HttpContext.Request.RequestType
                    , filterContext.HttpContext.Request.Url
                    , ex.Message, ex.StackTrace));
                // 将错误信息设置为控制器的临时数据
                filterContext.Controller.TempData["Error"] = ex.Message.ToString();
                // 设置异常已处理
                filterContext.ExceptionHandled = true;
                // 清空本次返回的全部头和内容输出
                filterContext.HttpContext.Response.Clear();
            }
        }
    }
}