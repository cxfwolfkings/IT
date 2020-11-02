# 目录

1. 理论

   - 为什么需要并行？
   - 同步、异步、并发、并行概念 
   - 有关并行的2个重要定律
   - 从头开始——并行基础
   - 内存模型和线程安全
   - 无锁

2. 实战

   [BIO/NIO/AIO](#BIO/NIO/AIO)

3. 总结

4. 升华

   

## 为什么需要并行?

1. 业务要求
2. 性能

反对意见：

- Linus Torvalds：忘掉那该死的并行吧！

- 需要有多么奇葩的想象力才能想象出并行计算的用武之地？
- 并行计算只有在 **图像处理** 和 **服务端编程** 2个领域可以使用，并且它在这2个领域确实有着大量广泛的使用。但是在其它任何地方，并行计算毫无建树！

![x](http://hyw6485860001.my3w.com/public/images/Linus.png)

摩尔定律的失效

- 预计18个月会将芯片的性能提高一倍
- Intel CEO Barret 单膝下跪对取消 4GHz 感到抱歉。在2004年秋季，Intel宣布彻底取消 4GHz 计划。
- 虽然现在已经有了 4GHz 的芯片，但频率极限已经逼近
- 10年过去了，我们还停留在**4GHz**

![x](http://hyw6485860001.my3w.com/public/images/Barret.png)

顶级计算机科学家唐纳德·尔文·克努斯

- 在我看来，这种现象（并发）或多或少是由于硬件设计者已经无计可施了导致的，他们将摩尔定律失效的责任推脱给软件开发者。

![x](http://hyw6485860001.my3w.com/public/images/Donald.png)

并行计算还出于 **业务模型** 的需要。并不是为了提高系统性能，而是确实在业务上需要多个执行单元。比如HTTP服务器，为每一个 Socket 连接新建一个处理线程，让不同线程承担不同的业务工作，简化任务调度！

## 同步、异步、并发、并行概念 

1、同步(synchronous)和异步(asynchronous)

![x](http://hyw6485860001.my3w.com/public/images/sync.png)

2、并发(Concurrency)和并行(Parallelism)

![x](http://hyw6485860001.my3w.com/public/images/parall.png)

3、临界区

临界区用来表示一种公共资源或者说是共享数据，可以被多个线程使用。但是每一次，只能有一个线程使用它，一旦临界区资源被占用，其他线程要想使用这个资源，就必须等待。

![x](http://hyw6485860001.my3w.com/public/images/limit.png)

4、阻塞(Blocking)和非阻塞(Non-Blocking)

阻塞和非阻塞通常用来形容多线程间的相互影响。

比如一个线程占用了临界区资源，那么其它所有需要这个资源的线程就必须在这个临界区中进行等待，等待会导致线程挂起。这种情况就是阻塞。此时，如果占用资源的线程一直不愿意释放资源，那么其它所有阻塞在这个临界区上的线程都不能工作。

非阻塞允许多个线程同时进入临界区

5、死锁(Deadlock)、饥饿(Starvation)和活锁(Livelock)

饥饿是指某一个或者多个线程因为种种原因无法获得所需要的资源，导致一直无法执行。例如：电梯遇人

![x](http://hyw6485860001.my3w.com/public/images/car.png)

6、并行的级别

- 阻塞：当一个线程进入临界区后，其他线程必须等待

- 非阻塞：
  - 障碍(Obstruction-Free)：无障碍是一种最弱的非阻塞调度，自由出入临界区
     无竞争时，有限步内完成操作；有竞争时，回滚数据
  - 无锁(Lock-Free)：是无障碍的，保证有一个线程可以胜出

```
while (!atomicVar.compareAndSet(localVar, localVar+1)) {
    localVar = atomicVar.get();
}
```

- 无等待(Wait-Free)：无锁的，要求所有的线程都必须在有限步内完成，无饥饿的

## 有关并行的2个重要定律

### Amdahl定律（阿姆达尔定律）

![x](http://hyw6485860001.my3w.com/public/images/Amdahl.jpg)

### Gustafson定律（古斯塔夫森）

![x](http://hyw6485860001.my3w.com/public/images/Gustafson.jpg)

## 从头开始——并行基础

### 什么是线程

线程是进程内的执行单元

### 线程内的基本操作



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



### 守护线程

- 在后台默默完成一些系统性服务，比如垃圾回收、JIT
- 当一个java应用内只有守护线程时，java虚拟机会自然退出

```java
Thread t = new DaemonT();
t.setDaemon(true);
t.start();
```



### 线程优先级

```java
public final static int MIN_PRIORITY = 1;
public final static int NORM_PRIORITY = 5;
public final static int MAX_PRIORITY = 10;

Thread high = new HighPriority();
LowPriority low = new LowPriority();
high.setPriority(Thread.MAX_PRIORITY);
low.setPriority(Thread.MIN_PRIORITY);
low.start();
high.start();
```

高优先级的线程更容易在竞争中获胜

### 基本的线程同步操作

- synchronized
- `Object.wait()` 和 `Object.notify()`



## 内存模型和线程安全

### 原子性

原子性是指一个操作是不可中断的。即使是在多个线程一起执行的时候，一个操作一旦开始，就不会被其它线程干扰。

i++是原子操作吗？

### 有序性

在并发时，程序的执行可能就会出现乱序！

一条指令的执行是可以分为很多步骤的：

- 取指 IF
- 译码和取寄存器操作数 ID
- 执行或者有效地址计算 EX
- 存储器访问 MEM
- 写回 WB

指令重排可以使流水线更加顺畅



### 可见性

可见性是指当一个线程修改了某一个共享变量的值，其他线程是否能够立即知道这个修改

- 编译器优化
- 硬件优化（如写吸收，批操作）

Java虚拟机层面的可见性：http://hushi55.github.io/2015/01/05/volatile-assembly



### Happen-Before

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



## 实战



### BIO/NIO/AIO

NIO的单线程能处理连接的数量比BIO要高出很多，而为什么单线程能处理更多的连接呢？原因就是**Selector**。

当一个连接建立之后，他有两个步骤要做：

1. 第一步是接收完客户端发过来的全部数据；
2. 第二步是服务端处理完请求业务之后返回response给客户端。

NIO和BIO的区别主要是在第一步：在BIO中，等待客户端发数据这个过程是阻塞的，这样就造成了一个线程只能处理一个请求的情况，而机器能支持的最大线程数是有限的，这就是为什么BIO不能支持高并发的原因。而NIO中，当一个Socket建立好之后，Thread并不会阻塞去接受这个Socket，而是将这个请求交给Selector，Selector会不断的去遍历所有的Socket，一旦有一个Socket建立完成，他会通知Thread，然后Thread处理完数据再返回给客户端——***这个过程是不阻塞的***，这样就能让一个Thread处理更多的请求了。

下面两张图是基于BIO的处理流程和netty的处理流程，辅助你理解两种方式的差别：

![x](./Resources/java_async01.png)

![x](./Resources/java_async02.png)

除了BIO和NIO之外，还有一些其他的IO模型，下面这张图就表示了五种IO模型的处理流程：

![x](./Resources/java_async03.png)

- **BIO：**同步阻塞IO，阻塞整个步骤，如果连接少，他的延迟是最低的，因为一个线程只处理一个连接，适用于少连接且延迟低的场景，比如说数据库连接。

- **NIO：**同步非阻塞IO，阻塞业务处理但不阻塞数据接收，适用于高并发且处理简单的场景，比如聊天软件。

- **多路复用IO：**它的两个步骤处理是分开的，也就是说，一个连接可能他的数据接收是线程a完成的，数据处理是线程b完成的，他比BIO能处理更多请求。

- **信号驱动IO：**这种IO模型主要用在嵌入式开发，不参与讨论。

- **异步IO：**它的数据请求和数据处理都是异步的，数据请求一次返回一次，适用于长连接的业务场景。

以上摘自[Linux IO模式及 select、poll、epoll详解](https://links.jianshu.com/go?to=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000003063859)

**Netty为什么传输快？**

Netty的传输快其实也是依赖了NIO的一个特性——**零拷贝**。

我们知道，Java的内存有堆内存、栈内存和字符串常量池等等，其中堆内存是占用内存空间最大的一块，也是Java对象存放的地方，一般我们的数据如果需要从IO读取到堆内存，中间需要经过Socket缓冲区，也就是说一个数据会被拷贝两次才能到达他的的终点，如果数据量大，就会造成不必要的资源浪费。

Netty针对这种情况，使用了NIO中的另一大特性——零拷贝，当他需要接收数据的时候，他会在堆内存之外开辟一块内存，数据就直接从IO读到了那块内存中去，在Netty里面通过**ByteBuf**可以对这些数据进行直接操作，从而加快了传输速度。

下两图就介绍了两种拷贝方式的区别，摘自[Linux 中的零拷贝技术，第 1 部分](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.ibm.com%2Fdeveloperworks%2Fcn%2Flinux%2Fl-cn-zerocopy1%2Findex.html)









