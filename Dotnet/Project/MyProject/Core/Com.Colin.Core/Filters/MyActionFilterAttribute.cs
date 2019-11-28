using System;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

namespace Com.Colin.Core.Filters
{
    /// <summary>
    /// 自定义Action过滤器
    /// </summary>
    public class MyActionFilterAttribute : Attribute, IActionFilter, IOrderedFilter
    {
        private readonly int _order;

        private readonly string _target;

        private readonly ILogger<MyActionFilterAttribute> logger;

        public int Order
        {
            get
            {
                return _order;
            }
        }

        /// <summary>
        /// 通过ServiceFilter引用
        /// </summary>
        /// <param name="loggerFactory"></param>
        public MyActionFilterAttribute(ILoggerFactory loggerFactory)
        {
            logger = loggerFactory.CreateLogger<MyActionFilterAttribute>();
        }

        /// <summary>
        /// 通过TypeFilter引入
        /// 用TypeFilter引用过滤器不需要将类型注入到DI容器
        /// 自定义过滤器执行顺序
        /// </summary>
        /// <param name="target"></param>
        /// <param name="order"></param>
        public MyActionFilterAttribute(string target, int order = 0)
        {
            _order = order;
            _target = target;
            
            ILoggerFactory loggerFactory = new LoggerFactory();
            loggerFactory.WithFilter(new FilterLoggerSettings()
            {
                { "Microsoft", LogLevel.Warning }
            })
            .AddConsole().AddDebug();

            logger = loggerFactory.CreateLogger<MyActionFilterAttribute>();
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            logger.LogInformation($"{_target} Executed!");
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            context.HttpContext.Response.Headers.Add("My-Header", "DotnetCoreWebapi-Header");
            logger.LogInformation($"{_target} Executing!");
        }
    }
}