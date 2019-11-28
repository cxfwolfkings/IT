using System;

namespace Com.Colin.Demo.DataStruct
{
    /// <summary>
    /// 自定义集合类
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class MyList<T>
    {
        // 常量
        const int defaultCapacity = 4;

        // 字段
        T[] items;
        int count;

        // 构造函数
        public MyList(int capacity = defaultCapacity)
        {
            items = new T[capacity];
        }

        // 属性
        public int Count
        {
            get { return count; }
        }

        public int Capacity
        {
            get
            {
                return items.Length;
            }
            set
            {
                if (value < count) value = count;
                if (value != items.Length)
                {
                    T[] newItems = new T[value];
                    Array.Copy(items, 0, newItems, 0, count);
                    items = newItems;
                }
            }
        }

        // 索引器
        public T this[int index]
        {
            get
            {
                return items[index];
            }
            set
            {
                items[index] = value;
                OnChanged();
            }
        }

        // 方法
        public void Add(T item)
        {
            if (count == Capacity) Capacity = count * 2;
            items[count] = item;
            count++;
            OnChanged();
        }

        protected virtual void OnChanged()
        {
            Changed?.Invoke(this, EventArgs.Empty);
        }

        public override bool Equals(object other)
        {
            return Equals(this, other as MyList<T>);
        }

        static bool Equals(MyList<T> a, MyList<T> b)
        {
            if (a == null) return b == null;
            if (b == null || a.count != b.count) return false;
            for (int i = 0; i < a.count; i++)
            {
                if (!Equals(a.items[i], b.items[i]))
                {
                    return false;
                }
            }
            return true;
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

        // 事件
        public event EventHandler Changed;

        // 运算符
        public static bool operator ==(MyList<T> a, MyList<T> b)
        {
            return Equals(a, b);
        }

        public static bool operator !=(MyList<T> a, MyList<T> b)
        {
            return !Equals(a, b);
        }
    }
}
