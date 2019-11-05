using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(EIM.Web.Startup))]
namespace EIM.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
