# 安装

本人表面上是一枚IT技术男，现特将各种常用工具的安装方法汇总于此，便于今后查阅，文章内容不定时更新！

## 目录

1. 开发工具
   - .NET
   - Java
   - python
   - 分布式中间件
     - 缓存
       - [Memcached](#Memcached)
       - [Redis](#Redis)
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
