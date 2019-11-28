using System.Windows;

namespace SC.WPFSamples
{
    /// <summary>
    /// Interaction logic for LayoutDemo.xaml
    /// </summary>
    public partial class LayoutDemo : Window
    {
        public LayoutDemo()
        {
            InitializeComponent();
        }

        private void ShowStackPanel(object sender, RoutedEventArgs e)
        {
            new StackPanelWindow().Show();
        }

        private void ShowWrapPanel(object sender, RoutedEventArgs e)
        {
            new WrapPanelWindow().Show();
        }

        private void ShowCanvas(object sender, RoutedEventArgs e)
        {
            new CanvasWindow().Show();
        }

        private void ShowDockPanel(object sender, RoutedEventArgs e)
        {
            new DockPanelWindow().Show();
        }

        private void ShowGrid(object sender, RoutedEventArgs e)
        {
            new GridWindow().Show();
        }
    }
}
