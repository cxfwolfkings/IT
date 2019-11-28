using System.Collections;
using System.Collections.Generic;
using System.Data;

namespace Com.Colin.IbatisDataAccess
{
    public interface IDataAccess
    {
        /// <summary>
        /// 查询集合
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="statementName"></param>
        /// <param name="parameterObject"></param>
        /// <returns></returns>
        IList<T> QueryForList<T>(string statementName, object parameterObject);

        IList QueryForList(string statementName, object parameterObject);
        void QueryForList<T>(string statementName, object parameterObject, IList<T> resultObject);
        void QueryForList(string statementName, object parameterObject, IList resultObject);
        IList<T> QueryForList<T>(string statementName, object parameterObject, int skipResults, int maxResults);
        IList QueryForList(string statementName, object parameterObject, int skipResults, int maxResults);
        IDictionary QueryForMap(string statementName, object parameterObject, string keyProperty);
        IDictionary QueryForMap(string statementName, object parameterObject, string keyProperty, string valueProperty);

        T QueryForObject<T>(string statementName, object parameterObject);
        object QueryForObject(string statementName, object parameterObject);
        T QueryForObject<T>(string statementName, object parameterObject, T instanceObject);
        object QueryForObject(string statementName, object parameterObject, object resultObject);
        IDictionary<K, V> QueryForDictionary<K, V>(string statementName, object parameterObject, string keyProperty);
        IDictionary QueryForDictionary(string statementName, object parameterObject, string keyProperty);
        IDictionary<K, V> QueryForDictionary<K, V>(string statementName, object parameterObject, string keyProperty, string valueProperty);
        IDictionary QueryForDictionary(string statementName, object parameterObject, string keyProperty, string valueProperty);

        int Delete(string statementName, object parameterObject);
        int Update(string statementName, object parameterObject);
        object Insert(string statementName, object parameterObject);
        void BeginTransaction();
        void Commit();
        void Rollback();
        void Close();
        DataTable QueryForDataTable(string statementName, object paramObject);

        IDbConnection GetConnection();
    }
}