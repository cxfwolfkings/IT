# Linux系统介绍

## 目录

1. 安装
   - [远程Shell服务](#远程Shell服务)
   - [CentOS 7的图形界面安装](#CentOS&nbsp;7的图形界面安装)
   - [使用KVM安装系统](#使用KVM安装系统)
   - [Yum软件仓库](#Yum软件仓库)
   - [安装rpm软件](#安装rpm软件)

## 安装

**准备工具**

- Vmware WorkStation虚拟机软件（必需）
- RedHat Enterprise Linux [RHEL] 红帽操作系统（必需）
- Hash1.0.4 文件校验工具（推荐）

**网络配置**

编辑网络配置文件：vi /etc/sysconfig/network-scripts/ifcfg-ens33

>注意：是否有共享网络？共享网络是否连通？

**软件安装**

1. 如何上传安装包到服务器

   - 可以使用图形化工具，如：filezilla
   - 可以使用sftp工具：alt+p调出后，用put命令上传

   上传（如果不cd指定目录，则上传到当前用户的主目录）

   ```sh
   sftp> cd /home/
   sftp> put C:\Users\Administrator\Desktop\day02\soft\jdk-7u45-linux-x64.tar.gz
   ```

   下载（lcd指定下载到本地的目标路径）

   ```sh
   sftp> lcd d:/
   sftp> get /home/jdk-7u45-linux-x64.tar.gz
   ```

2. 安装jdk

   配置环境变量

   ```sh
   export JAVA_HOME=/root/apps/jdk1.7.0_45
   export PATH = $PATH:$JAVA_HOME/bin
   ```

   重新加载：source /etc/profile

### 远程Shell服务

支持远程操作是Linux的一个非常重要的特点。利用此功能，用户从另一台计算机远程登录上来，进行Shell命令的操作。

一般Linux系统已经安装了支持远程操作的安全Shell服务软件OpenSSH。在默认情况下，此软件并没有运行起来。可以通过服控制启动OpenSSH来支持远程操作。下面介绍一下操作方法。

首先，从开始菜单启动服务管理工具，方法是：【开始】→【设置】→【控制面板】→【服务】从服务管理工具中找到sshd（安全Shell服务）。选中它，从操作菜单中就可以启动安全Shell服务了：【操作】→【启动】如果希望，每次启动计算机时，自动启动安全Shell服务，可以选中它，修改它的属性：
5可以是运行Linux操作系统的计算机，也可以是运行Windows操作系统的计算机【操作】→【属性】修改属性的界面，把启动类别改成自动即可。
提示：如果想用一台装有windows系统的电脑进行远程操作，要在这台电脑上安装ssh 客户端程序。可以使用运行于Windows上的专用客户端程序SSHSecureShellClient。另外使用putty等通用的ssh客户端软件也能进行远程操作。
1. 启动系统
注：以LILO为例说明。
通常LILO是安装在MBR上的，计算机启动后，MBR上的程序被执行，将出现一个不是很漂亮的图形：左边是一个小红帽图像，右边列出了可以启动 的操作系统，你可以使用键盘箭头切换。刚安装好后默认值是Linux，也就是你不选择，一会儿将自己启动Linux。
如果你想默认的选择是Windows的话，那你可以在启动Linux后，用vi修改/etc目录下的lilo.conf文件，加上
default=windows，然后再执行/ sbin/lilo重新生成LILO。
2. 用户登录
Linux是一个真正意义上的多用户操作系统，用户要使用该系统，首先必须登录，使用完系统后，必须退出。用户登录系统时，为了使系统能够识别该用户，必须输入用户名和密码，经系统验证无误后才可以登录系统使用。
Linux下有两种用户：
1）root用户：超级权限者，系统的拥有者，在Linux系统中有且只有一个root用户，它可以在系统中任何操作。在系统安装时所设定的密码就是 root用户的密码。
2）普通用户：Linux系统可以创建许多普通用户，并为其指定相应的权限，使其有限地使用Linux系统。
用户登录分两步进行：
1）输入用户的登录名，系统根据该登录名来识别用户；
2）输入用户的口令，该口令是用户自己选择的一个字符串，对其他用户完全保密，是登录系统时识别用户的唯一根据，因此每一个用户都应该 保护好自己的口令！
系统在建立之初，仅有root用户，其它的用户则是由root用户创建的。由于root用户的权限太大了，所以如果root用户误操作将可能造成很大的损失。所以建议系统管理员为自已新建一个用户，只有需要做系统维护、管理任务时才以root用户登录。
下面就是一个登录实例：
　　Red Hat Linux release 7.1 (Seawolf)
　　Kernerl 2.4.2-2 on an i686
　　Home login:root
　　Password:
在上面的例子中，我们发现在Password后面是空的，其实并不是不输入密码，而是在输入时，Linux系统不会把它显示出来，这样用来保护密码！
如果登录成功的话，我们将获得Shell（Shell是用来与用户交互的程序，它就象DOS中的COMMAND.COM，不过在Linux下可以有多种Shell供选择，如bash、csh、ksh等）提示符，如果以root用户登录的话，那么获得的提示符是“#”，否则将是“$”。
提示：如果当时在安装时设置为一启动就进入图形界面的话，那系统启动后，用户登录界面将是图形化的，有点象Windows，而且当你输入正确的 用户名与密码，就会直接进入X Window。这个设置是可以修改的：在/etc目录下有一个inittab文件，其中有一行配置：id:3:default 
其中，数字3就是代表一启动进入字符终端，如果改为5则代表一启动进入X Window。
不论你是root用户还是普通用户，只需简单地执行exit命令就可以退出登录。
3. 修改口令
为了更好地保护用户帐号的安全，Linux允许用户在登录之后随时使用passwd命令修改自己的口令。修改口令需要经历：
1） 输入原来的口令，如果口令输错，将中止程序，无法修改口令；
2） 输入新的口令；
3） 提示重复一遍新的口令，如果两次输入的口令相吻合，则口令修改成功。
需要注意的是，Red Hat Linux 7.1为了更好地保护口令，如果你输入的新口令过于简单，它将会拒绝修改。下面就是一个修改口令的实例：
　　$ passwd
　　Changing password for user1
　　(current) UNIX password: ? 在些输入原来的密码
　　New UNIX password: ? 输入新的密码
　　Retype new UNIX password: ? 再输入一遍新的密码
　　Passwd:all authentication tokens updated successfully ? 修改成功！
注意，在这里输入的口令同样不会显示出来。
而如果是root用户修改口令，则不需要输入老密码！也就是说，它可以修改任何用户的口令。
4. 关闭机器
在Linux系统中，普通用户是无权关闭系统的！只有root用户才能够关闭它。当然如果你是按关机按钮则别当别论。我们可以通过以下几种方法实现：
1） 按下CTRL+ALT+DEL组合键，这样系统将重新启动！
2） 执行reboot命令，这样系统也将重新启动！
3） 执行shutdown -h now命令，这样系统将关闭计算机！
4） 执行halt命令，可以关闭计算机。
注意千万不要随意采用硬关机、重启动键等方式关闭系统，那样会导致Linux文件系统遭受破坏！
5. 虚拟控制台
　　Linux是真正的多用户操作系统，可以同时接受多个用户的远程和本地登录，也允许同一个用户多次登录。
Linux为本地用户（也就是做在计算机面前的用户）提供了虚拟控制台访问方式，允许用户在同一时间从不同的控制台进行多次登录。
　　虚拟控制台的选择可以通过按ALT键加上F1-F6六个功能键来实现。例如，用户登录后，按一下ALT+F2组合键，用户又可以看到“login:”提示 符，这其实就是第二个虚拟控制台，而这时再按下ALT+F1组合键，用户则又可以回到第一个虚拟控制台。
　　大家可以通过使用虚拟控制台来感受Linux系统多用户的特性。例如用户可以在某一虚拟控制台上进行的工作尚未结束时，就可以切换到另一个虚拟控制台上开始另一项工作。例如在开发软件时，可以在一个控制台上编辑程序，在另一个控制台上进行编译，在第三个控制台上查阅信息。

### CentOS&nbsp;7的图形界面安装

GNOME、KDE等：

1. 首先安装X(X Window System)，命令为yum groupinstall "X Window System" 回车（注意有引号）
2. 由于这个软件组比较大，安装过程会比较慢，安装完成会出现complete！
3. 检查一下我们已经安装的软件以及可以安装的软件，用命令yum grouplist 回车

   ![x](./Resource/3.png)

4. 然后安装我们需要的图形界面软件，GNOME(GNOME Desktop)

   >这里需要特别注意！！！！
   >
   >一定要注意：名称必须对应，不同版本的centOS的软件名可能不同，其他Linux系统类似；否则会出现No packages in any requested group available to install or update 的错误。

5. 同样的，由于这个软件组比第一个要大很多（包含700个左右的软件），安装过程会很慢，请耐心等待。安装完成会出现complete！
6. 安装完成后我们可以通过命令 startx 进入图形界面，第一次进入会比较慢，请耐心等待。（可能需要重启，命令为reboot）
7. 如果安装完成后，虚拟机无法打开，我们需要调整虚拟机分配内存大小（注意不是磁盘大小），原来，小编的原来是800M现在分配了1600M。（1024M基本够用）
8. 如果安装完成后，虚拟机报错0x0000005c，请关闭虚拟机的3D加速功能（取消勾选）

关闭图形界面切换到命令行界面方法：

1. 手工切换：在图形界面中找一个可以输入命令的地方（RedHat9中默认是按alt+F2，或者从菜单：系统工具→终端打开）

   输入init 3 回车（注意init后面有一个空格），等一会就进入了命令界面，用init 5可以回到图形界面。

2. 如果想开机自动进纯文本模式，用文本编辑器打开文件/etc/inittab，找到其中的：id:5:initdefault:这行指示启动时的运行级是5，也就是图形模式，改成3就是文本模式了：id:3:initdefault:。再想进入X Windows用startx

   >注意：以上几种方法切换后，窗口模式完全关闭。如果窗口中有文件未保存，将丢失。

3. 还有一种“软”切换，按Ctrl+Alt+F1，进入一个同时运行的文本模式控制台，x窗口仍然在运行（占用内存），Ctrl+Alt+F7 切换回刚才的图形模式。其实Ctrl+Alt+F1、Ctrl+Alt+F2、Ctrl+Alt+F3、Ctrl+Alt+F4、Ctrl+Alt+F5、Ctrl+Alt+F6这6个都可以进入同时运行的不同文本模式控制台，没有窗口模式支持，也可以进行多任务同时处理。

卸载桌面：`yum remove gnome*`

### 使用KVM安装系统

KVM(Kernel Virtual Module)能够提供像Vmware一样的全虚拟化功能——让虚拟机用起来跟真实物理机一摸一样。安装KVM之前我们要检查真实物理机是否支持虚拟化功能:

```sh	
grep vmx /proc/cpuinfo
flags: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush dts mmx fxsr sse sse2 ss syscall nx rdtscp lm constant_tsc arch_perfmon pebs bts nopl xtopology tsc_reliable nonstop_tsc aperfmperf pni pclmulqdq vmx ssse3 cx16 pcid sse4_1 sse4_2 x2apic popcnt aes xsave avx f16c rdrand hypervisor lahf_lm ida arat epb pln pts dtherm tpr_shadow vnmi ept vpid fsgsbase smep
```

如果执行该命令后没有输出vmx或svm值，但您的电脑是近几年买来的，那么很有可能只是在BIOS中默认关闭了，请去开启试试吧！

Inter处理器的虚拟技术标志为vmx。AMD处理器的虚拟技术标志为svm。

安装KVM以及相关的依赖软件包：

```sh
yum -y groupinstall "Virtualization Host"
Loaded plugins: langpacks, product-id, subscription-manager
………………省略部分安装过程………………
Complete! 

yum -y install virt-{install,viewer,manager}
Loaded plugins: langpacks, product-id, subscription-manager
………………省略部分安装过程………………   
Complete!
```

为了让KVM中虚拟机能够互相共享数据，还必需配置真实机的网络：

让系统支持ipv4的转发功能：

```sh
echo "net.ipv4.ip_forward = 1" > /etc/sysctl.d/99-ipforward.conf
```

让转发功能立即生效：

```sh
sysctl -p /etc/sysctl.d/99-ipforward.conf
net.ipv4.ip_forward = 1
```

新手读者们请注意，前方高能：将网卡配置文件中的IP地址、子网掩码等信息注释后追加参数BRIDGE=virbr0（设置网卡为桥接模式）：

```sh
vim /etc/sysconfig/network-scripts/ifcfg-eno16777736

DEVICE="eno16777736"
ONBOOT=yes
#IPADDR="192.168.10.10"
#NETMASK="255.255.255.0"
#GATEWAY="192.168.10.1"
HWADDR="网卡的MAC地址"
#DNS1="192.168.10.1"
BRIDGE=virbr0
```

创建用于桥接网卡的配置文件（与上面的配置文件很相似）：

```sh
vim /etc/sysconfig/network-scripts/ifcfg-virbr0

DEVICE="virbr0"
TYPE=BRIDGE
ONBOOT=yes
BOOTPROTO=static
IPADDR="192.168.10.10"
NETMASK="255.255.255.0"
GATEWAY="192.168.10.1"
DNS1="192.168.10.1"
```

当KVM安装完成并将网卡配置妥当后请重启(reboot)后再进行下面的检查操作：

检查kvm模块是否被加载以及能否正常的使用CPU虚拟化功能：

```sh
lsmod | grep kvm

kvm_intel 138567 0
kvm 441119 1 kvm_intel
```

检查桥接的网卡配置是否启用成功：

```sh
ip show virbr0

3: virbr0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP
link/ether 00:0c:29:9c:63:73 brd ff:ff:ff:ff:ff:ff
inet 192.168.10.10/24 brd 192.168.10.255 scope global virbr0
valid_lft forever preferred_lft forever
inet6 fe80::20c:29ff:fe9c:6373/64 scope link
valid_lft forever preferred_lft forever
```

获取虚拟机列表（默认为空是正常的）：

```sh
virsh -c qemu:///system list
Id Name State
----------------------------------------------------
```

太棒了！现在来配置虚拟机参数吧：

```sh
virt-manager
```

- 第1步：填写虚拟机名称和设置安装模式。             
- 第2步：选中RHEL7镜像并设置系统类型。
- 第3步：设置内存量与CPU核数。      
- 第4步：定义硬盘容量。
- 第5步：检查配置后开启虚拟机。

### Yum软件仓库

Yum仓库则是为进一步简化RPM管理软件难度而设计的，Yum能够根据用户的要求分析出所需软件包及其相关依赖关系，自动从服务器下载软件包并安装到系统。
用户能够根据需求来指定Yum仓库与是否校验软件包，而这些只需几条关键词即可完成，现在来学习下配置的方法：所有Yum仓库的配置文件均需以.repo结尾并存放在/etc/yum.repos.d/目录中。

```ini
[rhel-media]：yum源的名称，可自定义。  
baseurl=file:///media/cdrom：提供方式包括FTP(ftp://..)、HTTP(http://..)、本地(file:///..)
enabled=1：设置此源是否可用，1为可用，0为禁用。  
gpgcheck=1：设置此源是否校验文件，1为校验，0为不校验。  
gpgkey=file:///media/cdrom/RPM-GPG-KEY-redhat-release：若为校验请指定公钥文件地址。
```

Yum仓库中的RPM软件包可以是由红帽官方发布的，也可以是第三方组织发布的，当然用户也可以编写的~

标识|简写|前景色|后景色|说明
-|-|-|-|-
Debug|dbug|Gray|Black|在开发过程中用于交互式调查的日志。这些日志应主要包含对调试有用的信息，不具有长期价值。
Information|info|DarkGreen|Black|跟踪应用程序的一般流程的日志。这些日志应具有长期价值。
Warning|warn|Yellow|Black|突出显示应用程序流中异常或意外事件的日志，但是否则不会导致应用程序执行停止。
Error|fail|Red|Black|当当前执行流程由于失败而停止时，会突出显示的日志。这些应该指示当前活动中的故障，而不是应用程序范围的故障。
Critical|cril|White|Red|描述不可恢复的应用程序或系统崩溃或灾难性的日志失败需要立即关注。
None |  |  |  | 不用于写日志消息。 指定记录类别不应写任何消息。

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

### 安装rpm软件

命令|说明
-|-
`rpm -i example.rpm`|安装 example.rpm 包；
`rpm -iv example.rpm`|安装 example.rpm 包并在安装过程中显示正在安装的文件信息；
`rpm -ivh example.rpm`|安装 example.rpm 包并在安装过程中显示正在安装的文件信息及安装进度；
`rpm -qa | grep gitlab`|查看安装完成的软件
`rpm -e --nodeps`|要卸载的软件包

配置、编译、安装、卸载源码发布的软件包。

```sh
./configure
make
make install
make clean
```

卸载源码发布的软件包

```sh
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
- wget <rpm_url>
- wget命令不存在时：yum install wget

2、安装RPM文件

- yum install <xxx.rpm>
