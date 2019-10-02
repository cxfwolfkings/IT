# cmd常用命令

默认编码格式为**GBK**，转成**UTF8**更好！

1. 单次生效

   ```bat
   chcp 65001
   ```

2. 永久生效

   regedit->HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Command Processor

   新建或更改**autorun**字符串值，输入数值数据**chcp 65001**，保存，OK。

## windows服务相关命令

1. 创建服务

   命令格式：

   ```bat
   sc [servername] create Servicename [Optionname= Optionvalues]
   ```

   **servername**

   可选，可以使用双斜线，如\\\\myserver，也可以是\\\\192.168.0.1来操作远程计算机。如果在本地计算机上操作就不用添加任何参数。

   **Servicename**

   在注册表中为service key制定的名称。注意这个名称是不同于显示名称的（这个名称可以用net start和服务控制面板看到），而SC是使用服务键名来鉴别服务的。

   **Optionname**

   这个optionname和optionvalues参数允许你指定操作命令参数的名称和数值。注意，这一点很重要，在操作名称和等号之间是没有空格的。

   如果你想要看每个命令的可以用的optionvalues，你可以使用sc command这样的格式。这会为你提供详细的帮助。

   **Optionvalues**

   为optionname的参数的名称指定它的数值。有效数值范围常常限制于哪一个参数的optionname。如果要列表请用sc command来询问每个命令。

   **Optionname--Optionvalues描述**

   type=----own, share, interact, kernel, filesys：关于建立服务的类型，选项值包括驱动程序使用的类型，默认是share。

   start=----boot, sys tem, auto, demand, disabled：关于启动服务的类型，选项值包括驱动程序使用的类型，默认是demand（手动）。

   error=----normal, severe, critical, ignore：当服务在导入失败错误的严重性，默认是normal。

   binPath=--(string)：服务二进制文件的路径名，这里没有默认值，这个字符串是必须设置的。

   group=----(string)：这个服务属于的组，这个组的列表保存在注册表中的ServiceGroupOrder下。默认是nothing。

   tag=----(string)：如果这个字符串被设置为yes，sc可以从CreateService call中得到一个tagId。然而，SC并不显示这个标签，所以使用这个没有多少意义。默认是nothing

   depend=----(space separated string)：有空格的字符串。在这个服务启动前必须启动的服务的名称或者是组。

   obj=----(string)：账号运行使用的名称，也可以说是登陆身份。默认是localsystem

   Displayname=--(string)：一个为在用户界面程序中鉴别各个服务使用的字符串。

   password=--(string)：一个密码，如果一个不同于localsystem的账号使用时需要使用这个。

   Optionvalues：Optionname参数名称的数值列表。参考optionname。当我们输入一个字符串时，如果输入一个空的引用这意味着一个空的字符串将被导入。

   需要注意的是:

   - 在option= xxxxx格式中，"="号和后面的内容一定要有空格，如depend=  Tcpip

   - 如果命令中需要进行双引号的嵌套，使用反斜杠加引号 " \" " 来进行转义处理。

   示例：

   ```bat
   sc create svnservice binPath= "\"D:\Servers\Subversion\bin\svnserve.exe\" --service -r E:\SVN\repository" DisplayName= "SVNService" depend= Tcpip start= auto  
   ```

2. 删除服务

   语法：

   ```bat
   sc [ServerName] delete [ServiceName]
   ```

   从注册表中删除服务子项。如果服务正在运行或者另一个进程有一个该服务的打开句柄，那么此服务将标记为删除。

   参数：

   **ServerName**

   指定服务所在的远程服务器名称。该名称必须使用 UNC 格式（“\\myserver”）。要在本机上运行 SC.exe，请忽略此参数。 

   **ServiceName**

   指定由 getkeyname 操作返回的服务名。
