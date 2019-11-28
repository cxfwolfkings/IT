using System.Diagnostics;
using System.Web.Mvc;

namespace Com.Colin.UI.Filters
{
    public class CustomResultFilter : IResultFilter
    {
        private Stopwatch timer;
        public void OnResultExecuted(ResultExecutedContext filterContext)
        {
            timer = Stopwatch.StartNew();
        }

        public void OnResultExecuting(ResultExecutingContext filterContext)
        {
            timer.Stop();
            filterContext.HttpContext.Response.Write(
                string.Format("<div>Result elapsed time: {0}</div>",
                timer.Elapsed.TotalSeconds));
        }
    }
}