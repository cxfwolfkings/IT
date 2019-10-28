using System.IO;

namespace LeadChina.CCDMonitor.Web.Helper
{
    /// <summary>
    /// 文件帮助类
    /// </summary>
    public class FileHelper
    {
        /// <summary>
        /// byte[]转换成Stream
        /// </summary>
        /// <param name="bytes"></param>
        /// <returns></returns>
        public static Stream BytesToStream(byte[] bytes)
        {
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
            FileStream fileStream = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read); // 打开文件
            byte[] bytes = new byte[fileStream.Length]; // 读取文件的byte[]
            fileStream.Read(bytes, 0, bytes.Length);
            fileStream.Close();
            Stream stream = new MemoryStream(bytes); // 把byte[]转换成Stream
            return stream;
        }

        /// <summary>
        /// 将Stream写入文件
        /// </summary>
        /// <param name="stream"></param>
        /// <param name="path"></param>
        public static void StreamToFile(Stream stream, string path)
        {
            byte[] bytes = new byte[stream.Length]; // 把Stream转换成byte[]
            stream.Read(bytes, 0, bytes.Length);
            stream.Seek(0, SeekOrigin.Begin); // 设置当前流的位置为流的开始
            FileStream fs = new FileStream(path, FileMode.Create); // 把byte[]写入文件
            BinaryWriter bw = new BinaryWriter(fs);
            bw.Write(bytes);
            bw.Close();
            fs.Close();
        }
    }
}