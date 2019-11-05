using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;
using System.Linq;
using WxShop.Manager.Models;
using WxShop.Model;

namespace WxShop.Manager.Pages
{
    public class MainModel : PageModel
    {
        private readonly WxShopContext _context;

        public MainModel(WxShopContext context)
        {
            _context = context;
        }

        public void OnGet()
        {
            
        }

        public JsonResult GetProdType()
        {
            List<ProductTypeModel> list = _context.ProductTypes.ToList();
            return new JsonResult(list);
        }
    }
}
