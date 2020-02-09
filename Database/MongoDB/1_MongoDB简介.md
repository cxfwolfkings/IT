# MongoDB简介

## 目录

MongoDB是一个NoSQL数据库。 它是一个使用C++编写的开源，跨平台，面向文档的数据库。

MongoDB的官方网站是：[http://www.mongodb.com/](http://www.mongodb.com/)，可以从官方上找到大部分有关数据库的相关资料，如：各种版本的安装包下载，文档，最新的 MongoDB 资讯，社区以及教程等等。

## 安装

### CentOS 7安装 MongoDB

1. 新建目录 /usr/local/software/，执行命令 `curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.2.12.tgz` 下载安装文件；

2. 执行命令解压：`tar -zxvf mongodb-linux-x86_64-3.2.12.tgz`

3. 将解压后文件移动到指定目录：`mv mongodb-linux-x86_64-3.2.12/ /usr/local/mongodb`

4. 接着，执行命令：`mkdir -p /data/db/logs`

5. 执行命令 `cd bin`，新建配置文件 `vim mongodb.conf` 并添加如下内容之后保存：

   ```conf
   dbpath = /data/db #数据文件存放目录
   logpath = /data/db/logs/mongodb.log #日志文件存放目录
   port = 27017  #端口
   fork = true  #以守护程序的方式启用，即在后台运行
   nohttpinterface = true
   auth=false
   bind_ip=0.0.0.0
   ```

6. 修改环境变量：`vi /etc/profile`：

   ```sh
   export MONGODB_HOME=/usr/local/mongodb
   export PATH=$PATH:$MONGODB_HOME/bin
   ```

   保存后，重启系统配置：`source /etc/profile`。

7. 进入目录 /usr/local/mongodb/bin，启动 `mongod -f mongodb.conf`；修复模式：`mongod -f mongodb.conf --repair`

8. 执行命令`./mongo`；

9. 执行命令创建数据库 `use students`，并添加用户：
`db.createUser({user:"root",pwd:"123456",roles:[{role:"readWrite",db:"students"}]})`

### Windows 7安装 MongoDB

1. 默认数据目录：C:\data\db，如果不存在启动失败！
2. 可以创建目录，也可以手动指定数据目录：`mongod --dbpath <dbpath>`
3. 作为服务进行安装：`mongod --install`
