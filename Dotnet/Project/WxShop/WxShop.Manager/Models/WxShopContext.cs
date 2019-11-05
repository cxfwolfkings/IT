using Microsoft.EntityFrameworkCore;
using WxShop.Model;

namespace WxShop.Manager.Models
{
    public class WxShopContext: DbContext
    {
        public WxShopContext(DbContextOptions<WxShopContext> options)
                : base(options)
        {
        }

        public DbSet<AdminUser> Admins { get; set; }
        public DbSet<ProductTypeModel> ProductTypes { get; set; }
    }
}
