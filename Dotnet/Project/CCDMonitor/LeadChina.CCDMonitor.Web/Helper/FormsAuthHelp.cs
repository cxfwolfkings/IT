using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;

namespace LeadChina.CCDMonitor.Web.Helper
{
    /// <summary>
    /// 
    /// </summary>
    public class FormsAuthHelp
    {
        /// <summary>
        /// 将当前登入用户的信息生成ticket添加到到cookie中(用于登入)
        /// </summary>
        /// <param name="loginName">Forms身份验证票相关联的用户名(一般是当前用户的id，作为ticket的名称使用)</param>
        /// <param name="userData">用户信息</param>
        /// <param name="expireMin">有效期</param>
        public static void AddFormsAuthCookie(string loginName, object userData, int expireMin)
        {
            // 将当前登入的用户信息序列化
            var data = JsonConvert.SerializeObject(userData);

            // 创建一个FormsAuthenticationTicket，它包含登录名以及额外的用户数据。
            var ticket = new FormsAuthenticationTicket(1,
                loginName, DateTime.Now, DateTime.Now.AddDays(1), true, data);

            // 加密Ticket，变成一个加密的字符串。
            var cookieValue = FormsAuthentication.Encrypt(ticket);

            // 根据加密结果创建登录Cookie
            // FormsAuthentication.FormsCookieName是配置文件中指定的cookie名称，默认是".ASPXAUTH"
            var cookie = new HttpCookie(FormsAuthentication.FormsCookieName, cookieValue)
            {
                HttpOnly = true,
                Secure = FormsAuthentication.RequireSSL,
                Domain = FormsAuthentication.CookieDomain,
                Path = FormsAuthentication.FormsCookiePath
            };

            // 设置有效时间
            if (expireMin > 0)
                cookie.Expires = DateTime.Now.AddMinutes(expireMin);

            var context = HttpContext.Current;
            if (context == null)
                throw new InvalidOperationException();

            // 写登录Cookie
            context.Response.Cookies.Remove(cookie.Name);
            context.Response.Cookies.Add(cookie);
        }

        /// <summary>
        /// 删除用户ticket票据
        /// </summary>
        public static void RemoveFormsAuthCookie()
        {
            FormsAuthentication.SignOut();
        }
    }
}