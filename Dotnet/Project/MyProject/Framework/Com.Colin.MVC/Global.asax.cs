#define Unity0

using Autofac;
using Autofac.Integration.Mvc;
using Com.Colin.BusinessLayer;
using System;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace Com.Colin.UI
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801
    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

#if Unity
            // 依赖注入初始化
            Bootstrapper.Initialise();
            //BusinessSettings.SetBusiness();

#else
            ContainerBuilder builder = new ContainerBuilder();
            Type baseType = typeof(IDependency);
            // 获取所有相关类库的程序集
            Assembly[] assemblies = new Assembly[] { Assembly.Load("Com.Colin.BusinessLayer") };
            builder.RegisterAssemblyTypes(assemblies)
                .Where(type => baseType.IsAssignableFrom(type) && !type.IsAbstract)
                .AsImplementedInterfaces().InstancePerLifetimeScope();//InstancePerLifetimeScope 保证对象生命周期基于请求

            /**
1、InstancePerDependency
对每一个依赖或每一次调用创建一个新的唯一的实例。这也是默认的创建实例的方式。

2、InstancePerLifetimeScope
在一个生命周期域中，每一个依赖或调用创建一个单一的共享的实例，且每一个不同的生命周期域，实例是唯一的，不共享的。

3、InstancePerMatchingLifetimeScope

在一个做标识的生命周期域中，每一个依赖或调用创建一个单一的共享的实例。打了标识了的生命周期域中的子标识域中可以共享父级域中的实例。若在整个继承层次中没有找到打标识的生命周期域，则会抛出异常：DependencyResolutionException。

4、InstancePerOwned

在一个生命周期域中所拥有的实例创建的生命周期中，每一个依赖组件或调用Resolve()方法创建一个单一的共享的实例，并且子生命周期域共享父生命周期域中的实例。若在继承层级中没有发现合适的拥有子实例的生命周期域，则抛出异常：DependencyResolutionException。

5、SingleInstance
每一次依赖组件或调用Resolve()方法都会得到一个相同的共享的实例。其实就是单例模式。

6、InstancePerHttpRequest
在一次Http请求上下文中,共享一个组件实例。仅适用于asp.net mvc开发。
            */

            builder.RegisterControllers(Assembly.GetExecutingAssembly());
            IContainer container = builder.Build();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
#endif
        }
    }
}