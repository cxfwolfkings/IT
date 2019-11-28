using Com.Colin.Forms.Template;
using System.Windows.Forms;

namespace Com.Colin.Forms
{
    public partial class MainFrm : Form
    {
        /// <summary>
        /// 个人信息模块
        /// </summary>
        UserTemplate userTemplate;

        public MainFrm()
        {
            InitializeComponent();
            // 初始化个人信息模块，并加入当前窗口控件
            userTemplate = new UserTemplate();
            Controls.Add(userTemplate);
        }

        /// <summary>
        /// 显示“系统设置”模块
        /// </summary>
        public void setMainTemplate()
        {
            mainTemplate1.Dock = DockStyle.Fill;
            userTemplate.Visible = false;
            mainTemplate1.Visible = true;
        }

        /// <summary>
        /// 显示“用户信息”模块
        /// </summary>
        public void setUserTemplate()
        {
            userTemplate.Dock = DockStyle.Fill;
            mainTemplate1.Visible = false;
            userTemplate.Visible = true;
        }
    }
}
