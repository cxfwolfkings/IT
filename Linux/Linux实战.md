# Linux实战

## 目录

1. 安装与配置
   - [宝塔Linux面板](#宝塔Linux面板)
   - [vim](#vim)
   - [CentOS7安装SFTP](#CentOS7安装SFTP)
   - [jenkins](#jenkins)
2. 常用命令
   - [yum](#yum)
3. [问题](#问题)

## 宝塔Linux面板

官网：[https://www.bt.cn/download/linux.html](https://www.bt.cn/download/linux.html)

安装方法：

- Centos安装脚本：
  
  ```sh
  yum install -y wget && wget -O install.sh http://download.bt.cn/install/install_6.0.sh && sh install.sh
  ```

- Ubuntu/Deepin安装脚本：
  
  ```sh
  wget -O install.sh http://download.bt.cn/install/install-ubuntu_6.0.sh && sudo bash install.sh
  ```

- Debian安装脚本：
  
  ```sh
  wget -O install.sh http://download.bt.cn/install/install-ubuntu_6.0.sh && bash install.sh
  ```

- Fedora安装脚本：
  
  ```sh
  wget -O install.sh http://download.bt.cn/install/install_6.0.sh && bash install.sh
  ```

默认端口：8888

为了提高安全性，当前宝塔新安装的已经开启了安全目录登录，新装机器都会随机一个8位字符的目录名，亦可以在面板设置处修改，如您没记录或不记得了，可以使用以下方式解决：登陆SSH终端输入以下一种命令来解决

1. 查看面板入口：/etc/init.d/bt default
2. 关闭入口验证：rm -f /www/server/panel/data/admin_path.pl

## vim

```sh
yum install -y vim
```

## CentOS7安装SFTP

```sh
# 查看openssh版本，openssh版本必须大于4.8p1
ssh -V
# 创建sftp组
groupadd sftp
# 创建sftp用户
useradd -g sftp -s /sbin/nologin -M sftp
passwd sftp
输入密码
# 建立目录
mkdir -p /data/sftp/mysftp
usermod -d /data/sftp/mysftp sftp

# 修改sshd_config
vim /etc/ssh/sshd_config
# 注释掉
# Subsystem sftp /usr/libexec/openssh/sftp-server
# 添加
Subsystem sftp internal-sftp
Match Group sftp
ChrootDirectory /data/sftp/mysftp
ForceCommand internal-sftp
AllowTcpForwarding no
X11Forwarding no

# 设置Chroot目录权限
chown root:sftp /data/sftp/mysftp
chmod 755 /data/sftp/mysftp

# 设置可以写入的目录
mkdir /data/sftp/mysftp/upload
chown sftp:sftp /data/sftp/mysftp/upload
chmod 755 /data/sftp/mysftp/upload

# 关闭selinux：
vim /etc/selinux/config
# 将文件中的 SELINUX=enforcing 修改为 SELINUX=disabled，然后保存。

# 执行：
setenforce 0
service sshd restart
# 或
systemctl restart sshd.service

# 测试
sftp sftp@127.0.0.1
```

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

## yum

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
