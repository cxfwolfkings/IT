using ServiceStack.OrmLite;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace LeadChina.CCDMonitor.Infrastrue
{
    public class BaseEntityOperation<Entity> where Entity : new()
    {
        public OrmLiteConnectionFactory dbFactory { get; set; }

        private int pageSize;
        public long TotalCount { get; private set; }
        public int PageCount
        {
            get
            {
                return pageSize == 0 ? 0 : (int)Math.Ceiling((double)TotalCount / pageSize);
            }
        }

        public BaseEntityOperation(string ConnectString)
        {
            dbFactory = new OrmLiteConnectionFactory(ConnectString, MySqlDialect.Provider);
            //OrmLiteConfig.DialectProvider.UseUnicode = true;
        }

        public virtual void Create(Entity t)
        {
            using (IDbConnection dbConn = dbFactory.OpenDbConnection())
            {
                dbConn.Insert(t);
            }
        }


        public virtual long CreateBack(Entity t)
        {
            using (IDbConnection dbConn = dbFactory.OpenDbConnection())
            {
                return dbConn.Insert(t);
            }
        }

        public virtual long CreateWithReturn(Entity t)
        {
            using (IDbConnection dbConn = dbFactory.OpenDbConnection())
            {
                return dbConn.Insert(t, selectIdentity: true);
            }
        }

        public virtual void CreateBatchData(IEnumerable<Entity> ts)
        {
            using (IDbConnection dbConn = dbFactory.OpenDbConnection())
            {
                dbConn.InsertAll(ts);
            }
        }

        public virtual void Update(Entity t)
        {
            using (IDbConnection dbConn = dbFactory.OpenDbConnection())
            {
                dbConn.Update(t);
            }
        }

        //public virtual async Task<int> UpdateAsync(Entity t)
        //{
        //    using (IDbConnection dbConn = dbFactory.OpenDbConnection())
        //    {
        //      return await dbConn.UpdateAsync(t);
        //    }
        //}

        public virtual void UpdateBatch(IEnumerable<Entity> ts)
        {
            using (IDbConnection dbConn = dbFactory.OpenDbConnection())
            {
                dbConn.UpdateAll(ts);
            }
        }

        public virtual void DeleteById(object t)
        {
            using (IDbConnection dbConn = dbFactory.OpenDbConnection())
            {
                dbConn.DeleteById<Entity>(t);
            }
        }

        public virtual int DeleteByFilter(string where = null)
        {
            using (IDbConnection dbConn = dbFactory.OpenDbConnection())
            {
                return dbConn.Delete<Entity>(where);
            }
        }

        public virtual int DeleteByFunc(Expression<Func<Entity, bool>> Predicate)
        {
            using (IDbConnection dbConn = dbFactory.OpenDbConnection())
            {
                return dbConn.Delete(Predicate);
            }
        }

        public virtual List<Entity> GetDataByFunc(Expression<Func<Entity, bool>> Predicate)
        {
            using (IDbConnection dbConn = dbFactory.OpenDbConnection())
            {
                return dbConn.Select(Predicate);
            }
        }

        public virtual async Task<List<Entity>> GetDataByFuncAsync(Expression<Func<Entity, bool>> Predicate)
        {
            using (IDbConnection dbConn = dbFactory.OpenDbConnection())
            {
                return await dbConn.SelectAsync(Predicate);
            }
        }


        ///// <summary>
        ///// get data by paging with where condition
        ///// </summary>
        ///// <param name="orderbyPredicate">order by field</param>
        ///// <param name="pageSize">page size</param>
        ///// <param name="pageNumber">page number, start from 1.</param>
        ///// <param name="isDesc">desc/asc</param>
        ///// <returns></returns>
        //public virtual List<Entity> GetPagedDataByFunc(Expression<Func<Entity, bool>> wherePredicate, Expression<Func<Entity, object>> orderbyPredicate, int pageSize, int pageNumber, bool? isDesc = null)
        //{
        //    using (IDbConnection dbConn = dbFactory.OpenDbConnection())
        //    {

        //        //var orderByStr = string.Format("{0} {1}", orderByField, (isDesc.HasValue && isDesc.Value == false) ? "desc" : "asc");
        //        var dataList = new List<Entity>();

        //        if (isDesc != null && isDesc.Value == true)
        //            dataList = dbConn.Select<Entity>(p => p.Where(wherePredicate).OrderByDescending(orderbyPredicate).Limit(skip: (pageNumber - 1) * pageSize, rows: pageSize));
        //        else
        //            dataList = dbConn.Select<Entity>(p => p.Where(wherePredicate).OrderBy(orderbyPredicate).Limit(skip: (pageNumber - 1) * pageSize, rows: pageSize));

        //        this.TotalCount = dbConn.Count<Entity>(p => p.Where(wherePredicate));
        //        this.pageSize = pageSize;

        //        return dataList;
        //    }
        //}

        ///// <summary>
        ///// get data by paging with where condition
        ///// </summary>
        ///// <param name="orderbyPredicate">order by field</param>
        ///// <param name="pageSize">page size</param>
        ///// <param name="pageNumber">page number, start from 1.</param>
        ///// <param name="isDesc">desc/asc</param>
        ///// <returns></returns>
        //public virtual async Task<List<Entity>> GetPagedDataByFuncAsync(Expression<Func<Entity, bool>> wherePredicate, Expression<Func<Entity, object>> orderbyPredicate, int pageSize, int pageNumber, bool? isDesc = null)
        //{
        //    using (IDbConnection dbConn = dbFactory.OpenDbConnection())
        //    {

        //        //var orderByStr = string.Format("{0} {1}", orderByField, (isDesc.HasValue && isDesc.Value == false) ? "desc" : "asc");
        //        var dataList = new List<Entity>();

        //        if (isDesc != null && isDesc.Value == true)
        //            dataList = await dbConn.SelectAsync<Entity>(p => p.Where(wherePredicate).OrderByDescending(orderbyPredicate).Limit(skip: (pageNumber - 1) * pageSize, rows: pageSize));
        //        else
        //            dataList = await dbConn.SelectAsync<Entity>(p => p.Where(wherePredicate).OrderBy(orderbyPredicate).Limit(skip: (pageNumber - 1) * pageSize, rows: pageSize));

        //        this.TotalCount = dbConn.Count<Entity>(p => p.Where(wherePredicate));
        //        this.pageSize = pageSize;

        //        return dataList;
        //    }
        //}


        ///// <summary>
        ///// get data by paging without where condition
        ///// </summary>
        ///// <param name="orderbyPredicate">order by field</param>
        ///// <param name="pageSize">page size</param>
        ///// <param name="pageNumber">page number, start from 1.</param>
        ///// <param name="isDesc">desc/asc</param>
        ///// <returns></returns>
        //public virtual List<Entity> GetPagedDataByFunc(Expression<Func<Entity, object>> orderbyPredicate, int pageSize, int pageNumber, bool? isDesc = null)
        //{
        //    using (IDbConnection dbConn = dbFactory.OpenDbConnection())
        //    {

        //        // var orderByStr = string.Format("{0} {1}", orderByField, (isDesc.HasValue && isDesc.Value == true) ? "desc" : "asc");
        //        var dataList = new List<Entity>();

        //        if (isDesc != null && isDesc.Value == true)
        //            dataList = dbConn.Select<Entity>(p => p.OrderByDescending(orderbyPredicate).Limit(skip: (pageNumber - 1) * pageSize, rows: pageSize));
        //        else
        //            dataList = dbConn.Select<Entity>(p => p.OrderBy(orderbyPredicate).Limit(skip: (pageNumber - 1) * pageSize, rows: pageSize));

        //        this.TotalCount = dbConn.Count<Entity>();
        //        this.pageSize = pageSize;

        //        return dataList;
        //    }
        //}

        ///// <summary>
        ///// get data by paging without where condition
        ///// </summary>
        ///// <param name="orderbyPredicate">order by field</param>
        ///// <param name="pageSize">page size</param>
        ///// <param name="pageNumber">page number, start from 1.</param>
        ///// <param name="isDesc">desc/asc</param>
        ///// <returns></returns>
        //public virtual async Task<List<Entity>> GetPagedDataByFuncAsync(Expression<Func<Entity, object>> orderbyPredicate, int pageSize, int pageNumber, bool? isDesc = null)
        //{
        //    using (IDbConnection dbConn = dbFactory.OpenDbConnection())
        //    {

        //        // var orderByStr = string.Format("{0} {1}", orderByField, (isDesc.HasValue && isDesc.Value == true) ? "desc" : "asc");
        //        var dataList = new List<Entity>();

        //        if (isDesc != null && isDesc.Value == true)
        //            dataList = await dbConn.SelectAsync<Entity>(p => p.OrderByDescending(orderbyPredicate).Limit(skip: (pageNumber - 1) * pageSize, rows: pageSize));
        //        else
        //            dataList = await dbConn.SelectAsync<Entity>(p => p.OrderBy(orderbyPredicate).Limit(skip: (pageNumber - 1) * pageSize, rows: pageSize));

        //        this.TotalCount = dbConn.Count<Entity>();
        //        this.pageSize = pageSize;

        //        return dataList;
        //    }
        //}


        /// <summary>
        /// return current Entity list using procedure 
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public virtual List<Entity> ExecEntityProcedure(string sql, object value)
        {
            using (IDbConnection dbConn = dbFactory.OpenDbConnection())
            {
                return dbConn.SqlList<Entity>(sql, value);
            }
        }

        /// <summary>
        /// return current Entity list using procedure 
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public virtual List<T> ExecEntityProcedure<T>(string sql, object value)
        {
            using (IDbConnection dbConn = dbFactory.OpenDbConnection())
            {
                return dbConn.SqlList<T>(sql, value);
            }
        }

        /// <summary>
        /// return current Entity list using procedure 
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public virtual List<T> ExecEntityProcedure<T>(string sql, object value, string outputParam, out int totalCount)
        {
            using (IDbConnection dbConn = dbFactory.OpenDbConnection())
            {
                using (var cmd = dbConn.SqlProc(sql, value))
                {
                    var pTotal = cmd.AddParam(outputParam, direction: ParameterDirection.Output, dbType: DbType.Int32);

                    var results = cmd.ConvertToList<T>();
                    totalCount = 0;
                    if (pTotal != null && pTotal.Value != null)
                    {
                        int.TryParse(pTotal.Value.ToString(), out totalCount);
                    }

                    return results;
                }
            }
        }

        /// <summary>
        /// return int result.
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public virtual List<int> ExecintProcedure(string sql, object value)
        {
            using (IDbConnection dbConn = dbFactory.OpenDbConnection())
            {
                return dbConn.SqlList<int>(sql, value);
            }
        }

        public virtual void DeleteByIds(IEnumerable<object> ts)
        {
            using (IDbConnection dbConn = dbFactory.OpenDbConnection())
            {
                dbConn.DeleteByIds<Entity>(ts);
            }
        }

        /// <summary>
        /// Returns results from using a single name, value filter. E.g:('Age',11)
        /// </summary>
        /// <param name="name"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public virtual Entity GetSingleData(string name, object value)
        {
            using (IDbConnection dbConn = dbFactory.OpenDbConnection())
            {
                return dbConn.SingleWhere<Entity>(name, value);
            }
        }

        /// <summary>
        /// 查询记录数
        /// </summary>
        /// <param name="sql"></param>
        /// <returns></returns>
        public virtual long GetRowCount(string sql)
        {
            using (IDbConnection dbConn = dbFactory.OpenDbConnection())
            {
                return dbConn.RowCount(sql);
            }
        }

        /// <summary>
        /// Return single entity data by expression
        /// </summary>
        /// <param name="Predicate"></param>
        /// <returns></returns>
        public virtual Entity GetSingleData(Expression<Func<Entity, bool>> Predicate)
        {
            using (IDbConnection dbConn = dbFactory.OpenDbConnection())
            {
                return dbConn.Select(Predicate).FirstOrDefault();
            }
        }

        public virtual List<Entity> QueryList(Expression<Func<Entity, bool>> Predicate)
        {
            using (IDbConnection dbConn = dbFactory.OpenDbConnection())
            {
                return dbConn.Select(Predicate);
            }
        }

        ///// <summary>
        ///// Return single entity data by expression
        ///// </summary>
        ///// <param name="Predicate"></param>
        ///// <returns></returns>
        //public virtual async Task<Entity> GetSingleDataAsync(Expression<Func<Entity, bool>> Predicate)
        //{
        //    using (IDbConnection dbConn = dbFactory.OpenDbConnection())
        //    {
        //        return await dbConn.SingleAsync<Entity>(Predicate);
        //    }
        //}


        //public virtual async Task<Entity> GetSingleDataNolockAsync(Expression<Func<Entity, bool>> Predicate)
        //{
        //    using (IDbConnection dbConn = dbFactory.OpenDbConnection())
        //    {
        //        using (var tran = dbConn.OpenTransaction(IsolationLevel.ReadUncommitted))
        //        {
        //            return await dbConn.SingleAsync<Entity>(Predicate);
        //        }
        //    }
        //}

        public virtual Entity GetSingleDataNolock(Expression<Func<Entity, bool>> Predicate)
        {
            using (IDbConnection dbConn = dbFactory.OpenDbConnection())
            {
                using (var tran = dbConn.OpenTransaction(IsolationLevel.ReadUncommitted))
                {
                    return dbConn.Single(Predicate);
                }
            }
        }

        /// <summary>
        /// Returns result from using key1=value1 'or' key2=value2
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public virtual List<Entity> GetDataByOrFileds(Dictionary<string, object> data)
        {
            if (data == null) return null;
            var result = new List<Entity>();
            foreach (KeyValuePair<string, object> kvp in data)
            {
                result.Add(GetSingleData(kvp.Key, kvp.Value));
            }
            return result;
        }

        public virtual List<Entity> GetAllData()
        {
            using (IDbConnection dbConn = dbFactory.OpenDbConnection())
            {
                return dbConn.Select<Entity>();
            }
        }

        //public virtual async Task<List<Entity>> GetAllDataAsync()
        //{
        //    using (IDbConnection dbConn = dbFactory.OpenDbConnection())
        //    {
        //        return await dbConn.SelectAsync<Entity>();
        //    }
        //}

        public virtual List<Entity> GetDataByRawSql(string sql)
        {
            using (IDbConnection dbConn = dbFactory.OpenDbConnection())
            {
                return dbConn.Select<Entity>(sql);
            }
        }

        public virtual List<T> GetDataByRawSql<T>(string sql)
        {
            using (IDbConnection dbConn = dbFactory.OpenDbConnection())
            {
                return dbConn.Select<T>(sql);
            }
        }

        public virtual int ExecuteNoQuery(string sql)
        {
            using (IDbConnection dbConn = dbFactory.OpenDbConnection())
            {
                return dbConn.ExecuteSql(sql);
            }
        }

        public virtual long GetRelationCount(Expression<Func<Entity, bool>> Predicate)
        {
            using (IDbConnection dbConn = dbFactory.OpenDbConnection())
            {
                return dbConn.Count(Predicate);
            }
        }

        //public virtual async Task<long> GetRelationCountAsync(Expression<Func<Entity, bool>> Predicate)
        //{
        //    using (IDbConnection dbConn = dbFactory.OpenDbConnection())
        //    {
        //        return await dbConn.CountAsync(Predicate);
        //    }
        //}


        public virtual void SaveWithTransaction(Action<TransactionSave<Entity>> doSave)
        {
            using (IDbConnection db = dbFactory.OpenDbConnection())
            {
                using (IDbTransaction trans = db.OpenTransaction(IsolationLevel.ReadCommitted))
                {
                    if (doSave != null)
                    {
                        doSave(new TransactionSave<Entity> { Db = db });
                        trans.Commit();
                    }
                }
            }
        }

    }
}
