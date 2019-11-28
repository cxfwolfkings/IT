using System;
using System.Windows;

namespace SC.WPFSamples
{
    /// <summary>
    /// Interaction logic for AttachedPropertyDemo.xaml
    /// </summary>
    public partial class AttachedPropertyDemo : Window
    {
        public AttachedPropertyDemo()
        {
            InitializeComponent();

            MyAttachedPropertyProvider.SetMyProperty(button1, 44);

            foreach (object item in LogicalTreeHelper.GetChildren(grid1))
            {
                FrameworkElement e = item as FrameworkElement;
                if (e != null)
                    list1.Items.Add(String.Format("{0}: {1}", e.Name, MyAttachedPropertyProvider.GetMyProperty(e)));
            }
        }
    }
}
