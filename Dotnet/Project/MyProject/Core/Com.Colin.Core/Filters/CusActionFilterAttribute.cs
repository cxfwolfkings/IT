using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

namespace Com.Colin.Core.Filters
{
    /// <summary>
    /// 可以通过TypeFilter引用需要通过构造方法注入进行实例化的过滤器
    /// </summary>
    public class CusActionFilterAttribute : TypeFilterAttribute
    {
        public CusActionFilterAttribute() : base(typeof(CusActionFilterImpl))
        {

        }

        private class CusActionFilterImpl : IActionFilter
        {
            private readonly ILogger<CusActionFilterImpl> logger;

            public CusActionFilterImpl(ILoggerFactory loggerFactory)
            {
                logger = loggerFactory.CreateLogger<CusActionFilterImpl>();
            }

            public void OnActionExecuting(ActionExecutingContext context)
            {
                context.HttpContext.Response.Headers.Add("My-Header", "DotnetCoreWebapi-Header");
                logger.LogInformation("CusActionFilterAttribute Executiong!");
            }

            public void OnActionExecuted(ActionExecutedContext context)
            {

            }
        }
    }
}
