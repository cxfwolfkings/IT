using System.Windows;

namespace SC.WPFSamples
{
    /// <summary>
    /// Interaction logic for TriggerDemo.xaml
    /// </summary>
    public partial class TriggerDemo : Window
    {
        public TriggerDemo()
        {
            InitializeComponent();
        }

        private void OnPropertyTrigger(object sender, RoutedEventArgs e)
        {
            new PropertyTriggerWindow().Show();
        }

        private void OnMultiTrigger(object sender, RoutedEventArgs e)
        {
            new MultiTriggerWindow().Show();
        }

        private void OnDataTrigger(object sender, RoutedEventArgs e)
        {
            new DataTriggerWindow().Show();
        }
    }
}
