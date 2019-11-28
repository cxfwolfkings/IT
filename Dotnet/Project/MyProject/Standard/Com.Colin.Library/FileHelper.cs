using Com.Colin.Frw.Lib;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.IO;
using System.IO.Compression;
using System.Runtime.InteropServices;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;

namespace Com.Colin.Lib
{
    /// <summary>
    /// 处理文件的帮助类
    /// 作者：Charles
    /// 编写日期：2014-11-26
    /// </summary>
    class FileHelper
    {
        #region File类
        /// <summary>
        /// 复制文件
        /// </summary>
        /// <param name="sourceFilePath">源文件路径</param>
        /// <param name="targetFilePath">目标文件路径</param>
        /// <return>
        /// 复制成功与否
        /// </return>
        public static bool copyFile(string sourceFilePath, string targetFilePath)
        {
            if (!File.Exists(sourceFilePath))
            {
                throw new Exception("源文件不存在!");
            }
            else
            {
                File.Copy(sourceFilePath, targetFilePath);
            }
            return true;
        }

        /// <summary>
        /// 新建文件
        /// </summary>
        /// <param name="targetFilePath">目标文件路径</param>
        /// <return>
        /// 新建文件
        /// </return>
        public static FileStream createFile(string targetFilePath)
        {
            if (File.Exists(targetFilePath))
            {
                throw new Exception("已有同名文件存在!");
            }
            return File.Create(targetFilePath);
        }

        /// <summary>
        /// 删除文件
        /// </summary>
        /// <param name="targetFilePath">目标文件路径</param>
        /// <return>
        /// 删除成功与否
        /// </return>
        public static bool deleteFile(String targetFilePath)
        {
            if (File.Exists(targetFilePath))
            {
                File.Delete(targetFilePath);
            }
            return true;
        }

        /// <summary>
        /// 读取文件
        /// </summary>
        /// <param name="targetFilePath">目标文件路径</param>
        /// <return>
        /// 文件流
        /// </return>
        public static FileStream openFile(String targetFilePath)
        {
            if (!File.Exists(targetFilePath))
            {
                throw new Exception("源文件不存在!");
            }
            return File.Open(targetFilePath, FileMode.Open);
        }

        /// <summary>
        /// 移动文件
        /// </summary>
        /// <param name="sourcePath"></param>
        /// <param name="targetPath"></param>
        /// <returns></returns>
        public static bool moveFile(string sourcePath, string targetPath)
        {
            if (!File.Exists(sourcePath))
            {
                throw new Exception("源文件不存在!");
            }
            if (File.Exists(targetPath))
            {
                throw new Exception("新目录已经存在同名文件!");
            }
            File.Move(sourcePath, targetPath);
            return true;
        }

        #endregion


        #region Directory类
        /// <summary>
        /// 在指定路径创建目录结构
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static DirectoryInfo createDir(string path)
        {
            if (Directory.Exists(path))
                throw new Exception("已存在相同目录结构！");
            return Directory.CreateDirectory(path);
        }

        /// <summary>
        /// 删除目录
        /// </summary>
        /// <param name="path">目录路径</param>
        /// <param name="delAll">是否递归删除？是，删除目录，子目录，所有文件；否：只能删除空目录，否则报错</param>
        /// <returns></returns>
        public static bool deleteDir(string path, bool delAll)
        {
            if (!Directory.Exists(path))
                throw new Exception("目录不存在！");
            Directory.Delete(path, delAll);
            return true;
        }

        /// <summary>
        /// 获取目录结构
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static string[] getDirStruct(string path)
        {
            if (!Directory.Exists(path))
                throw new Exception("目录不存在！");
            return Directory.GetDirectories(path);
        }

        /// <summary>
        /// 移动文件夹
        /// </summary>
        /// <param name="sourcePath">源文件夹路径</param>
        /// <param name="directoryPath">目标文件夹路径</param>
        /// <return>
        /// 移动成功与否
        /// </return>
        public static bool deleteDirectory(String sourcePath, String directoryPath)
        {
            Directory.Move(sourcePath, directoryPath);
            //举例来讲，如果您尝试将 c:\mydir 移到 c:\public，
            //并且 c:\public 已存在，则此方法引发 IOException。
            //您必须将"c:\\public\\mydir"指定为 destDirName 参数，
            //或者指定新目录名，例如"c:\\newdir"
            return true;
        }

        /// <summary>
        /// 获取文件夹内文件
        /// </summary>
        /// <param name="directoryPath">目标文件夹路径</param>
        /// <return>
        /// 全部文件
        /// </return>
        public static string[] getFilesByDirectory(String directoryPath)
        {
            if (!Directory.Exists(directoryPath))
            {
                throw new Exception("文件夹不存在!");
            }
            else
            {
                string[] fileEntries = Directory.GetFiles(directoryPath);
                return fileEntries;
            }
        }

        #endregion


        #region FileInfo类
        /// <summary>
        /// 复制文件
        /// </summary>
        /// <param name="sourceFilePath">源文件路径</param>
        /// <param name="targetFilePath">目标文件路径</param>
        /// <return>
        /// 复制成功与否
        /// </return>
        public static bool copyFile1(String sourceFilePath, String targetFilePath)
        {
            try
            {
                if (!File.Exists(sourceFilePath))
                {
                    Console.WriteLine("源文件不存在!");
                }
                else
                {
                    FileInfo myfile = new FileInfo(sourceFilePath);
                    myfile.CopyTo(targetFilePath);
                    Console.WriteLine("复制成功!");
                    Console.WriteLine("文件创建时间：" + myfile.CreationTime.ToString());
                    Console.WriteLine("文件夹：" + myfile.Directory.ToString());
                    Console.WriteLine("文件夹名称：" + myfile.DirectoryName.ToString() + "，文件扩展名：" + myfile.Extension.ToString());
                    return true;
                }
            }
            catch
            {
                Console.WriteLine("复制失败!");
            }
            return false;
        }
        #endregion


        #region FileStream类

        /// <summary>
        /// 从随机文件中读取数据
        /// </summary>
        /// <param name="path">路径</param>
        /// <param name="l">移动字节数，可以为负，向前或向后</param>
        /// <param name="seekOrigin">开始移动的位置</param>
        public static string readDataFromRandomFile(string path,long l,SeekOrigin seekOrigin)
        {
            byte[] byData = new byte[200];
            char[] charData = new char[200];
            FileStream fileStream = File.OpenRead(path);
            fileStream.Seek(l, seekOrigin);
            fileStream.Read(byData, 0, 200);//读取200个字节放到byData
            Decoder d = Encoding.UTF8.GetDecoder();
            d.GetChars(byData, 0, byData.Length, charData, 0);//通过UTF-8编码将字节数组转换成字符数组
            return new string(charData);
        }

        /// <summary>
        /// 在随机文件中写入数据
        /// </summary>
        /// <param name="path"></param>
        /// <param name="writeData"></param>
        /// <param name="l"></param>
        /// <param name="seekOrigin"></param>
        /// <returns></returns>
        public static FileStream writeDataToRandomFile(string path, string writeData, long l, SeekOrigin seekOrigin)
        {
            char[] charData = writeData.ToCharArray();
            byte[] byData = new byte[charData.Length];
            Encoder e = Encoding.UTF8.GetEncoder();
            //最后一个参数决定在结束后Encoder对象是否应该更新状态，即Encoder对象是否仍处于原来在字节数组中的内存位置。
            //这有助于以后调用Encoder对象，但是当只进行单一调用时，这就没有什么意义。
            //最后对Encoder的调用必须将此参数设置为true，以清空其内存，释放对象，用于垃极回收。
            e.GetBytes(charData, 0, charData.Length, byData, 0, true);//通过UTF-8编码将字符数组转换成字节数组
            FileStream fileStream = File.Open(path, FileMode.OpenOrCreate);
            fileStream.Seek(l, seekOrigin);
            fileStream.Write(byData, 0, byData.Length);//将byData写入文件中
            return fileStream;
        }

        #endregion


        #region StreamWriter类

        /// <summary>
        /// 想文件中写入数据
        /// </summary>
        /// <param name="filePath"></param>
        /// <param name="line"></param>
        public static void writeDataToFile(string filePath,string line)
        {
            FileStream fileStream = new FileStream(filePath, FileMode.OpenOrCreate);
            StreamWriter sw = new StreamWriter(fileStream);
            sw.Write("{0}",line);
        }

        #endregion


        #region StreamReader类

        /// <summary>
        /// 从文件中读取数据
        /// </summary>
        /// <param name="filePath"></param>
        /// <returns></returns>
        public static string readDataFromFile(string filePath)
        {
            FileStream fileStream = new FileStream(filePath, FileMode.Open);
            StreamReader sr = new StreamReader(fileStream);
            string strLine = null;
            StringBuilder sb = new StringBuilder();
            while ((strLine = sr.ReadLine()) != null)
            {
                sb.Append(strLine+"\n");
            }
            sr.Close();
            return sb.ToString();
        }

        /// <summary>
        /// 读取分隔符分隔的数据文件
        /// </summary>
        /// <param name="filePath"></param>
        /// <param name="columns"></param>
        /// <returns></returns>
        public static List<Dictionary<string, string>> getData(string filePath, out List<string> columns)
        {
            string strLine;
            string[] strArray;
            char[] charArray = new char[] {','};
            List<Dictionary<string, string>> data = new List<Dictionary<string, string>>();
            columns = new List<string>();

            FileStream fileStream = new FileStream(filePath, FileMode.Open);
            StreamReader sr = new StreamReader(fileStream);

            strLine = sr.ReadLine();
            strArray = strLine.Split(charArray);
            for (int x = 0; x <= strArray.GetUpperBound(0); x++)
            {
                columns.Add(strArray[x]);
            }

            strLine = sr.ReadLine();
            while (strLine != null)
            {
                strArray = strLine.Split(charArray);
                Dictionary<string, string> dataRow = new Dictionary<string, string>();
                for (int x = 0; x <= strArray.GetUpperBound(0); x++)
                {
                    dataRow.Add(columns[x], strArray[x]);
                }
                data.Add(dataRow);
                strLine = sr.ReadLine();
            }
            sr.Close();

            //读取数据
            foreach (string column in columns)
            {
                //格式化字符串{O,-20}中的-20部分确保显示的名称在20字符长的列中左对齐，这有助于格式化显示结果。
                Console.Write("{0,-20}",column);
            }
            Console.WriteLine();
            foreach (Dictionary<string, string> row in data)
            {
                foreach (string column in columns)
                {
                    Console.Write("{0,-20}", row[column]);
                }
            }
            Console.WriteLine();
            Console.ReadKey();

            return data;
        }

        #endregion


        #region 读写压缩文件

        /// <summary>
        /// 保存压缩的文本文件
        /// </summary>
        /// <param name="fileName"></param>
        /// <param name="data"></param>
        public static void SaveCompressedFile(string fileName,string data)
        {
            FileStream fileStream = new FileStream(fileName, FileMode.Create, FileAccess.Write);
            GZipStream gZipStream = new GZipStream(fileStream, CompressionMode.Compress);
            StreamWriter sw = new StreamWriter(gZipStream);
            sw.Write(data);
            sw.Close();
        }

        /// <summary>
        /// 读取压缩的文本文件
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns></returns>
        public static string LoadCompressedFile(string fileName)
        {
            FileStream fileStream = new FileStream(fileName, FileMode.Open, FileAccess.Read);
            GZipStream gZipStream = new GZipStream(fileStream, CompressionMode.Decompress);
            StreamReader sr = new StreamReader(gZipStream);
            string data = sr.ReadToEnd();
            sr.Close();
            return data;
        }

        #endregion


        #region 序列化对象

        /// <summary>
        /// 序列化对象到文件
        /// </summary>
        /// <param name="fileName">文件路径</param>
        /// <param name="obj">需要序列化的对象，需要标记为可序列化</param>
        /// [Serializable]
        /// piblic class Product{
        ///     ...
        /// }
        public static void serializeObj(string fileName,object obj)
        {
            IFormatter serializer = new BinaryFormatter();
            FileStream saveFile = new FileStream(fileName, FileMode.Create, FileAccess.Write);
            serializer.Serialize(saveFile,obj);
            saveFile.Close();
        }

        /// <summary>
        /// 反序列化对象
        /// </summary>
        /// <param name="fileName">文件路径</param>
        /// <returns></returns>
        public static object deserializeObj(string fileName)
        {
            IFormatter serializer = new BinaryFormatter();
            FileStream loadFile = new FileStream(fileName, FileMode.Open, FileAccess.Read);
            object obj = serializer.Deserialize(loadFile);
            loadFile.Close();
            return obj;
        }

        #endregion


        #region 内存流

        /// <summary>
        /// byte[]转换成Stream
        /// </summary>
        /// <param name="bytes"></param>
        /// <returns></returns>
        public static Stream BytesToStream(byte[] bytes)
        {
            // 转换成无法调整大小的MemoryStream对象
            Stream stream = new MemoryStream(bytes); 
            return stream;
        }

        /// <summary>
        /// Stream转换成byte[]
        /// </summary>
        /// <param name="stream"></param>
        /// <returns></returns>
        public static byte[] StreamToBytes(Stream stream)
        {
            byte[] bytes = new byte[stream.Length];
            stream.Read(bytes, 0, bytes.Length);
            stream.Seek(0, SeekOrigin.Begin); // 设置当前流的位置为流的开始
            return bytes;
        }

        /// <summary>
        /// 从文件读取Stream
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static Stream FileToStream(string path)
        {
            // 打开文件
            FileStream fileStream = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read);
            // 读取文件的byte[]
            byte[] bytes = new byte[fileStream.Length]; 
            fileStream.Read(bytes, 0, bytes.Length);
            fileStream.Close();
            // 把byte[]转换成Stream
            Stream stream = new MemoryStream(bytes); 
            return stream;
        }

        /// <summary>
        /// 将Stream写入文件
        /// </summary>
        /// <param name="stream"></param>
        /// <param name="path"></param>
        public static void StreamToFile(Stream stream, string path)
        {
            // 把Stream转换成byte[]
            byte[] bytes = new byte[stream.Length]; 
            stream.Read(bytes, 0, bytes.Length);
            // 设置当前流的位置为流的开始
            stream.Seek(0, SeekOrigin.Begin);
            // 把byte[]写入文件
            FileStream fs = new FileStream(path, FileMode.Create); 
            BinaryWriter bw = new BinaryWriter(fs);
            bw.Write(bytes);
            bw.Close();
            fs.Close();
        }

        /// <summary>
        /// 将字节流写入文件
        /// </summary>
        /// <param name="bytes"></param>
        /// <param name="path"></param>
        public static void BytesToFile(byte[] bytes, string path)
        {
            FileStream fs = new FileStream(path, FileMode.Create);
            BinaryWriter bw = new BinaryWriter(fs);
            bw.Write(bytes);
            bw.Close();
            fs.Close();
        }

        /// <summary>
        /// 将Base64写入文件
        /// </summary>
        /// <param name="dataURL"></param>
        /// <param name="path"></param>
        public static void Base64ToFile(string dataURL, string path)
        {
            // 将 "," 以前的多余字符串删除
            string base64 = dataURL.Substring(dataURL.IndexOf(",") + 1);
            // 将纯净资源Base64转换成等效的8位无符号整形数组
            byte[] bytes = Convert.FromBase64String(base64);
            BytesToFile(bytes, path);
        }

        /// <summary>
        /// 从文件读取字节流
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static byte[] FileToBytes(string path)
        {
            // 打开文件
            FileStream fileStream = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read);
            // 读取文件的byte[]
            byte[] bytes = new byte[fileStream.Length];
            fileStream.Read(bytes, 0, bytes.Length);
            fileStream.Close();
            return bytes;
        }

        /// <summary>
        /// 文件转换成Base64字符串
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static string FileToBase64(string path)
        {
            byte[] bytes = FileToBytes(path);
            return //"data:image/jpg;base64," + 
                Convert.ToBase64String(bytes);
        }

        /// <summary> 
        /// 读写字节流示例
        /// </summary>
        /// <param name="buffer">字节数组</param>
        /// <return>
        /// </return>
        public static void readMemoryStream(byte[] buffer)
        {
            getTestData(buffer);
            // 创建内存流对象，初始分配50字节的缓冲区
            MemoryStream mem = new MemoryStream(50);
            // 向内存流中写入字节数组的所有数据
            mem.Write(buffer, 0, buffer.GetLength(0));
            // 使用从缓冲区读取的数据将字节块写入当前流。
            // 参数：
            //   1、buffer从中写入数据的缓冲区。
            //   2、offset buffer中的字节偏移量，从此处开始写入。
            //   3、count最多写入的字节数。

            // GetLength(0) 为 GetLength 的一个示例，它返回 Array 的第一维中的元素个数。
            Console.WriteLine("写入数据后的内存流长度是：" + mem.Length.ToString());
            Console.WriteLine("分配给内存流的缓冲区大小：" + mem.Capacity.ToString());

            mem.SetLength(500);

            Console.WriteLine("调用SetLength方法后的内存流长度：" + mem.Length.ToString());

            mem.Capacity = 620;//注意：此值不能小于Length属性
            Console.WriteLine("调用Capacity方法后缓冲区大小：" + mem.Capacity.ToString());

            //将读写指针移到距流开头10个字节的位置
            mem.Seek(10, SeekOrigin.Begin);
            Console.WriteLine("内存中的信息是：" + mem.ReadByte().ToString());
        }

        /// <summary>
        /// 获取测试性数据
        /// </summary>
        private static void getTestData(byte[] buffer)
        {
            for (int i = 0; i < 600; i++)
            {
                buffer[i] = (byte)(i % 256);
                // byte类型的数最大不能超过255，用256取模实现
            }
        }

        /// <summary> 
        /// 备份目标文件;Stream 和 BufferedStream 的实例
        /// </summary>
        /// <param name="sourcePath">源文件路径</param>
        /// <param name="targetPath">目标文件路径</param>
        /// <return>
        /// </return>
        public static void copyFileByBufferedStream(String sourcePath, String targetPath)
        {
            FileStream fs = File.Create(targetPath);
            fs.Dispose();
            fs.Close();

            Stream outputStream = File.OpenWrite(targetPath);
            Stream inputStream = File.OpenRead(sourcePath);

            BufferedStream bufferedInput = new BufferedStream(inputStream);
            BufferedStream bufferedOutput = new BufferedStream(outputStream);

            byte[] buffer = new Byte[4096];
            int bytesRead;

            while ((bytesRead = bufferedInput.Read(buffer, 0, 4096)) > 0)
            {
                bufferedOutput.Write(buffer, 0, bytesRead);
            }
            //通过缓冲区进行读写
            bufferedOutput.Flush();
            bufferedInput.Close();
            bufferedOutput.Close();
            //刷新并关闭 BufferStream
        }

        #endregion


        #region web.config操作类
        /// <summary>
        /// 得到AppSettings中的配置字符串信息
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static string GetConfigString(string key)
        {
            string CacheKey = "AppSettings-" + key;
            object objModel = CacheHelper.GetCache(CacheKey);
            if (objModel == null)
            {
                objModel = ConfigurationManager.AppSettings[key];
                if (objModel != null)
                {
                    CacheHelper.SetCache(CacheKey, objModel, DateTime.Now.AddMinutes(180), TimeSpan.Zero);
                }
            }
            return objModel.ToString();
        }

        /// <summary>
        /// 得到AppSettings中的配置Bool信息
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static bool GetConfigBool(string key)
        {
            bool result = false;
            string cfgVal = GetConfigString(key);
            if (null != cfgVal && string.Empty != cfgVal)
            {
                try
                {
                    result = bool.Parse(cfgVal);
                }
                catch (FormatException)
                {
                    // Ignore format exceptions.
                }
            }
            return result;
        }
        /// <summary>
        /// 得到AppSettings中的配置Decimal信息
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static decimal GetConfigDecimal(string key)
        {
            decimal result = 0;
            string cfgVal = GetConfigString(key);
            if (null != cfgVal && string.Empty != cfgVal)
            {
                try
                {
                    result = decimal.Parse(cfgVal);
                }
                catch (FormatException)
                {
                    // Ignore format exceptions.
                }
            }

            return result;
        }
        /// <summary>
        /// 得到AppSettings中的配置int信息
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static int GetConfigInt(string key)
        {
            int result = 0;
            string cfgVal = GetConfigString(key);
            if (null != cfgVal && string.Empty != cfgVal)
            {
                try
                {
                    result = int.Parse(cfgVal);
                }
                catch (FormatException)
                {
                    // Ignore format exceptions.
                }
            }

            return result;
        }
        #endregion


        #region ini文件操作类

        [DllImport("kernel32")]
        private static extern long WritePrivateProfileString(string section, string key, string val, string filePath);
        [DllImport("kernel32")]
        private static extern int GetPrivateProfileString(string section, string key, string def, StringBuilder retVal, int size, string filePath);
        [DllImport("kernel32")]
        private static extern int GetPrivateProfileString(string section, string key, string defVal, byte[] retVal, int size, string filePath);
        /// <summary>
        /// 写INI文件
        /// </summary>
        /// <param name="Section"></param>
        /// <param name="Key"></param>
        /// <param name="Value"></param>
        public void IniWriteValue(string Section, string Key, string Value, string Path)
        {
            WritePrivateProfileString(Section, Key, Value, Path);
        }
        /// <summary>
        /// 读取INI文件
        /// </summary>
        /// <param name="Section"></param>
        /// <param name="Key"></param>
        /// <returns></returns>
        public string IniReadValue(string Section, string Key, string Path)
        {
            StringBuilder temp = new StringBuilder(255);
            int i = GetPrivateProfileString(Section, Key, "", temp, 255, Path);
            return temp.ToString();
        }
        public byte[] IniReadValues(string section, string key, string path)
        {
            byte[] temp = new byte[255];
            int i = GetPrivateProfileString(section, key, "", temp, 255, path);
            return temp;
        }
        /// <summary>
        /// 删除ini文件下所有段落
        /// </summary>
        public void ClearAllSection(string path)
        {
            IniWriteValue(null, null, null, path);
        }
        /// <summary>
        /// 删除ini文件下personal段落下的所有键
        /// </summary>
        /// <param name="Section"></param>
        public void ClearSection(string Section, string Path)
        {
            IniWriteValue(Section, null, null, Path);
        }
        /// <summary>
        /// 从Ini文件中，读取所有的Sections的名称
        /// </summary>
        /// <param name="SectionList"></param>
        /// <param name="iniFilePath"></param>
        public void ReadSections(StringCollection SectionList, string iniFilePath)
        {
            //Note:必须得用Bytes来实现，StringBuilder只能取到第一个Section
            byte[] Buffer = new byte[65535];
            int bufLen = 0;
            bufLen = GetPrivateProfileString(null, null, null, Buffer, Buffer.GetUpperBound(0), iniFilePath);
            GetStringsFromBuffer(Buffer, bufLen, SectionList);
        }
        /// <summary>
        /// 读取指定的Section的所有Value到列表中
        /// </summary>
        /// <param name="Section"></param>
        /// <param name="Values"></param>
        public void ReadSectionValues(string Section, NameValueCollection Values, string iniFilePath)
        {
            StringCollection KeyList = new StringCollection();
            ReadSection(Section, KeyList, iniFilePath);
            Values.Clear();
            foreach (string key in KeyList)
            {
                Values.Add(key, IniReadValue(Section, key, ""));
            }
        }
        /// <summary>
        /// 从Ini文件中，将指定的Section名称中的所有Ident添加到列表中
        /// </summary>
        /// <param name="Section"></param>
        /// <param name="Idents"></param>
        public void ReadSection(string Section, StringCollection Idents, string iniFilePath)
        {
            byte[] Buffer = new byte[16384];
            //Idents.Clear();
            int bufLen = GetPrivateProfileString(Section, null, null, Buffer, Buffer.GetUpperBound(0), iniFilePath);
            //对Section进行解析
            GetStringsFromBuffer(Buffer, bufLen, Idents);
        }
        private void GetStringsFromBuffer(byte[] Buffer, int bufLen, StringCollection Strings)
        {
            Strings.Clear();
            if (bufLen != 0)
            {
                int start = 0;
                for (int i = 0; i < bufLen; i++)
                {
                    if ((Buffer[i] == 0) && ((i - start) > 0))
                    {
                        string s = Encoding.GetEncoding(0).GetString(Buffer, start, i - start);
                        Strings.Add(s);
                        start = i + 1;
                    }
                }
            }
        }
        #endregion
    }

}
