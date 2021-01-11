# Zookeeper

1. 简介
   - [为什么需要Zookeeper](#为什么需要Zookeeper)
   - [Zookeeper是什么](#Zookeeper是什么)
2. [实战](#实战)
   - [安装](#安装)
3. 总结
4. 练习

## 简介

### 为什么需要Zookeeper

很多中间件，比如Kafka、Hadoop、HBase，都用到了 Zookeeper，于是很多人就会去了解这个 Zookeeper 到底是什么，为什么它在分布式系统里有着如此无可替代的地位。

在踩了很多坑之后，我决定来回答下这个问题。

**其实学任何一项技术，首先都要弄明白，为什么需要这项技术。**

**正经点来回答，就是我们需要一个用起来像单机但是又比单机更可靠的东西。**

下面开始不正经的回答。

一个团队里面，需要一个leader，leader是干嘛用的？管理什么的咱不说，就说如果外面的人，想问关于这个团队的一切事情，首先就会去找这个leader，因为他知道的最多，而且他的回答最靠谱。

比如产品经理小饼过来要人，作为leader，老吕发现小耀最近没有项目安排，于是把小耀安排给了小饼的项目；

过了一会，另一个产品小西也过来要人，老吕发现刚刚把小耀安排走了，已经没人，于是就跟小西说，人都被你们产品要走了，你们产品自己去协调去。

如果老吕这时候忘了小耀已经被安排走了，把小耀也分配给小西，那到时两个产品就要打架了。

这就是leader在团队里的**协调作用**。

同样的，在分布式系统中，也需要这样的协调者，来回答系统下各个节点的提问。

比如我们搭建了一个数据库集群，里面有一个Master，多个Slave，Master负责写，Slave只读，我们需要一个系统，来告诉客户端，哪个是Master。

有人说，很简单，我们把这个信息写到一个Java服务器的内存就好了，用一个map，key:master，value:master机器对应的ip

但是别忘了，这是个单机，一旦这个机器挂了，就完蛋了，客户端将无法知道到底哪个是Master。

于是开始进行拓展，拓展成三台服务器的集群。

这下问题来了，如果我在其中一台机器修改了Master的ip，数据还没同步到其他两台，这时候客户端过来查询，如果查询走的是另外两台还没有同步到的机器，就会拿到旧的数据，往已经不是master的机器写数据。

所以我们需要这个存储master信息的服务器集群，做到当信息还没同步完成时，不对外提供服务，阻塞住查询请求，等待信息同步完成，再给查询请求返回信息。

这样一来，请求就会变慢，变慢的时间取决于什么时候这个集群认为数据同步完成了。

假设这个数据同步时间无限短，比如是1微妙，可以忽略不计，那么其实这个分布式系统，就和我们之前单机的系统一样，既可以保证数据的一致，又让外界感知不到请求阻塞，同时，又不会有SPOF（Single Point of Failure）的风险，即不会因为一台机器的宕机，导致整个系统不可用。

**这样的系统，就叫分布式协调系统。谁能把这个数据同步的时间压缩的更短，谁的请求响应就更快，谁就更出色，Zookeeper就是其中的佼佼者。**

**它用起来像单机一样，能够提供数据强一致性，但是其实背后是多台机器构成的集群，不会有SPOF。**

其实就是CAP理论中，满足CP，不满足A的那类分布式系统。

如果把各个节点比作各种小动物，那协调者，就是动物园管理员，这也就是Zookeeper名称的由来了，从名字就可以看出来它的雄心勃勃。

讲完了上面这些，现在再来看官网这句话，就很能理解了：

>ZooKeeper: A Distributed Coordination Service for Distributed Applications

当然还有这句：

>ZooKeeper: Because Coordinating Distributed Systems ia a Zoo

而以往的很多ZK教程，上来就是 **Zookeeper是开源的分布式应用协调系统**，很多小年轻看到就会很费解，到底什么是分布式协调，为什么分布式就需要协调 …

上面只是回答了“为什么需要Zookeeper”，或者说，“为什么需要分布式协调系统”，如果想进一步学习 ZK，你还需要了解下 Zookeeper 的内部实现原理。

比如 ZK 的宏观结构：

![x](http://121.196.182.26:6100/public/images/zk01.jpg)

到 ZK 的微观：

![x](http://121.196.182.26:6100/public/images/zk02.jpg)

再到 ZK 是如何实现高性能的强一致的，即ZAB协议的原理，很多教程上来就开始介绍ZAB协议，很容易让人一头雾水，不知道为什么需要这样一个分布式一致性协议，有了上述介绍的背景，就好懂许多。

当然你还可以比较一下最近几年很火的 etcd 跟 ZK 的差别。

最后推荐两份 ZK 的学习资源：

- [ZK官网](https://link.zhihu.com/?target=https%3A//zookeeper.apache.org/doc/r3.5.5/zookeeperOver.html)
- 《从 Paxos 到 Zookeeper》

当然，想做分布式协调服务，不一定需要ZK这种CP的中间件，用AP也可以。而到底是用AP还是CP，是由业务决定的。

比如你是一个文件上传的服务器，用户可能上传几个g的文件，那么如果用一个AP的系统，拿到的可能是不可用的节点，这样返回给客户端重试，客户端肯定得疯掉，这时候就需要用CP。

而像 rpc 调用，调用失败了重试就好，成本代价都不大，这时候，用AP可能会更合适。

### Zookeeper是什么

官方文档上这么解释zookeeper，它是一个分布式服务框架，是Apache Hadoop 的一个子项目，它主要是用来解决分布式应用中经常遇到的一些数据管理问题，如：统一命名服务、状态同步服务、集群管理、分布式应用配置项的管理等。

上面的解释有点抽象，简单来说 **zookeeper=文件系统+监听通知机制**。

1、 文件系统

Zookeeper维护一个类似文件系统的数据结构：

![x](http://121.196.182.26:6100/public/images/zk03.png)

每个子目录项如 NameService 都被称作为 znode（目录节点），和文件系统一样，我们能够自由的增加、删除znode，在一个znode下增加、删除子znode，唯一的不同在于znode是可以存储数据的。

有四种类型的znode：

1. PERSISTENT-持久化目录节点

   客户端与zookeeper断开连接后，该节点依旧存在

2. PERSISTENT_SEQUENTIAL-持久化顺序编号目录节点

   客户端与zookeeper断开连接后，该节点依旧存在，只是Zookeeper给该节点名称进行顺序编号

3. EPHEMERAL-临时目录节点

   客户端与zookeeper断开连接后，该节点被删除

4. EPHEMERAL_SEQUENTIAL-临时顺序编号目录节点

   客户端与zookeeper断开连接后，该节点被删除，只是Zookeeper给该节点名称进行顺序编号

2、监听通知机制

客户端注册监听它关心的目录节点，当目录节点发生变化（数据改变、被删除、子目录节点增加删除）时，zookeeper会通知客户端。

就这么简单，下面我们看看Zookeeper能做点什么呢？

**Zookeeper能做什么**

zookeeper功能非常强大，可以实现诸如分布式应用配置管理、统一命名服务、状态同步服务、集群管理等功能。

## 实战

### 安装

我们这里拿比较简单的分布式应用配置管理为例来说明。

假设我们的程序是分布式部署在多台机器上，如果我们要改变程序的配置文件，需要逐台机器去修改，非常麻烦，现在把这些配置全部放到zookeeper上去，保存在 zookeeper 的某个目录节点中，然后所有相关应用程序对这个目录节点进行监听，一旦配置信息发生变化，每个应用程序就会收到 zookeeper 的通知，然后从 zookeeper 获取新的配置信息应用到系统中。

![x](http://121.196.182.26:6100/public/images/zk04.png)

接下来，我们马上来学习下zookeeper的安装及使用，并开发一个小程序来实现zookeeper这个分布式配置管理的功能。

#### 单机模式安装

1、配置JAVA环境，检验环境：`java -version`

2、下载并解压zookeeper

```sh
cd /usr/local
wget http://mirror.bit.edu.cn/apache/zookeeper/stable/zookeeper-3.4.12.tar.gz
tar -zxvf zookeeper-3.4.12.tar.gz
cd zookeeper-3.4.12
```

3、重命名配置文件zoo_sample.cfg

```sh
cp conf/zoo_sample.cfg conf/zoo.cfg
```

4、启动zookeeper

```sh
bin/zkServer.sh start
```

5、检测是否成功启动，用zookeeper客户端连接下服务端

```sh
bin/zkCli.sh
```

#### Zookeeper使用

```sh
# 1、查看当前 ZooKeeper 中所包含的内容
ls /
# 2、创建一个新的 znode
create /zkPro myData
# 3、查看现在 zookeeper 中所包含的内容
ls /
# 4、运行 get 命令来确认第二步中所创建的 znode 是否包含我们所创建的字符串：
get /zkPro myData
# 5、通过 set 命令来对 zk 所关联的字符串进行设置：
set /zkPro myData123
# 将刚才创建的 znode 删除
delete /zkPro
```

**使用Java API操作zookeeper**

1、引用包：

```xml
<dependency>
  <groupId>org.apache.zookeeper</groupId>
  <artifactId>zookeeper</artifactId>
  <version>3.4.12</version>
</dependency>
```

2、在zookeeper里增加一个目录节点，并且把配置信息存储在里面

```sh
create /username Colin
```

3、启动两个zookeeper客户端程序，代码如下所示

```java
import java.util.concurrent.CountDownLatch;
import org.apache.zookeeper.WatchedEvent;
import org.apache.zookeeper.Watcher;
import org.apache.zookeeper.Watcher.Event.EventType;
import org.apache.zookeeper.Watcher.Event.KeeperState;
import org.apache.zookeeper.ZooKeeper;
import org.apache.zookeeper.data.Stat;

/**
 * 分布式配置中心demo
 * @author Colin
 * @date   2020-06-15
 */
public class ZooKeeperProSync implements Watcher {
    private static CountDownLatch connectedSemaphore = new CountDownLatch(1);
    private static ZooKeeper zk = null;
    private static Stat stat = new Stat();

    public static void main(String[] args) throws Exception {
        //zookeeper配置数据存放路径
        String path = "/username";
        //连接zookeeper并且注册一个默认的监听器
        zk = new ZooKeeper("192.168.31.100:2181", 5000, //
                new ZooKeeperProSync());
        //等待zk连接成功的通知
        connectedSemaphore.await();
        //获取path目录节点的配置数据，并注册默认的监听器
        System.out.println(new String(zk.getData(path, true, stat)));

        Thread.sleep(Integer.MAX_VALUE);
    }

    public void process(WatchedEvent event) {
        if (KeeperState.SyncConnected == event.getState()) {  //zk连接成功通知事件
            if (EventType.None == event.getType() && null == event.getPath()) {
                connectedSemaphore.countDown();
            } else if (event.getType() == EventType.NodeDataChanged) {  //zk目录节点数据变化通知事件
                try {
                    System.out.println("配置已修改，新值为：" + new String(zk.getData(event.getPath(), true, stat)));
                } catch (Exception e) {
                }
            }
        }
    }
}
```

两个程序启动后都正确的读取到了zookeeper的/username目录节点下的数据'Colin'

4、我们在zookeeper里修改下目录节点/username下的数据

```sh
set /username dragon
```

修改完成后，我们看见两个程序后台都及时收到了他们监听的目录节点数据变更后的值。

#### 集群模式安装

本例搭建的是伪集群模式，即一台机器上启动三个zookeeper实例组成集群，真正的集群模式无非就是实例IP地址不同，搭建方法没有区别。

从单机模式第3步开始：

3、重命名 zoo_sample.cfg文件

```sh
cp conf/zoo_sample.cfg conf/zoo-1.cfg
```

4、修改配置文件zoo-1.cfg，原配置文件里有的，修改成下面的值，没有的则加上

```sh

vim conf/zoo-1.cfg
----------------------------
dataDir=/tmp/zookeeper-1
clientPort=2181
server.1=127.0.0.1:2888:3888
server.2=127.0.0.1:2889:3889
server.3=127.0.0.1:2890:3890
```

配置说明：

- tickTime：这个时间是作为 Zookeeper 服务器之间或客户端与服务器之间维持心跳的时间间隔，也就是每个 tickTime 时间就会发送一个心跳。
- initLimit：这个配置项是用来配置 Zookeeper 接受客户端（这里所说的客户端不是用户连接 Zookeeper 服务器的客户端，而是 Zookeeper 服务器集群中连接到 Leader 的 Follower 服务器）初始化连接时最长能忍受多少个心跳时间间隔数。当已经超过 10个心跳的时间（也就是 tickTime）长度后 Zookeeper 服务器还没有收到客户端的返回信息，那么表明这个客户端连接失败。总的时间长度就是 10*2000=20 秒
- syncLimit：这个配置项标识 Leader 与 Follower 之间发送消息，请求和应答时间长度，最长不能超过多少个 tickTime 的时间长度，总的时间长度就是 5*2000=10秒
- dataDir：顾名思义就是 Zookeeper 保存数据的目录，默认情况下，Zookeeper 将写数据的日志文件也保存在这个目录里。
- clientPort：这个端口就是客户端连接 Zookeeper 服务器的端口，Zookeeper 会监听这个端口，接受客户端的访问请求。
- server.A=B：C：D：其中 A 是一个数字，表示这个是第几号服务器；B 是这个服务器的 ip 地址；C 表示的是这个服务器与集群中的 Leader 服务器交换信息的端口；D 表示的是万一集群中的 Leader 服务器挂了，需要一个端口来重新进行选举，选出一个新的 Leader，而这个端口就是用来执行选举时服务器相互通信的端口。如果是伪集群的配置方式，由于 B 都是一样，所以不同的 Zookeeper 实例通信端口号不能一样，所以要给它们分配不同的端口号。

5、再从zoo-1.cfg复制两个配置文件zoo-2.cfg和zoo-3.cfg，只需修改dataDir和clientPort不同即可

```sh
cp conf/zoo-1.cfg conf/zoo-2.cfg
cp conf/zoo-1.cfg conf/zoo-3.cfg
vim conf/zoo-2.cfg
--------------------------------
dataDir=/tmp/zookeeper-2
clientPort=2182
--------------------------------
vim conf/zoo-2.cfg
--------------------------------
dataDir=/tmp/zookeeper-3
clientPort=2183
--------------------------------
```

6、标识Server ID

创建三个文件夹/tmp/zookeeper-1，/tmp/zookeeper-2，/tmp/zookeeper-3，在每个目录中创建 myid 文件，写入当前实例的server id，即1.2.3

```sh
cd /tmp/zookeeper-1
vim myid
-------------------
1
-------------------
cd /tmp/zookeeper-2
vim myid
-------------------
2
-------------------
cd /tmp/zookeeper-3
vim myid
-------------------
3
-------------------
```

7、启动三个zookeeper实例

```sh
bin/zkServer.sh start conf/zoo-1.cfg
bin/zkServer.sh start conf/zoo-2.cfg
bin/zkServer.sh start conf/zoo-3.cfg
```

8 、检测集群状态，也可以直接用命令 `zkCli.sh -server IP:PORT` 连接zookeeper服务端检测

```sh
bin/zkServer.sh status conf/zoo-1.cfg
bin/zkServer.sh status conf/zoo-2.cfg
bin/zkServer.sh status conf/zoo-3.cfg
```

至此，我们对zookeeper就算有了一个入门的了解，当然zookeeper远比我们这里描述的功能多，比如用zookeeper实现集群管理，分布式锁，分布式队列，zookeeper集群leader选举等等

推荐阅读：[https://www.roncoo.com/course/view/255bac222b1b4300b42838b58fea3a2e](https://www.roncoo.com/course/view/255bac222b1b4300b42838b58fea3a2e)

文章来源：[https://my.oschina.net/u/3796575/blog/1845035](https://my.oschina.net/u/3796575/blog/1845035)
