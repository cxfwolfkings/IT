# Aspx

## 目录

1. [总结]
   - [IsPostBack](#IsPostBack)
   - [.NET里Server.URLEncode和Server.URLDecode到底是干什么用的](#.NET里Server.URLEncode和Server.URLDecode到底是干什么用的)
   - [JS调用ASP.NET服务器控件](#JS调用ASP.NET服务器控件)

## 总结

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
