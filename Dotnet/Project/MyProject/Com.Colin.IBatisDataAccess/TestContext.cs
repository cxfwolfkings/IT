using Com.Colin.Lib;
using IBatisNet.Common.Utilities;
using IBatisNet.DataMapper;
using IBatisNet.DataMapper.Configuration;
using System;
using System.Collections.Generic;
using System.IO;

namespace Com.Colin.IbatisDataAccess
{
    public class TestContext
    {
        private static volatile Dictionary<string, ISqlMapper> _mappers = new Dictionary<string, ISqlMapper>();

        protected static void Configure(object obj)
        {

        }

        /// <summary>
        /// 实现IBatis接口
        /// </summary>
        /// <param name="connectConfig"></param>
        protected static ISqlMapper InitMapper(string sqlMapConfig)
        {

            ConfigureHandler handler = new ConfigureHandler(Configure);
            DomSqlMapBuilder builder = new DomSqlMapBuilder();

            ISqlMapper mp = null;
            try
            {
                if (_mappers.ContainsKey(sqlMapConfig))
                {
                    mp = _mappers[sqlMapConfig];
                }
                else
                {

                    mp = builder.ConfigureAndWatch(sqlMapConfig, handler);
                    _mappers.Add(sqlMapConfig, mp);
                }
            }
            catch (Exception e)
            {
                Logger.Error(e.StackTrace);
                return null;
                //logger.Exception(e.Message, e);
            }

            return mp;
        }

        protected static ISqlMapper InitMapper(Stream sqlConfigStream, string sqlMapConfig)
        {
            DomSqlMapBuilder builder = new DomSqlMapBuilder();
            ISqlMapper mp = null;
            try
            {
                if (_mappers.ContainsKey(sqlMapConfig))
                {
                    mp = _mappers[sqlMapConfig];
                }
                else
                {
                    mp = builder.Configure(sqlConfigStream);
                    _mappers.Add(sqlMapConfig, mp);
                }
            }
            catch (Exception e)
            {
                Logger.Error(e.StackTrace);
                return null;
            }
            return mp;
        }

        public static ISqlMapper Instance(string sqlMapConfig)
        {
            ISqlMapper mp;
            if (!_mappers.TryGetValue(sqlMapConfig, out mp))
            {
                lock (_mappers)
                {
                    mp = InitMapper(sqlMapConfig);
                }
            }
            return mp;
        }

        public static ISqlMapper Instance(Stream sqlMapConfig, string fileName)
        {
            ISqlMapper mp;
            if (!_mappers.TryGetValue(fileName, out mp))
            {
                lock (_mappers)
                {
                    mp = InitMapper(sqlMapConfig, fileName);
                }
            }
            return mp;
        }

    }
}
