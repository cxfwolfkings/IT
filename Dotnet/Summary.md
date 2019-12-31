# 总结

## 目录

## 授权认证

先来了解ASP.NET是如何进行Form认证的：

1. 终端用户在浏览器的帮助下，发送Form认证请求。
2. 浏览器会发送存储在客户端的所有相关的用户数据。
3. 当服务器端接收到请求时，服务器会检测请求，查看是否存在 "Authentication Cookie" 的Cookie。
4. 如果查找到认证Cookie，服务器会识别用户，验证用户是否合法。
5. 如果未找到"Authentication Cookie"，服务器会将用户作为匿名（未认证）用户处理，在这种情况下，如果请求的资源标记着 protected/secured，用户将会重定位到登录页面。

示例：

1. 创建 AuthenticationController 和 Login 行为方法

    ```C#
    public class AuthenticationController : Controller
    {
        // GET: Authentication
        public ActionResult Login()
        {
            return View();
        }
    }

    ```

2. 创建Model
   
    ```C#
    public class UserDetails
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
    ```

3. 创建Login View

    ```C#
    @model WebApplication1.Models.UserDetails
    @{
        Layout = null;
    }
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width" />
        <title>Login</title>
    </head>
    <body>
        <div>
            @using (Html.BeginForm("DoLogin", "Authentication", FormMethod.Post))
            {
                @Html.LabelFor(c=>c.UserName)
                @Html.TextBoxFor(x=>x.UserName)
                <br />
                @Html.LabelFor(c => c.Password)
                @Html.PasswordFor(x => x.Password)
                <br />
                <input type="submit" name="BtnSubmit" value="Login" />
            }
        </div>
    </body>
    </html>
    ```

    在上述代码中可以看出，使用HtmlHelper类在View中替代了纯HTML代码。View中可使用"Html"调用HtmlHelper类；HtmlHelper类函数返回html字符串

   示例1:

   ```C#
   @Html.TextBoxFor(x=>x.UserName)
   ```

   转换为HTML代码

   ```html
   <input id="UserName" name="UserName" type="text" value="" />
   ```

   示例2：

   ```C#
   @using (Html.BeginForm("DoLogin", "Authentication", FormMethod.Post))
   {

   }
   ```

   转换为HTML代码：

   ```html
   <form action="/Authentication/DoLogin" method="post"></form>
   ```

4. 实现Form认证

   web.config

   ```xml
   <authentication mode="Forms">
     <forms loginurl="~/Authentication/Login"></forms>
   </authentication>
   ```

5. 让Action方法更安全

   在Index action方法中添加认证属性 [Authorize]

   ```C#
   [Authorize]
   public ActionResult Index()
   {
       EmployeeListViewModel employeeListViewModel = new EmployeeListViewModel();
       // ......
   }
   ```

6. 创建 login action 方法

   通过调用业务层功能检测用户是否合法。  
   如果是合法用户，创建认证Cookie。可用于以后的认证请求过程中。  
   如果是非法用户，给当前的ModelState添加新的错误信息，将错误信息显示在View中。

    ```C#
    [HttpPost]
    public ActionResult DoLogin(UserDetails u)
    {
        EmployeeBusinessLayer bal = new EmployeeBusinessLayer();
        if (bal.IsValidUser(u))
        {
            // 在客户端创建一个新cookie
            FormsAuthentication.SetAuthCookie(u.UserName, false);
            return RedirectToAction("Index", "Employee");
        }
        else
        {
            ModelState.AddModelError("CredentialError", "Invalid Username or Password");
            return View("Login");
        }
    }
    ```

7. 在 View 中显示信息

    ```C#
    @Html.ValidationMessage("CredentialError", new {style="color:red;" })
    @using (Html.BeginForm("DoLogin", "Authentication", FormMethod.Post))
    {
        // ……
    }
    ```

理解：

1. 什么Dologin会添加 HttpPost属性，还有其他类似的属性吗？

   该属性使得DoLogin方法只能由Post请求调用。如果有人尝试用Get调用DoLogin，将不会起作用。还有很多类似的属性如HttpGet，HttpPut和HttpDelete属性.

2. FormsAuthentication.SetAuthCookie是必须写的吗？

   ```txt
   是必须写的。让我们了解一些小的工作细节。
   客户端通过浏览器给服务器发送请求。当通过浏览器生成后，所有相关的Cookies也会随着请求一起发送。
   服务器接收请求后，准备响应。请求和响应都是通过HTTP协议传输的，HTTP是无状态协议。每个请求都是新请求，因此当同一客户端发出二次请求时，服务器无法识别，为了解决此问题，服务器会在准备好的请求包中添加一个Cookie，然后返回。
   当客户端的浏览器接收到带有Cookie的响应，会在客户端创建Cookies。
   如果客户端再次给服务器发送请求，服务器就会识别。
   FormsAuthentication.SetAuthCookie 将添加 "Authentication" 这个特殊的Cookie来响应。
   ```

3. 是否意味着没有Cookies，FormsAuthentication将不会有作用？

   不是的，可以使用URI代替Cookie。打开Web.Config文件，修改Authentication/Forms部分：

   ```xml
   <forms cookieless="UseUri" loginurl="~/Authentication/Login"></forms>
   ```

   授权的Cookie会使用URL传递。通常情况下，Cookieless属性会被设置为"AutoDetect"，表示认证工作是通过不支持URL传递的Cookie完成的。

4. FormsAuthentication.SetAuthCookie中第二个参数"false"表示什么？

   false决定了是否创建永久有用的Cookie。临时Cookie会在浏览器关闭时自动删除，永久Cookie不会被删除。可通过浏览器设置或是编写代码手动删除。

5. 当凭证错误时，UserName 文本框的值是如何被重置的？

   HTML帮助类会从Post数据中获取相关值并重置文本框的值。这是使用 HTML 帮助类的一大优势。

6. "Authorize" 属性做了什么？
In Asp.net MVC there is a concept called Filters. Which will be used to filter out requests and response. There are four kind of filters. We will discuss each one of them in our 7 days journey. Authorize attribute falls under Authorization filter. It will make sure that only authenticated requests are allowed for an action method.
7.	Can we attach both HttpPost and Authorize attribute to same action method?
Yes we can.
8.	Why there is no ViewModel in this example?
As per the discussion we had in Lab 6, View should not be connected to Model directly. We must always have ViewModel in between View and Model. It doesn't matter if view is a simple "display view" or "data entry view", it should always connected to ViewModel. Reason for not using ViewModel in our project is simplicity. In real time project I strongly recommend you to have ViewModel everywhere.
9.	需要为每个Action方法添加授权属性吗？
不需要，可以将授权属性添加到Controller级别或 Global级别。When attached at controller level, it will be applicable for all the action methods in a controller. When attached at Global level, it will be applicable for all the action method in all the controllers.
	Controller Level
[Authorize]
public class EmployeeController : Controller
{
....
Global level
	Step 1 - Open FilterConfig.cs file from App_start folder.
	Step 2 - Add one more line RegisterGlobalFilters as follows.
public static void RegisterGlobalFilters(GlobalFilterCollection filters)
{
    filters.Add(new HandleErrorAttribute());//Old line
    filters.Add(new AuthorizeAttribute());//New Line
}
	Step 3 - Attach AllowAnonymous attribute to Authentication controller.
[AllowAnonymous]
public class AuthenticationController : Controller
{
	Step 4 – Execute and Test the application in the same way we did before.
10.	Why AllowAnonymous attribute is required for AuthenticationController?
We have attached Authorize filter at global level. That means now everything is protected including Login and DoLogin action methods. AllowAnonymous opens action method for non-authenticated requests.
11.	How come this RegisterGlobalFilters method inside FilterConfig class invoked?
It was invoked in Application_Start event written inside Global.asax file.

## 任务调度

简单的基于 Timer 的定时任务，使用过程中慢慢发现这种方式可能并不太合适，有些任务可能只希望在某个时间段内执行，只使用 timer 就显得不是那么灵活了，希望可以像 quartz 那样指定一个 cron 表达式来指定任务的执行时间。

### 并发控制

默认情况下，当Job执行时间超过间隔时间时，调度框架为了能让任务按照我们预定的时间间隔执行，会马上启用新的线程执行任务。

 若我们希望当前任务执行完之后再执行下一轮任务，也就是不要并发执行任务，该如何解决呢？

第一种方法：设置 quartz.threadPool.threadCount 最大线程数为 1。这样到了第二次执行任务时，若当前还没执行完，调度器想新开一个线程执行任务，但我们却设置了最大线程数为 1 个（即：没有足够的线程提供给调度器），则调度器会等待当前任务执行完之后，再立即调度执行下一次任务。（注意：此方法仅适用于Quartz中仅有一个Job，如果有多个Job，会影响其他Job的执行）

第二种方法：在 Job 类的头部加上 `[DisallowConcurrentExecution]`，表示禁用并发执行。（推荐使用此方法）

```C#
// 不允许此 Job 并发执行任务（禁止新开线程执行）
[DisallowConcurrentExecution]
public class Job1 : IJob
{
}
```

### cron 表达式介绍

cron 常见于Unix和类Unix的操作系统之中，用于设置周期性被执行的指令。该命令从标准输入设备读取指令，并将其存放于“crontab”文件中，以供之后读取和执行。该词来源于希腊语 chronos（χρόνος），原意是时间。

通常， crontab储存的指令被守护进程激活， crond 常常在后台运行，每一分钟检查是否有预定的作业需要执行。这类作业一般称为cron jobs。

cron 可以比较准确的描述周期性执行任务的执行时间，标准的 cron 表达式是五位：

`30 4 * * ?` 五个位置上的值分别对应 分钟/小时/日期/月份/周(day of week)

现在有一些扩展，有6位的，也有7位的，6位的表达式第一个对应的是秒，7个的第一个对应是秒，最后一个对应的是年份

`0 0 12 * * ?` 每天中午12点 `0 15 10 ? * *` 每天 10:15 `0 15 10 * * ?` 每天 10:15 `30 15 10 * * ? *` 每天 10:15:30 `0 15 10 * * ? 2005` 2005年每天 10:15

详细信息可以参考：[http://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html](http://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html)

### .NET Core CRON service

CRON 解析库 使用的是 [https://github.com/HangfireIO/Cronos，支持五位/六位，暂不支持年份的解析（7位）](https://github.com/HangfireIO/Cronos，支持五位/六位，暂不支持年份的解析（7位）)

基于 BackgroundService 的 CRON 定时服务，实现如下：

```C#
using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using WeihanLi.Common.Helpers;
using WeihanLi.Redis;

namespace ActivityReservation.Services
{
    public abstract class CronScheduleServiceBase : BackgroundService
    {
        /// <summary>
        /// job cron trigger expression
        /// refer to: http://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html
        /// </summary>
        public abstract string CronExpression { get; }

        protected abstract bool ConcurrentAllowed { get; }

        protected readonly ILogger Logger;

        protected CronScheduleServiceBase(ILogger logger)
        {
            Logger = logger;
        }

        protected abstract Task ProcessAsync(CancellationToken cancellationToken);

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            {
                var next = CronHelper.GetNextOccurrence(CronExpression);
                while (!stoppingToken.IsCancellationRequested && next.HasValue)
                {
                    var now = DateTimeOffset.UtcNow;

                    if (now >= next)
                    {
                        if (ConcurrentAllowed)
                        {
                            _ = ProcessAsync(stoppingToken);
                            next = CronHelper.GetNextOccurrence(CronExpression);
                            if (next.HasValue)
                            {
                                Logger.LogInformation("Next at {next}", next);
                            }
                        }
                        else
                        {
                            var firewall = RedisManager.GetFirewallClient($"Job_{GetType().FullName}_{next:yyyyMMddHHmmss}", TimeSpan.FromMinutes(3));
                            if (await firewall.HitAsync())
                            {
                                // 执行 job
                                await ProcessAsync(stoppingToken);
                                next = CronHelper.GetNextOccurrence(CronExpression);
                                if (next.HasValue)
                                {
                                    Logger.LogInformation("Next at {next}", next);
                                    var delay = next.Value - DateTimeOffset.UtcNow;
                                    if (delay > TimeSpan.Zero)
                                    {
                                        await Task.Delay(delay, stoppingToken);
                                    }
                                }
                            }
                            else
                            {
                                Logger.LogInformation("正在执行 job，不能重复执行");
                                next = CronHelper.GetNextOccurrence(CronExpression);
                                if (next.HasValue)
                                {
                                    await Task.Delay(next.Value - DateTimeOffset.UtcNow, stoppingToken);
                                }
                            }
                        }
                    }
                    else
                    {
                        // needed for graceful shutdown for some reason.
                        // 1000ms so it doesn't affect calculating the next
                        // cron occurence (lowest possible: every second)
                        await Task.Delay(next.Value - DateTimeOffset.UtcNow, stoppingToken);
                    }
                }
            }
        }
    }

    public abstract class TimerScheduledService : IHostedService, IDisposable
    {
        private readonly Timer _timer;
        private readonly TimeSpan _period;
        protected readonly ILogger Logger;

        protected TimerScheduledService(TimeSpan period, ILogger logger)
        {
            Logger = logger;
            _period = period;
            _timer = new Timer(Execute, null, Timeout.Infinite, 0);
        }

        public void Execute(object state = null)
        {
            try
            {
                Logger.LogInformation("Begin execute service");
                ExecuteAsync().Wait();
            }
            catch (Exception ex)
            {
                Logger.LogError(ex, "Execute exception");
            }
            finally
            {
                Logger.LogInformation("Execute finished");
            }
        }

        protected abstract Task ExecuteAsync();

        public virtual void Dispose()
        {
            _timer?.Dispose();
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            Logger.LogInformation("Service is starting.");
            _timer.Change(TimeSpan.FromSeconds(SecurityHelper.Random.Next(10)), _period);
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            Logger.LogInformation("Service is stopping.");

            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }
    }
}
```

因为网站部署在多台机器上，所以为了防止并发执行，使用 redis 做了一些事情，Job执行的时候尝试获取 redis 中 job 对应的 master 的 hostname，没有的话就设置为当前机器的 hostname，在 job 停止的时候也就是应用停止的时候，删除 redis 中当前 job 对应的 master，job执行的时候判断是否是 master 节点，是 master 才执行job，不是 master 则不执行。完整实现代码：[https://github.com/WeihanLi/ActivityReservation/blob/dev/ActivityReservation.Helper/Services/CronScheduleServiceBase.cs#L11](https://github.com/WeihanLi/ActivityReservation/blob/dev/ActivityReservation.Helper/Services/CronScheduleServiceBase.cs#L11)

定时 Job 示例:

```C#
using System;
using System.Threading;
using System.Threading.Tasks;
using ActivityReservation.Database;
using ActivityReservation.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using WeihanLi.EntityFramework;

namespace ActivityReservation.Services
{
    public class RemoveOverdueReservationService : CronScheduleServiceBase
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly IConfiguration _configuration;

        public RemoveOverdueReservationService(ILogger<RemoveOverdueReservationService> logger,
            IServiceProvider serviceProvider, IConfiguration configuration) : base(logger)
        {
            _serviceProvider = serviceProvider;
            _configuration = configuration;
        }

        public override string CronExpression => _configuration.GetAppSetting("RemoveOverdueReservationCron") ?? "0 0 18 * * ?";

        protected override bool ConcurrentAllowed => false;

        protected override async Task ProcessAsync(CancellationToken cancellationToken)
        {
            Logger.LogInformation($"job executing");

            using (var scope = _serviceProvider.CreateScope())
            {
                var reservationRepo = scope.ServiceProvider.GetRequiredService<IEFRepository<ReservationDbContext, Reservation>>();
                await reservationRepo.DeleteAsync(reservation => reservation.ReservationStatus == 0 && (reservation.ReservationForDate < DateTime.Today.AddDays(-3)), cancellationToken);
            }
        }
    }
}
```

完整实现代码：[https://github.com/WeihanLi/ActivityReservation/blob/dev/ActivityReservation.Helper/Services/RemoveOverdueReservationService.cs](https://github.com/WeihanLi/ActivityReservation/blob/dev/ActivityReservation.Helper/Services/RemoveOverdueReservationService.cs)

### Memo

使用 redis 这种方式来决定 master 并不是特别可靠，正常结束的没有什么问题，最好还是用比较成熟的服务注册发现框架比较好

### Reference

- [http://crontab.org/](http://crontab.org/)
- [https://en.wikipedia.org/wiki/Cron](https://en.wikipedia.org/wiki/Cron)
- [http://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html](http://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html)
- [https://github.com/WeihanLi/ActivityReservation](http://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html)

## 发布

### IIS介绍

- IIS网站：一个网站，基本就是一个站点，绑定N个域名，绑定N个IP，然后设定一个应用程序池，基本就跑起来了，一个网站可以新建无数个应用程序和虚拟目录。
- 应用程序：application 是为一个 site 提供功能的基本单位。ApplicationHost.config文件在目录：\%windir%\system\inetsrv\config 目录下
- 虚拟目录：可以把一个目录，映射到网络上的任意共享目录。除了这种映射，你还可以映射到网络不同的硬盘，要知道IO的瓶颈，就是单块硬盘的极限，通过映射到不同的硬盘，性能的提升点就是：单块硬盘的极限 * N块硬盘。



## 问题总结

### 虚拟目录没有权限

解决方法：

![X](./Resource/9.png)

### 关于IIS的IUSER和IWAM帐户

IUSER是 Internet 来宾帐户匿名访问 Internet 信息服务的内置帐户

IWAM 是启动 IIS 进程帐户用于启动进程外的应用程序的 Internet 信息服务的内置帐户（在白吃点就是启动 Internet 信息服务的内置账户）。

IWAM 账号的名字会根据每台计算机NETBIOS名字的不同而有所不同，通用的格式是IWAM_MACHINE，即 "IWAM" 前缀、连接线 "_" 加上计算机的 NETBIOS 名字组成。我的计算机的 NETBIOS 名字是 MYSERVER，因此我的计算机上 IWAM 账号的名字就是 IWAM_MYSERVER，这一点与 IIS 匿名账号 ISUR_MACHINE 的命名方式非常相似。

只要装了iis服务就会有这两个帐户

- IUSR_computername是IIS匿名访问账号
- IWAM_computername是IIS匿名执行脚本的账号
