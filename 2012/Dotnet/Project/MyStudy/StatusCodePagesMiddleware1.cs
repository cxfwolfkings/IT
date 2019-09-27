using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Globalization;
using System.Threading.Tasks;

/// <summary>
/// StatusCodePagesMiddleware 中间件与 ExceptionHandlerMiddleware 中间件比较类似，
/// 它们都是在后续请求处理过程中“出错”的情况下利用一个错误处理器来完成最终的请求处理与响应的任务。
/// 它们之间的差异在于对“错误”的界定上，对于 ExceptionHandlerMiddleware 中间件来说，它所谓的错误就是抛出异常，
/// 但是对于 StatusCodePagesMiddleware 中间件来说，则将介于400~599之间的响应状态码视为错误。
/// 
/// 如下面的代码片段所示，StatusCodePagesMiddleware中间件也采用“标准”的定义方式，
/// 针对它的配置选项通过一个对应的对象以 Options 模式的形式提供给它。
/// 
/// 由于采用了针对响应状态码的错误处理策略，所以实现在StatusCodePagesMiddleware中间件
/// 中的所有错误处理操作只会发生在当前响应状态码在400~599之间的情况，如下所示的代码片段体现了这一点。
/// </summary>
public class StatusCodePagesMiddleware1
{
    private RequestDelegate _next;
    private StatusCodePagesOptions1 _options;

    public StatusCodePagesMiddleware1(RequestDelegate next, IOptions<StatusCodePagesOptions1> options)
    {
        _next = next;
        _options = options.Value;
    }

    public async Task Invoke(HttpContext context)
    {

        /**
         * 从下面给出的代码片段可以看出，StatusCodePagesMiddleware中间件在决定是否执行错误处理操作时除了会查看当前响应状态码之外，
         * 还会查看响应内容以及媒体类型，如果已经包含了响应内容或者设置了媒体类型，该中间件将不会执行任何操作。 
         * 
         * StatusCodePagesMiddleware 中间件针对错误的处理非常简单，它只需要从 StatusCodePagesOptions 对象中
         * 提取出作为错误处理器的这个 Func<StatusCodeContext, Task> 对象，
         * 然后创建一个 StatusCodeContext 对象作为输入参数调用这个委托对象即可
         */
        //await _next(context);
        //var response = context.Response;
        //if ((response.StatusCode >= 400 && response.StatusCode <= 599) && !response.ContentLength.HasValue && string.IsNullOrEmpty(response.ContentType))
        //{
        //    await _options.HandleAsync(new StatusCodeContext(context, _options, _next));
        //}

        /**
         * StatusCodePagesMiddleware中间件在将请求交付给后续管道之前，它会创建一个StatusCodePagesFeature特性对象并将其添加到当前HttpContext之中。
         * 当最终决定是否执行错误处理操作的时候，它还会通过这个特性检验是否某个后续的中间件不希望自己“画蛇添足”地进行不必要的错误处理，
         * 如下的代码片段很好的体现了这一点。
         */
        StatusCodePagesFeature1 feature = new StatusCodePagesFeature1();
        context.Features.Set<IStatusCodePagesFeature1>(feature);

        await _next(context);
        var response = context.Response;
        if ((response.StatusCode >= 400 && response.StatusCode <= 599) && !response.ContentLength.HasValue && string.IsNullOrEmpty(response.ContentType) &&
           feature.Enabled)
        {
            await _options.HandleAsync(new StatusCodeContext1(context, _options, _next));
        }
    }
}

/// <summary>
/// 除了针对错误的界定，StatusCodePagesMiddleware 和 ExceptionHandlerMiddleware 这两个中间件对于错误处理器的表达也不相同。
/// 我们知道 ExceptionHandlerMiddleware 中间件使用的错误处理器实际上就是一个类型为 RequestDelegate 的委托对象，
/// 但是错误处理器之于 StatusCodePagesMiddleware 中间件来说则是一个类型为 Func<StatusCodeContext, Task> 的委托对象。
/// 如下面的代码片段所示，为 StatusCodePagesMiddleware 中间件提供配置选项的 StatusCodePagesOptions 对象的唯一目的就是提供这个作为错误处理器的委托对象。
/// </summary>
public class StatusCodePagesOptions1
{
    public Func<StatusCodeContext1, Task> HandleAsync { get; set; }
}

/// <summary>
/// 我们知道一个 RequestDelegate 对象相当于一个类型为 Func<HttpContext, Task> 类型的委托对象，
/// 而一个 StatusCodeContext 对象实际上也是对一个 HttpContext 对象的封装，
/// 所以 StatusCodePagesMiddleware 中间件和 ExceptionHandlerMiddleware 中间件所使采用的错误处理器并没有本质上的不同。
/// 
/// 如下面的代码片段所示，除了从 StatusCodeContext 对象中获取代表当前请求上下文的 HttpContext 对象之外，
/// 我们还可以通过其 Next 属性得到一个 RequestDelegate 对象，它代表由后续中间件组成的请求处理管道。
/// 至于另一个属性Options，很明显它返回我们在创建 StatusCodePagesMiddleware 中间件所指定的 StatusCodePagesOptions 对象。
/// </summary>
public class StatusCodeContext1
{
    public HttpContext HttpContext { get; }
    public RequestDelegate Next { get; }
    public StatusCodePagesOptions1 Options { get; }
    public StatusCodeContext1(HttpContext context, StatusCodePagesOptions1 options, RequestDelegate next)
    {
        HttpContext = context;
        Options = options;
        Next = next;
    }
}

/// <summary>
/// 如果当前响应已经被写入了内容，或者响应的媒体类型已经被预先设置，那么 StatusCodePagesMiddleware 中间件将不会再执行任何的错误处理操作。
/// 这种情况实际上代表由后续中间件构成的管道可能需要自行控制当前的响应，所以 StatusCodePagesMiddleware 中间件不应该再做任何的干预。
/// 从这个意义上来讲，StatusCodePagesMiddleware中间件仅仅是作为一种后备的错误处理机制而已。
/// 
/// 更进一步来将，如果后续的某个中间件返回了一个状态码在400~599之间的响应，并且这个响应只有报头集合没有主体（媒体类型自然也不会设置），
/// 那么按照我们在上面给出的错误处理逻辑，StatusCodePagesMiddleware中间件还是会按照自己的策略来处理并响应请求。
/// 为了解决这种情况下，我们必须赋予后续中间件一个能够阻止StatusCodePagesMiddleware中间件进行错误处理的能力。
/// 
/// 阻止 StatusCodePagesMiddleware 中间件进行错误处理的机制是借助于一个名为 StatusCodePagesFeature 的特性来实现的。
/// StatusCodePagesFeature对应如下这个IStatusCodePagesFeature接口，它具有唯一的布尔类型的属性成员Enabled。
/// 默认使用的 StatusCodePagesFeature 类型实现了这个接口，默认情况下这个开关是开启的。
/// </summary>
public interface IStatusCodePagesFeature1
{
    bool Enabled { get; set; }
}

public class StatusCodePagesFeature1 : IStatusCodePagesFeature1
{
    public bool Enabled { get; set; } = true;
}


# region 注册中间件

/// <summary>
/// 我们在大部分情况下都会调用 ApplicationBuilder 相应的扩展方法来注册 StatusCodePagesMiddleware 中间件。
/// 对于 StatusCodePagesMiddleware 中间件的注册来说，除了我们已经很熟悉的 UseStatusCodePages 方之外，还具有额外一些扩展方法供我们选择。
/// </summary>
public static class StatusCodePagesExtensions
{
    #region 1. UseStatusCodePages
    
    /// <summary>
    ///  我们可以调用如下三个 UseStatusCodePages 方法重载来注册 StatusCodePagesMiddleware 中间件。
    ///  不论我们调用那个重载，系统最终都会根据提供的 StatusCodePagesOptions 对象调用构造函数来创建这个中间件对象，
    ///  而且这个 StatusCodePagesOptions 必须具有一个作为错误处理器的 Func<StatusCodeContext, Task> 对象。
    ///  如果没有指定任何参数，StatusCodePagesOptions 对象需要以 Options 模式的形式注册为服务。
    /// </summary>
    /// <param name="app"></param>
    /// <param name="p"></param>
    /// <returns></returns>
    public static IApplicationBuilder UseStatusCodePages(this IApplicationBuilder app, object p)
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

    /// <summary>
    /// 由于 StatusCodePagesMiddleware 中间件最终的目的还是将定制的错误信息响应给客户端，
    /// 所以我们可以在注册该中间件的时候直接指定响应的内容和媒体类型，这样的注册方式可以通过调用如下这个 UseStatusCodePages 方法来完成。
    /// 从如下所示的代码片段我们不难看出，我们通过 bodyFormat 方法指定的实际上是一个模板，它可以包含一个表示响应状态的占位符("{0}")。
    /// </summary>
    /// <param name="app"></param>
    /// <param name="contentType"></param>
    /// <param name="bodyFormat"></param>
    /// <returns></returns>
    public static IApplicationBuilder UseStatusCodePages(this IApplicationBuilder app, string contentType, string bodyFormat)
    {
        return app.UseStatusCodePages(context =>
        {
            var body = string.Format(CultureInfo.InvariantCulture, bodyFormat, context.HttpContext.Response.StatusCode);
            context.HttpContext.Response.ContentType = contentType;
            return context.HttpContext.Response.WriteAsync(body);
        });
    }

    #endregion

    #region 2. UseStatusCodePagesWithRedirects

    /// <summary>
    /// 如果我们调用 UseStatusCodePagesWithRedirects 方法，可以让注册的 StatusCodePagesMiddleware 中间件向指定的路径发送一个客户端重定向。
    /// 从如下所示的实现代码可以看出，这个作为参数 locationFormat 的重定向地址也是一个模板，它可以包含一个表示响应状态的占位符("{0}")。
    /// 我们可以指定一个完整的地址，也可以指定一个相对于 PathBase 的相对路径，后者需要包含表示基地址的 "~/" 前缀。
    /// </summary>
    public static IApplicationBuilder UseStatusCodePagesWithRedirects(this IApplicationBuilder app, string locationFormat)
    {
        if (locationFormat.StartsWith("~"))
        {
            locationFormat = locationFormat.Substring(1);
            return app.UseStatusCodePages(context =>
            {
                var location = string.Format(CultureInfo.InvariantCulture, locationFormat, context.HttpContext.Response.StatusCode);
                context.HttpContext.Response.Redirect(context.HttpContext.Request.PathBase + location);
                return Task.CompletedTask;
            });
        }
        else
        {
            return app.UseStatusCodePages(context =>
            {
                var location = string.Format(CultureInfo.InvariantCulture, locationFormat, context.HttpContext.Response.StatusCode);
                context.HttpContext.Response.Redirect(location);
                return Task.CompletedTask;
            });
        }
    }

    #endregion

    #region 3. UseStatusCodePagesWithReExecute

    public static IApplicationBuilder UseStatusCodePagesWithReExecute(this IApplicationBuilder app, string pathFormat, string queryFormat = null)
    {
        /**
         *  除了采用客户端重定向的方式来呈现错误页面之外，
         *  我们还可以调用 UseStatusCodePagesWithReExecute 方法注册 StatusCodePagesMiddleware 中间件，
         *  并让它采用服务端重定向的方式来处理错误请求。
         *  如下面的代码片段所示，
         *  
         *  当我们调用这个方法的时候不仅可以指定重定向的路径，还可以指定指定查询字符串。
         *  这里作为重定向地址的参数 pathFormat 依旧是一个路径模板，它可以包含一个表示响应状态的占位符("{0}")。
         *  UseStatusCodePagesWithReExecute 方法中注册 StatusCodePagesMiddleware 中间件的实现总体上可以由如下所示的代码片段来体现。
         */
        //return app.UseStatusCodePages(async context =>
        //{
        //    var newPath = new PathString(string.Format(CultureInfo.InvariantCulture, pathFormat, context.HttpContext.Response.StatusCode));
        //    var formatedQueryString = queryFormat == null ? null : string.Format(CultureInfo.InvariantCulture, queryFormat, context.HttpContext.Response.StatusCode);
        //    context.HttpContext.Request.Path = newPath;
        //    context.HttpContext.Request.QueryString = newQueryString;
        //    await context.Next(context.HttpContext);
        //});

        /**
         * 当 StatusCodePagesMiddleware 中间件在处理异常请求的过程中，
         * 在将指定的重定向路径和查询字符串应用到当前请求上下文上之前，
         * 它会根据原始的上下文创建一个 StatusCodeReExecuteFeature 特性对象并将其添加到当前 HttpContext 之上。
         * 
         * 当整个请求处理过程结束之后，StatusCodePagesMiddleware 中间件还会负责将这个特性从当前 HttpContext 中移除，
         * 并恢复原始的请求路径和查询字符串。
         * 
         * 如下所示的代码片段体现了 UseStatusCodePagesWithReExecute 方法的真实逻辑。
         */
        return app.UseStatusCodePages(async context =>
        {
            var newPath = new PathString(string.Format(CultureInfo.InvariantCulture, pathFormat, context.HttpContext.Response.StatusCode));
            var formatedQueryString = queryFormat == null ? null : string.Format(CultureInfo.InvariantCulture, queryFormat, context.HttpContext.Response.StatusCode);
            var newQueryString = queryFormat == null ? QueryString.Empty : new QueryString(formatedQueryString);

            var originalPath = context.HttpContext.Request.Path;
            var originalQueryString = context.HttpContext.Request.QueryString;

            context.HttpContext.Features.Set<IStatusCodeReExecuteFeature>(new StatusCodeReExecuteFeature()
            {
                OriginalPathBase = context.HttpContext.Request.PathBase.Value,
                OriginalPath = originalPath.Value,
                OriginalQueryString = originalQueryString.HasValue ? originalQueryString.Value : null,
            });

            context.HttpContext.Request.Path = newPath;
            context.HttpContext.Request.QueryString = newQueryString;
            try
            {
                await context.Next(context.HttpContext);
            }
            finally
            {
                context.HttpContext.Request.QueryString = originalQueryString;
                context.HttpContext.Request.Path = originalPath;
                context.HttpContext.Features.Set<IStatusCodeReExecuteFeature>(null);
            }
        });
    }

    #endregion
}


/// <summary>
/// 与 ExceptionHandlerMiddleware 中间价类似，
/// StatusCodePagesMiddleware 中间件在处理请求的过程中会改变当前请求上下文的状态，
/// 具体体现在将指定的请求路径和查询字符串重新应用到当前请求上下文中。
/// 
/// 为了不影响前置中间件对请求的正常处理，StatusCodePagesMiddleware 中间件在完成自身处理流程之后必须将当前请求上下文恢复到原始的状态。
/// StatusCodePagesMiddleware 中间件依旧是采用一个特性来保存原始的路径和查询字符串。
/// 
/// 这个特性对应的接口为具有如下定义的 IStatusCodeReExecuteFeature，令人费解的是该接口仅仅包含两个针对路径的属性，
/// 并没有我们希望的用于携带原始查询上下文的属性，但是默认实现类型 StatusCodeReExecuteFeature 包含了这个属性。
/// </summary>
public interface IStatusCodeReExecuteFeature1
{
    string OriginalPath { get; set; }
    string OriginalPathBase { get; set; }
}

public class StatusCodeReExecuteFeature1 : IStatusCodeReExecuteFeature1
{
    public string OriginalPath { get; set; }
    public string OriginalPathBase { get; set; }
    public string OriginalQueryString { get; set; }
}

#endregion
