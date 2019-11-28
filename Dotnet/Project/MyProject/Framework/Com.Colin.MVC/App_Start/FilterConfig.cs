using System.Web.Mvc;

namespace Com.Colin.UI
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            /*
            filters.Add(new HandleErrorAttribute()
            {
                ExceptionType = typeof(DivideByZeroException),
                View = "DivideError"
            });
            filters.Add(new HandleErrorAttribute()
            {
                ExceptionType = typeof(NotFiniteNumberException),
                View = "NotFiniteError"
            });
            */
            filters.Add(new HandleErrorAttribute()); // ExceptionFilter           
        }
    }
}