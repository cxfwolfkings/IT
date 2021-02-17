# Java面试



## 基础

#### String, StringBuffer, StringBuilder对比

- String 字符串常量
- StringBuffer 字符串变量（线程安全）
- StringBuilder 字符串变量（非线程安全）

String 是不可变的对象, 因此在每次对 String 类型进行改变的时候其实都等同于生成了一个新的 String 对象，然后将指针指向新的 String 对象，所以经常改变内容的字符串最好不要用 String ，因为每次生成对象都会对系统性能产生影响，特别当内存中无引用对象多了以后， JVM 的 GC 就会开始工作，那速度是一定会相当慢的。

而如果是使用 StringBuffer 类则结果就不一样了，每次结果都会对 StringBuffer 对象本身进行操作，而不是生成新的对象，再改变对象引用。所以在一般情况下我们推荐使用 StringBuffer，特别是字符串对象经常改变的情况下。

而在某些特别情况下， String 对象的字符串拼接其实是被 JVM 解释成了 StringBuffer 对象的拼接，所以这些时候String 对象的速度并不会比 StringBuffer 对象慢，而特别是以下的字符串对象生成中，String 效率是远要比StringBuffer 快的：

```java
String S1 = "This is only a" + " simple" + " test";
StringBuffer Sb = new StringBuilder("This is only a").append(" simple").append(" test");
```

在 JVM 眼里，这个 `String S1 = "This is only a" + " simple" + "test";` 其实就是：`String S1 = "This is only a simple test";`

但要注意的是，如果字符串是来自另外的 String 对象，速度就没那么快了，JVM 会规规矩矩的按照原来的方式去做。

大部分情况下 StringBuilder > StringBuffer / String



#### 访问权限

| **关键字** | **同一个类中** | **同一个包中** | **不同包中的子类** | **不同包中的非子类** |
| ---------- | -------------- | -------------- | ------------------ | -------------------- |
| private    | √              |                |                    |                      |
| protected  | √              | √              | √                  |                      |
| public     | √              | √              | √                  | √                    |
| friendly   | √              | √              |                    |                      |


