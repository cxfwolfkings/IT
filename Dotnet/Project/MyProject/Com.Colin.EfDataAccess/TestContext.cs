using Com.Colin.Model;
using System.Data.Entity;

namespace Com.Colin.EfDataAccess
{
    public class TestContext : DbContext
    {
        /// <summary>
        /// Code First 时使用
        /// 控制台应用程序需要调用这个构造器
        /// </summary>
        // public TestContext() { }

        /// <summary>
        /// 1. 假设 connString = "TestContext"
        ///    Code First 时使用，新建数据库，并命名为 TestContext
        /// 2. 假设 connString = "name = TestContext"
        ///    会在 app.config 或者 web.config 文件中查找对应节，做为连接字符串
        ///    但数据库中必须已存在表，即不会重新创建表，这种方法类似 DataBase First
        /// 备注：数据库中如果有历史记录表，则必须删除它才能使用 DataBase First
        /// </summary>
        public TestContext() : base("name = TestContext") { } 

        public DbSet<AnimalModel> Animals { get; set; }
        public DbSet<SpeciesModel> Specieses { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AnimalModel>().ToTable("T_Animal");
            modelBuilder.Entity<SpeciesModel>().ToTable("T_Species");
            base.OnModelCreating(modelBuilder);
        }
    }
}
