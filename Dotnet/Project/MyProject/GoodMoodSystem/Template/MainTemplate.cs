using System.Windows.Forms;

namespace Com.Colin.Forms.Template
{
    /// <summary>
    /// 主界面模块
    /// </summary>
    public partial class MainTemplate : UserControl
    {
        public MainTemplate()
        {
            InitializeComponent();
            // 分割线不可调整
            splitContainer1.IsSplitterFixed = true;
        }
    }
}
