using System;
using System.Collections.Generic;
using System.Text;

namespace Com.Colin.Demo.OOP
{
    public class Test
    {
        /// <summary>
        /// 面向对象示例
        /// </summary>
        public static void Test1()
        {
            Fish fish = new Fish();
            // 参数一般需要按照顺序传送给方法，命名参数允许按任意顺序传递
            int size = fish.Size(width: 10, height: 10, length: 10);
            Console.WriteLine("the size of the fish is {0}", size);

            fish.OnSwim += () =>
            {
                return "我会游泳！";
            };
            Console.WriteLine(fish.Swim());
        }

        /// <summary>
        /// 匿名类型示例
        /// </summary>
        public static void Test2()
        {
            // 匿名类型，下面两个对象被认为类型相同
            var captain = new { FirstName = "James", MiddleName = "T", LastName = "Kirk" };
            var doctor = new { FirstName = "Leonard", MiddleName = "", LastName = "McCoy" };
            Console.WriteLine("the type is equal? {0}", captain.GetType().Equals(doctor.GetType()) ? "yes" : "no");
        }

        /// <summary>
        /// 弱引用示例
        /// </summary>
        public static void Test3()
        { 
            WeakReference mathReference = new WeakReference(new MathTest());
            // 只要显式的将弱引用的 Target 属性赋值就会得到弱引用所代表对象的一个强引用。
            MathTest math = mathReference.Target as MathTest;
            GC.Collect();
            if (mathReference.IsAlive)
            {
                // 会被垃圾回收器回收，因此使用时需要判断是否存在
                math = mathReference.Target as MathTest;
            }
        }

        /// <summary>
        /// 结构示例
        /// </summary>
        public static void Test4()
        {
            Round myRound1;
            myRound1.r = 2;
            Console.WriteLine("一号圆的面积为：{0}", myRound1.Area());
            myRound1.Paint();
            Round myRound2 = new Round(2);
            Console.WriteLine("二号圆的面积为：{0}", myRound2.Area());
            myRound2.Paint();
        }

        /// <summary>
        /// 静态类示例
        /// </summary>
        public static void Test5()
        {
            int i = 10;
            int m = 20;
            // 调用扩展方法
            string str1 = i.toStr1();
            // 调用静态方法
            string str2 = Demo.toStr2(m);
            // 输出结果
            Console.WriteLine(str1);
            Console.WriteLine(str2);
        }
    }

    class MathTest
    {

    }

    interface IShape
    {
        /// <summary>
        /// Paint方法
        /// </summary>
        void Paint();
    }

    struct Round : IShape
    {
        /// <summary>
        /// 园的半径
        /// </summary>
        public double r;

        /// <summary>
        /// 构造函数，负责初始化圆的半径
        /// </summary>
        /// <param name="x">圆的半径</param>
        public Round(double x)
        {
            r = x;
        }

        /// <summary>
        /// 求圆的面积
        /// </summary>
        /// <returns></returns>
        public double Area()
        {
            return Math.PI * r * r;
        }

        public void Paint()
        {
            Console.WriteLine("the round with r = {0} is painted!", r);
        }
    }

    /// <summary>
    /// 静态类：类只包含静态方法和属性，它就是静态的
    /// </summary>
    public static class Demo
    {
        // 定义扩展方法
        public static string toStr1(this int x)
        {
            return x.ToString();
        }

        // 定义普通静态方法
        public static string toStr2(int x)
        {
            return x.ToString();
        }
    }
}
