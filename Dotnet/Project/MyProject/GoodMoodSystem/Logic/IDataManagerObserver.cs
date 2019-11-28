///////////////////////////////////////////////////////////////////////////////////////////////////
/// @Name: IDataSaverObserver.cs
/// @Description: 实现该接口的类的对象要可以显示保存数据和文件的进度
/// @Author: Shaofeng Wang
/// @Updated At: 2010-04-05
/// @Copyright: All Rights Reserved by Sensor Networks and Applications Research Center (2010-2015)
///////////////////////////////////////////////////////////////////////////////////////////////////
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Com.Colin.Forms.Logic
{
   public interface IDataManagerObserver
    {
        /// <summary>
        /// 显示DataSaver返回的当前的进度描述
        /// </summary>
        /// <param name="message">保存数据的进度信息</param>
        void UpdateProgress(string message);
    }
}
