using Com.Colin.BusinessLayer;
using Microsoft.Practices.Unity;
using System.Web.Mvc;
using Unity.Mvc4;

namespace Com.Colin.UI
{
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

            // ���ӳ���ϵ��ʹ�������ļ�
            // UnityConfigurationSection configuration = (UnityConfigurationSection)ConfigurationManager.GetSection(UnityConfigurationSection.SectionName);
            // configuration.Configure(container, "defaultContainer");

            // e.g. container.RegisterType<ITestService, TestService>();    
            RegisterTypes(container);

            return container;
        }

        public static void RegisterTypes(IUnityContainer container)
        {
            container.RegisterType<IAnimalRepository, AnimalRepository>();
        }
    }
}