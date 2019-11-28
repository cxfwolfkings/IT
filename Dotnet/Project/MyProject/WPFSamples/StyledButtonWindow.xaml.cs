using System.Windows;

namespace SC.WPFSamples
{
    /// <summary>
    /// Interaction logic for StyledButtonWindow.xaml
    /// </summary>
    public partial class StyledButtonWindow : Window
    {
        public StyledButtonWindow()
        {
            InitializeComponent();
            button1.Content = new Country { Name = "Austria", ImagePath = "images/Austria.bmp" };
        }
    }
}
