using System;
using System.Collections;
using System.IO;
using System.Reflection;

namespace Com.Colin.IbatisDataAccess
{
    public abstract class HTAbstractBLBaseTransactionLogic
    {
        /// <summary>
        /// 消息KEY
        /// </summary>
        public static readonly string MESSAGELIST = "MESSAGELIST";

        /// <summary>
        /// 消息列表value
        /// </summary>
        private ArrayList messagelist = new ArrayList();

        /// <summary>
        /// 结果集
        /// </summary>
        private Hashtable result = new Hashtable();

        /// <summary>
        /// sqlMapConfig
        /// </summary>
        private string SQL_MAP_CONFIG = "SqlMap.config";

        /// <summary>
        /// 执行接口类
        /// </summary>
        protected IDataAccess dataAccess;

        /// <summary>
        /// 是否事务开启
        /// </summary>
        protected bool isAutoTransaction = false;

        /// <summary>
        /// 构造函数
        /// 访问默认数据库和SQL文件
        /// </summary>
        public HTAbstractBLBaseTransactionLogic()
        {
            Assembly assembly = Assembly.GetExecutingAssembly();
            string sqlConfigName = assembly.FullName.Substring(0, assembly.FullName.IndexOf(',')) + "." + SQL_MAP_CONFIG;
            Stream stream = assembly.GetManifestResourceStream(sqlConfigName);
            this.dataAccess = DataAccessFactory.Instance(stream, SQL_MAP_CONFIG);
            result.Add(MESSAGELIST, messagelist);
        }

        /// <summary>
        /// 构造函数
        /// 访问指定数据库和SQL文件(路径)
        /// </summary>
        public HTAbstractBLBaseTransactionLogic(string sqlMapConfig)
        {
            this.dataAccess = DataAccessFactory.Instance(sqlMapConfig);
            result.Add(MESSAGELIST, messagelist);
        }

        /// <summary>
        /// 构造函数
        /// 访问指定数据库和SQL文件(基类)
        /// </summary>
        public HTAbstractBLBaseTransactionLogic(IDataAccess dataAccessInput)
        {
            this.dataAccess = dataAccessInput;
            isAutoTransaction = false;
            result.Add(MESSAGELIST, messagelist);
        }

        /// <summary>
        /// 执行SQL
        /// </summary>
        /// <param name="inParameter">SQL语句参数</param>
        public void Execute(Hashtable inParameter)
        {
            isAutoTransaction = true;
            if (isAutoTransaction == true)
            {
                //DB事务开启
                this.dataAccess.BeginTransaction();
            }
            try
            {
                //DB执行前操作
                Doprepare(inParameter);
                //DB执行
                Process(inParameter);

                if (isAutoTransaction == true)
                {
                    //确定执行
                    this.dataAccess.Commit();
                }
                //DB执行后处理
                DoAfter(inParameter);
            }

            catch (Exception e)
            {
                if (isAutoTransaction == true)
                {
                    this.dataAccess.Rollback();
                }
                throw e;
            }
            finally
            {
                this.dataAccess.Close();
            }

        }

        /// <summary>
        /// DB执行的抽象方法
        /// </summary>
        /// <param name="inParameter">SQL参数</param>
        protected void Process(Hashtable inParameter) { }

        /// <summary>
        /// DB执行前处理方法
        /// <param name="inParameter">SQL参数</param>
        /// </summary>
        public void Doprepare(Hashtable inParameter) { }

        /// <summary>
        /// DB执行后处理方法
        /// <param name="inParameter">SQL参数</param>
        /// </summary>
        public void DoAfter(Hashtable inParameter) { }

        /// <summary>
        /// 结果集
        /// </summary>
        public Hashtable Result
        {
            get { return result; }
            set { result = value; }
        }

        /// <summary>
        /// 向消息列表中添加消息
        /// <param name="message">消息</param>
        /// </summary>
        public void AddMessage(string message)
        {
            messagelist.Add(message);
        }
    }
}
