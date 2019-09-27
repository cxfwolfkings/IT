using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

/// <summary>
/// 我们通过一个简单的实例来演示如果利用这个 StatusCodePagesFeature 特性来屏蔽 StatusCodePagesMiddleware 中间件。
/// 
/// 在下面这个应用中，我们将针对请求的处理定义在Invoke方法中，该方法会返回一个状态码为 "401 Unauthorized" 的响应。
/// 我们通过随机数让这个方法会在50%的情况下利用 StatusCodePagesFeature 特性来阻止StatusCodePagesMiddleware中间件自身对错误的处理。
/// 我们通过调用扩展方法 UseStatusCodePages 注册的 StatusCodePagesMiddleware 中间件会直接响应一个内容为 "Error occurred!" 的字符串。
/// </summary>
public class WebHost1
{
    private static Random _random = new Random();

    public static void Start1()
    {
        new WebHostBuilder()
          .UseKestrel()
            .Configure(app => app
              .UseStatusCodePages(async context => await context.HttpContext.Response.WriteAsync("Error occurred!"))
                .Run(Invoke))
           .Build()
             .Run();
    }

    private static Task Invoke(HttpContext context)
    {
        context.Response.StatusCode = 401;

        if (_random.Next() % 2 == 0)
        {
            context.Features.Get<IStatusCodePagesFeature1>().Enabled = false;
        }
        return Task.CompletedTask;
    }
    /*
    对于针对该应用的请求来说，我们会得到如下两种不同的响应。
    没有主体内容响应是通过 Invoke 方法产生的，这种情况下发生在 StatusCodePagesMiddleware 中间件通过 StatusCodePagesFeature 特性被屏蔽的时候。
    具有主体内容的响应则来源于 StatusCodePagesMiddleware 中间件。

    HTTP/1.1 401 Unauthorized
    Date: Sun, 18 Dec 2016 01:59:37 GMT
    Server: Kestrel
    Content-Length: 15

    Error occurred!


    HTTP/1.1 401 Unauthorized
    Date: Sun, 18 Dec 2016 01:59:38 GMT
    Content-Length: 0
    Server: Kestrel
     */


    /// <summary>
    /// 我们通过一个简单的应用来演示针对客户端重定向的错误页面呈现方式。
    /// 我们在如下这个应用中注册了一个路由模板为 "error/{statuscode}" 的路由，路由参数 "statuscode" 自然代表响应的状态码。
    /// 在作为路由处理器的 HandleError 方法中，我们会直接响应一个包含响应状态码的字符串。
    /// 我们调用 UseStatusCodePagesWithRedirects 方法注册 StatusCodePagesMiddleware 中间件的时候将重定义路径设置为"error/{0}"。
    /// 
    /// 针对该应用的请求总是会得到一个状态码在400 ~599之间的响应，StatusCodePagesMiddleware在此情况下会向我们指定的路径("~/error/{statuscode}")
    /// 发送一个客户端重定向。由于重定向请求的路径与注册的路由相匹配，所以作为路由处理器的HandleError方法会响应对应的错误页面。
    /// </summary>
    public static void Start2()
    {
        new WebHostBuilder()
             .UseKestrel()
             .ConfigureServices(svcs => svcs.AddRouting())
              .Configure(app => app
                .UseStatusCodePagesWithRedirects("~/error/{0}")
                .UseRouter(builder => builder.MapRoute("error/{statuscode}", HandleError))
                  .Run(context => Task.Run(() => context.Response.StatusCode = _random.Next(400, 599))))
              .Build()
            .Run();
    }

    /// <summary>
    /// 现在我们对上面演示的这个实例略作修改来演示采服务端重定向呈现出来的错误页面。如下面的代码片段所示，
    /// 我们仅仅将针对 UseStatusCodePagesWithRedirects 方法的调用替换成针对 UseStatusCodePagesWithReExecute 方法的调用而已。
    /// 
    /// 对于前面演示的实例，由于错误页面是通过客户端重定向的方式呈现出来的，所以浏览器地址栏显示的是重定向地址。
    /// 我们在选择这个实例中采用了服务端重定向，虽然显示的页面内容并没有不同，但是地址栏上的地址是不会发生改变的
    /// 
    /// 之所以被命名为UseStatusCodePagesWithReExecute，是因为通过这方法注册的StatusCodePagesMiddleware中间件进行错误处理的时候，
    /// 它仅仅是提供的重定向路径和查询字符串应用到当前HttpContext，然后递交给后续管道重新执行。
    /// </summary>
    public static void Start3()
    {
        new WebHostBuilder()
           .UseKestrel()
           .ConfigureServices(svcs => svcs.AddRouting())
           .Configure(app => app
                .UseStatusCodePagesWithReExecute("/error/{0}")
                .UseRouter(builder => builder.MapRoute("error/{statuscode}", HandleError))
              .Run(context => Task.Run(() => context.Response.StatusCode = _random.Next(400, 599))))
          .Build()
            .Run();
    }

    private async static Task HandleError(HttpContext context)
    {
        var statusCode = context.GetRouteData().Values["statuscode"];
        await context.Response.WriteAsync($"Error occurred ({statusCode})");
    }
}
