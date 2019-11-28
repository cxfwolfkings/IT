using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Com.Colin.UI.Startup))]
namespace Com.Colin.UI
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}