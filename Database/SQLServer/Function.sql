USE [SaigeOA]
GO
/****** Object:  UserDefinedFunction [dbo].[contract_code_identity]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*合同分类编码生成*/
CREATE function [dbo].[contract_code_identity]
(
@classID int,@contract_code varchar(100)
)returns varchar(100)
as
begin

if @classID=0
  if exists (select 'r' from contractM_class where parentID=@classID)
  set @contract_code=(select convert(varchar(50),max(order_id)+1) from contractM_class where parentID=@classID)
  else
  set @contract_code='1'
else
begin
	declare @p_id int
	if(len(@contract_code)=0)
	set @contract_code=''
	if(@contract_code='')
	begin
	  if exists (select 'r' from contractM_class where parentID=@classID)
	  set @contract_code=(select convert(varchar(50),max(order_id)+1) from contractM_class where parentID=@classID)
	  else
	  set @contract_code='1'
	  
	  select @p_id=parentID from contractM_class where id=@classID
	  --if (select parentID from contractM_class where id=@p_id)<>0
	  if @p_id<>0
	  begin
		return dbo.contract_code_identity(@p_id,@contract_code)
	  end
	  else
	  set @contract_code=@contract_code+'-'+(select convert(varchar(50),order_id) from contractM_class where id=@classID)
	end
	else
	begin
	  --if exists (select 'r' from contractM_class where parentID=@classID)
	  select @p_id=parentID from contractM_class where id=@classID
	  set @contract_code=@contract_code+'-'+(select convert(varchar(50),order_id) from contractM_class where id=@classID)
	  --if (select parentID from contractM_class where id=@p_id)<>0
	  if @p_id<>0
	  begin
		return dbo.contract_code_identity(@p_id,@contract_code)
	  end
	  else
	  set @contract_code=@contract_code+'-'+(select convert(varchar(50),order_id) from contractM_class where id=@classID)
	  
	end
end

return @contract_code
end

GO
/****** Object:  UserDefinedFunction [dbo].[contractcode_identity]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*合同分类编码生成*/
CREATE function [dbo].[contractcode_identity]
(
@classID int,@contract_code varchar(100)
)returns varchar(100)
as
begin

if @classID=0
  if exists (select 'r' from kingdee_contract_class where parentID=@classID)
  set @contract_code=(select convert(varchar(50),max(order_id)+1) from kingdee_contract_class where parentID=@classID)
  else
  set @contract_code='1'
else
begin
	declare @p_id int
	if(len(@contract_code)=0)
	set @contract_code=''
	if(@contract_code='')
	begin
	  if exists (select 'r' from kingdee_contract_class where parentID=@classID)
	  set @contract_code=(select convert(varchar(50),max(order_id)+1) from kingdee_contract_class where parentID=@classID)
	  else
	  set @contract_code='1'
	  
	  select @p_id=parentID from kingdee_contract_class where id=@classID
	  --if (select parentID from kingdee_contract_class where id=@p_id)<>0
	  if @p_id<>0
	  begin
		return dbo.contract_code_identity(@p_id,@contract_code)
	  end
	  else
	  set @contract_code=@contract_code+'-'+(select convert(varchar(50),order_id) from kingdee_contract_class where id=@classID)
	end
	else
	begin
	  --if exists (select 'r' from kingdee_contract_class where parentID=@classID)
	  select @p_id=parentID from kingdee_contract_class where id=@classID
	  set @contract_code=@contract_code+'-'+(select convert(varchar(50),order_id) from kingdee_contract_class where id=@classID)
	  --if (select parentID from kingdee_contract_class where id=@p_id)<>0
	  if @p_id<>0
	  begin
		return dbo.contract_code_identity(@p_id,@contract_code)
	  end
	  else
	  set @contract_code=@contract_code+'-'+(select convert(varchar(50),order_id) from kingdee_contract_class where id=@classID)
	  
	end
end

return @contract_code
end

GO
/****** Object:  UserDefinedFunction [dbo].[dutyRoleGetUser]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*获取用户工作管理权限 全部以人员展示*/
CREATE function [dbo].[dutyRoleGetUser]
(
@userID int,@role_type int,@role_t int)
returns varchar(8000)
as
begin
declare @out_str varchar(8000)
set @out_str=''
declare @user_role varchar(8000)
declare @dep_role varchar(8000)
set @user_role=''
set @dep_role=''
select @user_role=user_role,@dep_role=dep_role from duty_role where userID=@userID and role_type=@role_type and role_t=@role_t

select @out_str=@out_str+convert(varchar,userID)+'|' from hr_userall_v where leave=0 and departmentID in (select result from split(@dep_role))
if @out_str<>''
set @out_str=@out_str+'|'+@user_role
else
set @out_str=@user_role
return @out_str
end

GO
/****** Object:  UserDefinedFunction [dbo].[exists_id]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*判断字符串2在字符串1中出现过的id*/
create function [dbo].[exists_id]
(
@str1 varchar(max),@str2 varchar(max)
)returns varchar(1000)
as
begin
declare @r_c varchar(1000)
set @r_c=''
select @r_c=@r_c+result+'|' from split(@str2) a where a.result in (select * from split(@str1))
if @r_c<>''
set @r_c=substring(@r_c,1,len(@r_c)-1)
return @r_c
end
GO
/****** Object:  UserDefinedFunction [dbo].[f_getComParID]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create FUNCTION [dbo].[f_getComParID] (@ID int)
RETURNS @t_Level TABLE(ID int,[Level] int)
AS
BEGIN
    DECLARE @Level int
    SET @Level=1
    INSERT @t_Level SELECT @ID,@Level
    WHILE @@ROWCOUNT>0
    BEGIN
        SET @Level=@Level+1
        INSERT @t_Level SELECT a.parCompany,@Level
        FROM hr_company a,@t_Level b
        WHERE a.companyID=b.ID
            AND b.Level=@Level-1
    END
delete from @t_Level where ID=0
    RETURN

END
GO
/****** Object:  UserDefinedFunction [dbo].[f_getDepParID]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[f_getDepParID] (@ID int)
RETURNS @t_Level TABLE(ID int,[Level] int)
AS
BEGIN
    DECLARE @Level int
    SET @Level=1
    INSERT @t_Level SELECT @ID,@Level
    WHILE @@ROWCOUNT>0
    BEGIN
        SET @Level=@Level+1
        INSERT @t_Level SELECT a.parDepartment,@Level
        FROM hr_department a,@t_Level b
        WHERE a.departmentID=b.ID
            AND b.Level=@Level-1
    END
delete from @t_Level where ID=0
    RETURN

END
GO
/****** Object:  UserDefinedFunction [dbo].[f_IP2Int]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[f_IP2Int](
@ip varchar(15)
)RETURNS bigint
AS
BEGIN
    DECLARE @re bigint
    SET @re=0
    SELECT @re=@re+LEFT(@ip,CHARINDEX('.',@ip+'.')-1)*ID
        ,@ip=STUFF(@ip,1,CHARINDEX('.',@ip+'.'),'')
    FROM(
        SELECT ID=CAST(16777216 as bigint)
        UNION ALL SELECT 65536
        UNION ALL SELECT 256
        UNION ALL SELECT 1)a
    RETURN(@re)
END

GO
/****** Object:  UserDefinedFunction [dbo].[fnGetFather_department]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE function [dbo].[fnGetFather_department](@id int) 
returns @t table(ID int,ParentID int,Depth int) 
as 
begin 
insert into @t select departmentID,parDepartment,@id from hr_department where departmentID = @id 
select @id = parDepartment from hr_department where departmentID = @id 
while @@rowcount > 0 
begin 
insert into @t select departmentID,parDepartment,@id from hr_department where departmentID = @id 
select @id = parDepartment from hr_department where departmentID = @id
end 
return 
end 


GO
/****** Object:  UserDefinedFunction [dbo].[fun_getAbsenteeismSum]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


/*公司文档分类子节点获取*/
CREATE function [dbo].[fun_getAbsenteeismSum]
(
@beginDate datetime,
@endDate	datetime,
@nodeID		int 		
)
returns @Tab table(employeeID int,rep_val decimal(18,2))
as
begin
  insert @Tab(employeeID,rep_val)	
  select b.employeeID,sum(datediff(day,b.beginDate_fact2,endDate_fact2)+d) sumdays 
  from (select *,(case when round(days_fact,0)>days_fact then 0.5 else 1 end) d, (case when endDate_fact<=@endDate then endDate_fact else @endDate end) endDate_fact2,(case when beginDate_fact<@beginDate and endDate_fact>=@beginDate then @beginDate else  beginDate_fact end) as beginDate_fact2 from hr_holidayNew_v a 
  where reasons='旷工' and (employeeID=@nodeID or companyID=@nodeID or groupID=@nodeID or departmentID in (select ID from f_getDepParID(@nodeID))) and endDate_fact>=@beginDate and endDate_fact<=@endDate and ((a.isall=1 and exists(select top 1 isagree,mainID,max(checklev) from common_checkOperation where checktype=601 and isagree=0 and mainID=a.holidayID group by isagree,mainID)) 
  or (isall=0 and not exists(select top 1 mainID from common_checkOperation where checktype=601 and isagree<>0 and  mainID=a.holidayID)))) b
  group by b.employeeID
return
end


GO
/****** Object:  UserDefinedFunction [dbo].[fun_getChild_cdoc]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


/*公司文档分类子节点获取*/
create function [dbo].[fun_getChild_cdoc]
(@MarketID int)
returns @Tab table(MarketID int,[LevelDeep] int)
as
begin
   declare @Level int
   set @Level =1
   insert into @Tab select @MarketID,@Level; --加入 @MarketID
   while @@ROWCOUNT > 0
	begin
      set @Level = @Level + 1 --加一层,标识为子记录
		insert into @Tab (MarketID,LevelDeep)
			select a.classID , @Level --加入子记录
			from knowledge_class a 
			inner join @Tab b on a.parentID = b.MarketID 
		where b.LevelDeep = @Level - 1 and a.[type]='cdoc'
   	end
delete from @Tab where LevelDeep=1
return
end


GO
/****** Object:  UserDefinedFunction [dbo].[fun_getChild_common]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO






/*控制面板子节点获取*/
create function [dbo].[fun_getChild_common]
(@MarketID int,
@tabName varchar(50),
@IDStr varchar(20),
@pIDStr varchar(20),
@cNameStr varchar(20),
@conditionStr  varchar(2000)
)
returns @Tab table(MarketID int,[LevelDeep] int)
as
begin
   declare @Level int
   declare @sql nvarchar(4000)
   set @Level =1
   set @sql='insert into @Tab select @MarketID,@Level ' --加入 @MarketID
  -- exec(@sql)
   while @@ROWCOUNT > 0
	begin
      set @Level = @Level + 1 --加一层,标识为子记录
	  set @sql='insert into @Tab (MarketID,LevelDeep) select a.'+@IDStr+'a.'+@cNameStr+' ,' +@Level+' from '
	  set @sql=@sql+@tabName+' a nner join @Tab b on a.'+@pIDStr+' = b.MarketID '
	  set @sql=@sql+' where b.LevelDeep ='+ (@Level - 1) + ' @conditionStr'
	 -- exec(@sql)	
   	end

return
end

GO
/****** Object:  UserDefinedFunction [dbo].[fun_getChild_crmSaleClassID]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*商机类型分类子节点获取*/
CREATE function [dbo].[fun_getChild_crmSaleClassID]
(@MarketID int)
returns @Tab table(MarketID int,[LevelDeep] int)
as
begin
   declare @Level int
   set @Level =1
   insert into @Tab select @MarketID,@Level; --加入 @MarketID
   while @@ROWCOUNT > 0
	begin
      set @Level = @Level + 1 --加一层,标识为子记录
		insert into @Tab (MarketID,LevelDeep)
			select a.id , @Level --加入子记录
			from  (select aid as id,cName,pid as pNameID from sys_ass where typeName='saleType' and isdel=0) a 
			inner join @Tab b on a.pNameID = b.MarketID 
		where b.LevelDeep = @Level - 1
   	end
delete from @Tab where LevelDeep=1
return
end


GO
/****** Object:  UserDefinedFunction [dbo].[fun_getChild_dept]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE function [dbo].[fun_getChild_dept]
(
@MarketID int
)
returns @Tab table(departmentID int,[LevelDeep] int)
as
begin
   if(@MarketID=0) return
   declare @Level int
   set @Level =1
   insert into @Tab select @MarketID,@Level; --加入 @MarketID
   while @@ROWCOUNT > 0
	begin
      set @Level = @Level + 1 --加一层,标识为子记录
		insert into @Tab (departmentID,LevelDeep)
			select a.departmentID,@Level --加入子记录
			from hr_department a 
			inner join @Tab b on a.parDepartment = b.departmentID 
		where b.LevelDeep = @Level - 1
   	end
delete from @Tab where LevelDeep=1
return
end

GO
/****** Object:  UserDefinedFunction [dbo].[fun_getChild_doc]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





/*公共文档分类子节点获取*/
CREATE function [dbo].[fun_getChild_doc]
(@MarketID int)
returns @Tab table(MarketID int,[LevelDeep] int)
as
begin
   declare @Level int
   set @Level =1
   insert into @Tab select @MarketID,@Level; --加入 @MarketID
   while @@ROWCOUNT > 0
	begin
      set @Level = @Level + 1 --加一层,标识为子记录
		insert into @Tab (MarketID,LevelDeep)
			select a.classID , @Level --加入子记录
			from knowledge_class a 
			inner join @Tab b on a.parentID = b.MarketID 
		where b.LevelDeep = @Level - 1 and a.[type]='doc'
   	end
delete from @Tab where LevelDeep=1
return
end
GO
/****** Object:  UserDefinedFunction [dbo].[fun_getChild_doc1]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*公共文档分类子节点获取*/
CREATE function [dbo].[fun_getChild_doc1]
(@MarketID int,@docType varchar(50))
returns @Tab table(MarketID int,[LevelDeep] int)
as
begin
   declare @Level int
   set @Level =1
   insert into @Tab select @MarketID,@Level; --加入 @MarketID
   while @@ROWCOUNT > 0
	begin
      set @Level = @Level + 1 --加一层,标识为子记录
		insert into @Tab (MarketID,LevelDeep)
			select a.classID , @Level --加入子记录
			from knowledge_class a 
			inner join @Tab b on a.parentID = b.MarketID 
		where b.LevelDeep = @Level - 1 and a.[type]=@docType
   	end
delete from @Tab where LevelDeep=1
return
end
GO
/****** Object:  UserDefinedFunction [dbo].[fun_getChild_itemdoc]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*维修材料子节点获取*/
create function [dbo].[fun_getChild_itemdoc]
(@MarketID int)
returns @Tab table(MarketID int,[LevelDeep] int)
as
begin
   declare @Level int
   set @Level =1
   insert into @Tab select @MarketID,@Level; --加入 @MarketID
   while @@ROWCOUNT > 0
	begin
      set @Level = @Level + 1 --加一层,标识为子记录
		insert into @Tab (MarketID,LevelDeep)
			select a.classID , @Level --加入子记录
			from knowledge_class a 
			inner join @Tab b on a.parentID = b.MarketID 
		where b.LevelDeep = @Level - 1 and a.[type]='item'
   	end
delete from @Tab where LevelDeep=1
return
end
GO
/****** Object:  UserDefinedFunction [dbo].[fun_getChild_kingdeeContractClassID]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*金蝶分类分类子节点获取*/
create function [dbo].[fun_getChild_kingdeeContractClassID]
(@MarketID int)
returns @Tab table(MarketID int,[LevelDeep] int)
as
begin
   declare @Level int
   set @Level =1
   insert into @Tab select @MarketID,@Level; --加入 @MarketID
   while @@ROWCOUNT > 0
	begin
      set @Level = @Level + 1 --加一层,标识为子记录
		insert into @Tab (MarketID,LevelDeep)
			select a.id , @Level --加入子记录
			from kingdee_contract_class a 
			inner join @Tab b on a.parentID = b.MarketID 
		where b.LevelDeep = @Level - 1
   	end
delete from @Tab where LevelDeep=1
return
end
GO
/****** Object:  UserDefinedFunction [dbo].[fun_getChild_persondoc]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*个人文档子节点获取*/
CREATE function [dbo].[fun_getChild_persondoc]
(@MarketID int)
returns @Tab table(MarketID int,[LevelDeep] int)
as
begin
   declare @Level int
   set @Level =1
   insert into @Tab select @MarketID,@Level; --加入 @MarketID
   while @@ROWCOUNT > 0
	begin
      set @Level = @Level + 1 --加一层,标识为子记录
		insert into @Tab (MarketID,LevelDeep)
			select a.classID , @Level --加入子记录
			from knowledge_class a 
			inner join @Tab b on a.parentID = b.MarketID 
		where b.LevelDeep = @Level - 1 and a.[type]='doc' and a.[property]=1
   	end
delete from @Tab where LevelDeep=1
return
end
GO
/****** Object:  UserDefinedFunction [dbo].[fun_getChild_servicedoc]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*服务分类子节点获取*/
create function [dbo].[fun_getChild_servicedoc]
(@MarketID int)
returns @Tab table(MarketID int,[LevelDeep] int)
as
begin
   declare @Level int
   set @Level =1
   insert into @Tab select @MarketID,@Level; --加入 @MarketID
   while @@ROWCOUNT > 0
	begin
      set @Level = @Level + 1 --加一层,标识为子记录
		insert into @Tab (MarketID,LevelDeep)
			select a.classID , @Level --加入子记录
			from knowledge_class a 
			inner join @Tab b on a.parentID = b.MarketID 
		where b.LevelDeep = @Level - 1 and a.[type]='service'
   	end
delete from @Tab where LevelDeep=1
return
end
GO
/****** Object:  UserDefinedFunction [dbo].[fun_getChild_techdoc]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*个人文档子节点获取*/
create function [dbo].[fun_getChild_techdoc]
(@MarketID int)
returns @Tab table(MarketID int,[LevelDeep] int)
as
begin
   declare @Level int
   set @Level =1
   insert into @Tab select @MarketID,@Level; --加入 @MarketID
   while @@ROWCOUNT > 0
	begin
      set @Level = @Level + 1 --加一层,标识为子记录
		insert into @Tab (MarketID,LevelDeep)
			select a.classID , @Level --加入子记录
			from knowledge_class a 
			inner join @Tab b on a.parentID = b.MarketID 
		where b.LevelDeep = @Level - 1 and a.[type]='tech'
   	end
delete from @Tab where LevelDeep=1
return
end
GO
/****** Object:  UserDefinedFunction [dbo].[fun_getContractMergeResult]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE function [dbo].[fun_getContractMergeResult]
(@contractID int)
returns @Tab1 table(result int) 
as
begin
     declare @Level int
   declare @rowId int
   declare @Tab table(rowID int,refer_value varchar(4000))   
   declare @Tab2 table(refer_value varchar(4000))
   declare @TabLast table(rowID int,kingdee_contract_id int)
   insert into @Tab2
   select refer_value from kingdee_contract_merg where refer_value<>'||'; --加入 @MarketID
   --select @Level = count(*) from @Tab2
   select @Level = count(*) from (select refer_value from @Tab2 group by refer_value) a
   insert into @Tab 
   select ROW_NUMBER() Over(order by refer_value) as rowId,refer_value from @Tab2 group by refer_value; --加入 @MarketID
   insert into @TabLast 
   select ROW_NUMBER() Over(order by refer_value) as rowId,kingdee_contract_id from kingdee_contract_merg group by refer_value,kingdee_contract_id; --加入 @MarketID
   set @rowId =0
   while @rowId <= @Level
	begin
      set @rowId = @rowId+1;
      insert into @Tab1 
      select result from split((select refer_value from @Tab where rowId=@rowId)) where result not in (select kingdee_contract_id from @TabLast where rowID=@rowID) group by result ;
   	end
   	return
end
GO
/****** Object:  UserDefinedFunction [dbo].[fun_getContractResult]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE function [dbo].[fun_getContractResult]
(@contractID int)
returns @Tab1 table(result int) 
as
begin
     declare @Level int
   declare @rowId int
   declare @Tab table(rowID int,refer_value varchar(4000))   
   declare @Tab2 table(refer_value varchar(4000))
   insert into @Tab2
   select refer_value from kingdee_contract_refer where refer_value<>'||'; --加入 @MarketID
   --select @Level = count(*) from @Tab2
   select @Level = count(*) from (select refer_value from @Tab2 group by refer_value) a
   insert into @Tab 
   select ROW_NUMBER() Over(order by refer_value) as rowId,refer_value from @Tab2 group by refer_value; --加入 @MarketID
   set @rowId =0
   while @rowId <= @Level
	begin
      set @rowId = @rowId+1;
      insert into @Tab1 select result from split((select refer_value from @Tab where rowId=@rowId)) ;
   	end
   	return
end
GO
/****** Object:  UserDefinedFunction [dbo].[fun_getContractUpResult]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE function [dbo].[fun_getContractUpResult]
(@contractID int)
returns @Tab1 table(result int) 
as
begin
     declare @Level int
   declare @rowId int
   declare @Tab table(rowID int,refer_value varchar(4000))   
   declare @Tab2 table(refer_value varchar(4000))
   declare @TabLast table(rowID int,kingdee_contract_id int)
   insert into @Tab2
   select refer_value from kingdee_contract_up where refer_value<>'||'; --加入 @MarketID
   --select @Level = count(*) from @Tab2
   select @Level = count(*) from (select refer_value from @Tab2 group by refer_value) a
   insert into @Tab 
   select ROW_NUMBER() Over(order by refer_value) as rowId,refer_value from @Tab2 group by refer_value; --加入 @MarketID
   insert into @TabLast 
   select ROW_NUMBER() Over(order by refer_value) as rowId,kingdee_contract_id from kingdee_contract_up group by refer_value,kingdee_contract_id; --加入 @MarketID
   set @rowId =0
   while @rowId <= @Level
	begin
      set @rowId = @rowId+1;
      insert into @Tab1 
      select result from split((select refer_value from @Tab where rowId=@rowId)) where result not in (select kingdee_contract_id from @TabLast where rowID=@rowID) group by result ;
   	end
   	return
end
GO
/****** Object:  UserDefinedFunction [dbo].[fun_getHolidaySum]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


/*请假统计*/
CREATE function [dbo].[fun_getHolidaySum]
(
@beginDate datetime,--开始事件
@endDate	datetime,--结束时间
@nodeID		int,--组织机构ID
@sortID	int--0旷工 1正常请假 2非正常请假		
)
returns @Tab table(employeeID int,rep_val decimal(18,2),levels int,empName varchar(20),worklevName varchar(20),departmentID int,deptName varchar(20),posName varchar(20))
as
begin
  insert @Tab(employeeID,rep_val,levels,empName,worklevName,departmentID,deptName,posName)	
  select b.employeeID,sum(datediff(day,b.beginDate_fact2,endDate_fact2)+d) sumdays ,poslev,empName,worklevName,departmentID,deptName,posName
  from (select *,(case when round(days_fact,0)>days_fact then 0.5 else 1 end) d, (case when endDate_fact<=@endDate then endDate_fact else @endDate end) endDate_fact2,(case when beginDate_fact<@beginDate and endDate_fact>=@beginDate then @beginDate else  beginDate_fact end) as beginDate_fact2 from hr_holidayNew_v a 
  where sortID=@sortID 
and (employeeID=@nodeID or companyID=@nodeID or groupID=@nodeID or departmentID in (select ID from f_getDepParID(@nodeID)))
and endDate_fact>=@beginDate and endDate_fact<=@endDate and ((a.isall=1 and exists(select top 1 isagree,mainID,max(checklev) from common_checkOperation where checktype=601 and isagree=0 and mainID=a.holidayID group by isagree,mainID)) 
  or (isall=0 and not exists(select top 1 mainID from common_checkOperation where checktype=601 and isagree<>0 and  mainID=a.holidayID)))) b
  group by employeeID,poslev,empName,departmentID,deptName,worklevName,posName
return
end



GO
/****** Object:  UserDefinedFunction [dbo].[fun_getHolidaySum2]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*请假统计*/
CREATE function [dbo].[fun_getHolidaySum2]
(
@beginDate datetime,--开始事件
@endDate	datetime,--结束时间
@nodeID		int,--组织机构ID
@sortID	int--0旷工 1正常请假 2非正常请假		
)
returns @Tab table(employeeID int,rep_val decimal(18,2),levels int,empName varchar(20),worklevName varchar(20),departmentID int,deptName varchar(20),posName varchar(20))
as
begin
  insert @Tab(employeeID,rep_val,levels,empName,worklevName,departmentID,deptName,posName)	
select employeeID,sum(datediff(day,a.begindate2,a.endDate2)+a.d) sumdays,poslev,empName,worklevName,departmentID,deptName,posName
from(
select employeeID,userID,empName,worklevName,departmentID,deptName,poslev,posName,endDate,sortID_fact
,begindate
,(case when begindate<@begindate and begindate>=@begindate then @beginDate else beginDate end) begindate2
,(case when endDate<=@endDate  then endDate else @endDate end) endDate2,
(case when round(days,0)>days then 0.5 else 1 end) d
from hr_employeeHoliday_fact_v where  isUpdate=1  and (employeeID=@nodeID or companyID=@nodeID or groupID=@nodeID or departmentID in (select ID from f_getDepParID(@nodeID))) and   (enddate>=@begindate and begindate<=@enddate) and sortID_fact=@sortID) a
group by  employeeID,empName,worklevName,departmentID,deptName,poslev,posName,sortID_fact
return
end



GO
/****** Object:  UserDefinedFunction [dbo].[fun_GetHREmployeeSpecialty]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



create function [dbo].[fun_GetHREmployeeSpecialty]()
returns @temp table 
(
employeeID int,
SpecialtyID int,
cName varchar(100)
)
as begin 
	;WITH tempTable AS (SELECT employeeID, 
                         SpecialtyID = CAST(LEFT(Convert(varchar(max),SpecialtyIDList), CHARINDEX(',', Convert(varchar(max),SpecialtyIDList) + ',') - 1) AS varchar(max)) ,  
                         Split = CAST(STUFF(Convert(varchar(max),SpecialtyIDList) + ',', 1,  
                                            CHARINDEX(',', Convert(varchar(max),SpecialtyIDList) + ','), '') AS varchar(max))  
                FROM     hr_EmployeeSpecialty 
                UNION ALL  
                SELECT   employeeID, 
                         SpecialtyID = CAST(LEFT(Split, CHARINDEX(',', Split) - 1) AS varchar(max)) , 
                         Split = CAST(STUFF(Split, 1, CHARINDEX(',', Split), '') AS varchar(max)) 
                FROM     tempTable 
                WHERE    split > '' 
              )  
insert @temp
select a.employeeID,a.SpecialtyID,b.cName from tempTable a,sys_ass b where a.SpecialtyID=b.aID
and b.typeName='SpecialtyType' and b.isdel=0 option (MAXRECURSION 0)
return
end



GO
/****** Object:  UserDefinedFunction [dbo].[Fun_GetMarketChild]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*-------------------------------------------------------------------
名称：Fun_GetMarketChild
功能说明：获取所有子公司
使用方法：
	select * from dbo.Fun_GetMarketChild(10);
输入资料:
        @MarketID     0 为所有公司
注意事项:
原设计者: 陆俊
设立日期:2010/04/24
------------------------ 变更纪录明细-------------------------------
	变更日期		变更者		变 更 原 因
--------------------------------------------------------------------*/
CREATE function [dbo].[Fun_GetMarketChild]
(@MarketID int)
returns @Tab table(MarketID int,[LevelDeep] int) 
as
begin
	declare @Level int;
	set @Level =1;
	insert into @Tab select @MarketID,@Level; --加入 @MarketID

while @@ROWCOUNT > 0
	begin
		set @Level = @Level + 1 --加一层,标识为子记录
		insert into @Tab (MarketID,LevelDeep)
			select a.departmentID , @Level --加入子记录
			from hr_department  a 
			inner join @Tab b on a.parDepartment = b.MarketID 
		where b.LevelDeep = @Level - 1;
	end
return ;
end

GO
/****** Object:  UserDefinedFunction [dbo].[fun_getOverWorkSum]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


/*加班统计*/
create function [dbo].[fun_getOverWorkSum]
(
@beginDate datetime,--开始事件
@endDate	datetime,--结束时间
@nodeID		int,--组织机构ID
@sortID	int--加班类型		
)
returns @Tab table(employeeID int,rep_val decimal(18,2),levels int,empName varchar(20),worklevName varchar(20),departmentID int,deptName varchar(20),posName varchar(20))
as
begin
  insert @Tab(employeeID,rep_val,levels,empName,worklevName,departmentID,deptName,posName)	
  select b.employeeID,sum(datediff(day,b.beginDate_fact2,endDate_fact2)+d) sumdays ,poslev,empName,worklevName,departmentID,deptName,posName
  from (select *,(case when round(days_fact,0)>days_fact then 0.5 else 1 end) d, (case when endDate_fact<=@endDate then endDate_fact else @endDate end) endDate_fact2,(case when beginDate_fact<@beginDate and endDate_fact>=@beginDate then @beginDate else  beginDate_fact end) as beginDate_fact2 from hr_overWorkDayNew_v2 a 
  where reasons=@sortID 
and (employeeID=@nodeID or companyID=@nodeID or groupID=@nodeID or departmentID in (select ID from f_getDepParID(@nodeID)))
and endDate_fact>=@beginDate and endDate_fact<=@endDate and ((a.isall=1 and exists(select top 1 isagree,mainID,max(checklev) from common_checkOperation where checktype=603 and isagree=0 and mainID=a.otID group by isagree,mainID)) 
  or (isall=0 and not exists(select top 1 mainID from common_checkOperation where checktype=603 and isagree<>0 and  mainID=a.otID)))) b
  group by employeeID,poslev,empName,departmentID,deptName,worklevName,posName
return
end



GO
/****** Object:  UserDefinedFunction [dbo].[fun_getOverWorkSum_1]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*加班统计new*/
Create function [dbo].[fun_getOverWorkSum_1]
(
@timebeg datetime,--开始事件
@timeend_new	datetime,--结束时间
@orgID		int,--组织机构ID
@sortID	int--加班类型		
)
returns @Tab table(employeeID int,levels int,empName varchar(20),worklevName varchar(20),departmentID int,deptName varchar(20),posName varchar(20),rep_val decimal(18,2))
as
begin
 insert @Tab(employeeID,levels,empName,worklevName,departmentID,deptName,posName,rep_val)	
      select employeeID,levels,empName,worklevName,departmentID,deptName,posname,sum(datediff(day,a.begindate2,a.endDate2)+a.d) rep_val from(
	select employeeID,poslev as levels,empName,departmentID,deptName,worklevName,posName,days,endDate,begindate
	,(case when begindate<@timebeg and begindate>=@timebeg then @timebeg else beginDate end) begindate2
	,(case when endDate<=@timeend_new  then endDate else @timeend_new end) endDate2
	,(case when round(days,0)>days then 0.5 else 1 end) d
	from hr_overTime_info_v where reasons=@sortID and checkUserID>0 and typeID=2 and (employeeID=@orgID or companyID=@orgID or groupID=@orgID or departmentID in (select ID from f_getDepParID(@orgID)))
	and   (enddate>=@timebeg and begindate<=@timeend_new)) a
	group by  employeeID,levels,empName,departmentID,deptName,worklevName,posName
return
end
GO
/****** Object:  UserDefinedFunction [dbo].[fun_getPersonProductEndResult]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--------------------------------------------------------------------------------------------------------------------------------------------
create function [dbo].[fun_getPersonProductEndResult]
(@personID int)
returns @Tab1 table(result int) 
as
begin
	declare @output varchar(8000)
	declare @Tab table(username varchar(4000)) 
	INSERT INTO @Tab SELECT CONVERT(VARCHAR(40),productTypeID) FROM crm_relation_distribution u where checkStat<>2 and personID=@personID
	select  @output=coalesce(@output,'')+ username+'|'
	from @Tab
insert into @Tab1 
   select id result from (select aid as id,cName,pid as pNameID from sys_ass where typeName='saleType' and isdel=0)a where id not in (select distinct result from split((@output))) and pNameID not in (select distinct result from split((@output)))
   return
end


GO
/****** Object:  UserDefinedFunction [dbo].[fun_getPersonProductResult]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--------------------------------------------------------------------------------------------------------------------------------------------
CREATE function [dbo].[fun_getPersonProductResult]
(@personID int)
returns @Tab1 table(result int) 
as
begin
	declare @output varchar(8000)
	declare @Tab table(username varchar(4000)) 
	INSERT INTO @Tab SELECT CONVERT(VARCHAR(40),productTypeID) FROM crm_relation_distribution u where checkStat<>2 and personID=@personID
	select  @output=coalesce(@output,'')+ username+'|'
	from @Tab
insert into @Tab1 
   select distinct result from split((@output))
   return
end

GO
/****** Object:  UserDefinedFunction [dbo].[fun_getUserIDResult]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create function [dbo].[fun_getUserIDResult]
(
@useID int,
@type varchar(200)
)
returns @Tab1 table(result int) 
as
begin
  insert into @Tab1 
  select userID result from hr_userAll_v where departmentID in (
	select result from split((select deptIDList from crm_acc where accType=@type and accUserID=@useID)))
	insert into @Tab1
	select result from split((select userIDlist from crm_acc where accType=@type and accUserID=@useID))
	insert into @Tab1(result) values(@useID)

   	return
end
GO
/****** Object:  UserDefinedFunction [dbo].[Get_Crm_OwnerUsers]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--创建客户代表表值函数
create function [dbo].[Get_Crm_OwnerUsers]()
returns @temp table
(
	listID int,
	empName varchar(50),
	companyName varchar(100),
	posName varchar(50),
	email varchar(50),
	ownerUserID varchar(20)
)
as begin
	
	--表值函数
	;WITH tempTable AS (SELECT personID,pName,companyName,pTypeName,email,ownerUserID = CAST(LEFT(Convert(varchar(max),ownerUserIDList), CHARINDEX(',', Convert(varchar(max),ownerUserIDList) + ',') - 1) AS varchar(max)) ,  
							 Split = CAST(STUFF(Convert(varchar(max),ownerUserIDList) + ',', 1,  
												CHARINDEX(',', Convert(varchar(max),ownerUserIDList) + ','), '') AS varchar(max))  
					FROM     crm_person_v
					UNION ALL  
					SELECT   personID,pName,companyName,pTypeName,email,ownerUserID = CAST(LEFT(Split, CHARINDEX(',', Split) - 1) AS varchar(max)) , 
							 Split = CAST(STUFF(Split, 1, CHARINDEX(',', Split), '') AS varchar(max)) 
					FROM     tempTable 
					WHERE    split > '' 
				  ) 
	insert @temp
	select personID as listID,pName as empName,companyName,pTypeName as posName,email,ownerUserID from tempTable

return
end
GO
/****** Object:  UserDefinedFunction [dbo].[get_DeptString]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create function [dbo].[get_DeptString](@SourceSql varchar(800),@StrSeprate varchar(1))  
returns varchar(500)  
--实现split功能 的函数  
as   
begin  
    declare @i int  
    declare @deptId varchar(500)
    declare @temp varchar(500)
    select @temp = ''
    set @SourceSql=rtrim(ltrim(@SourceSql))  
    set @i=charindex(@StrSeprate,@SourceSql)  
      
    while @i>=1  
    begin  
        select @deptId = departmentID from hr_users_v where userID=(left(@SourceSql,@i-1))
        if @temp = ''
           set @temp = @deptId
        else
           set @temp = @temp + '|' + @deptId
        set @SourceSql=substring(@SourceSql,@i+1,len(@SourceSql)-@i)  
        set @i=charindex(@StrSeprate,@SourceSql)  
    end  
      
   if @SourceSql<>'\' 
         select @deptId = departmentID from hr_users_v where userID=(@SourceSql) 
         if @temp = ''
            set @temp = @deptId
         else
            set @temp = @temp + '|' + @deptId  
          
    return @temp  
end  
GO
/****** Object:  UserDefinedFunction [dbo].[GetemployeeJointlySignSet]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE function [dbo].[GetemployeeJointlySignSet]()
returns @temp table 
(
signID int,
signName varchar(50),
parSignID int,
checkUserID int,
isDel int,
regEmpID int,
userID int,
deptID int
)
as begin 
	;WITH tempTable AS (SELECT signID,signName,parSignID,checkUSerID,isDel,regEmpID, 
                         userID = CAST(LEFT(Convert(varchar(max),userIDList), CHARINDEX('|', Convert(varchar(max),userIDList) + '|') - 1) AS varchar(max)) ,  
                         Split = CAST(STUFF(Convert(varchar(max),userIDList) + '|', 1,  
                                            CHARINDEX('|', Convert(varchar(max),userIDList) + '|'), '') AS varchar(max))                   
                FROM     hr_employeeJointlySignSet where checkUserID>0
                UNION ALL  
                SELECT   signID,signName,parSignID,checkUSerID,isDel,regEmpID, 
                         userID = CAST(LEFT(Split, CHARINDEX('|', Split) - 1) AS varchar(max)) , 
                         Split = CAST(STUFF(Split, 1, CHARINDEX('|', Split), '') AS varchar(max))
                FROM     tempTable 
                WHERE    split > '' 
              ),
  tempTable1 AS (SELECT signID,
                         deptID = CAST(LEFT(Convert(varchar(max),deptIDList), CHARINDEX('|', Convert(varchar(max),deptIDList) + '|') - 1) AS varchar(max)) ,  
                         Split1 = CAST(STUFF(Convert(varchar(max),deptIDList) + '|', 1,  
                                            CHARINDEX('|', Convert(varchar(max),deptIDList) + '|'), '') AS varchar(max))                   
                FROM     hr_employeeJointlySignSet where checkUserID>0
                UNION ALL  
                SELECT   signID,
                         deptID = CAST(LEFT(Split1, CHARINDEX('|', Split1) - 1) AS varchar(max)) , 
                         Split1 = CAST(STUFF(Split1, 1, CHARINDEX('|', Split1), '') AS varchar(max)) 
                FROM     tempTable1 
                WHERE     split1>''
              ) 
     insert  @temp          
     SELECT  a.signID,signName,parSignID,checkUSerID,isDel,regEmpID,userID,deptID
     FROM tempTable a left join tempTable1 b on a.signID=b.signID option (MAXRECURSION 0)

return
end




GO
/****** Object:  UserDefinedFunction [dbo].[getEmpNameList]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*根据用户ID字符串‘|’隔开，获取用户empName*/
create function [dbo].[getEmpNameList]
(@userId_list varchar(1000))returns varchar(1000)
as
begin
declare @aa varchar(1000)
set @aa=''
 select @aa=@aa+empName+',' from hr_userAll_v where userID
in (select result from split(@userId_list))

if @aa<>''
set @aa=substring(@aa,1,len(@aa)-1)
return @aa
end

GO
/****** Object:  UserDefinedFunction [dbo].[getWeekType]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE function [dbo].[getWeekType](@day Datetime)
returns int
as
begin
	declare @days int, @weekType int,@weekTypeReference DateTime
	select top 1 @weekTypeReference=weekTypeReference from workattendance_clockinout_reference
	set @days =datediff(day,@weekTypeReference,@day)
	if(@days%7=0)
	begin
		set @weekType= (@days / 7) % 2
	end else begin
		set @weekType =((7 - @days%7 + @days)/7) % 2
	end
	return abs(@weekType)
end
GO
/****** Object:  UserDefinedFunction [dbo].[Getworkattendance_clockinout_Check]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE function [dbo].[Getworkattendance_clockinout_Check]()
returns @temp table(
checkID int,
infoID int
,isAll int,
isOrder int,
checklev int,
checkuserId int,
checkDate datetime,
isAgree int,
checktype int
) as begin
	;WITH tempTable AS (
		SELECT checkID,isAll,isOrder, 
		infoID = CAST(LEFT(Convert(varchar(max),infoIDList), CHARINDEX(',', Convert(varchar(max),infoIDList) + ',') - 1) AS varchar(max)) ,  
		Split = CAST(STUFF(Convert(varchar(max),infoIDList) + ',', 1,  
						CHARINDEX(',', Convert(varchar(max),infoIDList) + ','), '') AS varchar(max))  
		FROM     workattendance_clockinout_Check
		UNION ALL  
		SELECT checkID,isAll,isOrder, 
		infoID = CAST(LEFT(Split, CHARINDEX(',', Split) - 1) AS varchar(max)) , 
		Split = CAST(STUFF(Split, 1, CHARINDEX(',', Split), '') AS varchar(max)) 
		FROM     tempTable 
		WHERE    split > ''
	) 
	Insert into @temp SELECT checkID,infoID,isAll,isOrder,checklev,checkuserId,checkDate,isAgree,checktype FROM tempTable a
	left join common_checkOperation b on a.checkID=b.mainID and (checktype=406 or checktype=407) option (MAXRECURSION 0) 
return end 
GO
/****** Object:  UserDefinedFunction [dbo].[Getworkattendance_holiday_plan]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE function [dbo].[Getworkattendance_holiday_plan](@startTime datetime,@endTime datetime)
returns @temp table 
(
holidayPlanID int,
holidayPlanName varchar(50),
startTime datetime,
endTime datetime,
planDayStatus int,
planDayStatusName varchar(50),
employeeID int,
empName varchar(50)
)
as begin 
	;WITH tempTable AS (SELECT holidayPlanID,holidayPlanName,startTime,endTime,planDayStatus,planDayStatusName, 
                         employeeID = CAST(LEFT(Convert(varchar(max),holdEmployeeIDList), CHARINDEX(',', Convert(varchar(max),holdEmployeeIDList) + ',') - 1) AS varchar(max)) ,  
                         Split = CAST(STUFF(Convert(varchar(max),holdEmployeeIDList) + ',', 1,  
                                            CHARINDEX(',', Convert(varchar(max),holdEmployeeIDList) + ','), '') AS varchar(max))  
                FROM     workattendance_holiday_plan where startTime<=@endTime and endTime>=@startTime 
                UNION ALL  
                SELECT   holidayPlanID,holidayPlanName,startTime,endTime,planDayStatus,planDayStatusName, 
                         employeeID = CAST(LEFT(Split, CHARINDEX(',', Split) - 1) AS varchar(max)) , 
                         Split = CAST(STUFF(Split, 1, CHARINDEX(',', Split), '') AS varchar(max)) 
                FROM     tempTable 
                WHERE    split > '' 
              ) 
,tempTable1 AS (SELECT holidayPlanID, 
                         deptID = CAST(LEFT(Convert(varchar(max),holdDeptIDList), CHARINDEX('|', Convert(varchar(max),holdDeptIDList) + '|') - 1) AS varchar(max)) ,  
                         Split1 = CAST(STUFF(Convert(varchar(max),holdDeptIDList) + '|', 1,  
                                            CHARINDEX('|', Convert(varchar(max),holdDeptIDList) + '|'), '') AS varchar(max))  
                FROM     workattendance_holiday_plan where startTime<=@endTime and endTime>=@startTime 
                UNION ALL  
                SELECT   holidayPlanID,
                         deptID = CAST(LEFT(Split1, CHARINDEX('|', Split1) - 1) AS varchar(max)) , 
                         Split1 = CAST(STUFF(Split1, 1, CHARINDEX('|', Split1), '') AS varchar(max)) 
                FROM     tempTable1
                WHERE    split1 > '' 
              ) 
insert @temp
select distinct holidayPlanID,holidayPlanName,startTime,endTime,planDayStatus,planDayStatusName,b.employeeID,b.empName from
(
select a.holidayPlanID,holidayPlanName,startTime,endTime,planDayStatus,planDayStatusName,employeeID,b.deptID 
from tempTable a left join tempTable1 b on a.holidayPlanID= b.holidayPlanID )
a left join hr_employee b on a.employeeID=b.employeeID or a.deptID=b.departmentID option (MAXRECURSION 0)

return
end


GO
/****** Object:  UserDefinedFunction [dbo].[GetWorkAttendanceDay]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE function [dbo].[GetWorkAttendanceDay] --获取考勤统计报表
(
	@startTime datetime,
	@endTime datetime,
	@orgID int
)
returns @temp table 
(
employeeID int,
empName varchar(50),
userID int,
companyID int,
groupID int,
parDepartment int,
departmentID int,
deptname varchar(100),
days datetime,
weekdays int,
states int,
daystate int,
statusName varchar(10)
)
as begin
	;
with temp as(select convert(datetime,@startTime) days,
Datepart(dw, convert(datetime,@startTime)  + @@DateFirst - 1) as weekdays)
,n as
(
select days,Datepart(dw, days + @@DateFirst - 1) as weekdays from temp
union all
select n.days+1,Datepart(dw, n.days+1 + @@DateFirst - 1) as weekdays from n 
where n.days<convert(datetime,@endTime)
)
insert @temp
select a.empID as employeeID,empName,a.userID,a.companyID,a.groupID,a.parDepartment,a.departmentID,a.deptname,
days,weekdays,a.states,daystate=case when b.planDayStatus>=0 then b.planDayStatus else a.states end,
statusName=case when b.statusName<>'' then b.statusName
else case a.states when 0 then '' else '休' end end from (
select a.*,
states=case when weekStrategy=1 and (select dbo.getWeekType(a.days))=1 then
case weekdays when 1 then a.mondayStatus1
when 2 then a.tuesdayStatus1 when 3 then a.wednesdayStatus1
when 4 then a.thursdayStatus1 when 5 then a.fridayStatus1 when 6 then a.saturdayStatus1
when 7 then a.sundayStatus1 end 
else
case weekdays when 1 then a.mondayStatus0
when 2 then a.tuesdayStatus0 when 3 then a.wednesdayStatus0
when 4 then a.thursdayStatus0 when 5 then a.fridayStatus0 when 6 then a.saturdayStatus0
when 7 then a.sundayStatus0 end 
end from (
select a.*,n.*,Row_NUMBER() over(partition by a.empID,n.days order by a.empID,n.days) as rowsid from n,
(select * from Getworkattendance_clockInout_strategy(@startTime,@endTime) 
where (companyID=@orgID or groupID=@orgID or parDepartment=@orgID or departmentID=@orgID or empID=@orgID
or empID in (select employeeID from hr_employeeVicePosition_v 
 where companyID=@orgID or groupID=@orgID or parDepartment=@orgID or departmentID=@orgID))
) a where n.days between a.beginDate and a.endDate
)a where rowsid=1
)a 
left join (select employeeID,startTime,endTime,planDayStatus,statusName=case planDayStatus when 0 then '班' else '休' end from Getworkattendance_holiday_plan(@startTime,@endTime))b
on a.empID=b.employeeID 
and a.days between Convert(varchar(10),b.startTime) and Convert(varchar(10),b.endTime)
 option (MAXRECURSION 32767)

return
end
 




GO
/****** Object:  UserDefinedFunction [dbo].[imp_checkSupp]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--处理函数
CREATE FUNCTION [dbo].[imp_checkSupp]    
(      
@str1 VARCHAR(800) ,      
@str2 VARCHAR(800)    )
RETURNS INT
AS     
BEGIN        
DECLARE @i INT        
SELECT  @i = 0 , @str1 = '|' + @str1 + '|'        
WHILE CHARINDEX('|', @str2) > 0             
SELECT  @i = @i + CASE WHEN CHARINDEX('|' + LEFT(@str2,CHARINDEX('|', @str2) - 1)+ '|', @str1) > 0 THEN 1                           
ELSE 0                      
END ,                    
@str2 = STUFF(@str2, 1, CHARINDEX('|', @str2), '')        
SET @i = @i + CASE WHEN CHARINDEX('|' + @str2 + '|', @str1) > 0 THEN 1                           
ELSE 0                      
END        
RETURN(@i)    
END

GO
/****** Object:  UserDefinedFunction [dbo].[is_exists]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*判断两个字符是否有相同的部门或人员*/
CREATE function [dbo].[is_exists]
(
@str1 varchar(max),@str2 varchar(max)
)returns int
as
begin
declare @r_c int
set @r_c=0
select @r_c=count(0) from split(@str1) a,split(@str2) b
where a.result=b.result
return @r_c
end
GO
/****** Object:  UserDefinedFunction [dbo].[Split]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE function [dbo].[Split](@str nvarchar(max))
returns @tmp table(Result varchar(100))
as 
begin
declare @i int
set @str=rtrim(ltrim(@str)) --去掉前后空格
set @i=charindex('|',@str)
while @i>=1
begin
if @i>1 and (not exists(select top 1 * from @tmp where Result=left(@str,@i-1)))
insert @tmp values(left(@str,@i-1))
set @str=substring(@str,@i+1,len(@str)-@i)
set @i=charindex('|',@str)
end
if len(@str)>0 and (not exists(select top 1 * from @tmp where Result=@str))
insert @tmp values(@str)
return
end
GO
/****** Object:  UserDefinedFunction [dbo].[Split1]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE function [dbo].[Split1](@str nvarchar(max))
returns @tmp1 table(Result varchar(100))
as 
begin
set @str=replace(@str,'|',',')
declare @i int
set @str=rtrim(ltrim(@str)) --去掉前后空格
set @i=charindex(',',@str)
while @i>=1
begin
if @i>1
insert @tmp1 values(left(@str,@i-1))
set @str=substring(@str,@i+1,len(@str)-@i)
set @i=charindex(',',@str)
end
if len(@str)>0
insert @tmp1 values(@str)
return
end




GO
/****** Object:  UserDefinedFunction [dbo].[Split2]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create function [dbo].[Split2](@str nvarchar(4000))
returns @tmp1 table(orderID int NOT NULL IDENTITY(1,1),Result varchar(100))
as 
begin
declare @i int
set @str=rtrim(ltrim(@str)) --去掉前后空格
set @i=charindex(',',@str)
while @i>=1
begin
if @i>1
insert @tmp1 values(left(@str,@i-1))
set @str=substring(@str,@i+1,len(@str)-@i)
set @i=charindex(',',@str)
end
if len(@str)>0
insert @tmp1 values(@str)
return
end
GO
/****** Object:  UserDefinedFunction [dbo].[Split3]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE function [dbo].[Split3](@str nvarchar(4000))
returns @tmp1 table(Result varchar(100))
as 
begin
set @str=replace(@str,'|',',')
declare @i int
set @str=rtrim(ltrim(@str)) --去掉前后空格
set @i=charindex(',',@str)
while @i>=1
begin
if @i>1
BEGIN
IF left(@str,@i-1)!=''
BEGIN
insert @tmp1 values(left(@str,@i-1))
END
END
set @str=substring(@str,@i+1,len(@str)-@i)
set @i=charindex(',',@str)
end
if len(@str)>0
insert @tmp1 values(@str)
return
end




GO
/****** Object:  UserDefinedFunction [dbo].[Split4]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE function [dbo].[Split4](@str nvarchar(max))
returns @tmp table(Result varchar(100))
as 
begin
declare @i int
set @str=rtrim(ltrim(@str)) --去掉前后空格
set @i=charindex('，',@str)
while @i>=1
begin
if @i>1 and (not exists(select top 1 * from @tmp where Result=left(@str,@i-1)))
insert @tmp values(left(@str,@i-1))
set @str=substring(@str,@i+1,len(@str)-@i)
set @i=charindex('，',@str)
end
if len(@str)>0 and (not exists(select top 1 * from @tmp where Result=@str))
insert @tmp values(@str)
return
end

GO
/****** Object:  UserDefinedFunction [dbo].[StringRemove]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create function [dbo].[StringRemove](@str nvarchar(2000)) 
returns varchar(2000) 
as 
begin 
declare @result nvarchar(2000),@temp nvarchar(1000) 
set @result='' 
set @temp='' 
while(charindex(',',@str)<>0) 
begin 
set @temp=substring(@str,1,charindex(',',@str)) 
if(charindex(@temp,@result)<=0) 
set @result=@result+@temp 
set @str=stuff(@str,1,charindex(',',@str),'') 
end 
return @result 
end 

GO
/****** Object:  UserDefinedFunction [dbo].[f_getVicePositionDepParID]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create FUNCTION [dbo].[f_getVicePositionDepParID] (@ID int)
RETURNS TABLE 
AS
RETURN 
(
with tempTable(deptID,level) as 
(
	select deptID,2 as level from hr_employeeVicePosition_v
	where departmentID=@ID 
	union all
	select a.deptID,b.level+1 as level from hr_employeeVicePosition_v a
	inner join tempTable b on b.deptID= a.departmentID
)
select top (select COUNT(deptID)+1 from tempTable) * from(
select @ID as deptID,1 as level
union
select * from tempTable ) a order by level
);


GO
/****** Object:  UserDefinedFunction [dbo].[getAllCheckInfoBycheckUserID]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 create FUNCTION [dbo].[getAllCheckInfoBycheckUserID] (@checktype int,@checkUserID int)
returns table 
as 
return
(
select distinct employeeID from hr_userAll_v a,
(select * from common_checkinfo where checktype=@checktype and checkUserID=@checkUserID) b 
where (a.employeeID=b.id and b.idtype=0) or (a.departmentID=b.id and b.idtype=1) 
or (a.companyID=b.id and b.idtype=1) 
or (a.groupID=b.id and b.idtype=1) 
or (a.parDepartment=b.id and b.idtype=1)
)
GO
/****** Object:  UserDefinedFunction [dbo].[getHoliday]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE function [dbo].[getHoliday](@startTime datetime,@endTime datetime) 
RETURNS TABLE 
AS
RETURN 
( 
select b.* from workattendance_clockinout_info_v a ,(
select b.userID,a.days,sortID_fact=case reasonID_fact when 0 then 0 else sortID_fact end,reasonID_fact,
holiday_day= case when a.days=b.endDate then
case when hours_fact>0 then 0 else 1 end else 1 end,
holiday_Hours= case when a.days=b.endDate then hours_fact else 0 end from GetWorkAttendanceDay(@startTime,@endTime,1) a left join
(
select userID,days,hours_fact,sortID_fact=case reasonID_fact when 0 then 0 else sortID_fact end,reasonID_fact,employeeID,beginDate,endDate from hr_employeeHoliday_fact_v 
where isUpdate=1 and beginDate<=@endTime and endDate>=@startTime
union
(
select userID,days= case handleType when 5 then 1 else 0 end,hours as hours_fact,
selectType as sortID_fact,selectReason as reasonID_fact,employeeID,infoDate as beginDate,infoDate as endDate from workattendance_clockinout_CheckDetail a
inner join (
select a.*,b.userID,b.employeeID,b.infodate from(
select max(detailID) as detailID,infoID from workattendance_clockinout_CheckDetail 
where handleType=1 or handleType=5
group by infoID) a,workattendance_clockinout_info_v b
where infodate between @startTime and @endTime 
and probation<=@endTime and leave<>1 and (leaveDate='1900-01-01' or leaveDate>=@startTime) 
and a.infoID=b.infoID) b
on a.detailID = b.detailID)
)b on a.days between b.beginDate and b.endDate  and a.employeeID=b.employeeID
where beginDate<=@endTime and endDate>=@startTime 
)b where infodate between @startTime and @endTime and a.userID=b.userID and a.infoDate = b.days
);










GO
/****** Object:  UserDefinedFunction [dbo].[getOver]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE function [dbo].[getOver](@startTime datetime,@endTime datetime) 
RETURNS TABLE 
AS
RETURN 
( 
select b.* from workattendance_clockinout_info_v a ,(
select b.userID,a.days,factreasons,
over_day= case when a.days=b.beginDate then
case when hours_fact>0 then 0 else 1 end else 1 end,
over_Hours= case when a.days=b.endDate then hours_fact else 0 end from GetWorkAttendanceDay(@startTime,@endTime,1) a left join
(
select userID,factDays,hours_fact,factreasons,employeeID,convert(datetime,factBegindate,121) as beginDate,convert(datetime,factEndDate,121) as endDate from hr_overTime_info_v2 where updateState='已确认'
and convert(datetime,factBegindate,121)<=@endTime and convert(datetime,factEndDate,121)>=@startTime
union all
select userID,0 as factDays,hours as hours_fact,
SelectReason as factreasons,employeeID,infoDate as beginDate,infoDate as endDate from workattendance_clockinout_CheckDetail a
inner join (
select a.*,b.userID,b.employeeID,b.infodate from(
select max(detailID) as detailID,infoID from workattendance_clockinout_CheckDetail 
where handleType=2
group by infoID) a,workattendance_clockinout_info_v b
where a.infoID=b.infoID and infodate between @startTime and @endTime 
and probation<=@endTime and leave<>1 and (leaveDate='1900-01-01' or leaveDate>=@startTime)) b
on a.detailID = b.detailID
)b on a.days between b.beginDate and b.endDate  and a.employeeID=b.employeeID
where beginDate<=@endTime and endDate>=@startTime 
)b where a.userID=b.userID and a.infoDate = b.days
and infodate between @startTime and @endTime
);










GO
/****** Object:  UserDefinedFunction [dbo].[Getworkattendance_clockInout_strategy]    Script Date: 2016/2/3 星期三 下午 14:25:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE function [dbo].[Getworkattendance_clockInout_strategy](@startTime datetime,@endTime datetime)
returns table 
as
return
(
select  top 100 percent a.employeeID as empID,a.empName,a.probation,a.leaveDate,a.empCardID,
a.leave,a.companyID,a.groupID,a.parDepartment,a.departmentID,a.deptname,b.*
,c.userID,d.checkUserList
from hr_employee_v a left join
workattendance_clockinout_strategy_employee_new b
on (a.employeeID=b.employeeID and idtype=1) or (a.departmentID=b.employeeID and idtype=2)
left join hr_users c on a.employeeID=c.uid
left join (
select userID,checkUserList= stuff((select '|' + Convert(varchar(10),checkUserID) from 
(select b.userID,c.* from hr_userAll_v b
left join common_checkinfo c on checktype=407 and ((b.userID=c.id and c.IDType=0) or b.departmentID=c.id and c.IDType=1)
where b.leave=0)as a where a.userID = b.userID for xml path('')),1,1,'') from hr_userAll_v as b where leave=0
)d on c.userID=d.userID
where leave<>1 and probation<=@endTime and (leaveDate='1900-01-01' or leaveDate>@startTime)
and b.beginDate<=@endTime and b.endDate>=@startTime
order by a.employeeID,b.beginDate desc
)




GO
