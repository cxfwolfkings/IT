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
(N'财务目录管理','Pages.FinancialDirectoriesManagement','00001.00007.00010',0,10,7,0)
Go
insert into AbpObjectBehaviors values
(N'查看','Pages.FinancialDirectoriesManagement.View','00001.00007.00010.001',1,10029,0,0)
Go
insert into AbpPermissions values
(getdate(),2,'RolePermissionSetting',1,'Pages.FinancialDirectoriesManagement.View',1,2,NULL)
Go

select * from Bd_Region where DisplayName like N'%福建省%'
select * from Bd_Bidding order by BiddingApplyDate desc
select * from Bd_Bidding order by BiddingExecutionDate desc
select * from Bd_BiddingGroupMap
select * from Bd_BiddingGroupProductMap
select * from Bd_BiddingCategory
select * from Bd_BiddingCategorySelectItem
-- 首尾空格删除
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
select * from RivalProducts where CompanyName=N'先健'

select r.* into testTable from (
select rp.* from RivalProducts rp
inner join (
	select CompanyName, RegionName, ProductSku, ExecutedTime from RivalProducts 
	group by CompanyName, RegionName, ProductSku, ExecutedTime having count(*)>1) t
    on rp.CompanyName=t.CompanyName and rp.ProductSku=t.ProductSku and rp.ProductSku=t.ProductSku and rp.ExecutedTime=t.ExecutedTime
) r order by r.CompanyName, r.RegionName, r.ProductSku, r.ExecutedTime


select * from Bd_BiddingGroupProductPrice where OwnCompany=N'先健'
select bp.*, p.ProductCategoryId from Bd_BiddingGroupProductPrice bp
inner join Bd_BiddingProduct p on bp.BiddingProductSku=p.ProductSKU
where 1=1
and p.IsPrimaryProduct = 1
order by RegionCode, ExecutionDate desc

select * from Bd_Hospital where DisplayName like '%安庆市第一人民医院%'
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
     @SplitString nvarchar(max),  --源字符串
     @Separator nvarchar(10)=' '  --分隔符号，默认为空格
 )
 RETURNS @SplitStringsTable TABLE  --输出的数据表
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
 RETURNS @ProductPriceTable TABLE  --输出的数据表
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
	   -- 根据省份（城市）分组，执行日期倒序排序，每组第一条记录就是该省（市）最近一次招标的价格
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
	   -- 根据省份（城市）分组，执行日期倒序排序，每组第一条记录就是该省（市）最近一次招标的价格
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

-- 产品全国价格查询
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
	-- 区域价格
	if @deptId = 0
	  begin
		insert into #tempTable
		select bp1.BiddingProductSku, bp1.RegionCode, 
		  (case PriceType when 3 then N'无限价'
						  when 4 then N'弃标'
						  when 5 then N'失标'
		   else Convert(varchar(30), cast(bp1.ExecutionPrice as money),1)+(case IsProtectedPrice when 1 then '' else '（受保护的）' end)
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
		  (case PriceType when 3 then N'无限价'
						  when 4 then N'弃标'
						  when 5 then N'失标'
		   else Convert(varchar(30), cast(bp1.ExecutionPrice as money),1)+(case IsProtectedPrice when 1 then '' else '（受保护的）' end)
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
	-- 全国省级最低价
	insert into #tempTable values(@productSKU, 'targetA', (select Convert(varchar(30), cast(min(ExecutionPrice) as money),1) from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.Province', @deptId)));
	-- 全国省级最高价
	insert into #tempTable values(@productSKU, 'targetB', (select Convert(varchar(30), cast(max(ExecutionPrice) as money),1) from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.Province', @deptId)));
	-- 其它指标
    SET @i = 0;  
    WHILE @i < @j 
      BEGIN  
      SET @i = @i+1;   
      SELECT @target = targetName from @targetTable where ID = @i;
      IF @target = 'target1' -- 全国市级最低价
	    BEGIN 
		insert into #tempTable values(@productSKU, 'target1', (select Convert(varchar(30), cast(min(ExecutionPrice) as money),1) from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.City', @deptId)));
		END
	  IF @target = 'target2' -- 全国市级最高价
	    BEGIN 
		insert into #tempTable values(@productSKU, 'target2', (select Convert(varchar(30), cast(max(ExecutionPrice) as money),1) from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.City', @deptId)));
		END
	  IF @target = 'target3' -- 单中心/医联体最低价
	    BEGIN 
		insert into #tempTable values(@productSKU, 'target3', (select Convert(varchar(30), cast(min(ExecutionPrice) as money),1) from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.Hospital', @deptId)));
		END
	  IF @target = 'target4' -- 单中心/医联体最高价
	    BEGIN 
		insert into #tempTable values(@productSKU, 'target4', (select Convert(varchar(30), cast(max(ExecutionPrice) as money),1) from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.Hospital', @deptId)));
		END
	  IF @target = 'target5' -- 最低3省平均价
	    BEGIN 
		insert into #tempTable values(@productSKU, 'target5', (
		  select Convert(varchar(30), cast(AVG(ExecutionPrice) as money),1) AVGPrice from(
		    select top 3 ExecutionPrice from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.Province', @deptId)
			order by ExecutionPrice) t));
		END
	  IF @target = 'target6' -- 最低5省平均价
	    BEGIN 
		insert into #tempTable values(@productSKU, 'target6', (
		select Convert(varchar(30), cast(AVG(ExecutionPrice) as money),1) AVGPrice from(
		    select top 5 ExecutionPrice from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.Province', @deptId)
			order by ExecutionPrice) t));
		END
	  IF @target = 'target7' -- 最低3省
	    BEGIN 
		set @result = ''
        select @result = @result + RegionName + '：' + Convert(varchar(30), cast(ExecutionPrice as money),1) + '；' from(
          select top 3 * from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.Province', @deptId)
	      order by ExecutionPrice) t
		insert into #tempTable values(@productSKU, 'target7', @result);
		END
	  IF @target = 'target8' -- 最低5省
	    BEGIN 
		set @result = ''
        select @result = @result + RegionName + '：' + Convert(varchar(30), cast(ExecutionPrice as money),1) + '；' from(
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
select * from Bd_Region where DisplayName like N'%安庆%'
select * from Bd_Hospital where DisplayName like N'%安庆%'
select * from RivalProducts where ProductSku='Philos II D' order by ExecutedTime desc

update Bd_BiddingGroupProductPrice set BiddingLevel='BiddingHierarchical.BiddingHierarchical.MilitaryRegion' 
where LEFT(RegionCode, 17)='00001.99999.99999'

select * from Bd_BiddingGroupProductPrice where LEFT(RegionCode, 17)='00001.99999.99999'

declare @result nvarchar(300)
set @result = ''
select @result = @result + RegionName + '：' + Convert(varchar(30), ExecutionPrice) + '；' from(
    select top 5 * from F_GetProductPriceByRegionLevel('5056', '2019-02-26', 'BiddingHierarchical.BiddingHierarchical.Province', 3)
	order by ExecutionPrice) t
select @result
select top 3 * from F_GetProductPriceByRegionLevel('DS2C001', '2019-04-04', 'BiddingHierarchical.BiddingHierarchical.Province', 0)
select min(ExecutionPrice) from F_GetProductPriceByRegionLevel('DS2C001', '2019-04-04', 'BiddingHierarchical.BiddingHierarchical.Province', 0)

select bp1.BiddingProductSku, bp1.RegionCode, Convert(varchar(30), bp1.ExecutionPrice)+(case IsProtectedPrice when 1 then '（受保护的）' else '' end) from
	  (select ROW_NUMBER() over(partition by RegionCode order by ExecutionDate desc, ExecutionPrice desc) as rowNum, * 
       from Bd_BiddingGroupProductPrice 
       where BiddingProductSku='5056'
	   and Exists(SELECT 1 FROM F_Split('00001.00001.00001', ',') where value=RegionCode)
       and ExecutionDate<='2019-02-26') bp1

-- 区域中标价/全国价格走势
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
  DECLARE @monthTable TABLE(ID INT IDENTITY(1,1), ExecutionMonth int); -- 月份
  DECLARE @targetTable TABLE(ID INT IDENTITY(1,1), targetName nvarchar(30)); -- 指标
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
	  -- 获取到每个区域特定时间段内最近的价格
	  if @deptId = 0
	    begin
		  insert into #tempTable
		  select BiddingProductSku, RegionCode, @curMonth, 
			(case PriceType when 3 then N'无限价'
							when 4 then N'弃标'
							when 5 then N'失标'
			 else Convert(varchar(30), cast(ExecutionPrice as money),1)+(case IsProtectedPrice when 1 then '' else '（受保护的）' end)
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
			(case PriceType when 3 then N'无限价'
							when 4 then N'弃标'
							when 5 then N'失标'
			 else Convert(varchar(30), cast(ExecutionPrice as money),1)+(case IsProtectedPrice when 1 then '' else '（受保护的）' end)
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
	-- 全国省级最低价
	insert into #tempTable values(@productSKU, 'targetA', 0, (select Convert(varchar(30), cast(min(ExecutionPrice) as money),1) from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.Province', @deptId)));
	-- 全国省级最高价
	insert into #tempTable values(@productSKU, 'targetB', 0, (select Convert(varchar(30), cast(max(ExecutionPrice) as money),1) from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.Province', @deptId)));
	-- 其它指标
    SET @i = 0;  
    WHILE @i < @j 
      BEGIN  
      SET @i = @i+1;   
      SELECT @target = targetName from @targetTable where ID = @i;
      IF @target = 'target1' -- 全国市级最低价
	    BEGIN 
		insert into #tempTable values(@productSKU, 'target1', 0, (select Convert(varchar(30), cast(min(ExecutionPrice) as money),1) from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.City', @deptId)));
		END
	  IF @target = 'target2' -- 全国市级最高价
	    BEGIN 
		insert into #tempTable values(@productSKU, 'target2', 0, (select Convert(varchar(30), cast(max(ExecutionPrice) as money),1) from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.City', @deptId)));
		END
	  IF @target = 'target3' -- 单中心/医联体最低价
	    BEGIN 
		insert into #tempTable values(@productSKU, 'target3', 0, (select Convert(varchar(30), cast(min(ExecutionPrice) as money),1) from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.Hospital', @deptId)));
		END
	  IF @target = 'target4' -- 单中心/医联体最高价
	    BEGIN 
		insert into #tempTable values(@productSKU, 'target4', 0, (select Convert(varchar(30), cast(max(ExecutionPrice) as money),1) from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.Hospital', @deptId)));
		END
	  IF @target = 'target5' -- 最低3省平均价
	    BEGIN 
		insert into #tempTable values(@productSKU, 'target5', 0, (
		  select Convert(varchar(30), cast(AVG(ExecutionPrice) as money),1) AVGPrice from(
		    select top 3 ExecutionPrice from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.Province', @deptId)
			order by ExecutionPrice) t));
		END
	  IF @target = 'target6' -- 最低5省平均价
	    BEGIN 
		insert into #tempTable values(@productSKU, 'target6', 0, (
		select Convert(varchar(30), cast(AVG(ExecutionPrice) as money),1) AVGPrice from(
		    select top 5 ExecutionPrice from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.Province', @deptId)
			order by ExecutionPrice) t));
		END
	  IF @target = 'target7' -- 最低3省
	    BEGIN 
		set @result = ''
        select @result = @result + RegionName + '：' + Convert(varchar(30), cast(ExecutionPrice as money),1) + '；' from(
          select top 3 * from F_GetProductPriceByRegionLevel(@productSKU, GETDATE(), 'BiddingHierarchical.BiddingHierarchical.Province', @deptId)
	      order by ExecutionPrice) t
		insert into #tempTable values(@productSKU, 'target7', 0, @result);
		END
	  IF @target = 'target8' -- 最低5省
	    BEGIN 
		set @result = ''
        select @result = @result + RegionName + '：' + Convert(varchar(30), cast(ExecutionPrice as money),1) + '；' from(
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
  公司 nvarchar(30),
  区域 nvarchar(30),
  层级 nvarchar(10),
  产品型号 nvarchar(600),
  价格类型 nvarchar(10),
  中标时间 nvarchar(20),
  中标价 nvarchar(20),
  无限价挂网 nvarchar(2),
  限价低价 nvarchar(20),
  限价高价 nvarchar(20),
  备案价 nvarchar(20),
  成交参考价 nvarchar(600),
  备注 nvarchar(600),
  投标目录 nvarchar(32),
  IdentityId nvarchar(40),
  rowNum int
)
Go
select * from RivalProductsTemp order by rowNum
truncate table RivalProductsTemp
-- D77C8394-CF7E-463C-5436-08D6C6CB78F6

-- 导入竞品价格
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

  -- 2019-06-28 如果数据重复，取最低价（暂时，本次导入后删除）
  --delete s
  --from (select ROW_NUMBER() over(partition by [公司], [区域], [层级], [产品型号], [中标时间] order by [中标价]) as [序号]
  --      , * from RivalProductsTemp where [价格类型]=N'标准价格') as s
  --where s.[序号]>1

  --delete s
  --from (select ROW_NUMBER() over(partition by [公司], [区域], [层级], [产品型号], [中标时间] order by [备案价]) as [序号]
  --      , * from RivalProductsTemp where [价格类型]=N'备案价') as s
  --where s.[序号]>1

  -- 公司名称为空
  set @msgType = 1;
  insert into @msgTable 
  select @msgType, '公司名称为空', rowNum from RivalProductsTemp
  where IdentityId = @identityId and ([公司] is null or [公司] = '');
  -- 公司名称不存在
  set @msgType = @msgType + 1;
  declare @dicId int;
  select @dicId = Id from Bd_Dictionary where [Name]='Corporation';
  insert into @msgTable
  select @msgType, '公司名称'+r.[公司]+'不存在', rowNum from RivalProductsTemp r
  left join Bd_Dictionary d on r.[公司]=d.DisplayName and d.ParentId=@dicId
  where r.IdentityId = @identityId and d.Id is null
  -- 产品型号为空
  set @msgType = @msgType + 1;
  insert into @msgTable 
  select @msgType, '产品型号为空', rowNum from RivalProductsTemp
  where IdentityId = @identityId and ([产品型号] is null or [产品型号] = '');
  -- 产品型号不存在
  set @msgType = @msgType + 1;
  insert into @msgTable 
  select 1, '产品型号'+r.[产品型号]+'不存在', rowNum from RivalProductsTemp r
  left join Bd_BiddingProduct p on r.[产品型号]=p.ProductSKU and p.IsOwnProduct=0 and p.IsDeleted=0
  where r.IdentityId = @identityId and p.Id is null;
  -- 区域为空
  set @msgType = @msgType + 1;
  insert into @msgTable 
  select @msgType, '区域为空', rowNum from RivalProductsTemp
  where IdentityId = @identityId and ([区域] is null or [区域] = '');
  -- 区域不存在
  set @msgType = @msgType + 1;
  insert into @msgTable 
  select @msgType, '区域'+p.[区域]+'不存在', rowNum from RivalProductsTemp p
  left join Bd_Region r on r.DisplayName like '%'+p.[区域]+'%'
  where p.IdentityId = @identityId and r.Id is null 
  order by p.rowNum;
  -- 层级为空或不是省级、市级
  set @msgType = @msgType + 1;
  insert into @msgTable 
  select @msgType, '层级为空或不是【省级|市级】', rowNum from RivalProductsTemp
  where IdentityId = @identityId and ([层级] is null or [层级] = '' or ([层级] <> '省级' and [层级] <> '市级' and [层级] <> '军区'));
  -- 价格类型为空
  set @msgType = @msgType + 1;
  insert into @msgTable 
  select @msgType, '价格类型为空', rowNum from RivalProductsTemp
  where IdentityId = @identityId and ([价格类型] is null or [价格类型] = '');
  -- 中标时间为空或格式不对
  set @msgType = @msgType + 1;
  insert into @msgTable 
  select @msgType, '中标时间为空或格式不对', rowNum from RivalProductsTemp
  where IdentityId = @identityId and ([中标时间] is null or [中标时间] = '' or ISDATE([中标时间]) = 0);
  -- 全部价格为空
  set @msgType = @msgType + 1;
  insert into @msgTable 
  select @msgType, '全部价格为空', rowNum from RivalProductsTemp
  where IdentityId = @identityId and isnull([中标价], '') = '' and isnull([无限价挂网], '') = ''
  and isnull([限价低价], '') = '' and isnull([限价高价], '') = ''
  and isnull([备案价], '') = '' and isnull([成交参考价], '') = '';
  -- 中标价为空
  set @msgType = @msgType + 1;
  insert into @msgTable 
  select @msgType, '价格类型是标准价，但是中标价为空', rowNum from RivalProductsTemp
  where IdentityId = @identityId and [价格类型] = N'标准价格' and ([中标价] = '' or [中标价] is null);
  -- 没有指定无限价挂网
  set @msgType = @msgType + 1;
  insert into @msgTable 
  select @msgType, '价格类型是限价，但是没有指定无限价挂网', rowNum from RivalProductsTemp
  where IdentityId = @identityId and [价格类型] = N'限价价格' and ([无限价挂网] <> '是' and [无限价挂网] <> '否');
  -- 备案价为空
  set @msgType = @msgType + 1;
  insert into @msgTable 
  select @msgType, '价格类型是备案价，但是备案价为空', rowNum from RivalProductsTemp
  where IdentityId = @identityId and [价格类型] = N'备案价' and ([备案价] = '' or [备案价] is null);
  -- 成交参考价为空
  set @msgType = @msgType + 1;
  insert into @msgTable 
  select @msgType, '价格类型是成交参考价，但是成交参考价为空', rowNum from RivalProductsTemp
  where IdentityId = @identityId and [价格类型] = N'成交参考价' and ([成交参考价] = '' or [成交参考价] is null);
  -- 重复
  set @msgType = @msgType + 1;
  insert into @msgTable
  select @msgType,'数据重复【公司：'+[公司]+'，区域：'+[区域]+'，层级：'+[层级]+'，产品型号：'+[产品型号]+'，中标时间：'+[中标时间]+'】'
    ,(select convert(nvarchar(max),p.rowNum) +',' from RivalProductsTemp p
      where p.[公司]=r.[公司] 
      and p.[区域]=r.[区域] 
      and p.[层级]=r.[层级] 
      and p.[产品型号]=r.[产品型号] 
      and p.[中标时间]=r.[中标时间] for xml path('')) as msgRow
  from RivalProductsTemp r
  where IdentityId = @identityId 
  group by r.[公司],r.[区域],r.[层级],r.[产品型号],r.[中标时间]
  having count(*) > 1;
  declare @errorNum int;
  select @errorNum=count(*) from @msgTable
  if @errorNum=0
  begin
  BEGIN TRY
  BEGIN TRAN
  -- 导入竞品价格表
  -- 新增
  insert into RivalProducts(CreationTime, LastModificationTime, IsDeleted, CompanyName, RegionCode, ProductSku, RegionName, ExecutedTime, GerneralPrice, IsNotLimitPrice, LimitHighPrice, LimitLowerPrice, OnRecordPrice, PriceType, BiddingType, BiddingTypeStr, ReferencePrice, Remark, BiddingCategoryName)
  select GETDATE(),GETDATE(),0,[公司],(select top 1 Code from Bd_Region where DisplayName like '%'+rpt.[区域]+'%')
    ,[产品型号],[区域],[中标时间],[中标价],
	 (case [无限价挂网] when '是' then 1 
	                   when '否' then 0
	                   else null 
	  end)
	,[限价高价],[限价低价],[备案价]
	,(case [价格类型] when '标准价格' then 1
	                 when '限价价格' then 2
					 when '备案价' then 3
					 when '成交参考价' then 4
	                 else null
	  end
	)
	,(case [层级] when '省级' then 'BiddingSpecies.BiddingSpecies.ProvincialBidding'
	              when '市级' then 'BiddingSpecies.BiddingSpecies.CityBidding'
				  when '军区' then 'BiddingSpecies.BiddingSpecies.ProvincialBidding'
	  end)
	,[层级],[成交参考价],[备注],[投标目录] from RivalProductsTemp rpt
  left join RivalProducts rp on rpt.[公司]=rp.CompanyName and rpt.[产品型号]=rp.ProductSku and rpt.[中标时间]=rp.ExecutedTime
  left join Bd_Region r on r.DisplayName like '%'+rpt.[区域]+'%' and r.Code=rp.RegionCode
  where rpt.IdentityId = @identityId and (rp.Id is null or r.Id is null);
  -- 更新
  update RivalProducts set PriceType=(case rpt.[价格类型] when '标准价格' then 1
	                 when '限价价格' then 2
					 when '备案价' then 3
					 when '成交参考价' then 4
	                 else null
	  end
	),IsNotLimitPrice=(case rpt.[无限价挂网] when '是' then 1 else null end)
    ,GerneralPrice=rpt.[中标价],LimitHighPrice=rpt.[限价高价],LimitLowerPrice=rpt.[限价低价],OnRecordPrice=rpt.[备案价]
	,ReferencePrice=rpt.[成交参考价],Remark=rpt.[备注],LastModificationTime=GETDATE()
  from RivalProductsTemp rpt 
  left join RivalProducts rp on rpt.[公司]=rp.CompanyName and rpt.[产品型号]=rp.ProductSku and rpt.[中标时间]=rp.ExecutedTime
  left join Bd_Region r on r.DisplayName like '%'+rpt.[区域]+'%' and r.Code=rp.RegionCode
  where rpt.IdentityId = @identityId and (rp.Id is not null and r.Id is not null);
  -- 导入Price表
  -- 新增
  insert into Bd_BiddingGroupProductPrice(CreationTime,LastModificationTime,BiddingId,BiddingLevel,RegionCode,RegionName,BiddingGroupId,BiddingProductId,BiddingProductSku,ExecutionPrice,ExecutionDate,IsProtectedPrice,BiddingType,ExecutionMonth,IsOwnCompany,OwnCompany,PriceType,DepartmentId,BiddingProductCategoryId)
  select GETDATE(),GETDATE(),0,
  (case [层级] when '省级' then 'BiddingHierarchical.BiddingHierarchical.Province'
	           when '市级' then 'BiddingHierarchical.BiddingHierarchical.City'
			   when '军区' then 'BiddingHierarchical.BiddingHierarchical.MilitaryRegion'
   end)
  ,(select top 1 Code from Bd_Region where DisplayName like '%'+rpt.[区域]+'%'),rpt.[区域]
  ,0,0,rpt.[产品型号],
  (case when [价格类型] = N'标准价格' then [中标价]
        when [价格类型] = N'限价价格' then (
			case [无限价挂网] when '是' then null
				             else (case when [限价低价] is not null and [限价低价]<>'' then [限价低价]
									    when [限价高价] is not null and [限价高价]<>'' then [限价高价]
							       end)
			end)
		when [价格类型] = N'备案价' then [备案价] 
	    when [价格类型] = N'成交参考价' then [成交参考价] 
   end)
  ,[中标时间],1,
  (case [层级] when '省级' then 'BiddingSpecies.BiddingSpecies.ProvincialBidding'
	           when '市级' then 'BiddingSpecies.BiddingSpecies.CityBidding'
			   when '军区' then 'BiddingSpecies.BiddingSpecies.ProvincialBidding'
   end)
  ,LEFT(CONVERT(varchar(6), CAST([中标时间] AS datetime), 112),6),0,[公司],
  (case when [价格类型] = N'标准价格' or [价格类型] = N'备案价' or [价格类型] = N'成交参考价' then 0
        when [价格类型] = N'限价价格' then (case [无限价挂网] when '是' then 3
				                                            else (case when [限价低价] is not null and [限价低价]<>'' then 1
												                       when [限价高价] is not null and [限价高价]<>'' then 2
													              end)
							              end)
   end),0,0
  from RivalProductsTemp rpt 
  left join Bd_BiddingGroupProductPrice rp on rpt.[公司]=rp.OwnCompany and rpt.[产品型号]=rp.BiddingProductSku and rpt.[中标时间]=rp.ExecutionDate
  left join Bd_Region r on r.DisplayName like '%'+rpt.[区域]+'%' and r.Code=rp.RegionCode
  where rpt.IdentityId = @identityId and (rp.Id is null or r.Id is null);
  -- 更新
  update Bd_BiddingGroupProductPrice set 
  PriceType= (case when [价格类型] = N'标准价格' or [价格类型] = N'备案价' or [价格类型] = N'成交参考价' then 0
                   when [价格类型] = N'限价价格' then (
				       case [无限价挂网] when '是' then 3
				                        else (case when [限价低价] is not null and [限价低价]<>'' then 1
												   when [限价高价] is not null and [限价高价]<>'' then 2
									          end)
				       end)
              end),
  ExecutionPrice=(case when [价格类型] = N'标准价格' then [中标价]
                       when [价格类型] = N'限价价格' then (
				           case [无限价挂网] when '是' then null
				                            else (case when [限价低价] is not null and [限价低价]<>'' then [限价低价]
									                   when [限价高价] is not null and [限价高价]<>'' then [限价高价]
							                      end)
				           end)
					   when [价格类型] = N'备案价' then [备案价] 
					   when [价格类型] = N'成交参考价' then [成交参考价] 
                   end),
  LastModificationTime=GETDATE()
  from RivalProductsTemp rpt 
  left join Bd_BiddingGroupProductPrice rp on rpt.[公司]=rp.OwnCompany and rpt.[产品型号]=rp.BiddingProductSku and rpt.[中标时间]=rp.ExecutionDate
  left join Bd_Region r on r.DisplayName like '%'+rpt.[区域]+'%' and r.Code=rp.RegionCode
  where rpt.IdentityId = @identityId and (rp.Id is not null and r.Id is not null);
  COMMIT TRAN
  END TRY
  BEGIN CATCH
  ROLLBACK TRAN
  declare @MessageCode nvarchar(2000);
  set @MessageCode='行号='+cast(ERROR_LINE() as varchar(10))+'，错误信息'+ERROR_MESSAGE() 
  	+'['+ERROR_PROCEDURE()+']'
    IF @@ROWcount<=0 
        set @MessageCode='没有受影响的行数，'+@MessageCode
    print @MessageCode
  END CATCH
  end
  select distinct * from @msgTable order by msgType, msgRow;
  delete RivalProductsTemp where IdentityId = @identityId
end
GO
exec ImportRivalProduct 'e7b4ce895fbf442cb59706d007b077b7'
select * from Bd_Dictionary

Select [中标时间], ISDATE([中标时间]) from RivalProductsTemp
select * from Bd_BiddingGroupProductPrice where LastModificationTime > '2019-04-30'
select * from RivalProducts where LastModificationTime > '2019-04-30'
select * from RivalProductsTemp order by rowNum
truncate table RivalProductsTemp
truncate table RivalProducts
truncate table Bd_BiddingGroupProductPrice
update RivalProductsTemp set [中标时间]='2012//7/24 9:15:52' where rowNum=1
SELECT LEFT(CONVERT(varchar(6), GETDATE(), 112),6);


--锁表（其它事务不能读、更新、删除）
BEGIN TRAN
SELECT * FROM RivalProducts WITH(TABLOCKX);
WAITFOR delay '00:01:20'
COMMIT TRAN


--锁表（其它事务只能读，不能更新、删除）
BEGIN TRAN
SELECT * FROM RivalProducts WITH(HOLDLOCK);
WAITFOR delay '00:01:20'
COMMIT TRAN

--锁部分行
BEGIN TRAN
SELECT * FROM RivalProducts  WITH(XLOCK) WHERE ID = 1;
WAITFOR delay '00:01:20'
COMMIT TRAN

--查看被锁表
select   request_session_id   锁表进程,OBJECT_NAME(resource_associated_entity_id) 被锁表名  
from   sys.dm_tran_locks where resource_type='OBJECT';

--解锁
declare @spid  int
Set @spid  = 55 --锁表进程
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
