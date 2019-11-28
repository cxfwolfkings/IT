using Com.Colin.Forms.Common;
using System;
using System.Windows.Forms;

namespace Com.Colin.Forms.Template
{
    /// <summary>
    /// 标题模块
    /// </summary>
    public partial class MenuTemplate : UserControl
    {
        public MenuTemplate()
        {
            InitializeComponent();
        }

        /// <summary>
        /// 关闭按钮事件
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void button1_Click(object sender, EventArgs e)
        {
            // 获取当前主界面
            Control currentUI = CommonFuc.getUIForm(this);
            if(currentUI is Form)
            {
                Form form = (Form)currentUI;
                form.Close();
            }
        }

        /// <summary>
        /// 标题隐藏方法
        /// </summary>
        /// <param name="visible"></param>
        public void setTitleVisible(bool visible)
        {
            label1.Visible = visible;
        }
    }
}
