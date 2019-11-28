namespace Com.Colin.Demo.Basic
{
    /// <summary>
    /// 矩形类，用于测试运算符重载
    /// </summary>
    class Rectangle
    {

        // 缺省构造函数 
        public Rectangle()
        {
            Height = 0;
            Width = 0;
        }

        // 构造函数重载
        public Rectangle(int w, int h)
        {
            Width = w;
            Height = h;
        }

        // 属性：宽的get和set访问器
        public int Width { get; set; }

        // 属性：高的get和set访问器
        public int Height { get; set; }

        // 属性：面积的get访问器
        public int Area
        {
            get
            {
                return Height * Width;
            }
        }

        // 重载操作符 == 
        public static bool operator ==(Rectangle a, Rectangle b)
        {
            return ((a.Height == b.Height) && (a.Width == b.Width));
        }

        // 重载操作符 != 
        public static bool operator !=(Rectangle a, Rectangle b)
        {
            return !(a == b);
        }

        // 重载操作符 >
        public static bool operator >(Rectangle a, Rectangle b)
        {
            return a.Area > b.Area;
        }

        // 重载操作符 <
        public static bool operator <(Rectangle a, Rectangle b)
        {
            return !(a > b);
        }

        // 重载操作符 >=
        public static bool operator >=(Rectangle a, Rectangle b)
        {
            return (a > b) || (a == b);
        }

        // 重载操作符 <=
        public static bool operator <=(Rectangle a, Rectangle b)
        {
            return (a < b) || (a == b);
        }

        // 重载ToString
        public override string ToString()
        {
            return "高 = " + Height + "，宽 = " + Width;
        }

        public override bool Equals(object obj)
        {
            return base.Equals(obj);
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
    }
}
