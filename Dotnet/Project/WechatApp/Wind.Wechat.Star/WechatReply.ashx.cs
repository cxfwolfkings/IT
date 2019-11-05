using log4net;
using Senparc.Weixin.MP;
using System;
using System.Configuration;
using System.IO;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Xml;

namespace Com.Colin.WeChat
{
    /// <summary>
    /// WechatReply 的摘要说明
    /// </summary>
    public class WechatReply : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            ILog log = LogManager.GetLogger("Home");
            JavaScriptSerializer js = new JavaScriptSerializer();
            js.MaxJsonLength = int.MaxValue;
            string sToken = ConfigurationManager.AppSettings["Token"];
            string sEncodingAESKey = ConfigurationManager.AppSettings["EncodingAESKey"];
            string sAppID = ConfigurationManager.AppSettings["AppID"];
            try
            {
                Tencent.WXBizMsgCrypt wxcpt = new Tencent.WXBizMsgCrypt(sToken, sEncodingAESKey, sAppID);
                string sTimeStamp = context.Request.QueryString["timestamp"];
                string sNonce = context.Request.QueryString["nonce"];
                string sEchoStr = context.Request.QueryString["echostr"];
                if (!string.IsNullOrEmpty(sEchoStr))
                {
                    string sMsgSignature = context.Request.QueryString["signature"];
                    if (CheckSignature.Check(sMsgSignature, sTimeStamp, sNonce, sToken))
                    {
                        context.Response.Write(sEchoStr);
                    }
                    else
                    {
                        log.Debug("接入失败！");
                    }
                }
                else
                {
                    string sMsgSignature = context.Request.QueryString["msg_signature"];
                    string sMsg = "";  //解析之后的明文
                    string sEncryptMsg = ""; //xml格式的密文（回复）
                    string sPostData = string.Empty;
                    using (Stream stream = HttpContext.Current.Request.InputStream)
                    {
                        byte[] postBytes = new byte[stream.Length];
                        stream.Read(postBytes, 0, (int)stream.Length);
                        sPostData = Encoding.UTF8.GetString(postBytes);
                    }
                    int ret = 0;
                    ret = wxcpt.DecryptMsg(sMsgSignature, sTimeStamp, sNonce, sPostData, ref sMsg);
                    if (ret != 0)
                    {
                        throw new Exception("解密失败！错误代号：" + ret);
                    }
                    else
                    {
                        XmlDocument doc = new XmlDocument();
                        doc.LoadXml(sMsg);
                        XmlNode root = doc.FirstChild;
                        string fromUserName = root["FromUserName"].InnerText;
                        string toUserName = root["ToUserName"].InnerText;
                        if (root["Content"] != null)
                        {
                            string content = root["Content"].InnerText;
                        }
                        string evt = "";
                        if (root["Event"] != null)
                        {
                            evt = root["Event"].InnerText;
                        }
                        string sRespData = "";
                        log.Debug("事件类型：\r\n" + evt);
                        switch (evt)
                        {
                            case "subscribe":
                                sRespData = getXmlContent("First.xml", context);
                                sRespData = string.Format(sRespData, fromUserName, toUserName, GetTimeStamp());
                                log.Debug("微信模板内容：\r\n" + sRespData);
                                break;
                            default:
                                sRespData = getXmlContent("Default.xml", context);
                                sRespData = string.Format(sRespData, fromUserName, toUserName, GetTimeStamp());
                                log.Debug("微信模板内容：\r\n" + sRespData);
                                break;
                        }
                        ret = wxcpt.EncryptMsg(sRespData, sTimeStamp, sNonce, ref sEncryptMsg);
                    }
                    context.Response.Write(sEncryptMsg);
                }
            }
            catch (Exception e)
            {
                log.Error(e.Message, e.InnerException);
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

        /// <summary>  
        /// 获取时间戳  
        /// </summary>  
        /// <returns></returns>  
        private static string GetTimeStamp()
        {
            TimeSpan ts = DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0, 0);
            return Convert.ToInt64(ts.TotalSeconds).ToString();
        }

        private static string getXmlContent(string tempName, HttpContext context)
        {
            string tempPath = context.Server.MapPath("Template") + "\\" + tempName;
            using (StreamReader reader = new StreamReader(tempPath, Encoding.UTF8))
            {
                return reader.ReadToEnd();
            }
        }

    }
}