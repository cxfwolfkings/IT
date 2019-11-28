using System;
using System.Collections.Generic;
using System.Text;

namespace Com.Colin.Demo.DataStruct
{
    class TreeDemo
    {
    }

    /// <summary>
    /// 二叉查找树
    ///   1、查找<see cref="Get(TKey)"/>
    ///   2、插入<see cref="Put(TKey, TValue)"/>
    ///   3、获取最大值<see cref="GetMax"/>、最小值<see cref="GetMin"/>
    ///   4、获取天花板(Float)<see cref="Floor(TKey)"/>
    ///   5、删除最小值<see cref="DelMin"/>
    /// </summary>
    /// <typeparam name="TKey"></typeparam>
    /// <typeparam name="TValue"></typeparam>
    public class BinarySearchTreeSymbolTable<TKey, TValue> : SymbolTables<TKey, TValue> where TKey : IComparable<TKey>, IEquatable<TValue>
    {
        private Node root;
        private class Node
        {
            public Node Left { get; set; }
            public Node Right { get; set; }
            public int Number { get; set; }
            public TKey Key { get; set; }
            public TValue Value { get; set; }

            public Node(TKey key, TValue value, int number)
            {
                this.Key = key;
                this.Value = value;
                this.Number = number;
            }
        }

        /// <summary>
        /// 查找
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public override TValue Get(TKey key)
        {
            // 1、迭代方式
            TValue result = default(TValue);
            Node node = root;
            while (node != null)
            {
                if (key.CompareTo(node.Key) > 0)
                {
                    node = node.Right;
                }
                else if (key.CompareTo(node.Key) < 0)
                {
                    node = node.Left;
                }
                else
                {
                    result = node.Value;
                    break;
                }
            }
            return result;

            // 2、递归方式
            // GetValue(root, key);
        }

        /// <summary>
        /// 插入
        /// </summary>
        /// <param name="key"></param>
        /// <param name="value"></param>
        public override void Put(TKey key, TValue value)
        {
            root = Put(root, key, value);
        }

        /// <summary>
        /// 获取最大值
        /// </summary>
        /// <returns></returns>
        public override TKey GetMax()
        {
            TKey maxItem = default(TKey);
            Node s = root;
            while (s.Right != null)
            {
                s = s.Right;
            }
            maxItem = s.Key;
            return maxItem;

            // 递归法
            // return GetMaxRecursive(root);
        }

        /// <summary>
        /// 获取最小值
        /// </summary>
        /// <returns></returns>
        public override TKey GetMin()
        {
            TKey minItem = default(TKey);
            Node s = root;
            while (s.Left != null)
            {
                s = s.Left;
            }
            minItem = s.Key;
            return minItem;

            // 递归法
            // return GetMinRecursive(root);
        }

        public TKey Floor(TKey key)
        {
            Node x = Floor(root, key);
            if (x != null) return x.Key;
            else return default(TKey);
        }

        private Node Floor(Node x, TKey key)
        {
            if (x == null) return null;
            int cmp = key.CompareTo(x.Key);
            if (cmp == 0) return x;
            if (cmp < 0) return Floor(x.Left, key);
            else
            {
                Node right = Floor(x.Right, key);
                if (right == null) return x;
                else return right;
            }
        }

        /// <summary>
        /// 删除最小值
        /// </summary>
        public void DelMin()
        {
            root = DelMin(root);
        }

        private Node DelMin(Node root)
        {
            if (root.Left == null) return root.Right;
            root.Left = DelMin(root.Left);
            root.Number = Size(root.Left) + Size(root.Right) + 1;
            return root;
        }

        /// <summary>
        /// 该二叉查找树的删除节点的算法不是完美的，因为随着删除的进行，二叉树会变得不太平衡
        /// </summary>
        /// <param name="key"></param>
        public void Delete(TKey key)
        {
            root = Delete(root, key);
        }

        private Node Delete(Node x, TKey key)
        {
            int cmp = key.CompareTo(x.Key);
            if (cmp > 0) x.Right = Delete(x.Right, key);
            else if (cmp < 0) x.Left = Delete(x.Left, key);
            else
            {
                if (x.Left == null) return x.Right;
                else if (x.Right == null) return x.Left;
                else
                {
                    Node t = x;
                    x = GetMinNode(t.Right);
                    x.Right = DelMin(t.Right);
                    x.Left = t.Left;
                }
            }
            x.Number = Size(x.Left) + Size(x.Right) + 1;
            return x;
        }

        private Node GetMinNode(Node x)
        {
            if (x.Left == null) return x;
            else return GetMinNode(x.Left);
        }


        private Node Put(Node x, TKey key, TValue value)
        {
            // 如果节点为空，则创建新的节点，并返回
            // 否则比较根据大小判断是左节点还是右节点，然后继续查找左子树还是右子树
            // 同时更新节点的Number的值
            if (x == null) return new Node(key, value, 1);
            int cmp = key.CompareTo(x.Key);
            if (cmp < 0) x.Left = Put(x.Left, key, value);
            else if (cmp > 0) x.Right = Put(x.Right, key, value);
            else x.Value = value;
            x.Number = Size(x.Left) + Size(x.Right) + 1;
            return x;
        }

        private int Size(Node node)
        {
            if (node == null) return 0;
            else return node.Number;
        }


        private TValue GetValue(Node root, TKey key)
        {
            if (root == null) return default(TValue);
            int cmp = key.CompareTo(root.Key);
            if (cmp > 0) return GetValue(root.Right, key);
            else if (cmp < 0) return GetValue(root.Left, key);
            else return root.Value;
        }

        private TKey GetMaxRecursive(Node root)
        {
            if (root.Right == null) return root.Key;
            return GetMaxRecursive(root.Right);
        }

        private TKey GetMinRecursive(Node root)
        {
            if (root.Left == null) return root.Key;
            return GetMinRecursive(root.Left);
        }

    }

    public abstract class SymbolTables<TKey, TValue> where TKey : IComparable<TKey>, IEquatable<TValue>
    {
        public abstract TValue Get(TKey key);
        public abstract void Put(TKey key, TValue value);
        public abstract TKey GetMin();
        public abstract TKey GetMax();
    }
}
