# 目录

1. [分片](#分片)
   - [全局表](#全局表)
   - [ER分片表](#ER分片表)
   - [多对多关联](#多对多关联)
2. [Mycat常用分片规则](#Mycat常用分片规则)
   - [数字范围分片](#数字范围分片)
   - [取模分片](#取模分片)
   - [范围求模算法](#范围求模算法)
   - [固定分片hash算法](#固定分片hash算法)
   - [取模范围算法](#取模范围算法)
   - [字符串hash求模范围算法](#字符串hash求模范围算法)
   - [按日期分片](#按日期分片)
   - [枚举分片](#枚举分片)
   - [应用指定的算法](#应用指定的算法)
   - [字符串hash解析算法](#字符串hash解析算法)
   - [一致性hash算法](#一致性hash算法)
3. [分库分表案例](#分库分表案例)

## 分片

| 分类 | 连续分片                                                     | 离散分片                                                 |
| ---- | ------------------------------------------------------------ | -------------------------------------------------------- |
| 优点 | 扩容无需迁移数据，范围条件查询消耗资源少                     | 并发访问能力增强，范围条件查询性能提升                   |
| 缺点 | 存在数据热点的可能性，并发访问能力受限于单一或者少量DataNode | 数据扩容比较困难，涉及到数据迁移问题数据库连接消耗比较多 |

**连续分片：**

- 数字范围分片
- 按日期分片
- 按单月小时分片
- 按自然月分片

**离散分片：**

- 枚举分片
- 程序制定分区分片
- 十进制求模分片
- 字符串hash解析分片
- 一致性hash分片

### 全局表

全局表自动克隆到全部数据分片，所以可以和任意其他表Join

```xml
<table name="bas_role" primaryKey="ID" type="global" autoIncrement="true" dataNode="dn1,dn2,dn3" />
```

### ER分片表

```xml
<table name="order" dataNode="dn$1-32" rule="mod-long">
  <childTable name="order_detail" primaryKey="id" joinKey="order_id" parentKey="order_id" />
</table>
```

### 多对多关联

## Mycat常用分片规则

分片规则配置文件 rule.xml 介绍

**Funcation 标签**

- name属性指定算法的名称，在该文件中唯一。
- class属性对应具体的分片算法，需要指定算法的具体类。
- property属性根据算法的要求指定。

```xml
<function name="rang-long" class="io.mycat.route.function.AutoPartitionByLong">
  <property name="mapFile">autopartition-long.txt</property>
</function>
```

**tableRule标签**

- name 属性指定分片规则的名称，要求唯一
- rule 属性指定分片算法的具体内容，包含 columns 和 clgorithm 两个属性
- columns 属性指定对应表中用于分片的列名
- algorithm 属性对应 function 中指定的算法的名称

### 数字范围分片

schema.xml（字段为数字类型）：

```xml
<schema name="db_user" checkSQLschema="true" sqlMaxLimit="100">
  <table name="data_dictionary" type="global" dataNode="db_user_dataNode1,db_user_dataNode2" primaryKey="dataDictionaryID"/>
  <table name ="users" dataNode="db_user_dataNode$1-2" primaryKey="userID" rule="auto-sharding-long">
    <childTable name="user_address" joinKey="userID" parentKey="userID" primaryKey="addressID" />
  </table>
</schema>
```

rule.xml：

```xml
<tableRule name="auto-sharding-long">
  <rule>
    <columns>user_id</columns>
    <algorithm>rang-long</algorithm>
  </rule>
</tableRule>
<function name="rang-long"
class="io.mycat.route.function.AutoPartitionByLong">
  <property name="mapFile">autopartition-long.txt</property>
  <property name="defaultNode">0</property>
</function>
```

- rang-long 函数中的 mapFile 表示规则配置文件的路径，默认是在 conf 目录下
- defaultNode 为超过范围后的默认节点。

配置文件autopartition-long.txt（注意一下，这里的配置的节点数要小于 schema 里的 table 的 dataNode 节点个数，否则启动 mycat 会报错）：

```txt
# range start-end ,data node index
# K=1000,M=10000.
0-500M=0
500M-1000M=1
```

测试sql：

```sql
INSERT INTO `users`(userID,userName,phoneNum,age,ddID,createTime,lastUpdate) VALUES ('1000', '张1', '13611111111', '31', '2', '2018-10-10 13:39:41', '2018-10-10 13:39:41');
INSERT INTO `users`(userID,userName,phoneNum,age,ddID,createTime,lastUpdate) VALUES ('2000', '王二', '13622222222', '32', '5', '2018-10-10 13:39:41', '2018-10-10 13:39:41');
INSERT INTO `users`(userID,userName,phoneNum,age,ddID,createTime,lastUpdate) VALUES ('6000000', '李三', '13633333333', '33', '3', '2018-10-10 13:39:41', '2018-10-10 13:39:41');
INSERT INTO `users`(userID,userName,phoneNum,age,ddID,createTime,lastUpdate) VALUES ('7000000', '赵四', '13644444444', '34', '1', '2018-10-10 13:39:41', '2018-10-10 13:39:41');
INSERT INTO `users`(userID,userName,phoneNum,age,ddID,createTime,lastUpdate) VALUES ('20000000', '田五', '13655555555', '35', '3', '2018-10-10 13:39:41', '2018-10-10 13:39:41');
```

到这里，按范围分片的测试就结束了，查看数据库，会发现已经按照对应的规则插进对应的分片当中了。

**提示：**

此分片应用场景：提前规划好分片字段某个范围属于哪个分片，start <= range <= end

### 取模分片

```xml
<tableRule name="mod-long">
  <rule>
    <columns>user_id</columns>
    <algorithm>mod-long</algorithm>
  </rule>
</tableRule>
<function name="mod-long" class="io.mycat.route.function.PartitionByMod">
  <!-- how many data nodes -->
  <property name="count">3</property>
</function>
```

此种配置非常明确，即根据 id 进行十进制求模运算，相比固定分片 hash，这种分片算法在批量插入时可能存在单事务中插入多数据分片的情况，增大事务一致性难度。

### 范围求模算法

先进行范围分片，计算出分片组；组内再求模，综合了范围分片和求模分片的优点。

分片组内使用求模可以保证组内的数据分布比较均匀，分片组之间采用范围分片可以兼顾范围分片的优点。

事先规定好分片的数量，数据扩容时按分片组扩容，则原有分片组的数据不需要迁移。由于分片组内的数据分布比较均匀，所以分片组内可以避免热点数据问题。


```xml
<tableRule name="auto-sharding-rang-mod">
  <rule>
    <columns>id</columns>
    <algorithm>rang-mod</algorithm>
  </rule>
</tableRule>
<function name="rang-mod"
class="io.mycat.route.function.PartitionByRangeMod">
  <property name="mapFile">partition-range-mod.txt</property>
  <property name="defaultNode">21</property>
</function>
```

partition-range-mod.txt配置格式：

```txt
range start-end, data node group size
```

以下配置一个范围代表一个分片组，=号后面的数字代表该分片组所拥有的分片的数量。

```txt
0-200M=5 //代表有5个分片节点
200M1-400M=1
400M1-600M=4
600M1-800M=4
800M1-1000M=6
```

### 固定分片hash算法

类似于十进制的求模运算，但是为二进制的操作；取 id 的二进制低 10 位，即 id 二级制 & 1111111111。

此算法的优点在于如果按照十进制取模运算，则在连续插入1~10时，1~10会被分到1~10个分片，增大了插入事务的控制难度。而此算法根据二进制则可能会分到连续的分片，降低了插入事务的控制难度！

```xml
<tableRule name="rule1">
  <rule>
    <!-- 将要分片的表字段 -->
    <columns>user_id</columns>
    <!-- 分片函数 -->
    <algorithm>func1</algorithm>
  </rule>
</tableRule>
<function name="func1" class="io.mycat.route.function.PartitionByLong">
  <!-- partitionCount 分片个数列表 -->
  <property name="partitionCount">2,1</property>
  <!-- partitionLength 分片范围列表 -->
  <property name="partitionLength">256,512</property>
</function>
```

- 分区长度：默认为最大 2^n=1024，即最大支持 1024 分区
- 约束：count, length 两个数组的长度必须是一致的。
- 1024 = sum((count[i]*length[i])). count 和 length 两个向量的点积恒等于 1024

### 取模范围算法

取模运算与范围约束的结合主要是为后续的数据迁移作准备，即可以自主决定取模后数据的节点分布，配置如下：

```xml
<tableRule name="sharding-by-pattern">
  <rule>
    <columns>user_id</columns>
    <algorithm>sharding-by-pattern</algorithm>
  </rule>
</tableRule>
<function name="sharding-by-pattern" class="io.mycat.route.function.PartitionByPattern">
  <!-- 求模基数 -->
  <property name="patternValue">256</property>
  <!-- 默认节点，如果采用默认配置，则不会进行求模运算 -->
  <property name="defaultNode">2</property>
  <property name="mapFile">partition-pattern.txt</property>
</function>
```

partition-pattern.txt

```txt
# id partition range start-end ,data node index
###### first host configuration
1-32=0
33-64=1
65-96=2
97-128=3
###### second host configuration
129-160=4
161-192=5
193-224=6
225-256=7
0-0=7
```

mapFile 配置文件中，1-32 即代表 id%256 后分布的范围。如果在 1-32，则在分区 1，其他类推，如果 id 非数据，则会分配在 defaoultNode 默认节点。

### 字符串hash求模范围算法

与取模范围算法类似，该算法支持数值、符号、字母取模，配置如下：

```xml
<tableRule name="sharding-by-prefixpattern">
  <rule>
    <!-- 将要分片的表字段 -->
    <columns>user_id</columns>
    <!-- 分片函数 -->
    <algorithm>sharding-by-prefixpattern</algorithm>
  </rule>
</tableRule>
<function name="sharding-by-prefixpattern" class="io.mycat.route.function.PartitionByPrefixPattern">
  <!-- 求模基数 -->
  <property name="patternValue">256</property>
  <!-- ASCII截取的位数 -->
  <property name="prefixLength">5</property>
  <!-- 配置文件路径 -->
  <property name="mapFile">partition-pattern.txt</property>
</function>
```

partition-pattern.txt：

```txt
# range start-end, data node index
# ASCII
# 8-57=0-9 阿拉伯数字
# 64、65-90=@、A-Z # 97-122=a-z
###### first host configuration
1-32=0
33-64=1
65-96=2
97-128=3
###### second host configuration
129-160=4
161-192=5
193-224=6
225-255=7
0-0=7
...
```

配置文件中，1-32 即代表 id%256 后分布的范围，如果在 1-32 则在分区 1，其他类推。

该算法与取模范围算法类似，截取长度为 prefixLength 的子串，再对子串中每个字符的 ASCII 码进行求和得出 sum，然后对 sum 值进行求模运算(sum%patternValue)，可以计算出 prefixLength 长度的字串分片数。

### 按日期分片

#### 按月分片

按月份列分区，每个自然月一个分片。

schema.xml：

```xml
<schema name="db_user" checkSQLschema="true" sqlMaxLimit="100">
  <table name="data_dictionary" type="global" dataNode="db_user_dataNode1,db_user_dataNode2" primaryKey="dataDictionaryID"/>
  <table name ="users" dataNode="db_user_dataNode$1-2" primaryKey="userID" rule="sharding-by-month">
    <childTable name="user_address" joinKey="userID" parentKey="userID" primaryKey="addressID" />
  </table>
</schema>
```

rule.xml：

```xml
<tableRule name="sharding-by-month">
  <rule>
    <columns>create_time</columns>
    <algorithm>sharding-by-month</algorithm>
  </rule>
</tableRule>
<function name="sharding-by-month" class="io.mycat.route.function.PartitionByMonth">
  <property name="dateFormat">yyyy-MM-dd</property>
  <property name="sBeginDate">2014-01-01</property>
</function>
```

**注意：**如果是按月分片的问题，如果插入的月份超过了节点数，则就会插入报错，而且只能插入规则中指定的同一年，比如规则中开始是2014-01-01 那就不能插入2015年。

测试sql：

```sql
INSERT INTO `users`(userID,userName,phoneNum,age,ddID,createTime,lastUpdate) VALUES ('1000', '张1', '13611111111', '31', '2', '2014-01-01 13:39:41', '2018-10-10 13:39:41');
INSERT INTO `users`(userID,userName,phoneNum,age,ddID,createTime,lastUpdate) VALUES ('2000', '王二', '13622222222', '32', '5', '2014-2-10 13:39:41', '2018-10-10 13:39:41');
```

#### 按天分片

```xml
<tableRule name="sharding-by-date">
  <rule>
    <columns>create_time</columns>
    <algorithm>sharding-by-date</algorithm>
  </rule>
</tableRule>
<function name="sharding-by-date" class="io.mycat.route.function.PartitionByDate">
  <property name="dateFormat">yyyy-MM-dd</property>
  <property name="sBeginDate">2014-01-01</property>
  <property name="sEndDate">2015-01-02</property>
  <property name="sPartionDay">10</property>
</function>
```

sPartionDay：分区天数，即默认从开始日期算起，每隔 10 天一个分区。
如果配置了 sEndDate 则代表数据达到了这个日期的分片后，循环再从开始分片插入。

#### 按单月小时拆分

此规则是单月内按照小时拆分，最小粒度是小时，可以一天最多 24 个分片，最少 1 个分片，一个月完后下月从头开始循环。**每个月月尾，需要手工清理数据**。

```xml
<tableRule name="sharding-by-hour">
  <rule>
    <columns>create_time</columns>
    <algorithm>sharding-by-hour</algorithm>
  </rule>
</tableRule>
<function name="sharding-by-hour" class="io.mycat.route.function.LatestMonthPartion">
  <!-- splitOneDay：一天切分的分片数 -->
  <property name="splitOneDay">24</property>
</function>
```

#### 日期范围hash算法

其思想与范围求模一致，由于日期取模方法会出现数据热点问题，所以先根据日期分组，再根据时间 hash 使得短期内数据分布的更均匀。

优点是可以避免扩容时的数据迁移，又可以一定程度上避免范围分片的热点问题，要求日期格式尽量精确些，不然达不到局部均匀的目的。配置如下：

```xml
<tableRule name="rangeDateHash">
  <rule>
    <columns>col_date</columns>
    <algorithm>range-date-hash</algorithm>
  </rule>
</tableRule>
<function name="range-date-hash" class="io.mycat.route.function.PartitionByRangeDateHash">
  <!-- 指定开始日期 -->
  <property name="sBeginDate">2014-01-01 00:00:00</property>
  <!-- 代表多少天一组 -->
  <property name="sPartionDay">3</property>
  <!-- 指定日期格式 -->
  <property name="dateFormat">yyyy-MM-dd HH:mm:ss</property>
  <!-- 每组的分片数量 -->
  <property name="groupPartionSize">6</property>
</function>
```

#### 冷热数据分片

根据日期查询日志数据 冷热数据分布，最近 n 个月的到实时交易库查询，超过 n 个月的按照 m 天分片。

```xml
<tableRule name="sharding-by-date">
  <rule>
    <columns>create_time</columns>
    <algorithm>sharding-by-hotdate</algorithm>
  </rule>
</tableRule>
<function name="sharding-by-hotdate" class="io.mycat.route.function.PartitionByHotDate">
  <property name="dateFormat">yyyy-MM-dd</property>
  <property name="sLastDay">10</property>
  <property name="sPartionDay">30</property>
</function>
```

### 枚举分片

```xml
<tableRule name="sharding-by-intfile">
  <rule>
    <!-- columns 标识将要分片的表字段 -->
    <columns>user_id</columns>
    <!-- algorithm 分片函数 -->
    <algorithm>hash-int</algorithm>
  </rule>
</tableRule>
<function name="hash-int" class="io.mycat.route.function.PartitionByFileMap">
  <!-- mapFile 标识配置文件名称 -->
  <property name="mapFile">partition-hash-int.txt</property>
  <!-- type 默认值为 0，0 表示 Integer，非零表示 String -->
  <property name="type">0</property>
  <!-- 所有的节点配置都是从 0 开始，0 代表节点 1 -->
  <property name="defaultNode">0</property>
</function>
```

partition-hash-int.txt 配置：

```txt
10000=0
10010=1
DEFAULT_NODE=1
```

DEFAULT_NODE < 0 表示不设置默认节点；默认节点的作用：枚举分片时，如果碰到不识别的枚举值，就路由到默认节点；没有默认节点，就会报错！

### 应用指定的算法

此规则是在运行阶段由应用自主决定路由到那个分片。

```xml
<tableRule name="sharding-by-substring">
  <rule>
    <columns>user_id</columns>
    <algorithm>sharding-by-substring</algorithm>
  </rule>
</tableRule>
<function name="sharding-by-substring" class="io.mycat.route.function.PartitionDirectBySubString">
  <!-- zero-based -->
  <property name="startIndex">0</property>
  <property name="size">2</property>
  <property name="partitionCount">8</property>
  <property name="defaultPartition">0</property>
</function>
```

此方法为直接根据字符子串（必须是数字）计算分区号（由应用传递参数，显式指定分区号）。例如 id=05-100000002，其中 id 是从 startIndex=0 开始的，截取 size=2 位数字即 05，05 就是获取的分区。如果没传参数，默认分配到 defaultPartition

### 字符串hash解析算法

此规则是截取字符串中的 int 数值 hash 分片，配置如下：

```xml
<tableRule name="sharding-by-stringhash">
  <rule>
    <columns>user_id</columns>
    <algorithm>sharding-by-stringhash</algorithm>
  </rule>
</tableRule>
<function name="sharding-by-stringhash" class="io.mycat.route.function.PartitionByString">
  <!-- 字符串hash的求模基数 -->
  <property name="length">512</property>
  <!-- 分区数 -->
  <property name="count">2</property>
  <!-- 预算位，即根据子字符串中的 int 值 hash 运算 -->
  <property name="hashSlice">0:2</property>
</function>
```

hashSlice：0 means str.length(), -1 means str.length()-1

```txt
"2" -> (0,2)
"1:2" -> (1,2)
"1:" -> (1,0)
"-1:" -> (-1,0)
":-1" -> (0,-1)
":" -> (0,0)
```

### 一致性hash算法

一致性 hash 预算有效解决了分布式数据的扩容问题。

```xml
<tableRule name="sharding-by-murmur">
  <rule>
    <columns>user_id</columns>
    <algorithm>murmur</algorithm>
  </rule>
</tableRule>
<function name="murmur" class="io.mycat.route.function.PartitionByMurmurHash">
  <!-- 默认是 0-->
  <property name="seed">0</property>
  <!-- 要分片的数据库节点数量，必须指定，否则没法分片-->
  <property name="count">2</property>
  <!-- 一个实际的数据库节点被映射为这么多虚拟节点，默认是 160 倍，也就是虚拟节点数是物理节点数的 160 倍-->
  <property name="virtualBucketTimes">160</property>
  <!--
  <property name="weightMapFile">weightMapFile</property>
  节点的权重，没有指定权重的节点默认是 1。以 properties 文件的格式填写，以从 0 开始到 count-1 的整数值也就是节点索引为 key，以节点权重值为值。所有权重值必须是正整数，否则以 1 代替 
  -->
  <!--
  <property name="bucketMapPath">/etc/mycat/bucketMapPath</property>
  用于测试时观察各物理节点与虚拟节点的分布情况，如果指定了这个属性，会把虚拟节点的 murmur hash 值与物理节点的映射按行输出到这个文件，没有默认值，如果不指定，就不会输出任何东西 
  -->
</function>
```

### 有状态分片算法

有状态分片算法与之前的分片算法不同,它是为数据自动迁移而设计的。直至2018年7月24日为止，现支持有状态算法的分片策略只有 crc32slot 欢迎大家提供更多有状态分片算法。

一个有状态分片算法在使用过程中暂时存在两个操作：

1、一种是初始化

使用 mycat 创建配置带有有状态分片算法的 table 时（推介）或者第一次配置有状态分片算法的 table 并启动 mycat 时，有状态分片算法会根据表的 dataNode 的数量划分分片范围并生成 ruledata 下的文件。这个分片范围规则就是“状态”，一个表对应一个状态，对应一个有状态分片算法实例，以及对应一个满足以下命名规则的文件：算法名字_schema 名字_table 名字.properties

  文件里内容一般具有以下特征：

  ```sh
  8=91016-102399
  7=79639-91015
  6=68262-79638
  5=56885-68261
  4=45508-56884
  3=34131-45507
  2=22754-34130
  1=11377-22753
  0=0-11376
  ```

  行数就是 table 的分片节点数量，每行的“数字-数字”就是分片算法生成的范围，这个范围与具体算法实现有关。一个分片节点可能存在多个范围，这些范围以逗号分隔。一般来说，不要手动更改这个文件，应该使用算法生成范围，而且需要注意的是，物理库上的数据的分片字段的值一定要落在对应范围里。

- 一种是添加操作，即数据扩容。

  添加节点，有状态分片算法根据节点的变化，重新分配范围规则，之后执行数据自动迁移任务。

#### crc32slot 分片算法

crc32solt 是有状态分片算法的实现之一：crc32(key)%102400=slot

slot 按照范围均匀分布在 dataNode 上，针对每张表进行实例化，通过一个文件记录 slot 和节点映射关系，迁移过程中通过 zk 协调。

其中需要在分片表中增加 slot 字段，用以避免迁移时重新计算，只需要迁移对应 slot 数据即可。

分片最大个数为 102400 个，短期内应该够用，每分片一千万，总共可以支持一万亿数据。

配置说明：

```xml
<table name="travelrecord" dataNode="dn1,dn2" rule="crc32slot" />
```

使用 mycat 配置完表后使用 mycat 创建表

```sql
USE TESTDB;
CREATE TABLE `travelrecord` (
  id xxxx
  xxxxxxx
) ENGINE=INNODB DEFAULT CHARSET=utf8;
```

### 权限控制

**远程连接配置（读、写权限）**

目前 Mycat 对于中间件的连接控制并没有做太复杂的控制，目前只做了中间件逻辑库级别的读写权限控制。

```xml
<user name="mycat">
  <property name="password">mycat</property>
  <property name="schemas">order</property>
  <property name="readOnly">true</property>
</user>
<user name="mycat2">
  <property name="password">mycat</property>
  <property name="schemas">order</property>
</user>
```

配置说明：

- name 是应用连接中间件逻辑库的用户名。
- password 是应用连接中间件逻辑库的密码。
- order 是应用当前连接的逻辑库中所对应的逻辑表。
- schemas 中可以配置一个或多个。
- readOnly 是应用连接中间件逻辑库所具有的权限。true 为只读，false 为读写都有，默认为 false。

### 多租户支持

单租户就是传统的给每个租户独立部署一套 web + db。由于租户越来越多，整个 web 部分的机器和运维成本都非常高，因此需要改进到所有租户共享一套 web 的模式（db 部分暂不改变）。

基于此需求，我们对单租户的程序做了简单的改造实现 web 多租户共享。具体改造如下：

1、web 部分修改：

- a. 在用户登录时，在线程变量(ThreadLocal)中记录租户的 id
- b. 修改 jdbc 的实现：在提交 sql 时，从 ThreadLocal 中获取租户 id，添加 sql 注释，把租户的 schema 放到注释中。例如：`/*!mycat : schema = test_01 */`

2、在 db 前面建立 proxy 层，代理所有 web 过来的数据库请求。proxy 层是用 mycat 实现的，web 提交的 sql 过来时在注释中指定 schema, proxy 层根据指定的 schema 转发 sql 请求。

3、Mycat 配置：

```xml
<user name="mycat">
  <property name="password">mycat</property>
  <property name="schemas">order</property>
  <property name="readOnly">true</property>
</user>
<user name="mycat2">
  <property name="password">mycat</property>
  <property name="schemas">order</property>
</user>
```

## 分库分表案例

**1、字符串hash求模范围算法示例**

schema.xml：

```xml
<schema>
  <!-- 消息 -->
  <table name ="BIZ_MESSAGE" primaryKey="ID" rule="sharding-by-prefixpattern" dataNode="dn$1-10" />
  <!-- 问题习惯 -->
  <table name="USR_QUESTION_BEHAVIOR" primaryKey="ID" autoIncrement="true" rule="sharding-by-question-behavior" dataNode="dn1,dn2,dn3" />
</schema>
<dataNode name="dn$1-10" dataHost="localhost1" database="lead_pm$1-10" />
```

rule.xml：

```xml
<tableRule name="sharding-by-prefixpattern">
  <rule>
    <!-- 将要分片的表字段 -->
    <columns>ID</columns>
    <!-- 分片函数 -->
    <algorithm>sharding-by-prefixpattern</algorithm>
  </rule>
</tableRule>
<tableRule name="sharding-by-question-behavior">
  <rule>
    <!-- 将要分片的表字段 -->
    <columns>QUESTION_ID</columns>
    <!-- 分片函数 -->
    <algorithm>sharding-by-question-behavior</algorithm>
  </rule>
</tableRule>

<function name="sharding-by-prefixpattern" class="io.mycat.route.function.PartitionByPrefixPattern">
  <!-- 求模基数 -->
  <property name="patternValue">100</property>
  <!-- ASCII截取的位数 -->
  <property name="prefixLength">5</property>
  <!-- 配置文件路径 -->
  <property name="mapFile">partition-pattern.txt</property>
</function>
<function name="sharding-by-question-behavior" class="io.mycat.route.function.PartitionByPrefixPattern">
  <!-- 求模基数 -->
  <property name="patternValue">256</property>
  <!-- ASCII截取的位数 -->
  <property name="prefixLength">32</property>
  <!-- 配置文件路径 -->
  <property name="mapFile">sharding-by-question-behavior.txt</property>
</function>
```

partition-pattern.txt：

```txt
# 10个分片
1-10=0
11-20=1
21-30=2
31-40=3
41-50=4
51-60=5
61-70=6
71-80=7
81-90=8
91-99=9
0-0=9
```

sharding-by-question-behavior.txt：

```txt
# 3个分片
0-85=0
86-170=1
171-255=2
```

**2、固定分片hash算法示例**

schemal.xml

```xml
<table name="BIZ_DOCUMENT_USER" primaryKey="ID" autoIncrement="true" rule="partition-by-long" dataNode="dn1,dn2,dn3" />
```

rule.xml

```xml
<tableRule name="partition-by-long">
  <rule>
    <!-- 将要分片的表字段 -->
    <columns>ID</columns>
    <!-- 分片函数 -->
    <algorithm>partition-by-long</algorithm>
  </rule>
</tableRule>
<function name="partition-by-long" class="io.mycat.route.function.PartitionByLong">
  <!-- partitionCount 分片个数列表 -->
  <property name="partitionCount">2,1</property>
  <!-- partitionLength 分片范围列表 -->
  <property name="partitionLength">341,342</property>
</function>
```

**3、分片后查询语句注意事项**

- 不要用子查询
- 分片join：
- 全局表和分片表join
  - **分片表必须作为join的主表**，否则分片数据获取不全（作为副表是，只能取到一个分片的）
  - right join 和 union 会把全局表数据重复N次（N = 分片数量），所以必须 group by（mysql的非分组字段不使用聚合函数也能查询出来，sqlserver不行）













