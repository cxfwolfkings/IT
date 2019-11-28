using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Com.Colin.Forms.Model
{
    /// <summary>
    /// 数据库recordhistory(监测记录)表的模型类
    /// </summary>
    public class Record
    {
        private int historyId;
        private string type;
        private int level;
        private DateTime recordTime;
        private float heartIndex;
        private float mhrt;
        private float sdnn;
        private float tp;

        /// <summary>
        /// 主键Id
        /// </summary>
        public int HistoryId
        {
            get
            {
                return historyId;
            }

            set
            {
                historyId = value;
            }
        }

        /// <summary>
        /// 类型
        /// </summary>
        public string Type
        {
            get
            {
                return type;
            }

            set
            {
                type = value;
            }
        }

        /// <summary>
        /// 难度(0:简单，1:困难)
        /// </summary>
        public int Level
        {
            get
            {
                return level;
            }

            set
            {
                level = value;
            }
        }

        /// <summary>
        /// 时间
        /// </summary>
        public DateTime RecordTime
        {
            get
            {
                return recordTime;
            }

            set
            {
                recordTime = value;
            }
        }

        /// <summary>
        /// 心能量指数
        /// </summary>
        public float HeartIndex
        {
            get
            {
                return heartIndex;
            }

            set
            {
                heartIndex = value;
            }
        }

        /// <summary>
        /// M-HRT
        /// </summary>
        public float Mhrt
        {
            get
            {
                return mhrt;
            }

            set
            {
                mhrt = value;
            }
        }

        /// <summary>
        /// SDNN
        /// </summary>
        public float Sdnn
        {
            get
            {
                return sdnn;
            }

            set
            {
                sdnn = value;
            }
        }

        /// <summary>
        /// TP
        /// </summary>
        public float Tp
        {
            get
            {
                return tp;
            }

            set
            {
                tp = value;
            }
        }

        public override bool Equals(object obj)
        {
            if(obj is Record)
            {
                Record other = (Record)obj;
                return historyId.Equals(other.historyId);
            }
            return base.Equals(obj);
        }

        public override int GetHashCode()
        {
            return historyId;
        }
    }
}
