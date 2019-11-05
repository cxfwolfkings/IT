using System;
using System.Web;

namespace Wind.Wechat.Star
{
    public class MyModule1 : IHttpModule
    {
        /// <summary>
        /// You will need to configure this module in the Web.config file of your
        /// web and register it with IIS before being able to use it. For more information
        /// see the following link: https://go.microsoft.com/?linkid=8101007
        /// </summary>
        #region IHttpModule Members

        public void Dispose()
        {
            //clean-up code here.
        }

        public void Init(HttpApplication context)
        {
            // Below is an example of how you can handle LogRequest event and provide 
            // custom logging implementation for it
            context.LogRequest += new EventHandler(OnLogRequest);
        }

        #endregion

        public void OnLogRequest(Object source, EventArgs e)
        {
            //custom logging logic can go here
        }
    }

    public class HttpModule1 : IHttpModule
    {
        public void Dispose()
        {

        }
        public void Init(HttpApplication context)
        {
            context.BeginRequest += (sender, e) =>
            {
                context.Response.Write("HttpModule1 request begin....<br />");
            };

            context.EndRequest += (sender, e) =>
            {
                context.Response.Write("HttpModule1 request end!<br />");
            };
        }
    }

    public class HttpModule2 : IHttpModule
    {
        public void Dispose()
        {

        }

        public void Init(HttpApplication context)
        {
            context.BeginRequest += (sender, e) =>
            {
                context.Response.Write("HttpModule2 request begin....<br />");
            };

            context.EndRequest += (sender, e) =>
            {
                context.Response.Write("HttpModule2 request end!<br />");
            };
        }
    }

    public class HttpModule3 : IHttpModule
    {
        public void Dispose()
        {

        }

        public void Init(HttpApplication context)
        {
            context.BeginRequest += (sender, e) =>
            {
                context.Response.Write("HttpModule3 request begin....<br />");
            };
            context.EndRequest += (sender, e) =>
          {
              context.Response.Write("HttpModule3 request end!<br />");
          };
        }
    }
}
