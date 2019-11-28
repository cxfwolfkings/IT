using System;

namespace Com.Colin.Demo.OOP
{
    /// <summary>
    /// 声明委托
    /// </summary>
    /// <returns></returns>
    public delegate string FishEventHandler();

    /// <summary>
    /// sealed代表类或者函数是密封的，不能再被继承或重写
    /// </summary>
    sealed class Fish : Animal
    {
        public event FishEventHandler OnSwim;

        /// <summary>
        /// 静态构造函数
        /// </summary>
        static Fish()
        {
            Console.WriteLine("造鱼机已经准备就绪！");
        }

        // 类会自动添加一个无参数的构造函数，如果添加了自定义构造函数，类就不会再自动添加了

        /// <summary>
        /// 派生类中重写基类函数时，需要用override显式声明
        /// </summary>
        /// <returns></returns>
        public override string Fly()
        {
            return "I can't fly!";
        }
        public override string Swim()
        {
            if (OnSwim != null)
            {
                return OnSwim();
            }
            else
            {
                return "我会游泳吗？";
            }
        }

        /// <summary>
        /// 方法重载（多态）
        /// </summary>
        /// <param name="length"></param>
        /// <param name="width"></param>
        /// <param name="height"></param>
        /// <returns></returns>
        public int Size(int length, int width, int height)
        {
            return length * width * height;
        }
        /// <summary>
        /// 可选参数是一种很方便实用的功能，但是它必须放在参数列表的最后，并且必须提供默认值
        /// </summary>
        /// <param name="size"></param>
        /// <param name="weight"></param>
        /// <returns></returns>
        public int Size(int size, int weight = 1)
        {
            return size;
        }

        /// <summary>
        /// 隐藏一个方法用new关键字声明
        /// </summary>
        /// <returns></returns>
        new public string Sound()
        {
            // base用于在派生类中调用基类的方法
            return base.Sound();
        }
    }
}
