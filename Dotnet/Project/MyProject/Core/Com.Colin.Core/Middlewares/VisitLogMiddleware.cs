using Com.Colin.Core.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Com.Colin.Core.Middlewares
{
    /// <summary>
    /// 自定义日志中间件
    /// </summary>
    public class VisitLogMiddleware
    {
        private readonly RequestDelegate _next;

        private readonly ILogger logger;

        private VisitLog visitLog;

        public VisitLogMiddleware(RequestDelegate next, ILoggerFactory loggerFactory)
        {
            _next = next;
            logger = loggerFactory.CreateLogger<VisitLogMiddleware>();
        }

        public async Task Invoke(HttpContext context)
        {
            visitLog = new VisitLog();
            HttpRequest request = context.Request;
            visitLog.Url = request.Path.ToString();
            visitLog.Headers = request.Headers.ToDictionary(k => k.Key, v => string.Join(";", v.Value.ToList()));
            visitLog.Method = request.Method;
            visitLog.ExcuteStartTime = DateTime.Now;

            using (StreamReader reader = new StreamReader(request.Body))
            {
                visitLog.RequestBody = reader.ReadToEnd();
            }

            context.Response.OnCompleted(ResponseCompletedCallback, context);
            await _next(context);
        }

        private Task ResponseCompletedCallback(object obj)
        {
            visitLog.ExcuteEndTime = DateTime.Now;
            logger.LogInformation($"VisitLog: {visitLog.ToString()}");
            return Task.FromResult(0);
        }
    }

    public static class VisitLogMiddlewareExtensions
    {
        public static IApplicationBuilder UseVisitLogger(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<VisitLogMiddleware>();
        }
    }
}
