# Mycat配置

## 目录

1. [本地方式](#本地方式)
   - [server.xml](#server.xml)
   - [schema.xml](#schema.xml)
2. [ZooKeeper方式](#ZooKeeper方式)

Mycat支持两种配置方式（1.5版开始）：

- ZooKeeper：**统一配置和管理**，**与周边组件协调**
- 本地XML：默认

## 本地方式

本地配置文件简单说明：

- schema.xml：管理逻辑库、分片表、分片节点和分片主机等信息
- server.xml：系统参数的配置文件，要掌握Mycat的优化方法，则必须熟悉该文件的配置项
- sequence：全局序列的配置文件
- log4j.xml：Mycat的日志输出配置文件

### server.xml

包含 Mycat 的系统配置信息，对应源码：SystemConfig.java，包含两个重要标签：user、system

#### 1、user标签

```xml
<user name="user"> <!-- 用户名 -->
  <!-- 密码 -->
  <property name="password">user</property>
  <!-- 是否只读，读库 -->
  <property name="readOnly">true</property>
  <!-- 可以访问的schema，没有设置就访问，则报错：Access denied for user ... to database ... -->
  <property name="schemas">testdb,lead_pm</property>
  <!-- 限制前端的整体连接数量，0或不设置则表示不限制 -->
  <property name="benchmark">6000</property>
  <!-- 是否开启加密，0:不开启 1:开启 -->
  <!-- 加密命令：java -cp Mycat-server-1.5.1-RELEASE.jar org.opencloudb.util.DecryptUtil 0:user:password -->
  <property name="usingDecrypt">1</property>
</user>
```

#### 2、system标签

```xml
<system>
  <!-- 配置字符集 -->
  <property name="charset">utf8</property>
  <!-- 1为开启全局表一致性检测、0为关闭 -->
  <property name="useGlobleTableCheck">0</property>
  <!-- 分布式事务开关，0为不过滤分布式事务，1为过滤分布式事务（如果分布式事务内只涉及全局表，则不过滤），2为不过滤分布式事务，但是记录分布式事务日志。主要用于控制是否允许跨库事务 -->
  <property name="handleDistributedTransactions">0</property>
  <!-- 是否启用非堆内存处理跨分片结果集，1:开启 0:关闭 -->
  <property name="useOffHeapForMerge">0</property>
  <!-- 是否采用zookeeper协调切换 -->
  <property name="useZKSwitch">false</property>
</system>
```

### schema.xml

涵盖 Mycat 的逻辑库、表、分片规则、分片节点及数据源

#### 1、schema标签

用于定义 Mycat 实例中的逻辑库

```xml
<schema name="TESTDB" checkSQLschema="false" sqlMaxLimit="100">
  <!-- TESTDB库配置 -->
</schema>
<schema name="lead_pm" checkSQLschema="true" sqlMaxLimit="100" dataNode="dn1">
  <!-- lead_pm库配置 -->
</schema>
```

参数说明：

- dataNode：绑定逻辑库到具体的Database上。内部只能配置分片表（1.3版本以上）
  
  ```xml
  <schema name="lead_pm" checkSQLschema="true" sqlMaxLimit="100" dataNode="dn1">
    <!-- 配置需要分片的表 -->
    <table name="t_user" dataNode="dn2"></table>
  </schema>
  ```

- checkSQLschema：删除SQL语句中的schema字符

  ```sql
  select * from lead_pm.t_user;
  -- Mycat会把lead_pm去掉，再传输给后端
  ```

- sqlMaxLimit：自动在查询语句后加"limit"

#### 2、table标签

定义 Mycat 中的逻辑表

参数说明：

- name：逻辑表名称
- dataNode：定义逻辑表所属分片，如果分片过多，可以使用如下方法减少配置

  ```xml
  <table name="t_log" dataNode="multipleDn$0-99,multipleDn2$100-199" rule="auto-sharding-long" />
  </table>
  <!-- database属性指定真实数据库名称，需要预先建立 -->
  <dataNode name="multipleDn" dataHost="localhost1" database="db$0-99" />
  <dataNode name="multipleDn2" dataHost="localhost1" database="db$0-99" />
  ```

- rule：指定逻辑表要使用的规则的名字，规则名字在 rule.xml 中定义
- ruleRequired：指定表是否绑定分片规则
- primaryKey：逻辑表对应物理表的主键
- type：global代表全局表，其它都是普通表
- autoIncrement：指定该表是否使用自增长主键
- subTables：分表，添加方式：`subTables="t_order$1-2,t_order3"`，dataNode在分表条件下只能配置一个，不支持join
- needAddLimit：是否自动在sql语句中添加"limit"限制

#### 3、childTable标签

用于定义 E-R 分片的子表，通过标签上的属性与父表进行关联。

参数说明：

- name：子表名称
- joinKey：插入子表时使用这个值查找父表存储的数据节点
- parentKey：与父表建立关联关系的列名。
- primaryKey
- needAddLimit

#### 4、dataNode标签

定义了 Mycat 中的数据节点，也就是我们通常所说的数据分片。一个 dataNode 标签就是一个独立的数据分片。

```xml
<dataNode name="dn1" dataHost="localhost1" database="lead_pm1" />
```

参数说明：

- name：数据节点唯一名字
- dataHost：定义该分片所属的数据库实例
- database：定义该分片所属的数据库实例上的具体的库

#### 5、dataHost标签

定义具体的数据库实例、读写分离和心跳语句。

```xml
<dataHost name="localhost1" maxCon="1000" minCon="10" balance="0" writeType="0" dbType="MySQL" dbDriver="native">
  <heartbeat>select user()</heartbeat>
  <!-- 可以有多个写端点 -->
  <writeHost host="hostM1" url="localhost:3306" user="root" password="123456">
    <!-- 可以有多个读端点 -->
    <readHost host="hostS1" url="localhost:3306" user="root" password="123456" />
  </writeHost>
</dataHost>
```

参数说明：

- name：dataHost标识，供上层标签使用
- maxCon：该数据库实例连接池的最大连接数
- minCon：该数据库实例连接池的最小连接数，初始化时的大小
- balance：负载均衡类型
  1. "0"：不开启读写分离机制，所有读操作都发送到当前可用的writeHost上。
  2. "1":
  3. "2"：
  4. "3"：

## ZooKeeper方式

配置方式：

1. 安装ZooKeeper并初始化，执行 Mycat_Home/bin 下的 `init_zk_data.bat` 脚本
2. 打开 conf/zk.conf 文件，设置 `loadfromzk` 参数为 true

   ```conf

   ```
