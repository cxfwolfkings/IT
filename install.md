# 安装

## 目录

1. 开发工具
   - .NET
   - Java
   - python
   - 分布式中间件
     - 缓存
       - [Memcached](#Memcached)
       - [Redis](#Redis)
     - 消息队列
       - [ActiveMQ](#ActiveMQ)
       - [RabbitMQ](#RabbitMQ)
       - [RocketMQ](#RocketMQ)
2. 设计工具
   - UML
   - 原型
3. 运维工具
   - 容器
4. 管理工具

## Redis

## Memcached

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

## ActiveMQ

**ActiveMQ 部署环境：**

相较于 Kafka，ActiveMQ 的部署简单很多，支持多个版本的 Windows 和 Unix 系统，此外，ActiveMQ 由 Java 语言开发而成，因此需要 JRE 支持。

**硬件要求：**

- 如果以二进制文件安装，ActiveMQ 5.x 需要 60M 空间。当然，需要额外的磁盘空间来持久化消息；
- 如果下载 ActiveMQ 5.x 源文件，自行编译构建， 则需要 300M 空间。

**操作系统：**

- Windows：支持 Windows XP SP2、Windows 2000、Windows Vista、Windows 7；
- Unix：支持 Ubuntu Linux、Powerdog Linux、MacOS、AIX、HP-UX、Solaris，或者其它任何支持 Java 的 Unix 平台。

**环境要求：**

- Java 运行环境（JRE），版本 1.7 及以上，如果以源码自行编译构建，则还需要安装 JDK；
- 需要为 JRE 配置环境变量，通常命名为 JAVA_HOME；
- 如果以源文件自行编译构建，需安装 Maven 3.0.0 及以上版本，同时，依赖的 JAR 包需要添加到 classpath 中。

## RabbitMQ

RabbitMQ 支持多个版本的 Windows 和 Unix 系统，此外，ActiveMQ 由 Erlang 语言开发而成，因此需要 Erlang 环境支持。某种意义上，RabbitMQ 具有在所有支持 Erlang 的平台上运行的潜力，从嵌入式系统到多核心集群还有基于云端的服务器。

**操作系统：**

- Windows 系列：支持 Windows NT、Windows 2000、Windows XP、Windows Vista、Windows 7、Windows 8，Windows Server 2003/2008/2012、Windows 95、Windows 98；
- Unix 系列：支持 Ubuntu 和其它基于 Debian 的 Linux 发行版，Fedora 和其它基于 RPM 包管理方式的 Linux 发行版，openSUSE 和衍生的发行版，以及 Solaris、BSD、MacOSX 等。

**环境要求：**

- RabbitMQ 采用 Erlang 开发，需要安装 Erlang 环境；
- 不同版本的 JDK 支持的 Erlang 和 RabbitMQ Server 的版本也有所不同，建议采用高版本 JDK，避免兼容性问题。

**RabbitMQ 安装：**

1. 由于RabbitMQ使用Erlang语言编写，所以先[安装Erlang语言运行环境](https://www.cnblogs.com/longlongogo/p/6479424.html)。

   >（1）下载地址：[http://www.erlang.org/downloads](http://www.erlang.org/downloads)。  
   >Erlang(['ə:læŋ])是一种通用的面向并发的编程语言，它由瑞典电信设备制造商爱立信所辖的CS-Lab开发，目的是创造一种可以应对大规模并发活动的编程语言和运行环境。  
   >使用Erlang来编写分布式应用要简单的多，因为它的分布式机制是透明的：对于程序来说并不知道自己是在分布式运行。Erlang运行时环境是一个虚拟机，有点像Java虚拟机，这样代码一经编译，同样可以随处运行。它的运行时系统甚至允许代码在不被中断 的情况下更新。另外如果需要更高效的话，字节代码也可以编译成本地代码运行。  
   >
   >（2）设置环境变量：  
   >手动编辑"path"加入路径，示例：`C:\Program Files\erl8.2\bin`
   >
   >（3）检查Erlang是否安装成功  
   >打开cmd，输入 `erl` 后回车查看信息

2. 下载安装[RabbitMQ](http://www.rabbitmq.com/)

   >使 RabbitMQ 以 Windows Service 的方式在后台运行：打开 cmd 切换到 sbin 目录下执行：

   ```sh
   rabbitmq-service install
   rabbitmq-service enable
   rabbitmq-service start
   ```

   >查看状态：`rabbitmqctl status`  
   >假如显示node没有连接上，需要到C:\Windows目录下，将.erlang.cookie文件，拷贝到用户目录下 C:\Users\{用户名}，这是Erlang的Cookie文件，允许与Erlang进行交互。
   >
   >使用命令查看用户：`rabbitmqctl list_users`  
   >RabbitMQ会为我们创建默认的用户名guest和密码guest，guest默认拥有RabbitMQ的所有权限。
   >
   >一般的，我们需要新建一个我们自己的用户，设置密码，并授予权限，并将其设置为管理员，可以使用下面的命令来执行这一操作：

   ```sh
   rabbitmqctl  add_user  JC JayChou  # 创建用户JC密码为JayChou
   rabbitmqctl  set_permissions  JC ".*"  ".*"  ".*"  # 赋予JC读写所有消息队列的权限
   rabbitmqctl  set_user_tags JC administrator  # 分配用户组

   # 修改JC密码为123：
   rabbitmqctl change_password JC  123
   # 删除用户JC：
   rabbitmqctl delete_user  JC
   # 也可以开启rabbitmq_management插件，在web界面查看和管理RabbitMQ服务
   rabbitmq-plugins enable rabbitmq_management
   ```

   现在，在浏览器中输入 `http://server-name:15672/` server-name换成机器地址或者域名，如果是本地的，直接用localhost（RabbitMQ 3.0之前版本端口号为55672）在输入之后，弹出登录界面，使用我们之前创建的用户登录。在该界面上可以看到当前RabbitMQServer的所有状态。

***CentOS 7 安装 RabbitMQ***

1. 添加 Erlang 源：`vim /etc/yum.repos.d/rabbitmq-erlang.repo`，文件中添加如下内容保存：

   ```ini
   [rabbitmq-erlang]
   name=rabbitmq-erlang
   baseurl=https://dl.bintray.com/rabbitmq/rpm/erlang/20/el/7
   gpgcheck=1
   gpgkey=https://dl.bintray.com/rabbitmq/Keys/rabbitmq-release-signing-key.asc
   repo_gpgcheck=0
   enabled=1
   ```

2. 新建目录：`mkdir /usr/local/software`
3. 下载 RabbitMQ rpm 安装文件：`wget https://dl.bintray.com/rabbitmq/all/rabbitmq-server/3.7.7/rabbitmq-server-3.7.7-1.el7.noarch.rpm`
4. 安装 RabbitMQ Server：`yum install -y rabbitmq-server-3.7.7-1.el7.noarch.rpm`
5. 安装 RabbitMQ Web 管理界面并启动 RabbitMQ Server：

   ```sh
   rabbitmq-plugins enable rabbitmq_management
   systemctl start rabbitmq-server
   ```

6. 由于 RabbitMQ 默认用户 Guest 只能访问安装在 RabbitMQ 本机上的 Web 管理页面，因此当 RabbitMQ 安装在 Linux 服务器上时，需要做如下操作才能在别的机器上访问其 Web管理页面：

   - 添加用户：`rabbitmqctl add_user root 123456`，其中 root 表示新添加用户名，123456 表示登录密码；
   - 赋予用户权限：`rabbitmqctl set_permissions -p "/" root '.*' '.*' '.*'`；
   - 赋予用户角色：`rabbitmqctl set_user_tags root administrator`；
   - 查看 RabbitMQ 用户：`rabbitmqctl list_users`。

7. 访问：`http://localhost:15672`，得到 RabbitMQ Web 管理页面

   此时，RabbitMQ 已经安装成功。

## RocketMQ

**RocketMQ 部署环境：**

操作系统：

- 推荐使用 64 位操作系统，包括 Linux、Unix 和 Mac OX。

安装环境：

- JDK：RocketMQ 基于 Java 语言开发，需 JDK 支持，版本 64bit JDK 1.8 及以上；
- Maven：编译构建需要 Maven 支持，版本 3.2.x 及以上。
