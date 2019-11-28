using System.Windows;

namespace SC.WPFSamples
{
    /// <summary>
    /// Interaction logic for StyledListBoxWindow.xaml
    /// </summary>
    public partial class StyledListBoxWindow : Window
    {
        public StyledListBoxWindow()
        {
            InitializeComponent();
            this.DataContext = Countries.GetCountries();
        }
    }
}
