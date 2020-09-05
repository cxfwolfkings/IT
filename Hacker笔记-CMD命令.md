# CMD命令

## 目录

1. 理论

   - [shell介绍](#shell介绍)
   - [编码格式转换](#编码格式转换)
   - [常用命令](#常用命令)
     - [if](#if)
   - [服务相关命令](#服务相关命令)

   - [端口相关命令](#端口相关命令)
   - [打开管理界面](#打开管理界面)

2. 实战

3. 总结

4. 升华



## 理论



### shell介绍

cmd.exe的位置：

- 32位：%SystemRoot%\System32
- 64位：%SystemRoot%\System32（32位cmd.exe）| %SystemRoot%\SysWow64（64位cmd.exe）



### 常用命令

**内部命令：** 存在于命令shell内部，不包括单独可执行文件

#### assoc

- 作用：显示或修改当前的文件扩展关联

#### break

- 作用：设置调试中断

#### call

- 作用：在一个脚本内调用程序或其它脚本。
- 说明：CALL command 调用一条批处理命令，和直接执行命令效果一样，特殊情况下很有用，比如变量的多级嵌套。在批处理编程中，可以根据一定条件生成命令字符串，用call可以执行该字符串。

  ```bat
  CALL [drive:][path]filename [batch-parameters]
  rem 调用其它批处理程序。filename 参数必须具有 .bat 或 .cmd 扩展名。

  CALL :label arguments
  rem 调用本文件内命令段，相当于子程序。被调用的命令段以标签:label开头，以命令goto :eof结尾。
  ```

  批脚本里的 %* 指出所有的参数（如 %1 %2 %3 %4 %5 ...）

  符号|说明
  -|-
  %~1 | 删除引号(")，扩充 %1
  %~f1 | 将 %1 扩充到一个完全合格的路径名
  %~d1 | 仅将 %1 扩充到一个驱动器号
  %~p1 | 仅将 %1 扩充到一个路径
  %~n1 | 仅将 %1 扩充到一个文件名
  %~x1 | 仅将 %1 扩充到一个文件扩展名
  %~s1 | 扩充的路径指含有短名
  %~a1 | 将 %1 扩充到文件属性
  %~t1 | 将 %1 扩充到文件的日期/时间
  %~z1 | 将 %1 扩充到文件的大小
  %~$PATH:1 | 查找列在 PATH 环境变量的目录，并将 %1 扩充到找到的第一个完全合格的名称。如果环境变量名未被定义，或者没有找到文件，此组合键会扩充到空字符串

  可以组合修定符来取得多重结果：

  符号|说明
  -|-
  %~dp1 | 只将 %1 扩展到驱动器号和路径
  %~nx1 | 只将 %1 扩展到文件名和扩展名
  %~dp$PATH:1 | 在列在 PATH 环境变量中的目录里查找 %1，并扩展到找到的第一个文件的驱动器号和路径。
  %~ftza1 | 将 %1 扩展到类似 DIR 的输出行。

  在上面的例子中，%1 和 PATH 可以被其他有效数值替换。%~ 语法被一个有效参数号码终止。%~ 修饰符不能跟 %* 使用

  >注意：参数扩充时不理会参数所代表的文件是否真实存在，均以当前目录进行扩展

  `SHIFT [/n]`

  如果命令扩展名被启用，SHIFT 命令支持/n 命令行开关；该命令行开关告诉命令从第 n 个参数开始移位；n 介于零和八之间。

  例如：SHIFT /2 会将 %3 移位到 %2，将 %4 移位到 %3，等等；并且不影响 %0 和 %1。

  示例代码：

  ```bat
  @echo off
  Echo 产生一个临时文件 > tmp.txt
  Rem 下行先保存当前目录，再将c:\windows设为当前目录
  pushd c:\windows
Call :sub tmp.txt
  Rem 下行恢复前次的当前目录
  Popd
  Call :sub tmp.txt
  pause
  Del tmp.txt
  exit
  :sub
  Echo 删除引号： %~1
  Echo 扩充到路径： %~f1
  Echo 扩充到一个驱动器号： %~d1
  Echo 扩充到一个路径： %~p1 
  Echo 扩充到一个文件名： %~n1
  Echo 扩充到一个文件扩展名： %~x1
  Echo 扩充的路径指含有短名： %~s1 
  Echo 扩充到文件属性： %~a1 
  Echo 扩充到文件的日期/时间： %~t1 
  Echo 扩充到文件的大小： %~z1 
  Echo 扩展到驱动器号和路径：%~dp1
  Echo 扩展到文件名和扩展名：%~nx1
  Echo 扩展到类似 DIR 的输出行：%~ftza1
  Echo.
  Goto :eof
  
  set aa=123456
  set cmdstr=echo %aa%
  call %cmdstr%
  pause
  
  rem 本例中如果不用call，而直接运行%cmdstr%，将显示结果%aa%，而不是123456
  ```

#### cd(chdir)

- 作用：显示当前目录名或改变当前目录位置

#### cls

- 作用：清理命令窗口并擦除屏幕缓冲区

#### color

- 作用：设置命令shell窗口的文本与背景色

#### copy

- 作用：将文件从一个位置复制到另外的位置，或者将多个文件连接在一起

#### date

- 作用：显示或设置系统日期

#### del(erase)

- 作用：删除指定的文件、多个文件或目录

#### dir

- 作用：显示当前目录或指定目录中的子目录与文件列表

#### dpath

- 作用：允许程序打开指定目录中的数据文件（就像在当前目录中一样）

#### echo

- 作用：显示命令行的文本字符串，设置命令回显状态(on|off)

#### endlocal

- 作用：变量局部化结束

#### exit

- 作用：退出命令shell



### if

作用：命令的条件执行

用法：3种

1. `IF [NOT] ERRORLEVEL number command`

   `IF ERRORLEVEL`这个句子必须放在某一个命令的后面，执行命令后由`IF ERRORLEVEL` 来判断命令的返回值。

   Number的数字取值范围0~255，判断时值的排列顺序应该由大到小。返回的值大于等于指定的值时，条件成立。

   ```bash
   @echo off
   dir c:
   rem 退出代码为>=1就跳至标题1处执行，>=0就跳至标题0处执行
   IF ERRORLEVEL 1 goto 1
   IF ERRORLEVEL 0 goto 0
   Rem 上面的两行不可交换位置，否则失败了也显示成功。
   :0
   echo 命令执行成功！
   Rem 程序执行完毕跳至标题exit处退出
   goto exit
   :1
   echo 命令执行失败！
   Rem 程序执行完毕跳至标题exit处退出
   goto exit
   :exit
   pause
   # 运行显示：命令执行成功！
   ```

2. `IF [NOT] string1==string2 command`

   string1 和 string2 都为字符的数据，英文内字符的大小写将看作不同，这个条件中的等于号必须是两个（绝对相等的意思），条件相等后即执行后面的 command

   检测当前变量的值做出判断，为了防止字符串中含有空格，可用以下格式

   `if [NOT] {string1}=={string2} command`

   `if [NOT] [string1]==[string2] command`

   `if [NOT] "string1"=="string2" command`

   这种写法实际上将括号或引号当成字符串的一部分了，只要等号左右两边一致就行了，比如下面的写法就不行：

   `if {string1}==[string2] command`

3. `IF [NOT] EXIST filename command`

   EXIST filename为文件或目录存在的意思

   ```bash
   echo off
   IF EXIST autoexec.bat echo 文件存在！
   IF not EXIST autoexec.bat echo 文件不存在！
   ```

#### for

- 作用：对一组文件中的每一文件运行指定的命令

#### ftype

作用：显示当前的文件类型或修改文件类型（文件扩展关联中使用）

#### goto

作用：将命令解释器直接跳转到批处理脚本中某个标记行

#### md(mkdir)

作用：在当前目录或指定目录下创建子目录

#### mklink

作用：为文件或目录创建符号链接或硬链接

#### move

作用：将一个或多个文件从当前目录或指定源目录移动到指定的目标目录，也可以用于对目录进行重命名

#### path

作用：显示或设置操作系统用于搜索可执行文件与脚本的命令路径

l pause：中断批处理文件的处理过程（挂起），等待键盘输入

l popd：弹出由PUSHD保存的目录，使其成为当前目录

l prompt：为命令提示符设置文本

l pushd：保存当前目录位置，之后跳转到指定的目录（可选）

l rd(rmdir)：移除目录（也可以移除其子目录）

l rem：在批处理脚本或Config.sys中设置标记

l ren(rename)：对一个或多个文件进行重命名

l set：显示当前环境变量，或者为当前命令shell设置临时变量

l setlocal：在批处理脚本中标记变量局部化的开始

l shift：改变批处理脚本中可替换变量的位置

l start：启动一个单独的窗口，以便运行指定的程序或命令。例：start explorer d:\  调用图形界面打开D盘

l time：显示或设置系统时间

l type：显示文本文件的内容

l verify：在将文件写入磁盘后，指令操作系统对其进行验证

l vol：显示磁盘卷标与序列号



**外部命令：**有自己可执行文件，通常位于%SystemRoot%\Sys-tem32目录下

```bash
chcp：修改默认字符集
	chcp 936默认中文
	chcp 65001
appwiz.cpl：打开“程序和功能”窗口
calc：启动计算器
chkdsk.exe：Chkdsk磁盘检查（管理员身份运行命令提示符）
cleanmgr：打开磁盘清理工具
Shutdown：自动关机命令，60秒倒计时
	Shutdown -s -t 600：表示600秒后自动关机 
	shutdown -a ：可取消定时关机 
	Shutdown -r -t 600：表示600秒后自动重启
CompMgmtLauncher：计算机管理
compmgmt.msc：计算机管理
credwiz：备份或还原储存的用户名和密码
control：控制面版
dcomcnfg：打开系统组件服务
devmgmt.msc：设备管理器
desk.cpl：屏幕分辨率
dfrgui：磁盘碎片整理程序
dialer：电话拨号程序
diskmgmt.msc：磁盘管理
dvdplay：DVD播放器
dxdiag：检查DirectX信息
eudcedit：造字程序
eventvwr：事件查看器
explorer：打开资源管理器
Firewall.cpl：Windows防火墙
fsmgmt.msc：共享文件夹管理器
gpedit.msc：组策略
hdwwiz.cpl：设备管理器
inetcpl.cpl：Internet属性
intl.cpl：区域和语言
iexpress：木马捆绑工具，系统自带
joy.cpl：游戏控制器
logoff：注销命令
lusrmgr.msc：本地用户和组
lpksetup：语言包安装/删除向导，安装向导会提示下载语言包
main.cpl：鼠标属性
mmsys.cpl：声音
mem.exe：显示内存使用情况。如果直接运行无效，可以先管理员身份运行命令提示符，在命令提示符里输入mem.exe>d:a.txt 即可打开d盘查看a.txt，里面的就是内存使用情况了。当然什么盘什么文件名可自己决定。
mmc：打开控制台
mobsync：同步命令
Msconfig.exe：系统配置实用程序
msdt：微软支持诊断工具
msinfo32：系统信息
mspaint：画图
Msra：Windows远程协助
mstsc：远程桌面连接
NAPCLCFG.MSC：客户端配置
ncpa.cpl：网络连接
narrator：屏幕“讲述人”
Netplwiz：高级用户帐户控制面板，设置登陆安全相关的选项
netstat -an：(TC)命令检查接口
notepad：打开记事本
Nslookup：IP地址侦测器，是一个 监测网络中 DNS 服务器是否能正确实现域名解析的命令行工具
odbcad32：ODBC数据源管理器
OptionalFeatures：打开或关闭Windows功能
osk：打开屏幕键盘
perfmon[.msc]：计算机性能监测器
PowerShell：提供强大远程处理能力
printmanagement.msc：打印管理
powercfg.cpl：电源选项
psr：问题步骤记录器
Rasphone：网络连接
Recdisc：创建系统修复光盘
Resmon：资源监视器
Rstrui：系统还原
regedit[.exe]/regedt32：注册表
rsop.msc：组策略结果集
sdclt：备份状态与配置，就是查看系统是否已备份
secpol.msc：本地安全策略
services.msc：本地服务设置
sfc.exe：系统文件检查器
	sfc /scannow：扫描错误并复原/windows文件保护
shrpubw：创建共享文件夹
sigverif：文件签名验证程序
slui：Windows激活，查看系统激活信息
slmgr.vbs：软件许可证管理
	slmgr.vbs -dlv ：显示详细的许可证信息
	slmgr.vbs -dli ：显示许可证信息
	slmgr.vbs -xpr ：当前许可证截止日期
	slmgr.vbs -dti ：显示安装ID以进行脱机
	slmgr.vbs -ipk ：(Product Key)安装产品密钥
	slmgr.vbs -ato ：激活Windows
	slmgr.vbs -cpky ：从注册表中清除产品密钥（防止泄露引起的攻击）
	slmgr.vbs -ilc ：(License file)安装许可证
	slmgr.vbs -upk ：卸载产品密钥
	slmgr.vbs -skms ：(name[ort] )批量授权
snippingtool：截图工具，支持无规则截图
soundrecorder：录音机，没有录音时间的限制
StikyNot：便笺
sysdm.cpl：系统属性
sysedit：系统配置编辑器
syskey：系统加密，一旦加密就不能解开，保护系统的双重密码
taskmgr：任务管理器（旧版）/TM任务管理器（新版）
taskschd.msc：任务计划程序
timedate.cpl：日期和时间
UserAccountControlSettings：用户账户控制设置
utilman：辅助工具管理器
wf.msc：高级安全Windows防火墙
WFS：Windows传真和扫描
wiaacmgr：扫描仪和照相机向导
winver：关于Windows
wmimgmt.msc：打开windows管理体系结构(WMI)
write：写字板
wscui.cpl：操作中心
wscript：windows脚本宿主设置
wuapp：Windows更新
charmap：启动字符映射表
regsvr32：regsvr32 /u *.dll --停止dll文件运行
magnify：放大镜实用程序
narrator：屏幕“讲述人”
cliconfg：SQL SERVER 客户端网络实用程序
certmgr.msc：证书管理实用程序
查看帮助：[command] /?
```







### 编码格式转换

默认编码格式为**GBK**，转成**UTF8**更好！

1. 单次生效

   ```bat
   chcp 65001
   ```

2. 永久生效

   regedit->HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Command Processor

   新建或更改**autorun**字符串值，输入数值数据**chcp 65001**，保存，OK。



### 服务相关命令

#### 创建服务

命令格式：

```bat
sc [servername] create Servicename [Optionname= Optionvalues]
```

- `servername`：可选，可以使用双斜线，如\\\\myserver，也可以是\\\\192.168.0.1来操作远程计算机。如果在本地计算机上操作就不用添加任何参数。
- `Servicename`：在注册表中为 service key 制定的名称。注意这个名称是不同于显示名称的（这个名称可以用 `net start` 和服务控制面板看到），而 SC 是使用服务键名来鉴别服务的。
- `Optionname`：这个 `optionname` 和 `optionvalues` 参数允许你指定操作命令参数的名称和数值。注意，这一点很重要，在操作名称和等号之间是没有空格的。如果你想要看每个命令可用的optionvalues，使用 `sc command` 这样的格式。这会为你提供详细的帮助。
- `Optionvalues`：为 `optionname` 的参数的名称指定它的数值。有效数值范围常常限制于哪一个参数的optionname。如果要列表请用 `sc command` 来询问每个命令。
- `Optionname--Optionvalues描述`：

  - type=----own, share, interact, kernel, filesys：关于建立服务的类型，选项值包括驱动程序使用的类型，默认是share。
  - start=----boot, sys tem, auto, demand, disabled：关于启动服务的类型，选项值包括驱动程序使用的类型，默认是demand（手动）。
  - error=----normal, severe, critical, ignore：当服务在导入失败错误的严重性，默认是normal。
  - binPath=--(string)：服务二进制文件的路径名，这里没有默认值，这个字符串是必须设置的。
  - group=----(string)：这个服务属于的组，这个组的列表保存在注册表中的ServiceGroupOrder下。默认是nothing。
  - tag=----(string)：如果这个字符串被设置为yes，sc 可以从 CreateService call 中得到一个 tagId。然而，SC 并不显示这个标签，所以使用这个没有多少意义。默认是nothing
  - depend=----(space separated string)：有空格的字符串。在这个服务启动前必须启动的服务的名称或者是组。
  - obj=----(string)：账号运行使用的名称，也可以说是登陆身份。默认是localsystem
  - Displayname=--(string)：一个为在用户界面程序中鉴别各个服务使用的字符串。
  - password=--(string)：一个密码，如果一个不同于localsystem的账号使用时需要使用这个。
  - Optionvalues：Optionname参数名称的数值列表。参考optionname。当我们输入一个字符串时，如果输入一个空的引用这意味着一个空的字符串将被导入。

  >需要注意的是：在 `option= xxxxx` 格式中，"="号和后面的内容一定要有空格，如 `depend= Tcpip`。如果命令中需要进行双引号的嵌套，使用反斜杠加引号 `"\""` 来进行转义处理。

示例：

```bat
sc create svnservice binPath= "\"D:\Servers\Subversion\bin\svnserve.exe\" --service -r E:\SVN\repository" DisplayName= "SVNService" depend= Tcpip start= auto  
```

#### 删除服务

语法：

```bat
rem 从注册表中删除服务子项。如果服务正在运行或者另一个进程有一个该服务的打开句柄，那么此服务将标记为删除。
sc [ServerName] delete [ServiceName]
```

参数：

- `ServerName`：指定服务所在的远程服务器名称。该名称必须使用 UNC 格式（"\\myserver"）。要在本机上运行 SC.exe，请忽略此参数。
- `ServiceName`：指定由 getkeyname 操作返回的服务名。



### 端口相关命令

```bat
rem 查看端口
netstat -ano
rem 查看端口号
netstat -ano|findstr "端口号"
rem 查询对应进程
tasklist |findstr "进程id号"
rem 杀掉进程
taskkill /f /t /im "进程id或者进程名称"
```



### 打开管理界面

```bash
# 计算机管理
compmgmt.msc
```



