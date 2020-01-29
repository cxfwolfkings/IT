# Memcached介绍

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
