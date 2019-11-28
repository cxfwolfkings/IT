using System.Windows;
using System.Windows.Media;

namespace SC.WPFSamples
{
    /// <summary>
    /// Interaction logic for XAMLSyntax.xaml
    /// </summary>
    public partial class XAMLSyntax : Window
    {
        public XAMLSyntax()
        {
            InitializeComponent();
        }

        private void OnButtonClick(object sender, RoutedEventArgs e)
        {
            var converter = new BrushConverter();

            object brush = converter.ConvertFromString("Red");
        }
    }
}
