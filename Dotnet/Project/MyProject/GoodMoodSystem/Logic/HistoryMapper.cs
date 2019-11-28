using Com.Colin.Forms.DB;
using Com.Colin.Forms.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SQLite;
using System.Linq;
using System.Text;

namespace Com.Colin.Forms.Logic
{
    /// <summary>
    /// 封装recordhistory(监测记录表)的操作类
    /// </summary>
    public class HistoryMapper
    {
        /// <summary>
        /// 带分页的根据用户Id查询监测记录的方法
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="pageSize"></param>
        /// <param name="rowCount"></param>
        /// <returns></returns>
        public static List<Record> GetRecordsByUserPerPage(int userId, int pageSize, 
            int rowCount, ref int totalPages)
        {
            List<Record> records = new List<Record>();
            // 加载数据库中数据
            string sql = "select * from RecordHistory where userId=@userId limit @pageSize offset @rowCount";
            DataTable dt = SqlHelper.Instance.ExecuteData(sql, CommandType.Text,
                new SQLiteParameter[] {
                    new SQLiteParameter("@userId", userId),
                    new SQLiteParameter("@pageSize", pageSize),
                    new SQLiteParameter("@rowCount", rowCount)
                });
            foreach (DataRow dr in dt.Rows)
            {
                Record record = new Record()
                {
                    HistoryId = Convert.ToInt32(dr["historyId"].ToString()),
                    Type = dr["type"].ToString(),
                    Level = Convert.ToInt32(dr["level"].ToString()),
                    RecordTime = Convert.ToDateTime(dr["recordTime"].ToString()),
                    HeartIndex = float.Parse(dr["heartIndex"].ToString()),
                    Mhrt = float.Parse(dr["M-HRT"].ToString()),
                    Sdnn = float.Parse(dr["SDNN"].ToString()),
                    Tp = float.Parse(dr["TP"].ToString())
                };
                records.Add(record);
            }
            totalPages = records.Count % pageSize == 0 ? records.Count / pageSize : records.Count / pageSize + 1;
            return records;
        }
    }
}
