
-- 插入 T_TaskInfo 的额外操作
IF EXISTS (SELECT * FROM SYSOBJECTS WHERE id = OBJECT_ID(N'[sp_AddTaskInfoExtra]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
    DROP PROC [sp_AddTaskInfoExtra]
Go
Create Proc sp_AddTaskInfoExtra(
	@mainId int
) 
As
Begin
	DECLARE @taskId INT;
	IF EXISTS (SELECT name FROM sysobjects WHERE name = '#tempTask')
		DROP TABLE #tempTask
	CREATE TABLE #tempTask (
		ID INT IDENTITY(1,1),
		TaskId INT
	)
	INSERT INTO #tempTask(TaskId) SELECT Id FROM T_TaskInfo WHERE MainTaskInfoId = @mainId ORDER BY Id; 
	DECLARE @i INT;
    DECLARE @j INT; 
    SET @i = 0;  
    SELECT @j = MAX(ID) FROM #tempTask; 
    WHILE @i < @j 
    BEGIN  
        SET @i = @i+1;   
        SELECT @taskId = TaskId from #tempTask where ID = @i;
		INSERT INTO T_TaskAttribute(TaskInfoId, AttributeName, AttributeType)
			SELECT @taskId AS TaskInfoId, a.AttributeName, a.AttributeType FROM F_Split((SELECT AttributeIds FROM T_TaskInfo WHERE Id=@taskId), ',') AS s 
				INNER JOIN T_Attribute a ON s.value = a.Id;
		INSERT INTO T_TaskPlanStep(TaskInfoId, StepName, StepType, StepOptionIds, SortIndex, RelationId, SuggestValue, SuggestIds, ResultShowFlag)
			SELECT @taskId AS TaskInfoId, a.StepName, a.StepType, a.StepOptionIds, a.SortIndex,a.RelationId, a.SuggestValue, a.SuggestIds, a.ResultShowFlag
				FROM F_Split((SELECT PlanStepIds FROM T_TaskInfo WHERE Id=@taskId), ',') AS s 
				INNER JOIN T_PlanStep a ON s.value = a.Id;
    END
	DROP TABLE #tempTask;
	Exec sp_UpdateTaskInfo @mainId;
	UPDATE T_TaskInfo SET OriginalId = Id WHERE MainTaskInfoId = @mainId;
	UPDATE T_TaskAttribute SET OriginalId = ID WHERE OriginalId is null;
	UPDATE T_TaskPlanStep SET OriginalId = ID WHERE OriginalId is null; 
END
EXEC sp_AddTaskInfoExtra 1

-- 在 T_TaskInfo 表上创建触发器
-- Insert 操作时触发
-- 变量 inserted 是只读的结果集，表示插入数据
IF OBJECT_ID(N'AddTaskInfoTrigger', N'TR') IS NOT NULL  
    DROP TRIGGER AddTaskInfoTrigger;  
GO 
CREATE TRIGGER AddTaskInfoTrigger  
ON T_TaskInfo
FOR INSERT 
AS  
DECLARE @taskId INT;
IF @@ROWCOUNT = 1 --插入单行数据
BEGIN 
	SELECT @taskId = Id FROM inserted;
	UPDATE T_TaskInfo SET OriginalId = Id WHERE Id = @taskId;
	INSERT INTO T_TaskAttribute(TaskInfoId, AttributeName, AttributeType)
		SELECT @taskId AS TaskInfoId, a.AttributeName, a.AttributeType FROM F_Split((SELECT AttributeIds FROM T_TaskInfo WHERE Id=@taskId), ',') AS s 
			INNER JOIN T_Attribute a ON s.value = a.Id;
	INSERT INTO T_TaskPlanStep(TaskInfoId, StepName, StepType, StepOptionIds, SortIndex, RelationId, SuggestValue, SuggestIds, ResultShowFlag)
		SELECT @taskId AS TaskInfoId, a.StepName, a.StepType, a.StepOptionIds, a.SortIndex,a.RelationId, a.SuggestValue, a.SuggestIds, a.ResultShowFlag
			FROM F_Split((SELECT AttributeIds FROM T_TaskInfo WHERE Id=@taskId), ',') AS s 
			INNER JOIN T_PlanStep a ON s.value = a.Id;
END  
ELSE --插入多行数据
BEGIN  
	DECLARE @mainId INT;
	SELECT TOP 1 @mainId = MainTaskInfoId FROM inserted;
	IF EXISTS (SELECT name FROM sysobjects WHERE name = '#tempTask')
		DROP TABLE #tempTask
	CREATE TABLE #tempTask (
		ID INT IDENTITY(1,1),
		TaskId INT
	)
	INSERT INTO #tempTask(TaskId) SELECT Id FROM inserted ORDER BY Id; 
	DECLARE @i INT;
    DECLARE @j INT; 
    SET @i = 0;  
    SELECT @j = MAX(ID) FROM #tempTask; 
    WHILE @i < @j 
    BEGIN  
        SET @i = @i+1;   
        SELECT @taskId = TaskId from #tempTask where ID = @i;
        UPDATE T_TaskInfo SET OriginalId = Id WHERE Id = @taskId;
		INSERT INTO T_TaskAttribute(TaskInfoId, AttributeName, AttributeType)
			SELECT @taskId AS TaskInfoId, a.AttributeName, a.AttributeType FROM F_Split((SELECT AttributeIds FROM T_TaskInfo WHERE Id=@taskId), ',') AS s 
				INNER JOIN T_Attribute a ON s.value = a.Id;
		INSERT INTO T_TaskPlanStep(TaskInfoId, StepName, StepType, StepOptionIds, SortIndex, RelationId, SuggestValue, SuggestIds, ResultShowFlag)
			SELECT @taskId AS TaskInfoId, a.StepName, a.StepType, a.StepOptionIds, a.SortIndex,a.RelationId, a.SuggestValue, a.SuggestIds, a.ResultShowFlag
				FROM F_Split((SELECT AttributeIds FROM T_TaskInfo WHERE Id=@taskId), ',') AS s 
				INNER JOIN T_PlanStep a ON s.value = a.Id;
    END
	DROP TABLE #tempTask;
	Exec sp_UpdateTaskInfo @mainId;
END; 
UPDATE T_TaskAttribute SET OriginalId = ID
	FROM T_TaskAttribute a WHERE a.OriginalId is null;
UPDATE T_TaskPlanStep SET OriginalId = ID
	FROM T_TaskPlanStep a WHERE a.OriginalId is null; 
GO

-- 在 T_TaskInfo 表上创建触发器
-- Delete 操作时触发
-- 变量 deleted 是只读的结果集，表示删除数据
IF OBJECT_ID(N'DelTaskInfoTrigger', N'TR') IS NOT NULL  
    DROP TRIGGER DelTaskInfoTrigger;  
GO 
CREATE TRIGGER DelTaskInfoTrigger  
ON T_TaskInfo
AFTER DELETE
AS
BEGIN
	DELETE FROM T_TaskAttribute WHERE TaskInfoId IN (SELECT Id FROM deleted);
	DELETE FROM T_TaskPlanStep WHERE TaskInfoId IN (SELECT Id FROM deleted);
END
GO

-- 触发器测试
INSERT INTO T_TaskInfo(PlanName, PlanLevel, PlanDescription, AttributeIds, PlanStepIds) VALUES
('Test1', -1, 'Test', '1,2', '1,2'),
('Test2', -1, 'Test', '1,2', '1,2'),
('Test3', -1, 'Test', '1,2', '1,2')
DELETE T_TaskInfo WHERE PlanName LIKE 'Test%'
DELETE T_TaskInfo WHERE MainTaskInfoId = 32
SELECT * FROM T_TaskInfo 
SELECT * FROM T_TaskAttribute
SELECT * FROM T_TaskPlanStep
GO

-- 递归
with plans as (
        SELECT Id, ParentId,AttributeIDs,version FROM T_Plan  WHERE version=(select isnull(max(version-0),0) from T_Plan)
        UNION ALL
        SELECT plans.Id, g.ParentId,g.AttributeIDs,g.version FROM T_Plan g INNER JOIN plans
        ON g.Id=plans.ParentId and g.version=plans.version and plans.AttributeIDs is null
      )
      update T_Plan set AttributeIds = s.AttributeIDs
      from T_Plan t1 inner join plans s on t1.Id = s.Id and s.AttributeIDs is not null

-- 分割字符串函数
DROP FUNCTION [dbo].[F_Split]
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
SELECT 27 As Id, s.value FROM F_Split((SELECT t.AttributeIdS FROM T_TaskInfo t WHERE t.Id = 27), ',') As s 
Go

update T_TaskInfo set ParentId = tb.ParentId from T_TaskInfo t
	inner join T_TaskInfoBak tb on t.Id = tb.Id
-- 更新父子关系
IF EXISTS (SELECT * FROM SYSOBJECTS WHERE id = OBJECT_ID(N'[sp_UpdateTaskInfo]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
    DROP PROC [sp_UpdateTaskInfo]
Go
Create Proc sp_UpdateTaskInfo(
	@mainId INT
)
As
Begin
	update tc set ParentId = tf.Id from T_TaskInfo tc
		inner join T_TaskInfo tf on tc.TempParentId = tf.TempId
		where tc.MainTaskInfoId = @mainId
		and tf.MainTaskInfoId = @mainId; 
	update T_TaskInfo set ParentId = 0 
		where MainTaskInfoId = @mainId
		and ParentId is null;
End
GO
Exec sp_UpdateTaskInfo 25;

select * into T_TaskInfoBak from T_TaskInfo
select * from T_TaskInfoBak order by Id

-- 添加TaskAttribute
IF EXISTS (SELECT * FROM SYSOBJECTS WHERE id = OBJECT_ID(N'[sp_AddTaskAttribute]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
    DROP PROC [sp_AddTaskAttribute]
Go
Create Proc sp_AddTaskAttribute(
	@beginIndex int,
	@endIndex int
) 
As
Begin
	declare @taskId int;
	set @taskId = @beginIndex;
	while @taskId >= @beginIndex and @taskId <= @endIndex
	begin
		insert into T_TaskAttribute(TaskInfoId, AttributeName, AttributeType)
		select @taskId As TaskInfoId, a.AttributeName, a.AttributeType FROM F_Split((SELECT t.AttributeIds FROM T_TaskInfo t WHERE t.Id = @taskId), ',') As s 
			inner join T_Attribute a on s.value = a.Id
		set @taskId = @taskId+1;
	end
	update T_TaskAttribute set OriginalId = ID
		from T_TaskAttribute a where a.OriginalId is null
End
EXEC sp_AddTaskAttribute 4305,4318
Go

-- 添加TaskPlanStep
IF EXISTS (SELECT * FROM SYSOBJECTS WHERE id = OBJECT_ID(N'[sp_AddTaskPlanStep]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
    DROP PROC [sp_AddTaskPlanStep]
Go
Create Proc sp_AddTaskPlanStep(
	@beginIndex int,
	@endIndex int
) 
As
Begin
	declare @taskId int;
	set @taskId = @beginIndex;
	while @taskId >= @beginIndex and @taskId <= @endIndex
	begin
		insert into T_TaskPlanStep(TaskInfoId, StepName, StepType, StepOptionIds, SortIndex, RelationId, SuggestValue, SuggestIds, ResultShowFlag)
		select @taskId As TaskInfoId, a.StepName, a.StepType, a.StepOptionIds, a.SortIndex,a.RelationId, a.SuggestValue, a.SuggestIds, a.ResultShowFlag
			FROM F_Split((SELECT t.PlanStepIds FROM T_TaskInfo t WHERE t.Id = @taskId), ',') As s 
			inner join T_PlanStep a on s.value = a.Id
		set @taskId = @taskId+1;
	end
	update T_TaskPlanStep set OriginalId = ID
		from T_TaskPlanStep a where a.OriginalId is null
End
EXEC sp_AddTaskPlanStep 4305,4318

-- 清空初始化数据
TRUNCATE TABLE T_Attribute
TRUNCATE TABLE T_OperateStep
TRUNCATE TABLE T_OptionType
TRUNCATE TABLE T_Option
TRUNCATE TABLE T_Plan
TRUNCATE TABLE T_PlanStep
TRUNCATE TABLE T_PlanStepOption
TRUNCATE TABLE T_Product
TRUNCATE TABLE T_RefLink
TRUNCATE TABLE T_SuggestInfo
TRUNCATE TABLE T_WorkShop
TRUNCATE TABLE T_WorkShopUserMapping
-- 清空业务数据
TRUNCATE TABLE T_CheckUnit
TRUNCATE TABLE T_Device
TRUNCATE TABLE T_Engineer
TRUNCATE TABLE T_Group
TRUNCATE TABLE T_Image
TRUNCATE TABLE T_MailTask
TRUNCATE TABLE T_MainTaskInfo
TRUNCATE TABLE T_MainTaskVBA
TRUNCATE TABLE T_Manufacture
TRUNCATE TABLE T_PdfContent
TRUNCATE TABLE T_SparePart
TRUNCATE TABLE T_TaskAttribute
TRUNCATE TABLE T_TaskBackUp
TRUNCATE TABLE T_TaskInfo
TRUNCATE TABLE T_TaskNumber
TRUNCATE TABLE T_TaskPlanStep
TRUNCATE TABLE T_TaskRelation
TRUNCATE TABLE T_TaskRemark
TRUNCATE TABLE T_TaskSparePart
TRUNCATE TABLE T_TaskTool


SELECT * FROM T_ArchiveStatus

SELECT * FROM T_Attribute
	WHERE AttributeType=1

SELECT * FROM T_CheckUnit
WHERE MainTaskInfoId = 3173

SELECT * FROM T_Device

SELECT * FROM T_Engineer 
	WHERE 1 = 1
	AND ParentMainTaskInfoId = 29

SELECT * FROM T_Group
	ORDER BY Id

SELECT * FROM T_HiddenInfo

SELECT * FROM T_Image
delete T_Image where Id not in(select min(id) id from T_Image group by TaskInfoId,ImageName)
insert into T_Image values
(375, 'Desert.jpg', 1),
(375, 'Desert.jpg', 1),
(375, 'Desert.jpg', 1),
(375, 'Chrysanthemum.jpg', 1),
(375, 'Chrysanthemum.jpg', 1),
(375, 'Chrysanthemum.jpg', 1)


select * from T_MailTask

delete from T_MainTaskInfo where Id between 19 and 23
SELECT * FROM T_MainTaskInfo 
	WHERE 1 = 1 
	AND Id = 1006
	--AND Number = '20171026173754347'
	OR ParentTaskInfoId = 25
	ORDER BY Id
UPDATE T_MainTaskInfo SET [Status] = 1 WHERE Id = 1006

SELECT * FROM T_MainTaskVBA

SELECT * FROM T_Manufacture
	ORDER BY Id

SELECT * FROM T_Menu
insert into T_Menu values
(N'分数配置','Score/Index',0,1,1,getdate(),1,0),
(N'工具管理','Tool/Index',0,1,1,getdate(),1,0)

SELECT * FROM T_OperateStep
--检查小项
SELECT * FROM T_Option
--检查大项
SELECT * FROM T_OptionType
--报表内容
SELECT * FROM T_PdfContent WHERE MainTaskInfoID=3
ALTER TABLE T_PdfContent DROP COLUMN PageData
ALTER TABLE T_PdfContent DROP COLUMN TotalPage
CREATE INDEX T_Pdf_MainID_Index ON T_PdfContent (MainTaskInfoID)

SELECT * FROM T_Plan 
	WHERE 1 = 1
	AND Id BETWEEN 545 AND 575
	--AND ShowFlag = 4
	--AND PlanName in (N'整流单元',N'整流回馈单元',N'AC-AC变频器',N'DC-AC逆变器')
SELECT * FROM  ((
	SELECT * FROM T_Plan
        WHERE ShowFlag = 3
        and VERSION = (
        SELECT isnull(max(VERSION - 0), 0) FROM T_Plan WHERE ShowFlag = 3
        ))
		UNION all
	(
	SELECT * FROM T_Plan
        WHERE ShowFlag = 12
        and VERSION = (
        SELECT isnull(max(VERSION - 0), 0) FROM T_Plan WHERE ShowFlag = 12
        ))) p ORDER BY Id

SELECT * FROM T_PlanStep

SELECT * FROM T_PlanStepOption

SELECT * FROM T_Product

SELECT * FROM T_RefLink

--查询计划方案
SELECT * FROM T_Plan WHERE PlanLevel=3
select * from T_Plan
        where ShowFlag = 3
        and Version = (
        select isnull(max(Version - 0), 0) from T_Plan where ShowFlag = 3
        ) order by Id

SELECT * FROM T_RefLink
-- 角色
SELECT * FROM T_Role
-- 角色菜单
SELECT * FROM T_RoleMenu

SELECT * FROM T_Score

SELECT * FROM T_SparePart

SELECT * FROM T_SuggestInfo

SELECT * FROM T_TaskAttribute
	where TaskInfoId between 5310 and 7067
	--and AttributeType=1
	order by TaskInfoId
SELECT ta.* FROM T_TaskAttribute ta
	INNER JOIN T_TaskInfo t ON ta.TaskInfoId = t.Id
	WHERE t.MainTaskInfoId = 3178
update T_TaskAttribute set AttributeValue = CONCAT(t.PlanName, N'电气室')
	from T_TaskAttribute ta inner join T_TaskInfo t on ta.TaskInfoId=t.Id
	where ta.AttributeType=1

SELECT b.*,m.ParentTaskInfoId FROM T_TaskBackUp b
	INNER JOIN T_MainTaskInfo m ON b.TaskInfoId = m.Id
UPDATE T_TaskBackUp SET TaskInfoId = 1090 WHERE TaskInfoId = 1091

SELECT * FROM T_TaskInfo 
	WHERE 1 = 1 
	AND MainTaskInfoId = 29
	AND PlanLevel=3
	AND SubMainTaskInfoId = 31
	ORDER BY Id
SELECT Dimension02, Weight FROM T_TaskInfo 
	WHERE 1 = 1 
	AND MainTaskInfoId = 1086
DELETE FROM T_TaskInfo WHERE MainTaskInfoId = 1049
update T_TaskInfo set SubMainTaskInfoId = null
	where PlanName = 'FAExtra1'
update T_TaskInfo set SubMainTaskInfoId = null where PlanLevel!=0
update T_TaskInfo set ShowFlag=2 where Id >=141
UPDATE [T_TaskInfo] SET [SubMainTaskInfoId] = 4
	where PlanId in (5,1,2,3,4) and SubMainTaskInfoId is null

SELECT t.PlanName, ta.* FROM T_TaskAttribute ta
	INNER JOIN T_TaskInfo t ON t.Id = ta.TaskInfoId
	WHERE t.MainTaskInfoId = 11
	AND ta.AttributeType = 1

SELECT * FROM T_TaskPlanStep 
	--WHERE TaskInfoId between 38 and 68
	ORDER BY TaskInfoId
SELECT t.PlanName, tp.* FROM T_TaskPlanStep tp
	INNER JOIN T_TaskInfo t ON t.Id = tp.TaskInfoId
	WHERE t.MainTaskInfoId = 59

-- 建议备件
SELECT * FROM T_TaskSparePart
	WHERE MainTaskInfoId = 59

SELECT * FROM T_TaskTool 
	WHERE MainTaskInfoId = 59
update T_TaskTool set MainTaskInfoId=1 where MainTaskInfoId=2
-- 用户
SELECT * FROM T_User
	ORDER BY Id
SELECT u.*, wm.WrokShopId FROM T_User u
	LEFT JOIN T_WorkShopUserMapping wm on u.Id = wm.UserId
-- 用户角色
SELECT * FROM T_UserRole WHERE UserId=1277
SELECT r.* FROM T_Role r 
INNER JOIN T_UserRole ur ON r.Id = ur.RoleId
where UserId = 198
-- 工具
SELECT * FROM T_Tool
alter table T_Tool add ToolDesc NVARCHAR(200)
-- 车间信息
SELECT * FROM T_WorkShop 
	ORDER BY Id
SELECT * FROM T_WorkShopUserMapping
	WHERE WrokShopId IN(77,76,75)

SELECT MAX(id) FROM T_TaskInfo 


EXEC SP_WHO

SELECT * FROM Test_User

select * from T_PdfContent
where ID = 1
truncate table T_PdfContent

--检查单元
IF EXISTS (SELECT * FROM SYSOBJECTS WHERE id = OBJECT_ID(N'[T_CheckUnit]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
	DROP TABLE T_CheckUnit;
GO
CREATE TABLE T_CheckUnit(
	Id INT IDENTITY(1,1) PRIMARY KEY,
	MainTaskInfoId INT,
	Name NVARCHAR(20),
	Number VARCHAR(10)
)
SELECT * FROM T_CheckUnit WHERE MainTaskInfoId = 41

--设备信息
IF EXISTS (SELECT * FROM SYSOBJECTS WHERE id = OBJECT_ID(N'[T_Device]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
	DROP TABLE T_Device;
GO
CREATE TABLE T_Device(
	Id INT IDENTITY(1,1) PRIMARY KEY,
	MainTaskInfoId INT,
	Name NVARCHAR(20),
	OrderNumber NVARCHAR(20),
	Number VARCHAR(10),
	Remark NVARCHAR(50)
)
select * from T_Device
delete from T_Device where MainTaskInfoId = 0
--
--得分信息
CREATE TABLE T_Score(
	Id INT IDENTITY(1,1) PRIMARY KEY,
	Name NVARCHAR(20),
	Score VARCHAR(20)
)
select * from T_Score
insert into T_Score values
('单项得分', 5),
('OK', 5),
('LOW', 4),
('MEDIUM', 3),
('HIGH', 1);
truncate table T_Score

-- 获取拆分页面工程师
 select a.*,m.Status from
      (
      select row_number()over(order by e.UpdateTime desc)rownumber,u.UserName,e.* from dbo.T_User u
      right join dbo.T_Engineer e
      on u.Id=e.UserId
      where ParentMainTaskInfoId=1
      and u.Status=0
      )a
      left join T_MainTaskInfo m on a.MainTaskInfoId=m.Id

-- 根据未拆分ID获取拆分后实施方案
 select t.Id,t.MainTaskInfoId,t.SubMainTaskInfoId,t.ParentId,t.OriginalId,t.PlanId,t.PlanName,t.PlanLevel,t.PlanDescription,
      t.PlanTime,t.EqualFlag,t.ShowFlag,t.CheckFlag,t.NotFlag,t.GroupName,t.ToolIds,t.AttributeIds,t.OperateStepIds,t.RefLinkIds,t.PlanStepIds,
      t.ResultShowFlag,t.SortId,t.OptionId,t.[Status],t.IsExtra,t.IsNonstandard,t.IsRepair,t.ActualExecutionTime,t.Score,t.IsSecondFlag,t.TaskIndex,
      t.Notes,t.ImageIds,t.CheckResultRemark,t.HiddenRemark,t.RepireSuggestRemark,t.RepireRemark,t.StartTime,t.EndTime,t.IsSplit,
      e.Id as eId,e.UserId,u.UserName from T_TaskInfo t
      left join dbo.T_Engineer e on t.SubMainTaskInfoId=e.MainTaskInfoId
      left join dbo.T_User u on e.UserId=u.Id
      where t.MainTaskInfoId=1

-- 否有执行数 判断是否同一个人修改拆分小方案
select ISNULL([TaskInfos],-1) from [T_Engineer]
      where Id=1
--查询最终的执行项数
select count(*) from(
      select t.Id,t.MainTaskInfoId,t.SubMainTaskInfoId,t.ParentId,t.OriginalId,t.PlanId,t.PlanName,t.PlanLevel,t.PlanDescription,
      t.PlanTime,t.EqualFlag,t.ShowFlag,t.CheckFlag,t.NotFlag,t.GroupName,t.ToolIds,t.AttributeIds,t.OperateStepIds,t.RefLinkIds,t.PlanStepIds,
      t.ResultShowFlag,t.SortId,t.OptionId,t.[Status],t.IsExtra,t.IsNonstandard,t.IsRepair,t.ActualExecutionTime,t.Score,t.IsSecondFlag,t.TaskIndex,
      t.Notes,t.ImageIds,t.CheckResultRemark,t.HiddenRemark,t.RepireSuggestRemark,t.RepireRemark,t.StartTime,t.EndTime,t.IsSplit,
      e.Id as eId,e.UserId from T_TaskInfo t
      left join dbo.T_Engineer e on t.SubMainTaskInfoId=e.MainTaskInfoId
      where t.MainTaskInfoId=1
      ) f
      where  f.eId=1
SELECT *
  FROM [SiemensISPTest].[dbo].[T_MainTaskInfo]
  WHERE 1 = 1
  AND Id = 24
UPDATE T_MainTaskInfo SET Status = 4 WHERE Status = 10

SELECT *
  FROM [SiemensISPTest].[dbo].[T_TaskInfo]
  WHERE 1 = 1
  AND MainTaskInfoId = 24
  AND PlanLevel = 0
  --AND Dimension01 LIKE '%11%'
  AND IsSecondFlag > 0

UPDATE T_TaskInfo SET Weight=1 WHERE Id=1594

SELECT T.PlanName, TA.*
  FROM [SiemensISPTest].[dbo].[T_TaskAttribute] TA
  INNER JOIN T_TaskInfo T ON TA.TaskInfoId = T.Id
  WHERE 1 = 1
  AND T.MainTaskInfoId = 99
  ORDER BY TaskInfoId

SELECT T.PlanName, TP.*
  FROM [SiemensISPTest].[dbo].[T_TaskPlanStep] TP
  INNER JOIN T_TaskInfo T ON TP.TaskInfoId = T.Id
  WHERE 1 = 1
  AND T.MainTaskInfoId = 99
  ORDER BY TaskInfoId

SELECT TOP 1000 [Id]
      ,[MainTaskInfoId]
      ,[Name]
      ,[Number]
      ,[Type]
      ,[PlanIds]
  FROM [SiemensISPTest].[dbo].[T_CheckUnit]
  WHERE MainTaskInfoId = 5

SELECT * FROM T_Product
SELECT * FROM T_Plan 
	WHERE 1 = 1
	AND ShowFlag = 1


declare @dbid int
select @dbid = db_id()
select objectname=object_name(s.object_id), s.object_id, indexname=i.name, i.index_id, 
		user_seeks, user_scans, user_lookups, user_updates
from sys.dm_db_index_usage_stats s, sys.indexes i
where database_id = @dbid and objectproperty(s.object_id,'IsUserTable') = 1
and i.object_id = s.object_id
and i.index_id = s.index_id
order by (user_seeks + user_scans + user_lookups + user_updates) asc


SELECT objects.name, databases.name, indexes.name, user_seeks,
		user_scans, user_lookups, partition_stats.row_count
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


SELECT TOP 10 [Total Cost] = ROUND(
		avg_total_user_cost * avg_user_impact * (user_seeks + user_scans), 0), 
		avg_user_impact, TableName = statement, [EqualityUsage] = equality_columns, 
		[InequalityUsage] = inequality_columns, [Include Cloumns] = included_columns
FROM sys.dm_db_missing_index_groups g
INNER JOIN sys.dm_db_missing_index_group_stats s ON s.group_handle = g.index_group_handle
INNER JOIN sys.dm_db_missing_index_details d ON d.index_handle = g.index_handle
ORDER BY [Total Cost] DESC;


SELECT * FROM T_TaskInfo
GO
-- 执行项数量
IF EXISTS (SELECT * FROM SYSOBJECTS WHERE id = OBJECT_ID(N'[T_TaskNumber]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
	DROP TABLE T_TaskNumber;
GO
CREATE TABLE T_TaskNumber(
	Id BIGINT IDENTITY(1,1) PRIMARY KEY, -- 主键
	MainTaskInfoId INT, 
	TreeJson NVARCHAR(MAX),
	SendJson NVARCHAR(MAX)
);
GO
DELETE FROM T_TaskNumber WHERE MainTaskInfoId = 1006
SELECT * FROM T_TaskNumber WHERE 1=1
AND MainTaskInfoId = 25
TRUNCATE TABLE T_TaskNumber
GO
-- 执行项关系
IF EXISTS (SELECT * FROM SYSOBJECTS WHERE id = OBJECT_ID(N'[T_TaskRelation]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
	DROP TABLE T_TaskRelation;
GO
CREATE TABLE T_TaskRelation(
	Id BIGINT IDENTITY(1,1) PRIMARY KEY,
	MainTaskInfoId INT,
	ProductJson NVARCHAR(MAX),
	IsSend BIT 
);
GO
SELECT * FROM T_TaskRelation
DELETE FROM T_TaskRelation WHERE MainTaskInfoId = 1049
UPDATE T_TaskRelation SET IsSend = 0 WHERE MainTaskInfoId = 2136
TRUNCATE TABLE T_TaskRelation

SELECT * FROM T_MainTaskInfo
UPDATE T_MainTaskInfo SET [Status] = 1 WHERE Id = 32

SELECT * FROM T_MainTaskVBA
BEGIN TRAN
UPDATE T_MainTaskInfo SET [Status] = 5 FROM T_MainTaskVBA MV
	INNER JOIN T_MainTaskInfo MT ON MV.MainTaskInfoId = MT.Id
COMMIT



drop proc sp_delMainTaskByName
go
create  proc sp_delMainTaskByName (
	@name nvarchar(50)
)
as
begin
begin tran
delete T_CheckUnit from T_MainTaskInfo mt inner join T_CheckUnit cu on mt.Id = cu.MainTaskInfoId where mt.GroupName=@name 
if @@error > 0
	begin
    rollback
	print N'删除T_CheckUnit失败！'
	return
	end
delete T_Device from T_MainTaskInfo mt inner join T_Device d on mt.Id = d.MainTaskInfoId where mt.GroupName=@name
if @@error > 0
	begin
    rollback
	print N'删除T_Device失败！'
	return
	end
delete T_Engineer from T_MainTaskInfo mt inner join T_Engineer e on mt.Id = e.ParentMainTaskInfoId where mt.GroupName=@name
if @@error > 0
	begin
    rollback
	print N'删除T_Engineer失败！'
	return
	end
delete T_MainTaskVBA from T_MainTaskInfo mt inner join T_MainTaskVBA mv on mt.Id = mv.MainTaskInfoId where mt.GroupName=@name
if @@error > 0
	begin
    rollback
	print N'删除T_MainTaskVBA失败！'
	return
	end
delete T_PdfContent from T_MainTaskInfo mt inner join T_PdfContent pc on mt.Id = pc.MainTaskInfoId where mt.GroupName=@name
if @@error > 0
	begin
    rollback
	print N'删除T_PdfContent失败！'
	return
	end
delete T_TaskNumber from T_MainTaskInfo mt inner join T_TaskNumber tn on mt.Id = tn.MainTaskInfoId where mt.GroupName=@name
if @@error > 0
	begin
    rollback
	print N'删除T_TaskNumber失败！'
	return
	end
delete T_TaskRelation from T_MainTaskInfo mt inner join T_TaskRelation tr on mt.Id = tr.MainTaskInfoId where mt.GroupName=@name
if @@error > 0
	begin
    rollback
	print N'删除T_TaskRelation失败！'
	return
	end
delete T_TaskSparePart from T_MainTaskInfo mt inner join T_TaskSparePart tsp on mt.Id = tsp.MainTaskInfoId where mt.GroupName=@name
if @@error > 0
	begin
    rollback
	print N'删除T_TaskSparePart失败！'
	return
	end
delete T_TaskTool from T_MainTaskInfo mt inner join T_TaskTool t on mt.Id = t.MainTaskInfoId where mt.GroupName=@name
if @@error > 0
	begin
    rollback
	print N'删除T_TaskTool失败！'
	return
	end
delete T_Image from T_MainTaskInfo mt 
	inner join T_TaskInfo t on mt.Id = t.MainTaskInfoId
	inner join T_Image i on t.Id = i.TaskInfoId
	where mt.GroupName=@name
if @@error > 0
	begin
    rollback
	print N'删除T_Image失败！'
	return
	end
delete T_SparePart from T_MainTaskInfo mt 
	inner join T_TaskInfo t on mt.Id = t.MainTaskInfoId
	inner join T_SparePart sp on t.Id = sp.TaskInfoId
	where mt.GroupName=@name
if @@error > 0
	begin
    rollback
	print N'删除T_SparePart失败！'
	return
	end
delete T_TaskAttribute from T_MainTaskInfo mt 
	inner join T_TaskInfo t on mt.Id = t.MainTaskInfoId
	inner join T_TaskAttribute ta on t.Id = ta.TaskInfoId
	where mt.GroupName=@name
if @@error > 0
	begin
    rollback
	print N'删除T_TaskAttribute失败！'
	return
	end
delete T_TaskBackUp from T_MainTaskInfo mt 
	inner join T_TaskInfo t on mt.Id = t.MainTaskInfoId
	inner join T_TaskBackUp tb on t.Id = tb.TaskInfoId
	where mt.GroupName=@name
if @@error > 0
	begin
    rollback
	print N'删除T_TaskBackUp失败！'
	return
	end
delete T_TaskPlanStep from T_MainTaskInfo mt 
	inner join T_TaskInfo t on mt.Id = t.MainTaskInfoId
	inner join T_TaskPlanStep tp on t.Id = tp.TaskInfoId
	where mt.GroupName=@name
if @@error > 0
	begin
    rollback
	print N'删除T_TaskPlanStep失败！'
	return
	end
delete T_TaskInfo from T_MainTaskInfo mt inner join T_TaskInfo t on mt.Id = t.MainTaskInfoId where mt.GroupName=@name
if @@error > 0
	begin
    rollback
	print N'删除T_TaskInfo失败！'
	return
	end
delete mt1 from T_MainTaskInfo mt1 inner join T_MainTaskInfo mt2 on mt1.ParentTaskInfoId = mt2.Id where mt2.GroupName=@name
if @@error > 0
	begin
    rollback
	print N'删除T_MainTaskInfo失败！'
	return
	end
delete T_MainTaskInfo where GroupName=@name
if @@error > 0
	begin
    rollback
	print N'删除T_MainTaskInfo失败！'
	end
else
	begin
	commit
	print N'删除成功！'
	end
end
go
sp_delMainTaskByName N'Test方案'