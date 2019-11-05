--启用Ad Hoc Distributed Queries： 
exec sp_configure 'show advanced options',1 
reconfigure 
exec sp_configure 'Ad Hoc Distributed Queries',1 
reconfigure 
   
--关闭Ad Hoc Distributed Queries： 
exec sp_configure 'Ad Hoc Distributed Queries',0 
reconfigure 
exec sp_configure 'show advanced options',0 
reconfigure

SELECT * FROM OPENDATASOURCE(
		'SQLOLEDB','Data Source=tstservdb01.database.chinacloudapi.cn;User ID=dbo_smartos;Password=UIar97ji5Tds' 
	).RDCN_CPSSMARTOS.dbo.T_User

IF EXISTS (SELECT * FROM SYSOBJECTS WHERE id = OBJECT_ID(N'[T_OpportunityShare]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
DROP TABLE T_OpportunityShare
CREATE TABLE T_OpportunityShare(
	ID INT PRIMARY KEY IDENTITY(1,1),
	UserID INT,
	ShareType INT,
	UpdateDate DATETIME,
	UpdateUser INT
);
SELECT * FROM T_OpportunityShare;

IF EXISTS (SELECT * FROM SYSOBJECTS WHERE id = OBJECT_ID(N'[T_OpportunitySharedPerson]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
DROP TABLE T_OpportunitySharedPerson
CREATE TABLE T_OpportunitySharedPerson(
	ID INT PRIMARY KEY IDENTITY(1,1),
	ShareID INT,
	SharedPerson INT,
	UpdateDate DATETIME,
	UpdateUser INT
);
SELECT * FROM T_OpportunitySharedPerson;

IF EXISTS (SELECT * FROM SYSOBJECTS WHERE id = OBJECT_ID(N'T_ProductGroup') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
DROP TABLE T_ProductGroup
CREATE TABLE T_ProductGroup(
	ID INT PRIMARY KEY IDENTITY(1,1),
	DepartID INT,
	ProductLineID INT,
	ProductSeries NVARCHAR(32),
	ProductGroupName NVARCHAR(32),
	ProductGroupDesicrption NVARCHAR(64),
	Availability BIT,
	UpdateDate DATETIME,
	UpdateUser INT
);
SELECT * FROM T_ProductGroup
GO
SP_RENAME 'T_ProductGroup.ProductSeries','SystemSeries','column'
GO
SP_RENAME 'T_ProductGroup.ProductGroupName','SystemVariantName','column'
GO

IF EXISTS (SELECT * FROM SYSOBJECTS WHERE id = OBJECT_ID(N'T_Product') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
DROP TABLE T_Product
CREATE TABLE T_Product(
	ID INT PRIMARY KEY IDENTITY(1,1),
	ProductGroupID INT,
	ProductName NVARCHAR(32),
	ProductDescription NVARCHAR(32),
	Availability BIT,
	UpdateDate DATETIME,
	UpdateUser INT
);
SELECT * FROM T_Product
GO
SP_RENAME 'T_Product.ProductGroupID','SystemVariantID','column'
GO
SP_RENAME 'T_Product.ProductName','Instrument','column'
GO

IF EXISTS (SELECT * FROM SYSOBJECTS WHERE id = OBJECT_ID(N'T_OpportunityCommitment') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
DROP TABLE T_OpportunityCommitment
CREATE TABLE T_OpportunityCommitment(
	ID INT PRIMARY KEY IDENTITY(1,1),
	OpportunityID INT,
	ReagentID INT,
	ReagentNumber INT,
	UpdateDate DATETIME,
	UpdateUser INT
);
SELECT * FROM T_OpportunityCommitment
GO
SP_RENAME 'T_OpportunityCommitment.ReagentNumber','ReagentAmount','column'
GO

IF EXISTS (SELECT * FROM SYSOBJECTS WHERE id = OBJECT_ID(N'T_Customer') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
DROP TABLE T_Customer
CREATE TABLE [dbo].[T_Customer](
	[ID] [int] PRIMARY KEY IDENTITY(1,1),
	[Customer_ID] [int] NULL,
	[Customer_Name] [nvarchar](255) NULL,
	[Chinese_Cust_name] [nvarchar](255) NULL,
	[Eng_Cust_name] [nvarchar](255) NULL,
	[CUST_ACC_GRP2] [nvarchar](255) NULL,
	[REGION] [nvarchar](255) NULL,
	[CITY] [nvarchar](255) NULL,
	[STATE_PROV] [nvarchar](255) NULL,
	[ADDRESS] [nvarchar](255) NULL,
	[ADDRESS_2] [nvarchar](255) NULL,
	[COUNTRY] [nvarchar](255) NULL,
	[SAP_ACC_GROUP] [nvarchar](255) NULL,
	[STATUS] [int] NULL,
	[ZIPCODE] [int] NULL,
	[INDUSTRY_KEY] [nvarchar](255) NULL,
	[INDUSTRY_TYPE] [nvarchar](255) NULL,
	[SALES_ORG] [nvarchar](255) NULL,
	[DISTRIBUTION_CHANNEL] [nvarchar](255) NULL,
	[DIVISION] [int] NULL,
	[HOSPITAL_CLASSIFICATION] [nvarchar](255) NULL,
	[LAST_UPDATE_DATE] [datetime] NULL
);

GO
IF EXISTS (SELECT * FROM SYSOBJECTS WHERE id = OBJECT_ID(N'[sp_ImportCustomers]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
	DROP PROC [sp_ImportCustomers]
GO
CREATE PROC sp_ImportCustomers(
	@tempTableName NVARCHAR(50)
)
AS
BEGIN
	--DECLARE @CustomerIDTable TABLE(Customer_ID NVARCHAR(20))
	DECLARE @sql nvarchar(2000)
	DECLARE @count int
	SET @sql = 'SELECT @count = Count(Customer_ID) FROM ' + @tempTableName + ' c WHERE NOT EXISTS(SELECT ACCOUNT_ID FROM T_Sales_Territory s WHERE c.Customer_ID = s.ACCOUNT_ID)'
	EXEC SP_EXECUTESQL @sql, N'@count int out', @count out
	IF @count > 0
	BEGIN
		SET @sql = 'SELECT Customer_ID FROM ' + @tempTableName + ' c WHERE NOT EXISTS(SELECT ACCOUNT_ID FROM T_Sales_Territory s WHERE c.Customer_ID = s.ACCOUNT_ID)'
		--INSERT INTO @CustomerIDTable
		EXEC SP_EXECUTESQL @sql
		--SELECT * FROM @CustomerIDTable
		PRINT 'WARNING: Customer_ID is not in table T_Sales_Territory'
		PRINT 'WARNING: Please Correct the Customer.csv'
	END
	ELSE
	BEGIN
		IF EXISTS (SELECT * FROM SYSOBJECTS WHERE id = OBJECT_ID(N'T_Customer') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
			DROP TABLE T_Customer
		SET @sql = 'SELECT * INTO T_Customer FROM ' + @tempTableName 
		EXEC SP_EXECUTESQL @sql
		ALTER TABLE T_Customer ADD ID INT IDENTITY(1,1) PRIMARY KEY
		ALTER TABLE T_Customer ADD hcoId NVARCHAR(50)
	END
	SET @sql = 'DROP TABLE ' + @tempTableName
	EXEC SP_EXECUTESQL @sql
END
GO
SP_HELPTEXT sp_ImportCustomers
GO
EXEC sp_ImportCustomers N'Customer$'
GO

-- 已取消
BEGIN
DECLARE @id NVARCHAR(25);
DECLARE @lastArea NVARCHAR(25);
DECLARE @nowArea NVARCHAR(25);
-- 声明游标
DECLARE tempTerritory CURSOR FAST_FORWARD FOR
    SELECT ID, Area_Manager FROM T_Sales_Territory; 
-- 打开游标
OPEN tempTerritory;
-- 取第一条记录
FETCH NEXT FROM tempTerritory INTO @id, @nowArea;
-- 遍历
WHILE @@FETCH_STATUS=0
BEGIN
    -- 操作
    IF @nowArea = 'NULL'
		UPDATE T_Sales_Territory SET Area_Manager = @lastArea WHERE ID = @id
	ELSE
		SET @lastArea = @nowArea;
    -- 取下一条记录
    FETCH NEXT FROM tempTerritory INTO  @id, @nowArea;
END
-- 关闭游标
CLOSE tempTerritory;
-- 释放游标
DEALLOCATE tempTerritory;
END
GO

IF OBJECT_ID (N'getADNameByUserName') IS NOT NULL
	DROP FUNCTION getADNameByUserName
GO
CREATE FUNCTION getADNameByUserName
(
	@userName NVARCHAR(10)
)Returns NVARCHAR(32)
AS
BEGIN
	DECLARE @adName NVARCHAR(32);
	SET @adName = '';
	SELECT @adName = ADName FROM T_User WHERE UserName = @userName;
	IF @adName = ''
	BEGIN
		SELECT @adName = ADName FROM T_OpportunityEnterpriseUser WHERE UserName = @userName;
	END
	RETURN @adName;
END
GO
SELECT dbo.getADNameByUserName(SalesRepresentatives) AS ADName FROM T_Distributor WHERE CreatedBy = 'Colin'

BEGIN TRANSACTION
BEGIN
DECLARE @distributorIDTable TABLE(ID INT);
DECLARE @distributorID INT;
INSERT INTO @distributorIDTable 
	SELECT ID FROM T_Distributor WHERE CreatedBy = 'Colin'
-- 声明游标
DECLARE T_DistributorID CURSOR FAST_FORWARD FOR
    SELECT ID FROM @distributorIDTable    
-- 打开游标
OPEN T_DistributorID;
-- 取第一条记录
FETCH NEXT FROM T_DistributorID INTO @distributorID;
-- 遍历
WHILE @@FETCH_STATUS=0
BEGIN
    -- 操作
    INSERT INTO T_ApprovalProcess VALUES
		(@distributorID, 100,1,GETDATE()),
		(@distributorID, 100,2,GETDATE());
    -- 取下一条记录
    FETCH NEXT FROM T_DistributorID INTO @distributorID;
END
-- 关闭游标
CLOSE T_DistributorID;
-- 释放游标
DEALLOCATE T_DistributorID;
END
--COMMIT
--ROLLBACK
GO
SP_RENAME 'Customer','T_Customer';

UPDATE T_DistributorExtra SET EmployeeCount = 
CASE
	WHEN EmployeeCount <= 10 THEN 1
	WHEN EmployeeCount >= 11 AND EmployeeCount <= 30 THEN 2
	WHEN EmployeeCount >= 31 AND EmployeeCount <= 50 THEN 3
	WHEN EmployeeCount >= 51 AND EmployeeCount <= 100 THEN 4
	WHEN EmployeeCount >= 101 AND EmployeeCount <= 150 THEN 5
	WHEN EmployeeCount >= 151 AND EmployeeCount <= 200 THEN 6
	WHEN EmployeeCount >= 201 AND EmployeeCount <= 300 THEN 7
END	
WHERE DistributorID >= 402 AND DistributorID <= 417

SELECT DATABASEPROPERTY('数据库名','isfulltextenabled')
-- 根据认领情况自动修改机会状态
IF EXISTS (SELECT * FROM SYSOBJECTS WHERE id = OBJECT_ID(N'[sp_ChangeOpportunityState]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
	DROP PROC [sp_ChangeOpportunityState]
GO
CREATE PROC sp_ChangeOpportunityState
AS
BEGIN
	DECLARE @tempTable TABLE(ID INT IDENTITY(1,1), CustomerID INT);
	DECLARE @customerID INT;
	DECLARE @departmentID INT;
	INSERT INTO @tempTable
		SELECT t.CustomerID FROM (
			SELECT cc.CustomerID, cc.ClaimStatus AS Status, dcc.DepartmentID, dcc.ClaimStatus FROM T_CustomerClaim cc 
				INNER JOIN T_DepartCustomerClaim dcc ON cc.ID = dcc.CustomerClaimID
				WHERE cc.ClaimStartDate IS NOT NULL AND DATEDIFF(day, cc.ClaimStartDate,GETDATE()) > 7
				AND cc.ClaimStatus <> 1) AS t
			WHERE t.ClaimStatus = 1 GROUP BY t.CustomerID HAVING COUNT(t.CustomerID) = 1
	DECLARE @i INT;
	DECLARE @j INT; 
	SET @i = 0;  
	SELECT @j = MAX(ID) FROM @tempTable  
	WHILE @i < @j 
	BEGIN  
		SET @i = @i+1;   
		SELECT @customerID = CustomerID from @tempTable where ID = @i;
		SELECT @departmentID = dcc.DepartmentID from T_DepartCustomerClaim dcc
			INNER JOIN T_CustomerClaim cc ON dcc.CustomerClaimID = cc.ID
			WHERE cc.CustomerID = @customerID AND dcc.ClaimStatus = 1
		-- 根据主键处理数据
		UPDATE T_CustomerClaim SET ClaimStatus = 1, DepartmentID = @departmentID WHERE CustomerID = @customerID;
		UPDATE T_OpportunityMain SET Status = 3 WHERE CustomerID = @customerID;
	END
	SELECT * FROM @tempTable
END
EXEC RocheOpportunity.dbo.sp_ChangeOpportunityState;
GO
SP_HELPTEXT sp_ChangeOpportunityState;


SELECT ClaimStartDate, DATEDIFF(day, ClaimStartDate,GETDATE()) AS ClaimDays FROM T_CustomerClaim WHERE ClaimStartDate IS NOT NULL

-- 更新分销商用户ADName
BEGIN
BEGIN TRANSACTION
UPDATE T_Distributor SET UserADName = ADName FROM T_Distributor LEFT JOIN T_User ON SalesRepresentatives = REPLACE(UserName, ' ', '') WHERE UserADName IS NULL AND T_Distributor.ID >= 402
IF @@error > 0
	ROLLBACK
ELSE
COMMIT
END

select a.name 表名,b.name 字段名,c.name 字段类型,c.length 字段长度 from sysobjects a,syscolumns b,systypes c where a.id=b.id
and a.name='T_Customer' and a.xtype='U'
and b.xtype=c.xtype
and c.name = 'nvarchar'

-- 将表中字符串‘NULL’改成NULL
BEGIN
DECLARE @tableName NVARCHAR(25);
DECLARE @columnName NVARCHAR(60);
DECLARE @sql nvarchar(2000);
SET @tableName = 'C_Customer';
-- 声明游标
DECLARE tempTerritory CURSOR FAST_FORWARD FOR
    select b.name 字段名 from sysobjects a,syscolumns b,systypes c where a.id=b.id
		and a.name=@tableName and a.xtype='U'
		and b.xtype=c.xtype
		and c.name = 'nvarchar'
-- 打开游标
OPEN tempTerritory;
-- 取第一条记录
FETCH NEXT FROM tempTerritory INTO @columnName;
-- 遍历
WHILE @@FETCH_STATUS=0
BEGIN
    -- 操作
	SET @sql = 'UPDATE dbo.' + @tableName + ' SET ' + @columnName + ' = NULL WHERE ' + @columnName + ' = ''NULL''';
	EXEC SP_EXECUTESQL @sql;
    -- 取下一条记录
    FETCH NEXT FROM tempTerritory INTO @columnName;
END
-- 关闭游标
CLOSE tempTerritory;
-- 释放游标
DEALLOCATE tempTerritory;
END

select * from T_Configration where Mtype = 8

--清空历史数据
TRUNCATE TABLE T_Customer
TRUNCATE TABLE T_Opportunity
TRUNCATE TABLE T_OpportunityMain
TRUNCATE TABLE T_OpportunityInstrument
TRUNCATE TABLE T_OpportunityReagent
TRUNCATE TABLE T_OpportunityCommitment

SELECT * FROM T_Opportunity 
SELECT * FROM T_OpportunityMain WHERE Status = 2
SELECT * FROM T_OpportunityInstrument
SELECT * FROM T_OpportunityReagent
SELECT * FROM T_OpportunityCommitment

delete from T_OpportunityInstrument where opportunityId in(
select id from T_OpportunityMain WHERE RocheSales IS NULL
)
delete from T_OpportunityMain WHERE RocheSales IS NULL

update T_Opportunity set 客户帐号='52022920' where 客户帐号='59022920'
update T_Opportunity set 客户帐号='52097339' where 客户帐号='ACC-0001862004'

SELECT * FROM T_Customer WHERE Customer_ID = '59022920'
update T_Customer set hospital_classification = null

SELECT * FROM T_SalesRepresent --where salescode = '52072904'

SELECT distinct L1Distributor,o.代理商帐号 
	FROM T_OpportunityMain om
	LEFT JOIN T_SalesRepresent sr ON om.L1Distributor = sr.RepresentName
	LEFT join T_Opportunity o on om.ID = o.OpportunityID
	WHERE sr.RepresentName IS NULL

delete from T_OpportunityCommitment where opportunityId in(
select ID from T_OpportunityMain where L1Distributor in
(SELECT distinct L1Distributor
	FROM T_OpportunityMain om
	LEFT JOIN T_SalesRepresent sr ON om.L1Distributor = sr.RepresentName
	inner join T_Opportunity o on om.ID = o.OpportunityID
	WHERE sr.RepresentName IS NULL)
)
delete from T_OpportunityMain where L1Distributor in
(SELECT distinct L1Distributor
	FROM T_OpportunityMain om
	LEFT JOIN T_SalesRepresent sr ON om.L1Distributor = sr.RepresentName
	inner join T_Opportunity o on om.ID = o.OpportunityID
	WHERE sr.RepresentName IS NULL)

SELECT DISTINCT 客户帐号 FROM T_OpportunityMain om
	INNER JOIN T_Opportunity o ON om.ID = o.OpportunityID
	WHERE om.CustomerID = 0 
	
update T_OpportunityMain set CustomerID = c.id
	from T_OpportunityMain om
	INNER JOIN T_Opportunity o ON om.ID = o.OpportunityID
	inner join T_Customer c on o.客户帐号=c.Customer_ID
	WHERE om.CustomerID = 0 

delete from T_OpportunityReagent where opportunityId in(
select id from T_OpportunityMain WHERE CustomerID = 0 
)
delete from T_OpportunityMain WHERE CustomerID = 0 

select om.*,p.Sales_rep,e.UserName from T_OpportunityMain om
	inner join(
select opportunityid, 客户帐号 from T_Opportunity where 罗氏销售ID in(
SELECT distinct 罗氏销售ID FROM T_OpportunityMain om
	INNER JOIN T_Opportunity o ON om.ID = o.OpportunityID
	WHERE om.RocheSales IS NULL)) t on om.id = t.opportunityid
	inner join (select account_id,Sales_rep from T_Sales_Territory where account_id is not null group by account_id,Sales_rep) p 
		on t.客户帐号 = p.account_id
	inner join T_OpportunityEnterpriseUser e on p.Sales_rep = e.ADName

select o.罗氏销售ID,o.客户帐号 from T_OpportunityMain om 
	INNER JOIN T_Opportunity o ON om.ID = o.OpportunityID
	WHERE om.RocheSales IS NULL
	
	SELECT om.*,o.罗氏销售ID FROM T_OpportunityMain om
	INNER JOIN T_Opportunity o ON om.ID = o.OpportunityID
	WHERE om.RocheSales IS NULL

	select * from t_test t1
		inner join (select account_id,Sales_rep from T_Sales_Territory where account_id is not null group by account_id,Sales_rep) p
		on t1.Customer_ID = p.account_id

	select * from T_Sales_Territory where account_id = '52064950' and sales_rep = 'zhouy93'


go
begin transaction
update T_OpportunityMain set RocheSales = e.UserName
 from T_OpportunityMain om
	inner join(
select opportunityid, 客户帐号 from T_Opportunity where 罗氏销售ID in(
SELECT distinct 罗氏销售ID FROM T_OpportunityMain om
	INNER JOIN T_Opportunity o ON om.ID = o.OpportunityID
	WHERE om.RocheSales IS NULL)) t on om.id = t.opportunityid
	inner join (select account_id,Sales_rep from T_Sales_Territory where account_id is not null group by account_id,Sales_rep) p 
		on t.客户帐号 = p.account_id
	inner join T_OpportunityEnterpriseUser e on p.Sales_rep = e.ADName
commit

go
select t.Sales_Rep from(
select Sales_Rep, Area_Manager from T_Sales_Territory group by Sales_Rep, Area_Manager
) t group by Sales_Rep having count(t.Sales_Rep) > 1

select Sales_Rep, Area_Manager from T_Sales_Territory group by Sales_Rep, Area_Manager
update T_Sales_Territory set Area_Manager = 'zhangr10' where Sales_Rep = 'zhangr10' and Area_Manager is null

select t.account_id from(
select account_id,Sales_Rep from T_Sales_Territory where account_id is not null group by account_id, Sales_Rep) t
group by account_id having count(t.account_id) > 1

select * from T_Sales_Territory where upper(Sales_Rep) = upper('HUANGS61')
select * from T_OpportunityEnterpriseUser where upper(ADName) = upper('HUANGS61')

delete from T_OpportunityCommitment where opportunityId in(
select id from T_OpportunityMain WHERE RocheSales is null
)
delete from T_OpportunityMain WHERE RocheSales is null

SELECT * FROM T_SalesRepresent where Representname like '%执信%'
select * from T_Distributor

select * from T_Region
select * from T_Distributor where salesADName = 15
select * from T_DistributorRegion
select d.id,d.distributorname,dr.RegionID, r.regionName from T_Distributor d
	inner join T_DistributorRegion dr on d.id = dr.distributorid 
	inner join T_Region r on dr.RegionID = r.id
	where d.salesADName = 15
	
update T_SalesRepresent set salescode = 52072904 where salescode = 5207290
select * from T_UserMaxCountConfig order by distributorOrSalesId
update T_UserMaxCountConfig set distributorOrSalesId = s.id 
	from T_UserMaxCountConfig u inner join T_SalesRepresent s on u.distributorOrSalesId = s.SalesCode 

insert into T_UserMaxCountConfig(distributorOrSalesId, maxcount,configtype)
	select id, 5, 0 from T_Distributor 
	
select * from T_ProductGroup
update T_ProductGroup set departId = 0, ProductLineId = 0, Availability = 1
select distinct systemvariantname from T_ProductGroup

update T_UserMaxCountConfig set ConfigType = 1

UPDATE T_OpportunityMain SET L1Distributor = N'北京雅联百得科贸有限公司' WHERE L1Distributor = N'北京雅联百得科贸有限公司(北区)'

SELECT * FROM T_SalesRepresentRegion
SELECT * FROM T_SalesRepresent WHERE SalesCode in('52070046','52075436','52602421','52043195')
update T_SalesRepresent set SalesCode = '52042517',RepresentName=N'杭州迪安基因工程有限公司' where SalesCode = '52054255'
update T_SalesRepresent set SalesCode = '52606202',RepresentName=N'陕西凯捷体外诊断试剂有限公司' where SalesCode = '52090707'
delete from T_SalesRepresent where SalesCode in('52070046','52075436','52602421','52043195')
insert into T_SalesRepresent values
(N'巨星生物科技（江苏）有限公司-安徽',1,'CD-EM','52313927'),
(N'巨星生物科技（江苏）有限公司-江苏',1,'CD-EM','52313461'),
(N'上海兰博卫医疗科技有限公司-武汉',1,'CD-EM','52076580'),
(N'上海兰博卫医疗科技有限公司-上海',1,'CD-EM','52604449'),
(N'上海兰博卫医疗科技有限公司-长沙',1,'CD-EM','52076581'),
(N'广州弘恩医疗诊断技术有限公司-广东',1,'CD-EM','52602497'),
(N'广州弘恩医疗诊断技术有限公司-福建',1,'CD-EM','52095853'),
(N'北京雅联百得科贸有限公司',1,'CD-EM','52314104'),
(N'北京雅联百得科贸有限公司',1,'CD-EM','52043195'),
(N'广州市番禺区华鑫科技有限公司',1,'CD-EM','52058652'),
(N'南京健峰医疗器械有限公司',1,'CD-EM','52059357')
insert into T_SalesRepresentRegion values
(50,2,1,1,null,null,null,null),
(51,2,1,1,null,null,null,null),
(52,2,1,1,null,null,null,null),
(53,4,1,1,null,null,null,null),
(54,2,1,1,null,null,null,null),
(55,4,1,1,null,null,null,null),
(56,4,1,1,null,null,null,null),
(57,3,1,1,null,null,null,null),
(58,5,1,1,null,null,null,null),
(59,5,1,1,null,null,null,null),
(60,2,1,1,null,null,null,null),
(61,4,1,1,null,null,null,null)

select * from T_Sales_Territory where upper(Sales_Rep) = upper('DENGQ4')
select * from T_OpportunityEnterpriseUser where upper(ADName) = upper('zhouy93')

-- 设置已提交状态
update T_OpportunityMain set status = 2 where id not in(
select om.id from T_OpportunityMain om
	INNER JOIN T_Customer c on om.CustomerID = c.ID 
	INNER JOIN T_Sales_Territory st ON c.Customer_ID = st.ACCOUNT_ID
	where st.Sales_Rep is not null
)

SELECT * FROM (SELECT DISTINCT 客户帐号 FROM T_OpportunityMain om
		INNER JOIN T_Opportunity o ON om.ID = o.OpportunityID
		WHERE om.CustomerID = 0 ) t 
	LEFT JOIN T_Customer c ON c.Customer_ID = t.客户帐号
	WHERE c.Customer_ID IS NULL
	

