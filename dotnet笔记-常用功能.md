# 目录

1. 简介
2. 实战
3. 总结
   - [反编译](#反编译)
4. 练习

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

# ORM框架

## 目录

1. 简介
   - [什么是ORM](#什么是ORM)
   - [为什么用ORM](#为什么用ORM)
   - [三个核心原则](#三个核心原则)
   - [优/缺点](#优/缺点)
2. 主流ORM框架
   - [SqlSugar](#SqlSugar)
   - [Dos.ORM](#Dos.ORM)
   - [Chloe](#Chloe)
   - [StackExchange/Dapper](#StackExchange/Dapper)
   - [EntityFramework](#EntityFramework)
   - [NHibernate](#NHibernate)
   - [ServiceStack/ServiceStack.OrmLite](#ServiceStack/ServiceStack.OrmLite)
   - [linq2db](#linq2db)
   - [Massive](#Massive)
   - [PetaPoco](#PetaPoco)
   - [ibatis.net](#ibatis.net)

## 什么是ORM

ORM(Object-relational mapping)，中文翻译为对象关系映射，是一种为了解决面向对象与关系数据库存在的互不匹配的现象的技术。简单的说，ORM是通过使用描述对象和数据库之间映射的元数据，将程序中的对象自动持久化到关系数据库中。

## 为什么用ORM

在程序开发中，数据库保存的表，字段与程序中的实体类之间是没有关联的，在实现持久化时就比较不方便。那么，到底如何实现持久化呢？一种简单的方案是采用硬编码方式，为每一种可能的数据库访问操作提供单独的方法。这种方案存在以下不足：

1. 持久化层缺乏弹性。一旦出现业务需求的变更，就必须修改持久化层的接口
2. 持久化层同时与域模型与关系数据库模型绑定，不管域模型还是关系数据库模型发生变化，毒药修改持久化曾的相关程序代码，增加了软件的维护难度

ORM提供了实现持久化层的另一种模式，它采用映射元数据来描述对象关系的映射，使得ORM中间件能在任何一个应用的业务逻辑层和数据库层之间充当桥梁

## 三个核心原则

1. 简单：以最基本的形式建模数据
2. 传达性：数据库结构被任何人都能理解的语言文档化
3. 精确性：基于数据模型创建正确标准化了的结构

以C#编程语言为例，在传统的数据读取操作中，我们以Ado.net的方式对数据库进行CRUD操作，使用的基本都是SQL硬编码，比如有以下数据库查询操作：

```C#
String sql = "SELECT ... FROM persons WHERE id = 10";
DbCommand cmd = new DbCommand(connection, sql);
Result res = cmd.Execute();
String name = res[0]["FIRST_NAME"];
```

使用了ORM映射的C#实现的伪代码：

```C#
Person p = repository.GetPerson(10);
String name = p.getFirstName();
```

上面的示例代码表示我们可以从数据仓库repository中获取到一个实体对象，当然数据仓库中可能包含其他的方法，你也可以定义自己的ORM实现，比如：

```C#
Person p = Person.Get(10);
```

通常，在处理ORM映射和数据仓库时会暴露一些过滤或者查询方法，允许客户端对数据集进行进一步的筛选等操作，比如代码演示从数据库中查询ID=10的用户：

```C#
Person p = Person.Get(Person.Properties.Id == 10);
```

## 优/缺点

优点：

- 与传统的数据库访问技术相比，ORM有以下优点：
- 开发效率更高
- 数据访问更抽象、轻便
- 支持面向对象封装

缺点：

- 降低程序的执行效率
- 思维固定化
- 从系统结构上来看，采用ORM的系统一般都是多层系统，系统的层次多了，效率就会降低。ORM是一种完全的面向对象的做法，而面向对象的做法也会对性能产生一定的影响。

在我们开发系统时，一般都有性能问题。性能问题主要产生在算法不正确和与数据库不正确的使用上。ORM所生成的代码一般不太可能写出很高效的算法，在数据库应用上更有可能会被误用，主要体现在对持久对象的提取和和数据的加工处理上，如果用上了ORM，程序员很有可能将全部的数据提取到内存对象中，然后再进行过滤和加工处理，这样就容易产生性能问题。

**总结：**

作为一名编程人员，在ORM使用的观念上会有不同，具体取舍需根据具体的项目和场景

## SqlSugar
  
国内。可以运行在 `.NET 4.+` & `.NET CORE` 的高性能、轻量级 ORM 框架。开源、免费

## Dos.ORM

国内。Dos.ORM（原Hxj.Data）于2009年发布，2015年正式开源。在开发过程中参考了NBear与MySoft，吸取了他们的一些精华，加入新思想，同时参考EF的Lambda语法进行大量扩展。该组件已在数百个成熟项目中应用。开源、免费，使用方便，按照sql书写习惯编写C#.NET代码。功能强大。高性能，接近手写Sql。体积小（不到150kb，仅一个dll）。完美支持Sql Server(2000至最新版),MySql,Oracle,Access,Sqlite等数据库。支持大量Lambda表达式写法，国产ORM支持度最高，开源中国ORM排行前三。不需要像NHibernate的XML配置，不需要像EF的各种数据库连接驱动。遵循MIT开源协议，除不允许改名，其它随意定制修改

## Chloe

国内

## StackExchange/Dapper

国外

## EntityFramework

国外。微软以 `ADO.NET` 为基础所发展出来的对象关系对应 (O/R Mapping) 解决方案。

## NHibernate

国外。一个面向.NET环境的对象/关系数据库映射工具。开源、免费。批量写入，批量读/多重查询特性（我理解是在说Future？），批量的集合加载。带有lazy="extra"的集合，集合过滤器和分页集合。二级缓存（实际上NH的二级缓存貌似也很简单？）。集成和扩展性。代码自动生成，减少代码和sql的开发量，使开发人员摆脱开sql，ado.net和事务，缓存等底层

## ServiceStack/ServiceStack.OrmLite

- 国外。
- ServiceStack.OrmLite的目标是提供一种方便，无干扰，无配置的RDBMS无关类型的封装，与SQL保持高度的契合，展现直观的API，可以生成可预测的SQL。
- ServiceStack.OrmLite的宗旨：Fast, Simple, Typed ORM for .NET。开源、收费（免费版只支持单个库10张表）

## linq2db

国外。一款快速、轻量、类型安全的POCO对象和数据库映射的ORM框架。从架构上来说，linq2db像是对Dapper、PetaPoco这些微ORM的进一步封装，但它不像Entity Framework那样笨重。它没有实现状态跟踪，需要自己处理实体的状态更改等。

## Massive

国外。小巧，动态的微ORM框架。

## PetaPoco

国外。轻量的POCO对象和数据库映射的ORM框架。开源、免费

## ibatis.net

官方文档：`http://ibatis.apache.org/docs/`。总结：

1. parameterClass="hashtable" resultClass="hashtable" 可以灵活地应对不确定属性的情况。

   parameterClass中hashtable的key对应于占位符中的名称；  
   resultClass中hashtable的key对应于搜索出的列名，不过不能映射日期类型。
   <b style="color:green">解决方法</b>：使用数据库函数将日期类型转换为字符串

2. 占位符##会自动为字符串补上引号，$$不会。

   ##会自动转义特殊字符（如单引号'）；`$$`功能强大，可以替换掉整条SQL语句，为灵活拼接SQL语句提供了很大便利。

3. ibatis的对象关系映射文件可以有多个，但是不可以有相同的id，因为映射文件最终会统一处理。

4. ibatis中多线程问题

   ![x](./Resource/29.png)

   [按实体insert数据，批量insert，同时解决ON DUPLICATE KEY](http://blog.csdn.net/hddd2009/article/details/50152081)

5. insert 单条model（entity）动态xml如下：

   ```xml
   <!-- insert数据SQL -->  
   <insert id="cartype-insert"parameterClass="cartype">  
     insert into cartype (CarTypeId, CarTypeName) values (#CarTypeId#, #CarTypeName#);  
   </insert>  
   ```

   需要注意的是

   1. `<insert id="cartype-insert" parameterClass="cartype">`中cartype为实体对象名称
   2. values(#CarTypeId#,#CarTypeName#); 中的"#"之间的Key需要与实体（本例为cartype）的属性名称一致（大小写一致），也就是说如果insert时是全字段insert，那values中就是cartype类的所有属性名

   cartype类的定义如下：

   ```C#
   public partial class cartype  
   {  
       public int? CarTypeId { get; set; }  
       public string CarTypeName { get; set; }
   }
   ```

6. insert 多条即`List<cartype>`

   ```xml
   <!-- insertList<cartype>-->
   <insert id="cartype-insert_list" parameterClass="ArrayList">  
     insert into cartype(CarTypeId,CarTypeName) values  
     <iterate conjunction=",">  
       ( #[].CarTypeId#, #[].CarTypeName# )  
     </iterate>  
   </insert>  
   ```

   需要注意以下几点：

   1. `<insert id="cartype-insert_list" parameterClass="ArrayList">`这一行中的parameterClass为ArrayList
   2. `#[].CarTypeId#中"[]"`表示的是批量插入时每次循环时的对象，就像foreach(var item in listCartype)中的item，CarTypeId是cartype对象的一个属性名称

7. 批量插入数据时ON DUPLICATE KEY问题解决

   cartype表中 synid为主键，如果有主键冲突则更新Update_time的值

   ```xml
   <insert id="cartype-insert_upload_list" parameterClass="ArrayList">  
     insert intocartype(CarTypeId, CarTypeName, Update_time,) values  
     <iterate conjunction=",">  
       (#[].CarTypeId#, #[].CarTypeName#, #[].Update_time# )  
     </iterate>  
     ON DUPLICATE KEY UPDATE update_time=values(Update_time)  
   </insert>  
   ```

   注意：执行批量insert时 要使用values函数，才可以解决主键冲突问题

   例如：cartype表中有两条数据

   ```sql
   synid=1,updatetime='2015-12-02 01:00:00'
   synid=2,updatetime='2015-12-02 02:00:00'
   ```

   执行如下sql时：

   ```sql
   insert into cartype(SynID,Update_time) values
     (3,'2015-12-02 03:00:00'),
     (2,'2015-12-02 22:22:22')
   ON DUPLICATEKEY UPDATE
   update_time=values(Update_time)
   ```

   执行结束后数据库里有三条数据

   ```sql
   synid=1,updatetime='2015-12-02 01:00:00'
   synid=2,updatetime='2015-12-02 22:22:22'
   synid=3,updatetime='2015-12-02 03:00:00'
   ```

   synid=3的数据直接insert了，而synid=2的数据因为数据库中已经有synid=2的数据，所有没有执行insert而是更新为：updatetime='2015-12-02 22:22:22'

8. C#后台代码调用方法主要代码如下：

   ```C#
   MySqlDao<List<cartype>> md =new MySqlDao<List<cartype>>();  
   md.ExecuteInsert(cartype, "cartype-insert_list");  

   public void ExecuteInsert(T obj, string stmtId)  
   {
       if (obj == null)  
       {  
           throw new ArgumentNullException("obj");  
       }  
       Instance().Insert(stmtId, obj);  
   }
   ```

# Ioc

## 目录

1. [简介](#简介)
   - [设计模式](#设计模式)
   - [实现初探](#实现初探)
   - [优缺点](#优缺点)
2. [主流框架](#主流框架)
   - [Unity](#Unity)
   - [Autofac](#Autofac)
   - [Ninject](#Ninject)
   - [.NetCore自带](#.NetCore自带)

## 简介

- 控制反转一般分为两种类型，依赖注入（Dependency Injection，简称DI）和依赖查找（Dependency Lookup）。依赖注入应用比较广泛。

### 设计模式

- Interface Driven Design接口驱动，接口驱动有很多好处，可以提供不同灵活的子类实现，增加代码稳定和健壮性等等，但是接口一定是需要实现的，也就是如下语句迟早要执行：AInterface a = new AInterfaceImp(); 这样一来，耦合关系就产生了。

  ```C#
  classA
  {
    AInterface a;
    A(){}
    AMethod()//一个方法
    {
        a = new AInterfaceImp();
    }
  }
  ```

  ClassA 与 AInterfaceImp 就是依赖关系，如果想使用AInterface的另外一个实现就需要更改代码了。当然我们可以建立一个Factory来根据条件生成想要的AInterface的具体实现，即：

  ```C#
  InterfaceImplFactory
  {
   AInterface create(Object condition)
   {
      if(condition = condA)
      {
          return new AInterfaceImpA();
      }
      else if(condition = condB)
      {
          return new AInterfaceImpB();
      }
      else
      {
          return new AInterfaceImp();
      }
    }
  }
  ```

  表面上是在一定程度上缓解了以上问题，但实质上这种代码耦合并没有改变。通过IoC模式可以彻底解决这种耦合，它把耦合从代码中移出去，放到统一的XML文件中，通过一个容器在需要的时候把这个依赖关系形成，即把需要的接口实现注入到需要它的类中，这可能就是“依赖注入”说法的来源了。

  IoC模式，系统中通过引入实现了IoC模式的IoC容器，即可由IoC容器来管理对象的生命周期、依赖关系等，从而使得应用程序的配置和依赖性规范与实际的应用程序代码分开。其中一个特点就是通过文本的配置文件进行应用程序组件间相互关系的配置，而不用重新修改并编译具体的代码。

  当前比较知名的IoC(JAVA)容器有：Pico Container、Avalon 、Spring、JBoss、HiveMind、EJB等。

  在上面的几个IoC容器中，轻量级的有Pico Container、Avalon、Spring、HiveMind等，超重量级的有EJB，而半轻半重的有容器有JBoss，Jdon等。

  可以把IoC模式看做是工厂模式的升华，可以把IoC看作是一个大工厂，只不过这个大工厂里要生成的对象都是在XML文件中给出定义的，然后利用Java 的“反射”编程，根据XML中给出的类名生成相应的对象。
  
  从实现来看，IoC是把以前在工厂方法里写死的对象生成代码，改变为由XML文件来定义，也就是把工厂和对象生成这两者独立分隔开来，目的就是提高灵活性和可维护性。

  IoC中最基本的Java技术就是“反射”编程。反射又是一个生涩的名词，通俗的说反射就是根据给出的类名（字符串）来生成对象。这种编程方式可以让对象在生成时才决定要生成哪一种对象。反射的应用是很广泛的，像Hibernate、Spring中都是用“反射”做为最基本的技术手段。

  在过去，反射编程方式相对于正常的对象生成方式要慢10几倍，这也许也是当时为什么反射技术没有普遍应用开来的原因。但经SUN改良优化后，反射方式生成对象和通常对象生成方式，速度已经相差不大了（但依然有一倍以上的差距）。

### 优缺点

- IoC最大的好处是什么？因为把对象生成放在了XML里定义，所以当我们需要换一个实现子类将会变成很简单（一般这样的对象都是实现于某种接口的），只要修改XML就可以了，这样我们甚至可以实现对象的热插拔（有点像USB接口和SCSI硬盘了）。

  IoC最大的缺点是什么？
  
  （1）生成一个对象的步骤变复杂了（事实上操作上还是挺简单的），对于不习惯这种方式的人，会觉得有些别扭和不直观。
  
  （2）对象生成因为是使用反射编程，在效率上有些损耗。但相对于IoC提高的维护性和灵活性来说，这点损耗是微不足道的，除非某对象的生成对效率要求特别高。
  
  （3）缺少IDE重构操作的支持，如果在Eclipse要对类改名，那么你还需要去XML文件里手工去改了，这似乎是所有XML方式的缺憾所在。

### 实现初探

- IOC关注服务（或应用程序部件）是如何定义的以及他们应该如何定位他们依赖的其它服务。通常，通过一个容器或定位框架来获得定义和定位的分离，容器或定位框架负责：

  保存可用服务的集合

  提供一种方式将各种部件与它们依赖的服务绑定在一起

  为应用程序代码提供一种方式来请求已配置的对象（例如，一个所有依赖都满足的对象），这种方式可以确保该对象需要的所有相关的服务都可用。

#### 类型

- 现有的框架实际上使用以下三种基本技术的框架执行服务和部件间的绑定：

  类型1（基于接口）：可服务的对象需要实现一个专门的接口，该接口提供了一个对象，可以重用这个对象查找依赖（其它服务）。早期的容器Excalibur使用这种模式。

  类型2（基于setter）：通过JavaBean的属性（setter方法）为可服务对象指定服务。HiveMind和Spring采用这种方式。

  类型3（基于构造函数）：通过构造函数的参数为可服务对象指定服务。PicoContainer只使用这种方式。HiveMind和Spring也使用这种方式。

#### 实现策略

- IoC是一个很大的概念，可以用不同的方式实现。其主要形式有两种：

  依赖查找：容器提供回调接口和上下文条件给组件。EJB和Apache Avalon 都使用这种方式。这样一来，组件就必须使用容器提供的API来查找资源和协作对象，仅有的控制反转只体现在那些回调方法上（也就是上面所说的类型1）：容器将调用这些回调方法，从而让应用代码获得相关资源。
  
  依赖注入：组件不做定位查询，只提供普通的Java方法让容器去决定依赖关系。容器全权负责组件的装配，它会把符合依赖关系的对象通过JavaBean属性或者构造函数传递给需要的对象。通过JavaBean属性注射依赖关系的做法称为设值方法注入(Setter Injection)；将依赖关系作为构造函数参数传入的做法称为构造器注入(Constructor Injection)

#### 如何实现对现有应用的依赖注入

- 实现数据访问层

  数据访问层有两个目标。第一是将数据库引擎从应用中抽象出来，这样就可以随时改变数据库—比方说，从微软SQL变成Oracle。不过在实践上很少会这么做，也没有足够的理由未来使用实现数据访问层而进行重构现有应用的努力。

  第二个目标是将数据模型从数据库实现中抽象出来。这使得数据库或代码开源根据需要改变，同时只会影响主应用的一小部分——数据访问层。这一目标是值得的，为了在现有系统中实现它进行必要的重构。

  增加DAL的一个额外的好处是增强了单元测试能力。没有DAL，测试就必须利用数据库的真实数据。这意味着支持不同场景的数据必须在测试数据库中创建，而这个数据库必须维持一种恒定的状态。这很难做且容易引起错误。而有了DAL，就可以创建必要的任何类型的数据库数据来测试不同场景，以这种方式来写测试。它还可以让你在没有数据库或数据库因查询崩溃期间测试发生了什么事情。如果是用真实数据库来做，要想根据需要复制这些边界情况几乎是不可能的。

- 模块与接口重构

  依赖注入背后的一个核心思想是单一功能原则(single responsibility principle)。该原则指出，每一个对象应该有一个特定的目的，而应用需要利用这一目的的不同部分应当使用合适的对象。这意味着这些对象在系统的任何地方都可以重用。但在现有系统里面很多时候都不是这样的。因此，引入DI的第一步就是对应用进行重构，以便用针对特定目的使用专门的类或模块。

  DI的实现机制需要使用匹配被用的不同模块的发布方法和属性的接口。当把功能性重构进模块时，应用也应该进行重构以便利用这些接口而不是具体的类。
  
  要注意的是，这一重构应该影响应用的逻辑流。这是移动代码的实践，不是改变它的工作方式。为了确保不会引入缺陷，需要遵循质保(QA)流程。然而，做法得当的话，产生bug的机会是很小的。
  
- 随时增加单元测试

  把功能封装到整个对象里面会导致自动测试困难或者不可能。将模块和接口与特定对象隔离，以这种方式重构可以执行更先进的单元测试。按照后面再增加测试的想法继续重构模块是诱惑力的，但这是错误的。

  引入新的缺陷永远是重构代码的一大担忧。尽快建立单元测试可以处置这个风险，但是还存在着一个很少会被考虑到的项目管理风险。马上增加单元测试可以检测出遗留代码原有未被发现的缺陷。我要指出的是，如果当前系统已经运行了一段时间的话，那么这些就不应该被视为缺陷，而是“未记录的功能”。此时你必须决定这些问题是否需要处置，还是放任不管。

- 使用服务定位器而不是构造注入

  实现控制反转不止一种方法。最常见的办法是使用构造注入，这需要在对象首次被创建是提供所有的软件依赖。然而，构造注入要假设整个系统都使用这一模式，这意味着整个系统必须同时进行重构。这很困难、有风险，且耗时。

  构造注入有一个替代方法，就是服务定位器。这种模式可以慢慢实现，即每次在方便的时候只对应用的一部分进行重构。对现有系统的慢慢适配要比大规模转换的努力更好。因此，在让现有系统适配DI时，服务定位是最佳使用模式。
  
  有人批评服务定位器模式，说它取代了依赖而不是消除了紧耦合。如果是从头开始开发应用的话，我同意这种说法，但是如果是对现有系统进行升级，过渡期间使用服务定位器是有价值的。当整个系统已经适配了服务定位器之后，再把它转化为构造注入就是一个可有可无的步骤了。

## 主流框架

- 控制反转（IoC/Inverse Of Control）：调用者不再创建被调用者的实例，由IOC框架实现（容器创建）所以称为控制反转。

  依赖注入（DI/Dependence injection）：容器创建好实例后再注入调用者称为依赖注入。

  有很多人把控制反转和依赖注入混为一谈，虽然在某种意义上来看他们是一体的，但好像又有些不同。
  
  控制反转(Ioc)可以看成自来水厂，那自来水厂的运行就可以看作依赖注入(DI)，Ioc是一个控制容器，DI就是这个容器的运行机制，有点像国家主席和总理的意思。

  关于Ioc的框架有很多，比如astle Windsor、Unity、`Spring.NET`、StructureMap。

- Castle Windsor：Castle Windsor 是一个用于 .NET 和 Silverlight的成熟的控制反转（IoC） 容器。[官网](https://github.com/castleproject/Windsor)
  
- Unity：轻量级、可扩展的依赖注入容器，支持构造函数、属性和方法调用注入。[官网](https://unity.codeplex.com/)

- Autofac：令人着迷的 .NET IoC 容器。[官网](https://github.com/autofac/Autofac)

  生命周期选项：
  1. InstancePerDependency：对每一个依赖或每一次调用创建一个新的唯一的实例。这也是默认的创建实例的方式。
  2. InstancePerLifetimeScope：在一个生命周期域中，每一个依赖或调用创建一个单一的共享的实例，且每一个不同的生命周期域，实例是唯一的，不共享的。
  3. InstancePerMatchingLifetimeScope：在一个做标识的生命周期域中，每一个依赖或调用创建一个单一的共享的实例。打了标识了的生命周期域中的子标识域中可以共享父级域中的实例。若在整个继承层次中没有找到打标识的生命周期域，则会抛出异常：DependencyResolutionException。
  4. InstancePerOwned：在一个生命周期域中所拥有的实例创建的生命周期中，每一个依赖组件或调用Resolve()方法创建一个单一的共享的实例，并且子生命周期域共享父生命周期域中的实例。若在继承层级中没有发现合适的拥有子实例的生命周期域，则抛出异常：DependencyResolutionException。
  5. SingleInstance：每一次依赖组件或调用Resolve()方法都会得到一个相同的共享的实例。其实就是单例模式。
  6. InstancePerHttpRequest：在一次Http请求上下文中，共享一个组件实例。仅适用于`asp.net mvc`开发。

- Ninject：.net 依赖注入的忍者。[官网](https://github.com/ninject/ninject)

- StructureMap：.Net 最早的 IoC/ID 容器。[官网](https://structuremap.github.io/)

- `Spring.Net`：`Spring.NET` 是一个开源应用程序框架，可以便捷地创建企业级 .NET 应用。[官网](https://github.com/spring-projects/spring-net)

- LightInject：一个超轻量级 IoC 容器。[官网](https://github.com/seesharper/LightInject)

- TinyIoC：单文件、简单、跨平台的 IoC 容器。[官网](https://github.com/grumpydev/TinyIoC)

  总结：从测试中，可以看出`Autofac`和`StructureMap`在性能上面还是体现出比较大的优势，`Ninject`可以说性能上较低。而`Spring.NET`不仅仅专注于`IOC`方面，它还专注于其他方方面面的功能，所以在`IOC`方面的性能不是太高。另外，微软的`Unity`中规中矩，性能较为稳定，也是一个不错的选择。

### Unity

- 先以微软提供的Unity做示例，可以使用Nuget添加Unity，也可以引用Microsoft.Practices.Unity.dll和Microsoft.Practices.Unity.Configuration.dll。

  在MVC中，控制器依赖于模型对数据进行处理，也可以说执行业务逻辑。我们可以使用依赖注入(DI)在控制层分离模型层，这边要用到Repository模式，在领域驱动设计(DDD)中，Repository翻译为仓储，顾名思义，就是储存东西的仓库，可以理解为一种用来封装存储，读取和查找行为的机制，它模拟了一个对象集合。使用依赖注入(DI)就是对Repository进行管理，用于解决它与控制器之间耦合度问题，下面我们做一个简单示例。

- 安装

  首先我们需要新建一个MVC项目，选择工具-库程序包管理器-程序包管理控制台，输入"Install-Package Unity.Mvc4"命令。

  或者通过工具-库程序包管理器-管理解决方案的 NuGet 程序包，通过联机搜索"Unity.Mvc4"进行安装。

  安装Unity成功后，我们发现项目中多了"Microsoft.Practices.Unity"和"Microsoft.Practices.Unity.Configuration"两个引用，还有一个Bootstrapper类文件，Bootstrapper翻译为引导程序，也就是Ioc容器。

  ```C#
  public static class Bootstrapper
  {
    public static IUnityContainer Initialise()
    {
        var container = BuildUnityContainer();
        DependencyResolver.SetResolver(new UnityDependencyResolver(container));
        return container;
    }

    private static IUnityContainer BuildUnityContainer()
    {
        var container = new UnityContainer();
        // register all your components with the container here
        // it is NOT necessary to register your controllers
        RegisterTypes(container);
        return container;
    }

    public static void RegisterTypes(IUnityContainer container)
    {
        // e.g.
        container.RegisterType<ITestService, TestService>();
    }
  }
  ```

  添加服务层
  
  首先我们添加一个Article实体类：

  ```C#
  /// <summary>
  /// Article实体类
  /// </summary>
  public class Article
  {
    public int Id { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }
    public string Content { get; set; }
    public DateTime CreateTime { get; set; }
  }
  ```

  一般Repository都有一些相似的操作，比如增删改查，我们可以把它抽象为IArticleRepository接口，这样控制器依赖于抽象接口，而不依赖于具体实现Repository类，符合依赖倒置原则，我们才可以使用Unity进行依赖注入。

  ```C#
  /// <summary>
  /// IArticleRepository接口
  /// </summary>
  public interface IArticleRepository
  {
    IEnumerable<Article> GetAll();
  }
  ```

  创建ArticleRepository，依赖于IArticleRepository接口，实现基本操作。

  ```C#
  public class ArticleRepository : IArticleRepository
  {
    private List<Article> Articles = new List<Article>();

    public ArticleRepository()
    {
        // 添加演示数据
        Add(new Article { Id = 1, Title = "UnityMVCDemo1", Content = "UnityMVCDemo", Author = "xishuai", CreateTime = DateTime.Now });
        Add(new Article { Id = 2, Title = "UnityMVCDemo2", Content = "UnityMVCDemo", Author = "xishuai", CreateTime = DateTime.Now });
        Add(new Article { Id = 3, Title = "UnityMVCDemo2", Content = "UnityMVCDemo", Author = "xishuai", CreateTime = DateTime.Now });
    }

    /// <summary>
    /// 获取全部文章
    /// </summary>
    /// <returns></returns>
    public IEnumerable GetAll()
    {
        return Articles;
    }
  }
  ```

  IArticleRepository类型映射

  上面工作做好后，我们需要在Bootstrapper中的BuildUnityContainer方法添加此类型映射。

  ```C#
  private static IUnityContainer BuildUnityContainer()
  {
    var container = new UnityContainer();
    // register all your components with the container here
    // it is NOT necessary to register your controllers
    container.RegisterType<IArticleRepository, ArticleRepository>();
    RegisterTypes(container);
    return container;
  }
  ```

  我们还可以在配置文件中添加类型映射，UnityContainer根据配置信息，自动注册相关类型，这样我们就只要改配置文件了，推荐配置文件方法：

  ```xml
  <configSections>
    <section name="unity" type="Microsoft.Practices.Unity.Configuration.UnityConfigurationSection,Microsoft.Practices.Unity.Configuration" />
  </configSections>
  <unity>
    <containers>
        <container name="defaultContainer">
            <register type="UnityMVCDemo.Models.IArticleRepository, UnityMVCDemo"
            mapTo="UnityMVCDemo.Models.ArticleRepository, UnityMVCDemo"/>
        </container>
    </containers>
  </unity>
  ```

  注意configSections是configuration节点下的第一个节点，关于Unity的配置文件配置参照`http://www.cnblogs.com/xishuai/p/3670292.html`，加载配置文件代码：

  ```C#
  UnityConfigurationSection configuration = (UnityConfigurationSection)ConfigurationManager.GetSection(UnityConfigurationSection.SectionName);
  configuration.Configure(container, "defaultContainer");
  ```

  上面这段代码替换掉上面使用的RegisterType方法。

  服务注入到控制器

  在ArticleController中我们使用是构造器注入方式，当然还有属性注入和方法注入，可以看到ArticleController依赖于抽象IArticleRepository接口，而并不是依赖于ArticleRepository具体实现类。

  ```C#
  public class ArticleController : Controller
  {
    readonly IArticleRepository repository;
    // 构造器注入
    public ArticleController(IArticleRepository repository)
    {
        this.repository = repository;
    }

    public ActionResult Index()
    {
        var data = repository.GetAll();
        return View(data);
    }
  }
  ```

  构造器注入（Constructor Injection）：IoC容器会智能地选择选择和调用适合的构造函数以创建依赖的对象。如果被选择的构造函数具有相应的参数，IoC容器在调用构造函数之前解析注册的依赖关系并自行获得相应参数对象。

  Global.asax中初始化

  做完上面的工作后，我们需要在Global.asax中的Application_Start方法添加依赖注入初始化。

  ```C#
  // Note: For instructions on enabling IIS6 or IIS7 classic mode, visit http://go.microsoft.com/?LinkId=9394801
  public class MvcApplication : System.Web.HttpApplication
  {
    protected void Application_Start()
    {
        AreaRegistration.RegisterAllAreas();
        WebApiConfig.Register(GlobalConfiguration.Configuration);
        FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
        RouteConfig.RegisterRoutes(RouteTable.Routes);
        Bootstrapper.Initialise();
    }
  }
  ```

  如果在控制台应用程序中，我们还需要获取调用者的对象，下面是代码片段

  ```C#
  static void Main(string[] args)
  {
    UnityContainer container = new UnityContainer();//创建容器
    container.RegisterType<IWaterTool, PressWater>();//注册依赖对象
    IPeople people = container.Resolve<VillagePeople>();//返回调用者
    people.DrinkWater();//喝水
  }
  ```

  我们可以看到RegisterType的第一个参数是this IUnityContainer container，我们上面调用的时候并没有传递一个IUnityContainer 类型的参数，为什么这里会有一个this关键字，做什么用？其实这就是扩展方法。这个扩展方法在静态类中声明，定义一个静态方法（UnityContainerExtensions类和RegisterType都是静态的），其中第一个参数定义为它的扩展类型。
  
  RegisterType方法扩展了UnityContainerExtensions类，因为它的第一个参数定义了IUnityContainer（UnityContainerExtensions的抽象接口）类型，为了区分扩展方法和一般的静态方法，扩展方法还需要给第一个参数使用this关键字。

  还有就是RegisterType的泛型约束 where TTo : TFrom; TTo必须是TFrom的派生类，就是说TTo依赖于TFrom。

  我们再来看下Resolve泛型方法的签名：

  ```C#
  //
  // 摘要:
  //     Resolve an instance of the default requested type from the container.
  // 参数:
  //   container:
  //     Container to resolve from.
  //   overrides:
  //     Any overrides for the resolve call.
  // 类型参数:
  //   T:
  //     System.Type of object to get from the container.
  // 返回结果:
  //     The retrieved object.
  public static T Resolve<T>(this IUnityContainer container, params ResolverOverride[] overrides);
  ```

  "Resolve an instance of the default requested type from the container"，这句话可以翻译为：解决从容器的默认请求的类型的实例，就是获取调用者的对象。

  关于RegisterType和Resolve我们可以用自来水厂的例子来说明，请看下面：
  
  - RegisterType：可以看做是自来水厂决定用什么作为水源，可以是水库或是地下水，我只要“注册”开关一下就行了。
  - Resolve：可以看做是自来水厂要输送水的对象，可以是农村或是城市，我只要“控制”输出就行了。

  Dependency属性注入

  属性注入（Property Injection）：如果需要使用到被依赖对象的某个属性，在被依赖对象被创建之后，IoC容器会自动初始化该属性。属性注入只需要在属性字段前面加[Dependency]标记就行了，如下：

  ```C#
  /// <summary>
  /// 村民
  /// </summary>
  public class VillagePeople : IPeople
  {
    [Dependency]
    public IWaterTool _pw { get; set; }

    public void DrinkWater()
    {
        Console.WriteLine(_pw.returnWater());
    }
  }
  ```

  调用方式和构造器注入一样。

  InjectionMethod方法注入

  方法注入（Method Injection）：如果被依赖对象需要调用某个方法进行相应的初始化，在该对象创建之后，IoC容器会自动调用该方法。

  方法注入和属性方式使用一样，方法注入只需要在方法前加[InjectionMethod]标记就行了，从方法注入的定义上看，只是模糊的说对某个方法注入，并没有说明这个方法所依赖的对象注入，不言而喻，其实我们理解的方法注入就是对参数对象的注入，从typeConfig节点-method节点-param节点就可以看出来只有参数的配置，而并没有其他的配置。

  标识键

  在Unity中，标识主要有两种方式， 一种是直接使用接口（或者基类）作为标识键，另一种是使用接口（或者基类）与名称的组合作为标识键，键对应的值就是具体类。

  第一种使用接口（或者基类）作为标识键：

  ```C#
  container.RegisterType<IWaterTool, PressWater>();
  ```

  代码中的IWaterTool就是作为标识键，你可以可以使用基类或是抽象类作为标示，获取注册对象：

  ```C#
  container.Resolve<IWaterTool>();
  ```

  如果一个Ioc容器容器里面注册了多个接口或是基类标示，我们再这样获取就不知道注册的是哪一个？怎么解决，就是用接口或是基类与名称作为标识键，示例代码如下：

  ```C#
  public static void FuTest05()
  {
    UnityContainer container = new UnityContainer();//创建容器
    // 注册依赖对象WaterTool1
    container.RegisterType<IWaterTool, PressWater>("WaterTool1");
    // 注册依赖对象WaterTool2
    container.RegisterType<IWaterTool, PressWater>("WaterTool2");
    // 返回依赖对象WaterTool1
    IWaterTool wt = container.Resolve<IWaterTool>("WaterTool1");
    var list = container.ResolveAll<IWaterTool>();//返回所有注册类型为IWaterTool的对象
  }
  ```

  自定义Unity对象生命周期管理集成ADO.NET Entity Framework

  在Unity中，从Unity 取得的实例为 Transient。如果你希望使用多线程方式，就需要在组成时使用lifecycle参数，这时候取出的组件就不再是同一个了。在Unity IOC中，它支持我们对于组件的实例进行控制，也就是说我们可以透明的管理一个组件拥有多少个实例。Unity IOC容器提供了如下几种生命处理方式：

  Singleton：一个组件只有一个实例被创建，所有请求的客户使用程序得到的都是同一个实例。

  Transient：这种处理方式与我们平时使用new的效果是一样的，对于每次的请求得到的都是一个新的实例。

  Custom：自定义的生命处理方式。

  我要增加一个Request，一个Request请求一个实例，然后在Request结束的时候，回收资源。增加一个Resquest级别的LifetimeManager，HttpContext.Items中数据是Request期间共享数据用的，所以HttpContext.Items中放一个字典，用类型为key，类型的实例为value。如果当前Context.Items中有类型的实例，就直接返回实例。ObjectContext本身是有缓存的，整个Request内都是一个ObjectContext，ObjectContext一级缓存能力进一步利用。

  用在Unity中，如何获取对象的实例及如何销毁对象都是由LifetimeManager完成的，其定义如下

  ```C#
  public abstract class LifetimeManager : ILifetimePolicy, IBuilderPolicy
  {
    protected LifetimeManager();

    public abstract object GetValue();
    public abstract void RemoveValue();
    public abstract void SetValue(object newValue);
  }
  ```

  其中GetValue方法获取对象实例，RemoveValue方法销毁对象，SetValue方法为对外引用的保存提供新的实例。

  有了这3个方法，就可以通过自定义LifetimeManager来实现从HttpContext中取值。

  下面我们来实现Unity集成ADO.NET Entity Framework的工作：`http://www.cnblogs.com/shanyou/archive/2008/08/24/1275059.html`(Continue…)

  为了实现单例模式，我们通常的做法是，在类中定义一个方法如GetInstance，判断如果实例为null则新建一个实例，否则就返回已有实例。但是这种做法将对象的生命周期管理与类本身耦合在了一起。所以遇到需要使用单例的地方，应该将生命周期管理的职责转移到对象容器Ioc上，而我们的类依然是一个干净的类，使用Unity创建单例代码：

  ```C#
  public static void FuTest07()
  {
    UnityContainer container = new UnityContainer();//创建容器
    container.RegisterType<IWaterTool, PressWater>(
      new ContainerControlledLifetimeManager());//注册依赖对象
    IPeople people = container.Resolve<VillagePeople>();//返回调用者
    people.DrinkWater();//喝水
  }
  ```
  
  上面演示了将IWaterTool注册为PressWater，并声明为单例，ContainerControlledLifetimeManager字面意思上就是Ioc容器管理声明周期，我们也可以不使用类型映射，将某个类注册为单例：

  ```C#
  container.RegisterType<PressWater>(
    new ContainerControlledLifetimeManager());
  ```

  除了将类型注册为单例，我们也可以将已有对象注册为单例，使用RegisterInstance方法，示例代码：

  ```C#
  PressWater pw = new PressWater();
  container.RegisterInstance<IWaterTool>(pw);
  ```
  
  上面的代码就表示将PressWater的pw对象注册到Ioc容器中，并声明为单例。

  如果我们在注册类型的时候没有指定ContainerControlledLifetimeManager对象，Resolve获取的对象的生命周期是短暂的，Ioc容器并不会保存获取对象的引用，就是说我们再次Resolve获取对象的时候，获取的是一个全新的对象，如果我们指定ContainerControlledLifetimeManager，类型注册后，我们再次Resolve获取的对象就是上次创建的对象，而不是再重新创建对象，这也就是单例的意思。

  Unity的app.config节点配置

  上面所说的三种注入方式，包括单例创建都是在代码中去配置的，当然只是演示用，这种配置都会产生耦合度，比如添加一个属性注入或是方法注入都要去属性或是方法前加[Dependency]和[InjectionMethod]标记，我们想要的依赖注入应该是去配置文件中配置，当系统发生变化，我们不应去修改代码，而是在配置文件中修改，这才是真正使用依赖注入解决耦合度所达到的效果

### Autofac

- Autofac是一款IOC框架，比较于其他的IOC框架，它很轻量级，性能上非常高。

  [官方网站](http://autofac.org/)

  [源码下载地址](https://github.com/autofac/Autofac)

#### 基本

- 方法1：

  ```C#
  var builder = new ContainerBuilder();
  builder.RegisterType<TestService>();
  builder.RegisterType<TestDao>().As<ITestDao>();
  return builder.Build();
  ```

  为了统一管理 IoC 相关的代码，并避免在底层类库中到处引用 Autofac 这个第三方组件，定义了一个专门用于管理需要依赖注入的接口与实现类的空接口 IDependency：

  ```C#
  /// <summary>
  /// 依赖注入接口，表示该接口的实现类将自动注册到IoC容器中
  /// </summary>
  public interface IDependency
  {

  }
  ```

  这个接口没有任何方法，不会对系统的业务逻辑造成污染，所有需要进行依赖注入的接口，都要继承这个空接口，例如：

  业务单元操作接口：

  ```C#
  /// <summary>
  /// 业务单元操作接口
  /// </summary>
  public interface IUnitOfWork : IDependency
  {
      ...
  }
  ```

  Autofac 是支持批量子类注册的，有了 IDependency 这个基接口，我们只需要 Global 中很简单的几行代码，就可以完成整个系统的依赖注入匹配：

  ```C#
  ContainerBuilder builder = new ContainerBuilder();
  builder.RegisterGeneric(typeof(Repository<,>)).As(typeof(IRepository<,>));
  Type baseType = typeof(IDependency);
  // 获取所有相关类库的程序集
  Assembly[] assemblies = ...
  // InstancePerLifetimeScope 保证对象生命周期基于请求
  builder.RegisterAssemblyTypes(assemblies)
      .Where(type => baseType.IsAssignableFrom(type) && !type.IsAbstract)
      .AsImplementedInterfaces().InstancePerLifetimeScope();
  IContainer container = builder.Build();
  DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
  ```

  如此，只有站点主类库需要引用 Autofac，而不是到处都存在着注入的相关代码，大大降低了系统的复杂度。

  实例

1. InstancePerDependency

   对每一个依赖或每一次调用创建一个新的唯一的实例。这也是默认的创建实例的方式。官方文档解释：

   Configure the component so that every dependent component or call to Resolve() gets a new, unique instance (default.)

2. InstancePerLifetimeScope

   在一个生命周期域中，每一个依赖或调用创建一个单一的共享的实例，且每一个不同的生命周期域，实例是唯一的，不共享的。官方文档解释：

   Configure the component so that every dependent component or call to Resolve() within a single ILifetimeScope gets the same, shared instance. Dependent components in different lifetime scopes will get different instances.

3. InstancePerMatchingLifetimeScope

   在一个做标识的生命周期域中，每一个依赖或调用创建一个单一的共享的实例。打了标识了的生命周期域中的子标识域中可以共享父级域中的实例。若在整个继承层次中没有找到打标识的生命周期域，则会抛出异常：DependencyResolutionException。官方文档解释：

   Configure the component so that every dependent component or call to Resolve() within a ILifetimeScope tagged with any of the provided tags value gets the same, shared instance. Dependent components in lifetime scopes that are children of the tagged scope will share the parent's instance. If no appropriately tagged scope can be found in the hierarchy an DependencyResolutionException is thrown.

4. InstancePerOwned

   在一个生命周期域中所拥有的实例创建的生命周期中，每一个依赖组件或调用Resolve()方法创建一个单一的共享的实例，并且子生命周期域共享父生命周期域中的实例。若在继承层级中没有发现合适的拥有子实例的生命周期域，则抛出异常：DependencyResolutionException。官方文档解释：

   Configure the component so that every dependent component or call to Resolve() within a ILifetimeScope created by an owned instance gets the same, shared instance. Dependent components in lifetime scopes that are children of the owned instance scope will share the parent's instance. If no appropriate owned instance scope can be found in the hierarchy an DependencyResolutionException is thrown.

5. SingleInstance

   每一次依赖组件或调用Resolve()方法都会得到一个相同的共享的实例。其实就是单例模式。官方文档解释：

   Configure the component so that every dependent component or call to Resolve() gets the same, shared instance.

6. InstancePerHttpRequest

   在一次Http请求上下文中，共享一个组件实例。仅适用于asp.net mvc开发。毫无疑问，微软最青睐的IoC容器不是spring.net、unity而是Autofac，因为他的高效，因为他的简洁，所以微软主导的orchard项目用的也是它，下面用一个简单的实例来说明一个Autofac的用法，主要使用Autofac.dll，Autofac.Configuration.dll。

   ```C#
   /// <summary>
   /// DB Operate Interface
   /// </summary>
   public interface IRepository
   {
       void Get();
   }

   /// <summary>
   /// 对SQL数据源操作
   /// </summary>
   public class SqlRepository : IRepository
   {
       #region IRepository 成员
       public void Get()
       {
           Console.WriteLine("sql数据源");
       }
       #endregion
   }

   /// <summary>
   /// 对redis数据源操作
   /// </summary>
   public class RedisRepository : IRepository
   {
       #region IRepository 成员
       public void Get()
       {
           Console.WriteLine("Redis数据源");
       }
       #endregion
   }

   /// <summary>
   /// 数据源基类
   /// </summary>
   public class DBBase
   {
       public DBBase(IRepository iRepository)
       {
           _iRepository = iRepository;
       }
       public IRepository _iRepository;
       public void Search(string commandText)
       {
           _iRepository.Get();
       }
   }
   ```

   现在去调用它吧：

   ```C#
   // 直接指定实例类型
   var builder = new ContainerBuilder();
   builder.RegisterType<DBBase>();
   builder.RegisterType<SqlRepository>().As<IRepository>();
   using (var container = builder.Build())
   {
       var manager = container.Resolve<DBBase>();
       manager.Search("SELECT * FORM USER");
   }
   ```

   这里通过 ContainerBuilder 的方法 RegisterType() 对 DBBase 类型进行注册，注册的类型在后面相应得到的 Container(容器) 中可以 Resolve 得到类型实例。

   `builder.RegisterType<SqlRepository>().As<IRepository>();` 通过 AS 可以让 DBBase 类中通过构造函数依赖注入类型相应的接口。

   Build()方法生成一个对应的 Container(容器) 实例，这样，就可以通过 Resolve 解析到注册的类型实例。

   显然以上的程序中，SqlRepository 或者 RedisRepository 已经暴露于客户程序中了，现在将该类型选择通过文件配置进行读取。

   Autofac 自带了一个 Autofac.Configuration.dll 非常方便地对类型进行配置，避免了程序的重新编译。

   修改App.config：

   ```xml
   <configuration>
     <configSections>
       <section name="autofac" type="Autofac.Configuration.SectionHandler, Autofac.Configuration"/>
     </configSections>
     <autofac defaultAssembly="AutofacDemo">
       <components>
         <component type="AutofacDemo.SqlRepository, AutofacDemo" service="AutofacDemo.IRepository"/>
       </components>
     </autofac>
   </configuration>
   ```

   通过Autofac.Configuration.SectionHandler配置节点对组件进行处理。对应的客户端程序改为：

   ```C#
   // 通过配置文件实现对象的创建
   var builder2 = new ContainerBuilder();
   builder2.RegisterType<DBBase>();
   builder2.RegisterModule(new ConfigurationSettingsReader("autofac"));
   using (var container = builder2.Build())
   {
       var manager = container.Resolve<DBBase>();
       manager.Search("SELECT * FORM USER");
   }
   ```

   另外还有一种方式，通过Register方法进行注册：

   ```C#
   // 通过配置文件，配合 Register 方法来创建对象
   var builder3 = new ContainerBuilder();
   builder3.RegisterModule(new ConfigurationSettingsReader("autofac"));
   builder3.Register(c => new DBBase(c.Resolve<IRepository>()));
   using (var container = builder3.Build())
   {
       var manager = container.Resolve<DBBase>();
       manager.Search("SELECT * FORM USER");
   }
   ```

   现在通过一个用户类来控制操作权限，比如增删改的权限，创建一个用户类：

   ```C#
   /// <summary>
   /// Id Identity Interface
   /// </summary>
   public interface Identity
   {
       int Id { get; set; }
   }

   public class User : Identity
   {
       public int Id { get; set; }
       public string Name { get; set; }
   }
   ```

   修改DBBase.cs代码：

   ```C#
   /// <summary>
   /// 数据源基类
   /// </summary>
   public class DBBase
   {
       public IRepository _iRepository;
       public User _user;

       public DBBase(IRepository iRepository) : this(iRepository, null)
       {
           _iRepository = iRepository;
       }

       public DBBase(IRepository iRepository, User user)
       {
           _iRepository = iRepository;
           _user = user;
       }

       /// <summary>
       /// Check Authority
       /// </summary>
       /// <returns></returns>
       public bool IsAuthority()
       {
           bool result = _user != null && _user.Id == 1 && _user.Name == "Colin" ? true : false;
           if (!result)
               Console.WriteLine("Not authority!");
           return result;
       }

       public void Search(string commandText)
       {
           if (IsAuthority())
               _iRepository.Get();
       }
   }
   ```

   在构造函数中增加了一个参数User，而Search增加了权限判断。

   修改客户端程序：

   ```C#
   User user = new User { Id = 1, Name = "Colin" };
   var builder3 = new ContainerBuilder();
   builder3.RegisterModule(new ConfigurationSettingsReader("autofac"));
   builder3.RegisterInstance(user).As<User>();
   builder3.Register(c => new DBBase(c.Resolve<IRepository>(), c.Resolve<User>()));
   using (var container = builder3.Build())
   {
       var manager = container.Resolve<DBBase>();
       manager.Search("SELECT * FORM USER");
   }
   ```

   `builder3.RegisterInstance(user).As<User>();` 注册User实例。

   `builder3.Register(c => new DBBase(c.Resolve<IRepository>(), c.Resolve<User>()));` 通过Lampda表达式注册DBBase实例。

### Ninject

- 安装

  ```xml
  <packages>
    <package id="Ninject" version="3.2.0.0" targetFramework="net45" />
    <package id="Ninject.Extensions.Conventions" version="3.2.0.0" targetFramework="net45" />
    <package id="Ninject.MVC5" version="3.2.1.0" targetFramework="net45" />
    <package id="Ninject.Web.Common" version="3.2.3.0" targetFramework="net45" />
    <package id="Ninject.Web.Common.WebHost" version="3.2.0.0" targetFramework="net45" />
  </packages>
  ```

  在Global.asax.cs中注册IOC

  ```C#
  protected void Application_Start()
  {
      ......
      // 注册IOC容器
      RegisterServices(kernel);
  }

  StandardKernel kernel = new StandardKernel();

  /// <summary>
  /// 注册IOC
  /// </summary>
  /// <param name="kernel"></param>
  private static void RegisterServices(IKernel kernel)
  {
      kernel.Bind(typeof(IDataContextFactory<WechatFoundationEntities>))
          .To(typeof(DefaultDataContextFactory<WechatFoundationEntities>))
          .InRequestScope();
      kernel.Bind<IUnitOfWork>().To<UnitOfWork<WechatFoundationEntities>>()
          .InRequestScope();
      // 注册数据持久层
      kernel.Bind(x => x.From("Roche.China.WechatFoundation.Data")
          .SelectAllClasses()
          .BindAllInterfaces());
      // 注册业务逻辑层
      kernel.Bind(x => x.From("Roche.China.WechatFoundation.BusinessLogic")
          .SelectAllClasses()
          .BindAllInterfaces());
      // Using Cache
      kernel.Bind<IDynaCacheService>().To<MemoryCacheService>().InSingletonScope();
  }
  ```

  属性注入

  ```C#
  public class PortalController : BaseController
  {
      [Inject]
      public ILogger Logger { get; set; }

      [Inject]
      public IGroupLogic WePactGroupService { get; set; }

      ......
  }
  ```

## .NetCore自带

### 问题记录

1、Cannot resolve scoped service from root provider

>出错原因：在Scope外访问注册类  
>解决方法：单独创建一个Scope

```C#
public static void Initialize(IServiceProvider serviceProvider)
{
    using (var serviceScope = serviceProvider.CreateScope())
    {
        var dbContext = serviceScope.ServiceProvider.GetService<BlogDbContext>();
        // ...
    }
}
```

# Aop

## 目录

## 简介

- AOP（ASPect-Oriented Programming，面向方面编程），它是OOP（Object-Oriented Programing，面向对象编程）的补充和完善。我们把软件系统分为两个部分：核心关注点和横切关注点。业务处理的主要流程是核心关注点，与之关系不大的部分是横切关注点。横切关注点的一个特点是，他们经常发生在核心关注点的多处，而各处都基本相似。比如权限认证、日志、异常捕获、事务处理、缓存等。

  目前在.Net下实现AOP的方式分为两大类：

  一是采用动态代理技术，利用截取消息的方式，对该消息进行装饰，以取代或修饰原有对象行为的执行，例如Castle的AspectSharp；

  二是采用静态织入的方式，引入特定的语法创建“方面”，从而使得编译器可以在编译期间织入有关“方面”的代码。

  动态代理实现方式利用.Net的Attribute和.Net Remoting的代理技术，对对象执行期间的上下文消息进行截取，并以消息传递的方式执行，从而可以在执行期间加入相关处理逻辑实现面向方面的功能;而静态织入的方式实现一般是要依靠一些第三方框架提供特定的语法，例如PostSharp，它的实现方式是采用 MSIL Injection和MSBuild Task在编译时置入方面的代码，从而实现AOP。

### 反编译

1、反编译工具ILSpy.exe：很不错的反编译软件，而且免费

2、微软的工具ildasm.exe：把DLL生成IL文件的一个软件，微软自带；可以在C:\Program Files\Microsoft SDKs\Windows\v7.0A\bin找到该软件；

3、微软的工具ilasm.exe：把IL文件重新生成DLL，可以在C:\Windows\Microsoft.NET\Framework\v4.0.30319找到该软件；
