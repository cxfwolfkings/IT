using System;
using System.Collections.Generic;
using System.IO;

namespace Com.Colin.Demo.Basic
{
    public class Test
    {
        #region 1. 运算符重载示例
        public static void Test1()
        {
            // 实例化三个矩形并设置各自属性
            Rectangle objRect1 = new Rectangle();
            Rectangle objRect2 = new Rectangle();
            Rectangle objRect3 = new Rectangle(10, 15);
            objRect1.Height = 15;
            objRect1.Width = 10;
            objRect2.Height = 25;
            objRect2.Width = 10;

            // 打印三个矩形的信息，其中调用了ToString方法
            Console.WriteLine("矩形#1 " + objRect1);
            Console.WriteLine("矩形#2 " + objRect2);
            Console.WriteLine("矩形#3 " + objRect3);

            // 使用重载后的操作符比较矩形并打印结果
            if (objRect1 == objRect2)
            {
                Console.WriteLine("矩形#1和矩形#2高和宽都相等");
            }
            else
            {
                if (objRect1 > objRect2)
                {
                    Console.WriteLine("矩形1大于矩形2");
                }
                else
                {
                    Console.WriteLine("矩形1小于矩形2");
                }
            }

            if (objRect1 == objRect3)
            {
                Console.WriteLine("矩形1和矩形3高和宽都相等");
            }
            else
            {
                Console.WriteLine("矩形1和矩形3不相等");
            }
        }
        #endregion

        #region 2. 索引示例
        public static void Test2()
        {
            IMyInterface test = new MyClass();
            for (int i = 0; i < 10; i++)
            {
                int num = test[i];
                Console.WriteLine(num);
            }
        }
        #endregion

        #region 3. 枚举示例
        public static void Test3()
        {
            // 分别输出四个方向和对应的整数值
            Console.WriteLine(MyDirection.East);
            Console.WriteLine(MyDirection.South);
            Console.WriteLine(MyDirection.West);
            Console.WriteLine(MyDirection.North);
            Console.WriteLine(Convert.ToInt32(MyDirection.East));
            Console.WriteLine(Convert.ToInt32(MyDirection.South));
            Console.WriteLine(Convert.ToInt32(MyDirection.West));
            Console.WriteLine(Convert.ToInt32(MyDirection.North));

            // 使用枚举类型的GetNames()方法
            foreach (string s1 in Enum.GetNames(typeof(Weekday)))
            {
                Console.Write(s1 + " ");
            }
            Console.WriteLine("\n");

            // 从命令行读取枚举类型变量的值
            Console.Write("今天是星期几? ");
            Weekday wd3 = (Weekday)Enum.Parse(typeof(Weekday), Console.ReadLine());
            Console.WriteLine("明天是{0}", NextDay(wd3));
            Console.WriteLine();

            // 比较枚举类型的值
            Console.Write("体育课在星期几? ");
            Weekday wd1 = (Weekday)Enum.Parse(typeof(Weekday), Console.ReadLine());
            Console.Write("物理试验在星期几? ");
            Weekday wd2 = (Weekday)Enum.Parse(typeof(Weekday), Console.ReadLine());
            if (wd1.CompareTo(wd2) == 0)
            {
                Console.WriteLine("糟糕，在同一天。");
            }
            else
            {
                Console.WriteLine("没事，不在同一天");
            }
        }
        #endregion

        #region 4. 关键字Global, yield
        public static class Test4
        {
            // Define a new class called 'System' to cause problems.
            public class System { }
            // Define a constant called 'Console' to cause more problems.
            const int Console = 7;
            public static void Demo()
            {
                // The following line causes an error. It accesses Test.Console, which is a constant.
                foreach (int x in Range(-10, 10))
                {
                    global::System.Console.WriteLine(x);
                }
            }
        }
        #endregion

        #region 5. using关键字
        public static void Test5()
        {
            using (FileStream fs = new FileStream("", FileMode.Open))
            {
                // ...
            }
        }
        #endregion

        #region 6. implicit, explicit
        public static void Test6()
        {
            Currency currency = new Currency(1, 2);
            // 可以隐式转换
            float f = currency;

            f = 1.2f;
            // 必须强制转换
            currency = (Currency)f;
        }
        #endregion

        #region 7. check关键字
        public static void Test7()
        {
            int x = 1000000;
            int y = 1000000;

            int z = checked(x * y); // Throws OverflowException
            z = unchecked(x * y); // Returns -727379968
            z = x * y; // Depends on default
            Console.WriteLine(z);
        }
        #endregion

        #region 8. lock关键字
        public class Test8
        {
            private static readonly object synchronizationObject = new object();
            public static void Add(object x)
            {
                lock (synchronizationObject)
                {
                    //...
                }
            }
            public static void Remove(object x)
            {
                lock (synchronizationObject)
                {
                    //...
                }
            }
        }
        #endregion

        #region 私有方法

        /// <summary>
        /// 功能： 得到某日的下一日（星期几）
        /// </summary>
        /// <param name="wd">枚举类型Weekday</param>
        /// <returns>枚举类型Weekday</returns>
        private static Weekday NextDay(Weekday wd)
        {
            Weekday wdnext;
            if (wd == Weekday.Saturday)
            {
                wdnext = Weekday.Sunday;
            }
            else
            {
                wdnext = wd + 1;
            }

            return wdnext;
        }

        /// <summary>
        /// 关键字yield，返回Enumerable
        /// </summary>
        /// <param name="from"></param>
        /// <param name="to"></param>
        /// <returns></returns>
        static IEnumerable<int> Range(int from, int to)
        {
            for (int i = from; i < to; i++)
            {
                yield return i;
            }
            yield break;
        }

        #endregion
    }

    #region 其它类，结构或枚举
    /// <summary>
    /// 表示星期
    /// </summary>
    enum Weekday
    {
        Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday
    }

    /// <summary>
    /// 表示方向
    /// 默认情况下枚举中定义的值是根据定义的顺序从0开始顺序递增的
    /// 但是可以根据自定义改变
    /// </summary>
    enum MyDirection
    {
        East = 1,
        South = 2,
        West = 3,
        North = 4
    }

    class Currency
    {
        public uint Dollars { get; set; }

        public ushort Cents { get; set; }

        public Currency(uint Dollars, ushort Cents)
        {
            this.Dollars = Dollars;
            this.Cents = Cents;
        }

        /// <summary> 
        /// Currency可以隐式转换为float
        /// </summary>
        /// <param name="value"></param>
        public static implicit operator float(Currency value)
        {
            return value.Dollars + (value.Cents / 100.0f);
        }

        /// <summary>
        /// float必须强制转换为Currency
        /// </summary>
        /// <param name="value"></param>
        public static explicit operator Currency(float value)
        {
            uint dollars = (uint)value;
            ushort cents = (ushort)((value - dollars) * 100);
            return new Currency(dollars, cents);
        }
    }
    #endregion
}
