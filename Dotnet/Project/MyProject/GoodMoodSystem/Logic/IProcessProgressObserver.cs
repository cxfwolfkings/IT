///////////////////////////////////////////////////////////////////////////////////////////////////
/// @Name: IProcessProgressObserver.cs
/// @Description: 订阅数据处理进度的接口，对处理进度的改变实时的做出相应
/// @Author: Shaofeng Wang
/// @Created Date: 2010-03-11
/// @Copyright: All Rights Reserved by Sensor Networks and Applications Research Center (2010-2015)
///////////////////////////////////////////////////////////////////////////////////////////////////
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Com.Colin.Forms.Logic
{
   public interface IProcessProgressObserver
    {
        /// <summary>
        /// 获取已经处理的ECG点数并更新进度
        /// </summary>
        /// <param name="point">已经处理的点数</param>
        void UpdateProgress(int point);
    }
}
