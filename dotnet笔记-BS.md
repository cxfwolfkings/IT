# 目录

1. 简介
2. 实战
3. 总结
   - [nuget包管理](#nuget包管理)

# WebForm

## 目录


### IsPostBack

这涉及到aspx的页面回传机制的基础知识 postback是回传即页面在首次加载后向服务器提交数据,然后服务器把处理好的数据传递到客户端并显示出来,就叫postback, ispostback只是一个属性,即判断页面是否是回传,if(!Ispostback)就表示页面是首次加载,这是很常用的一个判断方式.一个页面只能加载一次,但可以在加载后反复postback.

### .NET里Server.URLEncode和Server.URLDecode到底是干什么用的

编码格式。可以让参数在URL正确传值。

例如URL 参数中存在一切特殊符号例如& + = ；但是你的参数中也存在这些符号的时候，该怎么办呢？

就必须使用Server.URLEncode ，然后获取的时候 Server.URLDecode 。
如果是表单POST 提交，则不需要上诉步骤。上述步骤只需在URL传递参数值的时候生效。

RESTORE FILELISTONLY FROM  DISK = N'E:\ahbbSQLbak\ahbb_net12-14am.bak'

### JS调用ASP.NET服务器控件

ASP.NET服务器控件的强大使得.NET程序员方便很多，也轻松很多（当然，从事这个行业的人都知道这是一把双刃剑……）。但是服务器控件顾名思义是要请求服务器的，那么这样子就给客户端增加的带宽负担。这是开发人员和用户都不愿意看到的。

那么肯定有人在想怎样既能使用服务器控件（方便后台操作），又能让JS操作服务器控件（页面能处理的用JS处理）。这样子程序员方便了，用户也高兴了。办法当然是有的。具体实现如下：

```html
<head>
  <script type="text/javascript">
    windows.onload =function(){
      var mylbl = document.getElementById("<%=lblTest.ClientID %>");
      alert(mylbl.textContent);
    }
  </script>
</head>
<body>
  <asp:LableID="lblTest" runat="server">Test</asp:Lable>
</body>
```

对的，就是使用.ClientID这个属性。这样子就省事多了！

在网上看到很多人使用其生成HTML代码中的id，这样做可以，但是最大的问题就是稳定性太差。上面的方法简单，稳定性良好。

还有一个办法也是可行的：

那就是在服务器端注册一个JS脚本，在需要使用这个ID的时候再去注册。原因？页面对此回发到服务器之后，服务器控件的ID可能会发生变化，从而带来不可预知的结果，所以，在需要使用这个控件时向页面注册一段JS代码，然后在前台直接调用就OK了，例：

```C#
RegisterStartupScript("check","\n<script>\n function check()\n {\n return alert(" + txtName.ClientID.ToString() + ");\n }\n </script>\n";
```

AjaxPro.Utility.RegisterTypeForAjax (typeof(ajax));
注册一个ajax方法类型,这样在其对应的.aspx文件中就可以直接调用其方法了
OnClientClick用于执行客户端脚本.当我们单击一个按钮时,最先执行的是OnClientClick 事件,根据OnClientClick 事件的返回值来决定是否执行OnClick事件来postback页面.其返回值为true 和 false,默认情况下OnClientClick 返回值为真.

发布网站方法:
1.	直接将建立的网站文件内容复制到网站根目录下,在IE中输入http://localhost 回车即可看见网站.这种方法不太安全,别人能看见文件中的内容.
2.	在ASP.NET中点击”生成”---“发布网站”,在弹出的对话框里点击确定,选择默认设置即可.这样会生一个BIN文件,这样再将文件复制到网站根目录下,再到IE中输入http://localhost也能看见,这样做安全性能高点,这样别人看不见你建立的文件内容,只能看见编译过的文件内容.
3.	在IIS中建立虚拟目录.安装了IIS后,点网站文件夹右击属性选择”WEB共享”,选择”共享文件夹”单选按钮,在弹出的对话框中选择”读取””脚本资源访问”两个复选框,单击确定.再到IE中输入http://localhost/myweb(注意加上myweb)也能看见.
4.	如果想要让别人看见自己发布的网站,在IIS中网站的属性中选择目录安全性,单击编辑,在弹出的对话框中选择”匿名访问”即可.


网站发布不成功
	很多时候是因为开发时的.Net版本和IIS服务器的.Net版本不匹配。Windows的IIS服务器功能在下面的地方添加。

IIS web.config拒绝访问 未能开始监视对 XX 文件的更改 
报错：加载配置文件时出错: 由于访问被拒绝,未能开始监视对“c:\inetpub\wwwroot\employ”等类似的烦人东西。

分析：这个项目是放在根目录下的，IIS配置没有问题，别的文件都可以浏览，就这个文件夹下的页面不能浏览，奇怪。回想这个原来是自己copy的一个文件，然后添加到项目中的。网上找到原因，是由于权限设置的问题，没有把Users的权限设置到文件夹和文件上去。

还有就是IIS设置问题，在IIS中看一下是不是子目录里创建了应用程序(或者做成了虚拟目录),这种情况下是会在子目录里查找web.config的.

补充：(转)

错误描述：对路径“****************.***”的访问被拒绝。
说明: 执行当前 Web 请求期间，出现未处理的异常。请检查堆栈跟踪信息，以了解有关该错误以及代码中导致错误的出处的详细信息。

解决方案一

在需要进行读写操作的目录下添加Network Service这个帐号（这个角色权限需要控制整个网站的目录），
由于在iis 6.0中，默认的应用程序池中的标示用的是Network Service，
所以在进程中是使用Network Service这个帐号运行来运行w3wp.exe进程，
而当我们在运行VS 2003的时候需要对某一个目录下进行读写操作，
看了一下该文件夹，发现没有Network Service，添加上该账号，同时选上FULL CONTROL，问题解决，
另：log4net写日志，文件夹的权限必须要有IIS_WPG账号的写权限。否则，不会记录日志。
******************************************************************************************

解决方案二
在IIS6.0中的默认应用程序池-->属性-->标示中把Net Service改成Local System该问题也可以解决。

*******************************************************************************************

什么是应用程序池呢？这是微软的一个全新概念：应用程序池是将一个或多个应用程序链接到一个或多个工作进程集合的配置。因为应用程序池中的应用程序与其他应用程序被工作进程边界分隔，所以某个应用程序池中的应用程序不会受到其他应用程序池中应用程序所产生的问题的影响。

Windows 2003同时支持两种工作模式，默认为ISS 6.0工作进程隔离模式。工作进程隔离模式防止一个应用程序或站点停止了而影响另一个应用程序或站点，大大增强了IIS的可靠性。那么如何设置两种工作模式呢？

　　在IIS管理器中，打开本地计算机，右键单击“应用程序池”，选择新建“应用程序池” （必须在工作进程隔离模式下才能建立应用程序池）。“应用程序池名称”框中，输入新的应用程序池名称。如果在“应用程序池 ID”框中出现的 ID （如：AppPool #1）不是您想要的，可进行重命名。如果您单击了“将现有应用程序池作为模板”，请在“应用程序池名称”框中右键单击想要用来作为模板的应用程序池。最后单击[确定]。

指派应用程序池

　　在 IIS 管理器中，右键单击您要为其指派应用程序池的应用程序，然后单击“属性”。单击“主目录”选项卡，确认您正在指派的目录或虚拟目录的“应用程序名”是否已被填写。如果“应用程序名”框尚未被填写，请单击“创建”，然后输入名称。

　　在“应用程序池”列表框中，选择您想要为其指派的应用程序池的名称。最后单击[确定]。

本文描述以下问题的解决方案
IIS7.0/8.0的错误HTTP Error 500.19 - Internal Server Error ，错误代码为0x80070021。
 
方法/步骤 
1.	1
写在前面
此错误可能有多种原因导致，本文介绍其中两种原因及其解决方案。如果本文不能解决你的问题，那么请另寻其他的解决方案。
2.	2
解决方案一
如果IIS7.0是在VS安装之后安装的话，那么需要添加IIS7.0对ASP.NET文件的支持，否则会出现aspx文件无法识别的MIME 错误,或者以上问题。
方法：打开和关闭系统功能---》Internet信息服务--》万维网服务---》应用程序开发功能—》勾选asp.net。
3.	3
解决方案二
IIS7.0的安全设置文件在%windir%\system32\inetsrv \config\applicationHost.config，这里定义服务器全局的安全设置，但是Web程序的web.config可以实现它的某些配置。默认情况下是不容许覆盖的。
所以首先修改applicationHost.config文件，使web程序可以覆盖服务器的全局安全配置，打开handlers和modules的权限，即由Deny改为Allow，如下：
<section name="handlers" overrideModeDefault="Allow" />
<section name="modules" allowDefinition="MachineToApplication" overrideModeDefault="Allow" />

反编译
我们平时在工作中经常会遇到一些已经被编译后的DLL，而且更加麻烦是没有源代码可以进行修改，只能针对这个DLL的文件进行修改才能得到我们想要的结果；本文将通过一个实例来演示如果完成一个简单的修改;我们将会用到以下几种工具；
1：反编译工具ILSpy.exe：是个很不错的反编译软件，而且是免费了；
2：微软的工具ildasm.exe:这个是把DLL生成IL文件的一个软件，是微软自带了；可以在C:\Program Files\Microsoft SDKs\Windows\v7.0A\bin找到该软件；
3：微机的工具ilasm.exe:这个是把IL文件重新生成DLL的功能，可以在C:\Windows\Microsoft.NET\Framework\v4.0.30319找到该软件；
我们新建一个WEB项目，模拟它要插入加密狗才能运行，当然这边的加密狗是我们的一个比喻，实例很简单七个步骤就可以完在；
步骤一：使用ILSpy.exe打开Web.dll文件；查看其源代码的情况：
 
从上面反编译出来的源代码不难发现重点是在GetLicense()方法，这个也是我们要修改的内容，从上面可以看出在没有修改前这个都是会提示要插入加密狗的；
步骤二：接下来就是要使用ildasm.exe把DLL这个文件转化成IL文件；
 
把dll文件转储为*.il文件存到某个指定文件夹里，得到Web.il和Web.res两个文件，有时也会有*.resource文件
 
步骤三：我们可以打开Web.il文件，里面有DLL生成的IL内容，我们很容易就可以定位到想要的这个方法，只要让它固定返回true就可以达到修改成功，方法内的IL代码就是我们要修改的内容；
 
步骤四：修改GetLicense()方法内的IL代码，让它固定返回true；下面这个IL就是让它返回为true;修改完接着保存IL文件；
 
步骤五：当修改完IL文件后要把它转化成DLL文件，打开DOC命令输入进入到*.il的文件夹，然后输入命令：c:\windows\microsoft.net\framework\v4.0.30319\ilasm.exe /dll/resource=Web.res Web.il
 
*1：要进入IL文件的文件夹 2：其中"/dll/"这个前面要有一个空格 3:.res文件要在.il文件前面，中间要有个空格
步骤六：运行完上面的命令后会生成一个新DLL文件，然后把它复制到我们的站点下面：
 
步骤七：运行的结果：
 
完成上面的七个步骤就可以成功修改DLL文件，当然本实例只是一个简单的修改，若要进行比较复杂修改IL代码则要对IL知识有个相当的了解；下面是一个可能会经常要用到的IL返回true跟false的代码；
    .maxstack 1
    .locals init (
        [0] bool CS$1$0000)
    L_0000: nop 
    L_0001: ldc.i4.1 
    L_0002: stloc.0 
    L_0003: br.s L_0005
    L_0005: ldloc.0 
    L_0006: ret

return true;

    // 代码大小       7 (0x7)
    .maxstack  1
    .locals init ([0] bool CS$1$0000)
    IL_0000:  nop
    IL_0001:  ldc.i4.0
    IL_0002:  stloc.0
    IL_0003:  br.s       IL_0005

    IL_0005:  ldloc.0
    IL_0006:  ret

return false;

插件式程序开发
插件的本质在于不修改程序主体（平台）的情况下对软件功能进行扩展与加强，当插件的接口公开后，任何公司或个人都可以制作自己的插件来解决一些操作上的不便或增加新的功能，也就是实现真正意义上的“即插即用”软件开发。
插件式程序开发是对面向对象设计原则之“开闭原则”的最好体现，在扩展功能的同时尽可能的少修改主程序代码。     
插件是对主程序的功能的扩展。是主程序生命的延续。而且对一个项目的开发进度也起到了一个积极的作用。试想一下：一个项目，有许多功能要进行实现。但是你没有办法一次性的完成。而用插件，你就可以一个功能一个功能的开发。开发好一个插件，你就能用一个功能。插件已经在firebox浏览器及PS上得到了广泛的应用。
其实，我们说大一点，把一个系统比作一个主程序，而系统上安装的每个应用程序就是插件程序。所以学习插件式程序的开发，对计算机的学习也大有好处。
假设你设计的程序已经部署到用户的计算机上，并且能够正常运行了。但是有一天，用户打来了电话——他们要求增加新的功能。确定了用户的需求后，你竟然发现原有的软件架构已经无法胜任新增任务的需求——你需要重新设计这个应用了！但问题是，就算你又用了一个开发周期完成了用户需要的应用，却不能保证用户的需求不会再次变更。也就是说，需求蔓延的可能性依然存在。因此，这种情况下插件构架更能显示出它的优越性。
可以这么说，用它可以带来方便的地方。而且开发它，也很简单。而且这样做主程序根本就不需要改动。需要插件时，拿来就能用。插件更新，也只要更新这个插件就行。
从程序开发角度来说，一般都是先要开发主程序，决定那些功能由主程序来完成，然后再建立接口，声明接口的内容，这些内容决定着插件的扩展的功能，及方向的。这些都是由主程序开发者预先准备好的。插件开发者，从主程序开发者那里得到接口的内容，并书写继承这些接口的类，来完成具体的功能。一个程序能实现的功能，基本上插件都能实现。
怎样开发插件式程序？
1.定义主程序，即平台，所有的插件都是基于这个平台，所以这个平台很重要，必须考虑可能的功能扩展。
2.定义接口。这个接口是所有开发的插件都必须实现的，接口中定义了插件开发者可以使用的主程序资源，而主程序亦可以通过该接口访问插件，接口即是主程序和插件联接的“纽带”，关于定义接口的诀窍我在下篇将会提到，不同的插件可能会需要不同的接口，同类型的插件也可能使用相同的接口。
3.对于主程序所提供的资源如果允许插件程序调用，比如窗体、按钮等组件，如果需要告知插件开发者相应的信息还需要定义配置文件，文件中声明了资源的名称和访问方式。
4.主程序中需要有装载插件和解析插件的功能函数，以便插件能够顺利”对接“。
5.建立接口和各个插件的DLL文件
1.	在编写窗体应用的插件程序开发时，如果主程序是窗体程序，如何在插件中调用主程序的窗体中的各种资源了，这是我采用的方法，请各位码农指点：  
2.	   首先定义插件接口      
3.	   public interface IAdvancedPlugin  
4.	   {  
5.	        Form MainForm //这是关键，通过在主程序的装载插件方法给该窗体的引用赋值，即将主程序窗体的引用赋给插件程序中对应的字段  
6.	        {  
7.	            get;  
8.	            set;  
9.	        }  
10.	        void FuncPluginLoad(Form mainForm); //每个插件都会实现这个插件初始化的方法  
11.	    }  
12.	  
13.	在插件程序中这样获取主程序的组件：  
14.	public class AdvancedPlugin : IAdvancedPlugin   
15.	{  
16.	 private Form mainForm = null;  
17.	 private Panel[] panels = new Panel[2];  
18.	 TextBox tb = new TextBox(); //输入框，用于引用主程序窗体中的输入框  
19.	 Label lbResult = new Label();//显示结果的标签，用于引用主程序窗体中的标签  
20.	 public Form MainForm //实现接口中的字段  
21.	 {   
22.	   get { return mainForm; }  
23.	   set { mainForm = value; }   
24.	 }   
25.	 //插件初始化  
26.	 public void FuncPluginLoad(Form mainForm) //插件初始化的方法由主程序同意调用，调用的时候会将主程序窗体传递进来  
27.	 {  
28.	 this.MainForm = mainForm; IEnumerator ie = mainForm.Controls.GetEnumerator();//获取包含在主程序窗体中的控件集合，这是关键，这样就获得了主窗体所有控件  
29.	 while (ie.MoveNext()) //遍历集合，查找需要使用的控件  
30.	 {  
31.	 Control c = ie.Current as Control;  
32.	 //if (c.GetType() == typeof(System.Windows.Forms.TextBox)) //如果某种类型的组建只有一个就可以通过类型获取  
33.	 if (c.Name == "textBox1") //这种方法获取控件需要预先知道控件的名称，这可以在主程序提供的配置文件中找到  
34.	 {   
35.	   tb = c as TextBox;  
36.	 }   
37.	 if (c.Name == "lbResult") //同上    
38.	 {   
39.	    lbResult = c as Label;  
40.	 }  
41.	 }   
42.	}  



Server.MapPath()
 ./当前目录
/网站主目录
../上层目录
~/网站虚拟目录

如果当前的网站目录为E:\wwwroot   应用程序虚拟目录为E:\wwwroot\company 浏览的页面路径为E:\wwwroot\company\news\show.asp
在show.asp页面中使用
Server.MapPath("./")   返回路径为：E:\wwwroot\company\news
Server.MapPath("/")    返回路径为：E:\wwwroot
Server.MapPath("../")   返回路径为：E:\wwwroot\company
Server.MapPath("~/")   返回路径为：E:\wwwroot\company
server.MapPath(request.ServerVariables("Path_Info")) 
Request.ServerVariables("Path_Translated")  
上面两种方式返回路径为 D:\wwwroot\company\news\show.asp

ASP.NET网页中的@指令

![x](./Resource/143.png)


Web窗体中form元素只能有一个，必须包含runat="server"，不能包含action，可执行回发的服务器控件必须包含在form内。
对于小网站. ASP.NET Web Forms 非常容易使用，能很快得到结果。对于大型复杂的网站，就一定要注意从客户端发送给服务器的回发，以及通过网络发送的视图状态: 否则应用程序很可能变慢。ASP.NET Web Forms 提供了很多选项来改造它，使之快速流畅， 但这抵消了使用Web Forms的优点， 此时使用其他架构可能会得到更好的结果。使Web Forms 快速流畅，意味着不使用一些可用的控件， 而是编写自定义代码。所以使用WebForms不编写自定义代码的优点就丧失了。

![x](./Resource/10.jpg)

Aspose.Words组件介绍及使用—基本介绍与DOM概述
阅读目录
•	1.基本介绍
•	2.文档对象模型概述
       本博客所有文章分类的总目录：http://www.cnblogs.com/asxinyu/p/4288836.html
本博客其他.NET开源项目文章目录：http://www.cnblogs.com/asxinyu/p/4329755.html
　　我之前博客有一篇开源的Word读写组件的介绍:http://www.cnblogs.com/asxinyu/archive/2013/02/22/2921861.html ,引起了不少人的关注，机缘巧合，也使得我结识了一些朋友，由于DocX的一些原因(不稳定，更新很慢)，我了解到了Aspose.Words这个组件，非常好，文档齐全，案例丰富，功能也很多，支持非常完善。所以我业余时间就把官方的文档和例子翻译和总结了一下，希望对大家有点帮助，同时也对自己是一个提高。我决定把这个组件的使用作为一个系列，目前已经有2篇的内容，后面的要根据时间慢慢写。
如对您有帮助，不要吝啬你的鼠标，支持一下哦，如翻译的不好，或者有错误漏洞，还请广大网友指出，一个人的能力毕竟有限，而且我只是一个业余打酱油的。
回到目录
1.基本介绍
Aspose.Words是一个商业.NET类库，可以使得应用程序处理大量的文件任务。Aspose.Words支持Doc，Docx，RTF，HTML，OpenDocument，PDF，XPS，EPUB和其他格式。使用Aspose.Words可以在不使用Microsoft.Word的情况下生成、修改、转换和打印文档。在项目中使用Aspose.Words可以有以下好处。
1.1丰富的功能集
其丰富的功能特性主要有以下4个方面：
1)格式转换。Aspose.Words具有高质量的文件格式转换功能，可以和Doc，OOXL，RTF，TXT等格式互相转换。
2)文档对象模型。通过丰富的API以编程方式访问所有的文档元素和格式，允许创建，修改，提取，复制，分割，加入，和替换文件内容。
3)文件渲染。可以在服务器端转换整个文档或者页面为PDF，XPS，SWF格式，同样可以转换文档页面为图像格式，或者.NET Graphics对象，这些功能和Microsoft.Word是一样的。
4)报表。可以从对象或者数据源填充模版生成文件。
1.2不需要Microsoft.Word
Aspose.Words可以在没有安装Microsoft Office的机器上工作。所有的Aspose组件都是独立，不需要微软公司的授权。总之， Aspose.Words在安全性、稳定性、可扩展性、速度、价格和自动化功能方面，是一个很不错的选择。
1.3独立的平台
Aspose.Words可以运行在Windows，Linux和Mac OS操作系统上面。可以使用Aspose.Words去创建32位或者64位的.NET应用程序，包括Asp.NET、WCF、WinForm等等，还可以使用Com组件在Asp、Perl、PHP和Python语言中使用，同样可以在Mono平台上使用Aspose.Words建立.NET应用程序。
1.4性能和可伸缩性
Aspose.Words可以运行在服务器和客户端，它是一个独立的.NET程序集，可以被任何.NET应用程序复制和部署。使用Aspose.Words可以在短时间内产生成千上万的文档，可以打开文档，并修改格式和内容，填充数据并保存。Aspose.Words是多线程安全的，不同的线程在同一时间处理不同的文档。
1.5最小的学习曲线
虽然Aspose.Words拥有150多个公共类和枚举类型，但是Aspose.Words的学习曲线很小因为Aspose.Words的API是围绕下列目标精心设计的：
1) 借鉴一些著名的API设计经验，如Microsoft Word。
2) 借鉴.NET框架设计指南的经验。
3) 提供易于使用的详细的文档元素操作文档。
以前在项目中使用Microsoft Word的开发者，可以在Aspose.Words中找到很多熟悉的类、方法和属性。
回到目录
2.文档对象模型概述
2.1 DOM介绍
Aspose.Words的文档对象模型(以下简称DOM)是一个Word文档在内存中的映射，Aspose.Words的DOM可以编程读取、操作和修改Word文档的内容和格式。理解DOM的结构和相应的类型，是使用Aspose.Words灵活编程的基础，这一点非常重要。下面的一个Word文档例子和其结构如下图所示:


当上述文档被Aspose.Words的DOM读取时，会创建如下结构的树形对象：

![x](./Resource/11.jpg)


从上图的结构和对应的Word文档，我们可以看到大概的DOM中相关对象的结构，有了这些基本概念，就可以很流程的操作Word文档了。Document, Section, Paragraph, Table, Shape, Run 以及图中的其他椭圆形的都是Aspose.Words对象，这些对象具有树形的层级结构，图中的注释同样说明这些文档对象树中的对象具有多个属性。
Aspose.Words中的DOM有以下特点：
1.所有的节点(node)类最终都继承于Node类，它是Aspose.Words DOM的基本类型。
2.节点可以包含(嵌套)其他节点，例如Section和Paragraph都继承自CompositeNode类，而CompositeNode类来源与Node类。
2.2 Node类型
当Aspose.Words读取Word文档到内存中时，不同类型的文档元素被不同的类型对象来替代，每一个文本框的text, paragraph, table, section都是Node对象,甚至文档本身都是一个Node。Aspose.Words为每一种文档节点类型都定义了一个类。
下面是一个UML类图，表示DOM中不同node类型之间的关系。抽象类的名字用斜体表示。注意，Aspose.Words DOM中同样包括了一些非节点类型的类，例如Style, PageSetup, Font等等，它们没有在这幅图里面显示。

![x](./Resource/12.jpg)


 看看这些主要的类及作用
Aspose.Words类	类别	描述
Document	Document	Document对象是文档树的根节点，提供访问整个文档的入口
Section	Document	Section对象对应一个文档中的一节
Body	Document	是一节中的主要文本容器
HeaderFooter	Document	一节中的特殊页眉或者页脚容器
GlossaryDocument	Document	代表一个Word文档中词汇表的根条目
BuildingBlock	Document	代表一个词汇表文档，如构件，自动图文集或一个自动更正条目
Paragraph
Text	一个文本段落，保护内联的节点
Run
Text	一个格式一致的文本块
BookmarkStart
Text	一个书签的起点标记
BookmarkEnd
Text	一个书签的结束标记
FieldStart
Text	一个特殊的字符指定一个单词字段的开始
FieldSeparator
Text	单词字段的分隔符
FieldEnd
Text	一个特殊的字符指定一个单词字段的结束
FormField
Text	一个表单字段
SpecialChar
Text	特殊字符类型，没有具体的
Table
Tables	 Word文档中的表格
Row
Tables	一个表格对象的行
Cell
Tables	表格行的单元格
Shape
Shapes	Word文档中的图像，形状，文本框或者OLE对象
GroupShape
Shapes	一组Shapes对象
DrawingML
Shapes	一个文档中的Sharp或者图像，图表
Footnote
Annotations	文档中包括文本的脚注或者尾注
Comment
Annotations	文档中包含文本的注释
CommentRangeStart
Annotations	一个相关的注释区域的开始
CommentRangeEnd
Annotations	一个相关的注释区域的结束
SmartTag
Markup	在一个段落内围绕一个或多个内嵌结构的智能标记
CustomXmlMarkup
Markup	文档中的某些结构的自定义XML标记
StructuredDocumentTag
Markup	文档中的一种结构化的文档标签（内容控制）
OfficeMath
Math	代表Office的数学对象，如函数，方程或者矩阵
 
2.3组成模式
Aspose.Words文档的结构树非常重要，下面的设计吐可以更清晰的理解各个节点之间的包含关系。
2.3.1 Document and Section
文档和节：
![x](./Resource/13.jpg)


从上图可以看出：
1.一个Document有1个或者多个Section(节)节点；
2.Section有1个Body(正文)，没有或者有多个HeaderFooter节点；
3.Body和HeaderFooter可以包含多个块级节点；
4.1个Document能够有一个GlossaryDocument.
1个Word文档包含1个或多个节，一个节可以定义自己的页码，边距，方向，以及页眉页脚的文字；一个节保护主要的问题，如页眉，页脚(首页，奇数页，偶数页)。
2.3.2 Block-level节点
Block-level节点的关系图如下所示：

![x](./Resource/14.jpg)


从上图中可以看到：
1.Block-level元素可以出现在文档中的很多地方，如Body的子节点，脚注，评论，单元格其他元素。
2.最重要的Block-level节点是表格和段落；
3.1个表格有0行或者多行；
CustomXmlMarkup 和StructuredDocumentTag可以包含其他Block-level节点；

2.3.3 Inline-level节点

![x](./Resource/15.jpg)


从上面的图表可以看到下列关系：
1.Paragraph是最经常出现的Inline-level节点；
2.Paragraph可以包含不同的Run格式节点；也可以包含书签(bookmarks)和注释(annotations)
3.Paragraph还可以包含形状，图像，绘图对象等，以及智能标签；
2.3.4 表格行单元格

![x](./Resource/16.jpg)


Table可以包含很多行，行可以包含单元格，单元格可以包括block-level节点。
 2.4 设计模式与导航
Aspose.Words将文档表示为一个有节点组成的树，因此就可以在节点之间互相切换。Aspose.Words提供了一个“文档浏览器”(DocumentExplorer)，这是一个项目例子Demo。如下图所示：

![x](./Resource/17.jpg)


可以通过Node类的ParentNode属性来访问上级节点，因此很方便获取父节点。文档对象模型是有大量的对象组合而成，他们的关系如下：
1.Node类是所有节点类的基类；
2.CompositeNode类是组合节点的基类；
3.Node类的中，没有子节点管理的接口，子节点管理的方法只出现在CompositeNode；
4.从Node类中移除子节点管理的方法，更干净，可以减少很多额外的转换；
 
第一篇基本介绍就介绍到这里，我们可以看到这个组件的功能是非常强大的，特别是文档的转换保存，操作也很灵活，相比DocX当然要强大。只不过唯一不足它是商业的，自己业余玩玩倒是没问题，源代码等下一篇写例子了，再发上来吧，至于官方的资料，是商业的，大家都懂的。至于途径吗，官方网站在这里：http://www.aspose.com/，国内的途径吧，CSDN比较多，呵呵。

________________________________________
.NET数据挖掘与机器学习，作者博客: http://www.cnblogs.com/asxinyu
E-mail:1287263703@qq.com

![x](./Resource/144.png)

 




匿名类型

![x](./Resource/145.png)


	创建匿名类型对象示例：
var v = new { Amount = 108, Message = "Hello" };

面向对象
命名空间
	使用别名：using MyAlias = MyNamespace1.MyNamespace2.MyNamespace3
类
成员种类
成员	说明
常量	与类关联的常量值
字段	类的变量
方法	类可执行的计算和操作
属性	与读写类的命名属性相关联的操作
索引器	与以数组方式索引类的实例相关联的操作
事件	可由类生成的通知
运算符	类所支持的转换和表达式运算符
构造函数	初始化类的实例或类本身所需的操作
析构函数	在永久丢弃类的实例之前执行的操作
类型	类所声明的嵌套类型
可访问性
可访问性	含义
public	访问不受限制
protected	访问仅限于此类或从此类派生的类
internal	访问仅限于此程序
protected internal	访问仅限于此程序或从此类派生的类
private	访问仅限于此类
类型参数
类定义可以通过在类名后添加用尖括号括起来的类型参数名称列表来指定一组类型参数。类型参数可用于在类声明体中定义类的成员。采用类型参数的类称为泛型类。结构类型、接口类型和委托类型也可以是泛型。当使用泛型类时，必须为每个类型参数提供类型实参，提供了类型实参的泛型类型称为构造的类型。
基类
类声明可通过在类名和类型参数后面添加一个冒号和基类的名称来指定一个基类。省略基类的指定等同于从类型object派生。
类继承其基类的成员。继承意味着一个类隐式地将它的基类的所有成员当作自已的成员，但基类的实例构造函数、静态构造函数和析构函数除外。派生类能够在继承基类的基础上添加新的成员，但是它不能移除继承成员的定义。
从某个类到它的任何基类存在隐式转换。因此，类的变量可以引用该类的实例或任何派生类的实例。
字段
字段是与类或类的实例关联的变量。
使用static修饰符声明的字段定义了一个静态字段 (static field)。一个静态字段只标识一个存储位置。无论对一个类创建多少个实例，它的静态字段永远都只有一个副本。
不使用static修饰符声明的字段定义了一个实例字段 (instance field)。类的每个实例都为该类的所有实例字段包含一个单独副本。
可以使用readonly修饰符声明只读字段(read-only field)。给readonly字段的赋值只能作为字段声明的组成部分出现，或在同一个类中的构造函数中出现。
方法
方法(method)是一种成员，用于实现可以由对象或类执行的计算或操作。静态方法(static method)通过类来访问。实例方法 (instance method)通过类的实例来访问。
方法具有一个参数(parameter)列表(可以为空)，表示传递给该方法的值或变量引用；方法还具有一个返回类型(return type)，指定该方法计算和返回的值的类型。如果方法不返回值，则其返回类型为void。
与类型一样，方法也可以有一组类型参数，当调用方法时必须为类型参数指定类型实参。与类型不同的是，类型实参经常可以从方法调用的实参推断出，而无需显式指定。
方法的签名(signature)在声明该方法的类中必须唯一。方法的签名由方法的名称、类型参数的数目以及该方法的参数的数目、修饰符和类型组成，方法的签名不包含返回类型。
扩展方法
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

/*
 * 扩展方法：
 *     可以使用实例方法的语法来调用静态方法，
 *     扩展方法已经绑定到参数指定的类型上面
 * 定义扩展方法注意事项：
 *     静态类：类必须用static关键字定义
 *     静态方法：扩展方法必须用static关键字定义
 *     this关键字：扩展方法的第一个参数前，必须有this关键字
 */
namespace com.starchen.demo
{
  class Program
  {
    static void Main(string[] args)
    {
      //定义参数
      int i = 10;
      int m = 20;
      //调用扩展方法
      string str1 = i.toStr1();
      //调用静态方法
      string str2 = Test.toStr2(m);
      //输出结果
      Console.WriteLine(str1);
      Console.WriteLine(str2);  
    } 
  }
  //定义一个测试类
  public static class Test
  {
    //定义扩展方法
    public static string toStr1(this int x)
    {
      return x.ToString();  
    } 
    //定义普通静态方法
    public static string toStr2(int x)
    {
      return x.ToString();  
    }
  }
}



参数
参数用于向方法传递值或变量引用。方法的参数从调用该方法时指定的实参(argument)获取它们的实际值。有四类参数：值参数、引用参数、输出参数和参数数组。
值参数(value parameter)用于传递输入参数。一个值参数相当于一个局部变量，只是它的初始值来自于该形参传递的实参。对值参数的修改不影响为该形参传递的实参。
值参数可以是可选的，通过指定默认值可以省略对应的实参。
引用参数(reference parameter)用于传递输入和输出参数。为引用参数传递的实参必须是变量，并且在方法执行期间，引用参数与实参变量表示同一存储位置。引用参数使用ref修饰符声明。
输出参数(output parameter)用于传递输出参数。对于输出参数来说，调用方提供的实参的初始值并不重要。除此之外，输出参数与引用参数类似。输出参数是用out修饰符声明的。
参数数组(parameter array)允许向方法传递可变数量的实参。参数数组使用params修饰符声明。只有方法的最后一个参数才可以是参数数组，并且参数数组的类型必须是一维数组类型。System.Console类的Write和WriteLine方法就是参数数组用法的很好示例。
方法体和局部变量
方法体指定了在调用该方法时将执行的语句。方法体可以声明仅用在该方法调用中的变量。这样的变量称为局部变量(local variable)。局部变量声明指定了类型名称、变量名称，还可指定初始值。C#要求在对局部变量明确赋值(definitely assigned)之后才能获取其值。
方法可以使用return语句将控制返回到它的调用方。在返回void的方法中，return语句不能指定表达式。在返回非void的方法中，return语句必须含有一个计算返回值的表达式。
静态方法和实例方法
使用static修饰符声明的方法为静态方法(static method)。静态方法不对特定实例进行操作，并且只能直接访问静态成员。
不使用static修饰符声明的方法为实例方法(instance method)。实例方法对特定实例进行操作，并且能够访问静态成员和实例成员。在调用实例方法的实例上，可以通过this显式地访问该实例。而在静态方法中引用this是错误的。
虚方法、重写方法和抽象方法
若一个实例方法的声明中含有virtual修饰符，则称该方法为虚方法(virtual method)。若其中没有 virtual修饰符，则称该方法为非虚方法(non-virtual method)。
在调用一个虚方法时，该调用所涉及的实例的运行时类型(runtime type)确定了要实际调用的方法实现。在非虚方法调用中，实例的编译时类型(compile-time type)负责做出此决定。
虚方法可以在派生类中重写(override)。当某个实例方法声明包括override修饰符时，该方法将重写所继承的具有相同签名的虚方法。虚方法声明用于引入新方法，而重写方法声明则用于使现有的继承虚方法专用化（通过提供该方法的新实现）。
抽象(abstract)方法是没有实现的虚方法。抽象方法使用abstract修饰符进行声明，并且只允许出现在同样被声明为abstract的类中。抽象方法必须在每个非抽象派生类中重写。
方法重载
方法重载(overloading)允许同一类中的多个方法具有相同名称，条件是这些方法具有唯一的签名。在编译一个重载方法的调用时，编译器使用重载决策(overload resolution)确定要调用的特定方法。重载决策将查找与参数最佳匹配的方法，如果没有找到任何最佳匹配的方法则报告错误信息。
其他函数成员
包含可执行代码的成员统称为类的函数成员(function member)。
下表演示一个名为List<T>的泛型类，它实现一个可增长的对象列表。该类包含了几种最常见的函数成员的示例。
using System;

public class List<T>
{
    //常量
    const int defaultCapacity = 4;

    //字段
    T[] items;
    int count;

    //构造函数
    public List(int capacity = defaultCapacity)
    {
        items = new T[capacity];
    }

    //属性
    public int Count
    {
        get { return count; }
    }
    public int Capacity
    {
        get
        {
            return items.Length;
        }
        set
        {
            if (value < count) value = count;
            if (value != items.Length)
            {
                T[] newItems = new T[value];
                Array.Copy(items, 0, newItems, 0, count);
                items = newItems;
            }
        }
    }

    //索引器
    public T this[int index]
    {
        get
        {
            return items[index];
        }
        set
        {
            items[index] = value;
            OnChanged();
        }
    }

    //方法
    public void Add(T item)
    {
        if (count == Capacity) Capacity = count * 2;
        items[count] = item;
        count++;
        OnChanged();
    }
    protected virtual void OnChanged()
    {
        if (Changed != null) Changed(this, EventArgs.Empty);
    }
    public override bool Equals(object other)
    {
        return Equals(this, other as List<T>);
    }
    static bool Equals(List<T> a, List<T> b)
    {
        if (a == null) return b == null;
        if (b == null || a.count != b.count) return false;
        for (int i = 0; i < a.count; i++)
        {
            if (!Equals(a.items[i], b.items[i]))
            {
                return false;
            }
        }
        return true;
    }
    public override int GetHashCode()
    {
        return base.GetHashCode();
    }

    //事件
    public event EventHandler Changed;

    //运算符
    public static bool operator ==(List<T> a, List<T> b)
    {
        return Equals(a, b);
    }
    public static bool operator !=(List<T> a, List<T> b)
    {
        return !Equals(a, b);
    }
}

构造函数
C#支持两种构造函数：实例构造函数和静态构造函数。实例构造函数(instance constructor)是实现初始化类实例所需操作的成员。静态构造函数(static constructor)是一种用于在第一次加载类本身时实现其初始化所需操作的成员。
实例构造函数可以被重载。
实例构造函数不同于其他成员，它是不能被继承的。一个类除了其中实际声明的实例构造函数外，没有其他的实例构造函数。如果没有为某个类提供任何实例构造函数，则将自动提供一个不带参数的空的实例构造函数。
属性
属性(property)是字段的自然扩展。属性和字段都是命名的成员，都具有相关的类型，且用于访问字段和属性的语法也相同。然而，与字段不同，属性不表示存储位置。相反，属性有访问器(accessor)，这些访问器指定在读取或写入它们的值时需执行的语句。
属性的声明与字段类似，不同的是属性声明以位于定界符 { 和 } 之间的一个get访问器和/或一个set访问器结束，而不是以分号结束。同时具有get访问器和set访问器的属性是读写属性(read-write property)，只有get访问器的属性是只读属性(read-only property)，只有set访问器的属性是只写属性(write-only property)。
与字段和方法相似，C# 同时支持实例属性和静态属性。静态属性使用 static 修饰符声明，而实例属性的声明不带该修饰符。
属性的访问器可以是虚的。当属性声明包括 virtual、abstract 或 override 修饰符时，修饰符应用于该属性的访问器。
索引器
索引器(indexer)是这样一个成员：它支持按照索引数组的方法来索引对象。索引器的声明与属性类似，不同的是该成员的名称是 this，后跟一个位于定界符 [ 和 ] 之间的参数列表。在索引器的访问器中可以使用这些参数。与属性类似，索引器可以是读写、只读和只写的，并且索引器的访问器可以是虚的。
索引器可以被重载，这意味着一个类可以声明多个索引器，只要其参数的数量和类型不同即可。

![x](./Resource/146.png)


using System;

namespace com.starchen.core
{
    public class 索引器示例
    {
        public void 测试索引器()
        {
            IMyInterface test = new MyClass();
            for (int i = 0; i < 10; i++)
            {
                int num = test[i];
                Console.WriteLine(num);
            }
        }
    }

    public interface IMyInterface
    {
        int this[int index]
        {
            get;
            set;
        }
    }

    public class MyClass : IMyInterface
    {
        private int[] nums = new int[10];

        public MyClass()
        {
            for(int i =0;i<10;i++)
            {
                nums[i] = i + 1;
            }
        }

        /// <summary>
        /// 索引器，用于访问nums
        /// </summary>
        /// <param name="index"></param>
        /// <returns></returns>
        public int this[int index]
        {
            get
            {
                return nums[index];
            }

            set
            {
                nums[index] = value;
            }
        }
    }
}


运算符
运算符 (operator) 是一种类成员，它定义了可应用于类实例的特定表达式运算符的含义。可以定义三类运算符：一元运算符、二元运算符和转换运算符。所有运算符都必须声明为 public 和 static。
List<T> 类声明了两个运算符 operator == 和 operator !=，从而为将那些运算符应用于 List<T> 实例的表达式赋予了新的含义。具体而言，上述运算符将两个 List<T> 实例的相等关系定义为逐一比较其中所包含的对象（使用所包含对象的 Equals 方法）。
可重载运算符列表

![x](./Resource/147.png)


像"+="，"-="这些运算符很明显可以由"+"，"-"实现，所以无需显示重载。
析构函数
析构函数 (destructor) 是一种用于实现销毁类实例所需操作的成员。析构函数不能带参数，不能具有可访问性修饰符，也不能被显式调用。垃圾回收期间会自动调用实例的析构函数。
垃圾回收器在决定何时回收对象和运行析构函数方面允许有广泛的自由度。具体而言，析构函数调用的时机并不是确定的，析构函数可以在任何线程上执行。由于这些以及其他原因，仅当没有其他可行的解决方案时，才应在类中实现析构函数。using语句提供了更好的对象析构方法。
类型
C# 语言的类型划分为两大类：值类型 (Value type) 和引用类型 (reference type)。值类型和引用类型都可以为泛型类型 (generic type)，泛型类型采用一个或多个类型参数。类型参数可以指定值类型和引用类型。第三种类型是指针，只能用在不安全代码中。
值类型与引用类型的不同之处在于：值类型的变量直接包含其数据，而引用类型的变量存储对其数据的引用 (reference)，后者称为对象 (object)。对于引用类型，两个变量可能引用同一个对象，因此对一个变量的操作可能影响另一个变量所引用的对象。对于值类型，每个变量都有自己的数据副本，对一个变量的操作不可能影响另一个变量。
C#的类型系统是统一的，因此任何类型的值都可以按对象处理。C#中的每个类型直接或间接地从object类类型派生，而object是所有类型的最终基类。引用类型的值都被视为object类型，被简单地当作对象来处理。值类型的值则通过对其执行装箱和拆箱操作按对象处理。
值类型
一个值类型或是结构类型，或是枚举类型。C#提供称为简单类型(simple type)的预定义结构类型集。
与引用类型的变量不同的是，仅当该值类型是可以为null的类型时，值类型的变量才可包含null值。 对于每个不可以为null的值类型，都存在一个对应的可以为null的值类型，该类型表示相同的值集加上null值。
对值类型变量赋值时，会创建所赋的值的一个副本。这不同于引用类型的变量赋值，引用类型的变量赋值复制的是引用而不是由引用标识的对象。
所有值类型从类System.ValueType隐式继承，后者又从类object继承。任何类型都不可能从值类型派生，因此，所有值类型都是隐式密封的。
注意，System.ValueType本身不是 value-type，而是class-type，所有value-type都从它自动派生。
所有值类型都隐式声明一个称为默认构造函数(default constructor)的公共无参数实例构造函数。默认构造函数返回一个零初始化实例，它就是该值类型的默认值(default value)：
对于所有simple-types，默认值是由所有位都置零的位模式产生的值：
	对于sbyte、byte、byte、ushort、int、uint、long和ulong，默认值为0。
	对于char，默认值为'\x0000'。
	对于float，默认值为0.0f。
	对于double，默认值为0.0d。
	对于decimal，默认值为0.0m。
	对于bool，默认值为false。
对于enum-type E，默认值为0，该值被转换为类型E。
对于struct-type，默认值是通过将所有值类型字段设置为它们的默认值并将所有引用类型字段设置为null而产生的值。
对于nullable-type，默认值是一个其HasValue属性为 false且Value属性未定义的实例。默认值也称为可以为null的类型的null值(null value)。
与任何其他实例构造函数一样，值类型的默认构造函数也是用new运算符调用的。出于效率原因，实际上，不必故意调用它的构造函数。由于每个值类型都隐式地具有一个公共无形参实例构造函数，因此，一个结构类型中不可能包含一个关于无形参构造函数的显式声明。但允许结构类型声明参数化实例构造函数。
结构类型
结构类型是一种值类型，它可以声明常量、字段、方法、属性、索引器、运算符、实例构造函数、静态构造函数和嵌套类型。
简单类型
C#提供称为简单类型(simple type)的预定义结构类型集。简单类型通过保留字标识，而这些保留字只是System命名空间中预定义结构类型的别名，详见下表。
保留字	化名的类型
sbyte	System.SByte
byte	System.Byte
short	System.Int16
ushort	System.UInt16
int	System.Int32
uint	System.UInt32
long	System.Int64
ulong	System.UInt64
char	System.Char
float	System.Single
double	System.Double
bool	System.Boolean
decimal	System.Decimal

整型
C#支持9种整型：sbyte、byte、short、ushort、int、uint、long、ulong和char。
整型具有以下所列的大小和取值范围：
sbyte类型表示有符号8位整数，其值介于-128和127之间。
byte类型表示无符号8位整数，其值介于0和255之间。
short 类型表示有符号16位整数，其值介于-32768和32767之间。
ushort类型表示无符号16位整数，其值介于0和65535之间。
int类型表示有符号32位整数，其值介于-2147483648和2147483647之间。
uint类型表示无符号32位整数，其值介于0和4294967295之间。
long类型表示有符号64位整数，其值介于-9223372036854775808和9223372036854775807之间。
ulong类型表示无符号64位整数，其值介于0和18446744073709551615之间。
char类型表示无符号16位整数，其值介于0和65535之间。char类型的可能值集与Unicode字符集相对应。虽然char的表示形式与ushort相同，但是可以对一种类型进行的所有计算并非都可以对另一种类型执行。
浮点型
C#支持两种浮点型：float和double。float和double类型用32位单精度和64位双精度格式来表示，这些格式提供以下几组值：
正零和负零。大多数情况下，正零和负零的行为与简单的值零相同，但某些运算会区别对待此两种零。
正无穷大和负无穷大。无穷大是由非零数字被零除这样的运算产生的。例如，1.0 / 0.0 产生正无穷大，而 –1.0 / 0.0 产生负无穷大。
非数字(Not-a-Number)值，常缩写为NaN。NaN是由无效的浮点运算(如零被零除)产生的。
如果浮点运算无效，则运算的结果变成 NaN。
如果浮点运算的一个或两个操作数为 NaN，则运算的结果变成 NaN。
decimal类型
decimal类型是128位的数据类型，适合用于财务计算和货币计算。decimal类型可以表示具有28或29个有效数字、从1.0 × 10−28 到大约 7.9 × 1028 范围内的值。
与浮点型相比，decimal类型具有较高的精度，但取值范围较小。因此，从浮点型到decimal的转换可能会产生溢出异常，而从decimal到浮点型的转换则可能导致精度损失。由于这些原因，在浮点型和decimal之间不存在隐式转换，如果没有显式地标出强制转换，就不可能在同一表达式中同时使用浮点操作数和 decimal操作数。
bool类型
bool类型表示布尔逻辑量。bool类型的可能值为true和false。
在bool和其他类型之间不存在标准转换。具体而言，bool类型与整型截然不同，不能用bool值代替整数值，反之亦然。
在C和C++语言中，零整数或浮点值或null指针可以转换为布尔值false，非零整数或浮点值或非null指针可以转换为布尔值true。在C#中，这种转换是通过显式地将整数或浮点值与零进行比较，或者显式地将对象引用与null进行比较来完成的。
枚举类型
枚举类型是具有命名常量的独特的类型。每个枚举类型都有一个基础类型，该基础类型必须为 byte、sbyte、short、ushort、int、uint、long 或 ulong。枚举类型的值集和它的基础类型的值集相同。枚举类型的值并不只限于那些命名常量的值。枚举类型是通过枚举声明定义的。
可以为null的类型
可以为null的类型可以表示其基础类型 (underlying type) 的所有值和一个额外的 null 值。可以为 null 的类型写作 T ?，其中 T 是基础类型。此语法是 System.Nullable<T> 的简写形式，这两种形式可以互换使用。
相反，不可以为 null 的值类型 (non-nullable value type) 可以是除 System.Nullable<T> 及其简写形式T ?(对于任何类型的T)之外的任何值类型，加上约束为不可以为 null 的值类型的任何类型参数(即具有 struct 约束的任何类型参数)。
可以为 null 的类型 T ? 的实例有两个公共只读属性：
•	类型为 bool 的 HasValue 属性
•	类型为 T 的 Value 属性
HasValue 为 true 的实例称为非 null。非 null 实例包含一个已知值，可通过 Value 返回该值。
HasValue 为 false 的实例称为 null。null 实例有一个不确定的值。尝试读取 null 实例的 Value 将导致引发 System.InvalidOperationException。访问可以为 null 的实例的 Value 属性的过程称作解包 (unwrapping)。
除了默认构造函数之外，每个可以为 null 的类型 T ? 都有一个具有类型为 T 的单个实参的公共构造函数。例如，给定一个类型为 T 的值 x，调用形如new T?(x) 的构造函数将创建 T? 的非 null 实例，其 Value 属性为 x。为一个给定值创建可以为 null 的类型的非 null 实例的过程称作包装 (wrapping)。从 null 文本转换为 T?以及从 T 转换为 T?可使用隐式转换。
引用类型
引用类型是类类型、接口类型、数组类型或委托类型。
引用类型值是对该类型的某个实例 (instance) 的一个引用，后者称为对象 (object)。null 值比较特别，它兼容于所有引用类型，用来表示“没有被引用的实例”。
开放和封闭类型
所有类型都可归类为开放类型 (open type) 或封闭类型 (closed type)。开放类型是包含类型形参的类型。更明确地说：
•	类型形参定义开放类型。
•	当且仅当数组元素类型是开放类型时，该数组类型才是开放类型。
•	当且仅当构造类型的一个或多个类型实参为开放类型时，该构造类型才是开放类型。当且仅当构造的嵌套类型的一个或多个类型实参或其包含类型的类型实参为开放类型时，该构造的嵌套类型才是开放类型。
封闭类型是不属于开放类型的类型。
在运行时，泛型类型声明中的所有代码都在一个封闭构造类型的上下文中执行，这个封闭构造类型是通过将类型实参应用该泛型声明来创建的。泛型类型中的每个类型形参都绑定到特定的运行时类型。所有语句和表达式的运行时处理都始终使用封闭类型，开放类型仅出现在编译时处理过程中。
每个封闭构造类型都有自己的静态变量集，任何其他封闭构造类型都不会共享这些变量。由于开放类型在运行时并不存在，因此不存在与开放类型关联的静态变量。如果两个封闭构造类型是从相同的未绑定泛型类型构造的，并且它们的对应类型实参属于相同类型，则这两个封闭构造类型是相同类型。
绑定和未绑定类型
术语未绑定类型 (unbound type) 是指非泛型类型或未绑定的泛型类型。术语绑定类型 (bound type) 是指非泛型类型或构造类型。
未绑定类型是指类型声明所声明的实体。未绑定泛型类型本身不是一种类型，不能用作变量、参数或返回值的类型，也不能用作基类型。可以引用未绑定泛型类型的唯一构造是typeof表达式。
类型形参
类型形参是指定形参在运行时要绑定到的值类型或引用类型的标识符。
由于类型形参可使用许多不同的实际类型实参进行实例化，因此类型形参具有与其他类型稍微不同的操作和限制。这包括：
•	不能直接使用类型形参声明基类或接口。
•	类型形参上的成员查找规则取决于应用到该类型形参的约束。
•	类型形参的可用转换取决于应用到该类型形参的约束。
•	如果事先不知道由类型形参给出的类型是引用类型，不能将标识 null 转换为该类型。不过，可以改为使用 default 表达式。此外，具有由类型形参给出的类型的值可以 使用 == 和 != 与 null 进行比较，除非该类型形参具有值类型约束。
•	仅当类型形参受 constructor-constraint 或值类型约束的约束时，才能将 new 表达式与类型形参联合使用。
•	不能在特性中的任何位置上使用类型形参。
•	不能在成员访问或类型名称中使用类型形参标识静态成员或嵌套类型。
•	在不安全代码中，类型形参不能用作 unmanaged-type。
作为类型，类型形参纯粹是一个编译时构造。在运行时，每个类型形参都绑定到一个运行时类型，运行时类型是通过向泛型类型声明提供类型实参来指定的。因此，使用类型形参声明的变量的类型在运行时将是封闭构造类型。涉及类型形参的所有语句和表达式的运行时执行都使用作为该形参的类型实参提供的实际类型。
表达式树类型
表达式树 (Expression tree) 允许匿名函数表示为数据结构而不是可执行代码。表达式树是 System.Linq.Expressions.Expression<D> 形式的表达式树类型 (expression tree type) 的值，其中 D 是任何委托类型。对于本规范的其余部分，我们将使用简写形式 Expression<D> 引用这些类型。
如果存在从匿名函数到委托类型 D 的转换，则也存在到表达式树类型 Expression<D> 的转换。不过，匿名函数到委托类型的转换会生成一个引用该匿名函数的可执行代码的委托，而到表达式树类型的转换则会创建该匿名函数的表达式树表示形式。
表达式树是匿名函数有效的内存数据表示形式，它使匿名函数的结构变得透明和明晰。与委托类型 D 一样，Expression<D> 具有与 D 相同的参数和返回类型。
下面的示例将匿名函数表示为可执行代码和表达式树。因为存在到 Func<int,int> 的转换，所以也存在到 Expression<Func<int,int>> 的转换：
Func<int,int> del = x => x + 1;					// Code
Expression<Func<int,int>> exp = x => x + 1;		// Data
进行上面的赋值之后，委托 del 引用返回 x + 1 的方法，表达式目录树 exp 引用描述表达式 x => x + 1 的数据结构。
泛型类型 Expression<D> 的准确定义以及当将匿名函数转换为表达式树类型时用于构造表达式树的确切规则不在本规范的范围之内，将另作说明。
有两个要点需要明确指出：
•	并非所有匿名函数都能表示为表达式树。例如，具有语句体的匿名函数和包含赋值表达式的匿名函数就不能表示为表达式树。在这些情况下，转换仍存在，但在编译时将失败。
•	Expression<D> 提供一个实例方法 Compile，该方法产生一个类型为 D 的委托： 
Func<int,int> del2 = exp.Compile();
调用此委托将导致执行表达式树所表示的代码。因此，根据上面的定义，del 和 del2 等效，而且下面的两个语句也将等效：
int i1 = del(1);
int i2 = del2(1);
执行此代码后，i1 和 i2 的值都为 2。
dynamic类型
dynamic 类型在 C# 中具有特殊含义。其用途在于允许进行动态绑定。dynamic 被视为与 object 相同，除了以下这些方面：
	对 dynamic 类型的表达式进行的运算可以动态绑定。
	类型推断在 dynamic 和 object 都是候选项时，会优先考虑前者。
由于此等效性，因此存在以下情况：
object 与 dynamic 之间，以及对于在将 dynamic 替换为 object 时相同的构造类型之间，存在隐式标识转换
与 object 之间的隐式和显式转换也适用于 dynamic。
在将 dynamic 替换为 object 时相同的方法签名视为是相同的签名
dynamic 类型在运行时与 object 没有区别。
dynamic 类型的表达式称为动态表达式 (dynamic expression)。
枚举
枚举类型 (enum type)是具有一组命名常量的独特的值类型，由System.Enum继承而来。
每个枚举类型都有一个相应的整型(除char外)类型，称为该枚举类型的基础类型 (underlying type)。没有显式声明基础类型的枚举类型所对应的基础类型是 int。枚举类型的存储格式和取值范围由其基础类型确定。一个枚举类型的值域不受它的枚举成员限制。具体而言，一个枚举的基础类型的任何一个值都可以被强制转换为该枚举类型，成为该枚举类型的一个独特的有效值。
任何枚举类型的默认值都是转换为该枚举类型的整型值零。在变量被自动初始化为默认值的情况下，该默认值就是赋予枚举类型的变量的值。为了便于获得枚举类型的默认值，文本 0 隐式地转换为任何枚举类型。
using System;
using System.Collections.Generic;
using System.Text;

/// <summary>
/// 枚举示例
/// </summary>
namespace com.starchen.demo
{
    class Program
    {
        static void Main(string[] args)
        {
            //分别输出四个方向和对应的整数值
            Console.WriteLine(MyDirection.East);
            Console.WriteLine(MyDirection.South);
            Console.WriteLine(MyDirection.West);
            Console.WriteLine(MyDirection.North);
            Console.WriteLine(Convert.ToInt32(MyDirection.East));
            Console.WriteLine(Convert.ToInt32(MyDirection.South));
            Console.WriteLine(Convert.ToInt32(MyDirection.West));
            Console.WriteLine(Convert.ToInt32(MyDirection.North));
        }
    }
    /// <summary>
    /// 表示星期
    /// </summary>
    enum DaysInWeek
    {
        Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday
    }
    /// <summary>
    /// 表示方向
    /// 默认情况下枚举中定义的值是根据定义的顺序从0开始顺序递增的
    /// 但是可以根据自定义改变
    /// </summary>
    enum MyDirection
    {
        East = 1,
        South = 2,
        West = 3,
        North = 4
    }
}

结构
结构 (struct) 是能够包含数据成员和函数成员的数据结构。但是结构是值类型，不需要堆分配。结构类型的变量直接存储该结构的数据。结构类型不支持用户指定的继承，并且所有结构类型都隐式地从类型object继承。
结构对于具有值语义的小型数据结构尤为有用。复数、坐标系中的点或字典中的“键-值”对都是结构的典型示例。对小型数据结构而言，使用结构而不使用类会大大节省需要为应用程序分配的内存数量。
结构构造函数也是使用 new 运算符调用，但是这并不意味着会分配内存。结构构造函数并不动态分配对象并返回对它的引用，而是直接返回结构值本身(通常是堆栈上的一个临时位置)，然后根据需要复制该结构值。
对于类，两个变量可能引用同一对象，因此对一个变量进行的操作可能影响另一个变量所引用的对象。对于结构，每个变量都有自己的数据副本，对一个变量的操作不会影响另一个变量。
复制整个结构通常不如复制对象引用的效率高，因此结构的赋值和值参数传递可能比引用类型的开销更大。其次，除了ref和out参数，不可能创建对结构的引用，这样限制了结构的应用范围。
所有的基本类型都是结构类型。
堆栈的执行效率比堆高，但是资源有限，因此实际运用中对于需要构造函数、常量、字段、方法、属性、索引器、运算符、事件和嵌套类型的复杂类型的处理建议使用class；简单并且不涉及复制的类型可以使用结构。
结构是隐式的sealed，不能从另外的结构或类继承，但是可以继承接口。
using System;

/// <summary>
/// 结构示例
/// </summary>
namespace com.starchen.demo
{
    interface IShape
    {
        /// <summary>
        /// Paint方法
        /// </summary>
        void Paint();
    }
    struct Round : IShape
    {
        /// <summary>
        /// 园的半径
        /// </summary>
        public double r;
        /// <summary>
        /// 构造函数，负责初始化圆的半径
        /// </summary>
        /// <param name="x">圆的半径</param>
        public Round(double x)
        {
            r = x;
        }
        /// <summary>
        /// 求圆的面积
        /// </summary>
        /// <returns></returns>
        public double Area()
        {
            return Math.PI * r * r;
        }
        /// <summary>
        /// Paint方法
        /// </summary>
        public override void Paint()
        {
            //具体代码
        }
    }
    public class Program
    {
        static void Main(string[] args)
        {
            Round myRound1;
            myRound1.r = 2;
            Console.WriteLine("一号圆的面积为：{0}", myRound1.Area());
            Round myRound2 = new Round(2);
            Console.WriteLine("二号圆的面积为：{0}", myRound2.Area());
            Console.ReadLine();
        }
    }
}


接口
接口 (interface) 定义了一个可由类和结构实现的协定。接口可以包含方法、属性、事件和索引器。接口不提供它所定义的成员的实现——它仅指定实现该接口的类或结构必须提供的成员。接口可支持多重继承。
在无法静态知道某个实例是否实现某个特定接口的情况下，可以使用动态类型强制转换。
C# 还支持显式接口成员实现，类或结构可以使用它来避免将成员声明为public。显式接口成员实现使用完全限定的接口成员名。显式接口成员只能通过接口类型来访问。


委托
委托类型 (delegate type) 表示对具有特定参数列表和返回类型的方法的引用。通过委托，我们能够将方法作为实体赋值给变量和作为参数传递。委托类似于在其他某些语言中的函数指针的概念，但是与函数指针不同，委托是面向对象的，并且是类型安全的。
委托既可以引用静态方法，也可以引用实例方法。引用了实例方法的委托也就引用了一个特定的对象，当通过该委托调用这个实例方法时，该对象在调用中成为this。
也可以使用匿名函数创建委托，这是即时创建的“内联方法”。
委托的一个有趣且有用的属性在于，它不知道也不关心它所引用的方法的类；它仅关心所引用的方法是否与委托具有相同的参数和返回类型。
委托的特点：

![x](./Resource/148.png)

在以下情况下使用委托：

![x](./Resource/149.png)

在以下情况下使用接口：

![x](./Resource/150.png)


事件
事件(event)是一种使类或对象能够提供通知的成员。事件的声明与字段类似，不同的是事件的声明包含event关键字，并且类型必须是委托类型。在声明事件成员的类中，事件的行为就像委托类型的字段(前提是该事件不是抽象的并且未声明访问器)。该字段存储对一个委托的引用，该委托表示已添加到该事件的事件处理程序。如果尚未添加事件处理程序，则该字段为 null。
客户端通过事件处理程序 (event handler) 来响应事件。事件处理程序使用 += 运算符附加，使用 -= 运算符移除。下面的示例向 List<string> 类的 Changed 事件附加一个事件处理程序。
对于要求控制事件的底层存储的高级情形，事件声明可以显式提供add和remove访问器，它们在某种程度上类似于属性的set访问器。

变量
变量表示存储位置。每个变量都具有一个类型，用于确定哪些值可以存储在该变量中。C# 是一种类型安全的语言，C# 编译器保证存储在变量中的值总是具有合适的类型。通过赋值或使用 ++ 和 -- 运算符可以更改变量的值。
在可以获取变量的值之前，变量必须已明确赋值 (definitely assigned)。
C# 定义了 7 类变量：静态变量、实例变量、数组元素、值参数、引用参数、输出参数和局部变量。
静态变量
用 static 修饰符声明的字段称为静态变量。静态变量在包含了它的那个类型的静态构造函数执行之前就存在了，在退出关联的应用程序域时不复存在。
静态变量的初始值是该变量的类型的默认值。出于明确赋值检查的目的，静态变量被视为初始已赋值。
实例变量
未用 static 修饰符声明的字段称为实例变量。
类的实例变量在创建该类的新实例时开始存在，在所有对该实例的引用都已终止，并且已执行了该实例的析构函数时终止。类实例变量的初始值是该变量的类型的默认值。出于明确赋值检查的目的，类的实例变量被视为初始已赋值。
结构的实例变量与它所属的结构变量具有完全相同的生存期。换言之，当结构类型的变量开始存在或停止存在时，该结构的实例变量也随之存在或消失。结构的实例变量与包含它的结构变量具有相同的初始赋值状态。换言之，当结构变量本身被视为初始已赋值时，它的实例变量也被视为初始已赋值。而当结构变量被视为初始未赋值时，它的实例变量同样被视为未赋值。
数组元素
数组的元素在创建数组实例时开始存在，在没有对该数组实例的引用时停止存在。每个数组元素的初始值都是其数组元素类型的默认值。出于明确赋值检查的目的，数组元素被视为初始已赋值。
值参数
未用 ref 或 out 修饰符声明的参数为值参数。
值形参在调用该形参所属的函数成员（方法、实例构造函数、访问器或运算符）或匿名函数时开始存在，并用调用中给定的实参的值初始化。当返回该函数成员或匿名函数时值形参通常停止存在。但是，如果值形参被匿名函数捕获，则其生存期将至少延长到从该匿名函数创建的委托或表达式树可以被垃圾回收为止。
出于明确赋值检查的目的，值形参被视为初始已赋值。
引用形参
用 ref 修饰符声明的形参是引用形参。
引用形参不创建新的存储位置。它表示在对该函数成员或匿名函数调用中以实参形式给出的变量所在的存储位置。因此，引用形参的值总是与基础变量相同。
下面的明确赋值规则适用于引用形参。
变量在可以作为引用形参在函数成员或委托调用中传递之前，必须已明确赋值。
在函数成员或匿名函数内部，引用形参被视为初始已赋值。
在结构类型的实例方法或实例访问器内部，this 关键字的行为与该结构类型的引用形参完全相同。
输出形参
用 out 修饰符声明的形参是输出形参。
输出形参不创建新的存储位置。而输出形参表示在对该函数成员或委托调用中以实参形式给出的变量所在的存储位置。因此，输出形参的值总是与基础变量相同。
下面的明确赋值规则应用于输出形参。
变量在可以作为输出形参在函数成员或委托调用中传递之前无需明确赋值。
在正常完成函数成员或委托调用之后，每个作为输出形参传递的变量都被认为在该执行路径中已赋值。
在函数成员或匿名函数内部，输出形参被视为初始未赋值。
函数成员或匿名函数的每个输出形参在该函数成员或匿名函数正常返回前都必须已明确赋值。
在结构类型的实例构造函数内部，this 关键字的行为与结构类型的输出形参完全相同。
局部变量
	隐形局部变量通过 var 来声明，不过只能用于局部变量，并且一旦赋值后，变量类型即被确定，不能改变。
variable-reference 是一个 expression，它被归类为一个变量。variable-reference 表示一个存储位置，访问它可以获取当前值以及存储新值。
在 C 和 C++ 中，variable-reference 称为 lvalue。
下列数据类型的读写是原子形式的：bool、char、byte、sbyte、short、ushort、uint、int、float 和引用类型。除此之外，当枚举类型的基础类型的属于上述类型之一时，对它的读写也是原子的。其他类型的读写，包括 long、ulong、double 和 decimal 以及用户定义类型，都不一定是原子的。除专为该目的设计的库函数以外，对于增量或减量这类操作也不能保证进行原子的读取、修改和写入。
 
转换
转换(conversion) 使表达式可以被视为一种特定类型。转换可导致将给定类型的表达式视为具有不同的类型，或其可导致没有类型的表达式获得一种类型。转换可以是隐式的 (implicit) 或显式的 (explicit)，这将确定是否需要显式地强制转换。
匿名函数转换
从其他 C# 构造的角度描述可能的匿名函数转换实现方法。此处所描述的实现基于 Microsoft C# 编译器所使用的相同原理，但决非强制性的实现方式，也不是唯一可能的实现方式。
public delegate void D();
//匿名函数的最简单形式是不捕获外层变量的形式：
class Test1
{
    static void F()
    {
        D d = () => { Console.WriteLine("test"); };
    }
}
//这可转换为引用编译器生成的静态方法的委托实例化，匿名函数的代码就位于该静态方法中：
class Test2
{
    static void F()
    {
        D d = new D(__Method1);
    }
    static void __Method1()
    {
        Console.WriteLine("test");
    }
}
//在下面的示例中，匿名函数引用 this 的实例成员：
class Test3
{
    int x;
    void F()
    {
        D d = () => { Console.WriteLine(x); };
    }
}
//这可转换为包含该匿名函数代码的、编译器生成的实例方法：
class Test4
{
    int x;
    void F()
    {
        D d = new D(__Method1);
    }
    void __Method1()
    {
        Console.WriteLine(x);
    }
}
//在此示例中，匿名函数捕获一个局部变量：
class Test5
{
    void F()
    {
        int y = 123;
        D d = () => { Console.WriteLine(y); };
    }
}
局部变量的生存期现在必须至少延长为匿名函数委托的生存期。这可以通过将局部变量“提升”到编译器生成的类的字段来实现。之后，局部变量的实例化对应于为编译器生成的类创建实例，而访问局部变量则对应于访问编译器生成的类的实例中的字段。而且，匿名函数将会成为编译器生成类的实例方法。
方法组转换
delegate string D1(object o);
delegate object D2(string s);
delegate object D3();
delegate string D4(object o, params object[] a);
delegate string D5(int i);
class Test
{
    static string F(object o) {...}
    static void G()
    {
        D1 d1 = F;          // Ok
        D2 d2 = F;          // Ok
        D3 d3 = F;          // Error – not applicable
        D4 d4 = F;          // Error – not applicable in normal form
        D5 d5 = F;          // Error – applicable but not compatible
    }
}


C#核心
	下面讲解C#语言的核心内容
Object

![x](./Resource/18.jpg)

迭代器
	迭代器特点：

![x](./Resource/151.png)



using System;

namespace com.starchen.core
{
    class Program
    {
        static void Main(string[] args)
        {
            //创建一个 StudentList 型的变量 
            StudentList myStudentList = new StudentList();
            //使用迭代器获得 myStudentList 的字段值
            foreach(var student in myStudentList)
            {
                //输出当前遍历的变量值
                Console.WriteLine(student.ToString());
            }
            Console.ReadLine();
        }
    }
    /// <summary>
    /// StudentList类
    /// </summary>
    class StudentList
    {
        string student1 = "甲";
        string student2 = "乙";
        string student3 = "丙";
        string student4 = "丁";
        string student5 = "戊";

        public string Student1
        {
            get
            {
                return student1;
            }

            set
            {
                student1 = value;
            }
        }

        public string Student2
        {
            get
            {
                return student2;
            }

            set
            {
                student2 = value;
            }
        }

        public string Student3
        {
            get
            {
                return student3;
            }

            set
            {
                student3 = value;
            }
        }

        public string Student4
        {
            get
            {
                return student4;
            }

            set
            {
                student4 = value;
            }
        }

        public string Student5
        {
            get
            {
                return student5;
            }

            set
            {
                student5 = value;
            }
        }

        /// <summary>
        /// 类 StudentList 的迭代器
        /// </summary>
        /// <returns></returns>
        public System.Collections.IEnumerator GetEnumerator()
        {
            //通过 for 循环对 StudentList 类中的 5 个 string 类型的变量进行处理
            for (int i = 0; i < 5; i++)
            {
                //通过switch对for循环中的i进行判断，返回相应的变量
                switch (i)
                {
                    case 0: yield return student1; break;
                    case 1: yield return student2; break;
                    case 2: yield return student3; break;
                    case 3: yield return student4; break;
                    case 4: yield return student5; break;
                }
            }
        }
    }
}
foreach语句用于访问数组或对象集合中的每个元素，同样也可以用于实现了迭代器的类，但不应用于更改集合内容，以避免产生不可预知的错误。
yield
yield 语句用在迭代器块中，作用是向迭代器的枚举器对象或可枚举对象产生一个值，或者通知迭代结束。yield 不是保留字；它仅在紧靠 return 或 break 关键字之前使用时才具有特殊意义。在其他上下文中，yield 可用作标识符。
下面的示例演示 yield 语句的有效用法和无效用法。
delegate IEnumerable<int> D();

IEnumerator<int> GetEnumerator()
{
    try
    {
        yield return 1;     // Ok
        yield break;        // Ok
    }
    finally
    {
        yield return 2;     // Error, yield in finally
        yield break;        // Error, yield in finally
    }
    try
    {
        yield return 3;     // Error, yield return in try...catch
        yield break;        // Ok
    }
    catch
    {
        yield return 4;     // Error, yield return in try...catch
        yield break;        // Ok
    }
    D d = delegate {
        yield return 5;     // Error, yield in an anonymous function
    };
}
int MyMethod()
{
    yield return 1;		 // Error, wrong return type for an iterator block
}
yield return 语句中的表达式的类型必须能够隐式转换为迭代器的产生类型。yield return 语句的执行方式如下：
•	计算该语句中给出的表达式，隐式转换为产生类型，并赋给枚举器对象的Current属性。
•	迭代器块的执行被挂起。如果 yield return 语句在一个或多个 try 块内，则与之关联的 finally 块此时不会执行。
•	枚举器对象的 MoveNext 方法向其调用方返回 true，指示枚举器对象成功前进到下一项。下次调用枚举器对象的 MoveNext 方法时将从上次挂起的地方恢复迭代器块的执行。
分部类
	.Net2.0中出现的概念。将类、结构或接口的定义拆分到两个或多个源文件中，每个源文件包含类定义的一部分，编译时会把所有部分组合起来。分部类使用partial关键字定义。需要注意的是，分部类的各个部分都需要使用partial关键字，并且需要有相同的访问级别，不过可以实现不同的接口或继承不同的父类，编译时会整合。

泛型

特性
C# 语言的一个重要特征是使程序员能够为程序中定义的实体指定声明性信息。
C# 使程序员可以创造新的声明性信息的种类，称为特性 (attributes)。然后，程序员可以将这种特性附加到各种程序实体，而且在运行时环境中还可以检索这些特性信息。
特性类
从抽象类 System.Attribute 派生的类（不论是直接的还是间接的）都称为特性类 (attribute class)。一个关于特性类的声明定义一种新特性 (attributes)，它可以放置在其他声明上。按照约定，特性类的名称均带有 Attribute 后缀。使用特性时可以包含或省略此后缀。
特性 AttributeUsage用于描述使用特性类的方式。AttributeUsage 具有一个定位参数，该参数使特性类能够指定自己可以用在哪种声明上。下面的示例
using System;
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Interface)]
public class SimpleAttribute: Attribute 
{
	...
}
定义了一个名为SimpleAttribute的特性类，此特性类只能放在class-declaration和interface-declaration上。下面的示例 
[Simple] 
class Class1 {...}
[Simple] 
interface Interface1 {...}
演示了 Simple 特性的几种用法。虽然此特性是用名称 SimpleAttribute 定义的，但在使用时可以省略 Attribute 后缀，从而得到简称 Simple。
AttributeUsage 还具有一个名为 AllowMultiple 的命名参数，此参数用于说明对于某个给定实体，是否可以多次指定该特性。如果特性类的 AllowMultiple 为 true，则此特性类是多次性特性类 (multi-use attribute class)，可以在一个实体上多次被指定。如果特性类的 AllowMultiple 为 false 或未指定，则此特性类是一次性特性类 (single-use attribute class)，在一个实体上最多只能指定一次。下面的示例
using System;
[AttributeUsage(AttributeTargets.Class, AllowMultiple = true)]
public class AuthorAttribute: Attribute
{
	private string name;
	public AuthorAttribute(string name) {
		this.name = name;
	}
	public string Name {
		get { return name; }
	}
}
定义一个多次使用的特性类，名为 AuthorAttribute。下面的示例 
[Author("Brian Kernighan"), Author("Dennis Ritchie")] 
class Class1
{
	...
}
演示了一个两次使用 Author 特性的类声明。
AttributeUsage 具有另一个名为 Inherited 的命名参数，此参数指示在基类上指定该特性时，该特性是否也会被从此基类派生的类所继承。如果特性类的 Inherited 为 true，则该特性会被继承。如果特性类的 Inherited 为 false，则该特性不会被继承。如果该值未指定，则其默认值为true。
特性类可以具有定位参数 (positional parameter) 和命名参数 (named parameter)。特性类的每个公共实例构造函数为该特性类定义一个有效的定位参数序列。特性类的每个非静态公共读写字段和属性为该特性类定义一个命名参数。下面的示例:
using System;
[AttributeUsage(AttributeTargets.Class)]
public class HelpAttribute: Attribute
{
	public HelpAttribute(string url) {		// Positional parameter
		...
	}
	public string Topic {						// Named parameter
		get {...}
		set {...}
	}
	public string Url {
		get {...}
	}
}
定义了一个名为 HelpAttribute 的特性类，它具有一个定位参数 (url) 和一个命名参数 (Topic)。虽然 Url 属性是非静态的和公共的，但由于它不是读写的，因此它并不定义命名参数。此特性类可以如下方式使用：
[Help("http://www.mycompany.com/.../Class1.htm")]
class Class1
{
	...
}
[Help("http://www.mycompany.com/.../Misc.htm", Topic = "Class2")]
class Class2
{
	...
}
特性类的定位参数和命名参数的类型仅限于特性参数类型 (attribute parameter type)，它们是以下类型之一：bool、byte、char、double、float、int、long、sbyte、short、string、uint、ulong、ushort、object类型、System.Type 类型、枚举类型(前提是该枚举类型具有public可访问性，而且所有嵌套着它的类型(如果有)也必须具有public可访问性)以及以上类型的一维数组。不是这些类型的构造函数实参或公共字段不能用作特性规范中的位置或命名形参。
特性说明
特性规范 (Attribute specification) 就是将以前定义的特性应用到某个声明上。特性本身是一段附加说明性信息，可以把它指定给某个声明。可以在全局范围指定特性（即，在包含程序集或模块上指定特性），也可以为下列各项指定特性：type-declarations、class-member-declarations、interface-member-declaration、struct-member-declarations、enum-member-declarations、accessor-declaration、event-accessor-declarations和formal-parameter-lists。
特性是在特性节 (attribute section) 中指定的。特性节由一对方括号组成，此方括号括着一个用逗号分隔的、含有一个或多个特性的列表。在这类列表中以何种顺序指定特性，以及附加到同一程序实体的特性节以何种顺序排列等细节并不重要。例如，特性说明 [A][B]、[B][A]、[A, B] 和 [B, A] 是等效的。
如上所述，特性由一个 attribute-name 和一个可选的定位和命名参数列表组成。定位参数（如果有）列在命名参数前面。定位参数包含一个 attribute-argument-expression；命名参数包含一个名称，名称后接一个等号和一个 attribute-argument-expression，这两种参数都受简单赋值规则约束。命名参数的排列顺序无关紧要。
attribute-name 用于标识特性类。如果 attribute-name 的形式等同于一个 type-name，则此名称必须引用一个特性类。否则将发生编译时错误。下面的示例
某些上下文允许将一个特性指定给多个目标。程序中可以利用 attribute-target-specifier 来显式地指定目标。特性放置在全局级别中时，则需要 global-attribute-target-specifier。对于所有其他位置上的特性，则采用系统提供的合理的默认值，但是在某些目标不明确的情况下可以使用 attribute-target-specifier 来确认或重写默认值，也可以在目标明确的情况下使用特性目标说明符来确认默认值。因此，除在全局级别之外，通常可以省略 attribute-target-specifiers。
类声明既可以包括也可以省略说明符 type：
[type: Author("Brian Kernighan")]
class Class1 {}
[Author("Dennis Ritchie")]
class Class2 {}
如果指定了无效的 attribute-target-specifier，则会发生错误。例如，不能将说明符 param 用在类声明中：
[param: Author("Brian Kernighan")]		// Error
class Class1 {}
按照约定，特性类的名称均带有 Attribute 后缀。type-name 形式的 attribute-name 既可以包含也可以省略此后缀。如果发现特性类中同时出现带和不带此后缀的名称，则引用时就可能出现多义性，从而导致运行时错误。如果在拼写 attribute-name 时，明确说明其最右边的 identifier 为逐字标识符，则它仅匹配没有后缀的特性，从而能够解决这类多义性。下面的示例
using System;

[AttributeUsage(AttributeTargets.All)]
public class X: Attribute { }

[AttributeUsage(AttributeTargets.All)]
public class XAttribute: Attribute { }

[X]						// Error: ambiguity
class Class1 {}

[XAttribute]			// Refers to XAttribute
class Class2 {}

[@X]						// Refers to X
class Class3 {}

[@XAttribute]			// Refers to XAttribute
class Class4 {}

演示两个分别名为 X 和 XAttribute 的特性类。特性 [X] 含义不明确，因为该特性即可引用 X 也可引用 XAttribute。使用逐字标识符能够在这种极少见的情况下表明确切的意图。特性 [XAttribute] 是明确的（尽管当存在名为 XAttributeAttribute 的特性类时，该特性将是不明确的！）。如果移除了类 X 的声明，那么上述两个特性都将引用名为 XAttribute 的特性类。
在同一个实体中多次使用单次使用的特性类属于编译时错误。下面的示例
using System;

[AttributeUsage(AttributeTargets.Class)]
public class HelpStringAttribute: Attribute
{
	string value;
	public HelpStringAttribute(string value) {
		this.value = value;
	}
	public string Value {
		get {...}
	}
}

[HelpString("Description of Class1")]
[HelpString("Another description of Class1")]
public class Class1 {}

产生编译时错误，因为它尝试在 Class1 的声明中多次使用单次使用的特性类 HelpString。
如果表达式 E 满足下列所有条件，则该表达式为 attribute-argument-expression ：
	E 的类型是特性参数类型。
	在编译时，E 的值可以解析为下列之一：常量值，System.Type对象，attribute-argument-expression的一维数组。
例如：
using System;

[AttributeUsage(AttributeTargets.Class)]
public class TestAttribute: Attribute
{
	public int P1 {
		get {...}
		set {...}
	}
	public Type P2 {
		get {...}
		set {...}
	}
	public object P3 {
		get {...}
		set {...}
	}
}
[Test(P1 = 1234, P3 = new int[] {1, 3, 5}, P2 = typeof(float))]
class MyClass {}

用作特性实参表达式的 typeof-expression可引用非泛型类型、封闭构造类型或未绑定的泛型类型，但是不能引用开放类型。这用于确保在编译时可以解析表达式。
class A: Attribute
{
	public A(Type t) {...}
}
class G<T>
{
	[A(typeof(T))] T t;					// Error, open type in attribute
}
class X
{
	[A(typeof(List<int>))] int x;		// Ok, closed constructed type
	[A(typeof(List<>))] int y;			// Ok, unbound generic type
}


特性实例
特性实例 (attribute instance) 是一个实例，用于在运行时表示特性。特性是用特性类、定位参数和命名参数定义的。特性实例是一个特性类的实例，它是用定位参数和命名参数初始化后得到的。
特性实例的检索涉及编译时和运行时处理，详见后面几节中的介绍。
1.1.1 特性的编译
对于一个具有特性类 T、positional-argument-list P和 named-argument-list N 的 attribute 的编译过程由下列步骤组成:
•	遵循形式为 new T(P) 的 object-creation-expression 的编译规则所规定的步骤进行编译时处理。这些步骤或者导致编译时错误，或者确定 T 上的可以在运行时调用的实例构造函数 C。
•	如果 C 不具有公共可访问性，则发生编译时错误。
•	对于 N 中的每个 named-argument Arg：
	将 Name 设为 named-argument Arg 的 identifier。
	Name 必须标识 T 中的一个非静态读写 public 字段或属性。如果 T 没有这样的字段或属性，则发生编译时错误。
•	保留以下信息用于特性的运行时实例化：特性类 T、T 上的实例构造函数 C、positional-argument-list P 和 named-argument-list N。
1.1.2 特性实例的运行时检索
对一个 attribute 进行编译后，会产生一个特性类 T、一个 T 上的实例构造函数 C、一个 positional-argument-list P 和一个 named-argument-list N。给定了上述信息后，就可以在运行时使用下列步骤进行检索来生成一个特性实例：
•	遵循执行 new T(P) 形式的 object-creation-expression（使用在编译时确定的实例构造函数 C）的运行时处理步骤。这些步骤或者导致异常，或者产生 T 的一个实例 O。
•	对于 N 中的每个 named-argument Arg，按以下顺序进行处理:
	将 Name 设为 named-argument Arg 的 identifier。如果 Name 未在 O 上标识一个非静态公共读写字段或属性，则将引发异常。
	将 Value 设为 Arg 的 attribute-argument-expression 的计算结果。
	如果 Name 标识 O 上的一个字段，则将此字段设置为 Value。
	否则，Name 就标识 O 上的一个属性。将此属性设置为 Value。
	结果为 O，它是已经用 positional-argument-list P 和 positional-argument-list P 初始化了的特性类 T 的一个实例。
1.2 保留特性
少数特性以某种方式影响语言。这些特性包括：
•	System.AttributeUsageAttribute（第 17.4.1 节），它用于描述可以以哪些方式使用特性类。
•	System.Diagnostics.ConditionalAttribute（第 17.4.2 节），它用于定义条件方法。
•	System.ObsoleteAttribute（第 17.4.3 节），它用于将某个成员标记为已过时。
1.2.1 AttributeUsage 特性
AttributeUsage 特性用于描述使用特性类的方式。
用 AttributeUsage 特性修饰的类必须直接或间接从 System.Attribute 派生。否则将发生编译时错误。
namespace System
{
	[AttributeUsage(AttributeTargets.Class)]
	public class AttributeUsageAttribute: Attribute
	{
		public AttributeUsageAttribute(AttributeTargets validOn) {...}
		public virtual bool AllowMultiple { get {...} set {...} }
		public virtual bool Inherited { get {...} set {...} }
		public virtual AttributeTargets ValidOn { get {...} }
	}
	public enum AttributeTargets
	{
		Assembly 	= 0x0001,
		Module 		= 0x0002,
		Class 		= 0x0004,
		Struct 		= 0x0008,
		Enum 			= 0x0010,
		Constructor = 0x0020,
		Method 		= 0x0040,
		Property 	= 0x0080,
		Field 		= 0x0100,
		Event 		= 0x0200,
		Interface 	= 0x0400,
		Parameter 	= 0x0800,
		Delegate 	= 0x1000,
		ReturnValue = 0x2000,
		All = Assembly | Module | Class | Struct | Enum | Constructor | 
			Method | Property | Field | Event | Interface | Parameter | 
			Delegate | ReturnValue
	}
}
1.2.2 Conditional 特性
通过特性 Conditional 可实现条件方法 (conditional method) 和条件特性类 (conditional attribute class) 的定义。
namespace System.Diagnostics
{
	[AttributeUsage(AttributeTargets.Method | AttributeTargets.Class,
                   AllowMultiple = true)]
	public class ConditionalAttribute: Attribute
	{
		public ConditionalAttribute(string conditionString) {...}
		public string ConditionString { get {...} }
	}
}
1.2.2.1 条件方法
用 Conditional 特性修饰的方法是条件方法。Conditional 特性通过测试条件编译符号来指示条件。当运行到一个条件方法调用时，是否执行该调用，要根据出现该调用时是否已定义了此符号来确定。如果定义了此符号，则执行该调用；否则省略该调用（包括对调用的接收器和形参的计算）。
条件方法要受到以下限制：
•	条件方法必须是 class-declaration 或 struct-declaration 中的方法。如果在接口声明中的方法上指定 Conditional 特性，将出现编译时错误。
•	条件方法必须具有 void 返回类型。
•	不能用 override 修饰符标记条件方法。但是，可以用 virtual 修饰符标记条件方法。此类方法的重写方法隐含为有条件的方法，而且不能用 Conditional 特性显式标记。
•	条件方法不能是接口方法的实现。否则将发生编译时错误。
此外，如果条件方法用在 delegate-creation-expression 中，也会发生编译时错误。下面的示例
#define DEBUG
using System;
using System.Diagnostics;
class Class1 
{
	[Conditional("DEBUG")]
	public static void M() {
		Console.WriteLine("Executed Class1.M");
	}
}
class Class2
{
	public static void Test() {
		Class1.M();
	}
}
将 Class1.M 声明为条件方法。Class2 的 Test 方法调用此方法。由于定义了条件编译符号 DEBUG，因此如果调用 Class2.Test，则它会调用 M。如果尚未定义符号 DEBUG，那么 Class2.Test 将不会调用 Class1.M。
一定要注意包含或排除对条件方法的调用是由该调用所在处的条件编译符号控制的。在下面的示例中
文件 class1.cs：
using System.Diagnostics;
class Class1 
{
	[Conditional("DEBUG")]
	public static void F() {
		Console.WriteLine("Executed Class1.F");
	}
}
文件 class2.cs：
#define DEBUG
class Class2
{
	public static void G() {
		Class1.F();				// F is called
	}
}
文件 class3.cs：
#undef DEBUG
class Class3
{
	public static void H() {
		Class1.F();				// F is not called
	}
}
类 Class2 和 Class3 分别包含对条件方法 Class1.F 的调用，根据是否定义了 DEBUG，此调用是有条件的。由于在 Class2的上下文中定义了此符号而在 Class3 的上下文中没有定义，因此在 Class3 中包含了对 F 的调用，而在 Class3 中省略了对 F 的调用。
在继承链中使用条件方法可能引起混乱。通过 base.M 形式的 base 对条件方法进行的调用受正常条件方法调用规则的限制。在下面的示例中
文件 class1.cs：
using System;
using System.Diagnostics;
class Class1 
{
	[Conditional("DEBUG")]
	public virtual void M() {
		Console.WriteLine("Class1.M executed");
	}
}
文件 class2.cs：
using System;
class Class2: Class1
{
	public override void M() {
		Console.WriteLine("Class2.M executed");
		base.M();						// base.M is not called!
	}
}
文件 class3.cs：
#define DEBUG
using System;
class Class3
{
	public static void Test() {
		Class2 c = new Class2();
		c.M();							// M is called
	}
}
Class2 包括一个对在其基类中定义的 M 的调用。此调用被省略，因为基方法是条件性的，依赖于符号 DEBUG 是否存在，而该符号在此处没有定义。因此，该方法仅向控制台写入“Class2.M executed”。审慎使用 pp-declaration 可以消除这类问题。
1.2.2.2 条件特性类
使用一个或多个 Conditional 特性修饰的特性类（第 17.1 节）就是条件特性类 (conditional attribute class)。条件特性类因此与在其 Conditional 特性中声明的条件编译符号关联。本示例：
using System;
using System.Diagnostics;
[Conditional("ALPHA")]
[Conditional("BETA")]
public class TestAttribute : Attribute {}
将 TestAttribute 声明为与条件编译符号 ALPHA 和 BETA 关联的条件特性类。
如果在特性说明处定义了一个或多个关联的条件编译符号，则条件特性的特性说明（第 17.2 节）也会包括在内；否则会忽略特性说明。
注意包含或排除条件特性类的特性规范是由该指定所在位置的条件编译符号控制的，这一点很重要。在下面的示例中
文件 test.cs：
using System;
using System.Diagnostics;
[Conditional(“DEBUG”)]
public class TestAttribute : Attribute {}
文件 class1.cs：
#define DEBUG
[Test]				// TestAttribute is specified
class Class1 {}
文件 class2.cs：
#undef DEBUG
[Test] 				// TestAttribute is not specified
class Class2 {}
类 Class1 和 Class2 各自使用特性 Test 进行修饰，该特性基于是否定义 DEBUG 构成条件。因为此符号是在 Class1 而不是 Class2 的上下文中定义，所以包含 Class1 上 Test 特性的规范，而省略 Class2 上 Test 特性的规范。

1.2.3 Obsolete 特性
Obsolete 特性用于标记不应该再使用的类型和类型成员。
namespace System
{
	[AttributeUsage(
		AttributeTargets.Class | 
		AttributeTargets.Struct |
	 	AttributeTargets.Enum | 
		AttributeTargets.Interface | 
		AttributeTargets.Delegate |
		AttributeTargets.Method | 
		AttributeTargets.Constructor |
		AttributeTargets.Property | 
		AttributeTargets.Field |
		AttributeTargets.Event,
		Inherited = false)
	]
	public class ObsoleteAttribute: Attribute
	{
		public ObsoleteAttribute() {...}
		public ObsoleteAttribute(string message) {...}
		public ObsoleteAttribute(string message, bool error) {...}
		public string Message { get {...} }
		public bool IsError { get {...} }
	}
}
如果程序使用了由 Obsolete 特性修饰的类型或成员，则编译器将发出警告或错误信息。具体而言，如果没有提供错误参数，或者如果提供了错误参数但该错误参数的值为 false，则编译器将发出警告。如果指定了错误参数并且该错误参数的值为 true，则会引发一个编译时错误。
在下面的示例中
[Obsolete("This class is obsolete; use class B instead")]
class A
{
	public void F() {}
}
class B
{
	public void F() {}
}
class Test
{
	static void Main() {
		A a = new A(); 		// Warning
		a.F();
	}
}
类 A 是用 Obsolete 特性修饰的。Main 的代码中，每次使用 A 时均会导致一个包含指定消息“This class is obsolete; use class B instead”(此类已过时；请改用类 B)的警告。
1.3 互操作的特性
注意：本节仅适用于 C# 的 Microsoft .NET 实现。
1.3.1 与 COM 和 Win32 组件的互操作
.NET 运行时提供大量特性，通过这些特性，C# 程序可以与使用 COM 和 Win32 DLL 编写的组件进行交互操作。例如，可以在 static extern 方法上使用 DllImport 特性来表示该方法的实现应该到 Win32 DLL 中去查找。这些特性可在 System.Runtime.InteropServices 命名空间中找到，关于这些特性的详细文档在 .NET 运行库文档中。
1.3.2 与其他 .NET 语言的互操作
1.3.2.1 IndexerName 特性
索引器是利用索引属性在 .NET 中实现的，并且具有一个属于 .NET 元数据的名称。如果索引器没有被指定 IndexerName 特性，则默认情况下将使用名称 Item。IndexerName 特性使开发人员可以重写此默认名称并指定不同的名称。
namespace System.Runtime.CompilerServices.CSharp
{
	[AttributeUsage(AttributeTargets.Property)]
	public class IndexerNameAttribute: Attribute
	{
		public IndexerNameAttribute(string indexerName) {...}
		public string Value { get {...} } 
	}
} 
不安全代码
如前面几章所定义，核心 C# 语言没有将指针列入它所支持的数据类型，从而与 C 和 C++ 有着显著的区别。作为替代，C# 提供了各种引用类型，并能够创建可由垃圾回收器管理的对象。这种设计结合其他功能，使 C# 成为比 C 或 C++ 安全得多的语言。在核心 C# 语言中，不可能有未初始化的变量、“虚”指针或者超过数组的界限对其进行索引的表达式。这样，以往总是不断地烦扰 C 和 C++ 程序的一系列错误就不会再出现了。
尽管实际上对 C 或 C++ 中的每种指针类型构造，C# 都设置了与之对应的引用类型，但仍然会有一些场合需要访问指针类型。例如，当需要与基础操作系统进行交互、访问内存映射设备，或实现一些以时间为关键的算法时，若没有访问指针的手段，就不可能或者至少很难完成。为了满足这样的需求，C# 提供了编写不安全代码 (unsafe code) 的能力。
在不安全代码中，可以声明和操作指针，可以在指针和整型之间执行转换，还可以获取变量的地址，等等。在某种意义上，编写不安全代码很像在 C# 程序中编写 C 代码。
无论从开发人员还是从用户角度来看，不安全代码事实上都是一种“安全”功能。不安全代码必须用修饰符 unsafe 明确地标记，这样开发人员就不会误用不安全功能，而执行引擎将确保不会在不受信任的环境中执行不安全代码。
18.1不安全上下文
C# 的不安全功能仅用于不安全上下文中。不安全上下文是通过在类型或成员的声明中包含一个 unsafe 修饰符或者通过使用 unsafe-statement 引入的：
•	类、结构、接口或委托的声明可以包含一个 unsafe 修饰符，在这种情况下，该类型声明的整个文本范围（包括类、结构或接口的体）被认为是不安全上下文。
•	在字段、方法、属性、事件、索引器、运算符、实例构造函数、析构函数或静态构造函数的声明中，也可以包含一个 unsafe 修饰符，在这种情况下，该成员声明的整个文本范围被认为是不安全上下文。
•	unsafe-statement 使得可以在 block 内使用不安全上下文。该语句关联的 block 的整个文本范围被认为是不安全上下文。
下面显示了关联的语法扩展。为简单起见，我们使用省略号（...）表示前面章节中出现的产生式。
class-modifier:
...
unsafe
struct-modifier:
...
unsafe
interface-modifier:
...
unsafe
delegate-modifier:
...
unsafe
field-modifier:
...
unsafe
method-modifier:
...
unsafe
property-modifier:
...
unsafe
event-modifier:
...
unsafe
indexer-modifier:
...
unsafe
operator-modifier:
...
unsafe
constructor-modifier:
...
unsafe
destructor-declaration:
attributesopt   externopt   unsafeopt   ~   identifier   (   )    destructor-body
attributesopt   unsafeopt   externopt   ~   identifier   (   )    destructor-body
static-constructor-modifiers:
externopt   unsafeopt   static
unsafeopt   externopt   static
externopt   static   unsafeopt 
unsafeopt   static   externopt
static   externopt   unsafeopt
static   unsafeopt   externopt
embedded-statement:
...
unsafe-statement
unsafe-statement:
unsafe   block
在下面的示例中
public unsafe struct Node
{
	public int Value;
	public Node* Left;
	public Node* Right;
}
在结构声明中指定的 unsafe 修饰符导致该结构声明的整个文本范围成为不安全上下文。因此，可以将 Left 和 Right 字段声明为指针类型。上面的示例还可以编写为
public struct Node
{
	public int Value;
	public unsafe Node* Left;
	public unsafe Node* Right;
}
此处，字段声明中的 unsafe 修饰符导致这些声明被认为是不安全上下文。
除了建立不安全上下文从而允许使用指针类型外，unsafe 修饰符对类型或成员没有影响。在下面的示例中
public class A
{
	public unsafe virtual void F() {
		char* p;
		...
	}
}
public class B: A
{
	public override void F() {
		base.F();
		...
	}
}
A 中 F 方法上的 unsafe 修饰符直接导致 F 的文本范围成为不安全上下文并可以在其中使用语言的不安全功能。在 B 中对 F 的重写中，不需要重新指定 unsafe 修饰符，除非 B 中的 F 方法本身需要访问不安全功能。
当指针类型是方法签名的一部分时，情况略有不同
public unsafe class A
{
	public virtual void F(char* p) {...}
}
public class B: A
{
	public unsafe override void F(char* p) {...}
}
此处，由于 F 的签名包括指针类型，因此它只能写入不安全上下文中。然而，为设置此不安全上下文，既可以将整个类设置为不安全的（如 A 中的情况），也可以仅在方法声明中包含一个 unsafe 修饰符（如 B 中的情况）。
2.2 指针类型
在不安全上下文中，type（第 4 章）可以是 pointer-type，也可以是 value-type 或 reference-type。但是，pointer-type 也可以在不安全上下文外部的 typeof 表达式（第 7.6.10.6 节）中使用，因为此类使用不是不安全的。
type:
...
pointer-type
pointer-type 可表示为 unmanaged-type 后接一个 * 标记，或者关键字 void 后接一个 * 标记：
pointer-type:
unmanaged-type   *
void   *
unmanaged-type:
type
指针类型中，在 * 前面指定的类型称为该指针类型的目标类型 (referent type)。它表示该指针类型的值所指向的变量的类型。
与引用（引用类型的值）不同，指针不受垃圾回收器跟踪（垃圾回收器并不知晓指针和它们指向的数据）。出于此原因，不允许指针指向引用或者包含引用的结构，并且指针的目标类型必须是 unmanaged-type。
unmanaged-type 为不是 reference-type 或构造类型的任何类型，不在任何嵌套级别上包含 reference-type 或构造类型字段。换句话说，unmanaged-type 是下列类型之一：
•	sbyte、byte、short、ushort、int、uint、long、ulong、char、float、double、decimal 或 bool。
•	任何 enum-type。
•	任何 pointer-type。
•	非构造类型且仅包含 unmanaged-type 的字段的任何用户定义 struct-type。
将指针和引用进行混合使用时的基本规则是；引用（对象）的目标可以包含指针，但指针的目标不能包含引用。
下表给出了一些指针类型的示例：

示例	说明
byte*	指向 byte 的指针
char*	指向 char 的指针
int**	指向 int 的指针的指针
int*[]	一维数组，它的元素是指向 int 的指针
void*	指向未知类型的指针

对于某个给定实现，所有的指针类型都必须具有相同的大小和表示形式。
与 C 和 C++ 不同，在 C# 中，当在同一声明中声明多个指针时，* 只与基础类型写在一起，而不充当每个指针名称的前缀标点符号。例如
int* pi, pj;	// NOT as int *pi, *pj;
类型为 T* 的一个指针的值表示类型为 T 的一个变量的地址。指针间接寻址运算符 *（第 18.5.1 节）可用于访问此变量。例如，给定
 int* 类型的变量 P，则表达式 *P 表示 int 变量，该变量的地址就是 P 的值。
与对象引用类似，指针可以是 null。如果将间接寻址运算符应用于 null 指针，则其行为将由实现自己定义。值为 null 的指针表示为将该指针的所有位都置零。
void* 类型表示指向未知类型的指针。因为目标类型是未知的，所以间接寻址运算符不能应用于 void* 类型的指针，也不能对这样的指针执行任何算术运算。但是，void* 类型的指针可以强制转换为任何其他指针类型（反之亦然）。
指针类型是一个单独类别的类型。与引用类型和值类型不同，指针类型不从 object 继承，而且不存在指针类型和 object 之间的转换。具体而言，指针不支持装箱和取消装箱（第 4.3 节）操作。但是，允许在不同指针类型之间以及指针类型与整型之间进行转换。第 18.4 节中对此进行了介绍。
pointer-type 不能用作类型实参（第 4.4 节），且类型推断（第 7.5.2 节）在泛型方法调用期间失败，因为该调用会将类型实参推断为指针类型。
pointer-type 可用作易失字段的类型（第 10.5.3 节）。
虽然指针可以作为 ref 或 out 参数传递，但这样做可能会导致未定义的行为，例如，指针可能被设置为指向一个局部变量，而当调用方法返回时，该局部变量可能已不存在了；或者指针曾指向一个固定对象，但当调用方法返回时，该对象不再是固定的了。例如：
using System;
class Test
{
	static int value = 20;
	unsafe static void F(out int* pi1, ref int* pi2) {
		int i = 10;
		pi1 = &i;
		fixed (int* pj = &value) {
			// ...
			pi2 = pj;
		}
	}
	static void Main() {
		int i = 10;
		unsafe {
			int* px1;
			int* px2 = &i;
			F(out px1, ref px2);
			Console.WriteLine("*px1 = {0}, *px2 = {1}",
				*px1, *px2);	// undefined behavior
		}
	}
}
方法可以返回某一类型的值，而该类型可以是指针。例如，给定一个指向连续的 int 值序列的指针、该序列的元素个数，和另外一个 int 值 (value)，下面的方法将在该整数序列中查找与该 value 匹配的值，若找到匹配项，则返回该匹配项的地址；否则，它将返回 null：
unsafe static int* Find(int* pi, int size, int value) {
	for (int i = 0; i < size; ++i) {
		if (*pi == value) 
			return pi;
		++pi;
	}
	return null;
}
在不安全上下文中，可以使用下列几种构造操作指针：
•	* 运算符可用于执行指针间接寻址（第 18.5.1 节）。
•	-> 运算符可用于通过指针访问结构的成员（第 18.5.2 节）。
•	[] 运算符可用于索引指针（第 18.5.3 节）。
•	& 运算符可用于获取变量的地址（第 18.5.4 节）。
•	++ 和 -- 运算符可以用于递增和递减指针（第 18.5.5 节）。
•	+ 和 - 运算符可用于执行指针算术运算（第 18.5.6 节）。
•	==、!=、<、>、<= 和 => 运算符可以用于比较指针（第 18.5.7 节）。
•	stackalloc 运算符可用于从调用堆栈中分配内存（第 18.7 节）。
•	fixed 语句可用于临时固定一个变量，以便可以获取它的地址（第 18.6 节）。
2.3 固定和可移动变量
address-of 运算符（第 18.5.4 节）和 fixed 语句（第 18.6 节）将变量分为两种类别：固定变量  (Fixed variables)和可移动变量 (moveable variables)。
固定变量驻留在不受垃圾回收器的操作影响的存储位置中。（固定变量的示例包括局部变量、值参数和由取消指针引用而创建的变量。） 另一方面，可移动变量则驻留在会被垃圾回收器重定位或释放的存储位置中。（可移动变量的示例包括对象中的字段和数组的元素。）
& 运算符（第 18.5.4 节）允许不受限制地获取固定变量的地址。但是，由于可移动变量会受到垃圾回收器的重定位或释放，因此可移动变量的地址只能使用 fixed 语句（第 18.6 节）获取，而且该地址只在此 fixed 语句的生存期内有效。
准确地说，固定变量是下列之一：
•	用引用局部变量或值参数的 simple-name（第 7.6.2 节）表示的变量（如果该变量未由匿名函数捕获）。
•	用 V.I 形式的 member-access（第 7.6.4 节）表示的变量，其中 V 是 struct-type 的固定变量。
•	用 *P 形式的 pointer-element-access（第 18.5.1 节）、P->I 形式的 pointer-member-access（第 18.5.2 节）或 P[E] 形式的 pointer-element-access（第 18.5.3 节）表示的变量。
所有其他变量都属于可移动变量。
请注意静态字段属于可移动变量。还请注意即使赋予 ref 或 out 形参的实参是固定变量，它们仍属于可移动变量。最后请注意，由取消指针引用而产生的变量总是属于固定变量。
2.4 指针转换
在不安全上下文中，可供使用的隐式转换的集合（第 6.1 节）也扩展为包括以下隐式指针转换：
•	从任何 pointer-type 到 void* 类型。
•	从 null 文本到任何 pointer-type。
另外，在不安全上下文中，可供使用的显式转换的集合（第 6.2 节）也扩展为包括以下显式指针转换:
•	从任何 pointer-type 到任何其他 pointer-type。
•	从 sbyte、byte、short、ushort、int、uint、long 或 ulong 到任何 pointer-type。
•	从任何 pointer-type 到 sbyte、byte、short、ushort、int、uint、long 或 ulong。
最后，在不安全上下文中，标准隐式转换（第 6.3.1 节）的集合包括以下指针转换:
•	从任何 pointer-type 到 void* 类型。
两个指针类型之间的转换永远不会更改实际的指针值。换句话说，从一个指针类型到另一个指针类型的转换不会影响由指针给出的基础地址。
当一个指针类型被转换为另一个指针类型时，如果没有将得到的指针正确地对指向的类型对齐，则当结果被取消引用时，该行为将是未定义的。一般情况下，“正确对齐”的概念具有传递性：如果指向类型 A 的指针正确地与指向类型 B 的指针对齐，而此指向类型 B 的指针又正确地与指向类型 C 的指针对齐，则指向类型 A 的指针将正确地与指向类型 C 的指针对齐。
请考虑下列情况，其中具有一个类型的变量被通过指向一个不同类型的指针访问：
char c = 'A';
char* pc = &c;
void* pv = pc;
int* pi = (int*)pv;
int i = *pi;		// undefined
*pi = 123456;		// undefined
当一个指针类型被转换为指向字节的指针时，转换后的指针将指向原来所指变量的地址中的最低寻址字节。连续增加该变换后的指针（最大可达到该变量所占内存空间的大小），将产生指向该变量的其他字节的指针。例如，下列方法将 double 型变量中的八个字节的每一个显示为一个十六进制值：
using System;
class Test
{
	unsafe static void Main() {
      double d = 123.456e23;
		unsafe {
		   byte* pb = (byte*)&d;
			for (int i = 0; i < sizeof(double); ++i)
	   		Console.Write("{0:X2} ", *pb++);
			Console.WriteLine();
		}
	}
}
当然，产生的输出取决于字节存储顺序 (Endianness)。
指针和整数之间的映射由实现定义。但是，在具有线性地址空间的 32 位和 64 位 CPU 体系结构上，指针和整型之间的转换通常与 uint 或 ulong 类型的值与这些整型之间的对应方向上的转换具有完全相同的行为。
2.4.1 指针数组
可以在不安全上下文中构造指针数组。只有一部分适用于其他数组类型的转换适用于指针数组:
•	从任意 array-type 到 System.Array 及其实现的接口的隐式引用转换（第 6.1.6 节）也适用于指针数组。但是，由于指针类型不可转换为 object，因此只要尝试通过 System.Array 或其实现的接口访问数组元素，就会导致在运行时出现异常。
•	从一维数组类型 S[] 到 System.Collections.Generic.IList<T> 及其基接口的隐式和显式引用转换（第 6.1.6、6.2.4 节）在任何情况下均不适用于指针数组，因为指针类型不能用作类型实参，且不存在从指针类型到非指针类型的转换。
•	从 System.Array 及其实现的接口到任意 array-type 的显式引用转换（第 6.2.4 节）均适用于指针数组。
•	从 System.Collections.Generic.IList<S> 及其基接口到一维数组类型 T[] 的显式引用转换（第 6.2.4 节）在任何情况下均不适用于指针数组，因为指针类型无法用作类型实参，且不存在从指针类型到非指针类型的转换。
这些限制意味着通过第 8.8.4 节中中给出的数组对 foreach 语句进行的扩展不能用于指针数组。而下列形式的 foreach 语句
foreach (V v in x) embedded-statement
(其中 x 的类型为具有 T[,,…,] 形式的数组类型，n 为维度数减 1，T 或 V 为指针类型)使用嵌套 for 循环扩展，如下所示：
{
	T[,,…,] a = x;
	V v;
	for (int i0 = a.GetLowerBound(0); i0 <= a.GetUpperBound(0); i0++)
	for (int i1 = a.GetLowerBound(1); i1 <= a.GetUpperBound(1); i1++)
	…
	for (int in = a.GetLowerBound(n); in <= a.GetUpperBound(n); in++) {
		v  = (V)a.GetValue(i0,i1,…,in);
		embedded-statement
	}
}
变量 a、i0、i1、… in 对 x 或 embedded-statement 或该程序的任何其他源代码均不可见或不可访问。变量 v 在嵌入语句中是只读的。如果不存在从 T（元素类型）到 V 的显式转换（第 18.4 节），则会出错且不会执行下面的步骤。如果 x 具有值 null，则将在运行时引发 System.NullReferenceException。
2.5 表达式中的指针
在不安全上下文中，表达式可能产生指针类型的结果，但是在不安全上下文以外，表达式为指针类型属于编译时错误。准确地说，在不安全上下文以外，如果任何 simple-name（第 7.6.2 节）、member-access（第 7.6.4 节）、invocation-expression（第 7.6.5 节）或 element-access（第 7.6.6 节）属于指针类型，则将发生编译时错误。
在不安全上下文中，primary-no-array-creation-expression（第 7.6 节）和 unary-expression（第 7.7 节）产生式允许使用下列附加构造：
primary-no-array-creation-expression:
...
pointer-member-access
pointer-element-access
sizeof-expression
unary-expression:
...
pointer-indirection-expression
addressof-expression
以下几节对这些构造进行了描述。相关的语法暗示了不安全运算符的优先级和结合性。
2.5.1 指针间接寻址
pointer-indirection-expression包含一个星号 (*)，后接一个 unary-expression。
pointer-indirection-expression:
*   unary-expression
一元 * 运算符表示指针间接寻址并且用于获取指针所指向的变量。计算 *P 得到的结果（其中 P 为指针类型 T* 的表达式）是类型为 T 的一个变量。将一元 * 运算符应用于 void* 类型的表达式或者应用于不是指针类型的表达式属于编译时错误。
将一元 * 运算符应用于 null 指针的效果是由实现定义的。具体而言，不能保证此操作会引发 System.NullReferenceException。
如果已经将无效值赋给指针，则一元 * 运算符的行为是未定义的。通过一元 * 运算符取消指针引用有时会产生无效值，这些无效值包括：没能按所指向的类型正确对齐的地址（请参见第 18.4 节中的示例）和超过生存期的变量的地址。
出于明确赋值分析的目的，通过计算 *P 形式的表达式产生的变量被认为是初始化赋过值的（第 5.3.1 节）。
2.5.2 指针成员访问
pointer-member-access 包含一个 primary-expression，后接一个“->”标记，最后是一个 identifier。
pointer-member-access:
primary-expression   ->   identifier
在 P->I 形式的指针成员访问中，P 必须是除 void* 以外的某个指针类型的表达式，而 I 必须表示 P 所指向的类型的可访问成员。
P->I 形式的指针成员访问的计算方式与 (*P).I 完全相同。有关指针间接寻址运算符 (*) 的说明，请参见第 18.5.1 节。有关成员访问运算符 (.) 的说明，请参见第 7.6.4 节。
在下面的示例中
using System;
struct Point
{
	public int x;
	public int y;
	public override string ToString() {
		return "(" + x + "," + y + ")";
	}
}
class Test
{
	static void Main() {
		Point point;
		unsafe {
			Point* p = &point;
			p->x = 10;
			p->y = 20;
			Console.WriteLine(p->ToString());
		}
	}
}
-> 运算符用于通过指针访问结构中的字段和调用结构中的方法。由于 P->I 操作完全等效于 (*P).I，因此 Main 方法可以等效地编写为：
class Test
{
	static void Main() {
		Point point;
		unsafe {
			Point* p = &point;
			(*p).x = 10;
			(*p).y = 20;
			Console.WriteLine((*p).ToString());
		}
	}
}
2.5.3 指针元素访问
pointer-element-access 包括一个 primary-no-array-creation-expression，后接一个用“[”和“]”括起来的表达式。
pointer-element-access:
primary-no-array-creation-expression   [   expression   ]
在形式为 P[E] 的指针元素访问中，P 必须为除 void* 之外的指针类型表达式，E 必须为可以隐式转换为 int、uint、long 或 ulong 的表达式。
P[E] 形式的指针元素访问的计算方式与 *(P + E) 完全相同。有关指针间接寻址运算符 (*) 的说明，请参见第 18.5.1 节。有关指针加法运算符 (+) 的说明，请参见第 18.5.6 节。
在下面的示例中
class Test
{
	static void Main() {
		unsafe {
			char* p = stackalloc char[256];
			for (int i = 0; i < 256; i++) p[i] = (char)i;
		}
	}
}
指针元素访问用于在 for 循环中初始化字符缓冲区。由于 P[E] 操作完全等效于 *(P + E)，因此示例可以等效地编写为：
class Test
{
	static void Main() {
		unsafe {
			char* p = stackalloc char[256];
			for (int i = 0; i < 256; i++) *(p + i) = (char)i;
		}
	}
}
指针元素访问运算符不能检验是否发生访问越界错误，而且当访问超出界限的元素时行为是未定义的。这与 C 和 C++ 相同。
2.5.4 address-of 运算符
addressof-expression 包含一个“and”符 (&)，后接一个 unary-expression。
addressof-expression:
&   unary-expression
如果给定类型为 T 且属于固定变量（第 18.3 节）的表达式 E，构造 &E 将计算由 E 给出的变量的地址。计算的结果是一个类型为 T* 的值。如果 E 不属于变量，如果 E 属于只读局部变量，或如果 E 表示可移的变量，则将发生编译时错误。在最后一种情况中，可以先利用固定语句（第 18.6 节）临时“固定”该变量，再获取它的地址。如第 7.6.4 节中所述，如果在实例构造函数或静态构造函数之外，在结构或类中定义了 readonly 字段，则该字段被认为是一个值，而不是变量。因此，无法获取它的地址。与此类似，无法获取常量的地址。
& 运算符不要求它的参数先被明确赋值，但是在执行了 & 操作后，该运算符所应用于的那个变量在此操作发生的执行路径中被“认为是”已经明确赋值的。这意味着，由程序员负责确保在相关的上下文中对该变量实际进行合适的初始化。
在下面的示例中
using System;
class Test
{
	static void Main() {
		int i;
		unsafe {
			int* p = &i;
			*p = 123;
		}
		Console.WriteLine(i);
	}
}
初始化 p 的代码执行了 &i 操作，此后 i 被认为是明确赋值的。对 *p 的赋值实际上是初始化了 i，但设置此初始化是程序员的责任，而且如果移除此赋值语句，也不会发生编译时错误。
上述 & 运算符的明确赋值规则可以避免局部变量的冗余初始化。例如，许多外部 API 要求获取指向结构的指针，而由此 API 来填充该结构。对此类 API 进行的调用通常会传递局部结构变量的地址，而如果没有上述规则，则将需要对此结构变量进行冗余初始化。
2.5.5 指针递增和递减
在不安全上下文中，++ 和 -- 运算符（第 7.6.9 节和第 7.7.5 节）可以应用于除 void* 以外的所有类型的指针变量。因此，为每个指针类型 T* 都隐式定义了下列运算符：
T* operator ++(T* x);
T* operator --(T* x);
这些运算符分别产生与 x + 1 和 x – 1（第 18.5.6 节）相同的结果。换句话说，对于 T* 类型的指针变量，++ 运算符将该变量的地址加上 sizeof(T)，而 -- 运算符则将该变量的地址减去 sizeof(T)。
如果指针递增或递减运算的结果超过指针类型的域，则结果是由实现定义的，但不会产生异常。
2.5.6 指针算术运算
在不安全上下文中，+ 和 - 运算符（第 7.8.4 节和第 7.8.5 节）可以应用于除 void* 以外的所有指针类型的值。因此，为每个指针类型 T* 都隐式定义了下列运算符：
T* operator +(T* x, int y);
T* operator +(T* x, uint y);
T* operator +(T* x, long y);
T* operator +(T* x, ulong y);
T* operator +(int x, T* y);
T* operator +(uint x, T* y);
T* operator +(long x, T* y);
T* operator +(ulong x, T* y);
T* operator –(T* x, int y);
T* operator –(T* x, uint y);
T* operator –(T* x, long y);
T* operator –(T* x, ulong y);
long operator –(T* x, T* y);
给定指针类型 T* 的表达式 P 和类型 int、uint、long 或 ulong 的表达式 N，表达式 P + N 和 N + P 的计算结果是一个属于类型 T* 的指针值，该值等于由 P 给出的地址加上 N * sizeof(T)。与此类似，表达式 P - N 的计算结果也是一个属于类型 T* 的指针值，该值等于由 P 给出的地址减去 N * sizeof(T)。
给定指针类型 T* 的两个表达式 P 和 Q，表达式 P – Q 将先计算 P 和 Q 给出的地址之间的差，然后用 sizeof(T) 去除该差值。计算结果的类型始终为 long。实际上，P - Q 的计算过程是：((long)(P) - (long)(Q)) / sizeof(T)。
例如：
using System;
class Test
{
	static void Main() {
		unsafe {
			int* values = stackalloc int[20];
			int* p = &values[1];
			int* q = &values[15];
			Console.WriteLine("p - q = {0}", p - q);
			Console.WriteLine("q - p = {0}", q - p);
		}
	}
}
生成以下输出：
p - q = -14
q - p = 14
如果在执行上述指针算法时，计算结果超越该指针类型的域，则将以实现所定义的方式截断结果，但是不会产生异常。
2.5.7 指针比较
在不安全上下文中，==、!=、<、>、<= 和 => 运算符（第 7.10 节）可以应用于所有指针类型的值。指针比较运算符有：
bool operator ==(void* x, void* y);
bool operator !=(void* x, void* y);
bool operator <(void* x, void* y);
bool operator >(void* x, void* y);
bool operator <=(void* x, void* y);
bool operator >=(void* x, void* y);
由于存在从任何指针类型到 void* 类型的隐式转换，因此可以使用这些运算符来比较任何指针类型的操作数。比较运算符像比较无符号整数一样比较两个操作数给出的地址。
2.5.8 sizeof 运算符
sizeof 运算符返回由给定类型的变量占用的字节数。被指定为 sizeof 的操作数的类型必须为 unmanaged-type（第 18.2 节）。
sizeof-expression:
sizeof   (   unmanaged-type   )
sizeof 运算符的结果是 int 类型的值。对于某些预定义类型，sizeof 运算符将产生如下表所示的常量值。

表达式	结果
sizeof(sbyte)	1
sizeof(byte)	1
sizeof(short)	2
sizeof(ushort)	2
sizeof(int)	4
sizeof(uint)	4
sizeof(long)	8
sizeof(ulong)	8
sizeof(char)	2
sizeof(float)	4
sizeof(double)	8
sizeof(bool)	1

对于所有其他类型，sizeof 运算符的结果是由实现定义的，并且属于值而不是常量。
一个结构所属的各个成员以什么顺序被装入该结构中，没有明确规定。
出于对齐的目的，在结构的开头、结构内以及结构的结尾处可以插入一些未命名的填充位。这些填充位的内容是不确定的。
当 sizeof 应用于具有结构类型的操作数时，结果是该类型变量所占的字节总数（包括所有填充位在内）。
2.6 fixed 语句
在不安全上下文中，embedded-statement （第 8 章）产生式允许使用一个附加结构即 fixed 语句，该语句用于“固定”可移动变量，从而使该变量的地址在语句的持续时间内保持不变。
embedded-statement:
...
fixed-statement
fixed-statement:
fixed   (   pointer-type   fixed-pointer-declarators   )   embedded-statement
fixed-pointer-declarators:
fixed-pointer-declarator
fixed-pointer-declarators   ,   fixed-pointer-declarator
fixed-pointer-declarator:
identifier   =   fixed-pointer-initializer
fixed-pointer-initializer:
&   variable-reference
expression
如上述产生式所述，每个 fixed-pointer-declarator 声明一个给定 pointer-type 的局部变量，并使用由相应的 fixed-pointer-initializer 计算的地址初始化该局部变量。在 fixed 语句中声明的局部变量的可访问范围仅限于：在该变量声明右边的所有 fixed-pointer-initializer 中，以及在该 fixed 语句的 embedded-statement 中。由 fixed 语句声明的局部变量被视为只读。如果嵌入语句试图修改此局部变量（通过赋值或 ++ 和 -- 运算符）或者将它作为 ref 或 out 参数传递，则将出现编译时错误。
fixed-pointer-initializer 可以是下列之一: 
•	“&”标记，后接一个 variable-reference（第 5.3.3 节），它引用非托管类型 T 的可移动变量（第 18.3 节），前提是类型 T* 可以隐式转换为 fixed 语句中给出的指针类型。在这种情况下，初始值设定项将计算给定变量的地址，而 fixed 语句在生存期内将保证该变量的地址不变。
•	元素类型为非托管类型 T 的 array-type 的表达式，前提是类型 T* 可隐式转换为 fixed 语句中给出的指针类型。在这种情况下，初始值设定项将计算数组中第一个元素的地址，而 fixed 语句在生存期内将保证整个数组的地址保持不变。如果数组表达式为 null 或者数组具有零个元素，则 fixed 语句的行为由实现定义。
•	string 类型的表达式，前提是类型 char* 可以隐式转换为 fixed 语句中给出的指针类型。在这种情况下，初始值设定项将计算字符串中第一个字符的地址，而 fixed 语句在生存期内将保证整个字符串的地址不变。如果字符串表达式为 null，则 fixed 语句的行为由实现定义。
•	引用可移动变量的固定大小缓冲区成员的 simple-name 或 member-access，前提是固定大小缓冲区成员的类型可以隐式转换为 fixed 语句中给出的指针类型。这种情况下，初始值设定项计算出指向固定大小缓冲区（第 18.7.2 节）第一个元素的指针，并且该固定大小缓冲区保证在 fixed 语句的持续时间内保留在某个固定地址。
对于每个由 fixed-pointer-initializer 计算的地址，fixed 语句确保由该地址引用的变量在 fixed 语句的生存期内不会被垃圾回收器重定位或者释放。例如，如果由 fixed-pointer-initializer 计算的地址引用对象的字段或数组实例的元素，fixed 语句将保证包含该字段或元素的对象实例本身也不会在该语句的生存期内被重定位或者释放。
确保由 fixed 语句创建的指针在执行这些语句之后不再存在是程序员的责任。例如，当 fixed 语句创建的指针被传递到外部 API 时，确保 API 不会在内存中保留这些指针是程序员的责任。
固定对象可能导致堆中产生存储碎片（因为它们无法移动）。出于该原因，只有在绝对必要时才应当固定对象，而且固定对象的时间越短越好。
下面的示例
class Test
{
	static int x;
	int y;
	unsafe static void F(int* p) {
		*p = 1;
	}
	static void Main() {
		Test t = new Test();
		int[] a = new int[10];
		unsafe {
			fixed (int* p = &x) F(p);
			fixed (int* p = &t.y) F(p);
			fixed (int* p = &a[0]) F(p);
			fixed (int* p = a) F(p);
		}
	}
}
演示了 fixed 语句的几种用法。第一条语句固定并获取一个静态字段的地址，第二条语句固定并获取一个实例字段的地址，第三条语句固定并获取一个数组元素的地址。在这几种情况下，直接使用常规 & 运算符都是错误的，这是因为这些变量都属于可移动变量。
上面示例中的第四个 fixed 语句生成与第三个语句类似的结果。
此 fixed 语句示例使用 string：
class Test
{
	static string name = "xx";
	unsafe static void F(char* p) {
		for (int i = 0; p[i] != '\0'; ++i)
			Console.WriteLine(p[i]);
	}
	static void Main() {
		unsafe {
			fixed (char* p = name) F(p);
			fixed (char* p = "xx") F(p);
		}
	}
}
在不安全上下文中，一维数组的数组元素按递增索引顺序存储，从索引 0 开始，到索引 Length – 1 结束。对于多维数组，数组元素按这样的方式存储：首先增加最右边维度的索引，然后是左边紧邻的维度，依此类推直到最左边。在获取指向数组实例 a 的指针 p 的 fixed 语句内，从 p 到 p + a.Length – 1 范围内的每个指针值均表示数组中的一个元素的地址。与此类似，从 p[0] 到 p[a.Length - 1] 范围内的变量表示实际的数组元素。已知数组的存储方式，可以将任意维度的数组都视为线性的。
例如：
using System;
class Test
{
	static void Main() {
		int[,,] a = new int[2,3,4];
		unsafe {
			fixed (int* p = a) {
				for (int i = 0; i < a.Length; ++i)	// treat as linear
					p[i] = i;
			}
		}
		for (int i = 0; i < 2; ++i)
			for (int j = 0; j < 3; ++j) {
				for (int k = 0; k < 4; ++k)
					Console.Write("[{0},{1},{2}] = {3,2} ", i, j, k, a[i,j,k]);
				Console.WriteLine();
			}
	}
}
生成以下输出：
[0,0,0] =  0 [0,0,1] =  1 [0,0,2] =  2 [0,0,3] =  3
[0,1,0] =  4 [0,1,1] =  5 [0,1,2] =  6 [0,1,3] =  7
[0,2,0] =  8 [0,2,1] =  9 [0,2,2] = 10 [0,2,3] = 11
[1,0,0] = 12 [1,0,1] = 13 [1,0,2] = 14 [1,0,3] = 15
[1,1,0] = 16 [1,1,1] = 17 [1,1,2] = 18 [1,1,3] = 19
[1,2,0] = 20 [1,2,1] = 21 [1,2,2] = 22 [1,2,3] = 23
在下面的示例中
class Test
{
	unsafe static void Fill(int* p, int count, int value) {
		for (; count != 0; count--) *p++ = value;
	}
	static void Main() {
		int[] a = new int[100];
		unsafe {
			fixed (int* p = a) Fill(p, 100, -1);
		}
	}
}
使用一条 fixed 语句固定一个数组，以便可以将该数组的地址传递给一个采用指针作为参数的方法。
在下面的示例中：
unsafe struct Font
{
	public int size;
	public fixed char name[32];
}
class Test
{
	unsafe static void PutString(string s, char* buffer, int bufSize) {
		int len = s.Length;
		if (len > bufSize) len = bufSize;
		for (int i = 0; i < len; i++) buffer[i] = s[i];
		for (int i = len; i < bufSize; i++) buffer[i] = (char)0;
	}
	Font f;
	unsafe static void Main()
	{
		Test test = new Test();
		test.f.size = 10;
		fixed (char* p = test.f.name) {
			PutString("Times New Roman", p, 32);
		}
	}
}
一个固定语句用于固定一个结构的固定大小缓冲区，因此可以将该缓冲区的地址用作指针。
通过固定字符串实例产生的 char* 类型的值始终指向以 null 结尾的字符串。在获取指向字符串实例 s 的指针 p 的 fixed 语句内，从 p 到 p + s.Length - 1 范围内的指针值表示字符串中字符的地址，而指针值 p + s.Length 则始终指向一个 null 字符(值为 '\0' 的字符)。
通过固定指针修改托管类型的对象可能导致未定义的行为。例如，由于字符串是不可变的，因此程序员应确保指向固定字符串的指针所引用的字符不被修改。
这种字符串的自动空字符终止功能，大大方便了调用需要“C 风格”字符串的外部 API。但请注意，核心 C# 允许字符串实例包含空字符。如果字符串中存在此类空字符，则在将字符串视为空终止的 char* 时将出现截断。
2.7 固定大小缓冲区
固定大小缓冲区用于将“C 风格”的内联数组声明为结构的成员，且主要用于与非托管 API 交互。
2.7.1 固定大小缓冲区的声明
固定大小缓冲区 (fixed size buffer) 是一个成员，表示给定类型的变量的固定长度缓冲区的存储区。固定大小缓冲区声明引入了给定元素类型的一个或多个固定大小缓冲区。仅允许在结构声明中使用固定大小缓冲区，且只能出现在不安全上下文（第 18.1 节）中。
struct-member-declaration:
…
fixed-size-buffer-declaration
fixed-size-buffer-declaration:
attributesopt   fixed-size-buffer-modifiersopt   fixed   buffer-element-type
		fixed-size-buffer-declarators   ;
fixed-size-buffer-modifiers:
fixed-size-buffer-modifier
fixed-size-buffer-modifier   fixed-size-buffer-modifiers
fixed-size-buffer-modifier:
new
public
protected
internal
private
unsafe
buffer-element-type:
type
fixed-size-buffer-declarators:
fixed-size-buffer-declarator
fixed-size-buffer-declarator   ,   fixed-size-buffer-declarators
fixed-size-buffer-declarator:
identifier   [   constant-expression   ]
固定大小缓冲区声明可包括一组特性（第 17 章）、一个 new 修饰符（第 10.2.2 节）、四个访问修饰符（第 10.2.3 节）的一个有效组合和一个 unsafe 修饰符（第 18.1 节）。这些特性和修饰符适用于由固定大小缓冲区声明所声明的所有成员。同一个修饰符在一个固定大小缓冲区声明中出现多次是一个错误。
固定大小缓冲区声明不允许包含 static 修饰符。
固定大小缓冲区声明的缓冲区元素类型指定了由该声明引入的缓冲区的元素类型。缓冲区元素类型必须为下列预定义类型之一：sbyte、byte、short、ushort、int、uint、long、ulong、char、float、double 或 bool。
缓冲区元素类型后接一个固定大小缓冲区声明符的列表，该列表中的每个声明符引入一个新成员。固定大小缓冲区声明符由一个用于命名成员的标识符以及标识符后面由 [ 和 ] 标记括起来的常量表达式所组成。该常量表达式表示在由该固定大小缓冲区声明符引入的成员中的元素数量。该常量表达式的类型必须可隐式转换为类型 int，并且该值必须是非零的正整数。
固定大小缓冲区的元素保证在内存中按顺序放置。
声明多个固定大小缓冲区的固定大小缓冲区声明相当于单个固定大小缓冲区的带有相同特性和元素类型的多个声明。例如
unsafe struct A
{
   public fixed int x[5], y[10], z[100];
}
相当于
unsafe struct A
{
   public fixed int x[5];
   public fixed int y[10];
   public fixed int z[100];
}
2.7.2 表达式中的固定大小缓冲区
固定大小缓冲区成员的成员查找（第 7.3 节）过程与字段的成员查找完全相同。
可使用 simple-name（第 7.5.2 节）或 member-access（第 7.5.4 节）在表达式中引用固定大小缓冲区。
当固定大小缓冲区成员作为简单名称被引用时，其效果与 this.I 形式的成员访问相同，其中 I 为固定大小缓冲区成员。
在 E.I 形式的成员访问中，如果 E 为结构类型，并且在该结构类型中通过 I 的成员查找标识了一个固定大小成员，则如下计算并归类 E.I：
•	如果表达式 E.I 不属于不安全上下文，则发生编译时错误。
•	如果 E 归类为值类别，则发生编译时错误。
•	否则，如果 E 为可移动变量(第 18.3 节)并且表达式 E.I 不是 fixed-pointer-initializer(第 18.6 节)，则发生编译时错误。
•	否则，E 引用固定变量，并且该表达式的结果为指向 E 中的固定大小缓冲区成员 I 的第一个元素的指针。结果为类型 S*，其中 S 为 I 的元素类型，并且归类为值。
可使用指针操作从第一个元素开始访问固定大小缓冲区的后续元素。与访问数组不同，访问固定大小缓冲区的元素是不安全操作，并且不进行范围检查。
	下面的示例声明并使用了一个包含固定大小缓冲区成员的结构。
unsafe struct Font
{
	public int size;
	public fixed char name[32];
}
class Test
{
	unsafe static void PutString(string s, char* buffer, int bufSize) {
		int len = s.Length;
		if (len > bufSize) len = bufSize;
		for (int i = 0; i < len; i++) buffer[i] = s[i];
		for (int i = len; i < bufSize; i++) buffer[i] = (char)0;
	}
	unsafe static void Main()
	{
		Font f;
		f.size = 10;
		PutString("Times New Roman", f.name, 32);
	}
}
2.7.3 明确赋值检查
固定大小缓冲区不接受明确赋值检查（第 5.3 节），并且为了对结构类型变量进行明确赋值检查，忽略固定大小缓冲区成员。
当包含固定大小缓冲区成员的最外层结构变量为静态变量、类实例的实例变量或数组元素时，该固定大小缓冲区的元素自动初始化为其默认值（第 5.2 节）。而在所有其他情况下，固定大小缓冲区的初始内容未定义。
2.8 堆栈分配
在不安全上下文中，局部变量声明（第 8.5.1 节）可以包含一个从调用堆栈中分配内存的堆栈分配初始值设定项。
local-variable-initializer:
…
stackalloc-initializer
stackalloc-initializer:
stackalloc   unmanaged-type   [   expression   ]
上述产生式中，unmanaged-type 表示将在新分配的位置中存储的项的类型，而 expression 则指示这些项的数目。合在一起，它们指定所需的分配大小。由于堆栈分配的大小不能为负值，因此将项的数目指定为计算结果为负值的 constant-expression 属于编译时错误。
stackalloc T[E] 形式的堆栈分配初始值设定项要求 T 必须为非托管类型（第 18.2 节），E 必须为 int 类型的表达式。该构造从调用堆栈中分配 E * sizeof(T) 个字节，并返回一个指向新分配的块的、类型 T* 的指针。如果 E 为负值，则其行为是未定义的。如果 E 为零，则不进行任何分配，并且返回的指针由实现定义。如果没有足够的内存以分配给定大小的块，则引发 System.StackOverflowException。
新分配的内存的内容是未定义的。
在 catch 或 finally 块（第 8.10 节）中不允许使用堆栈分配初始值设定项。
无法显式释放利用 stackalloc 分配的内存。在函数成员的执行期间创建的所有堆栈分配内存块都将在该函数成员返回时自动丢弃。这对应于 alloca 函数，它是通常存在于 C 和 C++ 实现中的一个扩展。
在下面的示例中
using System;
class Test
{
	static string IntToString(int value) {
		int n = value >= 0? value: -value;
		unsafe {
			char* buffer = stackalloc char[16];
			char* p = buffer + 16;
			do {
				*--p = (char)(n % 10 + '0');
				n /= 10;
			} while (n != 0);
			if (value < 0) *--p = '-';
			return new string(p, 0, (int)(buffer + 16 - p));
		}
	}
	static void Main() {
		Console.WriteLine(IntToString(12345));
		Console.WriteLine(IntToString(-999));
	}
}
在 IntToString 方法中使用了 stackalloc 初始值设定项，以在堆栈上分配一个 16 个字符的缓冲区。此缓冲区在该方法返回时自动丢弃。
2.9 动态内存分配
除 stackalloc 运算符外，C# 不提供其他预定义构造来管理那些不受垃圾回收控制的内存。这些服务通常是由支持类库提供或者直接从基础操作系统导入的。例如，下面的 Memory 类阐释了可以如何从 C# 访问基础操作系统的有关堆处理的各种函数：
using System;
using System.Runtime.InteropServices;
public unsafe class Memory
{
	// Handle for the process heap. This handle is used in all calls to the
	// HeapXXX APIs in the methods below.
	static int ph = GetProcessHeap();
	// Private instance constructor to prevent instantiation.
	private Memory() {}
	// Allocates a memory block of the given size. The allocated memory is
	// automatically initialized to zero.
	public static void* Alloc(int size) {
		void* result = HeapAlloc(ph, HEAP_ZERO_MEMORY, size);
		if (result == null) throw new OutOfMemoryException();
		return result;
	}
	// Copies count bytes from src to dst. The source and destination
	// blocks are permitted to overlap.
	public static void Copy(void* src, void* dst, int count) {
		byte* ps = (byte*)src;
		byte* pd = (byte*)dst;
		if (ps > pd) {
			for (; count != 0; count--) *pd++ = *ps++;
		}
		else if (ps < pd) {
			for (ps += count, pd += count; count != 0; count--) *--pd = *--ps;
		}
	}
	// Frees a memory block.
	public static void Free(void* block) {
		if (!HeapFree(ph, 0, block)) throw new InvalidOperationException();
	}
	// Re-allocates a memory block. If the reallocation request is for a
	// larger size, the additional region of memory is automatically
	// initialized to zero.
	public static void* ReAlloc(void* block, int size) {
		void* result = HeapReAlloc(ph, HEAP_ZERO_MEMORY, block, size);
		if (result == null) throw new OutOfMemoryException();
		return result;
	}
	// Returns the size of a memory block.
	public static int SizeOf(void* block) {
		int result = HeapSize(ph, 0, block);
		if (result == -1) throw new InvalidOperationException();
		return result;
	}
	// Heap API flags
	const int HEAP_ZERO_MEMORY = 0x00000008;
	// Heap API functions
	[DllImport("kernel32")]
	static extern int GetProcessHeap();
	[DllImport("kernel32")]
	static extern void* HeapAlloc(int hHeap, int flags, int size);
	[DllImport("kernel32")]
	static extern bool HeapFree(int hHeap, int flags, void* block);
	[DllImport("kernel32")]
	static extern void* HeapReAlloc(int hHeap, int flags,
		void* block, int size);
	[DllImport("kernel32")]
	static extern int HeapSize(int hHeap, int flags, void* block);
}
以下给出一个使用 Memory 类的示例：
class Test
{
	static void Main() {
		unsafe {
			byte* buffer = (byte*)Memory.Alloc(256);
			try {
				for (int i = 0; i < 256; i++) buffer[i] = (byte)i;
				byte[] array = new byte[256];
				fixed (byte* p = array) Memory.Copy(buffer, p, 256); 
			}
			finally {
				Memory.Free(buffer);
			}
			for (int i = 0; i < 256; i++) Console.WriteLine(array[i]);
		}
	}
}
此示例通过 Memory.Alloc 分配了 256 字节的内存，并且使用从 0 增加到 255 的值初始化该内存块。它然后分配一个具有 256 个元素的字节数组并使用 Memory.Copy 将内存块的内容复制到此字节数组中。最后，使用 Memory.Free 释放内存块并将字节数组的内容输出到控制台上。



组织应用程序
	静态链接：使用普通函数库，在程序链接时将库中的代码拷贝到可执行文件中
	动态链接：只有程序在执行时才将库代码装入内存。同一个动态链接库，无论多少个应用程序在同时使用它，内存中都只有一个副本；不再被使用时，系统就将它调出内存。
动态链接库技术常用于开发大型软件系统和软件产品国际化。
	编译单元：能被编译器进行编译的最小单位。每一个编译单元包含在一个独立的源文件中
using-directives attributes namespace-member-declarations
	名字空间提供逻辑上的层次结构关系；装配用于应用程序的打包(packaging)和部署(deployment)，装配有两种类型，应用程序(exe)和库(dll)
	使用指示符的目的是为了方便使用其它的名字空间中定义的名字空间和类型
别名使用指示符(类型)：using identifier = namespace-or-type-name
名字空间使用指示符(名字空间)：using namespace-name









C#连接SQL Server
连接字符串：
initial catalog=Mydb;Server=(local);user id=sa;password=123;Connect Timeout=30
Driver={SQL Server};Data Source=(local);Database=Mydb;uid=sa;pwd=123 //帐号密码登录
Driver={SQL Server};Address=(local);Database=Mydb;Integrated Security=SSPI//windows登录
Driver={SQL Server};Addr=(local);Database=Mydb;Trusted_Connection=yes
连接SQLExpress版数据库写法(使用Asp.net自身建立的数据库必须在连接的时候加上Data Source=.\\SQLExpress,否则连接不上)
Data Source=.\\SQLExpress;Integrated Security=true;AttachDbFilename=|DataDirectory|\\database.mdf;User Instance=true;
integrated security集成安全;Trusted_Connection=yes与Integrated Security=SSPI相等,意思是连接SQL的Windows身份登录;AttachDbFilename连接数据库名称;|DataDirectory|数据目录(此目录是App_Data,在此不需要写,这样写|DataDirectory|即可);User Instance 用户实例
C#连接Access
连接字符串：
Provider=Microsoft.Jet.OleDb.4.0;Data Source=E:\DB\MyStudy.mdb
Provider=Microsoft.Jet.OleDb.4.0;Password=;User ID=Admin;Data Source= MyStudy.mdb
解释:Provider=Microsoft.Jet.OleDb.4.0;是数据提供者，这里使用的是Microsoft Jet引擎，也就是Access中的数据引擎，Asp.net就是靠这个和Access的数据库连接的。Data Source=E:\DB\MyStudy.mdb是数据源的位置。如果要连接的数据库文件和当前文件在同一个目录下，还可以使用如下的方法连接：
Provider=Microsoft.Jet.OleDb.4.0;Data Source= MapPath("MyStudy.mdb")
C#连接Oracle
 
Data Source=wind;user=plm100;password=plm100;Integrated Security=yes
程序代码：
/// <summary>
/// oracle连接字符串
/// </summary>
private string oracleConnString = @"Data Source=wind;user=plm100;password=plm100";
/// <summary>
/// 获取Oracle连接
/// </summary>
/// <returns></returns>
public OracleConnection getOracleConn()
{
     //创建一个新连接
     OracleConnection oracleConn = new OracleConnection(oracleConnString);
     oracleConn.Open();
     return oracleConn;
}
C#连接MySQL
  
Provider=MySQLProv;Data Source=mydb;User Id=UserName;Password=asdasd;
Data Source=server;Database=mydb;User Id=UserName;Password=pwd;Command Logging=false
程序代码：
/// <summary>
/// 获取MySql连接
/// </summary>
/// <returns></returns>
public MySQLConnection getMySqlConn()
{
     MySQLConnectionString mysqlConnString = new MySQLConnectionString(
          MySqlServer, MySqlDataBase, MySqlDBUser, MySqlDBPwd);
     MySQLConnection mysqlConn = new MySQLConnection(mysqlConnString.AsString);
     mysqlConn.Open();
     return mysqlConn;
}
C#连接IBM的DB2

C#连接SyBase

C#连接Excel
ASP.NET访问Excel通常有两种方法:
一种是使用ODBC .NET Data Provider进行访问;
另一种则是使用OLEDB .NET Data Provider进行访问。
/// <summary>
/// 连接Excel的ODBC字符串
/// </summary>
private string excelOdbcConnStr = @"DSN=myexcel";
/// <summary>
/// 连接Excel的OleDB字符串
/// </summary>
private string excelOledbConnStr = @"Provider=Microsoft.Jet.OleDb 4.0;"
     +"Data Source= data.xls;Extended Properties= Excel 8.0;";
C#连接TXT
txt文件的数据连接字串中，数据库结构的中“数据库”的概念对于txt文件而言应该是文件所在的目录，而不是具体的某个文件。而具体的某个文件，相当于是数据库中“表”的概念。使用System.IO命名空间。
想使用ODBC或者OLE DB处理TXT，其实最重要的是把TXT文件“转换”成数据源。
“开始菜单”“管理工具”“数据源(ODBC)”
 
/// <summary>
/// ODBC方式的txt连接字符串
/// </summary>
private string txtOdbcConnStr = @"DSN=txtexample";
/// <summary>
/// OLEDB方式的txt连接字符串
/// </summary>
private string txtOledbConnStr = @"Provider=Microsoft.Jet.OLEDB 4.0;
     Data Source=c:\sample\;Extended Properties=text;HDR=yes;FMT=Delimited";
C#连接SQLite
SQLite是一款轻量级数据库，其类型在文件形式上很像Access数据库，但是相比之下SQLite 操作更快。SQLite也是一种文件型数据库，但是SQLite却支持多种Access数据库不支持的复杂的SQL语句，并且还支持事务处理。
 
/// <summary>
/// 连接SQLite的字符串
/// </summary>
private string SQLiteConnStr = @"Data Source=sqlite.db";
/// <summary>
/// 获取打开的SQLite数据库连接
/// </summary>
/// <returns></returns>
public SQLiteConnection getSQLiteConnection()
{
     //SQLiteConnection.CreateFile("sqlite.db"); //创建数据库
     //SQLiteConnection.CreateFile("sqlite"); //创建无后缀名的数据库
     SQLiteConnection SQLiteConn = new SQLiteConnection(SQLiteConnStr);
     SQLiteConn.Open();
     return SQLiteConn;
}
.NET三种事务处理详解
体系结构：SQL事务处理、ADO.NET事务处理、COM+事务处理
数据库事务处理：T-SQL语句中完成， Begin Transaction Commit/Roll Back
BEGIN TRANSACTION：
BEGIN TRANSACTION { tran_name}
{trans_name1| @tran_name-veriable1}事务名不得超过32个字符，否则自截断。此处变量的类型仅可以是char、varchar、nchar、nvarchar
WITH MARK ['DESCRIPTION'] 指定在日志中标记事务
EXPRESSION2
BEGIN TRANS启动一个本地事务，但是在应用程序执行一个必须的记录操作之前，他不被记录在事务日志中。
With Mark选项使得事务名被置于事务日志中，将数据还原到早期状态时，可使用标记事务代替日期和时间。
在未标记的数据库事务中可以嵌套标记的事务。如
BEGIN TRAN T1
UPDATE table1 ...
BEGIN TRAN M2 WITH MARK
UPDATE table2 ...
SELECT * from table1
COMMIT TRAN M2
UPDATE table3 ...
COMMIT TRAN T1
命名事务示例：
DECLARE @TranName VARCHAR(20)
SELECT @TranName = 'MyTransaction'
BEGIN TRANSACTION @TranName
USE AdventureWorks
DELETE FROM AdventureWorks.HumanResources.JobCandidate
WHERE JobCandidateID = 13
COMMIT TRANSACTION @TranName
标记事务示例：
BEGIN TRANSACTION CandidateDelete
WITH MARK N'Deleting a Job Candidate'
USE AdventureWorks
DELETE FROM AdventureWorks.HumanResources.JobCandidate
WHERE JobCandidateID = 13
COMMIT TRANSACTION CandidateDelete
COMMIT TRANSACTION：
COMMIT {TRAN|TRANSACTION}
[transaction_name | [@tran_name_variable ] ]同BEGIN部分的规则
[ ; ]
提交一般事务示例：
USE AdventureWorks
BEGIN TRANSACTION
DELETE FROM HumanResources.JobCandidate
WHERE JobCandidateID = 13
COMMIT TRANSACTION
提交嵌套事务示例：
BEGIN TRANSACTION OuterTran
    INSERT INTO TestTran VALUES (1, 'aaa')
    BEGIN TRANSACTION Inner1
        INSERT INTO TestTran VALUES (2, 'bbb')
        BEGIN TRANSACTION Inner2
            INSERT INTO TestTran VALUES (3, 'ccc')
        COMMIT TRANSACTION Inner2
    COMMIT TRANSACTION Inner1
COMMIT TRANSACTION OuterTran
ROLLBACK TRANSACTION
ROLLBACK { TRAN | TRANSACTION }
--transaction_name同上，此处savepoint_name规则同transaction_name，为SAVE TRANSACTION 语句中的savepoint_name，用于条件回滚之影响事务的一部分
[ transaction_name | @tran_name_variable | savepoint_name | @savepoint_variable ]
[ ; ]
示例：
USE TempDB
CREATE TABLE ValueTable ([value] int)
BEGIN TRAN Transaction1
INSERT INTO ValueTable VALUES(1)
INSERT INTO ValueTable VALUES(2)
SELECT * FROM ValueTable
ROLLBACK TRAN Transaction1
SELECT * FROM ValueTable
INSERT INTO ValueTable VALUES(3)
INSERT INTO ValueTable VALUES(4)
SELECT * FROM ValueTable
DROP TABLE ValueTable
结果：
综合示例：
begin TRAN
    declare @orderDetailsError int,@procuntError int
　　delete from [order details] where productid=42
　　select @orderDetailsError =@@error
　　delete from products where productid=42
　　select @procuntError=@@error
　　if(@orderDetailsError =0 and @procuntError=0)
　　     COMMIT TRAN
　　else
　　     ROLLBACK TRAN
ADO.NET事务处理：
示例：
public void ExecuteNoneSql(string p_sqlstr, params string[] p_cmdStr)
{
using (SqlConnection conn = new SqlConnection(p_sqlstr))
{
Conn.Open();
SqlCommand cmd = new SqlCommand();
cmd.Connection = conn;
SqlTransaction trans = null;
trans = conn.BeginTransaction(); //初始化事务
cmd.Transaction = trans; //绑定事务
try
{
for (int i = 0; i < p_cmdStr.Length; i++)
{
cmd.CommandText = p_cmdStr[i];
cmd.CommandType = CommandType.Text;
cmd.ExecuteNonQuery();
}
trans.Commit(); //提交
}
catch (SqlException e)
{
if (trans != null) trans.Rollback(); //回滚
else
{//写日志}
}
}
}
带保存点回滚示例：
using (SqlConnection conn = new SqlConnection(p_sqlstr))
{
conn.Open();
SqlCommand cmd = new SqlCommand();
cmd.Connection = conn;
SqlTransaction trans = conn.BeginTransaction("table");
cmd.Transaction = trans;
try
{
cmd.CommandText = "Insert into table_name1 values(values1,values2,....)";
cmd.CommandType = CommandType.Text;
cmd.ExecuteNonQuery();
cmd.CommandText = "Insert into table_name2 values(values1,values2,....)";
cmd.CommandType = CommandType.Text;
cmd.ExecuteNonQuery();
trans.Save("table1");
cmd.CommandText = "Insert into table_name2 values(values1,values2,....)";
cmd.CommandType = CommandType.Text;
cmd.ExecuteNonQuery();
trans.Save("table2");
trans.Commit();
}
catch
{
try
{ trans.Rollback("table2") ; }
catch
{
try{ trans.Rollback("table1") ; }
catch{ trans.Rollback("table") ; }
}
}
}
COM+事务处理：
COM+事务必须继承自System.EnterpriseServices.ServicedComponent。其实WEB也是继承自该类，所以WEB支持COM+事务处理。
第一步、新建一个COM+事务处理的类。
[Transaction(TransactionOption.Required)]
public class MyCOMPlus : System.EnterpriseServices.ServicedComponent
{
..............
}
TransactionOption为枚举类型，具有五个选项。
DISABLED忽略当前上下文中的任何事务
NOTSUPPORTED使用非受控事件创建组件
REQUIRED如有事务存在则共享事务，如有必要则创建事务（事务池，事务处理中所选择项）REQUIRESNEW是有新建的事务，与上下文无关
SUPPORTED如果事务存在则共享事务。
一般来说COM+中的组件需要REQUIRED或SUPPORTED。当组件需要同活动中其他事务处理的提交或回滚隔离开来的时候建议使用REQUIRESNEW。COM+事务有手动处理和自动处理，自动处理就是在所需要自动处理的方法前加上[AutoComplete]，根据方法的正常或抛出异常决定提交或回滚。手动处理其实就是调用EnableCommit()、SetComplete()、SetAbort()方法。
手动处理示例：
public void TestTransaction()
{
try
{
ContextUtil.EnableCommit(); //对应BEGIN TRANSACTION
InsertRecord();
DeleteRecord();
UpdateRecord2();
ContextUtil.SetComplete(); //对应TRANSACTION.COMMIT
}
catch (Exception ex)
{
ContextUtil.SetAbort(); //对应TRANSACTION.ROLLBACK
}
}
自动事务处理示例（只需要在方法前面加上AutoComplete的attribute声明即可）：
[AutoComplete]
public void TestTransaction()
{
InsertRecord();
DeleteRecord();
UpdateRecord2();
}
 
三者性能比较：
性能排名： SQL事务处理>ADO.NET事务处理>COM+事务处理
SQL事务处理只需要进行一次数据库交互，优点就是速度很快，而且所有逻辑包含在一个单独的调用中，与应用程序独立，缺点就是与数据库绑定。
ADO.NET需要2n次数据库往返，但相对而言，ADO.NET事务处理性能比SQL事务处理低很少，在一般应用程序中可以忽略。而且ADO.NET事务处理将事务处理与数据库独立，增加了程序的移植性。而且他也可以横跨多个数据库，不过他对于数据库的类型要求一致。
COM+事务处理性能最低，主要因为COM+本身的一些组件需要内存开销。但COM+可以横跨各种数据存储文件，这一点功能是前两者所无法媲美的。
如何使用 Transact-SQL 执行事务处理
以下存储过程阐明了如何在 Transact-SQL存储过程内部执行事务性资金转帐操作。
CREATE PROCEDURE MoneyTransfer
	@FromAccount char(20),
	@ToAccount char(20),
	@Amount money
AS
BEGIN TRANSACTION
	-- PERFORM DEBIT OPERATION
	UPDATE Accounts SET Balance = Balance - @Amount WHERE AccountNumber = @FromAccount
	IF @@RowCount = 0
	BEGIN
		RAISERROR('Invalid From Account Number', 11, 1)
		GOTO ABORT
	END
	DECLARE @Balance money
	SELECT @Balance = Balance FROM ACCOUNTS WHERE AccountNumber = @FromAccount 
	IF @BALANCE < 0
	BEGIN
		RAISERROR('Insufficient funds', 11, 1)
		GOTO ABORT
	END
	-- PERFORM CREDIT OPERATION
	UPDATE Accounts SET Balance = Balance + @Amount WHERE AccountNumber = @ToAccount
	IF @@RowCount = 0
	BEGIN
		RAISERROR('Invalid To Account Number', 11, 1)
		GOTO ABORT
	END
COMMIT TRANSACTION
	RETURN 0
ABORT:
	ROLLBACK TRANSACTION
GO
该存储过程使用 BEGIN TRANSACTION、COMMIT TRANSACTION 和 ROLLBACK TRANSACTION 语句来手动控制该事务。
如何编写事务性 .NET 类
以下示例代码显示了三个服务性.NET托管类，这些类经过配置以执行自动事务处理。每个类都使用Transaction属性进行了批注，该属性的值确定是否应该启动新的事务流，或者该对象是否应该共享其直接调用方的事务流。这些组件协同工作来执行银行资金转帐任务。Transfer类被使用RequiresNew事务属性进行了配置，而Debit和Credit 被使用Required进行了配置。结果，所有这三个对象在运行时都将共享同一事务。
using System;
using System.EnterpriseServices;

[Transaction(TransactionOption.RequiresNew)]
public class Transfer : ServicedComponent
{
[AutoComplete]
	public void Transfer(string toAccount, string fromAccount, 
		decimal amount)
	{
	try
	{
		// Perform the debit operation
		Debit debit = new Debit();
		debit.DebitAccount( fromAccount, amount );
		// Perform the credit operation
		Credit credit = new	Credit();
		credit.CreditAccount( toAccount, amount );
	}
	catch( SqlException sqlex )
	{
		// Handle and log exception details
		// Wrap and propagate the exception
		throw new TransferException( "Transfer Failure", sqlex );    
		}
	}
}

[Transaction(TransactionOption.Required)]
public class Credit : ServicedComponent
{
	[AutoComplete]
	public void CreditAccount( string account, decimal amount )
	{
	try
		{
		using(SqlConnection conn = new SqlConnection("Server=(local); Integrated Security=SSPI; database=SimpleBank"))
		{
			SqlCommand cmd = new SqlCommand("Credit", conn );
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.Add( new SqlParameter("@AccountNo", account) );
			cmd.Parameters.Add( new SqlParameter("@Amount", amount ));
			conn.Open();
			cmd.ExecuteNonQuery();
		}
		}catch( SqlException sqlex ){
		// Log exception details here
		throw; // Propagate exception
		}
	}
}

[Transaction(TransactionOption.Required)]
public class Debit : ServicedComponent
{
	public void DebitAccount( string account, decimal amount )
	{
		try
		{
		using(SqlConnection conn = new SqlConnection("Server=(local); Integrated Security=SSPI; database=SimpleBank"))
		{
		SqlCommand cmd = new SqlCommand("Debit", conn );
		cmd.CommandType = CommandType.StoredProcedure;
		cmd.Parameters.Add( new SqlParameter("@AccountNo", account) );
		cmd.Parameters.Add( new SqlParameter("@Amount", amount ));
		conn.Open();
		cmd.ExecuteNonQuery();
		} 
		}
		catch (SqlException sqlex)
		{
		// Log exception details here
		throw; // Propagate exception back to caller
		}
	}
}

使用GDI+
	(Graphics Device Interface)在.Net Framework中用于提供二维图形图像处理功能。
Graphics类
	封装一个GDI+绘图图面，似画布。
	绘制图形包括两步：
	创建Graphics对象
	使用Graphics对象绘制线条和形状、呈现文本或显示与操作图像
Pen类
	画笔类，主要用于绘制线条，或者用线条组合成其它几何形状。

font类
	字体类，用于描绘文本。
Bitmap类
	位图类，加载和显示已有的光栅图像。

MetaFile类
	加载和显示矢量图像。




























- View: Razor
- MVC: Route, Filter, Bundle
- IOC: Unity
- ORM: Ibatis

在VS工具在打开 程序包管理器控制台

执行命令：`Update-Package -reinstall`  更新所有项目的 Package.config 文件中引用的dll

执行命令：`Update-Package -reinstall -Project YourProjectName` 更新指定的项目的Package.config配置文件中引用的dll

MVC项目请求流程：

HTTP Request -> Routing -> Controller -> ViewResult -> ViewEngine -> View -> Response

## 路由

- 指定语言：
  
  ```C#
  routes.MapRoute(
      name: "Language",
      url: "{language}/{controller}/{action}/{id}",
      defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
  );
  ```

- 正则约束：

  ```C#
  routes.MapRoute(
      name: "Language",
      url: "{language}/{controller}/{action}/{id}",
      defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional },
      constraints: new { language = @"(en)|(de)" }
  );
  routes.MapRoute(
      name: "Products",
      url: "{controller}/{action}/{productId}",
      defaults: new { controller = "Home", action = "Index", productId = UrlParameter.Optional },
      constraints: new { productId = @"\d+" }
  );
  ```

## 控制器

在ASP.NET MVC的体系结构中，优先使用约定而不是配置。

控制器位于目录Controllers中，并且控制器类的名称必须带有Controller后缀。

控制器中包含动作方法。动作可以返回任何东西，例如图像的字节、视频、XML或JSON数据，当然也可以返回HTML。控制器动作方法通常会返回ActionResult或者派生自ActionResult的类。

## 视图

控制器和视图运行在同一进程中。视图直接在控制器内创建，所以从控制器向视图传递数据变得很容易。

为传递数据，可以使用ViewDataDictionary，它可以与Controller类的ViewData属性一起使用；更简单的语法是使用ViewBag属性。ViewBag是动态类型，允许指定任何属性名称，以向视图传递数据。使用动态类型的优势在于视图不会直接依赖于控制器。

使用Razor语法时，引擎在找到HTML元素时，会自动认为代码结束。在有些情况中，这是无法自动看出来的。此时，可以使用圆括号来标记变量。其后是正常的代码。

通常，使用Razor可自动检测到文本内容，例如它们以角括号开头，或者使用圆括号包围变量。但在有些情况下是无法自动检测的，此时需要使用@:来显式定义文本的开始位置。

使用ViewBag向视图传递数据只是一种方式。另一种方式是向视图传递模型，这样可以创建强类型视图。在视图内可用model关键字定义模型。根据视图需要，可以传递任意对象作为模型。

ViewData|ViewBag
-|-
它是Key/Value字典集合|它是dynamic类型对像
从`Asp.net MVC 1` 就有了|`ASP.NET MVC3` 才有
基于`Asp.net 3.5 framework`|基于`Asp.net 4.0`与`.net framework`
ViewData比ViewBag快|ViewBag比ViewData慢
在ViewPage中查询数据时需要转换合适的类型|在ViewPage中查询数据时不需要类型转换
有一些类型转换代码|可读性更好

通常，Web应用程序的许多页面会显示部分相同的内容，如版权信息、logo和主导航结构。这就要用到布局页。ASP.NET Web Forms中，母版页完成的功能与Razor语法中的布局页相同。如果不使用布局页，需要将Layout属性设置为null来明确指定。

除了呈现页面主体以及使用ViewBag在布局和视图之间交换数据，还可以使用分区定义把视图内定义的内容放在什么位置。默认情况下，必须有这类分区，如果没有，加载视图的操作会失败。如果把required参数设为false，该分区就变为可选。在视图内分区由关键字section定义。分区的位置与其他内容完全独立。

## 过滤器

Filter（筛选器）是基于AOP（面向方面编程）的设计，它的作用是对MVC框架处理客户端请求注入额外的逻辑，以非常简单优美的方式实现横切关注点(Cross-cutting Concerns)。横切关注点是指横越应该程序的多个甚至所有模块的功能，经典的横切关注点有日志记录、缓存处理、异常处理和权限验证等。

MVC框架支持的Filter可以归为四类，每一类都可以对处理请求的不同时间点引入额外的逻辑处理。这四类Filter如下表：

Filter Type|实现接口|执行时间|Default Implementation
-|-|-|-
Authorization filter|IAuthorizationFilter|在所有Filter和Action执行之前执行|AuthorizeAttribute
Action filter|IActionFilter|分别在Action执行之前和之后执行。|ActionFilterAttribute
Result filter|IResultFilter|分别在Action Result执行之后和之前|ResultFilterAttribute
Exception filter|IExceptionFilter|只有在filter,或者 action method, 或者 action result 抛出一个异常时候执行|HandleErrorAttribute

在ASP.NET MVC中还有哪些场合会用到过滤器呢？

1. 判断登录与否或用户权限
2. 决策输出缓存
3. 防盗链
4. 防蜘蛛
5. 本地化与国际化设置
6. 实现动态Action

### AuthorizationFilter

Authorization Filter是在action方法和其他种类的Filter之前运行的。它的作用是强制实施权限策略，保证action方法只能被授权的用户调用。

### ExceptionFilter

Exception Filter，在下面三种来源抛出未处理的异常时运行：

- 另外一种Filter（如Authorization、Action或Result等Filter）。
- Action方法本身。
- Action方法执行完成（即处理ActionResult的时候）。

我们可以通过配置Web.config让应用程序不管在何时何地引发了异常都可以显示统一的友好错误信息。在Web.config文件中的`<system.web>`节点下添加如下子节点：

```xml
<system.web>
  ...
  <customErrors mode="On" defaultRedirect="/Content/RangeErrorPage.html"/>
</system.web>
```

这个配置只对远程访问有效，本地运行站点依然会显示跟踪信息。

### ActionFilter

顾名思义，Action Filter是对action方法的执行进行“筛选”的，包括执行前和执行后。其中，OnActionExecuting方法在action方法执行之前被调用，OnActionExecuted方法在action方法执行之后被调用。

### ResultFilter

Result Filter用来处理action方法返回的结果。IResultFilter 接口和之前的 IActionFilter 接口类似，要注意的是Result Filter是在Action Filter之后执行的。

### 其它常用 Filter

MVC框架内置了很多Filter，常见的有RequireHttps、OutputCache、AsyncTimeout等等。下面例举几个常用的。

- RequireHttps，强制使用HTTPS协议访问。它将浏览器的请求重定向到相同的controller和action，并加上 `https://` 前缀。
- OutputCache，将action方法的输出内容进行缓存。
- AsyncTimeout/NoAsyncTimeout，用于异步Controller的超时设置。
- ChildActionOnlyAttribute，使用action方法仅能被Html.Action和Html.RenderAction方法访问。

这里我们选择 OutputCache 这个Filter来做个示例。新建一个 SelectiveCache controller，代码如下：

```C#
public class SelectiveCacheController : Controller {
    public ActionResult Index() {
        Response.Write("Action method is running: " + DateTime.Now);
        return View();
    }

    [OutputCache(Duration = 30)]
    public ActionResult ChildAction() {
        Response.Write("Child action method is running: " + DateTime.Now);
        return View();
    }
}
```

这里的 ChildAction 应用了 OutputCache filter，这个action将在view内被调用，它的父action是Index。

现在我们分别创建两个View，一个是ChildAction.cshtml，代码如下：

```cs
@{
    Layout = null;
}
<h4>This is the child action view</h4>
```

另一个是它的Index.cshtml，代码如下：

```cs
@{
    ViewBag.Title = "Index";
}
<h2>This is the main action view</h2>
@Html.Action("ChildAction")

```

运行程序，将URL定位到/SelectiveCache，过几秒刷新一下，可看到如下结果：

![x](./Resource/46.png)

## 身份验证和授权

为指定Login动作以及要使用的视图，在web.config文件中，将loginUrl设为Account控制器的Login 方法

```xml
<authentication mode="Forms">
  <forms loginUrl="~/Account/Login" timeout="2880" />
</authentication>
```

Authorize特性指示是否拥有权

### 数据验证

1. 创建自定义验证

  ```C#
  public class FirstNameValidation:ValidationAttribute
  {
      protected override ValidationResult IsValid(object value, ValidationContext validationContext)
      {
          if (value == null) // Checking for Empty Value
          {
              return new ValidationResult("Please Provide First Name");
          }
          else
          {
              if (value.ToString().Contains("@"))
              {
                  return new ValidationResult("First Name should Not contain @");
              }
          }
          return ValidationResult.Success;
      }
  }
  ```

  Note: Creating multiple classes inside single file is never consider as good practice. So in your sample I recommend you to create a new folder called "Validations" in root location and create a new class inside it.

2. 绑定到模型字段上

  ```C#
  [FirstNameValidation]
  public string FirstName { get; set; }
  ```

**有关错误验证的保留值**

```C#
public class CreateEmployeeViewModel
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Salary { get; set; }
}

public ActionResult SaveEmployee(Employee e, string BtnSubmit)
{
    switch (BtnSubmit)
    {
        case "Save Employee":
            if (ModelState.IsValid)
            {
                EmployeeBusinessLayer empBal = new EmployeeBusinessLayer();
                empBal.SaveEmployee(e);
                return RedirectToAction("Index");
            }
            else
            {
                CreateEmployeeViewModel vm = new CreateEmployeeViewModel();
                vm.FirstName = e.FirstName;
                vm.LastName = e.LastName;
                if (e.Salary.HasValue)
                {
                    vm.Salary = e.Salary.ToString();                        
                }
                else
                {
                    vm.Salary = ModelState["Salary"].Value.AttemptedValue;                       
                }
                return View("CreateEmployee", vm); 
            }
        case "Cancel":
            return RedirectToAction("Index");
    }
    return new EmptyResult();
}
```

视图中取值：

```html
@using WebApplication1.ViewModels
@model CreateEmployeeViewModel

<input type="text" id="TxtFName" name="FirstName" value="@Model.FirstName" />
<input type="text" id="TxtLName" name="LastName" value="@Model.LastName" />
<input type="text" id="TxtSalary" name="Salary" value="@Model.Salary" />
```

1. 是否是真的将值保留？

   不是，是从post数据中重新获取的。

2. 为什么需要在初始化请求时，在Add New 方法中传递 new CreateEmployeeViewModel()？

   因为在View中，试着将Model中的数据重新显示在文本框中。如：

   ```html
   <input id="TxtSalary" name="Salary" type="text" value="@Model.Salary" />
   ```

   如上所示，正在访问当前Model的"First Name"属性，如果Model 为空，会抛出类无法实例化的异常"Object reference not set to an instance of the class"。

3. 上述的这些功能，有什么方法可以自动生成？

   使用HTML帮助类就可以实现。

### 模块化开发

***AraeRegistration***

简单的解释，AreaRegistration是用来在ASP.NET MVC里面注册多个区域的方式；就是可以将一个大型的MVC站点划分成多个Area区域，然后各自的Area有着自己的Controller、Action、View等元素；

但是一般情况我们并不会那么做，因为将站点的所有UI层中的元素切开放会给维护工作带来很大的工作量，而且我们约定俗成的是UI层的东西放在一个主的WebApplication中，然后是业务功能的划分，但是大型站点也许需要这么做；

AreaRegistration对象结构（典型的模板方法模式）

### 捆绑(Bundle)

MVC 4 提供的一个新特性：捆绑（Bundle），一个在  View 和 Layout 中用于组织优化浏览器请求的 CSS 和 JavaScript 文件的技术。

_references.js 文件的作用是通过下面方式放入该文件中的JS文件可以被VS智能感知：

```js
/// <reference path="jquery-1.8.2.js" />
/// <reference path="jquery-ui-1.8.24.js" />
```

以前我们引入脚本和样式文件的时候，都是一个个的引用，看起来一大坨，不小心还会弄错先后次序，管理很是不便。而且很多脚本库有普通和 min 两个版本，开发的时候我们引入普通版本以方便调试，发布的时候又换成min版本以减少网络带宽，很是麻烦。

为此，MVC 4 增加了一个新功能：“捆绑”，它的作用是把一类脚本或样式文件捆绑在一起，在需要用的时候调用一句代码就行，极大地方便了脚本和样式文件的管理；而且可以把脚本的普通和 min 两个版本都捆绑起来，MVC也会根据是否为Debug模式智能地选择脚本文件的版本。下面我们来看看这个捆绑功能的使用。

调用：

```C#
@Styles.Render("~/Content/css")
@Scripts.Render("~/bundles/clientfeaturesscripts")
```

这里通过 `@Scripts.Render` 和 `@Styles.Render` 两个Helper方法添加捆绑。

捆绑除了可以方便地管理脚本和样式文件，还可以给网络减少带宽（减少请求，压缩文件）。

`Install-Package Microsoft.AspNet.Web.Optimization`

## 总结

1. 可以传递ViewData，接收时获取ViewBag吗？

   答案是肯定的，反之亦然。如之前所说的，ViewBag只是ViewData的一块语法糖。

2. ViewData与ViewBag的问题

   ViewData和ViewBag 是Contoller与View之间传递值的一个好选择。但是在实际使用的过程中，它们并不是最佳选择，接下来我们来看看使用它们的缺点：
  
   - 性能问题：ViewData中的值都是object类型，使用之前必须强制转换为合适的类型。会添加额外的性能负担。
   - 没有类型安全就没有编译时错误：如果尝试将其转换为错误的类型，运行时会报错。良好的编程经验告诉我们，错误必须在编译时捕获。
   - 数据发送和数据接收之间没有正确的连接；MVC中，Controller和View是松散连接的。Controller无法捕获View变化，View也无法捕获到Controller内部发生的变化。从Controller传递一个ViewData或ViewBag的值，当开发人员正在View中写入，就必须记录从Controller中将获得什么值。如果Controller与View由不同的开发人员开发，开发工作会变得非常困难，会导致许多运行时问题，降低了开发效率。

3. 为什么可以将保存和取消按钮设置为同名？

   在日常使用中，点击提交按钮之后，请求会被发送到服务器端，所有输入控件的值都将被发送。提交按钮也是输入按钮的一种。因此提交按钮的值也会被发送。

   当保存按钮被点击时，保存按钮的值也会随着请求被发送到服务器端；当点击取消按钮时，取消按钮的值也会随着请求发送。

   在Action 方法中，Model Binder 将维护这些工作，会根据接收到的值更新参数值。

4. 为什么在实现重置功能时，不使用 input type=reset ？

   因为输入类型type=reset 不会清空控件的值，只会将控件设置回默认值。如：

   ```html
   <input type="text" name="FName" value="Sukesh">
   ```

   在该实例中控件值为：Sukesh，如果使用type=reset来实现重置功能，当重置按钮被点击时，textbox的值会被设置为"Sukesh"。

5. 如果控件名称与类属性名称不匹配会发生什么情况？

   默认的model binder不会工作。在这种情况下，我们有如下3种解决方法：

   - 在action方法中，用Request.Form接收post提交过来的数据并构造Model类
   - 使用对应的参数名，并构造Model类
   - 创建自定义model binder替换默认的

     首先创建自定义的model binder

     ```C#
     public class MyEmployeeModelBinder : DefaultModelBinder
     {
          protected override object CreateModel(ControllerContext controllerContext, ModelBindingContext bindingContext, Type modelType)
          {
              Employee e = new Employee();
              e.FirstName = controllerContext.RequestContext.HttpContext.Request.Form["FName"];
              e.LastName = controllerContext.RequestContext.HttpContext.Request.Form["LName"];
              e.Salary = int.Parse(controllerContext.RequestContext.HttpContext.Request.Form["Salary"]);
              return e;
          }
     }
     ```

     替换默认的model binder

     ```C#
      public ActionResult SaveEmployee([ModelBinder(typeof(MyEmployeeModelBinder))]Employee e, string BtnSubmit)
      {
      ......
      }
      ```

6. 怎么添加服务器端验证

   Model Binder使用 post数据更新 Employee对象，但是不仅仅如此。Model Binder也会更新Model State。Model State封装了 Model状态。

   ModelState包含属性IsValid，该属性表示 Model 是否成功更新。如果任何服务器端验证失败，Model将不更新。

   ModelState保存验证错误的详情。如：`ModelState["FirstName"]`，表示将包含所有与FirstName相关的错误。

   保存接收的值（Post数据或queryString数据）

   在`Asp.net MVC`中，将使用 DataAnnotations来执行服务器端的验证。在我们了解Data Annotation之前先来了解一些Model Binder知识：

   1. 使用元数据类型时，Model Binder 是如何工作的？

      当Action方法包含元类型参数，Model Binder会比较参数名和传入数据(Post和QueryString)的key。当匹配成功时，响应接收的数据会被分配给参数；匹配不成功时，参数会设置为缺省值，例如，如果是字符串类型则被设置为null，如果是整型则设置为0。由于数据类型异常而未匹配的话，会抛出异常。

   2. 当参数是类时，Model Binder 是如何工作的？

      当参数为类，Model Binder将通过检索所有类所有的属性，将接收的数据与类属性名称比较。

      当匹配成功时：

      如果接收的值是空：会将空值分配给属性，如果无法执行空值分配，会设置缺省值，ModelState.IsValid将设置为false。如果null值可以但是被属性验证认为是无效的那么还是会分配null，ModelState.IsValid将设置为fasle。

      如果接收的值不是空：数据类型错误和服务端验证失败的情形下，会分配null值，并将ModelState.IsValid设置为fasle。如果null值不行，会分配默认值。

      如果匹配不成功，参数会被设置为缺省值。在这种情况下，ModelState.IsValid是unaffected。

   - @Html.ValidationMessage是什么意思？

     @符号表示是Razor代码；Html是HtmlHelper类的实例；ValidationMessage是HtmlHelper类的函数，用来表示错误信息。

   - ValidationMessage 函数是如何工作的？

     ValidationMessage 是运行时执行的函数。如之前讨论的，ModelBinder更新ModelState。ValidationMessage根据Key显示ModelState表示的错误信息。

     例如：ValidationMessage("FirstName")显示关联FirstName的错误信息

   - 我们有更多的类似 required 和 StringLength的属性吗？

     当然有。

     - DataType – 确保数据是某些特殊的类型，例如：email, credit card number, URL等。
     - EnumDataTypeAttribute – 确定数据在枚举类型中
     - Range Attribute – 数据满足一定的范围
     - Regular expression- 数据满足正则表达式
     - Required – 确定数据是必须的
     - StringthLength – 确定字符串满足的长度

   - 我们能强制Model Binder执行吗？

     可以。删除action方法的全部参数（阻止默认的model binder执行，参数可以从Request获取），示例：

     ```C#
     Employee e = new Employee();
     UpdateModel<employee>(e);
     ```

     Note: UpdateModel只能更新对象（引用类型），原类型不适用

   - UpdateModel 和 TryUpdateModel 方法之间的区别是什么？

     TryUpdateModel 与 UpdateModel 几乎是相同的，有点略微差别。如果Model调整失败，UpdateModel会抛出异常。UpdateModel的 ModelState.IsValid 属性就没有任何用处。TryUpdateModel如果更新失败，ModelState.IsValid会设置为False值。

   - 客户端验证是什么？

     客户端验证是手动执行的（通过JS代码），除非使用HTML帮助类。

7. 使用EF代码优先时，如果数据库已存在时，遇到的问题

   ```sh
   Note: 你可能碰到以下错误：
   "The model backing the 'SalesERPDAL' context has changed since the database was created. Consider using Code First Migrations to update the database."
   ```

   怎么解决：在Global.asax 的Application_Start方法中加入：

   ```C#
   Database.SetInitializer(new DropCreateDatabaseIfModelChanges<SalesERPDAL>());
   ```

   如果还是报相同的错误，打开数据库，删除"__MigrationHistory"表

添加客户端验证
	首先了解，需要验证什么？
1. FirstName 不能为空
2. LastName字符长度不能大于5
3. Salary不能为空，且应该为数字类型
4. FirstName 不能包含@字符
	接下来，实现客户端验证功能
1. 创建JavaScript 验证文件
在Script文件下，新建JavaScript文件，命名为"Validations.js"

![x](./Resource/64.png)


2. 创建验证函数
function IsFirstNameEmpty() {
    if (document.getElementById('TxtFName').value == "") {
        return 'First Name should not be empty';
    }
    else { return ""; }
}
function IsFirstNameInValid() {    
    if (document.getElementById('TxtFName').value.indexOf("@") != -1) {
        return 'First Name should not contain @';
    }
    else { return ""; }
}
function IsLastNameInValid() {
    if (document.getElementById('TxtLName').value.length>=5) {
        return 'Last Name should not contain more than 5 character';
    }
    else { return ""; }
}
function IsSalaryEmpty() {
    if (document.getElementById('TxtSalary').value=="") {
        return 'Salary should not be empty';
    }
    else { return ""; }
}
function IsSalaryInValid() {
    if (isNaN(document.getElementById('TxtSalary').value)) {
        return 'Enter valid salary';
    }
    else { return ""; }
}
function IsValid() {
    var FirstNameEmptyMessage = IsFirstNameEmpty();
    var FirstNameInValidMessage = IsFirstNameInValid();
    var LastNameInValidMessage = IsLastNameInValid();
    var SalaryEmptyMessage = IsSalaryEmpty();
    var SalaryInvalidMessage = IsSalaryInValid();

    var FinalErrorMessage = "Errors:";
    if (FirstNameEmptyMessage != "")
        FinalErrorMessage += "\n" + FirstNameEmptyMessage;
    if (FirstNameInValidMessage != "")
        FinalErrorMessage += "\n" + FirstNameInValidMessage;
    if (LastNameInValidMessage != "")
        FinalErrorMessage += "\n" + LastNameInValidMessage;
    if (SalaryEmptyMessage != "")
        FinalErrorMessage += "\n" + SalaryEmptyMessage;
    if (SalaryInvalidMessage != "")
        FinalErrorMessage += "\n" + SalaryInvalidMessage;

    if (FinalErrorMessage != "Errors:") {
        alert(FinalErrorMessage);
        return false;
    }
    else {
        return true;
    }
}
3. 在 "CreateEmployee" View 中添加 Validations.js文件引用：
<script src="~/Scripts/Validations.js"></script>
4. 在点击 SaveEmployee按钮时，调用验证函数，如下：
<input type="submit" name="BtnSubmit" value="Save Employee" onclick="return IsValid();" />
5. 运行测试

Talk
1.	为什么在点击 "SaveEmployee" 按钮时，需要返回关键字？
如之前实验讨论的，当点击提交按钮时，是给服务器发送请求，客户端验证失败对服务器请求没有意义。通过在提交按钮的onclick事件中添加 "return false" 代码，可以取消默认的服务器请求。此时IsValid函数将返回false，表示验证失败来实现预期的功能。
2.	除了提示用户，是否可以在当前页面显示错误信息？
可以，只需要为每个错误创建span 标签，默认设置为不可见，当提交按钮点击时，如果验证失败，使用JavaScript修改错误的可见性。
3.	自动获取客户端验证还有什么方法？
是，当使用Html 帮助类，可根据服务端验证来获取自动客户端验证，在以后会详细讨论。
4.	服务器端验证必须使用吗？
当某些人禁用JavaScript脚本时，服务器端验证能确保任何数据有效。
实验18: 在View中显示UserName
在本实验中，我们会在View中显示已登录的用户名
1. 在ViewModel中添加 UserName
打开 EmployeeListViewModel，添加属性：UserName。
public class EmployeeListViewModel
{
    public List<EmployeeViewModel><employeeviewmodel> Employees { get; set; }
    public string UserName { get; set; }
}
2. 给 ViewModel UserName 设置值
修改 EmployeeController，修改 Index 方法。
public ActionResult Index()
{
    EmployeeListViewModel employeeListViewModel = new EmployeeListViewModel();
    employeeListViewModel.UserName = User.Identity.Name; //New Line
    ......
}
3.  显示 View UserName
Open Index.cshtml view and display UserName as follows.
<body>
  <div style="text-align:right"> Hello, @Model.UserName </div>
  <hr />
  <a href="/Employee/AddNew">Add New</a>
  <div>
      <table border="1"><span style="font-size: 9pt;"> </span>
4. 运行

实验19: 实现注销功能
1. 创建注销链接，打开Index.cshtml 创建 Logout 链接如下：
<body>
    <div style="text-align:right">Hello, @Model.UserName
    <a href="/Authentication/Logout">Logout</a></div>
    <hr />
    <a href="/Employee/AddNew">Add New</a>
    <div>
        <table border="1">
2. 创建Logout Action方法
打开 AuthenticationController添加新的Logout action方法：
public ActionResult Logout()
{
    FormsAuthentication.SignOut();
    return RedirectToAction("Login");
}
3.  运行

实现登录页面验证
1. 添加 data annotation
打开  UserDetails.cs，添加Data Annotation：
public class UserDetails
{
    [StringLength(7, MinimumLength=2, ErrorMessage = "UserName length should be between 2 and 7")]
    public string UserName { get; set; }
    public string Password { get; set; }
}
2. 在View 中显示错误信息
修改 Login.cshtml能够提示错误信息。
@using (Html.BeginForm("DoLogin", "Authentication", FormMethod.Post))
{
    @Html.LabelFor(c=>c.UserName)
    @Html.TextBoxFor(x=>x.UserName)
    @Html.ValidationMessageFor(x=>x.UserName)
    ......
Note: This time instead of Html.ValidationMessage we have used Html.ValidationMessageFor. Both will do same thing. Html.ValidationMessageFor can be used only when the view is strongly typed view.
3. 修改 DoLogin
修改 DoLogin action 方法：
[HttpPost]
public ActionResult DoLogin(UserDetails u)
{
    if (ModelState.IsValid)
    {
        EmployeeBusinessLayer bal = new EmployeeBusinessLayer();
        if (bal.IsValidUser(u))
        {
            FormsAuthentication.SetAuthCookie(u.UserName, false);
            return RedirectToAction("Index", "Employee");
        }
        else
        {
            ModelState.AddModelError("CredentialError", "Invalid Username or Password");
            return View("Login");
        }
    }
    else
    {
        return View("Login");
    }
}
4.  运行
	Press F5 and execute the application.

登录页面实现客户端验证
在本实验中介绍另一种方法实现客户端验证
1. 下载 jQuery unobtrusive Validation文件
右击项目，选择"Manage Nuget packages"，点击在线查找"jQuery Unobtrusive"，安装"Microsoft jQuery Unobtrusive Valiadtion"

2. 在View中添加 jQuery Validation引用
在Scripts文件中，添加以下 JavaScript文件
jQuery-Someversion.js
jQuery.valiadte.js
jquery.validate.unobtrusive
打开 Login.cshtml，在文件顶部包含这三个js文件：
<script src="~/Scripts/jquery-1.8.0.js"></script>
<script src="~/Scripts/jquery.validate.js"></script>
<script src="~/Scripts/jquery.validate.unobtrusive.js"></script>
3. 运行

Talk
1. 客户端验证是如何实现的？
如上所述，客户端验证并不是很麻烦，在Login View中，HTML元素能够使用帮助类来生成，Helper 函数能够根据Data Annotation属性的使用生成带有属性的HTML标记元素。例如：
@Html.TextBoxFor(x=>x.UserName)
@Html.ValidationMessageFor(x=>x.UserName)
根据以上代码生成的HTML 代码如下：
<input data-val="true" data-val-length="UserName length should be between 2 and 7" data-val-length-max="7" data-val-length-min="2" id="UserName" name="UserName" type="text" value="" />
<span class="field-validation-error" data-valmsg-for="UserName" data-valmsg-replace="true"> </span>
jQuery Unobtrusive验证文件会使用这些自定义的HTML 属性，验证会在客户端自动生成。自动进行客户端验证是使用HTML 帮助类的又一大好处。
1.	What is unobtrusive JavaScript means?
	This is what Wikipedia says about it.
Unobtrusive JavaScript is a general approach to the use of JavaScript in web pages. Though the term is not formally defined, its basic principles are generally understood to include:
•	Separation of functionality (the "behaviour layer") from a Web page's structure/content and presentation
•	Best practices to avoid the problems of traditional JavaScript programming (such as browser inconsistencies and lack of scalability)
•	Progressive enhancement to support user agents that may not support advanced JavaScript functionality
	Let me define it in layman terms.
	"Write your JavaScript in such way that, JavaScript won't be tightly connected to HTML. JavaScript may access DOM elements, JavaScript may manipulate DOM elements but won't directly connected to it."
	In the above example, jQuery Unobtrusive JavaScript simply used some input element attributes and implemented client side validation.
2.	是否可以使用不带HTML帮助类的JavaScript验证？
是，可手动添加属性。
3.	What is more preferred, Html helper functions or pure HTML?
I personally prefer pure HTML because Html helper functions once again take "full control over HTML" away from us and we already discussed the problems with that.
Secondly let's talk about a project where instead of jQuery some other JavaScript frameworks/librariesare used. Some other framework like angular. In that case mostly we think about angular validation and in that case these custom HTML validation attributes will go invain.
实验22: 添加页脚
在本实验中，我们会在Employee 页面添加页脚，通过本实验理解分部视图。什么是"分部视图"？
从逻辑上看，分部视图是一种可重用的视图，不会直接显示，包含于其他视图中，作为其视图的一部分来显示。用法与用户控件类似，但不需要编写后台代码。
1. 创建分部视图的 ViewModel
右击 ViewModel 文件夹，新建 FooterViewModel 类，如下：
public class FooterViewModel
{
   public string CompanyName { get; set; }
   public string Year { get; set; }
}
2. 创建分部视图
右击 "~/Views/Shared" 文件夹，选择添加->视图。
输入View名称"Footer"，选择复选框"Create as a partial view"，点击添加按钮。
注意：View中的Shared共享文件夹是每个控制器都可用的文件夹，不是某个特定的控制器所属。
3. 在分部View中显示数据
打开Footer.cshtml，输入以下HTML代码。
@using WebApplication1.ViewModels
@model FooterViewModel
<div style="text-align:right;background-color: silver;color: darkcyan;border: 1px solid gray;margin-top:2px;padding-right:10px;">
   @Model.CompanyName &copy; @Model.Year
</div>
4.  在Main ViewModel中包含Footer数据
打开 EmployeeListViewModel 类，添加新属性，保存 Footer数据，如下：
public class EmployeeListViewModel
{
    public List<EmployeeViewModel> Employees { get; set; }
    public string UserName { get; set; }
    public FooterViewModel FooterData { get; set; }//New Property
}
在本实验中Footer会作为Index View的一部分显示，因此需要将Footer的数据传到Index View页面中。Index View 是EmployeeListViewModel的强类型View，因此Footer需要的所有数据都应该封装在EmployeeListViewModel中。
5. 设置Footer数据
打开 EmployeeController，在Index action方法中设置FooterData属性值，如下：
public ActionResult Index()
{
    ...
    ...
    employeeListViewModel.FooterData = new FooterViewModel();
    employeeListViewModel.FooterData.CompanyName = "StepByStepSchools";//Can be set to dynamic value
    employeeListViewModel.FooterData.Year = DateTime.Now.Year.ToString();
    return View("Index", employeeListViewModel);
} 
6. 显示Footer
打开Index.cshtml文件，在Table标签后显示Footer分部View，如下：
       </table>
        @{
            Html.RenderPartial("Footer", Model.FooterData);
        }
    </div>
</body>
</html>
7. 运行，打开Index View
Talk on lab 22
1.	Html.Partial的作用是什么？与Html.RenderPartial区别是什么？
与Html.RenderPartial作用相同，Html.Partial会在View中用来显示分部View。
This is the syntax
@Html.Partial("Footer", Model.FooterData);
Syntax is much simpler than earlier one.
Html.RenderPartial会将分部View的结果直接写入HTTP响应流中，而 Html.Partial会返回 MvcHtmlString值。
2.	什么是MvcHtmlString，为什么 Html.Partial返回的是MvcHtmlString 而不是String？
根据MSDN规定，"MvcHtmlString"代表了一个不应该再被二次编码的HTML编码的字符串。举个例子：
@{
   string MyString = "My Simple String";
}
@MyString
以上代码会转换为：<b>My Simple String</b>
Razor显示了全部的内容，许多人会认为已经看到加粗的字符串，是Razor Html在显示内容之前将内容编码，这就是为什么使用纯内容来代替粗体。
当不使用razor编码时，使用 MvcHtmlString，MvcHtmlString是razor的一种表示，即“字符串已经编码完毕，不需要其他编码”。如：
@{
   string MyString = "My Simple String";
}
@MvcHtmlString.Create(MyString)
输出：My Simple String
Why does Html.Partial return MvcHtmlString instead of string?
We already understood a fact that "razor will always encode strings but it never encodes MvcHtmlString". It doesn't make sense if Partial View contents are considered as pure string gets displayed as it is. We want it to be considered as a HTML content and for that we have to stop razor from encoding thus Partial method is designed to return MvcHtmlString.
3.	What is recommended Html.RenderPartial or Html.Partial?
Html.RenderPartial is recommended because it is faster.
4.	When Html.Partial will be preferred?
It is recommended when we want to change the result returned by Partial View before displaying.
Open Index.cshtml and open Footer code to below code and test.
@{
    MvcHtmlString result = Html.Partial ("Footer", Model.FooterData);
    string finalResult = result.ToHtmlString().Replace("2015", "20000");            
}
@MvcHtmlString.Create(finalResult)
Now footer will look like below.
 
5.	Why Partial View is placed inside Shared Folder?
Partial Views are meant for reusability hence the best place for them is Shared folder.
6.	Can't we place Partial Views inside a specific controller folder, like Employee or Authentication?
We can do that but in that case it won't be available to only specific controller.
Example: When we keep Partial View inside Employee folder it won't be available for AuthenticationController or to Views related to AuthenticationController.
7.	Why definition of Partial View contains word "Logically" ?
In definition we have said that Partial View is a reusable view but it won't get executed by its own. It has to be placed in some other view and then displayed as a part of the view.
What we said about reusability is completely true but what we said about execution is only true logically. Technically it's not a correct statement. We can create an action method which will return a ViewResult as bellow.
public ActionResult MyFooter()
{
    FooterViewModel FooterData = new FooterViewModel();
    FooterData.CompanyName = "StepByStepSchools";//Can be set to dynamic value
    FooterData.Year = DateTime.Now.Year.ToString();
    return View("Footer", FooterData);
}
It will display following output
 
Although logically it doesn't make sense, technically it's possible. Footer.cshtml won't contain properly structured HTML. It meant to be displayed as a part of some other view. Hence I said "Logically it doesn't make sense".
8.	Why Partial View is created instead of putting footer contents directly in the view ?
Two advantages
1.	Reusability – we can reuse the same Partial View in some other View.
2.	Code Maintenance – Putting it in a separate file makes it easy to manage and manipulate.
9.	Why Header is not created as Partial View?
As a best practice we must create Partial View for header also but to keep Initial labs simpler we had kept it inline.

实验23: 实现用户角色管理
在实验23中我们将实现管理员和非管理员登录的功能。需求很简单：非管理员用户没有创建新Employee的权限。实验23会帮助大家理解MVC提供的Session 和Action过滤器。
因此我们将实验23分为两部分：
第一部分：非管理员用户登录时，隐藏 Add New 链接
创建标识用户身份的枚举类型
右击Model 文件夹，选择添加新项目。选择"Code File"选项。
输入"UserStatus"名，点击添加。"Code File"选项会创建一个".cs"文件．创建UserStatus枚举类型，如下：
namespace WebApplication1.Models
{
    public enum UserStatus
    {
        AuthenticatedAdmin,
        AuthentucatedUser,
        NonAuthenticatedUser
    }
}
修改业务层功能
删除IsValidUser函数，创建新函数"GetUserValidity"，如下：
public UserStatus GetUserValidity(UserDetails u)
{
    if (u.UserName == "Admin" && u.Password == "Admin")
    {
        return UserStatus.AuthenticatedAdmin;
    }
    else if (u.UserName == "Sukesh" && u.Password == "Sukesh")
    {
        return UserStatus.AuthentucatedUser;
    }
    else
    {
        return UserStatus.NonAuthenticatedUser;
    }
}
修改DoLogin action方法
打开 AuthenticationController，修改DoLogin action:
[HttpPost]
public ActionResult DoLogin(UserDetails u)
{
    if (ModelState.IsValid)
    {
        EmployeeBusinessLayer bal = new EmployeeBusinessLayer();
        //New Code Start
        UserStatus status = bal.GetUserValidity(u);
        bool IsAdmin = false;
        if (status==UserStatus.AuthenticatedAdmin)
        {
            IsAdmin = true;
        }
        else if (status == UserStatus.AuthentucatedUser)
        {
            IsAdmin = false;
        }
        else
        {
            ModelState.AddModelError("CredentialError", "Invalid Username or Password");
            return View("Login");
        }
        FormsAuthentication.SetAuthCookie(u.UserName, false);
        Session["IsAdmin"] = IsAdmin;
        return RedirectToAction("Index", "Employee");
        //New Code End
    }
    else
    {
        return View("Login");
    }
}
在上述代码中，已经出现Session 变量来识别用户身份。
什么是Session？
Session是Asp.Net的特性之一，可以在MVC中重用，可用于暂存用户相关数据，session变量周期是穿插于整个用户生命周期的。
移除存在的 AddNew 链接
打开"~/Views/Employee"文件夹下 Index.cshtml View，移除"Add New"超链接。
<!-- Remove following line from Index.cshtml -->
<a href="/Employee/AddNew">Add New</a>
创建分部View
右击"~/Views/Employee"文件夹，选择添加View，设置View名称"AddNewLink"，选中"Create a partial View"复选框。

输入分部View的内容
在新创建的分部视图中输入以下内容：
<a href="/Employee/AddNew">Add New</a>
新建 Action 方法
打开 EmployeeController，新建Action方法"GetAddNewLink"，如下：
public ActionResult GetAddNewLink()
{
    if (Convert.ToBoolean(Session["IsAdmin"]))
    {
        return Partial View("AddNewLink");
    }
    else
    {
        return new EmptyResult();
    }
}
显示  AddNew 链接
打开 Index.html，输入以下代码：
<a href="/Authentication/Logout">Logout</a>
</div>
<hr />
@{
  Html.RenderAction("GetAddNewLink");
}
<div>
<table border="1">
<tr>
Html.RenderAction 执行Action 方法，并将结果直接写入响应流中。
运行

第二部分： 直接URL 安全
以上实验实现了非管理员用户无法导航到AddNew链接。这样还不够，如果非管理员用户直接输入AddNew URL，则会直接跳转到此页面。

非管理员用户还是可以直接访问AddNew方法，为了解决这个问题，我们会引入MVC action 过滤器。Action 过滤器使得在action方法中添加一些预处理和后处理的逻辑判断问题。在整个实验中，会注重ActionFilters预处理的支持和后处理的功能。
安装过滤器
新建文件夹Filters，新建类"AdminFilter"。

创建过滤器
通过继承 ActionFilterAttribute，将 AdminFilter类升级为"ActionFilter"，如下：
public class AdminFilter:ActionFilterAttribute
{

}
注意：使用"ActionFilterAttribute"需要在文件顶部输入"System.Web.Mvc"。
添加安全验证逻辑
在ActionFliter中重写 OnActionExecuting方法：
public override void OnActionExecuting(ActionExecutingContext filterContext)
{
    if (!Convert.ToBoolean(filterContext.HttpContext.Session["IsAdmin"]))
    {
        filterContext.Result = new ContentResult()
        {
            Content="Unauthorized to access specified resource."
        };
    }
}
绑定过滤器
在AddNew和 SaveEmployee方法中绑定过滤器，如下：
[AdminFilter]
public ActionResult AddNew()
{
    return View("CreateEmployee",new Employee());
}
...
...
[AdminFilter]
public ActionResult SaveEmployee(Employee e, string BtnSubmit)
{
    switch (BtnSubmit)
    {
        case "Save Employee":
            if (ModelState.IsValid)
            {
                EmployeeBusinessLayer empBal = new EmployeeBusinessLayer();
	....
	....
运行

Note: Whatever strategy and logic we have used in this lab for implementing Role based security may not be the best solution. You may have some better logic to implement such behaviour. It’s just one of the way to achieve it.
Talk on Lab 23
1.	可以通过浏览器直接调用GetAddNewLink方法吗？
可以直接调用，也可以禁止直接运行"GetAddNewLink"。
For that decorate GetAddNewLink with ChildActionOnly attribute.
[ChildActionOnly]
public ActionResult GetAddNewLink()
{
    if (Convert.ToBoolean(Session["IsAdmin"]))
    {
2.	Html.Action有什么作用？
与Html.RenderAction作用相同，Html.Action会执行action 方法，并在View中显示结果。语法：
@Html.Action("GetAddNewLink");
Syntax is much simpler than earlier one.
3.	Html.RenderAction 和 Html.Action两者之间有什么不同？更推荐使用哪种方法？
Html.RenderAction会将Action 方法的执行结果直接写入HTTP 响应请求流中，而 Html.Action会返回MVCHTMLString。更推荐使用Html.RenderAction，因为它更快。当我们想在显示前修改action执行的结果时，推荐使用Html.Action。
4.	什么是 ActionFilter?
与AuthorizationFilter类似，ActionFilter是ASP.NET MVC过滤器中的一种，允许在action 方法中添加预处理和后处理逻辑。
实验24: Assignment Lab – Handle CSRF attack
From safety point of view we must also handle CSRF attacks to the project. This one I will leave to you guys.
I recommend you to read this article and implement same to our SaveEmployee action method.
http://www.codeproject.com/Articles/994759/What-is-CSRF-attack-and-how-can-we-prevent-the-sam
实验25: 实现项目外观的一致性
在ASP.NET能够保证外观一致性的是母版页的使用。MVC却不同于ASP.NET，在RAZOR中，母版页称为布局页面。
在开始实验之前，首先来了解布局页面
1. 带有欢迎消息的页眉
2. 带有数据的页脚
最大的问题是什么？
带有数据的页脚和页眉作为ViewModel的一部分传从Controller传给View。
![x](./Resource/65.png)


现在最大的问题是在页眉和页脚移动到布局页面后，如何将数据从View传给Layout页面。
解决方案——继承
可使用继承原则，通过实验来深入理解。
1. 创建ViewModel基类
在ViewModel 文件夹下新建ViewModel 类 "BaseViewModel"，如下：
public class BaseViewModel
{
    public string UserName { get; set; }
    public FooterViewModel FooterData { get; set; }//New Property
} 
BaseViewModel封装了布局页所需要的所有值。
2. 准备 EmployeeListViewModel
删除EmployeeListViewModel类的 UserName和 FooterData属性，并继承 BaseViewModel：
public class EmployeeListViewModel:BaseViewModel
{
    public List<EmployeeViewModel> Employees { get; set; }
}
3.  创建布局页面
右击shared文件夹，选择添加>>MVC5 Layout Page。输入名称"MyLayout"，点击确认
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width" />
    <title>@ViewBag.Title</title>
</head>
<body>
    <div>
        @RenderBody()
    </div>
</body>
</html>
4. 将布局转换为强类型布局
@using WebApplication1.ViewModels
@model BaseViewModel
5. 设计布局页面
在布局页面添加页眉，页脚和内容三部分，如下：
<html>
<head>
    <meta name="viewport" content="width=device-width" />
    <title>@RenderSection("TitleSection")</title>
    @RenderSection("HeaderSection",false)
</head>
<body>
    <div style="text-align:right">
        Hello, @Model.UserName
        <a href="/Authentication/Logout">Logout</a>
    </div>
    <hr />
    <div>
    @RenderSection("ContentBody")
    </div>
    @Html.Partial("Footer",Model.FooterData)
</body>
</html>
如上所示，布局页面包含三部分，TitleSection，HeaderSection 和 ContentBody，内容页面将使用这些部分来定义合适的内容。
Note: While defining HeaderSection second parameter is passed. This parameter decides whether it's the optional section or compulsory section. False indicates it's an optional section.
6. 在 Index View中绑定布局页面
打开Index.cshtml,在文件顶部会发现以下代码：
@{
    Layout = null;
}
修改：
@{
    Layout = "~/Views/Shared/MyLayout.cshtml";
}
7.设计Index View
•	从Index View中去除页眉和页脚
•	在Body标签中复制保留的内容，并存放在某个地方。
•	复制Title标签中的内容
•	移除View中所有的HTML 内容，确保只删除了HTML，@model 和layout语句不要动
•	用刚才复制的内容定义TitleSection和 Contentbody
完整的View代码如下：
@using WebApplication1.ViewModels
@model EmployeeListViewModel
@{
    Layout = "~/Views/Shared/MyLayout.cshtml";
}

@section TitleSection{
    MyView
}
@section ContentBody{       
    <div>        
        @{
            Html.RenderAction("GetAddNewLink");
        }
        <table border="1">
            <tr>
                <th>Employee Name</th>
                <th>Salary</th>
            </tr>
            @foreach (EmployeeViewModel item in Model.Employees)
            {
                <tr>
                    <td>@item.EmployeeName</td>
                    <td style="background-color:@item.SalaryColor">@item.Salary</td>
                </tr>
            }
        </table>
    </div>
}
8. 运行

9. 在 CreateEmployee 中绑定布局页面
打开 Index.cshtml，修改顶部代码：
@{
    Layout = "~/Views/Shared/MyLayout.cshtml";
}
10. 设计 CreateEmployee View
与第7步中的程序类似，定义 CreateEmployee View中的Section，在本次定义中只添加一项，如下：
@using WebApplication1.Models
@model Employee
@{
    Layout = "~/Views/Shared/MyLayout.cshtml";
}

@section TitleSection{
    CreateEmployee
}

@section HeaderSection{
<script src="~/Scripts/Validations.js"></script>
<script>
    function ResetForm() {
        document.getElementById('TxtFName').value = "";
        document.getElementById('TxtLName').value = "";
        document.getElementById('TxtSalary').value = "";
    }
</script>
}
@section ContentBody{ 
    <div>
        <form action="/Employee/SaveEmployee" method="post" id="EmployeeForm">
            <table>
            <tr>
                <td>
                    First Name:
                </td>
                <td>
                    <input type="text" id="TxtFName" name="FirstName" value="@Model.FirstName" />
                </td>
            </tr>
            <tr>
                <td colspan="2" align="right">
                    @Html.ValidationMessage("FirstName")
                </td>
            </tr>
            <tr>
                <td>
                    Last Name:
                </td>
                <td>
                    <input type="text" id="TxtLName" name="LastName" value="@Model.LastName" />
                </td>
            </tr>
            <tr>
                <td colspan="2" align="right">
                    @Html.ValidationMessage("LastName")
                </td>
            </tr>

            <tr>
                <td>
                    Salary:
                </td>
                <td>
                    <input type="text" id="TxtSalary" name="Salary" value="@Model.Salary" />
                </td>
            </tr>
            <tr>
                <td colspan="2" align="right">
                    @Html.ValidationMessage("Salary")
                </td>
            </tr>

            <tr>
                <td colspan="2">

                    <input type="submit" name="BtnSubmit" value="Save Employee" onclick="return IsValid();" />
                    <input type="submit" name="BtnSubmit" value="Cancel" />
                    <input type="button" name="BtnReset" value="Reset" onclick="ResetForm();" />
                </td>
            </tr>
            </table>
    </div>
}
11. 运行

Index View是EmployeeListViewModel类型的强View类型，是 BaseViewModel的子类，这就是为什么Index View可一直发挥作用。CreateEmployee View 是CreateEmployeeViewModel的强类型，并不是BaseViewModel的子类，因此会出现以上错误。
12. 准备 CreateEmployeeViewModel
使CreateEmployeeViewModel 继承 BaseViewModel，如下：
public class CreateEmployeeViewModel:BaseViewModel
{
...
13. 运行
报错，该错误好像与步骤11中的错误完全不同，出现这些错误的根本原因是未初始化AddNew action方法中的Header和Footer数据。
14. 初始化Header和Footer 数据
修改AddNew方法：
public ActionResult AddNew()
{
    CreateEmployeeViewModel employeeListViewModel = new CreateEmployeeViewModel();
    employeeListViewModel.FooterData = new FooterViewModel();
    employeeListViewModel.FooterData.CompanyName = "StepByStepSchools";//Can be set to dynamic value
    employeeListViewModel.FooterData.Year = DateTime.Now.Year.ToString();
    employeeListViewModel.UserName = User.Identity.Name; //New Line
    return View("CreateEmployee", employeeListViewModel);
}
15. 初始化 SaveEmployee中的Header和 FooterData
public ActionResult SaveEmployee(Employee e, string BtnSubmit)
{
    switch (BtnSubmit)
    {
        case "Save Employee":
            if (ModelState.IsValid)
            {
                ...
            }
            else
            {
                CreateEmployeeViewModel vm = new CreateEmployeeViewModel();
                ...
                vm.FooterData = new FooterViewModel();
                vm.FooterData.CompanyName = "StepByStepSchools";//Can be set to dynamic value
                vm.FooterData.Year = DateTime.Now.Year.ToString();
                vm.UserName = User.Identity.Name; //New Line
                return View("CreateEmployee", vm); // Day 4 Change - Passing e here
            }
        case "Cancel":
            return RedirectToAction("Index");
    }
    return new EmptyResult();
}
16. 运行

Talk on Lab 25
1. RenderBody 有什么作用？
之前创建了Layout 页面，包含一个Razor语句如：
   @Html.RenderBody()
首先我们先来了解RenderBody是用来做什么的？
在内容页面，通常会定义Section(部分)(在Layout(布局)页面声明)。但是奇怪的是，Razor允许在Section外部定义一些内容。所有的非section内容会使用RenderBody函数来渲染，下图能够更好的理解：
![x](./Resource/66.png)

2. 布局是否可嵌套？
可以嵌套，创建Layout页面，可使用其他存在的Layout页面，语法相同。
3. 是否需要为每个View定义Layout页面？
可以在View文件夹下发现一个特殊的文件"__ViewStart.cshtml"，在其内部的设置会应用到所有的View。例如：在__ViewStart.cshtml中输入以下代码，会给所有View 设置 Layout页面。
@{
    Layout = "~/Views/Shared/_Layout.cshtml";
}
4. 是否在每个Action 方法中需要加入Header和Footer数据代码？
不需要，可在Action 过滤器的帮助下改进需要重复代码的部分。
5. 是否强制定义所有子View中的Section？
是的，如果Section被声明为必须的(下面示例的第二个参数，默认值为true)。如下
@RenderSection("HeaderSection",false) // Not required
@RenderSection("HeaderSection",true) // required
@RenderSection("HeaderSection") // required
实验26: 使用Action Fliter让Header和Footer数据更有效
在实验23中，我们已经知道了使用 ActionFilter的一个优点，现在来看看使用 ActionFilter的其他好处
1. 删除Action 方法中的冗余代码
删除Index，AddNew，SaveEmployee方法中的Header和Footer数据代码。
需要删除的Header代码会像这样子：
bvm.UserName = HttpContext.Current.User.Identity.Name;
Footer代码会像这样子
bvm.FooterData = new FooterViewModel();
bvm.FooterData.CompanyName = "StepByStepSchools";//Can be set to dynamic value
bvm.FooterData.Year = DateTime.Now.Year.ToString();         
2.创建HeaderFooter过滤器
在Filter文件夹下新建类 "HeaderFooterFilter"，并通过继承ActionFilterAttribute类升级为Action Filter
3. 升级ViewModel
重写 HeaderFooterFilter类的 OnActionExecuted方法，在该方法中获取当前View Model，并绑定Header和Footer数据。
public class HeaderFooterFilter : ActionFilterAttribute
{
    public override void OnActionExecuted(ActionExecutedContext filterContext)
    {
        ViewResult v = filterContext.Result as ViewResult;
        if(v!=null) // v will null when v is not a ViewResult
        {
            BaseViewModel bvm = v.Model as BaseViewModel;
            if(bvm!=null)//bvm will be null when we want a view without Header and footer
            {
                bvm.UserName = HttpContext.Current.User.Identity.Name;
                bvm.FooterData = new FooterViewModel();
                bvm.FooterData.CompanyName = "StepByStepSchools";//Can be set to dynamic value
                bvm.FooterData.Year = DateTime.Now.Year.ToString();            
            }
        }
    }
}
4. 绑定过滤器
在Index中，AddNew，SaveEmployee的action 方法中绑定 HeaderFooterFilter
[HeaderFooterFilter]
public ActionResult Index()
{
    EmployeeListViewModel employeeListViewModel = new EmployeeListViewModel();
    ...
}
...
[AdminFilter]
[HeaderFooterFilter]
public ActionResult AddNew()
{
    CreateEmployeeViewModel employeeListViewModel = new CreateEmployeeViewModel();
    //employeeListViewModel.FooterData = new FooterViewModel();
    //employeeListViewModel.FooterData.CompanyName = "StepByStepSchools";
    ...
}
...
[AdminFilter]
[HeaderFooterFilter]
public ActionResult SaveEmployee(Employee e, string BtnSubmit)
{
    switch (BtnSubmit)
    {
        ...
5. 运行


实验27: 添加批量上传选项
在实验27中，我们将提供一个选项，供用户选择上传Employee记录文件（CSV格式）。
我们会学习以下知识：
1. 如何使用文件上传控件
2. 异步控制器
1. 创建 FileUploadViewModel
在ViewModels文件夹下新建类"FileUploadViewModel"，如下：
public class FileUploadViewModel: BaseViewModel
{
    public HttpPostedFileBase fileUpload {get; set ;}
}
HttpPostedFileBase将通过客户端提供上传文件的访问入口。
2. 创建 BulkUploadController 和Index action 方法
新建 controller "BulkUploadController"，并实现Index Action 方法，如下：
public class BulkUploadController : Controller
{
    [HeaderFooterFilter]
    [AdminFilter]
    public ActionResult Index()
    {
        return View(new FileUploadViewModel());
    } 
}
Index方法与 HeaderFooterFilter 和 AdminFilter属性绑定。HeaderFooterFilter会确保页眉和页脚数据能够正确传递到ViewModel中，AdminFilter限制非管理员用户的访问。
3.创建上传View
创建以上Action方法的View。View名称应为 index.cshtml，且存放在"~/Views/BulkUpload"文件夹下。
4. 设计上传View
在View中输入以下内容：
@using WebApplication1.ViewModels
@model FileUploadViewModel
@{
    Layout = "~/Views/Shared/MyLayout.cshtml";
}

@section TitleSection{
    Bulk Upload
}
@section ContentBody{
    <div> 
    <a href="/Employee/Index">Back</a>
        <form action="/BulkUpload/Upload" method="post" enctype="multipart/form-data">
            Select File : <input type="file" name="fileUpload" value="" />
            <input type="submit" name="name" value="Upload" />
        </form>
    </div>
}
如上，FileUploadViewModel中属性名称与 input[type="file"]的名称类似，都称为"fileUpload"。我们在Model Binder中已经讲述了名称属性的重要性，注意：在表单标签中，有一个额外的属性是加密的，会在实验结尾处讲解。
5. 创建业务层上传方法
在EmployeeBusinessLayer中新建方法UploadEmployees，如下：
public void UploadEmployees(List<Employee> employees)
{
    SalesERPDAL salesDal = new SalesERPDAL();
    salesDal.Employees.AddRange(employees);
    salesDal.SaveChanges();
}
6. 创建Upload Action方法
创建Action方法，并命名为"BulkUploadController"，如下：
[AdminFilter]
public ActionResult Upload(FileUploadViewModel model)
{
    List<Employee> employees = GetEmployees(model);
    EmployeeBusinessLayer bal = new EmployeeBusinessLayer();
    bal.UploadEmployees(employees);
    return RedirectToAction("Index","Employee");
}

private List<Employee> GetEmployees(FileUploadViewModel model)
{
    List<Employee> employees = new List<Employee>();
    StreamReader csvreader = new StreamReader(model.fileUpload.InputStream);
    csvreader.ReadLine(); // Assuming first line is header
    while (!csvreader.EndOfStream)
    {
        var line = csvreader.ReadLine();
        var values = line.Split(',');//Values are comma separated
        Employee e = new Employee();
        e.FirstName = values[0];
        e.LastName = values[1];
        e.Salary = int.Parse(values[2]);
        employees.Add(e);
    }
    return employees;
}
AdminFilter会绑定到Upload action方法中，限制非管理员用户的访问。
7. 创建BulkUpload链接
打开 "Views/Employee"文件夹下的 AddNewLink.cshtml 文件，输入BulkUpload链接，如下：
<a href="/Employee/AddNew">Add New</a>
&nbsp;
&nbsp;
<a href="/BulkUpload/Index">BulkUpload</a>
8.运行

Note:
In above example we have not applied any client side or server side validation in the View. It may leads to following error.
"Validation failed for one or more entities. See 'EntityValidationErrors' property for more details."
To find the exact cause for the error, simply add a watch with following watch expression when exception occurs.
((System.Data.Entity.Validation.DbEntityValidationException)$exception).EntityValidationErrors
The watch expression ‘$exception’ displays any exception thrown in the current context, even if it has not been caught and assigned to a variable.
Talk on Lab 27
1. 为什么在实验27中不需要验证？
在该选项中添加客户端和服务器端验证需要读者自行添加的，以下是添加验证的提示：
•	For Server side validation use Data Annotations.
•	For client side either you can leverage data annotation and implement jQuery unobtrusive validation. Obviously this time you have to set custom data attributes manually because we don’t have readymade Htmlhelper method for file input.
Note: If you didn’t understood this point, I recommend you to go through “implanting client side validation in Login view” again.
•	For client side validation you can write custom JavaScript and invoke it on button click. This won’t be much difficult because file input is an input control at the end of the day and its value can be retrieved inside JavaScript and can be validated.
2. 什么是 HttpPostedFileBase？
HttpPostedFileBase will provide the access to the file uploaded by client. Model binder will update the value of all properties FileUploadViewModel class during post request. Right now we have only one property inside FileUploadViewModel and Model Binder will set it to file uploaded by client.
3. 是否会提供多文件的输入控件？
Yes, we can achieve it in two ways.
1.	Create multiple file input controls. Each control must have unique name. Now in FileUploadViewModel class create a property of type HttpPostedFileBase one for each control. Each property name should match with the name of one control. Remaining magic will be done by ModelBinder.
2.	Create multiple file input controls. Each control must have same name. Now instead of creating multiple properties of type HttpPostedFileBase, create one of type List.
Note: Above case is true for all controls. When you have multiple controls with same name ModelBinder update the property with the value of first control if property is simple parameter. ModelBinder will put values of each control in a list if property is a list property.
4. enctype="multipart/form-data"是用来做什么的？
Well this is not a very important thing to know but definitely good to know.This attribute specifies the encoding type to be used while posting data.The default value for this attribute is "application/x-www-form-urlencoded"
Example – Our login form will send following post request to the server
POST /Authentication/DoLogin HTTP/1.1
Host: localhost:8870
Connection: keep-alive
Content-Length: 44
Content-Type: application/x-www-form-urlencoded
...
...
UserName=Admin&Passsword=Admin&BtnSubmi=Login
All input values are sent as one part in the form of key/value pair connected via “&”.
When enctype="multipart/form-data" attribute is added to form tag, following post request will be sent to the server.
POST /Authentication/DoLogin HTTP/1.1
Host: localhost:8870
Connection: keep-alive
Content-Length: 452
Content-Type: multipart/form-data; boundary=----WebKitFormBoundarywHxplIF8cR8KNjeJ
...
...
------WebKitFormBoundary7hciuLuSNglCR8WC
Content-Disposition: form-data; name="UserName"

Admin
------WebKitFormBoundary7hciuLuSNglCR8WC
Content-Disposition: form-data; name="Password"

Admin
------WebKitFormBoundary7hciuLuSNglCR8WC
Content-Disposition: form-data; name="BtnSubmi"

Login
------WebKitFormBoundary7hciuLuSNglCR8WC--
As you can see, form is posted in multiple part. Each part is separated by a boundary defined by Content-Type and each part contain one value.
encType must be set to “multipart/form-data” if form tag contains file input control.
Note: boundary will be generated randomly every time request is made. You may see some different boundary.
1.	为什么有时候需要设置 encType 为 "multipart/form-data"，而有时候不需要设置？
When encType is set to “multipart/form-data”, it will do both the things–Post the data and upload the file. Then why don’t we always set it as “multipart/form-data”.
Answer is, it will also increase the overall size of the request. More size of the request means less performance. Hence as a best practice we should set it to default that is "application/x-www-form-urlencoded".
2.	为什么在实验27中创建ViewModel？
We had only one control in our View. We can achieve same result by directly adding a parameter of type HttpPostedFileBase with name fileUpload in Upload action method Instead of creating a separate ViewModel. Look at the following code.
public ActionResult Upload(HttpPostedFileBase fileUpload)
{
}
Then why we have created a separate class.
Creating ViewModel is a best practice. Controller should always send data to the view in the form of ViewModel and data sent from view should come to controller as ViewModel.
3.	以上解决方法的问题
Did you ever wondered how you get response when you send a request?
Now don't say, action method receive request and blah blah blah!!! 
Although it's the correct answer I was expecting a little different answer.My question is what happen in the beginning.
A simple programming rule – everything in a program is executed by a thread even a request.
In case of Asp.net on the webserver .net framework maintains a pool of threads.Each time a request is sent to the webserver a free thread from the pool is allocated to serve the request. This thread will be called as worker thread.
![x](./Resource/67.png)

Worker thread will be blocked while the request is being processed and cannot serve another request.
Now let's say an application receives too many requests and each request will take long time to get completely processed. In this case we may end up at a point where new request will get into a state where there will be no worker thread available to serve that request. This is called as Thread Starvation(饥饿).
In our case sample file had 2 employee records but in real time it may contain thousands or may be lacks of records. It means request will take huge amount of time to complete the processing. It may leads to Thread Starvation.
线程饥饿的解决方法：
Now the request which we had discussed so far is of type synchronous request.
Instead of synchronous if client makes an asynchronous request, problem of thread starvation get solved.
•	In case of asynchronous request as usual worker thread from thread pool get allocated to serve the request.
•	Worker thread initiates the asynchronous operation and returned to thread pool to serve another request. Asynchronous operation now will be continued by CLR thread.
•	Now the problem is, CLR thread can’t return response so once it completes the asynchronous operation it notifies ASP.NET.
•	Webserver again gets a worker thread from thread pool and processes the remaining request and renders the response.
In this entire scenario two times worker thread is retrieved from thread pool. Now both of them may be same thread or they may not be.
Now in our example file reading is an I/O bound operation which is not required to be processed by worker thread. So it’s a best place to convert synchronous requests to asynchronous requests.
1.	异步请求的响应时间能提升吗？
不可以，响应时间是相同的，线程会被释放来服务其他请求。
实验28: 解决线程饥饿问题
在Asp.net MVC中会通过将同步Action方法转换为异步Action方法，将同步请求转换为异步请求。
１. 创建异步控制器
在控制器中将基类 UploadController修改为 AsynController。
public class BulkUploadController : AsyncController
{
２. 转换同步Action方法
该功能通过两个关键字就可实现："async"和 "await"
[AdminFilter]
public async Task<ActionResult> Upload(FileUploadViewModel model)
{
    int t1 = Thread.CurrentThread.ManagedThreadId;
    List<Employee> employees = await Task.Factory.StartNew<List<Employee>>(() => GetEmployees(model));
    int t2 = Thread.CurrentThread.ManagedThreadId;
    EmployeeBusinessLayer bal = new EmployeeBusinessLayer();
    bal.UploadEmployees(employees);
    return RedirectToAction("Index", "Employee");
}
在action方法的开始或结束处，使用变量存储线程ID。
理一下思路：
•	当上传按钮被点击时，新请求会被发送到服务器。
•	Webserver从线程池中产生Worker线程 ，并分配给服务器请求。
•	worker线程会使Action 方法执行
•	Worker方法在 Task.Factory.StartNew方法的辅助下，开启异步操作
•	使用async关键字将Action 方法标记为异步方法，由此会保证异步操作一旦开启，Worker 线程就会释放。
•	使用await关键字也可标记异步操作，能够保证异步操作完成时才能够继续执行下面的代码。
•	一旦异步操作在Action 方法中完成执行，必须执行worker线程。因此webserver将会新建一个空闲worker 线程，并用来服务剩下的请求，提供响应。
3. 测试运行	
运行应用程序，并跳转到BulkUpload页面。会在代码中显示断点，输入样本文件，点击上传。
如图所示，在项目启动或关闭时线程ID是不同的。
实验29: 异常处理——显示自定义错误页面
如果一个项目不考虑异常处理，那么可以说这个项目是不完整的。到目前为止，我们已经了解了MVC中的两个过滤器：Action filter和 Authorization filter。现在我们来学习第三个过滤器，异常过滤器（Exception Filters）。
什么是异常过滤器（Exception Filters）？
异常过滤器与其他过滤器的用法相同，可当作属性使用。使用异常过滤器的基本步骤:
1. 使它们可用
2. 将过滤器作为属性，应用到action 方法或控制器中。我们也可以在全局层次使用异常过滤器。
异常过滤器的作用是什么？，是否有自动执行的异常过滤器？
一旦action 方法中出现异常，异常过滤器就会控制程序的运行过程，开始内部自动写入运行的代码。MVC为我们提供了编写好的异常过滤器：HandeError。
当action方法中发生异常时，过滤器就会在 "~/Views/[current controller]" 或 "~/Views/Shared"目录下查找到名称为"Error"的View，然后创建该View的ViewResult，并作为响应返回。
接下来我们会讲解一个Demo，帮助我们更好的理解异常过滤器的使用。
已经实现的上传文件功能，很有可能会发生输入文件格式错误。因此我们需要处理异常。


1. 创建含错误信息的样本文件，包含一些非法值，如图，Salary就是非法值。

2. 运行，查找异常，点击上传按钮，选择已建立的样本数据，选择上传。

3. 激活异常过滤器
当自定义异常被捕获时，异常过滤器变为可用。为了能够获得自定义异常，打开Web.config文件，在System.Web.Section下方添加自定义错误信息。
<system.web>
   <customErrors mode="On"></customErrors>
4. 创建Error View
在"~/Views/Shared"文件夹下，会发现存在"Error.cshtml"文件，该文件是由MVC 模板提供的，如果没有自动创建，该文件也可以手动完成。
@{
    Layout = null;
}

<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width" />
    <title>Error</title>
</head>
<body>
    <hgroup>
        <h1>Error.</h1>
        <h2>An error occurred while processing your request.</h2>
    </hgroup>
</body>
</html>
5. 绑定异常过滤器
将过滤器绑定到action方法或controller上，不需要手动执行，打开 App_Start folder文件夹中的 FilterConfig.cs文件。在 RegisterGlobalFilters 方法中会看到 HandleError 过滤器已经以全局过滤器绑定成功。
public static void RegisterGlobalFilters(GlobalFilterCollection filters)
{
    filters.Add(new HandleErrorAttribute());//ExceptionFilter
    filters.Add(new AuthorizeAttribute());
}
如果需要删除全局过滤器，那么会将过滤器绑定到action 或controller层，但是不建议这么做，最好是在全局中应用。
[AdminFilter]
[HandleError]
public async Task<ActionResult> Upload(FileUploadViewModel model)
{
}
6. 运行

7. 在View中显示错误信息
将Error View转换为HandleErrorInfo类的强类型View，并在View中显示错误信息。
@model HandleErrorInfo
@{
    Layout = null;
}

<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width" />
    <title>Error</title>
</head>
<body>
    <hgroup>
        <h1>Error.</h1>
        <h2>An error occurred while processing your request.</h2>
    </hgroup>
        Error Message :@Model.Exception.Message<br />
        Controller: @Model.ControllerName<br />
        Action: @Model.ActionName
</body>
</html>
 8. 运行测试

Handle error属性能够确保无论是否出现异常，自定义View都能够显示，但是它的功能在controller和action 方法中是受限的。不会处理"Resource not found"这类型的错误。
运行应用程序，输一些奇怪的URL

9. 创建 ErrorController控制器，并创建Index方法，代码如下：
public class ErrorController : Controller
{
    // GET: Error
    public ActionResult Index()
    {
        Exception e=new Exception("Invalid Controller or/and Action Name");
        HandleErrorInfo eInfo = new HandleErrorInfo(e, "Unknown", "Unknown");
        return View("Error", eInfo);
    }
}
10. 在非法URL中显示自定义Error视图
可在 web.config中定义"Resource not found error"的设置，如下：
   <system.web>
    <customErrors mode="On">
      <error statusCode="404" redirect="~/Error/Index"/>
    </customErrors>
11. 使 ErrorController 全局可访问。
将AllowAnonymous属性应用到 ErrorController中，因为错误控制器和index方法不应该只绑定到认证用户，也很有可能用户在登录之前已经输入错误的URL。
[AllowAnonymous]
public class ErrorController : Controller
{
12. 运行

Talk on Lab 29
1. View的名称是否可以修改？
可以修改，不一定叫Error，也可以指定其他名字。如果Error View的名称改变了，当绑定HandleError过滤器时，必须指定View的名称。
[HandleError(View="MyError")]
Or
filters.Add(new HandleErrorAttribute()
    {
        View="MyError"
    });
2. 是否可以为不同的异常获取不同的Error View？
可以，在这种情况下，必须多次应用Handle error filter。
[HandleError(View="DivideError",ExceptionType=typeof(DivideByZeroException))]
[HandleError(View = "NotFiniteError", ExceptionType = typeof(NotFiniteNumberException))]
[HandleError]

OR

filters.Add(new HandleErrorAttribute()
    {
        ExceptionType = typeof(DivideByZeroException),
        View = "DivideError"
    });
filters.Add(new HandleErrorAttribute()
{
    ExceptionType = typeof(NotFiniteNumberException),
    View = "NotFiniteError"
});
filters.Add(new HandleErrorAttribute());
前两个Handle error filter都指定了异常，而最后一个更为常见更通用，会显示所有其他异常的Error View。
上述实验中并没有处理登录异常，我们会在实验30中讲解登录异常。
实验30: 异常处理——登录异常
1. 创建 Logger 类
在根目录下，新建文件夹，命名为Logger。在Logger 文件夹下新建类 FileLogger
namespace WebApplication1.Logger
{
    public class FileLogger
    {
        public void LogException(Exception e)
        {
            File.WriteAllLines("C://Error//" + DateTime.Now.ToString("dd-MM-yyyy mm hh ss")+".txt", 
                new string[] 
                {
                    "Message:"+e.Message,
                    "Stacktrace:"+e.StackTrace
                });
        }
    }
}
2.  创建 EmployeeExceptionFilter类
在 Filters文件夹下，新建 EmployeeExceptionFilter类
namespace WebApplication1.Filters
{
    public class EmployeeExceptionFilter
    {
    }
}
3. 扩展 Handle Error实现登录异常处理
让 EmployeeExceptionFilter 继承 HandleErrorAttribute类，重写 OnException方法：
public class EmployeeExceptionFilter: HandleErrorAttribute
{
    public override void OnException(ExceptionContext filterContext)
    {
        base.OnException(filterContext);
    }
}
Note: Make sure to put using System.Web.MVC in the top.HandleErrorAttribute class exists inside this namespace.
4. 定义 OnException 方法
在 OnException方法中包含异常登录代码。
public override void OnException(ExceptionContext filterContext)
{
    FileLogger logger = new FileLogger();
    logger.LogException(filterContext.Exception);
    base.OnException(filterContext);
}
5. 修改默认的异常过滤器
打开 FilterConfig.cs文件，删除 HandErrorAtrribute，添加上步中创建的。
public static void RegisterGlobalFilters(GlobalFilterCollection filters)
{
    //filters.Add(new HandleErrorAttribute());//ExceptionFilter
    filters.Add(new EmployeeExceptionFilter());
    filters.Add(new AuthorizeAttribute());
}
6. 运行
会在C盘中创建"Error"文件夹，存放一些error文件。
Talk on Lab 30
1.当异常出现后，Error View 是如何返回响应的？
查看OnException方法的最后一行代码：
base.OnException(filterContext);
即基类的OnException方法执行并返回Error View的ViewResult。
2.在OnException中，是否可以返回其他结果？
可以，代码如下：
public override void OnException(ExceptionContext filterContext)
{
    FileLogger logger = new FileLogger();
    logger.LogException(filterContext.Exception);
    //base.OnException(filterContext);
    filterContext.ExceptionHandled = true;
    filterContext.Result = new ContentResult()
    {
        Content="Sorry for the Error"
    };
}
当返回自定义响应时，需要做的第一件事就是通知MVC引擎，手动处理异常，因此不需要执行默认的操作，不要显示默认的错误页面。使用以下语句可完成：
  filterContext.ExceptionHandled = true;
Routing
到目前为止，我们已经解决了MVC的很多问题，但忽略了最基本最重要的一个问题：当用户发送请求时，会发生什么？
最好的答案是“执行Action方法”，但仍存在疑问：对于一个特定的URL请求，如何确定控制器和action方法。在开始实验之前，我们首先来解答上述问题，你可能会困惑为什么这个问题会放在最后来讲，因为了解内部结构之前，需要更好的了解MVC。
理解RouteTable
在Asp.net mvc中有RouteTable这个概念，是用来存储URL路径的。简而言之，是保存已定义的应用程序的可能的URL pattern的集合。
默认情况下，路径是项目模板组成的一部分。可在 Global.asax 文件中检查到，在 Application_Start中会发现以下语句：
RouteConfig.RegisterRoutes(RouteTable.Routes);
App_Start文件夹下的 RouteConfig.cs文件，包含以下代码块：
using System.Web.Mvc;
using System.Web.Routing;

namespace WebApplication1
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
RegisterRoutes方法已经包含了由routes.MapRoute方法定义的默认的路径。已定义的路径会在请求周期中确定执行的是正确的控制器和action方法。如果使用route.MapRoute创建了多个路径，那么内部路径的定义就意味着创建Route对象。
MapRoute 方法也可与 RouteHandler 关联。
URL Routing 的定义方式
让我们从下面这样一个简单的URL开始：
http://mysite.com/Admin/Index
在域名的后面，默认使用“/”来对URL进行分段。路由系统通过类似于 {controller}/{action} 格式的字符串可以知道这个URL的 Admin 和 Index 两个片段分别对应Controller和Action的名称。
默认情况下，路由格式中用“/”分隔的段数是和URL域名的后面的段数是一致的，比如，对于{controller}/{action} 格式只会匹配两个片段。如下表所示：

![x](./Resource/68.png)


URL路由是在MVC工程中的App_Start文件夹下的RouteConfig.cs文件中的RegisterRoutes方法中定义的，下面是创建一个空MVC项目时系统生成的一个简单URL路由定义：
public static void RegisterRoutes(RouteCollection routes) {
    routes.IgnoreRoute("{resource}.axd/{*pathInfo}"); 

    routes.MapRoute( 
        name: "Default", 
        url: "{controller}/{action}/{id}", 
        defaults: new { controller = "Home", action = "Index",  id = UrlParameter.Optional } 
    );
}
静态方法RegisterRoutes是在Global.asax.cs文件中的Application_Start方法中被调用的，除了URL路由的定义外，还包含其他的一些MVC核心特性的定义：
protected void Application_Start() { 
    AreaRegistration.RegisterAllAreas();

    WebApiConfig.Register(GlobalConfiguration.Configuration); 
    FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters); 
    RouteConfig.RegisterRoutes(RouteTable.Routes); 
    BundleConfig.RegisterBundles(BundleTable.Bundles); 
}
RouteConfig.RegisterRoutes方法中传递的是 RouteTable 类的静态 Routes 属性，返回一个RouteCollection的实例。其实，“原始”的定义路由的方法可以这样写：
public static void RegisterRoutes(RouteCollection routes) { 

    Route myRoute = new Route("{controller}/{action}", new MvcRouteHandler()); 
    routes.Add("MyRoute", myRoute); 
}
创建Route对象时用了一个URL格式字符串和一个MvcRouteHandler对象作为构造函数的参数。不同的ASP.NET技术有不同的RouteHandler，MVC用的是MvcRouteHandler。
这种写法有点繁琐，一种更简单的定义方法是：
public static void RegisterRoutes(RouteCollection routes) { 

    routes.MapRoute("MyRoute", "{controller}/{action}"); 
}
这种方法简洁易读，一般我们都会用这种方法定义路由。 
示例准备
作为演示，我们先来准备一个Demo。创建一个标准的MVC应用程序，然后添加三个简单的Controller，分别是HomeController、CustomerController和AdminController，代码如下：
public class HomeController : Controller {
            
    public ActionResult Index() {
        ViewBag.Controller = "Home";
        ViewBag.Action = "Index";
        return View("ActionName");
    }
}

public class CustomerController : Controller {
        
    public ActionResult Index() {
        ViewBag.Controller = "Customer";
        ViewBag.Action = "Index";
        return View("ActionName");
    }

    public ActionResult List() {
        ViewBag.Controller = "Customer";
        ViewBag.Action = "List";
        return View("ActionName");
    }
}

public class AdminController : Controller {
        
    public ActionResult Index() {
        ViewBag.Controller = "Admin";
        ViewBag.Action = "Index";
        return View("ActionName");
    }
}
在 /Views/Shared 文件夹下再给这三个Controller添加一个共享的名为 ActionName.cshtml 的 View，代码如下：
@{ 
    Layout = null; 
}

<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width" />
    <title>ActionName</title>
</head>
<body>
    <div>The controller is: @ViewBag.Controller</div>
    <div>The action is: @ViewBag.Action</div>
</body>
</html>
我们把RouteConfig.cs文件中项目自动生成的URL Rounting的定义删了，然后根据前面讲的路由定义知识，我们自己写一个最简单的：
public static void RegisterRoutes(RouteCollection routes) { 

    routes.MapRoute("MyRoute", "{controller}/{action}"); 
}
程序运行，URL定位到 Admin/Index 看看运行结果：
这个Demo输出的是被调用的Controller和Action名称。
给片段变量定义默认值
在上面我们必须把URL定位到特定Controller和Action，否则程序会报错，因为MVC不知道去执行哪个Action。 我们可以通过指定默认值来告诉MVC当URL没有给出对应的片段时使用某个默认的值。如下给controller和action指定默认值：
routes.MapRoute("MyRoute", "{controller}/{action}",  new { controller = "Home", action = "Index" });
这时候如果在URL中不提供action片段的值或不提供controller和action两个片段的值，MVC将使用路由定义中提供的默认值：

它的各种匹配情况如下表所示：

![x](./Resource/69.png)


注意，对于上面的URL路由的定义，我们可以只给action一个片段指定默认值，但是不能只给controller一个片段指定默认值，即如果我们给Controller指定了默认值，就一定也要给action指定默认值，否则URL只有一个片段时，这个片段匹配给了controller，action将找不到匹配。
定义静态片段
并不是所有的片段都是用来作为匹配变量的，比如，我们想要URL加上一个名为Public的固定前缀，那么我们可以这样定义：
routes.MapRoute("", "Public/{controller}/{action}",  new { controller = "Home", action = "Index" });
这样，请求的URL也需要一个Public前缀与之匹配。我们也可以把静态的字符串放在大括号以外的任何位置，如：
routes.MapRoute("", "X{controller}/{action}",  new { controller = "Home", action = "Index" });
在一些情况下这种定义非常有用。比如当你的网站某个链接已经被用户普遍记住了，但这一块功能已经有了一个新的版本，但调用的是不同名称的controller，那么你把原来的controller名称作为现在controller的别名。这样，用户依然使用他们记住的URL，而导向的却是新的controller。如下使用Shop作为Home的一个别名：
routes.MapRoute("ShopSchema", "Shop/{action}",  new { controller = "Home" }); 
这样，用户使用原来的URL可以访问新的controller：

自定义片段变量
自定义片段变量的定义和取值
controller和action片段变量对MVC来说有着特殊的意义，在定义一个路由时，我们必须有这样一个概念：controller和action的变量值要么能从URL中匹配得到，要么由默认值提供，总之一个URL请求经过路由系统交给MVC处理时必须保证controller和action两个变量的值都有。当然，除了这两个重要的片段变量，我们也可从通过自定义片段变量来从URL中得到我们想要的其它信息。如下自定义了一个名为Id的片段变量，而且给它定义了默认值：
routes.MapRoute("MyRoute", "{controller}/{action}/{id}",
    new {
        controller = "Home",
        action = "Index",
        id = "DefaultId"
});
我们在HomeController中增加一个名为CustomVariable的ACtion来演示一下如何取自定义的片段变量：
public ActionResult CustomVariable() {
    ViewBag.Controller = "Home";
    ViewBag.Action = "CustomVariable";
    ViewBag.CustomVariable = RouteData.Values["id"];
    return View("ActionName");
}
可以通过 RouteData.Values[segment] 来取得任意一个片段的变量值。
再稍稍改一下ActionName.cshtml 来看一下我们取到的自定义片段变量的值：
...
<div>The controller is: @ViewBag.Controller</div> 
<div>The action is: @ViewBag.Action</div> 
<div>The custom variable is: @ViewBag.CustomVariable</div>
...
将URL定位到 /Home/CustomVariable/Hello 将得到如下结果：

自定义的片段变量用处很大，也很灵活，下面介绍一些常见的用法。
将自定义片段变量作为Action方法的参数
我们可以将自定义的片段变量当作参数传递给Action方法，如下所示：
public ActionResult CustomVariable(string id) { 
    ViewBag.Controller = "Home"; 
    ViewBag.Action = "CustomVariable"; 
    ViewBag.CustomVariable = id; 
    return View("ActionName"); 
}
效果和上面是一样的，只不过这样省去了用 RouteData.Values[segment] 的方式取自定义片段变量的麻烦。这个操作背后是由模型绑定来做的，模型绑定的知识我将在后续博文中进行讲解。
指定自定义片段变量为可选
指定自定片段变量为可选，即在URL中可以不用指定片段的值。如下面的定义将Id定义为可选：
routes.MapRoute("MyRoute", "{controller}/{action}/{id}", new {
        controller = "Home",
        action = "Index",
        id = UrlParameter.Optional
});
定义为可选以后，需要对URL中没有Id这个片段值的情况进行处理，如下：
public ActionResult CustomVariable(string id) { 
    ViewBag.Controller = "Home"; 
    ViewBag.Action = "CustomVariable"; 
    ViewBag.CustomVariable = id == null ? "<no value>" : id; 
    return View("ActionName"); 
} 
当Id是整型的时候，参数的类型需要改成可空的整型(即int? id)。
为了省去判断参数是否为空，我们也可以把Action方法的id参数也定义为可选，当没有提供Id参数时，Id使用默认值，如下所示：
public ActionResult CustomVariable(string id = "DefaultId") { 
    ViewBag.Controller = "Home"; 
    ViewBag.Action = "CustomVariable"; 
    ViewBag.CustomVariable = id; 
    return View("ActionName"); 
}
这样其实就是和使用下面这样的方式定义路由是一样的：
routes.MapRoute("MyRoute", "{controller}/{action}/{id}", new { controller = "Home", action = "Index", id = "DefaultId" });
定义可变数量的自定义片段变量
我们可以通过 catchall 片段变量加 * 号前缀来定义匹配任意数量片段的路由。如下所示：
routes.MapRoute("MyRoute", "{controller}/{action}/{id}/{*catchall}", 
    new { controller = "Home", action = "Index",  id = UrlParameter.Optional });
这个路由定义的匹配情况如下所示：

![x](./Resource/70.png)

使用*catchall，将匹配的任意数量的片段，但我们需要自己通过“/”分隔catchall变量的值来取得独立的片段值。
路由约束
正则表达式约束
通过正则表达式，我们可以制定限制URL的路由规则，下面的路由定义限制了controller片段的变量值必须以 H 打头：
routes.MapRoute("MyRoute", "{controller}/{action}/{id}", 
    new { controller = "Home", action = "Index", id = UrlParameter.Optional },
    new { controller = "^H.*" }
);
定义路由约束是在MapRoute方法的第四个参数。和定义默认值一样，也是用匿名类型。
我们可以用正则表达式约束来定义只有指定的几个特定的片段值才能进行匹配，如下所示：
routes.MapRoute("MyRoute", "{controller}/{action}/{id}", 
    new { controller = "Home", action = "Index", id = UrlParameter.Optional },
    new { controller = "^H.*", action = "^Index$|^About$" }
);
这个定义，限制了action片段值只能是Index或About，不区分大小写。
Http请求方式约束
我们还可以限制路由只有当以某个特定的Http请求方式才能匹配。如下限制了只能是Get请求才能进行匹配：
routes.MapRoute("MyRoute", "{controller}/{action}/{id}", 
    new { controller = "Home", action = "Index", id = UrlParameter.Optional },
    new { controller = "^H.*", httpMethod = new HttpMethodConstraint("GET") }
);
通过创建一个 HttpMethodConstraint 类的实例来定义一个Http请求方式约束，构造函数传递是允许匹配的Http方法名。这里的httpMethod属性名不是规定的，只是为了区分。
这种约束也可以通过HttpGet或HttpPost过滤器来实现，后续博文再讲到滤器的内容。
自定义路由约束
如果标准的路由约束满足不了你的需求，那么可以通过实现 IRouteConstraint 接口来定义自己的路由约束规则。
我们来做一个限制浏览器版本访问的路由约束。在MVC工程中添加一个文件夹，取名Infrastructure，然后添加一个 UserAgentConstraint 类文件，代码如下：
public class UserAgentConstraint : IRouteConstraint {
        
    private string requiredUserAgent;

    public UserAgentConstraint(string agentParam) {
        requiredUserAgent = agentParam;
    }

    public bool Match(HttpContextBase httpContext, Route route, string parameterName,
        RouteValueDictionary values, RouteDirection routeDirection) {
            
        return httpContext.Request.UserAgent != null 
            && httpContext.Request.UserAgent.Contains(requiredUserAgent);
    }
}
这里实现IRouteConstraint的Match方法，返回的bool值告诉路由系统请求是否满足自定义的约束规则。我们的UserAgentConstraint类的构造函数接收一个浏览器名称的关键字作为参数，如果用户的浏览器包含注册的关键字才可以访问。接一来，我们需要注册自定的路由约束：
public static void RegisterRoutes(RouteCollection routes) {

    routes.MapRoute("ChromeRoute", "{*catchall}",
        new { controller = "Home", action = "Index" },
        new { customConstraint = new UserAgentConstraint("Chrome") }
    );
}
下面分别是IE10和Chrome浏览器请求的结果：
![x](./Resource/71.png)


定义请求磁盘文件路由
并不是所有的URL都是请求controller和action的。有时我们还需要请求一些资源文件，如图片、html文件和JS库等。
我们先来看看能不能直接请求一个静态Html文件。在项目的Content文件夹下，添加一个html文件，内容随意。然后把URL定位到该文件，如下图：

我们看到，是可以直接访问一静态资源文件的。
默认情况下，路由系统先检查URL是不是请求静态文件的，如果是，服务器直接返回文件内容并结束对URL的路由解析。我们可以通过设置 RouteCollection的 RouteExistingFiles 属性值为true 让路由系统对静态文件也进行路由匹配，如下所示：
public static void RegisterRoutes(RouteCollection routes) {
    
    routes.RouteExistingFiles = true;

    routes.MapRoute("MyRoute", "{controller}/{action}/{id}/{*catchall}",
        new { controller = "Home", action = "Index", id = UrlParameter.Optional
    });
}
设置了routes.RouteExistingFiles = true后，还需要对IIS进行设置，这里我们以IIS Express为例，右键IIS Express小图标，选择“显示所有应用程序”，弹出如下窗口：
![x](./Resource/72.png)
点击并打开配置文件，Control+F找到UrlRoutingModule-4.0，将这个节点的preCondition属性改为空，如下所示：
<add name="UrlRoutingModule-4.0" type="System.Web.Routing.UrlRoutingModule" preCondition=""/>
然后我们运行程序，再把URL定位到之前的静态文件：
这样，路由系统通过定义的路由去匹配RUL，如果路由中没有定义该静态文件的匹配，则会报上面的错误。
一旦定义了routes.RouteExistingFiles = true，我们就要为静态文件定义路由，如下所示：
public static void RegisterRoutes(RouteCollection routes) {
    
    routes.RouteExistingFiles = true;

    routes.MapRoute("DiskFile", "Content/StaticContent.html",
        new { controller = "Customer", action = "List", });

    routes.MapRoute("MyRoute", "{controller}/{action}/{id}/{*catchall}",
        new { controller = "Home", action = "Index", id = UrlParameter.Optional });
}
这个路由匹配Content/StaticContent.html的URL请求为controller = Customer, action = List。我们来看看运行结果：
![x](./Resource/73.png)


这样做的目的是为了可以在Controller的Action中控制对静态资源的请求，并且可以阻止对一些特殊资源文件的访问。
设置了RouteExistingFiles属性为true后，我们要为允许用户请求的资源文件进行路由定义，如果每种资源文件都去定义相应的路由，就会显得很繁琐。
我们可以通过RouteCollection类的IgnoreRoute方法绕过路由定义，使得某些特定的静态文件可以由服务器直接返回给浏览器，如下所示：
public static void RegisterRoutes(RouteCollection routes) {
    
    routes.RouteExistingFiles = true;

    routes.IgnoreRoute("Content/{filename}.html");

    routes.MapRoute("DiskFile", "Content/StaticContent.html",
        new { controller = "Customer", action = "List", });

    routes.MapRoute("MyRoute", "{controller}/{action}/{id}/{*catchall}",
        new { controller = "Home", action = "Index", id = UrlParameter.Optional });
}
这样，只要是请求Content目录下的任何html文件都能被直接返回。这里的IgnoreRoute方法将创建一个RouteCollection的实例，这个实例的Route Handler 为 StopRoutingHandler，而不是 MvcRouteHandler。运行程序定位到Content/StaticContent.html，我们又看到了之前的静态面面了。
生成URL(链接)
前面讲的都是解析URL的部分，现在我们来看看如何通过路由系统在View中生成URL。
生成指向当前controller的action链接
在View中生成URL的最简单方法就是调用Html.ActionLink方法，如下面在 Views/Shared/ActionName.cshtml 中的代码所示：
...
<div>The controller is: @ViewBag.Controller</div>
<div>The action is: @ViewBag.Action</div>
<div>
    @Html.ActionLink("This is an outgoing URL", "CustomVariable")
</div>
...
这里的Html.ActionLink方法将会生成指向View对应的Controller和第二个参数指定的Action，我们可以看看运行后页面是如何显示的：

经过查看Html源码，我们发现它生成了下面这样的一个html链接：
<a href="/Home/CustomVariable">This is an outgoing URL</a> 
这样看起来，通过Html.ActionLink生成URL似乎并没有直接在View中自己写一个<a>标签更直接明了。 但它的好处是，它会自动根据路由配置来生成URL，比如我们要生成一个指向HomeContrller中的CustomVariable Action的连接，通过Html.ActionLink方法，只需要给出对应的Controller和Action名称就行，我们不需要关心实际的URL是如何组织的。举个例子，我们定义了下面的路由：
public static void RegisterRoutes(RouteCollection routes) {
            
    routes.MapRoute("NewRoute", "App/Do{action}", new { controller = "Home" });
            
    routes.MapRoute("MyRoute", "{controller}/{action}/{id}",
        new { controller = "Home", action = "Index", id = UrlParameter.Optional });
}
运行程序，我们发现它会自动生成下面这样的连接：
<a href="/App/DoCustomVariable">This is an outgoing URL</a>
所以我们要生成指向某个Action的链接时，最好使用Html.ActionLink方法，否则你很难保证你手写的连接就能定位到你想要的Action。
生成其他controller的action链接
上面我们给Html.ActionLink方法传递的第二个参数只告诉了路由系统要定位到当前View对应的Controller下的Action。Html.ActionLink方法可以使用第三个参数来指定其他的Controller，如下所示：
<div> 
    @Html.ActionLink("This targets another controller", "Index", "Admin") 
</div> 
它会自动生成如下链接：
<a href="/Admin">This targets another controller</a> 
生成带有URL参数的链接
有时候我们想在连接后面加上参数以传递数据，如 ?id=xxx 。那么我们可以给Html.ActionLink方法指定一个匿名类型的参数，如下所示：
<div>
    @Html.ActionLink("This is an outgoing URL", "CustomVariable", new { id = "Hello" })
</div>
它生成的Html如下：
<a href="/Home/CustomVariable/Hello">This is an outgoing URL</a>
指定链接的Html属性
通过Html.ActionLink方法生成的链接是一个a标签，我们可以在方法的参数中给标签指定Html属性，如下所示：
<div> 
    @Html.ActionLink("This is an outgoing URL",  "Index", "Home", null, 
        new {id = "myAnchorID", @class = "myCSSClass"})
</div>
这里的class加了@符号，是因为class是C#关键字，@符号起到转义的作用。它生成 的Html代码如下：
<a class="myCSSClass" href="/" id="myAnchorID">This is an outgoing URL</a>
生成完整的标准链接
前面的都是生成相对路径的URL链接，我们也可以通过Html.ActionLink方法生成完整的标准链接，方法如下：
<div> 
    @Html.ActionLink("This is an outgoing URL", "Index", "Home", 
        "https", "myserver.mydomain.com", " myFragmentName",
        new { id = "MyId"},
        new { id = "myAnchorID", @class = "myCSSClass"})
</div>
这是Html.ActionLink方法中最多参数的重载方法，它允许我们提供请求的协议(https)和目标服务器地址(myserver.mydomain.com)等。它生成的链接如下：
<a class="myCSSClass" id="myAnchorID"
    href="https://myserver.mydomain.com/Home/Index/MyId#myFragmentName" >
    This is an outgoing URL</a>
生成URL字符串
用Html.ActionLink方法生成一个html链接是非常有用而常见的，如果要生成URL字符串（而不是一个Html链接），我们可以用 Url.Action 方法，使用方法如下：
<div>This is a URL: 
    @Url.Action("Index", "Home", new { id = "MyId" }) 
</div> 
它显示到页面是这样的：



根据指定的路由名称生成URL
我们可以根据某个特定的路由来生成我们想要的URL，为了更好说明这一点，下面给出两个URL的定义：
public static void RegisterRoutes(RouteCollection routes) { 
    routes.MapRoute("MyRoute", "{controller}/{action}"); 
    routes.MapRoute("MyOtherRoute", "App/{action}", new { controller = "Home" }); 
} 
对于这样的两个路由，对于类似下面这样的写法：
@Html.ActionLink("Click me", "Index", "Customer")
始终会生成这样的链接：
<a href="/Customer/Index">Click me</a>
也就是说，永远无法使用第二个路由来生成App前缀的链接。这时候我们需要通过另一个方法Html.RouteLink来生成URL了，方法如下：
@Html.RouteLink("Click me", "MyOtherRoute","Index", "Customer")
它会生成如下链接：
<a Length="8" href="/App/Index?Length=5">Click me</a>
这个链接指向的是HomeController下的Index Action。但需要注意，通过这种方式来生成URL是不推荐的，因为它不能让我们从直观上看到它生成的URL指向的controller和action。所以，非到万不得已的情况才会这样用。
在Action方法中生成URL
通常我们一般在View中才会去生成URL，但也有时候我们需要在Action中生成URL，方法如下：
public ViewResult MyActionMethod() { 
    
    string myActionUrl = Url.Action("Index", new { id = "MyID" }); 
    string myRouteUrl = Url.RouteUrl(new { controller = "Home", action = "Index" }); 
    
    //... do something with URLs... 
    return View(); 
}
其中 myActionUrl 和 myRouteUrl 将会被分别赋值 /Home/Index/MyID 和 / 。
更多时候我们会在Action方法中将客户端浏览器重定向到别的URL，这时候我们使用RedirectToAction方法，如下：
public RedirectToRouteResultMyActionMethod() { 
    return RedirectToAction("Index");
}
RedirectToAction的返回结果是一个RedirectToRouteResult类型，它使MVC触发一个重定向行为，并调用指定的Action方法。RedirectToAction也有一些重载方法，可以传入controller等信息。也可以使用RedirectToRoute方法，该方法传入的是object匿名类型，易读性强，如：
public RedirectToRouteResult MyActionMethod() {
    return RedirectToRoute(new { controller = "Home", action = "Index", id = "MyID" });
}
URL方案最佳实践
下面是一些使用URL的建议：
1.	最好能直观的看出URL的意义，不要用应用程序的具体信息来定义URL。比如使用 /Articles/Report 比使用 /Website_v2/CachedContentServer/FromCache/Report 好。
2.	使用内容标题比使用ID好。比如使用 /Articles/AnnualReport 比使用 /Articles/2392 好。如果一定要使用使用ID（比如有时候可能需要区分相同的标题），那么就两者都用，如 /Articles/2392/AnnualReport ，它看起来很长，但对用户更友好，而且更利于SEO。
3.	对于Web页面不要使用文件扩展名（如 .aspx 或 .mvc）。但对于特殊的文件使用扩展名（如 .jpg、.pdf 和 .zip等）。
4.	尽可能使用层级关系的URL，如 /Products/Menswear/Shirts/Red，这样用户就能猜到父级URL。
5.	不区分大小写，这样方便用户输入。
6.	正确使用Get和Post。Get一般用来从服务器获取只读的信息，当需要操作更改状态时使用Post。
7.	尽可能避免使用标记符号、代码、字符序列等。如果你想要用标记进行分隔，就使用中划线(如 /my-great-article)，下划线是不友好的，另外空格和+号都会被URL编码。
8.	不要轻易改变URL，尤其对于互联网网站。如果一定要改，那也要尽可能长的时间保留原来的URL。
9.	尽量让URL使用统一的风格或习惯。


理解ASP.NET MVC 请求周期
在本节中我们只讲解请求周期中重要的知识点
1. UrlRoutingModule
当最终用户发送请求时，会通过UrlRoutingModule对象传递，UrlRoutingModule是HTTP模块。
2. Routing
UrlRoutingModule 会从route table集合中获取首次匹配的Route 对象，为了能够匹配成功，请求URL会与route中定义的URL pattern匹配。
当匹配的时候必须考虑以下规则：
	数字参数的匹配（请求URL和URL pattern中的数字）
![x](./Resource/74.png)

	URL pattern中的可选参数：

![x](./Resource/75.png)
	参数中定义的静态参数

![x](./Resource/76.png)

3. 创建MVC Route Handler
一旦Route对象被选中，UrlRoutingModule会获得 Route对象的 MvcRouteHandler对象。
4. 创建 RouteData 和 RequestContext
UrlRoutingModule使用Route对象创建RouteData，可用于创建RequestContext。RouteData封装了路径的信息如Controller名称，action名称以及route参数值。
Controller 名称
为了从URL 中获取Controller名称，需要按规则执行如在URL pattern中{Controller}是标识Controller名称的关键字。
Action Method 名称
为了获取action 方法名称，{action}是标识action 方法的关键字。
Route 参数
URL pattern能够获得以下值：
1.{controller}
2.{action}
3. 字符串，如 "MyCompany/{controller}/{action}"，"MyCompany"是字符串。
4. 其他，如"{controller}/{action}/{id}"，"id"是路径的参数。
例如：
Route pattern - > "{controller}/{action}/{id}"
请求 URL ->http://localhost:8870/BulkUpload/Upload/5
测试1
public class BulkUploadController : Controller
{
    public ActionResult Upload (string id)
    {
       //value of id will be 5 -> string 5
       ...
    }
}
测试2
public class BulkUploadController : Controller
{
    public ActionResult Upload (int id)
    {
       //value of id will be 5 -> int 5
       ...
    }
}
测试3
public class BulkUploadController : Controller
{
    public ActionResult Upload (string MyId)
    {
       //value of MyId will be null
       ...
    }
}
5. 创建MVC Handler
MvcRouteHandler 会创建 MVCHandler的实例传递 RequestContext对象
6. 创建Controller实例
MVCHandler会根据 ControllerFactory的帮助创建Controller实例
7. 执行方法
MVCHandler调用Controller的执行方法，执行方法是由Controller的基类定义的。
8. 调用Action 方法
每个控制器都有与之关联的 ControllerActionInvoker对象。在执行方法中ControllerActionInvoker对象调用正确的action 方法。
9. 运行结果
Action方法会接收到用户输入，并准备好响应数据，然后通过返回语句返回执行结果，返回类型可能是ViewResult或其他。
实现对用户友好的URL
1. 重新定义 RegisterRoutes 方法
在RegisterRoutes 方法中包含 additional route
public static void RegisterRoutes(RouteCollection routes)
{
    routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

    routes.MapRoute(
    name: "Upload",
    url: "Employee/BulkUpload",
    defaults: new { controller = "BulkUpload", action = "Index" }
    );

    routes.MapRoute(
        name: "Default",
        url: "{controller}/{action}/{id}",
        defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
    );
}
2. 修改URL 引用
打开"~/Views/Employee"文件下的 AddNewLink.cshtml ，修改BulkUpload 链接，如下：
&nbsp;
<a href="/Employee/BulkUpload">BulkUpload</a>
3. 运行测试

关于实验
1. 之前的URL 现在是否起作用？
是，仍然有用。BulkUploadController中的Index 方法可通过两个URL 访问。
1. "http://localhost:8870/Employee/BulkUpload"
2. "http://localhost:8870/BulkUpload/Index"
2. Route 参数和Query 字符串有什么区别？
•	Query 字符串本身是有大小限制的，而无法定义Route 参数的个数。
•	无法在Query 字符串值中添加限制，但是可以在Route 参数中添加限制。
•	可能会设置Route参数的默认值，而Query String不可能有默认值。
•	Query 字符串可使URL 混乱，而Route参数可保持它有条理。
3. 如何在Route 参数中使用限制？
可使用正则表达式。如：
routes.MapRoute(
    "MyRoute",
    "Employee/{EmpId}",
    new {controller=" Employee ", action="GetEmployeeById"},
    new { EmpId = @"\d+" }
 );
Action 方法：
public ActionResult GetEmployeeById(int EmpId)
{
   ...
}
Now when someone make a request with URL "http://..../Employee/1" or "http://..../Employee/111", action method will get executed but when someone make a request with URL "http://..../Employee/Sukesh" he/she will get "Resource Not Found" Error.
4. 是否需要将action 方法中的参数名称与Route 参数名称保持一致？
Route Pattern 也许会包含一个或多个RouteParameter，为了区分每个参数，必须保证action 方法的参数名称与Route 参数名称相同。
5. 定义路径的顺序重要吗？
有影响，在上面的实验中，我们定义了两个路径，一个是自定义的，一个是默认的。默认的是最先定义的，自定义路径是在之后定义的。
当用户输入"http://.../Employee/BulkUpload"地址后发送请求，UrlRoutingModule会搜索与请求URL 匹配的默认的route pattern ，它会将 Employee作为控制器的名称，"BulkUpload"作为action 方法名称。因此定义的顺序是非常重要的，更常用的路径应放在最后。
6. 是否有什么简便的方法来定义Action 方法的URL pattern？
我们可使用基于 routing 的属性。
1.  基本的routing 属性可用
在 RegisterRoutes 方法中在 IgnoreRoute语句后输入代码如下：
routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

routes.MapMvcAttributeRoutes();

routes.MapRoute(
...
2. 定义action 方法的 route pattern
[Route("Employee/List")]
public ActionResult Index()
{
3. 运行测试

routing 属性可定义route 参数，如下：
[Route("Employee/List/{id}")]
publicActionResult Index (string id) { ... }
IgnoreRoutes 的作用是什么？
当我们不想使用routing作为特别的扩展时，会使用IgnoreRoutes。作为MVC模板的一部分，在RegisterRoute 方法中下列语句是默认的：
routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
这就是说如果用户发送以".axd"为结束的请求，将不会有任何路径加载的操作，请求将直接定位到物理资源。
整理项目组织结构
本实验不添加新功能，主要目的是整理项目结构，使项目条理清晰，便于其他人员理解。
1. 创建解决方案文件夹
右键单击，选择“新解决方案文件夹—>添加—>新解决方案”，命名为"View And Controller"

重复上述步骤 ，创建文件夹"Model"，"View Model"，"Data Access Layer"

2. 创建数据访问层工程
右击 "Data Access Layer" 文件夹，新建类库 "DataAccessLayer"。
3. 创建业务层和业务实体项
在Model文件夹下创建新类库 "BusinessLayer" 和 "BusinessEntities"
4. 创建ViewModel 项
在ViewModel 文件夹下新建类库项 "ViewModel"
5. 添加引用
为以上创建的项目添加引用，如下：
1. DataAccessLayer 添加 BusinessEntities项
2. BusinessLayer 添加DataAccessLayer和 BusinessEntities项
3. MVC WebApplication 选择 BusinessLayer、BusinessEntities、ViewModel
4. BusinessEntities 添加 System.ComponentModel.DataAnnotations
6. 设置
1.将DataAccessLayer文件夹下的 SalesERPDAL.cs文件，复制粘贴到新创建的 DataAccessLayer 类库中。

2. 删除MVC项目（WebApplication1）的DataAccessLayer文件夹 
3. 同上，将Model文件夹中的 Employee.cs, UserDetails.cs 及 UserStatus.cs文件复制到新建的 BusinessEntities文件夹中。
4. 将MVC项目中的Model文件夹的 EmployeeBusinessLayer.cs文件粘贴到新建的 BusinessLayer的文件夹中。
5. 删除MVC中的Model文件夹
6. 将MVC项目的ViewModels文件夹下所有的文件复制到新建的ViewModel 类库项中。
7. 删除ViewModels文件夹
8. 将整个MVC项目剪切到”View And Controller”解决方案文件夹中。
7. Build
选择Build->Build Solution from menu bar，会报错。
8. 改错
1. 给ViewModel项添加System.Web 引用
2. 在DataAccessLayer 和 BusinessLayer中使用Nuget 管理，并安装EF（Entity Framework）。
注意：在Business Layer中引用EF 是非常必要的，因为Business Layer与DataAccessLayer 直接关联的，而完善的体系架构它自身的业务层是不应该与DataAccessLayer直接关联，因此我们必须使用pattern库，协助完成。
3. 删除MVC 项目中的EF
•	右击MVC 项目，选择"Manage Nuget packages"选项
•	在弹出的对话框中选择"Installed Packages"
•	则会显示所有的已安装项，选择EF，点解卸载。
9. 编译会发现还是会报错
10. 修改错误
报错是由于在项目中既没有引用 SalesERPDAL，也没有引用EF，在项目中直接引用也并不是优质的解决方案。
1. 在DataAccessLayer项中 新建带有静态方法 "SetDatabase" 的类 "DatabaseSettings"
using System.Data.Entity;
using WebApplication1.DataAccessLayer;

namespace DataAccessLayer
{
    public class DatabaseSettings
    {
        public static void SetDatabase()
        {
            Database.SetInitializer(new DropCreateDatabaseIfModelChanges<SalesERPDAL>());
        }
    }	
}
2. 在 BusinessLayer项中新建带有 "SetBusiness" 静态方法的 "BusinessSettings" 类。
using DataAccessLayer;

namespace BusinessLayer
{
    public class BusinessSettings
    {
        public static void SetBusiness()
        {
            DatabaseSettings.SetDatabase();
        }
    }
}
3. 删除global.asax 中的报错的Using语句 和 Database.SetInitializer 语句。 调用 BusinessSettings.SetBusiness 函数：
using BusinessLayer;
...
BundleConfig.RegisterBundles(BundleTable.Bundles);
BusinessSettings.SetBusiness();
再次编译程序，会发现成功。
Talk
1. 什么是解决方案文件夹？
解决方案文件夹是逻辑性的文件夹，并不是在物理磁盘上实际创建，这里使用解决方案文件夹就是为了使项目更系统化更有结构。
创建单页应用
安装
这个实验中，不再使用已创建好的控制器和视图，会创建新的控制器及视图，创建新控制器和视图原因如下：
1. 保证现有的选项完整，也会用于旧版本与新版本对比 
    2. 学习理解ASP.NET MVC 新概念：Areas
接下来，我们需要从头开始新建controllers、views、ViewModels。
下面的文件可以被重用：
•	已创建的业务层
•	已创建的数据访问层
•	已创建的业务实体
•	授权和异常过滤器
•	FooterViewModel
•	Footer.cshtml
创建新Area
    右击项目，选择添加->Area，在弹出对话框中输入SPA，点击确认，生成新的文件夹，因为在该文件夹中不需要Model中Area的文件夹，删掉。
   

    接下来我们先了解一下Areas的概念
    Areas是实现Asp.net MVC 项目模块化管理的一种简单方法。
    每个项目由多个模块组成，如支付模块，客户关系模块等。在传统的项目中，采用“文件夹”来实现模块化管理的，你会发现在单个项目中会有多个同级文件夹，每个文件夹代表一个模块，并保存各模块相关的文件。
    然而，在Asp.net MVC 项目中使用自定义文件夹实现功能模块化会导致很多问题。
    下面是在Asp.Net MVC中使用文件夹来实现模块化功能需要注意的几点：
•	DataAccessLayer，BusinessLayer，BusinessEntities和ViewModels的使用不会导致其他问题，在任何情况下，可视作简单的类使用。
•	Controllers——只能保存在Controller文件夹，但是这不是大问题，从MVC4开始，控制器的路径不再受限。现在可以放在任何文件目录下。
•	所有的Views必须放在 "~/Views/ControllerName" or "~/Views/Shared"文件夹。
创建必要的ViewModels
	在ViewModel类库下新建文件夹并命名为SPA，创建ViewModel，命名为"MainViewModel"，如下：
using WebApplication1.ViewModels;
namespace WebApplication1.ViewModels.SPA
{
    public class MainViewModel
    {
        public string UserName { get; set; }
        public FooterViewModel FooterData { get; set; }//New Property
    }
}
创建Index action 方法
    在 MainController 中输入：
using WebApplication1.ViewModels.SPA;
using OldViewModel = WebApplication1.ViewModels;
    在MainController 中新建Action 方法，如下：
public ActionResult Index()
{
    MainViewModel v = new MainViewModel();
    v.UserName = User.Identity.Name;
    v.FooterData = new OldViewModel.FooterViewModel();
    v.FooterData.CompanyName = "StepByStepSchools";//Can be set to dynamic value
    v.FooterData.Year = DateTime.Now.Year.ToString();
    return View("Index", v);
}
using OldViewModel = WebApplication1.ViewModels 这行代码中，给WebApplication1.ViewModels 添加了别名OldViewModel，使用时可直接写成OldViewModel.ClassName这种形式。
如果不定义别名的话，会产生歧义，因为WebApplication1.ViewModels.SPA 和 WebApplication1.ViewModels下有名称相同的类。
创建Index View
创建与上述Index方法匹配的View
@using WebApplication1.ViewModels.SPA
@model MainViewModel
<!DOCTYPE html>

<html>
<head>
    <meta name="viewport" content="width=device-width" />
    <title>Employee Single Page Application</title>
运行测试

Talk
1. 为什么在控制器名前需要使用SPA关键字？
在ASP.NET MVC应用中添加area时，Visual Studio会自动创建并命名为"[AreaName]AreaRegistration.cs" 的文件，其中包含了AreaRegistration的派生类。该类定义了 AreaName属性和用来定义register路径信息的 RegisterArea 方法。
在本次实验中你会发现nameSpaArealRegistration.cs文件被存放在 "~/Areas/Spa" 文件夹下，SpaArealRegistration类的RegisterArea方法的代码如下：
context.MapRoute(
    "SPA_default",
    "SPA/{controller}/{action}/{id}",
    new { action = "Index", id = UrlParameter.Optional }
);
这就是为什么一提到Controllers，我们会在Controllers前面加SPA关键字。
2. SPAAreaRegistration的RegisterArea方法是怎样被调用的？
打开global.asax文件，首行代码如下：
AreaRegistration.RegisterAllAreas();
RegisterAllAreas方法会找到应用程序域中所有AreaRegistration的派生类，并主动调用RegisterArea方法
3. 是否可以不使用SPA关键字来调用MainController？
AreaRegistration类在不删除其他路径的同时会创建新路径。RouteConfig类中定义了新路径仍然会起作用。如之前所说的，Controller存放的路径是不受限制的，因此它可以工作但可能不会正常的显示，因为无法找到合适的View。
实验34——创建单页应用2—显示Employees
1.创建ViewModel，实现“显示Empoyee”功能
在SPA中新建两个ViewModel 类，命名为”EmployeeViewModel“及”EmployeeListViewModel“：
namespace WebApplication1.ViewModels.SPA
{
    public class EmployeeViewModel
    {
        public string EmployeeName { get; set; }
        public string Salary { get; set; }
        public string SalaryColor { get; set; }
    }
}
namespace WebApplication1.ViewModels.SPA
{
    public class EmployeeListViewModel
    {
        public List<employeeviewmodel> Employees { get; set; }
    }
}
注意：这两个ViewModel 都是由非SPA 应用创建的，唯一的区别就在于这次不需要使用BaseViewModel。
2. 创建EmployeeList Index
在MainController 中创建新的Action 方法”EmployeeList“action 方法
public ActionResult EmployeeList()
{
    EmployeeListViewModel employeeListViewModel = new EmployeeListViewModel();
    EmployeeBusinessLayer empBal = new EmployeeBusinessLayer();
    List<employee> employees = empBal.GetEmployees();

    List<employeeviewmodel> empViewModels = new List<employeeviewmodel>();

    foreach (Employee emp in employees)
    {
        EmployeeViewModel empViewModel = new EmployeeViewModel();
        empViewModel.EmployeeName = emp.FirstName + " " + emp.LastName;
        empViewModel.Salary = emp.Salary.Value.ToString("C");
        if (emp.Salary > 15000)
        {
            empViewModel.SalaryColor = "yellow";
        }
        else
        {
            empViewModel.SalaryColor = "green";
        }
        empViewModels.Add(empViewModel);
    }
    employeeListViewModel.Employees = empViewModels;
    return View("EmployeeList", employeeListViewModel);
}
注意： 不需要使用 HeaderFooterFilter
3. 创建AddNewLink 分部View
之前添加AddNewLink 分部View已经无法使用，因为Anchor标签会造成全局刷新，我们的目标是创建”单页应用“，因此不需要全局刷新。
在”~/Areas/Spa/Views/Main“ 文件夹新建分部View”AddNewLink.cshtml“。
<a href="#" onclick="OpenAddNew();">Add New</a>
4. 创建 AddNewLink Action 方法
在MainController中创建 ”GetAddNewLink“ action 方法。
public ActionResult GetAddNewLink()
{
    if (Convert.ToBoolean(Session["IsAdmin"]))
    {
        return PartialView("AddNewLink");
    }
    else
    {
        return new EmptyResult();
    }
}
5. 新建 EmployeeList View
在“~/Areas/Spa/Views/Main”中创建新分部View 命名为“EmployeeList”。
@using WebApplication1.ViewModels.SPA
@model EmployeeListViewModel
<div>
    @{
        Html.RenderAction("GetAddNewLink");
    }

    <table border="1" id="EmployeeTable">
        <tr>
            <th>Employee Name</th>
6. 设置EmployeeList 为初始页面
打开“~/Areas/Spa/Views/Main/Index.cshtml”文件，在Div标签内包含EmployeeList action结果。
...  
</div>
7. 运行

实验35——创建单页应用3—创建Employee
1. 创建AddNew ViewModels
在SPA中新建 ViewModel类库项的ViewModel，命名为“CreateEmployeeViewModel”。
namespace WebApplication1.ViewModels.SPA
{
    public class CreateEmployeeViewModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Salary { get; set; }
    }
}
2. 创建AddNew action 方法
在MainController中输入using 语句：
using WebApplication1.Filters;
在MainController 中创建AddNew action 方法：
[AdminFilter]
public ActionResult AddNew()
{
    CreateEmployeeViewModel v = new CreateEmployeeViewModel();
    return PartialView("CreateEmployee", v);
}
3. 创建 CreateEmployee 分部View
在“~/Areas/Spa/Views/Main”中创建新的分部View“CreateEmployee”
@using WebApplication1.ViewModels.SPA
@model CreateEmployeeViewModel
<div>
    <table>
        <tr>
            <td>
                First Name:
            </td>
4. 添加 jQuery UI
右击项目选择“Manage Nuget Manager”。找到“jQuery UI”并安装。

项目中会自动添加.js和.css文件

5. 在项目中添加jQuery UI
打开“~/Areas/Spa/Views/Main/Index.cshtml”，添加jQuery.js,jQueryUI.js 及所有的.css文件的引用。这些文件会通过Nuget Manager添加到jQuery UI 包中。
<head>
<meta name="viewport" content="width=device-width" />
<script src="~/Scripts/jquery-1.8.0.js"></script>
<script src="~/Scripts/jquery-ui-1.11.4.js"></script>
<title>Employee Single Page Application</title>
<link href="~/Content/themes/base/all.css" rel="stylesheet" />
...
6. 实现 OpenAddNew 方法
在“~/Areas/Spa/Views/Main/Index.cshtml”中新建JavaScript方法“OpenAddNew”。
<script>
    function OpenAddNew() {
        $.get("/SPA/Main/AddNew").then
            (
                function (r) {
                    $("<div id='DivCreateEmployee'></div>").html(r).
                        dialog({
                            width: 'auto', height: 'auto', modal: true, title: "Create New Employee",
                            close: function () {
                                $('#DivCreateEmployee').remove();
                            }
                        });
                }
            );
    }
</script>
7. 运行
完成登录步骤后导航到Index中，点击Add New 链接。

8. 创建 ResetForm 方法
在CreateEmployee.cshtml顶部，输入以下代码，创建ResetForm函数：
@model CreateEmployeeViewModel
<script>
    function ResetForm() {
        document.getElementById('TxtFName').value = "";
        document.getElementById('TxtLName').value = "";
        document.getElementById('TxtSalary').value = "";
    }
</script>
9. 创建 CancelSave 方法
在CreateEmployee.cshtml顶部，输入以下代码，创建CancelSave 函数：
document.getElementById('TxtSalary').value = "";
    }
    function CancelSave() {
        $('#DivCreateEmployee').dialog('close');
    }
在开始下一步骤之前，我们先来了解我们将实现的功能：
•	最终用户点击保存按钮
•	输入值必须在客户端完成验证
•	会将合法值传到服务器端
•	新Employee记录必须保存到数据库中
•	CreateEmployee对话框使用完成之后必须关闭
•	插入新值后，需要更新表格。
为了实现三大功能，先确定一些实现计划：
1.验证
验证功能可以使用之前项目的验证代码。
2.保存功能
我们会创建新的MVC action 方法实现保存Employee，并使用jQuery Ajax调用
3. 服务器端与客户端进行数据通信
在之前的实验中，使用Form标签和提交按钮来辅助完成的，现在由于使用这两种功能会导致全局刷新，因此我们将使用jQuery Ajax方法来替代Form标签和提交按钮。
寻求解决方案
1. 理解问题
大家会疑惑JavaScript和Asp.NET 是两种技术，如何进行数据交互？
解决方案： 通用数据类型
由于这两种技术都支持如int，float等等数据类型，尽管他们的存储方式，大小不同，但是在行业总有一种数据类型能够处理任何数据，称之为最兼容数据类型即字符串类型。
通用的解决方案就是将所有数据转换为字符串类型，因为无论哪种技术都支持且能理解字符串类型的数据。

问题：复杂数据该怎么传递？
.net中的复杂数据通常指的是类和对象，这一类数据，.net与其他技术传递复杂数据就意味着传类对象的数据，从JavaScript给其他技术传的复杂类型数据就是JavaScript对象。因此是不可能直接传递的，因此我们需要将对象类型的数据转换为标准的字符串类型，然后再发送。
解决方案—标准的通用数据格式
可以使用XML定义一种通用的数据格式，因为每种技术都需要将数据转换为XML格式的字符串，来与其他技术通信，跟字符串类型一样，XML是每种技术都会考虑的一种标准格式。
如下，用C#创建的Employee对象，可以用XML 表示为：
<employee></employee><Employee>
      <EmpName>Sukesh</EmpName>
      <Address>Mumbai</Address>
</Employee>
因此可选的解决方案就是，将技术1中的复杂数据转换为XML格式的字符串，然再发送给技术2.

然而使用XML格式可能会导致数据占用的字节数太多，不易发送。数据SiZE越大意味着性能越低效。还有就是XML的创建和解析比较困难。
为了处理XML创建和解析的问题，使用JSON格式，全称“JavaScript Object Notation”。
C#创建的Employee对象用JSON表示：
{
  EmpName: "Sukesh",
  Address: "Mumbai"
}
JSON数据是相对轻量级的数据类型，且JAVASCRIPT提供转换和解析JSON格式的功能函数。
var e={
EmpName= &ldquo;Sukesh&rdquo;,
Address= &ldquo;Mumbai&rdquo;
};
var EmployeeJsonString = JSON.stringify(e);//This EmployeeJsonString will be send to other technologies.
var EmployeeJsonString=GetFromOtherTechnology();
var e=JSON.parse(EmployeeJsonString);
alert(e.EmpName);
alert(e.Address);
数据传输的问题解决了，让我们继续进行实验。
10. 创建 SaveEmployee action
在MainController中创建action，如下：
[AdminFilter]
public ActionResult SaveEmployee(Employee emp)
{
    EmployeeBusinessLayer empBal = new EmployeeBusinessLayer();
    empBal.SaveEmployee(emp);

EmployeeViewModel empViewModel = new EmployeeViewModel();
empViewModel.EmployeeName = emp.FirstName + " " + emp.LastName;
empViewModel.Salary = emp.Salary.Value.ToString("C");
if (emp.Salary > 15000)
{
empViewModel.SalaryColor = "yellow";
}
else
{
empViewModel.SalaryColor = "green";
    }
return Json(empViewModel);
}
上述代码中，使用Json方法在MVC action方法到JavaScript之间传Json字符串。
11. 添加 Validation.js 引用
@using WebApplication1.ViewModels.SPA
@model CreateEmployeeViewModel
<script src="~/Scripts/Validations.js"></script>
12. 创建 SaveEmployee 方法
在CreateEmployee.cshtml View中，创建 SaveEmployee方法：
...
...

    function SaveEmployee() {
        if (IsValid()) {
            var e =
                {
                    FirstName: $('#TxtFName').val(),
                    LastName: $('#TxtLName').val(),
                    Salary: $('#TxtSalary').val()
                };
            $.post("/SPA/Main/SaveEmployee",e).then(
                function (r) {
                    var newTr = $('<tr></tr>');
                    var nameTD = $('<td></td>');
                    var salaryTD = $('<td></td>');

                    nameTD.text(r.EmployeeName);
                    salaryTD.text(r.Salary); 

                    salaryTD.css("background-color", r.SalaryColor);

                    newTr.append(nameTD);
                    newTr.append(salaryTD);

                    $('#EmployeeTable').append(newTr);
                    $('#DivCreateEmployee').dialog('close'); 
                }
                );
        }
    }
</script>
13. 运行

Talk on Lab 35
1. JSON 方法的作用是什么？
返回JSONResult,JSONResult 是ActionResult 的子类。在第六篇博客中讲过MVC的请求周期。

ExecuteResult是ActionResult中声明的抽象方法，ActionResult所有的子类都定义了该方法。在第一篇博客中我们已经讲过ViewResult 的ExecuteResult方法实现的功能，有什么不理解的可以翻看第一篇博客。
实验36——创建单页应用—4—批量上传
1. 创建SpaBulkUploadController
创建新的AsyncController“ SpaBulkUploadController”
namespace WebApplication1.Areas.SPA.Controllers
{
    public class SpaBulkUploadController : AsyncController
    {
    }
}
2. 创建Index Action
在步骤1中的Controller中创建新的Index Action 方法,如下：
[AdminFilter]
public ActionResult Index()
{
    return PartialView("Index");
}
3. 创建Index 分部View
在“~/Areas/Spa/Views/SpaBulkUpload”中创建 Index分部View
<div>
    Select File : <input type="file" name="fileUpload" id="MyFileUploader" value="" />
    <input type="submit" name="name" value="Upload" onclick="Upload();" />
</div>
4. 创建 OpenBulkUpload  方法
打开“~/Areas/Spa/Views/Main/Index.cshtml”文件，新建JavaScript 方法OpenBulkUpload
function OpenBulkUpload() {
            $.get("/SPA/SpaBulkUpload/Index").then
                (
                    function (r) {
                        $("<div id='DivBulkUpload'></div>").html(r).dialog({ width: 'auto', height: 'auto', modal: true, title: "Create New Employee",
                            close: function () {
                                $('#DivBulkUpload').remove();
                            } });
                    }
                );
        }
    </script>
</head>
<body>
    <div style="text-align:right">
5. 运行

6. 新建FileUploadViewModel
在ViewModel SPA文件夹中新建View Model”FileUploadViewModel”。
namespace WebApplication1.ViewModels.SPA
{
    public class FileUploadViewModel
    {
        public HttpPostedFileBase fileUpload { get; set; }
    }
}
7. 创建Upload Action
Create a new Action method called Upload in SpaBulkUploadController as follows.
[AdminFilter]
public async Task<actionresult> Upload(FileUploadViewModel model)
{
    int t1 = Thread.CurrentThread.ManagedThreadId;
    List<employee> employees = await Task.Factory.StartNew<list<employee>>
        (() => GetEmployees(model));
    int t2 = Thread.CurrentThread.ManagedThreadId;
    EmployeeBusinessLayer bal = new EmployeeBusinessLayer();
    bal.UploadEmployees(employees);
    EmployeeListViewModel vm = new EmployeeListViewModel();
    vm.Employees = new List<employeeviewmodel>();
    foreach (Employee item in employees)
    {
        EmployeeViewModel evm = new EmployeeViewModel();
        evm.EmployeeName = item.FirstName + " " + item.LastName;
        evm.Salary = item.Salary.Value.ToString("C");
        if (item.Salary > 15000)
        {
            evm.SalaryColor = "yellow";
        }
        else
        {
            evm.SalaryColor = "green";
        }
        vm.Employees.Add(evm);
    }
    return Json(vm);
}

private List<employee> GetEmployees(FileUploadViewModel model)
{
    List<employee> employees = new List<employee>();
    StreamReader csvreader = new StreamReader(model.fileUpload.InputStream);
    csvreader.ReadLine();// Assuming first line is header
    while (!csvreader.EndOfStream)
    {
        var line = csvreader.ReadLine();
        var values = line.Split(',');//Values are comma separated
        Employee e = new Employee();
        e.FirstName = values[0];
        e.LastName = values[1];
        e.Salary = int.Parse(values[2]);
        employees.Add(e);
    }
    return employees;
}
8. 创建Upload 函数
打开”~/Areas/Spa/Views/SpaBulkUpload”的Index View。创建JavaScript函数，命名为“Upload”
<script>
    function Upload() {
        debugger;
        var fd = new FormData();
        var file = $('#MyFileUploader')[0];
        fd.append("fileUpload", file.files[0]);
        $.ajax({
            url: "/Spa/SpaBulkUpload/Upload",
            type: 'POST',
            contentType: false,
            processData: false,
            data: fd
        }).then(function (e) {
            debugger;
            for (i = 0; i < e.Employees.length; i++)
            {
                var newTr = $('<tr></tr>');
                var nameTD = $('<td></td>');
                var salaryTD = $('<td></td>');

                nameTD.text(e.Employees[i].EmployeeName);
                salaryTD.text(e.Employees[i].Salary);

                salaryTD.css("background-color", e.Employees[i].SalaryColor);

                newTr.append(nameTD);
                newTr.append(salaryTD);

                $('#EmployeeTable').append(newTr);
            }
            $('#DivBulkUpload').dialog('close');
        });
    }
</script>
9. 运行

目录
	Introduction
	What do we need for doing Asp.Net MVC ?
	ASP.NET vs MVC vs WebForms
	Why ASP.NET Web Forms?
	Problems with Asp.Net Web Forms
	What's the solution ?
	How Microsoft Asp.Net MVC tackles problems in Web Forms?
	Understand Controller in Asp.Net MVC?
	Understand Views in Asp.Net MVC
	Lab 1 – Demonstrating Controller with a simple hello world
	Q & A session around Lab 1
	Lab 2 – Demonstrating Views
Introduction
	As the title promises "Learn MVC in 7 days", so this article will have 7 articles i.e. 1 article for each day. So start reading this tutorial series with a nice Monday and become a MVC guy till the end of the week.
    Day 1 is kind of a warm up. In this first day we will understand Why Asp.Net MVC over Webforms ? , Issues with Webforms and we will do two Lab's one around controller and the around views.
 
    After each one of these lab's we will run through a small Q and A session where we will discuss concepts of the lab. So the structure of this is article is Lab's and then Q and A.
In case for any Lab you have questions which are not answered in the Q and A please feel free to put the same in the comment box below. We will definitely answer them and if we find those question's recurring we will include the same in the article as well so that rest of the community benefit from the same.
    So we just need your 7 day's and rest this article assures you become a ASP.NET MVC developer.
ASP.NET vs MVC vs WebForms
许多ASP.NET开发人员开始接触MVC认为MVC与ASP.NET完全没有关系，是一个全新的Web开发，事实上ASP.NET是创建WEB应用的框架而MVC是能够用更好的方法来组织并管理代码的一种更高级架构体系，所以可以称之为ASP.NET MVC。我们可将原来的ASP.NET称为 ASP.NET Webforms，新的MVC 称为ASP.NET MVC.
Why ASP.NET Web Forms?
因为VS工具提供的可视化开发解决方案大大降低了开发难度，缩减了开发周期。
ASP.NET Web Form存在的问题
主要是性能问题。在Web应用程序中从两方面来定义性能：
1. 响应时间：服务器响应请求的耗时
2. 带宽消耗：同时可传输多少数据。
还有就是服务器控件自动生成的HTML代码不容易知晓，后台代码几乎不能复用，不方便单元测试、自动化测试。
通过分析我们可以得知，每一次请求都有转换逻辑，运行并转换服务器控件为HTML输出。如果我们的页面使用表格，树形控件等复杂控件，转换就会变得很糟糕且非常复杂。HTML输出也是非常复杂的。由于这些不必要的转换从而增加了响应时间。该问题的解决方案就是摆脱后台代码，写成纯HTML代码。
ASP.NET开发人员都非常熟悉Viewstates，因为它能够自动保存post返回的状态，减少开发时间。但是这种开发时间的减少会带来巨大的消耗，Viewstate增加了页面的大小。页面尺寸的增加是因为viewstate产生了额外的字节。所以该问题的解决方案是：不使用服务器控件，直接编写HTML代码。
如果仔细观察一些专业的ASP.NET Webform项目，你会发现后台代码类往往都包含了大量的代码，并且这些代码也是非常复杂的。而现在，后台代码类继承了"System.Web.UI.Page"类。但是这些类并不像普通的类一样能够到处复用和实例化。换句话来讲，在Weform类中永远都不可能执行以下代码中的操作：
WebForm1 obj = new WebForm1();
obj.Button1_Click();
既然无法实例化后台代码类（因为实例化WebForm需要request和response），那么单元测试也非常困难，也无法执行自动化测试，必须手动测试。
那么解决方案是什么？
我们需要将后台代码迁移到独立的简单的类库，并且去除ASP.Net服务器控件，使用简单的HTML。
Asp.Net MVC 是如何弥补Web Form存在的问题的
如果你查看当前的WebForm体系结构，开发者正在使用的包含3层体系结构。三层体系结构是由UI包含ASPX及CS 后台代码。
Controller中包含后台代码逻辑，View是ASPX，如纯HTML代码，Model是中间层。通过下图可获得这三部分的关系。
所以会发现MVC的改变有两点，View变成简单的HTML，后台代码移到简单的.NET类中，称为控制器。

![x](./Resource/126.png)

MVC代表: 模型–视图–控制器 。MVC是一个架构良好并且易于测试和易于维护的开发模式。基于MVC模式的应用程序包含：
	Models： 表示该应用程序的数据并使用验证逻辑来强制实施业务规则的数据类。
	Views： 应用程序动态生成 HTML所使用的模板文件。
	Controllers： 处理浏览器的请求，取得数据模型，然后指定要响应浏览器请求的视图模板

![x](./Resource/127.png)



Understand Controller in Asp.Net MVC?
为了我们能够更好的理解Controller，我们首先需要理解Controller中涉及的专业术语：用户交互逻辑。
	1、当用户输入URL摁下回车键时，浏览器首先需要给服务器发送请求，服务器再做出响应。通过这些请求之后，客户端正尝试与服务器交互，服务器能够反馈响应，因为服务器端存在一些判断逻辑来处理这些请求。这些能够处理用户请求以及用户交互行为的业务逻辑称为用户交互逻辑。
2、如下图，当用户点击"Save"按钮之后会发生什么？如果你的回答是有一些事件处理器来处理button点击事件，那么很抱歉回答是错误的。在Web编程中是没有事件的概念的，Asp.net Web forms 根据我们的行为自动添加了处理代码，所以给我们带来的错觉认为是事件驱动的编程。这只是一种抽象的描述。当点击Button时，一个简单的HTTP请求会发送到服务器。差别在于Customer Name,Address以及Age中输入的内容将随着请求一起发送。最终，如果是有个请求，服务器端则有对应的逻辑，使服务器能够更好响应请求。简单来说是将用户交互逻辑写在服务器端。

在Asp.Net MVC中，C代表Controller，就是用来处理用户交互逻辑的。
VS提供的MVC项目模板：
	Empty模板创建目录结构，并设置路由。
	Internet Application和Intranet Application模版包含少量的控制器和视图。Internet Application模板将安全性配置为Forms(表单)身份验证，Intranet Application模板将安全性配置为Windows身份验证。
	Mobile Application模板包含用于移动客户端的JavaScript库，并有一些优化过的视图。
	如果用户主要留在一个页面上，就使用Single Page Application模板，并使用JavaScript从服务器获取信息。
	WebAPI模板是一种新型REST通信方式。
	ASP.NET MVC项目模板创建的目录结构如下表所示：
目录	描述
App_Data	用于存储数据库文件或其它数据文件，如XML
Content	包含样式
Controllers	包含控制器
Models	用于数据类
Scripts	包含JavaScript
Views	包含视图，通常是HTML代码
HTTP Request -> Routing -> Controller -> ViewResult -> ViewEngine -> View -> Response
实验1: 简单的MVC Hello world，着重处理Controller。
1. Create Asp.Net MVC 5 Project
	Step 1.1 Open Visual studio 2013(or higher). Click on File>>New>>Project.
	Step 1.2 Select Web Application. Put Name. Put Location and say ok.
	Step 1.3 Select MVC template
	Step 1.4 Click on Change Authentication. Select "No Authentication" from "Change Authentication" dialog box and click ok.
	Step 1.5. Click ok.
Step 2 – Create Controller
	Step 2.1. In the solution explorer, right click the controller folder and select Add>>Controller
	Step 2.2. Select "MVC 5 Controller – Empty" and click Add
	Step 2.3.Put controller name as "TestController" and click Add.
	One very important point to note at this step is do not delete the word controller. For now you can think it's like a reserved keyword.
Step 3. Create Action Method
	Open newly created TestController class. You will find a method inside it called "Index". Remove that method and add new public method called "GetString" as follows.
public class TestController : Controller
{
    public string GetString()
    {
        return "Hello World is old now. It’s time for wassup bro ;)";
    }
}
Step 4. Execute and Test
	Press F5. In the address bar put "ControllerName/ActionName" as follows. Please note do not type the word “Controller” just type “Test”.

Q & A session around Lab 1
1. TestController 和Test之间的关系是什么？
TestController是类名称，而Test是Controller的名称，请注意，当你在URL中输入controller的名称，不需要输入Controller这个单词。
Asp.Net MVC follows Convention based approach. It strictly look’s into the conventions we used.
In Asp.Net MVC two things are very important.
1.	How we name something?
2.	Where we keep something?
2. Action（行为）方法是什么？
Action 方法 简单的来说就是一个Controller内置的public类型的方法，能够接收并处理用户的请求，上例中，GetString 方法返回了一个字符串类型的响应。
注意：在Asp.Net Web Forms中默认的返回请求是HTML的，如果需要返回其他类型的请求，就必须创建HTTP 处理器，重写内容类型。这些操作在Asp.net中是很困难的。在Asp.net MVC中是非常简单的。如果返回类型是"String"直接返回，不需要发送完整的HTML。
3. What will happen if we try to return an object from an action method?
When return type is some object like ‘customer’, it will return ‘ToString()’ implementation of that object.By default ‘ToString()’ method returns fully qualified name of the class which is “NameSpace.ClassName”;
4. What if you want to get values of properties in above example?
Simply override “ToString” method of class as follows.
5. Action 方法是否只能用Public修饰符来修饰？
答案是肯定的，每个公有方法都会自动称为Action 方法。
6. 非public方法是什么？
一般这些方法都比较简单，但是不是公用的。无法在Web中调用。
7. 如果我们需要其他函数来完成一些特定功能，但不是Action Method要如何实现？
使用NonAction属性修饰
实验2: 深入理解View
Step 1 – Create new action method
	Add a new action method inside TestController as follows.
public ActionResult GetView()
{
    if (true)
    {
        return View("MyView");
    }
}
Step 2 – Create View
	Step 2.1. Right click the above action method and select "Add View".
	Step 2.2. In the "Add View" dialog box put view name as "MyView", uncheck "use a layout" checkbox and click "Add".
	It will add a new view inside "Views/Test" folder in solution explored
Step 3 – Add contents to View
	Open MyView.cshtml file and add contents as follows.
@{
    Layout = null;
}
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width" />
    <title>MyView</title>
</head>
<body>
    <div> 
        Welcome to MVC 5 Step by Step learning
    </div>
</body>
</html>
Step 4. Test and Execute
	Press F5 and execute the application.
Q and A session around Lab 2
1. 为什么View会放在Test的文件夹中？
View的放置与特定目录下的Controller相关。这个特定文件夹是以"ControllerName"命名的，并且放在View文件夹内。For every controller only those views will be available which are located inside its own folder.
2. 在多个控制器中无法重用View吗？
当然可以，我们需要将这些文件放在特定的Shared文件夹中。将View 放在Shared文件夹中所有的Controller都可用。
3. 单个Action 方法中可引用多个View吗？
可以，ASP.NET MVC的view和Controller不是严格的匹配的，一个Action Method可以引用多个view，而一个View也可以被多个Action方法使用
4. View函数的功能是什么？
创建 ViewResult 对象渲染视图，反馈给用户
ViewResult 内部创建了ViewPageActivator 对象
ViewResult 选择正确的ViewEngine，并且会给ViewEngine的构造函数传ViewPageActivator对象作为参数
ViewEngine 创建View类的对象
ViewResult 调用View的RenderView 方法。
5. ActionResult和 ViewResult的关系是什么？
ActionResult是抽象类，而ViewResult是ActionResult的多级孩子节点，多级是因为ViewResult是ViewResultBase的子类，而ViewResultBase是ActionResult的孩子节点。
6. 什么是ContentResult？
ViewResult是完整的HTML响应而ContentResult是标准的文本响应，仅返回字符串类型。区别就在于ContentResult是的一个使用字符串包装的ActionResult，即ContentResult是ActionResult的子类。
Day2
目录
Passing Data from Controller to View
Lab 3 – Using ViewData
Talk on Lab 3
Lab 4 – Using ViewBag
Talk on Lab 4
Problems with ViewData and ViewBag
Lab 5 - Understand strongly typed Views
Talk on Lab 5
Understand View Model in Asp.Net MVC
ViewModel a solution
Lab 6 – Implementing View Model
Talk on Lab 6
Lab 7– View With collection
Talk on Lab 7
实验3: 使用ViewData
在实验二中已经创建了静态View。然而在实际使用情况下，View常用于显示动态数据。在实验三中们将在View中动态显示数据。View将从Controller获得Model中的数据。Model是MVC中表示业务数据的层。
ViewData相当于数据字典，包含Controller和View之间传递的所有数据。Controller会在该字典中添加新数据项，View从字典中读取数据。
Step 1 - Create Model class
Create a new class Called Employee inside Model folder as follows.
namespace WebApplication1.Models
{
    public class Employee
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Salary { get; set; }
    }
}
Step 2 -Get Model in controller
Create Employee object inside GetView method as follows
Employee emp = new Employee();
emp.FirstName = "Sukesh";
emp.LastName = "Marla";
emp.Salary = 20000;
Note: Make sure to put using statement in the top or else we have to put fully qualified name of Employee class.
using WebApplication1.Models;
Step 3 – Create ViewData and return View
Store Employee object in viewdata as follows.
ViewData["Employee"] = emp;
return View("MyView");
Step 4 - Display Employee Data in View
Open MyView.cshtml.
Retrieve the Employee data from the ViewData and display it as follows.
<div>
    @{
        WebApplication1.Models.Employee emp=(WebApplication1.Models.Employee)ViewData["Employee"];
    }

<b>Employee Details </b><br />
    Employee Name : @emp.FirstName @emp.LastName <br />
    Employee Salary: @emp.Salary.ToString("C")
</div>
Step 5- Test the ouput
Press F5 and test the application.
Talk on Lab 3
1. 写Razor代码带花括号和没有花括号有什么区别？
@符号后没有花括号只是简单的显示变量或表达式的值
2. 为什么需要强制转换类型
ViewData在内部保存对象，每次添加新值，会包装成object类型，因此每次都需要解包来提取值。
3. 数据库逻辑/数据访问层，业务层分别指的是什么？
数据访问层是ASP.NET MVC中一直隐式存在的，但MVC定义中不包含数据访问层。
业务层是Model的一部分。
完整的MVC结构：

![x](./Resource/128.png)

实验4: ViewBag的使用
ViewBag可以称为ViewData的语法糖，ViewBag使用C# 4.0的动态特征，使得ViewData也具有动态特性。ViewBag内部调用ViewData。ViewData与ViewBag对比：
ViewData	ViewBag
它是Key/Value字典集合	它是dynamic类型对像

从Asp.net MVC 1 就有了	ASP.NET MVC3 才有
基于Asp.net 3.5 framework	基于Asp.net 4.0与.net framework
ViewData比ViewBag快	ViewBag比ViewData慢
在ViewPage中查询数据时需要转换合适的类型	在ViewPage中查询数据时不需要类型转换
有一些类型转换代码	可读性更好
Step 1 – Create View Bag
	Continue with the same Lab 3 and replace Step 3 with following code snippet.
ViewBag.Employee = emp;
return View("MyView");
Step 2 - Display EmployeeData in View
	Change Step 4 with following code snippet.
@{
    WebApplication1.Models.Employee emp = (WebApplication1.Models.Employee)ViewBag.Employee;
}
Employee Details
Employee Name: @emp.FirstName @emp.LastName 
Employee Salary: @emp.Salary.ToString("C")
Step 3 - Test the output
	Press F5 and test the application

Talk on Lab 4
1. 可以传递ViewData，接收时获取ViewBag吗？
答案是肯定的，反之亦然。如之前所说的，ViewBag只是ViewData的一块语法糖。
2. ViewData与ViewBag的问题
ViewData和ViewBag 是Contoller与View之间传递值的一个好选择。但是在实际使用的过程中，它们并不是最佳选择，接下来我们来看看使用它们的缺点：
性能问题：ViewData中的值都是object类型，使用之前必须强制转换为合适的类型。会添加额外的性能负担。
没有类型安全就没有编译时错误：如果尝试将其转换为错误的类型，运行时会报错。良好的编程经验告诉我们，错误必须在编译时捕获。
数据发送和数据接收之间没有正确的连接；MVC中，Controller和View是松散连接的。Controller无法捕获View变化，View也无法捕获到Controller内部发生的变化。从Controller传递一个ViewData或ViewBag的值，当开发人员正在View中写入，就必须记录从Controller中将获得什么值。如果Controller与View开发人员不是相同的开发人员，开发工作会变得非常困难。会导致许多运行时问题，降低了开发效率。
实验5: 理解强类型View
ViewData和ViewBag引起的问题的根源都在于数据类型（ViewData中值的数据类型都是object）。如果能够设置Controller和View之间参数传递的数据类型，那么上述问题就会得到解决，因此强类型View出现了。
Step 1 – Make View a strongly typed view
Add following statement in the top of the View
@model WebApplication1.Models.Employee
Above statement make our View a strongly typed view of type Employee.
Step 2 – Display Data
Now inside View simply type @Model and Dot (.) and in intellisense you will get all the properties of Model (Employee) class.

Write down following code to display the data
Employee Details
Employee Name : @Model.FirstName @Model.LastName 
@if(Model.Salary>15000)
{
    <span style="background-color:yellow">
        Employee Salary: @Model.Salary.ToString("C")
    </span>
}
else
{           
    <span style="background-color:green">
        Employee Salary: @Model.Salary.ToString("C")
    </span>
}
Step 3 – Pass Model data from Controller Action method
Change the code in the action method to following.
Employee emp = new Employee();
emp.FirstName = "Sukesh";
emp.LastName="Marla";
emp.Salary = 20000;           
return View("MyView",emp);
Step 4 – Test the output


Talk on Lab 5
1. View中使用类时需要声明类的全称吗 (Namespace.ClassName)？
添加以下语句，就不需要添加全称。
@using WebApplication1.Models
@model Employee
2. 是否必须设置强类型视图或不使用ViewData和ViewBag？
设置强类型视图是最佳解决方案。
3. 是否能将View设置为多个Model使用的强类型？
不可以。事实上，ViewModel可以处理这种情况。
理解ASP.NET MVC 中的View Model
实验5中已经违反了MVC的基本准则。根据MVC，V是View纯UI，不包含任何逻辑层。而我们在实验5中以下三点违反了MVC的体系架构规则。
1. 附加姓和名显示全名——逻辑层
2. 使用货币显示工资——逻辑层
3. 使用不同的颜色表示工资值，使用简单的逻辑改变了HTML元素的外观。——逻辑层
ViewModel 解决方法
ViewModel是ASP.NET MVC应用中隐式声明的层。它是用于维护Model与View之间数据传递的，是View的数据容器。
1. Model 和 ViewModel 的区别
Model是业务相关数据，是根据业务和数据结构创建的。ViewModel是视图相关的数据。是根据View创建的。
2. 具体的工作原理
Controller 处理用户交互逻辑或简单的判断，处理用户需求
Controller 获取一个或多个Model数据
Controller 决策哪个View最符合用户的请求
Controller 将根据Model数据和View需求创建并且初始化ViewModel对象。
Controller 将ViewModel数据以ViewData或ViewBag或强类型View等对象传递到View中。
Controller 返回View。
3. View 与 ViewModel 之间是如何关联的？
View将变成ViewModel类型的强类型View。
4. Model和 ViewModel 是如何关联的？
Model和ViewModel 是互相独立的，Controller将根据Model对象创建并初始化ViewModel对象。
实验6: 实现ViewModel
Step 1 – Create Folder
Create a new folder called ViewModels in the project
Step 2 – Create EmployeeViewModel
In order to do that, let’s list all the requirement on the view
1.	First Name and Last Name should be appended before displaying
2.	Amount should be displayed with currency
3.	Salary should be displayed in different colour (based on value)
4.	Current User Name should also be displayed in the view as well
Create a new class called EmployeeViewModel inside ViewModels folder will looks like below.
public class EmployeeViewModel
{
    public string EmployeeName { get; set; }
    public string Salary { get; set; }
    public string SalaryColor { get; set; }
    public string UserName{get;set;}
}
Please note, in View Model class, FirstName and LastName properties are replaced with one single property called EmployeeName, Data type of Salary property is string and two new properties are added called SalaryColor and UserName.
Step 3 – Use View Model in View
In Lab 5 we had made our View a strongly type view of type Employee. Change it to EmployeeViewModel
@using WebApplication1.ViewModels
@model EmployeeViewModel
Step 4 – Display Data in the View
Replace the contents in View section with following snippet.
Hello @Model.UserName
<hr />
<div>
<b>Employee Details</b><br />
    Employee Name : @Model.EmployeeName <br />
<span style="background-color:@Model.SalaryColor">
        Employee Salary: @Model.Salary
</span>
</div>
Step 5 – Create and Pass ViewModel
In GetView action method,get the model data and convert it to ViewModel object as follows.
public ActionResult GetView()
{
    Employee emp = new Employee();
    emp.FirstName = "Sukesh";
    emp.LastName="Marla";
    emp.Salary = 20000;

    EmployeeViewModel vmEmp = new EmployeeViewModel();
    vmEmp.EmployeeName = emp.FirstName + " " + emp.LastName;
    vmEmp.Salary = emp.Salary.ToString("C");
    if(emp.Salary>15000)
    {
        vmEmp.SalaryColor="yellow";
    }
    else
    {
        vmEmp.SalaryColor = "green";
    }
    vmEmp.UserName = "Admin"
    return View("MyView", vmEmp);
}
Step 6 – Test the output
Press F5 and Test the output


Same output as Lab 5 but this time View won’t contain any logic.
Talk on Lab 6
1. 是否意味着，每个Model都有一个ViewModel？
不是，和Model无关，和View相关；每个View有其对应的ViewModel。
2. Model与ViewModel之间存在关联是否是好的实现方法？
    最好的是Model与ViewModel之间相互独立。
3. 需要每次都创建ViewModel吗？假如View不包含任何呈现逻辑只显示Model数据的情况下还需要创建ViewModel吗？
建议是每次都创建ViewModel，每个View都应该有对应的ViewModel，尽管ViewModel包含与Model中相同的属性。
4. 假定一个View不包含任何呈现逻辑，只显示Model数据，我们不创建ViewModel会发生什么？
无法满足未来的需求，如果未来需要添加新数据，我们需要从头开始创建全新的UI，所以如果我们保持规定，从开始创建ViewModel，就不会发生这种情况。在本实例中，初始阶段的ViewModel将与Model几乎完全相同。
实验7: 带有集合的View
Step 1 – Change EmployeeViewModel class
Remove UserName property from EmployeeViewModel.
public class EmployeeViewModel
{
    public string EmployeeName { get; set; }
    public string Salary { get; set; }
    public string SalaryColor { get; set; }
}
Step 2– Create Collection View Model
Create a class called EmployeeListViewModel inside ViewModel folder as follows.
public class EmployeeListViewModel
{
    public List<EmployeeViewModel><employeeviewmodel> Employees { get; set; }
    public string UserName { get; set; }
}
Step 3 – Change type of strongly typed view
Make MyView.cshtml a strongly typed view of type EmployeeListViewModel.
@using WebApplication1.ViewModels
@model EmployeeListViewModel
Step 4– Display all employees in the view
<body>
    Hello @Model.UserName
    <hr />
    <div>
        <table>
            <tr>
                <th>Employee Name</th>
                <th>Salary</th>
            </tr>
            @foreach (EmployeeViewModel item in Model.Employees)
            {
                <tr>
                    <td>@item.EmployeeName</td>
                    <td style="background-color:@item.SalaryColor">@item.Salary</td>
                </tr>
            }
        </table>
    </div>
</body>
Step 5 – Create Business Layer for Employee
In this lab, we will take our project to next level. We will add Business Layer to our project. Create a new class called EmployeeBusinessLayer inside Model folder with a method called GetEmployees.
public class EmployeeBusinessLayer
{
    public List<Employee><employee> GetEmployees()
    {
        List<Employee><employee> employees = new List<Employee><employee>();
        Employee emp = new Employee();
        emp.FirstName = "johnson";
        emp.LastName = " fernandes";
        emp.Salary = 14000;
        employees.Add(emp);
Step 6– Pass data from Controller
public ActionResult GetView()
{
    EmployeeListViewModel employeeListViewModel = new EmployeeListViewModel();
    EmployeeBusinessLayer empBal = new EmployeeBusinessLayer();
    List<employee> employees = empBal.GetEmployees();
    List<EmployeeViewModel><employeeviewmodel> empViewModels = new List<EmployeeViewModel><employeeviewmodel>();
    foreach (Employee emp in employees)
    {
        EmployeeViewModel empViewModel = new EmployeeViewModel();
        empViewModel.EmployeeName = emp.FirstName + " " + emp.LastName;
        empViewModel.Salary = emp.Salary.ToString("C");
        if (emp.Salary > 15000)
        {
            empViewModel.SalaryColor = "yellow";
        }
        else
        {
            empViewModel.SalaryColor = "green";
        }
        empViewModels.Add(empViewModel);
    }
    employeeListViewModel.Employees = empViewModels;
    employeeListViewModel.UserName = "Admin";
    return View("MyView", employeeListViewModel);
}
Step 7 – Execute and Test the Output
	Press F5 and execute the application.
Talk on Lab 7
1．是否可以制定强类型View列表?
是的 
2. 为什么要新建EmployeeListViewModel单独的类而不直接使用强类型View的列表？
1. 策划未来会出现的呈现逻辑
2. UserName属性。UserName是与employees无关的属性，与完整View相关的属性。
3. 为什么删除EmployeeViewModel 的UserName属性，而是将它作为EmployeeListViewModel的一部分?
UserName 是相同的，不需要EmployeeViewModel中添加UserName。
Day3
目录
Data Access Layer
What is Entity Framework in simple words?
What is Code First Approach?
Lab 8 – Add Data Access layer to the project
Talk on Lab 8
Organize everything
Lab 9 – Create Data Entry Screen
Talk on Lab 9
Lab 10 – Get posted data in Server side/Controllers
Talk on Lab 10
Lab 11 – Reset and Cancel button
Talk on Lab 11
Lab 12 – Save records in database and update Grid
Lab 13 – Add Server side Validation
How Model Binder work with primitive datatypes
How Model Binder work with classes
Talk on lab 13
Lab 14 – Custom Server side validation
数据访问层
简述实体框架（EF）
EF是一种ORM工具，ORM表示对象关联映射。
在RDMS中，对象称为表格和列对象，而在.net中（面向对象）称为类，对象以及属性。
任何数据驱动的应用实现的方式有两种：
1. 通过代码与数据库关联（称为数据访问层或数据逻辑层）
2. 通过编写代码将数据库数据映射到面向对象数据，或反向操作。
ORM是一种能够自动完成这两种方式的工具。EF是微软的ORM工具。
什么是代码优先的方法？
EF提供了三种方式来实现项目：
数据库优先方法——创建数据库，包含表，列以及表之间的关系等，EF会根据数据库生成相应的Model类（业务实体）及数据访问层代码。
模型优先方法——模型优先指模型类及模型之间的关系是由Model设计人员在VS中手动生成和设计的，EF将模型生成数据访问层和数据库。
代码优先方法——代码优先指手动创建POCO类。这些类之间的关系使用代码定义。当应用程序首次执行时，EF将在数据库服务器中自动生成数据访问层以及相应的数据库。
什么是POCO类？
POCO即 "Plain Old CLR objects"，POCO类就是已经创建的简单.Net类。在上两节的实例中，Employee类就是一个简单的POCO类。
实验8: 添加数据访问层
Step 1– Create Database
	Connect to the Sql Server and create new Database called "SalesERPDB".
Step 2 – Create ConnectionString
	Open Web.config file and inside Configuration section add following section
<connectionStrings>
<add connectionString="Data Source=(local);Initial Catalog=SalesERPDB;Integrated Security=True"
        name="SalesERPDAL"       
        providerName="System.Data.SqlClient"/>
</connectionStrings>
Step 3– Add Entity Framework reference
	Right click the project >> Manage Nuget packages. Search for Entity Framework and click install.
Step 4 – Create Data Access layer.
Create a new folder called "DataAccessLayer" in the root folder and inside it create a new class called "SalesERPDAL"
Put using statement at the top as follows.
using System.Data.Entity;
Inherit "SalesERPDAL" from DbContext
public class SalesERPDAL: DbContext
{
}
Step 5 – Create primary key field for employee class
	Open Employee class and put using statement at the topas follows.
using System.ComponentModel.DataAnnotations;
	Add EmployeeId property in Employee class and mark it as Key attribute.
public class Employee
{
    [Key]
    public int EmployeeId  { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int Salary { get; set; }
}
Step 6 – Define mapping
	Put following using statement in the top for "SalesERPDAL" class
using WebApplication1.Models;
	Override OnModelCreating method in SalesERPDAL class as follows.
protected override void OnModelCreating(DbModelBuilder modelBuilder)
{
    modelBuilder.Entity<employee>().ToTable("TblEmployee");
    base.OnModelCreating(modelBuilder);
}
Note: In above code snippet "TblEmployee" represents the table name. It automatically get created in runtime.
Step 7 – Create property to hold Employees in Database
	Create a new property called Employees in "SalesERPDAL" class as follows
public DbSet<Employee> Employees{get;set;}
	DbSet will represent all the employees that can be queried from the database.
Step 8– Change Business Layer Code and get data from Database
	Open EmployeeBusinessLayer class.Put using statement in the top.
using WebApplication1.DataAccessLayer;
	Now change GetEmployees method class as follows.
public List<employee> GetEmployees()
{
    SalesERPDAL salesDal = new SalesERPDAL();
    return salesDal.Employees.ToList();
}
Step 9 – Execute and Test
	Press F5 and execute the application.
	Right now we don’t have any employees in the database so we will see a blank grid.
	Check the database. Now we have a table called TblEmployee with all the columns.

Step 10 – Insert Test Data
    Add some dummy data to TblEmployee table.

Step 11 – Execute and test the application
	Press F5 and run the application again.
Talk on Lab 8
1. 什么是数据集？
DbSet数据集是数据库方面的概念，指数据库中可以查询的实体的集合。当执行Linq 查询时，Dbset对象能够将查询内部转换，并触发数据库。
在本实例中，数据集是Employees，是所有Employee的实体的集合。当每次需要访问Employees时，会获取"TblEmployee"的所有记录，并转换为Employee对象，返回Employee对象集。
2. 如何连接数据访问层和数据库？
数据访问层和数据库之间的映射通过名称实现的，在实验8中，ConnectionString（连接字符串）的名称和数据访问层的类名称是相同的，都是SalesERPDAL，因此会自动实现映射。
3. 连接字符串的名称可以改变吗？
可以改变，不过在数据访问层中需要定义一个构造函数，如下：
public SalesERPDAL():base("NewName")
{
}
实验 9: 创建数据入口（Data Entry Screen）
Step 1 – Create action method
	Create an action method called "AddNew" in EmployeeController as follows
public ActionResult AddNew()
{
    return View("CreateEmployee");
}
Step 2 – Create View
	Create a view called "CreateEmployee" inside View/Employee folder as follows.
@{
    Layout = null;
}
<!DOCTYPE html>
<html>
    <head>
      <meta name="viewport" content="width=device-width" />
      <title>CreateEmployee</title>
    </head>
    <body>
      <div>
         <form action="/Employee/SaveEmployee" method="post">
            First Name: <input type="text" id="TxtFName" name="FirstName" value="" /><br />
            Last Name: <input type="text" id="TxtLName" name="LastName" value="" /><br />
            Salary: <input type="text" id="TxtSalary" name="Salary" value="" /><br />
            <input type="submit" name="BtnSave" value="Save Employee" />
            <input type="button" name="BtnReset" value="Reset" />
         </form>
      </div>
    </body>
</html>
Step 3 – Create a link in Index View
	Open Index.cshtml and add a hyperlink pointing to AddNew Action URL.
<a href="/Employee/AddNew">Add New</a>
Step 4 –Execute and Test the application
	Press F5 and execute the application
Talk on Lab 9
1. 使用Form 标签的作用是什么？
在系列文章第一讲中，我们已经知道，Web编程模式不是事件驱动的编程模式，是请求响应模式。最终用户会产生发送请求。Form标签是HTML中产生请求的一种方式，Form标签内部的提交按钮只要一被点击，请求会被发送到相关的action 属性。
2. Form标签中方法属性是什么？
方法属性决定了请求类型。有四种请求类型：get，post，put以及delete.
Get：当需要获取数据时使用。
Post：当需要新建一些事物时使用。
Put：当需要更新数据时使用。
Delete：需要删除数据时使用。
3. 使用Form 标签来生成请求，与通过浏览器地址栏或超链接来生成请求，有什么区别？
使用Form标签生成请求时，所有有关输入的控件值会随着请求一起发送。
4. 输入的值是怎样发送到服务器端的？
当请求类型是Get，Put或Delete时，值会通过 Query string parameters发送，当请求是Post类型，值会通过Post数据传送。
5. 使用输入控件名的作用是什么？
所有输入控件的值将随着请求一起发送。同一时间可能会接收到多个值，为了区分为每个值附加一个Key，这个Key在这里就是name属性。
6. 名称和 Id的作用是否相同？
不相同，名称属性是当请求被发送时在HTML内部使用的，而 ID属性是开发人员在JavaScript中为了实现一些动态功能而调用的。
7. "input type=submit" 和 "input type=button"的区别是什么？
提交按钮是在给服务器发送请求时专门使用的，而简单的按钮是执行一些自定义的客户端行为而使用的。简单按钮不会自己做任何事情。
实验10: 在服务器端（或Controller）获取Post数据
Step 1 – Create SaveEmployee Action method
	Inside Employee Controller create an action method called SaveEmployee as follows.
public string SaveEmployee(Employee e)
{
   return e.FirstName + "|"+ e.LastName+"|"+e.Salary;
}
Step 2 – Execute and Test
	Press F5 and execute the application.
Talk on Lab 10
1. Textbox的值在action方法内部是如何更新Employee对象的？
在 Asp.Net MVC中有个 Model Binder(模型绑定)的概念：
无论什么时候发送请求到带参的action方法，Model Binder都会自动执行。
Model Binder会通过迭代该action方法的所有原始参数，和接收到的所有参数的key做对比。如果匹配，则响应接收的数据并分配给参数。
在上述迭代完成之后，Model Binder将类参数的每个属性名称与接收的数据的key做对比，如果匹配，则响应接收的数据并分配给参数。
2. 如果两个参数是相关联的会发生什么状况，如参数 "Employee e" 和 "string FirstName"？
FirstName会在原 First Name变量和 e.FirstName 属性内被更新。
3. Model Binder能在组合关系中运行吗？
可以，but in that case name of the control should be given accordingly.如下示例所示：
	Let say we have Customer class and Address class as follows
public class Customer
{
    public string FName{get;set;}
    public Address address{get;set;}
}
public class Address
{
    public string CityName{get;set;}
    public string StateName{get;set;}
}
In this case Html should look like this
...
...
...
<input type="text" name="FName">
<input type="text" name="address.CityName">
<input type="text" name="address.StateName">
...
...
...
实验11: 重置按钮和取消按钮
Step 1 – Start withReset and Cancel button
	Add a Reset and Cancel button as follows
...
...
...
<input type="submit" name="BtnSubmit" value="Save Employee" />
<input type="button" name="BtnReset" value="Reset" onclick="ResetForm();" />
<input type="submit" name="BtnSubmit" value="Cancel" />
Note: Save button and Cancel button have same "Name" attribute value that is "BtnSubmit".
Step 2 – define ResetForm function
	In Head section of Html add a script tag and inside that create a JavaScript function called ResetForm as follows.
<script>
    function ResetForm() {
        document.getElementById('TxtFName').value = "";
        document.getElementById('TxtLName').value = "";
        document.getElementById('TxtSalary').value = "";
    }
</script
Step 3 – Implement cancel click in EmplyeeController’s SaveEmployee action method.
	Change SaveEmployee action method as following
public ActionResult SaveEmployee(Employee e, string BtnSubmit)
{
    switch (BtnSubmit)
    {
        case "Save Employee":
            return Content(e.FirstName + "|" + e.LastName + "|" + e.Salary);
        case "Cancel":
            return RedirectToAction("Index");
    }
    return new EmptyResult();
}
Step 4 – Execute the application.
	Press F5 and execute the application. Navigate to the AddNew screen by clicking "Add New" link.
Step 5 – Test Reset functionality
Step 6 – Test Save and Cancel functionality
Talk on Lab 11
1. 在实验11中为什么将保存和取消按钮设置为同名？
在日常使用中，点击提交按钮之后，请求会被发送到服务器端，所有输入控件的值都将被发送。提交按钮也是输入按钮的一种。因此提交按钮的值也会被发送。
当保存按钮被点击时，保存按钮的值也会随着请求被发送到服务器端；当点击取消按钮时，取消按钮的值也会随着请求发送。
在Action 方法中，Model Binder 将维护这些工作，会根据接收到的值更新参数值。
2. 实现多重提交按钮有没有其他可用的方法？
事实上，有很多可实现的方法。以下会介绍三种方法。
1) 隐藏 Form 元素
   在View中创建一个隐藏form元素
<form action="/Employee/CancelSave" id="CancelForm" method="get" style="display:none">
</form>
   将提交按钮改为正常按钮，并且使用JavaScript脚本代码：
<input type="button" name="BtnSubmit" value="Cancel" onclick="document.getElementById('CancelForm').submit()" />
2) 使用JavaScript动态的修改URL
<form action="" method="post" id="EmployeeForm" >
...
...
<input type="submit" name="BtnSubmit" value="Save Employee" onclick="document.getElementById('EmployeeForm').action = '/Employee/SaveEmployee'" />
...
<input type="submit" name="BtnSubmit" value="Cancel" onclick="document.getElementById('EmployeeForm').action = '/Employee/CancelSave'" />
</form>
3) Ajax
使用常规输入按钮来代替提交按钮，并且点击时使用jQuery或任何其他库来产生纯Ajax请求。
3. 为什么在实现重置功能时，不使用 input type=reset ？
因为输入类型type=reset 不会清空控件的值，只会将控件设置回默认值。如：
<input type="text" name="FName" value="Sukesh">
在该实例中控件值为：Sukesh，如果使用type=reset来实现重置功能，当重置按钮被点击时，textbox的值会被设置为“Sukesh”。
4. 如果控件名称与类属性名称不匹配会发生什么情况？
假设我们有如下html代码
First Name: <input type="text" id="TxtFName" name="FName" value="" /><br />
Last Name: <input type="text" id="TxtLName" name="LName" value="" /><br />
Salary: <input type="text" id="TxtSalary" name="Salary" value="" /><br />
我们的Model类包含的属性是FirstName, LastName 和 Salary。因此默认的model binder不会工作。在这种情况下，我们有如下3种解决方法：
1)	在action方法中，用Request.Form接收post提交过来的数据并构造Model类
public ActionResult SaveEmployee()
{
    Employee e = new Employee();
    e.FirstName = Request.Form["FName"];
    e.LastName = Request.Form["LName"];
    e.Salary = int.Parse(Request.Form["Salary"])
    ...
    ...
}
2)	使用对应的参数名，并构造Model类
public ActionResult SaveEmployee(string FName, string LName, int Salary)
{
    Employee e = new Employee();
    e.FirstName = FName;
    e.LastName = LName;
    e.Salary = Salary;
    ...
    ...
}
3)	创建自定义model binder替换默认的
a.	首先创建自定义的model binder
public class MyEmployeeModelBinder : DefaultModelBinder
{
    protected override object CreateModel(ControllerContext controllerContext, ModelBindingContext bindingContext, Type modelType)
    {
        Employee e = new Employee();
        e.FirstName = controllerContext.RequestContext.HttpContext.Request.Form["FName"];
        e.LastName = controllerContext.RequestContext.HttpContext.Request.Form["LName"];
        e.Salary = int.Parse(controllerContext.RequestContext.HttpContext.Request.Form["Salary"]);
        return e;
    }
}
b.	替换默认的model binder
public ActionResult SaveEmployee([ModelBinder(typeof(MyEmployeeModelBinder))]Employee e, string BtnSubmit)
{
......
}
5. RedirectToAction 函数的功能？
RedirectToAction 生成 RedirectToRouteResult 如ViewResult 和 ContentResult，RedirectToRouteResult是 ActionResult的孩子节点，表示间接响应，当浏览器接收到RedirectToRouteResult，它会发起新的请求到新的Action方法。
6. EmptyResult是什么？
是ActionResult的一个孩子节点，当浏览器接收到 EmptyResult，作为响应，它会显示空白屏幕，表示无结果。如果Action方法返回类型是void，就相当于EmptyResult。
实验12: 保存数据库记录，更新表格
Step 1 – Create SaveEmployee in EmployeeBusinessLayer as follows
public Employee SaveEmployee(Employee e)
{
    SalesERPDAL salesDal = new SalesERPDAL();
    salesDal.Employees.Add(e);
    salesDal.SaveChanges();
    return e;
}
Step 2 – Change SaveEmployee Action method
In EmployeeController change the SaveEmployee action method code as follows.
public ActionResult SaveEmployee(Employee e, string BtnSubmit)
{
    switch (BtnSubmit)
    {
        case "Save Employee":
            EmployeeBusinessLayer empBal = new EmployeeBusinessLayer();
            empBal.SaveEmployee(e);
            return RedirectToAction("Index");
        case "Cancel":
            return RedirectToAction("Index");
    }
    return new EmptyResult();
}
Step 3 – Execute and Test
Press F5 and execute the application. Navigate to Data entry screen and put some valid values.
实验13: 添加服务器端验证
在实验10中已经了解了Model Binder的基本功能，再来多了解一点：
Model Binder使用 post数据更新 Employee对象
但是不仅仅如此。Model Binder也会更新Model State。Model State封装了 Model状态。
ModelState包含属性IsValid，该属性表示 Model 是否成功更新。如果任何服务器端验证失败，Model将不更新。
ModelState保存验证错误的详情。
如：ModelState["FirstName"]，表示将包含所有与FirstName相关的错误。
保存接收的值（Post数据或queryString数据）
在Asp.net MVC中，将使用 DataAnnotations来执行服务器端的验证。在我们了解Data Annotation之前先来了解一些Model Binder知识：
1. 使用元数据类型时，Model Binder 是如何工作的？
当Action方法包含元类型参数，Model Binder会比较参数名和传入数据(Post和QueryString)的key。
当匹配成功时，响应接收的数据会被分配给参数。
匹配不成功时，参数会设置为缺省值，例如，如果是字符串类型则被设置为null，如果是整型则设置为0。由于数据类型异常而未匹配的话，会抛出异常。
2. 当参数是类时，Model Binder 是如何工作的？
当参数为类，Model Binder将通过检索所有类所有的属性，将接收的数据与类属性名称比较。
当匹配成功时：
	如果接收的值是空：会将空值分配给属性，如果无法执行空值分配，会设置缺省值，ModelState.IsValid将设置为fasle。如果null值可以但是被属性验证认为是无效的那么还是会分配null，ModelState.IsValid将设置为fasle。
	如果接收的值不是空：数据类型错误和服务端验证失败的情形下，会分配null值，并将ModelState.IsValid设置为fasle。如果null值不行，会分配默认值。
    如果匹配不成功，参数会被设置为缺省值。在这种情况下，ModelState.IsValid是unaffected。
Step 1 – Decorate Properties with DataAnnotations
	Open Employee class from Model folder and decorate FirstName and LastName property with DataAnnotation attribute as follows.
public class Employee
{
    ...
    ...
    [Required(ErrorMessage="Enter First Name")]
    public string FirstName { get; set; }

    [StringLength(5,ErrorMessage="Last Name length should not be greater than 5")]
    public string LastName { get; set; }
    ...
    ...
}
Step 2 – Change SaveEmployee Action method
	Open EmplyeeController and Change SaveEmployee Action method as follows.
public ActionResult SaveEmployee(Employee e, string BtnSubmit)
{
    switch (BtnSubmit)
    {
        case "Save Employee":
            if (ModelState.IsValid)
            {
                EmployeeBusinessLayer empBal = new EmployeeBusinessLayer();
                empBal.SaveEmployee(e);
                return RedirectToAction("Index");
            }
            else
            {
                return View("CreateEmployee");
            }
        case "Cancel":
            return RedirectToAction("Index");
    }
    return new EmptyResult();
}
Note: As you can see, When ModelState.IsValid is false response of SaveEmployee button click is ViewResult pointing to "CreateEmployee" view.
Step 3 – Display Error in the View
	Change HTML in the "Views/Index/CreateEmployee.cshtml" to following.
	This time we will format our UI a little with the help of "table" tag;
<table>
   <tr>
      <td>
         First Name:
      </td>
      <td>
         <input type="text" id="TxtFName" name="FirstName" value="" />
      </td>
   </tr>
   <tr>
      <td colspan="2" align="right">
        @Html.ValidationMessage("FirstName")
      </td>
   </tr>
   <tr>
      <td>
        Last Name:
      </td>
      <td>
         <input type="text" id="TxtLName" name="LastName" value="" />
      </td>
   </tr>
   <tr>
      <td colspan="2" align="right">
         @Html.ValidationMessage("LastName")
      </td>
   </tr>
   <tr>
      <td>
        Salary:
      </td>
      <td>
         <input type="text" id="TxtSalary" name="Salary" value="" />
      </td>
   </tr>
   <tr>
      <td colspan="2" align="right">
        @Html.ValidationMessage("Salary")
      </td>
   </tr>
   <tr>
      <td colspan="2">
         <input type="submit" name="BtnSubmit" value="Save Employee" />
         <input type="submit" name="BtnSubmit" value="Cancel" />
         <input type="button" name="BtnReset" value="Reset" onclick="ResetForm();" />
      </td>
   </tr>
</table>
Step 4 – Execute and Test
	Press F5 and execute the application. Navigate to "Employee/AddNew" action method and test the application.
	Test 1
"The model backing the 'SalesERPDAL' context has changed since the database was created. Consider using Code First Migrations to update the database."
To remove this error, simply add following statement in Application_Start in Global.asax file.
Database.SetInitializer(new DropCreateDatabaseIfModelChanges<SalesERPDAL>());
Database class exists inside System.Data.Entity namespace
If you are still getting the same error then, open database in Sql server and just delete __MigrationHistory table.
Soon I will release a new series on Entity Framework where we will learn Entity framework step by step. This series is intended to MVC and we are trying to stick with it. 
Talk on lab 13
1.	@Html.ValidationMessage是什么意思？
@符号表示是Razor代码
Html是HtmlHelper类的实例。
ValidationMessage是HtmlHelper类的函数，用来表示错误信息。
2.	ValidationMessage 函数是如何工作的？
ValidationMessage 是运行时执行的函数。如之前讨论的，ModelBinder更新ModelState。ValidationMessage根据Key显示ModelState表示的错误信息。
例如：ValidationMessage("FirstName")显示关联FirstName的错误信息
3.	我们有更多的类似 required 和 StringLength的属性吗?
当然有。
DataType – 确保数据是某些特殊的类型，例如：email, credit card number, URL等。
EnumDataTypeAttribute – 确定数据在枚举类型中
Range Attribute – 数据满足一定的范围
Regular expression- 数据满足正则表达式
Required – 确定数据是必须的
StringthLength – 确定字符串满足的长度
4.	Salary是怎么验证的?
We have not added any Data Annotation attribute to Salary attribute but still it’s getting validated. Reason for that is, Model Binder also considers the datatype of a property while updating model.
	我们没有给Salary属性增加任何Data Annotation，但是它仍然验证了，原因是：Model Binder在更新Model时会注意属性的数据类型。
In Test 1 – we had kept salary as empty string. Now in this case, as per the Model binderexplanation we had (In Lab 13), ModelState.IsVaid will be false and ModelState will hold validation error related to Salary which will displayed in view because of Html.ValidationMessage("Salary")
In Test 2 – Salary data type is mismatched hence validation is failed.
Is that means, integer properties will be compulsory by default? Yes, Not only integers but all value types because they can’t hold null values.
5.	如果我们需要可空的整数域，该怎么做？
Make it nullable?
public int? Salary{get;set;}
6.	How to change the validation message specified for Salary?
	Default validation support of Salary (because of int datatype) won’t allow us to change the validation message. We achieve the same by using our own validation like regular expression, range or Custom Validator.
7.	Why values are getting cleared when validation fails?
	Because it’s a new request. DataEntry view which was rendered in the beginning and which get rendered later are same from development perspective but are different from request perspective. We will learn how to maintain values in Day 4.
8.	Can we explicitly ask Model Binder to execute?
	Yes simply remove parameters from action method. It stops default model binder from executing by default.In this case we can use UpdateModel function as follows.
Employee e = new Employee();
UpdateModel<employee>(e);
Note: UpdateModel won’t work with primitive datatypes.
9.	 UpdateModel 和 TryUpdateModel 方法之间的区别是什么？
	TryUpdateModel 与UpdateModel 几乎是相同的，有点略微差别。
如果Model调整失败，UpdateModel会抛出异常。UpdateModel的 ModelState.IsValid属性就没有任何用处。
TryUpdateModel如果更新失败，ModelState.IsValid会设置为False值。
10.	客户端验证是什么？
    客户端验证是手动执行的，除非使用HTML帮助类。我们将在下一节介绍HTML帮助类。
11.	Can we attach more than one DataAnnotation attribute to same property?
	Yes we can. In that case both validations will fire.
实验14: 自定义服务器端验证
Step 1 – Create Custom Validation
Open Employee.cs file and create a new class Called FirstNameValidation inside it as follows. 
public class FirstNameValidation:ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        if (value == null) // Checking for Empty Value
        {
            return new ValidationResult("Please Provide First Name");
        }
        else
        {
            if (value.ToString().Contains("@"))
            {
                return new ValidationResult("First Name should Not contain @");
            }
        }
        return ValidationResult.Success;
    }
}
Note: Creating multiple classes inside single file is never consider as good practice. So in your sample I recommend you to create a new folder called "Validations" in root location and create a new class inside it.
Step 2- Attach it to First Name
Open Employee class and remove the default "Required" attribute from FirstName property and attach FirstNameValidation as follows.
[FirstNameValidation]
public string FirstName { get; set; }
Step 3 – Execute and Test
Press F5. Navigate to "Employee/AddNew" action.
Note: You may end up with following error.
Day4
目录
Lab 15 – Retaining values on Validation Error
Talk on Lab 15
Lab 16 – Adding Client side validation
Talk on Lab 16
Lab 17 – Adding Authentication
Talk on Lab 17
Lab 18 – Display UserName in the view
Lab 19 – Implement Logout
Lab 20 – Implementing validation in Login Page
Lab 21 – Implementing Client side validation in Login Page
Talk on Lab 21
实验15: 有关错误验证的保留值
Step 1 - Create CreateEmployeeViewModel
	Create a new class in ViewModel folder as follows.
public class CreateEmployeeViewModel
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Salary { get; set; }
}
Step 2 – Change SaveEmployee action method
	For repopulation we will simply reuse the Employee object created by Model Binder. Change SaveEmployee Action method as follows.
public ActionResult SaveEmployee(Employee e, string BtnSubmit)
{
    switch (BtnSubmit)
    {
        case "Save Employee":
            if (ModelState.IsValid)
            {
                EmployeeBusinessLayer empBal = new EmployeeBusinessLayer();
                empBal.SaveEmployee(e);
                return RedirectToAction("Index");
            }
            else
            {
                CreateEmployeeViewModel vm = new CreateEmployeeViewModel();
                vm.FirstName = e.FirstName;
                vm.LastName = e.LastName;
                if (e.Salary.HasValue)
                {
                    vm.Salary = e.Salary.ToString();                        
                }
                else
                {
                    vm.Salary = ModelState["Salary"].Value.AttemptedValue;                       
                }
                return View("CreateEmployee", vm); // Day 4 Change - Passing e here
            }
        case "Cancel":
            return RedirectToAction("Index");
    }
    return new EmptyResult();
}
Step 3 – Repopulate values in View
	Step 3.1 Make View a strongly typed view
	Put following code in the top of CreateEmployee View.
@using WebApplication1.ViewModels
@model CreateEmployeeViewModel
	Step 3.2 Display values in corresponding controls from Model
...
...
...
<input type="text" id="TxtFName" name="FirstName" value="@Model.FirstName" />
...
...
...
<input type="text" id="TxtLName" name="LastName" value="@Model.LastName" />
...
...
...
<input type="text" id="TxtSalary" name="Salary" value="@Model.Salary" />
...
...
...
Step 4 – Execute and Test
	Press F5 and execute the application. Navigate to the AddNew screen by clicking "Add New" link.
Step 5 – Change AddNew Action method
public ActionResult AddNew()
{
    return View("CreateEmployee", new CreateEmployeeViewModel());
}
Step 6 – Execute and Test
	Press F5 and execute the application.
	Test 1
•	Navigate to the AddNew screen by clicking "Add New" link.
•	Keep First Name Empty
•	Put Salary as 56.
•	Click "Save Employee" button.
	It will make two validations fail
	As you can see 56 is maintained in Salary Textbox.
	As you can see FirstName and LastName textbox values are maintained.
Strange thing is Salary is not maintaining. We discuss the reason and solution for it in the end of the lab.
Talk on lab 15
1.	是否是真的将值保留？
不是，是从post数据中重新获取的。
2.	为什么需要在初始化请求时，在Add New 方法中传递 new CreateEmployeeViewModel()？
因为在View中，试着将Model中的数据重新显示在文本框中。如：
<input id="TxtSalary" name="Salary" type="text" value="@Model.Salary" />
如上所示，正在访问当前Model的"First Name"属性，如果Model 为空，会抛出类无法实例化的异常"Object reference not set to an instance of the class"。
当点击"Add New"超链接时，请求会通过Action方法中的AddNew处理，早些时候在该Action方法中，我们没有传递任何数据。也就是，View中的Model属性为空。因此会抛出"Object reference not set to an instance of the class"异常。为了解决此问题，所以会在初始化请求时，传"new CreateEmployeeViewModel()"。
3.	上述的这些功能，有什么方法可以自动生成？
使用HTML帮助类就可以实现。
实验16: 添加客户端验证
	首先了解，需要验证什么？
1. FirstName 不能为空
2. LastName字符长度不能大于5
3. Salary不能为空，且应该为数字类型
4. FirstName 不能包含@字符
	接下来，实现客户端验证功能
1. 创建JavaScript 验证文件
在Script文件下，新建JavaScript文件，命名为"Validations.js"
2. 创建验证函数
function IsFirstNameEmpty() {
    if (document.getElementById('TxtFName').value == "") {
        return 'First Name should not be empty';
    }
    else { return ""; }
}
function IsFirstNameInValid() {    
    if (document.getElementById('TxtFName').value.indexOf("@") != -1) {
        return 'First Name should not contain @';
    }
    else { return ""; }
}
function IsLastNameInValid() {
    if (document.getElementById('TxtLName').value.length>=5) {
        return 'Last Name should not contain more than 5 character';
    }
    else { return ""; }
}
function IsSalaryEmpty() {
    if (document.getElementById('TxtSalary').value=="") {
        return 'Salary should not be empty';
    }
    else { return ""; }
}
function IsSalaryInValid() {
    if (isNaN(document.getElementById('TxtSalary').value)) {
        return 'Enter valid salary';
    }
    else { return ""; }
}
function IsValid() {
    var FirstNameEmptyMessage = IsFirstNameEmpty();
    var FirstNameInValidMessage = IsFirstNameInValid();
    var LastNameInValidMessage = IsLastNameInValid();
    var SalaryEmptyMessage = IsSalaryEmpty();
    var SalaryInvalidMessage = IsSalaryInValid();

    var FinalErrorMessage = "Errors:";
    if (FirstNameEmptyMessage != "")
        FinalErrorMessage += "\n" + FirstNameEmptyMessage;
    if (FirstNameInValidMessage != "")
        FinalErrorMessage += "\n" + FirstNameInValidMessage;
    if (LastNameInValidMessage != "")
        FinalErrorMessage += "\n" + LastNameInValidMessage;
    if (SalaryEmptyMessage != "")
        FinalErrorMessage += "\n" + SalaryEmptyMessage;
    if (SalaryInvalidMessage != "")
        FinalErrorMessage += "\n" + SalaryInvalidMessage;

    if (FinalErrorMessage != "Errors:") {
        alert(FinalErrorMessage);
        return false;
    }
    else {
        return true;
    }
}
3. 在 "CreateEmployee" View 中添加 Validations.js文件引用：
<script src="~/Scripts/Validations.js"></script>
4. 在点击 SaveEmployee按钮时，调用验证函数，如下：
<input type="submit" name="BtnSubmit" value="Save Employee" onclick="return IsValid();" />
5. 运行测试
Talk on lab 16
1.	为什么在点击 "SaveEmployee" 按钮时，需要返回关键字？
如之前实验9讨论的，当点击提交按钮时，是给服务器发送请求，客户端验证失败对服务器请求没有意义。通过在提交按钮的onclick事件中添加 "return false" 代码，可以取消默认的服务器请求。此时IsValid函数将返回false，表示验证失败来实现预期的功能。
2.	除了提示用户，是否可以在当前页面显示错误信息？
可以，只需要为每个错误创建span 标签，默认设置为不可见，当提交按钮点击时，如果验证失败，使用JavaScript修改错误的可见性。
3.	自动获取客户端验证还有什么方法？
是，当使用Html 帮助类，可根据服务端验证来获取自动客户端验证，在以后会详细讨论。
4.	服务器端验证必须使用吗？
当某些人禁用JavaScript脚本时，服务器端验证能确保任何数据有效。
实验17: 添加授权认证
	先来了解ASP.NET是如何进行Form认证的。
1.终端用户在浏览器的帮助下，发送Form认证请求。
2.浏览器会发送存储在客户端的所有相关的用户数据。
3.当服务器端接收到请求时，服务器会检测请求，查看是否存在 "Authentication Cookie" 的Cookie。
4.如果查找到认证Cookie，服务器会识别用户，验证用户是否合法。
5.如果未找到"Authentication Cookie"，服务器会将用户作为匿名（未认证）用户处理，在这种情况下，如果请求的资源标记着 protected/secured，用户将会重定位到登录页面。
1. 创建 AuthenticationController 和 Login 行为方法
右击controller文件夹，选择添加新Controller，新建并命名为"Authentication"即Controller的全称为"AuthenticationController"。新建Login action方法：
public class AuthenticationController : Controller
{
    // GET: Authentication
    public ActionResult Login()
    {
        return View();
    }
}
2. 创建Model
在Model 文件夹下新建Model，命名为 UserDetails。
namespace WebApplication1.Models
{
    public class UserDetails
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
3.  创建Login View
在"~/Views/Authentication"文件夹下，新建View命名为Login，并将UserDetails转换为强View类型。在View中添加以下代码：
@model WebApplication1.Models.UserDetails
@{
    Layout = null;
}
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width" />
    <title>Login</title>
</head>
<body>
    <div>
        @using (Html.BeginForm("DoLogin", "Authentication", FormMethod.Post))
        {
            @Html.LabelFor(c=>c.UserName)
            @Html.TextBoxFor(x=>x.UserName)
            <br />
            @Html.LabelFor(c => c.Password)
            @Html.PasswordFor(x => x.Password)
            <br />
            <input type="submit" name="BtnSubmit" value="Login" />
        }
    </div>
</body>
</html>
在上述代码中可以看出，使用HtmlHelper类在View中替代了纯HTML代码。
View中可使用"Html"调用HtmlHelper类
HtmlHelper类函数返回html字符串
示例1:
@Html.TextBoxFor(x=>x.UserName)
转换为HTML代码
<input id="UserName" name="UserName" type="text" value="" />
示例2：
@using (Html.BeginForm("DoLogin", "Authentication", FormMethod.Post))
{
}
转换为HTML代码：
<form action="/Authentication/DoLogin" method="post">
</form>
4. 运行测试
输入Login action方法的URL："http://localhost:8870/Authentication/Login"
5. 实现Form认证
打开 Web.config文件，在System.Web部分，找到Authentication的子标签。如果不存在此标签，就在文件中添加Authentication标签。设置Authentication的Mode为Forms，loginurl设置为"Login"方法的URL.
<authentication mode="Forms">
    <forms loginurl="~/Authentication/Login"></forms>
</authentication>
6. 让Action方法更安全
在Index action方法中添加认证属性 [Authorize].
[Authorize]
public ActionResult Index()
{
EmployeeListViewModel employeeListViewModel = new EmployeeListViewModel();
......
}
7. 运行测试
	输入 EmployeeController的Index action的URL："http://localhost:8870/Employee/Index"
对于Index action的请求会自动重链接到 login action。
8. 创建业务层功能
打开 EmployeeBusinessLayer 类，新建 IsValidUser方法：
public bool IsValidUser(UserDetails u)
{
    if (u.UserName == "Admin" && u.Password == "Admin")
    {
        return true;
    }
    else
    {
        return false;
    }
}
9. 创建 DoLogin action方法
打开 AuthenticationController 类，新建action 方法命名为 DoLogin。当点击登录时，Dologin action 方法会被调用。
Dologin 方法的功能：
通过调用业务层功能检测用户是否合法。
如果是合法用户，创建认证Cookie。可用于以后的认证请求过程中。
如果是非法用户，给当前的ModelState添加新的错误信息，将错误信息显示在View中。
[HttpPost]
public ActionResult DoLogin(UserDetails u)
{
    EmployeeBusinessLayer bal = new EmployeeBusinessLayer();
    if (bal.IsValidUser(u))
    {
        FormsAuthentication.SetAuthCookie(u.UserName, false);
        return RedirectToAction("Index", "Employee");
    }
    else
    {
        ModelState.AddModelError("CredentialError", "Invalid Username or Password");
        return View("Login");
    }
}
Let’s understand the above code block.
If you remember in "Day 3 – Lab 13" we spoke about ModelState and understood that it encapsulates current state of the model. It contains all the errors related to current model. In above code snippet we are adding a new error when user is an invalid user (new error with key "CredentialError" and message "Invalid Username or Password").
FormsAuthentication.SetAuthCookie will create a new cookie in client's machine.
10.在View 中显示信息
打开Login View，在 @Html.BeginForm中 添加以下代码
@Html.ValidationMessage("CredentialError", new {style="color:red;" })
@using (Html.BeginForm("DoLogin", "Authentication", FormMethod.Post))
{
    ……
}
11. 运行测试
对于Index action的请求会自动重链接到 login action。
8. 创建业务层功能
打开 EmployeeBusinessLayer 类，新建 IsValidUser方法：
public bool IsValidUser(UserDetails u)
{
    if (u.UserName == "Admin" && u.Password == "Admin")
    {
        return true;
    }
    else
    {
        return false;
    }
}
9. 创建 DoLogin action方法
打开 AuthenticationController 类，新建action 方法命名为 DoLogin。当点击登录时，Dologin action 方法会被调用。
Dologin 方法的功能：
通过调用业务层功能检测用户是否合法。
如果是合法用户，创建认证Cookie。可用于以后的认证请求过程中。
如果是非法用户，给当前的ModelState添加新的错误信息，将错误信息显示在View中。
[HttpPost]
public ActionResult DoLogin(UserDetails u)
{
    EmployeeBusinessLayer bal = new EmployeeBusinessLayer();
    if (bal.IsValidUser(u))
    {
        FormsAuthentication.SetAuthCookie(u.UserName, false);
        return RedirectToAction("Index", "Employee");
    }
    else
    {
        ModelState.AddModelError("CredentialError", "Invalid Username or Password");
        return View("Login");
    }
}
Let’s understand the above code block.
If you remember in "Day 3 – Lab 13" we spoke about ModelState and understood that it encapsulates current state of the model. It contains all the errors related to current model. In above code snippet we are adding a new error when user is an invalid user (new error with key "CredentialError" and message "Invalid Username or Password").
FormsAuthentication.SetAuthCookie will create a new cookie in client's machine.
10.在View 中显示信息
打开Login View，在 @Html.BeginForm中 添加以下代码
@Html.ValidationMessage("CredentialError", new {style="color:red;" })
@using (Html.BeginForm("DoLogin", "Authentication", FormMethod.Post))
{
    ……
}
11. 运行测试
1.	FormsAuthentication.SetAuthCookie是必须写的吗？
是必须写的。让我们了解一些小的工作细节。
客户端通过浏览器给服务器发送请求。当通过浏览器生成后，所有相关的Cookies也会随着请求一起发送。
服务器接收请求后，准备响应。请求和响应都是通过HTTP协议传输的，HTTP是无状态协议。每个请求都是新请求，因此当同一客户端发出二次请求时，服务器无法识别，为了解决此问题，服务器会在准备好的请求包中添加一个Cookie，然后返回。
当客户端的浏览器接收到带有Cookie的响应，会在客户端创建Cookies。
如果客户端再次给服务器发送请求，服务器就会识别。
FormsAuthentication.SetAuthCookie将添加"Authentication"这个特殊的Cookie来响应。
2.	是否意味着没有Cookies，FormsAuthentication将不会有作用？
不是的，可以使用URI代替Cookie。打开Web.Config文件，修改Authentication/Forms部分：
<forms cookieless="UseUri" loginurl="~/Authentication/Login"></forms>

授权的Cookie会使用URL传递。
通常情况下，Cookieless属性会被设置为"AutoDetect"，表示认证工作是通过不支持URL传递的Cookie完成的。
1.	FormsAuthentication.SetAuthCookie中第二个参数"false"表示什么？
false决定了是否创建永久有用的Cookie。临时Cookie会在浏览器关闭时自动删除，永久Cookie不会被删除。可通过浏览器设置或是编写代码手动删除。
2.	当凭证错误时，UserName 文本框的值是如何被重置的？
HTML帮助类会从Post数据中获取相关值并重置文本框的值。这是使用HTML 帮助类的一大优势。
3.	What does Authorize attribute do?
In Asp.net MVC there is a concept called Filters. Which will be used to filter out requests and response. There are four kind of filters. We will discuss each one of them in our 7 days journey. Authorize attribute falls under Authorization filter. It will make sure that only authenticated requests are allowed for an action method.
4.	Can we attach both HttpPost and Authorize attribute to same action method?
Yes we can.
5.	Why there is no ViewModel in this example?
As per the discussion we had in Lab 6, View should not be connected to Model directly. We must always have ViewModel in between View and Model. It doesn't matter if view is a simple "display view" or "data entry view", it should always connected to ViewModel. Reason for not using ViewModel in our project is simplicity. In real time project I strongly recommend you to have ViewModel everywhere.
6.	需要为每个Action方法添加授权属性吗？
不需要，可以将授权属性添加到Controller级别或 Global级别。When attached at controller level, it will be applicable for all the action methods in a controller. When attached at Global level, it will be applicable for all the action method in all the controllers.
	Controller Level
[Authorize]
public class EmployeeController : Controller
{
....
Global level
	Step 1 - Open FilterConfig.cs file from App_start folder.
	Step 2 - Add one more line RegisterGlobalFilters as follows.
public static void RegisterGlobalFilters(GlobalFilterCollection filters)
{
    filters.Add(new HandleErrorAttribute());//Old line
    filters.Add(new AuthorizeAttribute());//New Line
}
	Step 3 - Attach AllowAnonymous attribute to Authentication controller.
[AllowAnonymous]
public class AuthenticationController : Controller
{
	Step 4 – Execute and Test the application in the same way we did before.
7.	Why AllowAnonymous attribute is required for AuthenticationController?
We have attached Authorize filter at global level. That means now everything is protected including Login and DoLogin action methods. AllowAnonymous opens action method for non-authenticated requests.
8.	How come this RegisterGlobalFilters method inside FilterConfig class invoked?
It was invoked in Application_Start event written inside Global.asax file.
实验18: 在View中显示UserName
在本实验中，我们会在View中显示已登录的用户名
1. 在ViewModel中添加 UserName
打开 EmployeeListViewModel，添加属性：UserName。
public class EmployeeListViewModel
{
    public List<EmployeeViewModel><employeeviewmodel> Employees { get; set; }
    public string UserName { get; set; }
}
2. 给 ViewModel UserName 设置值
修改 EmployeeController，修改 Index 方法。
public ActionResult Index()
{
    EmployeeListViewModel employeeListViewModel = new EmployeeListViewModel();
    employeeListViewModel.UserName = User.Identity.Name; //New Line
    ......
}
3.  显示 View UserName
Open Index.cshtml view and display UserName as follows.
<body>
  <div style="text-align:right"> Hello, @Model.UserName </div>
  <hr />
  <a href="/Employee/AddNew">Add New</a>
  <div>
      <table border="1"><span style="font-size: 9pt;"> </span>
4. 运行
 
实验19: 实现注销功能
1. 创建注销链接，打开Index.cshtml 创建 Logout 链接如下：
<body>
    <div style="text-align:right">Hello, @Model.UserName
    <a href="/Authentication/Logout">Logout</a></div>
    <hr />
    <a href="/Employee/AddNew">Add New</a>
    <div>
        <table border="1">
2. 创建Logout Action方法
打开 AuthenticationController添加新的Logout action方法：
public ActionResult Logout()
{
    FormsAuthentication.SignOut();
    return RedirectToAction("Login");
}
3.  运行
 
实验20: 实现登录页面验证
1. 添加 data annotation
打开  UserDetails.cs，添加Data Annotation：
public class UserDetails
{
    [StringLength(7, MinimumLength=2, ErrorMessage = "UserName length should be between 2 and 7")]
    public string UserName { get; set; }
    public string Password { get; set; }
}
2. 在View 中显示错误信息
修改 Login.cshtml能够提示错误信息。
@using (Html.BeginForm("DoLogin", "Authentication", FormMethod.Post))
{
    @Html.LabelFor(c=>c.UserName)
    @Html.TextBoxFor(x=>x.UserName)
    @Html.ValidationMessageFor(x=>x.UserName)
    ......
Note: This time instead of Html.ValidationMessage we have used Html.ValidationMessageFor. Both will do same thing. Html.ValidationMessageFor can be used only when the view is strongly typed view.
3. 修改 DoLogin
修改 DoLogin action 方法：
[HttpPost]
public ActionResult DoLogin(UserDetails u)
{
    if (ModelState.IsValid)
    {
        EmployeeBusinessLayer bal = new EmployeeBusinessLayer();
        if (bal.IsValidUser(u))
        {
            FormsAuthentication.SetAuthCookie(u.UserName, false);
            return RedirectToAction("Index", "Employee");
        }
        else
        {
            ModelState.AddModelError("CredentialError", "Invalid Username or Password");
            return View("Login");
        }
    }
    else
    {
        return View("Login");
    }
}
4.  运行
	Press F5 and execute the application.
 
实验21: 登录页面实现客户端验证
在本实验中介绍另一种方法实现客户端验证
1. 下载 jQuery unobtrusive Validation文件
右击项目，选择"Manage Nuget packages"，点击在线查找"jQuery Unobtrusive"，安装"Microsoft jQuery Unobtrusive Valiadtion"
 
2. 在View中添加 jQuery Validation引用
在Scripts文件中，添加以下 JavaScript文件
jQuery-Someversion.js
jQuery.valiadte.js
jquery.validate.unobtrusive
打开 Login.cshtml，在文件顶部包含这三个js文件：
<script src="~/Scripts/jquery-1.8.0.js"></script>
<script src="~/Scripts/jquery.validate.js"></script>
<script src="~/Scripts/jquery.validate.unobtrusive.js"></script>
3. 运行
 
Talk on lab 21
1.	客户端验证是如何实现的？
如上所述，客户端验证并不是很麻烦，在Login View中，HTML元素能够使用帮助类来生成，Helper 函数能够根据Data Annotation属性的使用生成带有属性的HTML标记元素。例如：
@Html.TextBoxFor(x=>x.UserName)
@Html.ValidationMessageFor(x=>x.UserName)
根据以上代码生成的HTML 代码如下：
<input data-val="true" data-val-length="UserName length should be between 2 and 7" data-val-length-max="7" data-val-length-min="2" id="UserName" name="UserName" type="text" value="" />
<span class="field-validation-error" data-valmsg-for="UserName" data-valmsg-replace="true"> </span>
jQuery Unobtrusive验证文件会使用这些自定义的HTML 属性，验证会在客户端自动生成。自动进行客户端验证是使用HTML 帮助类的又一大好处。
2.	What is unobtrusive JavaScript means?
	This is what Wikipedia says about it.
Unobtrusive JavaScript is a general approach to the use of JavaScript in web pages. Though the term is not formally defined, its basic principles are generally understood to include:
•	Separation of functionality (the "behaviour layer") from a Web page's structure/content and presentation
•	Best practices to avoid the problems of traditional JavaScript programming (such as browser inconsistencies and lack of scalability)
•	Progressive enhancement to support user agents that may not support advanced JavaScript functionality
	Let me define it in layman terms.
	"Write your JavaScript in such way that, JavaScript won’t be tightly connected to HTML. JavaScript may access DOM elements, JavaScript may manipulate DOM elements but won’t directly connected to it."
	In the above example, jQuery Unobtrusive JavaScript simply used some input element attributes and implemented client side validation.
3.	是否可以使用不带HTML帮助类的JavaScript验证？
是，可手动添加属性。
4.	What is more preferred, Html helper functions or pure HTML?
I personally prefer pure HTML because Html helper functions once again take "full control over HTML" away from us and we already discussed the problems with that.
Secondly let's talk about a project where instead of jQuery some other JavaScript frameworks/librariesare used. Some other framework like angular. In that case mostly we think about angular validation and in that case these custom HTML validation attributes will go invain.
Day5
目录
Lab 22 - Add Footer
Talk on Lab 22
Lab 23 – Implementing Role based security
Part 1
Part 2
Talk on Lab 23
Lab 24 - Assignment Lab – Handle CSRF attack
Lab 25 – Implement Consistent look across project
Talk on Lab 25
Lab 26 – Making Header and FooterData code more efficient with Action Filter
实验22: 添加页脚
在本实验中，我们会在Employee 页面添加页脚，通过本实验理解分部视图。什么是"分部视图"？
从逻辑上看，分部视图是一种可重用的视图，不会直接显示，包含于其他视图中，作为其视图的一部分来显示。用法与用户控件类似，但不需要编写后台代码。
1. 创建分部视图的 ViewModel
右击 ViewModel 文件夹，新建 FooterViewModel 类，如下：
public class FooterViewModel
{
   public string CompanyName { get; set; }
   public string Year { get; set; }
}
2. 创建分部视图
右击 "~/Views/Shared" 文件夹，选择添加->视图。
 
输入View名称"Footer"，选择复选框"Create as a partial view"，点击添加按钮。
注意：View中的Shared共享文件夹是每个控制器都可用的文件夹，不是某个特定的控制器所属。
3. 在分部View中显示数据
打开Footer.cshtml，输入以下HTML代码。
@using WebApplication1.ViewModels
@model FooterViewModel
<div style="text-align:right;background-color: silver;color: darkcyan;border: 1px solid gray;margin-top:2px;padding-right:10px;">
   @Model.CompanyName &copy; @Model.Year
</div>
4.  在Main ViewModel中包含Footer数据
打开 EmployeeListViewModel 类，添加新属性，保存 Footer数据，如下：
public class EmployeeListViewModel
{
    public List<EmployeeViewModel> Employees { get; set; }
    public string UserName { get; set; }
    public FooterViewModel FooterData { get; set; }//New Property
}
在本实验中Footer会作为Index View的一部分显示，因此需要将Footer的数据传到Index View页面中。Index View 是EmployeeListViewModel的强类型View，因此Footer需要的所有数据都应该封装在EmployeeListViewModel中。
5. 设置Footer数据
打开 EmployeeController，在Index action方法中设置FooterData属性值，如下：
public ActionResult Index()
{
    ...
    ...
    employeeListViewModel.FooterData = new FooterViewModel();
    employeeListViewModel.FooterData.CompanyName = "StepByStepSchools";//Can be set to dynamic value
    employeeListViewModel.FooterData.Year = DateTime.Now.Year.ToString();
    return View("Index", employeeListViewModel);
} 
6. 显示Footer
打开Index.cshtml文件，在Table标签后显示Footer分部View，如下：
       </table>
        @{
            Html.RenderPartial("Footer", Model.FooterData);
        }
    </div>
</body>
</html>
7. 运行，打开Index View
 
Talk on lab 22
1.	Html.Partial的作用是什么？与Html.RenderPartial区别是什么？
与Html.RenderPartial作用相同，Html.Partial会在View中用来显示分部View。
This is the syntax
@Html.Partial("Footer", Model.FooterData);
Syntax is much simpler than earlier one.
Html.RenderPartial会将分部View的结果直接写入HTTP响应流中，而 Html.Partial会返回 MvcHtmlString值。
2.	什么是MvcHtmlString，为什么 Html.Partial返回的是MvcHtmlString 而不是String？
根据MSDN规定，"MvcHtmlString"代表了一个不应该再被二次编码的HTML编码的字符串。举个例子：
@{
   string MyString = "My Simple String";
}
@MyString
以上代码会转换为：<b>My Simple String</b>
Razor显示了全部的内容，许多人会认为已经看到加粗的字符串，是Razor Html在显示内容之前将内容编码，这就是为什么使用纯内容来代替粗体。
当不使用razor编码时，使用 MvcHtmlString，MvcHtmlString是razor的一种表示，即“字符串已经编码完毕，不需要其他编码”。如：
@{
   string MyString = "My Simple String";
}
@MvcHtmlString.Create(MyString)
输出：My Simple String
Why does Html.Partial return MvcHtmlString instead of string?
We already understood a fact that "razor will always encode strings but it never encodes MvcHtmlString". It doesn't make sense if Partial View contents are considered as pure string gets displayed as it is. We want it to be considered as a HTML content and for that we have to stop razor from encoding thus Partial method is designed to return MvcHtmlString.
3.	What is recommended Html.RenderPartial or Html.Partial?
Html.RenderPartial is recommended because it is faster.
4.	When Html.Partial will be preferred?
It is recommended when we want to change the result returned by Partial View before displaying.
Open Index.cshtml and open Footer code to below code and test.
@{
    MvcHtmlString result = Html.Partial ("Footer", Model.FooterData);
    string finalResult = result.ToHtmlString().Replace("2015", "20000");            
}
@MvcHtmlString.Create(finalResult)
Now footer will look like below.
 
5.	Why Partial View is placed inside Shared Folder?
Partial Views are meant for reusability hence the best place for them is Shared folder.
6.	Can't we place Partial Views inside a specific controller folder, like Employee or Authentication?
We can do that but in that case it won't be available to only specific controller.
Example: When we keep Partial View inside Employee folder it won't be available for AuthenticationController or to Views related to AuthenticationController.
7.	Why definition of Partial View contains word "Logically" ?
In definition we have said that Partial View is a reusable view but it won't get executed by its own. It has to be placed in some other view and then displayed as a part of the view.
What we said about reusability is completely true but what we said about execution is only true logically. Technically it's not a correct statement. We can create an action method which will return a ViewResult as bellow.
public ActionResult MyFooter()
{
    FooterViewModel FooterData = new FooterViewModel();
    FooterData.CompanyName = "StepByStepSchools";//Can be set to dynamic value
    FooterData.Year = DateTime.Now.Year.ToString();
    return View("Footer", FooterData);
}
It will display following output
 
Although logically it doesn't make sense, technically it's possible. Footer.cshtml won't contain properly structured HTML. It meant to be displayed as a part of some other view. Hence I said "Logically it doesn't make sense".
8.	Why Partial View is created instead of putting footer contents directly in the view ?
Two advantages
1.	Reusability – we can reuse the same Partial View in some other View.
2.	Code Maintenance – Putting it in a separate file makes it easy to manage and manipulate.
9.	Why Header is not created as Partial View?
As a best practice we must create Partial View for header also but to keep Initial labs simpler we had kept it inline.
实验23: 实现用户角色管理
在实验23中我们将实现管理员和非管理员登录的功能。需求很简单：非管理员用户没有创建新Employee的权限。实验23会帮助大家理解MVC提供的Session 和Action过滤器。
因此我们将实验23分为两部分：
第一部分：非管理员用户登录时，隐藏 Add New 链接
1.	创建标识用户身份的枚举类型
右击Model 文件夹，选择添加新项目。选择"Code File"选项。
 
输入"UserStatus"名，点击添加。"Code File"选项会创建一个".cs"文件．创建UserStatus枚举类型，如下：
namespace WebApplication1.Models
{
    public enum UserStatus
    {
        AuthenticatedAdmin,
        AuthentucatedUser,
        NonAuthenticatedUser
    }
}
2.	修改业务层功能
删除IsValidUser函数，创建新函数"GetUserValidity"，如下：
public UserStatus GetUserValidity(UserDetails u)
{
    if (u.UserName == "Admin" && u.Password == "Admin")
    {
        return UserStatus.AuthenticatedAdmin;
    }
    else if (u.UserName == "Sukesh" && u.Password == "Sukesh")
    {
        return UserStatus.AuthentucatedUser;
    }
    else
    {
        return UserStatus.NonAuthenticatedUser;
    }
}
3.	修改DoLogin action方法
打开 AuthenticationController，修改DoLogin action:
[HttpPost]
public ActionResult DoLogin(UserDetails u)
{
    if (ModelState.IsValid)
    {
        EmployeeBusinessLayer bal = new EmployeeBusinessLayer();
        //New Code Start
        UserStatus status = bal.GetUserValidity(u);
        bool IsAdmin = false;
        if (status==UserStatus.AuthenticatedAdmin)
        {
            IsAdmin = true;
        }
        else if (status == UserStatus.AuthentucatedUser)
        {
            IsAdmin = false;
        }
        else
        {
            ModelState.AddModelError("CredentialError", "Invalid Username or Password");
            return View("Login");
        }
        FormsAuthentication.SetAuthCookie(u.UserName, false);
        Session["IsAdmin"] = IsAdmin;
        return RedirectToAction("Index", "Employee");
        //New Code End
    }
    else
    {
        return View("Login");
    }
}
在上述代码中，已经出现Session 变量来识别用户身份。
什么是Session？
Session是Asp.Net的特性之一，可以在MVC中重用，可用于暂存用户相关数据，session变量周期是穿插于整个用户生命周期的。
4.	移除存在的 AddNew 链接
打开"~/Views/Employee"文件夹下 Index.cshtml View，移除"Add New"超链接。
<!-- Remove following line from Index.cshtml -->
<a href="/Employee/AddNew">Add New</a>
5.	创建分部View
右击"~/Views/Employee"文件夹，选择添加View，设置View名称"AddNewLink"，选中"Create a partial View"复选框。
 
6.	输入分部View的内容
在新创建的分部视图中输入以下内容：
<a href="/Employee/AddNew">Add New</a>
7.	新建 Action 方法
打开 EmployeeController，新建Action方法"GetAddNewLink"，如下：
public ActionResult GetAddNewLink()
{
    if (Convert.ToBoolean(Session["IsAdmin"]))
    {
        return Partial View("AddNewLink");
    }
    else
    {
        return new EmptyResult();
    }
}
8.	显示  AddNew 链接
打开 Index.html，输入以下代码：
<a href="/Authentication/Logout">Logout</a>
</div>
<hr />
@{
  Html.RenderAction("GetAddNewLink");
}
<div>
<table border="1">
<tr>
Html.RenderAction 执行Action 方法，并将结果直接写入响应流中。
9.	运行
测试1
 
测试2
 
第二部分： 直接URL 安全
以上实验实现了非管理员用户无法导航到AddNew链接。这样还不够，如果非管理员用户直接输入AddNew URL，则会直接跳转到此页面。
 
非管理员用户还是可以直接访问AddNew方法，为了解决这个问题，我们会引入MVC action 过滤器。Action 过滤器使得在action方法中添加一些预处理和后处理的逻辑判断问题。在整个实验中，会注重ActionFilters预处理的支持和后处理的功能。
1.	安装过滤器
新建文件夹Filters，新建类"AdminFilter"。
 
2.	创建过滤器
通过继承 ActionFilterAttribute，将 AdminFilter类升级为"ActionFilter"，如下：
public class AdminFilter:ActionFilterAttribute
{

}
注意：使用"ActionFilterAttribute"需要在文件顶部输入"System.Web.Mvc"。
3.	添加安全验证逻辑
在ActionFliter中重写 OnActionExecuting方法：
public override void OnActionExecuting(ActionExecutingContext filterContext)
{
    if (!Convert.ToBoolean(filterContext.HttpContext.Session["IsAdmin"]))
    {
        filterContext.Result = new ContentResult()
        {
            Content="Unauthorized to access specified resource."
        };
    }
}
4.	绑定过滤器
在AddNew和 SaveEmployee方法中绑定过滤器，如下：
[AdminFilter]
public ActionResult AddNew()
{
    return View("CreateEmployee",new Employee());
}
...
...
[AdminFilter]
public ActionResult SaveEmployee(Employee e, string BtnSubmit)
{
    switch (BtnSubmit)
    {
        case "Save Employee":
            if (ModelState.IsValid)
            {
                EmployeeBusinessLayer empBal = new EmployeeBusinessLayer();
	....
	....
5.	运行
 
Note: Whatever strategy and logic we have used in this lab for implementing Role based security may not be the best solution. You may have some better logic to implement such behaviour. It’s just one of the way to achieve it.
Talk on Lab 23
1.	可以通过浏览器直接调用GetAddNewLink方法吗？
可以直接调用，也可以禁止直接运行"GetAddNewLink"。
For that decorate GetAddNewLink with ChildActionOnly attribute.
[ChildActionOnly]
public ActionResult GetAddNewLink()
{
    if (Convert.ToBoolean(Session["IsAdmin"]))
    {
2.	Html.Action有什么作用？
与Html.RenderAction作用相同，Html.Action会执行action 方法，并在View中显示结果。语法：
@Html.Action("GetAddNewLink");
Syntax is much simpler than earlier one.
3.	Html.RenderAction 和 Html.Action两者之间有什么不同？更推荐使用哪种方法？
Html.RenderAction会将Action 方法的执行结果直接写入HTTP 响应请求流中，而 Html.Action会返回MVCHTMLString。更推荐使用Html.RenderAction，因为它更快。当我们想在显示前修改action执行的结果时，推荐使用Html.Action。
4.	什么是 ActionFilter ?
与AuthorizationFilter类似，ActionFilter是ASP.NET MVC过滤器中的一种，允许在action 方法中添加预处理和后处理逻辑。
实验24: Assignment Lab – Handle CSRF attack
From safety point of view we must also handle CSRF attacks to the project. This one I will leave to you guys.
I recommend you to read this article and implement same to our SaveEmployee action method.
http://www.codeproject.com/Articles/994759/What-is-CSRF-attack-and-how-can-we-prevent-the-sam
实验25: 实现项目外观的一致性
在ASP.NET能够保证外观一致性的是母版页的使用。MVC却不同于ASP.NET，在RAZOR中，母版页称为布局页面。
在开始实验之前，首先来了解布局页面
1. 带有欢迎消息的页眉
2. 带有数据的页脚
最大的问题是什么？
带有数据的页脚和页眉作为ViewModel的一部分传从Controller传给View。

![x](./Resource/6.jpg)


现在最大的问题是在页眉和页脚移动到布局页面后，如何将数据从View传给Layout页面。
解决方案——继承
可使用继承原则，通过实验来深入理解。
1. 创建ViewModel基类
在ViewModel 文件夹下新建ViewModel 类 "BaseViewModel"，如下：
public class BaseViewModel
{
    public string UserName { get; set; }
    public FooterViewModel FooterData { get; set; }//New Property
} 
BaseViewModel封装了布局页所需要的所有值。
2. 准备 EmployeeListViewModel
删除EmployeeListViewModel类的 UserName和 FooterData属性，并继承 BaseViewModel：
public class EmployeeListViewModel:BaseViewModel
{
    public List<EmployeeViewModel> Employees { get; set; }
}
3.  创建布局页面
右击shared文件夹，选择添加>>MVC5 Layout Page。输入名称"MyLayout"，点击确认
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width" />
    <title>@ViewBag.Title</title>
</head>
<body>
    <div>
        @RenderBody()
    </div>
</body>
</html>
4. 将布局转换为强类型布局
@using WebApplication1.ViewModels
@model BaseViewModel
5. 设计布局页面
在布局页面添加页眉，页脚和内容三部分，如下：
<html>
<head>
    <meta name="viewport" content="width=device-width" />
    <title>@RenderSection("TitleSection")</title>
    @RenderSection("HeaderSection",false)
</head>
<body>
    <div style="text-align:right">
        Hello, @Model.UserName
        <a href="/Authentication/Logout">Logout</a>
    </div>
    <hr />
    <div>
    @RenderSection("ContentBody")
    </div>
    @Html.Partial("Footer",Model.FooterData)
</body>
</html>
如上所示，布局页面包含三部分，TitleSection，HeaderSection 和 ContentBody，内容页面将使用这些部分来定义合适的内容。
Note: While defining HeaderSection second parameter is passed. This parameter decides whether it's the optional section or compulsory section. False indicates it's an optional section.
6. 在 Index View中绑定布局页面
打开Index.cshtml,在文件顶部会发现以下代码：
@{
    Layout = null;
}
修改：
@{
    Layout = "~/Views/Shared/MyLayout.cshtml";
}
7.设计Index View
•	从Index View中去除页眉和页脚
•	在Body标签中复制保留的内容，并存放在某个地方。
•	复制Title标签中的内容
•	移除View中所有的HTML 内容，确保只删除了HTML，@model 和layout语句不要动
•	用刚才复制的内容定义TitleSection和 Contentbody
完整的View代码如下：
@using WebApplication1.ViewModels
@model EmployeeListViewModel
@{
    Layout = "~/Views/Shared/MyLayout.cshtml";
}

@section TitleSection{
    MyView
}
@section ContentBody{       
    <div>        
        @{
            Html.RenderAction("GetAddNewLink");
        }
        <table border="1">
            <tr>
                <th>Employee Name</th>
                <th>Salary</th>
            </tr>
            @foreach (EmployeeViewModel item in Model.Employees)
            {
                <tr>
                    <td>@item.EmployeeName</td>
                    <td style="background-color:@item.SalaryColor">@item.Salary</td>
                </tr>
            }
        </table>
    </div>
}
8. 运行
 
9. 在 CreateEmployee 中绑定布局页面
打开 Index.cshtml，修改顶部代码：
@{
    Layout = "~/Views/Shared/MyLayout.cshtml";
}
10. 设计 CreateEmployee View
与第7步中的程序类似，定义 CreateEmployee View中的Section，在本次定义中只添加一项，如下：
@using WebApplication1.Models
@model Employee
@{
    Layout = "~/Views/Shared/MyLayout.cshtml";
}

@section TitleSection{
    CreateEmployee
}

@section HeaderSection{
<script src="~/Scripts/Validations.js"></script>
<script>
    function ResetForm() {
        document.getElementById('TxtFName').value = "";
        document.getElementById('TxtLName').value = "";
        document.getElementById('TxtSalary').value = "";
    }
</script>
}
@section ContentBody{ 
    <div>
        <form action="/Employee/SaveEmployee" method="post" id="EmployeeForm">
            <table>
            <tr>
                <td>
                    First Name:
                </td>
                <td>
                    <input type="text" id="TxtFName" name="FirstName" value="@Model.FirstName" />
                </td>
            </tr>
            <tr>
                <td colspan="2" align="right">
                    @Html.ValidationMessage("FirstName")
                </td>
            </tr>
            <tr>
                <td>
                    Last Name:
                </td>
                <td>
                    <input type="text" id="TxtLName" name="LastName" value="@Model.LastName" />
                </td>
            </tr>
            <tr>
                <td colspan="2" align="right">
                    @Html.ValidationMessage("LastName")
                </td>
            </tr>

            <tr>
                <td>
                    Salary:
                </td>
                <td>
                    <input type="text" id="TxtSalary" name="Salary" value="@Model.Salary" />
                </td>
            </tr>
            <tr>
                <td colspan="2" align="right">
                    @Html.ValidationMessage("Salary")
                </td>
            </tr>

            <tr>
                <td colspan="2">

                    <input type="submit" name="BtnSubmit" value="Save Employee" onclick="return IsValid();" />
                    <input type="submit" name="BtnSubmit" value="Cancel" />
                    <input type="button" name="BtnReset" value="Reset" onclick="ResetForm();" />
                </td>
            </tr>
            </table>
    </div>
}
11. 运行
 
Index View是EmployeeListViewModel类型的强View类型，是 BaseViewModel的子类，这就是为什么Index View可一直发挥作用。CreateEmployee View 是CreateEmployeeViewModel的强类型，并不是BaseViewModel的子类，因此会出现以上错误。
12. 准备 CreateEmployeeViewModel
使CreateEmployeeViewModel 继承 BaseViewModel，如下：
public class CreateEmployeeViewModel:BaseViewModel
{
...
13. 运行
 
报错，该错误好像与步骤11中的错误完全不同，出现这些错误的根本原因是未初始化AddNew action方法中的Header和Footer数据。
14. 初始化Header和Footer 数据
修改AddNew方法：
public ActionResult AddNew()
{
    CreateEmployeeViewModel employeeListViewModel = new CreateEmployeeViewModel();
    employeeListViewModel.FooterData = new FooterViewModel();
    employeeListViewModel.FooterData.CompanyName = "StepByStepSchools";//Can be set to dynamic value
    employeeListViewModel.FooterData.Year = DateTime.Now.Year.ToString();
    employeeListViewModel.UserName = User.Identity.Name; //New Line
    return View("CreateEmployee", employeeListViewModel);
}
15. 初始化 SaveEmployee中的Header和 FooterData
public ActionResult SaveEmployee(Employee e, string BtnSubmit)
{
    switch (BtnSubmit)
    {
        case "Save Employee":
            if (ModelState.IsValid)
            {
                ...
            }
            else
            {
                CreateEmployeeViewModel vm = new CreateEmployeeViewModel();
                ...
                vm.FooterData = new FooterViewModel();
                vm.FooterData.CompanyName = "StepByStepSchools";//Can be set to dynamic value
                vm.FooterData.Year = DateTime.Now.Year.ToString();
                vm.UserName = User.Identity.Name; //New Line
                return View("CreateEmployee", vm); // Day 4 Change - Passing e here
            }
        case "Cancel":
            return RedirectToAction("Index");
    }
    return new EmptyResult();
}
16. 运行
 
Talk on Lab 25
1. RenderBody 有什么作用？
之前创建了Layout 页面，包含一个Razor语句如：
   @Html.RenderBody()
首先我们先来了解RenderBody是用来做什么的？
在内容页面，通常会定义Section(部分)(在Layout(布局)页面声明)。但是奇怪的是，Razor允许在Section外部定义一些内容。所有的非section内容会使用RenderBody函数来渲染，下图能够更好的理解：

![x](./Resource/7.jpg)


2. 布局是否可嵌套？
可以嵌套，创建Layout页面，可使用其他存在的Layout页面，语法相同。
3. 是否需要为每个View定义Layout页面？
可以在View文件夹下发现一个特殊的文件"__ViewStart.cshtml"，在其内部的设置会应用到所有的View。例如：在__ViewStart.cshtml中输入以下代码，会给所有View 设置 Layout页面。
@{
    Layout = "~/Views/Shared/_Layout.cshtml";
}
4. 是否在每个Action 方法中需要加入Header和Footer数据代码？
不需要，可在Action 过滤器的帮助下改进需要重复代码的部分。
5. 是否强制定义所有子View中的Section？
是的，如果Section被声明为必须的(下面示例的第二个参数，默认值为true)。如下
@RenderSection("HeaderSection",false) // Not required
@RenderSection("HeaderSection",true) // required
@RenderSection("HeaderSection") // required
实验26: 使用Action Fliter让Header和Footer数据更有效
在实验23中，我们已经知道了使用 ActionFilter的一个优点，现在来看看使用 ActionFilter的其他好处
1. 删除Action 方法中的冗余代码
删除Index，AddNew，SaveEmployee方法中的Header和Footer数据代码。
需要删除的Header代码会像这样子：
bvm.UserName = HttpContext.Current.User.Identity.Name;
Footer代码会像这样子
bvm.FooterData = new FooterViewModel();
bvm.FooterData.CompanyName = "StepByStepSchools";//Can be set to dynamic value
bvm.FooterData.Year = DateTime.Now.Year.ToString();         
2.创建HeaderFooter过滤器
在Filter文件夹下新建类 "HeaderFooterFilter"，并通过继承ActionFilterAttribute类升级为Action Filter
3. 升级ViewModel
重写 HeaderFooterFilter类的 OnActionExecuted方法，在该方法中获取当前View Model，并绑定Header和Footer数据。
public class HeaderFooterFilter : ActionFilterAttribute
{
    public override void OnActionExecuted(ActionExecutedContext filterContext)
    {
        ViewResult v = filterContext.Result as ViewResult;
        if(v!=null) // v will null when v is not a ViewResult
        {
            BaseViewModel bvm = v.Model as BaseViewModel;
            if(bvm!=null)//bvm will be null when we want a view without Header and footer
            {
                bvm.UserName = HttpContext.Current.User.Identity.Name;
                bvm.FooterData = new FooterViewModel();
                bvm.FooterData.CompanyName = "StepByStepSchools";//Can be set to dynamic value
                bvm.FooterData.Year = DateTime.Now.Year.ToString();            
            }
        }
    }
}
4. 绑定过滤器
在Index中，AddNew，SaveEmployee的action 方法中绑定 HeaderFooterFilter
[HeaderFooterFilter]
public ActionResult Index()
{
    EmployeeListViewModel employeeListViewModel = new EmployeeListViewModel();
    ...
}
...
[AdminFilter]
[HeaderFooterFilter]
public ActionResult AddNew()
{
    CreateEmployeeViewModel employeeListViewModel = new CreateEmployeeViewModel();
    //employeeListViewModel.FooterData = new FooterViewModel();
    //employeeListViewModel.FooterData.CompanyName = "StepByStepSchools";
    ...
}
...
[AdminFilter]
[HeaderFooterFilter]
public ActionResult SaveEmployee(Employee e, string BtnSubmit)
{
    switch (BtnSubmit)
    {
        ...
5. 运行
 
Day6
目录
Lab 27 – Add Bulk upload option
Talk on Lab 27
Problem in the above solution
Solution
Lab 28 – Solve thread starvation problem
Lab 29 – Exception Handling – Display Custom error page
Talk on Lab 29
Understand limitation in above lab
Lab 30 – Exception Handling – Log Exception
Talk on Lab 30
Routing
Understand RouteTable
Understand ASP.NET MVC request cycle
Lab 31 – Implement User friendly URLs
Talk on Lab 31
实验27: 添加批量上传选项
在实验27中，我们将提供一个选项，供用户选择上传Employee记录文件（CSV格式）。
我们会学习以下知识：
1. 如何使用文件上传控件
2. 异步控制器
1. 创建 FileUploadViewModel
在ViewModels文件夹下新建类"FileUploadViewModel"，如下：
public class FileUploadViewModel: BaseViewModel
{
    public HttpPostedFileBase fileUpload {get; set ;}
}
HttpPostedFileBase将通过客户端提供上传文件的访问入口。
2. 创建 BulkUploadController 和Index action 方法
新建 controller "BulkUploadController"，并实现Index Action 方法，如下：
public class BulkUploadController : Controller
{
    [HeaderFooterFilter]
    [AdminFilter]
    public ActionResult Index()
    {
        return View(new FileUploadViewModel());
    } 
}
Index方法与 HeaderFooterFilter 和 AdminFilter属性绑定。HeaderFooterFilter会确保页眉和页脚数据能够正确传递到ViewModel中，AdminFilter限制非管理员用户的访问。
3.创建上传View
创建以上Action方法的View。View名称应为 index.cshtml，且存放在"~/Views/BulkUpload"文件夹下。
4. 设计上传View
在View中输入以下内容：
@using WebApplication1.ViewModels
@model FileUploadViewModel
@{
    Layout = "~/Views/Shared/MyLayout.cshtml";
}

@section TitleSection{
    Bulk Upload
}
@section ContentBody{
    <div> 
    <a href="/Employee/Index">Back</a>
        <form action="/BulkUpload/Upload" method="post" enctype="multipart/form-data">
            Select File : <input type="file" name="fileUpload" value="" />
            <input type="submit" name="name" value="Upload" />
        </form>
    </div>
}
如上，FileUploadViewModel中属性名称与 input[type="file"]的名称类似，都称为"fileUpload"。我们在Model Binder中已经讲述了名称属性的重要性，注意：在表单标签中，有一个额外的属性是加密的，会在实验结尾处讲解。
5. 创建业务层上传方法
在EmployeeBusinessLayer中新建方法UploadEmployees，如下：
public void UploadEmployees(List<Employee> employees)
{
    SalesERPDAL salesDal = new SalesERPDAL();
    salesDal.Employees.AddRange(employees);
    salesDal.SaveChanges();
}
6. 创建Upload Action方法
创建Action方法，并命名为"BulkUploadController"，如下：
[AdminFilter]
public ActionResult Upload(FileUploadViewModel model)
{
    List<Employee> employees = GetEmployees(model);
    EmployeeBusinessLayer bal = new EmployeeBusinessLayer();
    bal.UploadEmployees(employees);
    return RedirectToAction("Index","Employee");
}

private List<Employee> GetEmployees(FileUploadViewModel model)
{
    List<Employee> employees = new List<Employee>();
    StreamReader csvreader = new StreamReader(model.fileUpload.InputStream);
    csvreader.ReadLine(); // Assuming first line is header
    while (!csvreader.EndOfStream)
    {
        var line = csvreader.ReadLine();
        var values = line.Split(',');//Values are comma separated
        Employee e = new Employee();
        e.FirstName = values[0];
        e.LastName = values[1];
        e.Salary = int.Parse(values[2]);
        employees.Add(e);
    }
    return employees;
}
AdminFilter会绑定到Upload action方法中，限制非管理员用户的访问。
7. 创建BulkUpload链接
打开 "Views/Employee"文件夹下的 AddNewLink.cshtml 文件，输入BulkUpload链接，如下：
<a href="/Employee/AddNew">Add New</a>
&nbsp;
&nbsp;
<a href="/BulkUpload/Index">BulkUpload</a>
8.运行
8.1 创建一个样本文件来测试，如图所示
 
8.2 运行，点击BulkUpload链接 
 
选择文件并点击确认
 
Note:
In above example we have not applied any client side or server side validation in the View. It may leads to following error.
"Validation failed for one or more entities. See 'EntityValidationErrors' property for more details."
To find the exact cause for the error, simply add a watch with following watch expression when exception occurs.
((System.Data.Entity.Validation.DbEntityValidationException)$exception).EntityValidationErrors
The watch expression ‘$exception’ displays any exception thrown in the current context, even if it has not been caught and assigned to a variable.
Talk on Lab 27
1. 为什么在实验27中不需要验证？
在该选项中添加客户端和服务器端验证需要读者自行添加的，以下是添加验证的提示：
•	For Server side validation use Data Annotations.
•	For client side either you can leverage data annotation and implement jQuery unobtrusive validation. Obviously this time you have to set custom data attributes manually because we don’t have readymade Htmlhelper method for file input.
Note: If you didn’t understood this point, I recommend you to go through “implanting client side validation in Login view” again.
•	For client side validation you can write custom JavaScript and invoke it on button click. This won’t be much difficult because file input is an input control at the end of the day and its value can be retrieved inside JavaScript and can be validated.
2. 什么是 HttpPostedFileBase？
HttpPostedFileBase will provide the access to the file uploaded by client. Model binder will update the value of all properties FileUploadViewModel class during post request. Right now we have only one property inside FileUploadViewModel and Model Binder will set it to file uploaded by client.
3. 是否会提供多文件的输入控件？
Yes, we can achieve it in two ways.
1.	Create multiple file input controls. Each control must have unique name. Now in FileUploadViewModel class create a property of type HttpPostedFileBase one for each control. Each property name should match with the name of one control. Remaining magic will be done by ModelBinder.
2.	Create multiple file input controls. Each control must have same name. Now instead of creating multiple properties of type HttpPostedFileBase, create one of type List.
Note: Above case is true for all controls. When you have multiple controls with same name ModelBinder update the property with the value of first control if property is simple parameter. ModelBinder will put values of each control in a list if property is a list property.
4. enctype="multipart/form-data"是用来做什么的？
Well this is not a very important thing to know but definitely good to know.This attribute specifies the encoding type to be used while posting data.The default value for this attribute is "application/x-www-form-urlencoded"
Example – Our login form will send following post request to the server
POST /Authentication/DoLogin HTTP/1.1
Host: localhost:8870
Connection: keep-alive
Content-Length: 44
Content-Type: application/x-www-form-urlencoded
...
...
UserName=Admin&Passsword=Admin&BtnSubmi=Login
All input values are sent as one part in the form of key/value pair connected via “&”.
When enctype="multipart/form-data" attribute is added to form tag, following post request will be sent to the server.
POST /Authentication/DoLogin HTTP/1.1
Host: localhost:8870
Connection: keep-alive
Content-Length: 452
Content-Type: multipart/form-data; boundary=----WebKitFormBoundarywHxplIF8cR8KNjeJ
...
...
------WebKitFormBoundary7hciuLuSNglCR8WC
Content-Disposition: form-data; name="UserName"

Admin
------WebKitFormBoundary7hciuLuSNglCR8WC
Content-Disposition: form-data; name="Password"

Admin
------WebKitFormBoundary7hciuLuSNglCR8WC
Content-Disposition: form-data; name="BtnSubmi"

Login
------WebKitFormBoundary7hciuLuSNglCR8WC--
As you can see, form is posted in multiple part. Each part is separated by a boundary defined by Content-Type and each part contain one value.
encType must be set to “multipart/form-data” if form tag contains file input control.
Note: boundary will be generated randomly every time request is made. You may see some different boundary.
1.	为什么有时候需要设置 encType 为 "multipart/form-data"，而有时候不需要设置？
When encType is set to “multipart/form-data”, it will do both the things–Post the data and upload the file. Then why don’t we always set it as “multipart/form-data”.
Answer is, it will also increase the overall size of the request. More size of the request means less performance. Hence as a best practice we should set it to default that is "application/x-www-form-urlencoded".
2.	为什么在实验27中创建ViewModel？
We had only one control in our View. We can achieve same result by directly adding a parameter of type HttpPostedFileBase with name fileUpload in Upload action method Instead of creating a separate ViewModel. Look at the following code.
public ActionResult Upload(HttpPostedFileBase fileUpload)
{
}
Then why we have created a separate class.
Creating ViewModel is a best practice. Controller should always send data to the view in the form of ViewModel and data sent from view should come to controller as ViewModel.
3.	以上解决方法的问题
Did you ever wondered how you get response when you send a request?
Now don't say, action method receive request and blah blah blah!!! 
Although it's the correct answer I was expecting a little different answer.My question is what happen in the beginning.
A simple programming rule – everything in a program is executed by a thread even a request.
In case of Asp.net on the webserver .net framework maintains a pool of threads.Each time a request is sent to the webserver a free thread from the pool is allocated to serve the request. This thread will be called as worker thread.

![x](./Resource/129.jpg)


Worker thread will be blocked while the request is being processed and cannot serve another request.
Now let's say an application receives too many requests and each request will take long time to get completely processed. In this case we may end up at a point where new request will get into a state where there will be no worker thread available to serve that request. This is called as Thread Starvation(饥饿).
In our case sample file had 2 employee records but in real time it may contain thousands or may be lacks of records. It means request will take huge amount of time to complete the processing. It may leads to Thread Starvation.
线程饥饿的解决方法：
Now the request which we had discussed so far is of type synchronous request.
Instead of synchronous if client makes an asynchronous request, problem of thread starvation get solved.
•	In case of asynchronous request as usual worker thread from thread pool get allocated to serve the request.
•	Worker thread initiates the asynchronous operation and returned to thread pool to serve another request. Asynchronous operation now will be continued by CLR thread.
•	Now the problem is, CLR thread can’t return response so once it completes the asynchronous operation it notifies ASP.NET.
•	Webserver again gets a worker thread from thread pool and processes the remaining request and renders the response.
In this entire scenario two times worker thread is retrieved from thread pool. Now both of them may be same thread or they may not be.
Now in our example file reading is an I/O bound operation which is not required to be processed by worker thread. So it’s a best place to convert synchronous requests to asynchronous requests.
1.	异步请求的响应时间能提升吗？
不可以，响应时间是相同的，线程会被释放来服务其他请求。
实验28: 解决线程饥饿问题
在Asp.net MVC中会通过将同步Action方法转换为异步Action方法，将同步请求转换为异步请求。
１. 创建异步控制器
在控制器中将基类 UploadController修改为 AsynController。
public class BulkUploadController : AsyncController
{
２. 转换同步Action方法
该功能通过两个关键字就可实现："async"和 "await"
[AdminFilter]
public async Task<ActionResult> Upload(FileUploadViewModel model)
{
    int t1 = Thread.CurrentThread.ManagedThreadId;
    List<Employee> employees = await Task.Factory.StartNew<List<Employee>>(() => GetEmployees(model));
    int t2 = Thread.CurrentThread.ManagedThreadId;
    EmployeeBusinessLayer bal = new EmployeeBusinessLayer();
    bal.UploadEmployees(employees);
    return RedirectToAction("Index", "Employee");
}
在action方法的开始或结束处，使用变量存储线程ID。
理一下思路：
•	当上传按钮被点击时，新请求会被发送到服务器。
•	Webserver从线程池中产生Worker线程 ，并分配给服务器请求。
•	worker线程会使Action 方法执行
•	Worker方法在 Task.Factory.StartNew方法的辅助下，开启异步操作
•	使用async关键字将Action 方法标记为异步方法，由此会保证异步操作一旦开启，Worker 线程就会释放。
•	使用await关键字也可标记异步操作，能够保证异步操作完成时才能够继续执行下面的代码。
•	一旦异步操作在Action 方法中完成执行，必须执行worker线程。因此webserver将会新建一个空闲worker 线程，并用来服务剩下的请求，提供响应。
3. 测试运行	
运行应用程序，并跳转到BulkUpload页面。会在代码中显示断点，输入样本文件，点击上传。
 
如图所示，在项目启动或关闭时线程ID是不同的。
实验29: 异常处理——显示自定义错误页面
如果一个项目不考虑异常处理，那么可以说这个项目是不完整的。到目前为止，我们已经了解了MVC中的两个过滤器：Action filter和 Authorization filter。现在我们来学习第三个过滤器，异常过滤器（Exception Filters）。
什么是异常过滤器（Exception Filters）？
异常过滤器与其他过滤器的用法相同，可当作属性使用。使用异常过滤器的基本步骤:
1. 使它们可用
2. 将过滤器作为属性，应用到action 方法或控制器中。我们也可以在全局层次使用异常过滤器。
异常过滤器的作用是什么？，是否有自动执行的异常过滤器？
一旦action 方法中出现异常，异常过滤器就会控制程序的运行过程，开始内部自动写入运行的代码。MVC为我们提供了编写好的异常过滤器：HandeError。
当action方法中发生异常时，过滤器就会在 "~/Views/[current controller]" 或 "~/Views/Shared"目录下查找到名称为"Error"的View，然后创建该View的ViewResult，并作为响应返回。
接下来我们会讲解一个Demo，帮助我们更好的理解异常过滤器的使用。
已经实现的上传文件功能，很有可能会发生输入文件格式错误。因此我们需要处理异常。
1. 创建含错误信息的样本文件，包含一些非法值，如图，Salary就是非法值。
 
2. 运行，查找异常，点击上传按钮，选择已建立的样本数据，选择上传。
 
3. 激活异常过滤器
当自定义异常被捕获时，异常过滤器变为可用。为了能够获得自定义异常，打开Web.config文件，在System.Web.Section下方添加自定义错误信息。
<system.web>
   <customErrors mode="On"></customErrors>
4. 创建Error View
在"~/Views/Shared"文件夹下，会发现存在"Error.cshtml"文件，该文件是由MVC 模板提供的，如果没有自动创建，该文件也可以手动完成。
@{
    Layout = null;
}

<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width" />
    <title>Error</title>
</head>
<body>
    <hgroup>
        <h1>Error.</h1>
        <h2>An error occurred while processing your request.</h2>
    </hgroup>
</body>
</html>
5. 绑定异常过滤器
将过滤器绑定到action方法或controller上，不需要手动执行，打开 App_Start folder文件夹中的 FilterConfig.cs文件。在 RegisterGlobalFilters 方法中会看到 HandleError 过滤器已经以全局过滤器绑定成功。
public static void RegisterGlobalFilters(GlobalFilterCollection filters)
{
    filters.Add(new HandleErrorAttribute());//ExceptionFilter
    filters.Add(new AuthorizeAttribute());
}
如果需要删除全局过滤器，那么会将过滤器绑定到action 或controller层，但是不建议这么做，最好是在全局中应用。
[AdminFilter]
[HandleError]
public async Task<ActionResult> Upload(FileUploadViewModel model)
{
}
6. 运行
 
7. 在View中显示错误信息
将Error View转换为HandleErrorInfo类的强类型View，并在View中显示错误信息。
@model HandleErrorInfo
@{
    Layout = null;
}

<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width" />
    <title>Error</title>
</head>
<body>
    <hgroup>
        <h1>Error.</h1>
        <h2>An error occurred while processing your request.</h2>
    </hgroup>
        Error Message :@Model.Exception.Message<br />
        Controller: @Model.ControllerName<br />
        Action: @Model.ActionName
</body>
</html>
 8. 运行测试
 
Handle error属性能够确保无论是否出现异常，自定义View都能够显示，但是它的功能在controller和action 方法中是受限的。不会处理"Resource not found"这类型的错误。
运行应用程序，输一些奇怪的URL
 
9. 创建 ErrorController控制器，并创建Index方法，代码如下：
public class ErrorController : Controller
{
    // GET: Error
    public ActionResult Index()
    {
        Exception e=new Exception("Invalid Controller or/and Action Name");
        HandleErrorInfo eInfo = new HandleErrorInfo(e, "Unknown", "Unknown");
        return View("Error", eInfo);
    }
}
10. 在非法URL中显示自定义Error视图
可在 web.config中定义"Resource not found error"的设置，如下：
   <system.web>
    <customErrors mode="On">
      <error statusCode="404" redirect="~/Error/Index"/>
    </customErrors>
11. 使 ErrorController 全局可访问。
将AllowAnonymous属性应用到 ErrorController中，因为错误控制器和index方法不应该只绑定到认证用户，也很有可能用户在登录之前已经输入错误的URL。
[AllowAnonymous]
public class ErrorController : Controller
{
12. 运行
 
Talk on Lab 29
1. View的名称是否可以修改？
可以修改，不一定叫Error，也可以指定其他名字。如果Error View的名称改变了，当绑定HandleError过滤器时，必须指定View的名称。
[HandleError(View="MyError")]
Or
filters.Add(new HandleErrorAttribute()
    {
        View="MyError"
    });
2. 是否可以为不同的异常获取不同的Error View？
可以，在这种情况下，必须多次应用Handle error filter。
[HandleError(View="DivideError",ExceptionType=typeof(DivideByZeroException))]
[HandleError(View = "NotFiniteError", ExceptionType = typeof(NotFiniteNumberException))]
[HandleError]

OR

filters.Add(new HandleErrorAttribute()
    {
        ExceptionType = typeof(DivideByZeroException),
        View = "DivideError"
    });
filters.Add(new HandleErrorAttribute()
{
    ExceptionType = typeof(NotFiniteNumberException),
    View = "NotFiniteError"
});
filters.Add(new HandleErrorAttribute());
前两个Handle error filter都指定了异常，而最后一个更为常见更通用，会显示所有其他异常的Error View。
上述实验中并没有处理登录异常，我们会在实验30中讲解登录异常。
实验30: 异常处理——登录异常
1. 创建 Logger 类
在根目录下，新建文件夹，命名为Logger。在Logger 文件夹下新建类 FileLogger
namespace WebApplication1.Logger
{
    public class FileLogger
    {
        public void LogException(Exception e)
        {
            File.WriteAllLines("C://Error//" + DateTime.Now.ToString("dd-MM-yyyy mm hh ss")+".txt", 
                new string[] 
                {
                    "Message:"+e.Message,
                    "Stacktrace:"+e.StackTrace
                });
        }
    }
}
2.  创建 EmployeeExceptionFilter类
在 Filters文件夹下，新建 EmployeeExceptionFilter类
namespace WebApplication1.Filters
{
    public class EmployeeExceptionFilter
    {
    }
}
3. 扩展 Handle Error实现登录异常处理
让 EmployeeExceptionFilter 继承 HandleErrorAttribute类，重写 OnException方法：
public class EmployeeExceptionFilter: HandleErrorAttribute
{
    public override void OnException(ExceptionContext filterContext)
    {
        base.OnException(filterContext);
    }
}
Note: Make sure to put using System.Web.MVC in the top.HandleErrorAttribute class exists inside this namespace.
4. 定义 OnException 方法
在 OnException方法中包含异常登录代码。
public override void OnException(ExceptionContext filterContext)
{
    FileLogger logger = new FileLogger();
    logger.LogException(filterContext.Exception);
    base.OnException(filterContext);
}
5. 修改默认的异常过滤器
打开 FilterConfig.cs文件，删除 HandErrorAtrribute，添加上步中创建的。
public static void RegisterGlobalFilters(GlobalFilterCollection filters)
{
    //filters.Add(new HandleErrorAttribute());//ExceptionFilter
    filters.Add(new EmployeeExceptionFilter());
    filters.Add(new AuthorizeAttribute());
}
6. 运行
会在C盘中创建"Error"文件夹，存放一些error文件。
 
 
Talk on Lab 30
1.当异常出现后，Error View 是如何返回响应的？
查看OnException方法的最后一行代码：
base.OnException(filterContext);
即基类的OnException方法执行并返回Error View的ViewResult。
2.在OnException中，是否可以返回其他结果？
可以，代码如下：
public override void OnException(ExceptionContext filterContext)
{
    FileLogger logger = new FileLogger();
    logger.LogException(filterContext.Exception);
    //base.OnException(filterContext);
    filterContext.ExceptionHandled = true;
    filterContext.Result = new ContentResult()
    {
        Content="Sorry for the Error"
    };
}
当返回自定义响应时，需要做的第一件事就是通知MVC引擎，手动处理异常，因此不需要执行默认的操作，不要显示默认的错误页面。使用以下语句可完成：
  filterContext.ExceptionHandled = true;
Routing
到目前为止，我们已经解决了MVC的很多问题，但忽略了最基本最重要的一个问题：当用户发送请求时，会发生什么？
最好的答案是"执行Action方法"，但仍存在疑问：对于一个特定的URL请求，如何确定控制器和action方法。在开始实验31之前，我们首先来解答上述问题，你可能会困惑为什么这个问题会放在最后来讲，因为了解内部结构之前，需要更好的了解MVC。
理解RouteTable
在Asp.net mvc中有RouteTable这个概念，是用来存储URL路径的。简而言之，是保存已定义的应用程序的可能的URL pattern的集合。
默认情况下，路径是项目模板组成的一部分。可在 Global.asax 文件中检查到，在 Application_Start中会发现以下语句：
RouteConfig.RegisterRoutes(RouteTable.Routes);
App_Start文件夹下的 RouteConfig.cs文件，包含以下代码块：
using System.Web.Mvc;
using System.Web.Routing;

namespace WebApplication1
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
RegisterRoutes方法已经包含了由routes.MapRoute方法定义的默认的路径。已定义的路径会在请求周期中确定执行的是正确的控制器和action方法。如果使用route.MapRoute创建了多个路径，那么内部路径的定义就意味着创建Route对象。
MapRoute 方法也可与 RouteHandler 关联。
理解ASP.NET MVC 请求周期
在本节中我们只讲解请求周期中重要的知识点
1. UrlRoutingModule
当最终用户发送请求时，会通过UrlRoutingModule对象传递，UrlRoutingModule是HTTP模块。
2. Routing
UrlRoutingModule 会从route table集合中获取首次匹配的Route 对象，为了能够匹配成功，请求URL会与route中定义的URL pattern匹配。
当匹配的时候必须考虑以下规则：
	数字参数的匹配（请求URL和URL pattern中的数字）

![x](./Resource/130.png)

	URL pattern中的可选参数：

![x](./Resource/131.png)

	参数中定义的静态参数

![x](./Resource/132.png)


3. 创建MVC Route Handler
一旦Route对象被选中，UrlRoutingModule会获得 Route对象的 MvcRouteHandler对象。
4. 创建 RouteData 和 RequestContext
UrlRoutingModule使用Route对象创建RouteData，可用于创建RequestContext。RouteData封装了路径的信息如Controller名称，action名称以及route参数值。
Controller 名称
为了从URL 中获取Controller名称，需要按规则执行如在URL pattern中{Controller}是标识Controller名称的关键字。
Action Method 名称
为了获取action 方法名称，{action}是标识action 方法的关键字。
Route 参数
URL pattern能够获得以下值：
1.{controller}
2.{action}
3. 字符串，如 "MyCompany/{controller}/{action}"，"MyCompany"是字符串。
4. 其他，如"{controller}/{action}/{id}"，"id"是路径的参数。
例如：
Route pattern - > "{controller}/{action}/{id}"
请求 URL ->http://localhost:8870/BulkUpload/Upload/5
测试1
public class BulkUploadController : Controller
{
    public ActionResult Upload (string id)
    {
       //value of id will be 5 -> string 5
       ...
    }
}
测试2
public class BulkUploadController : Controller
{
    public ActionResult Upload (int id)
    {
       //value of id will be 5 -> int 5
       ...
    }
}
测试3
public class BulkUploadController : Controller
{
    public ActionResult Upload (string MyId)
    {
       //value of MyId will be null
       ...
    }
}

5. 创建MVC Handler
MvcRouteHandler 会创建 MVCHandler的实例传递 RequestContext对象
6. 创建Controller实例
MVCHandler会根据 ControllerFactory的帮助创建Controller实例
7. 执行方法
MVCHandler调用Controller的执行方法，执行方法是由Controller的基类定义的。
8. 调用Action 方法
每个控制器都有与之关联的 ControllerActionInvoker对象。在执行方法中ControllerActionInvoker对象调用正确的action 方法。
9. 运行结果
Action方法会接收到用户输入，并准备好响应数据，然后通过返回语句返回执行结果，返回类型可能是ViewResult或其他。
实验31: 实现对用户友好的URL
1. 重新定义 RegisterRoutes  方法
在RegisterRoutes 方法中包含 additional route
public static void RegisterRoutes(RouteCollection routes)
{
    routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

    routes.MapRoute(
    name: "Upload",
    url: "Employee/BulkUpload",
    defaults: new { controller = "BulkUpload", action = "Index" }
    );

    routes.MapRoute(
        name: "Default",
        url: "{controller}/{action}/{id}",
        defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
    );
}
2. 修改URL 引用
打开“~/Views/Employee”文件下的 AddNewLink.cshtml ，修改BulkUpload 链接，如下：
&nbsp;
<a href="/Employee/BulkUpload">BulkUpload</a>
3. 运行测试
 
关于实验31
1. 之前的URL 现在是否起作用？
是，仍然有用。BulkUploadController中的Index 方法可通过两个URL 访问。
1. ”http://localhost:8870/Employee/BulkUpload“
2. “http://localhost:8870/BulkUpload/Index”
2. Route 参数和Query 字符串有什么区别？
•	Query 字符串本身是有大小限制的，而无法定义Route 参数的个数。
•	无法在Query 字符串值中添加限制，但是可以在Route 参数中添加限制。
•	可能会设置Route参数的默认值，而Query String不可能有默认值。
•	Query 字符串可使URL 混乱，而Route参数可保持它有条理。
3. 如何在Route 参数中使用限制？
可使用正则表达式。如：
routes.MapRoute(
    "MyRoute",
    "Employee/{EmpId}",
    new {controller=" Employee ", action="GetEmployeeById"},
    new { EmpId = @"\d+" }
 );
Action 方法：
public ActionResult GetEmployeeById(int EmpId)
{
   ...
}
Now when someone make a request with URL “http://..../Employee/1” or “http://..../Employee/111”, action method will get executed but when someone make a request with URL “http://..../Employee/Sukesh” he/she will get “Resource Not Found” Error.
4. 是否需要将action 方法中的参数名称与Route 参数名称保持一致？
Route Pattern 也许会包含一个或多个RouteParameter，为了区分每个参数，必须保证action 方法的参数名称与Route 参数名称相同。
5. 定义路径的顺序重要吗？
有影响，在上面的实验中，我们定义了两个路径，一个是自定义的，一个是默认的。默认的是最先定义的，自定义路径是在之后定义的。
当用户输入“http://.../Employee/BulkUpload”地址后发送请求，UrlRoutingModule会搜索与请求URL 匹配的默认的route pattern ，它会将 Employee作为控制器的名称，“BulkUpload”作为action 方法名称。因此定义的顺序是非常重要的，更常用的路径应放在最后。
6. 是否有什么简便的方法来定义Action 方法的URL pattern？
我们可使用基于 routing 的属性。
1.  基本的routing 属性可用
在 RegisterRoutes 方法中在 IgnoreRoute语句后输入代码如下：
routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

routes.MapMvcAttributeRoutes();

routes.MapRoute(
...
2. 定义action 方法的 route pattern
[Route("Employee/List")]
public ActionResult Index()
{
3. 运行测试
 
routing 属性可定义route 参数，如下：
[Route("Employee/List/{id}")]
publicActionResult Index (string id) { ... }
IgnoreRoutes 的作用是什么？
当我们不想使用routing作为特别的扩展时，会使用IgnoreRoutes。作为MVC模板的一部分，在RegisterRoute 方法中下列语句是默认的：
routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
这就是说如果用户发送以“.axd”为结束的请求，将不会有任何路径加载的操作，请求将直接定位到物理资源。

Day7
目录
Lab 32 – Make project organized
Talk on Lab 32
Lab 33 – Creating single page application – Part 1 - Setup
What are Areas?
Talk on Lab 33
Lab 34 – Creating single page application – Part 2–Display Employees
Lab 35 – Creating single page application – Part 3–Create Employee
What's next?
Let's plan
    Journey to find a solution
        Understand the problem
        Solution – a common data type
        Problem – what about complex data?
        Solution – A common data format standard
        Problem – XML format issues
        Solution - JSON
Back to our lab
Talk on Lab 35
Lab 36 – Creating single page application – Part 4 – Bulk upload
Inversion of Control
实验32: 整理项目组织结构
本实验不添加新功能，主要目的是整理项目结构，使项目条理清晰，便于其他人员理解。
1. 创建解决方案文件夹
右键单击，选择“新解决方案文件夹—>添加—>新解决方案”，命名为"View And Controller"
 
重复上述步骤 ，创建文件夹"Model"，"View Model"，"Data Access Layer"
 
2. 创建数据访问层工程
右击 "Data Access Layer" 文件夹，新建类库 "DataAccessLayer"。
3. 创建业务层和业务实体项
在Model文件夹下创建新类库 "BusinessLayer" 和 "BusinessEntities"
4. 创建ViewModel 项
在ViewModel 文件夹下新建类库项 "ViewModel"
5. 添加引用
为以上创建的项目添加引用，如下：
1. DataAccessLayer 添加 BusinessEntities项
2. BusinessLayer 添加DataAccessLayer和 BusinessEntities项
3. MVC WebApplication 选择 BusinessLayer、BusinessEntities、ViewModel
4. BusinessEntities 添加 System.ComponentModel.DataAnnotations
6. 设置
1.将DataAccessLayer文件夹下的 SalesERPDAL.cs文件，复制粘贴到新创建的 DataAccessLayer 类库中。
 
2. 删除MVC项目（WebApplication1）的DataAccessLayer文件夹 
    3. 同上，将Model文件夹中的 Employee.cs, UserDetails.cs 及 UserStatus.cs文件复制到新建的 BusinessEntities文件夹中。
4. 将MVC项目中的Model文件夹的 EmployeeBusinessLayer.cs文件粘贴到新建的 BusinessLayer的文件夹中。
5. 删除MVC中的Model文件夹
6. 将MVC项目的ViewModels文件夹下所有的文件复制到新建的ViewModel 类库项中。
7. 删除ViewModels文件夹
8. 将整个MVC项目剪切到”View And Controller”解决方案文件夹中。
7. Build
选择Build->Build Solution from menu bar，会报错。
 
8. 改错
1. 给ViewModel项添加System.Web 引用
2. 在DataAccessLayer 和 BusinessLayer中使用Nuget 管理，并安装EF（Entity Framework）（如果对于Nuget的使用有不理解的地方可以查看 Day3）
注意：在Business Layer中引用EF 是非常必要的，因为Business Layer与DataAccessLayer 直接关联的，而完善的体系架构它自身的业务层是不应该与DataAccessLayer直接关联，因此我们必须使用pattern库，协助完成。
3. 删除MVC 项目中的EF
•	右击MVC 项目，选择”Manage Nuget packages“选项
•	在弹出的对话框中选择”Installed Packages“
•	则会显示所有的已安装项，选择EF，点解卸载。
9. 编译会发现还是会报错
 
10. 修改错误
报错是由于在项目中既没有引用 SalesERPDAL，也没有引用EF，在项目中直接引用也并不是优质的解决方案。
1. 在DataAccessLayer项中 新建带有静态方法 "SetDatabase" 的类 "DatabaseSettings"
using System.Data.Entity;
using WebApplication1.DataAccessLayer;

namespace DataAccessLayer
{
    public class DatabaseSettings
    {
        public static void SetDatabase()
        {
            Database.SetInitializer(new DropCreateDatabaseIfModelChanges<SalesERPDAL>());
        }
    }	
}
2. 在 BusinessLayer项中新建带有 "SetBusiness" 静态方法的 "BusinessSettings" 类。
using DataAccessLayer;

namespace BusinessLayer
{
    public class BusinessSettings
    {
        public static void SetBusiness()
        {
            DatabaseSettings.SetDatabase();
        }
    }
}
3. 删除global.asax 中的报错的Using语句 和 Database.SetInitializer 语句。 调用 BusinessSettings.SetBusiness 函数：
using BusinessLayer;
...
BundleConfig.RegisterBundles(BundleTable.Bundles);
BusinessSettings.SetBusiness();
再次编译程序，会发现成功。
Talk on Lab 32
1. 什么是解决方案文件夹？
解决方案文件夹是逻辑性的文件夹，并不是在物理磁盘上实际创建，这里使用解决方案文件夹就是为了使项目更系统化更有结构。
实验33: 创建单页应用1——安装
实验33中，不再使用已创建好的控制器和视图，会创建新的控制器及视图，创建新控制器和视图原因如下：
1. 保证现有的选项完整，也会用于旧版本与新版本对比 
    2. 学习理解ASP.NET MVC 新概念：Areas
接下来，我们需要从头开始新建controllers、views、ViewModels。
下面的文件可以被重用：
•	已创建的业务层
•	已创建的数据访问层
•	已创建的业务实体
•	授权和异常过滤器
•	FooterViewModel
•	Footer.cshtml
1. 创建新Area
    右击项目，选择添加->Area，在弹出对话框中输入SPA，点击确认，生成新的文件夹，因为在该文件夹中不需要Model中Area的文件夹，删掉。
     
     
    接下来我们先了解一下Areas的概念
    Areas
    Areas是实现Asp.net MVC 项目模块化管理的一种简单方法。
    每个项目由多个模块组成，如支付模块，客户关系模块等。在传统的项目中，采用"文件夹"来实现模块化管理的，你会发现在单个项目中会有多个同级文件夹，每个文件夹代表一个模块，并保存各模块相关的文件。
    然而，在Asp.net MVC 项目中使用自定义文件夹实现功能模块化会导致很多问题。
    下面是在Asp.Net MVC中使用文件夹来实现模块化功能需要注意的几点：
•	DataAccessLayer，BusinessLayer，BusinessEntities和ViewModels的使用不会导致其他问题，在任何情况下，可视作简单的类使用。
•	Controllers——只能保存在Controller 文件夹，但是这不是大问题，从MVC4开始，控制器的路径不再受限。现在可以放在任何文件目录下。
•	所有的Views必须放在 "~/Views/ControllerName" or "~/Views/Shared"文件夹。
2. 创建必要的ViewModels
	在ViewModel类库下新建文件夹并命名为SPA，创建ViewModel，命名为"MainViewModel"，如下：
using WebApplication1.ViewModels;
namespace WebApplication1.ViewModels.SPA
{
    public class MainViewModel
    {
        public string UserName { get; set; }
        public FooterViewModel FooterData { get; set; }//New Property
    }
}
3. 创建Index action 方法
    在 MainController 中输入：
using WebApplication1.ViewModels.SPA;
using OldViewModel=WebApplication1.ViewModels;
    在MainController 中新建Action 方法，如下：
public ActionResult Index()
{
    MainViewModel v = new MainViewModel();
    v.UserName = User.Identity.Name;
    v.FooterData = new OldViewModel.FooterViewModel();
    v.FooterData.CompanyName = "StepByStepSchools";//Can be set to dynamic value
    v.FooterData.Year = DateTime.Now.Year.ToString();
    return View("Index", v);
}
using OldViewModel=WebApplication1.ViewModels 这行代码中，给WebApplication1.ViewModels 添加了别名OldViewModel，使用时可直接写成OldViewModel.ClassName这种形式。
如果不定义别名的话，会产生歧义，因为WebApplication1.ViewModels.SPA 和 WebApplication1.ViewModels下有名称相同的类。
4.创建Index View
创建与上述Index方法匹配的View
@using WebApplication1.ViewModels.SPA
@model MainViewModel
<!DOCTYPE html>

<html>
<head>
    <meta name="viewport" content="width=device-width" />
    <title>Employee Single Page Application</title>
5. 运行测试
 
Talk on Lab 33
1. 为什么在控制器名前需要使用SPA关键字？
在ASP.NET MVC应用中添加area时，Visual Studio会自动创建并命名为"[AreaName]AreaRegistration.cs" 的文件，其中包含了AreaRegistration的派生类。该类定义了 AreaName属性和用来定义register路径信息的 RegisterArea 方法。
在本次实验中你会发现nameSpaArealRegistration.cs文件被存放在 "~/Areas/Spa" 文件夹下，SpaArealRegistration类的RegisterArea方法的代码如下：
context.MapRoute(
    "SPA_default",
    "SPA/{controller}/{action}/{id}",
    new { action = "Index", id = UrlParameter.Optional }
);
这就是为什么一提到Controllers，我们会在Controllers前面加SPA关键字。
2. SPAAreaRegistration的RegisterArea方法是怎样被调用的？
打开global.asax文件，首行代码如下：
AreaRegistration.RegisterAllAreas();
RegisterAllAreas方法会找到应用程序域中所有AreaRegistration的派生类，并主动调用RegisterArea方法
3. 是否可以不使用SPA关键字来调用MainController？
AreaRegistration类在不删除其他路径的同时会创建新路径。RouteConfig类中定义了新路径仍然会起作用。如之前所说的，Controller存放的路径是不受限制的，因此它可以工作但可能不会正常的显示，因为无法找到合适的View。
实验34——创建单页应用2—显示Employees
1.创建ViewModel，实现“显示Empoyee”功能
在SPA中新建两个ViewModel 类，命名为”EmployeeViewModel“及”EmployeeListViewModel“：
namespace WebApplication1.ViewModels.SPA
{
    public class EmployeeViewModel
    {
        public string EmployeeName { get; set; }
        public string Salary { get; set; }
        public string SalaryColor { get; set; }
    }
}
namespace WebApplication1.ViewModels.SPA
{
    public class EmployeeListViewModel
    {
        public List<employeeviewmodel> Employees { get; set; }
    }
}
注意：这两个ViewModel 都是由非SPA 应用创建的，唯一的区别就在于这次不需要使用BaseViewModel。
2. 创建EmployeeList Index
在MainController 中创建新的Action 方法”EmployeeList“action 方法
public ActionResult EmployeeList()
{
    EmployeeListViewModel employeeListViewModel = new EmployeeListViewModel();
    EmployeeBusinessLayer empBal = new EmployeeBusinessLayer();
    List<employee> employees = empBal.GetEmployees();

    List<employeeviewmodel> empViewModels = new List<employeeviewmodel>();

    foreach (Employee emp in employees)
    {
        EmployeeViewModel empViewModel = new EmployeeViewModel();
        empViewModel.EmployeeName = emp.FirstName + " " + emp.LastName;
        empViewModel.Salary = emp.Salary.Value.ToString("C");
        if (emp.Salary > 15000)
        {
            empViewModel.SalaryColor = "yellow";
        }
        else
        {
            empViewModel.SalaryColor = "green";
        }
        empViewModels.Add(empViewModel);
    }
    employeeListViewModel.Employees = empViewModels;
    return View("EmployeeList", employeeListViewModel);
}
注意： 不需要使用 HeaderFooterFilter
3. 创建AddNewLink 分部View
之前添加AddNewLink 分部View已经无法使用，因为Anchor标签会造成全局刷新，我们的目标是创建”单页应用“，因此不需要全局刷新。
在”~/Areas/Spa/Views/Main“ 文件夹新建分部View”AddNewLink.cshtml“。
<a href="#" onclick="OpenAddNew();">Add New</a>
4. 创建 AddNewLink Action 方法
在MainController中创建 ”GetAddNewLink“ action 方法。
public ActionResult GetAddNewLink()
{
    if (Convert.ToBoolean(Session["IsAdmin"]))
    {
        return PartialView("AddNewLink");
    }
    else
    {
        return new EmptyResult();
    }
}
5. 新建 EmployeeList View
在“~/Areas/Spa/Views/Main”中创建新分部View 命名为“EmployeeList”。
@using WebApplication1.ViewModels.SPA
@model EmployeeListViewModel
<div>
    @{
        Html.RenderAction("GetAddNewLink");
    }

    <table border="1" id="EmployeeTable">
        <tr>
            <th>Employee Name</th>
6. 设置EmployeeList 为初始页面
打开“~/Areas/Spa/Views/Main/Index.cshtml”文件，在Div标签内包含EmployeeList action结果。
...  
</div>
7. 运行
 
实验 35——创建单页应用3—创建Employee
1. 创建AddNew ViewModels
在SPA中新建 ViewModel类库项的ViewModel，命名为“CreateEmployeeViewModel”。
namespace WebApplication1.ViewModels.SPA
{
    public class CreateEmployeeViewModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Salary { get; set; }
    }
}
2. 创建AddNew action 方法
在MainController中输入using 语句：
using WebApplication1.Filters;
在MainController 中创建AddNew action 方法：
[AdminFilter]
public ActionResult AddNew()
{
    CreateEmployeeViewModel v = new CreateEmployeeViewModel();
    return PartialView("CreateEmployee", v);
}
3. 创建 CreateEmployee 分部View
在“~/Areas/Spa/Views/Main”中创建新的分部View“CreateEmployee”
@using WebApplication1.ViewModels.SPA
@model CreateEmployeeViewModel
<div>
    <table>
        <tr>
            <td>
                First Name:
            </td>
4. 添加 jQuery UI
右击项目选择“Manage Nuget Manager”。找到“jQuery UI”并安装。
 
项目中会自动添加.js和.css文件
 
5. 在项目中添加jQuery UI
打开“~/Areas/Spa/Views/Main/Index.cshtml”，添加jQuery.js,jQueryUI.js 及所有的.css文件的引用。这些文件会通过Nuget Manager添加到jQuery UI 包中。
<head>
<meta name="viewport" content="width=device-width" />
<script src="~/Scripts/jquery-1.8.0.js"></script>
<script src="~/Scripts/jquery-ui-1.11.4.js"></script>
<title>Employee Single Page Application</title>
<link href="~/Content/themes/base/all.css" rel="stylesheet" />
...
6. 实现 OpenAddNew 方法
在“~/Areas/Spa/Views/Main/Index.cshtml”中新建JavaScript方法“OpenAddNew”。
<script>
    function OpenAddNew() {
        $.get("/SPA/Main/AddNew").then
            (
                function (r) {
                    $("<div id='DivCreateEmployee'></div>").html(r).
                        dialog({
                            width: 'auto', height: 'auto', modal: true, title: "Create New Employee",
                            close: function () {
                                $('#DivCreateEmployee').remove();
                            }
                        });
                }
            );
    }
</script>
7. 运行
完成登录步骤后导航到Index中，点击Add New 链接。
 
8. 创建 ResetForm 方法
在CreateEmployee.cshtml顶部，输入以下代码，创建ResetForm函数：
@model CreateEmployeeViewModel
<script>
    function ResetForm() {
        document.getElementById('TxtFName').value = "";
        document.getElementById('TxtLName').value = "";
        document.getElementById('TxtSalary').value = "";
    }
</script>
9. 创建 CancelSave 方法
在CreateEmployee.cshtml顶部，输入以下代码，创建CancelSave 函数：
document.getElementById('TxtSalary').value = "";
    }
    function CancelSave() {
        $('#DivCreateEmployee').dialog('close');
    }
在开始下一步骤之前，我们先来了解我们将实现的功能：
•	最终用户点击保存按钮
•	输入值必须在客户端完成验证
•	会将合法值传到服务器端
•	新Employee记录必须保存到数据库中
•	CreateEmployee对话框使用完成之后必须关闭
•	插入新值后，需要更新表格。
为了实现三大功能，先确定一些实现计划：
1.验证
验证功能可以使用之前项目的验证代码。
2.保存功能
我们会创建新的MVC action 方法实现保存Employee，并使用jQuery Ajax调用
3. 服务器端与客户端进行数据通信
在之前的实验中，使用Form标签和提交按钮来辅助完成的，现在由于使用这两种功能会导致全局刷新，因此我们将使用jQuery Ajax方法来替代Form标签和提交按钮。
寻求解决方案
1. 理解问题
大家会疑惑JavaScript和Asp.NET 是两种技术，如何进行数据交互？
解决方案： 通用数据类型
由于这两种技术都支持如int，float等等数据类型，尽管他们的存储方式，大小不同，但是在行业总有一种数据类型能够处理任何数据，称之为最兼容数据类型即字符串类型。
通用的解决方案就是将所有数据转换为字符串类型，因为无论哪种技术都支持且能理解字符串类型的数据。

![x](./Resource/133.png)


问题：复杂数据该怎么传递？
.net中的复杂数据通常指的是类和对象，这一类数据，.net与其他技术传递复杂数据就意味着传类对象的数据，从JavaScript给其他技术传的复杂类型数据就是JavaScript对象。因此是不可能直接传递的，因此我们需要将对象类型的数据转换为标准的字符串类型，然后再发送。
解决方案—标准的通用数据格式
可以使用XML定义一种通用的数据格式，因为每种技术都需要将数据转换为XML格式的字符串，来与其他技术通信，跟字符串类型一样，XML是每种技术都会考虑的一种标准格式。
如下，用C#创建的Employee对象，可以用XML 表示为：
<employee></employee><Employee>
      <EmpName>Sukesh</EmpName>
      <Address>Mumbai</Address>
</Employee>
因此可选的解决方案就是，将技术1中的复杂数据转换为XML格式的字符串，然再发送给技术2.

![x](./Resource/134.png)


然而使用XML格式可能会导致数据占用的字节数太多，不易发送。数据SiZE越大意味着性能越低效。还有就是XML的创建和解析比较困难。
为了处理XML创建和解析的问题，使用JSON格式，全称“JavaScript Object Notation”。
C#创建的Employee对象用JSON表示：
{
  EmpName: "Sukesh",
  Address: "Mumbai"
}
JSON数据是相对轻量级的数据类型，且JAVASCRIPT提供转换和解析JSON格式的功能函数。
var e={
EmpName= &ldquo;Sukesh&rdquo;,
Address= &ldquo;Mumbai&rdquo;
};
var EmployeeJsonString = JSON.stringify(e);//This EmployeeJsonString will be send to other technologies.
var EmployeeJsonString=GetFromOtherTechnology();
var e=JSON.parse(EmployeeJsonString);
alert(e.EmpName);
alert(e.Address);
数据传输的问题解决了，让我们继续进行实验。
10. 创建 SaveEmployee action
在MainController中创建action，如下：
[AdminFilter]
public ActionResult SaveEmployee(Employee emp)
{
    EmployeeBusinessLayer empBal = new EmployeeBusinessLayer();
    empBal.SaveEmployee(emp);

EmployeeViewModel empViewModel = new EmployeeViewModel();
empViewModel.EmployeeName = emp.FirstName + " " + emp.LastName;
empViewModel.Salary = emp.Salary.Value.ToString("C");
if (emp.Salary > 15000)
{
empViewModel.SalaryColor = "yellow";
}
else
{
empViewModel.SalaryColor = "green";
    }
return Json(empViewModel);
}
上述代码中，使用Json方法在MVC action方法到JavaScript之间传Json字符串。
11. 添加 Validation.js 引用
@using WebApplication1.ViewModels.SPA
@model CreateEmployeeViewModel
<script src="~/Scripts/Validations.js"></script>
12. 创建 SaveEmployee 方法
在CreateEmployee.cshtml View中，创建 SaveEmployee方法：
...
...

    function SaveEmployee() {
        if (IsValid()) {
            var e =
                {
                    FirstName: $('#TxtFName').val(),
                    LastName: $('#TxtLName').val(),
                    Salary: $('#TxtSalary').val()
                };
            $.post("/SPA/Main/SaveEmployee",e).then(
                function (r) {
                    var newTr = $('<tr></tr>');
                    var nameTD = $('<td></td>');
                    var salaryTD = $('<td></td>');

                    nameTD.text(r.EmployeeName);
                    salaryTD.text(r.Salary); 

                    salaryTD.css("background-color", r.SalaryColor);

                    newTr.append(nameTD);
                    newTr.append(salaryTD);

                    $('#EmployeeTable').append(newTr);
                    $('#DivCreateEmployee').dialog('close'); 
                }
                );
        }
    }
</script>
13. 运行
 
Talk on Lab 35
1. JSON 方法的作用是什么？
返回JSONResult,JSONResult 是ActionResult 的子类。在第六篇博客中讲过MVC的请求周期。

![x](./Resource/135.png)


ExecuteResult是ActionResult中声明的抽象方法，ActionResult所有的子类都定义了该方法。在第一篇博客中我们已经讲过ViewResult 的ExecuteResult方法实现的功能，有什么不理解的可以翻看第一篇博客。
实验36——创建单页应用—4—批量上传
1. 创建SpaBulkUploadController
创建新的AsyncController“ SpaBulkUploadController”
namespace WebApplication1.Areas.SPA.Controllers
{
    public class SpaBulkUploadController : AsyncController
    {
    }
}
2. 创建Index Action
在步骤1中的Controller中创建新的Index Action 方法,如下：
[AdminFilter]
public ActionResult Index()
{
    return PartialView("Index");
}
3. 创建Index 分部View
在“~/Areas/Spa/Views/SpaBulkUpload”中创建 Index分部View
<div>
    Select File : <input type="file" name="fileUpload" id="MyFileUploader" value="" />
    <input type="submit" name="name" value="Upload" onclick="Upload();" />
</div>
4. 创建 OpenBulkUpload  方法
打开“~/Areas/Spa/Views/Main/Index.cshtml”文件，新建JavaScript 方法OpenBulkUpload
function OpenBulkUpload() {
            $.get("/SPA/SpaBulkUpload/Index").then
                (
                    function (r) {
                        $("<div id='DivBulkUpload'></div>").html(r).dialog({ width: 'auto', height: 'auto', modal: true, title: "Create New Employee",
                            close: function () {
                                $('#DivBulkUpload').remove();
                            } });
                    }
                );
        }
    </script>
</head>
<body>
    <div style="text-align:right">
5. 运行
 
6. 新建FileUploadViewModel
在ViewModel SPA文件夹中新建View Model”FileUploadViewModel”。
namespace WebApplication1.ViewModels.SPA
{
    public class FileUploadViewModel
    {
        public HttpPostedFileBase fileUpload { get; set; }
    }
}
7. 创建Upload Action
Create a new Action method called Upload in SpaBulkUploadController as follows.
[AdminFilter]
public async Task<actionresult> Upload(FileUploadViewModel model)
{
    int t1 = Thread.CurrentThread.ManagedThreadId;
    List<employee> employees = await Task.Factory.StartNew<list<employee>>
        (() => GetEmployees(model));
    int t2 = Thread.CurrentThread.ManagedThreadId;
    EmployeeBusinessLayer bal = new EmployeeBusinessLayer();
    bal.UploadEmployees(employees);
    EmployeeListViewModel vm = new EmployeeListViewModel();
    vm.Employees = new List<employeeviewmodel>();
    foreach (Employee item in employees)
    {
        EmployeeViewModel evm = new EmployeeViewModel();
        evm.EmployeeName = item.FirstName + " " + item.LastName;
        evm.Salary = item.Salary.Value.ToString("C");
        if (item.Salary > 15000)
        {
            evm.SalaryColor = "yellow";
        }
        else
        {
            evm.SalaryColor = "green";
        }
        vm.Employees.Add(evm);
    }
    return Json(vm);
}

private List<employee> GetEmployees(FileUploadViewModel model)
{
    List<employee> employees = new List<employee>();
    StreamReader csvreader = new StreamReader(model.fileUpload.InputStream);
    csvreader.ReadLine();// Assuming first line is header
    while (!csvreader.EndOfStream)
    {
        var line = csvreader.ReadLine();
        var values = line.Split(',');//Values are comma separated
        Employee e = new Employee();
        e.FirstName = values[0];
        e.LastName = values[1];
        e.Salary = int.Parse(values[2]);
        employees.Add(e);
    }
    return employees;
}
8. 创建Upload 函数
打开”~/Areas/Spa/Views/SpaBulkUpload”的Index View。创建JavaScript函数，命名为“Upload”
<script>
    function Upload() {
        debugger;
        var fd = new FormData();
        var file = $('#MyFileUploader')[0];
        fd.append("fileUpload", file.files[0]);
        $.ajax({
            url: "/Spa/SpaBulkUpload/Upload",
            type: 'POST',
            contentType: false,
            processData: false,
            data: fd
        }).then(function (e) {
            debugger;
            for (i = 0; i < e.Employees.length; i++)
            {
                var newTr = $('<tr></tr>');
                var nameTD = $('<td></td>');
                var salaryTD = $('<td></td>');

                nameTD.text(e.Employees[i].EmployeeName);
                salaryTD.text(e.Employees[i].Salary);

                salaryTD.css("background-color", e.Employees[i].SalaryColor);

                newTr.append(nameTD);
                newTr.append(salaryTD);

                $('#EmployeeTable').append(newTr);
            }
            $('#DivBulkUpload').dialog('close');
        });
    }
</script>
9. 运行
 
 
Inversion of Control
控制反转（Inversion of Control，英文缩写为IoC）是一个重要的面向对象编程的法则来削减计算机程序的耦合问题，也是轻量级的Spring框架的核心。 控制反转一般分为两种类型，依赖注入（Dependency Injection，简称DI）和依赖查找（Dependency Lookup）。依赖注入应用比较广泛。
应用控制反转，对象在被创建的时候，由一个调控系统内所有对象的外界实体将其所依赖的对象的引用传递给它。也可以说，依赖被注入到对象中。所以，控制反转是，关于一个对象如何获取他所依赖的对象的引用，这个责任的反转。
设计模式
Interface Driven Design接口驱动，接口驱动有很多好处，可以提供不同灵活的子类实现，增加代码稳定和健壮性等等，但是接口一定是需要实现的，也就是如下语句迟早要执行：AInterface a = new AInterfaceImp(); 这样一来，耦合关系就产生了。
classA
{
    AInterface a;
    A(){}
    AMethod()//一个方法
    {
        a = new AInterfaceImp();
    }
}
Class A与AInterfaceImp就是依赖关系，如果想使用AInterface的另外一个实现就需要更改代码了。当然我们可以建立一个Factory来根据条件生成想要的AInterface的具体实现，即：
InterfaceImplFactory
{
   AInterface create(Object condition)
   {
      if(condition = condA)
      {
          return new AInterfaceImpA();
      }
      else if(condition = condB)
      {
          return new AInterfaceImpB();
      }
      else
      {
          return new AInterfaceImp();
      }
    }
}
表面上是在一定程度上缓解了以上问题，但实质上这种代码耦合并没有改变。通过IoC模式可以彻底解决这种耦合，它把耦合从代码中移出去，放到统一的XML 文件中，通过一个容器在需要的时候把这个依赖关系形成，即把需要的接口实现注入到需要它的类中，这可能就是“依赖注入”说法的来源了。
IoC模式，系统中通过引入实现了IoC模式的IoC容器，即可由IoC容器来管理对象的生命周期、依赖关系等，从而使得应用程序的配置和依赖性规范与实际的应用程序代码分开。其中一个特点就是通过文本的配置文件进行应用程序组件间相互关系的配置，而不用重新修改并编译具体的代码。
当前比较知名的IoC容器有：Pico Container、Avalon 、Spring、JBoss、HiveMind、EJB等。
在上面的几个IoC容器中，轻量级的有Pico Container、Avalon、Spring、HiveMind等，超重量级的有EJB，而半轻半重的有容器有JBoss，Jdon等。
可以把IoC模式看做是工厂模式的升华，可以把IoC看作是一个大工厂，只不过这个大工厂里要生成的对象都是在XML文件中给出定义的，然后利用Java 的“反射”编程，根据XML中给出的类名生成相应的对象。从实现来看，IoC是把以前在工厂方法里写死的对象生成代码，改变为由XML文件来定义，也就是把工厂和对象生成这两者独立分隔开来，目的就是提高灵活性和可维护性。
IoC中最基本的Java技术就是“反射”编程。反射又是一个生涩的名词，通俗的说反射就是根据给出的类名（字符串）来生成对象。这种编程方式可以让对象在生成时才决定要生成哪一种对象。反射的应用是很广泛的，像Hibernate、Spring中都是用“反射”做为最基本的技术手段。
在过去，反射编程方式相对于正常的对象生成方式要慢10几倍，这也许也是当时为什么反射技术没有普遍应用开来的原因。但经SUN改良优化后，反射方式生成对象和通常对象生成方式，速度已经相差不大了（但依然有一倍以上的差距）。
优缺点
IoC最大的好处是什么？因为把对象生成放在了XML里定义，所以当我们需要换一个实现子类将会变成很简单（一般这样的对象都是实现于某种接口的），只要修改XML就可以了，这样我们甚至可以实现对象的热插拔（有点像USB接口和SCSI硬盘了）。
IoC最大的缺点是什么？（1）生成一个对象的步骤变复杂了（事实上操作上还是挺简单的），对于不习惯这种方式的人，会觉得有些别扭和不直观。（2）对象生成因为是使用反射编程，在效率上有些损耗。但相对于IoC提高的维护性和灵活性来说，这点损耗是微不足道的，除非某对象的生成对效率要求特别高。（3）缺少IDE重构操作的支持，如果在Eclipse要对类改名，那么你还需要去XML文件里手工去改了，这似乎是所有XML方式的缺憾所在。
实现初探
IOC关注服务(或应用程序部件)是如何定义的以及他们应该如何定位他们依赖的其它服务。通常，通过一个容器或定位框架来获得定义和定位的分离，容器或定位框架负责：
保存可用服务的集合
提供一种方式将各种部件与它们依赖的服务绑定在一起
为应用程序代码提供一种方式来请求已配置的对象(例如，一个所有依赖都满足的对象)，这种方式可以确保该对象需要的所有相关的服务都可用。
类型
现有的框架实际上使用以下三种基本技术的框架执行服务和部件间的绑定:
类型1 (基于接口): 可服务的对象需要实现一个专门的接口，该接口提供了一个对象，可以重用这个对象查找依赖(其它服务)。早期的容器Excalibur使用这种模式。
类型2 (基于setter): 通过JavaBean的属性(setter方法)为可服务对象指定服务。HiveMind和Spring采用这种方式。
类型3 (基于构造函数): 通过构造函数的参数为可服务对象指定服务。PicoContainer只使用这种方式。HiveMind和Spring也使用这种方式。
实现策略
IoC是一个很大的概念,可以用不同的方式实现。其主要形式有两种：
◇依赖查找：容器提供回调接口和上下文条件给组件。EJB和Apache Avalon 都使用这种方式。这样一来，组件就必须使用容器提供的API来查找资源和协作对象，仅有的控制反转只体现在那些回调方法上（也就是上面所说的 类型1）：容器将调用这些回调方法，从而让应用代码获得相关资源。
◇依赖注入：组件不做定位查询，只提供普通的Java方法让容器去决定依赖关系。容器全权负责的组件的装配，它会把符合依赖关系的对象通过JavaBean属性或者构造函数传递给需要的对象。通过JavaBean属性注射依赖关系的做法称为设值方法注入(Setter Injection)；将依赖关系作为构造函数参数传入的做法称为构造器注入（Constructor Injection）
如何实现对现有应用的依赖注入
实现数据访问层
数据访问层有两个目标。第一是将数据库引擎从应用中抽象出来，这样就可以随时改变数据库—比方说，从微软SQL变成Oracle。不过在实践上很少会这么做，也没有足够的理由未来使用实现数据访问层而进行重构现有应用的努力。
第二个目标是将数据模型从数据库实现中抽象出来。这使得数据库或代码开源根据需要改变，同时只会影响主应用的一小部分——数据访问层。这一目标是值得的，为了在现有系统中实现它进行必要的重构。
增加DAL的一个额外的好处是增强了单元测试能力。没有DAL，测试就必须利用数据库的真实数据。这意味着支持不同场景的数据必须在测试数据库中创建，而这个数据库必须维持一种恒定的状态。这很难做且容易引起错误。而有了DAL，就可以创建必要的任何类型的数据库数据来测试不同场景，以这种方式来写测试。它还可以让你在没有数据库或数据库因查询崩溃期间测试发生了什么事情。如果是用真实数据库来做，要想根据需要复制这些边界情况几乎是不可能的。
模块与接口重构
依赖注入背后的一个核心思想是单一功能原则（single responsibility principle）。该原则指出，每一个对象应该有一个特定的目的，而应用需要利用这一目的的不同部分应当使用合适的对象。这意味着这些对象在系统的任何地方都可以重用。但在现有系统里面很多时候都不是这样的。因此，引入DI的第一步就是对应用进行重构，以便用针对特定目的使用专门的类或模块。 
DI的实现机制需要使用匹配被用的不同模块的发布方法和属性的接口。当把功能性重构进模块时，应用也应该进行重构以便利用这些接口而不是具体的类。 
要注意的是，这一重构应该影响应用的逻辑流。这是移动代码的实践，不是改变它的工作方式。为了确保不会引入缺陷，需要遵循质保（QA）流程。然而，做法得当的话，产生bug的机会是很小的。
随时增加单元测试
把功能封装到整个对象里面会导致自动测试困难或者不可能。将模块和接口与特定对象隔离，以这种方式重构可以执行更先进的单元测试。按照后面再增加测试的想法继续重构模块是诱惑力的，但这是错误的。
引入新的缺陷永远是重构代码的一大担忧。尽快建立单元测试可以处置这个风险，但是还存在着一个很少会被考虑到的项目管理风险。马上增加单元测试可以检测出遗留代码原有未被发现的缺陷。我要指出的是，如果当前系统已经运行了一段时间的话，那么这些就不应该被视为缺陷，而是“未记录的功能”。此时你必须决定这些问题是否需要处置，还是放任不管。
使用服务定位器而不是构造注入
实现控制反转不止一种方法。最常见的办法是使用构造注入，这需要在对象首次被创建是提供所有的软件依赖。然而，构造注入要假设整个系统都使用这一模式，这意味着整个系统必须同时进行重构。这很困难、有风险，且耗时。
构造注入有一个替代方法，就是服务定位器。这种模式可以慢慢实现，即每次在方便的时候只对应用的一部分进行重构。对现有系统的慢慢适配要比大规模转换的努力更好。因此，在让现有系统适配DI时，服务定位是最佳使用模式。 
有人批评服务定位器模式，说它取代了依赖而不是消除了紧耦合。如果是从头开始开发应用的话，我同意这种说法，但是如果是对现有系统进行升级，过渡期间使用服务定位器是有价值的。当整个系统已经适配了服务定位器之后，再把它转化为构造注入就是一个可有可无的步骤了。

控制反转（IoC/Inverse Of Control）：调用者不再创建被调用者的实例，由IOC框架实现（容器创建）所以称为控制反转。
依赖注入（DI/Dependence injection）：容器创建好实例后再注入调用者称为依赖注入。
有很多人把控制反转和依赖注入混为一谈，虽然在某种意义上来看他们是一体的，但好像又有些不同。控制反转（Ioc）可以看成自来水厂，那自来水厂的运行就可以看作依赖注入（DI），Ioc是一个控制容器，DI就是这个容器的运行机制，有点像国家主席和总理的意思。
关于Ioc的框架有很多，比如astle Windsor、Unity、Spring.NET、StructureMap。













路由
控制器是基于路由选择的。默认的路由在RegisterRoutes方法中定义。Web应用程序启动时会调用Application_ Start方法，该方法会调用RegisterRoutes方法。名为DefaultApi的路由是用于Web API的。名为Default的路由是ASP.NET MVC应用程序的默认路由。默认路由使用URL {controller}/{action}/{id}定义。该路由映射了URL的3个段。第一个段映射到控制器，第二个段映射到动作，第三个段映射到参数id。在ASP.NET MVC应用程序中，必须有控制器和动作，但是它们可以有默认值。
添加路由
添加或修改路由的原因有几种。例如，修改路由以便只使用带链接的动作，而将Home 定义为默认控制器，向链接添加额外的项，或者使用多个参数。通过类似于http://<server>/About的链接来使用Home控制器中的About动作方法，而不传递控制器名称
routes.MapRoute(
    name: "Default",
    url: "{action}/{id}",
    defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
);
修改路由的另一种场景，在路由中添加一个变量Language。该变量放在URL中服务器名之后、控制器之前，如http://server/en/Home/About。可以使用这种方法指定语言。
routes.MapRoute(
    name: "Language",
    url: "{language}/{controller}/{action}/{id}",
    defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
);
路由约束
路由约束示例：language参数只能是en或de
routes.MapRoute(
    name: "Language",
    url: "{language}/{controller}/{action}/{id}",
    defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional },
constraints: new { language = @"(en)|(de)" }
);
约束可以使用正则表达式。
控制器
控制器对用户请求做出反应，然后发回一个响应。在ASP.NET MVC的体系结构中，优先使用约定而不是配置。控制器位于目录Controllers中，并且控制器类的名称必须带有Controller后缀。
控制器中包含动作方法。下面的代码段中的Hello方法就是一个简单的动作方法
public class HomeController : Controller
{
public string Hello()
     {
          return "Hello, ASP.NET MVC";
     }
}
使用链接http://localhost:41270/Home/Hello可调用Home控制器中的Hello动作。当然，端口号取决于自己的设置，可以通过项目设置中的Web属性进行配置。动作可以返回任何东西。
动作方法可以带任意数量参数，例如下面的Greeting方法，http://localhost:41270/Home/Greeting?name=Stephanie
public string Greeting(string name)
{
     return HttpUtility.HtmlEncode("Hello, " + name);
}

public string Greeting2(string id)
{
     return HttpUtility.HtmlEncode("Hello, " + id);
}
也可以使用路由信息来指定参数，例如上面的Greeting2方法，http://localhost:41270/Home/Greeting2/Matthias
多参数时，如果要用路由形式调用，可以在Global.asax.cs中多增加一个路由：
routes.MapRoute(
    name: "MultipleParameters",
    url: "{controller}/{action}/{x}/{y}",
    defaults: new { controller = "Home", action = "Index" }
);
控制器动作方法可以返回任何值，所以通常会返回ActionResult或者派生自ActionResult的类。
示例代码：314425 ch41 code\MVC\MVCSampleApp\Controllers\ResultController.cs
视图
	视图都在Views文件夹中定义，ViewsDemo控制器的视图需要一个ViewsDemo子目录，这是视图的约定。另一个可以搜索视图的地方是Shared目录。可以把多个控制器使用的视图(以及多个视图使用的特殊部分视图)放在Shared目录中。
示例代码：314425 ch41 code\MVC\MVCSampleApp\Controllers\ViewDemoController.cs
视图包含HTML代码和Razor语法，Razor使用@字符作为迁移字符。
	示例代码：314425 ch41 code\MVC\MVCSampleApp\Views\ViewDemo\Index.cshtml
	控制器和视图运行在同一进程中，所以从控制器向视图传递数据变得很容易。为传递数据，可以使用ViewDataDictionary，它可以与Controller类的ViewData属性一起使用，例如：ViewData["MyData"] = "Hello"; 更简单的语法是使用ViewBag属性。
	示例代码：ch41\MVC\MVCSampleApp\Controllers\SubmitDataController.cs
	在页面上访问控制器传递的数据，使用Razor语法时，引擎在找到HTML元素时，会自动认为代码结束。在有些情况中，这是无法自动看出来的。此时，可以使用圆括号来标记变量。其后是正常的代码。
	示例代码：ch41\MVC\MVCSampleApp\Views\ViewDemo\PassingData.cshtml
	向视图传递模型，可以创建强类型视图。
	示例代码：ch41\MVC\MVCSampleApp\Controllers\SubmitDataController.cs
	在视图内可用model关键字定义模型。此模型的类型是IEnumerable<Menu>。因为Menu类是在MVCSampleAppModels名称空间中定义的，所以使用using关键字打开该名称空间。在定义模型后，用抽象基类WebViewModel<TModel>定义的Model属性的类型就是该模型的类型。
	示例代码：ch41\MVC\MVCSampleApp\Views\ViewDemo\PassingAModel.cshtml
	根据视图需要，可以传递任意对象作为模型。
	如果不使用布局页，需要将Layout属性设置为null来明确指定。使用默认布局页示例：
@{
    Layout = "~/Views/Shared/_Layout.cshtml";
}
	布局页包含了所有使用该布局页的页面所共有的HTML内容。与视图和控制器的通信可通过ViewBag完成。基类WebPageBase的RenderBody方法呈现内容页的内容，因而定义了在什么位置放置内容。
示例代码：ch41\MVC\MVCSampleApp\Views\Shared\_Layout.cshtml
为动作LayoutSample创建视图
	示例代码：ch41\MVC\MVCSampleApp\Views\ViewDemo\LayoutSample.cshtml
	可以使用分区定义把视图内定义的内容放在什么位置。
	示例代码：ch41\MVC\MVCSampleApp\Views\Shared\_Layout.cshtml
在视图内分区由关键字section定义。分区的位置与其他内容完全独立。
示例代码：ch41\MVC\MVCSampleApp\Views\Views\ViewsDemo\LayoutUsingSections.cshtml
布局为Web应用程序内的多个页面提供了整体性定义，而部分视图可用于定义视图内的内容。部分视图没有布局。首先看一下模型：
示例代码：ch41\MVC\MVCSampleApp\Models\EventsAndMenus.cs
控制器中，动作方法UseAPartialView1将EventsAndMenus的一个实例传递给视图:
	示例代码：ch41\MVC\MVCSampleApp\Controllers\ViewsDemoController.cs
	使用HTMLHelper方法Html.Partial可以显示部分视图，它返回一个MvcHtmlString。Partial方法的第一个参数接受部分视图的名称。使用第二个参数，则Partial允许传递模型。如果没有传递模型，部分视图可以访问与视图相同的模型。该例中，部分视图只使用了模型的一部分。
	示例代码：ch41\MVC\MVCSampleApp\Views\ViewsDemo\UseAPartialView1.cshtml
	另外一种在视图内呈现部分视图的方法是使用HTML Helper方法Html.RenderPartial，该方法返回void。该方法将部分视图的内容直接写入响应流。
	部分视图的创建方式类似于标准视图，但是不能分配布局，因为布局要由在其中加载部分视图的视图定义。
	示例代码：ch41\MVC\MVCSampleApp\Views\ViewsDemo\ShowEvents.cshtml
	也可以使用控制器来返回部分视图。下面第一个动作方法UsePartiaIView2返回一个标准视图，第二个动作方法ShowEvents返回一个带有Controller方法PartialView的部分视图。
	示例代码：ch41\MVC\MVCSampleApp\Controllers\ViewsDemoController.cs
	视图通过调用HTMLHelper方法Html.Action来调用控制器。动作名称是ShowEvents，它使用了与视图相同的控制器。另外，在Action方法内也可以为动作方法传递其他控制器和参数。
	示例代码：ch41\MVC\MVCSampleApp\Views\ViewsDemo\UseAPartialView2.cshtml
	部分视图也可以在客户端代码中直接加载。
	示例代码：ch41\MVC\MVCSampleApp\Views\ViewsDemo\UseAPartialView3.cshtml
从客户端提交数据
HTTP的GET、POST、PUT、DELETE方式提交。POST示例页面：
示例代码：ch41\MVC\MVCSampleApp\Views\SubmitData\CreateMenu.cshtml
控制器中使用了方法重载
示例代码：ch41\MVC\MVCSampleApp\Controllers\SubmitDataController.cs
除了在动作方法中使用多个参数，还可以使用(模型)类型，类型的属性与输入的字段名称匹配，示例代码如上。
模型绑定器负责传输HTTP POST请求中的数据。模型绑定器实现IModelBinder接口。默认情况下，使用DefaultModelBinder类将输入字段绑定到模型。这个绑定器支持基本类型、模型类以及实现了ICollection<T>、IList<T>和IDictionary<TKey, TValue>的集合。还可以使用不带参数的动作方法将输入数据传递给模型。示例代码如上，代码中创建了Menu类的一个新实例，并把这个实例传递给Controllers类的UpdateModel方法。如果模型类有一些不应该更新的属性，就不应该使用UpdateModel方法。否则恶意用户可以从浏览器修改请求，更新这些属性。
可以向模型类型添加一些注释，当更新数据时，会将这些注释用于验证。名称空间System.ComonentModel.DataAnnotations中包含的特性可用来为客户端数据指定一些信息或者用来进行验证。
	示例代码：ch41\MVC\MVCSampleApp\Models\Menu.cs
	可用于验证的特性包括：用于比较不同属性的CompareAttribute，用于验证信用卡号的CreditCardAttribute，用来验证电子邮件地址的EmailAddressAttribute，用来比较输入与枚举值的EnumDataTypeAttribute，以及用来验证电话号码的PhoneAttribute。
还可以使用其他特性来获得要显示的值，或者用在错误消息中的值，如DataTypeAttribute和DisplayFormatAttriibute。
为了使用验证特性，可以在动作方法内使用ModelState.IsValid来验证模型的状态
示例代码：ch41\MVC\MVCSampleApp\Controllers\SubmitDataController.cs
	如果使用由工具生成的模型类，那么很难给属性添加特性。工具生成的类被定义为部分类，可以通过为其添加属性和方法、实现额外的接口或者实现它们使用的部分方法来扩展这些类。对于已有的属性和方法是不能添加特性的，但是还是可以利用一些帮助。假定Menu是一个工具生成的部分类。可以用一个不同名的新类如MenuMetaData定义与实体类相同的属性，并添加注释。MenuMetadata类必须链接到Menu类。对于工具生成的部分类，可以在同一个名称空间中创建另一个部分类型，将MetadataType特性添加到创建连接的该类型定义：
	示例代码：ch41\MVC\MenuPlanner\Models\MenuMetadata.cs
               ch41\MVC\MenuPlanner\Models\Menu.cs
HTML Helper
HTML Helper也可以使用注释来向客户端添加信息。
	Html是视图基类WebViewPage的一个属性，它的类型是HtmlHelper。HTML Help方法被实现为扩展方法，用于扩展HtmlHelper类。
类InputExtensions定义了用于创建复选框、密码控件、单选按钮和文本框控件的HTML Helper方法。Helper方法Action和RenderAction由类ChildActionExtensions定义。用于显示的Helper方法由类DisplayExtensions定义。用于HTML表单的Helper方法由类FormExtensions定义。
@{
    ViewBag.Title = "Helper1";
}
<h2>Helper1</h2>
@using (Html.BeginForm())
{
    // @Html.Display("check this")
    // @Html.DisplayName("display name")
    // @Html.Label("Check this (or not)")
    @Html.DisplayName("check this (or not)")
    @Html.CheckBox("check1", isChecked: false)
    <div>
    </div>
@Html.TextBox("text1", "input text here", new { required = "required", maxlength = 15, @class = "CSSDemo" });
//Html.EndForm();在释放MvcForm时，会调用EndForm。
}
	得到的HTML代码如下所示：
<form action="/HelperMethods/Helper1" method="post">
Check this (or not)
<input id="check1" name;"check1" type;"checkbox" value;"true" />
<input name;"check1" type;"hidden" value="false" />
</form>
CbeckBox方法创建了两个同名的input元素，其中一个被设为隐藏。其原因是，如果一个复选框的值为false， 那么浏览器不会把与之对应的信息放到表单内容中传递给服务器。只有选中复选框的值才会传递给服务器。这种HTML特征在自动绑定到动作方法的参数时会产生问题。简单的解决办法是使用Helper方法CheckBox，该方法会创建一个同名但被隐藏的input元素，并将其设为false。如果没有选中该复选框，则会把隐藏的input元素传递给服务器，绑定一个错误值。如果选中了复选框，则同名的两个input元素都会传递给服务器。第一个input 元素被设为true，第二个被设为false。在自动绑定时，只选择第一个input元素绑定。
	Helper方法可以使用模型数据。
public ActionResult HelperWithMenu()
{
     var menu = new Menu
     {
          Id = 1,
          Text = "Schweinsbraten mit Knödel und Sauerkraut",
          Price = 6.9,
          Date = new DateTime(2012, 10, 5),
          Category = "Main"
     };
     return View(menu);
}
HTML Helper方法DisplayName只是返回参数的文本。Display方法使用一个表达式作为参数，其中以字符串格式传递一个属性名。该方法试图找出具有这个名称的属性，然后使用属性存取器来返回该属性的值。
@model MVCSampleApp.Models.Menu
@{
    ViewBag.Title = "HelperWithMenu";
}
<h2>Helper with Menu</h2>
@Html.DisplayName("Text:")
@Html.Display("Text")
<br />
@Html.DisplayName("Category:")
@Html.Display("Category")
大多数HTML Helper方法都有一些可传递任何HTML特性的重载版本。
@Html.TextBox("text1", "input text here", new { required = "required", maxlength = 15, @class = "CSSDemo" });
因为class是C#的一个关键字，所以不能直接设为一个属性，而是要加上@作为前缀
创建列表示例：
public ActionResult HelperList()
{
     var cars = new Dictionary<int, string>();
     cars.Add(1, "Red Bull Racing");
     cars.Add(2, "McLaren");
     cars.Add(3, "Lotus");
     cars.Add(4, "Ferrari");
     return View(cars.ToSelectListItems(4));
}
自定义扩展方法ToSelectListItems
public static class SelectListItemsExtensions
{
     public static IEnumerable<SelectListItem> ToSelectListItems(this IDictionary<int, string> dict, int selectedId)
     {
          return dict.Select(item =>
              new SelectListItem
              {
                  Selected = item.Key == selectedId,
                  Text = item.Value,
                  Value = item.Key.ToString()
              });
    }
}
视图
@{
    ViewBag.Title = "Helper2";
}
@model IEnumerable<SelectListItem>
<h2>Helper2</h2>
@Html.ListBox("carslist1", Model)
@Html.DropDownList("carslist", Model)
HTML Helper方法提供了强类型化的方法来访问从控制器传递的模型，这些方法都带有后缀For。
public ActionResult StronglyTypedMenu()
{
     var menu = new Menu
     {
          Id = 1,
          Text = "Schweinsbraten mit Knödel und Sauerkraut",
          Price = 6.9,
          Category = "Main"
     };
     return View(menu);
}
视图使用Menu类型作为模型
@model MVCSampleApp.Models.Menu
@{
    ViewBag.Title = "StronglyTypedMenu";
}
@helper DisplayDay(DateTime day)
{
if (day < DateTime.Today)
{
        <span>History day</span>
}
    @String.Format("{0:d}", day);
}
<h2>StronglyTypedMenu</h2>
@Html.DisplayNameFor(m => m.Text)
<br />
@Html.DisplayFor(m => m.Text)
@Html.DisplayTextFor(m => m.Price)
@Html.TextBoxFor(m => m.Text)

@DisplayDay(Model.Date)
除了为每个属性使用至少一个Helper方法，EditorExtensions类中的Helper方法还给编辑器提供了类型的所有属性。通过方法Html.EditorFor(m=>m)构建一个用于编辑菜单的完整UI。还可以使用Html.EditorForModel()。
Razor指定了创建自定义Helper的语法。一种方法是创建一个扩展了HtmlHelper或HtmlHelper<TModel>类型的扩展方法。另一种方法是使用Razor的helper关键字。
@helper DisplayDay(DateTime day)
{
	if(day < DateTime.Today)
	{
		<span>History day</span>
}
@String.Format("{0:d}", day);
}
@Html.DisplayFor(m => m.Text)
@Html.DisplayTextFor(m => m.Price)
@Html.TextBoxFor(m => m.Text)
@DisplayDay(Model.Date)
使用模板是扩展HTML Helper的结果的一种好方法。显示模板存储在视图文件夹下的DisplayTemplates文件夹中或者存储在共享文件夹中。共享文件夹由全部视图使用，特定的视图文件夹则只有该文件夹中的视图可以使用。对于编辑器模板，则使用EditorTemplates文件夹。
<div class="markRed">
    @string.Format("{0:D}", Model)
</div>
现在可以像DisplayForModel这样显示的HTML Helper，来使用己定义的模板。模型的类型是Menu，所以DisplayForModel方法会显示Menu类型的所有属性。对于Date，它找到模板Date.cshtml，所以会使用该模板以CSS样式显示长日期格式的日期
@model MVCSampleApp.Models.Menu
@{
    ViewBag.Title = "Display";
}
<h2>Display</h2>
@Html.DisplayForModel()
创建数据驱动的应用程序
首先在Models目录中定义一个模型。使用ADO.NET Entity的模型设计器访问数据库Restaurant并定义实体。

![x](./Resource/136.png)


编译项目后，就可以选择模型中的类来创建控制器和视图。
动作过滤器
ASP.NET MVC在很多方面都可以扩展。可以实现控制器工厂，以搜索和实例化控制器(接口IControl1erFactory)。控制器实现了IController接口。使用IActionInvoker接口可以找出控制器中的动作方法。使用ActionMethodSelectorAttribute(…)可以定义允许的HTTP方法。通过实现IModelBinder接口，可以定制将HTTP请求映射到参数的模型绑定器。有实现了IviewEngine接口的不同视图引擎可供使用。使用HTML Helper也可以实现自定义，另外，也可以使用动作过滤器实现自定义。
在动作执行之前和之后，都会调用动作过滤器。使用特性可把它们分配给控制器或控制器的动作方法。通过创建派生自基类ActionFilterAttibute的类，可以实现动作过滤器。在这个类中，可以重写基类成员OnActionExecuting、OnActionExecuted、OnResultExecuting和OnResultExecuted。OnActionExecuting在动作方法调用之前被调用，OnActionExecuted在动作方法完成之后被调用。之后，在返回结果前，调用OnResultExecuting方法，最后再调用OnResultExecuted方法。在这些方法内，可以访问Request对象来检索调用者信息，根据浏览器决定执行某些操作，访问路由信息，动态修改视图结果等。
using System.Web.Mvc;

namespace MenuPlanner.Utilities
{
    public class LanguageAttribute : ActionFilterAttribute
    {
        private string language = null;

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            //base.OnActionExecuting(filterContext);
            //用路由信息添加 language 变量后，可以使用 RouteData.Values 访问 URL 中提供的值。
            //可以根据得到的值，为用户修改文化
            language = filterContext.RouteData.Values["language"] == null ?
                null : filterContext.RouteData.Values["language"].ToString();
            //...
        }

        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            base.OnActionExecuted(filterContext);
        }

        public override void OnResultExecuting(ResultExecutingContext filterContext)
        {
            base.OnResultExecuting(filterContext);
        }

        public override void OnResultExecuted(ResultExecutedContext filterContext)
        {
            base.OnResultExecuted(filterContext);
        }
    }

    public class X : FilterAttribute
    {

    }
}
使用创建的动作过滤器特性类，可以把该特性应用到一个控制器。对类应用特性后，在调用每个动作方法时，都会调用特性类的成员。另外，也可以把特性应用到一个动作方法，此时只有调用该动作方法时才会调用特性类的成员。
[Language]
    public class HomeController : Controller
{
}
ASP.NETMVC包含一些预定义的动作过滤器。可以使用OutputCacheAttribute来定义结果的缓存。一些预定义过滤器派生自基类FilterAttribute(它也是ActionFilterAttribute的基类)。使用基类FilterAttribute而不是ActionFilterAttribute时，只允许在调用动作方法前过滤它们，而不允许在调用后过滤。派生自FilterAttribute的类包括HandleErrorAttribute、AuthorizeAttribute和RequireHttpsAttribute。使用HandleError可以处理异常，并定义在发生错误时显示的视图。异常的类型也是可以过滤的，可以根据不同的异常类型指定不同的视图。指定RequireHttpsAttribute会检查请求是否通过HTTPS发送，如果不是，就拒绝调用动作方法。
身份验证和授权
以表单验证为例，可以使用Membership和RolesAPI。不能使用服务器端控件来处理。
为了允许用户登录，可以创建LoginModel控件(登录模型)。
using System.ComponentModel.DataAnnotations;

namespace MenuPlanner.Models
{
    public class LoginModel
    {
        [Required]
        [Display(Name = "User name")]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }
    }
}
用于用户登录的控制器是AcountController
using System.Web.Mvc;
using System.Web.Security;
using MenuPlanner.Models;

namespace MenuPlanner.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        /// <summary>
        /// GET: /Account/Login
        /// 返回 Login 视图，让用户输入用户名和密码
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        public ActionResult Login()
        {
            return View();
        }
        /// <summary>
        /// 将 HTML 表单的值赋值给模型 LoginModel 作为参数
        /// </summary>
        /// <param name="model"></param>
        /// <param name="returnUrl"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost]
        public ActionResult Login(LoginModel model, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                if (Membership.ValidateUser(model.UserName, model.Password))
                {
                    FormsAuthentication.SetAuthCookie(model.UserName, model.RememberMe);
                    if (Url.IsLocalUrl(returnUrl))
                    {
                        return Redirect(returnUrl);
                    }
                    else
                    {
                        return RedirectToAction("Index", "Home");
                    }
                }
                else
                {
                    ModelState.AddModelError("", "The user name or password provided is incorrect.");
                }
            }
            // If we got this far, something failed, redisplay form
            return View(model);
        }
        //
        // GET: /Account/LogOff
        public ActionResult LogOff()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Index", "Home");
        }
    }
}
为指定Login动作以及要使用的视图，在web.config文件中，将loginUrl设为Account控制器的Login 方法
<authentication mode="Forms">
    <forms loginUrl="~/Account/Login" timeout="2880" />
</authentication>
登录视图定义了一个使用Account控制器的表单，并基于模型定义了标签和输入控件。使用GET请求Login 动作时第一次调用该视图，随后它用一个POST请求调用Login动作，传递模型数据
@model MenuPlanner.Models.LoginModel

@{
    ViewBag.Title = "Log in";
}

<hgroup class="title">
    <h1>@ViewBag.Title.</h1>
    <h2>Enter your user name and password below.</h2>
</hgroup>

<script src="~/Scripts/jquery.validate.min.js"></script>
<script src="~/Scripts/jquery.validate.unobtrusive.min.js"></script>

@using (Html.BeginForm((string)ViewBag.FormAction, "Account"))
{
    @Html.ValidationSummary(true, "Log in was unsuccessful. Please correct the errors and try again.")

    <fieldset>
        <legend>Log in Form</legend>
        <ol>
            <li>
                @Html.LabelFor(m => m.UserName)
                @Html.TextBoxFor(m => m.UserName)
                @Html.ValidationMessageFor(m => m.UserName)
            </li>
            <li>
                @Html.LabelFor(m => m.Password)
                @Html.PasswordFor(m => m.Password)
                @Html.ValidationMessageFor(m => m.Password)
            </li>
            <li>
                @Html.CheckBoxFor(m => m.RememberMe)
                @Html.LabelFor(m => m.RememberMe, new { @class = "checkbox" })
            </li>
        </ol>
        <input type="submit" value="Log in" />
    </fieldset>
}
现在，只需要确保不是正确角色的用户不能访问方法。这可以通过对MenuAdminController类应用Authorize特性，并指定允许使用它的角色来完成
[Authorize(Roles = "Menu Admins")]
    public class MenuAdminController : Controller
{
}
对类应用该特性要求为类的每个动作方法使用角色。如果对不同的动作方法有不同的授权需求，也可以对动作方法应用Authorize特性。使用该特性时，可以验证调用者是否已被授权(通过检查授权cookie)。如果调用者还未经授权，则返回一个401 HTTP状态代码，并重定向到登录动作
ASP.NET Web API
ASP.NET MVC 4定义了一种很出色的新功能，它独立于UI，但是能够方便地用来完成基于REST的通信。
REST即表述性状态传递(英文：Representational State Transfer，简称REST)是Roy Fielding博士在2000年他的博士论文中提出来的一种软件架构风格。它是一种针对网络应用的设计和开发方式，可以降低开发的复杂性，提高系统的可伸缩性。
目前在三种主流的Web服务实现方案中，因为REST模式的Web服务与复杂的SOAP和XML-RPC对比来讲明显的更加简洁，越来越多的web服务开始采用REST风格设计和实现。
表述性状态转移是一组架构约束条件和原则。满足这些约束条件和原则的应用程序或设计就是RESTful。需要注意的是，REST是设计风格而不是标准。REST通常基于使用HTTP，URI和XML(标准通用标记语言下的一个子集)以及HTML(标准通用标记语言下的一个应用)这些现有的广泛流行的协议和标准。
REST定义了一组体系架构原则，您可以根据这些原则设计以系统资源为中心的Web服务，包括使用不同语言编写的客户端如何通过HTTP处理和传输资源状态。如果考虑使用它的Web服务的数量，REST近年来已经成为最主要的Web服务设计模式。事实上，REST对Web的影响非常大，由于其使用相当方便，已经普遍地取代了基于SOAP和WSDL的接口设计。
REST这个概念于2000年由Roy Fielding(HTTP规范的主要编写者之一)在就读加州大学欧文分校期间在学术论文“Architectural Styles and the Design of Network-based Software Architectures”首次提出。论文中对使用Web服务作为分布式计算平台的一系列软件体系结构原则进行了分析，其中提出的REST概念并没有获得太多关注。今天，REST的主要框架已经开始出现，但仍然在开发中。
ASP.NET Web API是一种通信技术，可用在任何使用HTTP协议的客户端，但是它的基础仍是：路由和控制器，只是这里不需要视图。
示例代码：
示例使用了两个实体类型Menu和MenuCard。这两个类型都有简单的属性，并且彼此之间存在关联。Menu类型直接关联一个MenuCard。而MenuCard包含一个Menu对象的集合：
using System.Runtime.Serialization;

namespace WebApiSample.Models
{
    [DataContract]
    public class Menu
    {
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public string Text { get; set; }
        [DataMember]
        public decimal Price { get; set; }
        [DataMember]
        public bool Active { get; set; }
        [DataMember]
        public int Order { get; set; }
        [DataMember]
        public MenuCard MenuCard { get; set; }
    }
}

using System.Collections.Generic;
using System.Runtime.Serialization;

namespace WebApiSample.Models
{
    [DataContract]
    public class MenuCard
    {
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public bool Active { get; set; }
        [DataMember]
        public int Order { get; set; }
        [IgnoreDataMember]
        public ICollection<Menu> Menus { get; set; }
    }
}
上下文用MenuCardModel类型定义，使用Code-First时，只需要为上下文定义DbSet类型的属性：
using System.Data.Entity;

namespace WebApiSample.Models
{
    public class MenuCardModel : DbContext
    {
        public DbSet<Menu> Menus { get; set; }
        public DbSet<MenuCard> MenuCards { get; set; }
    }
}
	使用Entity Framework Code-First时，如果还不存在数据库，则会自动创建一个。这里，创建的数据库会用数据填充。通过创建一个派生自DropCreateDatabaseAlways的类可以实现这一点。从该基类派生时，每次启动应用程序都会创建数据库。这里还可以使用另外一个基类DropCreateDatabaseIfModelChanges。此时，只有模型发生变化(如属性改变)时，才会创建数据库。为填充数据，需要重写Seed方法。Seed方法接收MenuCardModel，新对象通过该参数添加到上下文中，然后调用SaveChanges把对象写入数据库。
using System.Collections.Generic;
using System.Data.Entity;

namespace WebApiSample.Models
{
    public class MenuContextInitializer : DropCreateDatabaseAlways<MenuCardModel> // : DropCreateDatabaseIfModelChanges<MenuCardModel>
    {
        protected override void Seed(MenuCardModel context)
        {
            var cards = new List<MenuCard>
      {
        new MenuCard { Id = 1, Active = true, Name = "Soups", Order = 1 },
        new MenuCard { Id=2, Active = true, Name = "Main", Order = 2 }
      };
            cards.ForEach(c => context.MenuCards.Add(c));

            new List<Menu>
      {
        new Menu { Id=1, Active = true, Text = "Fritattensuppe", Order = 1, Price = 2.4M, MenuCard = cards[0] },
        new Menu { Id=2, Active = true, Text = "Wiener Schnitzel", Order = 2, Price= 6.9M, MenuCard=cards[1] }
      }.ForEach(m => context.Menus.Add(m));
            base.Seed(context);
        }
    }
}
	为使用上下文初始化器，必须调用Database类的SetInitializer方法来定义MenuContexInitializer。在全局应用程序类Global.asax.cs中编写下面代码用于在每次应用程序启动时设置上下文初始化器：
protected void Application_Start()
{
Database.SetInitializer(new MenuContextInitializer());
     …
}
因为ASP.NET Web API基于ASP.NET MVC，所以对它来说路由也非常重要。不同于ASP.NET MVC中使用MapRoute方法定义路由，在ASP.NET Web API中，路由是使用MapHttpRoute方法定义的。路由以api开头，后跟控制器的名称，然后是可选参数id。这里没有动作名称，而在ASP.NET MVC路由中，动作名称是必须存在的。在这里，控制器中的方法被命名为Get、POST、Put和Delete，与HTTP请求方法一一对应。
public static void RegisterRoutes(RouteCollection routes)
{
     routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
     routes.MapHttpRoute(
          name: "DefaultApi",
          routeTemplate: "api/{controller}/{id}",
          defaults: new { id = RouteParameter.Optional }
     );
     routes.MapRoute(
          name: "Default",
          url: "{controller}/{action}/{id}",
          defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
     );
}
	Web API控制器派生自基类ApiController。与前面已经实现的控制器不同，API控制器的方法名是基于HTTP方法的。
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Http;
using WebApiSample.Models;

namespace WebApiSample.Controllers
{
    public class MenusController : ApiController
    {
        private MenuCardModel data = new MenuCardModel();

        // GET /api/menus
        public IEnumerable<Menu> Get()
        {
            return data.Menus.Include("MenuCard").Where(m => m.Active).ToList();
        }

        // GET /api/menus/5
        public Menu Get(int id)
        {
            return data.Menus.Where(m => m.Id == id).Single();
        }

        // POST /api/menus
        public void Post(Menu m)
        {
            data.Menus.Add(m);
            data.SaveChanges();
        }

        // PUT /api/menus/5
        public void Put(int id, Menu m)
        {
            data.Menus.Attach(m);
            data.Entry(m).State = EntityState.Modified;
            data.SaveChanges();
        }

        // DELETE /api/menus/5
        public void Delete(int id)
        {
            var menu = data.Menus.Where(m => m.Id == id).Single();
            data.Menus.Remove(menu);
            data.SaveChanges();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
                data.Dispose();

            base.Dispose(disposing);
        }
    }
}
	使用jQuery的客户端应用程序示例：页面的HTML内容包含一个id为menu的空ul元素，在加载页面时由HTTP GET请求填充。最初，使用样式display:none隐藏了form元素，后面把它显示出来，以显示用户可以在哪里添加新菜单并用POST请求提交它们：
@{
    Layout = null;
}
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width" />
    <title>Menus</title>
    <script src="@Url.Content("~/Scripts/jquery-1.6.2.js")" type="text/javascript"></script>
    <script src="@Url.Content("~/Scripts/jQuery.tmpl.js")" type="text/javascript"></script>
    <script>
        $(function () {
            $.getJSON(
              "http://localhost:15390/api/menus",
              function (data) {
                  $.each(data,
                    function (index, value) {
                        $("#menusTemplate").tmpl(value).appendTo("#menus");
                    }
                    );
                  $("#addMenu").show();
              });

            $("#addMenu").submit(function () {
                $.post(
                  "http://localhost:15390/api/menus",
                  $("#addMenu").serialize(),
                  function (value) {
                      $("#menusTemplate").tmpl(value).appendTo("#menus");
                  },
                  "json"
                  );
            });
        });
    </script>
    <script id="menusTemplate" type="text/html">
        <li>
            <h3> ${ Text } </h3>
            <span>${ Id }</span>
            <span>Price: ${ Price }</span>
            <span>Menu card: ${ MenuCard.Name }</span>
        </li>
    </script>
</head>
<body>
    <div>
        <ul id="menus"></ul>
        <form method="post" id="addMenu" style="display: none">
            <fieldset>
                <legend>Add New Menu</legend>
                <ol>
                    <li>
                        <label for="Text">Text</label>
                        <input type="text" name="Text" />
                    </li>
                    <li>
                        <label for="Price">Price</label>
                        <input type="text" name="Price" />
                    </li>
                </ol>
            </fieldset>
            <input type="submit" value="Add" />
        </form>
    </div>
</body>
</html>
ASP.NET 动态数据
概述
如果希望构建数据驱动的站点，可能把ASP.NET元素(如数据表)直接绑定到数据库表上，或者包含一个数据对象的中间层，来表示数据库中的数据，并绑定到这些数据上。但是，因为这种情况非常常见，所以有一种替代方式: 使用一个架构来提供许多代码，而不是自己完成繁琐的编码工作。ASP.NET动态数据就是这样一个架构，它能非常容易地创建数据驱动的网站。除了提供上述代码(在动态数据网站中称为"搭框架(scaffolding)")之外，动态数据网站还提供了许多额外的功能。
创建动态数据Web应用程序
	示例数据源：

![x](./Resource/137.png)


通过命令创建动态数据站点时，有一个模板可用于动态数据: ASP.NET Dynamic Data Entities Web Application。
创建了Web应用程序后，下一步是添加数据源。这表示给项目添加一个新项: AOO.NET Entity Model模板。在添加之前，还可以把数据库的本地副本添加到网站的App_Code目录下，或者使用到SQL Server数据库的SQL连接。
	如果数据库用作一个测试，就可以把数据库添加到App_Code目录中之后，添加一个实体模型。在Add New Item 向导中，使用默认设置，给数据库中的所有表添加实体。
	接下来在网站的Global.asax文件中为"搭框架"配置数据模型。除了解释性的注释中提到的区别之外，这个文件在两个站点模板类型中相同。如果查春该文件，会发现通过一个模型配置网站的框架，该模型在应用程序级别上定义。
private static MetaModel s_defaultModel = new MetaModel();
public static MetaModel DefaultModel
{
     get
     {
          return s_defaultModel;
     }
}
Global.asax文件在RedisterRoutes()方法中访问这个模型，该方法在Application_Start()处理程序中调用。这个方法还配置了网站中的动态数据路由。
	DefaultModel.RegisterContext(typeof(YourDataContextType), new ContextConfiguration() { ScaffoldAllTables = false});
	给数据模型提供合适的数据上下文类型，还可以一开始就把ScaffoldAllTables属性改为true，以指示模型为所有可用的表提供框架。以后可以撤销这个改变，以便更精细地控制创建什么框架。
	现在，一切准备就绪，可以测试默认的动态数据网站了。可以在浏览器中查看Default.aspx页面，这个页面显示了到数据库中每个表的一个链接列表，还显示了在Default.aspx页面中定义的其他一些信息。
<%@ Page Language="C#" MasterPageFile="~/Site.master" CodeBehind="Default.aspx.cs" Inherits="DynamicDataSample._Default" %>

<asp:Content ID="headContent" ContentPlaceHolderID="head" runat="Server">
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <asp:ScriptManagerProxy ID="ScriptManagerProxy1" runat="server" />
    <h2 class="DDSubHeader">My tables</h2>
    <br />
    <br />
    <asp:GridView ID="Menu1" runat="server" AutoGenerateColumns="false"
        CssClass="DDGridView" RowStyle-CssClass="td" HeaderStyle-CssClass="th" CellPadding="6">
        <Columns>
            <asp:TemplateField HeaderText="Table Name" SortExpression="TableName">
                <ItemTemplate>
                    <asp:DynamicHyperLink ID="HyperLink1" runat="server"><%# Eval("DisplayName") %></asp:DynamicHyperLink>
                </ItemTemplate>
            </asp:TemplateField>
        </Columns>
    </asp:GridView>
</asp:Content>
上述代码中重要的部分是GridView控件，它包含一个DynamicHyperLink控件，后一个控件用于呈现表的链接。从代码隐藏中，把数据绑定到GridView控件上
using System;
using System.ComponentModel.DataAnnotations;
using System.Web.DynamicData;

namespace DynamicDataSample
{
    public partial class _Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            System.Collections.IList visibleTables = Global.DefaultModel.VisibleTables;
            if (visibleTables.Count == 0)
            {
                throw new InvalidOperationException("There are no accessible tables. Make sure that at least one data model is registered in Global.asax and scaffolding is enabled or implement custom pages.");
            }
            Menu1.DataSource = visibleTables;
            Menu1.DataBind();
        }
    }
}
这段代码从模型中提取可见表对应的一个列表(这里提取所有表，因为如前所述，为所有表都提供框架)。每个表都用一个MetaTable对象描述。DynamicHyperLink控件可根据这些对象的属性，智能地呈现表的页面链接。
定制动态数据网站
	有许多方式可以态定制动态数据网站，以达到预期的效果。这包括仅修改模板的HTML和CSS，以及定制通过代码呈现数据的方式和特性修改方式。
	在本章前面的示例动态数据网站中，为所有表(和这些表的所有列)自动配置了框架，为此，把网站的ContextConfiguration的ScaffoldTables属性设置为true。对于LINQ to SQL站点，代码如下所示: 
	DefaultModel.RegisterContext(typeof(MagicShopEntities), new ContextConfiguration() { ScaffoldAllTables = true });
如果把该值改为false，默认就不为任何表或列提供任何框架。为了指示动态数据架构给表或列搭建框架，必须在数据模型中提供元数据。动态数据运行库再读取这些元数据，来生成框架。元数据还可以提供其他事物的信息，如有效性验证逻辑。
	元数据用特性来添加。特性可应用于类型或属性，来影响UI。使用设计器生成的类型，可以把特性添加到类中。因为设计器生成的类被创建为部分类，所以再创建该类的另一个部分，以应用该特性。但是，不能把特性添加到设计器生成的属性中。如果这么做，则在重新生成设计器生成的代码时，所有的修改都会丢失。而这个问题有一个解决办法：用另一种方式完成。为了把元数据添加到实体的属性中，可以创建一个独立的元数据类，把相同的属性定义为实体类型，再在其中应用特性。
为表提供元数据需要执行两个步骤:
	为要提供元数据的每个表创建一个元数据类定义，该类的成员映射到表中的列
	把元数据类关联到数据模型表类上
所有数据模型项，即生成的代码项，是作为部分类定义的。例如，在示例代码中，有一个Customer类(包含在MagicShopModel.Designer.cs 文件中)用于Customer 表中的行。为了给Customer 表中的行提供元数据，需要创建CustomerMetadata类。之后，就可以给Customer类提供第二个部分类定义，并使用MetadataType特性把这些类链接起来。
在.NET Framework 中，通过数据注解支持元数据。MetadataType 特性和其他元数据特性都位于System.ComponentModeLDataAnnotations名称空间中。MetadataType 特性使用Type参数指定元数据的类型。控制框架的两个特性是ScaffoldTable 和ScaffoldColumn。这两个特性都有一个布尔参数，用于指定是否为表或列生成框架。
	示例：
using System.ComponentModel.DataAnnotations;

namespace DynamicDataSample
{
    [MetadataType(typeof(CustomerMetadata))]
    public partial class Customer
    {
    }
}

using System.ComponentModel.DataAnnotations;

namespace DynamicDataSample
{
    /// <summary>
    /// 源数据定义
    /// </summary>
    [ScaffoldTable(true)]
    public class CustomerMetadata
    {
        [ScaffoldColumn(true)]
        public string Address { get; set; }
    }
}
	其中，ScaffoldTable 特性指定，为Customer 表生成框架。ScaffoldColumn 特性用于确保不给Address 列搭建框架。注意，无论其类型是什么，该列都用object 类型属性表示。只需确保属性名匹配列名即可。
还可以应用其他Scaffolding 配置。通过ConfigurationContext 把Scaffolding 设置为false 时，就只显示应用了ScaffoldTable 特性的实体类型。
使用元数据类型，不仅可以配置应使用表还是列来搭框架，还可以应用其他注解，如StringLength。
通过一系列模板生成动态数据。页面模板用于在不同类型的列表和细目页面中布置控件，字段模板用于在显示、编辑和外键选择模式下显示不同的数据类型。所有这些项目模板都位于动态数据网站的DynamicData 子文件夹中，它的嵌套子文件夹：

![x](./Resource/138.png)


	下面讨论这些模板及其代码隐藏，看看它们如何契合在一起。例如，使用FieldTemplates目录下的两个字段模板显示文本列。第一个字段模板Text.ascx 如下
<%@ Control Language="C#" CodeBehind="Text.ascx.cs" Inherits="DynamicDataSample.TextField" %>
<asp:Literal runat="server" ID="Literal1" Text="<%# FieldValueString %>" />
	隐藏代码：
using System.Web.DynamicData;
using System.Web.UI;

namespace DynamicDataSample
{
    public partial class TextField : FieldTemplateUserControl
    {
        private const int MAX_DISPLAYLENGTH_IN_LIST = 25;

        public override string FieldValueString
        {
            get
            {
                string value = base.FieldValueString;
                if (ContainerType == ContainerType.List)
                {
                    if (value != null && value.Length > MAX_DISPLAYLENGTH_IN_LIST)
                    {
                        value = value.Substring(0, MAX_DISPLAYLENGTH_IN_LIST - 3) + "...";
                    }
                }
                return value;
            }
        }

        public override Control DataControl
        {
            get
            {
                return Literal1;
            }
        }

    }
}
	但如果该列处于可编辑模式，就使用Text_Edit.ascx。对于编辑模式，总是把_Edit添加到控件的文件名和基类型中
<%@ Control Language="C#" CodeBehind="Text_Edit.ascx.cs" Inherits="DynamicDataSample.Text_EditField" %>

<asp:TextBox ID="TextBox1" runat="server" Text='<%# FieldValueEditString %>' CssClass="DDTextBox"></asp:TextBox>

<asp:RequiredFieldValidator runat="server" ID="RequiredFieldValidator1" CssClass="DDControl DDValidator" ControlToValidate="TextBox1" Display="Static" Enabled="false" />
<asp:RegularExpressionValidator runat="server" ID="RegularExpressionValidator1" CssClass="DDControl DDValidator" ControlToValidate="TextBox1" Display="Static" Enabled="false" />
<asp:DynamicValidator runat="server" ID="DynamicValidator1" CssClass="DDControl DDValidator" ControlToValidate="TextBox1" Display="Static" />
	这3个验证控件如何工作由数据模型及其关联的元数据确定。代码隐藏文件：
using System;
using System.Collections.Specialized;
using System.Web.UI;

namespace DynamicDataSample
{
    public partial class Text_EditField : System.Web.DynamicData.FieldTemplateUserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Column.MaxLength < 20)
            {
                TextBox1.Columns = Column.MaxLength;
            }
            TextBox1.ToolTip = Column.Description;

            SetUpValidator(RequiredFieldValidator1);
            SetUpValidator(RegularExpressionValidator1);
            SetUpValidator(DynamicValidator1);
        }

        protected override void OnDataBinding(EventArgs e)
        {
            base.OnDataBinding(e);
            if (Column.MaxLength > 0)
            {
                TextBox1.MaxLength = Math.Max(FieldValueEditString.Length, Column.MaxLength);
            }
        }

        protected override void ExtractValues(IOrderedDictionary dictionary)
        {
            dictionary[Column.Name] = ConvertEditedValue(TextBox1.Text);
        }

        public override Control DataControl
        {
            get
            {
                return TextBox1;
            }
        }

    }
}
	现在考虑定制模板和修改模板的一些示例。显示所有的订单，OrderDate会显示日期和时间，在表的标题中，把OrderDate和OrderItems 标题改为Order Date 和Order Items。
	使用元数据OrderMetadata类，很容易满足这些需求。上面把CustomerMetadata映射到Customer类型上，Order 和OrderMetadata 之间的映射也是这样。
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Data.Objects.DataClasses;

namespace DynamicDataSample
{
    [ScaffoldTable(true)]
    public class OrderMetadata
    {
        [DisplayName("Order Date")]
        [DataType(DataType.Date)]
        public DateTime OrderDate { get; set; }

        [DisplayName("Order Items")]
        public EntityCollection<OrderItem> OrderItems { get; set; }
    }
}
	如果日期应使用另一种格式表示，例如应使用长日期格式，很容易创建一个自定义字段模板。尽管在创建项目时，日期类型的模板(用DataType特性定义)还不存在，但只要在FieldTemplates 文件夹中命名文件Date.ascx，就可以创建它。
<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Date.ascx.cs" Inherits="DynamicDataSample.DynamicData.FieldTemplates.DateField" %>
<asp:Literal runat="server" ID="Literal1" Text="<%# FieldValueString %>" />
	隐藏代码：
using System;
using System.Web.DynamicData;
using System.Web.UI;

namespace DynamicDataSample.DynamicData.FieldTemplates
{
    public partial class DateField : FieldTemplateUserControl
    {
        public override string FieldValueString
        {
            get
            {
                if (FieldValue == null) return null;
                DateTime date = (DateTime)FieldValue;
                return date.ToLongDateString();
            }
        }
        public override Control DataControl
        {
            get
            {
                return Literal1;
            }
        }
    }
}
再次运行应用程序，根据映射到类型的名称，来选择自定义模板。对于单个数据类型，应使用多个模板；可以使用UIHint特性来指定另一个名称的模板。
在处理动态数据站点时，一个需要掌握的重要概念是，页面是根据动作生成的。动作是定义页面应如何响应的方式，例如，用户单击了某个链接后页面应如何响应。默认定义了4个页面动作：List、Details、Edit和Insert。
为动态数据站点定义的每个页面模板(也称为视图)可以根据当前执行的动作做出不同的响应。网站的路由配置把动作和视图关联起来，每个路由都可以通过它应用的表选择性地进行约束。例如，可以创建一个用于列出客户的新视图。该视图可能执行与默认的List.aspx 视图不同的操作。要创建新视图，必须配置路由，以便使用正确的视图。
动态数据网站的默认路由在Global.aspx中配置，如下所示：
routes.Add(new DynamicDataRoute ("{table}/{action}.aspx")
{
     Constraints = new RouteValueDictionary(new { action = "List|Details|Edit|Insert" }),
     Model = DefaultModel
});
	如果要使用另一个视图列出客户，可以添加下面的路由
routes.Add(new DynamicDataRoute ("Customers/List.aspx")
{
     Table = "Customers",
Action = "PageAction.List",
ViewName = "ListCustomers",
     Model = DefaultModel
});
这个路由把/Customers/List.aspx对应的URL与ListCustomers.aspx视图关联起来，为了使代码能正常运行，必须在PageTemplates目录中提供该名称的文件。这里还指定了Table 和Action 属性，因为它们在URL 中不再可用。动态数据路由的工作方式是：使用{table}和{action}路由参数填充Table和Action 属性， 在这个URL 中，没有显示这些参数。以这种方式，可以构建非常复杂的路由系统，为表和动作提供专业化页面。还可以使用ListDetails.aspx 视图，它是数据的主从视图，允许选择行和内联编辑。要使用这个视图，可以提供其他路由：
routes.Add(new DynamicDataRoute("{table}/ListDetails.aspx")
{
     Action = PageAction.List,
     ViewName = "ListDetails",
     Model = DefaultModel
});
routes.Add(new DynamicDataRoute("{table}/ListDetails.aspx")
{
     Action = PageAction.Details,
     ViewName = "ListDetails",
     Model = DefaultModel
});
IOC
Day1
目录
Unity
Autofac
Ninject


Unity
先以微软提供的Unity做示例，你可以使用Nuget添加Unity，也可以引用Microsoft.Practices.Unity.dll和Microsoft.Practices.Unity.Configuration.dll，下面我们就一步一步的学习下Unity依赖注入的详细使用。
在MVC中，控制器依赖于模型对数据进行处理，也可以说执行业务逻辑。我们可以使用依赖注入（DI）在控制层分离模型层，这边要用到Repository模式，在领域驱动设计（DDD）中，Repository翻译为仓储，顾名思义，就是储存东西的仓库，可以理解为一种用来封装存储，读取和查找行为的机制，它模拟了一个对象集合。使用依赖注入（DI）就是对Repository进行管理，用于解决它与控制器之间耦合度问题，下面我们一步一步做一个简单示例。
安装Unity
首先我们需要新建一个UnityMVCDemo项目（ASP.NET MVC4.0），选择工具-库程序包管理器-程序包管理控制台，输入“Install-Package Unity.Mvc4”命令，VS2010可能需要先安装NuGet。

![x](./Resource/7.jpg)

安装Unity成功后，我们发现项目中多了“Microsoft.Practices.Unity”和“Microsoft.Practices.Unity.Configuration”两个引用，还有一个Bootstrapper类文件，Bootstrapper翻译为引导程序，也就是Ioc容器。
public static class Bootstrapper
{
    public static IUnityContainer Initialise()
    {
        var container = BuildUnityContainer();
        DependencyResolver.SetResolver(new UnityDependencyResolver(container));
        return container;
    }
	
    private static IUnityContainer BuildUnityContainer()
    {
        var container = new UnityContainer();

        // register all your components with the container here
        // it is NOT necessary to register your controllers

        // e.g. container.RegisterType<ITestService, TestService>();    
        RegisterTypes(container);

        return container;
    }
	
    public static void RegisterTypes(IUnityContainer container)
    {
			
    }
}
添加服务层
首先我们添加一个Article实体类：
/// <summary>
/// Article实体类
/// </summary>
public class Article
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }
    public string Content { get; set; }
    public DateTime CreateTime { get; set; }
}
一般Repository都有一些相似的操作，比如增删改查，我们可以把它抽象为IArticleRepository接口，这样控制器依赖于抽象接口，而不依赖于具体实现Repository类，符合依赖倒置原则，我们才可以使用Unity进行依赖注入。
/// <summary>
/// IArticleRepository接口
/// </summary>
public interface IArticleRepository
{
    IEnumerable<Article> GetAll();
    Article Get(int id);
    Article Add(Article item);
    bool Update(Article item);
    bool Delete(int id);
}
创建ArticleRepository，依赖于IArticleRepository接口，实现基本操作。
public class ArticleRepository : IArticleRepository
{
    private List<Article> Articles = new List<Article>();
		
	public ArticleRepository()
    {
        //添加演示数据
        Add(new Article { Id = 1, Title = "UnityMVCDemo1", Content = "UnityMVCDemo", Author = "xishuai", CreateTime = DateTime.Now });
        Add(new Article { Id = 2, Title = "UnityMVCDemo2", Content = "UnityMVCDemo", Author = "xishuai", CreateTime = DateTime.Now });
        Add(new Article { Id = 3, Title = "UnityMVCDemo2", Content = "UnityMVCDemo", Author = "xishuai", CreateTime = DateTime.Now });
    }
		
    /// <summary>
    /// 获取全部文章
    /// </summary>
    /// <returns></returns>
    public IEnumerable GetAll()
    {
        return Articles;
    }
		
    /// <summary>
    /// 通过ID获取文章
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public Article Get(int id)
    {
        return Articles.Find(p => p.Id == id);
    }
		
    /// <summary>
    /// 添加文章
    /// </summary>
    /// <param name="item"></param>
    /// <returns></returns>
    public Article Add(Article item)
    {
        if (item == null)
        {
            throw new ArgumentNullException("item");
        }
        Articles.Add(item);
        return item;
    }
		
    /// <summary>
    /// 更新文章
    /// </summary>
    /// <param name="item"></param>
    /// <returns></returns>
    public bool Update(Article item)
    {
        if (item == null)
        {
            throw new ArgumentNullException("item");
        }
        int index = Articles.FindIndex(p => p.Id == item.Id);
        if (index == -1)
        {
            return false;
        }
        Articles.RemoveAt(index);
        Articles.Add(item);
        return true;
    }
		
    /// <summary>
    /// 删除文章
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public bool Delete(int id)
    {
        Articles.RemoveAll(p => p.Id == id);
        return true;
    }
}
IArticleRepository类型映射
上面工作做好后，我们需要在Bootstrapper中的BuildUnityContainer方法添加此类型映射。
private static IUnityContainer BuildUnityContainer()
{
    var container = new UnityContainer();
		
    // register all your components with the container here
    // it is NOT necessary to register your controllers
    container.RegisterType<IArticleRepository, ArticleRepository>();

    // e.g. container.RegisterType<ITestService, TestService>();    
    RegisterTypes(container);

    return container;
}
我们还可以在配置文件中添加类型映射，UnityContainer根据配置信息，自动注册相关类型，这样我们就只要改配置文件了，推荐配置文件方法：
<configSections>
    <section name="unity" type="Microsoft.Practices.Unity.Configuration.UnityConfigurationSection,
            Microsoft.Practices.Unity.Configuration" />
</configSections>
<unity>
    <containers>
        <container name="defaultContainer">
            <register type="UnityMVCDemo.Models.IArticleRepository, UnityMVCDemo" 
					   mapTo="UnityMVCDemo.Models.ArticleRepository, UnityMVCDemo"/>
        </container>
    </containers>
</unity>
注意configSections节点要放在configuration节点下的第一个节点，关于Unity的配置文件配置参照http://www.cnblogs.com/xishuai/p/3670292.html，加载配置文件代码：
UnityConfigurationSection configuration = (UnityConfigurationSection)ConfigurationManager.GetSection(UnityConfigurationSection.SectionName); 
configuration.Configure(container, "defaultContainer");
上面这段代码替换掉上面使用的RegisterType方法。
服务注入到控制器
在ArticleController中我们使用是构造器注入方式，当然还有属性注入和方法注入，可以看到ArticleController依赖于抽象IArticleRepository接口，而并不是依赖于ArticleRepository具体实现类。
public class ArticleController : Controller
{
    readonly IArticleRepository repository;
    //构造器注入
    public ArticleController(IArticleRepository repository)
    {
        this.repository = repository;
    }
	
    public ActionResult Index()
    {
        var data = repository.GetAll();
        return View(data);
    }
}
构造器注入（Constructor Injection）：IoC容器会智能地选择选择和调用适合的构造函数以创建依赖的对象。如果被选择的构造函数具有相应的参数，IoC容器在调用构造函数之前解析注册的依赖关系并自行获得相应参数对象。	
Global.asax中初始化
做完上面的工作后，我们需要在Global.asax中的Application_Start方法添加依赖注入初始化。
// Note: For instructions on enabling IIS6 or IIS7 classic mode, 
// visit http://go.microsoft.com/?LinkId=9394801
public class MvcApplication : System.Web.HttpApplication
{
    protected void Application_Start()
    {
        AreaRegistration.RegisterAllAreas();

        WebApiConfig.Register(GlobalConfiguration.Configuration);
        FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
        RouteConfig.RegisterRoutes(RouteTable.Routes);

        Bootstrapper.Initialise();
    }
}
	如果在控制台应用程序中，我们还需要获取调用者的对象，下面是代码片段
static void Main(string[] args)
{
    UnityContainer container = new UnityContainer();//创建容器
    container.RegisterType<IWaterTool, PressWater>();//注册依赖对象
    IPeople people = container.Resolve<VillagePeople>();//返回调用者
    people.DrinkWater();//喝水
}
	我们可以看到RegisterType的第一个参数是this IUnityContainer container，我们上面调用的时候并没有传递一个IUnityContainer 类型的参数，为什么这里会有一个this关键字，做什么用？其实这就是扩展方法。这个扩展方法在静态类中声明，定义一个静态方法（UnityContainerExtensions类和RegisterType都是静态的），其中第一个参数定义可它的扩展类型。RegisterType方法扩展了UnityContainerExtensions类，因为它的第一个参数定义了IUnityContainer（UnityContainerExtensions的抽象接口）类型，为了区分扩展方法和一般的静态方法，扩展方法还需要给第一个参数使用this关键字。
　　还有就是RegisterType的泛型约束 where TTo : TFrom; TTo必须是TFrom的派生类，就是说TTo依赖于TFrom。
	我们再来看下Resolve泛型方法的签名：
//
// 摘要:
//     Resolve an instance of the default requested type from the container.
//
// 参数:
//   container:
//     Container to resolve from.
//
//   overrides:
//     Any overrides for the resolve call.
//
// 类型参数:
//   T:
//     System.Type of object to get from the container.
//
// 返回结果:
//     The retrieved object.
public static T Resolve<T>(this IUnityContainer container, params ResolverOverride[] overrides);
	“Resolve an instance of the default requested type from the container”，这句话可以翻译为：解决从容器的默认请求的类型的实例，就是获取调用者的对象。
　　关于RegisterType和Resolve我们可以用自来水厂的例子来说明，请看下面：
•	RegisterType：可以看做是自来水厂决定用什么作为水源，可以是水库或是地下水，我只要“注册”开关一下就行了。
•	Resolve：可以看做是自来水厂要输送水的对象，可以是农村或是城市，我只要“控制”输出就行了。
Dependency属性注入
	属性注入（Property Injection）：如果需要使用到被依赖对象的某个属性，在被依赖对象被创建之后，IoC容器会自动初始化该属性。属性注入只需要在属性字段前面加[Dependency]标记就行了，如下：
/// <summary>
/// 村民
/// </summary>
public class VillagePeople : IPeople
{
    [Dependency]
    public IWaterTool _pw { get; set; }
	
    public void DrinkWater()
    {
        Console.WriteLine(_pw.returnWater());
    }
}
	调用方式和构造器注入一样。
InjectionMethod方法注入
	方法注入（Method Injection）：如果被依赖对象需要调用某个方法进行相应的初始化，在该对象创建之后，IoC容器会自动调用该方法。
	方法注入和属性方式使用一样，方法注入只需要在方法前加[InjectionMethod]标记就行了，从方法注入的定义上看，只是模糊的说对某个方法注入，并没有说明这个方法所依赖的对象注入，不言而喻，其实我们理解的方法注入就是对参数对象的注入，从typeConfig节点-method节点-param节点就可以看出来只有参数的配置，而并没有其他的配置。
非泛型注入
public static void FuTest04()
{
    UnityContainer container = new UnityContainer();//创建容器
    container.RegisterType(typeof(IWaterTool), typeof(PressWater));//注册依赖对象
    IPeople people = (IPeople)container.Resolve(typeof(VillagePeople));//返回调用者
    people.DrinkWater();//喝水
}
标识键
在Unity中，标识主要有两种方式， 一种是直接使用接口（或者基类）作为标识键，另一种是使用接口（或者基类）与名称的组合作为标识键，键对应的值就是具体类。
第一种使用接口（或者基类）作为标识键：
container.RegisterType<IWaterTool, PressWater>();
代码中的IWaterTool就是作为标识键，你可以可以使用基类或是抽象类作为标示，获取注册对象：
container.Resolve<IWaterTool>();
如果一个Ioc容器容器里面注册了多个接口或是基类标示，我们再这样获取就不知道注册的是哪一个？怎么解决，就是用接口或是基类与名称作为标识键，示例代码如下：
public static void FuTest05()
{
    UnityContainer container = new UnityContainer();//创建容器
    container.RegisterType<IWaterTool, PressWater>("WaterTool1");//注册依赖对象WaterTool1
	container.RegisterType<IWaterTool, PressWater>("WaterTool2");//注册依赖对象WaterTool2
    IWaterTool wt = container.Resolve<IWaterTool>("WaterTool1");//返回依赖对象WaterTool1
    var list = container.ResolveAll<IWaterTool>();//返回所有注册类型为IWaterTool的对象
}
自定义Unity对象生命周期管理集成ADO.NET Entity Framework
	在Unity中，从Unity 取得的实例为 Transient。如果你希望使用多线程方式，就需要在组成时使用lifecycle参数，这时候取出的组件就不再是同一个了。在Unity IOC中，它支持我们对于组件的实例进行控制，也就是说我们可以透明的管理一个组件拥有多少个实例。Unity IOC容器提供了如下几种生命处理方式：
Singleton：一个组件只有一个实例被创建，所有请求的客户使用程序得到的都是同一个实例。
Transient：这种处理方式与我们平时使用new的效果是一样的，对于每次的请求得到的都是一个新的实例。
Custom：自定义的生命处理方式。
我要增加一个Request，一个Request请求一个实例，然后在Request结束的时候，回收资源。增加一个Resquest级别的LifetimeManager，HttpContext.Items中数据是Request期间共享数据用的，所以HttpContext.Items中放一个字典，用类型为key，类型的实例为value。如果当前Context.Items中有类型的实例，就直接返回实例。ObjectContext本身是有缓存的，整个Request内都是一个ObjectContext，ObjectContext一级缓存能力进一步利用。
用在Unity中，如何获取对象的实例及如何销毁对象都是由LifetimeManager完成的，其定义如下
public abstract class LifetimeManager : ILifetimePolicy, IBuilderPolicy
{
    protected LifetimeManager();

    public abstract object GetValue();
    public abstract void RemoveValue();
    public abstract void SetValue(object newValue);
}
其中GetValue方法获取对象实例，RemoveValue方法销毁对象，SetValue方法为对外引用的保存提供新的实例。
有了这3个方法，就可以通过自定义LifetimeManager来实现从HttpContext中取值。
下面我们来实现Unity集成ADO.NET Entity Framework的工作：
	http://www.cnblogs.com/shanyou/archive/2008/08/24/1275059.html
	(Continue…)

为了实现单例模式，我们通常的做法是，在类中定义一个方法如GetInstance，判断如果实例为null则新建一个实例，否则就返回已有实例。但是这种做法将对象的生命周期管理与类本身耦合在了一起。所以遇到需要使用单例的地方，应该将生命周期管理的职责转移到对象容器Ioc上，而我们的类依然是一个干净的类，使用Unity创建单例代码：
public static void FuTest07()
{
    UnityContainer container = new UnityContainer();//创建容器
    container.RegisterType<IWaterTool, PressWater>(new ContainerControlledLifetimeManager());//注册依赖对象
    IPeople people = container.Resolve<VillagePeople>();//返回调用者
    people.DrinkWater();//喝水
}
	上面演示了将IWaterTool注册为PressWater，并声明为单例，ContainerControlledLifetimeManager字面意思上就是Ioc容器管理声明周期，我们也可以不使用类型映射，将某个类注册为单例：
	container.RegisterType<PressWater>(new ContainerControlledLifetimeManager());
除了将类型注册为单例，我们也可以将已有对象注册为单例，使用RegisterInstance方法，示例代码：
	PressWater pw = new PressWater();
	container.RegisterInstance<IWaterTool>(pw);
	上面的代码就表示将PressWater的pw对象注册到Ioc容器中，并声明为单例。
　　如果我们在注册类型的时候没有指定ContainerControlledLifetimeManager对象，Resolve获取的对象的生命周期是短暂的，Ioc容器并不会保存获取对象的引用，就是说我们再次Resolve获取对象的时候，获取的是一个全新的对象，如果我们指定ContainerControlledLifetimeManager，类型注册后，我们再次Resolve获取的对象就是上次创建的对象，而不是再重新创建对象，这也就是单例的意思。
Unity的app.config节点配置
	上面所说的三种注入方式，包括单例创建都是在代码中去配置的，当然只是演示用，这种配置都会产生耦合度，比如添加一个属性注入或是方法注入都要去属性或是方法前加[Dependency]和[InjectionMethod]标记，我们想要的依赖注入应该是去配置文件中配置，当系统发生变化，我们不应去修改代码，而是在配置文件中修改，这才是真正使用依赖注入解决耦合度所达到的效果



Autofac
Autofac是一款IOC框架，比较于其他的IOC框架，它很轻量级，性能上非常高。
官方网站http://autofac.org/
源码下载地址https://github.com/autofac/Autofac
基本使用
方法1：
var builder = new ContainerBuilder();

builder.RegisterType<TestService>();
builder.RegisterType<TestDao>().As<ITestDao>();

return builder.Build();
为了统一管理 IoC 相关的代码，并避免在底层类库中到处引用 Autofac 这个第三方组件，定义了一个专门用于管理需要依赖注入的接口与实现类的空接口 IDependency：
/// <summary>
/// 依赖注入接口，表示该接口的实现类将自动注册到IoC容器中
/// </summary>
public interface IDependency
{ 

}
这个接口没有任何方法，不会对系统的业务逻辑造成污染，所有需要进行依赖注入的接口，都要继承这个空接口，例如：
业务单元操作接口：
/// <summary>
/// 业务单元操作接口
/// </summary>
public interface IUnitOfWork : IDependency
{
    ...
}
Autofac 是支持批量子类注册的，有了 IDependency 这个基接口，我们只需要 Global 中很简单的几行代码，就可以完成整个系统的依赖注入匹配：
ContainerBuilder builder = new ContainerBuilder();
builder.RegisterGeneric(typeof(Repository<,>)).As(typeof(IRepository<,>));
Type baseType = typeof(IDependency);

// 获取所有相关类库的程序集
Assembly[] assemblies = ...

builder.RegisterAssemblyTypes(assemblies)
    .Where(type => baseType.IsAssignableFrom(type) && !type.IsAbstract)
    .AsImplementedInterfaces().InstancePerLifetimeScope();//InstancePerLifetimeScope 保证对象生命周期基于请求
IContainer container = builder.Build();
DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
如此，只有站点主类库需要引用 Autofac，而不是到处都存在着注入的相关代码，大大降低了系统的复杂度。
创建实例方法
1、InstancePerDependency
对每一个依赖或每一次调用创建一个新的唯一的实例。这也是默认的创建实例的方式。
官方文档解释：Configure the component so that every dependent component or call to Resolve() gets a new, unique instance (default.)
2、InstancePerLifetimeScope
在一个生命周期域中，每一个依赖或调用创建一个单一的共享的实例，且每一个不同的生命周期域，实例是唯一的，不共享的。
官方文档解释：Configure the component so that every dependent component or call to Resolve() within a single ILifetimeScope gets the same, shared instance. Dependent components in different lifetime scopes will get different instances.
3、InstancePerMatchingLifetimeScope
在一个做标识的生命周期域中，每一个依赖或调用创建一个单一的共享的实例。打了标识了的生命周期域中的子标识域中可以共享父级域中的实例。若在整个继承层次中没有找到打标识的生命周期域，则会抛出异常：DependencyResolutionException。
官方文档解释：Configure the component so that every dependent component or call to Resolve() within a ILifetimeScope tagged with any of the provided tags value gets the same, shared instance. Dependent components in lifetime scopes that are children of the tagged scope will share the parent's instance. If no appropriately tagged scope can be found in the hierarchy an DependencyResolutionException is thrown.
4、InstancePerOwned
在一个生命周期域中所拥有的实例创建的生命周期中，每一个依赖组件或调用Resolve()方法创建一个单一的共享的实例，并且子生命周期域共享父生命周期域中的实例。若在继承层级中没有发现合适的拥有子实例的生命周期域，则抛出异常：DependencyResolutionException。
官方文档解释：
Configure the component so that every dependent component or call to Resolve() within a ILifetimeScope created by an owned instance gets the same, shared instance. Dependent components in lifetime scopes that are children of the owned instance scope will share the parent's instance. If no appropriate owned instance scope can be found in the hierarchy an DependencyResolutionException is thrown.
5、SingleInstance
每一次依赖组件或调用Resolve()方法都会得到一个相同的共享的实例。其实就是单例模式。
官方文档解释：Configure the component so that every dependent component or call to Resolve() gets the same, shared instance.
6、InstancePerHttpRequest
在一次Http请求上下文中,共享一个组件实例。仅适用于asp.net mvc开发。
示例
毫无疑问，微软最青睐的IoC容器不是spring.net,unity而是Autofac，因为他的高效，因为他的简洁，所以微软主导的orchard项目用的也是它，下面用一个简单的实例来说明一个Autofac的用法，主要使用Autofac.dll，Autofac.Configuration.dll。
/// <summary>
/// DB Operate Interface
/// </summary>
public interface IRepository
{
    void Get();
}

/// <summary>
/// 对SQL数据源操作
/// </summary>
public class SqlRepository : IRepository
{
    #region IRepository 成员

    public void Get()
    {
        Console.WriteLine("sql数据源");
    }

    #endregion
}

/// <summary>
/// 对redis数据源操作
/// </summary>
public class RedisRepository : IRepository
{
    #region IRepository 成员

    public void Get()
    {
        Console.WriteLine("Redis数据源");
    }

    #endregion
}

/// <summary>
/// 数据源基类
/// </summary>
public class DBBase
{
    public DBBase(IRepository iRepository)
    {
        _iRepository = iRepository;
    }
    public IRepository _iRepository;
        
	public void Search(string commandText)
    {
        _iRepository.Get();
    }
}
现在去调用它吧：
//直接指定实例类型
var builder = new ContainerBuilder();
builder.RegisterType<DBBase>();
builder.RegisterType<SqlRepository>().As<IRepository>();
using (var container = builder.Build())
{
    var manager = container.Resolve<DBBase>();
    manager.Search("SELECT * FORM USER");
}
这里通过 ContainerBuilder 的方法 RegisterType() 对 DBBase 类型进行注册，注册的类型在后面相应得到的 Container(容器) 中可以 Resolve 得到类型实例。
builder.RegisterType<SqlRepository>().As<IRepository>(); 通过 AS 可以让 DBBase 类中通过构造函数依赖注入类型相应的接口。
Build()方法生成一个对应的 Container(容器) 实例，这样，就可以通过 Resolve 解析到注册的类型实例。
显然以上的程序中，SqlRepository 或者 RedisRepository 已经暴露于客户程序中了，现在将该类型选择通过文件配置进行读取。
Autofac 自带了一个 Autofac.Configuration.dll 非常方便地对类型进行配置，避免了程序的重新编译。
修改App.config：
<configuration> 
  <configSections> 
    <section name="autofac" type="Autofac.Configuration.SectionHandler, Autofac.Configuration"/> 
  </configSections> 
  <autofac defaultAssembly="AutofacDemo"> 
    <components> 
      <component type="AutofacDemo.SqlRepository, AutofacDemo" service="AutofacDemo.IRepository" /> 
    </components> 
  </autofac> 
</configuration>
通过Autofac.Configuration.SectionHandler配置节点对组件进行处理。
对应的客户端程序改为：
//通过配置文件实现对象的创建
var builder2 = new ContainerBuilder();
builder2.RegisterType<DBBase>();
builder2.RegisterModule(new ConfigurationSettingsReader("autofac"));
using (var container = builder2.Build())
{
    var manager = container.Resolve<DBBase>();
    manager.Search("SELECT * FORM USER");
}
另外还有一种方式，通过Register方法进行注册：
//通过配置文件，配合 Register 方法来创建对象
var builder3 = new ContainerBuilder();
builder3.RegisterModule(new ConfigurationSettingsReader("autofac"));
builder3.Register(c => new DBBase(c.Resolve<IRepository>()));
using (var container = builder3.Build())
{
    var manager = container.Resolve<DBBase>();
    manager.Search("SELECT * FORM USER");
}
现在通过一个用户类来控制操作权限，比如增删改的权限，创建一个用户类：
/// <summary> 
/// Id Identity Interface 
/// </summary> 
public interface Identity 
{ 
    int Id { get; set; } 
} 

public class User : Identity 
{ 
    public int Id { get; set; } 
    public string Name { get; set; } 
}
修改DBBase.cs代码：
/// <summary>
/// 数据源基类
/// </summary>
public class DBBase
{
	public IRepository _iRepository;
	public User _user;

    public DBBase(IRepository iRepository) : this(iRepository, null)
    {
        _iRepository = iRepository;
    }
    
	public DBBase(IRepository iRepository, User user)
    {
        _iRepository = iRepository;
		_user = user;
    }
	
	/// <summary> 
    /// Check Authority 
    /// </summary> 
    /// <returns></returns> 
    public bool IsAuthority() 
    { 
        bool result = _user != null && _user.Id == 1 && _user.Name == "Colin" ? true : false; 
        if (!result) 
            Console.WriteLine("Not authority!");
        return result; 
    }
        
	public void Search(string commandText)
    {
		if (IsAuthority()) 
			_iRepository.Get();
    }
}
在构造函数中增加了一个参数User，而Search增加了权限判断。
修改客户端程序：
User user = new User { Id = 1, Name = "Colin" }; 
var builder3 = new ContainerBuilder();
builder3.RegisterModule(new ConfigurationSettingsReader("autofac"));
builder3.RegisterInstance(user).As<User>(); 
builder3.Register(c => new DBBase(c.Resolve<IRepository>(), c.Resolve<User>()));
using (var container = builder3.Build())
{
    var manager = container.Resolve<DBBase>();
    manager.Search("SELECT * FORM USER");
}
builder3.RegisterInstance(user).As<User>();注册User实例。
builder3.Register(c => new DBBase(c.Resolve<IRepository>(), c.Resolve<User>()));通过Lampda表达式注册DBBase实例。

ORM
Day1
	ORM框架做数据持久层，数据持久层同Web表现层之间的连接采用IOC容器。
	
目录
Ibatisnet

Ibatisnet
	ibatisNet帮助手册


AOP
Day1
AOP（ASPect-Oriented Programming，面向方面编程），它是OOP（Object-Oriented Programing，面向对象编程）的补充和完善。我们把软件系统分为两个部分：核心关注点和横切关注点。业务处理的主要流程是核心关注点，与之关系不大的部分是横切关注点。横切关注点的一个特点是，他们经常发生在核心关注点的多处，而各处都基本相似。比如权限认证、日志、异常捕获、事务处理、缓存等。 
目前在.Net下实现AOP的方式分为两大类：
一是采用动态代理技术，利用截取消息的方式，对该消息进行装饰，以取代或修饰原有对象行为的执行，例如Castle的AspectSharp；
二是采用静态织入的方式，引入特定的语法创建“方面”，从而使得编译器可以在编译期间织入有关“方面”的代码。
动态代理实现方式利用.Net的Attribute和.Net Remoting的代理技术，对对象执行期间的上下文消息进行截取，并以消息传递的方式执行，从而可以在执行期间加入相关处理逻辑实现面向方面的功能;而静态织入的方式实现一般是要依靠一些第三方框架提供特定的语法，例如PostSharp，它的实现方式是采用 MSIL Injection和MSBuild Task在编译时置入方面的代码，从而实现AOP。
目录
AspectSharp









WCF
WCF(Windows Communication Foundation)是.NET Framework的扩展，WCF提供了创建安全的、可靠的、事务服务的统一框架，WCF整合和扩展了现有分布式系统的开发技术，如Microsoft .NET Remoting、Web Services、Web Services Enhancements(WSE)等等，来开发统一的可靠的应用程序系统。
WCF简化了SOA框架的应用，同时也统一了Enterprise Services、Messaging、.NET Remoting、Web Services、WSE等技术，极大的方便了开发人员进行WCF应用程序的开发和部署，同时也降低了WCF应用开发的复杂度。
在了解了WCF的概念和通信原理，以及为什么要使用WCF之后，就能够明白WCF在现在的应用程序开发中所起到的作用，WCF能够实现不同技术和平台之间的安全性、可依赖性和用户操作性的实现，对大型应用程序开发起到促进作用。
Windows Communication Foundation(WCF)是.NET Framework上灵活的通信技术。在.NET 3.0推出之前，一个企业解决方案需要几种通信技术。对于独立于平台的通信，使用ASP.NET Web服务。对于比较高级的Web服务一一可靠性、独立于平台的安全性和原子事务等技术——Web Services Enhancements增加了ASP.NET Web服务的复杂性。如果要求通信比较快，客户和服务都是NET应用程序，就应使用.NET Remoting技术。.NET Enterprise Services支持自动事务处理，它默认使用DCOM协议，比用.NET Remoting快。DCOM也是允许传递事务的唯一协议。所有这些技术都有不同的编程模型，这些模型都需要开发人员有许多技巧。
	.NET Framework 3.0引入了一种通信技术WCF，它包含上述技术的所有功能，把它们合并到一个编程模型中：Windows Communication Foundation(WCF)。名称空间是System.ServiceModel
	WCF合并了ASP.NET Web服务、.NET Remoting、消息队列和Enterprise Services的功能，WCF的功能包括:
	存储组件和服务一一与联合使用自定义主机、.NET Remoting和WSE一样，也可以将WCF服务存放在ASP.NET运行库、Windows服务、COM+ 进程或Windows窗体应用程序中，进行对等计算。
	声明行为一一不要求派生自基类(这个要求存在于.NET Remoting 和Enterprise Services中)，而可以使用属性定义服务。这类似于用ASP.NET开发的Web服务。
	通信信道一一在改变通信信道方面，.NET Remoting非常灵活，WCF也不错，因为它提供了相同的灵活性。WCF提供了用HTTP、TCP和IPC信道进行通信的多条信道。也可以创建使用不同传输协议的自定义信道。
	安全结构一一为了实现独立于平台的Web服务，必须使用标准化的安全环境。所提出的标准用WSE3.0实现，这在WCF中被继承下来。
	可扩展性——.NET Remoting有丰富的扩展功能。它不仅能创建自定义信道、格式化程序和代理，还能将功能注入客户端和服务器上的消息流。WCF提供了类似的可扩展性。但是，WCF的扩展性用SOAP标题创建。
	支持以前的技术一一要使用WCF，根本不需要完全重写分布式解决方案，因为WCF可以与己有的技术集成。WCF提供的信道使用DCOM与服务组件通信。用ASP.NET开发的Web服务也可以与WCF集成。
	最终目标是通过进程或不同的系统、通过本地网络或通过Internet收发客户和服务之间的消息。如果需要以独立于平台的方式尽快收发消息，就应这么做。在远程视图上，服务提供了一个端点，它用协定、绑定和地址来描述。协定定义了服务提供的操作，绑定给出了协议和编码信息，地址是服务的位置。客户需要一个兼容的端点来访问服务。
	下图显示了参与WCF通信的组件

![x](./Resource/9.jpg)


	客户调用代理上的一个方法。代理提供了服务定义的方法，但把方法调用转换为一条消息，并把该消息传输到信道上。信道有一个客户端部分和一个服务器端部分，它们通过一个网络协议来通信。在信道上，把消息传递给调度程序，调度程序再把消息转换为用服务调用的方法调用。
WCF支持几个通信协议。为了进行独立于平台的通信，需要支持Web服务标准。要在.NET应用程序之间通信，可以使用较快的通信协议，其系统开销较小。
	下面几节介绍用于独立于平台的通信的核心服务的功能。
	SOAP(Simple Object Access Protocol，简单对象访问协议): 一个独立于平台的协议，它是几个Web服务规范的基础，支持安全性、事务、可靠性。
	WSDL(Web Services Description Language。Web服务描述语言): 提供描述服务的元数据。
	REST(Representational State Transfer，代表性状态传输): 由支持REST的Web服务用于在HTTP上通信。
	JSON(JavaScript Object Notation，JavaScript对象标记): 便于在JavaScript客户端上使用。
SOAP
	为了进行独立于平台的通信，可以使用SOAP协议，它得到WCF的直接支持。SOAP最初是Simple Object Accesss Protocol的缩写，但自从SOAP 1.2以来，就不再是这样了。SOAP不再是一个对象访问协议，因为可以发送用XML架构定义的消息。服务从客户中接收SOAP消息，并返回一条SOAP响应消息。SOAP消息包含信封，信封包含标题和正文。标题是可选的，可以包含寻址、安全性和事务信息。正文包含消息数据。
WSDL
	WSDL(Web Services Description Language，Web服务描述语言)文档描述了服务的操作和消息。WSDL定义了服务的元数据，这些元数据可用于为客户端应用程序创建代理。
WSDL包含如下信息：
	消息的类型——用XML架构描述。
	从服务中收发的消息一一消息的各部分是用XML架构定义的类型。
	端口类型一一映射服务协定，列出了用服务协定定义的操作。操作包含消息，例如，与请求和响应序列一起使用的输入和输出消息。
	绑定信息一一包含用端口类型列出的操作和用SOAP变体定义的操作。
	服务信息一一把端口类型映射到端点地址。
在WCF中，WSDL信息由MEX(Metedata Exchange，元数据交换)端点提供。
REST
WCF还提供了使用REST进行通信的功能。REST并不是一个协议，但定义了使用服务访问资源的几条规则。支持REST的Web服务是基于HTTP协议和REST规则的简单服务。规则按3个类别来定义：可以用简单的URI访问的服务，支持MIME(Multipurpose Internet Mail Extensions, 描述消息内容类型的因特网标准)类型，以及使用不同的HTTP方法。支持MIME类型，就可以从服务中返回不同的数据格式，如普通XML、JSON或AtomPub。HTTP请求的GET()方法从服务中返回数据。其他方法有PUT()、POST()和DELETE()。 PUT()方法用于更新服务端，POST()方法可创建一个新资源，DELETE()方法删除资源。
REST允许给服务发送的请求比SOAP小。如果不需要SOAP提供的事务、安全消息(例如，安全通信仍可通过HTTPS进行)和可靠性，则利用REST构建的服务可以减小系统开销。
使用REST体系结构时，服务总是无状态的，服务的响应可以缓存。
JSON
除了发送SOAP消息之外，从JavaScript中访问服务最好使用JSON。.NET包含一个数据协定序列化程序，可以用JSON标记创建对象。
JSON的系统开销比SOAP小，因为它不是XML，而是为JavaScript客户端进行了优化。这使之非常适用于从Ajax客户端使用。JSON没有提供通过SOAP标题发送所具备的可靠性、安全性和事务功能，但这些通常是JavaScript客户端不需要的功能。
API
System.ServiceModel.ServiceContractAttribute
Indicates that an interface or a class defines a service contract in a Windows Communication Foundation (WCF) application.
Use the ServiceContractAttribute attribute on an interface (or class) to define a service contract. Then use the OperationContractAttribute attribute on one or more of the class (or interface) methods to define the contract's service operations. When the service contract is implemented and combined with a Windows Communication Foundation Bindings and an EndpointAddress object, the service contract is exposed(公开) for use by clients.
The information expressed by a ServiceContractAttribute and its interface is loosely related(松散相关) to the Web Services Description Language (WSDL) <portType> element. A service contract is used on the service side to specify what the service’s endpoint exposes(公开、暴露) to callers. It is also used on the client side to specify the contract of the endpoint with which the client communicates and, in the case of duplex contracts(双工协定), to specify the callback contract (using the CallbackContract property) that the client must implement in order to participate(参与) in a duplex conversation(对话).
Use the ServiceContractAttribute properties to modify the service contract.
	The ConfigurationName property specifies the name of the service element in the configuration file to use.
	The Name and Namespace properties control the name and namespace of the contract in the WSDL <portType> element.
	The SessionMode property specifies whether the contract requires a binding that supports sessions.
	The CallbackContract property specifies the return contract in a two-way (duplex) conversation.
	The HasProtectionLevel and ProtectionLevel properties indicate(指示) whether all messages supporting the contract have a explicit(显式) ProtectionLevel value, and if so, what that level is.
Services implement service contracts, which represent the data exchange that a service type supports. A service class can implement a service contract (by implementing an interface marked with ServiceContractAttribute that has methods marked with OperationContractAttribute) or it can be marked with the ServiceContractAttribute and apply the OperationContractAttribute attribute to its own methods. (If a class implements an interface marked with ServiceContractAttribute, it cannot be itself marked with ServiceContractAttribute.) Methods on service types that are marked with the OperationContractAttribute are treated as part of a default service contract specified by the service type itself.
By default, the Name and Namespace properties are the name of the contract type and http://tempuri.org, respectively(分别地，各自地，且), and ProtectionLevel is ProtectionLevel.None. It is recommended(建议) that service contracts explicitly set their names, namespaces, and protection levels using these properties. Doing so accomplishes(实现) two goals. First, it builds a contract that is not directly connected to the managed type(托管类型) information, enabling you to refactor(重构) your managed code and namespaces without breaking the contract as it is expressed in WSDL. Second, explicitly requiring a certain level of protection on the contract itself enables the runtime to validate whether the binding configuration supports that level of security, preventing poor configuration from exposing(公开、揭露) sensitive(敏感) information.
To expose a service for use by client applications, create a host application to register your service endpoint with Windows Communication Foundation (WCF). You can host(承载) WCF services using Windows Activation Services (WAS), in console applications, Windows Service applications, ASP.NET applications, Windows Forms applications, or any other kind of application domain.
Hosting in the WAS is very similar to creating an ASP.NET application.
Clients either use the service contract interface (the interface marked with ServiceContractAttribute) to create a channel to the service or they use the client objects (which combine the type information of the service contract interface with the ClientBase<TChannel> class) to communicate with your service.
Using a ServiceContractAttribute class or interface to inherit from another ServiceContractAttribute class or interface extends the parent contract. For example, if an IChildContract interface is marked with ServiceContractAttribute and inherited from another service contract interface, IParentContract, the IChildContract service contract contains the methods of both IParentContract and IChildContract. Extending(扩展) contracts (whether on classes or interfaces) is very similar to extending managed classes and interfaces.
The most flexible(灵活) approach to creating services is to define service contract interfaces first and then have your service class implement that interface. (This is also the simplest way to build your services if you must implement service contracts that have been defined by others.) Building services directly by marking a class with ServiceContractAttribute and its methods with OperationContractAttribute works when the service exposes only one contract (but that contract can be exposed by more than one endpoint).
Use the CallbackContractproperty to indicate another service contract that, when bound together with the original service contract, define a message exchange that can flow in two ways independently.
reference: https://msdn.microsoft.com/zh-cn/library/system.servicemodel.servicecontractattribute(v=vs.110).aspx
example:
The following code example shows how to apply the ServiceContractAttribute to an interface to define a service contract with one service method, indicated by the OperationContractAttribute. In this case, the protection level required of bindings for all messages is ProtectionLevel.EncryptAndSign.
The code example then implements that contract on the SampleService class.
using System;
using System.Collections.Generic;
using System.Net.Security;
using System.ServiceModel;
using System.Text;

namespace Microsoft.WCF.Documentation
{
  [ServiceContract(
    Namespace="http://microsoft.wcf.documentation",
    Name="SampleService",
    ProtectionLevel=ProtectionLevel.EncryptAndSign
  )]
  public interface ISampleService{
    [OperationContract]
    string SampleMethod(string msg);
  }

  class SampleService : ISampleService
  {
  #region ISampleService Members

  public string  SampleMethod(string msg)
  {
 	  return "The service greets you: " + msg;
  }

  #endregion
  }
}

The following code example shows a simple client that invokes the preceding(前述的) SampleService.
using System;
using System.ServiceModel;
using System.ServiceModel.Channels;

public class Client
{
  public static void Main()
  {
    // Picks up configuration from the config file.
    SampleServiceClient wcfClient = new SampleServiceClient();
    try
    {
        // Making calls.
        Console.WriteLine("Enter the greeting to send: ");
        string greeting = Console.ReadLine();
        Console.WriteLine("The service responded: " + wcfClient.SampleMethod(greeting));

        Console.WriteLine("Press ENTER to exit:");
        Console.ReadLine();

        // Done with service. 
        wcfClient.Close();
        Console.WriteLine("Done!");
    }
    catch (TimeoutException timeProblem)
    {
      Console.WriteLine("The service operation timed out. " + timeProblem.Message);
      wcfClient.Abort();
      Console.Read();
    }
    catch(CommunicationException commProblem)
    {
      Console.WriteLine("There was a communication problem. " + commProblem.Message);
      wcfClient.Abort();
      Console.Read();
    }
  }
}

System.Runtime.Serialization.DataContractAttribute
Specifies that the type defines or implements a data contract and is serializable by a serializer, such as the DataContractSerializer. To make their type serializable, type authors must define a data contract for their type.
Apply the DataContractAttribute attribute to types (classes, structures, or enumerations) that are used in serialization and deserialization operations by the DataContractSerializer. If you send or receive messages by using the Windows Communication Foundation (WCF) infrastructure(基础结构), you should also apply the DataContractAttribute to any classes that hold and manipulate(操作) data sent in messages.
You must also apply the DataMemberAttribute to any field, property, or event that holds values you want to serialize. By applying the DataContractAttribute, you explicitly enable the DataContractSerializer to serialize and deserialize the data.
A data contract is an abstract description of a set of fields with a name and data type for each field. The data contract exists outside of any single implementation to allow services on different platforms to interoperate(交互操作). As long as the data passed between the services conforms(符合) to the same contract, all the services can process the data. This processing is also known as a loosely coupled system(松耦合系统). A data contract is also similar to an interface in that the contract specifies how data must be delivered so that it can be processed by an application. For example, the data contract may call for a data type named "Person" that has two text fields, named "FirstName" and "LastName". To create a data contract, apply the DataContractAttribute to the class and apply the DataMemberAttribute to any fields or properties that must be serialized.
When serialized, the data conforms to(符合) the data contract that is implicitly(隐式) built into the type.
A data contract differs significantly(明显) from an actual interface in its inheritance behavior. Interfaces are inherited by any derived types(派生类型). When you apply the DataContractAttribute to a base class, the derived types do not inherit the attribute or the behavior. However, if a derived type has a data contract, the data members of the base class are serialized. However, you must apply the DataMemberAttribute to new members in a derived class to make them serializable.
If you are exchanging data with other services, you must describe the data contract. For the current version of the DataContractSerializer, an XML schema can be used to define data contracts. (Other forms of metadata/description could be used for the same purpose). To create an XML schema from your application, use the ServiceModel Metadata Utility(实用) Tool (Svcutil.exe) with the /dconly command line option. When the input to the tool is an assembly, by default, the tool generates a set of XML schemas that define all the data contract types found in that assembly. Conversely(反过来), you can also use the Svcutil.exe tool to create Visual Basic or C# class definitions that conform to the requirements of XML schemas that use constructs that can be expressed by data contracts. In this case, the /dconly command line option is not required.
If the input to the Svcutil.exe tool is an XML schema, by default, the tool creates a set of classes.If you examine those classes, you find that the DataContractAttribute has been applied. You can use those classes to create a new application to process data that must be exchanged with other services.
You can also run the tool against an endpoint that returns a Web Services Description Language (WSDL) document to automatically generate the code and configuration to create an Windows Communication Foundation (WCF) client. The generated code includes types that are marked with the DataContractAttribute.
A data contract has two basic requirements: a stable(稳定的) name and a list of members. The stable name consists of the namespace uniform resource identifier (URI) and the local name of the contract. By default, when you apply the DataContractAttribute to a class, it uses the class name as the local name and the class's namespace (prefixed with "http://schemas.datacontract.org/2004/07/") as the namespace URI. You can override the defaults by setting the Name and Namespace properties. You can also change the namespace by applying the ContractNamespaceAttribute to the namespace. Use this capability when you have an existing type that processes data exactly as you require but has a different namespace and class name from the data contract. By overriding the default values, you can reuse your existing type and have the serialized data conform to the data contract.
In any code, you can use the word DataContract instead of the longer DataContractAttribute.
A data contract can also accommodate(兼容) later versions of itself. That is, when a later version of the contract includes extra data, that data is stored and returned to a sender untouched(不变). To do this, implement the IExtensibleDataObject interface.
reference: https://msdn.microsoft.com/zh-cn/library/system.runtime.serialization.datacontractattribute(v=vs.110).aspx
The following example serializes and deserializes a class named Person to which the DataContractAttribute has been applied. Note that the Namespace and Name properties have been set to values that override the default settings.
namespace DataContractAttributeExample
{
    // Set the Name and Namespace properties to new values.
    [DataContract(Name = "Customer", Namespace = "http://www.contoso.com")]
    class Person : IExtensibleDataObject
    {
        // To implement the IExtensibleDataObject interface, you must also
        // implement the ExtensionData property.
        private ExtensionDataObject extensionDataObjectValue;
        public ExtensionDataObject ExtensionData
        {
            get
            {
                return extensionDataObjectValue;
            }
            set
            {
                extensionDataObjectValue = value;
            }
        }

        [DataMember(Name = "CustName")]
        internal string Name;

        [DataMember(Name = "CustID")]
        internal int ID;

        public Person(string newName, int newID)
        {
            Name = newName;
            ID = newID;
        }

    }

    class Test
    {
        public static void Main()
        {
            try
            {
                WriteObject("DataContractExample.xml");
                ReadObject("DataContractExample.xml");
                Console.WriteLine("Press Enter to end");
                Console.ReadLine();
            }
            catch (SerializationException se)
            {
                Console.WriteLine
                ("The serialization operation failed. Reason: {0}",
                  se.Message);
                Console.WriteLine(se.Data);
                Console.ReadLine();
            }
        }

        public static void WriteObject(string path)
        {
            // Create a new instance of the Person class and 
            // serialize it to an XML file.
            Person p1 = new Person("Mary", 1);
            // Create a new instance of a StreamWriter
            // to read and write the data.
            FileStream fs = new FileStream(path,
            FileMode.Create);
            XmlDictionaryWriter writer = XmlDictionaryWriter.CreateTextWriter(fs);
            DataContractSerializer ser =
                new DataContractSerializer(typeof(Person));
            ser.WriteObject(writer, p1);
            Console.WriteLine("Finished writing object.");
            writer.Close();
            fs.Close();
        }
        public static void ReadObject(string path)
        {
            // Deserialize an instance of the Person class 
            // from an XML file. First create an instance of the 
            // XmlDictionaryReader.
            FileStream fs = new FileStream(path, FileMode.OpenOrCreate);
            XmlDictionaryReader reader =
                XmlDictionaryReader.CreateTextReader(fs, new XmlDictionaryReaderQuotas());

            // Create the DataContractSerializer instance.
            DataContractSerializer ser =
                new DataContractSerializer(typeof(Person));

            // Deserialize the data and read it from the instance.
            Person newPerson = (Person)ser.ReadObject(reader);
            Console.WriteLine("Reading this object:");
            Console.WriteLine(String.Format("{0}, ID: {1}",
            newPerson.Name, newPerson.ID));
            fs.Close();
        }

    }
}

创建简单的服务和客户端
下面是创建服务和客户端的步骤：
(1)创建服务和数据协定。
(2)使用ADO.NET Entity Framework创建访问数据库的库文件。
(3)实现服务。
(4)使用WCF服务宿主(Service Host)和WCF测试客户端(Test Client)。
(5)创建定制的服务宿主。
(6)使用元数据创建客户端应用程序。
(7)使用共享的协定创建客户端应用程序。
(8)配置诊断设置。
定义服务和数据协定
	创建一个新类RoomReservation来定义数据库中需要的数据，并在网络中传送。要通过WCF服务发送数据，应给该类附加DataContract和DataMember属性。System.ComponentModel.DataAnnotations名称空间中的StringLength属性不仅可用于验证用户输入，还可以在创建数据库表时定义列的模式。
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using System.Runtime.Serialization;

namespace Wrox.ProCSharp.WCF.Contracts
{
    /// <summary>
    /// 一个需要在网络中传送的类的示例
    /// </summary>
    [DataContract(Namespace = "http://www.cninnovation.com/Services/2012")]
    public class RoomReservation : INotifyPropertyChanged
    {
        private int id;
        [DataMember]
        public int Id
        {
            get { return id; }
            set { SetProperty(ref id, value); }
        }

        private string roomName;
        [DataMember]
        [StringLength(30)]
        public string RoomName
        {
            get { return roomName; }
            set { SetProperty(ref roomName, value); }
        }

        private DateTime startTime;
        [DataMember]
        public DateTime StartTime
        {
            get { return startTime; }
            set { SetProperty(ref startTime, value); }
        }

        private DateTime endTime;
        [DataMember]
        public DateTime EndTime
        {
            get { return endTime; }
            set { SetProperty(ref endTime, value); }
        }

        private string contact;
        [DataMember]
        [StringLength(30)]
        public string Contact
        {
            get { return contact; }
            set { SetProperty(ref contact, value); }
        }

        private string text;
        [DataMember]
        [StringLength(50)]
        public string Text
        {
            get { return text; }
            set { SetProperty(ref text, value); }
        }

        protected virtual void OnNotifyPropertyChanged(string propertyName)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }

        protected virtual void SetProperty<T>(ref T item, T value, [CallerMemberName] string propertyName = null)
        {
            if (!EqualityComparer<T>.Default.Equals(item, value))
            {
                item = value;
                OnNotifyPropertyChanged(propertyName);
            }
        }

        public event PropertyChangedEventHandler PropertyChanged;
    }
}
接着创建服务协定，服务提供的操作可以通过接口来定义。服务协定用ServiceContract属性定义。由服务定义的操作应用了OperationContract属性。
using System;
using System.ServiceModel;

namespace Wrox.ProCSharp.WCF.Contracts
{
    /// <summary>
    /// 服务协定
    /// </summary>
    [ServiceContract(Namespace = "http://www.cninnovation.com/RoomReservation/2012")]
    public interface IRoomService
    {
        [OperationContract]
        [FaultContract(typeof(RoomReservationFault))]
        bool ReserveRoom(RoomReservation roomReservation);

        [OperationContract]
        [FaultContract(typeof(RoomReservationFault))]
        RoomReservation[] GetRoomReservations(DateTime fromDate, DateTime toDate);
    }
}

数据访问
接着，创建一个库RoomReservationData，来访问、读写数据库中的预订信息。这次使用Code First模型和ADO.NET Entity Framework，这样就不需要映射信息，所有对象都可以用代码来定义。还可以在运行期间随时创建数据库。下面示例代码中的类派生于DbContext，用作ADO.NET Entity Framework的上下文。
using System.Data.Entity;
using Wrox.ProCSharp.WCF.Contracts;

namespace Wrox.ProCSharp.WCF.Data
{
    /// <summary>
    /// 这个类派生于基类DbContext，用作ADO.NET Entity Framework的上下文
    /// </summary>
    public class RoomReservationContext : DbContext
    {
        public RoomReservationContext() : base("name=RoomReservation")
        {

        }

        public DbSet<RoomReservation> RoomReservations { get; set; }
    }
}
在类的默认构造函数中，调用了基类构造函数，来传递SQL连接字符串名。用这种方式创建的数据库名不会自动映射上下文的名称。如果在启动应用程序前数据库不存在，就会在第一次使用上下文时自动创建它。接着配置需要连接字符串的宿主应用程序。连接字符串示例如下：
<connectionStrings>
    <add name="RoomReservation" providerName="System.Data.SqlClient" connectionString="Server=(localdb)\v11.0;Database=RoomReservation;Trusted_Connection=true;Integrated Security=True;MultipleActiveResultSets=True"/>
</connectionStrings>
服务实现代码使用的功能用RoomReservationData类定义。
using System;
using System.Linq;
using Wrox.ProCSharp.WCF.Contracts;

namespace Wrox.ProCSharp.WCF.Data
{
    public class RoomReservationData
    {
        /// <summary>
        /// 将一条会议室预定记录写入数据库
        /// </summary>
        /// <param name="roomReservation"></param>
        public void ReserveRoom(RoomReservation roomReservation)
        {
            using (var data = new RoomReservationContext())
            {
                data.RoomReservations.Add(roomReservation);
                data.SaveChanges();
            }
        }
        /// <summary>
        /// 返回指定时间段会议室预定集合
        /// </summary>
        /// <param name="fromTime"></param>
        /// <param name="toTime"></param>
        /// <returns></returns>
        public RoomReservation[] GetReservations(DateTime fromTime, DateTime toTime)
        {
            using (var data = new RoomReservationContext())
            {
                return (from r in data.RoomReservations
                        where r.StartTime > fromTime && r.EndTime < toTime
                        select r).ToArray();
            }
        }
    }
}
服务的实现
创建一个WCF服务库RoomReservationService。这个库默认包含服务协定和服务实现。如果客户端应用程序只使用元数据信息来创建访问服务的代理，这个模型就是可用的。但是，如果客户端直接使用协定类型，则最好把协定放在一个独立的程序集中。如本例所示。在第一个己完成的客户端中，代理是从元数据中创建的。接着将介绍如何创建客户端，来共享协定程序集。把协定和实现分开，是共享协定的一个准备工作。
using System;
using System.ServiceModel;
using System.ServiceModel.Web;
using Wrox.ProCSharp.WCF.Contracts;
using Wrox.ProCSharp.WCF.Data;

namespace Wrox.ProCSharp.WCF.Service
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in both code and config file together.
    [ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall)]
    public class RoomReservationService : IRoomService
    {
        public bool ReserveRoom(RoomReservation roomReservation)
        {
            try
            {
                var data = new RoomReservationData();
                data.ReserveRoom(roomReservation);
            }
            catch (Exception ex)
            {
                RoomReservationFault fault = new RoomReservationFault { Message = ex.Message };
                throw new FaultException<RoomReservationFault>(fault);
            }
            return true;

        }

        [WebGet(UriTemplate = "Reservations?From={fromTime}&To={toTime}")]
        public RoomReservation[] GetRoomReservations(DateTime fromTime, DateTime toTime)
        {
            var data = new RoomReservationData();
            return data.GetReservations(fromTime, toTime);
        }
    }
}
WCF服务宿主和WCF测试客户端
WCF Service Library项目模板创建了一个应用程序配置文件App.config，它需要适用于新类名和新接口名。service元素引用了包含名称空间的服务类型RoomReservationService，协定接口需要用endpoint元素定义。
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
  <system.web>
    <compilation debug="true" />
  </system.web>
  <!-- When deploying the service library project, the content of the config file must be added to the host's 
  app.config file. System.Configuration does not support config files for libraries. -->
  <system.serviceModel>
    <services>
      <service name="Wrox.ProCSharp.WCF.Service.RoomReservationService">
        <endpoint address="" binding="basicHttpBinding" contract="Wrox.ProCSharp.WCF.Contracts.IRoomService">
          <identity>
            <dns value="localhost" />
          </identity>
        </endpoint>
        <endpoint address="mex" binding="mexHttpBinding" contract="IMetadataExchange" />
        <host>
          <baseAddresses>
            <add baseAddress="http://localhost:8733/Design_Time_Addresses/RoomReservationService/Service1/" />
          </baseAddresses>
        </host>
      </service>
    </services>
    <behaviors>
      <serviceBehaviors>
        <behavior>
          <!-- To avoid disclosing metadata information, 
          set the values below to false before deployment -->
          <serviceMetadata httpGetEnabled="True" httpsGetEnabled="True"/>
          <!-- To receive exception details in faults for debugging purposes, 
          set the value below to true.  Set to false before deployment 
          to avoid disclosing exception information -->
          <serviceDebug includeExceptionDetailInFaults="False" />
        </behavior>
      </serviceBehaviors>
    </behaviors>
  </system.serviceModel>
</configuration>
	从VS中启动这个库，会启动WCF服务宿主，它显示为任务栏的注意区域中的一个图标。单击这个图标会打开WCF服务宿主窗口。另外在项目属性的调试配置中，会发现己定义了命令行参数/client:"WcfTestClient.exe"。WCF服务主机使用这个选项，会启动WCF测试客户端。
自定义服务宿主
使用WCF可以在任意宿主上运行服务。对于服务主机，必须引用RoomReservationService库和System.ServiceModel程序集。该服务从实例化和打开ServiceHost类型的对象开始。这个类在System.ServiceModel名称空间中定义。实现该服务的RoomReservationService类在构造函数中定义。调用Open()方法会启动服务的监听器信道，该服务准备用于侦听请求。Close()方法会停止信道。下面的示例代码还添加了ServiceMetadataBehavior类型的一个操作，添加该操作，就允许使用WSDL创建一个客户端应用程序。
using System;
using System.ServiceModel;
using System.ServiceModel.Description;
using Wrox.ProCSharp.WCF.Service;

namespace Wrox.ProCSharp.WCF
{
    /// <summary>
    /// 一个自定义的服务宿主
    /// </summary>
    class Program
    {
        internal static ServiceHost myServiceHost = null;

        internal static void StartService()
        {
            try
            {
                myServiceHost = new ServiceHost(typeof(RoomReservationService), new Uri("http://localhost:9000/RoomReservation"));
                //添加 ServiceMetadataBehavior 类型的一个操作，添加该操作，允许 WSDL 创建一个客户端应用程序
                myServiceHost.Description.Behaviors.Add(new ServiceMetadataBehavior { HttpGetEnabled = true });
                //启动服务的监听器信道
                myServiceHost.Open();
            }
            catch (AddressAccessDeniedException)
            {
                Console.WriteLine("either start Visual Studio in elevated admin " +
                  "mode or register the listener port with netsh.exe");
            }
        }

        internal static void StopService()
        {
            if (myServiceHost != null &&
                myServiceHost.State == CommunicationState.Opened)
            {
                //停止信道
                myServiceHost.Close();
            }
        }

        static void Main()
        {
            StartService();

            Console.WriteLine("Server is running. Press return to exit");
            Console.ReadLine();

            StopService();
        }
    }
}
对于WCF配置，需要把用服务库创建的应用程序配置文件复制到宿主应用程序中。使用WCF Service Configuration Editor可以编辑这个配置文件。除了使用配置文件之外，还可以通过编程方式配置所有内容，并使用几个默认值。宿主应用程序的示例代码不需要任何配置文件。使用自定义服务宿主，可以在WCF库的项目设置中取消用来启动WCF服务宿主的WCF选项。
WCF客户端
因为服务宿主用ServiceMetadataBehavior配置，所以它提供了一个MEX端点。启动服务宿主后，就可以在VisualStudio中添加一个服务引用。在添加服务引用时，会弹出对话框。用URL：http://localhost:9000/RoomReservation?wsdl进入服务元数据的连接，把名称空间设置为RoomReservationService。这将为生成的代理类定义名称空间。
添加服务引用，会在服务中添加对System.Runtime.Serialization和System.ServiceModel程序集的引用，还会添加一个包含绑定信息和端点地址的配置文件。
从数据协定中把RoomReservation生成为一个部分类。这个类包含协定的所有[DataMember]元素。RoomServiceClient类是客户端的代理，该客户端包含由服务协定定义的方法。使用这个客户端，可以将会议室预订信息发送给正在运行的服务。
在代码文件中，通过按钮的Click事件调用ReserveRoomAsync方法。
using System;
using System.Windows;
using Wrox.ProCSharp.WCF.RoomReservationService;

namespace Wrox.ProCSharp.WCF
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// 客户端，使用元数据创建的一个代理类
    /// </summary>
    public partial class MainWindow : Window
    {
        private RoomReservation reservation;

        public MainWindow()
        {
            InitializeComponent();
            reservation = new RoomReservation { StartTime = DateTime.Now, EndTime = DateTime.Now.AddHours(1) };
            DataContext = reservation;
        }

        private async void OnReserveRoom(object sender, RoutedEventArgs e)
        {
            var client = new RoomServiceClient();
            //通过客户端代理调用方法
            bool reserved = await client.ReserveRoomAsync(reservation);
            client.Close();
            if (reserved)
                MessageBox.Show("reservation ok");
        }
    }
}
运行服务和客户端，创建数据库后，就可以将会议室预订信息添加到数据库中。在RoomReservation解决方案的设置中，可以配置多个启动项目，在本例中是RoomReservationClient和RoomReservationHost。
诊断
运行客户端和服务应用程序时，知道后台发生了什么很有帮助。为此，WCF需要配置一个跟踪源。可以使用Service Configuration Editor，选择Diagnostics节点，启用Tracing and Message Logging功能来配置跟踪。把跟踪源的跟踪级别设置为Verbose会生成非常详细的信息。这个配置更改把跟踪源和监昕器添加到应用程序配置文件中。
示例：978118314425_Full Code\314425 ch43 code\WCF\RoomReservation\ RoomReservationHost\App.config
与客户端共享协定程序集
在前面的WPF客户端应用程序中，使用元数据创建了一个代理类，用Visual Studio添加了一个服务引用。客户端也可以用共享的协定程序集来创建。使用协定接口和ChannelFactory<TChannel>来实例化连接到服务上的通道。
示例代码：978118314425_Full Code\314425 ch43 code\WCF\RoomReservation\RoomReservationClientSharedAssembly\MainWindow.xaml.cs
协定
协定定义了服务提供的功能和客户端可以使用的功能。协定可以完全独立于服务的实现代码。
由WCF定义的协定可以分为4种不同的类型：数据协定、服务协定、消息协定和错误协定。协定可以用.NET属性来指定:
	数据协定一一数据协定定义了从服务中接收和返回的数据。用于收发消息的类关联了数据协定属性。
	服务协定一一服务协定用于定义描述了服务的WSDL。这个协定用接口或类定义。
	操作协定一一操作协定定义了服务的操作，在服务协定中定义。
	消息协定一一如果需要完全控制SOAP消息，消息协定就可以指定应放在SOAP标题中的数据以及放在SOAP正文中的数据。
	错误协定一一错误协定定义了发送给客户端的错误硝息。
数据协定
	在数据协定中，把CLR类型映射到XML架构。数据协定不同于其他.NET序列化机制。在运行库序列化中，所有字段都会序列化(包括私有字段)。而在XML序列化中，只序列化公共字段和属性。数据协定要求用DataMember特性显式标记要序列化的字段。无论字段是私有或公共的，还是应用于属性，都可以使用这个特性。
	为了独立于平台和版本，如果要求用新版本修改数据，且不破坏旧客户端和服务，使用数据协定是指定要发送哪些数据的最佳方式。还可以使用XML序列化和运行库序列化。XML序列化是ASP.NET Web服务使用的机制。.NET Remoting使用运行库序列化。
	使用DataMember特性，可以指定下表属性。
属性	说明
Name	序列化元素的名称默认与应用了[DataMember]特性的字段或属性同名.使用Name属性可以修改该名称
Order	Order属性指定了数据成员的序列化顺序
IsRequired	使用IsRequired属性，可以指定元素必须经过序列化，才能接收。这个属性可以用于解决版本问题。如果在己有的协定中添加了成员，协定不会被破坏，因为在默认情况下字段是可选的(IsRequired = false). 将IsRequired属性设置为true，就可以破坏已有的协定
EmitDefaultValue	指定有默认值的成员是否应序列化，如果设置为true，该成员就不序列化
版本问题
	创建数据协定的新版本时，注意，如果应同时支持新旧客户端和新旧服务，就应执行相应的操作。
在定义协定时，应使用DataContractAttribute的Namespace属性添加XML名称空间信息。如果创建了数据协定的新版本，破坏了兼容性，就应改变这个名称空间。如果只添加了可选的成员，就没有破坏协定一一这就是一个可兼容的改变。旧客户端仍可以给新服务发送消息，因为不需要其他数据。新客户端可以给旧服务发送消息，因为旧服务仅忽略额外的数据。
删除字段或添加需要的字段会破坏协定。此时还应改变XML名称空间。名称空间的名称可以包含年份和月份，每次做了破坏性的修改时，都要改变名称空间，如把年份和月份改为实际值。
服务协定
	服务协定定义了服务可以执行的操作。ServiceContract特性与接口或类一起使用，来定义服务协定。由服务提供的方法通过IRoomService接口应用OperationContract特性
	能用ServiceContract特性设置的属性如下表所示
属性	说明
ConfigurationName	定义了配置文件中服务配置的名称
CallbackContract	当服务用于双工消息传递时，该属性定义了在客户端中实现的协定
Name	定义了WSDL中<portType>元素的名称
Namespace	定义了WSDL中<portType>元素的XML名称空间
SessionMode	定义调用这个协定的操作所需的会话。其值用SessionMode枚举定义，包括Allowed、NotAllowed和Required
ProtectionLevel	确定了绑定是否必须支持保护通信。其值用ProtectionLevel枚举定义，包括None、Sign、EncryptAndSign
使用OperationContract特性可以指定下表
属性	说明
Action	WCF使用SOAP请求的ActiON属性，把该请求映射到相应的方法上。 Action属性的默认值是协定XML名称空间、协定名和操作名的组合。该消息如果是一条响应消息，就把Response添加到Action字符串中。指定Action属性可以重写Action值。如果指定值"*"，服务操作就会处理所有消息
ReplyAction	Action属性设置了入站SOAP请求的Action名，而ReplyAction属性设置了回应消息的Action名
AsyncPattern	如果使用异步模式来实现操作，就把AsyncPattern属性设置为true。
IsInitiating
IsTerminating	如果协定由一系列操作组成，且初始化操作本应把IsInitiating属性赋予它，该系列的最后一个操作就需要指定IsTerminating属性。初始化操作启动一个新会话，服务器用终止操作来关闭会话。
IsOneWay	设置IsOneWay属性，客户端就不会等待回应消息。在发送请求消息后，单向操作的调用者无法直接检测失败
Name	操作的默认名称是指定了操作协定的方法名。使用Name属性可以修改该操作的名称
ProtectionLevel	使用ProtectionLevel属性可以确定消息是应只签名，还是应加密后签名
	在服务协定中，也可以用[DeliveryRequirements]特性定义服务的传输要求。RequireOrderedDelivery属性指定所发送的消息必须以相同的顺序到达。使用QueuedDeliveryRequirements属性可以指定，消息以断开连接的模式发送(例如：消息队列)。
消息协定
	如果需要完全控制SOAP消息，就可以使用消息协定。在消息协定中，可以指定消息的哪些部分要放在SOAP标题中，哪些部分要放在SOAP正文中。下面的例子显示了ProcessPersonRequestMessage类的一个消息协定。该消息协定用MessageContract特性指定。SOAP消息的标题和正文用MessageHeader和MessageBodyMember属性指定。指定Position属性，可以确定正文中的元素顺序。还可以为标题和正文字段指定保护级别。
	[MessageContract]
	public class ProcessPersonRequestMessage
	{
		[MessageHeader]
		public int employeeId;
		
[MessageBodyMember(Position=0)]
		public Person person;
}
	ProcessPersonRequestMessage类与用IProcessPerson接口定义的服务协定一起使用：
	[ServiceContract]
	public interface IProcessPerson
{
	[OperationContract]
	public PersonResponseMessage ProcessPerson(ProcessPersonRequestMessage message);
}
错误协定
	默认情况下，在服务中出现的详细异常消息不返回给客户端应用程序，其原因是安全性，不应把详细的异常消息提供给使用服务的第三方，而应记录到服务上(为此可以使用跟踪和事件日志功能)，包含有用信息的错误应返回调用者。
可以抛出一个FaultException异常，来返回SOAP错误。抛出FaultException异常会创建一个非类型化的SOAP错误。返回错误的首选方式是生成强类型化的SOAP错误。
	与强类型化的SOAP错误一起传递的信息用数据协定定义，如下面的示例代码所示。
示例代码：978118314425_Full Code\314425 ch43 code\WCF\RoomReservation\RoomReservationContracts\RoomReservationFault.cs
	SOAP错误的类型必须用FaultContractAttribute和操作协定定义：
	示例代码：IRoomService.cs
	在实现代码中，抛出一个FaultException<TDetail>异常。在构造函数中，可以指定一个新的TDetail对象，在本例中就是StateFault。另外，FaultReason中的错误信息可以赋予构造函数。FaultReason支持多种语言的错误信息。
	FaultReasonText[] text = new FaultReasonText[2];
	text[0] = new FaultReasonText("Sample Error", new CultureInfo("en"));
text[1] = new FaultReasonText("Beispiel Fehler", new CultureInfo("de"));
FaultReason reason = new FaultReason(text);
	throw new FaultException<RoomReservationFault>(
new RoomReservationFault(){ Message = m }, reason);
	在客户端应用程序中，可以捕获FaultException<StateFault>类型的异常。出现该异常的原因由Message属性定义。StateFault用Detail属性访问。
	try
{
	//…
}
catch(FaultException<RoomReservationFault> ex)
{
	Console.WriteLine(ex.Message);
	StateFault detail = ex.Detail;
	Console.WriteLine(detail.Message);
}
除了捕较强类型化的SOAP错误之外，客户端应用程序还可以捕获FaultException<Detail>的基类的异常：FaultException异常和ConununicationException异常。捕获CommunicationException异常还可以捕获与WCF通信相关的其他异常。
	在开发过程中，可以把异常返回给客户端。使用serviceDebug元素配置一个服务行为，它的IncludeExceptionDetailInFaults特性设置为true，来返回异常信息。
消息传递
客户端与服务器之间是通过消息进行信息通信的，通过使用消息，客户端和服务器之间能够通过使用消息交换来实现方法的调用和数据传递。
Request/Reply 模式是默认的消息传递模式，该模式调用服务器的方法后需要等待服务的消息返回，从而获取服务器返回的值。Request/Reply 模式是默认模式，在声明时无需添加其模式的声明。
One-way 模式和 Request/Reply 模式不同的是，如果使用 One-way 模式定义一个方法，该方法被调用后会立即返回。使用 One-way 模式修饰的方法必须是 void 方法，如果该方法不是 void 修饰的方法或者包括 out/ref 等参数，则不能使用 One-way 模式进行修饰。
WCF 的消息传递模式不仅包括这两种模式，还包括 duplex 模式，duplex 是 WCF 消息传递中比较复杂的一种模式。
消息操作
由于 WCF 的客户端和服务器之间都是通过消息响应和通信的，那么在 WCF 应用的运行过程中，消息是如何在程序之间进行操作的，这就需要通过 XML 文档来获取相应的结果。在客户端调用了服务器的方法时，就会产生消息，如 GetSum 方法。在 GetSum 方法的实现过程中，只需要进行简单的操作即可。
代码执行后，客户端会调用服务器的GetSum方法，服务器接受响应再返回给客户端相应的值。
在运行后，测试客户端能够获取请求时和响应时的XML文档，其中请求时产生的XML文档如下所示。
<s:Envelope xmlns:a=http://www.w3.org/2005/08/addressing 
			xmlns:s="http://www.w3.org/2003/05/soap-envelope">
	<s:Header>
		<a:Action s:mustUnderstand="1">http://tempuri.org/IService1/GetSum</a:Action>
		<a:MessageID>urn:uuid:dcc8a76e-deaf-45c4-a80c-2034b965d001</a:MessageID>
		<a:ReplyTo>
			<a:Address>http://www.w3.org/2005/08/addressing/anonymous</a:Address>
		</a:ReplyTo>
	</s:Header>
	<s:Body>
		<GetSum xmlns="http://tempuri.org/">
			<time>2008-10-03T17:30:00</time>
		</GetSum>
	</s:Body>
</s:Envelope>
从上述代码可以看到在Action节中，使用了相应的方法GetSum，在WCF服务库编程中可以通过使用OperationContract.Action捕获相应的Action 消息，示例代码如下所示。
[OperationContract(Action = "GetSum", ReplyAction = "GetSum")]
Message MyProcessMessage(Message m);
MyProcessMessage实现示例代码如下所示。
public Message MyProcessMessage(Message m)
{
     CompositeType t = m.GetBody<CompositeType>(); //获取消息
     Console.WriteLine(t.StringValue); //输出消息
     return Message.CreateMessage(MessageVersion.Soap11,
            "Add", "Hello World!"); //返回消息
}
上述代码将操作转换为消息后发送，开发人员可以通过Windows应用程序或ASP.NET应用程序获取修改后消息的内容。在进行消息的操作时，WCF还允许开发人员使用MessageContractAttribute/MessageHeaderAttribute来控制消息格式，这比DataContractAttribute要更加灵活。
创建了一个 WCF 服务之后，为了能够方便的使用 WCF 服务，就需要在客户端远程调用服务器端的 WCF 服务，使用 WCF 服务提供的方法并将服务中方法的执行结果呈现给用户，这样保证了服务器的安全性和代码的隐秘性。
为了能够方便的在不同的平台，不同的设备上使用执行相应的方法，这些方法不仅不能够暴露服务器地址，同样需要在不同的客户端上能呈现相同的效果，这些方法的使用和创建不能依赖本地的应用程序，为了实现跨平台的安全应用程序开发就需要使用 WCF。
创建了 WCF 服务，客户端就需要进行 WCF 服务的连接，如果不进行 WCF 服务的连接，则客户端无法知道在哪里找到 WCF 服务，也无法调用 WCF 提供的方法。首先需要创建一个客户端，客户端可以是 ASP.NET 应用程序也可以是 WinForm 应用程序。分别为 ASP.NET 应用程序和 WinForm 应用程序添加 WCF 引用后，就可以在相应的应用程序中使用 WCF 服务提供的方法了。
在客户端应用程序的开发中，几乎看不到服务器端提供的方法的实现，只能够使用服务器端提供的方法。对于客户端而言，服务器端提供的方法是不透明的。
ASP.NET客户端
在 ASP.NET 客户端中，可以使用 WCF 提供的服务实现相应的应用程序开发，例如通过地名获取麦当劳的商店的信息，而不想要在客户端使用数据库连接字串等容易暴露服务器端的信息，通过使用 WCF 服务提供的方法能够非常方便的实现这一点。Aspx 页面看代码如下所示。
<body>
  <form id="form1" runat="server">
  <div>
    输入地名：<asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
    <br />
    <br />
    获得的结果：<asp:TextBox ID="TextBox2" runat="server"></asp:TextBox>
    <br />
    <br />
    <asp:Button ID="Button1" runat="server" onclick="Button1_Click" Text="检索" />
  </div>
  </form>
</body>
上述代码在页面中拖放了两个 Textbox 控件分别用于用户输入和用户结果的返回，并拖放了一个按钮控件用于调用 WCF 服务中的方法并返回相应的值。后台程序如下所示：
protected void Button1_Click(object sender, EventArgs e)
{
  if (!String.IsNullOrEmpty(TextBox1.Text))
  {
    //开始使用 WCF 服务
    ServiceReference1.Service1Client ser = new Web.ServiceReference1.Service1Client();
    TextBox2.Text = ser.GetShopInformation(TextBox1.Text); //实现方法
  }
  else
  {
    TextBox2.Text = "无法检索,字符串为空"; //输出异常提示
  }
}
上述代码创建了一个 WCF 服务所提供的类的对象，通过调用该对象的 GetShopInformation 方法进行本地应用程序开发。
Win Form客户端
在 Win Form 客户端中使用 WCF 提供的服务也非常的方便，其使用方法基本同 ASP.NET 相同，这也说明了 WCF 应用的开发极大的提高了开发人员在不同客户端之间的开发效率，节约了开发成本。在 Win Form 客户端中拖动一些控件作为应用程序开发提供基本用户界面，示例代码如下所示：
private void InitializeComponent()
{
  this.textBox1 = new System.Windows.Forms.TextBox(); //创建textBox
  //创建TimePicker
  this.dateTimePicker1 = new System.Windows.Forms.DateTimePicker(); 
  this.SuspendLayout();
  //
  // textBox1
  //
  //实现textBox 属性
  this.textBox1.Location = new System.Drawing.Point(13, 13); 
  this.textBox1.Name = "textBox1"; 
  this.textBox1.Size = new System.Drawing.Size(144, 21); 
  this.textBox1.TabIndex = 0; 
  //
  // dateTimePicker1
  //
  //实现TimePicker 属性
  this.dateTimePicker1.Location = new System.Drawing.Point(166, 13); 
  this.dateTimePicker1.Name = "dateTimePicker1"; 
  this.dateTimePicker1.Size = new System.Drawing.Size(114, 21); 
  this.dateTimePicker1.TabIndex = 1; 
  this.dateTimePicker1.ValueChanged += new
  System.EventHandler(this.dateTimePicker1_ValueChanged);
  //
  // Form1
  //
  //实现Form 属性
  this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F); 
  this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font; 
  this.ClientSize = new System.Drawing.Size(292, 62); 
  this.Controls.Add(this.dateTimePicker1); //添加Form 控件
  this.Controls.Add(this.textBox1); //添加Form 控件
  this.Name = "Form1"; 
  this.Text = "Form1"; 
  this.ResumeLayout(false);
  this.PerformLayout();
}
上述代码在 Win From 窗体中创建了一个 TextBox 控件和一个 DataTimePicker 控件，并向窗体注册了dateTimePicker1_ValueChanged 事件，当 DataTimePicker 控件中的值改变后，则会输出相应天数的销售值。在前面的 WCF 服务中，为了实现销售值统计，创建了一个 GetSum 方法，在 Win From 窗体中无需再实现销售统计功能，只需要调用 WCF 服务提供的方法即可，示例代码如下所示：
private void dateTimePicker1_ValueChanged(object sender, EventArgs e)
{
  ServiceReference1.Service1Client ser = new WindowsForm.ServiceReference1.Service1Client();
  textBox1.Text = ser.GetSum(Convert.ToDateTime(dateTimePicker1.Text)).ToString();
}
上述代码使用了 WCF 服务中提供的 GetSum 方法进行了相应天数的销售额的统计，创建和使用 WCF 服务不仅能够实现不同客户端之间实现相同的功能，还通过 WCF 应用提供了一个安全性、可依赖、松耦合的开发环境，对于其中任何一种客户端的实现，都不会暴露服务器中的私密信息，并且对于其中的某个客户端进行任何更改，也不会影响其他客户端，更不会影响到 WCF 服务器，这对应用程序开发和健壮性提供了良好的环境。
WCF的服务端和客户端的交互过程

![x](./Resource/139.png)

	Service Host就是主机，其中可以创建各种 WCF服务，这些服务通过终结点(EndPoint)与客户端进行通信。终结点主要有3部分组成：“Address(地址)”,“Binding(绑定)”，“Contract(协定)”，简称“ABC”

![x](./Resource/140.png)

	终结点的地址按照 WS-Addressing 标准中的定义建立，大多数传输地址的 URI 都包含4个部分。例如：http：//localhost:322/mathservice.svc/secureEndpoint
	方案：http
	计算机：localhost
	(可选)端口：322
	路径：/mathservice.svc/secureEndpoint
一般建议使用配置方式来指定终结点地址，不要写死在代码中。

![x](./Resource/141.png)

![x](./Resource/142.png)


	生成客户端代理命令：
	svcutil.exe /n:http://Microsoft.Samples,Microsoft.Samples http://localhost:2374/service/Service1.asmx /out:generatedClient.cs


调试
Day1
目录
MVC MiniProfiler

使用MiniProfiler调试ASP.NET MVC网站性能
MVC MiniProfiler是Stack Overflow团队设计的一款对ASP.NET MVC的性能分析的小程序。可以对一个页面本身，及该页面通过直接引用、Ajax、Iframe形式访问的其它页面进行监控,监控内容包括数据库内容，并可以显示数据库访问的SQL（支持EF、EF CodeFirst等 ）。并且以很友好的方式展现在页面上。
该Profiler的一个特别有用的功能是它与数据库框架的集成。除了.NET原生的 DbConnection类，profiler还内置了对实体框架（Entity Framework）以及LINQ to SQL的支持。任何执行的Step都会包括当时查询的次数和所花费的时间。为了检测常见的错误，如N+1反模式，profiler将检测仅有参数值存在差异的多个查询。
MiniProfiler是以Apache License V2.0协议发布的，你可以在NuGet找到。配置及使用可以看这里：http://code.google.com/p/mvc-mini-profiler
为建立快速的网站黄金参考标准，雅虎2007年为网站提高速度的13个简易规则。
 
Stack Overflow 用MVC Mini Profiler来促进开源，而在把每一页的右上角服务器渲染时间的简单行来迫使我们解决我们所有的性能衰退和遗漏。如果你在使用.NET开发应用，一定要使用上这个工具。
包括以下核心组件：
•	MiniProfiler
•	MiniProfiler.EntityFramework
如何安装？
如果需要调试EF，建议升级到Entity Framework 4.2
推荐使用NuGet方式进行安装,参考文章《使用 NuGet 管理项目库》
第一步：在引用上右键选择“Manage NuGet Packages”
    第二步：Online搜索miniprofiler
MiniProfiler、MiniProfiler.EF、MiniProfiler.MVC3，同时会自动安装依赖组件：WebActivator， 同时也会自动在项目里面添加代码文件：MiniProfiler.cs
第三步：修改代码使MiniProfiler生效
在global.cs的Application_Start事件里面增加代码：
StackExchange.Profiling.MiniProfilerEF.Initialize(); 
修改View的layout文件，在head区域增加如下代码：
@StackExchange.Profiling.MiniProfiler.RenderIncludes()
如果安装步骤一切顺利的话，打开站点的时候，就可以在左上角看到页面执行时间了，点开可以看到更详细的信息，如果有SQL的话，还会显示SQL语句信息，非常的方便。 页面上如果有ajax请求，也会同时显示到左上角。如果左上角显示红色提示，则表示可能存在性能问题需要处理：
 
 
标记为duplicate的部分，代表在一次请求当中，重复执行了查询，可以优化。
问题：在结合使用EF 4.3的时候发生如下错误：
Invalid object name 'dbo.__MigrationHistory'. 
 …
需要在EF 4.3上关闭数据库初始化策略：
public class SettingContext : DbContext 
{ 
    static SettingContext() 
    { 
        Database.SetInitializer<SettingContext>(null); 
    }














附录
配置应用程序
.NET Framework为开发人员和管理员提供了对于应用程序运行方式的控制权和灵活性。管理员能够控制应用程序可以访问哪些受保护的资源，应用程序将使用哪些版本的程序集，以及远程应用程序和对象位于何处。开发人员可以将设置置于配置文件中，从而没有必要在每次设置更改时重新编译应用程序。
特殊字符的处理
显示	说明	实体名称	实体编号
 	空格	&nbsp;	&#160;
<	小于	&lt;	&#60;
>	大于	&gt;	&#62;
&	&符号	&amp;	&#38;
"	双引号	&quot;	&#34;
©	版权	&copy;	&#169;
®	已注册商标	&reg;	&#174;
™	商标（美国）	™	&#8482;
×	乘号	&times;	&#215;
÷	除号	&divide;	&#247;

.NET Framework的配置文件架构
配置文件是标准的XML文件。.NET Framework定义了一组实现配置设置的元素。本节描述计算机配置文件、应用程序配置文件和安全配置文件的配置架构。如果希望直接编辑配置文件，您需要熟悉XML。
XML标记和特性是区分大小写的。
元素	说明
<configuration>	它是所有配置文件的顶级元素。
<assemblyBinding>	指定配置级的程序集绑定策略。
<linkedConfiguration> 	指定要包含的配置文件。
	
	
	
	
<configuration> 的 <assemblyBinding> 元素
特性	说明
xmlns	必选特性。
指定程序集绑定所需的 XML 命名空间。 使用字符串“urn:schemas-microsoft-com:asm.v1”作为值。
子元素	说明
<linkedConfiguration> 元素
指定要包含的配置文件。允许应用程序配置文件包含已知位置的程序集配置文件，而不是复制程序集配置设置，从而简化了组件程序集的管理。具有 Windows并行清单的应用程序不支持<linkedConfiguration>元素。
父元素	说明
<configuration> 元素
每个配置文件中的根元素，常用语言 runtime 和 .NET Framework 应用程序会使用这些文件。
下面的代码示例演示如何包含本地硬盘上的配置文件。
<configuration>
   <assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1">
      <linkedConfiguration href="file://c:\Program Files\Contoso\sharedConfig.xml"/>
   </assemblyBinding>
</configuration>
<linkedConfiguration> 元素
特性	说明
href	要包含的配置文件的 URL。 唯一支持的 href 特性格式为“file://”。 支持本地文件和 UNC 文件。
下面这些规则控制着链接配置文件的使用。
	所含配置文件中的设置仅影响加载程序绑定策略并仅由加载程序使用。所含配置文件可以有绑定策略以外的其他设置，但这些设置不会有任何效果。
	唯一支持的href特性格式为“file://”。 支持本地文件和UNC文件。
	每个配置文件的链接配置数没有限制。
	所有链接配置文件都合并构成一个文件，与 C/C++ 中的 #include 指令行为类似。
	仅在应用程序配置文件中允许 <linkedConfiguration> 元素，在 Machine.config 中将忽略该元素。
	检测到循环引用并已将其终止。即，如果一系列配置文件的 <linkedConfiguration> 元素组成一个循环，将检测到该循环并使其停止。
启动设置架构
启动设置指定应运行应用程序的公共语言运行时版本。
元素	说明
<requiredRuntime>
指定应用程序仅支持公共语言运行时 1.0 版。 用运行时 1.1 版生成的应用程序应使用 <supportedRuntime> 元素。
特性
	version：可选特性。一个字符串值，它指定此应用程序支持的 .NET Framework 版本。字符串值必须与位于 .NET Framework 安装根目录下的目录名称匹配。 不分析字符串值的内容。
	safemode：可选特性。指定运行时启动代码是否搜索注册表以确定运行时版本。默认值：false，运行时启动代码在注册表中搜索。true，运行时启动代码不在注册表中搜索。
示例
<!-- When used with version 1.0 of the .NET Framework runtime -->
<configuration>
   <startup>
      <requiredRuntime version="v1.0.3705" safemode="true"/>
   </startup>
</configuration>
<supportedRuntime>
指定此应用程序支持的公共语言运行时版本。如果应用程序配置文件中没有 <supportedRuntime>元素，则使用用于生成该应用程序的运行时版本。如果支持多个运行时版本，则第一个元素应指定优先级最高的运行时版本，而最后一个元素应指定优先级最低的版本。
特性
	version：可选特性。一个字符串值，它指定此应用程序支持的公共语言运行时 (CLR) 版本。 CLR 的前三个版本由“v1.0.3705”、“v1.1.4322”和“v2.0.50727”指定。从 .NET Framework 4 版开始，仅主版本号和次版本号是必需的（即“v4.0”而不是“v4.0.30319”）。建议使用较短字符串。
	sku：可选特性。一个字符串值，指定运行该应用程序的SKU。
示例
<!-- When used with version 1.1 (or later) of the runtime -->
<configuration>
   <startup>
	  <supportedRuntime version="v1.1.4322"/>
      <supportedRuntime version="v1.0.3705"/>
   </startup>
</configuration>
<startup>
包含 <requiredRuntime> 和 <supportedRuntime> 元素。
特性
	useLegacyV2RuntimeActivationPolicy：可选特性。指定是否启用 .NET Framework 2.0 版 运行时激活策略，或者是否使用 .NET Framework 4 版激活策略。
true：为所选运行时启用 .NET Framework 2.0 版 运行时激活策略，该策略要将运行时激活技术（如 CorBindToRuntimeEx 功能）绑定到从配置文件选择的运行时，而不是将它们盖在 CLR 版本 2.0 上。 因此，如果从配置文件选择 CLR 版本 4 或更高版本，则使用 .NET Framework 的早期版本创建的混合模式程序集将与所选 CLR 版本一同加载。设置此值可防止 CLR 版本 1.1 或 2.0 加载到同一进程，有效地禁用进程中的并行功能。
false：使用 .NET Framework 4 及更高版本的默认激活策略，即允许旧式运行时激活技术将 CLR 版本 1.1 或 2.0 加载到进程。设置此值可防止混合模式程序集加载到 .NET Framework 4 或更高版本，除非他们内置有 .NET Framework 4 或更高版本。此值为默认值。






管理 ASP.NET 网站
使用ASP.NET配置系统的功能，可以配置整个服务器、ASP.NET应用程序或应用程序子目录中的单个页。可以配置的功能包括身份验证的模式、页面缓存、编译器选项、自定义错误、调试和跟踪选项以及更多。
ASP.NET配置系统的功能是一个可扩展的基础结构，该基础结构使您能够在一些容易部署的XML文件中定义配置设置。这些文件(每个文件都名为Web.config)可以存在于ASP.NET应用程序中的多个位置中。在任何时候都可以添加或修订配置设置，且对运行的Web应用程序和服务器产生的影响会最小。
ASP.NET配置系统的功能仅应用于ASP.NET资源。例如，Forms身份验证只限制对ASP.NET文件的访问，而不限制对静态文件或经典的Active Server Pages (ASP)文件的访问，除非将这些资源映射到ASP.NET扩展。请使用Microsoft Internet信息服务(IIS)的配置功能来配置非ASP.NET资源。
























