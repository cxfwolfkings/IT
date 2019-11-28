using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Memory;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Com.Colin.Core.Repositories;
using System;
using System.Collections.Generic;
using System.IO;

namespace Com.Colin.Core
{
    /// <summary>
    /// 程序入口，控制台程序
    /// </summary>
    public class Program
    {
        public static void Main1(string[] args)
        {
            BuildWebHost(args).Run();
            Console.ReadLine();
        }
        
        /// <summary>
        /// BuildWebHost这个lambda表达式最好不要整合到Main方法里面，因为Entity Framework 2.0会使用它，
        /// 如果把这个lambda表达式去掉之后，Add-Migration这个命令可能就不好用了!!!
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .Build();

        /// <summary>
        /// 1、读取字典配置
        /// </summary>
        private static void Init1()
        {
            IDictionary<string, string> source = new Dictionary<string, string>()
             {
                 ["Ele1"] = "value1",
                 ["Ele2:Sub1"] = "value2.1",
                 ["Ele2:Sub2"] = "value2.2"
            };
            /**
             * 将一个字典作为配置源读入到config配置对象里，通过键可以读取到对应的值。
             * 在大多数情况下，项目里的配置都是多层结构的，也可以称为是结构化的。
             * 在这个例子里，字典内容描述了一个具有两层结构的配置，第一层有Ele1和Ele2两个节点，分别对应一个字符内容和一个复合内容，
             * 第二层有Sub1和Sub2两个节点，同时挂在Ele2节点下，组成了一个复合结构。
             */
            IConfiguration config = new ConfigurationBuilder().Add(
                new MemoryConfigurationSource() { InitialData = source }).Build();

            // config对象通过GetSection方法来获取当前节点的某个下级节点内容。
            Console.WriteLine($"Ele1: {config["Ele1"]}");
            Console.WriteLine($"Ele2.Sub1: {config.GetSection("Ele2")["Sub1"]}");
            Console.WriteLine($"Ele2.Sub2: {config.GetSection("Ele2")["Sub2"]}");
        }

        /// <summary>
        /// 2、读取JSON
        /// </summary>
        private static void Init2()
        {
            IConfigurationBuilder builder = new ConfigurationBuilder();
            builder.SetBasePath(Directory.GetCurrentDirectory());
            builder.AddJsonFile("appsettings.json");
            IConfiguration config = builder.Build();

            Console.WriteLine($"Ele1: {config["Ele1"]}");
            Console.WriteLine($"Ele2.Sub1: {config.GetSection("Ele2")["Sub1"]}");
            Console.WriteLine($"Ele2.Sub2: {config.GetSection("Ele2")["Sub2"]}");
        }

        /// <summary>
        /// 3、Options对象映射
        /// </summary>
        private static void Init3()
        {
            // 在定义Options对象结构时，对象内的属性名称要与对应层级的配置Key的值保持一致，层级关系也要与配置内容的层级结构保持一致。
            // 创建DI容器，注册Options Pattern服务
            IServiceCollection services = new ServiceCollection();
            // 通过调用 services.AddOptions() 方法注册Options Pattern服务。
            services.AddOptions();
            // 读取配置文件
            IConfigurationBuilder builder = new ConfigurationBuilder();
            builder.SetBasePath(Directory.GetCurrentDirectory());
            builder.AddJsonFile("appsettings.json");
            IConfiguration config = builder.Build();
            // 通过注册的服务获取最终映射的配置对象
            // 将配置内容注册到容器里，来获取对应的服务Provider对象。
            IServiceProvider serviceProvider = services.Configure<ConfigOptions>(config).BuildServiceProvider();
            // 通过调用GetService方法获得对应的真实服务对象，即带有事先定义的Options类型的泛型接口IOptions，接口的Value值就是配置内容映射的Options对象。
            ConfigOptions options = serviceProvider.GetService<IOptions<ConfigOptions>>().Value;
        }

        /// <summary>
        /// 除了在 ConfigureServices 方法里进行注册外，还可以在 Main 函数里进行注册，
        /// 等效于 Startup.cs 的 ConfigureServices 方法
        /// </summary>
        private static void Regist()
        {
            var host = new WebHostBuilder()
                .UseKestrel()
                .ConfigureServices(services =>
                {
                    // 注册接口和实现类的映射关系
                    services.AddScoped<IUserRepository, UserRepository>();
                })
                .UseStartup<Startup>()
                .Build();
            host.Run();
        }

        /// <summary>
        /// 当构造函数有多个，并且参数列表不同时，框架又会采用哪一个构造函数创建实例呢？
        /// </summary>
        private static void DI()
        {
            // 
            // 为了更好的演示，新建一个.Net Core控制台程序，引用下面两个nuget包。DI容器正是通过这两个包来实现的。
            // > dotnet add package Microsoft.Extensions.DependencyInjection
            // > dotnet add package Microsoft.Extensions.DependencyInjection.Abstractions
            IServiceCollection services = new ServiceCollection();
            services.AddScoped<ITestOne, TestOne>()
                .AddScoped<ITestTwo, TestTwo>()
                .AddScoped<ITestThree, TestThree>()
                .AddScoped<ITestApp, TestApp>()
                .BuildServiceProvider()
                .GetService<ITestApp>();
        }

        /// <summary>
        /// IIS托管
        /// </summary>
        private static void Build()
        {
            var host = new WebHostBuilder()
                .UseKestrel()
                .UseIISIntegration()
                .UseStartup<Startup>()
                .Build();
        }
    }

    #region 测试类，用来测试依赖注入使用哪一个构造器
    public interface ITestOne { }
    public interface ITestTwo { }
    public interface ITestThree { }

    public class TestOne : ITestOne { }

    public class TestTwo : ITestTwo { }
    public class TestThree : ITestThree { }

    public interface ITestApp { }
    public class TestApp : ITestApp
    {
        // No.1
        public TestApp(ITestOne testOne)
        {
            Console.WriteLine($"TestApp({testOne})");
        }
        // No.2
        public TestApp(ITestOne testOne, ITestTwo testTwo)
        {
            Console.WriteLine($"TestApp({testOne}, {testTwo})");
        }
        // No.3
        public TestApp(ITestOne testOne, ITestTwo testTwo, ITestThree testThree)
        {
            Console.WriteLine($"TestApp({testOne}, {testTwo}, {testThree})");
        }
        // No.4
        public TestApp(ITestTwo testTwo, ITestThree testThree)
        {
            Console.WriteLine($"TestApp({testTwo}, {testThree})");
        }
    }
    #endregion

    #region 测试类，用来测试Options对象映射
    public class ConfigOptions
    {
        public string Ele1 { get; set; }
        public SubConfigOptions Ele2 { get; set; }
    }
  
    public class SubConfigOptions
    {
        public string Sub1 { get; set; }
        public string Sub2 { get; set; }
    }
    #endregion

}
