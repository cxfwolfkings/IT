using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WxShop.Service.Interface;
using WxShop.Fronted.Models;
using WxShop.Model;
using LinqKit;

namespace WxShop.Fronted.Controllers
{
    public class MainController : Controller
    {
        private IWxShopService service;

        public MainController(IWxShopService service)
        {
            this.service = service;
        }

        public IActionResult Index()
        {
            MainViewModel model = new MainViewModel();
            model.ProductTypes = service.GetProductTypes();
            var predicate = PredicateBuilder.New<ProductImageModel>(true);
            model.MainPicList = service.GetProductImages(predicate);
            var predicate1 = PredicateBuilder.New<ProductModel>(true);
            model.Products = service.GetProducts(predicate1);
            return View(model);
        }
    }
}