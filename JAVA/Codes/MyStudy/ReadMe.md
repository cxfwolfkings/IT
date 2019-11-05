# 中间件

## RPC框架

### Netty

netty版本大致版本分为  netty3.x  和  netty4.x、netty5.x

netty可以运用在那些领域？

1. 分布式进程通信
例如: hadoop、dubbo、akka等具有分布式功能的框架，底层RPC通信都是基于netty实现的，这些框架使用的版本通常都还在用netty3.x

2. 游戏服务器开发
最新的游戏服务器有部分公司可能已经开始采用netty4.x 或 netty5.x
