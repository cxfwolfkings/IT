using System.Windows;

namespace SC.WPFSamples
{
    /// <summary>
    /// Interaction logic for DataTriggerWindow.xaml
    /// </summary>
    public partial class DataTriggerWindow : Window
    {
        public DataTriggerWindow()
        {
            InitializeComponent();
            list1.Items.Add(new Book { Title = "Professional C# 4.0", Publisher = "Wrox Press" });
            list1.Items.Add(new Book { Title = "C# 2010 for Dummies", Publisher = "Dummies" });
            list1.Items.Add(new Book { Title = "HTML and CSS: Design and Build Websites", Publisher = "Wiley" });
        }
    }
}
