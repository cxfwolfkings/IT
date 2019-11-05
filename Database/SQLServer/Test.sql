-- �鿴IO�������
SET STATISTICS IO ON
-- do something...
SELECT * FROM T_Animal
-- Table 'T_Animal'. Scan count 1, logical reads 2, physical reads 0, read-ahead reads 0, lob logical reads 0, lob physical reads 0, lob read-ahead reads 0.
SET STATISTICS IO OFF
go

-- �鿴����
exec sp_helpindex T_Animal;
go

-- DMV
-- ����ʹ�ô���
/*
 * user_seeks : ͨ���û���ѯִ�е�����������������⣺��ͳ�����������Ĵ���
user_scans: ͨ���û���ѯִ�е�ɨ�������������⣺��ͳ�Ʊ�ɨ��Ĵ��������������
user_lookups: ͨ���û���ѯִ�еĲ��Ҵ�����������⣺�û�ͨ���������ң���ʹ��RID��ۼ������������ݵĴ��������ڶѱ��ۼ������ݶ��Ժ��������ʹ�ô���
user_updates:  ͨ���û���ѯִ�еĸ��´�����������⣺�������ĸ��´���

 */
select objectname=object_name(s.object_id), s.object_id, indexname=i.name, i.index_id, user_seeks, user_scans, user_lookups, user_updates
from sys.dm_db_index_usage_stats s, sys.indexes i
where database_id = db_id() and objectproperty(s.object_id,'IsUserTable') = 1
and i.object_id = s.object_id
and i.index_id = s.index_id
order by (user_seeks + user_scans + user_lookups + user_updates) asc
-- ʹ�ö����������ǰ��
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

-- ��������˶�������
-- ��Ȼ�û��ܹ��޸�������ߵİٷֱȣ������²�ѯ���������ܹ����������40%����ߵ�����������������Ŀ���ÿ��������ߵ����ܺ�Ч����
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
-- ��ռ��CPU��ִ��ʱ�������
-- ����������޹أ����ǻ������������������Ϊ��Ҳ����DMV�������ǵĹ��ܣ��������������ɲ�ѯ������Щsql���ռ�����cpu���
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
-- ִ��ʱ���������
-- ��������ֱ�ӿ��Զ�λ�����sql��䣬�Ż�ȥ�ɡ�����ʲô�أ�
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
-- ȱʧ����
-- ȱʧ�������ǰ������������ݿ�ȱ��ʲô��������������Щ�ֶ���Ҫ����������������Ϳ��Ը�����ʾ��������ݿ�ȱ�ٵ�������
SELECT TOP 10 [Total Cost] = ROUND(
		avg_total_user_cost * avg_user_impact * (user_seeks + user_scans), 0), 
		avg_user_impact, TableName = statement, [EqualityUsage] = equality_columns, 
		[InequalityUsage] = inequality_columns, [Include Cloumns] = included_columns
FROM sys.dm_db_missing_index_groups g
INNER JOIN sys.dm_db_missing_index_group_stats s ON s.group_handle = g.index_group_handle
INNER JOIN sys.dm_db_missing_index_details d ON d.index_handle = g.index_handle
ORDER BY [Total Cost] DESC;


/*
һ����������������----
������record��620000�У��Կ��ڲ�ͬ�������£����漸�� SQL�����������
---- 1.��date�Ͻ���һ����Ⱥ������
select count(*) from record where date >'19991201' and date < '19991214'and amount >2000 (25��)
select date, sum(amount) from record group by date(55��)
select count(*) from record where date >'19990901' and place in ('BJ','SH') (27��)
---- ������----
date���д������ظ�ֵ���ڷ�Ⱥ�������£�������������������������ҳ�ϣ��ڷ�Χ����ʱ������ִ��һ�α�ɨ������ҵ���һ��Χ�ڵ�ȫ���С�
---- 2.��date�ϵ�һ��Ⱥ������
select count(*) from record where date >'19991201' and date < '19991214' and amount >2000 ��14�룩
select date, sum(amount) from record group by date��28�룩
select count(*) from record where date >'19990901' and place in ('BJ','SH')��14�룩
---- ������---- 
��Ⱥ�������£������������ϰ�˳����������ҳ�ϣ��ظ�ֵҲ������һ������ڷ�Χ����ʱ���������ҵ������Χ����ĩ�㣬��ֻ�������Χ��ɨ������ҳ�������˴�Χɨ�裬����˲�ѯ�ٶȡ�
---- 3.��place��date��amount�ϵ��������
select count(*) from record where date >'19991201' and date < '19991214' and amount >2000 ��26�룩
select date, sum(amount) from record group by date��27�룩
select count(*) from record where date >'19990901' and place in ('BJ, 'SH')��< 1�룩
---- ������---- 
����һ�����ܺ���������������Ϊ����ǰ������place����һ�͵ڶ���SQLû������place�����Ҳû��������������������SQLʹ����place�������õ������ж���������������У��γ����������ǣ����������ٶ��Ƿǳ���ġ�
---- 4.��date��place��amount�ϵ��������
select count(*) from record where date >'19991201' and date < '19991214' and amount >2000(< 1��)
select date,sum(amount) from record group by date��11�룩
select count(*) from record where date >'19990901' and place in ('BJ','SH')��< 1�룩
---- ������---- 
����һ��������������������date��Ϊǰ���У�ʹÿ��SQL���������������������ڵ�һ�͵�����SQL���γ����������ǣ�������ܴﵽ�����š�
---- 5.�ܽ᣺----
ȱʡ����½����������Ƿ�Ⱥ������������ʱ����������ѵģ�������������Ҫ�����ڶԸ��ֲ�ѯ�ķ�����Ԥ���ϡ�
һ����˵��
1.�д����ظ�ֵ���Ҿ����з�Χ��ѯ��between, >,< ��>=,< =����order by��group by�������У��ɿ��ǽ���Ⱥ��������
2.����ͬʱ��ȡ���У���ÿ�ж������ظ�ֵ�ɿ��ǽ������������
3.�������Ҫ����ʹ�ؼ���ѯ�γ��������ǣ���ǰ����һ����ʹ����Ƶ�����С�
 
��������ݵ�����������
������card��7896�У���card_no����һ���Ǿۼ���������account��191122�У���account_no����һ���Ǿۼ��������Կ��ڲ�ͬ�ı����������£�����SQL��ִ�������
select sum(a.amount) from account a,card b where a.card_no = b.card_no��20�룩
select sum(a.amount) from account a,card b where a.card_no = b.card_no and a.account_no=b.account_no��< 1�룩
---- ������---- 
�ڵ�һ�����������£���Ѳ�ѯ�����ǽ�account������card���ڲ������card�ϵ���������I/O�����������¹�ʽ����Ϊ������account�ϵ�22541ҳ+������account��191122��*�ڲ��card�϶�Ӧ�����һ����Ҫ���ҵ�3ҳ��=595907��I/O
�ڵڶ������������£���Ѳ�ѯ�����ǽ�card������account���ڲ������account�ϵ���������I/O�����������¹�ʽ����Ϊ������card�ϵ�1944ҳ+������card��7896��*�ڲ��account�϶�Ӧ����ÿһ����Ҫ���ҵ�4ҳ��= 33528��I/O
�ɼ���ֻ�г�ݵ�������������������ѷ����Żᱻִ�С�
�ܽ᣺
1.�������ڱ�ʵ��ִ��ǰ����ѯ�Ż�������������������г�������ܵ����ӷ����������ҳ�ϵͳ������С����ѷ�������������Ҫ��ݿ��Ǵ��������ı�������ı�������ѡ����ɹ�ʽ�������е�ƥ������*�ڲ����ÿһ�β��ҵĴ���ȷ�����˻���СΪ��ѷ�����
2.�鿴ִ�з����ķ���-- ��set showplanon����showplanѡ��Ϳ��Կ�������˳��ʹ�ú�����������Ϣ���뿴����ϸ����Ϣ������sa��ɫִ��dbcc(3604,310,302)��
 
���������Ż���where�Ӿ�
1.��������SQL��������е��ж�����ǡ������������ִ���ٶ�ȴ�ǳ�����
select * from record where substring(card_no,1,4)='5378'(13��)
select * from record where amount/30< 1000��11�룩
select * from record where convert(char(10),date,112)='19991201'��10�룩
������
where�Ӿ��ж��е��κβ������������SQL����ʱ���м���õ��ģ���������ò����б���������û��ʹ�ø��������������
�����Щ����ڲ�ѯ����ʱ���ܵõ�����ô�Ϳ��Ա�SQL�Ż����Ż���ʹ���������������������˽�SQL��д������������
select * from record where card_no like'5378%'��< 1�룩
select * from record where amount< 1000*30��< 1�룩
select * from record where date= '1999/12/01'��< 1�룩
��ᷢ��SQL���Կ�������
2.������stuff��200000�У�id_no���з�Ⱥ���������뿴�������SQL��
select count(*) from stuff where id_no in('0','1')��23�룩
������---- where�����е�'in'���߼����൱��'or'�������﷨�������Ὣin ('0','1')ת��Ϊid_no ='0' or id_no='1'��ִ�С�
���������������ÿ��or�Ӿ�ֱ���ң��ٽ������ӣ�������������id_no�ϵ�������
��ʵ���ϣ�����showplan������ȴ������"OR����"������ȡ������ÿ��or�Ӿ���У�������ʱ���ݿ�Ĺ������У��ٽ���Ψһ������ȥ���ظ��У����������ʱ���м���������ˣ�ʵ�ʹ���û������id_no���������������ʱ�仹Ҫ��tempdb���ݿ����ܵ�Ӱ�졣
ʵ��֤�����������Խ�࣬����������ܾ�Խ���stuff��620000��ʱ��ִ��ʱ�侹�ﵽ220�룡�����罫or�Ӿ�ֿ���
select count(*) from stuff where id_no='0'
select count(*) from stuff where id_no='1'
�õ��������������һ�μӷ����㡣��Ϊÿ�䶼ʹ����������ִ��ʱ��ֻ��3�룬��620000���£�ʱ��Ҳֻ��4�롣
���ߣ��ø��õķ�����дһ���򵥵Ĵ洢���̣�
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
ֱ����������ִ��ʱ��ͬ����һ���죡 
---- �ܽ᣺---- 
�ɼ�����ν�Ż���where�Ӿ������������������Ż��������˱�ɨ�����⿪����
1.�κζ��еĲ����������±�ɨ�裬���������ݿ⺯����������ʽ�ȵȣ���ѯʱҪ�����ܽ����������Ⱥ��ұߡ�
2.in��or�Ӿ䳣��ʹ�ù�����ʹ����ʧЧ����������������ظ�ֵ�����Կ��ǰ��Ӿ�𿪣��𿪵��Ӿ���Ӧ�ð���������
3.Ҫ����ʹ�ô洢���̣���ʹSQL��ø������͸�Ч��
��������Щ���ӿ��Կ�����SQL�Ż���ʵ�ʾ����ڽ����ȷ��ǰ���£����Ż�������ʶ�����䣬����������������ٱ�ɨ���I/O��������������������ķ�������ʵSQL�������Ż���һ�����ӵĹ��̣�������Щֻ����Ӧ�ò�ε�һ�����֣������о������漰���ݿ�����Դ���á����������������Լ�����ϵͳ���������ơ�

*/


/*
SQL Server ֧�������α�ʵ��
1��Transact-SQL �α꣺���� DECLARE CURSOR �﷨����Ҫ���� Transact-SQL �ű����洢���̺ʹ������С�
2��Ӧ�ó����̽ӿ�(API)�������α꣺֧��OLEDB��ODBC�е�API�α꺯����API�������α��ڷ�������ʵ�֡�
3���ͻ����α꣺��SQL Server Native Client ODBC���������ʵ��ADO API��DLL���ڲ�ʵ�֡�
�α����ͣ�
1��ֻ����ֻ֧���α��ͷ��β˳����ȡ
2����̬����̬�α������������Ǵ��α�ʱ�� tempdb �����ɵġ���̬�α����ǰ��մ��α�ʱ��ԭ����ʾ�������
3����̬���������α�ʱ����̬�α귴ӳ����������������и��ġ�
*/

-- ����XML������
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


