# 目录

## 4、RabbitMQ特点

根据[官方介绍](http://www.rabbitmq.com/#features)，RabbitMQ 是部署最广泛的消息代理，有以下特点：

- 异步消息传递，支持多种消息传递协议、消息队列、传递确认机制，灵活的路由消息到队列，多种交换类型；
- 良好的开发者体验，可在许多操作系统及云环境中运行，并为大多数流行语言提供各种开发工具；
- 可插拔身份认证授权，支持 TLS（Transport Layer Security）和 LDAP（Lightweight Directory Access Protocol）。轻量且容易部署到内部、私有云或公有云中；
- 分布式部署，支持集群模式、跨区域部署，以满足高可用、高吞吐量应用场景；
- 有专门用于管理和监督的 HTTP-API、命令行工具和 UI；
- 支持连续集成、操作度量和集成到其他企业系统的各种工具和插件阵列。可以插件方式灵活地扩展 RabbitMQ 的功能。

综上所述，RabbitMQ 是一个“体系较为完善”的消息代理系统，性能好、安全、可靠、分布式，支持多种语言的客户端，且有专门的运维管理工具。

## 5、RabbitMQ架构

根据官方文档说明，RabbitMQ 的架构图如下所示：

![x](../Resource/RabbitMQ架构.png)

RabbitMQ是一个消息代理。他从消息生产者(producers)那里接收消息，然后把消息送给消息消费者(consumer)。在发送和接受之间，他能够根据设置的规则进行路由，缓存和持久化。

一般提到RabbitMQ和消息，都用到一些专有名词。

## 6、RabbitMQ的基本概念

![x](../Resource/RabbitMQ概念.png)

- Producer/Publisher：消息生产者，主要将消息投递到对应的 Exchange 上面
- Message：消息体，是AMQP所操纵的基本单位，它由Producer产生，经过Broker被Consumer所消费。它的基本结构有两部分: Header和Body。Header是由Producer添加上的各种属性的集合，这些属性有控制Message是否可被缓存，接收的Queue是哪个，优先级是多少等。Body是真正需要传送的数据，它是对Broker不可见的二进制数据流，在传输过程中不应该受到影响
- Connection：连接，一个网络连接，比如TCP/IP套接字连接。Channel是建立在Connection之上的，一个Connection可以建立多个Channel。
- Channel：消息通道，也称信道，多路复用连接中的一条独立的双向数据流通道，为会话提供物理传输介质。Channel是在connection内部建立的逻辑连接，如果应用程序支持多线程，通常每个thread创建单独的channel进行通讯，AMQP method包含了channel id帮助客户端和message broker识别channel，所以channel之间是完全隔离的。Channel作为轻量级的Connection极大减少了操作系统建立TCP connection的开销。在客户端的每个连接里可以建立多个 Channel，每个 Channel 代表一个会话任务
- Broker：AMQP的服务端称为Broker。其实Broker就是接收和分发消息的应用，也就是说RabbitMQ Server就是Message Broker
- Vhost：虚拟主机，一个 Broker 可以有多个虚拟主机，用作不同用户的权限分离一个虚拟主机持有一组 Exchange、Queue 和 Binding
- Exchange：消息交换机；指定消息按照什么规则路由到哪个队列 Queue
- Queue：消息队列，存储消息的载体
- Binding：Exchange 和 Queue 之间的虚拟连接；Binding 中可以包含 RoutingKey，其信息被保存到 Exchange 中的查询表中，作为 Message 的分发依据
- RoutingKey：路由关键字，Exchange 根据 RoutingKey 将消息投递到对应的队列中
- Consumer：消息消费者，消息的接收者，一般是独立的程序

## 7、RabbitMQ的使用流程

1. 建立信息。Publisher定义需要发送消息的结构和内容。
2. 建立Conection和Channel。由Publisher和Consumer创建连接，连接到Broker的物理节点上，同时建立Channel。Channel是建立在Connection之上的，一个Connection可以建立多个Channel。Publisher连接Virtual Host 建立Channel，Consumer连接到相应的Queue上建立Channel。
3. 声明交换机和队列。声明一个消息交换机（Exchange）和队列（Queue），并设置相关属性。
4. 发送消息。由Publisher发送消息到Broker中的Exchange中。
5. 路由转发。RabbitMQ收到消息后，根据​​消息指定的Exchange(交换机) 来查找Binding(绑定) 然后根据规则（Routing Key）分发到不同的Queue。这里就是说使用Routing Key在消息交换机（Exchange）和消息队列（Queue）中建立好绑定关系，然后将消息发送到绑定的队列中去。
6. 消息接收。Consumer监听相应的Queue，一旦Queue中有可以消费的消息，Queue就将消息发送给Consumer端。
7. 消息确认。当Consumer完成某一条消息的处理之后，需要发送一条ACK消息给对应的Queue。

关于消息确认，需要具体来说：

如果消息确认模式不开启的话，队列会在某消息被消费者消费之后（甚至是刚指定完消费者之后）就立即从内存删除该消息，如果是持久化的消息，就从磁盘删除该消息

如果消息确认模式开启的话，有以下几种情况

1. 消费者接收了消息，并且发送了ack确认消息，队列就会删除该消息，并发送下一条消息

2. 消费者接收了消息，没有发送ack确认，并且断开了连接，那么队列将不会删除该消息，如果有其他的channel，就会发送给其他的channel，如果没有，就会等该消费者重新建立连接之后再发送一遍

3. 消费者接收了消息，但是忘记发送ack确认，但是也没有断开连接，那么队列不会删除该消息，也不会重复发送该消息，至于该消息怎么处理，请看[防止消息丢失](#防止消息丢失)一节。

其实当开启了消息确认模式之后，rabbitmq服务端内部的消息分成了两个部分，第一个部分是等待投递给消费者的消息，第二部分是已经投递的消息（但是还没有收到确认的），这部分的消息只有在消费此消息的消费者断开连接之后，才会重新进入队列，等待投递给消费者，不一定是原来的那个。

### 防止消息丢失

**防止消息丢失** 分为 **消息发送确认** 和 **消息消费确认**。

### 4种交换机类型

有4种类型的 Exchange（交换机），即 Direct（直连）、Fanout（扇形）、Topic（主题）、Headers（头），每个实现了不同的路由算法（Routing Algorithm）。

- **Direct Exchange**：完全根据 Key 投递。如果 Routing Key 匹配，Message 就会被传递到相应的 Queue 中。其实在 Queue 创建时，它会自动地以 Queue 的名字作为 Routing Key 来绑定 Exchange。例如，绑定时设置了 Routing Key 为"abc"，那么客户端提交的消息，只有设置了 Key为"abc"的才会投递到队列中。
- **Fanout Exchange**：该类型 Exchange 不需要 Key。它采取广播模式，一个消息进来时，便投递到与该交换机绑定的所有队列中。Fanout Exchange 转发消息是最快的。
- **Topic Exchange**：对 Key 进行模式匹配后再投递。比如符号 "#" 匹配一个或多个词，符号 "." 正好匹配一个词。例如 "abc.#" 匹配"abc.def.ghi"，"abc."只匹配"abc.def"。
