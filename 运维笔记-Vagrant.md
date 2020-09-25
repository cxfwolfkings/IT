# Vagrant

1. 理论
2. 实战
   - [安装](#安装)
3. 总结



## 理论

Vagrant是一个基于Ruby的工具，用于创建和部署虚拟化开发环境。它的主要意义是让所有开发人员都使用和线上服务器一样的环境，本质上和你新建一个虚拟机。

下载：[vagrant](https://www.vagrantup.com/) 打开官网



## 实战



### 安装

安装centos7的镜像Vagrant：

```sh
# 创建目录vagrant
mkdir vagrant
# 进入目录
cd vagrant
# 创建目录centos
mkdir centos
# 进入目录
cd centos
# 创建centos7的`Vagrantfile`文件
vagrant init centos/7

# 安装虚拟机，下载真心很慢
vagrant up

# vagrant 命令
# 重启
vagrant reload [vm-name]
# 关机
vagrant halt [vm-name]
# 销毁虚拟机
vagrant destroy [vm-name]
# ssh登录虚拟机
vagrant ssh [vm-name]
```

虽然可以在 window 和 mac 下直接安装 docker 来进行学习，但是对于实际的环境来说虚拟机的方式可以减轻电脑的硬盘负担，也更容易来删除方便控制。

**使用Vagrant打造跨平台开发环境**

原文：https://segmentfault.com/a/1190000000264347

[Vagrant](http://vagrantup.com/) 是一款用来构建虚拟开发环境的工具，非常适合 php/python/ruby/java这类语言开发 web 应用，“代码在我机子上运行没有问题”这种说辞将成为历史。

我们可以通过 Vagrant 封装一个 Linux 的开发环境，分发给团队成员。成员可以在自己喜欢的桌面系统(Mac/Windows/Linux)上开发程序，代码却能统一在封装好的环境里运行，非常霸气。安装步骤如下：

**1. 安装 VirtualBox**

虚拟机还是得依靠 VirtualBox 来搭建，免费小巧。下载地址：[https://www.virtualbox.org/wi...](https://www.virtualbox.org/wiki/Downloads)

**提示：**虽然 Vagrant 也支持 VMware，不过 VMware 是收费的，对应的 Vagrant 版本也是收费的

**2. 安装 Vagrant 并添加镜像**

下载地址：[https://www.vagrantup.com/dow...](https://www.vagrantup.com/downloads.html) 根据提示一步步安装。

装好以后运行 vagrant box add hashicorp/precise64 添加 Vagrant 官方的 box 镜像。这时将从官网下载名为 hashicorp/precise64 的 box，可能需要等待一段时间。

如果你要其他系统的镜像，可以来这里查询下载：[https://atlas.hashicorp.com/b...](https://atlas.hashicorp.com/boxes/search)

如何搜Vagrantfile：https://app.vagrantup.com/boxes/search

**提示：**如果你因为网络原因添加不了上面的镜像，可以用工具将这些 box 下载下来（[下载地址](https://github.com/chef/bento)），参照后文的**打包分发**部分进行添加。

**3. 初始化开发环境**

创建一个开发目录（比如：~/dev），你也可以使用已有的目录，切换到开发目录里，用 hashicorp/precise64 镜像初始化当前目录的环境：

$ cd ~/dev  # 切换目录$ vagrant init hashicorp/precise64  # 用 hashicorp/precise64 进行 box 初始化$ vagrant up  # 启动环境

你会看到终端显示了启动过程，启动完成后，我们就可以用 SSH 登录虚拟机了，剩下的步骤就是在虚拟机里配置你要运行的各种环境和参数了。

$ vagrant ssh  # SSH 登录$ cd /vagrant  # 切换到开发目录，也就是宿主机上的 `~/dev`

~/dev 目录对应虚拟机中的目录是 /vagrant

**Windows 用户注意**：Windows 终端并不支持 ssh，所以需要安装第三方 SSH 客户端，比如：Putty、Cygwin 等。

**其他设置**

Vagrant 初始化成功后，会在初始化的目录里生成一个 Vagrantfile 的配置文件，可以修改配置文件进行个性化的定制。

Vagrant 默认是使用端口映射方式将虚拟机的端口映射本地从而实现类似 http://localhost:80 这种访问方式，这种方式比较麻烦，新开和修改端口的时候都得编辑。相比较而言，host-only 模式显得方便多了。打开 Vagrantfile，将下面这行的注释去掉（移除 #）并保存：

**config**.vm.network :private_network, **ip**: "192.168.33.10"

重启虚拟机，这样我们就能用 192.168.33.10 访问这台机器了，你可以把 IP 改成其他地址，只要不产生冲突就行。

**打包分发**

当你配置好开发环境后，退出并关闭虚拟机。在终端里对开发环境进行打包：

$ vagrant package

打包完成后会在当前目录生成一个 package.box 的文件，将这个文件传给其他用户，其他用户只要添加这个 box 并用其初始化自己的开发目录就能得到一个一模一样的开发环境了。

添加方法：假设我们拿到的 box 存放路径是 ~/box/package.box，在终端里输入：

$ vagrant box add hahaha ~/box/package.box  # 添加 package.box 镜像并命名为 hahaha$ cd ~/dev  # 切换到项目目录$ vagrant init hahaha  # 用 hahaha 镜像初始化。

**集成预安装**

从上面这条看下来，你会发现每次都修改了一点点内容，再打包分发给其他用户其实很麻烦。为此 Vagrant 还提供了更为便捷的预安装定制。打开 Vagrantfile 文件末尾处有下面被注释的代码：

config.vm.provision "shell", **inline**: <<-SHELL  apt-**get** update  apt-**get** install -y apache2SHELL

没错，这段代码就是让你在初次运行 vagrant up 后，虚拟机创建过程中自动运行的初始化命令。 取消注释，把要预先安装的 php/mysql/redis 和配置之类的通通都写进去。初始化时这些程序都会根据你写好的方法安装并配置。

如果你不是初次运行，同时又修改了这里的命令，想让系统再次运行这里面的命令，你可以使用 vagrant reload --provision 进行重载。所以在这种情况下，你只要将 Vagrantfile 共享给团队的其他成员就可以了，其他成员运行相同的命令即可，是不是比打包分发要方便许多。

你还可以把要运行的命令单独写在一个文件里存放在相同的目录下，比如 bootstrap.sh：

***\*#!/usr/bin/env bash\**** apt-get updateapt-get install -y apache2***\*if\**** ! [ -L /var/www ]; ***\*then\**** rm -rf /var/www ln -fs /vagrant /var/www***\*fi\****

  然后在 Vagrantfile 里这样添加：

Vagrant.configure("2") ***\*do\**** |config| config.vm.box = "hashicorp/precise64" ...  config.vm.provision "shell", path: "bootstrap.sh" # 添加这行***\*end\****

  效果和直接写在 Vagrantfile 是一样的。

***\*常用命令\****

$ vagrant init  # 初始化

$ vagrant up  # 启动虚拟机

$ vagrant halt  # 关闭虚拟机

$ vagrant reload  # 重启虚拟机

$ vagrant ssh  # SSH 至虚拟机

$ vagrant status  # 查看虚拟机运行状态

$ vagrant destroy  # 销毁当前虚拟机

  更多内容请查阅官方文档 [https://www.vagrantup.com/doc...](https://www.vagrantup.com/docs/cli/index.html)

***\*注意事项\****

  使用 Apache/Nginx 时会出现诸如图片修改后但页面刷新仍然是旧文件的情况，是由于 VirtualBox 的一个 BUG 造成的。需要对虚拟机里的 Apache/Nginx 配置文件进行修改：

\# Apache 配置（httpd.conf 或者 apache.conf）修改：

EnableSendfile off

\# Nginx 配置（nginx.conf）修改：

sendfile off;

  SegmentFault 团队早期就是用这种方式统一开发环境的。 
  本篇文章所用程序版本 VirtualBox 5.0.*，Vagrant 1.8.*

  这有一份我的配置示例，供参考 [https://github.com/fenbox/Vag...](https://github.com/fenbox/Vagrantfile)
  如果你有任何疑问，可以在 vagrant 标签下提问：[https://segmentfault.com/t/va...](https://segmentfault.com/t/vagrant)

延伸阅读：

l [《Go 语言开发环境配置》](https://github.com/astaxie/Go-in-Action/blob/master/ebook/zh/01.0.md) by [@Asta谢](http://segmentfault.com/u/astaxie)

l [Vagrant 启动失败，停留在 Waiting for VM to boot 的解决方法](http://segmentfault.com/a/1190000000266564)

l [开启 NFS 文件系统提升 Vagrant 共享目录的性能](http://segmentfault.com/a/1190000000270453)

l [给 Vagrant 换用 VMware 或 Parallels 虚拟机](https://segmentfault.com/a/1190000016053215)

**如何在window上通过vagrant安装虚拟机**

原文：https://idig8.com/2018/07/29/docker-zhongji-08/

\#选择盘符

E:

\#创建目录vagrant

mkdir vagrant

\#进入目录

cd vagrant

\#创建目录centos7

mkdir centos7

\#进入目录

cd centos7

\#创建centos7的`Vagrantfile`文件

vagrant init ***\*centos7\****

\#vagrant up 下载真心很慢，不能忍

\#执行本地化镜像（迅雷下载好）命令，放到这个文件下

\#添加镜像

vagrant box add ***\*centos7\**** ./CentOS-7-x86_64-Vagrant-1902_01.VirtualBox.box

\#添加关联

vagrant up

***\*如果出现下面的问题\*******\*：\****

VBoxManage.exe: error: Raw-mode is unavailable courtesy of Hyper-V. (VERR_SUPDRV_NO_RAW_MODE_HYPER_V_ROOT)

VBoxManage.exe: error: Details: code E_FAIL (0x80004005), component ConsoleWrap, interface IConsole

***\*解决方案\****

管理员身份运行cmd关闭Microsoft-Hyper-V

***\*dism.exe /Online /Disable-Feature:Microsoft-Hyper-V\****

\#提示重启选择y

如果需要开启Hyper-V虚拟化管理员身份运行cmd

***\*dism.exe /Online /Enable-Feature:Microsoft-Hyper-V\****

\#启动vagrant

vagrant up

运行vagrant 成功