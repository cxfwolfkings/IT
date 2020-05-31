# 目录

1. 简介
2. 实战
   - [安装与配置](#安装与配置)
3. 总结

## 简介

MongoDB是一个NoSQL数据库。它是一个使用C++编写的开源，跨平台，面向文档的数据库。

MongoDB的官方网站是：[http://www.mongodb.com/](http://www.mongodb.com/)，可以从官方上找到大部分有关数据库的相关资料，如：各种版本的安装包下载，文档，最新的 MongoDB 资讯，社区以及教程等等。

## 实战

### 安装与配置

下载地址：[https://www.mongodb.com/download-center/community](https://www.mongodb.com/download-center/community)

windows:

```sh
# 启动（数据库目录默认为C:\data\db，必须存在）
mongod.exe
# 指定数据库目录
mongod.exe --dbpath G:\Arms\mongo
# 安装服务
mongod.exe --dbpath G:\Arms\mongo --install
# 使用配置文件安装服务（管理员权限）
mongod.exe --install -f "G:\Arms\mongodb-win32-x86_64-2012plus-4.2.7\mongo.conf"
# 帮助命令
mongod.exe --help
# 启动服务
net start MongoDB
# 停止服务
net stop MongoDB
# 删除服务
mongod.exe --remove --serviceName "MongoDB"
```

配置文件（不要加引号）：

```ini
dbpath = G:\Arms\mongo\db
logpath = G:\Arms\mongo\log\mongodb.log
logappend = true
directoryperdb = true
serviceName = MongoDB
serviceDisplayName = MongoDB
port = 27017
```

Navicat for MongoDB（图形化管理工具）：

```txt
1. 先不要运行软件，将注册机复制到软件安装目录下运行，点击Patch弹出提示
2. 运行软件，点击Registration注册
3. 选择对应的软件及语言，然后点击Generate生成序列号
4. 选择Manual Activation手动激活
5. 将Request Code复制到注册机中，然后点击Generate生成激活码，复制到软件中激活
6. 软件已经激活成功，可以免费使用了
```
