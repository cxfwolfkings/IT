using Com.Colin.Forms.Common;
using Com.Colin.Forms.UI;
using System.Windows.Forms;

namespace Com.Colin.Forms.Template
{
    /// <summary>
    /// 顶部模块
    /// </summary>
    public partial class TitleTemplate : UserControl
    {
        public TitleTemplate()
        {
            InitializeComponent();
            // 隐藏标题
            menuTemplate1.setTitleVisible(false);
        }

        /// <summary>
        /// “用户信息”按钮事件
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void button2_Click(object sender, System.EventArgs e)
        {
            Control currentUI = CommonFuc.getUIForm(this);
            if (currentUI is MainFrm)
            {
                MainFrm mainFrm = (MainFrm)currentUI;
                // 设置主界面为“用户信息”
                mainFrm.setUserTemplate();
            }
            else
            {
                MessageBox.Show("出错了!");
            }
        }

        /// <summary>
        /// “系统设置”按钮事件
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void button1_Click(object sender, System.EventArgs e)
        {
            Control currentUI = CommonFuc.getUIForm(this);
            if (currentUI is MainFrm)
            {
                MainFrm mainFrm = (MainFrm)currentUI;
                // 设置主界面为“系统设置”
                mainFrm.setMainTemplate();
            }
            else
            {
                MessageBox.Show("出错了!");
            }
        }

        /// <summary>
        /// 菜单栏“文件->新建”按钮事件
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void 新建NToolStripMenuItem_Click(object sender, System.EventArgs e)
        {
            // 向导控件
            ReportWizard wizard = new ReportWizard();
            wizard.ShowDialog();
        }
    }
}
