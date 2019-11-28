using System.Data.Entity;

namespace Com.Colin.EfDataAccess
{
    public class DatabaseSettings
    {
        public static void SetDatabase()
        {
            Database.SetInitializer(new DropCreateDatabaseIfModelChanges<TestContext>());
        }
    }
}
