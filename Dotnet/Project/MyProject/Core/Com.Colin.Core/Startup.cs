using Autofac; 
using Autofac.Extensions.DependencyInjection; 
using Com.Colin.Core.Middlewares; 
using Com.Colin.Core.Filters; 
using Com.Colin.Core.Repositories; 
using Com.Colin.Core.Test; 
using Microsoft.AspNetCore.Builder; 
using Microsoft.AspNetCore.Hosting; 
using Microsoft.AspNetCore.Http; 
using Microsoft.Extensions.Configuration; 
using Microsoft.Extensions.DependencyInjection; 
using Microsoft.Extensions.Logging; 
using NLog.Extensions.Logging; 
using NLog.Web; 
using System; 
using System.IO; 
using System.Text; 

namespace Com.Colin.Core {
    /// <summary>
    /// Startup算是程序真正的切入点
    /// </summary>
    public class Startup {
        // 通过依赖注入环境对象
        public Startup(IHostingEnvironment env) {
            // 读取默认配置文件
            var builder = new ConfigurationBuilder()
                 .SetBasePath(Directory.GetCurrentDirectory())
                 .AddJsonFile("appsettings.json"); 
             Configuration = builder.Build(); 
             // 通过实例的EnvironmentName属性可以获取到 ASPNETCORE_ENVIRONMENT 环境变量的值，
             // 同时也可以通过IsDevelopment、IsStaging和IsProduction方法快速判断属性值。
             System.Console.WriteLine($"Current State: {env.EnvironmentName}"); 
             System.Console.WriteLine($"Development State: {env.IsDevelopment()}"); 
             System.Console.WriteLine($"Staging State: {env.IsStaging()}"); 
             System.Console.WriteLine($"Production State: {env.IsProduction()}"); 
        }

        public Startup(IConfiguration configuration) {
            Configuration = configuration; 
        }

        public IConfiguration Configuration {get; }

        // Development环境下执行的ConfigureServices方法
        public void ConfigureDevelopmentServices(IServiceCollection services) {
            System.Console.WriteLine($"ConfigureDevelopmentServices Excuted."); 
        }
 
        // Development环境下执行的Configure方法
        public void ConfigureDevelopment(IApplicationBuilder app, ILoggerFactory loggerFactory, IHostingEnvironment env) {
            app.Run(async context =>  {
                await context.Response.WriteAsync("ConfigureDevelopment Excuted."); 
            }); 
        }

        /// <summary>
        /// This method gets called by the runtime. Use this method to add services to the container.
        /// ConfigureServices方法是用来把services（各种服务，例如identity, ef, mvc等等包括第三方的，或者自己写的）加入(register)到container(asp.net core的容器)中去, 并配置这些services。
        /// 这个container是用来进行dependency injection的（依赖注入）。所有注入的services（此外还包括一些框架已经注册好的services）在以后写代码的时候，都可以将它们注入(inject)进去。
        /// </summary>
        /// <param name="services"></param>
        public IServiceProvider ConfigureServices(IServiceCollection services) {
            // 注入MVC框架
            //services.AddMvc();

            // 作为全局过滤器添加到MVC框架内
            services.AddMvc(options =>  {
                //options.Filters.Add(new MyActionFilterAttribute());
                
                // 同时分别注册全局过滤器、标识控制器过滤器和方法过滤器
                options.Filters.Add(new MyActionFilterAttribute("Global")); 

                // 也可以通过类型进行注册
                // Authorization Filters -> Resource Filters -> Action Filters -> Exception Filters -> Result Filters
                options.Filters.Add(typeof(SimpleResourceFilterAttribute)); 
                options.Filters.Add(typeof(SimpleActionFilterAttribute)); 
                options.Filters.Add(typeof(SimpleExceptionFilterAttribute)); 
                options.Filters.Add(typeof(SimpleResultFilterAttribute)); 
            }); 

            // 将过滤器类型添加到DI容器里
            // MyActionFilterAttribute构造器（1个参数）使用
            services.AddScoped<MyActionFilterAttribute>(); 

            // 注册接口和实现类的映射关系
            // 通过AddScoped方法，指定接口和实现类的映射关系，注册到DI容器里。在控制器里，通过构造方法将具体的实现注入到对应的接口上，即可在控制器里直接调用了
            services.AddScoped<IUserRepository, UserRepository>(); 
            
            // autofac容器
            var containerBuilder = new ContainerBuilder(); 
            containerBuilder.RegisterType < TestInstance > ().As < ITestTransient > ().InstancePerDependency(); 
            containerBuilder.RegisterType < TestInstance > ().As < ITestScoped > ().InstancePerLifetimeScope(); 
            containerBuilder.RegisterType < TestInstance > ().As < ITestSingleton > ().SingleInstance(); 
            containerBuilder.RegisterType < TestService > ().AsSelf().InstancePerDependency(); 
            containerBuilder.Populate(services); 

            var container = containerBuilder.Build(); 
            return container.Resolve < IServiceProvider > (); 
        }

        /// <summary>
        /// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// Configure方法的参数app, env, loggerFactory都是注入进去的services。
        /// Configure方法是asp.net core程序用来具体指定如何处理每个http请求的，例如我们可以让这个程序知道我使用mvc来处理http请求，那就调用app.UseMvc()这个方法就行。
        /// 这几个方法的调用顺序: Main -> ConfigureServices -> Configure
        /// </summary>
        /// <param name="app"></param>
        /// <param name="env"></param>
        /// <param name="loggerFactory">可选</param>
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory) {
            #region 添加日志支持

            #region Logger
            // 设置日志最小级别Warning
            //loggerFactory.AddConsole(LogLevel.Warning);
            //loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            //loggerFactory.AddDebug(); 

            /*
             appsettings.json：
             首先是IncludeScopes属性，如果设置为true，意味着我们希望针对它的日志记录会在一个预先创建的日志上下文范围中执行，输出到控制台的日志消息会包含当前上下文范围的信息。什么意思？
             如下面的代码片段所示，我们按照依赖注入的方式创建了一个注册有ConsoleLoggerProvider的LoggerFactory，并创建了一个Logger对象。
             在调用注册ConsoleLoggerProvider的AddConsole方法时，我们传入True作为参数，意味着提供的ConsoleLogger会在当前的日志上下文范围中进行日志记录（它的IncludeScope属性被设置为True）。
             我们通过Logger对象记录了两条针对同一笔订单的日志，两次日志记录所在的上下文范围是调用BeginScope方法根据指定的订单ID创建的。
             这段程序执行之后会在控制台上输出如下所示的两条日志消息：
             warn：订单：20160520001
                   商品库存不足...
             error：订单：20160520001
                    商品ID录入错误...
             
             接着"Debug"和"Console"表示不同的logger类型。
             "LogLevel"代表日志界别，"Default"是默认，"System"、"Microsoft"分别表示对应package(System.xxx, Microsoft.xxx)的日志输出级别。
             注意：配置文件中的设置比代码中的优先级高。并且如果配置文件中设置的Loglevel为None，不会有日志输出！
             所以想要设置日志输出级别，最好只采用配置文件的方式。
             */
            /*
            ILogger logger = new ServiceCollection()
                .AddLogging()
                .BuildServiceProvider()
                .GetService<ILoggerFactory>()
                .AddConsole(true)
                .CreateLogger("App");  

            using (logger.BeginScope("订单: {ID}", "20160520001"))
            {
                logger.LogWarning("商品库存不足(商品ID: {0}, 当前库存:{1}, 订购数量:{2})", "9787121237812", 20, 50);
                logger.LogError("商品ID录入错误(商品ID: {0})", "9787121235368");
            }
            */

            // 或者，使用Filter设置日志级别
            loggerFactory.WithFilter(new FilterLoggerSettings() { {"Microsoft", LogLevel.Warning }
            })
            .AddConsole().AddDebug(); 
            #endregion

            #region NLog
            /* 
            // 这是为了防止中文乱码
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance); 
            // 添加日志支持
            loggerFactory.AddNLog(); 
            // needed for non-NETSTANDARD platforms: configure nlog.config in your project root
            env.ConfigureNLog("nlog.config");  */
            #endregion

            #endregion

            #region 添加自定义Middleware（中间件）

            #region run
            /* 
            app.Run(async context =>
            {
                await context.Response.WriteAsync("Hello World!");
            });
            app.Run(async context =>
            {
                await context.Response.WriteAsync("Hello World too!");
            });
            */
            // 启动调试，发现页面上只有Hello World!字样。
            // Run这种用法表示注册的此中间件为管道内的最后一个中间件，由它处理完请求后直接返回。
            #endregion

            #region use
            /* 
            app.Use(async (context, next) =>
            {
                await context.Response.WriteAsync("Hello World!\n");
                await next();
            });
            app.Use(async (context, next) =>
            {
                await context.Response.WriteAsync("Hello World too!\n");
            });
            */
            // 通过Use方法注册的中间件，如果不调用next方法，效果等同于Run方法。当调用next方法后，此中间件处理完后将请求传递下去，由后续的中间件继续处理。
            // 中间件有处理顺序。
            // 中间件的处理逻辑比较复杂时，可以用单独文件编写中间件对象。调用方法如下
            //app.UseMiddleware<HelloworldMiddleware>();
            //app.UseMiddleware<HelloworldTooMiddleware>();
            #endregion

            #region map
            // Map方法通过类似路由的机制，将特定的Url地址请求引导到固定的方法里，由特定的中间件处理
            //app.Map("/test", MapTest);
            // 另外，Map方法还可以实现多级Url路由，其实就是Map方法的嵌套使用
            /* 
            app.Map("/level1", lv1App =>  {
                lv1App.Map("/level1.1", lv11App =>  {
                    // /level1/level1.1
                    lv11App.Run(async context =>  {
                        await context.Response.WriteAsync("level1.1"); 
                    }); 
                }); 
                lv1App.Map("/level1.2", lv12App =>  {
                    // /level1/level1.2
                    lv12App.Run(async context =>  {
                        await context.Response.WriteAsync("level1.2"); 
                    }); 
                }); 
            });  */
            // 也可以通过MapWhen方法使用自定义条件进行"路由"
            /* 
            app.MapWhen(context =>
            {
                return context.Request.Query.ContainsKey("a");
            }, MapTest);
            */
            #endregion

            // 添加自定义日志中间件
            //app.UseVisitLogger();
            #endregion

            // 添加MVC中间件，为了支持路由特性（attribute routing）。不加这句，通过特性标注的路由全部无效！
            app.UseMvc(); 
        }

        private static void MapTest(IApplicationBuilder app) {
            app.Run(async context =>  {
                await context.Response.WriteAsync($"Url is {context.Request.PathBase.ToString()}{context.Request.QueryString.Value}"); 
            }); 
        }
    }

}
