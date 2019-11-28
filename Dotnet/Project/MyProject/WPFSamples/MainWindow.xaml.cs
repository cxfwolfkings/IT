using System.Windows;

namespace SC.WPFSamples
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void LayoutMenuItem_Click(object sender, RoutedEventArgs e)
        {
            new LayoutDemo().Show();
        }
    }
}
