using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace WxShop.DBManager.EF
{
    public class WxShopContextFactory : IDesignTimeDbContextFactory<WxShopContext>
    {
        public WxShopContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<WxShopContext>();
            var connectionString = @"Data Source=.;Initial Catalog=WxShopDB;uid=sa;password=Sa123456;MultipleActiveResultSets=True;Connection Timeout=30;MultipleActiveResultSets=True;App=EntityFramework;";
            optionsBuilder.UseSqlServer(connectionString, options => options.EnableRetryOnFailure())
                .ConfigureWarnings(warnings => warnings.Throw(RelationalEventId.QueryClientEvaluationWarning));
            return new WxShopContext(optionsBuilder.Options);
        }
    }
}
