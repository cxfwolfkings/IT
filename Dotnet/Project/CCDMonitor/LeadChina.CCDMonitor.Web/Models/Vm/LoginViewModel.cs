using System.ComponentModel.DataAnnotations;

namespace LeadChina.CCDMonitor.Web.Models.Vm
{
    /// <summary>
    /// 登录界面视图模型
    /// </summary>
    public class LoginViewModel
    {
        /// <summary>
        /// 账户
        /// </summary>
        [Required(ErrorMessage = "请输入账号")]
        public string Account { get; set; }

        /// <summary>
        /// 密码
        /// </summary>
        [Required(ErrorMessage = "请输入密码")]
        public string Password { get; set; }

        /// <summary>
        /// 登录错误信息
        /// </summary>
        public string[] ErrorMsg { get; set; } = new string[3];
    }
}
