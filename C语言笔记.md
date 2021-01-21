# 目录

1. 简介
   - [C语言](#C语言)
   - [C++](#C++)
   - [C#](#C#)
     - [buffer](#buffer)
2. 实战
3. 总结



## 简介



### C#

参考：https://mp.weixin.qq.com/s?__biz=MzAwNTMxMzg1MA==&mid=2654082115&idx=4&sn=beb7f6256a02015ff98f4ba841d128a4&chksm=80d83016b7afb900c79ccf49f2b8b3ad08915658bdcd5f1d4de954b2bc406d592654257c7585&mpshare=1&scene=23&srcid=1225x3aCY0Wsybq96qmdLDvX&sharer_sharetime=1608855232091&sharer_shareid=83c85f3c4ddf8afec618435580a94a3e#rd

**const**: 编译时常量，只支持基本类型

**readonly**: 将一个变量或者一个对象设置为只读，只能在 `类作用域` 或者 `构造函数` 中被第一次赋值，一旦被赋值后，不能修改

**static**: static 成员归属于类，而不是实例。



#### buffer

`缓冲区` 是内存中的一组字节序列，`缓冲` 是用来处理落在内存中的数据，.NET `缓冲` 指的是处理 `非托管内存` 中的数据，用 `byte[]` 来表示。

当你想把数据写入到内存或者你想处理非托管内存中的数据，可以使用 .NET 提供的 `System.Buffer`类

Buffer 类包含了下面几个方法：

- `BlockCopy(Array, Int32, Array, Int32)`: 用于将指定位置开始的 原数组 copy 到 指定位置开始的 目标数组。

- `ByteLength(Array)`: 表示数组中 byte 字节的总数。

- `GetByte(Array, Int32)`: 在数组一个指定位置中提取出一个 byte。

- `SetByte(Array, Int32, Byte)`: 在数组的一个指定位置中设置一个 byte。

- `MemoryCopy(Void*, Void*, Int64, Int64)`: 从第一个源地址上copy 若干个byte 到 目标地址中。

`Buffer.BlockCopy()` 要比 `Array.Copy()` 的性能高得多，原因在于前者是按照 byte 拷贝，后者是 content 拷贝。

```C#
static void Main()
{
  short [] arr1 = new short[] { 1, 2, 3, 4, 5};
  short [] arr2 = new short[10];

  int sourceOffset = 0;
  int destinationOffset = 0;
  
  // 从 arr1 中 copy 4个字节到 arr2 中，而 4 byte = 2 short，也就是将 arr1 中的 {1,2} copy 到 arr2 中
  int count = 2 * sizeof(short);

  Buffer.BlockCopy(arr1, sourceOffset, arr2, destinationOffset, count);
  for (int i = 0; i < arr2.Length; i++)
  {
      Console.WriteLine(arr2[i]);
  }
  Console.ReadKey();
}
```

Buffer 在处理 含有基元类型的一个内存块上 具有超高的处理性能，当你需要处理内存中的数据 或者 希望快速的访问内存中的数据，这时候 Buffer 将是一个非常好的选择。



## 实战

### 开发环境

EditPlus：

```sh
# 编译
命令：E:\Arms\VC2008\bin\cl.exe
参数：$(FilePath)
目录：$(FileDir)
# 运行
命令：$(fileNameNoExt)
参数：无
目录：$(FileDir)
```



## 参考

1. [企业级图形可视化源码库](http://www.softbam.com/index.htm)