# 目录

1. [附录](#附录)
   - [软件安装和管理](#软件安装和管理)
   - [安装虚拟机增加包](#安装虚拟机增加包)

参考：

- [Linux运维日志](https://www.centos.bz/)

## 附录

### 软件安装和管理

软件包：

1. bin文件.bin
2. rpm包
3. 源码压缩包

**rpm**管理软件

命令|说明
-|-
rpm -i example.rpm|安装 example.rpm 包；
rpm -iv example.rpm|安装 example.rpm 包并在安装过程中显示正在安装的文件信息；
rpm -ivh example.rpm|安装 example.rpm 包并在安装过程中显示正在安装的文件信息及安装进度；
rpm -qa \| grep gitlab|查看安装完成的软件
rpm -e --nodeps|要卸载的软件包

配置、编译、安装、卸载源码发布的软件包。

```sh
./configure
make
make install
make clean
make uninstall
```

RPM默认安装路径：

- /etc：一些设置文件放置的目录如/etc/crontab

- /usr/bin：一些可执行文件

- /usr/lib：一些程序使用的动态函数库

- /usr/share/doc：一些基本的软件使用手册与帮助文档

- /usr/share/man：一些man page文件

通用软件安装方法：

1、下载RPM安装文件

- RPM Find：[http://www.rpmfind.net/](http://www.rpmfind.net/)

- `wget <rpm_url>`

- wget命令不存在时：`yum install wget`

2、安装RPM文件

- `yum install <xxx.rpm>`

**Yum**软件仓库

 `Yum` 仓库则是为进一步简化 `RPM` 管理软件难度而设计的，`Yum` 能够根据用户的要求分析出所需软件包及其相关依赖关系，自动从服务器下载软件包并安装到系统。

 用户能够根据需求来指定 `Yum` 仓库与是否校验软件包，而这些只需几条关键词即可完成，现在来学习下配置的方法：所有 `Yum` 仓库的配置文件均需以 `.repo` 结尾并存放在 `/etc/yum.repos.d/` 目录中。

```ini
[rhel-media]：yum源的名称，可自定义。
baseurl=file:///media/cdrom：提供方式包括FTP(ftp://..)、HTTP(http://..)、本地(file:///..)
enabled=1：设置此源是否可用，1为可用，0为禁用。
gpgcheck=1：设置此源是否校验文件，1为校验，0为不校验。
gpgkey=file:///media/cdrom/RPM-GPG-KEY-redhat-release：若为校验请指定公钥文件地址。
```

`Yum` 仓库中的 `RPM` 软件包可以是由红帽官方发布的，也可以是第三方组织发布的，当然用户也可以编写的~

标识|简写|前景色|后景色|说明
-|-|-|-|-
Debug|dbug|Gray|Black|在开发过程中用于交互式调查的日志。这些日志应主要包含对调试有用的信息，不具有长期价值。
Information|info|DarkGreen|Black|跟踪应用程序的一般流程的日志。这些日志应具有长期价值。
Warning|warn|Yellow|Black|突出显示应用程序流中异常或意外事件的日志，但是否则不会导致应用程序执行停止。
Error|fail|Red|Black|当当前执行流程由于失败而停止时，会突出显示的日志。这些应该指示当前活动中的故障，而不是应用程序范围的故障。
Critical|cril|White|Red|描述不可恢复的应用程序或系统崩溃或灾难性的日志失败需要立即关注。
None | | | | 不用于写日志消息。 指定记录类别不应写任何消息。

命令|作用
-|-
`yum repolist all`|列出所有仓库
`yum list all`|列出仓库中所有软件包
`yum info 软件包名称`|查看软件包信息
`yum install 软件包名称`|安装软件包
`yum reinstall 软件包名称`|重新安装软件包
`yum update 软件包名称`|升级软件包
`yum remove 软件包`|移除软件包
`yum clean alla`|清除所有仓库缓存
`yum check-update`|检查可更新的软件包
`yum grouplist`|查看系统中已经安装的软件包组
`yum groupinstall 软件包组`|安装指定的软件包组
`yum groupremove 软件包组`|移除指定的软件包组
`yum groupinfo 软件包组`|查询指定的软件包组信息

### 安装虚拟机增加包

VMware Tools是VMware虚拟机中自带的增强工具包，用于增强虚拟机显卡与硬盘性能、同步虚拟机与主机的时钟时间、最主要的是可以支持虚拟机与主机之间的文件拖拽传输。

第1步：在虚拟软件中选择“安装/重新安装VMware Tools(T)”

第2步：安装VMwareTools功能增加包（请用root用户登陆系统）

```sh
# 创建/media/cdrom目录：
mkdir -p /media/cdrom
# 将光驱设备挂载到该目录上：
mount /dev/cdrom /media/cdrom
# 进入到该挂载目录：
cd /media/cdrom
# 将功能增强包复制到/home目录中：
cp VMwareTools-10.3.2-9925305.tar.gz /home
# 进入到/home目录中：
cd /home
# 解压功能增强包：
tar xzvf VMwareTools-10.3.2-9925305.tar.gz
…………………………………………………………………………………………………………………………………………………………………………
vmware-tools-distrib/
vmware-tools-distrib/FILES
...
……………………………………………………………………此处省略解压过程细节…………………………………………………

# 进入解压文件夹中：
cd vmware-tools-distrib/
# 运行安装脚本（加上参数-d，代表默认安装，这里需要手动安装）：
./vmware-install.pl
…………………………………………………………………………………………………………………………………………………………………………
The installer has detected an existing installation of open-vm-tools on this system and will not attempt to remove and replace these user-space applications. It is recommended to use the open-vm-tools packages provided by the operating system. If you do not want to use the existing installation of open-vm-tools and attempt to install VMware Tools, you must uninstall the open-vm-tools packages and re-run this installer.
The installer will next check if there are any missing kernel drivers. Type yes if you want to do this, otherwise type no [yes]
……………………………………………………………………省略部分安装过程……………………………………………………………

# 当您看到这个字样后，重启后即可正常使用VmwareTools啦
…………………………………………………………………………………………………………………………………………………………………………
Creating a new initrd boot image for the kernel.
Starting Virtual Printing daemon: done
Starting vmware-tools (via systemctl): [ OK ]
The configuration of VMware Tools 9.9.0 build-2304977 for Linux for this running kernel completed successfully.
Enjoy,
--the VMware team
…………………………………………………………………………………………………………………………………………………………………………
```

可能会遇到的问题：

```sh
bash: ./vmware-install.pl: /user/bin/perl: 坏的解释器:没有那个文件或目录

# 解决方法
yum install perl gcc kernel-devel
yum upgrade kernel kernel-devel

# 如果出现
…………………………………………………………………………………………………………………………………………………………………………
‍Searching for a valid kernel header path…
The path "" is not valid.
…………………………………………………………………………………………………………………………………………………………………………
# 这是因为 kernel-devel 版本和相应的 kernel 版本不一致，可以用 uname-r 看一下内核版本，再用 rpm -q kernel-devel 看一下 kernel-devel 的版本，有可能会出现 kernel-devel 未找到的错误，这里需要自己安装一下，可以执行 sudo yum install kernel-devel，这个时候会安装最新的 kernel-devel 版本，重启一下，如果再出现问题，那么可以执行 sudo yum upgrade kernel kernel-devel，把内核和 kernel-devel 更新到同一个版本，这样应该就不会有问题了。而 GCC 和 PERL 的问题提示比较简单。
# 建议在安装之前还是执行一下安装 GCC 和 PERL，执行发下命令：yum install perl gcc kernel-devel
```

第3步：重新启动系统后生效：`reboot`

```sh
# 此时在linux中进入 /mnt/hgfs 文件夹，但发现共享的文件没有显示，继续。
vmware-hgfsclient
-bash: vmware-hgfsclient: 未找到命令
# share是共享文件夹名称
mount -t vmhgfs .host:/share /mnt/hgfs
temp 的密码：
Error: cannot mount filesystem: No such device（如提示该错误）
# 安装 yum install open-vm-tools
yum install open-vm-tools
# 完成后，再执行以下命令，就有共享文件夹啦
vmhgfs-fuse .host:/ /mnt/hgfs
# 查看共享文件夹
vmware-hgfsclient
```
