/// <summary>
/// UseStatusCodePages：
///   我们可以调用如下三个UseStatusCodePages方法重载来注册StatusCodePagesMiddleware中间件。
///   不论我们调用那个重载，系统最终都会根据提供的StatusCodePagesOptions对象调用构造函数来创建这个中间件对象，
//    而且这个StatusCodePagesOptions必须具有一个作为错误处理器的Func<StatusCodeContext, Task>对象。
///   如果没有指定任何参数，StatusCodePagesOptions对象需要以Options模式的形式注册为服务。
/// </summary>
public static class StatusCodePagesExtensions
{
    public static IApplicationBuilder UseStatusCodePages(this IApplicationBuilder app)
    {
        return app.UseMiddleware<StatusCodePagesMiddleware>();
    }

    public static IApplicationBuilder UseStatusCodePages(this IApplicationBuilder app, StatusCodePagesOptions options)
    {
        return app.UseMiddleware<StatusCodePagesMiddleware>(Options.Create(options));
    }

    public static IApplicationBuilder UseStatusCodePages(this IApplicationBuilder app, Func<StatusCodeContext, Task> handler)
    {
        return app.UseStatusCodePages(new StatusCodePagesOptions
        {
            HandleAsync = handler
        });
    }
}

/// <summary>
/// 由于 StatusCodePagesMiddleware 中间件最终的目的还是将定制的错误信息响应给客户端，
/// 所以我们可以在注册该中间件的时候直接指定响应的内容和媒体类型，这样的注册方式可以通过调用如下这个UseStatusCodePages方法来完成。
/// 从如下所示的代码片段我们不难看出，我们通过 bodyFormat 方法指定的实际上是一个模板，它可以包含一个表示响应状态的占位符("{0}")。
/// </summary>
public static class StatusCodePagesExtensions
{
    public static IApplicationBuilder UseStatusCodePages(this IApplicationBuilder app, string contentType, string bodyFormat)
    {
        return app.UseStatusCodePages(context =>
        {
            var body = string.Format(CultureInfo.InvariantCulture, bodyFormat, context.HttpContext.Response.StatusCode);
            context.HttpContext.Response.ContentType = contentType;
            return context.HttpContext.Response.WriteAsync(body);
        });
    }
}
