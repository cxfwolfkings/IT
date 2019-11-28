using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.InteropServices;

namespace Com.Colin.Forms.Logic
{
    class detect_and_classify //: IDisposable
    {

        #region PInvokes

        [DllImport("detect_and_classify.dll")]
        static public extern int DetectAndClassify(int ecgSample, int[] beatType, int[] beatMatch);

        //读取模板变量
        [DllImport("detect_and_classify.dll")]
        static public extern void GetTemplates(int[,] templates, int[] counts, int[] types,int[] Widths,
                      int[] Begins,  int[] Ends,  int[] SinceLastMatch,  int[] Amps,
                      int[] Centers, double[,] mIs);
        //清空模板
        [DllImport("detect_and_classify.dll")]
        static public extern void ResetDetectAndClassify();

        //是否替换模板
        [DllImport("detect_and_classify.dll")]
        static public extern int GetFlags(int[] replaced, int[] merged, int[] clear);

        //替换模板的信息
        [DllImport("detect_and_classify.dll")]
        static public extern void GetBackupTemplates(int[] templates, int[] count, int[] type,int[] center,int[] begin,int[] end);

        //初始化hrv
        [DllImport("detect_and_classify.dll")]
        static public extern void ResetHrvAnalysis();


        //计算hrv
        [DllImport("detect_and_classify.dll")]
        static public extern void GetHRVFeature(float[] RR, int length, float[] hrvparameter);
        #endregion PInvoles

        /// <summary>
        /// R波模板匹配检测
        /// </summary>
        /// <param name="ecgSample"> 单个心电数据 </param>
        /// <param name="beatType">返回是否为R波</param>
        /// <param name="beatMatch">返回异常类型</param>
        public int GetDetectAndClassify(int ecgSample, int[] beatType, int[] beatMatch)
        {

            int result = DetectAndClassify(ecgSample, beatType, beatMatch);

            return result;
        }

        /// <summary>
        /// 获取模板信息
        /// </summary>
        /// <param name="templates"></param>
        /// <param name="counts"></param>
        /// <param name="types"></param>
        public void GetBeatTemplates(int[,] templates, int[] counts, int[] types, int[] Widths,
                      int[] Begins, int[] Ends, int[] SinceLastMatch, int[] Amps,
                      int[] Centers, double[,] mIs)
        {
            GetTemplates(templates,counts,types,Widths,Begins,Ends,SinceLastMatch,Amps,Centers,mIs);
        }

        /// <summary>
        /// 清空
        /// </summary>
        public void ClearDetectAndClassify()
        {
            ResetDetectAndClassify();
        }

        /// <summary>
        /// 是否替换模板
        /// </summary>
        /// <param name="replaced"></param>
        /// <param name="merged"></param>
        /// <param name="clear"></param>
        public void GetTemplateFlags(int[] replaced, int[] merged, int[] clear)
        {
            GetFlags(replaced, merged, clear);
        }

        /// <summary>
        /// 读取替换前的模板
        /// 
        /// </summary>
        /// <param name="templates"></param>
        /// <param name="count"></param>
        /// <param name="type"></param>
        /// <param name="center"></param>
        public void getReplacedTemplate(int[] templates, int[] count, int[] type, int[] center, int[] begin, int[] end)
        {
            GetBackupTemplates(templates,count,type,center,begin,end);  
        }


        /// <summary>
        /// 清空
        /// </summary>
        public void ClearDetectHrvAnalysis()
        {
            ResetHrvAnalysis();
        }

        public void getHRVFeature(float[] RR, int length, float[] hrvparameter)
        {
            GetHRVFeature(RR,length,hrvparameter);
        }
    }
}
