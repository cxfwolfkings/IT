using System;
using System.Windows;
using System.Windows.Controls;

namespace Com.Colin.WPF
{
    class CodeIntro
    {
        [STAThread]
        static void Demo()
        {
            var b = new Button
            {
                Content = "Click Me!"
            };
            b.Click += (sender, e) => b.Content = "Button Clicked";
            var w = new Window
            {
                Title = "Code Demo",
                Content = b
            };

            var app = new Application();
            app.Run(w);
        }
    }
}
