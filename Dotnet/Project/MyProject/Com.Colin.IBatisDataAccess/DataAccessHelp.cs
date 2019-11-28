using Com.Colin.Lib;
using IBatisNet.DataMapper;
using IBatisNet.DataMapper.MappedStatements;
using IBatisNet.DataMapper.Scope;
using IBatisNet.DataMapper.SessionStore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Web;

namespace Com.Colin.IbatisDataAccess
{
    internal class DataAccessHelp : IDataAccess
    {
        private ISqlMapper sqlMapper;

        /// <summary>
        /// 这是一个测试方法
        /// </summary>
        /// <param name="sqlMapConfig"></param>
        /// <returns></returns>
        public static DataAccessHelp Create(Stream sqlMapConfig, string filaName)
        {
            try
            {
                ISqlMapper mapper = TestContext.Instance(sqlMapConfig, filaName);
                if (mapper != null)
                {
                    return dealWithNewThread(mapper);
                }
            }
            catch (IBatisNet.Common.Exceptions.IBatisNetException bnx)
            {
                throw new ApplicationException(bnx.Message);
            }
            return null;
        }

        public static DataAccessHelp Create(string sqlMapConfig)
        {
            try
            {
                ISqlMapper mapper = TestContext.Instance(sqlMapConfig);
                if (mapper != null)
                {
                    return dealWithNewThread(mapper);
                }
            }
            catch (IBatisNet.Common.Exceptions.IBatisNetException bnx)
            {
                throw new ApplicationException(bnx.Message);
            }
            return null;
        }

        private static DataAccessHelp dealWithNewThread(ISqlMapper mapper)
        {
            //START - Add by Robin 2013/07/10 for Version Bulk Add 
            //time触发启动新线程时不能操作IIS上的线程，要设置一个自定义会话像HybridWebThreadSessionStore才可以。需要添加"System.Web"引用
            if (HttpContext.Current == null)
            {
                mapper.SessionStore = new HybridWebThreadSessionStore(mapper.Id);
            }
            //END - Add by Robin 2013/07/10 for Version Bulk Add 
            DataAccessHelp da = new DataAccessHelp();
            da.sqlMapper = mapper;
            return da;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="statementName"></param>
        /// <param name="paramObject"></param>
        /// <returns></returns>
        private string GetSql(string statementName, object paramObject)
        {
            IMappedStatement statement = this.sqlMapper.GetMappedStatement(statementName);
            if (statement.Statement != null && statement.Statement.Sql != null)
            {
                RequestScope scope = statement.Statement.Sql.GetRequestScope(statement, paramObject, sqlMapper.LocalSession);
                if (scope != null && scope.PreparedStatement != null)
                {
                    return scope.PreparedStatement.PreparedSql;
                }
            }
            return "";
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="name"></param>
        /// <param name="param"></param>
        /// <returns></returns>
        private DateTime SqlBeforeLog(string name, object param)
        {
            try
            {
                //Loggers.DebugLog.Debug("EXECUTE SQL:" + GetSql(name, param) + System.Environment.NewLine + "Paramter:" + ToString(param));
                Logger.Debug("EXECUTE SQL:" + GetSql(name, param) + System.Environment.NewLine + "Paramter:" + ToString(param));
            }
            catch (Exception ex)
            {
                return DateTime.Now;
            }

            return DateTime.Now;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="start"></param>
        /// <param name="result"></param>
        private void SqlAfterLog(DateTime start, object result)
        {
            Logger.Debug("EXECUTE SQL COMPLETED. TimeElapsed=" + (DateTime.Now - start).TotalMilliseconds + "ms"
                /*+ "Result:" + StringUtil.ToString(result)*/);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        private string ToString(object obj)
        {
            if (obj == null)
            {
                return "";
            }
            else
            {
                return obj.ToString();
            }
        }

        #region IDataAccess Members

        public IList<T> QueryForList<T>(string statementName, object parameterObject)
        {
            DateTime start = SqlBeforeLog(statementName, parameterObject);
            IList<T> result = this.sqlMapper.QueryForList<T>(statementName, parameterObject);
            //SqlAfterLog(start, result);
            return result;
        }

        public IList QueryForList(string statementName, object parameterObject)
        {

            DateTime start = SqlBeforeLog(statementName, parameterObject);
            IList result = this.sqlMapper.QueryForList(statementName, parameterObject);
            //SqlAfterLog(start, result);
            return result;

        }

        public void QueryForList<T>(string statementName, object parameterObject, IList<T> resultObject)
        {

            DateTime start = SqlBeforeLog(statementName, parameterObject);
            this.sqlMapper.QueryForList<T>(statementName, parameterObject, resultObject);
            //SqlAfterLog(start, resultObject);
        }

        public void QueryForList(string statementName, object parameterObject, IList resultObject)
        {

            DateTime start = SqlBeforeLog(statementName, parameterObject);
            this.sqlMapper.QueryForList(statementName, parameterObject, resultObject);
            //SqlAfterLog(start, resultObject);
        }

        public IList<T> QueryForList<T>(string statementName, object parameterObject, int skipResults, int maxResults)
        {

            DateTime start = SqlBeforeLog(statementName, parameterObject);
            IList<T> result = this.sqlMapper.QueryForList<T>(statementName, parameterObject, skipResults, maxResults);
            //SqlAfterLog(start, result);
            return result;
        }

        public IList QueryForList(string statementName, object parameterObject, int skipResults, int maxResults)
        {

            DateTime start = SqlBeforeLog(statementName, parameterObject);
            IList result = this.sqlMapper.QueryForList(statementName, parameterObject, skipResults, maxResults);
            //SqlAfterLog(start, result);
            return result;
        }

        public IDictionary QueryForMap(string statementName, object parameterObject, string keyProperty)
        {

            DateTime start = SqlBeforeLog(statementName, parameterObject);
            IDictionary result = this.sqlMapper.QueryForMap(statementName, parameterObject, keyProperty);
            //SqlAfterLog(start, result);
            return result;

        }

        public IDictionary QueryForMap(string statementName, object parameterObject, string keyProperty, string valueProperty)
        {

            DateTime start = SqlBeforeLog(statementName, parameterObject);
            IDictionary result = this.sqlMapper.QueryForMap(statementName, parameterObject, keyProperty, valueProperty);
            //SqlAfterLog(start, result);
            return result;

        }

        public T QueryForObject<T>(string statementName, object parameterObject)
        {

            DateTime start = SqlBeforeLog(statementName, parameterObject);
            T result = this.sqlMapper.QueryForObject<T>(statementName, parameterObject);
            //SqlAfterLog(start, result);
            return result;

        }

        public object QueryForObject(string statementName, object parameterObject)
        {
            DateTime start = SqlBeforeLog(statementName, parameterObject);
            object result = this.sqlMapper.QueryForObject(statementName, parameterObject);
            //SqlAfterLog(start, result);
            return result;
        }

        public T QueryForObject<T>(string statementName, object parameterObject, T instanceObject)
        {
            throw new NotImplementedException();
        }

        public object QueryForObject(string statementName, object parameterObject, object resultObject)
        {
            throw new NotImplementedException();
        }

        public IDictionary<K, V> QueryForDictionary<K, V>(string statementName, object parameterObject, string keyProperty)
        {

            DateTime start = SqlBeforeLog(statementName, parameterObject);
            IDictionary<K, V> result = this.sqlMapper.QueryForDictionary<K, V>(statementName, parameterObject, keyProperty);
            //SqlAfterLog(start, result);
            return result;

        }

        public IDictionary QueryForDictionary(string statementName, object parameterObject, string keyProperty)
        {

            DateTime start = SqlBeforeLog(statementName, parameterObject);
            IDictionary result = this.sqlMapper.QueryForDictionary(statementName, parameterObject, keyProperty);
            //SqlAfterLog(start, result);
            return result;


        }

        public IDictionary<K, V> QueryForDictionary<K, V>(string statementName, object parameterObject, string keyProperty, string valueProperty)
        {

            DateTime start = SqlBeforeLog(statementName, parameterObject);
            IDictionary<K, V> result = this.sqlMapper.QueryForDictionary<K, V>(statementName, parameterObject, keyProperty, valueProperty);
            //SqlAfterLog(start, result);
            return result;

        }

        public IDictionary QueryForDictionary(string statementName, object parameterObject, string keyProperty, string valueProperty)
        {

            DateTime start = SqlBeforeLog(statementName, parameterObject);
            IDictionary result = this.sqlMapper.QueryForDictionary(statementName, parameterObject, keyProperty, valueProperty);
            //SqlAfterLog(start, result);
            return result;

        }

        public int Delete(string statementName, object parameterObject)
        {

            DateTime start = SqlBeforeLog(statementName, parameterObject);
            int result = this.sqlMapper.Delete(statementName, parameterObject);
            //SqlAfterLog(start, result);
            return result;

        }

        public int Update(string statementName, object parameterObject)
        {

            DateTime start = SqlBeforeLog(statementName, parameterObject);
            int result = this.sqlMapper.Update(statementName, parameterObject);
            //SqlAfterLog(start, result);
            return result;

        }


        public object Insert(string statementName, object parameterObject)
        {

            DateTime start = SqlBeforeLog(statementName, parameterObject);
            object result = this.sqlMapper.Insert(statementName, parameterObject);
            //SqlAfterLog(start, result);
            return result;

        }

        public void BeginTransaction()
        {
            this.sqlMapper.BeginTransaction();
        }

        public void Commit()
        {
            this.sqlMapper.CommitTransaction();
        }

        public void Rollback()
        {
            this.sqlMapper.RollBackTransaction();
        }

        #endregion

        public void Close()
        {
            if (this.sqlMapper.IsSessionStarted)
            {
                this.sqlMapper.CloseConnection();
            }
        }

        public DataTable QueryForDataTable(string statementName, object paramObject)
        {
            IMappedStatement statement = this.sqlMapper.GetMappedStatement(statementName);

            if (!this.sqlMapper.IsSessionStarted)
            {
                this.sqlMapper.OpenConnection();
            }
            DataTable rTable = new DataTable();

            RequestScope scope = statement.Statement.Sql.GetRequestScope(statement, paramObject, this.sqlMapper.LocalSession);
            statement.PreparedCommand.Create(scope, this.sqlMapper.LocalSession, statement.Statement, paramObject);

            //START - Modify by Robin 2013/06/24 for Version Bulk Modify 
            //导出时间太长默认数据库连接时间不够，需要设置数据库连接时间（作为参数传入）
            Hashtable ht = (Hashtable)paramObject;
            if (ht["timeout"] != null && !"".Equals(ht["timeout"].ToString()))
            {
                scope.IDbCommand.CommandTimeout = int.Parse(ht["timeout"].ToString());
            }
            //END - Modify by Robin 2013/06/24 for Version Bulk Modify 
            using (scope.IDbCommand)
            {
                rTable.Load(scope.IDbCommand.ExecuteReader());
            }

            return rTable;
        }

        public IDbConnection GetConnection()
        {
            return sqlMapper.LocalSession.Connection;
        }
    }
}
