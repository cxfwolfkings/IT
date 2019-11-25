# 中间件

## 目录

1. 简介
  - [项目相关](#项目相关)

## 项目相关

项目整体目录结构：

```txt
ssm-demo                                ——项目名称
     ├── src/main/java                  ——Java 源码根目录
            ├── controller              ——控制层目录
            ├── dao                     ——dao层目录
            ├── entity                  ——实体层目录
            ├── service                 ——业务层目录
                └── impl                ——业务实现类目录
            └── utiles                  ——工具类目录
     ├── src/main/resources             ——配置文件根目录
            └── mappers                 ——mapper文件目录
     ├── src/main/webapp                ——网站 Web 资源
     └── pom.xml                        ——pom文件
``````
项目构建：`mvn clean package`


## RPC框架

### Netty

netty版本大致版本分为  netty3.x  和  netty4.x、netty5.x

netty可以运用在那些领域？

1. 分布式进程通信
例如: hadoop、dubbo、akka等具有分布式功能的框架，底层RPC通信都是基于netty实现的，这些框架使用的版本通常都还在用netty3.x

2. 游戏服务器开发
最新的游戏服务器有部分公司可能已经开始采用netty4.x 或 netty5.x
