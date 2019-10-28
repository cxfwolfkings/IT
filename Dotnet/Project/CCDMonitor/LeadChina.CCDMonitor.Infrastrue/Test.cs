using LeadChina.CCDMonitor.Infrastrue.Entity;
using ServiceStack.OrmLite;
using ServiceStack.Text;

namespace LeadChina.CCDMonitor.Infrastrue
{
    public class Test
    {
        public static void tst()
        {
            var dbFactory = new OrmLiteConnectionFactory("server = localhost;port=3306;User Id = root;password = root;Database = lgccd", MySqlDialect.Provider);
            using (var db = dbFactory.Open())
            {
                var roles = db.Select<WorkshopEntity>();
                "Roles: {0}".Print(roles.Dump());
            }
        }
    }
}
