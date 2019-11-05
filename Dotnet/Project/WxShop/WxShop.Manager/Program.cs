using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Reflection;
using WxShop.Manager.Models;

namespace WxShop.Manager
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var webHost = BuildWebHost(args);
            /**
             * The Program.cs file is where data initialization should occur. This is where the data initializer will be executed. 
             * Start by adding the following using statements to the top of the Program.cs file
             * 
             * The code gets the scope of the DI container and uses that to get the WxShopContext from the container.
             * It then calls the methods to drop and re-create the database and then adds the test data.
             */
            using (var scope = webHost.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var context = services.GetRequiredService<WxShopContext>();
                MyDataInitializer.RecreateDatabase(context);
                MyDataInitializer.InitializeData(context);
            }
            // The WebHostBuilder is given the Run() command to activate the web host.
            webHost.Run();
        }

        /// <summary>
        /// The UseStartup method sets the configuration class to Startup.cs and then builds the WebHostBuilder instance, fully configured for the application.
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args) 
                .UseStartup<Startup>()
                .Build();

        /// <summary>
        /// The CreateDefaultBuilder() method compacts the usual setup into one method call
        /// The preceding code demonstrates the modularity of ASP.NET Core and the opt-in nature of its services.
        /// After creating a new instance of the WebHostBuilder, the code enables just the features that the application needs.
        /// 
        /// This is a change from the previous versions of ASP.NET Core, where all the configuration code was processed in the Startup.cs class and not in Main.
        /// It was moved to Main to make the Startup.cs class cleaner and hold closer to the single responsibility principle.
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        public static IWebHostBuilder CreateDefaultBuilder(string[] args)
        {
            return new WebHostBuilder()
                .UseKestrel() // The Kestrel web server is enabled
                .UseContentRoot(Directory.GetCurrentDirectory()) // The root directory for content is set as the project directory
                .ConfigureAppConfiguration( // The next code block configures the application and demonstrates how to use the different JSON files based on the currently executing environment.
                    (hostingContext, config) =>
                   {
                       IHostingEnvironment hostingEnvironment = hostingContext.HostingEnvironment;
                       config.AddJsonFile("appsettings.json", true, true).AddJsonFile(
                           string.Format("appsettings.{0}.json", hostingEnvironment.EnvironmentName), true, true);
                       if (hostingEnvironment.IsDevelopment())
                       {
                           Assembly assembly = Assembly.Load(new AssemblyName(hostingEnvironment.ApplicationName));
                           if (assembly != null)
                               config.AddUserSecrets(assembly, true);
                       }
                       config.AddEnvironmentVariables();
                       if (args == null)
                           return;
                       config.AddCommandLine(args);
                   })
                    .ConfigureLogging((hostingContext, logging) =>
               {
                   logging.AddConfiguration(hostingContext.Configuration.GetSection("Logging"));
                   logging.AddConsole();
                   logging.AddDebug();
               })
                .UseIISIntegration() // After configuring the application and logging, IIS integration is added (in addition to Kestrel).
                .UseDefaultServiceProvider( // Finally, the default service provider for dependency injection is configured.
                (context, options) => options.ValidateScopes = context.HostingEnvironment.IsDevelopment());
        }
    }
}
