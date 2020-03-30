# Redis

- Radis: Remote Dictionary Server
- 作者：来自意大利西西里岛的 Salvatore Sanfilippo
- 源码：[http://github.com/antirez](http://github.com/antirez)
- 完全开源免费，遵守BSD协议，是一个高性能的key-value数据库
- Redis的所有操作都是 <b style="color:green">原子性</b> 的

**什么是 BSD 协议？**

BSD开源协议是一个给于使用者很大自由的协议。可以自由的使用，修改源代码，也可以将修改后的代码作为开源或者专有软件再发布。当你发布使用了BSD协议的代码，或者以BSD协议代码为基础做二次开发自己的产品时，需要满足三个条件：

- 如果再发布的产品中包含源代码，则在源代码中必须带有原来代码中的BSD协议。
- 如果再发布的只是二进制类库/软件，则需要在类库/软件的文档和版权声明中包含原来代码中的BSD协议。
- 不可以用开源代码的作者/机构名字和原来产品的名字做市场推广。

BSD代码鼓励代码共享，但需要尊重代码作者的著作权。BSD由于允许使用者修改和重新发布代码，也允许使用或在BSD代码上开发商业软件发布和销售，因此是对商业集成很友好的协议。

很多的公司企业在选用开源产品的时候都首选BSD协议，因为可以完全控制这些第三方的代码，在必要的时候可以修改或者二次开发。

更多协议参考：[各种开源协议介绍](https://www.runoob.com/w3cnote/open-source-license.html)

**什么是 key value 存储？**

JAVA 中的 map 就是 key=>value 存储的。键 => 值（key=>value）对，键唯一，对应一个值，值的形式多样。

**什么是原子性，什么是原子性操作？**

举个例子：

A、想要从自己的帐户中转1000块钱到B的帐户里。那个从A开始转帐，到转帐结束的这一个过程，称之为一个事务。在这个事务里，要做如下操作：

1. 从A的帐户中减去1000块钱。如果A的帐户原来有3000块钱，现在就变成2000块钱了。
2. 在B的帐户里加1000块钱。如果B的帐户如果原来有2000块钱，现在则变成3000块钱了。

如果在A的帐户已经减去了1000块钱的时候，忽然发生了意外，比如停电什么的，导致转帐事务意外终止了，而此时B的帐户里还没有增加1000块钱。那么，我们称这个操作失败了，要进行回滚。回滚就是回到事务开始之前的状态，也就是回到A的帐户还没减1000块的状态，B的帐户的原来的状态。此时A的帐户仍然有3000块，B的帐户仍然有2000块。

<b style="color:green">我们把这种要么一起成功（A帐户成功减少1000，同时B帐户成功增加1000），要么一起失败（A帐户回到原来状态，B帐户也回到原来状态）的操作叫原子性操作</b>。

如果把一个事务可看作是一个程序，它要么完整的被执行，要么完全不执行。这种特性就叫原子性。

## 目录

1. [安装](#安装)
   - [开启远程访问](#开启远程访问)
2. [数据类型](#数据类型)
3. [数据持久化](#数据持久化)
4. [内存管理](#内存管理)
5. [事务管理](#事务管理)
6. [集群部署](#集群部署)
7. [高可用解决方案](#高可用解决方案)

## 安装

### windows

下载：[https://github.com/MSOpenTech/redis/releases](https://github.com/MSOpenTech/redis/releases)

将下载下来的压缩包解压到自己的工作目录，然后启动服务：

```bat
./redis-server.exe redis.windows.conf
```

redis.windows.conf是默认配置，可以省略！输入之后，会显示图标界面！

这时候另启一个 cmd 窗口，原来的不要关闭，不然就无法访问服务端了。切换到 redis 目录下运行：

```bat
redis-cli.exe -h 127.0.0.1 -p 6379
```

- -a: 输入密码
- --raw: 避免中文乱码

安装调试完成！

>windows下也有专门的安装软件进行向导式安装！

**服务安装：**

```cmd
redis-server.exe --service-install redis.windows.conf --loglevel verbose
```

### CentOS 7

1. 安装GCC，执行命令：`yum install -y gcc`
2. 命令执行结束后，输入 `gcc -v` 命令检查 GCC 是否安装成功，如果执行命令后输出：gcc version 4.8.5 20150623 (Red Hat 4.8.5-28) (GCC) 类似的信息说明 GCC 安装成功；
3. 执行命令：`mkdir -p /usr/local/software/`，再创建目录/usr/local/software；
4. 执行命令 `cd /usr/local/software/` 进入software目录，然后执行命令 `wget http://download.redis.io/releases/redis-4.0.6.tar.gz` 下载 Redis 安装包；
5. 执行命令 `tar -zxvf redis-4.0.6.tar.gz -C ../` 将Redis安装包解压到目录/usr/local/中；
6. 执行命令 `mv redis-4.0.6/ redis` 修改目录名称；
7. 执行命令 `cd redis`，再执行命令 make MALLOC=libc 编译 Redis 安装包源文件；
8. 执行命令 `cd src && make install` 安装 Redis；
9. 新建目录 `mkdir -p /usr/local/redis/bin /usr/local/redis/etc`；
10. 执行命令 `cd /usr/local/redis/src`，打开 src 目录，执行命令将对应的文件复制到上面新建的bin、etc目录下：

    ```sh
    cp redis-server ../bin/
    cp redis-benchmark ../bin/
    cp redis-check-rdb ../bin/
    cp redis-sentinel ../bin/
    cp redis-cli ../bin/
    cp ../redis.conf ../etc/
    ```

11. 执行命令 `vim /etc/profile`，修改环境变量文件，在文件中添加下面内容：

    ```sh
    export REDIS_HOME=/usr/local/redis/
    export PATH=${JAVA_HOME}/bin:${REDIS_HOME}/bin:$PATH
    ```

    保存修改的内容后，执行 `source /etc/profile` 命令让修改环境变量文件生效。

12. 修改 /usr/local/redis/etc/redis.conf 配置文件，修改内容如下：

    ```sh
    bind 192.168.1.120
    bind 127.0.0.1
    daemonize yes
    dir /usr/local/redis/data/
    appendonly yes
    appendfsync always
    ```

    以上配置含义以及 Redis 相关配置调优将在后面进行详解。

13. 执行命令 `redis-server /usr/local/redis/etc/redis.conf` 启动 Redis 服务端；
14. 执行命令 `ps -ef | grep 6379` 检查 redis-server 是否已经正常启动。如输出如下信息说明启动成功：

    ![x](./Resource/2.png)

### Ubuntu

```sh
sudo apt-get update
sudo apt-get install redis-server
```

启动：`redis-server`

查看 redis 是否启动？`redis-cli`命令将打开以下终端：

```sh
redis 127.0.0.1:6379>
```

127.0.0.1 是本机 IP ，6379 是 redis 服务端口。现在我们输入 PING 命令。

```sh
redis 127.0.0.1:6379> ping
PONG
```

说明我们已经成功安装了redis！

### Mac

1. [官网](http://redis.io/)下载最新的稳定版本，假设是3.2.0
2. `sudo mv 到 /usr/local/`
3. `sudo tar -zxf redis-3.2.0.tar` 解压文件
4. 进入解压后的目录 `cd redis-3.2.0`
5. `sudo make test` 测试编译
6. `sudo make install`

mac 下安装也可以使用 homebrew，homebrew 是 mac 的包管理器。

1. 执行 `brew install redis`
2. 启动 redis，可以使用后台服务启动 `brew services start redis`。或者直接启动：`redis-server /usr/local/etc/redis.conf`

### Cloud Studio

1. 访问 [腾讯云开发者平台](https://studio.dev.tencent.com/)，注册/登录账户。  
2. 在右侧的运行环境菜单选择："ubuntu"

   ![x](./Resource/5.jpg)

接下来和在Ubuntu中安装并无二致！

### 开启远程访问

修改redis.conf，注释掉 `bind 127.0.0.1` 可以使所有的ip访问redis；若是想指定多个ip访问，但并不是全部的ip访问，可以bind。

在redis3.2之后，redis增加了protected-mode，在这个模式下，即使注释掉了 `bind 127.0.0.1`，再访问redis的时候还是报错，修改办法：`protected-mode no`

## 数据类型

数据类型|可以存储的值|操作
-|-|-
String|字符串、整数或者浮点数|对整个字符串或者字符串的其中一部分执行操作；对整数和浮点数执行自增或者自减操作
List|列表|从两端压入或者弹出元素；对单个或者多个元素进行修剪，只保留一个范围内的元素
Set|无序集合|添加、获取、移除单个元素；检查一个元素是否存在于集合中；计算交集、并集、差集；从集合里面随机获取元素
Hash|包含键值对的无序散列表|添加、获取、移除单个键值对；获取所有键值对；检查某个键是否存在
ZSet|有序集合|添加、获取、删除元素；根据分值范围或者成员来获取元素；计算一个键的排名

Redis可以为每个键设置过期时间，当键过期时，会自动删除该键。对于散列表这种容器，只能为整个键设置过期时间（整个散列表），而不能为键里面的单个元素设置过期时间。

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

### String

[https://www.runoob.com/redis/redis-strings.html](https://www.runoob.com/redis/redis-strings.html)

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

### List

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

### Set

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

### Hash

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

### ZSet

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

## 数据持久化

Redis 默认把数据保存在内存中，可对数据的更新异步保存到磁盘上。

命令|RDB|AOF
-|-|-
启动优先级|低，默认关闭|高，建议打开（缓存场景）
占用空间|二进制存储且压缩，占用空间较小|以原始日志形式存储，占用空间较大
写入开销|全量存储数据，开销较大|日志追加写入，开销较小
恢复速度|快|慢
数据安全性|有可能丢失数据|根据策略而定

### RDB

将某个时间点的所有数据都以二进制形式存放到硬盘上(MySQL Dump)。

- 可以将快照复制到其它服务器从而创建具有相同数据的服务器副本。
- 如果系统发生故障，将会丢失最后一次创建快照之后的数据。
- 如果数据量很大，保存快照的时间会很长，建议异步写入。
- 存在的问题：时间、性能开销大，不可控且容易丢失数据。

**同步触发**：

- `save` 命令，会阻塞其他所有命令的执行，直到持久化完成；
- 如果存在旧的 RDB 文件，会用新的来替换；
- 复杂度 O(n)，包含所有的数据。

**异步触发**：

- `bgsave` 命令，创建一个子进程实现数据持久化，完成后通知主进程；
- 不会阻塞其他命令的执行，客户端可以随时访问；
- 文件策略和复杂度都与 save 相同。

**自动触发**：基于修改数据数量或时间，自动执行持久化。

**其他机制**：全量复制、debug reload、shutdown。

### AOF

将写命令添加到 AOF(Append Only File) 文件的末尾(MySQL Binlog、HBase HLog)。

随着服务器写请求的增多，AOF 文件会越来越大。Redis 提供了一种将 <b style="color:green">AOF重写</b> 的特性，能够去除 AOF 文件中的冗余写命令；

使用 AOF 持久化需要设置同步选项，从而确保写命令什么时候会同步到磁盘文件上。这是因为对文件进行写入并不会马上将内容同步到磁盘上，而是先存储到缓冲区，然后由操作系统决定什么时候同步到磁盘。

执行命令 `fsync` 把缓冲区内容同步到磁盘的时机：

选项|同步频率|备注
-|-|-
always|每个写命令都同步|会严重减低服务器的性能
everysec|每秒同步一次|比较合适，保证系统崩溃只会丢失一秒左右的数据， Redis 每秒执行一次同步性能几乎没有任何影响
no|让操作系统来决定何时同步|不能给服务器性能带来多大的提升，而且也会增加系统崩溃时数据丢失的数量

**AOF重写：**

- 对多条原生命令进行优化，重写成简化的命令以减少磁盘占用量、提高故障恢复效率。
- 当 AOF 文件过大或增长速度过快时自动触发。

![x](./Resource/8.png)
![x](./Resource/9.png)

**基本配置：**

- auto-aof-rewrite-min-size：AOF 文件重写需要的大小；
- auto-aof-rewrite-percentage：AOF 文件增长率

**统计指标：**

- aofcurrentsize：AOF 当前大小
- aof-base-size：AOF 上次启动和重写的大小

需要同时满足以下条件才会触发：

- aof_current_size > auto-aof-rewrite-min-size
- aof_current_size - aof_base_size/aof_base_size > auto-aof-rewrite-percentage

## 开源客户端

Redis 的开源客户端众多，几乎支持所有编程语言，其中常用的 Java 客户端有 Jedis、Lettuce 以及 Redission。

## 内存管理

Redis 使用 C 语言编写，但为了提高内存的管理效率，并没有直接使用 malloc/free 函数，Redis 默认选择 jemalloc 作为内存分配器，以减小内存碎片率。

jemalloc 在64位系统中，将内存空间划分为小、大、巨大三个范围。每个范围内又划分了许多小的内存块单位。当 Redis 存储数据时，会选择大小最合适的内存块进行存储。同时，Redis 为 Key-Value 存储定制了两种对象，其中 Key 采用 SDS（Simple Dynamic String)，Value 采用 redisObject，为内部编码和回收内存的高效实现奠定了基础。

Redis 的内存模型比较复杂，内容也较多，感兴趣的读者可以查阅[《深入了解 Redis 的内存模型》](https://www.cnblogs.com/qwangxiao/p/8921171.html)做更深了解。

在 Redis 中，并不是所有数据都一直存储在内存中，可以将一些很久没用的 value 交换到磁盘，而 Memcached 的数据则会一直在内存中。

### 淘汰策略

Redis 的过期清理策略：

- 定期删除：默认是每隔 100ms 就随机抽取一些设置了过期时间的 key，检查其是否过期，如果过期就删除；缺点是如果大量的 key 过期时遍历删除会严重影响性能、随机抽取也会导致一些 key 过期后仍一直留存；
- 惰性删除：获取 key 的时候，如果此时 key 已经过期，就删除，不会返回任何东西；缺点是对于过期又不再需要访问的 key 无法被删除。

对于以上两种情况无法有效清理过期的 key，因此 Redis 可以设置内存最大使用量，超出用量时根据数据淘汰策略清理：

策略 | 描述
-|-
`volatile-lru` | 从已设置过期时间的数据集中挑选最近最少使用的数据淘汰
`volatile-ttl` | 从已设置过期时间的数据集中挑选将要过期的数据淘汰
`latile-random` | 从已设置过期时间的数据集中任意选择数据淘汰
`llkeys-lru` | 从所有数据集中挑选最近最少使用的数据淘汰
`allkeys-random` | 从所有数据集中任意选择数据进行淘汰
`noeviction` | 禁止驱逐数据

- 作为内存数据库，出于对性能和内存消耗的考虑，Redis 的淘汰算法实际实现上并非针对所有 key，而是抽样一小部分并且从中选出被淘汰的 key。
- 使用 Redis 缓存数据时，为了提高缓存命中率，需要保证缓存数据都是热点数据。可以将内存最大使用量设置为热点数据占用的内存量，然后启用 `allkeys-lru` 淘汰策略，将最近最少使用的数据淘汰。
- Redis 4.0 引入了 `volatile-lfu` 和 `allkeys-lfu` 淘汰策略，LFU 策略通过统计访问频率，将访问频率最少的键值对淘汰。

## 集群部署

生产环境部署方案[参考](https://github.com/doocs/advanced-java/blob/master/docs/high-concurrency/redis-production-environment.md)

### 主从复制

使用主从复制，解决单点故障、容量瓶颈和 QPS 瓶颈的问题。

- 数据从线上 Redis 实例（主）复制到新启动 Redis 实例（从），提供备份和读写分离；
- 使用 slaveof host port 异步命令或配置文件可以让一个节点成为另一个节点的从节点，并复制数据；
- 从节点在从主节点上同步数据时会把旧数据都清空，同步后只允许读，不能写入数据；
- 一个主节点可以有多个从节点，但一个从节点只能有一个主节点，并且不支持主主复制。

### 复制模式

**复制过程：**

1. 主服务器创建快照文件，发送给从服务器，并在发送期间使用缓冲区记录执行的写命令。快照文件发送完毕之后，开始向从服务器发送存储在缓冲区中的写命令；
2. 从服务器丢弃所有旧数据，载入主服务器发来的快照文件，之后从服务器开始接受主服务器发来的写命令；
3. 主服务器每执行一次写命令，就向从服务器发送相同的写命令。

### 全量复制

主节点所有数据同步到从节点，包括同步过程中产生的数据。

![x](./Resource/10.png)

### 部分复制

如果主从间网络状况不好，从节点上可能会发生部分数据丢失，这时候再进行一次全量复制开销会很大。可以采用部分复制策略

![x](./Resource/11.png)

### 主从链

随着负载不断上升，主服务器可能无法很快地更新所有从服务器，或者重新连接和重新同步从服务器将导致系统超载。为了解决这个问题，可以创建一个中间层来分担主服务器的复制工作。中间层的服务器是最上层服务器的从服务器，又是最下层服务器的主服务器。

![x](./Resource/12.png)

### 常见问题

- 同步故障
- 读写分离：将主节点读流量分摊到从节点。但可能存在以下问题：
  - 复制数据延迟（不一致）；
  - 读取过期数据（Slave 不能删除数据）；
  - 从节点故障；
  - 主节点故障。
- 配置不一致
- maxmemory 不一致：丢失数据；
- 优化参数不一致：内存不一致。

**规避全量复制：**

全量复制开销较大，除了第一次以外，应该尽量规避。

- 可以选择小主节点（分片）、低峰期间操作。
- 如果节点运行 id 不匹配（如主节点重启、运行 id 发生变化），此时要执行全量复制，应该配合哨兵和集群解决。
- 主从复制挤压缓冲区不足产生的问题（网络中断，部分复制无法满足），可增大复制缓冲区（rel_backlog_size 参数）。

**复制风暴：**

- 单主节点复制风暴：主节点宕机恢复之后，所有的从节点会重新执行复制，开销非常大。解决方法是更换复制拓扑，把 “一主 - 多从” 替换成 “一主 - 一从 - 多从从” 或更好的拓扑，有效减少多节点复制的压力；
- 单机器复制风暴：一台机器上运行多个主实例，机器宕机后所有实例都要进行复制。解决方法是把主节点分散到多台机器、或改成高可用架构（从节点接替主节点）。

**哨兵机制：**

哨兵(Sentinel)是非存储节点，作为 Redis 配置中心可以监听一或多套集群中的存储节点。

- 集群主服务器进入下线状态时，自动从从服务器中选举出新主服务器，实现自动故障转移。
- 克服了传统主从复制需要手动执行故障转移、写能力和存储能力受限的问题。
- 客户端遍历 Sentinel 集合，选取可用的 Sentinel 节点，并请求获取 Redis 信息，而不再关心具体的存储节点变化。

**节点下线：**

多个 Sentinel 发现并确认 Master 问题：每组 Sentinel 可以监控一或多个 Redis 集群，其中

- 主观下线：即 Sentinel 节点对 Redis 节点失败的偏见，超出超时时间认为 Master 已经宕机：sentinel down-after-milliseconds masterName 30000
- 客观下线：所有 Sentinel 节点对 Redis 节点失败要达成共识，即超过 quorum 个统一。

**领导者选举：**

选举出一个 Sentinel 作为 Leader：集群中至少有三个 Setinel 节点，但只有其中一个节点可完成故障转移。通过以下命令可以进行失败判定或领导者选举：

```sh
sentinel is-mastr-down-by-addr
```

具体流程：

- 每个主观下线的 Sentinel 节点向其他 Sentinel 节点发送命令，要求设置它为领导者；
- 收到命令的 Sentinel 节点如果没有同意通过其他 Sentinel 节点发送的命令，则同意该请求，否则拒绝；
- 如果该 Sentinel 节点发现自己的票数已经超过 Sentinel 集合半数且超过 quorum，则它成为领导者；
- 如果此过程有多个 Sentinel 节点成为领导者，则等待一段时间再重新进行选举。

**故障转移：**

故障转移的流程：

- Sentinel 选出一个合适的 Slave 作为新的 Master（slaveof no one 命令）；
- 向其余 Slave 发出通知，让它们成为新 Master 的 Slave（parallel-syncs 参数）；
- 等待旧 Master 复活，并使之称为新 Master 的 Slave；
- 向客户端通知 Master 变化。

从 Slave 中选择新 Master 节点的规则：

- 选择 slave-priority 最高的节点；
- 选择复制偏移量最大的节点（同步数据最多）；
- 选择 runId 最小的节点。

**高可用读写分离：**

从节点是主节点的副本，是高可用的基础，同时扩展了读数据的能力。

当主节点宕机，Sentinel 可以选出新的 Master 解决问题，但同时也需要向客户端发出通知消息，使之基于三个消息做出调整：

- +switch-master：切换主节点（从 -> 主）；
- +convert-to-slave：切换从节点（旧主 -> 从）；
- +sdown：主观下线。

![x](./Resource/13.png)

**定时任务：**

- 每 10s 每个 Sentinel 对 Master 和 Slave 执行 info，目的是发现 Slave 节点、确定主从关系；
- 每 2s 每个 Sentinel 通过 Master 的 Channel 交换信息(pub-sub)：
- 通过 `__sentinel__:hello` 频道交互；
- 交互对节点的分析和自身信息；
- 每 1s 每个 Sentinel 对其他 Sentinel 和 Redis 执行 ping，进行心跳检测。

## 分布式集群

在分布式架构下：

- 每个节点都负责读写（分配指派槽）；
- 之间相互通信(meet)，所有节点共享指派槽信息，因此客户端请求不需要数据具体在哪个节点；

每个主节点都有对应的从节点。

![x](./Resource/14.png)

### 通信机制

集群元数据的维护有两种方式：集中式、Gossip 协议。

redis cluster 节点间采用 Gossip 协议进行通信。

集中式

将集群元数据（节点信息、故障等等）集中存储在某个节点上。集中式的好处在于，元数据的读取和更新，时效性非常好，一旦元数据出现了变更，就立即更新到集中式的存储中，其它节点读取的时候就可以感知到；不好在于，所有的元数据的更新压力全部集中在一个地方，可能会导致元数据的存储有压力。

![x](./REsource/15.png)

集中式元数据集中存储的一个典型代表，就是大数据领域的 storm。它是分布式的大数据实时计算引擎，是集中式的元数据存储的结构，底层基于 zookeeper（分布式协调的中间件）对所有元数据进行存储维护。

### Gossip协议

redis 维护集群元数据采用 Gossip 协议：所有节点都持有一份元数据，不同的节点如果出现了元数据的变更，就不断将元数据发送给其它的节点，让其它节点也进行元数据的变更。

其好处在于元数据的更新比较分散，不是集中在一个地方，更新请求会陆陆续续打到所有节点上执行，降低了压力；缺点在于元数据的更新有延时，可能导致集群中的一些操作会有一些滞后。

- 10000 端口：每个节点都有一个专门用于节点间通信的端口，就是自己提供服务的端口号+10000。每个节点每隔一段时间都会往其他节点发送 ping 消息，接收到 ping 之后节点会返回 pong。
- 交换信息：信息包括故障信息，节点的增加和删除，hash slot 信息等等。

### Gossip消息

Gossip 协议包含多种消息：

- meet：某个节点发送 meet 给新加入的节点，让新节点加入集群中，然后新节点就会开始与其它节点进行通信：redis-trib.rb add-node，其实内部就是发送了一个 gossip meet 消息给新加入的节点，通知那个节点去加入我们的集群。
- ping：每个节点都会频繁给其它节点发送ping，其中包含自己的状态还有自己维护的集群元数据，互相通过 ping 交换元数据。
- pong：返回 ping 和 meeet，包含自己的状态和其它信息，也用于信息广播和更新。
- fail：某个节点判断另一个节点 fail 之后，就发送 fail 给其它节点，通知其它节点说，某个节点宕机啦。

其中 ping 消息会携带一些元数据，如果很频繁，可能会加重网络负担：

- 每个节点每秒会执行 10 次 ping，每次会选择 5 个最久没有通信的其它节点。当然如果发现某个节点通信延时达到了 cluster_node_timeout / 2，那么立即发送 ping，避免数据交换延时过长（比如两个节点之间都 10 分钟没有交换数据了，那么整个集群处于严重的元数据不一致的情况，就会有问题）。cluster_node_timeout 如果调得比较大会降低 ping 的频率。
- 每次 ping 会带上自己节点的信息，还有就是带上 1/10 其它节点的信息，发送出去，进行交换。至少包含 3 个其它节点的信息，最多包含 总节点数减 2 个其它节点的信息。

**数据分片（寻址）：**

分片是将数据划分为多个部分的方法，可以将数据存储到多台机器里面，这种方法在解决某些问题时可以获得线性级别的性能提升。

分布方式|描述|特点|典型产品
-|-|-|-
顺序分布|把 id 按顺序平均地划分到不同区间，对应的数据分配到不同的实例中|数据分散度易倾斜，键值业务相关，可顺序访问，支持批量操作|BigTable<br>HBase
哈希分布|使用 CRC32 哈希函数将键转换为 hash 值，所得 hash 值取模分配到不同实例中|业务分散度高，键值分布业务无关，无法顺序访问，支持批量操作|MemCache<br>Redis Cluster

根据执行分片的位置，可以分为三种分片方式：

- 客户端分片：客户端使用一致性哈希等算法决定键应当分布到哪个节点；
- 代理分片：将客户端请求发送到代理上，由代理转发请求到正确的节点上；
- 服务器分片：Redis Cluster。

哈希取模

对于客户端请求的 key，会首先计算 hash 值，然后对节点数取模，分配到不同的 master 节点上。这种做法最简单，但存在以下问题：

- 节点伸缩：数据节点关系变化会导致数据迁移（迁移数量和添加节点数量有关，建议翻倍扩容）；
- 缓存失效：加入某一 master 节点宕机，所有请求过来都会基于最新的剩余可用节点数取模、尝试去取数据。这会导致大部分无法命中缓存的请求流量涌入数据库。

一致性哈希

一致性 hash 算法将整个 hash 值空间组织成一个虚拟的圆环，整个空间按顺时针方向组织，下一步将各个 master 节点（ip 或主机名）进行 hash。这样就能确定每个节点在其哈希环上的位置。

对于客户端请求的 key，首先计算 hash 值，并确定此数据在环上的位置，从此位置沿环顺时针移动，遇到的第一个 master 节点就是 key 所在位置。

在一致性哈希算法中增删一个节点受影响的数据仅仅是此节点到环空间前一个节点（沿着逆时针方向行走遇到的第一个节点）之间的数据，其它不受影响（保证节点伸缩、数据迁移受影响范围最小）。

但同样会有问题：一致性哈希算法在节点太少时，容易因为节点分布不均匀而造成缓存热点的问题。可以通过引入虚拟节点机制解决：即对每一个节点计算多个 hash，每个计算结果位置都放置一个虚拟节点。这样就实现了数据的均匀分布，负载均衡。

- 客户端分片：hash + 优化取余
- 节点伸缩：只影响邻近节点，不需要整体上做数据迁移
- 翻倍伸缩：保证最小迁移数据和负载均衡

虚拟槽

redis cluster 有固定的 16384 个 hash slot，对每个 key 计算 CRC16 值，然后对 16384 取模，可以获取 key 对应的 hash slot。

每个 master 都会持有部分 slot（比如有 3 个 master，可能每个 master 持有 5000 多个 hash slot）。因此节点的增加和移除很简单：只需要在 master 之间移动 hash slot 即可，移动成本是非常低的。

客户端的 api，可以对指定的数据，让他们走同一个 hash slot，通过 hash tag 来实现。如果任何一台机器宕机，另外两个节点不受影响。因为 key 找的是 hash slot 不是机器。

![x](./Resource/17.png)

高可用原理

redis cluster 的高可用的原理，几乎跟哨兵是类似的，直接集成了 replication 和 sentinel 的功能。

判断节点宕机

分为主观宕机和客观宕机：

- 主观宕机（pfail）：即一个节点认为另外一个节点宕机。在 cluster-node-timeout 内，某个节点一直没有返回 pong，那么就被认为 pfail。
- 客观宕机（fail）：即多个节点都认为另外一个节点宕机。如果一个节点认为某个节点 pfail 了，那么会在 gossip ping 消息中提示给其他节点，如果超过半数的节点都认为 pfail 了，那么就会变成 fail。

从节点过滤

- 对宕机的 master node，从其所有的 slave node 中选择一个切换成 master node；
- 判断标准：检查每个 slave node 与 master node 断开连接的时间，如果超过了 cluster-node-timeout * cluster-slave-validity-factor，就没有资格切换成 master。

从节点选举

每个从节点，都根据自己对 master 复制数据的 offset，来设置一个选举时间，offset 越大（复制数据越多）的从节点，选举时间越靠前，优先进行选举。

所有的 master node 开始 slave 选举投票，给要进行选举的 slave 进行投票，如果大部分 master node（N/2 + 1）都投票给了某个从节点，那么选举通过，那个从节点可以切换成 master。
从节点执行主备切换，从节点切换为主节点。

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

### 分布式锁

在分布式场景下，无法使用单机环境下的锁来对多个节点上的进程进行同步。

可以使用 Redis 自带的 SETNX 命令实现分布式锁，除此之外，还可以使用官方提供的 RedLock 分布式锁实现。

查找表

例如 DNS 记录就很适合使用 Redis 进行存储。

查找表和缓存类似，也是利用了 Redis 快速的查找特性。但是查找表的内容不能失效，而缓存的内容可以失效，因为缓存不作为可靠的数据来源。

## 消息队列

List 是一个双向链表，可以通过 lpush 和 rpop 写入和读取消息。

不过最好使用 Kafka、RabbitMQ 等消息中间件。

计数器

可以对 String 进行自增自减运算，从而实现计数器功能。

Redis 这种内存型数据库的读写性能非常高，很适合存储频繁读写的计数量。

其它

Set 可以实现交集、并集等操作，从而实现共同好友等功能。

ZSet 可以实现有序性操作，从而实现排行榜等功能。

## 高可用解决方案

Redis 有很多高可用的解决方案，下面简单介绍其中三种。

### 方案1：Redis Cluster

从3.0版本开始，Redis 支持集群模式——Redis Cluster，可线性扩展到1000个节点。Redis-Cluster 采用无中心架构，每个节点都保存数据和整个集群状态，每个节点都和其它所有节点连接，客户端直连 Redis 服务，免去了 Proxy 代理的损耗。Redis Cluster 最小集群需要三个主节点，为了保障可用性，每个主节点至少挂一个从节点（当主节点故障后，对应的从节点可以代替它继续工作），三主三从的 Redis Cluster 架构如下图所示：

![x](./Resource/69.png)

### 方案2：Twemproxy

Twemproxy 是一个使用 C 语言编写、以代理的方式实现的、轻量级的 Redis 代理服务器。它通过引入一个代理层，将应用程序后端的多台 Redis 实例进行统一管理，使应用程序只需要在 Twemproxy 上进行操作，而不用关心后面具体有多少个真实的 Redis 实例，从而实现了基于 Redis 的集群服务。当某个节点宕掉时，Twemproxy 可以自动将它从集群中剔除，而当它恢复服务时，Twemproxy 也会自动连接。由于是代理，Twemproxy 会有微小的性能损失。

Twemproxy 架构如下图所示：

![x](./Resource/70.png)

### 方案3：Codis

Codis 是一个分布式 Redis 解决方案，对于上层的应用来说，连接到 Codis Proxy 和连接原生的 Redis Server 没有明显的区别（部分命令不支持），上层应用可以像使用单机的 Redis 一样使用，Codis 底层会处理请求的转发，不停机的数据迁移等工作。

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
