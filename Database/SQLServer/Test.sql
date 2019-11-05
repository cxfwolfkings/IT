-- 查看IO访问情况
SET STATISTICS IO ON
-- do something...
SELECT * FROM T_Animal
-- Table 'T_Animal'. Scan count 1, logical reads 2, physical reads 0, read-ahead reads 0, lob logical reads 0, lob physical reads 0, lob read-ahead reads 0.
SET STATISTICS IO OFF
go

-- 查看索引
exec sp_helpindex T_Animal;
go

-- DMV
-- 索引使用次数
/*
 * user_seeks : 通过用户查询执行的搜索次数。个人理解：此统计索引搜索的次数
user_scans: 通过用户查询执行的扫描次数。个人理解：此统计表扫描的次数，无索引配合
user_lookups: 通过用户查询执行的查找次数。个人理解：用户通过索引查找，在使用RID或聚集索引查找数据的次数，对于堆表或聚集表数据而言和索引配合使用次数
user_updates:  通过用户查询执行的更新次数。个人理解：索引或表的更新次数

 */
select objectname=object_name(s.object_id), s.object_id, indexname=i.name, i.index_id, user_seeks, user_scans, user_lookups, user_updates
from sys.dm_db_index_usage_stats s, sys.indexes i
where database_id = db_id() and objectproperty(s.object_id,'IsUserTable') = 1
and i.object_id = s.object_id
and i.index_id = s.index_id
order by (user_seeks + user_scans + user_lookups + user_updates) asc
-- 使用多的索引排在前面
SELECT objects.name, databases.name, indexes.name, user_seeks, user_scans, user_lookups, partition_stats.row_count
FROM sys.dm_db_index_usage_stats stats
LEFT JOIN sys.objects objects ON stats.object_id = objects.object_id
LEFT JOIN sys.databases databases ON databases.database_id = stats.database_id
LEFT JOIN sys.indexes indexes ON indexes.index_id = stats.index_id AND stats.object_id = indexes.object_id
LEFT JOIN sys.dm_db_partition_stats partition_stats ON stats.object_id = partition_stats.object_id AND indexes.index_id = partition_stats.index_id
WHERE 1 = 1
--AND databases.database_id = 7
AND objects.name IS NOT NULL
AND indexes.name IS NOT NULL
AND user_scans>0
ORDER BY user_scans DESC, stats.object_id, indexes.index_id

-- 索引提高了多少性能
-- 虽然用户能够修改性能提高的百分比，但以下查询返回所有能够将性能提高40%或更高的索引。你可以清晰的看到每个索引提高的性能和效率了
SELECT avg_user_impact AS average_improvement_percentage, 
		avg_total_user_cost AS average_cost_of_query_without_missing_index,  
		'CREATE INDEX ix_' + [statement] +  ISNULL(equality_columns, '_') + 
		ISNULL(inequality_columns, '_') + ' ON ' + [statement] +  
		' (' + ISNULL(equality_columns, ' ') +  
		ISNULL(inequality_columns, ' ') + ')' +  
		ISNULL(' INCLUDE (' + included_columns + ')', '')  
		AS create_missing_index_command 
FROM sys.dm_db_missing_index_details a 
INNER JOIN sys.dm_db_missing_index_groups b ON a.index_handle = b.index_handle 
INNER JOIN sys.dm_db_missing_index_group_stats c ON b.index_group_handle = c.group_handle 
WHERE avg_user_impact > = 40
-- 最占用CPU、执行时间最长命令
-- 这个和索引无关，但是还是在这里提出来，因为他也属于DMV带给我们的功能，他可以让你轻松查询出，哪些sql语句占用你的cpu最高
SELECT TOP 100 execution_count,
		total_logical_reads /execution_count AS [Avg Logical Reads],
        total_elapsed_time /execution_count AS [Avg Elapsed Time],
        db_name(st.dbid) as [database name],
        object_name(st.dbid) as [object name],
        object_name(st.objectid) as [object name 1],
        SUBSTRING(st.text, (qs.statement_start_offset / 2) + 1, 
        ((CASE statement_end_offset 
		  WHEN -1 THEN DATALENGTH(st.text) 
		  ELSE qs.statement_end_offset 
		  END - qs.statement_start_offset) / 2) + 1) AS statement_text
FROM sys.dm_exec_query_stats AS qs CROSS APPLY sys.dm_exec_sql_text(qs.sql_handle) AS st
WHERE execution_count > 100
ORDER BY 1 DESC;
-- 执行时间最长的命令
-- 看到了吗？直接可以定位到你的sql语句，优化去吧。还等什么呢？
SELECT TOP 10 COALESCE(DB_NAME(st.dbid), 
		DB_NAME(CAST(pa.value as int))+'*', 'Resource') AS DBNAME,
		SUBSTRING(text,
			-- starting value for substring
			CASE WHEN statement_start_offset = 0 OR statement_start_offset IS NULL THEN 1
			ELSE statement_start_offset/2 + 1 END,
			-- ending value for substring
			CASE WHEN statement_end_offset = 0 OR statement_end_offset = -1 
				OR statement_end_offset IS NULL THEN LEN(text)
			ELSE statement_end_offset/2 END - 
			CASE WHEN statement_start_offset = 0 OR statement_start_offset IS NULL THEN 1
			ELSE statement_start_offset/2  END + 1) AS TSQL,
		total_logical_reads/execution_count AS AVG_LOGICAL_READS
FROM sys.dm_exec_query_stats
CROSS APPLY sys.dm_exec_sql_text(sql_handle) st
OUTER APPLY sys.dm_exec_plan_attributes(plan_handle) pa
WHERE attribute = 'dbid'
ORDER BY AVG_LOGICAL_READS DESC;
-- 缺失索引
-- 缺失索引就是帮你查找你的数据库缺少什么索引，告诉你那些字段需要加上索引，这样你就可以根据提示添加你数据库缺少的索引了
SELECT TOP 10 [Total Cost] = ROUND(
		avg_total_user_cost * avg_user_impact * (user_seeks + user_scans), 0), 
		avg_user_impact, TableName = statement, [EqualityUsage] = equality_columns, 
		[InequalityUsage] = inequality_columns, [Include Cloumns] = included_columns
FROM sys.dm_db_missing_index_groups g
INNER JOIN sys.dm_db_missing_index_group_stats s ON s.group_handle = g.index_group_handle
INNER JOIN sys.dm_db_missing_index_details d ON d.index_handle = g.index_handle
ORDER BY [Total Cost] DESC;


/*
一、不合理的索引设计----
例：表record有620000行，试看在不同的索引下，下面几个 SQL的运行情况：
---- 1.在date上建有一个非群集索引
select count(*) from record where date >'19991201' and date < '19991214'and amount >2000 (25秒)
select date, sum(amount) from record group by date(55秒)
select count(*) from record where date >'19990901' and place in ('BJ','SH') (27秒)
---- 分析：----
date上有大量的重复值，在非群集索引下，数据在物理上随机存放在数据页上，在范围查找时，必须执行一次表扫描才能找到这一范围内的全部行。
---- 2.在date上的一个群集索引
select count(*) from record where date >'19991201' and date < '19991214' and amount >2000 （14秒）
select date, sum(amount) from record group by date（28秒）
select count(*) from record where date >'19990901' and place in ('BJ','SH')（14秒）
---- 分析：---- 
在群集索引下，数据在物理上按顺序存放在数据页上，重复值也排列在一起，因而在范围查找时，可以先找到这个范围的起末点，且只在这个范围内扫描数据页，避免了大范围扫描，提高了查询速度。
---- 3.在place，date，amount上的组合索引
select count(*) from record where date >'19991201' and date < '19991214' and amount >2000 （26秒）
select date, sum(amount) from record group by date（27秒）
select count(*) from record where date >'19990901' and place in ('BJ, 'SH')（< 1秒）
---- 分析：---- 
这是一个不很合理的组合索引，因为它的前导列是place，第一和第二条SQL没有引用place，因此也没有利用上索引；第三个SQL使用了place，且引用的所有列都包含在组合索引中，形成了索引覆盖，所以它的速度是非常快的。
---- 4.在date，place，amount上的组合索引
select count(*) from record where date >'19991201' and date < '19991214' and amount >2000(< 1秒)
select date,sum(amount) from record group by date（11秒）
select count(*) from record where date >'19990901' and place in ('BJ','SH')（< 1秒）
---- 分析：---- 
这是一个合理的组合索引。它将date作为前导列，使每个SQL都可以利用索引，并且在第一和第三个SQL中形成了索引覆盖，因而性能达到了最优。
---- 5.总结：----
缺省情况下建立的索引是非群集索引，但有时它并不是最佳的；合理的索引设计要建立在对各种查询的分析和预测上。
一般来说：
1.有大量重复值、且经常有范围查询（between, >,< ，>=,< =）和order by、group by发生的列，可考虑建立群集索引；
2.经常同时存取多列，且每列都含有重复值可考虑建立组合索引；
3.组合索引要尽量使关键查询形成索引覆盖，其前导列一定是使用最频繁的列。
 
二、不充份的连接条件：
例：表card有7896行，在card_no上有一个非聚集索引，表account有191122行，在account_no上有一个非聚集索引，试看在不同的表连接条件下，两个SQL的执行情况：
select sum(a.amount) from account a,card b where a.card_no = b.card_no（20秒）
select sum(a.amount) from account a,card b where a.card_no = b.card_no and a.account_no=b.account_no（< 1秒）
---- 分析：---- 
在第一个连接条件下，最佳查询方案是将account作外层表，card作内层表，利用card上的索引，其I/O次数可由以下公式估算为：外层表account上的22541页+（外层表account的191122行*内层表card上对应外层表第一行所要查找的3页）=595907次I/O
在第二个连接条件下，最佳查询方案是将card作外层表，account作内层表，利用account上的索引，其I/O次数可由以下公式估算为：外层表card上的1944页+（外层表card的7896行*内层表account上对应外层表每一行所要查找的4页）= 33528次I/O
可见，只有充份的连接条件，真正的最佳方案才会被执行。
总结：
1.多表操作在被实际执行前，查询优化器会根据连接条件，列出几组可能的连接方案并从中找出系统开销最小的最佳方案。连接条件要充份考虑带有索引的表、行数多的表；内外表的选择可由公式：外层表中的匹配行数*内层表中每一次查找的次数确定，乘积最小为最佳方案。
2.查看执行方案的方法-- 用set showplanon，打开showplan选项，就可以看到连接顺序、使用何种索引的信息；想看更详细的信息，需用sa角色执行dbcc(3604,310,302)。
 
三、不可优化的where子句
1.例：下列SQL条件语句中的列都建有恰当的索引，但执行速度却非常慢：
select * from record where substring(card_no,1,4)='5378'(13秒)
select * from record where amount/30< 1000（11秒）
select * from record where convert(char(10),date,112)='19991201'（10秒）
分析：
where子句中对列的任何操作结果都是在SQL运行时逐列计算得到的，因此它不得不进行表搜索，而没有使用该列上面的索引；
如果这些结果在查询编译时就能得到，那么就可以被SQL优化器优化，使用索引，避免表搜索，因此将SQL重写成下面这样：
select * from record where card_no like'5378%'（< 1秒）
select * from record where amount< 1000*30（< 1秒）
select * from record where date= '1999/12/01'（< 1秒）
你会发现SQL明显快起来！
2.例：表stuff有200000行，id_no上有非群集索引，请看下面这个SQL：
select count(*) from stuff where id_no in('0','1')（23秒）
分析：---- where条件中的'in'在逻辑上相当于'or'，所以语法分析器会将in ('0','1')转化为id_no ='0' or id_no='1'来执行。
我们期望它会根据每个or子句分别查找，再将结果相加，这样可以利用id_no上的索引；
但实际上（根据showplan），它却采用了"OR策略"，即先取出满足每个or子句的行，存入临时数据库的工作表中，再建立唯一索引以去掉重复行，最后从这个临时表中计算结果。因此，实际过程没有利用id_no上索引，并且完成时间还要受tempdb数据库性能的影响。
实践证明，表的行数越多，工作表的性能就越差，当stuff有620000行时，执行时间竟达到220秒！还不如将or子句分开：
select count(*) from stuff where id_no='0'
select count(*) from stuff where id_no='1'
得到两个结果，再作一次加法合算。因为每句都使用了索引，执行时间只有3秒，在620000行下，时间也只有4秒。
或者，用更好的方法，写一个简单的存储过程：
create proc count_stuff 
as 
declare @a int
declare @b int
declare @c int
declare @d char(10)
begin
select @a=count(*) from stuff where id_no='0'
select @b=count(*) from stuff where id_no='1'
end
select @c=@a+@b
select @d=convert(char(10),@c)
print @d
直接算出结果，执行时间同上面一样快！ 
---- 总结：---- 
可见，所谓优化即where子句利用了索引，不可优化即发生了表扫描或额外开销。
1.任何对列的操作都将导致表扫描，它包括数据库函数、计算表达式等等，查询时要尽可能将操作移至等号右边。
2.in、or子句常会使用工作表，使索引失效；如果不产生大量重复值，可以考虑把子句拆开；拆开的子句中应该包含索引。
3.要善于使用存储过程，它使SQL变得更加灵活和高效。
从以上这些例子可以看出，SQL优化的实质就是在结果正确的前提下，用优化器可以识别的语句，充份利用索引，减少表扫描的I/O次数，尽量避免表搜索的发生。其实SQL的性能优化是一个复杂的过程，上述这些只是在应用层次的一种体现，深入研究还会涉及数据库层的资源配置、网络层的流量控制以及操作系统层的总体设计。

*/


/*
SQL Server 支持三种游标实现
1、Transact-SQL 游标：基于 DECLARE CURSOR 语法，主要用于 Transact-SQL 脚本、存储过程和触发器中。
2、应用程序编程接口(API)服务器游标：支持OLEDB和ODBC中的API游标函数。API服务器游标在服务器上实现。
3、客户端游标：由SQL Server Native Client ODBC驱动程序和实现ADO API的DLL在内部实现。
游标类型：
1、只进：只支持游标从头到尾顺序提取
2、静态：静态游标的完整结果集是打开游标时在 tempdb 中生成的。静态游标总是按照打开游标时的原样显示结果集。
3、动态：当滚动游标时，动态游标反映结果集中所做的所有更改。
*/

-- 定义XML数据列
CREATE TABLE [Production].[ProductModel](
	[ProductModelID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [dbo].[Name] NOT NULL,
	[CatalogDescription] [xml](CONTENT [Production].[ProductDescriptionSchemaCollection]) NULL,
	[Instructions] [xml](CONTENT [Production].[ManuInstructionsSchemaCollection]) NULL,
	[rowguid] [uniqueidentifier] ROWGUIDCOL  NOT NULL CONSTRAINT [DF_ProductModel_rowguid]  DEFAULT (newid()),
	[ModifiedDate] [datetime] NOT NULL CONSTRAINT [DF_ProductModel_ModifiedDate]  DEFAULT (getdate()),
 CONSTRAINT [PK_ProductModel_ProductModelID] PRIMARY KEY CLUSTERED 
(
	[ProductModelID] ASC
) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]


