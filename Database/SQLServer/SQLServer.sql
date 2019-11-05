�������ݿ�ʵ��
USE [master]
GO
/*
N �������ʾUnicode������˫�ֽ��ַ������������ַ�����һ���ֽ����洢���㹻�ˣ����ڶ��������ַ�������Ҫ�����ֽ����洢��
Unicode Ϊ��ͳһ���淶�����㡢���ݣ��͹涨�����ַ�Ҳ�������ֽ����洢��
Ҳ����˵��N �ͱ�ʾ�ַ�����Unicode ��ʽ�洢������ʱ����벻�Ӷ�һ��������ʲôԭ���أ����������Զ�ת����ɵġ�
���磺declare @status nvarchar(20)
	select @status = N'stopped'
	select @status = 'stopped' 
ʵ�����������丳ֵ�Ľ����һ���ģ���Ϊ�������;���nvarchar(Unicode ����)��
����Щ�ط������磺sp_executesql �Ĳ����������Զ�ת����������Ҫ��N �ˡ�
*/
CREATE DATABASE [Charles] ON  PRIMARY 
( NAME = N'Charles', FILENAME = N'K:\Charles.mdf' , SIZE = 664576KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'Charles_log', FILENAME = N'K:\Charles_log.ldf' , SIZE = 1341696KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
/*
��������MS SQL Server�ļ��ݼ���
MS SQL Server 2000:SET COMPATIBILITY_LEVEL=80
MS SQL Server 2005:SET COMPATIBILITY_LEVEL=90
MS SQL Server 2008:SET COMPATIBILITY_LEVEL=100
MS SQL Server 2012:SET COMPATIBILITY_LEVEL=110
*/
ALTER DATABASE [Charles] SET COMPATIBILITY_LEVEL = 90
GO
/*
�����й�ȫ�ķ��񼶱����Ե���Ϣ��ȫ������������ Microsoft SQL Server (MSSQLSERVER) �� Microsoft Search Service (MSFTESQL) �����ṩ��
����ʹ�� sp_fulltext_service ���úͼ�����Щ���ԡ�
IsFullTextInstalled:�� SQL Server �ĵ�ǰʵ���а�װȫ�������
1 = �Ѱ�װȫ������� 
0 = δ��װȫ������� 
NULL = ������Ч��������
*/
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
/*
�� SQL Server 2008 �͸��߰汾�е�ȫ��Ŀ¼û��Ӱ�죬֧����ֻ��Ϊ�������ݡ�  
sp_fulltext_database ����������ڸ������ݿ��ȫ�����档�� SQL Server 2014 �У������û����������ݿ�ʼ������ȫ��������
*/
EXEC [Charles].[dbo].[sp_fulltext_database] @action = 'disable'
end
GO
/*tempdb ���ݿ⣬tempdb ϵͳ���ݿ���һ��ȫ����Դ���ɹ����ӵ� SQL Server ʵ���������û�ʹ�á�*/
/*�����ݿ�� ANSI null default ѡ��Ϊ false ʱ���޸ĻỰ����Ϊ�Ը������е�Ĭ��Ϊ���ԡ�*/
ALTER DATABASE [Charles] SET ANSI_NULL_DEFAULT OFF
GO
/*ָ���� SQL Server 2014 ���� Null ֵһ��ʹ�õ��� (=) �Ͳ����� (<>) �Ƚ������ʱ���÷��� ISO ��׼����Ϊ��*/
ALTER DATABASE [Charles] SET ANSI_NULLS OFF
GO
/*��������δ洢���ȱ��е��Ѷ����С�̵�ֵ���Լ���δ洢 char��varchar��binary �� varbinary �����к���β��ո��ֵ*/
ALTER DATABASE [Charles] SET ANSI_PADDING OFF
GO
/*�Լ��ִ������ָ�� ISO ��׼��Ϊ*/
ALTER DATABASE [Charles] SET ANSI_WARNINGS OFF
GO
/*�ڲ�ѯִ�й����з���������������ʱ��ֹ��ѯ�� */
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

�������
/****** Object:  Table [dbo].[hero] Script Date: 01/23/2015 09:05:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
��ʶ�У���SQL Server�еı�ʶ���ֳƱ�ʶ���У�ϰ�����ֽ������С�
�����о������������ص㣺
1���е���������Ϊ����С������ֵ����
2���ڽ��в��루Insert������ʱ�����е�ֵ����ϵͳ��һ���������ɣ��������ֵ
3����ֵ���ظ������б�ʶ����ÿһ�е����ã�ÿ����ֻ����һ����ʶ�С�
��ʶ�����ͱ�������ֵ����decimal��int��numeric��smallint��bigint ��tinyint 
����Ҫע����ǣ���ѡ��decimal��numericʱ��С��λ������Ϊ��
�ж�һ�����Ƿ���б�ʶ�У�Select OBJECTPROPERTY(OBJECT_ID����������������TableHasIdentity����
�ж�ĳ���Ƿ��Ǳ�ʶ�У�SELECT COLUMNPROPERTY(OBJECT_ID��������������������������IsIdentity����
��ѯĳ���ʶ�е�������
SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.columns 
	WHERE TABLE_NAME=�������� ANDCOLUMNPROPERTY(OBJECT_ID��������������COLUMN_NAME����IsIdentity����=1
�����SQL��������ñ�ʶ�У����ùؼ���IDENTITYCOL����
��ȡ��ʶ�е�����ֵ��SELECT IDENT_SEED ������������ 
��ȡ��ʶ�еĵ�������SELECT IDENT_INCR������������ 
��ȡָ������������ɵı�ʶֵ��SELECT IDENT_CURRENT������������ 
�ܽ�һ�±�ʶ���ڸ����еĴ�������
1�����ո���
�ڿ��ո����У�ͨ�����뿼�Ǳ�ʶ�е����ԡ�
2��������
������
�������ݿ�A���������ݿ�B��������ΪT_test_A�����ı�ΪT_test_B
CREATE TABLE T_test_A
��ID int IDENTITY��1,1����
Name varchar��50��
��

CREATE TABLE T_test_B
��ID int IDENTITY��1,1����
Name varchar��50��
��

����������£����ƴ����޷������и��Ƶ���B����Ϊ��ID�Ǳ�ʶ�У����ܸ���ʶ����ʾ�ṩֵ������ʧ�ܡ�
��ʱ����ҪΪ��ʶ������NOT FOR REPLICATION ѡ������������ƴ���������κε�¼���ӵ���B�ϵı�T_testʱ���ñ��ϵ����� NOT
FOR REPLICATION ѡ�������Ϳ�����ʽ����ID�С�
��������������
1����B��T_test���ᱻ�û�����Ӧ�ó��򣩸���
��򵥵�����ǣ������B��T_test���ᱻ�û�����Ӧ�ó��򣩸��£��ǽ���ȥ��ID�еı�ʶ���ԣ�ֻ���ü�int���ͼ��ɡ�
2����B��T_test���ǻᱻ�����û�����Ӧ�ó��򣩸��� 
��������£�����T_test���ID�оͻᷢ����ͻ��������
�ڿ�A��ִ��������䣺
INSERT T_test_A(Name) VALUES����Tom����������ID��Ϊ1��
�ڿ�B��ִ��������䣺
INSERT T_test_B(Name) VALUES����Pip����������ID��Ϊ1��
�������ͻ��ڿ�A�Ϳ�B��������ֱ����һ����¼����Ȼ����������ͬ�ļ�¼��
Ȼ�����黹û�н���������Ԥ���趨�ĸ���ʱ�䣬���ƴ�����ͼ�Ѽ�¼"1 TOM"���뵽��B�е�T_test������B��T_test_B���Ѿ�����
IDΪ1���У����벻��ɹ���ͨ�����Ƽ����������ǻᷢ�ָ���ʧ���ˡ�
�����������ķ����У�
��Ϊ�������Ͷ��ķ��ı�ʶ��ָ����ͬ��Χ��ֵ�����������޸�Ϊ��
ȷ���ñ��¼���ᳬ��10000000
CREATE TABLE T_test_A
��ID int IDENTITY��1,1����
Name varchar��50��
��

CREATE TABLE T_test_B
��ID int IDENTITY��10000000,1����
Name varchar��50��
��

��ʹ�������Ͷ��ķ��ı�ʶ�е�ֵ�����ظ�����
ʹ������ֵ
CREATE TABLE T_test_A
��ID int IDENTITY��1,2����
Name varchar��50��
��

ʹ��ż��ֵ
CREATE TABLE T_test_B
��ID int IDENTITY��2,2����
Name varchar��50��
��

���ְ취���ƹ㣬�����ķ��ͷ��������Ĵ�ʱ����ʶ�����ԵĶ���ֱ�����
��1,4������2,4������3,4������4,4��

3���ϲ�����
�����������н��������ֻҪʹ������Ͷ��ı��ʶ�е�ֵ���ظ��ȿɡ�
*/
CREATE TABLE hero( 
	id nchar(5) not null primary key, ��������colb_unique int unique, ΨһԼ��
	heroNnumber int not null identity(100,1), ����������100��ʼ��ÿ��ֵ����1��
	houses int not null default(0),  Ĭ��ֵ0
	cars int not null, 
	sex nchar(1) not null default('��'), Ĭ����
	recordTime datetime not null default(getdate()), Ĭ�ϵõ�ϵͳʱ��
	age int not null check(age>=18 and age<=55), ���Լ��������ֵ��18��55֮��
	code nchar(9) not null check(code like 'msd0902[0-9][^6-9]'), ���Լ��������ֵǰ7λ�����ǡ�msd0902������������λ������0-9������һ�����֣����һλ����6-9֮������֡�
	strength numeric(5,0) not null, ���ֵ��5λ������
	undefined uniqueidentifier not null default(newid()) ʹ��newid()�����������ȡ��ֵ
)
create table Team(
	id int identity(1,1) not null,
	remark nvarchar(50),
	code decimal(10,2) ��10λ��С�����2λ
	CONSTRAINT [PK_Team] PRIMARY KEY CLUSTERED(id ASC)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
go
Ϊ�������е��ֶ�����Ĭ��ֵ 
alter table ���� add constraint ���� default(20) for age 
go 
/*
�� SET NOCOUNT Ϊ ON ʱ�������ؼ�������ʾ�� Transact-SQL ���Ӱ�����������
�� SET NOCOUNT Ϊ OFF ʱ�����ؼ�����
����洢�����а�����һЩ��䲢���������ʵ�ʵ����ݣ�����������ڴ���������������������˿�����������ܡ�
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
DATEDIFF ��������ָ�������������еڶ����������һ�����ڵ�ʱ�������ڲ��֡�
���仰˵������ ����������֮��ļ��������ǵ��� date2 - date1 �����ڲ��ֵĴ���������ֵ��
DateDiff(timeinterval,date1,date2 [, firstdayofweek [, firstweekofyear]])
timeinterval ��ʾ���ʱ������ͣ�����Ϊ��
��� yy��yyyy ���� qq��q
�·� mm��m
ÿ���ĳһ�� dy��y
���� dd��d
���� wk��ww
������ dw
Сʱ hh
���� mi��n
�� ss��s
���� ms
*/
CREATE proc [dbo].[knowledge_docList_bequoted]
(
@begtime datetime,������ص�ʱ�� ��ֹ����ӵ��ظ�
@beg int,
@strWhere varchar(1000),
@haveNext int output,0�ޣ�1��
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

��ѯ��Ŀ��Ϣ������ҳ��ҳǩ
create Procedure [dbo].[sp_PageList2005]    
	@tblName varchar(100),   ����    
	@fldName varchar(4000) = '*',  �ֶ���(ȫ���ֶ�Ϊ*)    
	@page int = 1 ,   ָ����ǰΪ�ڼ�ҳ    
	@PageSize int = 20,     ÿҳ��������¼   
	@fldSort varchar(1000),   �����ֶ�(����!֧�ֶ��ֶ�)    
	@strCondition varchar(8000) = '',  �������(���ü�where)     
	@GroupBy varchar(1000), �������(���ü�Group by)  
	@Counts int = 0 output �����ܼ�¼����      
as    
begin    
    declare @PageCount int   ������ҳ��   
    set @PageCount = 0  
    Begin Tran ��ʼ����    
    Declare @sql nvarchar(max);      
    
    �����ܼ�¼��   
	if(@GroupBy ='' or @GroupBy is null) ��GroupBy�����  
		begin  
		set @sql = 'select @Counts = count(*) from ' + @tblName    
		if (@strCondition<>'' and @strCondition is not NULL)    
			set @sql = @sql + ' where ' + @strCondition   
		end  
	else ��GroupBy�����  
		begin  
		set @sql = 'select @Counts=count(*) from(select 1 as total from ' + @tblName  
		if (@strCondition<>'' and @strCondition is not NULL)    
			set @sql = @sql + ' where ' + @strCondition  
		set @sql = @sql + ' group by ' + @GroupBy  
		set @sql = @sql + ') as t'  
		end  
   
    EXEC sp_executesql @sql,N'@Counts int OUTPUT',@Counts OUTPUT�����ܼ�¼��   
    select @PageCount=CEILING((@Counts+0.0)/@PageSize) ������ҳ��   
   
	set @sql = 'Select * FROM (select ROW_NUMBER() Over(order by ' + @fldSort + ') as rowId,' + @fldName + ' from ' + @tblName     
	if (@strCondition<>'' and @strCondition is not NULL)    
		set @sql = @sql + ' where ' + @strCondition  
	if(@GroupBy <>'' and @GroupBy is not null)  
		set @sql = @sql + ' group by ' + @GroupBy   
   
    ����ҳ��������Χ���    
    if @page<=0     
        Set @page = 1    
        
    if @page>@PageCount    
        Set @page = @PageCount    
    
     ����ʼ��ͽ�����    
    Declare @StartRecord int    
    Declare @EndRecord int    
        
    set @StartRecord = (@page-1)*@PageSize + 1    
    set @EndRecord = @StartRecord + @PageSize - 1    
    
    �����ϳ�sql���    
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
        Return @Counts -���ؼ�¼����    
      End        
end 

/*�жϽ����Ŀ�Ƿ��и���*/  
CREATE proc [dbo].[pms_project_existsNewInKingdee]  
as  
declare @str_sql nvarchar(4000),@connectStr varchar(1000),@dbID int����ID  
exec Pms_Matching_ConnectStr @connectStr output,@dbID output  
  
set @str_sql='select FName,FNumber,'+convert(varchar,@dbID)+',FItemID from '+@connectStr+'.dbo.t_Base_ProjectItem)'  
  
create table #temp_project_item_fromKingdee  
(FName nvarchar(255),FNumber nvarchar(80),dbID int,FItemID int)  
insert into #temp_project_item_fromKingdee  
exec sp_executesql @str_sql  
select * from #temp_project_item_fromKingdee  
declare @dbID_k int,@FItemID_k int,@is_e int  
set @is_e=0Ϊ1��ʾ����û�е��������Ŀ  
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
@dbID int  output ��ǰ����  
)  
as  
Begin  
 declare @IsSameIP int,@ip varchar(1000),@SourceUID varchar(100),@SourcePsw varchar(100),@dbName Nvarchar(100)  
         
    select @IsSameIP=IsSameIP,@ip=SourceAddress,@SourceUID=SourceUID,@SourcePsw=SourcePsw,@dbName=SourceAddressName,@dbID=PmsID from Pms_Matching_setting where IsEnable=1 ��ǰ��������  
            
 if(@IsSameIP=0)����ͬһ̨������  
 begin  
        set @connectStr='openrowset( ''SQLOLEDB '', '''+@ip+'''; '''+@SourceUID+'''; '''+@SourcePsw+''','+@dbName  
 end  
 else  
 begin��ͬһ̨������  
        set @connectStr='openrowset( ''SQLOLEDB '', ''''; '''+@SourceUID+'''; '''+@SourcePsw+''','+@dbName  
 end  
End  

��ѯ�����������ݿ���Ϣ
select * from OPENDATASOURCE(
		'SQLOLEDB','Data Source=192.168.0.252;User ID=Charles;Password=saige.aaa123456' 
	).Charles.dbo.mail_MailType

����һ�����ݿ��и������ݵ���ǰ���ݿ�
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
insert Customers values(001,'Charles','chenxiao8516@gmail.com','China','����','15106198396',0,29,'Ŭ�������','','')
insert Customers values(002,'Angel','AngelBaby@wind.com','China','����','13771559082',0,25,'���������','','')


--�ʼ����ͱ�
select * from OPENDATASOURCE(
		'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
	).SaigeOA.dbo.mail_MailType

--sqlserver�����ʱ�����ֶε�Ĭ��ֵ 
create table ��(id int,name varchar(10) default '����',age int) 

--����ֶ�ʱ�����ֶε�Ĭ��ֵ 
alter table �� add sex char(2) default '��' 

--Ϊ�������е��ֶ�����Ĭ��ֵ 
alter table �� add constraint DF_age_�� default(20) for age 
go 



  
--�˿���Ϣ��
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
  
  
-- �鿴ĳ���������
SELECT * FROM sys.sysindexes WHERE id=object_id('RelactionGraph')
 
-- �鿴�����������
SELECT * FROM sys.sysindexes
 
-- �鿴���Ў������
IF object_id('tempdb..#')IS NOT NULL
    DROP TABLE #
SELECT * INTO # FROM sys.sysindexes WHERE 1=2
 
INSERT INTO #
    EXEC sys.sp_MSforeachdb @command1='Select * from ?.sys.sysindexes'
     
SELECT * FROM #

--���ݿ�������¶��ϵ�˳�����WHERE�Ӿ䣬�������ԭ����֮������ӱ���д������WHERE����֮ǰ
SELECT w2.n, w1.* FROM ARTICLE w1, (
	SELECT TOP 50030 row_number() OVER (ORDER BY YEAR DESC, ID DESC) n, ID FROM ARTICLE ) w2 
	WHERE w1.ID = w2.ID AND w2.n > 50000 ORDER BY w2.n ASC   
	