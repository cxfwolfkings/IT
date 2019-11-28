using System.Windows;

namespace SC.WPFSamples
{
    /// <summary>
    /// Interaction logic for DockPanelWindow.xaml
    /// 停靠面板，可以将面板的某一边指定给元素，当面板大小变化时，按钮将根据指定的边进行停靠。
    /// 在DockPanel中，指定控件在容器中的停靠边，会根据定义的顺序占领边角，所有控件绝不会交叠。
    /// </summary>
    public partial class DockPanelWindow : Window
    {
        public DockPanelWindow()
        {
            InitializeComponent();
        }
    }
}
