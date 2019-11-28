using System;

namespace Com.Colin.Demo.OOP
{
    /// <summary>
    /// partial（部分类）关键字允许把类、结构、方法或接口放在多个文件中
    /// 包含抽象函数的类一定也是抽象的，必须加上abstract修饰符
    /// </summary>
    abstract partial class Animal : Organisms
    {
        // 属性
        public string Name { get; set; }

        // 构造函数
        public Animal()
        {
            Name = "动物"; 
            Console.WriteLine("Animal被构造！");
        }

        // 另一个构造函数
        public Animal(DateTime time)
        {
            Name = "动物"; 
            Console.WriteLine("Animal在" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "被构造");
        }

        /// <summary>
        /// 析构函数
        /// 在永久丢弃类的实例之前执行的操作
        /// </summary>
        ~Animal()
        {
            Name = null;
        }

        /// <summary>
        /// 虚方法，子类不一定要重写
        /// </summary>
        /// <returns></returns>
        public virtual string Living()
        {
            return "I am living!";
        }

        /// <summary>
        /// 抽象方法，子类必须实现
        /// </summary>
        /// <returns></returns>
        public abstract string Fly();
        public abstract string Swim();

        // 普通方法
        public string Sound()
        {
            return "自然之音";
        }
    }
}
