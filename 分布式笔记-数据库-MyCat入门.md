# 目录

1. [环境准备](#环境准备)
2. [服务安装与配置](#服务安装与配置)
3. [服务启动与启动设置](#服务启动与启动设置)
4. [配置详解](#配置详解)
   - [全局序列号](#全局序列号)
   - [连接Oracle](#连接Oracle)
   - [连接MongoDB](#连接MongoDB)

MyCAT是使用JAVA语言进行编写开发，使用前需要先安装JAVA运行环境(JRE)，由于MyCAT中使用了JDK7中的一些特性，所以要求必须在JDK7以上的版本上运行。

参考：[Mycat catlet跨库JOIN与全局JOIN](https://blog.csdn.net/boonya/article/details/73200994)

## 环境准备

1、[JDK](http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html)下载。注意：必须JDK7或更高版本.

2、[MySQL](http://dev.mysql.com/downloads/mysql/5.5.html#downloads)下载。MyCAT支持多种数据库接入，如：MySQL、SQLServer、Oracle、MongoDB等，推荐使用MySQL做集群。

3、MyCAT项目[主页](https://github.com/MyCATApache/)。MyCAT相关源码、文档都可以在此地址下进行下载。

**环境安装与配置**

如果是第一次刚接触MyCAT，建议先下载MyCAT-Server源码到本地，通过Eclipse等工具进行配置和运行，便于深入了解和调试程序运行逻辑。

1、MyCAT-Server源码下载

由于MyCAT源码目前主要托管在github上，需要先在本地安装和配置好相关环境。MyCAT-Server仓库地址：[https://github.com/MyCATApache/Mycat-Server.git](https://github.com/MyCATApache/Mycat-Server.git)

2、源码调试与配置

MyCAT目前主要通过配置文件的方式来定义逻辑库和相关配置：

- MYCAT_HOME/conf/schema.xml中定义逻辑库，表、分片节点等内容
- MYCAT_HOME/conf/rule.xml中定义分片规则
- MYCAT_HOME/conf/server.xml中定义用户以及系统相关变量，如端口等

3、源码运行

MyCAT入口程序是org.opencloudb.MycatStartup.java，右键run as出现下面的界面，需要设置MYCAT_HOME目录：你工程当前所在的目录(src/main)：

![x](http://wxdhhg.cn/wordpress/wp-content/uploads/2020/04/1.png)

设置完MYCAT主目录后即可正常运行MyCAT服务。

注：若启动报错，DirectBuffer内存不够，则可以再加JVM系统参数：XX:MaxDirectMemorySize=128M

**快速镜像方式体验MyCAT**

此方式通过将已经安装和配置好的MySQL+MyCAT做成镜像，可实现快速运行和体验MyCAT服务。镜像文件及快速运行体验文档下载地址：[http://pan.baidu.com/s/1o61EXaa](http://pan.baidu.com/s/1o61EXaa)

## 服务安装与配置

MyCAT有提供编译好的安装包，支持windows、Linux、Mac、Solaris等系统上安装与运行。

linux下可以下载Mycat-server-xxxxx.linux.tar.gz 解压在某个目录下，注意目录不能有空格，在Linux(Unix)下，建议放在usr/local/Mycat目录下

修改MyCAT用户密码（仅供参考）：password for user Mycat

目录解释如下：

- bin 程序目录，存放了window版本和linux版本，除了提供封装成服务的版本之外，也提供了nowrap的shell脚本命令，方便大家选择和修改，进入到bin目录：Linux下运行：`./mycat console`, 首先要`chmod +x *`；Windows下运行：`mycat.bat console` 在控制台启动程序，也可以装载成服务，若此程序运行有问题，也可以运行startup_nowrap.bat，确保java命令可以在命令执行。

  注：mycat支持的命令 { console | start | stop | restart | status | dump }

- conf目录下存放配置文件，server.xml是Mycat服务器参数调整和用户授权的配置文件，schema.xml是逻辑库定义和表以及分片定义的配置文件，rule.xml是分片规则的配置文件，分片规则的具体一些参数信息单独存放为文件，也在这个目录下，配置文件修改，需要重启Mycat或者通过9066端口reload

- lib目录下主要存放mycat依赖的一些jar文件

- 日志存放在logs/mycat.log中，每天一个文件，日志的配置是在conf/log4j.xml中，根据自己的需要，可以调整输出级别为debug，debug级别下，会输出更多的信息，方便排查问题.

  注意：Linux下部署安装MySQL，默认不忽略表名大小写，需要手动到/etc/my.cnf 下配置 lower_case_table_names=1 使Linux环境下MySQL忽略表名大小写，否则使用MyCAT的时候会提示找不到表的错误！

Windows下将MyCAT做成系统服务：MyCAT提供warp方式的命令，可以将MyCAT安装成系统服务并可启动和停止。

- 进入bin目录下执行命令 `mycat install` 执行安装mycat服务
- 输入 `mycat start` 启动mycat服务

## 服务启动与启动设置

MyCAT在Linux中部署启动时，首先需要在Linux系统的环境变量中配置MYCAT_HOME，操作方式如下：

1) `vi /etc/profile`, 在系统环境变量文件中增加 `MYCAT_HOME=/usr/local/Mycat`

2) 执行 `source /etc/profile` 命令，使环境变量生效。

如果是在多台 Linux 系统中组建的 MyCAT 集群，那需要在 MyCAT Server 所在的服务器上配置对其他 ip 和主机名的映射，配置方式如下：`vi /etc/hosts`

例如：我有4台机器，配置如下：

| IP            | 主机名       |
| ------------- | ------------ |
| 192.168.100.2 | sam_server_1 |
| 192.168.100.3 | sam_server_2 |
| 192.168.100.4 | sam_server_3 |
| 192.168.100.5 | sam_server_4 |

编辑完后，保存文件。

经过以上两个步骤的配置，就可以到/usr/local/Mycat/bin 目录下执行：`./mycat start` 即可启动mycat服务！

MyCAT 在 windows 中部署时，建议放在某个盘符的根目录下，如果不是在根目录下，请尽量不要放在包含中文的目录下，如：D:\Mycat-server-1.4-win\

**命令行方式启动：**

从 cmd 中执行命令到达 D:\Mycat-server-1.4-win\bin 目录下，执行 `startup_nowrap.bat` 即可启动 MyCAT 服务。

注：执行此命令时，需要确保 windows 系统中已经配置好了 JAVA 的环境变量，并可执行 java 命令。jdk版本必须是1.7及以上版本。

**服务方式启动：**

从 cmd 中执行命令到达 D:\Mycat-server-1.4-win\bin 目录下，执行：

```sh
mycat install # 表示执行安装MyCAT服务
mycat remove # 表示执行卸载MyCAT服务
```

服务安装完后，就可以通过 windows 系统服务对 MyCAT 进行启动和停止了。

**demo使用**

springMVC+ibatis+FreeMarker 连接 mycat 示例：[http://pan.baidu.com/s/1qWr4AF6](http://pan.baidu.com/s/1qWr4AF6)

## 配置详解

server.xml：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mycat:server SYSTEM "server.dtd">
<mycat:server xmlns:mycat="http://io.mycat/">
  <system>
    <!-- 0为需要密码登陆、1为不需要密码登陆，默认为0，设置为1则需要指定默认账户 -->
    <property name="nonePasswordLogin">0</property>
    <property name="useHandshakeV10">1</property>
    <!-- 1为开启实时统计、0为关闭 -->
    <property name="useSqlStat">0</property>
    <!-- 1为开启全局一致性检测、0为关闭 -->
    <property name="useGlobleTableCheck">0</property>
    <!-- SQL 执行超时 单位:秒-->
    <property name="sqlExecuteTimeout">300</property>
    <property name="sequnceHandlerType">1</property>
    <!--<property name="sequnceHandlerPattern">(?:(\s*next\s+value\s+for\s*MYCATSEQ_(\w+))(,|\)|\s)*)+</property>-->
    <!--必须带有MYCATSEQ_或者 mycatseq_进入序列匹配流程 注意MYCATSEQ_有空格的情况-->
    <property name="sequnceHandlerPattern">(?:(\s*next\s+value\s+for\s*MYCATSEQ_(\w+))(,|\)|\s)*)+
    </property>
    <!-- 子查询中存在关联查询的情况下，检查关联字段中是否有分片字段。默认 false -->
    <property name="subqueryRelationshipCheck">false</property>
    <!--1为开启mysql压缩协议 -->
    <!-- <property name="useCompression">1</property>-->
    <!--设置模拟的MySQL版本号-->
    <!-- <property name="fakeMySQLVersion">5.6.20</property> -->
    <!-- <property name="processorBufferChunk">40960</property> -->
    <!--
    <property name="processors">1</property>
    <property name="processorExecutor">32</property>
    -->
    <!-- 默认为type 0: DirectByteBufferPool | type 1 ByteBufferArena | type 2 NettyBufferPool -->
    <property name="processorBufferPoolType">0</property>
    <!-- 默认是65535 64K 用于sql解析时最大文本长度 -->
    <!--
    <property name="maxStringLiteralLength">65535</property> -->
    <!-- <property name="sequnceHandlerType">0</property> -->
    <!--<property name="backSocketNoDelay">1</property>-->
    <!--<property name="frontSocketNoDelay">1</property>-->
    <!--<property name="processorExecutor">16</property>-->
    <!--
    <property name="serverPort">8066</property>
    <property name="managerPort">9066</property>
    <property name="idleTimeout">300000</property>
    <property name="bindIp">0.0.0.0</property>
    <property name="dataNodeIdleCheckPeriod">300000</property> 5 * 60 * 1000L; //连接空闲检查
    <property name="frontWriteQueueSize">4096</property>
    <property name="processors">32</property>
    -->
    <!-- 分布式事务开关，0为不过滤分布式事务，1为过滤分布式事务（如果分布式事务内只涉及全局表，则不过滤），2为不过滤分布式事务，但是记录分布式事务日志 -->
    <property name="handleDistributedTransactions">0</property>
    <!-- off heap for merge/order/group/limit 1开启 0关闭 -->
    <property name="useOffHeapForMerge">0</property>
    <!-- 单位为m -->
    <property name="memoryPageSize">64k</property>
    <!-- 单位为k -->
    <property name="spillsFileBufferSize">1k</property>
    <property name="useStreamOutput">0</property>
    <!-- 单位为m -->
    <property name="systemReserveMemorySize">384m</property>
    <!-- 是否采用zookeeper协调切换 -->
    <property name="useZKSwitch">false</property>
    <!-- XA Recovery Log日志路径 -->
    <!--<property name="XARecoveryLogBaseDir">./</property>-->
    <!-- XA Recovery Log日志名称 -->
    <!--<property name="XARecoveryLogBaseName">tmlog</property>-->
    <!--如果为 true的话，严格遵守隔离级别，不会在仅仅只有select语句的时候在事务中切换连接-->
    <property name="strictTxIsolation">false</property>
    <property name="useZKSwitch">true</property>
  </system>
  <!-- 全局SQL防火墙设置 -->
  <!--白名单可以使用通配符%或着*-->
  <!--例如<host host="127.0.0.*" user="root"/>-->
  <!--例如<host host="127.0.*" user="root"/>-->
  <!--例如<host host="127.*" user="root"/>-->
  <!--例如<host host="1*7.*" user="root"/>-->
  <!--这些配置情况下对于127.0.0.1都能以root账户登录-->
  <!--
  <firewall>
    <whitehost>
      <host host="1*7.0.0.*" user="root"/>
    </whitehost>
    <blacklist check="false"></blacklist>
  </firewall>
  -->
  <user name="root" defaultAccount="true">
    <property name="password">123456</property>
    <property name="schemas">lead_pm</property>
    <!-- 表级 DML 权限设置 -->
    <!--
    <privileges check="false">
      <schema name="TESTDB" dml="0110">
        <table name="tb01" dml="0000"></table>
        <table name="tb02" dml="1111"></table>
      </schema>
    </privileges>
    -->
  </user>
  <user name="user">
    <property name="password">user</property>
    <property name="schemas">lead_pm</property>
    <property name="readOnly">true</property>
  </user>
</mycat:server>
```

### 全局序列号

**sequnceHandlerType**：

- 0: 本地文件方式
- 1: 数据库方式

插入一条Sequence配置：

```sql
INSERT INTO MYCAT_SEQUENCE(`name`,current_value,increment) VALUES ('bas_account',0,1);
```

指定sequence相关配置在哪个节点上：

sequence_db_conf.properties

```properties
bas_account=dn1
```

注意：MYCAT_SEQUENCE 表和以上的 3 个 function，需要放在同一个节点上。

### 连接Oracle

参考：[http://www.mamicode.com/info-detail-2183303.html](http://www.mamicode.com/info-detail-2183303.html)

### 连接MongoDB

schema.xml:

```xml
<table name="people" primaryKey="_ID" dataNode="dn4" />

<dataNode name="dn4" dataHost="jdbchost1" database="test" />

<!-- dbDriver一定为jdbc，dbType代表数据库类型，可以为mysql,oracle,mongodb。通过配置这个可以支持其他数据库 -->
<dataHost name="jdbchost1" maxCon="1000" minCon="1" balance="0" writeType="0" dbType="mongodb" dbDriver="jdbc">
  <heartbeat>select user()</heartbeat>
  <writeHost host="hostM" url="mongodb://localhost:27017/" user="admin" password="123456" ></writeHost>
</dataHost>  
```
