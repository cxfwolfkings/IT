using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Text.Encodings.Web;
using System.Text.Unicode;
using WxShop.Manager.Models;

namespace WxShop.Manager
{
    /// <summary>
    /// The Startup class configures how the application will handle HTTP requests and responses, configures any needed services, and sets up the dependency injection container.
    /// The class name can be anything, as long as it matches the UseStartup<T> line in the configuration of the WebHostBuilder, but the convention is to name the class Startup.cs
    /// </summary>
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //解决中文被编码  
            services.AddSingleton(HtmlEncoder.Create(UnicodeRanges.All));
            services.AddDbContext<WxShopContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("WxShopContext")));
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });
        }
    }
}
