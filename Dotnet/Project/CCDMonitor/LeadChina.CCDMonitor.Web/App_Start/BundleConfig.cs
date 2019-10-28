using System.Web.Optimization;

namespace LeadChina.CCDMonitor.Web
{
    /// <summary>
    /// 捆绑配置
    /// </summary>
    public class BundleConfig
    {
        /// <summary>
        /// 有关捆绑的详细信息，请访问 https://go.microsoft.com/fwlink/?LinkId=301862
        /// </summary>
        /// <param name="bundles"></param>
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/gentelella").Include(
                "~/js/lib/jquery.js",
                "~/js/lib/bootstrap.js",
                "~/js/lib/fastclick.js",
                "~/js/lib/moment-with-locales.js",
                "~/js/lib/daterangepicker.js",
                "~/js/lib/bootstrap-datetimepicker.js",
                "~/js/app/custom.js"));

            bundles.Add(new StyleBundle("~/mycss").Include(
                      "~/static/css/bootstrap.min.css",
                      "~/static/font-awesome/css/font-awesome.css",
                      "~/static/css/animate.css",
                      "~/static/css/daterangepicker.css",
                      "~/static/css/bootstrap-datetimepicker.css",
                      "~/static/css/custom.css"));
        }
    }
}
