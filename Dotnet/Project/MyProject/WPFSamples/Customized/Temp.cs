using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Media.Animation;
using System.Windows.Shapes;

namespace Com.Colin.WPF.Customized
{
    /// <summary>
    /// 公开一些方法，以允许在通过绑定引擎传递数据时修改数据。
    /// 例如，您可能希望有一个颜色列表，其中的颜色以 RGBA 值的形式存储，但在 UI 中以颜色名称来显示。
    /// 通过实现 Convert 和 ConvertBack，可以在绑定引擎在目标和源之间传递数据值时，更改数据值的格式。
    /// </summary>
    public class AddBfh : IValueConverter
    {
        /// <summary>
        /// Modifies the source data before passing it to the target for display in the UI.
        /// </summary>
        /// <param name="value"></param>
        /// <param name="targetType"></param>
        /// <param name="parameter"></param>
        /// <param name="culture"></param>
        /// <returns></returns>
        public object Convert(object value, Type targetType, object parameter, System.Globalization.CultureInfo culture)
        {
            float f = (float)value;
            return string.Format("{0}℃", f);
        }
        /// <summary>
        /// Modifies the target data before passing it to the source object. This method is called only in TwoWay bindings.
        /// </summary>
        /// <param name="value"></param>
        /// <param name="targetType"></param>
        /// <param name="parameter"></param>
        /// <param name="culture"></param>
        /// <returns></returns>
        public object ConvertBack(object value, Type targetType, object parameter, System.Globalization.CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }

    public class Temp : Button
    {
        static Temp()
        {
            //无外观的控件需要在静态构造函数中设置DefaultStyleKeyProperty,这样它会去在themes/generic.xaml的文件获取默认的样式。
            DefaultStyleKeyProperty.OverrideMetadata(typeof(Temp), new FrameworkPropertyMetadata(typeof(Temp)));
        }

        #region 基本控件
        TextBlock txtMaxValue = null;
        TextBlock txtMinValue = null;
        TextBlock txtCurrentValue = null;
        TextBlock txtPosition = null;
        Rectangle rect = null;
        #endregion

        #region 设置绑定
        public override void OnApplyTemplate()
        {
            base.OnApplyTemplate();
            AddBfh addBfh = new AddBfh();
            txtMaxValue = GetTemplateChild("MaxValue") as TextBlock;
            txtMinValue = GetTemplateChild("MinValue") as TextBlock;
            txtCurrentValue = GetTemplateChild("CurrentValue") as TextBlock;
            txtPosition = GetTemplateChild("Positions") as TextBlock;
            rect = GetTemplateChild("RectValue") as Rectangle;

            txtMaxValue.SetBinding(TextBlock.TextProperty, new Binding("MaxValue") { Source = this, Converter = addBfh });
            txtMinValue.SetBinding(TextBlock.TextProperty, new Binding("MinValue") { Source = this, Converter = addBfh });
            txtCurrentValue.SetBinding(TextBlock.TextProperty, new Binding("CurrentValue") { Source = this, Converter = addBfh });
            txtPosition.SetBinding(TextBlock.TextProperty, new Binding("MeterPosition") { Source = this });
            rect.SetBinding(Rectangle.HeightProperty, new Binding("CurrentValue") { Source = this });
        }
        #endregion

        #region 最大值
        public float MaxValue
        {
            get { return (float)GetValue(MaxValueProperty); }
            set { SetValue(MaxValueProperty, value); }
        }

        // Using a DependencyProperty as the backing store for MaxValue.  This enables animation, styling, binding, etc...
        public static readonly DependencyProperty MaxValueProperty =
            DependencyProperty.Register("MaxValue", typeof(float), typeof(Temp), new PropertyMetadata(100.0f));
        #endregion

        #region 最小值
        public float MinValue
        {
            get { return (float)GetValue(MinValueProperty); }
            set { SetValue(MinValueProperty, value); }
        }

        // Using a DependencyProperty as the backing store for MinValue.  This enables animation, styling, binding, etc...
        public static readonly DependencyProperty MinValueProperty =
            DependencyProperty.Register("MinValue", typeof(float), typeof(Temp), new PropertyMetadata(0f));
        #endregion

        #region 当前值
        public float CurrentValue
        {
            get { return (float)GetValue(CurrentValueProperty); }
            set { SetValue(CurrentValueProperty, value); }
        }

        // Using a DependencyProperty as the backing store for CurrentValue.  This enables animation, styling, binding, etc...
        public static readonly DependencyProperty CurrentValueProperty =
            DependencyProperty.Register("CurrentValue", typeof(float), typeof(Temp), new PropertyMetadata(50f, CurrentValueChange));

        public static void CurrentValueChange(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            (d as Temp).StoryboardPlay(e);
        }

        protected void StoryboardPlay(DependencyPropertyChangedEventArgs e)
        {
            Storyboard sb = new Storyboard();
            DoubleAnimation da = new DoubleAnimation();
            da.To = double.Parse(e.NewValue.ToString());
            da.Duration = new Duration(TimeSpan.Parse("0:0:1"));
            rect.BeginAnimation(Rectangle.HeightProperty, da);
        }
        #endregion

        #region 位置信息
        public string MeterPosition
        {
            get { return (string)GetValue(MeterPositionProperty); }
            set { SetValue(MeterPositionProperty, value); }
        }

        // Using a DependencyProperty as the backing store for MeterPosition.  This enables animation, styling, binding, etc...
        public static readonly DependencyProperty MeterPositionProperty =
            DependencyProperty.Register("MeterPosition", typeof(string), typeof(Temp), new PropertyMetadata("浴室"));
        #endregion
    }
}
