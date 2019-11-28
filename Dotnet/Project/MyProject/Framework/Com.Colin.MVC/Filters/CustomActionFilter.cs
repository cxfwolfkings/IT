using System.Diagnostics;
using System.Linq;
using System.Web.Mvc;

namespace Com.Colin.UI.Filters
{
    public class CustomActionFilter : ActionFilterAttribute
    {
        private Stopwatch timer;

        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            timer.Stop();
            filterContext.HttpContext.Response.Write(
                string.Format("<div>Action method elapsed time: {0}</div>",
                timer.Elapsed.TotalSeconds));
        }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (filterContext.HttpContext.Request.Headers.AllKeys.Contains("token"))
            {

            }
            timer = Stopwatch.StartNew();
        }
    }
}