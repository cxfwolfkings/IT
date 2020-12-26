# Redis



## 目录

1. 理论

   - [数据类型](#数据类型)

   - [数据持久化](#数据持久化)

   - [过期删除](#过期删除)

2. 实战

   - [安装](#安装)

   - [开源客户端](#开源客户端) 
   - [操作命令](#操作命令)
   - [内存管理](#内存管理)

   - [淘汰策略](#淘汰策略)

   - [集群部署](#集群部署)

   - [主从复制](#主从复制)

   - [Redis&nbsp;Cluster](#rediscluster)

   - [ShardedJedis](#shardedjedis)

   - [Codis](#codis)

   - [集群方案对比](#集群方案对比)

   - [事务管理](#事务管理)

   - [事件驱动](#事件驱动)

   - [缓存设计](#缓存设计)

   - [慢查询](#慢查询)

   - [流水线](#流水线)

   - [发布-订阅](#发布-订阅)

   - [HyperLogLog](#hyperloglog)

   - [GEO](#geo)

   - [使用场景](#使用场景)

   - [分布式锁](#分布式锁)

   - [消息队列](#消息队列)

3. 总结

   - [高可用解决方案](#高可用解决方案)

     - [方案1：Redis Cluster](#方案1redis-cluster)

     - [方案2：Twemproxy](#方案2twemproxy)

     - [方案3：Codis](#方案3codis)

   - [问题](#问题)

   - [参考](#参考)

   - [生态链](#生态链)
     - [Memcached](#memcached)

4. 升华



## 理论

官方网站：[https://redis.io/](https://redis.io/)

Redis: Remote Dictionary Server，属于 NoSQL 数据库

Redis是什么：

Redis is an open source, BSD licensed, advanced key-value store. It is often referred to as a data structure server since keys can contain strings, hashes, lists, sets and sorted sets.

Redis是开源，BSD许可，高级的key-value存储系统。可以用来存储字符串、哈希结构、链表、集合。因此，常用来提供数据结构服务。

作者：来自意大利西西里岛的 Salvatore Sanfilippo，Github地址：[http://github.com/antirez](http://github.com/antirez)。

使用 ANSI C 语言编写，最新版本（4.0.10）代码规模7.6万行。

目前，在所有可实现分布式缓存的开源软件中，Redis 应用最为广泛，开源社区也最为活跃，开源客户端支持语言也最为丰富。

可用作 **数据库**、**高速缓存**、**锁** 和 **消息队列**

支持**字符串**、**哈希表**、**列表**、**集合**、**有序集合**、**位图**、**HyperLogLogs** 等数据类型

内置复制、Lua 脚本、老化逐出、事务以及不同级别磁盘持久化功能

Redis 还支持 Sentinel 和 Cluster（从3.0开始）等高可用集群方案

Redis 作为缓存的常见业务场景有：

1. 缓存热点数据，减轻数据库负载；
2. 基于 List 结构显示最新的项目列表；
3. 基于 Sorted Set 来做排行榜，取 Top N；
4. 基于 Set 来做 uniq 操作，如页面访问者排重；
5. 基于 Hset 做单 Key 下多属性的项目，例如商品的基本信息、库存、价格等设置成多属性。

Redis 特点

- Redis 不仅仅支持简单的 key-value 类型的数据，同时还提供 list，set，zset，hash 等数据结构的存储。
- Redis 支持数据的持久化，可以将内存中的数据保存在磁盘中，重启的时候可以再次加载进行使用。
- Redis 支持数据的备份，即 master-slave 模式的数据备份。
- Redis 主进程是**单线程** 工作，因此，Redis 的所有操作都是原子性的。意思就是要么成功执行要么失败完全不执行。单个操作是原子性的。多个操作也支持事务，即原子性，通过 `MULTI` 和 `EXEC` 指令包起来。
- 性能极高：Redis能读的速度是110000次/s，写的速度是81000次/s，此外，Key 和 Value 的大小限制均为 512M，这阈值相当可观。
- 丰富的特性：Redis 还支持 publish/subscribe，通知，key 过期等等特性。

### 数据类型

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

**String：**

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

**List：**

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

**Set：**

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

**Hash：**

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

**ZSet：**

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

### 数据持久化



### 过期删除



## 实战

### 安装

官方站点：redis.io 下载最新版或者最新stable版

windows:

```sh
# 启动临时服务：
redis-server.exe redis.windows.conf
# 客户端调用：
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

Linux:

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

**以后台进程的形式运行：**

编辑conf配置文件，修改如下内容：`daemonize yes`

**开启远程访问：**

修改redis.conf，注释掉 `bind 127.0.0.1` 可以使所有的 ip 访问 redis；若是想指定多个 ip 访问，但并不是全部的 ip 访问，可以 bind。

在 redis3.2 之后，redis 增加了 protected-mode，在这个模式下，即使注释掉了 `bind 127.0.0.1`，再访问 redis 的时候还是报错，修改办法：`protected-mode no`

**设置密码：**

把 `#requirepass foobared` 的 # 号去掉，并把 foobared 改为自己的密码即可

### 开源客户端

Redis 的开源客户端众多，几乎支持所有编程语言，其中常用的 Java 客户端有 Jedis、Lettuce 以及 Redission。



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

### 淘汰策略



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

#### 集群方案对比

协议支持：

命令|Redis Cluster|ShardedJedis|Codis
-|-|-|-
mget/mset|仅限同一个slot|不支持|失去原子性
keys|仅限同一个slot|不支持|不支持
scan|仅限同一个slot|不支持|仅限同一个slot（SLOTSSCAN命令）
rename|仅限同一个slot|不支持|不支持
pipeline|不支持|不支持|支持
事务|支持相同slot|不支持|不支持
发布/订阅|支持|不支持|不支持
eval|仅限同一slot|不支持|支持

参考：[https://www.cnblogs.com/Finley/p/8595506.html](https://www.cnblogs.com/Finley/p/8595506.html)

**哨兵机制**

哨兵(Sentinel)是非存储节点，作为 Redis 配置中心可以监听一或多套集群中的存储节点。

- 集群主服务器进入下线状态时，自动从从服务器中选举出新主服务器，实现自动故障转移。
- 克服了传统主从复制需要手动执行故障转移、写能力和存储能力受限的问题。
- 客户端遍历 Sentinel 集合，选取可用的 Sentinel 节点，并请求获取 Redis 信息，而不再关心具体的存储节点变化。

**节点下线**

多个 Sentinel 发现并确认 Master 问题：每组 Sentinel 可以监控一或多个 Redis 集群，其中

- 主观下线：即 Sentinel 节点对 Redis 节点失败的偏见，超出超时时间认为 Master 已经宕机：sentinel down-after-milliseconds masterName 30000
- 客观下线：所有 Sentinel 节点对 Redis 节点失败要达成共识，即超过 quorum 个统一。

**领导者选举**

选举出一个 Sentinel 作为 Leader：集群中至少有三个 Setinel 节点，但只有其中一个节点可完成故障转移。通过以下命令可以进行失败判定或领导者选举：

```sh
sentinel is-mastr-down-by-addr
```

具体流程：

- 每个主观下线的 Sentinel 节点向其他 Sentinel 节点发送命令，要求设置它为领导者；
- 收到命令的 Sentinel 节点如果没有同意通过其他 Sentinel 节点发送的命令，则同意该请求，否则拒绝；
- 如果该 Sentinel 节点发现自己的票数已经超过 Sentinel 集合半数且超过 quorum，则它成为领导者；
- 如果此过程有多个 Sentinel 节点成为领导者，则等待一段时间再重新进行选举。

**故障转移**

故障转移的流程：

- Sentinel 选出一个合适的 Slave 作为新的 Master（slaveof no one 命令）；
- 向其余 Slave 发出通知，让它们成为新 Master 的 Slave（parallel-syncs 参数）；
- 等待旧 Master 复活，并使之称为新 Master 的 Slave；
- 向客户端通知 Master 变化。

从 Slave 中选择新 Master 节点的规则：

- 选择 slave-priority 最高的节点；
- 选择复制偏移量最大的节点（同步数据最多）；
- 选择 runId 最小的节点。

**高可用读写分离**

从节点是主节点的副本，是高可用的基础，同时扩展了读数据的能力。

当主节点宕机，Sentinel 可以选出新的 Master 解决问题，但同时也需要向客户端发出通知消息，使之基于三个消息做出调整：

1. +switch-master：切换主节点（从 -> 主）；
2. +convert-to-slave：切换从节点（旧主 -> 从）；
3. +sdown：主观下线。

![x](http://121.196.182.26:6100/public/images/redis-copy4.png)

**定时任务**

- 每 10s 每个 Sentinel 对 Master 和 Slave 执行 info，目的是发现 Slave 节点、确定主从关系；
- 每 2s 每个 Sentinel 通过 Master 的 Channel 交换信息(pub-sub)：
- 通过 `__sentinel__:hello` 频道交互；
- 交互对节点的分析和自身信息；
- 每 1s 每个 Sentinel 对其他 Sentinel 和 Redis 执行 ping，进行心跳检测。

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
