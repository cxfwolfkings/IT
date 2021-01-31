# Redis



## 目录

1. 简介

   - [数据类型](#数据类型)
- [数据持久化](#数据持久化)
   - [过期删除](#过期删除)
- [分布式锁](#分布式锁)
   - [Redis限流](#Redis限流)

2. 实战

   - [安装](#安装)

   - [客户端](#客户端) 
   - [操作命令](#操作命令)
   - [内存管理](#内存管理)

   - [集群部署](#集群部署)

   - [事务管理](#事务管理)

   - [事件驱动](#事件驱动)

   - [缓存设计](#缓存设计)

   - [慢查询](#慢查询)

   - [流水线](#流水线)

   - [发布-订阅](#发布-订阅)

   - [HyperLogLog](#hyperloglog)

   - [GEO](#geo)

   - [使用场景](#使用场景)

   - [消息队列](#消息队列)

3. 总结

   - [常见知识点](#常见知识点)

   - [问题](#问题)

   - [参考](#参考)

   - [生态链](#生态链)
     - [Memcached](#memcached)

4. 升华



## 简介

- 官方网站：[https://redis.io/](https://redis.io/)

- Redis: Remote Dictionary Server，属于 NoSQL 数据库

- Redis是什么：

  Redis is an open source, BSD licensed, advanced key-value store. It is often referred to as a data structure server since keys can contain strings, hashes, lists, sets and sorted sets.

  Redis是开源，BSD许可，高级的key-value存储系统。可以用来存储字符串、哈希结构、链表、集合。因此，常用来提供数据结构服务。

- 作者：来自意大利西西里岛的 Salvatore Sanfilippo，Github地址：[http://github.com/antirez](http://github.com/antirez)。使用 ANSI C 语言编写，最新版本（4.0.10）代码规模7.6万行。

- 目前，在所有可实现分布式缓存的开源软件中，Redis 应用最为广泛，开源社区也最为活跃，开源客户端支持语言也最为丰富。
- Redis作用：可用作 **数据库**、**高速缓存**、**锁** 和 **消息队列**。支持**字符串**、**哈希表**、**列表**、**集合**、**有序集合**、**位图**、**HyperLogLogs** 等数据类型。内置复制、Lua 脚本、老化逐出、事务以及不同级别磁盘持久化功能。Redis 还支持 Sentinel 和 Cluster（从3.0开始）等高可用集群方案

- Redis 作为缓存的常见业务场景有：
  1. 缓存热点数据，减轻数据库负载；
  2. 基于 List 结构显示最新的项目列表；
  3. 基于 Sorted Set 来做排行榜，取 Top N；
  4. 基于 Set 来做 uniq 操作，如页面访问者排重；
  5. 基于 Hset 做单 Key 下多属性的项目，例如商品的基本信息、库存、价格等设置成多属性。

- Redis 特点
  1. Redis 不仅仅支持简单的 key-value 类型的数据，同时还提供 list，set，zset，hash 等数据结构的存储。
  2. Redis 支持数据的持久化，可以将内存中的数据保存在磁盘中，重启的时候可以再次加载进行使用。
  3. Redis 支持数据的备份，即 master-slave 模式的数据备份。
  4. Redis 主进程是**单线程** 工作，因此，Redis 的所有操作都是原子性的。意思就是要么成功执行要么失败完全不执行。单个操作是原子性的。多个操作也支持事务，即原子性，通过 `MULTI` 和 `EXEC` 指令包起来。
  5. 性能极高：Redis能读的速度是110000次/s，写的速度是81000次/s，此外，Key 和 Value 的大小限制均为 512M，这阈值相当可观。
  6. 丰富的特性：Redis 还支持 publish/subscribe，通知，key 过期等等特性。



**什么是** **BSD** **协议？**

BSD开源协议是一个给于使用者很大自由的协议。可以自由的使用，修改源代码，也可以将修改后的代码作为开源或者专有软件再发布。当你发布使用了BSD协议的代码，或者以BSD协议代码为基础做二次开发自己的产品时，需要满足三个条件：

1. 如果再发布的产品中包含源代码，则在源代码中必须带有原来代码中的BSD协议。

2. 如果再发布的只是二进制类库/软件，则需要在类库/软件的文档和版权声明中包含原来代码中的BSD协议。

3. 不可以用开源代码的作者/机构名字和原来产品的名字做市场推广。

BSD代码鼓励代码共享，但需要尊重代码作者的著作权。BSD由于允许使用者修改和重新发布代码，也允许使用或在BSD代码上开发商业软件发布和销售，因此是对商业集成很友好的协议。

很多的公司企业在选用开源产品的时候都首选BSD协议，因为可以完全控制这些第三方的代码，在必要的时候可以修改或者二次开发。

更多协议参考：[各种开源协议介绍](https://www.runoob.com/w3cnote/open-source-license.html) 



**什么是** **key value** **存储？**

JAVA 中的 map 就是 key=>value 存储的。键=>值（key=>value）对，键唯一，对应一个值，值的形式多样。

 

**什么是原子性，什么是原子性操作？**

举个例子：

A、想要从自己的帐户中转1000块钱到B的帐户里。那个从A开始转帐，到转帐结束的这一个过程，称之为一个事务。在这个事务里，要做如下操作：

1. 从A的帐户中减去1000块钱。如果A的帐户原来有3000块钱，现在就变成2000块钱了。

2. 在B的帐户里加1000块钱。如果B的帐户如果原来有2000块钱，现在则变成3000块钱了。

如果在A的帐户已经减去了1000块钱的时候，忽然发生了意外，比如停电什么的，导致转帐事务意外终止了，而此时B的帐户里还没有增加1000块钱。那么，我们称这个操作失败了，要进行回滚。回滚就是回到事务开始之前的状态，也就是回到A的帐户还没减1000块的状态，B的帐户的原来的状态。此时A的帐户仍然有3000块，B的帐户仍然有2000块。

我们把这种要么一起成功（A帐户成功减少1000，同时B帐户成功增加1000），要么一起失败（A帐户回到原来状态，B帐户也回到原来状态）的操作叫原子性操作。

如果把一个事务可看作是一个程序，它要么完整的被执行，要么完全不执行。这种特性就叫原子性。



### 数据类型

参考：https://mp.weixin.qq.com/s?__biz=MzI4NjI1OTI4Nw==&mid=2247488832&idx=1&sn=5999893d7fe773f54f7d097ac1c2074d&chksm=ebdef478dca97d6e2433abdeecf600669ffbb1b68eb2b744e7ed72aac4cd5c4cabf19b0d8f19&scene=132#wechat_redirect

数据类型|可以存储的值|操作
-|-|-
String|字符串、整数或者浮点数|对整个字符串或者字符串的其中一部分执行操作；对整数和浮点数执行自增或者自减操作
List|列表|从两端压入或者弹出元素；对单个或者多个元素进行修剪，只保留一个范围内的元素
Set|无序集合|添加、获取、移除单个元素；检查一个元素是否存在于集合中；计算交集、并集、差集；从集合里面随机获取元素
Hash|包含键值对的无序散列表|添加、获取、移除单个键值对；获取所有键值对；检查某个键是否存在
ZSet|有序集合|添加、获取、删除元素；根据分值范围或者成员来获取元素；计算一个键的排名

Redis 可以为每个键设置过期时间，当键过期时，会自动删除该键。对于散列表这种容器，只能为整个键设置过期时间（整个散列表），而不能为键里面的单个元素设置过期时间。

Redis keys 命令 | 描述
-|-
DEL key | 该命令用于在 key 存在时删除 key
DUMP key | 序列化给定 key ，并返回被序列化的值
EXISTS key | 检查给定 key 是否存在
EXPIRE key seconds | 为给定 key 设置过期时间，以秒计
EXPIREAT key timestamp | EXPIREAT 的作用和 EXPIRE 类似，都用于为 key 设置过期时间。 不同在于 EXPIREAT 命令接受的时间参数是 UNIX 时间戳(unix timestamp)
PEXPIRE key milliseconds | 设置 key 的过期时间以毫秒计
PEXPIREAT key milliseconds-timestamp | 设置 key 过期时间的时间戳(unix timestamp) 以毫秒计
KEYS pattern | 查找所有符合给定模式( pattern)的 key
MOVE key db | 将当前数据库的 key 移动到给定的数据库 db 当中
PERSIST key | 移除 key 的过期时间，key 将持久保持
PTTL key | 以毫秒为单位返回 key 的剩余的过期时间
TTL key | 以秒为单位，返回给定 key 的剩余生存时间(TTL, time to live)
RANDOMKEY | 从当前数据库中随机返回一个 key
RENAME key newkey | 修改 key 的名称
RENAMENX key newkey | 仅当 newkey 不存在时，将 key 改名为 newkey
TYPE key | 返回 key 所储存的值的类型

更多命令请参考：[https://redis.io/commands](https://redis.io/commands)

#### String

[https://www.runoob.com/redis/redis-strings.html](https://www.runoob.com/redis/redis-strings.html)

**用途**：适用于简单key-value存储、setnx key value实现分布式锁、计数器（原子性）、分布式全局唯一ID。

**底层**：C语言中String用char[]数组表示，源码中用`SDS`(simple dynamic string)封装char[]，这是Redis存储的`最小单元`，一个SDS最大可以存储512M信息。

```c
struct sdshdr{
  unsigned int len; // 标记char[]的长度
  unsigned int free; // 标记char[]中未使用的元素个数
  char buf[]; // 存放元素的坑
}
```

Redis对SDS再次封装生成了RedisObject，核心有两个作用：

1. 说明是5种类型哪一种。
2. 里面有指针用来指向 SDS。

当你执行`set name sowhat`的时候，其实Redis会创建两个RedisObject对象，键的RedisObject 和 值的RedisOjbect 其中它们type = REDIS_STRING，而SDS分别存储的就是 name 跟 sowhat 字符串咯。

并且Redis底层对SDS有如下优化：

1. SDS修改后大小 > 1M时 系统会多分配空间来进行`空间预分配`。
2. SDS是`惰性释放空间`的，你free了空间，可是系统把数据记录下来下次想用时候可直接使用。不用新申请空间。

示例：

```sh
# key: hello; value: world
> set hello world
OK
> get hello
"world"
> del hello
(integer) 1
> get hello
(nil)
```

#### List

![x](./Resources/st031.png)

查看源码底层 `adlist.h` 会发现底层就是个 **双端链表**，该链表最大长度为2^32-1。常用就这几个组合。

- lpush + lpop = stack 先进后出的栈 

- lpush + rpop = queue 先进先出的队列 

- lpush + ltrim = capped collection 有限集合

- lpush + brpop = message queue 消息队列

一般可以用来做简单的消息队列，并且当数据量小的时候可能用到独有的压缩列表来提升性能。当然专业点还是要 [RabbitMQ](https://mp.weixin.qq.com/s?__biz=MzI4NjI1OTI4Nw==&mid=2247488121&idx=1&sn=1ca9adc665b9ba0fc68c2d647b967d7c&scene=21#wechat_redirect)、ActiveMQ等。

示例：

```sh
# 创建集合，list-key是集合名称
> rpush list-key item
(integer) 1
> rpush list-key item2
(integer) 2
> rpush list-key item
(integer) 3
# 查询集合 范围：0 ~ -1（右数第一个），也就是全部
> lrange list-key 0 -1
1) "item"
2) "item2"
3) "item"
# 查询下标为1的key
> lindex list-key 1
"item2"
# 弹出第一个
> lpop list-key
"item"

> lrange list-key 0 -1
1) "item2"
2) "item"
```

#### Set

如果你明白Java中HashSet是[HashMap](https://mp.weixin.qq.com/s?__biz=MzI4NjI1OTI4Nw==&mid=2247485513&idx=1&sn=340e879f3197ae9e3d8789a1ad55a76e&scene=21#wechat_redirect)的简化版那么这个Set应该也理解了。都是一样的套路而已。这里你可以认为是没有Value的Dict。看源码 `t.set.c` 就可以了解本质了。

```c
int setTypeAdd(robj *subject, robj *value) {
    long long llval;
    if (subject->encoding == REDIS_ENCODING_HT) {
         // 看到底层调用的还是dictAdd，只不过第三个参数= NULL
         if (dictAdd(subject->ptr,value,NULL) == DICT_OK) {
            incrRefCount(value);
            return 1;
        }
        ....
```

示例：

```sh
# 创建散列表（元素不重复），set-key是表名
> sadd set-key item
(integer) 1
> sadd set-key item2
(integer) 1
> sadd set-key item3
(integer) 1
> sadd set-key item
(integer) 0
# 返回集合中全部项
> smembers set-key
1) "item"
2) "item2"
3) "item3"
# 判断元素是否在集合中存在
> sismember set-key item4
(integer) 0
> sismember set-key item
(integer) 1
# 移除集合项
> srem set-key item2
(integer) 1
> srem set-key item2
(integer) 0
# 返回集合中全部项
> smembers set-key
1) "item"
2) "item3"
```

#### Hash

散列非常适用于将一些相关的数据存储在一起，比如用户的购物车。该类型在日常用途还是挺多的。

这里需要明确一点：Redis中只有一个K，一个V。其中 K 绝对是字符串对象，而 V 可以是String、List、Hash、Set、ZSet任意一种。

hash的底层主要是采用字典dict的结构，整体呈现层层封装。从小到大如下：

**dictEntry**

真正的数据节点，包括key、value 和 next 节点。

**dictht**

1. 数据 dictEntry 类型的数组，每个数组的item可能都指向一个链表。

2. 数组长度 size。

3. sizemask 等于 size - 1。

4. 当前 dictEntry 数组中包含总共多少节点。

**dict**

1. dictType 类型，包括一些自定义函数，这些函数使得key和value能够存储
2. rehashidx 其实是一个标志量，如果为`-1`说明当前没有扩容，如果`不为 -1` 则记录扩容位置。
3. dictht数组，两个Hash表。
4. iterators 记录了当前字典正在进行中的迭代器

组合后结构就是如下：

![x](./Resources/st032.png)

**渐进式扩容**

为什么 dictht ht[2]是两个呢？**目的是在扩容的同时不影响前端的CURD**，慢慢的把数据从ht[0]转移到ht[1]中，同时`rehashindex`来记录转移的情况，当全部转移完成，将ht[1]改成ht[0]使用。

rehashidx = -1说明当前没有扩容，rehashidx != -1则表示扩容到数组中的第几个了。

扩容之后的数组大小为大于used*2的**2的n次方**的最小值，跟 [HashMap](https://mp.weixin.qq.com/s?__biz=MzI4NjI1OTI4Nw==&mid=2247485513&idx=1&sn=340e879f3197ae9e3d8789a1ad55a76e&scene=21#wechat_redirect) 类似。然后挨个遍历数组同时调整rehashidx的值，对每个dictEntry[i] 再挨个遍历链表将数据 Hash 后重新映射到 dictht[1]里面。并且 **dictht[0].use** 跟 **dictht[1].use** 是动态变化的。

![x](./Resources/st033.png)

整个过程的重点在于`rehashidx`，其为第一个数组正在移动的下标位置，如果当前内存不够，或者操作系统繁忙，扩容的过程可以随时停止。

停止之后如果对该对象进行操作，那是什么样子的呢？

1. 如果是新增，则直接新增第二个数组，因为如果新增到第一个数组，以后还是要移过来，没必要浪费时间

2. 如果是删除，更新，查询，则先查找第一个数组，如果没找到，则再查询第二个数组。

![x](./Resources/st034.png)

示例：

```sh
> hset hash-key sub-key1 value1
(integer) 1
> hset hash-key sub-key2 value2
(integer) 1
> hset hash-key sub-key1 value1
(integer) 0

> hgetall hash-key
1) "sub-key1"
2) "value1"
3) "sub-key2"
4) "value2"

> hdel hash-key sub-key2
(integer) 1
> hdel hash-key sub-key2
(integer) 0

> hget hash-key sub-key1
"value1"

> hgetall hash-key
1) "sub-key1"
2) "value1"
```

#### ZSet

范围查找 的天敌就是 有序集合，看底层 `redis.h` 后就会发现 Zset用的就是可以跟二叉树媲美的`跳跃表`来实现有序。跳表就是多层**链表**的结合体，跳表分为许多层(level)，每一层都可以看作是数据的**索引**，**这些索引的意义就是加快跳表查找数据速度**。

每一层的数据都是有序的，上一层数据是下一层数据的子集，并且第一层(level 1)包含了全部的数据；层次越高，跳跃性越大，包含的数据越少。并且随便插入一个数据该数据是否会是跳表索引完全随机的跟玩骰子一样。

跳表包含一个表头，它查找数据时，是`从上往下，从左往右`进行查找。现在找出值为37的节点为例，来对比说明跳表和普遍的链表。

1. 没有跳表查询 比如我查询数据37，如果没有上面的索引时候路线如下图：

   ![x](./Resources/st035.png)

2. 有跳表查询 有跳表查询37的时候路线如下图：

   ![x](./Resources/st036.png)

应用场景：

> 积分排行榜、时间排序新闻、延时队列。

```sh
> zadd zset-key 728 member1
(integer) 1
> zadd zset-key 982 member0
(integer) 1
> zadd zset-key 982 member0
(integer) 0

> zrange zset-key 0 -1 withscores
1) "member1"
2) "728"
3) "member0"
4) "982"

> zrangebyscore zset-key 0 800 withscores
1) "member1"
2) "728"

> zrem zset-key member1
(integer) 1
> zrem zset-key member1
(integer) 0

> zrange zset-key 0 -1 withscores
1) "member0"
2) "982"
```

#### Redis Geo

参考[Redis Geo核心原理解析](https://mp.weixin.qq.com/s?__biz=MzI4NjI1OTI4Nw==&mid=2247485957&idx=2&sn=a5a75f2f9053cfd40df2d0d7a16389ef&scene=21#wechat_redirect)。他的核心思想就是将地球近似为球体来看待，然后 GEO 利用 GeoHash 将二维的经纬度转换成字符串，来实现位置的划分跟指定距离的查询。

#### HyperLogLog

HyperLogLog ：是一种`概率`数据结构，它使用概率算法来统计集合的近似基数。而它算法的最本原则是`伯努利过程 + 分桶 + 调和平均数`。具体实现可看  HyperLogLog 讲解。

**功能**：误差允许范围内做基数统计 (基数就是指一个集合中不同值的个数) 的时候非常有用，每个HyperLogLog的键可以计算接近**2^64**不同元素的基数，而大小只需要12KB。错误率大概在0.81%。所以如果用做 UV 统计很合适。

HyperLogLog底层 一共分了 **2^14** 个桶，也就是 16384 个桶。每个(registers)桶中是一个 6 bit 的数组，这里有个骚操作就是一般人可能直接用一个字节当桶浪费2个bit空间，但是Redis底层只用6个然后通过前后拼接实现对内存用到了极致，最终就是 16384*6/8/1024 = 12KB。

#### bitmap

BitMap 原本的含义是用一个比特位来映射某个元素的状态。由于一个比特位只能表示 0 和 1 两种状态，所以 BitMap 能映射的状态有限，但是使用比特位的优势是能大量的节省内存空间。

在 Redis 中BitMap 底层是基于字符串类型实现的，可以把 Bitmaps 想象成一个以比特位为单位的数组，数组的每个单元只能存储0和1，数组的下标在 Bitmaps 中叫做偏移量，BitMap 的 offset 值上限 **2^32 - 1**。

![x](./Resources/st037.png)

1. 用户签到

   > key = 年份：用户id  offset = （今天是一年中的第几天） % （今年的天数）

2. 统计活跃用户

   > 使用日期作为 key，然后用户 id 为 offset 设置不同 offset 为 0 1 即可。

**PS**：Redis 它的通讯协议是基于TCP的应用层协议 RESP(REdis Serialization Protocol)。

#### Bloom Filter

使用布隆过滤器得到的判断结果：`不存在的一定不存在，存在的不一定存在`。布隆过滤器原理：

> 当一个元素被加入集合时，通过K个散列函数将这个元素映射成一个位数组中的K个点（有效降低冲突概率），把它们置为1。检索时，我们只要看看这些点是不是都是1就知道集合中有没有它了：如果这些点有任何一个为0，则被检元素一定不在；如果都是1，则被检元素很可能在。这就是布隆过滤器的基本思想。

想玩的话可以用Google的`guava`包玩耍一番。

![x](./Resources/st038.png)

#### 发布订阅

redis提供了`发布、订阅`模式的消息机制，其中消息订阅者与发布者不直接通信，发布者向指定的频道（channel）发布消息，订阅该频道的每个客户端都可以接收到消息。不过与专业的MQ(RabbitMQ RocketMQ ActiveMQ Kafka)相比不值一提，这个功能就算球了。

![x](./Resources/st039.png)



### 数据持久化

- [Redis持久化机制](./总结-面试1.md#Redis)



### 过期删除

- [Redis过期策略和内存淘汰策略](./总结-面试1.md#Redis)



### 分布式锁

日常开发中我们可以用 [synchronized](https://mp.weixin.qq.com/s?__biz=MzI4NjI1OTI4Nw==&mid=2247488320&idx=1&sn=6fd5cddf2a0ff68fe00ccc834e90521b&scene=21#wechat_redirect) 、[Lock](https://mp.weixin.qq.com/s?__biz=MzI4NjI1OTI4Nw==&mid=2247488426&idx=1&sn=705cace6ce7fbc2d6f141e8b03623fff&scene=21#wechat_redirect) 实现并发编程。但是Java中的锁**只能保证在同一个JVM进程内中执行**。如果在分布式集群环境下用锁呢？日常一般有两种选择方案。

#### Zookeeper实现分布式锁

你需要知道一点基本`zookeeper`知识：

> 1、持久节点：客户端断开连接zk不删除persistent类型节点 
> 2、临时节点：客户端断开连接zk删除ephemeral类型节点 
> 3、顺序节点：节点后面会自动生成类似0000001的数字表示顺序 
> 4、节点变化的通知：客户端注册了监听节点变化的时候，会**调用回调方法**

大致流程如下，其中注意每个节点`只`监控它前面那个节点状态，从而避免`羊群效应`。关于模板代码百度即可。

![x](./Resources/st042.png)

缺点：

> 频繁的创建删除节点，加上注册watch事件，对于zookeeper集群的压力比较大，性能也比不上Redis实现的分布式锁。

#### Redis实现分布式锁

本身原理也比较简单，Redis 自身就是一个单线程处理器，具备互斥的特性，通过setNX，exist等命令就可以完成简单的分布式锁，处理好超时释放锁的逻辑即可。

SETNX

> SETNX 是SET if Not eXists的简写，日常指令是`SETNX key value`，如果 key 不存在则set成功返回 1，如果这个key已经存在了返回0。

SETEX

> SETEX key seconds value 表达的意思是 将值 value 关联到 key ，并将 key 的生存时间设为多少秒。如果 key 已经存在，setex命令将覆写旧值。并且 setex是一个`原子性`(atomic)操作。

加锁：一般就是用一个标识唯一性的字符串比如UUID 配合 SETNX 实现加锁。

解锁：这里用到了LUA脚本，LUA可以保证是**原子性**的，思路就是判断一下Key和入参是否相等，是的话就删除，返回成功1，0就是失败。

缺点：这个锁是**无法重入的**，且自己实现的话各种边边角角都要考虑到，所以了解个大致思路流程即可，**工程化还是用开源工具包就行**。

#### Redisson实现分布式锁

**Redisson** 是在Redis基础上的一个服务，采用了基于NIO的Netty框架，不仅能作为Redis底层驱动**客户端**，还能将原生的RedisHash，List，Set，String，Geo，HyperLogLog等数据结构封装为Java里大家最熟悉的映射（Map），列表（List），集（Set），通用对象桶（Object Bucket），地理空间对象桶（Geospatial Bucket），基数估计算法（HyperLogLog）等结构。

这里我们只是用到了关于分布式锁的几个指令，它的大致底层原理：

![x](./Resources/st043.png)

[Redisson加锁解锁](https://mp.weixin.qq.com/s?__biz=MzU0OTk3ODQ3Ng==&mid=2247483893&idx=1&sn=32e7051116ab60e41f72e6c6e29876d9&scene=21#wechat_redirect) 大致流程图如下：

![x](./Resources/st044.png)



## Redis限流

在开发高并发系统时，有三把利器用来保护系统：`缓存`、`降级`和`限流`。

那么何为限流呢？顾名思义，限流就是限制流量，就像你宽带包了1个G的流量，用完了就没了。通过限流，我们可以很好地控制系统的qps，从而达到保护系统的目的。

### 1. 基于Redis的setnx、zset

#### setnx

比如我们需要在10秒内限定20个请求，那么我们在setnx的时候可以设置过期时间10，当请求的setnx数量达到20时候即达到了限流效果。

**缺点**：比如当统计1-10秒的时候，无法统计2-11秒之内，如果需要统计N秒内的M个请求，那么我们的Redis中需要保持N个key等等问题。

#### zset

其实限流涉及的最主要的就是滑动窗口，上面也提到1-10怎么变成2-11。其实也就是起始值和末端值都各+1即可。我们可以将请求打造成一个**zset数组**，当每一次请求进来的时候，value保持唯一，可以用UUID生成，而score可以用当前时间戳表示，因为score我们可以用来计算当前时间戳之内有多少的请求数量。而zset数据结构也提供了**range**方法让我们可以很轻易的获取到2个时间戳内有多少请求，

**缺点**：就是zset的数据结构会越来越大。

### 2. 漏桶算法

漏桶算法思路：把水比作是请求，漏桶比作是系统处理能力极限，水先进入到漏桶里，漏桶里的水**按一定速率流出**，当流出的速率小于流入的速率时，由于漏桶容量有限，后续进入的水直接溢出（拒绝请求），以此实现限流。

![x](./Resources/st045.png)

### 3. 令牌桶算法

令牌桶算法的原理：可以理解成医院的挂号看病，只有拿到号以后才可以进行诊病。

![x](./Resources/st046.png)

细节流程大致：

1. 所有的请求在处理之前都需要**拿到一个可用的令牌才会被处理**。
2. 根据限流大小，设置按照一定的速率往桶里添加令牌。
3. 设置桶最大可容纳值，当桶满时新添加的令牌就被丢弃或者拒绝。
4. 请求达到后首先要获取令牌桶中的令牌，拿着令牌才可以进行其他的业务逻辑，处理完业务逻辑之后，将令牌直接删除。
5. 令牌桶有最低限额，当桶中的令牌达到最低限额的时候，请求处理完之后将不会删除令牌，以此保证足够的限流。

工程化：

1. [自定义注解、aop、Redis + Lua](https://mp.weixin.qq.com/s?__biz=MzAxNTM4NzAyNg==&mid=2247484077&idx=1&sn=c873e011a3c921737c1b0bf24ddc6c68&scene=21#wechat_redirect) 实现限流。
2. 推荐 **guava** 的 **RateLimiter** 实现。



## 安装

官方站点：redis.io 下载最新版或者最新stable版

**windows:**

```sh
# 启动临时服务（redis.windows.conf是默认配置，可以省略。输入之后，会显示图标界面）：
redis-server.exe redis.windows.conf

# 客户端调用（启一个 cmd 窗口，原来的不要关闭）：
# 参数：
#   -a: 输入密码
#   --raw: 避免中文乱码
redis-cli.exe -h 127.0.0.1 -p 6379

# 安装服务：
redis-server.exe --service-install redis.windows.conf --service-name redisserver1 --loglevel verbose

# 启动服务：
redis-server.exe  --service-start --service-name redisserver1

# 停止服务：
redis-server.exe  --service-stop --service-name redisserver1

# 卸载服务：
redis-server.exe  --service-uninstall --service-name redisserver1
```

**Linux:**

1、下载[安装包](https://redis.io/download)

redis是C语言开发，安装redis需要先将官网下载的源码进行编译，编译依赖gcc环境。如果没有gcc环境，需要安装gcc：`yum install gcc-c++`

2、编译安装

```sh
yum -y install gcc tcl
wget http://download.redis.io/releases/redis-6.0.4.tar.gz
# wget找不到时：yum install -y wget
tar xzf redis-6.0.4.tar.gz
cd redis-6.0.4
# 编译失败！未解决
make PREFIX=/usr/local/redis/6.0.4 install
# 启动
src/redis-server
# 使用另外的窗口
src/redis-cli
redis> set foo bar
OK
redis> get foo
"bar"
# 删除
make clean
rm -rf redis-6.0.4
```

**其它配置：**

1、以后台进程的形式运行：

编辑conf配置文件，修改如下内容：`daemonize yes`

2、开启远程访问：

修改redis.conf，注释掉 `bind 127.0.0.1` 可以使所有的 ip 访问 redis；若是想指定多个 ip 访问，但并不是全部的 ip 访问，可以 bind。

在 redis3.2 之后，redis 增加了 protected-mode，在这个模式下，即使注释掉了 `bind 127.0.0.1`，再访问 redis 的时候还是报错，修改办法：`protected-mode no`

3、设置密码：

把 `#requirepass foobared` 的 # 号去掉，并把 foobared 改为自己的密码即可



## 客户端

Redis 的开源客户端众多，几乎支持所有编程语言。

**Windows：**

- RedisDesktopManager

**.NET Core：**

- StackExchange

  高性能、通用的Redis .Net客户端；方便的应用Redis全功能；支持Redis Cluster。

  ```c#
  // 高性能的核心在于多路复用器（支持在多个调用线程高效共享Redis连接)，服务器端操作使用ConnectionMultiplexer 类
  ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("server1:6379,server2:6379");
  // 日常应用的核心类库是IDatabase
  IDatabase db = redis.GetDatabase;
  // 支持Pub/Sub
  ISubscriber sub = redis.GetSubscriber;
  sub.Subscribe("messages", (channel, message) => {
    Console.WriteLine((string)message);
  });
  // ---
  sub.Publish("messages", "hello");
  ```
  
  > 如果你需要blocking pops，StackExchange.Redis官方推荐使用pub/sub模型模拟实现。
  
  日常操作的API请关注IDatabase接口，支持异步方法，这里我对【客户端操作Redis尽量不要使用异步方法】的说法不敢苟同，对于异步方法我认为还是遵守微软最佳实践：对于IO密集的操作，能使用异步尽量使用异步
  
  ```c#
  // 对应redis自增api：DECR mykey
  _redisDB0.StringDecrementAsync("ProfileUsageCap", (double)1);
  // 对应redis api：hget key field1
  _redisDB0.HashGetAsync(profileUsage, eqidPair.ProfileId));
  // 对应redis哈希自增api：HINCRBY myhash field -1
  _redisDB0.HashDecrementAsync(profileUsage, eqidPair.ProfileId, 1);  
  ```
  
  ConnectionMultiplexer 方式支持随时切换Redis DB，对于多个Redis DB的操作，我封装了一个常用的Redis DB操作客户端。

- Microsoft.Extensions.Caching.StackExchangeRedis

  从nuget doc可知，该组件库依赖于 StackExchange.Redis 客户端；是.NetCore针对分布式缓存提供的客户端，侧重点在Redis的缓存特性。

  另外能使用的函数签名也更倾向于【通用的增、查操作】

  ```c#
  // add Redis cache service
  services.AddStackExchangeRedisCache(options =>
  {
      options.Configuration = Configuration.GetConnectionString( "redis");
      options.InstanceName = "SampleInstance";
  });
  // Set Cache Item (by byte[])
  lifetime.ApplicationStarted.Register( =>
  {
      varcurrentTimeUTC = DateTime.UtcNow.ToString;
      byte[] encodedCurrentTimeUTC = Encoding.UTF8.GetBytes(currentTimeUTC);
      varoptions = newDistributedCacheEntryOptions.SetSlidingExpiration(TimeSpan.FromMinutes(20));
      cache.Set("cachedTimeUTC", encodedCurrentTimeUTC, options);
  });
  // Retrieve Cache Item
  [HttpGet]
  [Route("CacheRedis")]
  public async Task< string> GetAsync
  {
      var ret = "";
      var bytes = await_cache.GetAsync("cachedTimeUTC");
      if(bytes != null)
      {
          ret = Encoding.UTF8.GetString(bytes);
          _logger.LogInformation(ret);
      }
      return await Task.FromResult(ret);
  }
  ```

  1. 很明显，该Cache组件并不能做到自由切换 Redis DB，目前可在redis连接字符串一次性配置项目要使用哪个Redis DB
  2. 会在指定DB（默认为0）生成key = SampleInstancecachedTimeUTC 的redis缓存项
  3. Redis并不支持bytes[] 形式的存储值，以上byte[] 实际是以Hash的形式存储

- CSRedisCore

  该组件的功能更为强大，针对实际Redis应用场景有更多玩法。

  - 普通模式

  - 官方集群模式 redis cluster

  - 分区模式（作者实现）

  普通模式使用方法极其简单，这里要提示的是：该客户端也不支持 随意切换 Redis DB, 但是原作者给出一种缓解的方式：构造多客户端。
  
  ```c#
  var redisDB = new CSRedisClient[16]; // 多客户端
  for (var a = 0; a < redisDB.Length; a++)
      redisDB[a] = new CSRedisClient(Configuration.GetConnectionString("redis") + ",defualtDatabase=" + a);
  services.AddSingleton(redisDB);
  // ----------------------------
  _redisDB[0].IncrByAsync( "ProfileUsageCap", - 1)
  _redisDB[0].HGetAsync(profileUsage, eqidPair.ProfileId.ToString)
  _redisDB[0].HIncrByAsync(profileUsage, eqidPair.ProfileId.ToString, - 1);
  ```
  
  内置的静态操作类RedisHelper，与Redis-Cli命令完全一致，故他能原生支持"blocking pops"。

Redis的一点小经验：

  - 对自己要使用的Redis API 的时间复杂度心里要有数，尽量不要使用长时间运行的命令如keys *，可通过redis.io SlowLog命令观测 哪些命令耗费较长时间
  - Redis Key可按照“：”分隔定义成有业务意义的字符串，如NewUsers:201909:666666（某些Redis UI可直观友好查看该业务）
  - 合适确定Key-Value的大小：Redis对于small value更友好， 如果值很大，考虑划分到多个key
  - 关于缓存穿透，面试的时候会问，自行搜索布隆过滤器。
  - redis虽然有持久化机制，但在实际中会将key-value 持久化到关系型数据库，因为对于某些结构化查询，SQL更为有效。

总结：

以上三大客户端，Microsoft.Extensions.Caching.StackExchangeRedis 与其他两者的定位还是有很大差距的，单纯使用Redis 缓存特性， 有微软出品，必属精品情结的可使用此客户端；

StackExchange.Redis、CSRedisCore 对于Redis全功能特性支持的比较全，但是我也始终没有解决StackExchange.Redis ：RedisTimeoutException 超时的问题，换成CSRedisCore 确实没有出现Redis相关异常。

**Java：**

- Jedis
- Lettuce
- Redission



### 操作命令

Redis对于key的操作命令：

```sh
# 作用: 删除1个或多个键
# 返回值: 不存在的key忽略掉,返回真正删除的key的数量
del key1 key2 ... Keyn

# 作用: 给key赋一个新的key名
# 注:如果newkey已存在,则newkey的原值被覆盖
rename key newkey

# 作用: 把key改名为newkey
# 返回: 发生修改返回1,未发生修改返回0
# 注: nx--> not exists, 即, newkey不存在时,作改名动作
renamenx key newkey

# move key db
redis 127.0.0.1:6379[1]> select 2
OK
redis 127.0.0.1:6379[2]> keys *
(empty list or set)
redis 127.0.0.1:6379[2]> select 0
OK
redis 127.0.0.1:6379> keys *
1) "name"
2) "cc"
3) "a"
4) "b"
redis 127.0.0.1:6379> move cc 2
(integer) 1
redis 127.0.0.1:6379> select 2
OK
redis 127.0.0.1:6379[2]> keys *
1) "cc"
redis 127.0.0.1:6379[2]> get cc
"3"

注意: 一个redis进程,打开了不止一个数据库, 默认打开16个数据库,从0到15编号,如果想打开更多数据库,可以从配置文件修改

# keys pattern 查询相应的key
在redis里,允许模糊查询key
有3个通配符 *, ? ,[]
*: 通配任意多个字符
?: 通配单个字符
[]: 通配括号内的某1个字符
redis 127.0.0.1:6379> flushdb
OK
redis 127.0.0.1:6379> keys *
(empty list or set)
redis 127.0.0.1:6379> mset one 1 two 2 three 3 four 4
OK
redis 127.0.0.1:6379> keys o*
1) "one"
redis 127.0.0.1:6379> key *o
(error) ERR unknown command 'key'
redis 127.0.0.1:6379> keys *o
1) "two"
redis 127.0.0.1:6379> keys ???
1) "one"
2) "two"
redis 127.0.0.1:6379> keys on?
1) "one"
redis 127.0.0.1:6379> set ons yes
OK
redis 127.0.0.1:6379> keys on[eaw]
1)"one"

randomkey 返回随机key

# 判断key是否存在,返回1/0
exists key

# 返回key存储的值的类型，有string,link,set,order set, hash
type key

# 作用: 查询key的生命周期
# 返回: 秒数
# 注:对于不存在的key或已过期的key/不过期的key,都返回-1。Redis2.8中,对于不存在的key,返回-2
ttl key 

# 作用: 设置key的生命周期,以秒为单位
# 同理: pexpire key 毫秒数, 设置生命周期   pttl key, 以毫秒返回生命周期
expire key 整型值

# 作用: 把指定key置为永久有效
persist key
```

Redis字符串类型的操作：

```sh
# 如: set a 1 ex 10 , 10秒有效
# Set a 1 px 9000  , 9秒有效
# 注: 如果ex,px同时写,以后面的有效期为准
# 如 set a 1 ex 100 px 9000, 实际有效期是9000毫秒
# nx: 表示key不存在时,执行操作
# xx: 表示key存在时,执行操作
set key value [ex 秒数] / [px 毫秒数]  [nx] /[xx]

# 例: mset key1 v1 key2 v2 ....
mset  multi set , 一次性设置多个键值

# 作用:获取key的值
get key

# 作用:获取多个key的值
mget key1 key2 ..keyn

# 作用:把字符串的offset偏移字节,改成value
setrange key offset value

redis 127.0.0.1:6379> set greet hello
OK
redis 127.0.0.1:6379> setrange greet 2 x
(integer) 5
redis 127.0.0.1:6379> get greet
"hexlo"

注意: 如果偏移量>字符长度, 该字符自动补0x00

redis 127.0.0.1:6379> setrange greet 6 !
(integer) 7
redis 127.0.0.1:6379> get greet
"heyyo\x00!"

# 作用: 把value追加到key的原值上
append key value

# 作用: 是获取字符串中 [start, stop]范围的值
# 注意: 对于字符串的下标,左数从0开始,右数从-1开始
getrange key start stop

redis 127.0.0.1:6379> set title 'chinese'
OK
redis 127.0.0.1:6379> getrange title 0 3
"chin"
redis 127.0.0.1:6379> getrange title 1 -2
"hines"

注意: 
1: start>=length, 则返回空字符串
2: stop>=length,则截取至字符结尾
3: 如果start 所处位置在stop右边, 返回空字符串

# 作用: 获取并返回旧值,设置新值
getset key newvalue

redis 127.0.0.1:6379> set cnt 0
OK
redis 127.0.0.1:6379> getset cnt 1
"0"
redis 127.0.0.1:6379> getset cnt 2
"1"

# 作用: 指定的key的值加1,并返回加1后的值
incr key
# 注意:
# 1:不存在的key当成0,再incr操作
# 2: 范围为64有符号

# incrby key number
redis 127.0.0.1:6379> incrby age  90
(integer) 92

# incrbyfloat key floatnumber
redis 127.0.0.1:6379> incrbyfloat age 3.5
"95.5"

# decr key
redis 127.0.0.1:6379> set age 20
OK
redis 127.0.0.1:6379> decr age
(integer) 19

# decrby key number
redis 127.0.0.1:6379> decrby age 3
(integer) 16

getbit key offset
作用:获取值的二进制表示,对应位上的值(从左,从0编号)
redis 127.0.0.1:6379> set char A
OK
redis 127.0.0.1:6379> getbit char 1
(integer) 1
redis 127.0.0.1:6379> getbit char 2
(integer) 0
redis 127.0.0.1:6379> getbit char 7
(integer) 1


setbit  key offset value
设置offset对应二进制位上的值
返回: 该位上的旧值

注意: 
1:如果offset过大,则会在中间填充0,
2: offset最大大到多少
3:offset最大2^32-1,可推出最大的的字符串为512M


bitop operation destkey key1 [key2 ...]

对key1,key2..keyN作operation,并将结果保存到 destkey 上。
operation 可以是 AND 、 OR 、 NOT 、 XOR

redis 127.0.0.1:6379> setbit lower 7 0
(integer) 0
redis 127.0.0.1:6379> setbit lower 2 1
(integer) 0
redis 127.0.0.1:6379> get lower
" "
redis 127.0.0.1:6379> set char Q
OK
redis 127.0.0.1:6379> get char
"Q"
redis 127.0.0.1:6379> bitop or char char lower
(integer) 1
redis 127.0.0.1:6379> get char
"q"

注意: 对于NOT操作, key不能多个
```

link 链表结构：

```sh
lpush key value 
作用: 把值插入到链接头部

rpop key
作用: 返回并删除链表尾元素

rpush,lpop: 不解释

lrange key start  stop
作用: 返回链表中[start ,stop]中的元素
规律: 左数从0开始,右数从-1开始


lrem key count value
作用: 从key链表中删除 value值
注: 删除count的绝对值个value后结束
Count>0 从表头删除
Count<0 从表尾删除

ltrim key start stop
作用: 剪切key对应的链接,切[start,stop]一段,并把该段重新赋给key

lindex key index
作用: 返回index索引上的值,
如  lindex key 2

llen key
作用:计算链接表的元素个数
redis 127.0.0.1:6379> llen task
(integer) 3
redis 127.0.0.1:6379> 

linsert  key after|before search value
作用: 在key链表中寻找’search’,并在search值之前|之后,.插入value
注: 一旦找到一个search后,命令就结束了,因此不会插入多个value


rpoplpush source dest
作用: 把source的尾部拿出,放在dest的头部,
并返回 该单元值

场景: task + bak 双链表完成安全队列
Task列表                             bak列表
		
		


业务逻辑:
1:Rpoplpush task bak
2:接收返回值,并做业务处理
3:如果成功,rpop bak 清除任务. 如不成功,下次从bak表里取任务


brpop ,blpop  key timeout
作用:等待弹出key的尾/头元素, 
Timeout为等待超时时间
如果timeout为0,则一直等待

场景: 长轮询Ajax,在线聊天时,能够用到

Setbit 的实际应用

场景: 1亿个用户, 每个用户 登陆/做任意操作  ,记为 今天活跃,否则记为不活跃

每周评出: 有奖活跃用户: 连续7天活动
每月评,等等...

思路: 

Userid   dt  active
1        2013-07-27  1
1       2013-0726   1

如果是放在表中, 1:表急剧增大,2:要用group ,sum运算,计算较慢


用: 位图法 bit-map
Log0721:  ‘011001...............0’

......
log0726 :   ‘011001...............0’
Log0727 :  ‘0110000.............1’


1: 记录用户登陆:
每天按日期生成一个位图, 用户登陆后,把user_id位上的bit值置为1

2: 把1周的位图  and 计算, 
位上为1的,即是连续登陆的用户


redis 127.0.0.1:6379> setbit mon 100000000 0
(integer) 0
redis 127.0.0.1:6379> setbit mon 3 1
(integer) 0
redis 127.0.0.1:6379> setbit mon 5 1
(integer) 0
redis 127.0.0.1:6379> setbit mon 7 1
(integer) 0
redis 127.0.0.1:6379> setbit thur 100000000 0
(integer) 0
redis 127.0.0.1:6379> setbit thur 3 1
(integer) 0
redis 127.0.0.1:6379> setbit thur 5 1
(integer) 0
redis 127.0.0.1:6379> setbit thur 8 1
(integer) 0
redis 127.0.0.1:6379> setbit wen 100000000 0
(integer) 0
redis 127.0.0.1:6379> setbit wen 3 1
(integer) 0
redis 127.0.0.1:6379> setbit wen 4 1
(integer) 0
redis 127.0.0.1:6379> setbit wen 6 1
(integer) 0
redis 127.0.0.1:6379> bitop and  res mon feb wen
(integer) 12500001


如上例,优点:
1: 节约空间, 1亿人每天的登陆情况,用1亿bit,约1200WByte,约10M 的字符就能表示
2: 计算方便
```

集合 set 相关命令：

```sh
集合的性质: 唯一性,无序性,确定性

注: 在string和link的命令中,可以通过range 来访问string中的某几个字符或某几个元素
但,因为集合的无序性,无法通过下标或范围来访问部分元素.

因此想看元素,要么随机先一个,要么全选

sadd key  value1 value2
作用: 往集合key中增加元素

srem value1 value2
作用: 删除集合中集为 value1 value2的元素
返回值: 忽略不存在的元素后,真正删除掉的元素的个数

spop key
作用: 返回并删除集合中key中1个随机元素

随机--体现了无序性

srandmember key
作用: 返回集合key中,随机的1个元素.

sismember key  value
作用: 判断value是否在key集合中
是返回1,否返回0

smembers key
作用: 返回集中中所有的元素

scard key
作用: 返回集合中元素的个数

smove source dest value
作用:把source中的value删除,并添加到dest集合中



sinter  key1 key2 key3
作用: 求出key1 key2 key3 三个集合中的交集,并返回
redis 127.0.0.1:6379> sadd s1 0 2 4 6
(integer) 4
redis 127.0.0.1:6379> sadd s2 1 2 3 4
(integer) 4
redis 127.0.0.1:6379> sadd s3 4 8 9 12
(integer) 4
redis 127.0.0.1:6379> sinter s1 s2 s3
1) "4"
redis 127.0.0.1:6379> sinter s3 s1 s2
1)"4"

sinterstore dest key1 key2 key3
作用: 求出key1 key2 key3 三个集合中的交集,并赋给dest


suion key1 key2.. Keyn
作用: 求出key1 key2 keyn的并集,并返回

sdiff key1 key2 key3 
作用: 求出key1与key2 key3的差集
即key1-key2-key3 
```

order set 有序集合：

```sh
zadd key score1 value1 score2 value2 ..
添加元素
redis 127.0.0.1:6379> zadd stu 18 lily 19 hmm 20 lilei 21 lilei
(integer) 3

zrem key value1 value2 ..
作用: 删除集合中的元素

zremrangebyscore key min max
作用: 按照socre来删除元素,删除score在[min,max]之间的
redis 127.0.0.1:6379> zremrangebyscore stu 4 10
(integer) 2
redis 127.0.0.1:6379> zrange stu 0 -1
1) "f"

zremrangebyrank key start end
作用: 按排名删除元素,删除名次在[start,end]之间的
redis 127.0.0.1:6379> zremrangebyrank stu 0 1
(integer) 2
redis 127.0.0.1:6379> zrange stu 0 -1
1) "c"
2) "e"
3) "f"
4) "g"

zrank key member
查询member的排名(升续 0名开始)

zrevrank key memeber
查询 member的排名(降续 0名开始)

ZRANGE key start stop [WITHSCORES]
把集合排序后,返回名次[start,stop]的元素
默认是升续排列 
Withscores 是把score也打印出来

zrevrange key start stop
作用:把集合降序排列,取名字[start,stop]之间的元素

zrangebyscore  key min max [withscores] limit offset N
作用: 集合(升续)排序后,取score在[min,max]内的元素,
并跳过 offset个, 取出N个
redis 127.0.0.1:6379> zadd stu 1 a 3 b 4 c 9 e 12 f 15 g
(integer) 6
redis 127.0.0.1:6379> zrangebyscore stu 3 12 limit 1 2 withscores
1) "c"
2) "4"
3) "e"
4) "9"


zcard key
返回元素个数

zcount key min max
返回[min,max] 区间内元素的数量


zinterstore destination numkeys key1 [key2 ...] 
[WEIGHTS weight [weight ...]] 
[AGGREGATE SUM|MIN|MAX]
求key1,key2的交集,key1,key2的权重分别是 weight1,weight2
聚合方法用: sum |min|max
聚合的结果,保存在dest集合内

注意: weights ,aggregate如何理解?
答: 如果有交集, 交集元素又有socre,score怎么处理?
 Aggregate sum->score相加   , min 求最小score, max 最大score

另: 可以通过weigth设置不同key的权重, 交集时,socre * weights

详见下例
redis 127.0.0.1:6379> zadd z1 2 a 3 b 4 c
(integer) 3
redis 127.0.0.1:6379> zadd z2 2.5 a 1 b 8 d
(integer) 3
redis 127.0.0.1:6379> zinterstore tmp 2 z1 z2
(integer) 2
redis 127.0.0.1:6379> zrange tmp 0 -1
1) "b"
2) "a"
redis 127.0.0.1:6379> zrange tmp 0 -1 withscores
1) "b"
2) "4"
3) "a"
4) "4.5"
redis 127.0.0.1:6379> zinterstore tmp 2 z1 z2 aggregate sum
(integer) 2
redis 127.0.0.1:6379> zrange tmp 0 -1 withscores
1) "b"
2) "4"
3) "a"
4) "4.5"
redis 127.0.0.1:6379> zinterstore tmp 2 z1 z2 aggregate min
(integer) 2
redis 127.0.0.1:6379> zrange tmp 0 -1 withscores
1) "b"
2) "1"
3) "a"
4) "2"
redis 127.0.0.1:6379> zinterstore tmp 2 z1 z2 weights 1 2
(integer) 2
redis 127.0.0.1:6379> zrange tmp 0 -1 withscores
1) "b"
2) "5"
3) "a"
4) "7"
```

Hash 哈希数据类型相关命令：

```sh
hset key field value
作用: 把key中 filed域的值设为value
注:如果没有field域,直接添加,如果有,则覆盖原field域的值

hmset key field1 value1 [field2 value2 field3 value3 ......fieldn valuen]
作用: 设置field1->N 个域, 对应的值是value1->N
(对应PHP理解为  $key = array(file1=>value1, field2=>value2 ....fieldN=>valueN))


hget key field
作用: 返回key中field域的值

hmget key field1 field2 fieldN
作用: 返回key中field1 field2 fieldN域的值

hgetall key
作用:返回key中,所有域与其值

hdel key field
作用: 删除key中 field域

hlen key
作用: 返回key中元素的数量

hexists key field
作用: 判断key中有没有field域

hinrby key field value
作用: 是把key中的field域的值增长整型值value

hinrby float  key field value
作用: 是把key中的field域的值增长浮点值value

hkeys key
作用: 返回key中所有的field

kvals key
作用: 返回key中所有的value
```



### 内存管理

Redis 使用 C 语言编写，但为了提高内存的管理效率，并没有直接使用 `malloc/free` 函数，Redis 默认选择 `jemalloc` 作为内存分配器，以减小内存碎片率。

`jemalloc` 在64位系统中，将内存空间划分为小、大、巨大三个范围。每个范围内又划分了许多小的内存块单位。当 Redis 存储数据时，会选择大小最合适的内存块进行存储。同时，Redis 为 Key-Value 存储定制了两种对象，其中 Key 采用 SDS（Simple Dynamic String)，Value 采用 redisObject，为内部编码和回收内存的高效实现奠定了基础。

Redis 的内存模型比较复杂，内容也较多，感兴趣的读者可以查阅[《深入了解 Redis 的内存模型》](https://www.cnblogs.com/qwangxiao/p/8921171.html)做更深了解。

在 Redis 中，并不是所有数据都一直存储在内存中，可以将一些很久没用的 value 交换到磁盘，而 Memcached 的数据则会一直在内存中。



### 集群部署

集群搭建需要的环境：

- Redis集群至少需要3个节点，因为投票容错机制要求超过半数节点认为某个节点挂了该节点才是挂了，所以2个节点无法构成集群
- 要保证集群的高可用，需要每个节点都有从节点，也就是备份节点，所以Redis集群至少需要6台服务器

**Windows:**

[参考](https://blog.csdn.net/A_Runner/article/details/105013679)

***ruby***，TIOBE年度编程语言。Ruby on Rails (RoR)：严格按照MVC结构开发，设计原则：“不要重复自己(Don't repeat Yourself)”和“约定胜于配置(Convention Over Configuration)”。开发工具：SciTE、RadRails

ruby命令执行代码：

- c 检查代码正确性，不执行程序
- w 警告模式
- l 行模式
- e 运行引号中代码

安装：

下载地址：[https://rubyinstaller.org/downloads/](https://rubyinstaller.org/downloads/)

```sh
# 查看版本
ruby -v
# 对Ruby进行配置
gem install redis
```

将 redis.windows.conf 改名为 redis.conf，修改如下配置：

```ini
#设置端口号，可以依次递增
port 7000

appendonly yes

cluster-enabled yes
#这个7000可以根据每个端口设定
cluster-config-file nodes-7000.conf
cluster-node-timeout 15000
```

创建批量启动脚本(Windows)：

```sh
cd Redis7000
start redis-server.exe redis.conf
cd ..
cd Redis7001
start redis-server.exe redis.conf
cd ..
cd Redis7002
start redis-server.exe redis.conf
cd ..
cd Redis7003
start redis-server.exe redis.conf
cd ..
cd Redis7004
start redis-server.exe redis.conf
cd ..
cd Redis7005
start redis-server.exe redis.conf
cd ..
```

在Redis集群目录下写入Ruby脚本：redis-trib.rb，链接：[百度网盘](https://pan.baidu.com/s/1tR0wC3xrGqY7SLQoEj8NvA)，提取码：12zw

启动所有Redis，使用上面的批量启动脚本。所有的Redis启动之后，输入：

```sh
ruby redis-trib.rb create --replicas 1 127.0.0.1:7000 127.0.0.1:7001 127.0.0.1:7002 127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005  

...
Can I set the above configuration? (type 'yes' to accept): 请确定并输入 yes
...
```

OK，到此，Redis集群就搭建成功了。

**Linux:**

（[参考](https://blog.csdn.net/huyunqiang111/article/details/95025807)）

```sh
# 在usr/local目录下新建redis-cluster目录，用于存放集群节点
mkdir redis-cluster
# 查看
ll
# 把redis目录下的bin目录下的所有文件复制到/usr/local/redis-cluster/redis01目录下，不用担心这里没有redis01目录，会自动创建
cp -r redis/bin/ redis-cluster/redis01
# 删除redis01目录下的快照文件dump.rdb，并且修改该目录下的redis.cnf文件，具体修改两处地方：一是端口号修改为7001，二是开启集群创建模式，打开注释即可。
# port 7001
# cluster-enabled yes
rm -rf dump.rdb
# 将redis-cluster/redis01文件复制5份到redis-cluster目录下（redis02-redis06），创建6个redis实例，模拟Redis集群的6个节点。然后将其余5个文件下的redis.conf里面的端口号分别修改为7002-7006
# 接着启动所有redis节点，由于一个一个启动太麻烦了，所以在这里创建一个批量启动redis节点的脚本文件
# 创建好启动脚本文件之后，需要修改该脚本的权限，使之能够执行
chmod +x start-all.sh
# 执行start-all.sh脚本，启动6个redis节点
# 至此6个redis节点启动成功，接下来正式开启搭建集群，以上都是准备条件。
```

批量启动脚本(Linux)：

```sh
cd Redis7000
./redis-server redis.conf
cd ..
cd Redis7001
./redis-server redis.conf
cd ..
cd Redis7002
./redis-server redis.conf
cd ..
cd Redis7003
./redis-server redis.conf
cd ..
cd Redis7004
./redis-server redis.conf
cd ..
cd Redis7005
./redis-server redis.conf
cd ..
```

搭建集群：

要搭建集群的话，需要使用一个工具（脚本文件），这个工具在redis解压文件的源代码里。因为这个工具是一个ruby脚本文件，所以这个工具的运行需要ruby的运行环境，就相当于java语言的运行需要在jvm上。所以需要安装ruby，指令如下：

```sh
yum install ruby
# 然后需要把ruby相关的包安装到服务器，需要注意的是：redis的版本和ruby包的版本最好保持一致。安装命令如下：
gem install redis-3.0.0.gem
# 上一步中已经把ruby工具所需要的运行环境和ruby包安装好了，接下来需要把这个ruby脚本工具复制到usr/local/redis-cluster目录下。那么这个ruby脚本工具在哪里呢？之前提到过，在redis解压文件的源代码里，即redis/src目录下的redis-trib.rb文件
cd redis/src
# 将该ruby工具（redis-trib.rb）复制到redis-cluster目录下
cp redis-trib.rb /usr/local/redis-cluster
# 然后使用该脚本文件搭建集群，中途有个地方需要手动输入yes即可
./redis-trib.rb create --replicas 1 47.106.219.251:7001 47.106.219.251:7002 47.106.219.251:7003 47.106.219.251:7004 47.106.219.251:7005 47.106.219.251:7006
# 至此，Redis集群搭建成功！大家注意最后一段文字，显示了每个节点所分配的slots（哈希槽），这里总共6个节点，其中3个是从节点，所以3个主节点分别映射了0-5460、5461-10922、10933-16383 solts。
# 最后连接集群节点，连接任意一个即可：
redis01/redis-cli -p 7001 -c
# 注意：一定要加上-c，不然节点之间是无法自动跳转的！现在，存储的数据（key-value）是均匀分配到不同的节点的
```

常用命令：

```sh
# 先在客户端连接第一台redis服务器（假设端口7000）
redis-cli -c -p 7000
# 查看当前集群信息
cluster info
# 进入redis命令行窗口后，查看当前集群
CLUSTER NODES
# 握手命令，将7001加入当前集群
CLUSTER MEET 127.0.0.1 7001
```

打开另一个终端窗口，启动redis客户端：

```sh
redis-cli -c -p 7000
```

在redis客户端中尝试进行操作:

```sh
127.0.0.1:7000> set a 1
-> Redirected to slot [15495] located at 127.0.0.1:7002
OK
127.0.0.1:7002> get a
"1"
127.0.0.1:7002> mset ab 2 ac 3
(error) CROSSSLOT Keys in request don't hash to the same slot
127.0.0.1:7002> mset {a}b 2 {a}c 3
OK
```

上述示例中，执行 `set a` 命令时客户端被重定向到了其它节点。

`mset ab 2 ac 3` 命令因为 key 被分配到不同的 slot 中导致 CROSSSLOT 错误，而使用 HashTag 机制 `mset {a}b 2 {a}c 3` 就可以解决这个问题。

更多的内容可以参考[Redis Cluster中文文档](http://www.redis.cn/topics/cluster-tutorial.html)。

#### ShardedJedis

Jedis是一个流行的Java语言Redis客户端，在Redis官方提供Redis Cluster之前便实现了客户端集群功能。

ShardedJedis使用一致性哈希算法进行数据分片，不支持涉及多个key的命令， 其不支持的命令可以参考[MultiKeyCommands](https://github.com/xetorthio/jedis/blob/master/src/main/java/redis/clients/jedis/commands/MultiKeyCommands.java)。

```java
JedisPoolConfig poolConfig = new JedisPoolConfig();
poolConfig.setMaxTotal(2);
poolConfig.setMaxIdle(1);
poolConfig.setMaxWaitMillis(2000);

final String HOST = "127.0.0.1";
JedisShardInfo shardInfo1 = new JedisShardInfo(HOST, 6379);
JedisShardInfo shardInfo2 = new JedisShardInfo(HOST, 6380);
JedisShardInfo shardInfo3 = new JedisShardInfo(HOST, 6381);

ShardedJedisPool jedisPool = new ShardedJedisPool(poolConfig, Arrays.asList(shardInfo1, shardInfo2, shardInfo3));

try(ShardedJedis jedis = jedisPool.getResource()) {
    jedis.set("a", "1");
    jedis.set("b", "2");
    System.out.println(jedis.get("a"));
}
```

在初始化ShardedJedisPool时设置keyTagPattern，匹配keyTagPattern的key会被分配到同一个实例中。

#### Codis

Codis是豌豆荚开源的代理式Redis集群解决方案，因为Twemproxy缺乏对弹性伸缩的支持，很多企业选择了经过生产环境检验的Codis。

Codis的安装和使用方法可以参考[官方文档](https://github.com/CodisLabs/codis/blob/release3.2/doc/tutorial_zh.md)，为了方便起见我们使用ReleaseBinary文件安装Codis-Server和Codis-Proxy。

或者使用第三方开发者制作的Docker镜像：

```sh
docker run -d --name="codis" -h "codis" -p 18087:18087 -p 11000:11000 -p 19000:19000 ruo91/codis
docker exec codis /bin/bash codis-start all start
```

使用redis客户端连接19000端口，尝试进行操作：

```sh
127.0.0.1:19000> set a  1
OK
127.0.0.1:19000> get a
"1"
127.0.0.1:19000> mset ab 2 ac 3
OK
127.0.0.1:19000> mset {a}b 2 {a}c 3
OK
```

Codis也支持HashTag，不过Codis已经解决了大多数命令的slot限制。



## 事务管理

- 一个事务包含了多个命令，服务器在执行事务期间，不会改去执行其它客户端的命令请求。
- 事务中的多个命令被一次性发送给服务器，而不是一条一条发送，这种方式被称为流水线，它可以减少客户端与服务器之间的网络通信次数从而提升性能。
- Redis 最简单的事务实现方式是使用 MULTI 和 EXEC 命令将事务操作包围起来。

## 事件驱动

Redis 服务器是一个事件驱动程序。

文件事件

- 服务器通过套接字与客户端或者其它服务器进行通信，文件事件就是套接字操作的抽象。
- Redis 基于 Reactor 模式开发了自己的网络事件处理器，使用 I/O 多路复用程序来同时监听多个套接字，并将到达的事件传送给文件事件分派器，分派器会根据套接字产生的事件类型调用相应的事件处理器。

![x](./Resource/18.png)

时间事件

- 服务器有一些操作需要在给定的时间点执行，时间事件是对这类定时操作的抽象。
- 时间事件又分为：
- 定时事件：是让一段程序在指定的时间之内执行一次；
- 周期性事件：是让一段程序每隔指定时间就执行一次。
- Redis 将所有时间事件都放在一个无序链表中，通过遍历整个链表查找出已到达的时间事件，并调用相应的事件处理器。

调度与执行

服务器需要不断监听文件事件的套接字才能得到待处理的文件事件，但是不能一直监听，否则时间事件无法在规定的时间内执行，因此监听时间应该根据距离现在最近的时间事件来决定。

事件调度与执行由 aeProcessEvents 函数负责，伪代码如下：

```C
def aeProcessEvents():

    # 获取到达时间离当前时间最接近的时间事件
    time_event = aeSearchNearestTimer()

    # 计算最接近的时间事件距离到达还有多少毫秒
    remaind_ms = time_event.when - unix_ts_now()

    # 如果事件已到达，那么 remaind_ms 的值可能为负数，将它设为 0
    if remaind_ms < 0:
        remaind_ms = 0

    # 根据 remaind_ms 的值，创建 timeval
    timeval = create_timeval_with_ms(remaind_ms)

    # 阻塞并等待文件事件产生，最大阻塞时间由传入的 timeval 决定
    aeApiPoll(timeval)

    # 处理所有已产生的文件事件
    procesFileEvents()

    # 处理所有已到达的时间事件
    processTimeEvents()
```

将 aeProcessEvents 函数置于一个循环里面，加上初始化和清理函数，就构成了 Redis 服务器的主函数，伪代码如下：

```C
def main():

    # 初始化服务器
    init_server()

    # 一直处理事件，直到服务器关闭为止
    while server_is_not_shutdown():
        aeProcessEvents()

    # 服务器关闭，执行清理操作
    clean_server()
```

流程图：

![x](./Resource/19.png)

## 缓存设计

使用缓存可以加速读写、降低后端数据库负载和提高并发度，但会提高代码维护成本和运维成本，使用不当可能会导致数据不一致、雪崩、穿透、并发竞争问题。

更新策略

- LRU/ LFU/ FIFO 算法自动清除：一致性最差，维护成本低；
- 超时自动清除（key expire）：一致性较差，维护成本低；
- 主动更新：代码层面控制生命周期，一致性最好，维护成本高。
使用策略：
- 如果对数据一致性要求较高：可结合超时策略和主动更新策略，最大内存和淘汰算法兜底；
- 如果对数据一致性要求不高，考虑最大内存和淘汰算法即可。

缓存粒度

![x](./Resource/20.png)

控制缓存粒度的考量：

- 通用性：全量属性更好；
- 占用空间：部分属性更好；
- 代码维护

缓存穿透

当大量的请求无命中缓存、直接请求到后端数据库（业务代码的bug或恶意攻击），同时后端数据库也没有查询到相应的记录、无法添加缓存。

这种状态会一直维持，流量一直打到存储层上，无法利用缓存、还会给存储层带来巨大压力。解决方法：

- 请求无法命中缓存、同时数据库记录为空时在缓存添加该 key 的空对象（设置过期时间），缺点是可能会在缓存中添加大量的空值键（比如遭到恶意攻击或爬虫），而且缓存层和存储层数据短期内不一致；
- 使用布隆过滤器在缓存层前拦截非法请求、自动为空值添加黑名单（同时可能要为误判的记录添加白名单）。但需要考虑布隆过滤器的维护（离线生成/ 实时生成）。

缓存雪崩

缓存崩溃时请求会直接落到数据库上，很可能由于无法承受大量的并发请求而崩溃，此时如果只重启数据库，或因为缓存重启后没有数据，新的流量进来很快又会把数据库击倒。
建议采用以下方法解决：

- 事前：redis 高可用，主从 + 哨兵，redis cluster，避免全盘崩溃。
- 事中：本地 ehcache 缓存 + hystrix 限流 & 降级，避免数据库承受太多压力。
- 事后：redis 持久化，一旦重启，自动从磁盘上加载数据，快速恢复缓存数据。

请求过程：

- 用户请求先访问本地缓存，无命中后再访问 Redis，如果本地缓存和 Redis 都没有再查数据库，并把数据添加到本地缓存和 Redis；
- 由于设置了限流，一段时间范围内超出的请求走降级处理（返回默认值，或给出友情提示）。

优点：确保数据库不会崩溃（多级缓存 + 限流降级），至少保证一部分请求能被处理；

缺点：较高的维护成本。

缓存击穿

热点数据即请求的访问量非常大的数据，存在重建问题和被击穿的风险：

1. 当频繁修改、甚至修改操作都很慢时，“获取缓存-查询数据源-重建缓存-输出”的过程可能会被多个线程参与、频繁执行，可能对数据库压力非常大。

2. 热点数据被正常访问，但在失效的瞬间，大量请求会击穿缓存、直接访问数据库。
需要在尽可能保证数据一致的前提下，减少重建缓存的次数，同时还要尽量减少潜在风险（死锁等），解决方法是：

方案|描述|优点|缺点
-|-|-|-
互斥锁|查询数据、重建缓存时加锁，不允许其他线程同时修改（等待）|思路简单、保证一致性|代发复杂度增加、存在思索风险（锁也加上时间）
永不过期|缓存层面上不设置过期时间，而在功能层面上，为每个 value 设置逻辑过期时间，发现超过该事件后使用单独的线程构建缓存|基本杜绝热点 key 重建问题|不保证一致性、逻辑过期时间增加了维护成本和内存成本

更合理的方法是做限流处理，通过熔断或降级手段避免当缓存失效时涌入的大量并发请求直接访问后端数据库。

无底洞问题

扩展节点后，可能由于一次批量操作的请求需要从多个节点获取 key 值，出现性能不升反降的情况（节点间网络 IO 带来的开销），解决方法：

- 执行命令优化：检查慢查询 keys、hgetall bigkey；
- 减少网络通信次数（因数据库而异）；
- 降低接入成本：客户端使用长连接/连接池，NIO 等。

批量访问方法：

方案|描述|优点|缺点|网络 IO
-|-|-|-|-
串行 mget|一次请求包括多个 key，每个 key 一次 IO|代码简单，少量 keys 可满足需求|大量 keys 请求延迟严重|O(keys)
串行 IO|一次请求包括多个 key，先对 key 进行组装（nodeId_key），再进行 IO|代码简单，少量节点可满足需求|大量 node 请求延迟验证|O(nodes)
并行 IO|与串行 IO 类似，但利用并行方法访问 Redis|利用并行特性，延迟取决于最慢的节点|代码复杂，超时问题定位难|O(slowless_node))
hash_tag|key 先经过 hash 函数转换，再用转换后的 key 进行一次 IO|性能最高|读写增加 tag 维护成本，tag 分布容易出现数据倾斜|O(1)

更新一致性

Cache Aside Pattern：采用懒计算的思想，用时更新

- 读请求：先读缓存，缓存没有的话，就读数据库，然后取出数据后放入缓存，同时返回响应；
- 写请求：先删除缓存，然后再更新数据库（避免大量地写、却又不经常读的数据导致缓存频繁更新）。

缓存不一致问题：如果先更新数据库，再删除缓存，假设更新数据库成功、删除缓存失败，则导致数据库与缓存数据不一致。所以应该先删除缓存再更新数据库。

而对于更复杂的场景，可参考：[如何保证缓存与数据库的双写一致性](https://github.com/doocs/advanced-java/blob/master/docs/high-concurrency/redis-consistence.md)？

## 慢查询

客户端请求 Redis 的生命周期：

![x](./Resource/21.png)

- 其中慢查询只会发送在执行命令阶段，客户端超时不一定发送慢查询，但却是其中一个可能。

慢查询队列：满足条件的命令会进入慢查询队列，这是一个先入先出、固定长度的队列，数据保存在内存中：

![x](./Resource/22.png)

配置参数：

- slowlog-log-slower-than：时间阈值（默认10ms，建议设置1ms）；
- slowlog-max-len：慢查询队列长度（通常设置1000左右）。
- ......

常用命令：

- slowlog get [n]    // 获取慢查询队列
- slowlog len    // 获取慢查询队列长度
- slowlog reset    // 清空慢查询队列

## 流水线

- 传统通信方式是“请求 - 响应”方式，1次时间 = 1次网络时间 + 1次命令时间，其中网络时间占绝大部分。
- 流水线工作模式是把一批命令打包、发送到服务端执行，并按顺序返回结果，因此只会消耗一次网络时间。对于有大量命令执行的场景，可以通过流水线节省网络开销。

其中需要注意：

- 每次 Pipeline 携带的数据量不能太多（提交的数量）；
- Pipeline 每次只能作用在一个 Redis 节点上；
- 区别于 M 操作：M 操作是一批 Key-Value 的原子操作，而 Piepline 操作是拆分成子命令、在队列中顺序执行的非原子操作。

数据直接插入 Redis：

```java
Jedis jedis = new Jedis("localhost", 6379);
for (int i = 0; i < 10000; i++) {
    jedis.hset("hashkey:" + i, "fidle" + i, "value" + i);
}
```

使用 Pipeline 插入（非原子操作）：

```java
Jedis jedis = new Jedis("localhost", 6379);
for (int i = 0; i < 100; i++) {
    Pipeline pipeline = jedis.pipelined();
    for (int j = i * 100; i < (i + 1) * 100; j++) {
        jedis.hset("hashkey:" + j, "fidle" + j, "value" + j);
    }
    pipeline.syncAndReturnAll();
}
```

## 发布-订阅

核心的角色有生产者、消费者、频道：

- 发布者在 Redis Server 的频道发布一条消息，订阅该频道的所有消费者（阻塞）都会收到这条消息（没有抢占机制）；
- 消费者可以订阅多个频道，但新订阅的消费者不能收到频道中订阅前的消息。
位图

![x](./Resource/23.png)

位图(Bitmap)即一个只包含0、1的数组，用于把字符串的 ASCII 码以二进制的形式存放（最大 512MB），因此既可以对完整的 Key 操作，也可以对每一位操作：

```sh
set hello world
getbit hello
setbit hello 5 1
bitcount key 0 5
bitop xor hello world
bitpos hello
```

实例：利用 bitmap 进行独立用户统计（uid 使用整型）

1亿用户，5000万独立，此时 bitmap 更占优：

- 使用 set：每个 uid 占用32位，需要存储数据 50,000,000，总占用内存约 200MB。
- 使用 bitmap：每个 uid 占用1位，需要存储数据 100,000,000，总占用内存约 12.5MB。

1亿用户，10万独立，此时 set 更占优：

- 使用 set：每个 uid 占用32位，需要存储数据 100,000，总占用内存约 4MB。
- 使用 bitmap：每个 uid 占用1位，需要存储数据 100,000,000，总占用内存约 12.5MB。

## HyperLogLog

- HyperLogLog 是以极小的空间实现完成独立数量统计的算法，本质是字符串；
- 有一定错误率：0.81%，且无法取出单条数据。

提供了以下 API：

```C
pfadd key value    // 向 hyperloglog 添加元素
pfcount key    // 计算 hyperloglog 的独立总数
pfmerge destkey sourcekey    // 把 key 合并
```

统计独立用户数：

```C
elements=""
key="2016_05_01:unique:ids"
for i in `seq 1 1000000`
do
    elements="${elements} uuid-"${i}
    if [[ $((i%1000)) == 0 ]]
    then
        redis-cli pfadd ${key} ${elements}
        elements=""
    fi
done
```

## GEO

Redis 3.2 后提供计算地理位置信息的 API。

## 使用场景

- 数据缓存
- 热点数据
  
  - 将热点数据放到内存中，设置内存的最大使用量以及淘汰策略来保证缓存的命中率。
- 会话维持

  可以使用 Redis 来统一存储多台应用服务器的会话信息。

  当应用服务器不再存储用户的会话信息，也就不再具有状态，一个用户可以请求任意一个应用服务器，从而更容易实现高可用性以及可伸缩性。



## 消息队列

List 是一个双向链表，可以通过 lpush 和 rpop 写入和读取消息。

不过最好使用 Kafka、RabbitMQ 等消息中间件。

计数器

可以对 String 进行自增自减运算，从而实现计数器功能。

Redis 这种内存型数据库的读写性能非常高，很适合存储频繁读写的计数量。

其它

Set 可以实现交集、并集等操作，从而实现共同好友等功能。

ZSet 可以实现有序性操作，从而实现排行榜等功能。



## 常见知识点

1. 字符串模糊查询时用`Keys`可能导致线程阻塞，尽量用`scan`指令进行无阻塞的取出数据然后去重下即可。

2. 多个操作的情况下记得用`pipeLine`把所有的命令一次发过去，避免频繁的发送、接收带来的网络开销，提升性能。

3. bigkeys可以扫描redis中的大key，底层是使用scan命令去遍历所有的键，对每个键根据其类型执行STRLEN、LLEN、SCARD、HLEN、ZCARD这些命令获取其长度或者元素个数。缺陷是线上试用并且个数多不一定空间大。

4. 线上应用记得开启Redis慢查询日志哦，基本思路跟MySQL类似。

5. Redis中因为内存分配策略跟增删数据是会导致`内存碎片`，你可以重启服务也可以执行`activedefrag yes`进行内存重新整理来解决此问题。
   $$
   Memory Fragmentation Ratio = \frac{Used Memory RSS}{Used Memory}
   $$

   1. Ratio >1 表明有内存碎片，越大表明越多。

   2. Ratio < 1 表明正在使用虚拟内存，虚拟内存其实就是硬盘，性能比内存低得多，这是应该增强机器的内存以提高性能。

   3. 一般来说，mem_fragmentation_ratio的数值在1 ~ 1.5之间是比较健康的。



## 问题

1、客户端无法远程连接 redis 服务器

>原因1：如果你的 redis 服务是在阿里云服务器上自建的，默认 redis 端口 6379 是不允许外部访问的。  
>解决办法：在服务器对应的安全组管理中，开启外部 IP 地址对 Redis 服务器 `6379` 端口的访问权限。
>
>原因2：Redis 服务器的 redis.conf 没有配置放开IP权限（默认只允许127.0.0.1的客户端访问）。  
>解决办法：找到 bind 127.0.0.1 这一行，注释掉它即可。
>
>原因3：Redis 服务器的 redis.conf 中没有配置 redis 访问密码。  
>解决办法：取消 requirepass 前面的注释，然后在后面配置密码即可。



### 缓存雪崩

雪崩定义：

> Redis中大批量key在同一时间同时失效导致所有请求都打到了MySQL。而MySQL扛不住导致大面积崩塌。

雪崩解决方案：

> 1、缓存数据的过期时间加上个随机值，防止同一时间大量数据过期现象发生。
>
> 2、如果缓存数据库是分布式部署，将热点数据均匀分布在不同搞得缓存数据库中。
>
> 3、设置热点数据永远不过期。



### 缓存穿透

穿透定义：

> 缓存穿透 是 指缓存和数据库中`都没有`的数据，比如ID默认>0，黑客一直 请求ID= -12的数据那么就会导致数据库压力过大，严重会击垮数据库。

穿透解决方案：

> 1、后端接口层增加 用户**鉴权校验**，**参数做校验**等。
>
> 2、单个IP每秒访问次数超过阈值**直接拉黑IP**，关进小黑屋1天，在获取IP代理池的时候我就被拉黑过。
>
> 3、从缓存取不到的数据，在数据库中也没有取到，这时也可以将key-value对写为key-null 失效时间可以为15秒**防止恶意攻击**。
>
> 4、用Redis提供的  **Bloom Filter** 特性也OK。



### 缓存击穿

击穿定义：

> 现象：大并发集中对这一个热点key进行访问，当这个Key在失效的瞬间，持续的大并发就穿破缓存，直接请求数据库。

击穿解决：

> 设置热点数据永远不过期 加上互斥锁也能搞定了



### 双写一致性

双写：`缓存`跟`数据库`均更新数据，如何保证数据一致性？

1、先更新数据库，再更新缓存

> 安全问题：线程A更新数据库->线程B更新数据库->线程B更新缓存->线程A更新缓存。`导致脏读`。
>
> 业务场景：读多写少场景，频繁更新数据库而缓存根本没用。更何况如果缓存是叠加计算后结果更`浪费性能`。

2、先删缓存，再更新数据库

> A 请求写来更新缓存。
>
> B 发现缓存不在去数据查询旧值后写入缓存。
>
> A 将数据写入数据库，此时缓存跟数据库**不一致**。

因此 **FackBook** 提出了  [Cache Aside Pattern](https://mp.weixin.qq.com/s?__biz=MzI1NDQ3MjQxNA==&mid=2247486125&idx=1&sn=9a263b9bb7f1abdf249a0011e7996a5e&scene=21#wechat_redirect)

> 失效：应用程序先从cache取数据，没有得到，则从数据库中取数据，成功后，放到缓存中。
>
> 命中：应用程序从cache中取数据，取到后返回。
>
> 更新：`先把数据存到数据库中，成功后，再让缓存失效`。



### 脑裂

脑裂是指因为网络原因，导致master节点、slave节点 和 sentinel 集群处于不同的网络分区，此时因为sentinel集群**无法感知**到master的存在，所以将slave节点提升为master节点。此时存在两个不同的master节点就像一个大脑分裂成了两个。其实在`Hadoop` 、`Spark`集群中都会出现这样的情况，只是解决方法不同而已（用ZK配合强制杀死）。

集群脑裂问题中，如果客户端还在基于原来的master节点继续写入数据那么新的master节点将无法同步这些数据，当网络问题解决后sentinel集群将原先的master节点降为slave节点，此时再从新的master中同步数据将造成大量的数据丢失。

Redis处理方案是redis的配置文件中存在的两个参数

```yaml
min-replicas-to-write 3  表示连接到master的最少slave数量
min-replicas-max-lag 10  表示slave连接到master的最大延迟时间
```

如果连接到master的slave数量 < 第一个参数 且 ping的延迟时间 <= 第二个参数那么master就会拒绝写请求，配置了这两个参数后如果发生了集群脑裂则原先的master节点接收到客户端的写入请求会拒绝就可以减少数据同步之后的数据丢失。



### 事务

[MySQL](https://mp.weixin.qq.com/s?__biz=MzI4NjI1OTI4Nw==&mid=2247488721&idx=1&sn=eead82d2b7a0fdf993beacc4dfd60313&scene=21#wechat_redirect) 中的事务还是挺多道道的还要，而在Redis中的事务只要有如下三步：

![x](./Resources/st041.png)

关于事务具体结论：

> 1、redis事务就是一次性、顺序性、排他性的执行一个队列中的**一系列命令**。　 
>
> 2、Redis事务**没有隔离级别**的概念：批量操作在发送 EXEC 命令前被放入队列缓存，并不会被实际执行，也就**不存在事务内的查询要看到事务里的更新，事务外查询不能看到**。
>
> 3、Redis**不保证原子性**：Redis中单条命令是原子性执行的，但事务不保证原子性。
>
> 4、Redis编译型错误事务中所有代码均不执行，指令使用错误。运行时异常是错误命令导致异常，其他命令可正常执行。
>
> 5、watch指令类似于**乐观锁**，在事务提交时，如果watch监控的多个KEY中任何KEY的值已经被其他客户端更改，则使用EXEC执行事务时，事务队列将不会被执行。



### 正确开发步骤

> `上线前`：Redis **高可用**，主从+哨兵，Redis cluster，避免全盘崩溃。
>
> `上线时`：本地 ehcache 缓存 + Hystrix 限流 + 降级，避免MySQL扛不住。`上线后`：Redis **持久化**采用 RDB + AOF 来保证断点后自动从磁盘上加载数据，快速恢复缓存数据。



## 参考

- Sql Server: [https://docs.microsoft.com/zh-cn/sql/index](https://docs.microsoft.com/zh-cn/sql/index)
- [SSMS](https://docs.microsoft.com/zh-cn/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-2017)
- PostgreSQL: [https://www.postgresql.org/](https://www.postgresql.org/)
- Oracle: [https://www.oracle.com/index.html](https://www.oracle.com/index.html)

## 生态链

redis 和 memcached 相比的独特之处：

- redis 可以用来做存储(storge)，而 memcached 用来做缓存(cache)。这个特点主要因为其有“持久化”的功能。
- redis 存储的数据有“结构”，memcached 缓存的数据只有1种类型——字符串，而 redis 则可以存储字符串、链表、哈希结构、集合、有序集合。

### Memcached

**Memcached** 是免费的，开源的，高性能的，分布式内存对象的缓存系统（键/值字典），旨在通过减轻数据库负载加快动态 Web 应用程序的使用。

Memcached 是由 布拉德•菲茨帕特里克(Brad Fitzpatrick) 在 2003 年为 LiveJournal 开发的，现在有很多知名网站都在使用，包括：Netlog, Facebook, Flickr, Wikipedia, Twitter, YouTube等。

Memcached 主要特点是：

- 开源
- Memcached 服务器是一个很大的哈希表
- 显著减少数据库负载。
- 非常适合高负载的数据库网站。
- 在 BSD 许可下发布
- 从技术上来说，它是在通过 TCP 或 UDP 在服务器和客户端之间来访问。

不要使用 Memcached 来做什么？

- 持久性数据存储
- 数据库
- 特殊应用
- 大对象缓存
- 容错或高可用性

Windows安装包：

- [32位系统 1.2.5版本](http://static.runoob.com/download/memcached-1.2.5-win32-bin.zip)
- [32位系统 1.2.6版本](http://static.runoob.com/download/memcached-1.2.6-win32-bin.zip)
- [32位系统 1.4.4版本](http://static.runoob.com/download/memcached-win32-1.4.4-14.zip)
- [64位系统 1.4.4版本](http://static.runoob.com/download/memcached-win64-1.4.4-14.zip)
- [32位系统 1.4.5版本](http://static.runoob.com/download/memcached-1.4.5-x86.zip)
- [64位系统 1.4.5版本](http://static.runoob.com/download/memcached-1.4.5-amd64.zip)

**memcached >= 1.4.5 版本安装：**

1、解压下载的安装包到指定目录。  
2、在 memcached1.4.5 版本之后，memcached 不能作为服务来运行，需要使用任务计划中来开启一个普通的进程，在 window 启动时设置 memcached自动执行。

我们使用管理员身份执行以下命令将 memcached 添加来任务计划表中：

```bat
schtasks /create /sc onstart /tn memcached /tr "'D:\memcached-amd64\memcached.exe' -m 512"
```

>注意：  
>(1) 你需要使用真实的路径替代 D:\memcached-amd64\memcached.exe。  
>(2) -m 512 意思是设置 memcached 最大的缓存配置为512M。  
>(3) 我们可以通过使用 "D:\memcached-amd64\memcached.exe -h" 命令查看更多的参数配置。

3、如果需要删除 memcached 的任务计划可以执行以下命令：

```bat
schtasks /delete /tn memcached
```

[Memcached三种客户端的使用](https://www.jianshu.com/p/8c8432255e6f)
