# SQLServer



1. 简介
   - [SQL](#SQL)
2. 实战
   - [常用语句](#常用语句)
     - [查询字段或值在哪个表中存在](#查询字段或值在哪个表中存在)
     - [查看对象结构](#查看对象结构)
     - [判断对象是否存在](#判断对象是否存在)
     - [复制对象](#复制对象)
     - [访问远程数据库](#访问远程数据库)
     - [数据导入](#数据导入)
     - [数据库转码](#数据库转码)
     - [行列转换](#行列转换)
     - [其它SQL](#其它SQL)
3. 总结
4. 升华



参考：

1. [Sql语句里的递归查询](https://blog.csdn.net/pdn2000/article/details/6674243)
2. [看懂SqlServer查询计划](https://www.cnblogs.com/fish-li/archive/2011/06/06/2073626.html)
3. [Execution Plan 执行计划介绍](https://www.cnblogs.com/biwork/archive/2013/04/11/3015655.html)



## 简介



### SQL

SQL 用于访问和处理数据库，全称是 `Structured Query Language`，是一种 ANSI（American National Standards Institute 美国国家标准化组织）标准的计算机语言。对大小写不敏感：`SELECT` 与 `select` 是相同的。

SQL处理过程：

![x](./Resources/db005.jpg)

**SQL92标准**

- 数据操作语句(Data Manipulation Language, DML) `select`, `insert`, `update`, `delete`

- 数据定义语句(Data Definition Language, DDL) `create`, `drop`

- 数据控制语句(Data Control Language, DCL) `grant`, `revoke`

 **SQL99标准**

| 类型        | 简介                                   | 命令举例                    |
| ----------- | -------------------------------------- | --------------------------- |
| SQL连接语句 | 开始和结束一个客户连接                 | connect,disconnect          |
| SQL控制语句 | 控制一组SQL语句的执行                  | call,return                 |
| SQL数据语句 | 直接对数据产生持续性作用               | select,insert,update,delete |
| SQL诊断语句 | 提供诊断信息并抛出异常或错误           | get,diagnostic              |
| SQL模式语句 | 对数据库模式及其内的对象产生持续性作用 | alter,create,drop           |
| SQL会话语句 | 在一次会话中，控制缺省操作和其它操作   | set                         |
| SQL事务语句 | 设置一个事务处理的开始和结束点         | commit,rollback             |

SQL 程序以数据的逻辑集合来对数据进行操作。集合处理方式也称作**声明性处理(Declarative Processing)**。集合理论是俄国数学家**格奥尔格•康托(Georg Cantor)**的发明。

![x](./Resources/db006.png)



## 实战



### 常用语句



#### 查询字段或值在哪个表中存在

```sql
-- 查询某个字段在数据库中的哪些表中存在
SELECT b.name as TableName,a.name as columnname 
	From syscolumns a 
	INNER JOIN sysobjects b ON a.id=b.id 
	where b.type='U'
	AND a.name=''
GO
/*
xtype类型
34 image
35 text
36 uniqueidentifier
48 tinyint
52 smallint
56 int
58 smalldatetime
59 real
60 money
61 datetime
62 float
98 sql_variant
99 ntext
104 bit
106 decimal
108 numeric
122 smallmoney
127 bigint
165 varbinary
167 varchar
173 binary
175 char
189 timestamp
231 sysname
231 nvarchar
239 nchar
*/

-- 查询值在哪个表中存在
BEGIN     
-- SET NOCOUNT ON added to prevent extra result sets from interfering with SELECT statements. 
SET NOCOUNT ON; 
DECLARE @sql VARCHAR(1024),@table VARCHAR(64),@column VARCHAR(64), @value nvarchar(600);
set @value = N'20BCAFCF-6314-467D-B1E2-B150522F4D32'; 
CREATE TABLE #t (      
	tablename VARCHAR(64),      
	columnname VARCHAR(64)  
)    
DECLARE TABLES CURSOR FOR     
	SELECT o.name, c.name FROM syscolumns c INNER JOIN sysobjects o ON c.id = o.id      
	WHERE o.type = 'U' AND c.xtype IN (167, 175, 231, 239)      
	ORDER BY o.name, c.name    
OPEN TABLES    
FETCH NEXT FROM TABLES  INTO @table, @column    
WHILE @@FETCH_STATUS = 0  
	BEGIN      
	SET @sql = 'IF EXISTS(SELECT NULL FROM [' + @table + '] '      
	SET @sql = @sql + 'WHERE RTRIM(LTRIM([' + @column + '])) LIKE ''%' + @value + '%'') '      
	SET @sql = @sql + 'INSERT INTO #t VALUES (''' + @table + ''', '''      
	SET @sql = @sql + @column + ''')'        
	EXEC(@sql)        
	FETCH NEXT FROM TABLES INTO @table, @column  
	END    
CLOSE TABLES  
DEALLOCATE TABLES    
SELECT *  FROM #t    
DROP TABLE #t   
End   
GO
```



#### 查看对象结构

```sql
SELECT DATABASEPROPERTY('数据库名','isfulltextenabled')
select name from syscolumns where id=object_id('表名')
select name from syscolumns where id in (
	select id from sysobjects where type = 'u' and name = '表名')
select column_name,data_type 
	from information_schema.columns
	where table_name = '表名' 
SELECT t.[name] AS 表名,c.[name] AS 字段名,cast(ep.[value] as varchar(100)) AS [字段说明]
FROM sys.tables AS t
    INNER JOIN sys.columns AS c ON t.object_id = c.object_id
    LEFT JOIN sys.extended_properties AS ep ON ep.major_id = c.object_id 
AND ep.minor_id = c.column_id 
WHERE ep.class =1 
    AND t.name='TableName'

-- 快速查看表结构（比较全面的）
SELECT CASE WHEN col.colorder = 1 THEN obj.name
        ELSE ''
        END AS 表名,
        col.colorder AS 序号 ,
        col.name AS 列名 ,
        ISNULL(ep.[value], '') AS 列说明 ,
        t.name AS 数据类型 ,
        col.length AS 长度 ,
        ISNULL(COLUMNPROPERTY(col.id, col.name, 'Scale'), 0) AS 小数位数 ,
        CASE WHEN COLUMNPROPERTY(col.id, col.name, 'IsIdentity') = 1 THEN '√'
        ELSE ''
        END AS 标识 ,
        CASE WHEN EXISTS ( 
SELECT 1 FROM dbo.sysindexes si
                INNER JOIN dbo.sysindexkeys sik ON si.id = sik.id
                    AND si.indid = sik.indid
                INNER JOIN dbo.syscolumns sc ON sc.id = sik.id
                    AND sc.colid = sik.colid
                INNER JOIN dbo.sysobjects so ON so.name = si.name
                    AND so.xtype = 'PK'
            WHERE sc.id = col.id
            AND sc.colid = col.colid ) THEN '√'
        ELSE ''
        END AS 主键 ,
        CASE WHEN col.isnullable = 1 THEN '√'
        ELSE ''
        END AS 允许空 ,
        ISNULL(comm.text, '') AS 默认值
FROM dbo.syscolumns col
        LEFT JOIN dbo.systypes t ON col.xtype = t.xusertype
        inner JOIN dbo.sysobjects obj ON col.id = obj.id
            AND obj.xtype = 'U'
            AND obj.status >= 0
        LEFT JOIN dbo.syscomments comm ON col.cdefault = comm.id
        LEFT JOIN sys.extended_properties ep ON col.id = ep.major_id
            AND col.colid = ep.minor_id
            AND ep.name = 'MS_Description'
        LEFT JOIN sys.extended_properties epTwo ON obj.id = epTwo.major_id
            AND epTwo.minor_id = 0
            AND epTwo.name = 'MS_Description'
WHERE obj.name = '表名'--表名
ORDER BY col.colorder;

-- 获取当前数据库中的所有表
select Name from sysobjects where xtype='u' and status>=0

-- 查看与某一个表相关的视图、存储过程、函数
select a.* from sysobjects a, syscomments b 
where a.id = b.id and b.text like '%函数名%'

-- 查看当前数据库中所有存储过程
select name as 存储过程名称 from sysobjects where xtype='P'

-- 查询用户创建的所有数据库
select * from master..sysdatabases D where sid not in(select sid from master..syslogins where name='sa')
select dbid, name AS DB_NAME from master..sysdatabases where sid <> 0x01

-- 查看硬盘分区
EXEC master..xp_fixeddrives

-- 查看源码
SELECT object_definition(object_id('sys.tables'));
sp_helptext 'sys.tables'
select * from sys.system_sql_modules where object_id = object_id('sys.tables')
SELECT SYS.views.name AS 视图名,definition AS 视图定义 
	FROM SYS.views JOIN SYS.sql_modules ON SYS.views.object_id=SYS.sql_modules.object_id
	where SYS.views.name='hr_users_v'

-- 查询列定义
select * from syscolumns where id=object_id('V_StoreData')
select * from information_schema.columns where table_name='V_StoreLevelData'
select * from sys.system_sql_modules where object_id = object_id('sys.tables')

-- 查询视图源码
SELECT SYS.views.name AS 试图名,definition AS 试图定义 FROM SYS.views 
  JOIN SYS.sql_modules ON SYS.views.object_id=SYS.sql_modules.object_id
SELECT definition AS 试图定义 FROM SYS.views 
  JOIN SYS.sql_modules ON SYS.views.object_id=SYS.sql_modules.object_id
 where SYS.views.name='hr_users_v'

-- 获取表名及表的触发器
select (select b.name from sysobjects as b where b.id = a.parent_obj) 表名, a.name as 触发器 from sysobjects as a 
 where a.xtype='TR' order by 表名
/*
xtype   char(2)   对象类型。可以是下列对象类型中的一种：     
  C   =   CHECK   约束   
  D   =   默认值或   DEFAULT   约束   
  F   =   FOREIGN   KEY   约束   
  L   =   日志   
  FN   =   标量函数   
  IF   =   内嵌表函数   
  P   =   存储过程   
  PK   =   PRIMARY   KEY   约束（类型是   K）   
  RF   =   复制筛选存储过程   
  S   =   系统表   
  TF   =   表函数   
  TR   =   触发器   
  U   =   用户表   
  UQ   =   UNIQUE   约束（类型是   K）   
  V   =   视图   
  X   =   扩展存储过程  
*/
```



#### 判断对象是否存在

```sql
--1.判断数据库是否存在
IF EXISTS (SELECT * FROM SYS.DATABASES WHERE name = '数据库名')
    DROP DATABASE [数据库名]
--2.判断表是否存在
IF EXISTS (SELECT * FROM SYSOBJECTS WHERE id = OBJECT_ID(N'[表名]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
    DROP TABLE [表名]
-- 判断临时表是否存在
if exists (select * from tempdb.dbo.sysobjects where id = object_id(N'tempdb..表名') and type='U')
    DROP TABLE [表名]
--3.判断视图是否存在
IF EXISTS(SELECT 1 FROM sys.views WHERE name='视图名')
--4.判断存储过程是否存在
IF EXISTS (SELECT * FROM SYSOBJECTS WHERE id = OBJECT_ID(N'[存储过程名]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
    DROP PROC [存储过程名]
--5.判断函数是否存在
IF OBJECT_ID (N'getADNameByUserName') IS NOT NULL
    DROP FUNCTION getADNameByUserName
--6.判断数据库是否开启了全文搜索
SELECT DATABASEPROPERTY('数据库名','isfulltextenabled')
--7.判断全文目录是否存在
select * from sysfulltextcatalogs where name ='全文目录名称'
```



#### 复制对象

```sql
-- 说明：复制表结构（只复制结构，源表名：a 新表名：b）  
select * into b from a where 1<>1 
-- 说明：复制表数据（拷贝数据，源表名：a 目标表名：b）
insert into b(a, b, c) select d,e,f from b;
-- 说明：复制表结构和数据（源表名：a 新表名：b）
select * into b from a
-- 新表将继承源表的列名称，数据类型，是否包含null值和关联的identity属性；但不能复制源表的约束条件，索引或触发器
```



#### 访问远程数据库

在T-SQL语句中访问远程数据库(openrowset/opendatasource/openquery)

启用Ad Hoc Distributed Queries

在使用openrowset/opendatasource前搜先要启用Ad Hoc Distributed Queries服务，因为这个服务不安全所以SqlServer默认是关闭的

启用Ad Hoc Distributed Queries的方法

SQL Server 阻止了对组件'Ad Hoc Distributed Queries' 的STATEMENT'OpenRowset/OpenDatasource' 的访问，因为此组件已作为此服务器安全配置的一部分而被关闭。系统管理员可以通过使用sp_configure 启用'Ad Hoc Distributed Queries'。有关启用'Ad Hoc Distributed Queries' 的详细信息，请参阅SQL Server 联机丛书中的"外围应用配置器"。

启用Ad Hoc Distributed Queries的方法，执行下面的查询语句就可以了：

```sql
-- 启用Ad Hoc Distributed Queries：
exec sp_configure 'show advanced options',1
reconfigure
exec sp_configure 'Ad Hoc Distributed Queries',1
reconfigure
-- 使用完毕后，记得一定要要关闭它，因为这是一个安全隐患，切记执行下面的SQL语句
-- 关闭Ad Hoc Distributed Queries：
exec sp_configure 'Ad Hoc Distributed Queries',0
reconfigure
exec sp_configure 'show advanced options',0
reconfigure  
-- 创建链接服务器
exec sp_addlinkedserver   'ITSV ', ' ', 'SQLOLEDB ', '远程服务器名或ip地址' 
exec sp_addlinkedsrvlogin 'ITSV ', 'false ',null, '用户名', '密码' 
-- 查询示例
select * from ITSV.数据库名.dbo.表名
-- 导入示例
select * into 表from ITSV.数据库名.dbo.表名
-- 以后不再使用时删除链接服务器
exec sp_dropserver  'ITSV ', 'droplogins ' 
openrowset 
-- 查询示例
select * from openrowset( 'SQLOLEDB ', 'sql服务器名'; '用户名'; '密码',数据库名.dbo.表名) 
-- 生成本地表
select * into 表 from openrowset( 'SQLOLEDB ', 'sql服务器名'; '用户名'; '密码',数据库名.dbo.表名) 
-- 把本地表导入远程表
insert openrowset( 'SQLOLEDB ', 'sql服务器名'; '用户名'; '密码',数据库名.dbo.表名) select *from 本地表
-- 更新本地表
update b set b.列A=a.列A 
	from openrowset( 'SQLOLEDB ', 'sql服务器名'; '用户名'; '密码',数据库名.dbo.表名)as a 
 inner join 本地表b on a.column1=b.column1 
-- openquery用法需要创建一个连接
-- 首先创建一个连接创建链接服务器
exec sp_addlinkedserver   'ITSV ', ' ', 'SQLOLEDB ', '远程服务器名或ip地址' 
-- 查询
select * FROM openquery(ITSV,  'SELECT *  FROM 数据库.dbo.表名') 
-- 把本地表导入远程表
insert openquery(ITSV,  'SELECT *  FROM 数据库.dbo.表名') 
select * from 本地表
-- 更新本地表
update b set b.列B=a.列B 
  FROM openquery(ITSV,  'SELECT * FROM 数据库.dbo.表名') as a  
 inner join 本地表b on a.列A=b.列A 
-- opendatasource/openrowset 
SELECT * FROM opendatasource('SQLOLEDB','Data Source=ip/ServerName;User ID=登陆名;Password=密码').test.dbo.roy_ta 
-- 把本地表导入远程表
insert opendatasource('SQLOLEDB', 'Data Source=ip/ServerName;User ID=登陆名;Password=密码').数据库.dbo.表名
select * from 本地表
-- openrowset使用OLEDB的一些例子
select * from openrowset(
'SQLOLEDB','Server=(local);PWD=***;UID=sa;',
'select * from TB.dbo.school') as t
select * from openrowset(
'SQLOLEDB','Server=(local);PWD=***;UID=sa;',TB.dbo.school) as t
select * from openrowset(
'SQLOLEDB','Server=(local);Trusted_Connection=yes;',
TB.dbo.school) as t
select * from openrowset(
'SQLOLEDB','(local)';'sa';'***',
'select * from TB.dbo.school') as t
select * from openrowset(
'SQLOLEDB','(local)';'sa';'***',TB.dbo.school) as t
select * from openrowset(
'SQLOLEDB','(local)';'sa';'***',
'select school.id as id1,people.id as id2 
from TB.dbo.school 
inner join TB.dbo.people on school.id=people.id') as t
-- openrowset使用SQLNCLI的一些例子(SQLNCLI在SqlServer2005以上才能使用)
select * from openrowset(
'SQLNCLI','(local)';'sa';'***','select * from TB.dbo.school') as t
select * from openrowset(
'SQLNCLI','Server=(local);Trusted_Connection=yes;',
'select * from TB.dbo.school') as t
select * from openrowset(
'SQLNCLI','Server=(local);UID=sa;PWD=***;',
'select * from TB.dbo.school') as t
select * from openrowset(
'SQLNCLI','Server=(local);UID=sa;PWD=***;',TB.dbo.school) as t
select * from openrowset(
'SQLNCLI','Server=(local);UID=sa;PWD=***;DataBase=TB',
'select * from dbo.school') as t
-- openrowset其他使用
insert openrowset(
'SQLNCLI','Server=(local);Trusted_Connection=yes;',
'select name from TB.dbo.school where id=1') values('ghjkl')
/*要不要where都一样，插入一行*/
update openrowset(
'SQLNCLI','Server=(local);Trusted_Connection=yes;',
'select name from TB.dbo.school where id=1') set name='kkkkkk'
delete from openrowset(
'SQLNCLI','Server=(local);Trusted_Connection=yes;',
'select name from TB.dbo.school where id=1')
-- opendatasource使用SQLNCLI的一些例子
select * from opendatasource(
'SQLNCLI','Server=(local);UID=sa;PWD=***;').TB.dbo.school as t
select * from opendatasource(
'SQLNCLI','Server=(local);UID=sa;PWD=***;DataBase=TB').TB.dbo.school as t
-- opendatasource使用OLEDB的例子
select * from opendatasource(
'SQLOLEDB','Server=(local);Trusted_Connection=yes;').TB.dbo.school as t
-- opendatasource其他使用
insert opendatasource(
'SQLNCLI','Server=(local);Trusted_Connection=yes;').TB.dbo.school(name) 
values('ghjkl')/*要不要where都一样，插入一行*/
update opendatasource(
'SQLNCLI','Server=(local);Trusted_Connection=yes;').TB.dbo.school 
set name='kkkkkk'
delete from opendatasource(
'SQLNCLI','Server=(local);Trusted_Connection=yes;').TB.dbo.school 
where id=1
-- openquery使用OLEDB的一些例子
exec sp_addlinkedserver   'ITSV', '', 'SQLOLEDB','(local)' 
exec sp_addlinkedsrvlogin 'ITSV', 'false',null, 'sa', '***'
select * FROM openquery(ITSV,  'SELECT *  FROM TB.dbo.school ') 
-- openquery使用SQLNCLI的一些例子
exec sp_addlinkedserver   'ITSVA', '', 'SQLNCLI','(local)' 
exec sp_addlinkedsrvlogin 'ITSVA', 'false',null, 'sa', '***'
select * FROM openquery(ITSVA,  'SELECT *  FROM TB.dbo.school ') 
openquery其他使用
/*要不要where都一样，插入一行*/
insert openquery(
ITSVA,'select name from TB.dbo.school where id=1') values('ghjkl')
update openquery(ITSVA,'select name from TB.dbo.school where id=1') 
set name='kkkkkk'
delete openquery(ITSVA,'select name from TB.dbo.school where id=1')
```

可以看到SqlServer连接多服务器的方式有种，其中我个人认为openrowset最好，使用简单而且支持在连接时制定查询语句使用很灵活。openquery也不错，查询时也可以指定查询语句使用也很灵活，不过查询前要先用exec sp_addlinkedserver和exec sp_addlinkedsrvlogin建立服务器和服务器连接稍显麻烦。opendatasource稍显欠佳，他无法在连接时指定查询使用起来稍显笨拙

另外还可以连接到远程Analysis服务器做MDX查询，再用T-Sql做嵌套查询，可见T-SQL的远程查询非常强大。



#### 数据导入

```sql
--启用Ad Hoc Distributed Queries：
exec sp_configure 'show advanced options',1
reconfigure
exec sp_configure 'Ad Hoc Distributed Queries',1
reconfigure

set identity_insert 表名 on

insert into 表名(参数列表) from opendatasource(
	'SqlOleDB','Data Source=ip地址;User ID=用户名;Password=密码'
).数据库名.dbo.表名

set identity_insert 表名 off

--关闭Ad Hoc Distributed Queries：
exec sp_configure 'Ad Hoc Distributed Queries',0
reconfigure
exec sp_configure 'show advanced options',0
reconfigure
```



#### 数据库转码

由于之前创建数据库忘记了设置Collocation，数据库中插入中文字符都是乱码，于是到DataBase的Options中修改Collocation，出现了The database could not be exclusively locked to perform the operation这个错误，无法修改字符集为Chinese_PRC_CI_AS。

解决办法如下：

1. 执行SQL：`ALTER DATABASE db_database SET SINGLE_USER WITH ROLLBACK IMMEDIATE -- 修改为单用户模式`

2. 然后关闭所有的查询窗口，修改Options的Collocation属性为Chinese_PRC_CI_AS

　　 修改数据库字符集 `ALTER DATABASE db_database COLLATE Chinese_RPC_CI_AS`

3. 执行SQL：`ALTER DATABASE db_database SET MULTI_USER -- 再修改为多用户模式`（如果修改失败，先重启SqlServer服务，再执行）



#### 行列转换

使用 `PIVOT`，`UNPIVOT` 快速实现行转列、列转行，可扩展性强

**行转列**

1、测试数据准备

```sql
CREATE TABLE [StudentScores]
(
  [UserName]     NVARCHAR(20),    -- 学生姓名
  [Subject]     NVARCHAR(30),    -- 科目
  [Score]      FLOAT,        -- 成绩
)
INSERT INTO [StudentScores] SELECT '张三', '语文', 80
INSERT INTO [StudentScores] SELECT '张三', '数学', 90
INSERT INTO [StudentScores] SELECT '张三', '英语', 70
INSERT INTO [StudentScores] SELECT '张三', '生物', 85
INSERT INTO [StudentScores] SELECT '李四', '语文', 80
INSERT INTO [StudentScores] SELECT '李四', '数学', 92
INSERT INTO [StudentScores] SELECT '李四', '英语', 76
INSERT INTO [StudentScores] SELECT '李四', '生物', 88
INSERT INTO [StudentScores] SELECT '码农', '语文', 60
INSERT INTO [StudentScores] SELECT '码农', '数学', 82
INSERT INTO [StudentScores] SELECT '码农', '英语', 96
INSERT INTO [StudentScores] SELECT '码农', '生物', 78
```

2、行转列sql

```sql
SELECT * FROM [StudentScores] /*数据源*/
AS P
PIVOT
(
    SUM(Score/*行转列后 列的值*/) FOR
    p.Subject/*需要行转列的列*/ IN ([语文],[数学],[英语],[生物]/*列的值*/)
) AS T
```

**列转行**

1、测试数据准备

```sql
CREATE TABLE ProgrectDetail
(
    ProgrectName         NVARCHAR(20), --工程名称
    OverseaSupply        INT,          --海外供应商供给数量
    NativeSupply         INT,          --国内供应商供给数量
    SouthSupply          INT,          --南方供应商供给数量
    NorthSupply          INT           --北方供应商供给数量
)
INSERT INTO ProgrectDetail
SELECT 'A', 100, 200, 50, 50
UNION ALL
SELECT 'B', 200, 300, 150, 150
UNION ALL
SELECT 'C', 159, 400, 20, 320
UNION ALL
SELECT 'D', 250, 30, 15, 15
```

2、列转行的sql

```sql
SELECT P.ProgrectName, P.Supplier, P.SupplyNum
FROM
(
    SELECT ProgrectName, OverseaSupply, NativeSupply,
           SouthSupply, NorthSupply
    FROM ProgrectDetail
) T
UNPIVOT
(
    SupplyNum FOR Supplier IN
    (OverseaSupply, NativeSupply, SouthSupply, NorthSupply )
) P
```



#### 其它SQL

```sql
-- 重置主键（清空、归0）
DBCC CHECKIDENT(project_document, RESEED, 0)

-- 修改密码
EXEC sp_password NULL,'123','sa'

-- 修改表名
SP_RENAME 'Customer','T_Customer';

-- 修改列名
SP_RENAME 'T_ProductGroup.ProductSeries','SystemSeries','column';

-- 杀掉所有的事件探察器进程
DECLARE hcforeach CURSOR GLOBAL FOR 
	SELECT 'kill '+RTRIM(spid) FROM master.dbo.sysprocesses
	WHERE program_name IN('SQL profiler',N'SQL 事件探查器')
EXEC sp_msforeach_worker '?'
```











