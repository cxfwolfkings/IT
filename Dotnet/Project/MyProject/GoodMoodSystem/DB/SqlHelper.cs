using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Data.SQLite;
using System.Linq;
using System.Text;

namespace Com.Colin.Forms.DB
{
    /// <summary>
    /// 数据库操作工具类
    /// </summary>
    public class SqlHelper
    {
        private string SQLiteConnStr = null;
        private SQLiteConnection SQLiteConn = null;
        private static SqlHelper instance = null;

        /// <summary>
        /// 采用单例模式的懒汉式加载
        /// </summary>
        public static SqlHelper Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new SqlHelper();
                }
                return instance;
            }
        }

        private SqlHelper()
        {
            SQLiteConnStr = ConfigurationManager.AppSettings["SQLiteConnStr"];
        }

        /// <summary>
        /// 获取对数据库的连接
        /// </summary>
        /// <returns></returns>
        private SQLiteConnection getSQLiteConnection()
        {
            if (SQLiteConn == null)
            {
                SQLiteConn = new SQLiteConnection(SQLiteConnStr);
            }
            if (SQLiteConn.State == ConnectionState.Closed)
            {
                SQLiteConn.Open();
            }
            return SQLiteConn;
        }

        /// <summary>
        /// 执行增删改操作
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="type"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public int ExecuteNonQuery(string sql, CommandType type, SQLiteParameter[] parameters)
        {
            try
            {
                if (SQLiteConn == null || SQLiteConn.State != ConnectionState.Open)
                {
                    SQLiteConn = getSQLiteConnection();
                }
                SQLiteCommand sqliteComm = new SQLiteCommand(SQLiteConn);
                sqliteComm.CommandType = type;
                sqliteComm.CommandText = sql;
                if (parameters != null && parameters.Length != 0)
                {
                    sqliteComm.Parameters.AddRange(parameters);
                }
                return sqliteComm.ExecuteNonQuery();
            }
            catch(Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                closeSQLiteConnection();
            }
        }

        /// <summary>
        /// 执行查询操作
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="type"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public DataTable ExecuteData(string sql, CommandType type, SQLiteParameter[] parameters)
        {
            try
            {
                if (SQLiteConn == null || SQLiteConn.State != ConnectionState.Open)
                {
                    SQLiteConn = getSQLiteConnection();
                }
                SQLiteCommand sqliteComm = new SQLiteCommand(SQLiteConn);
                sqliteComm.CommandType = type;
                sqliteComm.CommandText = sql;
                if (parameters != null && parameters.Length != 0)
                {
                    sqliteComm.Parameters.AddRange(parameters);
                }
                SQLiteDataAdapter sqliteAdapter = new SQLiteDataAdapter(sqliteComm);
                DataTable dt = new DataTable();
                sqliteAdapter.Fill(dt);
                return dt;
            }
            catch(Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                closeSQLiteConnection();
            }
        }

        /// <summary>
        /// 关闭连接
        /// </summary>
        private void closeSQLiteConnection()
        {
            if (SQLiteConn != null && SQLiteConn.State == ConnectionState.Open)
            {
                SQLiteConn.Close();
            }
        }
    }
}
