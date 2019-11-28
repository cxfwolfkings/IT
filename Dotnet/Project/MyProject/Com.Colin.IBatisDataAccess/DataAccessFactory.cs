using System.IO;

namespace Com.Colin.IbatisDataAccess
{
    public class DataAccessFactory
    {
        public static IDataAccess Instance()
        {
            return Instance("");
        }

        public static IDataAccess Instance(string sqlMapConfig)
        {
            return DataAccessHelp.Create(sqlMapConfig);
        }

        public static IDataAccess Instance(Stream sqlMapConfigStream, string fileName)
        {
            return DataAccessHelp.Create(sqlMapConfigStream, fileName);
        }
    }
}
