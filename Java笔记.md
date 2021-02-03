## Java

1. 简介
   - 诞生历史
   - 环境搭建
   - 基本语法
   - [开发工具](#开发工具)
   - [并发编程](#并发编程)
   - [数据结构](#数据结构)
   - [Netty](#Netty)
2. 实战
- [构建工具](#构建工具)
3. 问题
4. 总结

   - [JDK历史版本](https://www.oracle.com/technetwork/java/javase/archive-139210.html)

   - [Eclipse历史版本](https://wiki.eclipse.org/Older_Versions_Of_Eclipse)



## 简介

![x](./Resources/java.jpg)

![x](./Resources/goslin.jpg)

### 诞生历史

- 1990 sun启动 绿色计划
- 1992 创建oak语言-->java
- 1994 Gosling（JAVA之父）参加硅谷大会演示java功能，震惊世界
- 1995 sun正式发布java第一个版本

### 环境搭建

**windows**

```sh
set JAVA_HOME=C:\jdk
set PATH=%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin
set CLASSPATH=.;%JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar;%JAVA_HOME%\jre\lib\rt.jar
```

**Linux**

```sh
export JAVA_HOME=/usr/local/jdk
export PATH=$JAVA_HOME/bin:$PATH
export CLASSPATH=.:$JAVA_HOME/jre/lib/rt.jar
```

检查：`java -version`

### 基本语法

**基本类型：**

- 整型
- 浮点
- 字符
- 布尔

| **类型** | **byte** | **位数** | **范围**                                      |
| -------- | -------- | -------- | --------------------------------------------- |
| byte     | 1b       | 8        | -128到127                                     |
| short    | 2b       | 16       | -2^15到2^15-1  (-32768~32767)                 |
| int      | 4b       | 32       | -2^31到2^31-1  (-2147483648~2147483647约21亿) |
| long     | 8b       | 64       | -2^63到2^63-1                                 |
| float    | 4b       | 32       | -3.403E38~3.403E38                            |
| double   | 8b       | 64       | -1.798E308~1.798E308                          |
| char     | 2b       | 16       | '\u0000' ~ '\uffff' 即 0 ~ 65535              |
| boolean  | 1b       | 1        | false/true                                    |

**值类型和引用类型**

引用类型是一个对象类型的，它的值是指向内存空间的引用，就是地址，所指向的内存中保存着变量所表示的一个值或一组值。

声明值类型变量的同时，系统给变量分配了数据空间；引用类型则不然，只给变量分配了引用空间，数据空间没有分配。

**定义变/常量和变量的初始化**

- 变量名必须在作用域中是唯一的，不同作用域中才允许相同名字的变量出现
- 只要在同一代码块没有同名的变量名，可以在程序中任何地方定义变量，一个代码块就是两个相对的 "{ }" 之间部分
- 在类开始处声明的变量是成员变量，作用范围在整个类；
- 在方法和块中声明的变量是局部变量，作用范围到它的 "}"；

强制类型转换：由低到高（反之为自动）

```java
int a = 9;
long b = 3;
int t = a + b; // b 被自动转换为 int 参与运算
long a1 = (long)a; // a 被强制转换为 long 赋值给 a1
```

变量与存储器有着直接关系，定义一个变量就是要编译器分配所需要的内存空间，分配多少空间，这就是根据我们所定义的变量类型所决定的。变量名实际上是代表所分配空间的内存首地址

常量：用final说明

```java
final int i = 1;
```

**运算符**

优先级由高到低排列：

| **分类**   | **运算符**                 |
| ---------- | -------------------------- |
| 一元运算符 | ++ -- + - ! ~ ()           |
| 算术运算符 | * / % + -                  |
| 位移运算符 | << >> >>>                  |
| 比较运算符 | < <= > >= instanceof == != |
| 按位运算符 | & ^                        |
| 短路运算符 | && \|\|                    |
| 条件运算符 | ?:                         |
| 赋值运算符 | = += -+ *= /=              |

**分支、循环语句**

```java
if (expr1) {

} else if (expr2) {

} else {

}

switch(expr) {
    case val1:
      break;
    case val2:
      break;
    default:
      break;
}

while(expr) {
    ...
    // break; 跳出循环
    // continue; 跳出本次循环，其后代码不执行
    ...
}

do { // 先执行一次，再判断是否要循环
    ...
} while(expr)

for (int i = 0; i < max; i++) {
    ...
    // break
    // continue
    ...
}
```

**字符串：String, StringBuffer, StringBuilder**

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

**数组**

数组是有序数据的集合，数组中的每个元素具有相同的数组名，根据数组名和下标来唯一确定数组中的元素。

### 开发工具

- JetBrains
- Eclipse



### 并行基础

**什么是线程**

线程是进程内的执行单元

**线程内的基本操作**



**新建线程**

```java
Thread t1 = new Thread();
// 线程不会马上开启
t1.start();
// Thread.run()的实现target是Runnable接口
t1.run();

Thread t2 = new Thread() {
    @Override
    public void run() {
        System.out.println("Hello, I am t1");
    }
};
```

**终止线程**

```java
Thread.stop(); // 不推荐使用，会释放所有monitor
```

**中断线程**

```java
public void Thread.interrupt();  // 中断线程
public boolean Thread.isInterrupted(); // 判断是否被中断
public static boolean Thread.interrupted(); // 判断当前是否被中断，并清除当前中断状态
```

**挂起和恢复**

- `suspend()` 不会释放锁

- 如果加锁发生在 `resume()` 之前，则死锁发生

**等待线程结束和谦让**

```java
public final void join() throws InterrupedException;
public final synchronized void join(long millis) throws InterrupedException;
```

join的本质

```java
while (isAlive()) {
    wait(0);
}
// 线程执行完毕后，系统会调用notifyAll()
```

不要在 Thread 实例上使用 `wait()` 和 `notify()` 方法

**守护线程**

- 在后台默默完成一些系统性服务，比如垃圾回收、JIT
- 当一个java应用内只有守护线程时，java虚拟机会自然退出

```java
Thread t = new DaemonT();
t.setDaemon(true);
t.start();
```

**线程优先级**

```java
public final static int MIN_PRIORITY = 1;
public final static int NORM_PRIORITY = 5;
public final static int MAX_PRIORITY = 10;

Thread high = new HighPriority();
LowPriority low = new LowPriority();
high.setPriority(Thread.MAX_PRIORITY); // 高优先级的线程更容易在竞争中获胜
low.setPriority(Thread.MIN_PRIORITY);
low.start();
high.start();
```

**基本的线程同步操作**

- synchronized：锁定类、锁定实例
- `Object.wait()` ：当前线程必须拥有object监视器才可以等待，释放所有权，让其它线程获取所有权
- `Object.notify()`：当前线程必须拥有object监视器才可以通知，唤醒一个在object监视器上的线程（唤醒后该线程不是马上执行，必须等当前线程释放锁）
- `Object.notifyAll()`：唤醒所有线程，谁抢到object Monitor谁先执行。 



### 内存模型和线程安全

**原子性**

原子性是指一个操作是不可中断的。即使是在多个线程一起执行的时候，一个操作一旦开始，就不会被其它线程干扰。

i++是原子操作吗？

**有序性**

在并发时，程序的执行可能就会出现乱序！

一条指令的执行是可以分为很多步骤的：

- 取指 IF
- 译码和取寄存器操作数 ID
- 执行或者有效地址计算 EX
- 存储器访问 MEM
- 写回 WB

指令重排可以使流水线更加顺畅

**可见性**

可见性是指当一个线程修改了某一个共享变量的值，其他线程是否能够立即知道这个修改

- 编译器优化
- 硬件优化（如写吸收，批操作）

Java虚拟机层面的可见性：http://hushi55.github.io/2015/01/05/volatile-assembly

**Happen-Before**

- 程序顺序原则：一个线程内保证语义的串行性
- volatile规则：volatile变量的写，先发生于读，这保证了volatile变量的可见性
- 锁规则：解锁（unlock）必然发生在随后的加锁（lock）前
- 传递性：A先于B，B先于C，那么A必然先于C
- 线程的start()方法先于它的每一个动作
- 线程的所有操作先于线程的终结（Thread.join()）
- 线程的中断（interrupt()）先于被中断线程的代码
- 对象的构造函数执行结束先于finalize()方法



### 线程安全的概念

指某个函数、函数库在多线程环境中被调用时，能够正确地处理各个线程的局部变量，使程序功能正确完成。



## 无锁



### 无锁类的原理



### 无锁类的使用



### 无锁算法



### 数据结构

参考：[Java集合详解](https://blog.csdn.net/qq_33642117/article/details/52040345)

集合类存放于 `java.util` 包中。 

集合类存放的都是对象的引用，而非对象本身，出于表达上的便利，我们称集合中的对象就是指集合中对象的引用(reference)。 

集合类型主要有3种：set（集）、list（列表）和 map（映射）。

通俗的说，集合就是一个放数据的容器，准确的说是放数据对象引用的容器。

![x](http://viyitech.cn/public/images/java_collections.png)

## List

 ![x](http://viyitech.cn/public/images/java_list.png)

`AbstarctCollection` 是 `Collection` 接口的部分实现

`List` 是一个有序的集合，和 set 不同的是，`List` 允许存储项的值为空，也允许存储相等值的存储项。

`List` 是继承于 `Collection` 接口，除了 `Collection` 通用的方法以外，扩展了部分只属于 `List` 的方法。

`AbstractList` 也只是实现了 `List` 接口部分的方法，和 `AbstractCollection` 是一个思路。

### ArraryList

`ArrayList` 是一个数组实现的列表，由于数据是存入数组中的，所以它的特点也和数组一样，查询很快，但是中间部分的插入和删除很慢。

### Vector

`Vector` 就是 `ArrayList` 的线程安全版，它的方法前都加了 **synchronized** 锁，其他实现逻辑都相同。如果对线程安全要求不高的话，可以选择 `ArrayList` ，毕竟 `synchronized` 也很耗性能。

![x](http://viyitech.cn/public/images/java_vector.jpg)

### LinkedList

双向链表。`LinkedList` 继承于 `AbstractSequentialList`，和 `ArrayList` 一个套路。内部维护了3个成员变量，一个是当前链表的头节点，一个是尾部节点，还有链表长度。

通过上面对 `ArrayList` 和 `LinkedList` 的分析，可以理解 `List` 的3个特性

1. 是按顺序查找 
2. 允许存储项为空 
3. 允许多个存储项的值相等 

然后对比 `LinkedList` 和 `ArrayList` 的实现方式不同，可以在不同的场景下使用不同的 `List` 

1. `ArrayList` 是由数组实现的，方便查找，返回数组下标对应的值即可，适用于多查找的场景 

2. `LinkedList` 由链表实现，插入和删除方便，适用于多次数据替换的场景

### queue

**Queue**：基本上，一个队列就是一个先入先出**(FIFO)**的数据结构。

`Queue` 接口与 `List`、`Set` 同一级别，都是继承了 `Collection` 接口。`LinkedList` 实现了 `Deque` 接口。

![x](http://viyitech.cn/public/images/java_queue.png)

**Queue** 的实现

**1、** **没有实现阻塞接口的：**

`LinkedList`：实现了 `java.util.Queue` 接口和 `java.util.AbstractQueue` 接口

内置的不阻塞队列：`PriorityQueue` 和 `ConcurrentLinkedQueue`

`PriorityQueue` 和 `ConcurrentLinkedQueue` 类在 Collection Framework 中加入两个具体集合实现。 

`PriorityQueue` 类实质上维护了一个有序列表。加入到 `Queue` 中的元素根据它们的天然排序（通过其 `java.util.Comparable` 实现）或者根据传递给构造函数的 `java.util.Comparator` 实现来定位。

`ConcurrentLinkedQueue`（无界线程安全，采用**CAS**机制（`compareAndSwapObject` 原子操作））是基于链接节点的、线程安全的队列。并发访问不需要同步。因为它在队列的尾部添加元素并从头部删除它们，所以只要不需要知道队列的大小，`ConcurrentLinkedQueue` 对公共集合的共享访问就可以工作得很好。收集关于队列大小的信息会很慢，需要遍历队列。

**2、** **实现阻塞接口的：**

`java.util.concurrent` 中加入了 `BlockingQueue` 接口和五个阻塞队列类（采用锁机制，使用 `ReentrantLock` 锁）。它实质上就是一种带有一点扭曲的 FIFO 数据结构。不是立即从队列中添加或者删除元素，线程执行操作阻塞，直到有空间或者元素可用。

五个队列所提供的各有不同：

- `ArrayBlockingQueue`：一个由数组支持的有界队列。
- `LinkedBlockingQueue`：一个由链接节点支持的可选有界队列。

  * `PriorityBlockingQueue`：一个由优先级堆支持的无界优先级队列。
  * `DelayQueue`：一个由优先级堆支持的、基于时间的调度队列。
  * `SynchronousQueue`：一个利用 `BlockingQueue` 接口的简单聚集(rendezvous)机制。

**关于 `ConcurrentLinkedQueue` 和 `LinkedBlockingQueue`**

1. `LinkedBlockingQueue` 是使用锁机制，`ConcurrentLinkedQueue` 是使用CAS算法，虽然`LinkedBlockingQueue` 的底层获取锁也是使用的CAS算法

2. 关于取元素，`ConcurrentLinkedQueue` 不支持阻塞去取元素，`LinkedBlockingQueue` 支持阻塞的 take() 方法，如若大家需要 `ConcurrentLinkedQueue` 的消费者产生阻塞效果，需要自行实现

3. 关于插入元素的性能，从字面上和代码简单的分析来看 `ConcurrentLinkedQueue` 肯定是最快的，但是这个也要看具体的测试场景。在实际的使用过程中，尤其在多cpu的服务器上，有锁和无锁的差距便体现出来了，`ConcurrentLinkedQueue` 会比 `LinkedBlockingQueue` 快很多。

下表显示了jdk1.5中的阻塞队列的操作：

| 方法名      | 功能                     | 描述                                               |
| ----------- | :----------------------- | -------------------------------------------------- |
| **add**     | 增加一个元索             | 如果队列已满，则抛出一个IIIegaISlabEepeplian异常   |
| **remove**  | 移除并返回队列头部的元素 | 如果队列为空，则抛出一个NoSuchElementException异常 |
| **element** | 返回队列头部的元素       | 如果队列为空，则抛出一个NoSuchElementException异常 |
| **offer**   | 添加一个元素并返回true   | 如果队列已满，则返回false                          |
| **poll**    | 移除并返问队列头部的元素 | 如果队列为空，则返回null                           |
| **peek**    | 返回队列头部的元素       | 如果队列为空，则返回null                           |
| **put**     | 添加一个元素             | 如果队列满，则阻塞                                 |
| **take**    | 移除并返回队列头部的元素 | 如果队列为空，则阻塞                               |

**remove**、**element**、**offer** 、**poll**、**peek** 其实是属于 `Queue` 接口。 

阻塞队列的操作可以根据它们的响应方式分为以下三类：add、remove 和 element 操作在你试图为一个已满的队列增加元素或从空队列取得元素时抛出异常。当然，在多线程程序中，队列在任何时间都可能变成满的或空的，所以你可能想使用 offer、poll、peek 方法。这些方法在无法完成任务时只是给出一个出错示而不会抛出异常。

注意：poll 和 peek 方法出错会返回 null。因此，向队列中插入 null 值是不合法的

最后，我们有阻塞操作 put 和 take。put 方法在队列满时阻塞，take 方法在队列空时阻塞。

**LinkedBlockingQueue** 的容量是没有上限的（说的不准确，在不指定时容量为 Integer.MAX_VALUE，不然的话在 put 时怎么会受阻呢），但是也可以选择指定其最大容量，它是基于链表的队列，此队列按 FIFO（先进先出）排序元素。

**ArrayBlockingQueue** 在构造时需要指定容量，并可以选择是否需要公平性，如果公平参数被设置true，等待时间最长的线程会优先得到处理（其实就是通过将 ReentrantLock 设置为 true 来达到这种公平性：即等待时间最长的线程会先操作）。通常，公平性会使你在性能上付出代价，只有在的确非常需要的时候再使用它。它是基于数组的阻塞循环队列，此队列按 FIFO（先进先出）原则对元素进行排序。

**PriorityBlockingQueue** 是一个带优先级的队列，而不是先进先出队列。元素按优先级顺序被移除，该队列也没有上限（看了一下源码，`PriorityBlockingQueue` 是对 `PriorityQueue` 的再次包装，是基于堆数据结构的，而 `PriorityQueue` 是没有容量限制的，与 `ArrayList` 一样，所以在优先阻塞队列上 put 时是不会受阻的。虽然此队列逻辑上是无界的，但是由于资源被耗尽，所以试图执行添加操作可能会导致 OutOfMemoryError），但是如果队列为空，那么取元素的操作take就会阻塞，所以它的检索操作 take 是受阻的。另外，加入该队列中的元素要具有比较能力。

**DelayQueue**（基于 `PriorityQueue` 来实现的）是一个存放 Delayed 元素的无界阻塞队列，只有在延迟期满时才能从中提取元素。该队列的头部是延迟期满后保存时间最长的 Delayed 元素。如果延迟都还没有期满，则队列没有头部，并且 poll 将返回 null。当一个元素的 getDelay(TimeUnit.NANOSECONDS) 方法返回一个小于或等于零的值时，则出现期满，poll 就以移除这个元素了。此队列不允许使用 null 元素。

![x](http://viyitech.cn/public/images/java_collection.jpg)

## stack

栈是一种用于存储数据的简单数据结构，有点类似链表或者顺序表（统称线性表），栈与线性表的最大区别是数据的存取的操作，我们可以这样认为，栈(Stack)是一种特殊的线性表，其插入和删除操作只允许在线性表的一端进行，一般而言，把允许操作的一端称为栈顶(Top)，不可操作的一端称为栈底(Bottom)，同时把插入元素的操作称为入栈(Push)，删除元素的操作称为出栈(Pop)。若栈中没有任何元素，则称为空栈，栈的结构如下图： 

![x](http://viyitech.cn/public/images/java_stack.png)

由图我们可看成栈只能从栈顶存取元素，同时先进入的元素反而是后出，而栈顶永远指向栈内最顶部的元素。到此可以给出栈的正式定义：栈(Stack)是一种有序特殊的线性表，只能在表的一端（称为栈顶，top，总是指向栈顶元素）执行插入和删除操作，最后插入的元素将第一个被删除，因此栈也称为后进先出(Last In First Out, LIFO)或先进后出(First In Last Out, FILO)的线性表。栈的基本操作创建栈，判空，入栈，出栈，获取栈顶元素等，注意**栈不支持对指定位置进行删除，插入**。

 JAVA中，栈是 `Vector` 的一个子类

**顺序栈**

顺序栈，顾名思义就是采用顺序表实现的的栈，顺序栈的内部以顺序表为基础，实现对元素的存取操作，当然我们还可以采用内部数组实现顺序栈，具体请看测试代码。

**链式栈**

所谓的链式栈(Linked Stack)，就是采用链式存储结构的栈，由于我们操作的是栈顶一端，因此这里采用单链表（不带头结点）作为基础，直接实现栈的添加，获取，删除等主要操作即可。具体请看测试代码。

最后我们来看看顺序栈与链式栈中各个操作的算法复杂度（时间和空间）对比，顺序栈复杂度如下：

| **操作**                      | **时间复杂度** |
| ----------------------------- | -------------- |
| SeqStack空间复杂度（N次push） | O(n)           |
| push()时间复杂度              | O(1)           |
| pop()时间复杂度               | O(1)           |
| peek()时间复杂度              | O(1)           |
| isEmpty()时间复杂度           | O(1)           |

  链式栈复杂度如下：

| **操作**                        | **时间复杂度** |
| ------------------------------- | -------------- |
| SeqStack空间复杂度(用于N次push) | O(n)           |
| push()时间复杂度                | O(1)           |
| pop()时间复杂度                 | O(1)           |
| peek()时间复杂度                | O(1)           |
| isEmpty()时间复杂度             | O(1)           |

由此可知栈的主要操作都可以在常数时间内完成，这主要是因为栈只对一端进行操作，而且操作的只是栈顶元素。

**栈的应用**

栈是一种很重要的数据结构，在计算机中有着很广泛的应用，如下一些操作都应用到了栈。

- 符号匹配

- 中缀表达式转换为后缀表达式

- 计算后缀表达式

- 实现函数的嵌套调用

- HTML和XML文件中的标签匹配

- 网页浏览器中已访问页面的历史记录

接下来我们分别对符合匹配，中缀表达式转换为后缀表达式进行简单的分析，以加深我们对栈的理解。

**符号匹配** 

在编写程序的过程中，我们经常会遇到诸如圆括号 "()" 与花括号 "{}"，这些符号都必须是左右匹配的，这就是我们所说的符合匹配类型，当然符合不仅需要个数相等，而且需要先左后右的依次出现，否则就不符合匹配规则，如 ")("，明显是错误的匹配，而 "()" 才是正确的匹配。有时候符合如括号还会嵌套出现，如 "9-(5+(5+1))" ，而嵌套的匹配原则是一个右括号与其前面最近的一个括号匹配，事实上编译器帮我检查语法错误是也是执行一样的匹配原理，而这一系列操作都需要借助栈来完成，接下来我们使用栈来实现括号 "()" 是否匹配的检测。 

判断原则如下 str="((5-3)*8-2)"：

1. 设置 str 是一个表达式字符串，从左到右依次对字符串 str 中的每个字符 char 进行语法检测，如果 char 是左括号则入栈，如果 char 是右括号则出栈（有一对匹配就可以去匹配一个左括号，因此可以出栈），若此时出栈的字符 char 为左括号，则说明这一对括号匹配正常，如果此时栈为空或者出栈字符不为左括号，则表示缺少与 char 匹配的左括号，即目前不完整。

2. 重复执行 a 操作，直到 str 检测结束，如果此时栈为空，则全部括号匹配，如果栈中还有左括号，是说明缺少右括号。

整个检测算法的执行流程如下图：

![x](http://viyitech.cn/public/images/java_stack1.png)

接着我们用栈作为存储容器通过代码来实现这个过程，代码比较简单，如下：

```java
package com.zejian.structures.Stack;

/**
 * Created by zejian on 2016/11/27.
 * Blog : http://blog.csdn.net/javazejian [原文地址,请尊重原创]
 * 表达式检测
 */
public class CheckExpression {
  public static String isValid(String expstr) {
    //创建栈
    LinkedStack<String> stack = new LinkedStack<>();
    int i = 0;
    while (i < expstr.length()) {
      char ch=expstr.charAt(i);
      i++;
      switch (ch) {
        case '(': stack.push(ch + ""); //左括号直接入栈
          break;
        case ')': if (stack.isEmpty() || !stack.pop().equals("(")) //遇见右括号左括号直接出栈
          return** "(";
      }
    }
    //最后检测是否为空,为空则检测通过
    if (stack.isEmpty())
      return "check pass!";
    else
      return "check exception!";
  }

  public static void main(String args[]) {
    String expstr="((5-3)*8-2)";
    System.out.println(expstr+" "+isValid(expstr));
  }
}
```

**中缀表达式转换为后缀表达式** 

我们先来了解一下什么是中缀表达式，平常所见到的计算表达式都算是中缀表达式，如以下的表达式：

//1+3*(9-2)+9 --->中缀表达式（跟日常见到的表达式没啥区别）

了解中缀表达式后来看看其定义：将运算符写在两个操作数中间的表达式称为中缀表达式。在中缀表达式中，运算符拥有不同的优先级，同时也可以使用圆括号改变运算次序，由于这两点的存在，使用的中缀表达式的运算规则比较复杂，求值的过程不能从左往右依次计算，当然这也是相对计算机而言罢了，毕竟我们日常生活的计算使用的还是中缀表达式。既然计算机感觉复杂，那么我们就需要把中缀表达式转化成计算机容易计算而且不复杂的表达式，这就是后缀表达式了，在后缀表达式中，运算符是没有优先级的，整个计算都是遵守从左往右的次序依次计算的，如下我们将中缀表达式转为后缀表达式：

//1+3*(9-2)+9     转化前的中缀表达式
//1 3 9 2 - * + 9 + 转化后的后缀表达式

中缀转后缀的转换过程需要用到栈，这里我们假设栈A用于协助转换，并使用数组B用于存放转化后的后缀表达式具体过程如下： 

1. 如果遇到操作数，我们就直接将其放入数组B中。 
2. 如果遇到运算符，则我们将其放入到栈A中，遇到左括号时我们也将其放入栈A中。 
3. 如果遇到一个右括号，则将栈元素弹出，将弹出的运算符输出并存入数组B中直到遇到左括号为止。注意，左括号只弹出并不存入数组。 
4. 如果遇到任何其他的操作符，如("+", "*", "(")等，从栈中弹出元素存入数组B直到遇到发现更低优先级的元素（或者栈为空）为止。弹出完这些元素后，才将遇到的操作符压入到栈中。有一点需要注意，只有在遇到")"的情况下我们才弹出"("，其他情况我们都不会弹出"("。 
5. 如果我们读到了输入的末尾，则将栈中所有元素依次弹出存入到数组B中。 
6. 到此中缀表达式转化为后缀表达式完成，数组存储的元素顺序就代表转化后的后缀表达式。 

执行图示过程如下： 

![x](http://viyitech.cn/public/images/java_stack2.png)

简单分析一下流程，当遇到操作数时（规则1），直接存入数组B中，当i=1（规则2）时，此时运算符为+，直接入栈，当i=3（规则2）再遇到运算符*，由于栈内的运算符+优先级比*低，因此直接入栈，当i=4时，遇到运算符'('，直接入栈，当i=6时，遇运算符-，直接入栈，当i=8时（规则3），遇')'，-和'('直接出栈，其中运算符-存入后缀数组B中，当i=9时（规则5），由于*优先级比+高，而+与+平级，因此和+出栈，存入数组B，而后面的+再入栈，当i=10（规则5），结束，+直接出栈存入数组B，此时数组B的元素顺序即为1 3 9 2 - * + 9 +，这就是中缀转后缀的过程。 

接着转成后缀后，我们来看看计算机如何利用后缀表达式进行结果运算，通过前面的分析可知，后缀表达式是没有括号的，而且计算过程是按照从左到右依次进行的，因此在后缀表达的求值过程中，当遇到运算符时，只需要取前两个操作数直接进行计算即可，而当遇到操作数时不能立即进行求值计算，此时必须先把操作数保存等待获取到运算符时再进行计算，如果存在多个操作数，其运算次序是后出现的操作数先进行运算，也就是后进先运算，因此后缀表达式的计算过程我们也需要借助栈来完成，该栈用于存放操作数，后缀表达式的计算过程及其图解如下： 

![x](http://viyitech.cn/public/images/java_stack3.png)

借助栈的程序计算过程：

![x](http://viyitech.cn/public/images/java_stack4.png)

简单分析说明一下： 

1. 如果ch是数字，先将其转换为整数再入栈 
2. 如果是运算符，将两个操作数出栈，计算结果再入栈 
3. 重复 1 和 2 直到后缀表达式结束，最终栈内的元素即为计算的结果。 

整体呈现实现如下：

```java
package com.zejian.structures.Stack;

/**
* Created by zejian on 2016/11/28.
* Blog : http://blog.csdn.net/javazejian [原文地址,请尊重原创]
* 中缀转后缀,然后计算后缀表达式的值
*/
public class CalculateExpression {

  /**
   * 中缀转后缀
   * @param expstr 中缀表达式字符串
   * @return
   */
  public static String toPostfix(String expstr)
  {
      //创建栈,用于存储运算符
      SeqStack<String> stack = new SeqStack<>(expstr.length());

      String postfix="";//存储后缀表达式的字符串
      int i=0;
      while (i<expstr.length())
      {
          char ch=expstr.charAt(i);
          switch (ch)
          {
              case '+':
              case '-':
                  //当栈不为空或者栈顶元素不是左括号时,直接出栈,因此此时只有可能是*/+-四种运算符(根据规则4),否则入栈
                  while (!stack.isEmpty() && !stack.peek().equals("(")) {
                      postfix += stack.pop();
                  }
                  //入栈
                  stack.push(ch+"");
                  i++;
                  break;
              case '*':
              case '/':
                  //遇到运算符*/
                  while (!stack.isEmpty() && (stack.peek().equals("*") || stack.peek().equals("/"))) {
                      postfix += stack.pop();
                  }
                  stack.push(ch+"");
                  i++;
                  break;
              case '(':
                  //左括号直接入栈
                  stack.push(ch+"");
                  i++;
                  break;
              case ')':
                  //遇到右括号(规则3)
                  String out = stack.pop();
                  while (out!=null && !out.equals("("))
                  {
                      postfix += out;
                      out = stack.pop();
                  }
                  i++;
                  break;
              default:
                  //操作数直接入栈
                  while (ch>='0' && ch<='9')
                  {
                      postfix += ch;
                      i++;
                      if (i<expstr.length())
                          ch=expstr.charAt(i);
                      else
                          ch='=';
                  }
                  //分隔符
                  postfix += " ";
                  break;
          }
      }
      //最后把所有运算符出栈(规则5)
      while (!stack.isEmpty())
          postfix += stack.pop();
      return postfix;
  }

  /**
   * 计算后缀表达式的值
   * @param postfix 传入后缀表达式
   * @return
   */
  public static int calculatePostfixValue(String postfix)
  {
      //栈用于存储操作数,协助运算
      LinkedStack<Integer> stack = new LinkedStack<>();
      int i=0, result=0;
      while (i<postfix.length())
      {
          char ch=postfix.charAt(i);
          if (ch>='0' && ch<='9')
          {
              result=0;
              while (ch!=' ')
              {
                  //将整数字符转为整数值ch=90
                  result = result*10 + Integer.parseInt(ch+"");
                  i++;
                  ch = postfix.charAt(i);
              }
              i++;
              stack.push(result);//操作数入栈
          }
          else
          {  //ch 是运算符,出栈栈顶的前两个元素
              int y= stack.pop();
              int x= stack.pop();
              switch (ch)
              {   //根据情况进行计算
                  case '+': result=x+y; break;
                  case '-': result=x-y; break;
                  case '*': result=x*y; break;
                  case '/': result=x/y; break;   //注意这里并没去判断除数是否为0的情况
              }
              //将运算结果入栈
              stack.push(result);
              i++;
          }
      }
      //将最后的结果出栈并返回
      return stack.pop();
  }
  //测试
  public static void main(String args[])
  {
      String expstr="1+3*(9-2)+90";
      String postfix = toPostfix(expstr);
      System.out.println("中缀表达式->expstr=  "+expstr);
      System.out.println("后缀表达式->postfix= "+postfix);
      System.out.println("计算结果->value= "+calculatePostfixValue(postfix));
  }

}
```

以上便是利用转实现中缀与后缀的转换过程并且通过后缀计算机能及其简单计算出后缀表达式的结果。

JAVA中，栈 `Stack` 是 **Vector** 的一个子类，内部使用数组保存数据，可以自动按需增长（不够时翻倍，最大`Integer.MAX_VALUE`），线程安全。

OK~，到此我们对栈的分析就结束了，本来还想聊聊函数调用的问题，但感觉这个问题放在递归算法更恰当。

## Set

![x](http://viyitech.cn/public/images/java_set.png)

Set和List一样，也继承于Collection，是集合的一种。和List不同的是，Set内部实现是基于Map的，所以Set取值时不保证数据和存入的时候顺序一致，并且不允许空值，不允许重复值。

Set的特点，主要由其内部的Map决定的，Set就是Map的一个马甲

HashSet主要由HashMap实现，TreeSet和HashMap的处理方式相似，区别的地方是，TreeSet内部的是一颗红黑树。

```txt
---| Itreable          接口，实现该接口可以使用增强for循环
---| Collection        描述所有集合共性的接口
    ---| List接口       可以有重复元素的集合
        ---| ArrayList   
        ---| LinkedList
    ---| Set接口        不可以有重复元素的集合
        ---| HashSet    线程不安全，存取速度快。底层是以哈希表实现的。
        ---| TreeSet    红-黑树的数据结构，默认对元素进行自然排序(String)。如果在比较的时候两个对象返回值为0，那么元素重复。
```

### 对象的相等性

引用到堆上同一个对象的两个引用是相等的。如果对两个引用调用hashCode方法，会得到相同的结果，如果对象所属的类没有覆盖Object的hashCode方法的话，hashCode会返回每个对象特有的序号（java是依据对象的内存地址计算出的此序号），所以两个不同的对象的hashCode值是不可能相等的。

如果想要让两个不同的Person对象视为相等的，就必须覆盖Object继承下来的hashCode方法和equals方法，因为Object hashCode方法返回的是该对象的内存地址，所以必须重写hashCode方法，才能保证两个不同的对象具有相同的hashCode，同时也需要两个不同对象比较equals方法会返回true。该集合中没有特有的方法，直接继承自Collection。

### HashSet

哈希表边存放的是哈希值。HashSet 存储元素的顺序并不是按照存入时的顺序（和 List 显然不同），是按照哈希值来存的。所以取数据也是按照哈希值取的。

HashSet 不存入重复元素的规则：使用 hashcode 和 equals

由于 Set 集合是不能存入重复元素的集合。那么 HashSet 也是具备这一特性的。HashSet 如何检查重复？

HashSet 会通过元素的 hashcode() 和 equals 方法进行判断元素是否重复。

当你试图把对象加入 HashSet 时，HashSet 会使用对象的 hashCode 来判断对象加入的位置。同时也会与其他已经加入的对象的 hashCode 进行比较，如果没有相等的hashCode，HashSet 就会假设对象没有重复出现。

简单一句话，如果对象的 hashCode 值是不同的，那么 HashSet 会认为对象是不可能相等的。因此我们自定义类的时候需要重写 hashCode，来确保相等对象具有相同的 hashCode 值。

如果元素（对象）的 hashCode 值相同，是不是就无法存入 HashSet 中了？当然不是，会继续使用 equals 进行比较。如果 equals 为 true 那么 HashSet 认为新加入的对象重复了，所以加入失败。如果 equals 为 false，那么HashSet 认为新加入的对象没有重复，新元素可以存入。

总结：

元素的哈希值是通过元素的 hashcode 方法来获取的，HashSet 首先判断两个元素的哈希值，如果哈希值一样，接着会比较 equals 方法。如果 equals 结果为 true，HashSet 就视为同一个元素。如果 equals 为 false 就不是同一个元素。

哈希值相同，equals 为 false 的元素是怎么存储呢，就是在同样的哈希值下顺延（可以认为哈希值相同的元素放在一个哈希桶中）。也就是哈希一样的存一列。

![x](http://viyitech.cn/public/images/java_hash.png)

图1：hashCode值不相同的情况；图2：hashCode值相同，但equals不相同的情况。

HashSet：通过 hashCode 值来确定元素在内存中的位置。一个 hashCode 位置上可以存放多个元素。

HashSet 到底是如何判断两个元素重复？

通过 hashCode 方法和 equals 方法来保证元素的唯一性，add() 返回的是 boolean 类型。

HashSet 和 ArrayList 集合都有判断元素是否相同的方法，`boolean contains(Object o)`

HashSet 使用 `hashCode` 和 `equals` 方法，ArrayList 使用了 `equals` 方法

案例：

- 使用 HashSet 存储字符串，并尝试添加重复字符串；回顾 String 类的 equals()、hashCode() 两个方法。

问题：

- 现在有一批数据，要求不能重复存储元素，而且要排序。ArrayList、LinkedList不能去除重复数据。HashSet可以去除重复，但是是无序。所以这时候就要使用 TreeSet 了

### TreeSet

案例：使用TreeSet集合存储字符串元素，并遍历

红黑树是一种特定类型的二叉树

![x](http://viyitech.cn/public/images/java_treeset.jpg)

红黑树算法的规则: **左小右大**。

既然 TreeSet 可以自然排序，那么 TreeSet 必定是有排序规则的。

1、让存入的元素自定义比较规则。
2、给 TreeSet 指定排序规则。

方式一：元素自身具备比较性

元素自身具备比较性，需要元素实现 `Comparable` 接口，重写 `compareTo` 方法，也就是让元素自身具备比较性，这种方式叫做元素的自然排序也叫做默认排序。

示例：

方式二：容器具备比较性

当元素自身不具备比较性，或者自身具备的比较性不是所需要的。那么此时可以让容器自身具备。需要定义一个类实现接口 `Comparator`，重写 `compare` 方法，并将该接口的子类实例对象作为参数传递给 TreeMap 集合的构造方法。

示例：

注意：当 `Comparable` 比较方式和 `Comparator` 比较方式同时存在时，以 `Comparator` 的比较方式为主；在重写 `compareTo` 或者 `compare` 方法时，必须要明确：比较的主要条件相等时还要比较次要条件。（假设姓名和年龄一致的人为相同的人，如果想要对人按照年龄的大小来排序，如果年龄相同的人，需要如何处理？不能直接 `return 0` ，因为可能姓名不同（年龄相同姓名不同的人是不同的人）。此时就需要进行次要条件判断（需要判断姓名），只有姓名和年龄同时相等的才可以返回0），通过 `return 0` 来判断唯一性。

问题：为什么使用 TreeSet 存入字符串，字符串默认输出是按升序排列的？因为字符串实现了一个接口，叫做`Comparable`接口。字符串重写了该接口的 `compareTo` 方法，所以 String 对象具备了比较性，那么同样道理，我的自定义元素（例如Person类，Book类）想要存入 TreeSet 集合，就需要实现该接口，也就是要让自定义对象具备比较性。

存入 TreeSet 集合中的元素要具备比较性，比较性要实现 `Comparable` 接口，重写该接口的 `compareTo` 方法

TreeSet 属于 Set 集合，该集合的元素是不能重复的，TreeSet 如何保证元素的唯一性？通过 `compareTo` 或者 `compare` 方法来保证元素的唯一性。

添加的元素必须要实现 `Comparable` 接口。当 `compareTo()` 函数返回值为0时，说明两个对象相等，此时该对象不会添加进来。

比较器接口：

```txt
----| Comparable
       compareTo(Object o)              元素自身具备比较性
----| Comparator
       compare(Object o1, Object o2)    给容器传入比较器
```

### LinkedHashSet

会保存插入的顺序。

### 总结

- 看到 array，就要想到角标。
- 看到 link，就要想到first, last。
- 看到 hash，就要想到hashCode, equals。
- 看到 tree，就要想到两个接口：Comparable, Comparator。

## [Map](https://baike.xsoftlab.net/view/250.html)

![x](http://viyitech.cn/public/images/java_map.png)

Java 自带了各种 Map 类，这些 Map 类可归为三种类型：

- 通用Map：用于在应用程序中管理映射，通常在 java.util 程序包中实现：

  HashMap、Hashtable、Properties、LinkedHashMap、IdentityHashMap、TreeMap、WeakHashMap、ConcurrentHashMap

- 专用Map：通常我们不必亲自创建此类Map，而是通过某些其他类对其进行访问

  java.util.jar.Attributes、javax.print.attribute.standard.PrinterStateReasons、java.security.Provider、java.awt.RenderingHints、javax.swing.UIDefaults

- 自行实现Map：一个用于帮助我们实现自己的Map类的抽象类AbstractMap

**类型区别：**

- HashMap：最常用的Map，它根据键的 HashCode 值存储数据，根据键可以直接获取它的值，具有很快的访问速度。HashMap 最多只允许一条记录的键为Null（多条会覆盖）；允许多条记录的值为 Null。非同步的。

- TreeMap：能够把它保存的记录根据键(key)排序，默认是按升序排序，也可以指定排序的比较器，当用Iterator 遍历 TreeMap 时，得到的记录是排过序的。TreeMap 不允许 key 的值为 null。非同步的。

  分析 TreeMap 之前，首先先来了解下 NavigableMap 和 SortedMap 这个两个接口 

  SortedMap 从名字就可以看出，在 Map 的基础上增加了排序的功能。它要求 key 与 key 之间是可以相互比较的，从而达到排序的目的。怎么样才能比较呢？在之前的 Set 中提到了 comparator 实现了内部排序，这儿，就通过 comparator 来实现排序。

  而 NavigableMap 是继承于 SortedMap，目前只有 TreeMap 和 ConcurrentNavigableMap 两种实现方式。它本质上添加了搜索选项到接口，主要为红黑树服务。

  TreeMap 其实就是一颗红黑树。

- Hashtable：与 HashMap 类似，不同的是：key 和 value 的值均不允许为 null；它支持线程的同步，即任一时刻只有一个线程能写 Hashtable，因此也导致了 Hashtale 在写入时会比较慢。

- LinkedHashMap：从名字就可以看出 LinkedHashMap 继承于 HashMap，它相比于 HashMap 内部多维护了一个双向列表，目的就是保证输入顺序和输出顺序一致，带来的劣势也很明显，性能的消耗大大提升。在遍历的时候会比 HashMap 慢。key 和 value 均允许为空，非同步的。

参考：https://blog.csdn.net/wz249863091/article/details/77483948

**四种常用Map插入与读取性能比较**

测试代码，请看示例。

### 遍历

#### 增强for循环遍历

**使用keySet()遍历**

```java
for (String key : map.keySet()) {
    System.out.println(key + " ：" + map.get(key));
}
```

**使用entrySet()遍历**

```java
for (Map.Entry<String, String> entry : map.entrySet()) {
    System.out.println(entry.getKey() + " ：" + entry.getValue());
}
```

#### 迭代器遍历

**使用keySet()遍历**

```java
Iterator<String> iterator = map.keySet().iterator();
while (iterator.hasNext()) {
    String key = iterator.next();
    System.out.println(key + "　：" + map.get(key));
}
```

**使用entrySet()遍历**

```java
Iterator<Map.Entry<String, String>> iterator = map.entrySet().iterator();
while (iterator.hasNext()) {
    Map.Entry<String, String> entry = iterator.next();
    		System.out.println(entry.getKey() + "　：" + entry.getValue());
}
```

#### 性能比较

测试代码，请看示例。

- 增强 for 循环使用方便，但性能较差，不适合处理超大量级的数据。
- 迭代器的遍历速度要比增强 for 循环快很多，是增强 for 循环的2倍左右。
  使用 entrySet 遍历的速度要比 keySet 快很多，是 keySet 的1.5倍左右。

### 排序

**HashMap、Hashtable、LinkedHashMap 排序**：

通过 ArrayList 构造函数把 map.entrySet() 转换成 list，自定义比较器实现比较排序。测试代码

**TreeMap 排序**：

TreeMap 默认按 key 进行升序排序，如果想改变默认的顺序，可以使用比较器按 value 排序（通用），请看示例代码！

### 常用API

| **方法**                       | **描述**                                                     |
| ------------------------------ | ------------------------------------------------------------ |
| clear()                        | 从 Map 中删除所有映射                                        |
| remove(Object  key)            | 从 Map 中删除键和关联的值                                    |
| put(Object  key, Object value) | 将指定值与指定键相关联                                       |
| putAll(Map  t)                 | 将指定 Map 中的所有映射复制到此  map                         |
| entrySet()                     | 返回 Map 中所包含映射的  Set 视图。Set  中的每个元素都是一个  Map.Entry 对象，可以使用  getKey() 和  getValue() 方法（还有一个  setValue() 方法）访问后者的键元素和值元素 |
| keySet()                       | 返回 Map 中所包含键的  Set 视图。删除  Set 中的元素还将删除  Map 中相应的映射（键和值） |
| values()                       | 返回 map 中所包含值的  Collection 视图。删除  Collection 中的元素还将删除  Map 中相应的映射（键和值） |
| get(Object  key)               | 返回与指定键关联的值                                         |
| containsKey(Object  key)       | 如果 Map 包含指定键的映射，则返回  true                      |
| containsValue(Object  value)   | 如果此 Map 将一个或多个键映射到指定值，则返回  true          |
| isEmpty()                      | 如果 Map 不包含键-值映射，则返回  true                       |
| size()                         | 返回 Map 中的键-值映射的数目                                 |

解决哈希冲突的常见4种方法：

1. 开放地址，简单说就是如果当前当前坑被占了，就继续找下个坑 
2. 拉链法，也就是 JDK 中选择实现 HashMap 的方法，数组的每个项又是一个链表，如果哈希后发现当前地址有数据了，就挂在这个链表的最后 
3. 再哈希 选择多种哈希方法，一个不行再换下一个，直到有坑为止 
4. 建立公共溢出，就把所有溢出的数据都放在溢出表里 



## Netty

**Netty为什么传输快？**

Netty的传输快其实也是依赖了NIO的一个特性——**零拷贝**。

我们知道，Java的内存有堆内存、栈内存和字符串常量池等等，其中堆内存是占用内存空间最大的一块，也是Java对象存放的地方，一般我们的数据如果需要从IO读取到堆内存，中间需要经过Socket缓冲区，也就是说一个数据会被拷贝两次才能到达他的的终点，如果数据量大，就会造成不必要的资源浪费。

Netty针对这种情况，使用了NIO中的另一大特性——零拷贝，当他需要接收数据的时候，他会在堆内存之外开辟一块内存，数据就直接从IO读到了那块内存中去，在Netty里面通过**ByteBuf**可以对这些数据进行直接操作，从而加快了传输速度。

下两图就介绍了两种拷贝方式的区别，摘自[Linux 中的零拷贝技术，第 1 部分](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.ibm.com%2Fdeveloperworks%2Fcn%2Flinux%2Fl-cn-zerocopy1%2Findex.html)

![x](D:\owf\Life Go\Home\Resources\java-netty01.png)

![x](D:\owf\Life Go\Home\Resources\java-netty02.png)

上文介绍的ByteBuf是Netty的一个重要概念，他是Netty数据处理的容器，也是Netty封装好的一个重要体现，将在下一部分做详细介绍。

**为什么说Netty封装好？**

要说Netty为什么封装好，这种用文字是说不清的，直接上代码：

阻塞I/O：

```java
public class PlainOioServer {
    public void serve(int port) throws IOException {
        final ServerSocket socket = new ServerSocket(port); //1
        try {
            for (;;) {
                final Socket clientSocket = socket.accept(); //2
                System.out.println("Accepted connection from " + clientSocket);
                new Thread(new Runnable() { //3
                    @Override
                    public void run() {
                        OutputStream out;
                        try {
                            out = clientSocket.getOutputStream();
                            out.write("Hi!\r\n".getBytes(Charset.forName("UTF-8"))); //4
                            out.flush();
                            clientSocket.close(); //5
                        } catch (IOException e) {
                            e.printStackTrace();
                            try {
                                clientSocket.close();
                            } catch (IOException ex) {
                                // ignore on close
                            }
                        }
                    }
                }).start(); //6
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

非阻塞IO：

```java
public class PlainNioServer {
    public void serve(int port) throws IOException {
        ServerSocketChannel serverChannel = ServerSocketChannel.open();
        serverChannel.configureBlocking(false);
        ServerSocket ss = serverChannel.socket();
        InetSocketAddress address = new InetSocketAddress(port);
        ss.bind(address); //1
        Selector selector = Selector.open(); //2
        serverChannel.register(selector, SelectionKey.OP_ACCEPT); //3
        final ByteBuffer msg = ByteBuffer.wrap("Hi!\r\n".getBytes());
        for (;;) {
            try {
                selector.select(); //4
            } catch (IOException ex) {
                ex.printStackTrace();
                // handle exception
                break;
            }
            Set<SelectionKey> readyKeys = selector.selectedKeys(); //5
            Iterator<SelectionKey> iterator = readyKeys.iterator();
            while (iterator.hasNext()) {
                SelectionKey key = iterator.next();
                iterator.remove();
                try {
                    if (key.isAcceptable()) { //6
                        ServerSocketChannel server =
                                (ServerSocketChannel)key.channel();
                        SocketChannel client = server.accept();
                        client.configureBlocking(false);
                        client.register(selector, SelectionKey.OP_WRITE |
                                SelectionKey.OP_READ, msg.duplicate()); //7
                        System.out.println(
                                "Accepted connection from " + client);
                    }
                    if (key.isWritable()) {  //8
                        SocketChannel client =
                                (SocketChannel)key.channel();
                        ByteBuffer buffer =
                                (ByteBuffer)key.attachment();
                        while (buffer.hasRemaining()) {
                            if (client.write(buffer) == 0) { //9
                                break;
                            }
                        }
                        client.close(); //10
                    }
                } catch (IOException ex) {
                    key.cancel();
                    try {
                        key.channel().close();
                    } catch (IOException cex) {
                        // 在关闭时忽略
                    }
                }
            }
        }
    }
}
```

Netty：

```java
public class NettyOioServer {
    public void server(int port) throws Exception {
        final ByteBuf buf = Unpooled.unreleasableBuffer(
                Unpooled.copiedBuffer("Hi!\r\n", Charset.forName("UTF-8")));
        EventLoopGroup group = new OioEventLoopGroup();
        try {
            ServerBootstrap b = new ServerBootstrap(); //1
            b.group(group) //2
             .channel(OioServerSocketChannel.class)
             .localAddress(new InetSocketAddress(port))
             .childHandler(new ChannelInitializer<SocketChannel>() { //3
                 @Override
                 public void initChannel(SocketChannel ch) 
                     throws Exception {
                     ch.pipeline().addLast(new ChannelInboundHandlerAdapter() { //4
                         @Override
                         public void channelActive(ChannelHandlerContext ctx) throws Exception {
                             ctx.writeAndFlush(buf.duplicate()).addListener(ChannelFutureListener.CLOSE); //5
                         }
                     });
                 }
             });
            ChannelFuture f = b.bind().sync(); //6
            f.channel().closeFuture().sync();
        } finally {
            group.shutdownGracefully().sync(); //7
        }
    }
}
```

从代码量上来看，Netty就已经秒杀传统Socket编程了，但是这一部分博大精深，仅仅贴几个代码岂能说明问题，在这里给大家介绍一下Netty的一些重要概念，让大家更理解Netty。

**Channel**

数据传输流，与channel相关的概念有以下四个，上一张图让你了解netty里面的Channel。

![x](E:\WorkingDir\Office\Resources\java-netty03.png)

Channel，表示一个连接，可以理解为每一个请求，就是一个Channel。 

ChannelHandler，核心处理业务就在这里，用于处理业务请求。 

ChannelHandlerContext，用于传输业务数据。 

ChannelPipeline，用于保存处理过程需要用到的 ChannelHandler 和 ChannelHandlerContext。

**ByteBuf**

ByteBuf 是一个存储字节的容器，最大特点就是使用方便，它既有自己的读索引和写索引，方便你对整段字节缓存进行读写，也支持get/set，方便你对其中每一个字节进行读写，他的数据结构如下图所示：

![x](E:\WorkingDir\Office\Resources\java-netty04.png)

它有三种使用模式：

1. Heap Buffer 堆缓冲区

   堆缓冲区是 ByteBuf 最常用的模式，他将数据存储在堆空间。

2. Direct Buffer 直接缓冲区

   直接缓冲区是 ByteBuf 的另外一种常用模式，他的内存分配都不发生在堆，jdk1.4 引入的 nio 的 ByteBuffer 类允许 jvm 通过本地方法调用分配内存，这样做有两个好处：

   - 通过免去中间交换的内存拷贝，提升 IO 处理速度；直接缓冲区的内容可以驻留在垃圾回收扫描的堆区以外。
   - DirectBuffer 在 -XX:MaxDirectMemorySize=xxM 大小限制下，使用 Heap 之外的内存，GC 对此“无能为力”，也就意味着规避了在高负载下频繁的 GC 过程对应用线程的中断影响。

3. Composite Buffer 复合缓冲区

   复合缓冲区相当于多个不同 ByteBuf 的视图，这是 netty 提供的，jdk 不提供这样的功能。

除此之外，它还提供一大堆 api 方便你使用，在这里我就不一一列出了，具体参见[ByteBuf字节缓存](https://links.jianshu.com/go?to=https%3A%2F%2Fwaylau.gitbooks.io%2Fessential-netty-in-action%2Fcontent%2FCORE%20FUNCTIONS%2FBuffers.html)。

**Codec**

Netty 中的编码/解码器，通过它你能完成字节与 pojo、pojo 与 pojo 的相互转换，从而达到自定义协议的目的。
在 Netty 里面最有名的就是 HttpRequestDecoder 和 HttpResponseEncoder 了。

**Netty工作原理源码分析**

1. 我们如何提高NIO的工作效率

2. 一个NIO是不是只能有一个selector？

   不是，一个系统可以有多个selector

3. selector是不是只能注册一个ServerSocketChannel？

   不是，可以注册多个

**SocketIO：**

![x](E:\WorkingDir\Office\Resources\java-netty05.png)

**NIO：**

![x](E:\WorkingDir\Office\Resources\java-netty06.png)

**NettyIO：**

![x](E:\WorkingDir\Office\Resources\java-netty07.png)****

**如何去看一个开源的系统框架？**

1. 断点
2. 打印
3. 看调用栈
4. 搜索

**Netty5案例**

线程池原理

![x](E:\WorkingDir\Office\Resources\java-netty10.png)

一个thread + 队列 == 一个单线程线程池   =====> 线程安全的，任务是线性串行执行的

线程安全，不会产生阻塞效应 ，使用对象组

![x](E:\WorkingDir\Office\Resources\java-netty08.png)

线程不安全，会产生阻塞效应， 使用对象池

![x](E:\WorkingDir\Office\Resources\java-netty09.png)

服务器结构

![x](E:\WorkingDir\Office\Resources\java-netty11.png)

**心跳**

1. 学习idleStateHandler

   用来检测会话状态

2. 心跳其实就是一个普通的请求，特点数据简单，业务也简单

   心跳对于服务端来说，定时清除闲置会话inactive(netty5) channelclose(netty3)

   心跳对客户端来说，用来检测会话是否断开，是否重连！用来检测网络延时！

**protocol buff**

1. protocol buff是一种协议，是谷歌推出的一种序列化协议

2. Java序列化协议也是一种协议

3. 两者的目的是，将对象序列化成字节数组，或者说是二进制数据

   [-84, -19, 0, 5, 115, 114, 0, 15, 99, 111, 109, 46, 106, 97, 118, 97, 46, 80, 108, 97, 121, 101, 114, -73, 43, 28, 39, -119, -86, -125, -3, 2, 0, 4, 73, 0, 3, 97, 103, 101, 74, 0, 8, 112, 108, 97, 121, 101, 114, 73, 100, 76, 0, 4, 110, 97, 109, 101, 116, 0, 18, 76, 106, 97, 118, 97, 47, 108, 97, 110, 103, 47, 83, 116, 114, 105, 110, 103, 59, 76, 0, 6, 115, 107, 105, 108, 108, 115, 116, 0, 16, 76, 106, 97, 118, 97, 47, 117, 116, 105, 108, 47, 76, 105, 115, 116, 59, 120, 112, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 101, 116, 0, 5, 112, 101, 116, 101, 114, 115, 114, 0, 19, 106, 97, 118, 97, 46, 117, 116, 105, 108, 46, 65, 114, 114, 97, 121, 76, 105, 115, 116, 120, -127, -46, 29, -103, -57, 97, -99, 3, 0, 1, 73, 0, 4, 115, 105, 122, 101, 120, 112, 0, 0, 0, 1, 119, 4, 0, 0, 0, 10, 115, 114, 0, 17, 106, 97, 118, 97, 46, 108, 97, 110, 103, 46, 73, 110, 116, 101, 103, 101, 114, 18, -30, -96, -92, -9, -127, -121, 56, 2, 0, 1, 73, 0, 5, 118, 97, 108, 117, 101, 120, 114, 0, 16, 106, 97, 118, 97, 46, 108, 97, 110, 103, 46, 78, 117, 109, 98, 101, 114, -122, -84, -107, 29, 11, -108, -32, -117, 2, 0, 0, 120, 112, 0, 0, 3, -23, 120]

   [8, 101, 16, 20, 26, 5, 112, 101, 116, 101, 114, 32, -23, 7]

   int 4字节   1~5字节

   long 8内存

   我们利用protobuf做了对象的序列化和反序列化对吧，但是我们还没有把protobuf和netty结合起来吧？



## 面向对象

Oop：Object Oriented Programming（面向对象编程）

**类、对象和成员的定义**

- 类：对象的蓝图，生成对象的模板，是对一类事物的描述，是抽象的概念上的定义
- 对象：对象是实际存在的该类事物的每个个体，因而也称为实例
- 类之间的三种关系：依赖关系（uses-a）聚集关系（has-a）继承关系（is-a）

在java 中，类和对象的关系就像是动物和老虎的关系一样，老虎属于动物，老虎只是动物的一个实例。

在类中定义其实都称之为成员。成员有两种：

1.	成员变量：其实对应的就是事物的属性。
2.	成员函数：其实对应的就是事物的行为。

所以，其实定义类，就是在定义成员变量和成员函数。但是在定义前，必须先要对事物进行属性和行为的分析。才可以用代码来体现。

成员变量和局部变量的区别：

1.	成员变量直接定义在类中。局部变量定义在方法中，参数上，语句中。
2.	成员变量在这个类中有效。局部变量只在自己所属的大括号内有效，大括号结束，局部变量失去作用域。
3.	成员变量存在于堆内存中，随着对象的产生而存在，消失而消失。局部变量存在于栈内存中，随着所属区域的运行而存在，结束而释放。

访问权限：

| *****     | **同一个类中** | **同一个包中** | **不同包中的子类** | **不同包中的非子类** |
| --------- | -------------- | -------------- | ------------------ | -------------------- |
| private   | √              |                |                    |                      |
| protected | √              | √              | √                  |                      |
| public    | √              | √              | √                  | √                    |
| friendly  | √              | √              |                    |                      |



## 实战



### 构建工具



## Maven介绍

Maven 翻译为“专家”，“内行”，是 Apache 下的一个纯 Java 开发的开源项目，它是一个项目管理工具，使用 maven 对 java 项目进行构建、依赖管理。当前使用 Maven 的项目在持续增长。

项目构建是一个项目从编写源代码到编译、测试、运行、打包、部署、运行的过程。

Maven 将项目构建的过程进行标准化， 每个阶段使用一个命令完成：

![x](E:/WorkingDir/Office/Resources/maven.jpg)

部分阶段对应命令如下：

- 清理阶段对应 maven 的命令是 clean，清理输出的class文件
- 编译阶段对应 maven 的命令是 compile，将java代码编译成class文件。
- 打包阶段对应 maven 的命令是 package，java工程可以打成jar包，web包可以打成war包

运行一个maven 工程（web工程）需要一个命令：`tomcat:run`

maven 工程构建的优点：

- 一个命令完成构建、运行，方便快捷。
- maven 对每个构建阶段进行规范，非常有利于大型团队协作开发。

### 依赖管理

**什么是依赖？**

一个java项目可能要使用一些第三方的jar包才可以运行，那么我们说这个java项目依赖了这些第三方的jar包。

举个例子：一个crm系统，它的架构是SSH框架，该crm项目依赖SSH框架，具体它依赖的Hibernate、Spring、Struts2。

**什么是依赖管理？**

就是对项目所有依赖的jar包进行规范化管理。传统的项目工程要管理所依赖的 jar 包完全靠人工进行，缺点：

- 没有对jar包的版本统一管理，容易导致版本冲突。
- 从网上找jar包非常不方便，有些jar找不到。
- jar包添加到工程中导致工程过大。

maven项目管理所依赖的jar包不需要手动向工程添加jar包，只需要在pom.xml（maven工程的配置文件）添加jar包的坐标，自动从maven仓库中下载jar包、运行。优点：

- 通过pom.xml文件对jar包的版本进行统一管理，可避免版本冲突。
- maven团队维护了一个非常全的maven仓库， 里边包括了当前使用的jar包，maven工程可以自动从maven仓库下载Jar包，非常方便。

### 为什么使用？

综上所述，使用maven的好处：

- 一步构建：maven对项目构建的过程进行标准化，通过一个命令即可完成构建过程。

- 依赖管理：maven工程不用手动导jar包，通过在pom.xml中定义坐标从maven仓库自动下载，方便且不易出错。

- maven跨平台，可在window、linux上使用。

- maven遵循规范开发有利于提高大型团队的开发效率，降低项目的维护戚本，大公司都会考虑使用maven来构建项目。

### 三套生命周期

maven 对项目构建过程分为三套相互独立的生命周期，这三套生命周期分别是：

- Clean Lifecycle 在进行真正的构建之前进行一些清理工作。
  - pre-clean 执行一些需要在clean 之前完成的工作
  - clean 移除所有上一次构建生成的文件
  - post-clean 执行一些需要在clean 之后立刻完成的工作
- Default Lifecycle 构建的核心部分，编译，测试，打包，部署等等。
  - validate
  - generate-sources
  - process-sources
  - generate-resources
  - process-resources 复制并处理资源文件，至目标目录，准备打包。
  - compile 编译项目的源代码。
  - process-classes
  - generate-test-sources
  - process-test-sources
  - generate-test-resources
  - process-test-resources 复制并处理资源文件，至目标测试目录。
  - test-compile 编译测试源代码。
  - process-test-classes
  - test 使用合适的单元测试框架运行测试。这些测试代码不会被打包或部署。
  - prepare-package
  - package 接受编译好的代码，打包成可发布的格式，如JAR。
  - pre-integration-test
  - integration-test
  - post-integration-test
  - verify
  - install 将包安装至本地仓库，以让其它项目依赖。
  - deploy 将最终的包复制到远程的仓库，以让其它开发人员与项目共享。
- Site Lifecycle 生成项目报告，站点， 发布站点。
  - pre-site 执行一些需要在生成站点文档之前完成的工作
  - site 生成项目的站点文档
  - post-site 执行一些需要在生成站点文档之后完成的工作，并且为部署做准备
  - site-deploy 将生成的站点文档部署到特定的服务器上

每个 maven 命令对应生命周期的某个阶段，例如：`mvn clean` 命令对应 clean 生命周期的 clean 阶段， mvn test 命令对应 default 生命周期的 test 阶段。
执行命令会将该命令在的在生命周期当中之前的阶段自动执行，比如：执行 `mvn clean` 命令会自动执行 pre-clean 和 clean 两个阶段，`mvn test` 命令会自动执行 validate、compile、test 等阶段。

注意：执行某个生命周期的某个阶段不会影响其它的生命周期！

如果要同时执行多个生命周期的阶段可在命令行输入多个命令，中间以空格隔开， 例如：`clean package`，该命令执行 clean 生命周期的 clean 阶段和 default 生命周期的 package 阶段。

### Maven的概念模型

Maven 包含了一个项目对象模型(Project Object Model)，一组标准集合，一个项目生命周期(Project Lifecycle)，一个依赖管理系统(Dependency Management System)和用来运行定义在生命周期阶段(phase) 中插件(plugin) 目标(goal) 的逻辑。

下图是maven的概念模型图：

![x](E:/WorkingDir/Office/Resources/maven_model.jpg)

1、项目对象模型(Project Object Model)

一个 maven 工程都有一个pom.xml 文件， 通过pom.xml 文件定义项目的坐标、项目依赖、项目信息、插件目标等。

2、依赖管理系统(Dependency Management System)

通过 maven 的依赖管理对项目所依赖的jar包进行统一管理。

3、一个项目生命周期(Project Lifecycle)

使用 maven 完成项目的构建， 项目构建包括：清理、编译、测试、部署等过程，maven将这些过程规范为一个生命周期。maven 通过执行一些简单命令即可实现生命周期的各个过程

4、一组标准集合

maven 将整个项目管理过程定义一组标准，比如：通过 maven 构建工程有标准的目录结构，有标准的生命周期阶段、依赖管理有标准的坐标定义等。

5、插件(plugin) 目标(goal)

maven 管理项目生命周期过程都是基于插件完成的。

## Maven安装

下载：[官网下载地址](http://maven.apache.org/download.cgi)

解压：将 maven 解压到一个不含有中文和空格的目录中。

**目录结构：**

- bin 目录mvn.bat （以run 方式运行项目）、mvnDebug.bat（以debug 方式运行项目）
- boot 目录maven 运行需要类加载器
- conf 目录settings.xml 整个maven 工具核心配置文件
- lib 目录maven 运行依赖jar 包

**环境变量配置：**

电脑上需安装java 环境，安装JDK1.7+ 版本（设置好Java环境变量）

配置 M2_HOME / MAVEN_HOME：MAVEN解压的根目录；将 `%MAVEN_HOME%/bin`加入环境变量path

通过 `mvn -v` 命令检查 maven 是否安装成功。

注意：如果你的公司正在建立一个防火墙，并使用HTTP代理服务器来阻止用户直接连接到互联网。那么，Maven将无法下载任何依赖。

为了使它工作，你必须声明在 Maven 的配置文件中设置代理服务器：settings.xml。找到文件 {M2_HOME}/conf/settings.xml，并把你的代理服务器信息配置写入。

```xml
<!-- proxies
   | This is a list of proxies which can be used on this machine to connect to the network.
   | Unless otherwise specified (by system property or command-line switch), the first proxy
   | specification in this list marked as active will be used.
   |-->
  <proxies>
    <!-- proxy
     | Specification for one proxy, to be used in connecting to the network.
     |
    <proxy>
      <id>optional</id>
      <active>true</active>
      <protocol>http</protocol>
      <username>proxyuser</</username>
      <password>proxypass</password>
      <host>proxy.host.net</host>
      <port>80</port>
      <nonProxyHosts>local.net|some.host.com</nonProxyHosts>
    </proxy>
    -->
  </proxies>
```

常用配置：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">

<!-- 本地仓库的路径设置的是D盘maven/repo目录下（自行配置一个文件夹即可，默认是~/.m2/repository） -->
<localRepository>D:\maven\repo</localRepository>  
<mirrors>
  <!-- 配置阿里云镜像服务器 国内镜像速度会快一些 -->
  <mirror>
    <id>alimaven</id>
    <name>aliyun maven</name>
    <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
    <mirrorOf>central</mirrorOf>
  </mirror>
</mirrors>
</settings>
```

### Maven仓库

- **本地仓库**：用来存储从远程仓库或中央仓库下载的插件和jar包，项目使用一些插件或jar包，优先从本地仓库查找。默认本地仓库位置在 `${user.dir}/.m2/repository`，${user.dir} 表示windows用户目录。

- **远程仓库**：如果本地需要插件或者jar包，本地仓库没有，默认去远程仓库下载。远程仓库可以在互联网内也可以在局域网内。

- **中央仓库**：在 maven 软件中内置一个远程仓库地址 [http://repol.maven.org/maven2](http://repol.maven.org/maven2)，它是中央仓库，服务于整个互联网，它由Maven团队自己维护，里面存储了非常全的jar包，包含了世界上大部分流行的开源项目构件。（Maven中心储存库网站已经改版本，目录浏览可能不再使用。这将直接被重定向到 [http://search.maven.org/](http://search.maven.org/)。这就好多了，现在有一个搜索功能）

  配置本地仓库：可以在 `MAVE_HOME/conf/settings.xml` 文件中配置本地仓库位置。假设位于 D:\maven\repo

```xml
<localRepository>D:\maven\repo</localRepository>
```

提示：中央仓库的网络不稳定，可以使用阿里的资源仓库：[https://help.aliyun.com/document_detail/102512.html?spm=a2c4e.11153940.0.0.213c7bdeaNqmlq](https://help.aliyun.com/document_detail/102512.html?spm=a2c4e.11153940.0.0.213c7bdeaNqmlq)

### Maven项目工程目录约定

使用maven 创建的工程我们称它为maven 工程，maven 工程具有一定的目录规范，如下：

- src/main/java：存放项目的.java 文件
- src/main/resources：存放项目资源文件，如spring，hibernate 配置文件
- src/test/java：存放所有单元测试.java文件，如JUnit测试类
- src/test/resources：测试资源文件
- target：项目输出位置，编译后的class文件会输出到此目录
- pom.xml：maven项目核心配置文件

## 常用Maven命令

| **命令** | **说明**                                                     |
| -------- | ------------------------------------------------------------ |
| compile  | 编译命令。将src/main/java 下的文件编译为class 文件输出到target 目录下。 |
| test     | 测试命令。执行src/test/java 下的单元测试类                   |
| clean    | 清理命令。删除target 目录的内容                              |
| package  | 打包命令。java 工程打成jar包，web工程打成war包。             |
| install  | 安装命令。将maven 打成jar 包或war 包发布到本地仓库           |

## Eclipse与Maven集成

Eclipse提供了一个很好的插件[m2eclipse](http://www.eclipse.org/m2e/)无缝将Maven和Eclipse集成在一起。Eclipse mars 2 版本自带maven 插件不用单独安装。

安装m2eclipse插件：

- Eclipse 3.5 (Gallileo)：[Installing m2eclipse in Eclipse 3.5 (Gallileo)](http://www.sonatype.com/books/m2eclipse-book/reference/ch02s03.htmll)
- Eclipse 3.6 (Helios)：[Installing m2eclipse in Eclipse 3.6 (Helios)](http://www.sonatype.com/books/m2eclipse-book/reference/install-sect-marketplace.htmll)

在 Eclipse 中配置使用的 Maven 的 setting.xml 文件，使用 Maven 安装目录下的 setting.xml 文件。

**注意**：如果修改了 setting.xml 文件需要点击 "update settings" 按钮对本地仓库重建索引，点击"Reindex"

Maven 配置完成需要测试在 eclipse 中是否可以浏览 maven 的本地仓库，如果可以正常浏览 Maven 本地仓库则说明 Eclipse 集成 Maven 己经完成。

打开 Eclipse 仓库视图，对插件和 jar 包建立索引

找到 Local respository 本地仓库项，点击 Rebuild index 重建索引

重建索引完成点击前边的 "+" 图标即可查看本地仓库的内容。

### 定义Maven坐标

### 构建web工程

1、从Maven模板创建Web项目

您可以通过使用 Maven 的 maven-archetype-webapp 模板来创建一个快速启动 Java Web 应用程序的项目。在终端(* UNIX或Mac)或命令提示符(Windows)中，导航至您想要创建项目的文件夹。键入以下命令：

```sh
mvn archetype:generate -DgroupId=com.colin -DartifactId=DemoWebApp -DarchetypeArtifactId=maven-archetype-webapp -DinteractiveMode=false
```

新的Web项目命名为 "DemoWebApp"，以及一些标准的 web 目录结构也会自动创建。

2、Eclipse IDE 支持

要导入这个项目到Eclipse中，需要生成一些 Eclipse 项目的配置文件：

在终端，进入到 "DemoWebApp" 文件夹中，键入以下命令：

```sh
cd DemoWebApp
mvn eclipse:eclipse -Dwtpversion=2.0
```

注意，此选项 -Dwtpversion=2.0 告诉 Maven 将项目转换到 Eclipse 的 Web 项目(WAR)，而不是默认的Java项目(JAR)。为方便起见，以后我们会告诉你如何配置 pom.xml 中的这个 WTP 选项。

导入到 Eclipse IDE – File -> Import… -> General -> Existing Projects into workspace. 在 Eclipse 中，如果看到项目顶部有地球图标，意味着这是一个 Web 项目。

3、更新POM

在 Maven 中，Web 项目的设置都通过这个单一的 pom.xml 文件配置。

- 添加项目依赖 - Spring, logback 和 JUnit
- 添加插件来配置项目

pom.xml：

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0  http://maven.apache.org/maven-v4_0_0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.Colin</groupId>
    <artifactId>DemoWebApp</artifactId>
    <packaging>war</packaging>
    <version>1.0-SNAPSHOT</version>
    <name>DemoWebApp Maven Webapp</name>
    <url>http://maven.apache.org</url>
    <properties>
        <jdk.version>1.7</jdk.version>
        <spring.version>4.1.1.RELEASE</spring.version>
        <jstl.version>1.2</jstl.version>
        <junit.version>4.11</junit.version>
        <logback.version>1.0.13</logback.version>
        <jcl-over-slf4j.version>1.7.5</jcl-over-slf4j.version>
    </properties>

    <dependencies>
        <!-- Unit Test -->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>${junit.version}</version>
        </dependency>

        <!-- Spring Core -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-core</artifactId>
            <version>${spring.version}</version>
            <exclusions>
                <exclusion>
                    <groupId>commons-logging</groupId>
                    <artifactId>commons-logging</artifactId>
                </exclusion>
            </exclusions>
        </dependency>

        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>jcl-over-slf4j</artifactId>
            <version>${jcl-over-slf4j.version}</version>
        </dependency>
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
            <version>${logback.version}</version>
        </dependency>

        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-web</artifactId>
            <version>${spring.version}</version>
        </dependency>

        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <!-- jstl -->
        <dependency>
            <groupId>jstl</groupId>
            <artifactId>jstl</artifactId>
            <version>${jstl.version}</version>
        </dependency>
    </dependencies>

    <build>
        <finalName>DemoWebApp</finalName>

        <plugins>
            <!-- Eclipse project -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-eclipse-plugin</artifactId>
                <version>2.9</version>
                <configuration>
                    <!-- Always download and attach dependencies source code -->
                    <downloadSources>true</downloadSources>
                    <downloadJavadocs>false</downloadJavadocs>
                    <!-- Avoid type mvn eclipse:eclipse -Dwtpversion=2.0 -->
                    <wtpversion>2.0</wtpversion>
                </configuration>
            </plugin>

            <!-- Set JDK Compiler Level -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>2.3.2</version>
                <configuration>
                    <source>${jdk.version}</source>
                    <target>${jdk.version}</target>
                </configuration>
            </plugin>

            <!-- For Maven Tomcat Plugin -->
            <plugin>
                <groupId>org.apache.tomcat.maven</groupId>
                <artifactId>tomcat7-maven-plugin</artifactId>
                <version>2.2</version>
                <configuration>
                    <path>/DemoWebApp</path>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

要编译，测试和项目打包成一个WAR文件，输入：`mvn package`

一个新的 WAR 文件将在 project/target/DemoWebApp.war 产生，只需复制并部署到 Tomcat 发布的目录。

如果想通过 Eclipse 服务器这个项目插件（Tomcat 或其它容器）调试，这里再输入：`mvn eclipse:eclipse`

如果一切顺利，该项目的依赖将被装配附加到 Web 部署项目。右键点击 project -> Properties -> Deployment Assembly

Maven 的 Tomcat 插件声明（加入到 pom.xml）：

pom.xml：

```xml
<!-- For Maven Tomcat Plugin -->
```

键入以下命令（有时网络不通畅需要执行2-3次）：

```sh
mvn tomcat:run
```

这将启动Tomcat，部署项目默认在端口8080。

**出错**：Maven项目下update maven后Eclipse报错：java.lang.ClassNotFoundException: ContextLoaderL

解决方案：

1. 右键点击项目--选择Properties，选择Deployment Assembly,在右边点击Add按钮，在弹出的窗口中选择Java Build Path Entries

2. 点击Next，选择Maven Dependencies

3. 点击Finish，然后可以看到已经把Maven Dependencies添加到Web应用结构中了

操作完后，重新部署工程，不再报错了。然后我们再到.metadata.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\目录下，发现工程WEB-INF目录下自动生成了lib目录，并且所有的依赖jar包也都已经部署进来。问题因此解决。

### 快照

大型应用软件一般由多个模块组成，一般它是多个团队开发同一个应用程序的不同模块，这是比较常见的场景。例如，一个团队正在对应用程序的应用程序，用户界面项目(app-ui.jar:1.0) 的前端进行开发，他们使用的是数据服务工程 (data-service.jar:1.0)。

现在，它可能会有这样的情况发生，工作在数据服务团队开发人员快速地开发 bug 修复或增强功能，他们几乎每隔一天就要释放出库到远程仓库。

现在，如果数据服务团队上传新版本后，会出现下面的问题：

- 数据服务团队应该发布更新时每次都告诉应用程序UI团队，他们已经发布更新了代码。
- UI团队需要经常更新自己 pom.xml 以获得更新应用程序的版本。

为了处理这类情况，引入快照的概念，并发挥作用。

**什么是快照？**

快照（SNAPSHOT ）是一个特殊版本，指出目前开发拷贝不同于常规版本，Maven 每生成一个远程存储库都会检查新的快照版本。

现在，数据服务团队将在每次发布代码后更新快照存储库：data-service:1.0-SNAPSHOT 替换旧的 SNAPSHOT jar。

**快照与版本**

在使用版本时，如果 Maven 下载所提到的版本为 data-service:1.0，那么它永远不会尝试在库中下载已经更新的版本1.0。要下载更新的代码，data-service的版本必须要升级到1.1。

在使用快照（SNAPSHOT）时，Maven会在每次应用程序UI团队建立自己的项目时自动获取最新的快照（data-service:1.0-SNAPSHOT）。

**app-ui pom.xml**

app-ui 项目使用数据服务（data-service）的 1.0-SNAPSHOT

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
   http://maven.apache.org/xsd/maven-4.0.0.xsd">
   <modelVersion>4.0.0</modelVersion>
   <groupId>app-ui</groupId>
   <artifactId>app-ui</artifactId>
   <version>1.0</version>
   <packaging>jar</packaging>
   <name>health</name>
   <url>http://maven.apache.org</url>
   <properties>
      <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
   </properties>
   <dependencies>
      <dependency>
      <groupId>data-service</groupId>
         <artifactId>data-service</artifactId>
         <version>1.0-SNAPSHOT</version>
         <scope>test</scope>
      </dependency>
   </dependencies>
</project>
```

**data-service pom.xml**

数据服务（data-service）项目对于每一个微小的变化释放 1.0 快照：

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
   http://maven.apache.org/xsd/maven-4.0.0.xsd">
   <modelVersion>4.0.0</modelVersion>
   <groupId>data-service</groupId>
   <artifactId>data-service</artifactId>
   <version>1.0-SNAPSHOT</version>
   <packaging>jar</packaging>
   <name>health</name>
   <url>http://maven.apache.org</url>
   <properties>
      <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
   </properties>
</project>
```

虽然，在使用快照（SNAPSHOT）时，Maven 自动获取最新的快照版本。不过我们也可以强制使用 -U 切换到任何 maven 命令来下载最新的快照版本。

```sh
mvn clean package -U
```

打开命令控制台，进入项目根目录，然后执行以下命令mvn命令。

```sh
mvn clean package -U
```

Maven会下载数据服务的最新快照后并开始构建该项目。

### 依赖管理/依赖传递

Maven提供了一个高程度的控制来管理依赖关系复杂的多模块项目。

**传递依赖发现**

通常情况下，当一个库A依赖于其他库B的情况下，另一个项目Ç想用A，则该项目需要使用库B。

在Maven帮助下以通过这样的依赖来发现所有需要的库。Maven通过读取依赖项（项目文件pom.xml中），找出所有的依赖。

我们只需要在每个项目POM定义直接依赖关系。Maven自动处理其余部分。

**依赖关系管理**

通常，我们在一个共同的项目下创建一套项目。我们依赖一个公共的POM，然后各个子项目POM继承这个父POM。下面的例子将帮助你理解这个概念

![x](http://viyitech.cn/public/images/maven_pom.jpg)

以下是上述的依赖图的细节：

- APP-UI-WAR依赖于App-Core-lib和 App-Data-lib。
- Root 是 App-Core-lib 和 App-Data-lib 的父类。
- Root 定义LIB1，LIB2，Lib3作为其依赖部分依赖关系。

### Maven自动化部署

在项目开发中，通常是部署过程包含以下步骤：

- 检入代码在建项目全部进入SVN或源代码库中，并标记它。
- 从SVN下载完整的源代码。
- 构建应用程序。
- 生成输出要么WAR或EAR文件存储到一个共同的网络位置。
- 从网络获取的文件和文件部署到生产现场。
- 更新日期和应用程序的更新版本号的文件。

问题说明：

通常有多人参与了上述部署过程。一个团队可能手动签入的代码，其他人可以处理构建等。这很可能是任何一个步骤可能会错过了，由于涉及和由于多团队环境手动工作。例如，较旧的版本可能不会被更换网络设备和部署团队再部署旧版本。

解决：

通过结合自动化的部署过程

- Maven构建和释放项目
- SubVersion源代码库，管理源代码，
- 和远程存储库管理器（Jfrog/ Nexus）来管理项目的二进制文件。

更新项目的pom.xml

我们将使用Maven发布插件来创建一个自动释放过程。例如：bus-core-api 项目POM.xml

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
   http://maven.apache.org/xsd/maven-4.0.0.xsd">
   <modelVersion>4.0.0</modelVersion>
   <groupId>bus-core-api</groupId>
   <artifactId>bus-core-api</artifactId>
   <version>1.0-SNAPSHOT</version>
   <packaging>jar</packaging>
   <scm>
      <url>http://www.svn.com</url>
      <connection>scm:svn:http://localhost:8080/svn/jrepo/trunk/Framework</connection>
      <developerConnection>
        scm:svn:${username}/${password}@localhost:8080:common_core_api:1101:code
      </developerConnection>
   </scm>
   <distributionManagement>
      <repository>
         <id>Core-API-Java-Release</id>
         <name>Release repository</name>
         <url>http://localhost:8081/nexus/content/repositories/Core-Api-Release</url>
      </repository>
   </distributionManagement>
   <build>
      <plugins>
         <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-release-plugin</artifactId>
            <version>2.0-beta-9</version>
            <configuration>
               <useReleaseProfile>false</useReleaseProfile>
               <goals>deploy</goals>
               <scmCommentPrefix>[bus-core-api-release-checkin]-</scmCommentPrefix>
            </configuration>
         </plugin>
      </plugins>
   </build>
</project>
```

| **元素**     | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| SCM          | Configures the SVN location from  where Maven will check out the source code. |
| Repositories | Location where built WAR/EAR/JAR  or any other artifact will be stored after code build is successful. |
| Plugin       | maven-release-plugin is  configured to automate the deployment process. |

**Maven发布插件**

Maven使用下列有用的任务maven-release-plugin.

```sh
mvn release:clean
```

它清除以防工作区的最后一个释放的过程并不顺利。

```sh
mvn release:rollback
```

回滚是为了以防工作空间代码和配置更改的最后一个释放的过程并不顺利。

```xml
mvn release:prepare
```

执行多个操作次数

- 检查是否有任何未提交的本地更改或不
- 确保没有快照依赖
- 更改应用程序的版本并删除快照从版本，以释放
- 更新文件到 SVN.
- 运行测试用例
- 提交修改后POM文件
- 标签代码在subversion中
- 增加版本号和附加快照以备将来发行

- 提交修改后的POM文件到SVN。

```sh
mvn release:perform
```

检查出使用前面定义的标签代码并运行Maven的部署目标来部署战争或内置工件档案库。让我们打开命令控制台，到项目根目录并执行以下命令mvn命令：

```sh
mvn release:prepare
```

Maven将开始建设该项目。一旦构建成功运行以下命令mvn命令：

```sh
mvn release:perform
```

一旦构建成功，您可以在资料库验证上传的JAR文件。

### 使用Maven模板创建项目

如何使用 `mvn archetype:generate` 从现有的Maven模板列表中生成项目？

通常情况下，我们只需要使用下面的两个模板：

```sh
maven-archetype-webapp – Java Web Project (WAR)
maven-archetype-quickstart – Java Project (JAR)
```

**Maven 1000+ 模板**

如果键入命令 `mvn archetype:generate`，1000 +模板会被提示在屏幕上，你没有办法看到它，或者选择什么。为了解决这个问题，输出模板列表，像这样保存为文本文件：

```sh
# waiting few seconds,then exits
mvn archetype:generate > templates.txt
# 列出 Maven 的模板
mvn archetype:generate
-----------------------------------------------------------------------------------------Choose archetype:
1: remote -> am.ik.archetype:maven-reactjs-blank-archetype (Blank Project for React.js)
2: remote -> am.ik.archetype:msgpack-rpc-jersey-blank-archetype (Blank Project for Spring Boot + Jersey)
...
-----------------------------------------------------------------------------------------
# 选择数字 “314” 来使用 ml.rugal.archetype:springmvc-spring-hibernate 模板，并填写详细信息。注意，这个数字314可能在您的环境有所不同。寻找正确的数字应该看上面步骤中列出的技术。
-----------------------------------------------------------------------------------------
Choose a number or apply filter...
...
Choose ml.rugal.archetype:springmvc-spring-hibernate version:
...
# 注意，要导入项目到Eclipse中，键入命令mvn eclipse:eclipse，并导入它作为一个正常的项目
```

如果您知道使用哪个 archetypeArtifactId，可以跳过交互模式命令：

```sh
# maven-archetype-quickstart (Java Project)
mvn archetype:generate -DgroupId=com.yiibai.core -DartifactId=ProjectName -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false
# maven-archetype-webapp (Java Web Project)
mvn archetype:generate -DgroupId=com.yiibai.web -DartifactId=ProjectName -DarchetypeArtifactId=maven-archetype-webapp -DinteractiveMode=false
```

### 使用Maven构建项目

要构建一个基于Maven的项目，打开控制台，进入到 pom.xml 文件所放的项目文件夹，并发出以下命令，这将执行Maven的"package"阶段。

```sh
mvn package
```

Maven是分阶段运行，因此，执行"package"阶段的时候，所有阶段 – "validate", "compile" 和 "test", 包括目前的阶段"package"将被执行。

将项目打包成一个"jar"文件

```xml
<project>
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.yiibai</groupId>
    <artifactId>Maven Example</artifactId>
    <packaging>jar</packaging>
</project>
```

将项目打包成一个"war"文件

```xml
<project>
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.yiibai</groupId>
    <artifactId>Maven Example</artifactId>
    <packaging>war</packaging>
</project>
```

### 使用Maven清理项目

在基于Maven的项目中，很多缓存输出在“target”文件夹中。如果想建立项目部署，必须确保清理所有缓存的输出，从面能够随时获得最新的部署。

要清理项目缓存的输出，发出以下命令：

```sh
mvn clean
```

当 `mvn clean` 执行，在 "target" 文件夹中的一切都将被删除。

要部署您的项目进行生产，它总是建议使用 `mvn clean package`, 以确保始终获得最新的部署。

### 使用Maven运行单元测试

```sh
mvn test
```

这会在你的项目中运行整个单元测试

运行单个测试：

```sh
mvn -Dtest=TestApp1 test
mvn -Dtest=TestApp2 test
```

### 将项目安装到Maven本地资源库

```sh
# 打包项目，并自动部署到本地资源库，让其他开发人员使用它
mvn install
```

当 "install" 在执行阶段，上述所有阶段 "validate", "compile", "test", "package", "integration-test", "verify" 阶段, 包括目前的 "install" 阶段将被有序执行。

它总是建议 "clean" 和 "install" 在一起运行，让您能始终部署最新的项目到本地存储库

```sh
mvn clean install
```

### 生成基于Maven的项目文档站点

```sh
# 为您的项目信息生成文档站点，生成的网站在项目的"target/site"文件夹中
mvn site
```

### 使用 `mvn site-deploy` 部署站点

**1、[启用 WebDAV](https://www.yiibai.com/article/enable-webdav-in-apache-server-2-2-x-windows.html)**

**2、配置在何处部署**

```xml
<distributionManagement>
    <site>
      <id>yiibaiserver</id>
      <url>dav:http://127.0.0.1/sites/</url>
    </site>
</distributionManagement>
```

**注**： "dav" 前缀是 HTTP 协议之前添加的，这意味着通过 WebDAV 机制部署您的网站。或者，可以用 "scp" 取代它，如果您的服务器支持 "scp" 访问。

告诉 Maven 来使用 "wagon-webdav-jackrabbit" 扩展部署。

```xml
<build>
  <extensions>
    <extension>
      <groupId>org.apache.maven.wagon</groupId>
      <artifactId>wagon-webdav-jackrabbit</artifactId>
      <version>1.0-beta-7</version>
    </extension>
  </extensions>
</build>
```

**3、配置WebDAV身份验证**

%MAVEN_HOME%/conf/settings.xml

```xml
<servers>
  <server>
    <id>yiibaiserver</id>
    <username>admin</username>
    <password>123456</password>
  </server>
</servers>
```

"settings.xml" 中的文件服务器ID将在的 "pom.xml" 文件中被网站引用

**4、`mvn site:deploy` 命令执行**

所有站点文件夹和文件，在项目文件夹- "target/site" 会被自动部署到服务器。

### 部署基于Maven的war文件到Tomcat

```sh
mvn tomcat7:deploy
mvn tomcat6:deploy
```

**1、Tomcat 认证**

添加具有角色管理器GUI和管理脚本权限的用户

%TOMCAT7_PATH%/conf/tomcat-users.xml

```xml
<?xml version='1.0' encoding='utf-8'?>
<tomcat-users>
  <role rolename="manager-gui"/>
  <role rolename="manager-script"/>
  <user username="admin" password="password" roles="manager-gui,manager-script" />
</tomcat-users>
```

**2、Maven 认证**

添加上面 Maven 文件 设置的 Tomcat 用户，之后 Maven 使用此用户来登录 Tomcat 服务器！

%MAVEN_PATH%/conf/settings.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<settings ...>
  <servers>
    <server>
      <id>TomcatServer</id>
      <username>admin</username>
      <password>password</password>
    </server>
  </servers>
</settings>
```

**3、Tomcat Maven 插件**

Tomcat7：

```xml
<plugin>
  <groupId>org.apache.tomcat.maven</groupId>
  <artifactId>tomcat7-maven-plugin</artifactId>
  <version>2.2</version>
  <configuration>
    <url>http://localhost:8080/manager/text</url>
    <server>TomcatServer</server>
    <path>/yiibaiWebApp</path>
  </configuration>
</plugin>
```

Tomcat6：

```xml
<plugin>
  <groupId>org.apache.tomcat.maven</groupId>
  <artifactId>tomcat6-maven-plugin</artifactId>
  <version>2.2</version>
  <configuration>
    <url>http://localhost:8080/manager</url>
    <server>TomcatServer</server>
    <path>/yiibaiWebApp</path>
  </configuration>
</plugin>
```

**4、发布到 Tomcat**

```sh
# tomcat7
mvn tomcat7:deploy
mvn tomcat7:undeploy
mvn tomcat7:redeploy
# tomcat6
mvn tomcat6:deploy
mvn tomcat6:undeploy
mvn tomcat6:redeploy
```



#### Gradle

## 什么是Gradle?

简单的说，Gradle是一个构建工具，它是用来帮助我们构建app的，构建包括编译、打包等过程。

我们可以为Gradle指定构建规则，然后它就会根据我们的“命令”自动为我们构建app。Android Studio中默认就使用Gradle来完成应用的构建。

有些同学可能会有疑问：“我用AS不记得给Gradle指定过什么构建规则呀，最后不还是能搞出来个apk。”实际上，app的构建过程是大同小异的，有一些过程是“通用”的，也就是每个app的构建都要经历一些公共步骤。因此，在我们在创建工程时，Android Studio自动帮我们生成了一些通用构建规则，很多时候我们甚至完全不用修改这些规则就能完成我们app的构建。

有些时候，我们会有一些个性化的构建需求，比如我们引入了第三方库，或者我们想要在通用构建过程中做一些其他的事情，这时我们就要自己在系统默认构建规则上做一些修改。这时候我们就要自己向Gradle“下命令”了，这时候我们就需要用Gradle能听懂的话了，也就是Groovy。

Groovy是一种基于JVM的动态语言，关于它的具体介绍，感兴趣的同学可以文末参考“延伸阅读”部分给出的链接。
我们在开头处提到“Gradle是一种构建工具”。实际上，当我们想要更灵活的构建过程时，Gradle就成为了一个编程框架——我们可以通过编程让构建过程按我们的意愿进行。也就是说，当我们把Gradle作为构建工具使用时，我们只需要掌握它的配置脚本的基本写法就OK了；而当我们需要对构建流程进行高度定制时，就务必要掌握Groovy等相关知识了。

限于篇幅，本文只从构建工具使用者的角度来介绍Gradle的一些最佳实践，在文末“延伸阅读”部分给出了几篇高质量的深入介绍Gradle的文章，其中包含了Groovy等知识的介绍。

**1、Gradle工作的整个过程**

![x](http://viyitech.cn/public/images/gradle.png)

**2、在网络查看Gradle存储库**

问题：在哪里查找信息groupId，artifactId和版本呢？

可以去网站：http://mvnrepository.com，例如在我们上面示例使用的 common-lang3，可在网站中搜索找到打开URL：http://mvnrepository.com/artifact/org.apache.commons/commons-lang3

## Gradle的基本组成

**1、Project与Task**

在Gradle中，每一个待构建的工程是一个Project，构建一个Project需要执行一系列Task，比如编译、打包这些构建过程的子过程都对应着一个Task。具体来说，一个apk文件的构建包含以下Task：Java源码编译、资源文件编译、Lint检查、打包以生成最终的apk文件等等。

**2、插件**

插件的核心工作有两个：一是定义Task；二是执行Task。也就是说，我们想让Gradle能正常工作，完成整个构建流程中的一系列Task的执行，必须导入合适的插件，这些插件中定义了构建Project中的一系列Task，并且负责执行相应的Task。

在新建工程的app模块的build.gradle文件的第一行，往往都是如下这句：

```sh
apply plugin: 'com.android.application'
```

这句话的意思就是应用"com.android.application"这个插件来构建app模块，app模块就是Gradle中的一个Project。也就是说，这个插件负责定义并执行Java源码编译、资源文件编译、打包等一系列Task。实际上"com.android.application"整个插件中定义了如下4个顶级任务：

- assemble: 构建项目的输出(apk)
- check: 进行校验工作
- build: 执行assemble任务与check任务
- clean: 清除项目的输出

当我们执行一个任务时，会自动执行它所依赖的任务。比如，执行assemble任务会执行assembleDebug任务和assembleRelease任务，这是因为一个Android项目至少要有debug和release这两个版本的输出。

**3、Gradle配置文件**

Android Studio中的一个Module即为Gradle中的一个Project。app目录下，存在一个build.gradle文件，代表了app Module的构建脚本，它定义了应用于本模块的构建规则。我们可以看到，工程根目录下也存在一个build.gradle文件，它代表了整个工程的构建，其中定义了适用于这个工程中所有模块的构建规则。

接下来我们介绍一下几个Gradle配置文件：

- gradle.properties: 从它的名字可以看出，这个文件中定义了一系列“属性”。实际上，这个文件中定义了一系列供build.gradle使用的常量，比如keystore的存储路径、keyalias等等。
- gradlew与gradlew.bat: gradlew为Linux下的shell脚本，gradlew.bat是Windows下的批处理文件。gradlew是gradle wrapper的缩写，也就是说它对gradle的命令进行了包装，比如我们进入到指定Module目录并执行gradlew.bat assemble即可完成对当前Module的构建（Windows系统下）。
- local.properties: 从名字就可以看出来，这个文件中定义了一些本地属性，比如SDK的路径。
- settings.gradle: 假如我们的项目包含了不只一个Module时，我们想要一次性构建所有Module以完成整个项目的构建，这时我们需要用到这个文件。比如我们的项目包含了ModuleA和ModuleB这两个模块，则这个文件中会包含这样的语句：include ':ModuleA', ':ModuleB'。

**4、构建脚本**

首先我们来看一下工程目录下的build.gradle，它指定了真个整个项目的构建规则，它的内容如下：

```groovy
buildscript {
    repositories {
        jcenter() // 构建脚本中所依赖的库都在jcenter仓库下载
    }
    dependencies {
        // 指定了gradle插件的版本
        classpath 'com.android.tools.build:gradle:1.5.0'
    }
}

allprojects {
    repositories {
        // 当前项目所有模块所依赖的库都在jcenter仓库下载
        jcenter()
    }
}
```

我们再来简单介绍下app模块的build.gradle的内容：

```groovy
// 加载用于构建Android项目的插件
apply plugin: 'com.android.application'

android { // 构建Android项目使用的配置
    compileSdkVersion 23 // 指定编译项目时使用的SDK版本
    buildToolsVersion "23.0.1" // 指定构建工具的版本

    defaultConfig {
        applicationId "com.absfree.debugframwork" // 包名
        minSdkVersion 15  // 指定支持的最小SDK版本
        targetSdkVersion 23 // 针对的目标SDK版本
        versionCode 1
        versionName "1.0"
    }
    buildTypes { // 针对不同的构建版本进行一些设置
        release { // 对release版本进行的设置
            minifyEnabled false // 是否开启混淆
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'  // 指定混淆文件的位置
        }
    }
}

dependencies { // 指定当前模块的依赖
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:23.1.1'
    compile 'com.android.support:design:23.1.1'
}
```

## 常见配置

整个工程的build.gradle通常不需我们改动，这里我们介绍下一些对模块目录下build.gradle文件的常见配置。

**1、依赖第三方库**

当我们的项目中用到了了一些第三方库时，我们就需要进行一些配置，以保证能正确导入相关依赖。设置方法很简单，比如我们在app模块中用到了Fresco，只需要在build.gradle文件中的dependencies块添加如下语句：

```groovy
dependencies {
    ...
    compile 'com.facebook.fresco:fresco:0.11.0'
}
```

这样一来，Gradle会自动从jcenter仓库下载我们所需的第三方库并导入到项目中。

**2、导入本地jar包**

在使用第三方库时，除了像上面那样从jcenter仓库下载，我们还可以导入本地的jar包。配置方法也很简单，只需要先把jar文件添加到app\libs目录下，然后在相应jar文件上单击右键，选择"Ad As Library"。然后在build.gradle的dependencies块下添加如下语句： `compile files('libs/xxx.jar')`

实际上我们可以看到，系统为我们创建的build.gradle中就已经包含了如下语句：`compile fileTree(dir: 'libs', include: ['*.jar'])`

这句话的意思是，将libs目录下的所有jar包都导入。所以实际上我们只需要把jar包添加到libs目录下并"Ad As Library"即可。

**3、依赖其它模块**

假设我们的项目包含了多个模块，并且app模块依赖other模块，那么我们只需app\build.gradle的denpendencies块下添加如下语句：`compile project(':other')`

**4、构建输出为aar文件**

通常我们构建的输出目标都是apk文件，但如果我们的当前项目时Android Library，我们的目标输出就是aar文件。要想达到这个目的也很容易，只需要把build.gradle的第一句改为如下：`apply plugin:'com.android.library'` 这话表示我们使用的插件不再是构建Android应用的插件，而是构建Android Library的插件，这个插件定义并执行用于构建Android Library的一系列Task。

**5、自动移除不再使用的资源**

只需进行如下配置：

```groovy
android {
    ...
    buildTypes {
        release {
            ...
            shrinkResources true
            ...
        }
    }
}
```

**6、忽略Lint错误**

在我们构建Android项目的过程中，有时候会由于Lint错误而终止。当这些错误来自第三方库中时，我们往往想要忽略这些错误从而继续构建进程。这时候，我们可以只需进行如下配置：

```groovy
android {
    ...
    lintOptions {
        abortOnError false
    }
}
```

**7、集成签名配置**

在构建release版本的Android项目时，每次都手动导入签名文件，键入密码、keyalias等信息十分麻烦。通过将签名配置集成到构建脚本中，我们就不必每次构建发行版本时都手动设置了。具体配置如下：

```groovy
signingConfigs {
    myConfig { // 将"xx"替换为自己的签名文件信息
        storeFile file("xx.jks")
        storePassword "xx"
        keyAlias "xx"
        keyPassword "xx"
    }
}
android {
    buildTypes {
        release {
            signingConfig  signingConfigs.myConfig // 在release块中加入这行
            ...
        }
    }
    ...
}
```

真实开发中，我们不应该把密码等信息直接写到build.gradle中，更好的做法是放在gradle.properties中设置：

```properties
RELEASE_STOREFILE=xxx.jks
RELEASE_STORE_PASSWORD = xxx
RELEASE_KEY_ALIAS=xxx
RELEASE_KEY_PASSWORD=xxx
```

然后在build.gradle中直接引用即可：

```groovy
signingConfigs {
    myConfig {
        storeFilefile(RELEASE_STOREFILE)
        storePassword RELEASE_STORE_PASSWORD
        keyAlias RELEASE_KEY_ALIAS
        keyPassword RELEASE_KEY_PASSWORD
    }
}
```

## 延伸阅读

1、[深入理解Android之Gradle](http://blog.csdn.net/Innost/article/details/48228651)

邓凡平老师的一篇博文，从原理到使用非常深入细致地介绍了Gradle。而且重点介绍了怎样把Gradle当做一个编程框架来使用，介绍了Groovy语法基础、Gradle常用API，想要高度定制项目构建过程的小伙伴们一定不要错过这篇文章哦：）

2、[Gradle构建最佳实践]( http://www.figotan.org/2016/04/01/gradle-on-android-best-practise/)

这篇文章主要从使用者的角度介绍了Gradle在使用过程中的最佳实践，同样非常精彩。