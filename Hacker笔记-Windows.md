# 安装与配置

## 取消管理员权限升级提示

![x](./Resources/windows-auth.png)



***\*笔记本设置\*******\*WIfi\*******\*热点\****

首先确认你的无线网卡可以使用。在开始菜单中依次找到“所有程序”--“附件”--“命令提示符”，右键“以管理员身份运行”。

在“命令提示符”里输入“netsh wlan set hostednetwork mode=allow ssid=Test key=0123456789”，回车，系统会自动虚拟出一个wifi热点，***\*密码必须是\*******\*8\*******\*位或者\*******\*8\*******\*位以上\****

此时，打开网络和共享中心，点击左侧的“更改适配器设置”，就会看到多出一个网卡来。

在本地连接上单击右键，点击“属性”

切换到“共享”，在第一个方框内打对勾，在下方的选择框内选择“无线连接2”，确定。如下图所示：

在命令提示符里输入“netsh wlan start hostednetwork”，回车，就会打开wifi热点

在命令提示符里输入“netsh wlan stop hostednetwork”，回车，就会关闭wifi热点。

 

查看本机端口：

netstat –ao

查看服务器端口是否开启

telnet 192.168.0.252 8888

如果窗口转到192.168.0.252说明端口开启

 

dcomcnfg设置com组件权限

 

c:windows\system32\compmgmt.msc 进入计算机管理窗口

cmd中运行control userpasswords2，设置自动登录