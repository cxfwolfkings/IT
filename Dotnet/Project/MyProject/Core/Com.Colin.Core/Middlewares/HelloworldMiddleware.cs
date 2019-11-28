using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace Com.Colin.Core.Middlewares
{
    /// <summary>
    /// 
    /// </summary>
    public class HelloworldMiddleware
    {
        private readonly RequestDelegate _next;

        public HelloworldMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            await context.Response.WriteAsync("Hello World!\t\n");
            await _next(context);
        }
    }
}
