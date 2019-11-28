using System.Windows;

namespace SC.WPFSamples
{
    /// <summary>
    /// Interaction logic for StackPanelWindow.xaml
    /// 栈面板，可以将元素排列成一行或者一列。其特点是：每个元素各占一行或者一列。
    /// Orientation属性指定排列方式：Vertical（垂直）【默认】、Horizontal（水平）。
    /// 默认情况下，水平排列时，每个元素都与面板一样高；垂直排列时，每个元素都与面板一样宽。
    /// </summary>
    public partial class StackPanelWindow : Window
    {
        public StackPanelWindow()
        {
            InitializeComponent();
        }
    }
}
