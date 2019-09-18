# 介绍

## 目录

1. [安装](#安装)
2. [MySQL示例](#MySQL示例)
3. [命令](#命令)

## 安装

原文：[https://idig8.com/2018/07/27/docker-chuji-02/](https://idig8.com/2018/07/27/docker-chuji-02/)

**环境介绍：**

操作系统：64bit CentOS7  
docker版本：17.05.0-ce（最新版本）  
版本新功能：[https://github.com/docker/docker/blob/master/CHANGELOG.md](https://github.com/docker/docker/blob/master/CHANGELOG.md)

**安装步骤：**

系统：64位centos7  
迅雷直接下载：[http://mirrors.njupt.edu.cn/centos/7/isos/x86_64/CentOS-7-x86_64-DVD-1708.iso](http://mirrors.njupt.edu.cn/centos/7/isos/x86_64/CentOS-7-x86_64-DVD-1708.iso)  
虚拟机：virtualBox 最好是安装完整版本的centos7。  
要求: 内核版本最低为3.10  
查看当前内核版本：`uname –r`  
要求: 更改网卡配置  
更改网卡配置：`vi/etc/sysconfig/network-scripts/ifcfg-enp0s3`  
`ONBOOT=yes`  
更改完后重启服务：`service network restart`  
注意：如果ifconfig命令不识别的话需要安装：  
`yum install net-tools`

**通过yum方式安装docker：**

1. 更新yum源：`sudo yum update`
2. 增加docker的yum源：  
   输入命令：`vi /etc/yum.repos.d/docker.repo`  
   输入：  

   ```ini
   [dockerrepo]
   name=Docker Repository
   baseurl=https://yum.dockerproject.org/repo/main/centos/7/
   enabled=1
   gpgcheck=1
   gpgkey=https://yum.dockerproject.org/gpg
   ```

   这样我们就添加了yum源  
   可以通过命令：`sudo vi /etc/yum.repos.d/docker.repo`查看
3. 通过yum安装docker  
   `sudo yum install docker-engine`
4. 启动docker服务  
   `sudo service docker start`
5. 查看版本信息，通过测试用例验证docker是否安装成功  
   验证docker版本：`sudo docker version`  
   测试：`sudo docker run hello-world`  

安装完docker后，执行docker相关命令，出现

`"Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/v1.26/images/json: dial unix /var/run/docker.sock: connect: permission denied"`

原因：docker进程使用Unix Socket而不是TCP端口。而默认情况下，Unix socket属于root用户，需要root权限才能访问。

解决方法：docker守护进程启动的时候，会默认赋予名字为docker的用户组读写Unix socket的权限，因此只要创建docker用户组，并将当前用户加入到docker用户组中，那么当前用户就有权限访问Unix socket了，进而也就可以执行docker相关命令

docker配置（docker控制应该有个专门的用户）：

```sh
adduser Colin #添加用户
passwd Colin #更改密码
su Colin #切换用户
#将用户Colin加入sudo files
sudo groupadd docker     #添加docker用户组
sudo gpasswd -a $USER docker     #将登陆用户加入到docker用户组中
newgrp docker     #更新用户组
docker ps    #测试docker命令是否可以使用sudo正常使用
```

验证在不使用sudo的情况下docker是否正常工作：`docker run hello-world`

设置docker开机启动：`sudo chkconfig docker on`

**docker卸载：**

查看安装包：`yum list installed | grep docker`  
移除安装包：`sudo yum -y remove docker-engine.x86_64`
清除所有docker依赖文件：`rm -rf /var/lib/docker`  
删除用户创建的配置文件

## MySQL示例

运行命令：
`docker run --name colin-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=1234 -itd mysql:5.7`

docker run是启动容器的命令；  
--name：指定了容器的名称，方便之后进入容器的命令行  
-itd：其中，i是交互式操作，t是一个终端，d指的是在后台运行  
-p：指在本地生成一个随机端口，用来映射mysql的3306端口  
-e：设置环境变量 `MYSQL_ROOT_PASSWORD=emc123123`：指定了mysql的root密码  
mysql：指运行mysql镜像

进入MySQL容器：`docker exec -it colin-mysql /bin/bash`

进入MySQL：`mysql -uroot -p`

***进行配置，使外部工具可以连接：***

设置root帐号的密码：`update user set authentication_string = password('1234') where user = 'root';`

接着，由于mysql中root执行绑定在了localhost，因此需要对root进行授权

```sql
grant all privileges on *.* to 'root'@'%' identified by '1234' with grant option;
flush privileges;
```

## 命令
