using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using System;

namespace WxShop.DBManager.EF
{
    public class WxShopContext : DbContext
    {
        internal WxShopContext()
        {

        }

        /// <summary>
        /// EF Core通过DbContextOptions的实例配置容器
        /// EF中是传递一个连接字符串
        /// </summary>
        /// <param name="options"></param>
        public WxShopContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var connectionString = @"Data Source=.;Initial Catalog=WxShopDB;uid=sa;password=Sa123456;MultipleActiveResultSets=True;Connection Timeout=30;MultipleActiveResultSets=True;App=EntityFramework;";
                optionsBuilder.UseSqlServer(connectionString, options => options.EnableRetryOnFailure())
                    .ConfigureWarnings(warnings => warnings.Throw(RelationalEventId.QueryClientEvaluationWarning));
            }
        }

        public DbSet<WxShop.Model.ProductModel> Products { get; set; }
        public DbSet<WxShop.Model.ProductTypeModel> ProductTypes { get; set; }
        public DbSet<WxShop.Model.ProductImageModel> ProductImages { get; set; }

        public string GetTableName(Type type)
        {
            return Model.FindEntityType(type).SqlServer().TableName;
        }
    }
}
