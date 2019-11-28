using System;
using System.Windows;

namespace SC.WPFSamples
{
    class DependencyObjectDemo
    {
        static void Demo()
        {
            var obj = new MyDependencyObject();
            obj.ValueChanged += (sender, e) =>
            {
                Console.WriteLine("value changed from {0} to {1}", e.OldValue, e.NewValue);
            };
            obj.Value = 33;
            Console.WriteLine(obj.Maximum);
            obj.Value = 210;
            Console.WriteLine(obj.Value);
            object value = obj.GetValue(MyDependencyObject.ValueProperty);
            Console.WriteLine(value);
        }

        static void obj_ValueChanged(object sender, RoutedPropertyChangedEventArgs<int> e)
        {
            throw new NotImplementedException();
        }
    }
}
