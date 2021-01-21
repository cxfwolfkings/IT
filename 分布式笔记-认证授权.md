# 目录

1. 简介
   - [认证授权](#认证授权)
     - [Form认证](#Form认证)
     - [jwt和OAuth2](#jwt和OAuth2)
     - [IdentityServer4](#IdentityServer4)
   - [gRPC](#gRPC)
   - [nuget](#nuget)
   
   - [jwt授权](#jwt授权)
3. 总结
   
   - [反编译](#反编译)
4. 练习

## 简介

```C#
public DateTime GetSpecificZoneNowDate(string zoneName = "Asia/Shanghai")
        {
            var utcdate = DateTime.Now.ToUniversalTime();
            var localZone = TimeZoneInfo.Utc;
            try
            {
                localZone = TimeZoneInfo.FindSystemTimeZoneById(zoneName);
            }
            catch (TimeZoneNotFoundException)
            {
                try
                {
                    localZone = TimeZoneInfo.FindSystemTimeZoneById("China Standard Time");
                }
                catch (TimeZoneNotFoundException)
                {
                    localZone = TimeZoneInfo.Utc;
                }
            }
            return TimeZoneInfo.ConvertTimeFromUtc(utcdate, localZone);
        }
```

### 认证授权

**身份验证**是这样一个过程：由用户提供凭据，然后将其与存储在操作系统、数据库、应用或资源中的凭据进行比较。

在授权过程中，如果凭据匹配，则用户身份验证成功，可执行已向其授权的操作。授权指判断允许用户执行的操作的过程。

也可以将身份验证理解为进入空间（例如服务器、数据库、应用或资源）的一种方式，而授权是用户可以对该空间（服务器、数据库或应用）内的哪些对象执行哪些操作。

**软件中的常见漏洞：**

ASP.NET Core 和 EF 提供维护应用安全、预防安全漏洞的功能。下表中链接的文档详细介绍了在 Web 应用中避免最常见安全漏洞的技术：

- [跨站点脚本攻击](https://docs.microsoft.com/zh-cn/aspnet/core/security/cross-site-scripting?view=aspnetcore-3.0)
- [SQL注入式攻击](https://docs.microsoft.com/zh-cn/ef/core/querying/raw-sql)
- [跨站点请求伪造(CSRF)](https://docs.microsoft.com/zh-cn/aspnet/core/security/anti-request-forgery?view=aspnetcore-3.0)
- [打开重定向攻击](https://docs.microsoft.com/zh-cn/aspnet/core/security/preventing-open-redirects?view=aspnetcore-3.0)

**双因素认证：**

双因素认证是一种采用时间同步技术的系统，采用了基于**时间**、**事件** 和 **密钥**三变量而产生的一次性密码来代替传统的静态密码。

每个动态密码卡都有一个唯一的密钥，该密钥同时存放在服务器端，每次认证时动态密码卡与服务器分别根据同样的密钥，同样的随机参数（时间、事件）和同样的算法计算了认证的动态密码，从而确保密码的一致性，从而实现了用户的认证。

因每次认证时的随机参数不同，所以每次产生的动态密码也不同。由于每次计算时参数的随机性保证了每次密码的不可预测性，从而在最基本的密码认证这一环节保证了系统的安全性。解决因口令欺诈而导致的重大损失，防止恶意入侵者或人为破坏，解决由口令泄密导致的入侵问题。

简单来说，双因素身份认证就是通过你所知道再加上你所能拥有的这二个要素组合到一起才能发挥作用的身份认证系统。例如，在ATM上取款的银行卡就是一个双因素认证机制的例子，需要知道取款密码和银行卡这二个要素结合才能使用。

目前主流的双因素认证系统是基于[时间同步](https://baike.baidu.com/item/%E6%97%B6%E9%97%B4%E5%90%8C%E6%AD%A5)型，市场占有率高的有DKEY双因素认证系统、RSA双因素认证系统等，由于DKEY增加对短信密码认证及短信+令牌混合认证支持，相比RSA双因素认证系统更具竞争力。

#### Form认证

先来了解ASP.NET是如何进行Form认证的：

1. 终端用户在浏览器的帮助下，发送 Form 认证请求。
2. 浏览器会发送存储在客户端的所有相关的用户数据。
3. 当服务器端接收到请求时，服务器会检测请求，查看是否存在 "Authentication Cookie" 的Cookie。
4. 如果查找到认证Cookie，服务器会识别用户，验证用户是否合法。
5. 如果未找到 "Authentication Cookie"，服务器会将用户作为匿名（未认证）用户处理，在这种情况下，如果请求的资源标记着 protected/secured，用户将会重定位到登录页面。

1. 实现Form认证

   web.config

   ```xml
   <authentication mode="Forms">
     <forms loginurl="~/Authentication/Login"></forms>
   </authentication>
   ```

2. 让Action方法更安全

   在Index action方法中添加认证属性 [Authorize]

   ```C#
   [Authorize]
   public ActionResult Index()
   {
       EmployeeListViewModel employeeListViewModel = new EmployeeListViewModel();
       // ......
   }
   ```

3. 创建 login action 方法

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

4. 在 View 中显示信息

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


通过 ASP.NET Core，开发者可轻松配置和管理其应用的安全性。ASP.NET Core 的功能包括管理身份验证、授权、数据保护、HTTPS 强制、应用机密、请求防伪保护及 CORS 管理。 通过这些安全功能，可以生成安全可靠的 ASP.NET Core 应用。

### Cookie和Session

一、关于Cookie和Session此处简单介绍一下、作为初学者可以先了解以下两点

1、Cookie是存于客户端的（即用户电脑）、Session是存于服务端的。
2、Cookie数据所有的浏览器端共享、Session数据由服务器开辟内存保存、每一个浏览器都有一个唯一的SessionID

二、首先需要介绍一下 `FormsAuthentication` 密封类。

1、用户登录成功后、需要保存用户信息到Cookie（本地）。

可以调用如下方法、下次调用就会判断是否有Cookie信息，如果Cookie信息没有过期可以直接跳过登录。

该类有一个方法 `SetAuthCookie(string userName, bool createPersistentCookie)`

>注意：该方法如果被调用多次、则保存最后一个设置的Cookie

```C#
public ActionResult AdminLogin(SysAdmin objAdmin)
{
    string adminName = new BLL.SysAdminManager().AdminLogin(objAdmin);
    if (adminName != null)
    {
        FormsAuthentication.SetAuthCookie(adminName, true);
        TempData["adminName"] = adminName;
        return RedirectToAction("GetAllStuList", "Student");
    }
    else
    {
        ViewBag.Info = "用户或密码错误";
    }
    return View("AdminLogin");
}
```

2、判断用户是否通过身份验证并且获取用户名称、没有通过验证、则转到登录页面；已经通过验证、则不需要登录

```C#
public ActionResult Index()
{
    if (this.User.Identity.IsAuthenticated)
    {
        string adminName = this.User.Identity.Name;// 获取写入的adminName
        ViewBag.adminName = adminName;
        return View("StudentManage");
    }
    else
    {
        return RedirectToAction("Index", "SysAdmin");
    }
}
```

3、控制器或控制器方法如果添加了 `Authorize` 特性、则通过路由访问之前需要验证是否已经通过身份验证、作用类似于第二点if判断体。

```C#
[Authorize]
public ActionResult Index()
{
    string adminName = this.User.Identity.Name; //获取写入的adminName
    ViewBag.adminName = adminName;
    return View("StudentManage");
}
```

如果浏览器没有登录成功、那么url访问该路由就会失败。如果想要浏览器访问url失败后跳转到指定的页面、可以在Web.config的 `<system.web>` 节点中添加如下标签

```xml
<authentication mode="Forms">
  <forms loginUrl="~/SysAdmin/Index" timeout="2880" />
</authentication>
```

#### jwt和OAuth2

**OAuth2 和 JWT - 如何设计安全的API？**

假设：

- 你已经或者正在实现API；
- 你正在考虑选择一个合适的方法保证API的安全性；

**JWT 和 OAuth2 比较？**

要比较 JWT 和 OAuth2 ？首先要明白一点就是，这两个根本没有可比性，是两个完全不同的东西。

1、JWT是一种认证协议

> JWT提供了一种用于发布接入令牌（Access Token)，并对发布的签名接入令牌进行验证的方法。令牌（Token）本身包含了一系列声明，应用程序可以根据这些声明限制用户对资源的访问。

2、OAuth2是一种授权框架

> 另一方面，OAuth2是一种授权框架，提供了一套详细的授权机制（指导）。用户或应用可以通过公开的或私有的设置，授权第三方应用访问特定资源。
>
> 既然 JWT 和 OAuth2 没有可比性，为什么还要把这两个放在一起说呢？实际中确实会有很多人拿 JWT 和 OAuth2 作比较。标题里把这两个放在一起，确实有误导的意思。很多情况下，在讨论 OAuth2 的实现时，会把 JSON Web Token 作为一种认证机制使用。这也是为什么他们会经常一起出现。

先来搞清楚 JWT 和 OAuth2 究竟是干什么的～

**JSON Web Token (JWT)**

参考：[JSON Web Token 入门教程](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)

在 .NET Core 之前对 Web 应用程序跟踪用户登录状态最普遍的方式是使用 Cookie，session。当客户端是移动app或者桌面应用程序时，支持不友好！为什么？

web端的流程：

1. 用户向服务器发送用户名和密码。
2. 服务器验证通过后，在当前对话（session）里面保存相关数据，比如用户角色、登录时间等等。
3. 服务器向用户返回一个 session_id，写入用户的 Cookie。
4. 用户随后的每一次请求，都会通过 Cookie，将 session_id 传回服务器。
5. 服务器收到 session_id，找到前期保存的数据，由此得知用户的身份。

cookie+session这种模式通常是保存在内存中，而且服务从单服务到多服务会面临的session共享问题，随着用户量的增多，开销就会越大；同时Cookie一般也只适用于单域或子域，对于跨域，如果是第三方Cookie，浏览器可能会禁用Cookie，所以也受浏览器限制。而JWT不是这样，只需要服务端生成token，客户端保存这个token，每次请求携带这个token，服务端认证解析就可。

JWT 解决了 session 存在的问题或缺点：

- 更灵活
- 更安全
- 减少数据库往返，从而实现水平可伸缩。
- 防篡改客户端声明
- 移动设备上能更好工作
- 适用于阻止Cookie的用户

关于 JWT 原理可以参考系列文章：[https://www.cnblogs.com/RainingNight/p/jwtbearer-authentication-in-asp-net-core.html](https://www.cnblogs.com/RainingNight/p/jwtbearer-authentication-in-asp-net-core.html)，当然这只是其中一种限制还有其他。

如果我们使用 Json Web Token（简称为JWT）而不是使用 Cookie，此时 Token 将代表用户，同时我们不再依赖浏览器的内置机制来处理 Cookie，我们仅仅只需要请求一个 Token 就好。

这个时候就涉及到 Token 认证，那么什么是 Token 认证呢？一言以蔽之：将令牌（我们有时称为 AccessToken 或者是 Bearer Token）附加到 HTTP 请求中并对其进行身份认证的过程。Token 认证被广泛应用于移动端或 SPA。

根据维基百科定义，JWT（读作 [/dʒɒt/]），即JSON Web Tokens，是一种基于JSON的、用于在网络上声明某种主张的令牌（token）。

JWT通常由三部分组成: 头信息（header），消息体（payload）和签名（signature）。它是一种用于双方之间传递安全信息的表述性声明规范。

JWT作为一个开放的标准（RFC 7519），定义了一种简洁的、自包含的方法，从而使通信双方实现以JSON对象的形式安全的传递信息。

以上是JWT的官方解释，可以看出JWT并不是一种只能权限验证的工具，而是一种标准化的数据传输规范。所以，只要是在系统之间需要传输简短但却需要一定安全等级的数据时，都可以使用JWT规范来传输。规范是不因平台而受限制的，这也是JWT做为授权验证可以跨平台的原因。

如果理解还是有困难的话，我们可以拿JWT和JSON类比：

JSON是一种轻量级的数据交换格式，是一种数据层次结构规范。它并不是只用来给接口传递数据的工具，只要有层级结构的数据都可以使用JSON来存储和表示。当然，JSON也是跨平台的，不管是Win还是Linux，.NET还是Java，都可以使用它作为数据传输形式。

1）客户端向授权服务系统发起请求，申请获取“令牌”。

2）授权服务根据用户身份，生成一张专属“令牌”，并将该“令牌”以JWT规范返回给客户端

3）客户端将获取到的“令牌”放到http请求的headers中后，向主服务系统发起请求。主服务系统收到请求后会从headers中获取“令牌”，并从“令牌”中解析出该用户的身份权限，然后做出相应的处理（同意或拒绝返回资源）

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/77.png)

JWT 在标准中是这么定义的：

> JSON Web Token (JWT) is a compact URL-safe means of representing claims to be transferred between two parties. The claims in a JWT are encoded as a JSON object that is digitally signed using JSON Web Signature (JWS).

参考：[RFC7519](https://tools.ietf.org/html/rfc7519)

JWT 是一种安全标准。基本思路就是用户提供用户名和密码给认证服务器，服务器验证用户提交信息信息的合法性；如果验证成功，会产生并返回一个Token（令牌），用户可以使用这个token访问服务器上受保护的资源。

一个token的例子：

```token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
```

一个token包含三部分：

```token
header.claims.signature
```

为了安全的在url中使用，所有部分都 base64 URL-safe 进行编码处理。

**Header头部分：**

头部分简单声明了类型(JWT)以及产生签名所使用的算法。

```json
{
  "alg" : "AES256",
  "typ" : "JWT"
}
```

**Claims声明：**

声明部分是整个token的核心，表示要发送的用户详细信息。有些情况下，我们很可能要在一个服务器上实现认证，然后访问另一台服务器上的资源；或者，通过单独的接口来生成token，token被保存在应用程序客户端（比如浏览器）使用。

一个简单的声明（claim）的例子：

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```

**Signature签名：**

签名的目的是为了保证上边两部分信息不被篡改。如果尝试使用 Base64 对解码后的 token 进行修改，签名信息就会失效。一般使用一个私钥（private key）通过特定算法对 Header 和 Claims 进行混淆产生签名信息，所以只有原始的 token 才能与签名信息匹配。

这里有一个重要的实现细节。只有获取了私钥的应用程序（比如服务器端应用）才能完全认证 token 包含声明信息的合法性。所以，永远不要把私钥信息放在客户端（比如浏览器）。

**刷新令牌：**

JWT本质上就是从身份认证服务器获取访问令牌，继而对于用户后续可访问受保护资源，但是关键问题是：访问令牌的生命周期到底设置成多久？如果被骇客恶意获得访问令牌，那么在整个生命周期中都可以使用访问令牌，也就是说存在用户身份冒充。

此时身份认证服务器当然也始终信任该冒牌访问令牌，若要使得冒牌访问令牌无效，唯一的方案是修改密钥，但是如果这么做了，则将使得已授予的访问令牌都无效，所以更改密钥不是最佳方案。

为了从源头尽量控制这个问题，而不是等到问题呈现再来想解决之道，**刷新令牌**闪亮登场。

什么是刷新令牌呢？刷新访问令牌是用来从身份认证服务器交换获得新的访问令牌，有了刷新令牌可以在访问令牌过期后通过刷新令牌重新获取新的访问令牌而无需客户端通过凭据重新登录。如此一来，既保证了用户访问令牌过期后的良好体验，也保证了更高的系统安全性，同时，若通过刷新令牌获取新的访问令牌验证其无效可将受访者纳入黑名单限制其访问。

那么访问令牌和刷新令牌的生命周期设置成多久合适呢？这取决于系统要求的安全性，一般来讲访问令牌的生命周期不会太长，比如5分钟，又比如获取微信的AccessToken的过期时间为2个小时。

**JWT 特点：**

1. JWT 默认是不加密，但也是可以加密的。生成原始 Token 以后，可以用密钥再加密一次。
2. JWT 不加密的情况下，不能将秘密数据写入 JWT。
3. JWT 不仅可以用于认证，也可以用于交换信息。有效使用 JWT，可以降低服务器查询数据库的次数。
4. JWT 的最大缺点是，由于服务器不保存 session 状态，因此无法在使用过程中废止某个 token，或者更改 token 的权限。也就是说，一旦 JWT 签发了，在到期之前就会始终有效，除非服务器部署额外的逻辑。
5. JWT 本身包含了认证信息，一旦泄露，任何人都可以获得该令牌的所有权限。为了减少盗用，JWT 的有效期应该设置得比较短。对于一些比较重要的权限，使用时应该再次对用户进行认证。
6. 为了减少盗用，JWT 不应该使用 HTTP 协议明码传输，要使用 HTTPS 协议传输。

**OAuth2是什么？**

相反，OAuth2不是一个标准协议，而是一个安全的授权框架。它详细描述了系统中不同角色、用户、服务前端应用（比如API），以及客户端（比如网站或移动App）之间怎么实现相互认证。

> The OAuth 2.0 authorization framework enables a third-party application to obtain limited access to an HTTP service, either on behalf of a resource owner by orchestrating an approval interaction between the resource owner and the HTTP service, or by allowing the third-party application to obtain access on its own behalf.

参考：[RFC6749](https://tools.ietf.org/html/rfc6749)

这里简单说一下涉及到的基本概念。

**Roles 角色**

应用程序或者用户都可以是下边的任何一种角色：

- 资源拥有者
- 资源服务器
- 客户端应用
- 认证服务器

**Client Types 客户端类型**

这里的客户端主要指API的使用者。它可以是以下类型：

- 私有的
- 公开的

**Client Profile 客户端描述**

OAuth2框架也指定了集中客户端描述，用来表示应用程序的类型：

- Web应用
- 用户代理
- 原声应用

**Authorization Grants 认证授权**

认证授权代表资源拥有者授权给客户端应用程序的一组权限，可以是下边几种形式：

- 授权码
- 隐式授权
- 资源拥有者密码证书
- 客户端证书
- Endpoints终端

**OAuth2 框架需要下边几种终端：**

- 认证终端
- Token终端
- 重定向终端

从上边这些应该可以看出，OAuth2定义了一组相当复杂的规范。

**使用 HTTPS 保护用户密码**

在进一步讨论 OAuth2 和 JWT 的实现之前，有必要说一下，两种方案都需要 SSL 安全保护，也就是对要传输的数据进行加密编码。

安全地传输用户提供的私密信息，在任何一个安全的系统里都是必要的。否则任何人都可以通过侵入私人wifi，在用户登录的时候窃取用户的用户名和密码等信息。

**一些重要的实施考虑**

在做选择之前，参考一下下边提到的几点：

- **时间投入**：OAuth2 是一个安全框架，描述了在各种不同场景下，多个应用之间的授权问题。有海量的资料需要学习，要完全理解需要花费大量时间。甚至对于一些有经验的开发工程师来说，也会需要大概一个月的时间来深入理解 OAuth2。这是个很大的时间投入。

  相反，JWT 是一个相对轻量级的概念。可能花一天时间深入学习一下标准规范，就可以很容易地开始具体实施。

- **出现错误的风险**：OAuth2 不像 JWT 一样是一个严格的标准协议，因此在实施过程中更容易出错。尽管有很多现有的库，但是每个库的成熟度也不尽相同，同样很容易引入各种错误。在常用的库中也很容易发现一些安全漏洞。

  当然，如果有相当成熟、强大的开发团队来持续 OAuth2 实施和维护，可以一定成都上避免这些风险。

- **社交登录的好处**：在很多情况下，使用用户在大型社交网站的已有账户来认证会方便。

  如果期望你的用户可以直接使用 Facebook 或者 Gmail 之类的账户，使用现有的库会方便得多。

**结论：**

做结论前，我们先来列举一下 JWT 和 OAuth2 的主要使用场景：

- **JWT 使用场景**：无状态的分布式API

  JWT 的主要优势在于使用无状态、可扩展的方式处理应用中的用户会话。服务端可以通过内嵌的声明信息，很容易地获取用户的会话信息，而不需要去访问用户或会话的数据库。在一个分布式的面向服务的框架中，这一点非常有用。

  但是，如果系统中需要使用黑名单实现长期有效的 token 刷新机制，这种无状态的优势就不明显了。

  优势：

  - 快速开发
  - 不需要cookie
  - JSON在移动端的广泛应用
  - 不依赖于社交登录
  - 相对简单的概念理解

  限制：

  - Token有长度限制
  - Token不能撤销
  - 需要token有失效时间限制(exp)

- **OAuth2 使用场景**：在作者看来两种比较有必要使用 OAuth2 的场景

  ***外包认证服务器***

  上边已经讨论过，如果不介意 API 的使用依赖于外部的第三方认证提供者，你可以简单地把认证工作留给认证服务商去做。

  也就是常见的，去认证服务商（比如facebook）那里注册你的应用，然后设置需要访问的用户信息，比如电子邮箱、姓名等。当用户访问站点的注册页面时，会看到连接到第三方提供商的入口。用户点击以后被重定向到对应的认证服务商网站，获得用户的授权后就可以访问到需要的信息，然后重定向回来。

  优势：

  - 快速开发
  - 实施代码量小
  - 维护工作减少

  ***大型企业解决方案***

  如果设计的 API 要被不同的 App 使用，并且每个 App 使用的方式也不一样，使用 OAuth2 是个不错的选择。

  考虑到工作量，可能需要单独的团队，针对各种应用开发完善、灵活的安全策略。当然需要的工作量也比较大！这一点，OAuth2 的作者也指出过：

  > To be clear, OAuth 2.0 at the hand of a developer with deep understanding of web security will likely result is a secure implementation. However, at the hands of most developers – as has been the experience from the past two years – 2.0 is likely to produce insecure implementations.
  > hueniverse - [OAuth 2.0 and the Road to Hell](https://link.jianshu.com/?t=https%3A%2F%2Fhueniverse.com%2F2012%2F07%2F26%2Foauth-2-0-and-the-road-to-hell%2F)

  优势：

  - 灵活的实现方式
  - 可以和JWT同时使用
  - 可针对不同应用扩展

### IdentityServer4

## 特性一览

IdentityServer4 是 `ASP.NET Core 2` 的 OpenID Connect 和 OAuth 2.0 框架。它可以在您的应用程序中提供以下功能：

**认证即服务：**

适用于所有应用程序（web, native, mobile, services）的集中登录逻辑和工作流程。IdentityServer是OpenID Connect的官方认证实现。

**单点登录/注销：**

多个类型的应用程序在一个点进行登录和注销操作。

**API 访问控制：**

为各种类型的客户端颁发 API 的访问令牌，例如 服务器到服务器、Web应用程序，SPA、本地应用和移动应用程序。

**联合网关：**

支持 Azure Active Directory，Google，Facebook 等外部身份提供商。这可以保护您的应用程序免受如何连接到这些外部提供商的详细信息的影响。

**专注于定制：**

最重要的部分 - IdentityServer的许多方面都可以根据您的需求进行定制。由于IdentityServer是一个框架而不是现成的产品或SaaS，因此您可以编写代码以使系统适应您的方案。

**成熟的开源：**

IdentityServer 使用的 Apache 2 开源协议，允许在其上构建商业产品。它也是 .NET Foundation 的一部分，它提供治理和法律支持。

**免费和商业支持：**

如果您需要帮助构建或运行您的身份平台，请告知IdentityServer官方。 他们可以通过多种方式为您提供帮助。

## 整体介绍

现代应用程序看起来更像这个：

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/668104-20170816223247271-1583902578.png)

最常见的相互作用：

- 浏览器与 Web 应用程序的通信 Browser -> Web App
- Web 应用程序与 Web API 通信
- 基于浏览器的应用程序与 Web API
- 本机应用程序与 Web API 进行沟通
- 基于服务器的应用程序与 Web API
- Web API 与 Web API通信

通常，每个层（前端、中间层和后端）必须保护资源并实现身份验证或授权——通常针对同一个用户存储区。

将这些基本安全功能外包给安全令牌服务可以防止在这些应用程序和端点上复制该功能。

应用支持安全令牌服务将引起下面的体系结构和协议：

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/668104-20170816224035428-1945725990.png)

这样的设计将安全问题分为两部分：

**认证（Authentication）：**

认证可以让一个应用程序知道当前用户的身份。通常，这些应用程序代表该用户管理数据，并且需要确保该用户只能访问允许他访问的数据。最常见的示例是 Web 应用程序，但基于本地和基于 js 的应用程序也需要进行身份验证。

最常用的认证协议saml2p、WS-Federation 和 OpenID，saml2p协议是最流行和实际应用最多的。

OpenID Connect 对于现在应用来说是被认为是未来最有潜力的，这是专为移动应用场景设计的，一开始就被设计成对移动应用场景友好。

**API访问：**

应用程序有两种基本方式与 API 进行通信，一种是使用应用程序标识，另一种是委托用户的身份。有时这两种方法都需要结合。

OAuth2 协议，它允许应用程序从一个安全令牌服务要求访问令牌，使用这个访问令牌来访问API。这个机制降低了客户机应用程序和 API 的复杂性，因为身份验证和授权可以是集中式的。

**OpenID Connect 和 OAuth 2.0 结合：**

OpenID Connect 和 OAuth 2.0 非常相似，事实上 OpenID Connect 是在 OAuth 2.0 之上的一个扩展。两个基本的安全问题，认证和 API 访问，被组合成单个协议，通常只需一次往返安全令牌服务。

我们认为 OpenID Connect 和 OAuth 2.0 的组合是可预见在未来是保护现代应用程序的最佳方法。IdentityServer4 是这两种协议的实现，并且被高度优化以解决当今移动应用、本地应用和 web 应用的典型安全问题

**IdentityServer4可以帮助你做什么？**

IdentityServer 是将规范兼容的 OpenID Connect 和 OAuth 2.0 端点添加到任意 ASP.NET Core 应用程序的中间件。通常，您构建（或重新使用）包含登录和注销页面的应用程序，IdentityServer 中间件会向其添加必要的协议头，以便客户端应用程序可以与其对话 使用这些标准协议。

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/668104-20170817223131521-2051565471.png)

我们通常建议通过仅包含认证相关的UI来使攻击面尽可能小。

### 术语解释

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/668104-20170906234914913-815927319.png)

**身份认证服务器（IdentityServer）：**

IdentityServer 是一个 OpenID Connect 提供程序，它实现了 OpenID Connect 和 OAuth 2.0 协议。

同样的角色，不同的文档使用不同的术语。在有些文档中，它（IdentityServer）可能会被叫做安全令牌服务器（security token service）、身份提供者（identity provider）、授权服务器（authorization server）、 标识提供方（(IP-STS，[什么是IP-STS](https://msdn.microsoft.com/zh-cn/library/ee748489.aspx)）等等。

但是它们都是一样的，都是向客户端发送安全令牌（security token），

IdentityServer有许多功能：

- 保护你的资源
- 使用本地帐户或通过外部身份提供程序对用户进行身份验证
- 提供会话管理和单点登录
- 管理和验证客户机
- 向客户发出标识和访问令牌
- 验证令牌

**用户（User）：**

用户是使用注册的客户端访问资源的人。

**客户端（Client）：**

客户端是从 IdentityServer 请求令牌的软件，用于验证用户（请求身份令牌）或访问资源（请求访问令牌）。必须首先向 IdentityServer 注册客户端才能请求令牌。

客户端可以是 Web 应用程序，本地移动或桌面应用程序，SPA，服务器进程等。

**资源（Resources）：**

资源是您想要使用 IdentityServer 保护的资源，您的用户的身份数据或 API。

每个资源都有一个唯一的名称，客户端使用这个名称来指定他们想要访问的资源。

用户身份数据标识信息，比如姓名或邮件地址等。

API 资源，表示客户端想要调用的功能，通常被建模为 Web API，但不一定。

**身份令牌（Identity Token）：**

身份令牌表示身份验证过程的结果。它最低限度地标识了某个用户，还包含了用户的认证时间和认证方式。它可以包含额外身份数据。

**访问令牌（Access Token）：**

访问令牌允许访问API资源。客户端请求访问令牌并将其转发到API。访问令牌包含有关客户端和用户的信息（如果存在）。API使用该信息来授权访问其数据。

### 支持的规范

**OpenID Connect：**

- OpenID Connect Core 1.0 ([spec](http://openid.net/specs/openid-connect-core-1_0.html))
- OpenID Connect Discovery 1.0 ([spec](http://openid.net/specs/openid-connect-discovery-1_0.html))
- OpenID Connect Session Management 1.0 - draft 22 ([spec](http://openid.net/specs/openid-connect-session-1_0.html))
- OpenID Connect HTTP-based Logout 1.0 - draft 03 ([spec](http://openid.net/specs/openid-connect-logout-1_0.html))

**OAuth 2.0：**

- OAuth 2.0 ([RC-6749](http://tools.ietf.org/html/rfc6749))
- OAuth 2.0 Bearer Token Usage ([RFC 6750](http://tools.ietf.org/html/rfc6750))
- OAuth 2.0 Multiple Response Types ([spec](http://openid.net/specs/oauth-v2-multiple-response-types-1_0.html))
- OAuth 2.0 Form Post Response Mode ([spec](http://openid.net/specs/oauth-v2-form-post-response-mode-1_0.html))
- OAuth 2.0 Token Revocation ([RFC 7009](https://tools.ietf.org/html/rfc7009))
- OAuth 2.0 Token Introspection ([RFC 7662](https://tools.ietf.org/html/rfc7662))
- Proof Key for Code Exchange ([RFC 7636](https://tools.ietf.org/html/rfc7636))
- JSON Web Tokens for Client Authentication ([RFC 7523](https://tools.ietf.org/html/rfc7523))

### 包和构建

IdentityServer 有许多 Nuget 包组件：

**IdentityServer4：**

[nuget](https://www.nuget.org/packages/IdentityServer4/) | [github](#https://github.com/identityserver/IdentityServer4)

包含 IdentityServer 核心对象模型、服务和中间件。默认只包含了基于内存(In-Memory)的配置和用户信息的存储，主要用于快速学习、测试 IdentityServer4，你可通过实现 IdentityServer4 提供的接口，来接入自定义持久化存储。

**Quickstart UI：**

[github](https://github.com/IdentityServer/IdentityServer4.Quickstart.UI)

包含一个简单的入门UI，包括登录，注销和授权询问页面。

**Access token validation middleware：**

[nuget](https://www.nuget.org/packages/IdentityServer4.AccessTokenValidation) | [github](https://github.com/IdentityServer/IdentityServer4.AccessTokenValidation)

用于验证 API 中令牌的 ASP.NET Core 身份验证处理程序。处理程序允许在同一 API 中支持 JWT 和reference Token。

**ASP.NET Core Identity：**

[nuget](https://www.nuget.org/packages/IdentityServer4.AspNetIdentity) | [github](https://github.com/IdentityServer/IdentityServer4.AspNetIdentity)

IdentityServer 的 ASP.NET Core Identity 集成包。此包提供了一个简单的配置API，可以让IdentityServer 用户使用 ASP.NET Identity。

**EntityFramework Core：**

[nuget](https://www.nuget.org/packages/IdentityServer4.EntityFramework) | [github](https://github.com/IdentityServer/IdentityServer4.EntityFramework)

IdentityServer 的 EntityFramework Core 存储实现。这个包提供了 IdentityServer 的配置和操作存储的 EntityFramework Core 实现。

**Dev builds：**

此外，开发/临时构建将发布到MyGet。如果要尝试尝试，请将以下包源添加到Visual Studio：[https://www.myget.org/F/identity/](https://www.myget.org/F/identity/)

**.NET Core 2.0的示例：**

[https://github.com/stulzq/IdentityServer4.Samples](https://github.com/stulzq/IdentityServer4.Samples)

### 客户端授权模式

使用 IdentityServer 保护 API 的最基本场景。在这种情况下，我们将定义一个 API 和要访问它的客户端。客户端将在 IdentityServer 上请求访问令牌，并使用它来访问 API。

此种方式用户和客户端无法交互！

### 资源所有者密码授权模式

OAuth 2.0 资源所有者密码模式允许客户端向令牌服务发送用户名和密码，并获取**代表该用户**的访问令牌。

除了通过无法浏览器进行交互的应用程序之外，通常建议不要使用资源所有者密码模式。 一般来说，当您要对用户进行身份验证并请求访问令牌时，使用其中一个交互式 OpenID Connect 流程通常要好得多。

在这里使用这种模式是为了学习如何快速在 IdentityServer 中使用它

下面这张图，是理解的客户端请求流程：

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/668104-20180419125329982-1803935441.png)

api 资源收到第一个请求之后，会去 id4 服务器公钥，然后用公钥验证 token 是否合法，如果合法进行后面后面的有效性验证。有且只有第一个请求才会去 id4 服务器请求公钥，后面的请求都会用第一次请求的公钥来验证，这也是 jwt 去中心化验证的思想。

### OpenId&nbsp;Connect协议

**OpenId：**

OpenID 是一个**以用户为中心的数字身份识别框架**，它具有开放、分散性。OpenID 的创建基于这样一个概念：我们可以通过 URI （又叫 URL 或网站地址）来认证一个网站的唯一身份，同理，我们也可以通过这种方式来作为用户的身份认证。

简而言之：**OpenId用于身份认证（Authentication）**。

**OAuth 2.0：**

OAuth（**开放授权**）是一个开放标准，目前的版本是2.0。允许用户授权第三方移动应用访问他们存储在其他服务商上存储的私密的资源（如照片，视频，联系人列表），而无需将用户名和密码提供给第三方应用。

OAuth允许用户提供一个**令牌**而不是用户名和密码来访问他们存放在特定服务商上的数据。每一个令牌授权一个特定的网站内访问特定的资源（例如仅仅是某一相册中的视频）。这样，OAuth可以允许用户授权第三方网站访问他们存储在另外服务提供者的某些特定信息，而非所有内容。

OAuth 是 OpenID 的一个补充，但是完全不同的服务。

简而言之：**OAuth2.0 用于授权（Authorization）**。

OpenID Connect 1.0 是基于OAuth 2.0协议之上的简单身份层，它允许客户端根据授权服务器的认证结果最终确认终端用户的身份，以及获取基本的用户信息；它支持包括Web、移动、JavaScript在内的所有客户端类型去请求和接收终端用户信息和身份认证会话信息；它是可扩展的协议，允许你使用某些可选功能，如身份数据加密、OpenID提供商发现、会话管理等。

简而言之：**OpenId Connect = OIDC = Authentication + Authorization + OAuth2.0**。

比如，Facebook、Google、QQ、微博都是比较知名的 OpenId Connect 提供商。

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/19.jpg)

了解完 OpenId Connect 和 OAuth2.0 的基本概念，我们再来梳理下涉及到的相关术语：

1. User：用户
2. Client：客户端
3. Resources：Identity Data（身份数据）、Apis
4. Identity Server：认证授权服务器
5. Token：Access Token（访问令牌）和 Identity Token（身份令牌）

与 OAuth 2.0 类似，OpenID Connect 也使用 Scope 概念。同样，Scope 代表您想要保护的内容以及客户端想要访问的内容。与 OAuth 相比，**OIDC 中的 Scope 不仅代表 API 资源，还代表用户 ID，姓名或电子邮件地址等身份资源**。

所有标准 Scope 及其相应的 Claim 都可以在 [OpenID Connect](https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims) 规范中找到

- 通过访问到受保护的 Controller 操作来触发身份认证。您应该会看到重定向到 IdentityServer 的登录页面
- 成功登录后，将向用户显示同意授权页面。在这里，用户可以决定是否要将他的身份信息发布到客户端应用程序。
- 之后，IdentityServer 将重定向回 MVC 客户端，其中 OpenID Connect 身份认证处理程序处理响应并通过设置 cookie 在本地登录用户。最后，MVC 视图将显示 cookie 的内容。

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/668104-20190222105419639-1540528509.png)

如您所见，cookie 包含两部分，即用户的 Claim 和一些元数据。此元数据还包含 IdentityServer 发出的原始令牌。可以将此令牌复制到[jwt.io](https://jwt.io/)以检查其内容。

### Hybrid&nbsp;Flow模式

OpenID Connect 和 OAuth 2.0 组合的优点在于，您可以使用单一协议和单一交换使用令牌服务来使用这两种协议。

在之前的快速入门中，我们使用了 OpenID Connect 简化流程。在简化流程中，所有令牌（身份令牌、访问令牌）都通过浏览器传输，这对于身份令牌（IdentityToken）来说是没有问题的，但是如果是访问令牌直接通过浏览器传输，就增加了一定的安全问题。

访问令牌（AccessToken）比身份令牌（IdentityToken）更敏感，在非必须的情况下，我们不希望将它们暴露给外界。OpenID Connect 包含一个名为 "Hybrid（混合）" 的流程，它为我们提供了两全其美的优势，身份令牌通过浏览器传输，因此客户端可以在进行任何更多工作之前对其进行验证。如果验证成功，客户端会通过令牌服务的以获取访问令牌。

### 授权码模式

本快速入门将展示如何构建基于浏览器的 JavaScript 客户端应用程序（SPA）。

用户将登录 IdentityServer，使用 IdentityServer 发出的 AccessToken 调用Web API，并注销IdentityServer。这些操作都通过 JavaScript 客户端来执行。

## 进一步

- [http://jwt.io](https://link.jianshu.com/?t=http%3A%2F%2Fjwt.io%2F) - JWT官方网站，也可以查看到使用不同语言实现的库的状态。
- [http://oauth.net/2/](https://link.jianshu.com/?t=http%3A%2F%2Foauth.net%2F2%2F) OAuth2官方网站, 也也可以查看到使用不同语言实现的库的状态。
- [OAuth 2 tutorials](https://link.jianshu.com/?t=http%3A%2F%2Ftutorials.jenkov.com%2Foauth2%2Foverview.html) - Useful overview of how OAuth 2 works
- [Oauth2 Spec issues](https://link.jianshu.com/?t=http%3A%2F%2Fhueniverse.com%2F2012%2F07%2F26%2Foauth-2-0-and-the-road-to-hell%2F) Eran Hammer’s (推进OAuth标准的作者) views on what went wrong with the OAuth 2 spec process. Whatever your own opinion, good to get some framing by someone who understand’s key aspects of what make a security standard successful.
- [Thoery and implemnetation](https://link.jianshu.com/?t=http%3A%2F%2Fwww.toptal.com%2Fweb%2Fcookie-free-authentication-with-json-web-tokens-an-example-in-laravel-and-angularjs): with Laravel and Angular Really informative guide to JWT in theory and in practice for Laravel and Angular.
- 博客原文地址：[OAuth2和JWT-如何设计安全的API？](https://link.jianshu.com/?t=http%3A%2F%2Fwww.leshalv.net%2Fposts%2F9005%2F)

### gRPC

gRPC 是一个由Google开源的，跨语言的，高性能的远程过程调用（RPC）框架。gRPC使客户端和服务端应用程序可以透明地进行通信，并简化了连接系统的构建。它使用HTTP/2作为通信协议，使用 Protocol Buffers 作为序列化协议。

参考：[https://www.cnblogs.com/stulzq/p/11581967.html](https://www.cnblogs.com/stulzq/p/11581967.html)



## nuget

参考：https://www.cnblogs.com/xcsn/p/6259853.html

```sh
# 升级到最新版
nuget update -self

# 1.安装
# 安装指定版本类库
install-package <程序包名> -version <版本号>
# 安装到指定的项目
install-package <程序包名> -project XXXProjectName -version <版本号>

# 2.更新
Update-Package <程序包名>

# 3.重新安装
# 重新安装所有Nuget包(整个解决方案都会重新安装)
update-package -reinstall
# 重新安装指定项目所有Nuget包
update-package -project <项目名称> -reinstall

# 4.卸载
# 正常卸载
uninstall-package <程序包名>
# 强制卸载
Uninstall-Package <程序包名> -Force

# 5.查询
# 默认列出本地已经安装了的包。可以加参数 -remote -filter entityframework 来在包源中查找自己想要的包
Get-Package
```

常见问题：

1. nuget安装dll时提示“已拥有为system.diagnostics.tracesource定义的依赖项”，这是因为nuget版本比较低引起的。

   解决方法:

   打开VS -> 打开菜单“工具”-“扩展和更新” -> 选择“更新” -> 选择“Visual Studio库” -> 点击 nuget 进行更新；





## 实战

### jwt授权

**生成 Token 令牌：**

关于JWT授权，其实过程是很简单的，大家其实这个时候静下心想一想就能明白，这个就是四步走：

1. 首先我们需要一个具有一定规则的 Token 令牌，也就是 JWT 令牌（比如我们的公司门禁卡），--<b style="color:green">登录</b>
2. 然后呢，我们再定义哪些地方需要什么样的角色（比如领导办公室我们是没办法进去的），--<b style="color:green">授权机制</b>
3. 接下来，整个公司需要定一个规则，就是如何对这个 Token 进行验证，不能随便写个字条，这样容易被造假（比如我们公司门上的每一道刷卡机），--<b style="color:green">认证方案</b>
4. 最后，就是安全部门，开启认证中间件服务（那这个服务可以关闭的，比如我们电影里看到的黑客会把这个服务给关掉，这样整个公司安保就形同虚设了）。--<b style="color:green">开启中间件</b>

那现在我们就是需要一个具有一定规则的 Token 令牌，大家可以参考代码：

```C#
public class JwtHelper
{
    /// <summary>
    /// 颁发JWT字符串
    /// </summary>
    /// <param name="tokenModel"></param>
    /// <returns></returns>
    public static string IssueJwt(TokenModelJwt tokenModel)
    {
        string iss = Appsettings.app(new string[] { "JWT", "Issuer" });
        string aud = Appsettings.app(new string[] { "JWT", "Audience" });
        string secret = Appsettings.app(new string[] { "JWT", "Key" });
        // var claims = new Claim[] //old
        var claims = new List<Claim>
        {
            /*
             * 特别重要：
             *   1、这里将用户的部分信息，比如 uid 存到了Claim 中，如果你想知道如何在其他地方将这个 uid从 Token 中取出来，请看下边的SerializeJwt() 方法，或者在整个解决方案，搜索这个方法，看哪里使用了！
             *   2、你也可以研究下 HttpContext.User.Claims，具体的你可以看看 Policys/PermissionHandler.cs 类中是如何使用的。
             */
            new Claim(JwtRegisteredClaimNames.Jti, tokenModel.Uid.ToString()),
            new Claim(JwtRegisteredClaimNames.Iat, $"{new DateTimeOffset(DateTime.Now).ToUnixTimeSeconds()}"),
            new Claim(JwtRegisteredClaimNames.Nbf, $"{new DateTimeOffset(DateTime.Now).ToUnixTimeSeconds()}") ,
            // 这个就是过期时间，目前是过期10秒，可自定义，注意JWT有自己的缓冲过期时间
            new Claim (JwtRegisteredClaimNames.Exp, $"{new DateTimeOffset(DateTime.Now.AddSeconds(10)).ToUnixTimeSeconds()}"),
            new Claim(JwtRegisteredClaimNames.Iss, iss),
            new Claim(JwtRegisteredClaimNames.Aud, aud),
            // 这个 Role 是官方 UseAuthentication 要要验证的 Role，我们就不用手动设置 Role 这个属性了
            new Claim(ClaimTypes.Role, tokenModel.Role), // 为了解决一个用户多个角色（比如：Admin,System），用下边的方法
        };

        // 可以将一个用户的多个角色全部赋予；
        // 作者：DX 提供技术支持；
        // claims.AddRange(tokenModel.Role.Split(',').Select(s => new Claim(ClaimTypes.Role, s)));

        // 秘钥（SymmetricSecurityKey 对安全性的要求，密钥的长度太短会报出异常）
         var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var jwt = new JwtSecurityToken(
            issuer: iss,
            claims: claims,
            signingCredentials: creds
        );

        var jwtHandler = new JwtSecurityTokenHandler();
        var encodedJwt = jwtHandler.WriteToken(jwt);

        return encodedJwt;
    }

    /// <summary>
    /// 解析
    /// </summary>
    /// <param name="jwtStr"></param>
    /// <returns></returns>
    public static TokenModelJwt SerializeJwt(string jwtStr)
    {
        var jwtHandler = new JwtSecurityTokenHandler();
        JwtSecurityToken jwtToken = jwtHandler.ReadJwtToken(jwtStr);
        object role;
        try
        {
            jwtToken.Payload.TryGetValue(ClaimTypes.Role, out role);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
        var tm = new TokenModelJwt
        {
            Uid = (jwtToken.Id).ObjToInt(),
            Role = role != null ? role.ObjToString() : "",
        };
        return tm;
    }
}

/// <summary>
/// 令牌
/// </summary>
public class TokenModelJwt
{
    /// <summary>
    /// Id
    /// </summary>
    public long Uid { get; set; }

    /// <summary>
    /// 角色
    /// </summary>
    public string Role { get; set; }
}
```

Appsettings —— appsetting.json 操作类

```C#
public class Appsettings
{
    static IConfiguration Configuration { get; set; }

    //static Appsettings()
    //{
    //    //ReloadOnChange = true 当appsettings.json被修改时重新加载
    //    Configuration = new ConfigurationBuilder()
    //    .Add(new JsonConfigurationSource { Path = "appsettings.json", ReloadOnChange = true })//请注意要把当前appsetting.json 文件->右键->属性->复制到输出目录->始终复制
    //    .Build();
    //}

    static Appsettings()
    {
        string Path = "appsettings.json";
        {
            //如果你把配置文件 是 根据环境变量来分开了，可以这样写
            //Path = $"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}.json";
        }

        //Configuration = new ConfigurationBuilder()
        //.Add(new JsonConfigurationSource { Path = Path, ReloadOnChange = true })//请注意要把当前appsetting.json 文件->右键->属性->复制到输出目录->始终复制
        //.Build();

        Configuration = new ConfigurationBuilder()
           .SetBasePath(Directory.GetCurrentDirectory())
           .Add(new JsonConfigurationSource { Path = Path, Optional = false, ReloadOnChange = true })//这样的话，可以直接读目录里的json文件，而不是 bin 文件夹下的，所以不用修改复制属性
           .Build();
    }

    /// <summary>
    /// 封装要操作的字符
    /// </summary>
    /// <param name="sections"></param>
    /// <returns></returns>
    public static string app(params string[] sections)
    {
        try
        {
            var val = string.Empty;
            for (int i = 0; i < sections.Length; i++)
            {
                val += sections[i] + ":";
            }

            return Configuration[val.TrimEnd(':')];
        }
        catch (Exception)
        {
            return "";
        }
    }
}
```

这个接口如何调用呢，很简单，就是我们的登录api：

```C#
public async Task<object> GetJwtStr(string name, string pass)
{
    string jwtStr = string.Empty;
    bool suc = false;

    // 获取用户的角色名，请暂时忽略其内部是如何获取的，可以直接用 var userRole="Admin"; 来代替更好理解。
    var userRole = await _sysUserInfoServices.GetUserRoleNameStr(name, pass);
    if (userRole != null)
    {
        // 将用户id和角色名，作为单独的自定义变量封装进 token 字符串中。
        TokenModelJwt tokenModel = new TokenModelJwt { Uid = 1, Role = userRole };
        jwtStr = JwtHelper.IssueJwt(tokenModel);//登录，获取到一定规则的 Token 令牌
        suc = true;
    }
    else
    {
        jwtStr = "login fail!!!";
    }

    return Ok(new
    {
        success = suc,
        token = jwtStr
    });
}

/// <summary>
/// 令牌
/// </summary>
public class TokenModelJwt
{
    /// <summary>
    /// Id
    /// </summary>
    public long Uid { get; set; }
    /// <summary>
    /// 角色
    /// </summary>
    public string Role { get; set; }
    /// <summary>
    /// 职能
    /// </summary>
    public string Work { get; set; }

}
```

现在我们获取到Token了，那如何进行授权认证呢，别着急，重头戏马上到来！

**JWT AS Cookies Identity Claim：**

## Json Web Token基础

JWT由三部分构成，Base64编码的Header，Base64编码的Payload，签名，三部分通过点隔开。

第一部分以Base64编码的Header主要包括Token的类型和所使用的算法，例如：

```json
{
    "alg": "HS265",
    "typ": "JWT"
}
```

标识加密方式为HS256，Token类型为JWT, 这段JSON通过Base64Url编码形成下例的第一个字符串

第二部分以Base64编码的Payload主要包含的是声明(Claims)，例如，如下：

```json
{
    "sub": "765032130654732",
    "name": "jeffcky"
}
```

Payload是JWT用于信息存储部分，其中包含了许多种的声明（claims）。可以自定义多个声明添加到Payload中，系统也提供了一些默认的类型

- iss (issuer)：签发人
- exp (expiration time)：过期时间
- sub (subject)：主题
- aud (audience)：受众
- nbf (Not Before)：生效时间
- iat (Issued At)：签发时间
- jti (JWT ID)：编号

这部分通过Base64Url编码生成第二个字符串。

第三部分则是将Key通过对应的加密算法生成签名。

它的值类似这样的表达式：

```C#
Signature = HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
```

也就是说，它是通过将前两个字符串加密后生成的一个新字符串。

所以只有拥有同样加密密钥的人，才能通过前两个字符串获得同样的字符串，通过这种方式保证了Token的真实性。

最终三部分以点隔开，比如如下形式：

```sh
1 eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
2 eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiSmVmZmNreSIsImVtYWlsIjoiMjc1MjE1NDg0NEBxcS5jb20iLCJleHAiOjE1NjU2MTUzOTgsIm5iZiI6MTU2MzE5NjE5OCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAxIn0.
3 OJjlGJOnCCbpok05gOIgu5bwY8QYKfE2pOArtaZJbyI
```

到这里此时我们应该知道：JWT包含的信息并没有加密，比如为了获取Payload，我们大可通过比如谷歌控制台中的APi(atob)对其进行解码，如下：

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/53.png)

那如我所说既然JWT包含的信息并没有加密，只是进行了Base64编码，岂不是非常不安全呢？

当然不是这样，还没说完，第三部分就是签名，虽然我们对Payload（姑且翻译为有效负载），未进行加密，但是若有蓄意更换Payload，此时签名将能充分保证Token无效，除非将签名的Key不小心暴露在光天化日之下，否则必须是安全的。

好了，到了这里，我们稍稍讲解了下JWT构成，接下来我们进入如何在 .NET Core 中使用JWT。

**前端3次请求：**

```js
import Qs from 'qs'
import axios from 'axios'
import store from '../store'
import router from '../router'
import { Message, MessageBox } from 'element-ui'
import { getToken, getRefreshToken } from '@/utils/auth'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // 配置请求头
axios.defaults.headers['x-requested-with'] = 'XMLHttpRequest' // 让后台判断是否ajax请求
axios.defaults.timeout = 60000 // 响应时间
axios.defaults.baseURL = process.env.BASE_API // 配置接口地址

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 60000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  var token = getToken()
  if (token) {
    // config.headers['X-Token'] = 'Bearer ' + getToken() // 让每个请求携带自定义token，请根据实际情况自行修改
    config.headers['Authorization'] = 'Bearer ' + token
  }
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 401) {
      Message({
        message: '登录身份过期，请重新登录。',
        type: 'warning',
        duration: 5 * 1000
      })
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user')
      router.push('/login')
      return Promise.reject(new Error('身份过期'))
    } else if (res.code !== 200) {
      Message({
        message: res.message || 'error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    } else {
      // 验证码更新失败
      if (res.notValid) { // 重新登录
        return Message({
          message: '您的登录状态已过期，请重新登录！',
          type: 'error',
          duration: 2 * 1000,
          onClose: () => {
            store.dispatch('FedLogOut').then(() => {
              location.reload() // 为了重新实例化vue-router对象，避免bug
            })
          }
        })
      }
      return response.data.data
    }
  },
  error => {
    if (error.response.status === 401) {
      if (error.request.getResponseHeader('auth') === 'expired') {
        return Promise.reject({
          // 是否刷新token的标识
          isRefresh: true,
          // 原先请求函数和对应的参数
          nextRest: (callback, args) => {
            generateRefreshToken().then(res => {
              // 更新保存在前端的token值
              sessionStorage.setItem('token', res.accessToken)
              sessionStorage.setItem('refreshToken', res.refreshToken)
              // 前端token更新后，再次发起原先请求
              if (typeof callback === 'function') {
                args = args || []
                callback(...args)
              }
            })
          }
        })
      }
      return Message({
        message: '您的登录状态已过期，请重新登录！',
        type: 'error',
        duration: 2 * 1000,
        onClose: () => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象，避免bug
          })
        }
      })
    }
    // 兼容异常当做流程提示的做法
    if (error.response.data && error.response.data.message) {
      error.message = error.response.data.message.split('：   at')[0]
    }
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

/**
 * 更新token
 */
const generateRefreshToken = () => {
  return post('/auth/account/refresh', {
    accessToken: getToken(),
    refreshToken: getRefreshToken()
  })
}

// 返回一个Promise（发送post请求）
export function post(url, params) {
  return service({
    method: 'post',
    url,
    // data:params,
    data: Qs.stringify(params),
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
}

// 返回一个Promise（发送get请求）
export function get(url, param) {
  return service({
    method: 'get',
    url,
    params: param
  })
}

/**
 * 下载文件
 * @param {*} url
 * @param {*} param
 */
export function exportFile(url, param) {
  return new Promise((resolve, reject) => {
    const fileName = param.name + '.' + param.type
    delete param.name
    delete param.type
    axios.defaults.headers['Authorization'] = 'Bearer ' + getToken()
    axios({
      method: 'post',
      responseType: 'blob',
      url: url,
      params: param
    })
      .then(response => {
        resolve(response)
        if (response && response.data) {
          const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/octet-stream' }))
          const link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', fileName)
          document.body.appendChild(link)
          link.click()
          link.parentNode.removeChild(link)
        }
      }, err => {
        reject(err)
      }).catch((error) => {
        reject(error)
      })
  })
}

export default { service, get, post, exportFile }
```

参考功能：

```js
/**
 * 生成新的axios实例
 */
const createService = token => {
  const myAxios = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 60000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'x-requested-with': 'XMLHttpRequest',
      'Authorization': 'Bearer ' + token
    }
  })
  return myAxios
}

// 类数组转换为数组，并排除第一个元素
const args = Array.prototype.slice.call(arguments).filter((item, index) => { return index > 0 })
```

## 认证流程

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/63.png)

1. 认证服务器：用于用户的登录验证和Token的发放。
2. 应用服务器：业务数据接口。被保护的API。
3. 客户端：一般为APP、小程序等。

认证流程：

1. 用户首先通过登录，到认证服务器获取一个Token。
2. 在访问应用服务器的API的时候，将获取到的Token放置在请求的Header中。
3. 应用服务器验证该Token，通过后返回对应的结果。

>说明：这只是示例方案，实际项目中可能有所不同。

- 对于小型项目，可能认证服务和应用服务在一起。本例通过分开的方式来实现，使我们能更好的了解二者之间的认证流程。
- 对于复杂一些的项目，可能存在多个应用服务，用户获取到的Token可以在多个分布式服务中被认证，这也是JWT的优势之一。

## JWT授权认证流程——自定义中间件

在 .NET Core 中如何使用JWT，那么我们必须得知晓如何创建JWT，接下来我们首先创建一个端口号为5000的APi，创建JWT，然后我们需要安装 System.IdentityModel.Tokens.Jwt 包。

我们直接给出代码来创建Token，然后一一对其进行详细解释，代码如下：

```C#
var claims = new Claim[] {
    new Claim (ClaimTypes.Name, "Jeffcky"),
    new Claim (JwtRegisteredClaimNames.Email, "2752154844@qq.com"),
    new Claim (JwtRegisteredClaimNames.Sub, "D21D099B-B49B-4604-A247-71B0518A0B1C"),
};

var key = new SymmetricSecurityKey (Encoding.UTF8.GetBytes ("1234567890123456"));

var token = new JwtSecurityToken (
    issuer: "http://localhost:5000",
    audience: "http://localhost:5001",
    claims : claims,
    notBefore : DateTime.Now,
    expires : DateTime.Now.AddHours (1),
    signingCredentials : new SigningCredentials (key, SecurityAlgorithms.HmacSha256)
);

var jwtToken = new JwtSecurityTokenHandler ().WriteToken (token);
```

如上我们在声明集合中初始化声明时，我们使用了两种方式，一个是使用 ClaimTypes ，一个是 JwtRegisteredClaimNames ，那么这二者有什么区别？以及我们到底应该使用哪种方式更好？或者说两种方式都使用是否有问题呢？

ClaimTypes来自命名空间 System.Security.Claims ，而JwtRegisteredClaimNames来自命名空间 System.IdentityModel.Tokens.Jwt ，二者在获取声明方式上是不同的，ClaimTypes是沿袭微软提供获取声明的方式，比如我们要在控制器Action方法上获取上述ClaimTypes.Name的值，此时我们需要F12查看Name的常量定义值是多少，如下：

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/54.png)

接下来则是获取声明Name的值，如下：

```C#
var sub = User.FindFirst(d => d.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name")?.Value;
```

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/55-1.png)

那么如果我们想要获取声明JwtRegisterClaimNames.Sub的值，我们是不是应该如上同样去获取呢？我们来试试。

```C#
var sub = User.FindFirst(d => d.Type == JwtRegisteredClaimNames.Sub)?.Value;
```

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/56.png)

此时我们发现为空没有获取到，这是为何呢？这是因为获取声明的方式默认是走微软定义的一套映射方式，如果我们想要走JWT映射声明，那么我们需要将默认映射方式给移除掉，在对应客户端Startup构造函数中，添加如下代码：

```C#
JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
```

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/57.png)

如果用过并熟悉IdentityServer4的童鞋关于这点早已明了，因为在IdentityServer4中映射声明比如用户Id即（sub）是使用的JWT，也就是说使用的JwtRegisteredClaimNames，此时我们再来获取Sub看看。

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/58.png)

所以以上对于初始化声明两种方式的探讨并没有用哪个更好，因为对于使用ClaimTypes是沿袭以往声明映射的方式，如果要出于兼容性考虑，可以结合两种声明映射方式来使用。接下来我们来看生成签名代码，生成签名是如下代码：

```C#
var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("1234567890123456"));
```

如上我们给出签名的Key是1234567890123456，是不是给定Key的任意长度皆可呢，显然不是，关于Key的长度至少是16，否则会抛出如下错误

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/59.png

接下来我们再来看实例化Token的参数，即如下代码：

```C#
var token = new JwtSecurityToken (
    issuer: "http://localhost:5000",
    audience: "http://localhost:5001",
    claims : claims,
    notBefore : DateTime.Now,
    expires : DateTime.Now.AddHours (1),
    signingCredentials : new SigningCredentials (key, SecurityAlgorithms.HmacSha256)
);
```

issuer代表颁发Token的Web应用程序，audience是Token的受理者，如果是依赖第三方来创建Token，这两个参数肯定必须要指定，因为第三方本就不受信任，如此设置这两个参数后，我们可验证这两个参数。要是我们完全不关心这两个参数，可直接使用JwtSecurityToken的构造函数来创建Token，如下：

```C#
var claims = new Claim[] {
    new Claim (ClaimTypes.Name, "Jeffcky"),
    new Claim (JwtRegisteredClaimNames.Email, "2752154844@qq.com"),
    new Claim (JwtRegisteredClaimNames.Sub, "D21D099B-B49B-4604-A247-71B0518A0B1C"),
    new Claim (JwtRegisteredClaimNames.Exp, $"{new DateTimeOffset(DateTime.Now.AddMilliseconds(1)).ToUnixTimeSeconds()}"),
    new Claim (JwtRegisteredClaimNames.Nbf, $"{new DateTimeOffset(DateTime.Now).ToUnixTimeSeconds()}")
};

var key = new SymmetricSecurityKey (Encoding.UTF8.GetBytes ("1234567890123456"));

var jwtToken = new JwtSecurityToken (new JwtHeader (new SigningCredentials (key, SecurityAlgorithms.HmacSha256)), new JwtPayload (claims));
```

这里需要注意的是Exp和Nbf是基于Unix时间的字符串，所以上述通过实例化DateTimeOffset来创建基于Unix的时间。到了这里，我们已经清楚的知道如何创建Token，接下来我们来使用Token获取数据。我们新建一个端口号为5001的Web应用程序，同时安装包 `Microsoft.AspNetCore.Authentication.JwtBearer` 接下来在Startup中ConfigureServices添加如下代码：

```C#
services.AddAuthentication (JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer (options => {
        options.TokenValidationParameters = new TokenValidationParameters {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey (Encoding.UTF8.GetBytes ("1234567890123456")),

            ValidateIssuer = true,
            ValidIssuer = "http://localhost:5000",

            ValidateAudience = true,
            ValidAudience = "http://localhost:5001",

            ValidateLifetime = true,

            ClockSkew = TimeSpan.FromMinutes (5)
        };
    });
```

如上述若Token依赖于第三方而创建，此时必然会配置issuer和audience，同时在我方也如上必须验证issuer和audience，上述我们也验证了签名，我们通过设置 ValidateLifetime  为true，说明验证过期时间而并非Token中的值，最后设置 ClockSkew  有效期为5分钟。对于设置 ClockSkew  除了如上方式外，还可如下设置默认也是5分钟。

```C#
ClockSkew = TimeSpan.Zero
```

如上对于认证方案我们使用的是 JwtBearerDefaults.AuthenticationScheme 即Bearer，除此之外我们也可以自定义认证方案名称，如下：

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/60.png)

最后别忘记添加认证中间件在Configure方法中，认证中间件必须放在使用MVC中间件之前，如下：

```C#
app.UseAuthentication ();

app.UseMvc (routes => {
    routes.MapRoute (
        name: "default",
        template: "{controller=Home}/{action=Index}/{id?}");
});
```

到了这里，我们通过端口为5000的Web Api创建了Token，并配置了端口号为5001的Web应用程序使用JWT认证，接下来最后一步则是调用端口号为5000的APi获取Token，并将Token设置到请求头中Authorization键的值，格式如下（注意Bearer后面有一个空格）：

```C#
('Authorization', 'Bearer ' + token);
```

我们在页面上放置一个按钮点击获取端口号为5000的Token后，接下来请求端口号为5001的应用程序，如下：

```js
$(function () {
    $('#btn').click(function () {
        $.get("http://localhost:5000/api/token").done(function (token) {
            $.ajax({
                type: 'get',
                contentType: 'application/json',
                url: 'http://localhost:5001/api/home',
                beforeSend: function (xhr) {
                    if (token !== null) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                    }
                },
                success: function (data) {
                    alert(data);
                },
                error: function (xhr) {
                    alert(xhr.status);
                }
            });
        });
    });
});
```

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/61.png)

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/62.png)




## 参考

1. 一篇不错的[教程](https://www.cnblogs.com/wyt007/p/11459547.html)和[示例代码](https://github.com/FlyLolo)
2. [JWT Token刷新方案](https://blog.csdn.net/m0_37809141/article/details/86572697)
3. [解决使用jwt刷新token带来的问题](https://segmentfault.com/a/1190000013151506)
4. [ASP.NET Core Web Api之JWT](https://www.cnblogs.com/CreateMyself/p/11123023.html)
5. [ASP.NET MVC使用Oauth2.0实现身份验证](https://blog.csdn.net/sD7O95O/article/details/78852449)
- [IdentityServer4官网](https://identityserver4.readthedocs.io/en/latest/index.html)

## 扩展

### ASP.NET页面之间传递值的方式

1、使用QueryString（get传值）

将客户端重定向到新的页面，只是简单地终止当前页面，并转入新的页面开始执行，对转入的页面无任何限制。数据直接在url中传递，可见，但可以加密，简单方便，不可传递大量数据，并不可传递对象

传值: `Response.Redirect("B.aspx?id="+x);`
接受: `textBox1.Text=Request.QueryString["id"].ToString();`

2、使用Session变量（会话）

Session对象为当前用户会话提供信息。全局变量，在整个应用程序都可以使用，会话关闭，Session失效。存储在服务器中，依靠cookie来运行，SessionID存放在cookie中。

由于Web应用程序对每个用户都会生成Session变量，因此它会随着用户数量的增多而加重服务器的负担。如果数据量比较小，Session对象是保存只需要在当前对话中保持的特定数据的极好位置。

```C#
Session["id"]=x;
textBox1.Text=Session["id"].ToString();
Session.Remove("id"); //清除Session变量
```

3、使用Server.Transfer（post传值）form

Src.aspx:

```C#
public string id { get { return TextBox1.Text; } } //定义公共属性
Server.Transfer("Dst.aspx"); //重定向到目标页面
```

Dst.aspx: //HTML中引入PreviousPageType指令

```aspx
<%@ PreviousPageType VirtualPath="~/Src.aspx"%>
```

```C#
//代码中获取Form数据
Label1.Text=PreviousPage.id;
Lable1.Text=Convert.ToString(Request.Form["txtusername"]);
```

终止当前页的执行，并为当前请求开始执行新的页面。把执行流程从当前页面转到同一服务器中的另一页面，但是新的页面仍然使用当前页面创建的应答流。

4、ViewState

保存原来页面中服务器控件视图状态的数据供新页面使用，存储在客户端，ViewState的工作原理是：作为一个隐藏的窗体字段在客户端和服务器之间传递

```C#
ViewState["id"]=TextBox1.Text; //数据存储
Label1.Text= ViewState["id"].ToString(); //数据取出
ViewState.Remove("id"); //数据移除
```

5、Cache的使用

需要设置缓存项优先级和缓存时间。

Src.aspx:

```C#
Cache["id"]=TextBox1.Text;
//---------------------------------------
Cache.Insert("id", x);
Response.Redirect("Dst.aspx");
```

Dst.aspx:

```C#
if(Cache["id"]!=null) Labell.Text=Cache["id"].ToString();
Cache.Remove("id"); //移除缓存项
```

如果Cache["id"]为空，则传值失败。


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
