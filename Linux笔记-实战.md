# Linux实战

## 目录

1. 安装与配置
   - [jenkins](#jenkins)
2. 常用命令
   - [关闭防火墙](#关闭防火墙)
3. [问题](#问题)

## jenkins

**什么是Jenkins?**

jenkins是一个广泛用于持续构建的可视化web工具，持续构建说得更直白点，就是各种项目的”自动化”编译、打包、分发部署。jenkins可以很好的支持各种语言（比如：java, c#, php等）的项目构建，也完全兼容ant、maven、gradle等多种第三方构建工具，同时跟svn、git能无缝集成，也支持直接与知名源代码托管网站，比如github、bitbucket直接集成。

jenkins官网地址为[http://jenkins-ci.org/](http://jenkins-ci.org/)，jenkins本身是用java语言开发的，所以安装jenkins的机器至少要有jdk，另外建议git、ant、maven、gradle、groovy等工具也一并安装好，方便与这些构建工具集成。

### Jenkins使用流程

1. 安装

   - 安装java: `sudo yum install -y java`
   - 安装wget: `sudo yum install -y wget`
   - 参考：[http://pkg.jenkins-ci.org/redhat/](http://pkg.jenkins-ci.org/redhat/)，下载jenkins.repo定义源：

     ```sh
     sudo wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins.io/redhat/jenkins.repo
     ```

   - 导入jenkins key：

     ```sh
     sudo rpm –import http://pkg.jenkins.io/redhat/jenkins.io.key
     ```

   - 安装jenkins: `yum install jenkins`

2. 启动jenkins

   ```sh
   sudo service jenkins start
   ```

3. 查看jenkins进程状态

   ```sh
   sudo service jenkins status
   ```

4. 修改配置（选填）

   ```sh
   vi /etc/sysconfig/jenkins
   # 日志目录
   tail -f  /var/log/jenkins/jenkins.log
   ```

5. 访问jenkins服务：[http://localhost:8080](http://localhost:8080)

   >注意：第一次启动的时候访问失败，执行 `service jenkins restart` 重启服务就可以了

## 问题

### find:'/run/user/1000/gvfs':Permission denied解决办法

linux使用命令：`find / -name ***`  查找文件的时候会遇到以下报错

`find: '/run/user/1000/gvfs': Permission denied`

明明用的是root用户，为什么权限不足呢？

官方说这是一个bug——bug#615848。原因是FUSE文件系统和权限不配的问题，全局搜索时碰到它就会退出报错。

其实这个目录是空的，查不查都没关系。所以，以下解决方式比较简直暴

```sh
umount /run/user/1000/gvfs
rm -rf /run/user/1000/gvfs
```

现在，你再使用命令：`find / -name ***` 查找东西是不是就爽多了。

再给一条命令简直暴一下

一次删除所有目录的目标文件或文件夹：

`find / -name ***|xargs rm -rf//***` 为你要删除的文件或文件夹

相信这个命令在你要彻底卸载某个程序的时候会有帮助。
