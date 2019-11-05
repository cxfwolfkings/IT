use Abbott_PricingSystem;
Go
SELECT DB_Id('Abbott_PricingSystem')

select * from AbpSettings
select * from AbpTenants
select * from AbpUsers
select * from AbpUserAccounts
select * from AbpUserRoles
select * from AbpRoles
select * from AbpObjects
select * from AbpObjectBehaviors
select * from AbpPermissions
select * from AbpOrganizationUnits
select * from AbpUserOrganizationUnits
select * from Others_Attachment
select * from RivalProducts where ProductSku='D364TRG'

select convert(varchar(30),cast(1000 as money),1)

insert into AbpObjects values
(N'����Ŀ¼����','Pages.FinancialDirectoriesManagement','00001.00007.00010',0,10,7,0)
Go
insert into AbpObjectBehaviors values
(N'�鿴','Pages.FinancialDirectoriesManagement.View','00001.00007.00010.001',1,10029,0,0)
Go
insert into AbpPermissions values
(getdate(),2,'RolePermissionSetting',1,'Pages.FinancialDirectoriesManagement.View',1,2,NULL)
Go

select * from Bd_Region where DisplayName like N'%����ʡ%'
select * from Bd_Bidding order by BiddingApplyDate desc
select * from Bd_Bidding order by BiddingExecutionDate desc
select * from Bd_BiddingGroupMap
select * from Bd_BiddingGroupProductMap
select * from Bd_BiddingCategory
select * from Bd_BiddingCategorySelectItem
-- ��β�ո�ɾ��
update Bd_BiddingProduct set ProductSKU = ltrim(rtrim(ProductSKU))
select * from Bd_BiddingProduct  where ProductSKU = '6250-45S'
--and ProductCategoryId in (3,18)
and IsDeleted=0 and IsPrimaryProduct = 1
select * from Bd_BiddingProductCategory where DepartmentId=3

select * from Bd_BiddingGroup
select * from Bd_BiddingGroupMap
select * from Bd_BiddingGroupProductMap

select * from Bd_FinancialDirectoryCategory
select * from Bd_FinancialDirectory
select * from Bd_FinancialProduct

select * from Bd_Dictionary where ParentId=2
select * from RivalProducts where CompanyName=N'�Ƚ�'

select r.* into testTable from (
select rp.* from RivalProducts rp
inner join (
	select CompanyName, RegionName, ProductSku, ExecutedTime from RivalProducts 
	group by CompanyName, RegionName, ProductSku, ExecutedTime having count(*)>1) t
    on rp.CompanyName=t.CompanyName and rp.ProductSku=t.ProductSku and rp.ProductSku=t.ProductSku and rp.ExecutedTime=t.ExecutedTime
) r order by r.CompanyName, r.RegionName, r.ProductSku, r.ExecutedTime


select * from Bd_BiddingGroupProductPrice where OwnCompany=N'�Ƚ�'
select bp.*, p.ProductCategoryId from Bd_BiddingGroupProductPrice bp
inner join Bd_BiddingProduct p on bp.BiddingProductSku=p.ProductSKU
where 1=1
and p.IsPrimaryProduct = 1
order by RegionCode, ExecutionDate desc

select * from Bd_Hospital where DisplayName like '%�����е�һ����ҽԺ%'
select * from Bd_Region
select * from AbpUserRegions

select r.* from Bd_Region r 
inner join AbpUserRegions ur on ur.RegionId=r.Id
where ur.UserId=2

IF EXISTS (SELECT * FROM SYSOBJECTS WHERE id = OBJECT_ID(N'[Bd_ServiceKey]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
    DROP TABLE [Bd_ServiceKey]
Go
Create Table [Bd_ServiceKey](
  TableName varchar(100),
  CurrentKeyId bigint,
  UpdateDate datetime default getdate()
)
Go
insert into [Bd_ServiceKey] values('Bd_BiddingGroupProductPrice', 0, null)
select * from [Bd_ServiceKey]
select * from Bd_BiddingGroupProductPrice
GO

IF OBJECT_ID (N'F_Split') IS NOT NULL
  DROP FUNCTION F_Split
GO
Create FUNCTION [dbo].[F_Split]
 (
     @SplitString nvarchar(max),  --Դ�ַ���
     @Separator nvarchar(10)=' '  --�ָ����ţ�Ĭ��Ϊ�ո�
 )
 RETURNS @SplitStringsTable TABLE  --��������ݱ�
 (
     [id] int identity(1,1),
     [value] nvarchar(max)
 )
 AS
 BEGIN
     DECLARE @CurrentIndex int;
     DECLARE @NextIndex int;
     DECLARE @ReturnText nvarchar(max);

     SELECT @CurrentIndex=1;
     WHILE(@CurrentIndex<=len(@SplitString))
         BEGIN
             SELECT @NextIndex=charindex(@Separator,@SplitString,@CurrentIndex);
             IF(@NextIndex=0 OR @NextIndex IS NULL)
                 SELECT @NextIndex=len(@SplitString)+1;
                 SELECT @ReturnText=substring(@SplitString,@CurrentIndex,@NextIndex-@CurrentIndex);
                 INSERT INTO @SplitStringsTable([value]) VALUES(@ReturnText);
                 SELECT @CurrentIndex=@NextIndex+1;
             END
     RETURN;
 END
GO
select * from F_Split('a,b,c', ',') where value = 'a'
go

IF OBJECT_ID (N'F_GetProductPriceByRegionLevel') IS NOT NULL
  DROP FUNCTION F_GetProductPriceByRegionLevel
GO
Create FUNCTION [dbo].[F_GetProductPriceByRegionLevel]
 (
     @ProductSku nvarchar(30), 
	 @ExecutionDate datetime,
     @RegionLevel nvarchar(60),
	 @deptId bigint = 0
 )
 RETURNS @ProductPriceTable TABLE  --��������ݱ�
 (
     [ProductSku] nvarchar(30),
	 [RegionCode] nvarchar(30),
	 [RegionName] nvarchar(30),
     [ExecutionPrice] decimal(18, 2),
	 [ExecutionDate] datetime
 )
 AS
 BEGIN
   if @deptId = 0
     begin
	   insert into @ProductPriceTable
	   -- ����ʡ�ݣ����У����飬ִ�����ڵ�������ÿ���һ����¼���Ǹ�ʡ���У����һ���б�ļ۸�
	   select BiddingProductSku, RegionCode, RegionName, ExecutionPrice, ExecutionDate
	   from (select ROW_NUMBER() over(partition by RegionCode order by ExecutionDate desc, isnull(ExecutionPrice, 0)) as rowNum, * 
			 from Bd_BiddingGroupProductPrice 
			 where BiddingLevel=@RegionLevel
			 and BiddingProductSku=@ProductSku
			 and ExecutionDate<=@ExecutionDate
			 and ExecutionPrice is not null
			) s
	   where rowNum=1
	   and IsProtectedPrice=1
	   and PriceType<>3
	   and PriceType<>4
	   and PriceType<>5
	 end
   else
     begin
	   insert into @ProductPriceTable
	   -- ����ʡ�ݣ����У����飬ִ�����ڵ�������ÿ���һ����¼���Ǹ�ʡ���У����һ���б�ļ۸�
	   select BiddingProductSku, RegionCode, RegionName, ExecutionPrice, ExecutionDate
	   from (select ROW_NUMBER() over(partition by RegionCode order by ExecutionDate desc, isnull(ExecutionPrice, 0)) as rowNum, * 
			 from Bd_BiddingGroupProductPrice 
			 where BiddingLevel=@RegionLevel
			 and BiddingProductSku=@ProductSku
			 and ExecutionDate<=@ExecutionDate
			 and DepartmentId=@deptId
			 and ExecutionPrice is not null
			) s
	   where rowNum=1
	   and IsProtectedPrice=1
	   and PriceType<>3
	   and PriceType<>4
	   and PriceType<>5
	 end
   RETURN;
 END
GO
select * from F_GetProductPriceByRegionLevel('testSKU001', '2019-03-28', 'BiddingHierarchical.BiddingHierarchical.Province', 0)
go
select ROW_NUMBER() over(partition by RegionCode order by ExecutionDate desc, isnull(ExecutionPrice, 0) desc) as rowNum, * 
from Bd_BiddingGroupProductPrice 
where BiddingLevel='BiddingHierarchical.BiddingHierarchical.Hospital'
and RegionCode='00001.00001.00001.00001.0001'
and BiddingProductSku='DS2C001'
and ExecutionDate<='2019-03-04'
and IsProtectedPrice<>1
and PriceType<>3
order by ExecutionDate desc

-- ��Ʒȫ���۸��ѯ
IF EXISTS (SELECT * FROM SYSOBJECTS WHERE id = OBJECT_ID(N'[GetProductPriceByRegion]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
  DROP PROC [GetProductPriceByRegion]
GO
CREATE PROCEDURE [dbo].[GetProductPriceByRegion] (
  @regions varchar(4000),
  @products varchar(max),
  @targets varchar(400),
  @executionDate datetime,
  @deptId bigint
)
AS
BEGIN
  SET NOCOUNT ON;
  CREATE TABLE #tempTable(ProductSKU nvarchar(30), RegionCode nvarchar(30), ExecutionPrice nvarchar(300));
  DECLARE @targetTable TABLE(ID INT IDENTITY(1,1), targetName nvarchar(30));
  DECLARE @sql NVARCHAR(max);
  declare @result nvarchar(300);
  DECLARE @productSKU nvarchar(30);
  DECLARE @i INT;
  DECLARE @j INT; 
  DECLARE @target nvarchar(30);
  DECLARE @regionAndTarget nvarchar(max);
  SET @regionAndTarget = @regions + ',targetA,targetB';
  IF @targets <> ''
    SET @regionAndTarget = @regionAndTarget + ',' + @targets;
  INSERT INTO @targetTable
    SELECT value FROM F_Split(@targets, ',');
  SELECT @j = MAX(ID) FROM @targetTable;  
  DECLARE products CURSOR FAST_FORWARD FOR
    SELECT value FROM F_Split(@products, ',');
  OPEN products;
  FETCH NEXT FROM products INTO @productSKU;
  WHILE @@FETCH_STATUS = 0
    Begin
	-- ����۸�
	if @deptId = 0
	  begin
		insert into #tempTable
		select bp1.BiddingProductSku, bp1.RegionCode, 
		  (case PriceType when 3 then N'���޼�'
						  when 4 then N'����'
						  when 5 then N'ʧ��'
		   else Convert(varchar(30), cast(bp1.ExecutionPrice as money),1)+(case IsProtectedPrice when 1 then '' else '���ܱ����ģ�' end)
		   end)
		from 
		  (select ROW_NUMBER() over(partition by RegionCode order by ExecutionDate desc, ExecutionPrice desc) as rowNum, * 
		   from Bd_BiddingGroupProductPrice 
		   where BiddingProductSku=@ProductSku
		   and Exists(SELECT 1 FROM F_Split(@regions, ',') where value=RegionCode)
		   and ExecutionDate<=@executionDate) bp1
		where bp1.rowNum=1
	  end
	else
	  begin
		insert into #tempTable
		select bp1.BiddingProductSku, bp1.RegionCode, 
		  (case PriceType when 3 then N'���޼�'
						  when 4 then N'����'
						  when 5 then N'ʧ��'
		   else Convert(varchar(30), cast(bp1.ExecutionPrice as money),1)+(case IsProtectedPrice when 1 then '' else '���ܱ����ģ�' end)
		   end)
		from 
		  (select ROW_NUMBER() over(partition by RegionCode order by ExecutionDate desc, ExecutionPrice desc) as rowNum, * 
		   from Bd_BiddingGroupProductPrice 
		   where BiddingProductSku=@ProductSku
		   and Exists(SELECT 1 FROM F_Split(@regions, ',') where value=RegionCode)
		   and ExecutionDate<=@executionDate
		   and DepartmentId=@deptId) bp1
		where bp1.rowNum=1
	  end
	-- ȫ��ʡ����ͼ�
	insert into #tempTable values(@productSKU, 'targetA', (select Convert(varchar(30), cast(min(ExecutionPrice) as money),1) from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.Province', @deptId)));
	-- ȫ��ʡ����߼�
	insert into #tempTable values(@productSKU, 'targetB', (select Convert(varchar(30), cast(max(ExecutionPrice) as money),1) from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.Province', @deptId)));
	-- ����ָ��
    SET @i = 0;  
    WHILE @i < @j 
      BEGIN  
      SET @i = @i+1;   
      SELECT @target = targetName from @targetTable where ID = @i;
      IF @target = 'target1' -- ȫ���м���ͼ�
	    BEGIN 
		insert into #tempTable values(@productSKU, 'target1', (select Convert(varchar(30), cast(min(ExecutionPrice) as money),1) from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.City', @deptId)));
		END
	  IF @target = 'target2' -- ȫ���м���߼�
	    BEGIN 
		insert into #tempTable values(@productSKU, 'target2', (select Convert(varchar(30), cast(max(ExecutionPrice) as money),1) from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.City', @deptId)));
		END
	  IF @target = 'target3' -- ������/ҽ������ͼ�
	    BEGIN 
		insert into #tempTable values(@productSKU, 'target3', (select Convert(varchar(30), cast(min(ExecutionPrice) as money),1) from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.Hospital', @deptId)));
		END
	  IF @target = 'target4' -- ������/ҽ������߼�
	    BEGIN 
		insert into #tempTable values(@productSKU, 'target4', (select Convert(varchar(30), cast(max(ExecutionPrice) as money),1) from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.Hospital', @deptId)));
		END
	  IF @target = 'target5' -- ���3ʡƽ����
	    BEGIN 
		insert into #tempTable values(@productSKU, 'target5', (
		  select Convert(varchar(30), cast(AVG(ExecutionPrice) as money),1) AVGPrice from(
		    select top 3 ExecutionPrice from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.Province', @deptId)
			order by ExecutionPrice) t));
		END
	  IF @target = 'target6' -- ���5ʡƽ����
	    BEGIN 
		insert into #tempTable values(@productSKU, 'target6', (
		select Convert(varchar(30), cast(AVG(ExecutionPrice) as money),1) AVGPrice from(
		    select top 5 ExecutionPrice from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.Province', @deptId)
			order by ExecutionPrice) t));
		END
	  IF @target = 'target7' -- ���3ʡ
	    BEGIN 
		set @result = ''
        select @result = @result + RegionName + '��' + Convert(varchar(30), cast(ExecutionPrice as money),1) + '��' from(
          select top 3 * from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.Province', @deptId)
	      order by ExecutionPrice) t
		insert into #tempTable values(@productSKU, 'target7', @result);
		END
	  IF @target = 'target8' -- ���5ʡ
	    BEGIN 
		set @result = ''
        select @result = @result + RegionName + '��' + Convert(varchar(30), cast(ExecutionPrice as money),1) + '��' from(
          select top 5 * from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.Province', @deptId)
	      order by ExecutionPrice) t
		insert into #tempTable values(@productSKU, 'target8', @result);
		END
      END
	FETCH NEXT FROM products INTO @productSKU;
	End
  CLOSE products;
  DEALLOCATE products;
  Declare @tempRegions nvarchar(max);
  SELECT @tempRegions = (STUFF((SELECT ',[' + value + ']' FROM F_Split(@regionAndTarget, ',') FOR XML PATH('')), 1, 1, ''));
  --print @tempRegions;
  SET @sql = 'SELECT * FROM #tempTable as p PIVOT(MAX(ExecutionPrice) FOR RegionCode IN (' + @tempRegions + ')) AS t';
  --print @sql;
  exec sp_executesql @sql;
  drop table #tempTable;
END
GO
EXEC GetProductPriceByRegion '00001.00003.00012', 'LD300S', 'target1,target2,target3,target4,target5,target6,target7,target8', '2019-04-04', 0
-- test
select OwnCompany,RegionCode,BiddingProductSku,ExecutionMonth from 
(select * from Bd_BiddingGroupProductPrice
where BiddingProductSku='Philos II D'
and BiddingLevel='BiddingHierarchical.BiddingHierarchical.Province'
and PriceType >= 0 and PriceType < 3
and IsOwnCompany = 0
and IsProtectedPrice = 1
) a group by a.OwnCompany, a.RegionCode, a.BiddingProductSku, a.ExecutionMonth
--and RegionCode='00001.00003.00012'
--and ExecutionDate<='2019-02-26'
order by ExecutionDate desc
select * from Bd_Region where DisplayName like N'%����%'
select * from Bd_Hospital where DisplayName like N'%����%'
select * from RivalProducts where ProductSku='Philos II D' order by ExecutedTime desc

update Bd_BiddingGroupProductPrice set BiddingLevel='BiddingHierarchical.BiddingHierarchical.MilitaryRegion' 
where LEFT(RegionCode, 17)='00001.99999.99999'

select * from Bd_BiddingGroupProductPrice where LEFT(RegionCode, 17)='00001.99999.99999'

declare @result nvarchar(300)
set @result = ''
select @result = @result + RegionName + '��' + Convert(varchar(30), ExecutionPrice) + '��' from(
    select top 5 * from F_GetProductPriceByRegionLevel('5056', '2019-02-26', 'BiddingHierarchical.BiddingHierarchical.Province', 3)
	order by ExecutionPrice) t
select @result
select top 3 * from F_GetProductPriceByRegionLevel('DS2C001', '2019-04-04', 'BiddingHierarchical.BiddingHierarchical.Province', 0)
select min(ExecutionPrice) from F_GetProductPriceByRegionLevel('DS2C001', '2019-04-04', 'BiddingHierarchical.BiddingHierarchical.Province', 0)

select bp1.BiddingProductSku, bp1.RegionCode, Convert(varchar(30), bp1.ExecutionPrice)+(case IsProtectedPrice when 1 then '���ܱ����ģ�' else '' end) from
	  (select ROW_NUMBER() over(partition by RegionCode order by ExecutionDate desc, ExecutionPrice desc) as rowNum, * 
       from Bd_BiddingGroupProductPrice 
       where BiddingProductSku='5056'
	   and Exists(SELECT 1 FROM F_Split('00001.00001.00001', ',') where value=RegionCode)
       and ExecutionDate<='2019-02-26') bp1

-- �����б��/ȫ���۸�����
IF EXISTS (SELECT * FROM SYSOBJECTS WHERE id = OBJECT_ID(N'[GetProductPriceByMonth]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
  DROP PROC [GetProductPriceByMonth]
GO
CREATE PROCEDURE [dbo].[GetProductPriceByMonth] (
  @regions varchar(4000),
  @products varchar(max),
  @targets varchar(400),
  @executionMonths varchar(4000),
  @deptId bigint
)
AS
BEGIN
  SET NOCOUNT ON;
  CREATE TABLE #tempTable(ProductSKU nvarchar(30), RegionCode nvarchar(30), ExecutionMonth int, ExecutionPrice nvarchar(300));
  DECLARE @monthTable TABLE(ID INT IDENTITY(1,1), ExecutionMonth int); -- �·�
  DECLARE @targetTable TABLE(ID INT IDENTITY(1,1), targetName nvarchar(30)); -- ָ��
  DECLARE @curMonth varchar(30);
  declare @result nvarchar(300);
  DECLARE @i INT;
  DECLARE @j INT; 
  DECLARE @target nvarchar(30);
  INSERT INTO @targetTable
    SELECT value FROM F_Split(@targets, ',');
  SELECT @j = MAX(ID) FROM @targetTable;  
  DECLARE @m INT;
  DECLARE @n INT; 
  INSERT INTO @monthTable
    SELECT value FROM F_Split(@executionMonths, ',');
  SELECT @n = MAX(ID) FROM @monthTable;  
  DECLARE @productSKU nvarchar(30);
  DECLARE products CURSOR FAST_FORWARD FOR
    SELECT value FROM F_Split(@products, ',');
  OPEN products;
  FETCH NEXT FROM products INTO @productSKU;
  WHILE @@FETCH_STATUS = 0
    Begin
	SET @m = 0;  
    WHILE @m < @n 
      BEGIN  
      SET @m = @m+1;
	  SELECT @curMonth = ExecutionMonth from @monthTable where ID = @m;
	  -- ��ȡ��ÿ�������ض�ʱ���������ļ۸�
	  if @deptId = 0
	    begin
		  insert into #tempTable
		  select BiddingProductSku, RegionCode, @curMonth, 
			(case PriceType when 3 then N'���޼�'
							when 4 then N'����'
							when 5 then N'ʧ��'
			 else Convert(varchar(30), cast(ExecutionPrice as money),1)+(case IsProtectedPrice when 1 then '' else '���ܱ����ģ�' end)
			 end) 
		  from (select ROW_NUMBER() over(partition by RegionCode order by ExecutionDate desc) as rowNum, * 
				from Bd_BiddingGroupProductPrice 
				where BiddingProductSku=@ProductSku
				and Exists(SELECT 1 FROM F_Split(@regions, ',') where value=RegionCode)
				and ExecutionMonth<=@curMonth) s
		  where rowNum=1
	    end
	  else
	    begin
		  insert into #tempTable
		  select BiddingProductSku, RegionCode, @curMonth, 
			(case PriceType when 3 then N'���޼�'
							when 4 then N'����'
							when 5 then N'ʧ��'
			 else Convert(varchar(30), cast(ExecutionPrice as money),1)+(case IsProtectedPrice when 1 then '' else '���ܱ����ģ�' end)
			 end) 
		  from (select ROW_NUMBER() over(partition by RegionCode order by ExecutionDate desc) as rowNum, * 
				from Bd_BiddingGroupProductPrice 
				where BiddingProductSku=@ProductSku
				and Exists(SELECT 1 FROM F_Split(@regions, ',') where value=RegionCode)
				and ExecutionMonth<=@curMonth
				and DepartmentId=@deptId) s
		  where rowNum=1
	    end
	  END   
	-- ȫ��ʡ����ͼ�
	insert into #tempTable values(@productSKU, 'targetA', 0, (select Convert(varchar(30), cast(min(ExecutionPrice) as money),1) from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.Province', @deptId)));
	-- ȫ��ʡ����߼�
	insert into #tempTable values(@productSKU, 'targetB', 0, (select Convert(varchar(30), cast(max(ExecutionPrice) as money),1) from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.Province', @deptId)));
	-- ����ָ��
    SET @i = 0;  
    WHILE @i < @j 
      BEGIN  
      SET @i = @i+1;   
      SELECT @target = targetName from @targetTable where ID = @i;
      IF @target = 'target1' -- ȫ���м���ͼ�
	    BEGIN 
		insert into #tempTable values(@productSKU, 'target1', 0, (select Convert(varchar(30), cast(min(ExecutionPrice) as money),1) from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.City', @deptId)));
		END
	  IF @target = 'target2' -- ȫ���м���߼�
	    BEGIN 
		insert into #tempTable values(@productSKU, 'target2', 0, (select Convert(varchar(30), cast(max(ExecutionPrice) as money),1) from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.City', @deptId)));
		END
	  IF @target = 'target3' -- ������/ҽ������ͼ�
	    BEGIN 
		insert into #tempTable values(@productSKU, 'target3', 0, (select Convert(varchar(30), cast(min(ExecutionPrice) as money),1) from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.Hospital', @deptId)));
		END
	  IF @target = 'target4' -- ������/ҽ������߼�
	    BEGIN 
		insert into #tempTable values(@productSKU, 'target4', 0, (select Convert(varchar(30), cast(max(ExecutionPrice) as money),1) from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.Hospital', @deptId)));
		END
	  IF @target = 'target5' -- ���3ʡƽ����
	    BEGIN 
		insert into #tempTable values(@productSKU, 'target5', 0, (
		  select Convert(varchar(30), cast(AVG(ExecutionPrice) as money),1) AVGPrice from(
		    select top 3 ExecutionPrice from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.Province', @deptId)
			order by ExecutionPrice) t));
		END
	  IF @target = 'target6' -- ���5ʡƽ����
	    BEGIN 
		insert into #tempTable values(@productSKU, 'target6', 0, (
		select Convert(varchar(30), cast(AVG(ExecutionPrice) as money),1) AVGPrice from(
		    select top 5 ExecutionPrice from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.Province', @deptId)
			order by ExecutionPrice) t));
		END
	  IF @target = 'target7' -- ���3ʡ
	    BEGIN 
		set @result = ''
        select @result = @result + RegionName + '��' + Convert(varchar(30), cast(ExecutionPrice as money),1) + '��' from(
          select top 3 * from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.Province', @deptId)
	      order by ExecutionPrice) t
		insert into #tempTable values(@productSKU, 'target7', 0, @result);
		END
	  IF @target = 'target8' -- ���5ʡ
	    BEGIN 
		set @result = ''
        select @result = @result + RegionName + '��' + Convert(varchar(30), cast(ExecutionPrice as money),1) + '��' from(
          select top 5 * from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.Province', @deptId)
	      order by ExecutionPrice) t
		insert into #tempTable values(@productSKU, 'target8', 0, @result);
		END
      END
	FETCH NEXT FROM products INTO @productSKU;
	End
  CLOSE products;
  DEALLOCATE products;
  SELECT * FROM #tempTable where ExecutionPrice is not null and ExecutionPrice <> ''
END
GO
EXEC [GetProductPriceByMonth] '00001.00001.00002', '405100', 'target1,target2,target3,target4,target5,target6,target7,target8', '201801,201802,201803,201804,201805,201806,201807,201808,201809,201810,201811,201812,201901,201902,201903,201904,201905', 0
select * from Bd_BiddingGroupProductPrice where 1=1
--and RegionCode='00001.00001.00002' 
and BiddingProductSku='405100'
and ExecutionPrice=248
select top 3 * from F_GetProductPriceByRegionLevel('405100', GETDATE(), 'BiddingHierarchical.BiddingHierarchical.Province', 0)
	      order by ExecutionPrice


IF EXISTS (SELECT * FROM SYSOBJECTS WHERE id = OBJECT_ID(N'[UpdateProductPriceByMonth]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
  DROP PROC [UpdateProductPriceByMonth]
GO
CREATE PROCEDURE [dbo].[UpdateProductPriceByMonth]
AS
BEGIN
  SET NOCOUNT ON;
  BEGIN TRY
  BEGIN TRAN
  Declare @currentKid bigint;
  select @currentKid = CurrentKeyId from [Bd_ServiceKey];
  insert into Bd_QueryProductPriceByMonth(CreationTime, CreatorUserId, IsDeleted, BiddingLevel, RegionCode, ProductSku, ExecutionPrice, ExecutionDate, ExecutionMonth, IsProtectedPrice)
  select CreationTime, CreatorUserId, 0, BiddingLevel, RegionCode, BiddingProductSku, ExecutionPrice, ExecutionDate, YEAR(ExecutionDate)*100 + MONTH(ExecutionDate), IsProtectedPrice 
  from Bd_BiddingGroupProductPrice
  where Id > @currentKid;
  Declare @maxKid bigint;
  select @maxKid = max(Id) from Bd_BiddingGroupProductPrice;
  update [Bd_ServiceKey] set CurrentKeyId=@maxKid, UpdateDate=GETDATE();
  COMMIT TRAN
  END TRY
  BEGIN CATCH
  IF @@TRANCOUNT >0 
    ROLLBACK TRAN
  DECLARE @ErrorMessage NVARCHAR(4000), @ErrorSeverity INT, @ErrorState INT;
  SELECT @ErrorMessage = ERROR_MESSAGE(), @ErrorSeverity = ERROR_SEVERITY(), @ErrorState = ERROR_STATE();
  RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
  END CATCH
END
GO
Exec UpdateProductPriceByMonth
select * from [Bd_ServiceKey]
update [Bd_ServiceKey] set CurrentKeyId = 0 
select * from Bd_QueryProductPriceByMonth
select * from Bd_BiddingGroupProductPrice where BiddingProductSku='CD1211-36Q'
select YEAR('2019-01-26')*100 + MONTH('2019-01-26')


IF EXISTS (SELECT * FROM SYSOBJECTS WHERE id = OBJECT_ID(N'[RivalProductsTemp]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
  begin 
  drop table RivalProductsTemp 
  end 
create table RivalProductsTemp (
  ��˾ nvarchar(30),
  ���� nvarchar(30),
  �㼶 nvarchar(10),
  ��Ʒ�ͺ� nvarchar(600),
  �۸����� nvarchar(10),
  �б�ʱ�� nvarchar(20),
  �б�� nvarchar(20),
  ���޼۹��� nvarchar(2),
  �޼۵ͼ� nvarchar(20),
  �޼۸߼� nvarchar(20),
  ������ nvarchar(20),
  �ɽ��ο��� nvarchar(600),
  ��ע nvarchar(600),
  Ͷ��Ŀ¼ nvarchar(32),
  IdentityId nvarchar(40),
  rowNum int
)
Go
select * from RivalProductsTemp order by rowNum
truncate table RivalProductsTemp
-- D77C8394-CF7E-463C-5436-08D6C6CB78F6

-- ���뾺Ʒ�۸�
IF EXISTS (SELECT * FROM SYSOBJECTS WHERE id = OBJECT_ID(N'[ImportRivalProduct]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
  DROP PROC [ImportRivalProduct]
GO
CREATE PROCEDURE [dbo].[ImportRivalProduct](
  @identityId nvarchar(50)
)
as
begin
  SET NOCOUNT ON;
  declare @result nvarchar(max), @msgType int;
  DECLARE @msgTable TABLE(msgType int, msgContent nvarchar(max), msgRow nvarchar(max));

  -- 2019-06-28 ��������ظ���ȡ��ͼۣ���ʱ�����ε����ɾ����
  --delete s
  --from (select ROW_NUMBER() over(partition by [��˾], [����], [�㼶], [��Ʒ�ͺ�], [�б�ʱ��] order by [�б��]) as [���]
  --      , * from RivalProductsTemp where [�۸�����]=N'��׼�۸�') as s
  --where s.[���]>1

  --delete s
  --from (select ROW_NUMBER() over(partition by [��˾], [����], [�㼶], [��Ʒ�ͺ�], [�б�ʱ��] order by [������]) as [���]
  --      , * from RivalProductsTemp where [�۸�����]=N'������') as s
  --where s.[���]>1

  -- ��˾����Ϊ��
  set @msgType = 1;
  insert into @msgTable 
  select @msgType, '��˾����Ϊ��', rowNum from RivalProductsTemp
  where IdentityId = @identityId and ([��˾] is null or [��˾] = '');
  -- ��˾���Ʋ�����
  set @msgType = @msgType + 1;
  declare @dicId int;
  select @dicId = Id from Bd_Dictionary where [Name]='Corporation';
  insert into @msgTable
  select @msgType, '��˾����'+r.[��˾]+'������', rowNum from RivalProductsTemp r
  left join Bd_Dictionary d on r.[��˾]=d.DisplayName and d.ParentId=@dicId
  where r.IdentityId = @identityId and d.Id is null
  -- ��Ʒ�ͺ�Ϊ��
  set @msgType = @msgType + 1;
  insert into @msgTable 
  select @msgType, '��Ʒ�ͺ�Ϊ��', rowNum from RivalProductsTemp
  where IdentityId = @identityId and ([��Ʒ�ͺ�] is null or [��Ʒ�ͺ�] = '');
  -- ��Ʒ�ͺŲ�����
  set @msgType = @msgType + 1;
  insert into @msgTable 
  select 1, '��Ʒ�ͺ�'+r.[��Ʒ�ͺ�]+'������', rowNum from RivalProductsTemp r
  left join Bd_BiddingProduct p on r.[��Ʒ�ͺ�]=p.ProductSKU and p.IsOwnProduct=0 and p.IsDeleted=0
  where r.IdentityId = @identityId and p.Id is null;
  -- ����Ϊ��
  set @msgType = @msgType + 1;
  insert into @msgTable 
  select @msgType, '����Ϊ��', rowNum from RivalProductsTemp
  where IdentityId = @identityId and ([����] is null or [����] = '');
  -- ���򲻴���
  set @msgType = @msgType + 1;
  insert into @msgTable 
  select @msgType, '����'+p.[����]+'������', rowNum from RivalProductsTemp p
  left join Bd_Region r on r.DisplayName like '%'+p.[����]+'%'
  where p.IdentityId = @identityId and r.Id is null 
  order by p.rowNum;
  -- �㼶Ϊ�ջ���ʡ�����м�
  set @msgType = @msgType + 1;
  insert into @msgTable 
  select @msgType, '�㼶Ϊ�ջ��ǡ�ʡ��|�м���', rowNum from RivalProductsTemp
  where IdentityId = @identityId and ([�㼶] is null or [�㼶] = '' or ([�㼶] <> 'ʡ��' and [�㼶] <> '�м�' and [�㼶] <> '����'));
  -- �۸�����Ϊ��
  set @msgType = @msgType + 1;
  insert into @msgTable 
  select @msgType, '�۸�����Ϊ��', rowNum from RivalProductsTemp
  where IdentityId = @identityId and ([�۸�����] is null or [�۸�����] = '');
  -- �б�ʱ��Ϊ�ջ��ʽ����
  set @msgType = @msgType + 1;
  insert into @msgTable 
  select @msgType, '�б�ʱ��Ϊ�ջ��ʽ����', rowNum from RivalProductsTemp
  where IdentityId = @identityId and ([�б�ʱ��] is null or [�б�ʱ��] = '' or ISDATE([�б�ʱ��]) = 0);
  -- ȫ���۸�Ϊ��
  set @msgType = @msgType + 1;
  insert into @msgTable 
  select @msgType, 'ȫ���۸�Ϊ��', rowNum from RivalProductsTemp
  where IdentityId = @identityId and isnull([�б��], '') = '' and isnull([���޼۹���], '') = ''
  and isnull([�޼۵ͼ�], '') = '' and isnull([�޼۸߼�], '') = ''
  and isnull([������], '') = '' and isnull([�ɽ��ο���], '') = '';
  -- �б��Ϊ��
  set @msgType = @msgType + 1;
  insert into @msgTable 
  select @msgType, '�۸������Ǳ�׼�ۣ������б��Ϊ��', rowNum from RivalProductsTemp
  where IdentityId = @identityId and [�۸�����] = N'��׼�۸�' and ([�б��] = '' or [�б��] is null);
  -- û��ָ�����޼۹���
  set @msgType = @msgType + 1;
  insert into @msgTable 
  select @msgType, '�۸��������޼ۣ�����û��ָ�����޼۹���', rowNum from RivalProductsTemp
  where IdentityId = @identityId and [�۸�����] = N'�޼ۼ۸�' and ([���޼۹���] <> '��' and [���޼۹���] <> '��');
  -- ������Ϊ��
  set @msgType = @msgType + 1;
  insert into @msgTable 
  select @msgType, '�۸������Ǳ����ۣ����Ǳ�����Ϊ��', rowNum from RivalProductsTemp
  where IdentityId = @identityId and [�۸�����] = N'������' and ([������] = '' or [������] is null);
  -- �ɽ��ο���Ϊ��
  set @msgType = @msgType + 1;
  insert into @msgTable 
  select @msgType, '�۸������ǳɽ��ο��ۣ����ǳɽ��ο���Ϊ��', rowNum from RivalProductsTemp
  where IdentityId = @identityId and [�۸�����] = N'�ɽ��ο���' and ([�ɽ��ο���] = '' or [�ɽ��ο���] is null);
  -- �ظ�
  set @msgType = @msgType + 1;
  insert into @msgTable
  select @msgType,'�����ظ�����˾��'+[��˾]+'������'+[����]+'���㼶��'+[�㼶]+'����Ʒ�ͺţ�'+[��Ʒ�ͺ�]+'���б�ʱ�䣺'+[�б�ʱ��]+'��'
    ,(select convert(nvarchar(max),p.rowNum) +',' from RivalProductsTemp p
      where p.[��˾]=r.[��˾] 
      and p.[����]=r.[����] 
      and p.[�㼶]=r.[�㼶] 
      and p.[��Ʒ�ͺ�]=r.[��Ʒ�ͺ�] 
      and p.[�б�ʱ��]=r.[�б�ʱ��] for xml path('')) as msgRow
  from RivalProductsTemp r
  where IdentityId = @identityId 
  group by r.[��˾],r.[����],r.[�㼶],r.[��Ʒ�ͺ�],r.[�б�ʱ��]
  having count(*) > 1;
  declare @errorNum int;
  select @errorNum=count(*) from @msgTable
  if @errorNum=0
  begin
  BEGIN TRY
  BEGIN TRAN
  -- ���뾺Ʒ�۸��
  -- ����
  insert into RivalProducts(CreationTime, LastModificationTime, IsDeleted, CompanyName, RegionCode, ProductSku, RegionName, ExecutedTime, GerneralPrice, IsNotLimitPrice, LimitHighPrice, LimitLowerPrice, OnRecordPrice, PriceType, BiddingType, BiddingTypeStr, ReferencePrice, Remark, BiddingCategoryName)
  select GETDATE(),GETDATE(),0,[��˾],(select top 1 Code from Bd_Region where DisplayName like '%'+rpt.[����]+'%')
    ,[��Ʒ�ͺ�],[����],[�б�ʱ��],[�б��],
	 (case [���޼۹���] when '��' then 1 
	                   when '��' then 0
	                   else null 
	  end)
	,[�޼۸߼�],[�޼۵ͼ�],[������]
	,(case [�۸�����] when '��׼�۸�' then 1
	                 when '�޼ۼ۸�' then 2
					 when '������' then 3
					 when '�ɽ��ο���' then 4
	                 else null
	  end
	)
	,(case [�㼶] when 'ʡ��' then 'BiddingSpecies.BiddingSpecies.ProvincialBidding'
	              when '�м�' then 'BiddingSpecies.BiddingSpecies.CityBidding'
				  when '����' then 'BiddingSpecies.BiddingSpecies.ProvincialBidding'
	  end)
	,[�㼶],[�ɽ��ο���],[��ע],[Ͷ��Ŀ¼] from RivalProductsTemp rpt
  left join RivalProducts rp on rpt.[��˾]=rp.CompanyName and rpt.[��Ʒ�ͺ�]=rp.ProductSku and rpt.[�б�ʱ��]=rp.ExecutedTime
  left join Bd_Region r on r.DisplayName like '%'+rpt.[����]+'%' and r.Code=rp.RegionCode
  where rpt.IdentityId = @identityId and (rp.Id is null or r.Id is null);
  -- ����
  update RivalProducts set PriceType=(case rpt.[�۸�����] when '��׼�۸�' then 1
	                 when '�޼ۼ۸�' then 2
					 when '������' then 3
					 when '�ɽ��ο���' then 4
	                 else null
	  end
	),IsNotLimitPrice=(case rpt.[���޼۹���] when '��' then 1 else null end)
    ,GerneralPrice=rpt.[�б��],LimitHighPrice=rpt.[�޼۸߼�],LimitLowerPrice=rpt.[�޼۵ͼ�],OnRecordPrice=rpt.[������]
	,ReferencePrice=rpt.[�ɽ��ο���],Remark=rpt.[��ע],LastModificationTime=GETDATE()
  from RivalProductsTemp rpt 
  left join RivalProducts rp on rpt.[��˾]=rp.CompanyName and rpt.[��Ʒ�ͺ�]=rp.ProductSku and rpt.[�б�ʱ��]=rp.ExecutedTime
  left join Bd_Region r on r.DisplayName like '%'+rpt.[����]+'%' and r.Code=rp.RegionCode
  where rpt.IdentityId = @identityId and (rp.Id is not null and r.Id is not null);
  -- ����Price��
  -- ����
  insert into Bd_BiddingGroupProductPrice(CreationTime,LastModificationTime,BiddingId,BiddingLevel,RegionCode,RegionName,BiddingGroupId,BiddingProductId,BiddingProductSku,ExecutionPrice,ExecutionDate,IsProtectedPrice,BiddingType,ExecutionMonth,IsOwnCompany,OwnCompany,PriceType,DepartmentId,BiddingProductCategoryId)
  select GETDATE(),GETDATE(),0,
  (case [�㼶] when 'ʡ��' then 'BiddingHierarchical.BiddingHierarchical.Province'
	           when '�м�' then 'BiddingHierarchical.BiddingHierarchical.City'
			   when '����' then 'BiddingHierarchical.BiddingHierarchical.MilitaryRegion'
   end)
  ,(select top 1 Code from Bd_Region where DisplayName like '%'+rpt.[����]+'%'),rpt.[����]
  ,0,0,rpt.[��Ʒ�ͺ�],
  (case when [�۸�����] = N'��׼�۸�' then [�б��]
        when [�۸�����] = N'�޼ۼ۸�' then (
			case [���޼۹���] when '��' then null
				             else (case when [�޼۵ͼ�] is not null and [�޼۵ͼ�]<>'' then [�޼۵ͼ�]
									    when [�޼۸߼�] is not null and [�޼۸߼�]<>'' then [�޼۸߼�]
							       end)
			end)
		when [�۸�����] = N'������' then [������] 
	    when [�۸�����] = N'�ɽ��ο���' then [�ɽ��ο���] 
   end)
  ,[�б�ʱ��],1,
  (case [�㼶] when 'ʡ��' then 'BiddingSpecies.BiddingSpecies.ProvincialBidding'
	           when '�м�' then 'BiddingSpecies.BiddingSpecies.CityBidding'
			   when '����' then 'BiddingSpecies.BiddingSpecies.ProvincialBidding'
   end)
  ,LEFT(CONVERT(varchar(6), CAST([�б�ʱ��] AS datetime), 112),6),0,[��˾],
  (case when [�۸�����] = N'��׼�۸�' or [�۸�����] = N'������' or [�۸�����] = N'�ɽ��ο���' then 0
        when [�۸�����] = N'�޼ۼ۸�' then (case [���޼۹���] when '��' then 3
				                                            else (case when [�޼۵ͼ�] is not null and [�޼۵ͼ�]<>'' then 1
												                       when [�޼۸߼�] is not null and [�޼۸߼�]<>'' then 2
													              end)
							              end)
   end),0,0
  from RivalProductsTemp rpt 
  left join Bd_BiddingGroupProductPrice rp on rpt.[��˾]=rp.OwnCompany and rpt.[��Ʒ�ͺ�]=rp.BiddingProductSku and rpt.[�б�ʱ��]=rp.ExecutionDate
  left join Bd_Region r on r.DisplayName like '%'+rpt.[����]+'%' and r.Code=rp.RegionCode
  where rpt.IdentityId = @identityId and (rp.Id is null or r.Id is null);
  -- ����
  update Bd_BiddingGroupProductPrice set 
  PriceType= (case when [�۸�����] = N'��׼�۸�' or [�۸�����] = N'������' or [�۸�����] = N'�ɽ��ο���' then 0
                   when [�۸�����] = N'�޼ۼ۸�' then (
				       case [���޼۹���] when '��' then 3
				                        else (case when [�޼۵ͼ�] is not null and [�޼۵ͼ�]<>'' then 1
												   when [�޼۸߼�] is not null and [�޼۸߼�]<>'' then 2
									          end)
				       end)
              end),
  ExecutionPrice=(case when [�۸�����] = N'��׼�۸�' then [�б��]
                       when [�۸�����] = N'�޼ۼ۸�' then (
				           case [���޼۹���] when '��' then null
				                            else (case when [�޼۵ͼ�] is not null and [�޼۵ͼ�]<>'' then [�޼۵ͼ�]
									                   when [�޼۸߼�] is not null and [�޼۸߼�]<>'' then [�޼۸߼�]
							                      end)
				           end)
					   when [�۸�����] = N'������' then [������] 
					   when [�۸�����] = N'�ɽ��ο���' then [�ɽ��ο���] 
                   end),
  LastModificationTime=GETDATE()
  from RivalProductsTemp rpt 
  left join Bd_BiddingGroupProductPrice rp on rpt.[��˾]=rp.OwnCompany and rpt.[��Ʒ�ͺ�]=rp.BiddingProductSku and rpt.[�б�ʱ��]=rp.ExecutionDate
  left join Bd_Region r on r.DisplayName like '%'+rpt.[����]+'%' and r.Code=rp.RegionCode
  where rpt.IdentityId = @identityId and (rp.Id is not null and r.Id is not null);
  COMMIT TRAN
  END TRY
  BEGIN CATCH
  ROLLBACK TRAN
  declare @MessageCode nvarchar(2000);
  set @MessageCode='�к�='+cast(ERROR_LINE() as varchar(10))+'��������Ϣ'+ERROR_MESSAGE() 
  	+'['+ERROR_PROCEDURE()+']'
    IF @@ROWcount<=0 
        set @MessageCode='û����Ӱ���������'+@MessageCode
    print @MessageCode
  END CATCH
  end
  select distinct * from @msgTable order by msgType, msgRow;
  delete RivalProductsTemp where IdentityId = @identityId
end
GO
exec ImportRivalProduct 'e7b4ce895fbf442cb59706d007b077b7'
select * from Bd_Dictionary

Select [�б�ʱ��], ISDATE([�б�ʱ��]) from RivalProductsTemp
select * from Bd_BiddingGroupProductPrice where LastModificationTime > '2019-04-30'
select * from RivalProducts where LastModificationTime > '2019-04-30'
select * from RivalProductsTemp order by rowNum
truncate table RivalProductsTemp
truncate table RivalProducts
truncate table Bd_BiddingGroupProductPrice
update RivalProductsTemp set [�б�ʱ��]='2012//7/24 9:15:52' where rowNum=1
SELECT LEFT(CONVERT(varchar(6), GETDATE(), 112),6);


--�������������ܶ������¡�ɾ����
BEGIN TRAN
SELECT * FROM RivalProducts WITH(TABLOCKX);
WAITFOR delay '00:01:20'
COMMIT TRAN


--������������ֻ�ܶ������ܸ��¡�ɾ����
BEGIN TRAN
SELECT * FROM RivalProducts WITH(HOLDLOCK);
WAITFOR delay '00:01:20'
COMMIT TRAN

--��������
BEGIN TRAN
SELECT * FROM RivalProducts  WITH(XLOCK) WHERE ID = 1;
WAITFOR delay '00:01:20'
COMMIT TRAN

--�鿴������
select   request_session_id   �������,OBJECT_NAME(resource_associated_entity_id) ��������  
from   sys.dm_tran_locks where resource_type='OBJECT';

--����
declare @spid  int
Set @spid  = 55 --�������
declare @sql varchar(1000)
set @sql='kill '+cast(@spid  as varchar)
exec(@sql)


select request_session_id spid, OBJECT_NAME(resource_associated_entity_id) tableName  
from sys.dm_tran_locks where resource_type='OBJECT'

/*
drop table [dbo].[TestD]
CREATE TABLE [dbo].[TestD](
	[Name] [nvarchar](50) NULL,
	[Class] [nvarchar](50) NULL
) 
select * from TestD
insert into TestD values
('Lily', '5'),
('Lily', '1'),
('Lily', '2'),
('Lily', '3'),
('Lily', '4'),
('Ada', '4'),
('Maggie', '4'),
('Sisi', '4'),
('Daisy', '4')

delete s
  from (select ROW_NUMBER() over(partition by [Name] order by [Class]) as [rowNum], * from TestD) as s
  where s.[rowNum]>1
*/
