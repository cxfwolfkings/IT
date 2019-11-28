using System;
using System.Collections.Generic;
using System.Text;

namespace Com.Colin.Demo.DataStruct
{
    /// <summary>
    /// 哈希表示例
    /// 
    /// Hashtable 由包含集合元素的存储桶组成。 存储桶是 Hashtable 中元素的虚拟子组，与在大多数集合中进行搜索和检索相比，其搜索和检索更加容易和快速。 
    /// 每个存储桶都与一个哈希代码相关联，该哈希代码通过哈希函数生成并基于元素的键。
    /// 
    /// 哈希函数是一种算法，返回基于键的数值哈希代码。该键是所存储对象的某个属性的值。哈希函数必须始终返回同一个键的同一哈希代码。 
    /// 哈希函数有可能为两个不同的键生成相同的哈希代码，但从哈希表中检索元素时，为每个唯一的键生成唯一哈希代码的哈希函数具有更好的性能。
    /// 
    /// 在 Hashtable 中用作元素的每个对象必须能够通过使用 GetHashCode 方法的实现为自身生成哈希代码。 
    /// 但是，还可以为 Hashtable 中的所有元素指定哈希函数，方法是使用接受 IHashCodeProvider 实现作为其参数之一的 Hashtable 构造函数。
    /// </summary>
    public class HashDemo
    {

    }
}
