# 目录

1. [附录](#附录)

## 附录

### 软件安装和管理

软件包：

1. bin文件.bin
2. rpm包
3. 源码压缩包

**rpm**管理软件

| 命令                    | 说明                                                         |
| ----------------------- | ------------------------------------------------------------ |
| `rpm -i example.rpm`    | 安装 example.rpm 包；                                        |
| `rpm -iv example.rpm`   | 安装 example.rpm 包并在安装过程中显示正在安装的文件信息；    |
| `rpm -ivh example.rpm`  | 安装 example.rpm 包并在安装过程中显示正在安装的文件信息及安装进度； |
| `rpm -qa | grep gitlab` | 查看安装完成的软件                                           |
| `rpm -e --nodeps`       | 要卸载的软件包                                               |

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
