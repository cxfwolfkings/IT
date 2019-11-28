using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;

namespace SC.WPFSamples
{
    /// <summary>
    /// Interaction logic for ResourceDemo.xaml
    /// </summary>
    public partial class ResourceDemo : Window
    {
        public ResourceDemo()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, RoutedEventArgs e)
        {
            Control ctrl = sender as Control;
            ctrl.Background = ctrl.FindResource("MyGradientBrush") as Brush;
        }

        private void button2_Click(object sender, RoutedEventArgs e)
        {
            myContainer.Resources.Clear();
            var brush = new LinearGradientBrush { StartPoint = new Point(0, 0), EndPoint = new Point(0, 1) };

            brush.GradientStops = new GradientStopCollection()
            {
                new GradientStop(Colors.White, 0.0),
                new GradientStop(Colors.Yellow, 0.14),
                new GradientStop(Colors.YellowGreen, 0.7)
            };
            myContainer.Resources.Add("MyGradientBrush", brush);
        }
    }
}
