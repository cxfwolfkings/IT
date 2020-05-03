# 目录

1. 为什么需要并行？
2. 同步、异步、并发、并行概念 
3. 有关并行的2个重要定律

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





