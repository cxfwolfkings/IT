using System.Windows;

namespace SC.WPFSamples
{
    /// <summary>
    /// Interaction logic for BrushesDemo.xaml
    /// </summary>
    public partial class BrushesDemo : Window
    {
        public BrushesDemo()
        {
            InitializeComponent();
        }

        private void OnReflectedButton(object sender, RoutedEventArgs e)
        {
            reflected.Play();
        }
    }
}
