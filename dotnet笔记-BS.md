# 目录

1. 简介
   - [webForm](#webForm)
2. 实战
3. 总结
   - [nuget包管理](#nuget包管理)
   - [应用程序池](#应用程序池)
4. 练习

## 简介

### winForm

**IsPostBack：** 判断页面是否是回传，`if(!IsPostback)` 表示页面是首次加载。

`Server.URLEncode` 和 `Server.URLDecode` 到底是干什么用的？

编码格式，可以让参数在URL正确传值。

**JS调用ASP.NET服务器控件**，使用 `.ClientID` 这个属性：

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

**AjaxPro组件：**

```C#
AjaxPro.Utility.RegisterTypeForAjax (typeof(ajax));
```

注册一个 ajax 方法类型，这样在其对应的.aspx文件中就可以直接调用其方法。OnClientClick 用于执行客户端脚本，当我们单击一个按钮时，最先执行的是 OnClientClick 事件，根据 OnClientClick 事件的返回值来决定是否执行 OnClick 事件来 postback 页面。其返回值为 true 和 false，默认情况下OnClientClick 返回值为真。

**获取网站目录：**

简写|描述
-|-
./|当前目录  
/|网站主目录  
../|上层目录  
~/|网站虚拟目录

```C#
Server.MapPath()
// 如果当前的网站目录为 E:\wwwroot，应用程序虚拟目录为E:\wwwroot\company
// 浏览的页面路径为 E:\wwwroot\company\news\show.asp
Server.MapPath("./")   // 返回路径为：E:\wwwroot\company\news
Server.MapPath("/")    // 返回路径为：E:\wwwroot
Server.MapPath("../")  // 返回路径为：E:\wwwroot\company
Server.MapPath("~/")   // 返回路径为：E:\wwwroot\company
server.MapPath(request.ServerVariables("Path_Info"))
Request.ServerVariables("Path_Translated")
// 上面两种方式返回路径为 D:\wwwroot\company\news\show.asp
```

**ASP.NET网页中的@指令：**

![x](http://121.196.182.26:6100/public/images/dotnet-@标识.png)

Web窗体中form元素只能有一个，必须包含`runat="server"`，不能包含action，可执行回发的服务器控件必须包含在form内。



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


### 应用程序池

什么是应用程序池呢？这是微软的一个全新概念：应用程序池是将一个或多个应用程序链接到一个或多个工作进程集合的配置。因为应用程序池中的应用程序与其他应用程序被工作进程边界分隔，所以某个应用程序池中的应用程序不会受到其他应用程序池中应用程序所产生的问题的影响。


## Nuget命令行

```sh
# 安装包
nuget install <id>
# 重新安装
Update-Package -reinstall
# 更新包
Update-Package
# 卸载包
Uninstall-Package
# Get-Package 默认列出本地已经安装了的包，可以加参数 -remote -filter entityframework 来在包源中查找自己想要的包
Get-Package -remote -filter entityframework
```

## Debug远程访问

1. 打开并编辑解决方案目录（不是工程目录）下的文件： `\.vs\config\applicationhost.config`

   增加行：`<binding protocol="http" bindingInformation="*:PORT:IP_ADDR" />`

   示例：

   ```xml
   <sites>
      <site name="WebSite1" id="1" serverAutoStart="true">
        <application path="/">
          <virtualDirectory path="/" physicalPath="%IIS_SITES_HOME%\WebSite1" />
        </application>
        <bindings>
          <binding protocol="http" bindingInformation=":8080:localhost" />
        </bindings>
      </site>
      <site name="LeadChina.Laboratory.Api" id="2">
        <application path="/" applicationPool="LeadChina.Laboratory.Api AppPool">
          <virtualDirectory path="/" physicalPath="E:\Laboratory\LeadChina.Laboratory.Api" />
        </application>
        <bindings>
          <binding protocol="http" bindingInformation="*:51742:localhost" />
            <!-- 远程访问 -->
            <binding protocol="http" bindingInformation="*:51742:192.168.133.129" />
        </bindings>
      </site>
      <siteDefaults>
        <logFile logFormat="W3C" directory="%IIS_USER_HOME%\Logs" />
        <traceFailedRequestsLogging directory="%IIS_USER_HOME%\TraceLogFiles" enabled="true" maxLogFileSizeKB="1024" />
      </siteDefaults>
      <applicationDefaults applicationPool="Clr4IntegratedAppPool" />
      <virtualDirectoryDefaults allowSubDirConfig="true" />
    </sites>
   ```

2. 管理员权限运行CMD，输入

   ```cmd
   netsh http add urlacl url=http://IP_ADDR:PORT/ user=everyone
   netsh http add urlacl url=http://localhost:PORT/ user=everyone
   ```

   注意：不要忘记将 localhost 加进 urlacl 否则原有的 localhost 会发生 ERROR_CONNECTION_REFUSED 错误

   回车，看到 URL reservation successfully added

3. 确认防火墙打开
4. 以管理员权限运行 VS2017，Ctrl+F5 运行之

***Info：我自己测试时，只做了第一步就可以了。***

## 部署

### <b style="color:red">IIS多次部署后突然出现问题！</b>

不管提示什么错误，先用下面方法试试！

解决方法：先把应用程序池回收一下，也许是未回收的旧代码的影响！（重启网站也不一定能将旧代码完全回收，尤其是代码中有定时任务的时候！）

### <b style="color:red">IIS网站低频访问导致工作进程进入闲置状态</b>

IIS为网站默认设定了20min闲置超时时间：20分钟内没有处理请求、也没有收到新的请求，工作进程就进入闲置状态。

IIS上低频web访问会造成工作进程关闭，此时应用程序池回收，Timer等线程资源会被销毁；当工作进程重新运作，Timer可能会重新生成起效， 但我们的设定的定时Job可能没有按需正确执行。

![x](../Project/MyStudy/BI/Public/Images/IIS闲置.jpeg)

故为在IIS网站实现低频web访问下的定时任务：

设置 Idle TimeOut = 0；同时将【应用程序池】->【正在回收】->不勾选【回收条件】

## 问题

### 未能找到路径“……\bin\roslyn\csc.exe”

>描述：  
>有时在我们做项目时或者从SVN上拉取项目运行后，会出现未能找到路径“……\bin\roslyn\csc.exe”的错误。这是因为我们在生成项目的时候VS并没有在项目bin文件夹里生成roslyn相关的文件，roslyn文件里的csc.exe代表C# 编译器，缺少这个程序一定会报错。
>
>解决方案：  
>首先我们要先在VS，NuGet程序包里引用Microsoft.CodeDom.Providers.DotNetCompilerPlatform和Microsoft.Net.Compilers程序集，然后重新编译，一般自动会在bin文件夹里生成roslyn文件夹，无需从别的项目拷贝，如果项目引用了那2个dll，而bin文件夹里又没有生成roslyn相关的文件，那就从别的项目拷贝一份就行。

## 参考

1. [.NET Architecture Guides](https://dotnet.microsoft.com/learn/dotnet/architecture-guides)
2. [Insus.NET](https://www.cnblogs.com/insus/)
3. [歪头儿在帝都](https://www.cnblogs.com/sword-successful/)
4. [无痴迷，不成功](https://github.com/justmine66)
5. [HuQingfang](https://github.com/zgynhqf)
6. [Allen Tsai](https://github.com/allentsai7)
7. [Leo_wlCnBlogs](https://www.cnblogs.com/Leo_wl/)
8. [顾振印](https://www.cnblogs.com/GuZhenYin/)
9. [PowerCoder](https://www.cnblogs.com/OpenCoder/)
10. [ServiceStack](https://github.com/ServiceStack)

MiniProfiler
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

