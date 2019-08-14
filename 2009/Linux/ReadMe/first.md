# 介绍

## 目录

## 安装

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

命令 | 作用
-|-
yum repolist all | 列出所有仓库
Debug | dbug | Gray | Black | 在开发过程中用于交互式调查的日志。 这些日志应主要包含对调试有用的信息，不具有长期价值。
Information | info | DarkGreen | Black | 跟踪应用程序的一般流程的日志。 这些日志应具有长期价值。
Warning | warn | Yellow | Black | 突出显示应用程序流中异常或意外事件的日志，但是否则不会导致应用程序执行停止。
Error | fail | Red | Black | 当当前执行流程由于失败而停止时，会突出显示的日志。这些应该指示当前活动中的故障，而不是应用程序范围的故障。
Critical | cril | White | Red | 描述不可恢复的应用程序或系统崩溃或灾难性的日志失败需要立即关注。
None |  |  |  | 不用于写日志消息。 指定记录类别不应写任何消息。
