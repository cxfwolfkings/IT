using BI.Data;
using BI.Jobs;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Quartz;
using Quartz.Impl;
using Quartz.Spi;

namespace BI
{
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
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("DefaultConnection")));
            services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddEntityFrameworkStores<ApplicationDbContext>();
            services.AddControllersWithViews();
            services.AddRazorPages();

            // 注入 定时任务job
            services.AddSingleton<QuartzController>();
            services.AddTransient<QuartzJob1>();
            services.AddSingleton<ISchedulerFactory, StdSchedulerFactory>(); // 注册ISchedulerFactory的实例。
            services.AddSingleton<IJobFactory, JobFactory1>();

            // 添加TimedJob服务
            //services.AddTimedJob();

            // 注册Quartzjob并启动
            var quartz = services.BuildServiceProvider().GetService<QuartzController>();
            quartz.Start();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env,
            IHostApplicationLifetime appLifetime)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            // 注册Quartzjob
            var quartz = app.ApplicationServices.GetRequiredService<QuartzController>();
            // 在这里启动，Ioc注册的类会处于Scope外
            //appLifetime.ApplicationStarted.Register(() =>
            //{
            //    quartz.Start();
            //});
            appLifetime.ApplicationStopped.Register(() =>
            {
                quartz.Stop();
            });

            // 使用TimeJob
            //app.UseTimedJob();

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
            });
        }
    }
}
