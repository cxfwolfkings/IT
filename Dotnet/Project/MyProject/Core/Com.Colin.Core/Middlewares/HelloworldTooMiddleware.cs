using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace Com.Colin.Core.Middlewares
{
    /// <summary>
    /// 
    /// </summary>
    public class HelloworldTooMiddleware
    {
        private readonly RequestDelegate _next;

        public HelloworldTooMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            await context.Response.WriteAsync("Hello World too!\t\n");
        }
    }
}
