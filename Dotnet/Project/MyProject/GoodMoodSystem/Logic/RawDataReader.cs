///////////////////////////////////////////////////////////////////////////////////////////////////
/// @Name: RawDataReader.cs
/// @Description: 从文件中读取原始数据，保存到本地文件系统，并做预处理（R波检测以及运动状态和强度计算）
/// @Author: Shaofeng Wang
/// @Created Date: 2010-02-26
/// @Updated At: 2010-03-16
/// @Copyright: All Rights Reserved by Sensor Networks and Applications Research Center (2010-2015)
///////////////////////////////////////////////////////////////////////////////////////////////////
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;
using System.IO;

namespace Com.Colin.Forms.Logic
{
    class RawDataReader
    {

        public const int FINISHED = -1;
        /// <summary>
        /// 数据文件
        /// </summary>
        private string fileName;

        /// <summary>
        /// 读取和处理进度的观察者
        /// </summary>
        private IProcessProgressObserver progressObserver;


        /// <summary>
        /// 标识处理是否已经完成，若完成为true
        /// </summary>
        private bool completed = false;

        public bool Completed
        {
            get { return completed; }
            set { completed = value; }
        }

        /// <summary>
        /// 标识当前已经读取了多少点数据
        /// </summary>
        private int rOffset = 0;

        public int ROffset
        {
            get { return rOffset; }
            set { rOffset = value; }
        }

        /// <summary>
        /// 记录上次检测的R波偏移量，用来计算最大和最小RR间期
        /// </summary>
        private int lastROffset = 0;

        /// <summary>
        /// 最大的RR间期
        /// </summary>
        private int maxRRInterval = 0;

        public int MaxRRInterval
        {
            get { return maxRRInterval; }
            set { maxRRInterval = value; }
        }

        /// <summary>
        /// 最小的RR间期
        /// </summary>
        private int minRRInterval = 10000;

        public int MinRRInterval
        {
            get { return minRRInterval; }
            set { minRRInterval = value; }
        }

        /// <summary>
        /// RR间期
        /// </summary>
        private ArrayList rrIntervals = new ArrayList();

        public ArrayList RRIntervals
        {
            get { return rrIntervals; }
            set { rrIntervals = value; }
        }

        private int ecgSampleRate = 300;

        /// <summary>
        /// 需要通过数据文件名和关注读取进度的观察者创建一个RawDataReader
        /// </summary>
        /// <param name="fileName">文件名</param>
        /// <param name="progressObserver">关注读取进度的观察者</param>
        public RawDataReader(string fileName, IProcessProgressObserver progressObserver)
        {
            this.fileName = fileName;
            this.progressObserver = progressObserver;

        }

        /// <summary>
        /// 读取数据并做处理
        /// </summary>
        public void GetSignal()
        {
            BinaryReader reader = new BinaryReader(new FileStream(fileName, FileMode.Open));

            int length = (int)reader.BaseStream.Length;
            int ecgLength = length / 1024 * ecgSampleRate;

            byte[] EcgChannel1 = new byte[ecgLength];
            

            //用来对已经向rawSignal添加的包数计数
            int packetCnt = 0;
            //一秒的数据包括256 * 4,为了能够对ECG正常分段，一次读入32秒的数据，这样可以正常地分出长度为
            //32的数据段来进行处理， 故一次性读入256 × 4 × 32 = 32768
            int lengthPerSecond = 1024;
            byte[] buffer = new byte[lengthPerSecond * 32];
            int count = reader.Read(buffer, 0, lengthPerSecond * 32);
            rOffset = 0; //记录R波的偏移量
           
            while (count > 0)
            {
                //检查读入的数据是否够一秒，不够则处理停止
                if (count % lengthPerSecond != 0)
                {
                    break;
                }

                //存储心电数据以及加速度数据
                byte[] channel1 = new byte[count / lengthPerSecond * 300];

                //读入原始数据(每秒拆成了4个包)
                for (int i = 0; i < count / lengthPerSecond * 4; i++)
                {
                    Array.Copy(buffer, i * lengthPerSecond / 4 + 12, channel1, i * 75, 75);

                    //在rawSignal中存入数据
                    Array.Copy(channel1, i * 75, EcgChannel1, packetCnt * 75, 75);

                    packetCnt++;

                }
            }
                #region 取三分钟数据先计算qrs的幅值
                detect_and_classify detectAndClassify = new detect_and_classify();
                //先清空模板变量
                detectAndClassify.ClearDetectAndClassify();

                int avgAmp = 0;
                int ampLen = 300 * ecgSampleRate;
                if (ampLen > EcgChannel1.Count())
                {
                    ampLen = EcgChannel1.Count();
                }
                int TotalAmp = 0;
                //取左右150ms的值 
                int leftPos = 150 / 1000 * ecgSampleRate;
                int totalROffset = 0;
                int cnt = 0;
                for (int i = 0; i < ampLen; i++)
                {
                    int[] Type = new int[1];
                    int[] Match = new int[1];
                    int ecgSample = (EcgChannel1[i] - 128) * 30;
                    int delay = detectAndClassify.GetDetectAndClassify(ecgSample, Type, Match);
                    if (delay > 0)
                    {
                        int rOffset1 = totalROffset - delay;
                        int maxAmp = 0;
                        int minAmp = 0;
                        if (rOffset1 - leftPos < 0) continue;
                        for (int j = rOffset1 - leftPos; j <= rOffset1 + leftPos; j++)
                        {
                            if (EcgChannel1[j] > maxAmp)
                            {
                                maxAmp = (int)EcgChannel1[j];
                            }
                            if (EcgChannel1[j] < minAmp)
                            {
                                minAmp = EcgChannel1[j];
                            }
                        }
                        TotalAmp += maxAmp - minAmp;
                        cnt++;
                    }
                    totalROffset++;
                }
                if (TotalAmp > 0 && cnt>0)
                    avgAmp = TotalAmp / cnt;


                //保存最后一批未被替换的模板
                //模板变量
                int MAXTYPES = 32;
                int BEATLGTH = 150;
                int[,] BeatTemplates = new int[MAXTYPES, BEATLGTH];
                int[] BeatCounts = new int[MAXTYPES];
                int[] BeatClassifications = new int[MAXTYPES];
                int[] BeatAmps = new int[MAXTYPES];
                int[] BeatBegins = new int[MAXTYPES];
                int[] BeatCenters = new int[MAXTYPES];
                int[] BeatEnds = new int[MAXTYPES];
                double[,] MIs = new double[MAXTYPES, 8];
                int[] SinceLastMatch = new int[MAXTYPES];
                int[] BeatWidths = new int[MAXTYPES];

                detectAndClassify.GetBeatTemplates(BeatTemplates, BeatCounts, BeatClassifications, BeatWidths,
                                                    BeatBegins, BeatEnds, SinceLastMatch, BeatAmps, BeatCenters, MIs);

                int ampIndex = 0;
                int beatAmp = 0;
                for (int i = 0; i < MAXTYPES; i++)
                {
                    if (BeatClassifications[i] == 1)
                    {
                        ampIndex++;
                        beatAmp += BeatAmps[i];
                    }
                }

                if(ampIndex>0)
                    beatAmp = beatAmp / ampIndex;
                if (beatAmp > 0 && avgAmp>0)
                {
                    beatAmp = beatAmp / avgAmp;
                }
                else
                {
                    beatAmp = 30;
                }
                detectAndClassify.ClearDetectAndClassify();
                #endregion

                #region  该段数据中有多少个ECG窗口
                //该段数据中有多少个ECG窗口
                int[] beatType = new int[1];
                int[] beatMatch = new int[1];

                detectAndClassify.ClearDetectHrvAnalysis();
                
             
                for (int i = 0; i < EcgChannel1.Length; i++)
                {
                    int ecgSample = (int)Math.Round((double)(EcgChannel1[i] - 128) * beatAmp);
                    int delay = detectAndClassify.GetDetectAndClassify(ecgSample, beatType, beatMatch);
                    if (delay > 0)
                    {
                        //记录最大RR间期和最小RR间期
                        if (lastROffset == 0)
                        {
                            lastROffset = rOffset;
                            rrIntervals.Add(lastROffset - delay); //第一个间期为检测到的第一个R波的位置
                        }
                        else
                        {
                            int rrInterval = rOffset - lastROffset - delay;
                            lastROffset = rOffset - delay;

                            //存储RRinterval
                            rrIntervals.Add(rrInterval);

                            if (minRRInterval > rrInterval)
                            {
                                minRRInterval = rrInterval;
                            }

                            if (maxRRInterval < rrInterval)
                            {
                                maxRRInterval = rrInterval;
                            }
                        }
                    }

                    //if (rOffset > 0 && (rOffset / 200) % 30 == 0 && rrIntervals.Count > RRCount)
                    //{
                    //    int[] ArrayRR = new int[rrIntervals.Count - RRCount];
                    //    float[] hrvparameter = new float[11];
                    //    rrIntervals.CopyTo(RRCount, ArrayRR, 0, rrIntervals.Count - RRCount);
                    //    float[] ArrayRRNew = new float[rrIntervals.Count - RRCount];
                    //    for (int z = 0; z < ArrayRR.Length; z++)
                    //    {
                    //        ArrayRRNew[z] = (float)ArrayRR[z] / 200;
                    //    }

                    //    detectAndClassify.getHRVFeature(ArrayRRNew, ArrayRR.Length, hrvparameter);

                        
                    //    RRCount = rrIntervals.Count;
                    //}

                    if (rOffset % 1024 == 0)
                        progressObserver.UpdateProgress(rOffset);
                    rOffset++;
                }
                #endregion


            //通知已经读取完成
            completed = true;

            progressObserver.UpdateProgress(FINISHED);
        }

    }
}
