using Com.Colin.UI.Models;
using System.Web.Mvc;

namespace Com.Colin.UI.Controllers
{
    public class SubmitDataController : Controller
    {
        // GET: SubmitData
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult CreateMenu()
        {
            return View();
        }

        [HttpPost]
        public ActionResult CreateMenu(Menu m)
        {
            //var m = new Menu { Id = id, Text = text, Price = price };
            ViewBag.Info = string.Format(
                "menu created: {0}, Price: {1}, category: {2}", m.Text, m.Price,
                m.Category);
            return View("Index");
        }
    }
}