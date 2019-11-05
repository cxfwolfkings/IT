创建数据库实例
USE [master]
GO
/*
N 在这里表示Unicode，就是双字节字符。对于西文字符，用一个字节来存储过足够了，对于东方文字字符，就需要两个字节来存储。
Unicode 为了统一、规范、方便、兼容，就规定西文字符也用两个字节来存储。
也就是说加N 就表示字符串用Unicode 方式存储。但有时候加与不加都一样，又是什么原因呢？这是由于自动转换造成的。
比如：declare @status nvarchar(20)
	select @status = N'stopped'
	select @status = 'stopped' 
实际上上述两句赋值的结果是一样的，因为变量类型就是nvarchar(Unicode 类型)。
而有些地方（比如：sp_executesql 的参数）不能自动转换，所以需要加N 了。
*/
CREATE DATABASE [Charles] ON  PRIMARY 
( NAME = N'Charles', FILENAME = N'K:\Charles.mdf' , SIZE = 664576KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'Charles_log', FILENAME = N'K:\Charles_log.ldf' , SIZE = 1341696KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
/*
用于设置MS SQL Server的兼容级别
MS SQL Server 2000:SET COMPATIBILITY_LEVEL=80
MS SQL Server 2005:SET COMPATIBILITY_LEVEL=90
MS SQL Server 2008:SET COMPATIBILITY_LEVEL=100
MS SQL Server 2012:SET COMPATIBILITY_LEVEL=110
*/
ALTER DATABASE [Charles] SET COMPATIBILITY_LEVEL = 90
GO
/*
返回有关全文服务级别属性的信息。全文搜索服务由 Microsoft SQL Server (MSSQLSERVER) 和 Microsoft Search Service (MSFTESQL) 服务提供。
可以使用 sp_fulltext_service 设置和检索这些属性。
IsFullTextInstalled:在 SQL Server 的当前实例中安装全文组件。
1 = 已安装全文组件。 
0 = 未安装全文组件。 
NULL = 输入无效或发生错误。
*/
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
/*
对 SQL Server 2008 和更高版本中的全文目录没有影响，支持它只是为了向后兼容。  
sp_fulltext_database 不会禁用用于给定数据库的全文引擎。在 SQL Server 2014 中，所有用户创建的数据库始终启用全文索引。
*/
EXEC [Charles].[dbo].[sp_fulltext_database] @action = 'disable'
end
GO
/*tempdb 数据库，tempdb 系统数据库是一个全局资源，可供连接到 SQL Server 实例的所有用户使用。*/
/*当数据库的 ANSI null default 选项为 false 时，修改会话的行为以覆盖新列的默认为空性。*/
ALTER DATABASE [Charles] SET ANSI_NULL_DEFAULT OFF
GO
/*指定在 SQL Server 2014 中与 Null 值一起使用等于 (=) 和不等于 (<>) 比较运算符时采用符合 ISO 标准的行为。*/
ALTER DATABASE [Charles] SET ANSI_NULLS OFF
GO
/*控制列如何存储长度比列的已定义大小短的值，以及如何存储 char、varchar、binary 和 varbinary 数据中含有尾随空格的值*/
ALTER DATABASE [Charles] SET ANSI_PADDING OFF
GO
/*对几种错误情况指定 ISO 标准行为*/
ALTER DATABASE [Charles] SET ANSI_WARNINGS OFF
GO
/*在查询执行过程中发生溢出或被零除错误时终止查询。 */
ALTER DATABASE [Charles] SET ARITHABORT OFF
GO
/**/
ALTER DATABASE [Charles] SET AUTO_CLOSE OFF
GO
ALTER DATABASE [Charles] SET AUTO_CREATE_STATISTICS ON
GO
ALTER DATABASE [Charles] SET AUTO_SHRINK OFF
GO
ALTER DATABASE [Charles] SET AUTO_UPDATE_STATISTICS ON
GO
ALTER DATABASE [Charles] SET CURSOR_CLOSE_ON_COMMIT OFF
GO
ALTER DATABASE [Charles] SET CURSOR_DEFAULT  GLOBAL
GO
ALTER DATABASE [Charles] SET CONCAT_NULL_YIELDS_NULL OFF
GO
ALTER DATABASE [Charles] SET NUMERIC_ROUNDABORT OFF
GO
ALTER DATABASE [Charles] SET QUOTED_IDENTIFIER OFF
GO
ALTER DATABASE [Charles] SET RECURSIVE_TRIGGERS OFF
GO
ALTER DATABASE [Charles] SET  DISABLE_BROKER
GO
ALTER DATABASE [Charles] SET AUTO_UPDATE_STATISTICS_ASYNC OFF
GO
ALTER DATABASE [Charles] SET DATE_CORRELATION_OPTIMIZATION OFF
GO
ALTER DATABASE [Charles] SET TRUSTWORTHY OFF
GO
ALTER DATABASE [Charles] SET ALLOW_SNAPSHOT_ISOLATION OFF
GO
ALTER DATABASE [Charles] SET PARAMETERIZATION SIMPLE
GO
ALTER DATABASE [Charles] SET READ_COMMITTED_SNAPSHOT OFF
GO
ALTER DATABASE [Charles] SET  READ_WRITE
GO
ALTER DATABASE [Charles] SET RECOVERY FULL
GO
ALTER DATABASE [Charles] SET  MULTI_USER
GO
ALTER DATABASE [Charles] SET PAGE_VERIFY CHECKSUM
GO
ALTER DATABASE [Charles] SET DB_CHAINING OFF
GO
USE [Charles]
GO

建表语句
/****** Object:  Table [dbo].[hero] Script Date: 01/23/2015 09:05:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
标识列，是SQL Server中的标识列又称标识符列，习惯上又叫自增列。
该种列具有以下三种特点：
1、列的数据类型为不带小数的数值类型
2、在进行插入（Insert）操作时，该列的值是由系统按一定规律生成，不允许空值
3、列值不重复，具有标识表中每一行的作用，每个表只能有一个标识列。
标识列类型必须是数值类型decimal、int、numeric、smallint、bigint 、tinyint 
其中要注意的是，当选择decimal和numeric时，小数位数必须为零
判段一个表是否具有标识列：Select OBJECTPROPERTY(OBJECT_ID（’表名’），’TableHasIdentity’）
判断某列是否是标识列：SELECT COLUMNPROPERTY(OBJECT_ID（’表名’），’列名’，’IsIdentity’）
查询某表标识列的列名：
SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.columns 
	WHERE TABLE_NAME=’表名’ ANDCOLUMNPROPERTY(OBJECT_ID（’表名’），COLUMN_NAME，’IsIdentity’）=1
如果在SQL语句中引用标识列，可用关键字IDENTITYCOL代替
获取标识列的种子值：SELECT IDENT_SEED （’表名’） 
获取标识列的递增量：SELECT IDENT_INCR（’表名’） 
获取指定表中最后生成的标识值：SELECT IDENT_CURRENT（’表名’） 
总结一下标识列在复制中的处理方法：
1、快照复制
在快照复制中，通常无须考虑标识列的属性。
2、事务复制
举例：
发布数据库A，订阅数据库B，出版物为T_test_A，订阅表为T_test_B
CREATE TABLE T_test_A
（ID int IDENTITY（1,1），
Name varchar（50）
）

CREATE TABLE T_test_B
（ID int IDENTITY（1,1），
Name varchar（50）
）

在这种情况下，复制代理将无法将新行复制到库B，因为列ID是标识列，不能给标识列显示提供值，复制失败。
这时，需要为标识列设置NOT FOR REPLICATION 选项。这样，当复制代理程序用任何登录连接到库B上的表T_test时，该表上的所有 NOT
FOR REPLICATION 选项将被激活，就可以显式插入ID列。
这里分两种情况：
1、库B的T_test表不会被用户（或应用程序）更新
最简单的情况是：如果库B的T_test不会被用户（或应用程序）更新，那建议去掉ID列的标识属性，只采用简单int类型即可。
2、库B的T_test表是会被其他用户（或应用程序）更新 
这种情况下，两个T_test表的ID列就会发生冲突，举例：
在库A中执行如下语句：
INSERT T_test_A(Name) VALUES（’Tom’）（假设ID列为1）
在库B中执行如下语句：
INSERT T_test_B(Name) VALUES（’Pip’）（假设ID列为1）
这样，就会在库A和库B的两个表分别插入一条记录，显然，是两条不同的记录。
然而事情还没有结束，待到预先设定的复制时间，复制代理试图把记录"1 TOM"插入到库B中的T_test表，但库B的T_test_B表已经存在
ID为1的列，插入不会成功，通过复制监视器，我们会发现复制失败了。
解决以上问题的方法有：
⑴为发布方和订阅方的标识列指定不同范围的值，如上例可修改为：
确保该表记录不会超过10000000
CREATE TABLE T_test_A
（ID int IDENTITY（1,1），
Name varchar（50）
）

CREATE TABLE T_test_B
（ID int IDENTITY（10000000,1），
Name varchar（50）
）

⑵使发布方和订阅方的标识列的值不会重复，如
使用奇数值
CREATE TABLE T_test_A
（ID int IDENTITY（1,2），
Name varchar（50）
）

使用偶数值
CREATE TABLE T_test_B
（ID int IDENTITY（2,2），
Name varchar（50）
）

这种办法可推广，当订阅方和发布方有四处时，标识列属性的定义分别如下
（1,4），（2,4），（3,4），（4,4）

3、合并复制
采用事务复制中解决方法，只要使发布表和订阅表标识列的值不重复既可。
*/
CREATE TABLE hero( 
	id nchar(5) not null primary key, 建立主键colb_unique int unique, 唯一约束
	heroNnumber int not null identity(100,1), 自增长，从100开始，每列值增加1个
	houses int not null default(0),  默认值0
	cars int not null, 
	sex nchar(1) not null default('男'), 默认男
	recordTime datetime not null default(getdate()), 默认得到系统时间
	age int not null check(age>=18 and age<=55), 添加约束，数据值在18到55之间
	code nchar(9) not null check(code like 'msd0902[0-9][^6-9]'), 添加约束，数据值前7位必须是‘msd0902’，倒数第两位可以是0-9中任意一个数字，最后一位不是6-9之间的数字。
	strength numeric(5,0) not null, 最大值是5位的整数
	undefined uniqueidentifier not null default(newid()) 使用newid()函数，随机获取列值
)
create table Team(
	id int identity(1,1) not null,
	remark nvarchar(50),
	code decimal(10,2) 共10位，小数点后2位
	CONSTRAINT [PK_Team] PRIMARY KEY CLUSTERED(id ASC)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
go
为表中现有的字段设置默认值 
alter table 表名 add constraint 列名 default(20) for age 
go 
/*
当 SET NOCOUNT 为 ON 时，不返回计数（表示受 Transact-SQL 语句影响的行数）。
当 SET NOCOUNT 为 OFF 时，返回计数。
如果存储过程中包含的一些语句并不返回许多实际的数据，则该设置由于大量减少了网络流量，因此可显著提高性能。
*/
/****** Object:  StoredProcedure [dbo].[hero_Info_get]    Script Date: 01/23/2015 09:05:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[hero_Info_get]
(
@code nchar(9),
@heroNnumber int
)
As 
begin
	SET NOCOUNT ON;
	select * from hero where code=@code and heroNnumber=@heroNnumber
end
GO
-
sp_helptext hero_Info_get
go
/*
DATEDIFF 函数计算指定的两个日期中第二个日期与第一个日期的时间差的日期部分。
换句话说，它得 出两个日期之间的间隔。结果是等于 date2 - date1 的日期部分的带符号整数值。
DateDiff(timeinterval,date1,date2 [, firstdayofweek [, firstweekofyear]])
timeinterval 表示相隔时间的类型，代码为：
年份 yy、yyyy 季度 qq、q
月份 mm、m
每年的某一日 dy、y
日期 dd、d
星期 wk、ww
工作日 dw
小时 hh
分钟 mi、n
秒 ss、s
毫秒 ms
*/
CREATE proc [dbo].[knowledge_docList_bequoted]
(
@begtime datetime,最初加载的时间 防止新添加的重复
@beg int,
@strWhere varchar(1000),
@haveNext int output,0无，1有
@userID int
)
as
begin
	declare @allRowcount int,@sql nvarchar(4000)
	set @haveNext=0
	set @sql='select top 25 *,(select count(1) from knowledge_comments t3 where t3.k_document_id=t2.documentID) as hf,
			(select count(1) from knowledge_tech_img t4 where t4.Qid=t2.Qid) as himg,(
			select count(1) from knowledge_docList_read t5 where t5.Qid=t2.Qid and t5.userID='
			+cast(@userID as varchar)+') as isread,(select count(1) from knowledge_docList_read t6 
			where t6.Qid=t2.Qid) as readno from knowledge_docList_bequoted_v t2 where t2.documentID not in 
	         (select top '+cast(@beg as varchar)+' documentID from knowledge_docList_bequoted_v t1 
	         where beQuoted_Time<='''+ CONVERT(varchar(100), @begtime, 21) +''''+@strWhere+' 
	         order by t1.beQuoted_Time desc,t1.documentID desc) 
	         and  t2.beQuoted_Time<='''+ CONVERT(varchar(100), @begtime, 21) +''''+@strWhere+' 
	         order by t2.beQuoted_Time desc,t2.documentID desc'
	print @sql
	exec(@sql)
	set @sql='select @allRowcount=count(1) from knowledge_docList_bequoted_v  where beQuoted_Time<='''
			+ CONVERT(varchar(100), @begtime, 21) +''''+@strWhere
	print @sql
    exec sp_executesql @sql ,N'@allRowcount int output',@allRowcount out
	if(@allRowcount>(25+@beg)) set @haveNext=1
end
GO

查询项目信息，含分页，页签
create Procedure [dbo].[sp_PageList2005]    
	@tblName varchar(100),   表名    
	@fldName varchar(4000) = '*',  字段名(全部字段为*)    
	@page int = 1 ,   指定当前为第几页    
	@PageSize int = 20,     每页多少条记录   
	@fldSort varchar(1000),   排序字段(必须!支持多字段)    
	@strCondition varchar(8000) = '',  条件语句(不用加where)     
	@GroupBy varchar(1000), 分组语句(不用加Group by)  
	@Counts int = 0 output 返回总记录条数      
as    
begin    
    declare @PageCount int   返回总页数   
    set @PageCount = 0  
    Begin Tran 开始事务    
    Declare @sql nvarchar(max);      
    
    计算总记录数   
	if(@GroupBy ='' or @GroupBy is null) 无GroupBy的情况  
		begin  
		set @sql = 'select @Counts = count(*) from ' + @tblName    
		if (@strCondition<>'' and @strCondition is not NULL)    
			set @sql = @sql + ' where ' + @strCondition   
		end  
	else 有GroupBy的情况  
		begin  
		set @sql = 'select @Counts=count(*) from(select 1 as total from ' + @tblName  
		if (@strCondition<>'' and @strCondition is not NULL)    
			set @sql = @sql + ' where ' + @strCondition  
		set @sql = @sql + ' group by ' + @GroupBy  
		set @sql = @sql + ') as t'  
		end  
   
    EXEC sp_executesql @sql,N'@Counts int OUTPUT',@Counts OUTPUT计算总记录数   
    select @PageCount=CEILING((@Counts+0.0)/@PageSize) 计算总页数   
   
	set @sql = 'Select * FROM (select ROW_NUMBER() Over(order by ' + @fldSort + ') as rowId,' + @fldName + ' from ' + @tblName     
	if (@strCondition<>'' and @strCondition is not NULL)    
		set @sql = @sql + ' where ' + @strCondition  
	if(@GroupBy <>'' and @GroupBy is not null)  
		set @sql = @sql + ' group by ' + @GroupBy   
   
    处理页数超出范围情况    
    if @page<=0     
        Set @page = 1    
        
    if @page>@PageCount    
        Set @page = @PageCount    
    
     处理开始点和结束点    
    Declare @StartRecord int    
    Declare @EndRecord int    
        
    set @StartRecord = (@page-1)*@PageSize + 1    
    set @EndRecord = @StartRecord + @PageSize - 1    
    
    继续合成sql语句    
    set @Sql = @Sql + ') as xxx'  + ' where rowId between ' + Convert(varchar(50),@StartRecord) + ' and ' +  Convert(varchar(50),@EndRecord)    
    print(@sql)    
    Exec(@Sql)    
    -    
    If @@Error <> 0    
      Begin    
        RollBack Tran    
        Return -1    
      End    
    Else    
      Begin    
        Commit Tran    
        Return @Counts -返回记录总数    
      End        
end 

/*判断金蝶项目是否有更新*/  
CREATE proc [dbo].[pms_project_existsNewInKingdee]  
as  
declare @str_sql nvarchar(4000),@connectStr varchar(1000),@dbID int账套ID  
exec Pms_Matching_ConnectStr @connectStr output,@dbID output  
  
set @str_sql='select FName,FNumber,'+convert(varchar,@dbID)+',FItemID from '+@connectStr+'.dbo.t_Base_ProjectItem)'  
  
create table #temp_project_item_fromKingdee  
(FName nvarchar(255),FNumber nvarchar(80),dbID int,FItemID int)  
insert into #temp_project_item_fromKingdee  
exec sp_executesql @str_sql  
select * from #temp_project_item_fromKingdee  
declare @dbID_k int,@FItemID_k int,@is_e int  
set @is_e=0为1表示存在没有导入的新项目  
declare cursor_1 cursor for  
select dbID,FItemID from #temp_project_item_fromKingdee  
open cursor_1  
fetch next from cursor_1 into @dbID_k,@FItemID_k    
while @@fetch_status=0  
begin  
if not exists (select 'r' from pms_project where dbID=@dbID_k and project_id_fromkingdee=@FItemID_k)  
begin  
set @is_e=1  
break  
end  
fetch next from cursor_1 into @dbID_k,@FItemID_k  
end  
close cursor_1    
deallocate cursor_1      
return @is_e  

CREATE procedure Pms_Matching_ConnectStr  
(  
@connectStr varchar(1000) output,  
@dbID int  output 当前帐套  
)  
as  
Begin  
 declare @IsSameIP int,@ip varchar(1000),@SourceUID varchar(100),@SourcePsw varchar(100),@dbName Nvarchar(100)  
         
    select @IsSameIP=IsSameIP,@ip=SourceAddress,@SourceUID=SourceUID,@SourcePsw=SourcePsw,@dbName=SourceAddressName,@dbID=PmsID from Pms_Matching_setting where IsEnable=1 当前启用帐套  
            
 if(@IsSameIP=0)不在同一台服务器  
 begin  
        set @connectStr='openrowset( ''SQLOLEDB '', '''+@ip+'''; '''+@SourceUID+'''; '''+@SourcePsw+''','+@dbName  
 end  
 else  
 begin在同一台服务器  
        set @connectStr='openrowset( ''SQLOLEDB '', ''''; '''+@SourceUID+'''; '''+@SourcePsw+''','+@dbName  
 end  
End  

查询服务器端数据库信息
select * from OPENDATASOURCE(
		'SQLOLEDB','Data Source=192.168.0.252;User ID=Charles;Password=saige.aaa123456' 
	).Charles.dbo.mail_MailType

从另一个数据库中复制数据到当前数据库
SELECT * INTO  soa_userMenuRoles  FROM  OPENDATASOURCE(
		'SQLOLEDB','Data Source=192.168.0.252;User ID=Charles;Password=saige.aaa123456' 
	).Charles.dbo.soa_userMenuRoles where userID='292'

	
	use [bookshop]
sp_helptext Pr_AddOrder
SELECT A.ID,A.Name,A.ParentID,A.ShowOrder,A.Remark,
	ISNULL((SELECT Name FROM Category AS B WHERE A.ParentID = B.ID),null) AS ParentName,
	ISNULL((SELECT COUNT(*) FROM Category AS C WHERE A.ID = c.ParentID),0) AS SubCount,
	ISNULL((SELECT COUNT(*) FROM Category AS D WHERE A.ParentID = D.ParentID),0) AS SiblingCount
FROM Category AS A
ORDER BY ParentID,ShowOrder 
select * from Category

sp_helptext Pr_GetProductByFenlei
SELECT [Product].*,Category.Name AS CategoryName,[User].UserName
FROM [Product]
INNER JOIN Category On [Product].CategoryID = Category.ID
INNER JOIN [User] ON [User].ID = [Product].UserID
ORDER BY LasterDate DESC

use [Customer]
select * from [User]
select * from [Group]


create table Customers
(
	CustomId int primary key,
	CustomName char(20) not null,
	Email varchar(50),
	Country char(20),
	Address varchar(50),
	Phone char(20),
	Sex int,
	Age int,
	Remark varchar(500),
	undefined1 varchar(500),
	undefined2 varchar(500)
)
select * from Customers
insert Customers values(001,'Charles','chenxiao8516@gmail.com','China','无锡','15106198396',0,29,'努力的天才','','')
insert Customers values(002,'Angel','AngelBaby@wind.com','China','无锡','13771559082',0,25,'生活更美丽','','')


--邮件类型表
select * from OPENDATASOURCE(
		'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
	).SaigeOA.dbo.mail_MailType

--sqlserver建表表时设置字段的默认值 
create table 表(id int,name varchar(10) default '张三',age int) 

--添加字段时设置字段的默认值 
alter table 表 add sex char(2) default '男' 

--为表中现有的字段设置默认值 
alter table 表 add constraint DF_age_表 default(20) for age 
go 



  
--顾客信息表
create table Customers(
	CustomId int identity(1,1) primary key,
	CustomName varchar(50) ,
	Email varchar(50),
	Country varchar(50),
	Address varchar(50),
	Phone varchar(20),
	Sex bit,
	Age int,
	Remark varchar(300),
	undefined1 varchar(50),
	undefined2 varchar(50)
);
select * from Customers
insert into Customers(CustomName,Email,Country,Address,Phone,Sex,Age,Remark) values('Charles','chenxiao8516@163.com','China','Wuxi','15106198396',0,29,'I like my life');
  
  
-- 查看某個表的索引
SELECT * FROM sys.sysindexes WHERE id=object_id('RelactionGraph')
 
-- 查看整個庫的索引
SELECT * FROM sys.sysindexes
 
-- 查看所有庫的索引
IF object_id('tempdb..#')IS NOT NULL
    DROP TABLE #
SELECT * INTO # FROM sys.sysindexes WHERE 1=2
 
INSERT INTO #
    EXEC sys.sp_MSforeachdb @command1='Select * from ?.sys.sysindexes'
     
SELECT * FROM #

--数据库采用自下而上的顺序解析WHERE子句，根据这个原理，表之间的连接必须写在其他WHERE条件之前
SELECT w2.n, w1.* FROM ARTICLE w1, (
	SELECT TOP 50030 row_number() OVER (ORDER BY YEAR DESC, ID DESC) n, ID FROM ARTICLE ) w2 
	WHERE w1.ID = w2.ID AND w2.n > 50000 ORDER BY w2.n ASC   
	