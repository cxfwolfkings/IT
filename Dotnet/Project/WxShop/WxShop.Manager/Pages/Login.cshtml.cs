using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Linq;
using WxShop.Manager.Models;
using WxShop.Model;

namespace WxShop.Manager.Pages
{
    public class LoginModel : PageModel
    {
        private readonly WxShopContext _context;

        public LoginModel(WxShopContext context)
        {
            _context = context;
        }

        public IActionResult OnGet()
        {
            return Page();
        }

        [BindProperty]
        public AdminUser Admin { get; set; }

        public IActionResult OnPost()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }
            AdminUser loginUser = _context.Admins.FirstOrDefault(_ => _.UserName == Admin.UserName);
            if (loginUser != null)
            {
                if (loginUser.Password == Admin.Password)
                {
                    return RedirectToPage("./Main");
                }
                else
                {
                    ViewData.Add("loginFail", "密码错误！");
                }
            }
            else
            {
                ViewData.Add("loginFail", "用户名不存在！");
            }
            return Page();
        }
    }
}
