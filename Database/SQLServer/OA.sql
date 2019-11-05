/* 
 * 登录方案应用 
 */
if exists (select * from sysobjects where id = object_id(N'[login_ui_use]') and objectproperty(id, N'IsProcedure') = 1)
	drop proc login_ui_use
go
create proc [dbo].[login_ui_use]
(
    @top_url varchar(1000)='' output,
    @center_url varchar(1000)='' output,
    @background_url varchar(1000)='' output,
    @other_info varchar(100)='' output
)
as
declare @programID int,@pmodel int
if exists(select * from login_ui where programID=0 and isUse=1)
begin
	select @programID=id,@pmodel=ProgramModel,@other_info=programColor+'|'+titPos+'|'+verPos+'|'+btnPos+'|'+infoPos 
	    from login_ui where programID=0 and isUse=1
	select @top_url=picUrl from login_ui where programID=@programID and picArea='top'
	select @center_url=picUrl from login_ui where programID=@programID and picArea='center'
	select @background_url=picUrl from login_ui where programID=@programID and picArea='background' 
	return @pmodel
end
else
    return 0
go

/*
 * 用户登录
 * state 0-成功,1-不存在,2-停用,3-密码不正确
 */
ALTER PROCEDURE [dbo].[hr_user_Login] (
	@ntAccount nvarchar(50),
	@password nvarchar(64),
	@state int Output
)
AS
if exists (select userID from hr_users where ntAccount=@ntAccount)
begin
	if exists(select userID from hr_users where ntAccount=@ntAccount and ([disabled]=1  or [disabled]=2))
	begin
		set @state='2' --停用
	end
	else
	begin
		if exists(select userID from hr_users where ntAccount=@ntAccount and password=@password)
			set @state='0' --成功
		else
			set @state='3' --密码不正确
	end
end
else
begin
	set @state='1' --不存在
end
RETURN
go

-- 登录方案
select * from login_ui
-- 用户表
select * from hr_users

if exists(select * from sysobjects where id = object_id(N'[Task]') 
			and OBJECTPROPERTY(id, N'IsUserTable') = 1)
	drop table Task
if exists(select * from sysobjects where id = object_id(N'[Project_Version]') 
			and OBJECTPROPERTY(id, N'IsUserTable') = 1)
	drop table Project_Version
if exists(select * from sysobjects where id = object_id(N'[Project_Master]') 
			and OBJECTPROPERTY(id, N'IsUserTable') = 1)
	drop table Project_Master
IF EXISTS(SELECT 1 FROM sys.views WHERE name='Project_Apply_v')
	drop view Project_Apply_v
Go
create table Project_Master(
	projectId int identity(1,1) primary key,--主键
	projectType varchar(10) default('implement'),--项目类型
	projectCode varchar(30) not null,--编号
	projectName varchar(30) not null,--名称
	applyDate datetime default getdate(),--申请时间
);
select * from Project_Master
create table Project_Version(
	verId int identity(1,1) primary key,--主键
	masterId int FOREIGN KEY REFERENCES Project_Master(projectId),--外键
	verName varchar(15) not null,--版本名称
	verDesc varchar(200),--版本描述
	scheduledStartDate datetime,--计划开始日期
	scheduledEndDate datetime,--计划结束日期
	actualStartDate datetime,--实际开始日期
	actualEndDate datetime,--实际结束日期
	projectState int not null,--项目状态(0:失败; 1:成功; 2:进行中; 3:暂停)
	createDate datetime default getdate(),--创建时间
	updateDate datetime default getdate(),--更新时间
);
select * from Project_Version
create table Task(
	taskId int identity(1,1) primary key,--主键
	taskName varchar(15) not null,--任务名称
	taskDesc varchar(200),--任务描述
	scheduledStartDate datetime,--计划开始日期
	scheduledEndDate datetime,--计划结束日期
	actualStartDate datetime,--实际开始日期
	actualEndDate datetime,--实际结束日期
	taskState int not null,--任务状态(0:失败; 1:成功; 2:进行中; 3:暂停; 4:待启动)
	projectVerId int FOREIGN KEY REFERENCES Project_Version(verId),--外键，项目Id
);
select * from Task
Go
create view Project_Apply_v
as
	select pv.*,pm.* from Project_Version pv
		inner join Project_Master pm on pv.masterId=pm.projectId
Go
select * from Project_Apply_v
Go
select *,type=case isnull(typeName,'') 
				when '' then 
					case isnull(bDate,'') 
						when '' then '试用员工' 
						else '正式员工' 
					end 
				else typeName 
			  end  
	from hr_employee_v

/*************用户登录  
state 0-成功,1-不存在,2-停用,3-密码不正确  
**************/  
sp_helptext hr_user_Login
go
/*************用户登录
state 0-成功,1-不存在,2-停用,3-密码不正确
**************/
CREATE PROCEDURE [dbo].[hr_user_Login]
	(
	@ntAccount nvarchar(50),
	@password nvarchar(64),
	@state int Output
	)
AS
	if exists (select userID from hr_users where ntAccount=@ntAccount)
	begin
		if exists(select userID from hr_users where ntAccount=@ntAccount and ([disabled]=1  or [disabled]=2))
		begin
			set @state='2' --停用
		end
		else
		begin
			if exists(select userID from hr_users where ntAccount=@ntAccount and password=@password)
				set @state='0' --成功
			else
				set @state='3' --密码不正确
		end
	end
	else
	begin
		set @state='1' --不存在
	end
	RETURN
go
 --职员表
select * from hr_employee

--职工等级
select * from hr_employeeType

--公司
select * from hr_company

--部门
select * from hr_department

--职位
select * from hr_position

--密码策略
select * from hr_companyPWD

--用户信息视图
select * from hr_users_v  
go
--根据用户名获取用户信息
sp_helptext hr_user_selectByNtAccount 
go
--查询企业密码策略  
sp_helptext hr_companyPWD_reader 

--角色
select * from role_role

select * from model_menu


--用户控制面板
/*
CREATE TABLE [dbo].[ControlMenu_Person](
	[userID] [int] NULL,
	[CID] [int] NULL
) 
*/
select * from [ControlMenu_Person]
/*
insert into [ControlMenu_Person]([userID],[CID])
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[ControlMenu_Person]
*/

--角色控制面板
/*
CREATE TABLE [dbo].[ControlMenu_Role](
	[RoleID] [int] NULL,
	[CID] [int] NULL
) 
*/
select * from [ControlMenu_Role]
/*
insert into [ControlMenu_Role]([RoleID],[CID])
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[ControlMenu_Role]
*/

--授权按钮
/*
CREATE TABLE [dbo].[role_fun](
	[FID] [int] IDENTITY(1000,1) NOT NULL PRIMARY KEY,
	[moduleID] [int] NOT NULL,
	[typeID] [nvarchar](200) NOT NULL,
	[FName] [nvarchar](50) NOT NULL,
	[keyID] [nvarchar](100) NULL,
	[para] [nvarchar](20) NULL DEFAULT (''),
	[role_dep] [int] NULL DEFAULT ((0))
)
*/
select * from [role_fun]
/*
set IDENTITY_INSERT [role_fun] ON
insert into [role_fun]([FID],[moduleID],[typeID],[FName],[keyID],[para],[role_dep])
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[role_fun]
set IDENTITY_INSERT [role_fun] OFF
*/

--用户授权按钮
/*
CREATE TABLE [dbo].[user_fun](
	[userID] [int] NULL,
	[FID] [int] NULL
) 
*/
select * from [user_fun]
/*
insert into [user_fun]([userID],[FID])
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[user_fun]
*/

--用户角色
/*
CREATE TABLE [dbo].[role_user](
	[userID] [int] NOT NULL,
	[roleID] [int] NULL
) 
*/
select * from [role_user]
/*
insert into [role_user]([userID],[roleID])
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[role_user]
*/

/*
CREATE TABLE [dbo].[role_func](
	[FID] [int] NULL,
	[roleID] [int] NULL
) 
*/
select * from [role_func]
/*
insert into [role_func]([FID],[roleID])
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[role_func]		
GO
*/

--用户控制面板权限视图
/*
create view [dbo].[soa_userControlRoles]  
as  
select f.FID,f.moduleID,f.typeID,f.FName,f.keyID,u.userID,f.para from   
role_fun f,user_fun u where f.FID= u.FID   union     --用户权限  
select f.FID,rf.moduleID,rf.typeID,rf.FName,rf.keyID,u.userID,rf.para from   
role_fun rf,role_user u,role_func f   
where f.roleID=u.roleID and rf.FID=f.FID  
*/
select * from [soa_userControlRoles]
GO

/*
create procedure [dbo].[role_user_role] @userID int  
as  
select FID,moduleID,typeID,FName,keyID from soa_userControlRoles where userID=@userID  
GO
*/

--用户主面板权限视图
/*
create view [dbo].[soa_userMenuRoles]  
as    
select menuID,userID,0 as roleID from role_usermenu  union all   --用户菜单  
select g.menuID as menuID,r.userID as userID,r.roleID as roleID from role_user r,role_group g where g.roleID=r.roleID   --所有人在角色中的权限   
*/
select * from [soa_userMenuRoles]
GO

/*
CREATE procedure [dbo].[Role_UserMenuList] @userID int  
as  
select rm.menuID,rm.parentID,rm.menuName,rm.menuorder,rm.picSources as menuresouce,rm.menuUrl from   
role_menu rm where exists(select 't' from soa_userMenuRoles smr where rm.menuID=smr.menuID and userID =@userID)  
order by rm.menuorder asc  
*/
  
/*
CREATE procedure [dbo].[Role_ControlMenuList]  
(  
@userID int  
)  
as  
select menuID,menuName,menuresouce,menuUrl,parentID from  
(  
select CID as menuID,menuName,menuorder,menuresouce,menuUrl,parentID from Tab_Control   
where exists(select 'r' from ControlMenu_Person p where p.CID=Tab_Control.CID and p.userID=@userID)   
union  
select CID as menuID,menuName,menuorder,menuresouce,menuUrl,parentID from Tab_Control   
where exists(select 'r' from ControlMenu_Role R,role_user u where R.CID=Tab_Control.CID    
and u.roleID=R.RoleID and u.userID=@userID  
))t order by menuorder  
*/
  
--根据员工ID找到user  
/*
CREATE PROCEDURE [dbo].[hr_users_findByEmployeeID]  
(  
 @employeeID int  
)   
AS  
BEGIN  
    select * from hr_users where uID= @employeeID  
END  
GO
*/
  
--图像设置
/*
CREATE TABLE [dbo].[module_setting](
	[id] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[module_name] [varchar](50) NULL,
	[page_name] [varchar](200) NULL,
	[image_url] [varchar](200) NULL,
	[isUse] [int] NULL,
	[order_id] [int] NULL,
	[link_url] [varchar](200) NULL
)
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'模块名称' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'module_setting', @level2type=N'COLUMN',@level2name=N'module_name'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'页面名字' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'module_setting', @level2type=N'COLUMN',@level2name=N'page_name'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'图片相对路径' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'module_setting', @level2type=N'COLUMN',@level2name=N'image_url'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否启用（0否，1）' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'module_setting', @level2type=N'COLUMN',@level2name=N'isUse'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'排序ID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'module_setting', @level2type=N'COLUMN',@level2name=N'order_id'
GO
set IDENTITY_INSERT [module_setting] ON
insert into [module_setting]([id],[module_name],[page_name],[image_url],[isUse],[order_id],[link_url])
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[module_setting]
set IDENTITY_INSERT [module_setting] OFF
*/
select * from [module_setting]
GO

/*模块页面设置获取*/ 
/* 
Create proc [dbo].[module_setting_get_dtf]  
(  
  @module_name varchar(50),  
  @page_name varchar(50)  
)  
as  
begin  
select image_url,link_url from module_setting where module_name=@module_name and page_name=@page_name and isUse=1 order by order_id  
end
*/

--系统信息
/*
CREATE TABLE [dbo].[sys_ass](
	[aID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[cName] [varchar](50) NULL,
	[orderID] [int] NULL DEFAULT ((0)),
	[pID] [int] NULL DEFAULT ((0)),
	[typeName] [varchar](50) NULL,
	[isdel] [int] NULL DEFAULT ((0)),
	[isGo] [int] NULL DEFAULT ((0))
)
set IDENTITY_INSERT [sys_ass] ON
insert into [sys_ass]([aID],[cName],[orderID],[pID],[typeName],[isdel],[isGo])
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[sys_ass]
set IDENTITY_INSERT [sys_ass] OFF
*/ 
select * from sys_ass

/*
CREATE TABLE [dbo].[wage_Type_employee](
	[rel_ID] [int] IDENTITY(1,1) NOT NULL,
	[employeeID] [int] NULL,
	[wage_type_ID] [int] NULL
)
*/
select * from [wage_Type_employee]
/*
set IDENTITY_INSERT [wage_Type_employee] ON
insert into [wage_Type_employee]([rel_ID],[employeeID],[wage_type_ID])
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[wage_Type_employee]
set IDENTITY_INSERT [wage_Type_employee] OFF
GO
*/

--用户全部信息
/*
CREATE VIEW dbo.hr_userAll_v  
AS  
SELECT     dbo.hr_users.userID, dbo.hr_users.ntAccount, dbo.hr_users.userType, dbo.hr_users.UID, dbo.hr_users.disabled, dbo.hr_department.cName AS deptname,   
                      dbo.hr_position.cName AS posname, dbo.hr_employee.employeeID, dbo.hr_employee.empID, dbo.hr_employee.empName, dbo.hr_employee.gender,   
                      dbo.hr_employee.nation, dbo.hr_employee.birthday, dbo.hr_employee.identityID, dbo.hr_employee.email, dbo.hr_employee.probation, dbo.hr_employee.beginDate,   
                      dbo.hr_employee.positionID, dbo.hr_employee.departmentID, dbo.hr_employee.qualification, dbo.hr_employee.endDate, dbo.hr_employee.telNO,   
                      dbo.hr_employee.houseTelNO, dbo.hr_employee.otherTelNO, dbo.hr_employee.emergencyContact, dbo.hr_employee.contactNO, dbo.hr_employee.region,   
                      dbo.hr_employee.address, dbo.hr_employee.leave, dbo.hr_employee.marriage, dbo.hr_employee.politicsVisage, dbo.hr_employee.empType,   
                      dbo.hr_employee.remark, dbo.hr_users.updatePWDDate, dbo.hr_users.ntAccountType, dbo.hr_department.companyID, dbo.hr_company.groupID,   
                      dbo.hr_department.parDepartment, dbo.hr_position.levels AS posLev, dbo.hr_employee.workLev, dbo.hr_employee.workLevID,   
                      dbo.hr_company.cName AS companyName, dbo.sys_ass.cName AS workLevName, dbo.hr_employee.empCardID, dbo.hr_employee.shcool,   
                      dbo.hr_employee.speciality, dbo.hr_employee.testMonths, dbo.hr_employee.likes, dbo.hr_employee.cityID, dbo.hr_employee.proviceID, dbo.hr_employee.MSN,   
                      dbo.hr_employee.QQ, dbo.hr_employee.bankName, dbo.hr_employee.bankNO, dbo.hr_employeeType.typeName, ISNULL(dbo.wage_Type_employee.wage_type_ID, 0)  
                       AS wage_type_ID, dbo.hr_employee.personalQQ, dbo.hr_employee.personalMail  
FROM         dbo.hr_employeeType RIGHT OUTER JOIN  
                      dbo.wage_Type_employee RIGHT OUTER JOIN  
                      dbo.hr_employee ON dbo.wage_Type_employee.employeeID = dbo.hr_employee.employeeID ON   
                      dbo.hr_employeeType.empTypeID = dbo.hr_employee.empType LEFT OUTER JOIN  
                      dbo.sys_ass ON dbo.hr_employee.workLevID = dbo.sys_ass.aID LEFT OUTER JOIN  
                      dbo.hr_position ON dbo.hr_employee.positionID = dbo.hr_position.positionID LEFT OUTER JOIN  
                      dbo.hr_company RIGHT OUTER JOIN  
                      dbo.hr_department ON dbo.hr_company.companyID = dbo.hr_department.companyID ON   
                      dbo.hr_employee.departmentID = dbo.hr_department.departmentID RIGHT OUTER JOIN  
                      dbo.hr_users ON dbo.hr_employee.employeeID = dbo.hr_users.UID  
GO
*/
select * from hr_userAll_v
drop view hr_userAll_v
--日志信息表
CREATE TABLE [dbo].[sys_log](
	[userID] [int] NULL,
	[empName] [varchar](20) NULL,
	[contents] [varchar](50) NULL,
	[insertDate] [datetime] NULL,
	[ip] [varchar](50) NULL
) 
select * from sys_log
GO
-- 日志新增  
CREATE PROCEDURE [dbo].[sys_log_add]   
(  
 @userID int,  
 @empName varchar(20),  
 @contents varchar(50),  
 @insertDate datetime,  
 @ip   varchar(50)  
)  
AS  
BEGIN  
 begin tran  
 insert into sys_log(userID,empName,contents,insertDate,ip) values(@userID,@empName,@contents,getdate(),@ip)   
 if @@error>0  
 begin  
  rollback  
  return 1  
 end  
 else  
 begin  
  commit  
  return 2  
 end  
END  


--文档类别
/*
CREATE TABLE [dbo].[knowledge_class](
	[classID] [int] IDENTITY(900000,1) NOT NULL PRIMARY KEY,
	[parentID] [int] NULL,
	[className] [varchar](200) NULL,
	[departID] [int] NULL,
	[userID] [int] NULL,
	[property] [int] NULL,
	[remark] [varchar](1000) NULL,
	[type] [varchar](10) NULL,
	[SQNC] [int] NULL,
	[side] [int] NULL
)
*/
select * from [knowledge_class]
/*
set IDENTITY_INSERT [knowledge_class] ON
insert into [knowledge_class]([classID],[parentID],[className],[departID],[userID],[property],[remark],
		[type],[SQNC],[side])
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[knowledge_class]
set IDENTITY_INSERT [knowledge_class] OFF
GO
*/

/*启用的新闻分类 左右分栏显示*/ 
/* 
CREATE proc [dbo].[knowledge_news_class]  
(  
  @sideNo int=1 --默认左栏  
)  
as  
select classID,className,parentID,departID from knowledge_class where [type]='news' and departID=1 and userID=@sideNo order by sqnc  
GO
*/
  
/*
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
*/

--文档权限
/*
CREATE TABLE [dbo].[knowledge_document_plus](
	[id] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[documentID] [int] NULL,
	[enjoyUser] [varchar](8000) NULL,
	[relativeDoc] [varchar](500) NULL,
	[allowAccessories] [varchar](8000) NULL,
	[allowRoles] [varchar](500) NULL,
	[users] [varchar](8000) NULL,
	[roles] [varchar](500) NULL
)
*/
select * from [knowledge_document_plus]
/*
set IDENTITY_INSERT [knowledge_document_plus] ON
insert into [knowledge_document_plus]([id],[documentID],[enjoyUser],[relativeDoc],[allowAccessories],[allowRoles],[users],[roles])
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[knowledge_document_plus]
set IDENTITY_INSERT [knowledge_document_plus] OFF
GO
*/

/*
CREATE proc [dbo].[knowledge_top_new]  
(  
    @count int,  
    @classID int,-- 1制度全部 2 文档全部 3 新闻全部  
    @userID varchar(50)  
)  
as  
declare @s nvarchar(4000)  
--,@docType varchar(50)  
declare @docType nvarchar(50)  
set @docType=''  
if @classID>900000--文档分类从900000开始  
set @docType=(select [type] from knowledge_class where classID=@classID)  
else  
begin  
  if @classID=1  
    set @docType='sys'  
  else if @classID=2  
    set @docType='doc'  
  else if @classID=3  
    set @docType='news'  
  else if @classID=4  
    set @docType='notice'  
  else if @classID=8  
    set @docType='cdoc'  
end  
  
set @s='select top '+convert(nvarchar(50),@count)+' *,'''+@docType+''' as docType  
from knowledge_document a where 1=1'  
  
if @classID>900000--文档分类从900000开始  
set @s=@s+' and (sortID='+convert(nvarchar(50),@classID)+' or charindex(''|'+convert(nvarchar(50),@classID)+'|'',''|''+refer_id+''|'',1)>0)'  
else  
begin  
   set @s=@s+' and sortID in (select classID from knowledge_class where [type]='''+@docType+''')'  
end  
  
if @docType='sys'  
set @s=@s+' and ((select departmentID from hr_users_v where userID='+@userID+') in (select result from split((select allowRoles from knowledge_document_plus where documentID=a.documentID)))  
or '+@userID+' in (select result from split((select allowAccessories from knowledge_document_plus where documentID=a.documentID)))  
or (isnull((select allowRoles from knowledge_document_plus where documentID=a.documentID),'''')='''' and isnull((select allowAccessories from knowledge_document_plus where documentID=a.documentID),'''')='''')  
or insertUserID='+@userID+')'  
  
if @docType='doc'  
set @s=@s+' and (select [property] from knowledge_class where classID=a.sortID)=2 and ((select departmentID from hr_users_v where userID='+@userID+') in (select result from split((select roles from knowledge_document_plus where documentID=a.documentID))) 
 
or '+@userID+' in (select result from split((select users from knowledge_document_plus where documentID=a.documentID)))  
or (isnull((select roles from knowledge_document_plus where documentID=a.documentID),'''')='''' and isnull((select users from knowledge_document_plus where documentID=a.documentID),'''')='''')  
or insertUserID='+@userID+')'  
  
if @docType='cdoc'  
set @s=@s+' and ((select departmentID from hr_users_v where userID='+@userID+') in (select result from split((select roles from knowledge_document_plus where documentID=a.documentID)))  
or '+@userID+' in (select result from split((select users from knowledge_document_plus where documentID=a.documentID)))  
or (isnull((select roles from knowledge_document_plus where documentID=a.documentID),'''')='''' and isnull((select users from knowledge_document_plus where documentID=a.documentID),'''')='''')  
or insertUserID='+@userID+')'  
  
if @docType='notice'  
set @s=@s+' and ((select departmentID from hr_users_v where userID='+@userID+') in (select result from split((select roles from knowledge_document_plus where documentID=a.documentID)))  
or '+@userID+' in (select result from split((select users from knowledge_document_plus where documentID=a.documentID)))  
or (isnull((select roles from knowledge_document_plus where documentID=a.documentID),'''')='''' and isnull((select users from knowledge_document_plus where documentID=a.documentID),'''')='''')  
or insertUserID='+@userID+')'  
  
if @docType='news'  
set @s=@s+' and ((select departmentID from hr_users_v where userID='+@userID+') in (select result from split((select allowRoles from knowledge_document_plus where documentID=a.documentID)))  
or '+@userID+' in (select result from split((select enjoyUser from knowledge_document_plus where documentID=a.documentID)))  
or (isnull((select allowRoles from knowledge_document_plus where documentID=a.documentID),'''')='''' and isnull((select enjoyUser from knowledge_document_plus where documentID=a.documentID),'''')='''')  
or insertUserID='+@userID+')'  
  
set @s=@s+' order by sDate desc'  
print @s  
exec sp_executesql  @s  
*/

--文档
/*
CREATE TABLE [dbo].[knowledge_document](
	[documentID] [int] NOT NULL PRIMARY KEY,
	[title] [varchar](1000) NULL,
	[contents] [text] NULL,
	[sortID] [int] NULL,
	[insertUserID] [int] NULL,
	[sDate] [datetime] NULL,
	[secret] [varchar](50) NULL,
	[is_refer] [int] NULL DEFAULT ((0)),
	[refer_id] [varchar](1000) NULL,
	[tag_str] [nvarchar](200) NULL
)
*/
select * from [knowledge_document]
/*
set IDENTITY_INSERT [knowledge_document] ON
insert into [knowledge_document]([documentID],[title],[contents],[sortID],[insertUserID],[sDate],
		[secret],[is_refer],[refer_id],[tag_str])
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[knowledge_document]
set IDENTITY_INSERT [knowledge_document] OFF
*/

/*
CREATE TABLE [dbo].[knowledge_document_log](
	[id] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[documentID] [int] NULL,
	[userID] [int] NULL,
	[LDatetime] [datetime] NULL,
	[IP] [varchar](50) NULL
) 
set IDENTITY_INSERT [knowledge_document_log] ON
insert into [knowledge_document_log]([id],[documentID],[userID],[LDatetime],[IP])
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[knowledge_document_log]
set IDENTITY_INSERT [knowledge_document_log] OFF
*/
select * from knowledge_document_log

GO

/*文档是否已读*/  
/*
CREATE proc knowledge_read_sta  
(  
@documentID int,--文档ID  
@userID int,--用户ID  
@read_sta int=0 output--阅读状态 0，1  
)  
as  
  if exists (select * from knowledge_document_log where documentID=@documentID and userID=@userID)  
     set @read_sta=1  
  else  
     set @read_sta=0 
*/

/*获取文档信息*/  
/*
create proc [dbo].[knowledge_document_get]  
(  
    @documentID int  
)  
as  
   select * from knowledge_document where documentID=@documentID  
*/


/*
CREATE TABLE [dbo].[knowledge_class_plus](
	[classID] [int] NULL,
	[inputer] [varchar](8000) NULL,
	[updater] [varchar](8000) NULL,
	[deleter] [varchar](8000) NULL,
	[checker] [varchar](200) NULL,
	[inputeRoles] [varchar](200) NULL,
	[updateRoles] [varchar](200) NULL,
	[deleteRoles] [varchar](200) NULL,
	[isUse] [int] NULL
)
insert into [knowledge_class_plus]([classID],[inputer],[updater],[deleter],[checker],[inputeRoles],[updateRoles],
		[deleteRoles],[isUse])
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[knowledge_class_plus]
*/
select * from knowledge_class_plus 

/*桌面文档分类，根据isUser字段-左栏*/  
/*
CREATE proc [dbo].[knowledge_class_doc_top]  
(  
   @rowCount int,  
   --@getType varchar(50)  
   @side int  
)  
as  
set rowcount @rowCount  
--select a.classID,b.className,b.[property] from knowledge_class_plus a inner join knowledge_class b on a.classID=b.classID where b.[type]=@getType and a.isUse=1  
select a.classID,b.className,b.[property],b.[type] from knowledge_class_plus a inner join knowledge_class b on a.classID=b.classID where (b.[type]='doc' and a.isUse=1 and b.side=@side) order by b.sqnc  
--or (b.[type]='sys' and a.isUse=1 and b.side=@side)  
set rowcount 0  
*/

/*
CREATE TABLE [dbo].[arrange_particularFinish](
	[executeID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[exeDetailID] [int] NULL,
	[fettle] [int] NULL,
	[finish] [varchar](5000) NULL,
	[author] [int] NULL,
	[writTime] [datetime] NULL,
	[completionDate] [datetime] NULL,
	[schedule] [int] NULL,
	[Ctime] [datetime] NULL,
	[finishAuditing] [varchar](500) NULL
)
set IDENTITY_INSERT [arrange_particularFinish] ON
insert into [arrange_particularFinish]([executeID],[exeDetailID],[fettle],[finish],[author],[writTime],
		[completionDate],[schedule],[Ctime],[finishAuditing])
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[arrange_particularFinish]
set IDENTITY_INSERT [arrange_particularFinish] OFF
*/
select * from arrange_particularFinish

/*
CREATE TABLE [dbo].[arrange_particularDepartmentPlan](
	[arrangeID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[topic] [varchar](100) NOT NULL,
	[styleOne] [varchar](50) NOT NULL,
	[startTime] [datetime] NULL,
	[endTime] [datetime] NULL,
	[author] [int] NOT NULL,
	[writeTime] [datetime] NOT NULL,
	[department] [int] NOT NULL,
	[sort] [varchar](50) NULL,
	[sytleTwo] [varchar](50) NULL,
	[auditing] [varchar](100) NULL,
	[auditName] [int] NULL,
	[timeBadge] [varchar](500) NOT NULL,
	[topAudinting] [int] NULL
)
set IDENTITY_INSERT [arrange_particularDepartmentPlan] ON
insert into [arrange_particularDepartmentPlan]([arrangeID],[topic],[styleOne],[startTime],[endTime],[author],
		[writeTime],[department],[sort],[sytleTwo],[auditing],[auditName],[timeBadge],[topAudinting])
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[arrange_particularDepartmentPlan]
set IDENTITY_INSERT [arrange_particularDepartmentPlan] OFF
*/
select * from arrange_particularDepartmentPlan

/*
CREATE TABLE [dbo].[arrange_particularDetail](
	[detailID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[identifier] [varchar](50) NULL,
	[content] [text] NOT NULL,
	[beginTime] [datetime] NOT NULL,
	[endTime] [datetime] NULL,
	[executor] [varchar](200) NULL,
	[assistant] [varchar](200) NULL,
	[remark] [varchar](1000) NULL,
	[timeBadge] [varchar](500) NOT NULL,
	[fettle] [varchar](100) NULL,
	[inform] [varchar](100) NULL,
	[choice] [varchar](200) NULL,
	[awokeTime] [varchar](50) NULL,
	[frequency] [varchar](500) NULL,
	[important] [varchar](50) NULL,
	[completeTime] [datetime] NULL,
	[awokeDate] [int] NULL,
	[topic] [varchar](100) NULL,
	[principal] [int] NULL,
	[topLevel] [int] NULL,
	[awokestime] [datetime] NULL,
	[awokeetime] [datetime] NULL,
	[isOrder] [int] NULL,
	[isAll] [int] NULL,
	[isexamine] [varchar](500) NULL,
	[jiShu] [int] NULL
)
set IDENTITY_INSERT [arrange_particularDetail] ON
insert into [arrange_particularDetail]([detailID],[identifier],[content],[beginTime],[endTime],[executor],
		[assistant],[remark],[timeBadge],[fettle],[inform],[choice],[awokeTime],[frequency],[important],
		[completeTime],[awokeDate],[topic],[principal],[topLevel],[awokestime],[awokeetime],[isOrder],
		[isAll],[isexamine],[jiShu])
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[arrange_particularDetail]
set IDENTITY_INSERT [arrange_particularDetail] OFF
*/
select * from arrange_particularDetail
GO

/*
CREATE PROCEDURE [dbo].[arrange_particularDepartmentPlan_GetModelByNotFulfill]   
@usersID int,  
@addWhere nvarchar(4000)  
as  
begin  
declare @strWhere nvarchar(4000)  
set @strWhere = 'select arrange_particularDepartmentPlan.arrangeID,arrange_particularDepartmentPlan.topic,  
arrange_particularDetail.topic as childTopic,[content],arrange_particularDepartmentPlan.department,  
arrange_particularDepartmentPlan.styleOne,beginTime,arrange_particularDetail.endTime,  
writeTime,author,executor,assistant,important,inform,choice,frequency,arrange_particularDetail.timeBadge,detailID,  
awokeDate,awokeTime,principal,  
(SELECT TOP (1) CONVERT(varchar, schedule) + '','' + CONVERT(varchar, completionDate, 23) AS Expr1  
                            FROM dbo.arrange_particularFinish  
                            WHERE (exeDetailID = dbo.arrange_particularDetail.detailID)  
                            ORDER BY writTime DESC) AS schedule  
from arrange_particularDepartmentPlan,arrange_particularDetail   
where arrange_particularDepartmentPlan.timeBadge=arrange_particularDetail.timeBadge and arrange_particularDetail.fettle=''未完成''  
and (arrange_particularDetail.executor like ''%'+convert(varchar,@usersID)+'%'' or arrange_particularDetail.assistant like ''%'+convert(varchar,@usersID)+'%'' or arrange_particularDetail.principal='+convert(varchar,@usersID)+')  
and isexamine=''已审批'''  
if @addWhere is not null  
begin  
set @strWhere=@strWhere+@addWhere  
set @strWhere=@strWhere+'order by writeTime desc'  
end  
else  
begin  
set @strWhere=@strWhere+'order by writeTime desc'  
end  
exec sp_executesql @strWhere  
END
GO

CREATE PROCEDURE [dbo].[arrange_particularDepartmentPlan_GetModelByNotFulfillUnderling]   
@usersID int,  
@addWhere nvarchar(4000)  
as  
begin  
declare @strWhere nvarchar(4000)  
set @strWhere = 'select arrange_particularDepartmentPlan.arrangeID,arrange_particularDepartmentPlan.topic,
arrange_particularDetail.topic as childTopic,[content],arrange_particularDepartmentPlan.department,
arrange_particularDepartmentPlan.styleOne,beginTime,arrange_particularDetail.endTime,writeTime,author,executor,
assistant,important,inform,choice,frequency,arrange_particularDetail.timeBadge,detailID,awokeDate,
awokeTime,principal,awokestime,awokeetime,  
(SELECT TOP (1) CONVERT(varchar, schedule) + '','' + CONVERT(varchar, completionDate, 23) AS Expr1  
                            FROM dbo.arrange_particularFinish  
                            WHERE (exeDetailID = dbo.arrange_particularDetail.detailID)  
                            ORDER BY writTime DESC) AS schedule  
from arrange_particularDepartmentPlan,arrange_particularDetail   
where arrange_particularDepartmentPlan.timeBadge=arrange_particularDetail.timeBadge   
and exists(select checkID from common_check where checkUserID='+convert(varchar,@usersID)+' and checkType=301  
and (userIDList like ''%''+convert(varchar,author)+''%'' or deptIDList like ''%''+convert(varchar,arrange_particularDepartmentPlan.department)+''%''))  
and arrange_particularDetail.executor not like ''%'+convert(varchar,@usersID)+'%''   
and arrange_particularDetail.assistant not like ''%'+convert(varchar,@usersID)+'%''   
and arrange_particularDetail.principal<>'+convert(varchar,@usersID)+'  
and isexamine=''已审批'' and arrange_particularDetail.fettle=''未完成'''  
if @addWhere is not null  
begin  
set @strWhere=@strWhere+@addWhere  
set @strWhere=@strWhere+'order by writeTime desc'  
end  
else  
begin  
set @strWhere=@strWhere+'order by writeTime desc'  
end  
exec sp_executesql @strWhere  
END
GO
sp_helptext arrange_particularDepartmentPlan_GetModelByNotFulfillUnderling
*/

/*
CREATE TABLE [dbo].[common_check](
	[checkID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[checkUserID] [int] NULL DEFAULT ((0)),
	[lev] [int] NULL DEFAULT ((0)),
	[checkType] [int] NULL DEFAULT ((0)),
	[userIDList] [text] NULL,
	[empNameList] [text] NULL,
	[deptIDList] [text] NULL,
	[deptNameList] [text] NULL,
	[checkName] [varchar](20) NULL
)
set IDENTITY_INSERT [common_check] ON
insert into [common_check]([checkID],[checkUserID],[lev],[checkType],[userIDList],[empNameList],
		[deptIDList],[deptNameList],[checkName])
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[common_check]
set IDENTITY_INSERT [common_check] OFF
*/
select * from common_check

GO

/*
CREATE procedure [dbo].[hr_userID_employee] @userID nvarchar(4000)  
as  
select departmentID,companyID,deptname as departmentName,companyName,posName as positionName,empName,
	employeeID,userID,positionID   
--from hr_emp_dep_new_v where    
--exists(select '1' from Split(@userID) s where hr_emp_dep_new_v.userID=s.Result )  
from hr_userall_v a  
where exists(select '1' from Split(@userID) s where a.userID=s.Result )


GO  

/*桌面制度分类分类，根据side字段-分栏栏*/  
CREATE proc [dbo].[knowledge_class_sys_top]  
(  
   @rowCount int,  
   --@getType varchar(50)  
   @side int  
)  
as  
set rowcount @rowCount  
--select a.classID,b.className,b.[property] from knowledge_class_plus a inner join knowledge_class b on a.classID=b.classID where b.[type]=@getType and a.isUse=1  
select a.classID,b.className,b.[property],b.[type] from knowledge_class_plus a inner join knowledge_class b on a.classID=b.classID where (b.[type]='sys' and a.isUse=1 and b.side=@side) order by b.sqnc  
set rowcount 0  
GO
*/

/*
CREATE TABLE [dbo].[sys_link_statistic](
	[id] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[link_type] [int] NULL,
	[link_id] [int] NULL,
	[link_count] [int] NULL
)
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'1(公司链接),2(个人链接)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'sys_link_statistic', @level2type=N'COLUMN',@level2name=N'link_type'
set IDENTITY_INSERT [sys_link_statistic] ON
insert into [sys_link_statistic]([id],[link_type],[link_id],[link_count])
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[sys_link_statistic]
set IDENTITY_INSERT [sys_link_statistic] OFF
*/
select * from sys_link_statistic

/*
CREATE TABLE [dbo].[sys_fastStart](
	[fsID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[fSName] [nvarchar](30) NOT NULL,
	[fsURL] [nvarchar](300) NOT NULL,
	[fsUserID] [int] NOT NULL,
	[classID] [int] NULL
)
set IDENTITY_INSERT [sys_fastStart] ON
insert into [sys_fastStart]([fsID],[fSName],[fsURL],[fsUserID],[classID])
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[sys_fastStart]
set IDENTITY_INSERT [sys_fastStart] OFF
*/
select * from sys_fastStart
GO

/*
CREATE proc [dbo].[sys_faststart_top]  
as  
select top 15 *,(select link_count from sys_link_statistic where link_type=1 and link_id=a.fsID) as link_count  
from sys_fastStart a order by link_count desc
GO

CREATE TABLE [dbo].[user_link](
	[ID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[link_url] [varchar](200) NULL,
	[classID] [int] NULL,
	[link_type] [varchar](50) NULL,
	[link_user] [int] NULL,
	[link_name] [varchar](200) NULL,
	[link_img] [image] NULL,
	[order_id] [int] NULL DEFAULT ((0))
)
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'连接类型（url，exe）' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'user_link', @level2type=N'COLUMN',@level2name=N'link_type'
set IDENTITY_INSERT [user_link] ON
insert into [user_link]([ID],[link_url],[classID],[link_type],[link_user],[link_name],[link_img],[order_id])
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[user_link]
set IDENTITY_INSERT [user_link] OFF
*/
select * from [user_link]
GO

/*
CREATE proc [dbo].[user_link_top]  
@userID int  
as  
select top 15 *,(select link_count from sys_link_statistic where link_type=2 and link_id=a.ID) as link_count  
from user_link a where link_user=@userID order by link_count desc
*/




--用户邮件权限表
CREATE TABLE [dbo].[mailRole_user](
	[mailUserID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[userID] [int] NULL,
	[isGo] [int] NULL DEFAULT ((0))
)
--角色邮件权限表
CREATE TABLE [dbo].[mailRole_group](
	[roleID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[groupID] [int] NULL,
	[isGO] [int] NULL DEFAULT ((0))
)
GO
--判断是否有邮件权限  
CREATE PROCEDURE [dbo].[maiRoleUser_isLook_all]   
(  
 @userID int  
)  
AS  
if (exists(select top 1 userID from mailRole_user where userID=@userID and isgo=1) or 
	exists(select top 1 groupID from mailRole_group where isgo=1 and groupID 
		in (select roleID from role_user where userID=@userID)))  
BEGIN  
 return 1  
END  
else  
begin  
 return 0  
end  

GO  

/*
CREATE TABLE [dbo].[mail_MailType](
	[typeID] [int] IDENTITY(100,1) NOT NULL PRIMARY KEY,
	[typeName] [varchar](50) NOT NULL,
	[userID] [int] NULL DEFAULT ((0)),
	[tp] [int] NULL DEFAULT ((0)),
	[icos] [nvarchar](50) NULL,
	[parentID] [int] NULL DEFAULT ((0)),
	[Email] [nvarchar](100) NULL,
	[UserName] [nvarchar](20) NULL,
	[Pwd] [nvarchar](30) NULL,
	[orderID] [int] NULL DEFAULT ((0))
)
set IDENTITY_INSERT [mail_MailType] ON
insert into [mail_MailType]([typeID],[typeName],[userID],[tp],[icos],[parentID],[Email],[UserName],[Pwd],[orderID])
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[mail_MailType]
set IDENTITY_INSERT [mail_MailType] OFF
*/
select * from [mail_MailType]

/*
CREATE TABLE [dbo].[mail_OtherSetting](
	[id] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[userID] [int] NULL,
	[Mail_username] [varchar](50) NULL,
	[Mail_pwd] [varchar](50) NULL,
	[popserver] [varchar](20) NULL,
	[pop_isSSL] [int] NULL DEFAULT ((0)),
	[pop_ssl] [varchar](20) NULL,
	[smtpserver] [varchar](20) NULL,
	[smtp_isSSL] [int] NULL DEFAULT ((0)),
	[smtp_ssl] [varchar](20) NULL,
	[isBackup] [int] NULL DEFAULT ((0)),
	[isDelSync] [int] NULL DEFAULT ((0)),
	[isSendForOut] [int] NULL DEFAULT ((0))
)
set IDENTITY_INSERT [mail_OtherSetting] ON
insert into [mail_OtherSetting]([id],[userID],[Mail_username],[Mail_pwd],[popserver],[pop_isSSL],[pop_ssl],
		[smtpserver],[smtp_isSSL],[smtp_ssl],[isBackup],[isDelSync],[isSendForOut])
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[mail_OtherSetting]
set IDENTITY_INSERT [mail_OtherSetting] OFF
*/
select * from [mail_OtherSetting]
GO

CREATE PROCEDURE [dbo].[mail_AllTypeList]  
(@userID   int)  
AS  
if  exists (select  name from sysobjects where name = '#tempMailtyleList')  
drop table  #tempMailtyleList  
create table #tempMailtyleList  
(  
orderID int,  
typeName varchar(50),  
typeID int,  
tp int,  
icos varchar(10),  
parentID int  
)  
insert into #tempMailtyleList  
select 0 as orderID,'内部邮箱' as typeName,97 typeID,0 as tp,'insidemail' as icos,0 as parentID union  
select 0 as orderID,'写邮件' as typeName,99 typeID,0 as tp,'xyj' as icos,97 as parentID union  
SELECT orderID,typeName,typeID,tp,icos,97 as parentID FROM mail_MailType WHERE userID=0 union  
SELECT orderID,typeName,typeID,tp,icos,parentID FROM mail_MailType WHERE userID=@userID  
order by typeID  
if exists(select 'e' from mail_OtherSetting where userID=@userID)  
begin  
insert into #tempMailtyleList  
select 0 as orderID,'写邮件' as typeName,1 typeID,0 as tp,'xyj' as icos,98 as parentID union  
SELECT orderID,typeName, (typeID-98) as typeID,tp,icos,98 as parentID FROM mail_MailType WHERE userID=0 union  
select 0 as orderID,'外部邮箱' as typeName,98 typeID,0 as tp,'netmail' as icos,0 as parentID union  
select id as orderID,Mail_username as typeName,-id as typeID,0 as tp,'' as icos,2 as parentID  from mail_OtherSetting where userID=@userID order by typeID  
end    
select * from #tempMailtyleList  
GO
  
CREATE TABLE [dbo].[mail_UserTypeRel](
	[userID] [int] NOT NULL,
	[mailID] [int] NOT NULL,
	[typeID] [int] NOT NULL,
	[flag] [int] NULL DEFAULT ((0)),
	[tag] [int] NOT NULL,
	[netmail] [int] NOT NULL,
	[sendTime] [datetime] NOT NULL,
	[receTime] [datetime] NULL,
	[Email] [nvarchar](100) NULL,
	[levels] [int] NULL DEFAULT ((3))
)
select * from mail_UserTypeRel
GO
--根据用户和类型删除邮件
CREATE PROCEDURE [dbo].[mail_DelAllFolder]  
(  
@typeID INT,  
@UserID INT  
)  
AS  
BEGIN TRAN  
DELETE from mail_UserTypeRel  WHERE userID=@UserID AND typeID=@typeID  
delete from mail_UserTypeRel  where typeID in  (select typeID from  mail_MailType where userID=@userID and parentID=@typeID)  
IF @@ERROR >0  
BEGIN   
ROLLBACK  
RETURN 1  
END  
ELSE  
COMMIT  
RETURN 0  
GO
--获取邮件类别
CREATE PROCEDURE [dbo].[mail_mailTypeList]  
AS  
SELECT orderID,typeName,typeID,tp,icos,parentID FROM mail_MailType WHERE userID=0 
GO



--获取邮件类别名称
CREATE PROCEDURE [dbo].[mail_MailTypeName]  
(  
@typeID INT  
)  
AS  
SELECT typeName FROM mail_MailType WHERE typeID=@typeID  
GO

--根据邮件id找到对应记录  
CREATE PROCEDURE mail_mailType_selectByID  
(  
 @typeID int  
)  
AS  
BEGIN  
 select * from mail_MailType where typeID=@typeID   
END  
GO

CREATE TABLE [dbo].[mail_mailTypeNew](
	[typeID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[typeName] [varchar](50) NULL,
	[orderID] [int] NULL DEFAULT ((0)),
	[isDel] [int] NULL DEFAULT ((0))
)
set IDENTITY_INSERT [mail_mailTypeNew] ON
insert into [mail_mailTypeNew]([typeID],[typeName],[orderID],[isDel])
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[mail_mailTypeNew]
set IDENTITY_INSERT [mail_mailTypeNew] OFF
select * from mail_mailTypeNew

CREATE TABLE [dbo].[mail_main](
	[mailID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[subject] [nvarchar](200) NOT NULL,
	[receiver] [nvarchar](4000) NOT NULL,
	[sender] [nvarchar](30) NULL,
	[senderName] [nvarchar](50) NULL,
	[userID] [int] NULL,
	[carbonCopy] [nvarchar](4000) NULL,
	[blindCarbonCopy] [nvarchar](4000) NULL,
	[content] [ntext] NULL,
	[lev] [int] NULL,
	[receipt] [int] NULL,
	[tag] [int] NOT NULL,
	[ReSend] [int] NULL DEFAULT ((0)),
	[mailTypeID] [int] NULL DEFAULT ((0)),
	[receiverName] [text] NULL,
	[carbonCopyName] [text] NULL,
	[blindCarbonCopyName] [text] NULL
)
GO
CREATE VIEW dbo.V_MailList  
AS  
SELECT     mm.mailID, mm.subject, mm.receiver, mm.senderName, mm.[content], mr.flag, mr.tag, mr.netmail, mr.userID, mr.typeID, mr.sendTime, mt.parentID,   
                      mm.lev, mr.levels, mm.receipt, ISNULL(dbo.mail_mailTypeNew.typeName, '系统邮件') AS mailTypeName, mm.receiverName, mm.carbonCopyName,   
                      mm.blindCarbonCopyName, mm.mailTypeID  
FROM         dbo.mail_mailTypeNew RIGHT OUTER JOIN  
                      dbo.mail_main AS mm ON dbo.mail_mailTypeNew.typeID = mm.mailTypeID RIGHT OUTER JOIN  
                      dbo.mail_UserTypeRel AS mr LEFT OUTER JOIN  
                      dbo.mail_MailType AS mt ON mr.typeID = mt.typeID ON mm.mailID = mr.mailID  
GO
--邮件列表已发送
CREATE PROCEDURE [dbo].[mail_MailList_send]  
(   
@UserID INT,  
@typeID INT,  
@s      NVARCHAR(50)  
)  
AS  
BEGIN   
--执行查询  
IF @s =''  
IF @typeID >= 105  
SELECT lev,receiverName,mailTypeName, receipt,TYPEID, levels,mailID,subject,receiver,senderName,flag,tag,netmail,sendTime  
FROM V_MailList WHERE   
TYPEID=@typeID AND userID=@UserID  
ORDER BY flag,sendTime DESC  
ELSE  
SELECT lev,receiverName,mailTypeName,receipt,TYPEID,levels,mailID,subject,receiver,senderName,flag,tag,netmail,sendTime FROM(  
SELECT lev,receiverName,mailTypeName,receipt,TYPEID,levels, mailID,subject,receiver,senderName,flag,tag,netmail,sendTime   
FROM V_MailList WHERE   
TYPEID=@typeID AND userID=@UserID  
UNION ALL  
SELECT lev,receiverName,mailTypeName,receipt,TYPEID,levels,mailID,subject,receiver,senderName,flag,tag,netmail,sendTime   
FROM V_MailList WHERE   
parentID=@typeID AND userID=@UserID  
)V   
ORDER BY flag,sendTime DESC  
ELSE--有查询条件  
IF @typeID >= 105  
SELECT lev,receiverName,mailTypeName,receipt,TYPEID,levels,mailID,subject,receiver,senderName,flag,tag,netmail,sendTime    
FROM V_MailList WHERE   userID=@UserID and (TYPEID=@typeID or (typeID=(select parentID from mail_MailType where typeID=@typeID) and (senderName like +'%'+(select typeName from mail_MailType where typeID=@typeID)+'%') ))   
and (  receiverName like +'%'+@s+'%')  
ORDER BY flag,sendTime DESC  
ELSE  
SELECT lev,receiverName,mailTypeName,receipt,TYPEID,levels,mailID,subject,receiver,senderName,flag,tag,netmail,sendTime FROM(  
SELECT lev,receiverName,mailTypeName,receipt,TYPEID,levels, mailID,subject,receiver,senderName,flag,tag,netmail,sendTime    
FROM V_MailList WHERE   userID=@UserID and ( TYPEID=@typeID or typeID=(select parentID from mail_MailType where typeID=@typeID))  
UNION ALL  
SELECT lev,receiverName,mailTypeName,receipt,TYPEID,levels, mailID,subject,receiver,senderName,flag,tag,netmail,sendTime    
FROM V_MailList WHERE  parentID=@typeID AND userID=@UserID   
)V  where ( receiverName like +'%'+@s+'%')  
ORDER BY flag,sendTime DESC  
END  
GO

--邮件列表(新)
CREATE PROCEDURE [dbo].[mail_MailList_new]  
(   
@UserID INT,  
@typeID INT,  
@s      NVARCHAR(50),  
@startDate datetime,  
@endDate datetime  
)  
AS  
BEGIN   
set @endDate=dateadd(dd,1,@endDate)  
--执行查询  
IF @s =''  
IF @typeID >= 105  
begin  
SELECT lev,receiverName,mailTypeName, receipt,TYPEID, levels,mailID,subject,receiver,senderName,flag,tag,netmail,sendTime  
FROM V_MailList WHERE  userID=@UserID and sendTime>=@startDate and sendTime<=@endDate and typeID<>103 and typeID<>104  
ORDER BY flag,sendTime DESC  
end  
ELSE  
begin  
SELECT lev,receiverName,mailTypeName,receipt,TYPEID,levels,mailID,subject,receiver,senderName,flag,tag,netmail,sendTime FROM(  
SELECT lev,receiverName,mailTypeName,receipt,TYPEID,levels, mailID,subject,receiver,senderName,flag,tag,netmail,sendTime   
FROM V_MailList WHERE   
TYPEID=@typeID AND userID=@UserID and sendTime>=@startDate and sendTime<=@endDate  
UNION ALL  
SELECT lev,receiverName,mailTypeName,receipt,TYPEID,levels,mailID,subject,receiver,senderName,flag,tag,netmail,sendTime   
FROM V_MailList WHERE   
parentID=@typeID AND userID=@UserID and sendTime>=@startDate and sendTime<=@endDate  
)V   
ORDER BY flag,sendTime DESC  
end  
ELSE--有查询条件  
IF @typeID >= 105  
begin  
SELECT lev,receiverName,mailTypeName,receipt,TYPEID,levels,mailID,subject,receiver,senderName,flag,tag,netmail,sendTime    
FROM V_MailList WHERE   userID=@UserID and (TYPEID=@typeID or (typeID=(select parentID from mail_MailType where typeID=@typeID) and (senderName like +'%'+(select typeName from mail_MailType where typeID=@typeID)+'%') ))   
and (  senderName like +'%'+@s+'%'  or subject like +'%'+@s+'%') and sendTime>=@startDate and sendTime<=@endDate  
ORDER BY flag,sendTime DESC  
end  
ELSE--收件箱  
begin  
SELECT lev,receiverName,mailTypeName,receipt,TYPEID,levels,mailID,subject,receiver,senderName,flag,tag,netmail,sendTime FROM(  
SELECT lev,receiverName,mailTypeName,receipt,TYPEID,levels, mailID,subject,receiver,senderName,flag,tag,netmail,sendTime    
FROM V_MailList WHERE   userID=@UserID and ( TYPEID=@typeID or typeID=(select parentID from mail_MailType where typeID=@typeID) and sendTime>=@startDate and sendTime<=@endDate)  
UNION ALL  
SELECT lev,receiverName,mailTypeName,receipt,TYPEID,levels, mailID,subject,receiver,senderName,flag,tag,netmail,sendTime    
FROM V_MailList WHERE  parentID=@typeID AND userID=@UserID   
)V  where (  senderName like +'%'+@s+'%' or subject like +'%'+@s+'%') and sendTime>=@startDate and sendTime<=@endDate  
ORDER BY flag,sendTime DESC  
end  
END  
GO 
  
--得到已发送的信  
CREATE PROCEDURE [dbo].[mail_mailListForSend]  
(  
 @userID int  
)   
AS  
BEGIN  
select receiverName, lev, isnull((select typeName from mail_mailTypeNew where typeID=mail_main.mailTypeID),'系统邮件')  as mailTypeName   
,receipt,TYPEID=99,levels=3,mailID,subject,senderName,flag=1,tag,(select max(sendTime) from mail_UserTypeRel where mailID=mail_main.mailID) as sendTime  
from mail_main where userID=@userID and (select max(sendTime) from mail_UserTypeRel where mailID=mail_main.mailID) is not null  
and lev<>2 and (select count(*) from mail_UserTypeRel where mailID=mail_main.mailID and userID<>@userID)>0  
order by mailID desc  
END  
GO

CREATE TABLE [dbo].[mail_Other_UID](
	[id] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[MailUID] [varchar](100) NULL,
	[MailUserName] [varchar](50) NULL,
	[userID] [int] NULL,
	[OAMailID] [int] NULL DEFAULT ((0))
)
GO
--获取所有外部邮件
Create proc Mail_getAllNetMailID_byUser  
(  
@id int,  
@userID int  
)  
as  
begin  
declare  @mailID_str varchar(max),@mailuserName varchar(50)  
set @mailID_str=''  
select @mailuserName=Mail_username from mail_OtherSetting where id=abs(@id)  
select @mailID_str=@mailID_str+cast(isnull(OAMailID,'0') as varchar)+',' from mail_Other_UID where MailUserName=@mailuserName and userID=@userID  
 if(@mailID_str is not null and @mailID_str!='')  
 set @mailID_str=left(@mailID_str,len(@mailID_str)-1)  
 else  
 set @mailID_str='0'  
 select @mailID_str as mailID_str  
end  
go

/*通知获取，这边获取所有通知按时间排序，和分类无关*/  
create proc [dbo].[knowledge_notice_get]  
(  
     @rowcount int  
)  
as  
set rowcount @rowcount  
select * from knowledge_document where sortID in   
(select classID from knowledge_class where [type]='notice' and parentID<>0) order by sDate desc  
set rowcount 0  
GO

CREATE proc [dbo].[knowledge_document_plus_get]  
(  
   @documentID int  
)  
as  
  select documentID,isnull(enjoyUser,'') as enjoyUser,isnull(relativeDoc,'') as relativeDoc,isnull(allowAccessories,'') as allowAccessories,isnull(allowRoles,'') as allowRoles  
,isnull(users,'') as users,isnull(roles,'') as roles from knowledge_document_plus where documentID=@documentID
GO

CREATE TABLE [dbo].[hr_employee_birthdayRule](
	[birthdayID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY CLUSTERED,
	[typeName] [varchar](20) NULL,
	[wishName] [varchar](200) NULL
)
set IDENTITY_INSERT [hr_employee_birthdayRule] ON
insert into [hr_employee_birthdayRule]([birthdayID],[typeName],[wishName])
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[hr_employee_birthdayRule]
set IDENTITY_INSERT [hr_employee_birthdayRule] OFF
select * from [hr_employee_birthdayRule]
GO

CREATE PROCEDURE [dbo].[hr_employee_birthdayRule_select]   
AS  
BEGIN  
select * from  hr_employee_birthdayRule  
END  
GO

--得到 本月过生日的员工  
CREATE PROCEDURE [dbo].[hr_employee_birthday]  
   
AS  
BEGIN  
  select * from hr_employee_v where month(birthday)=month(getdate()) and leave=0  
 order by day(birthday)  
END  
GO

CREATE TABLE [dbo].[info_mainVote](
	[mainVoteID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY CLUSTERED,
	[title] [varchar](5000) NULL,
	[bewrite] [text] NULL,
	[cryptonym] [int] NULL,
	[creator] [int] NULL,
	[createTime] [datetime] NULL,
	[pollstartTime] [datetime] NULL,
	[pollEndtime] [datetime] NULL,
	[desgnate] [varchar](5000) NULL,
	[provable] [varchar](5000) NULL,
	[behoveNo] [int] NULL,
	[auditing] [varchar](50) NULL,
	[cause] [varchar](5000) NULL,
	[author] [varchar](50) NULL
)
set IDENTITY_INSERT [info_mainVote] ON
insert into [info_mainVote]([mainVoteID],[title],[bewrite],[cryptonym],[creator],[createTime],[pollstartTime],[pollEndtime],
	[desgnate],[provable],[behoveNo],[auditing],[cause],[author])
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[info_mainVote]
set IDENTITY_INSERT [info_mainVote] OFF
GO
CREATE PROCEDURE [dbo].[info_mainVote_GetModeluserControl]  
@userID int,  
@employID int  
 AS   
 SELECT   
  top 9 title,mainVoteID  
  FROM [info_mainVote]  
  WHERE desgnate='' or desgnate like +'%'+convert(varchar,@employID)+'%'  
 order by pollstartTime desc

CREATE TABLE [dbo].[sys_mtlink](
	[id] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY CLUSTERED ,
	[class_id] [int] NULL,
	[link_name] [varchar](400) NULL,
	[link_url] [varchar](1000) NULL,
	[order_id] [int] NULL DEFAULT ((0)),
	[date] [datetime] NULL DEFAULT (((1900)-(1))-(1))
)
set IDENTITY_INSERT [sys_mtlink] ON
insert into [sys_mtlink]([id],[class_id],[link_name],[link_url],[order_id],[date])
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[sys_mtlink]
set IDENTITY_INSERT [sys_mtlink] OFF

GO
CREATE procedure [dbo].[GetButtonFID]  
(  
@PageNamge nvarchar(100),  
@para    nvarchar(100),  
@userID  nvarchar(100)  
)  
as  
begin  
begin tran  
  
select keyID from soa_userControlRoles where para=@para and typeID=@PageNamge and userID=@userID  
  
if @@error > 0  
begin  
rollback tran  
return 1  
end  
else  
commit tran  
return 0  
end   
GO

 

CREATE VIEW dbo.common_check_v  
AS  
SELECT     dbo.common_check.checkID, dbo.common_check.checkUserID, dbo.common_check.lev, dbo.common_check.checkType,   
                      dbo.common_check.userIDList, dbo.common_check.empNameList, dbo.common_check.deptIDList, dbo.common_check.deptNameList,   
                      dbo.common_check.checkName, dbo.hr_userAll_v.empName, dbo.hr_userAll_v.departmentID, dbo.hr_userAll_v.companyID, dbo.hr_userAll_v.groupID,   
                      dbo.hr_userAll_v.deptname, dbo.hr_userAll_v.posname  
FROM         dbo.common_check LEFT OUTER JOIN  
                      dbo.hr_userAll_v ON dbo.common_check.checkUserID = dbo.hr_userAll_v.userID  
 
CREATE TABLE [dbo].[common_checkType2](
	[tID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[isOrder] [int] NULL DEFAULT ((0)),
	[isAll] [int] NULL DEFAULT ((0)),
	[checkType] [int] NULL
)       
           
create PROCEDURE [dbo].[common_checkType2_selectBycheckType]  
@checkType int  
  
 AS   
 select * from common_checkType2 where checkType=@checkType  


  
CREATE PROCEDURE [dbo].[hr_organizetree]  
(  
 @companyid int,  
 @deptid int,  
 @posid int,  
 @employid int   
)  
as   
  
if  exists (select  name from sysobjects where name = '#temphr')  
drop table  #temphr  
   
create table #temphr  
(  
ID int,  
cName varchar(50),  
pNameID int,  
cItem int  
)  
--集团  
  
insert into #temphr(ID,cName,pNameID,cItem)  
SELECT groupID as ID,  
groupName as cName,  
0 as pNameID ,  
1 as cItem   
FROM hr_group where [disable]=0 order by orderID  
  
--公司  
if(@companyid=1)  
insert into #temphr(ID,cName,pNameID,cItem)  
SELECT companyID as ID,  
cName as cName,  
(case    
 when parCompany=0  then groupID  
 when parCompany>0 then parCompany  
end ) as pNameID,  
2 as cItem   
FROM hr_company where [disable]=0 order by orderID  
  
--部门  
if(@deptid=1)  
insert into #temphr(ID,cName,pNameID,cItem)  
SELECT departmentID as ID,  
cName as cNameID,  
(case    
 when parDepartment=0  then companyID  
 when parDepartment>0 then parDepartment  
end ) as pNameID,  
3 as cItem   
FROM hr_department where [disable]=0  order by orderID  
  
  
--人员  
if(@employid=1)  
insert into #temphr(ID,cName,pNameID,cItem)  
SELECT employeeID as ID,  
empName as cName,departmentID as pNameID,  
5 as cItem   
FROM hr_employee inner join hr_position on hr_position.positionID=hr_employee.positionID   
where leave=0   
order by levels  
select  * from  #temphr   
GO
sp_helptext hr_organizetree
GO
--附件表新增  
CREATE PROCEDURE [dbo].[sys_ass_select]  
(  
   
 @typeName varchar(50)  
  
)  
AS  
  
begin  
 select * from sys_ass where typeName=@typeName and isdel=0 and isgo=0  
 order by orderID  
end  
   

CREATE TABLE [dbo].[sys_onLineUser](
	[onLinUserID] [int] NULL,
	[updateDate] [datetime] NULL
)
insert into [sys_onLineUser]([onLinUserID],[updateDate])
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[sys_onLineUser]
		
  
--在线人员列表 编辑  
create PROCEDURE [dbo].[sys_onLineUser_edit]  
(  
 @onLinUserID  int  
)   
AS  
BEGIN  
 begin tran  
 delete from sys_onLineUser where onLinUserID=@onLinUserID  
 insert into sys_onLineUser(onLinUserID,updateDate) values(@onLinUserID,getdate())  
 if @@error>0  
 begin  
  rollback  
  return 1  
 end  
 else  
 begin  
  commit  
  return 2  
 end  
END  
  

  
--辅助资料树形结构  
CREATE PROCEDURE [dbo].[sys_ass_tree]  
(  
 @typeName varchar(50)  
)  
AS  
BEGIN  
--if  exists (select  name from sysobjects where name = '#tempASS')  
-- drop table  #tempASS  
--   
--create table #tempASS  
--(  
-- ID int,  
-- cName varchar(50),  
-- pNameID int  
--)  
--insert into #tempASS(ID,cName,pNameID)  
--select aID,cName,pID  
--from sys_ass where typeName=@typeName  
 select aid as id,cName,pid as pNameID from sys_ass where typeName=@typeName and isdel=0  
  order by orderID  
END  
  
  
  
  



--项目文档类型
/*
create table project_class(
	classID int identity(900000,1) primary key,
	parentID int,
	className varchar(30),
	remark varchar(100),
	ERPFormID int
);
*/
select * from project_class
GO
/*
set IDENTITY_INSERT project_class ON
insert into project_class(classID,parentID,className,remark,ERPFormID)
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.project_class
set IDENTITY_INSERT project_class OFF
*/
CREATE TABLE [dbo].[common_checkOperation](
	[oID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[checkType] [int] NULL DEFAULT ((0)),
	[mainID] [int] NULL DEFAULT ((0)),
	[checkLev] [int] NULL DEFAULT ((0)),
	[checkUserID] [int] NULL DEFAULT ((0)),
	[checkDate] [datetime] NULL DEFAULT (getdate()),
	[remark] [text] NULL,
	[userID] [int] NULL DEFAULT ((0)),
	[deptID] [int] NULL DEFAULT ((0)),
	[isAgree] [int] NULL DEFAULT ((0))
)
--实施项目视图
create view Project_Imp_Apply_v   
as  
select t1.Project_ID, t1.saleID, t1.insert_people, t1.support_people, t1.project_establishment,
	t1.insert_date,t1.Close_Reason,t1.Txt_phone,t1.Useramount,t1.Imp_projecttype,t1.Isonserver,t1.Delivery,
	t1.Contractsigning,t1.Signdays,t1.Signmoney,t1.Financing,t1.Txt_ssdays,t1.Txt_allowdays,t1.Imp_effect,
	t1.Customerdevelopment,t1.Imp_method,t1.Imp_payment,t1.Imp_free,t1.Leadership,t1.It,t1.Sys_equipment,
	t1.Pro_manager,t1.Sta_positions,t1.Data_preparation,t1.Txt_problem,t1.Payment,t2.employeeID, t2.departmentID, 
	t2.companyID, t2.groupID, t2.empName, t2.posname, t2.deptname,t1.Contract_ID,t1.ProductName,t1.ProductInfo,
	t1.isAll, t1.isOrder, t1.this_checkState,t1.Crm_PersionID,t1.Crm_CompanyID,   
    (case when t1.this_checkState = 2 then '待审' when t1.this_checkState = 1 then '拒绝' else '同意' end)   
    as this_checkStateName,t1.informationRemark, t1.project_Name,t1.saleType,t1.support_Date_beg, 
    t1.support_Date_end, t1.support_people_main_Check, t1.support_people_other_Check,t1.support_Date_beg_check, 
    t1.support_Date_end_check, t1.Project_ItemMainstate, sa.cName,p.pName,p.deptName as crm_deptName,p.pTypeName,
    p.email,com.companyName,com.address as companyAddress,k.contract_code2,k.Contract_sign_date,k.Contract_start_date,
    k.Contract_end_date,k.Contract_signer,k.Contract_class_name,k.contract_id as con_id,
    (select top(1) pushstate_time from Project_Imp_PushState where Project_ID = t1.Project_ID  
		order by pushstate_time, Project_psId) as actualStartDate, t1.Project_MainstateTime,  
    (select top(1) sy.cName from Project_Imp_PushState pn inner join sys_ass sy on sy.aID = pn.pushstate_name  
		where pn.Project_ID = t1.Project_ID order by pn.pushstate_time desc, pn.Project_psId desc) as 当前状态,  
    (select top(1) pushstate_name from Project_Imp_PushState ppn where Project_ID = t1.Project_ID 
		order by pushstate_time desc, Project_psId desc) as 当前状态ID,  
    (select isnull(pushState, '') as Expr1 from project_template pt where t1.saleType = saleType 
		and menu = 'Implementation') as pushStates,  
    (select isnull(pushState, '') as Expr1 from project_template where templateName = '实施项目默认模板' 
		and menu = 'Implementation') as commonStates,  
    (select sum(isAgree) as Expr1 from common_checkOperation as cco where mainID = t1.Project_ID 
		AND checkType = 703) AS allState,  
    (select dbo.get_DeptString(t1.support_people_main_Check,'|')) as DeptId_Main,  
    (select dbo.get_DeptString(t1.support_people_other_Check,'|')) as DeptId_Other  
from Project_Imp_Apply t1 left outer join  
     hr_userAll_v t2 on t1.insert_people = t2.userID left outer join 
     sys_ass sa on sa.aID = t1.saleType left outer join 
     crm_person_v as p on p.personID = t1.Crm_PersionID left outer join
     crm_Company as com on com.companyID = t1.Crm_CompanyID left outer join 
     kingdee_contract_main_v as k on k.contract_id = t1.Contract_ID   
GO
-------------------------------------------------------------------------------------------------
select * from Project_Imp_Apply_v
CREATE TABLE [dbo].[Project_Imp_Comments](
	[CommentID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[Project_spwID] [int] NULL,
	[CommentDate] [datetime] NULL DEFAULT (getdate()),
	[CommentContent] [varchar](1000) NULL,
	[CommentPeople] [int] NULL
)
GO
--实施点评视图
create view Imp_Comments_v  
as                     
select pc.CommentID,pc.Project_spwID,
		convert(varchar(100),pc.CommentDate, 23) CommentDate,
		pc.CommentContent,pc.CommentPeople,pspw.工作记录ID,pav.*,pspw.顾问ID,pspw.顾问姓名,
		pspw.顾问来源,pspw.推进状态,pspw.工作量,pspw.实际开始时间,pspw.实际结束时间,pspw.记录时间,
		pspw.记录人,(select empName from hr_users_v where userID=pc.CommentPeople) as 点评人,
		pspw.是否有效
from Project_Imp_Comments pc inner join  
     Imp_WorkCount_v pspw on pc.Project_spwID = pspw.工作记录ID inner join  
     Project_Imp_Apply_v pav on pav.Project_ID = pspw.Project_ID
go
-------------------------------------------------------------------------------------
select * from Imp_Comments_v

--项目文档
create table Project_NewDocument(
	documentID int identity(1,1) primary key,
	title varchar(600),
	contents text,
	sortID int,
	insertUserID int,
	sDate datetime default getdate()
)
select * from Project_NewDocument
set IDENTITY_INSERT Project_NewDocument ON
insert into Project_NewDocument(documentID,title,contents,sortID,insertUserID,sDate)
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.Project_NewDocument
set IDENTITY_INSERT Project_NewDocument OFF
--暂无使用，项目文档授权信息表
create table project_document_plus(
	id int identity(1,1) primary key,
	documentID int,
	users varchar(8000),
	roles varchar(600)
);
select * from project_document_plus

--项目文档附件信息表
create table project_accessories(
	accID int identity(1,1) primary key,
	trueName varchar(200),
	fileSize decimal(18, 2),
	serverName varchar(60),
	serverPath varchar(100),
	thesisID int,
	whatType varchar(60)
);
select * from project_accessories
set IDENTITY_INSERT project_accessories ON
insert into project_accessories(accID,trueName,fileSize,serverName,serverPath,thesisID,whatType)
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.project_accessories
set IDENTITY_INSERT project_accessories OFF
-- sortID：文档类型 title：标题 contents：内容
-- userID：文档创建者 users：授权人员 roles：授权部门 thesisID：附属主题  whatType：所属类别

--创建项目，文档关联表
CREATE TABLE [dbo].Project_Doc_Link(
	Project_dID INT IDENTITY(1,1) NOT NULL,--id
	documentID INT NOT NULL, --提交文档
	Project_ID INT NOT NULL,--项目ID
	PushState_Name INT,--任务阶段ID
	Project_psID INT NOT NULL DEFAULT(0),--项目阶段记录ID
	Project_dtID INT NOT NULL, --项目阶段文档类型关联关系ID
	Menu VARCHAR(30) --模块名(PreSale,Implementation,Develop)
)
SELECT * FROM Project_Doc_Link
--项目模板
SELECT * FROM Project_Template
go
--项目信息表
-- this_checkState 0:同意 1:拒绝 2:待审
-- PreSale_ItemMainstate 0:进行中 1:成功 2:暂停 3:失败

select * from Project

select 序号=row_number() over(order by project_id),* from Project 
	where 107 in(select result from Split(support_people_main_Check)) --字符串分割
alter table Project add Predict_Day float
alter table Project add project_Type varchar(30)
alter table Project add Project_Template varchar(300)
update Project set project_Type = 'PreSale'
go
--创建新的项目售前信息视图
/*
create view Project_Apply_v
	as
	select t1.project_id,t1.saleID,t1.insert_people,t1.support_people,
		convert(varchar(100),t1.insert_date, 23) insert_date,
		convert(varchar(100),t1.project_establishment, 23) project_establishment,t1.open_tender,
		t1.information_usage,t1.purpose,t1.preparation_work,t1.isAll,t1.isOrder,t1.this_checkState,
		t1.project_Name,t1.product_type,convert(varchar(100),t1.support_Date_beg, 23) support_Date_beg,
		convert(varchar(100),t1.support_Date_end, 23) support_Date_end,t1.support_people_main_Check,
		t1.support_people_other_Check,convert(varchar(100),t1.support_Date_beg_check,23) support_Date_beg_check,
		convert(varchar(100),t1.support_Date_end_check, 23) support_Date_end_check,t1.project_ItemMainstate,
		convert(varchar(100),t1.support_people_changeDate, 23) support_people_changeDate,t1.predict_Price,
		convert(varchar(100),t1.signTime, 23) signTime,t1.project_Type,t1.close_reason,
		convert(varchar(100),t1.project_MainstateTime, 23) project_MainstateTime,
		t2.employeeID, t2.departmentID, t2.companyID,t2.groupID, t2.empName, t2.posname, 
		t2.deptname, t3.companyName, t3.companyxz,t3.cusID, t3.address,t3.bossName,sa.cName,
		(case when t1.this_checkState = 2 then '待审' when t1.this_checkState = 1 then '拒绝' else '同意' end) 
			as this_checkStateName,
		(select top 1 convert(varchar(100),ppn.pushstate_time, 23) actualStartDate from Project_pushstate ppn 
			where ppn.project_id=t1.project_id order by ppn.pushstate_time,project_psId) actualStartDate,
		(select top 1 sy.cName from Project_pushstate ppn inner join sys_ass sy on sy.aID=ppn.pushstate_name 
			where ppn.project_id=t1.project_id order by ppn.pushstate_time desc,project_psId desc) as currentState,
		(select top 1 ppn.pushstate_name from Project_pushstate ppn where ppn.project_id=t1.project_id 
			order by ppn.pushstate_time desc,project_psId desc) as currentStateID,
		(select isnull(pt.pushState,'') from project_template pt where t1.product_type=pt.saleType 
			and menu='PreSale') as pushStates,
		(select isnull(pushState,'') from project_template where saleType=0 and menu='PreSale') as commonStates,
		(select sum(cco.isAgree) from common_checkOperation cco where cco.mainID=t1.project_id 
			and checktype=804) as allState,
		(select top 1 cco.isAgree from common_checkOperation cco where cco.mainID=t1.project_id 
			and checktype=804 order by checkLev desc) as maxLevState,
		t1.Project_Template,t1.Predict_Day
	FROM dbo.Project AS t1 LEFT OUTER JOIN
         dbo.hr_userAll_v AS t2 ON t1.insert_people = t2.userID LEFT OUTER JOIN
         dbo.crm_sale_all_v AS t3 ON t3.saleID = t1.saleID left outer join
         sys_ass sa on sa.aID=t1.product_type
*/
select * from Project_Apply_v 
go
--项目阶段信息
/*
sp_rename 'PreSale_pushstate_New', 'Project_pushstate'
sp_rename 'Project_pushstate.PreSale_ID', 'project_id','column'
sp_rename 'Project_pushstate.PreSale_psId', 'project_psId','column'
*/
alter table Project_pushstate drop column project_Type
create table Project_pushstate(
	project_psId int identity(1,1) primary key,
	project_id int not null,
	pushstate_time datetime not null,
	pushstate_name int not null,
	pushstate_remark varchar(1000),
	isEff bit
);
set identity_insert Project_pushstate on
insert into Project_pushstate(project_psId,project_id,pushstate_time,pushstate_name,pushstate_remark,isEff)
	select PreSale_psId,PreSale_ID,pushstate_time,pushstate_name,pushstate_remark,isEff from opendatasource(
			'sqloledb','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.PreSale_pushstate_New
set identity_insert Project_pushstate off
select * from Project_pushstate where project_id=55
--项目工作量表
sp_rename 'PreSale_Support_people_workCount', 'Project_workCount'
sp_rename 'Project_workCount.PreSale_spwID', 'project_workId','column'
sp_rename 'Project_workCount.PreSale_ID', 'project_id','column'
sp_rename 'Project_workCount.PreSale_psId', 'project_psId','column'
create table Project_workCount(
	project_workId int IDENTITY(1,1) NOT NULL,
	project_id int not null,--项目ID
	project_psId int not null,--推进记录ID
	pushState int not null,--推进状态ID
	support_people int not null,--支持人员
	support_people_name varchar(30),--支持人员姓名
	support_people_type int,--支持人员归属
	workCount decimal(8,4) null,--工作时间（小时）
	actual_date_beg datetime,
	actual_date_end datetime,
	record_people int not null,--记录人
	create_time datetime default getdate()--创建时间
);
set identity_insert Project_workCount on
insert into Project_workCount(project_workId,project_id,project_psId,pushState,support_people,support_people_name,
		support_people_type,workCount,actual_date_beg,actual_date_end,record_people,create_time)
	select PreSale_spwID,PreSale_ID,PreSale_psId,pushState,support_people,support_people_name,support_people_type,
			workCount,actual_date_beg,actual_date_end,record_people,create_time 
		from opendatasource('sqloledb','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456'
		).SaigeOA.dbo.PreSale_Support_people_workCount
set identity_insert Project_workCount off
select * from Project_workCount where project_id=15 and support_people=292
--创建项目工作量视图
create view Project_WorkCount_v
	as
	select pw.project_workId,pav.*,pw.support_people as support_userID,hv.employeeID as support_employeeID,
		support_people_name,support_people_type,
		pw.project_psId,pw.pushState,sa.cName as pushStateName,
		pw.workCount,pw.actual_date_beg,
		pw.actual_date_end,pw.create_time,
		(select empName from hr_users_v where userID=pw.record_people) as record_people,
		(select pushstate_time from Project_pushstate ppn where ppn.project_psId=pw.project_psId) as pushstate_time,
		(select pushstate_remark from Project_pushstate ppn where ppn.project_psId=pw.project_psId) as pushstate_remark,
		(select isEff from Project_pushstate ppn where ppn.project_psId=pw.project_psId) as isEff
	from Project_workCount pw 
		inner join Project_Apply_v pav on pav.project_id=pw.project_id 
		inner join sys_ass sa on pw.pushState=sa.aID
		left outer join hr_users_v hv on pw.support_people = hv.userID
--------------------------------------------------------------------------
select * from Project_WorkCount_v
--创建点评记录信息表
sp_rename 'PreSale_Comments', 'Project_Comments'
sp_rename 'Project_Comments.PreSale_spwID', 'project_workId','column'
create table Project_Comments(
	CommentID int IDENTITY(1,1) NOT NULL,--主键ID
	project_workId int not null,--工作记录ID
	CommentDate datetime default getdate(),--点评时间
	CommentContent varchar(400),--点评内容
	CommentPeople int
);
--创建点评记录信息视图
create view Project_Comments_v
	as
	select pc.CommentID,convert(varchar(100),pc.CommentDate, 23) CommentDate,pc.CommentContent,pc.CommentPeople,
		(select empName from hr_users_v where userID=pc.CommentPeople) as CommentPeopleName, pw.*
	from Project_Comments pc 
		inner join Project_WorkCount_v pw on pc.project_workId=pw.project_workId
-----------------------------------------------------------------------------------
select * from Project_Comments_v
set identity_insert Project_Comments on
insert into Project_Comments(CommentID,project_workId,CommentDate,CommentContent,CommentPeople)
	select CommentID,PreSale_spwID,CommentDate,CommentContent,CommentPeople 
		from opendatasource('sqloledb','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456')
			.SaigeOA.dbo.PreSale_Comments
set identity_insert Project_Comments off
select * from Project_Comments
--拜访对象信息
/*
sp_rename 'PreSale_baifangduixiang', 'Project_customer'
sp_rename 'Project_customer.PreSale_ID', 'project_id','column'
CREATE TABLE [dbo].[Project_customer](
	[project_id] [int] NULL,
	[personID] [int] NULL,
	[zhichidu] [int] NULL,
	[yingxiangdu] [int] NULL,
	[juese] [int] NULL
)
*/
select * from Project_customer
--项目拜访对象视图
/*
Create view Project_customer_v
as
select t1.*,t2.PName as personName,t2.pTypeName,t2.mobileTel  
	from Project_customer as t1 left join crm_person_v t2 on t1.personID=t2.personID
*/
select * from Project_customer_v
--客户人员视图
/*
CREATE VIEW [dbo].[crm_person_v]  
AS  
SELECT     dbo.crm_person.personID, dbo.crm_person.companyID, dbo.crm_person.typeID, dbo.crm_person.mobileTel, dbo.crm_person.officeTel, dbo.crm_person.houseTel, dbo.crm_person.QQ,dbo.crm_person.updateTime,   
                      dbo.crm_person.MSN, dbo.crm_person.birthday, dbo.crm_person.remark, dbo.crm_person.pName, dbo.crm_person.email, dbo.crm_person.likes, dbo.crm_personType.cName AS pTypeName,   
                      dbo.crm_person.states, dbo.crm_person.mobileTel2, dbo.crm_person.officeTel2, dbo.crm_person.fax, dbo.crm_person.deptID, dbo.crm_personDept.cName AS deptName,   
                      (CASE WHEN CONVERT(varchar(50), year(crm_person.birthday)) = '1900' THEN '' WHEN CONVERT(varchar(50), year(crm_person.birthday)) <> '1900' THEN CONVERT(varchar(50),   
                      month(crm_person.birthday)) + '-' + CONVERT(varchar(50), day(crm_person.birthday)) END) AS birthday2, dbo.crm_person.insertUserID, dbo.crm_person.userIDList, dbo.crm_person.orgIDList,   
                      dbo.crm_person.empNameList, dbo.crm_person.orgNameList, isnull(dbo.hr_users_v.departmentID,0)departmentID, dbo.crm_company_v.companyName, dbo.crm_company_v.industryName,   
                      dbo.crm_company_v.companyTypeName, dbo.crm_company_v.typeNameList as perYypeName, dbo.crm_person.insertDate, dbo.hr_users_v.empName, dbo.crm_person.pGender, dbo.crm_person.typeIDList,   
                      dbo.crm_person.typeNameList AS typeNameList, dbo.crm_company_v.areaName, dbo.crm_person.sfzNO, dbo.crm_person.homeAddress, dbo.crm_company_v.address,dbo.crm_company_v.fromName,   
                      dbo.crm_company_v.mailNo, dbo.crm_company_v.workZoneName, dbo.crm_company_v.workZoneID, dbo.crm_company_v.industry, dbo.crm_company_v.companyxz, dbo.crm_company_v.companyxzID,  
                      dbo.crm_company_v.bossName,isnull(dbo.crm_person.ownerUserID,dbo.crm_person.insertUserID) as ownerUserID,isnull(dbo.crm_person.ownerUserName, dbo.hr_users_v.empName) as ownerUserName,  
                      dbo.crm_company_v.subCompanyName,dbo.crm_company_v.iscus,isnull(dbo.crm_company_v.is_get,0)is_get,dbo.crm_company_v.capital,dbo.crm_company_v.capitalTo,dbo.crm_company_v.capitalFrom,  
                      dbo.crm_company_v.bossTel,dbo.crm_company_v.scope,dbo.crm_person.is_import,dbo.crm_person.is_using,dbo.crm_person.is_del,dbo.crm_company_v.is_import company_import  
FROM         dbo.crm_personType RIGHT OUTER JOIN  
                      dbo.crm_person LEFT OUTER JOIN  
                      dbo.crm_company_v ON dbo.crm_person.companyID = dbo.crm_company_v.companyID LEFT OUTER JOIN  
                      dbo.hr_users_v ON dbo.crm_person.insertUserID = dbo.hr_users_v.userID LEFT OUTER JOIN  
                      dbo.crm_personDept ON dbo.crm_person.deptID = dbo.crm_personDept.aID ON dbo.crm_personType.aID = dbo.crm_person.typeID  
*/
select * from crm_person_v
--客户人员类别
/*
set identity_insert crm_personType on
insert into crm_personType(aID,cName,isdel,orderID)
	select * from opendatasource('SqlOleDB',
		'Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456').SaigeOA.dbo.crm_personType
set identity_insert crm_personType off
*/
select * from crm_personType
--客户人员信息
/*
CREATE TABLE [dbo].[crm_person](
	[personID] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[companyID] [int] NULL CONSTRAINT [DF_crm_person_companyID]  DEFAULT ((0)),
	[typeID] [int] NULL CONSTRAINT [DF_crm_person_typeID]  DEFAULT ((0)),
	[mobileTel] [varchar](50) NULL,
	[officeTel] [varchar](50) NULL,
	[houseTel] [varchar](50) NULL,
	[QQ] [varchar](50) NULL,
	[MSN] [varchar](50) NULL,
	[birthday] [datetime] NULL CONSTRAINT [DF_crm_person_birthday]  DEFAULT ('1900-1-1'),
	[remark] [text] NULL,
	[pName] [varchar](500) NULL CONSTRAINT [DF_crm_person_isNotice]  DEFAULT ((0)),
	[email] [varchar](50) NULL,
	[likes] [varchar](50) NULL,
	[states] [int] NULL CONSTRAINT [DF_crm_person_states]  DEFAULT ((0)),
	[mobileTel2] [varchar](50) NULL,
	[officeTel2] [varchar](50) NULL,
	[deptID] [int] NULL CONSTRAINT [DF_crm_person_deptID]  DEFAULT ((0)),
	[fax] [varchar](50) NULL,
	[insertUserID] [int] NULL CONSTRAINT [DF_crm_person_insertUserID]  DEFAULT ((0)),
	[userIDList] [varchar](8000) NULL CONSTRAINT [DF_crm_person_userIDList]  DEFAULT ((0)),
	[orgIDList] [varchar](8000) NULL CONSTRAINT [DF_crm_person_orgIDList]  DEFAULT ((0)),
	[empNameList] [varchar](8000) NULL,
	[orgNameList] [varchar](8000) NULL,
	[insertDate] [datetime] NULL CONSTRAINT [DF_crm_person_insertDate]  DEFAULT (getdate()),
	[pGender] [varchar](50) NULL,
	[typeIDList] [varchar](8000) NULL,
	[typeNameList] [varchar](8000) NULL,
	[customerName] [varchar](200) NULL,
	[sfzNO] [varchar](50) NULL,
	[homeAddress] [varchar](500) NULL,
	[ownerUserID] [int] NULL,
	[ownerUserName] [varchar](50) NULL,
	[is_using] [int] NULL CONSTRAINT [DF_crm_person_is_using]  DEFAULT ((0)),
	[is_del] [int] NULL CONSTRAINT [DF_crm_person_is_del]  DEFAULT ((0)),
	[delUserID] [int] NULL CONSTRAINT [DF_crm_person_delUserID]  DEFAULT ((0)),
	[is_import] [int] NULL CONSTRAINT [DF_crm_person_is_import]  DEFAULT ((0)),
	[updateTime] [datetime] NULL,
	[ownerUserIDList] [varchar](500) NULL,
	[ownerUserNameList] [varchar](2000) NULL
)
set identity_insert crm_person on
insert into crm_person(personID,companyID,typeID,mobileTel,officeTel,houseTel,QQ,MSN,birthday,remark,pName,email,
		likes,states,mobileTel2,officeTel2,deptID,fax,insertUserID,userIDList,orgIDList,empNameList,orgNameList,
		insertDate,pGender,typeIDList,typeNameList,customerName,sfzNO,homeAddress,ownerUserID,ownerUserName,
		is_using,is_del,delUserID,is_import,updateTime,ownerUserIDList,ownerUserNameList)
	select * from opendatasource('SqlOleDB',
		'Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456').SaigeOA.dbo.crm_person
set identity_insert crm_person off
*/
select * from crm_person
--客户部门
/*
CREATE TABLE [dbo].[crm_personDept](
	[aID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[cName] [varchar](50) NULL,
	[isDel] [int] NULL DEFAULT ((0)),
	[orderID] [int] NULL
)
set identity_insert crm_personDept on
insert into crm_personDept(aID,cName,isdel,orderID)
	select * from opendatasource('SqlOleDB',
		'Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456').SaigeOA.dbo.crm_personDept
set identity_insert crm_personDept off
*/
select * from crm_personDept
--公司视图
/*
CREATE VIEW [dbo].[crm_company_v]  
AS  
SELECT     dbo.crm_company.companyID, dbo.crm_company.companyName, dbo.crm_company.industry, dbo.crm_company.bossName, dbo.crm_company.tel,   
                      dbo.crm_company.address, dbo.crm_company.url, dbo.crm_company.levels, dbo.crm_company.companyType, dbo.crm_company.source,   
                      dbo.crm_company.credit, dbo.crm_company.bankName, dbo.crm_company.bankNO, dbo.crm_company.taxName, dbo.crm_company.taxNO,   
                      dbo.crm_company.taxBankName, dbo.crm_company.taxBankNO, dbo.crm_company.taxAddress, dbo.crm_company.taxTel,dbo.crm_company.is_import,  
                      (CASE WHEN convert(float,dbo.crm_company.capitalFrom)>0 THEN dbo.crm_company.capitalFrom+'万'+dbo.crm_company.moneyTypeName END) as capital,  
                      dbo.crm_company.insertUserID, dbo.crm_company.remark, dbo.crm_companyIndustry.cName AS industryName,dbo.crm_company.capitalTo,dbo.crm_company.capitalFrom,  
                      dbo.crm_companyLevel.CName AS levelsName, dbo.crm_companySource.CName AS sourceName,dbo.crm_company.bossTel,dbo.crm_company.scope,  
                      dbo.crm_companyType.CName AS companyTypeName, dbo.crm_company.mailNo, dbo.crm_company.faxNo, dbo.crm_company.provinceID,   
                      dbo.crm_company.cityID, dbo.crm_company.districtID, dbo.crm_company.areaName, dbo.crm_company.typeIDList, dbo.crm_company.typeNameList,   
                      dbo.crm_company.tickAddress, dbo.crm_company.tickTel, dbo.hr_userAll_v.empName, dbo.crm_company.ownerUserID,dbo.crm_company.moneyTypeID,  
                      dbo.crm_company.ownerUserName, dbo.crm_company.insertDate, dbo.crm_company.revenueID, dbo.crm_company.perNumID,dbo.crm_company.moneyTypeName,  
                      dbo.crm_companyPerNum.cName AS perNum, dbo.crm_company_Revenue.CName AS revenueNUm, dbo.crm_company.kingdeeID,dbo.crm_company.updateTime,  
                      dbo.crm_company.comEmail, dbo.crm_company.completed, dbo.crm_company.workZoneID, dbo.sys_ass.cName AS workZoneName,   
                      dbo.crm_company.serverRule, (CASE WHEN  
                          (SELECT     COUNT(0)  
                            FROM          crm_person  
                            WHERE      companyID = crm_company.companyID) > 0 THEN '客户' ELSE '非客户' END) AS iscus, sys_ass_1.cName AS companyxz, sys_ass_1.aID as companyxzID,  
                      dbo.crm_company.typeID,(CASE WHEN dbo.crm_company.companyName in (select fName from cw_tItem where dbID=6 and fClassID=1 and fParentID<>0) THEN 1 ELSE dbo.crm_company.fromID END) AS fromID,(CASE WHEN dbo.crm_company.companyName in (
                      select fName from cw_tItem where dbID=6 and fClassID=1 and fParentID<>0) THEN '交易客户' ELSE '非交易客户' END)AS fromName,  
                      dbo.crm_company.subCompanyName,dbo.crm_company.is_using,dbo.crm_company.is_get,dbo.crm_company.is_del  
FROM         dbo.crm_companyPerNum RIGHT OUTER JOIN  
                      dbo.sys_ass AS sys_ass_1 RIGHT OUTER JOIN  
                      dbo.crm_company ON sys_ass_1.aID = dbo.crm_company.typeID LEFT OUTER JOIN  
                      dbo.sys_ass ON dbo.crm_company.workZoneID = dbo.sys_ass.aID LEFT OUTER JOIN  
                      dbo.crm_company_Revenue ON dbo.crm_company.revenueID = dbo.crm_company_Revenue.aID ON   
                      dbo.crm_companyPerNum.aID = dbo.crm_company.perNumID LEFT OUTER JOIN  
                      dbo.hr_userAll_v ON dbo.crm_company.insertUserID = dbo.hr_userAll_v.userID LEFT OUTER JOIN  
                      dbo.crm_companyType ON dbo.crm_company.companyType = dbo.crm_companyType.aID LEFT OUTER JOIN  
                      dbo.crm_companySource ON dbo.crm_company.source = dbo.crm_companySource.aID LEFT OUTER JOIN  
                      dbo.crm_companyLevel ON dbo.crm_company.levels = dbo.crm_companyLevel.aID LEFT OUTER JOIN  
                      dbo.crm_companyIndustry ON dbo.crm_company.industry = dbo.crm_companyIndustry.aID
*/
select * from crm_company_v
--客户公司人数
/*
CREATE TABLE [dbo].[crm_companyPerNum](
	[aID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[cName] [varchar](50) NULL,
	[isDel] [int] NULL DEFAULT ((0)),
	[orderID] [int] NULL DEFAULT ((0))
)
set identity_insert crm_companyPerNum on
insert into crm_companyPerNum(aID,cName,isDel,orderID)
	select * from opendatasource('SqlOleDB',
		'Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456').SaigeOA.dbo.crm_companyPerNum
set identity_insert crm_companyPerNum off
*/
select * from crm_companyPerNum
--公司信息
/*
CREATE TABLE [dbo].[crm_company](
	[companyID] [int] IDENTITY(100000,1) NOT NULL PRIMARY KEY,
	[companyName] [varchar](500) NULL,
	[industry] [int] NULL DEFAULT ((0)),
	[bossName] [varchar](50) NULL,
	[tel] [varchar](50) NULL,
	[address] [varchar](500) NULL,
	[url] [varchar](200) NULL,
	[levels] [int] NULL DEFAULT ((0)),
	[companyType] [int] NULL DEFAULT ((0)),
	[source] [int] NULL DEFAULT ((0)),
	[credit] [varchar](50) NULL,
	[bankName] [varchar](200) NULL,
	[bankNO] [varchar](200) NULL,
	[taxName] [varchar](200) NULL,
	[taxNO] [varchar](200) NULL,
	[taxBankName] [varchar](200) NULL,
	[taxBankNO] [varchar](200) NULL,
	[taxAddress] [varchar](200) NULL,
	[taxTel] [varchar](50) NULL,
	[insertUserID] [int] NULL DEFAULT ((0)),
	[remark] [text] NULL,
	[mailNo] [varchar](50) NULL,
	[faxNo] [varchar](50) NULL,
	[provinceID] [int] NULL DEFAULT ((0)),
	[cityID] [int] NULL DEFAULT ((0)),
	[districtID] [int] NULL DEFAULT ((0)),
	[areaName] [varchar](100) NULL,
	[typeIDList] [varchar](2000) NULL,
	[typeNameList] [varchar](4000) NULL,
	[tickAddress] [varchar](200) NULL,
	[tickTel] [varchar](50) NULL,
	[ownerUserID] [int] NULL DEFAULT ((0)),
	[ownerUserName] [varchar](50) NULL,
	[insertDate] [datetime] NULL,
	[revenueID] [int] NULL DEFAULT ((0)),
	[perNumID] [int] NULL DEFAULT ((0)),
	[kingdeeID] [int] NULL,
	[comEmail] [varchar](50) NULL,
	[completed] [varchar](50) NULL,
	[workZoneID] [int] NULL DEFAULT ((0)),
	[serverRule] [text] NULL,
	[typeID] [int] NULL DEFAULT ((0)),
	[fromID] [int] NULL DEFAULT ((0)),
	[dbID] [int] NULL DEFAULT ((0)),
	[subCompanyName] [varchar](500) NULL,
	[is_using] [int] NULL DEFAULT ((0)),
	[is_get] [int] NULL DEFAULT ((0)),
	[k3CompanyID] [int] NULL DEFAULT ((0)),
	[bossTel] [varchar](500) NULL,
	[scope] [varchar](5000) NULL,
	[capitalFrom] [varchar](5000) NULL,
	[capitalTo] [varchar](5000) NULL,
	[moneyTypeID] [int] NULL DEFAULT ((0)),
	[moneyTypeName] [varchar](50) NULL,
	[updateTime] [datetime] NULL DEFAULT (getdate()),
	[is_import] [int] NULL DEFAULT ((0)),
	[is_del] [int] NULL DEFAULT ((0)),
	[delUserID] [int] NULL DEFAULT ((0))
)
set identity_insert crm_company on
insert into crm_company(companyID,companyName,industry,bossName,tel,address,url,levels,companyType,source,credit,bankName,
		bankNO,taxName,taxNO,taxBankName,taxBankNO,taxAddress,taxTel,insertUserID,remark,mailNo,faxNo,provinceID,cityID,
		districtID,areaName,typeIDList,typeNameList,tickAddress,tickTel,ownerUserID,ownerUserName,insertDate,revenueID,
		perNumID,kingdeeID,comEmail,completed,workZoneID,serverRule,typeID,fromID,dbID,subCompanyName,is_using,is_get,
		k3CompanyID,bossTel,scope,capitalFrom,capitalTo,moneyTypeID,moneyTypeName,updateTime,is_import,is_del,delUserID)
	select * from opendatasource('SqlOleDB',
		'Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456').SaigeOA.dbo.crm_company
set identity_insert crm_company off
*/
select * from crm_company
--公司资产
/*
CREATE TABLE [dbo].[crm_company_Revenue](
	[aID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[CName] [varchar](50) NULL,
	[isDel] [int] NULL DEFAULT ((0)),
	[orderID] [int] NULL DEFAULT ((0))
)
set identity_insert crm_company_Revenue on
insert into crm_company_Revenue(aID,cName,isDel,orderID)
	select * from opendatasource('SqlOleDB',
		'Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456').SaigeOA.dbo.crm_company_Revenue
set identity_insert crm_company_Revenue off
*/
select * from crm_company_Revenue
--客户类型
/*
CREATE TABLE [dbo].[crm_companyType](
	[aID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[CName] [varchar](200) NULL,
	[isDel] [int] NULL DEFAULT ((0)),
	[orderID] [int] NULL DEFAULT ((0))
)
set identity_insert crm_companyType on
insert into crm_companyType(aID,cName,isDel,orderID)
	select * from opendatasource('SqlOleDB',
		'Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456').SaigeOA.dbo.crm_companyType
set identity_insert crm_companyType off
*/
select * from crm_companyType
--客户来源
/*
CREATE TABLE [dbo].[crm_companySource](
	[aID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[CName] [varchar](50) NULL,
	[isdel] [int] NULL DEFAULT ((0)),
	[orderID] [int] NULL DEFAULT ((0))
)
*/
select * from crm_companySource
--客户等级
/*
CREATE TABLE [dbo].[crm_companyLevel](
	[aID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[CName] [varchar](50) NULL,
	[isDel] [int] NULL DEFAULT ((0)),
	[orderID] [int] NULL DEFAULT ((0))
)
set identity_insert crm_companyLevel on
insert into crm_companyLevel(aID,cName,isDel,orderID)
	select * from opendatasource('SqlOleDB',
		'Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456').SaigeOA.dbo.crm_companyLevel
set identity_insert crm_companyLevel off
*/
select * from crm_companyLevel
--客户行业
/*
CREATE TABLE [dbo].[crm_companyIndustry](
	[aID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[cName] [varchar](50) NULL,
	[isDel] [int] NULL DEFAULT ((0)),
	[orderID] [int] NULL DEFAULT ((0))
)
set identity_insert crm_companyIndustry on
insert into crm_companyIndustry(aID,cName,isDel,orderID)
	select * from opendatasource('SqlOleDB',
		'Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456').SaigeOA.dbo.crm_companyIndustry
set identity_insert crm_companyIndustry off
*/
select * from crm_companyIndustry
go

CREATE TABLE [dbo].[crm_sale_begin](
	[saleID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[personID] [int] NULL,
	[price] [decimal](18, 2) NULL,
	[userID] [int] NULL,
	[counterworkerCompany] [varchar](50) NULL,
	[counterworkerProduct] [varchar](200) NULL,
	[insertDate] [datetime] NULL,
	[successDate] [datetime] NULL,
	[successPercent] [varchar](20) NULL,
	[saleTypeID] [int] NULL,
	[userIDList] [varchar](8000) NULL,
	[orgIDList] [varchar](8000) NULL,
	[empName] [text] NULL,
	[oragName] [text] NULL,
	[insertUserID] [int] NULL DEFAULT ((0)),
	[isGo] [int] NULL DEFAULT ((0)),
	[remark] [text] NULL,
	[ProducttYpeID] [int] NULL DEFAULT ((0)),
	[checkTypeID] [int] NULL DEFAULT ((0)),
	[noticeUserIDList] [varchar](max) NULL,
	[noticeUserName] [text] NULL,
	[sourceID] [int] NULL DEFAULT ((0)),
	[moneyTypeID] [int] NULL DEFAULT ((0)),
	[saleCollide] [varchar](50) NULL,
	[kingdeeCollide] [varchar](50) NULL,
	[isSalePlan] [int] NULL DEFAULT ((0)),
	[ml] [decimal](18, 2) NULL,
	[k3TypeID] [int] NULL,
	[isAll] [int] NULL DEFAULT ((0)),
	[isOrder] [int] NULL DEFAULT ((0)),
	[this_checkState] [int] NULL DEFAULT ((2)),
	[counterIDList] [varchar](500) NULL
)
select * from [crm_sale_begin]
set IDENTITY_INSERT [crm_sale_begin] ON
insert into [crm_sale_begin]([saleID],[personID],[price],[userID],[counterworkerCompany],[counterworkerProduct],[insertDate],
		[successDate],[successPercent],[saleTypeID],[userIDList],[orgIDList],[empName],[oragName],[insertUserID],
		[isGo],[remark],[ProducttYpeID],[checkTypeID],[noticeUserIDList],[noticeUserName],[sourceID],[moneyTypeID],
		[saleCollide],[kingdeeCollide],[isSalePlan],[ml],[k3TypeID],[isAll],[isOrder],[this_checkState],[counterIDList])
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[crm_sale_begin]
set IDENTITY_INSERT [crm_sale_begin] OFF
GO


select * from [crm_companySource]
set IDENTITY_INSERT [crm_companySource] ON
insert into [crm_companySource]([aID],[CName],[isdel],[orderID])
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[crm_companySource]
set IDENTITY_INSERT [crm_companySource] OFF
GO

--合同信息
CREATE TABLE [dbo].[hr_empContarct](
	[empContratID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[userID] [int] NULL,
	[contractNO] [varchar](50) NULL,
	[startDate] [datetime] NULL,
	[endDate] [datetime] NULL,
	[insertDate] [datetime] NULL,
	[years] [int] NULL,
	[remark] [text] NULL,
	[insuranceNO] [varchar](50) NULL
)
select * from [hr_empContarct]
set IDENTITY_INSERT [hr_empContarct] ON
insert into [hr_empContarct]([empContratID],[userID],[contractNO],[startDate],[endDate],[insertDate],
		[years],[remark],[insuranceNO])
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[hr_empContarct]
set IDENTITY_INSERT [hr_empContarct] OFF
GO

CREATE VIEW dbo.hr_employeeContract_v  
AS  
SELECT     ISNULL(CONVERT(varchar(12), b.startDate, 102) + '  至  ' + CONVERT(varchar(12), b.endDate, 102), '未签订') AS contractState, a.userID, a.empName,   
                      a.leave, a.deptname, a.companyID, a.groupID, a.departmentID, ISNULL(b.startDate, '1900-1-1') AS startDate, ISNULL(b.endDate, '1900-1-1') AS endDate,  
                       b.insuranceNO, a.posname, a.posLev, a.employeeID  
FROM         dbo.hr_users_v AS a LEFT OUTER JOIN  
                          (SELECT     userID, endDate, startDate, insuranceNO  
                            FROM          dbo.hr_empContarct AS x  
                            WHERE      (endDate =  
                                                       (SELECT     MAX(endDate) AS Expr1  
                                                         FROM          dbo.hr_empContarct  
                                                         WHERE      (userID = x.userID)))) AS b ON a.userID = b.userID  
GO

CREATE TABLE [dbo].[hr_employeeBegin](
	[bID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[employeeID] [int] NULL DEFAULT ((0)),
	[bDate] [datetime] NULL DEFAULT (((1900)-(1))-(1)),
	[remark] [text] NULL
)
select * from [hr_employeeBegin]
set IDENTITY_INSERT [hr_employeeBegin] ON
insert into [hr_employeeBegin]([bID],[employeeID],[bDate],[remark])
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[hr_employeeBegin]
set IDENTITY_INSERT [hr_employeeBegin] OFF

CREATE TABLE [dbo].[hr_employeeLeave](
	[leaveID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[employeeID] [int] NULL,
	[leaveDate] [datetime] NULL DEFAULT ('1900-1-1'),
	[remark] [text] NULL
)
select * from [hr_employeeLeave]
set IDENTITY_INSERT [hr_employeeLeave] ON
insert into [hr_employeeLeave]([leaveID],[employeeID],[leaveDate],[remark])
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[hr_employeeLeave]
set IDENTITY_INSERT [hr_employeeLeave] OFF

CREATE TABLE [dbo].[hr_group](
	[groupID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[groupName] [varchar](50) NOT NULL,
	[description] [ntext] NULL,
	[disable] [int] NOT NULL DEFAULT ((0)),
	[orderID] [int] NULL
)
select * from [hr_group]
set IDENTITY_INSERT [hr_group] ON
insert into [hr_group]([groupID],[groupName],[description],[disable],[orderID])
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[hr_group]
set IDENTITY_INSERT [hr_group] OFF

GO

CREATE TABLE [dbo].[hr_employeeVicePosition](
	[ViceID] [int] IDENTITY(20000,1) NOT NULL PRIMARY KEY,
	[employeeID] [int] NOT NULL,
	[departmentID] [int] NOT NULL,
	[positionID] [int] NOT NULL,
	[IsDel] [int] NULL DEFAULT ((0))
)
select * from [hr_employeeVicePosition]
set IDENTITY_INSERT [hr_employeeVicePosition] ON
insert into [hr_employeeVicePosition]([ViceID],[employeeID],[departmentID],[positionID],[IsDel])
	select * from OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[hr_employeeVicePosition]
set IDENTITY_INSERT [hr_employeeVicePosition] OFF
GO

CREATE view [dbo].[hr_employeeVicePosition_v] as   
SELECT  hr_employeeVicePosition.ViceID,hr_employeeVicePosition.employeeID,hr_employeeVicePosition.positionID,hr_position.cName as positionName,  
        dbo.hr_company.cName AS companyName, dbo.hr_group.groupName, dbo.hr_group.groupID, dbo.hr_department.departmentID,   
                      dbo.hr_department.cName AS deptName, dbo.hr_department.companyID, dbo.hr_department.parDepartment, dbo.hr_department.remark,   
                      dbo.hr_department.disable, dbo.hr_department.orderID,count(employeeID) over(partition by employeeID) as cnt  
      ,Row_NUMBER() over(partition by hr_employeeVicePosition.employeeID order by hr_employeeVicePosition.employeeID) as rowsid   
FROM   hr_employeeVicePosition  left join hr_department  on hr_employeeVicePosition.departmentID = hr_department.departmentID  
       left OUTER JOIN dbo.hr_company ON dbo.hr_company.companyID = dbo.hr_department.companyID   
       LEFT OUTER JOIN dbo.hr_group ON dbo.hr_company.groupID = dbo.hr_group.groupID  
    LEFT OUTER JOIN hr_position  on hr_employeeVicePosition.positionID=hr_position.positionID   
where Isnull(hr_employeeVicePosition.IsDel,0)=0 and hr_employeeVicePosition.employeeID>0

GO


CREATE VIEW dbo.hr_employee_v  
AS  
SELECT     dbo.hr_employee.employeeID, dbo.hr_employee.empID, dbo.hr_employee.empName, dbo.hr_employee.gender, dbo.hr_employee.nation, dbo.hr_employee.birthday,   
                      dbo.hr_employee.identityID, dbo.hr_employee.email, dbo.hr_employee.probation, dbo.hr_employee.beginDate, dbo.hr_employee.positionID,   
                      dbo.hr_employee.departmentID, dbo.hr_employee.qualification, dbo.hr_employee.endDate, dbo.hr_employee.telNO, dbo.hr_employee.houseTelNO,   
                      dbo.hr_employee.otherTelNO, dbo.hr_employee.emergencyContact, dbo.hr_employee.contactNO, dbo.hr_employee.region, dbo.hr_employee.address,   
                      dbo.hr_employee.leave, dbo.hr_employee.marriage, dbo.hr_employee.politicsVisage, dbo.hr_employee.empType, dbo.hr_employee.remark, dbo.hr_users.ntAccount,   
                      dbo.hr_department.cName AS deptname, dbo.hr_position.cName AS posname, dbo.hr_employeeType.typeName, dbo.hr_users.disabled, dbo.hr_users.ntAccountType,   
                      dbo.hr_employee.MSN, dbo.hr_employee.QQ, dbo.hr_employee.cityID, dbo.hr_employee.proviceID, dbo.hr_employee.likes, dbo.hr_group.groupID,   
                      dbo.hr_company.companyID, dbo.hr_users.userID, dbo.hr_position.levels AS posLevel, dbo.hr_employee.testMonths, dbo.hr_employee.speciality,   
                      dbo.hr_employee.shcool, ISNULL(dbo.hr_employeeLeave.leaveDate, '1900-1-1') AS leaveDate, dbo.hr_employee.empCardID,   
                      dbo.hr_employeeContract_v.contractState, (CASE WHEN CONVERT(varchar(12), hr_employeeContract_v.endDate, 120) IS NULL THEN '' WHEN CONVERT(varchar(12),   
                      hr_employeeContract_v.endDate, 120) IS NOT NULL AND CONVERT(varchar(12), hr_employeeContract_v.endDate, 112) <> '19000101' THEN CONVERT(varchar(12),   
                      hr_employeeContract_v.endDate, 111) WHEN CONVERT(varchar(12), hr_employeeContract_v.endDate, 112) = '19000101' THEN '' END) AS contractEndDate,   
                      (CASE WHEN hr_employee.leave <> 2 THEN DATEDIFF(year, dbo.hr_employee.probation, GETDATE()) ELSE DATEDIFF(year, dbo.hr_employee.probation,   
                      hr_employeeLeave.leavedate) END) AS workyears, CONVERT(varchar(2), MONTH(dbo.hr_employee.birthday)) + '-' + CONVERT(varchar(2),   
                      DAY(dbo.hr_employee.birthday)) AS birthday_month, dbo.hr_employee.workLev, dbo.hr_employee.workLevID, dbo.sys_ass.cName AS workLevName,   
                      dbo.hr_employee.bankName, dbo.hr_employee.bankNO, dbo.hr_employeeBegin.bDate, ISNULL(dbo.wage_Type_employee.wage_type_ID, 0) AS wage_type_ID,   
                      dbo.hr_employee.personalQQ, dbo.hr_employee.personalMail, ISNULL(dbo.hr_employeeVicePosition_v.positionName, '') AS VicePosName,   
                      ISNULL(dbo.hr_employeeVicePosition_v.deptName, '') AS ViceDeptName, ISNULL(dbo.hr_employeeVicePosition_v.cnt, 0) AS cnt,   
                      dbo.hr_employeeVicePosition_v.rowsid, dbo.hr_department.parDepartment, ISNULL(dbo.hr_users.mobileLogin, 0) AS mobileLogin,   
                      ISNULL(dbo.hr_users.mAuthorizeNo, 1) AS mAuthorizeNo  
FROM         dbo.hr_employeeContract_v RIGHT OUTER JOIN  
                      dbo.hr_employee LEFT OUTER JOIN  
                      dbo.wage_Type_employee ON dbo.hr_employee.employeeID = dbo.wage_Type_employee.employeeID LEFT OUTER JOIN  
                      dbo.hr_employeeBegin ON dbo.hr_employee.employeeID = dbo.hr_employeeBegin.employeeID LEFT OUTER JOIN  
                      dbo.sys_ass ON dbo.hr_employee.workLevID = dbo.sys_ass.aID ON dbo.hr_employeeContract_v.employeeID = dbo.hr_employee.employeeID LEFT OUTER JOIN  
                      dbo.hr_employeeLeave ON dbo.hr_employee.employeeID = dbo.hr_employeeLeave.employeeID LEFT OUTER JOIN  
                      dbo.hr_employeeType ON dbo.hr_employee.empType = dbo.hr_employeeType.empTypeID LEFT OUTER JOIN  
                      dbo.hr_users ON dbo.hr_employee.employeeID = dbo.hr_users.UID LEFT OUTER JOIN  
                      dbo.hr_position ON dbo.hr_employee.positionID = dbo.hr_position.positionID LEFT OUTER JOIN  
                      dbo.hr_group RIGHT OUTER JOIN  
                      dbo.hr_company ON dbo.hr_group.groupID = dbo.hr_company.groupID RIGHT OUTER JOIN  
                      dbo.hr_department ON dbo.hr_company.companyID = dbo.hr_department.companyID ON   
                      dbo.hr_employee.departmentID = dbo.hr_department.departmentID LEFT OUTER JOIN  
                      dbo.hr_employeeVicePosition_v ON dbo.hr_employee.employeeID = dbo.hr_employeeVicePosition_v.employeeID AND dbo.hr_employeeVicePosition_v.rowsid = 1  

GO

--
CREATE TABLE [dbo].[crm_saleBeginType](
	[aID] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[cName] [varchar](50) NULL,
	[orderID] [int] NULL CONSTRAINT [DF_crm_saleBeginType_orderID]  DEFAULT ((0)),
	[isDel] [int] NULL CONSTRAINT [DF_crm_saleBeginType_isDel]  DEFAULT ((0))
)
set identity_insert [crm_saleBeginType] on
insert into [crm_saleBeginType]([aID],[cName],[orderID],[isDel])
	select * from opendatasource(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[crm_saleBeginType]
set identity_insert [crm_saleBeginType] off
select * from [crm_saleBeginType]

--
CREATE TABLE [dbo].[crm_sale_checkedbegin](
	[saleID] [int] NOT NULL,
	[personID] [int] NULL,
	[price] [decimal](18, 2) NULL,
	[userID] [int] NULL,
	[counterworkerCompany] [varchar](50) NULL,
	[counterworkerProduct] [varchar](200) NULL,
	[insertDate] [datetime] NULL,
	[successDate] [datetime] NULL,
	[successPercent] [varchar](20) NULL,
	[saleTypeID] [int] NULL,
	[userIDList] [varchar](8000) NULL,
	[orgIDList] [varchar](8000) NULL,
	[empName] [text] NULL,
	[oragName] [text] NULL,
	[insertUserID] [int] NULL CONSTRAINT [DF_crm_sale_checkedbegin_insertUserID]  DEFAULT ((0)),
	[isGo] [int] NULL CONSTRAINT [DF_crm_sale_checkedbegin_isGo]  DEFAULT ((0)),
	[remark] [text] NULL,
	[ProducttYpeID] [int] NULL CONSTRAINT [DF_crm_sale_checkedbegin_tYpeID]  DEFAULT ((0)),
	[checkTypeID] [int] NULL CONSTRAINT [DF_crm_sale_checkedbegin_checkTypeID]  DEFAULT ((0)),
	[noticeUserIDList] [varchar](max) NULL,
	[noticeUserName] [text] NULL,
	[sourceID] [int] NULL CONSTRAINT [DF_crm_sale_checkedbegin_sourceID]  DEFAULT ((0)),
	[moneyTypeID] [int] NULL CONSTRAINT [DF_crm_sale_checkedbegin_moneyTypeID]  DEFAULT ((0)),
	[saleCollide] [varchar](50) NULL,
	[kingdeeCollide] [varchar](50) NULL,
	[isSalePlan] [int] NULL CONSTRAINT [DF_crm_sale_checkedbegin_isSalePlan]  DEFAULT ((0)),
	[ml] [decimal](18, 2) NULL,
	[k3TypeID] [int] NULL
)
insert into [crm_sale_checkedbegin]([saleID],[personID],[price],[userID],[counterworkerCompany],[counterworkerProduct],
		[insertDate],[successDate],[successPercent],[saleTypeID],[userIDList],[orgIDList],[empName],[oragName],
		[insertUserID],[isGo],[remark],[ProducttYpeID],[checkTypeID],[noticeUserIDList],[noticeUserName],
		[sourceID],[moneyTypeID],[saleCollide],[kingdeeCollide],[isSalePlan],[ml],[k3TypeID])
	select * from opendatasource(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[crm_sale_checkedbegin]
select * from crm_sale_checkedbegin
go
CREATE VIEW [dbo].[crm_sale_begin_v]  
AS  
SELECT     dbo.crm_saleBeginType.cName AS saleType, dbo.crm_sale_begin.saleID, dbo.crm_sale_begin.personID, dbo.crm_sale_begin.price, dbo.crm_sale_begin.userID,   
                      dbo.crm_sale_begin.counterworkerCompany, dbo.crm_sale_begin.counterworkerProduct, dbo.crm_sale_begin.insertDate, dbo.crm_sale_begin.successDate,   
                      dbo.crm_sale_begin.successPercent, dbo.crm_sale_begin.saleTypeID, dbo.crm_sale_begin.empName, dbo.crm_sale_begin.oragName,   
                      dbo.crm_sale_begin.insertUserID, dbo.crm_sale_begin.isGo, dbo.crm_sale_begin.remark, dbo.crm_person_v.QQ, dbo.crm_person_v.MSN,   
                      dbo.crm_person_v.officeTel, dbo.crm_person_v.mobileTel, dbo.crm_person_v.deptName, dbo.crm_person_v.perYypeName, dbo.crm_person_v.companyName,   
                      dbo.crm_person_v.email, dbo.crm_person_v.pTypeName, dbo.crm_person_v.pName, dbo.hr_employee_v.empName AS xmgw, dbo.crm_person_v.deptID,   
                      dbo.crm_person_v.typeID, hr_employee_v_1.empName AS insertEmpName, dbo.crm_person_v.userIDList, dbo.crm_person_v.orgIDList,   
                      hr_employee_v_1.departmentID, dbo.crm_sale_begin.ProducttYpeID, dbo.crm_sale_begin.checkTypeID, sys_ass_1.cName AS assName,   
                      dbo.crm_sale_begin.noticeUserIDList, dbo.crm_sale_begin.noticeUserName, dbo.crm_sale_begin.sourceID, dbo.crm_companySource.CName AS sourceName,   
                      dbo.crm_sale_begin.moneyTypeID, dbo.sys_ass.cName AS moneyType, dbo.crm_sale_begin.saleCollide, dbo.crm_sale_begin.kingdeeCollide,   
                      hr_employee_v_1.companyID, hr_employee_v_1.groupID, hr_employee_v_1.employeeID, dbo.crm_person_v.companyID AS cusID,   
                      dbo.crm_sale_begin.isSalePlan, dbo.crm_sale_begin.ml, dbo.crm_sale_begin.k3TypeID, dbo.hr_employee_v.wage_type_ID, dbo.crm_person_v.address,   
                      dbo.crm_person_v.companyxz, dbo.crm_person_v.bossName,dbo.crm_sale_begin.isAll,dbo.crm_sale_begin.isOrder,dbo.crm_sale_begin.this_checkState,  
                      dbo.crm_sale_checkedbegin.price as checkedPrice,dbo.crm_sale_checkedbegin.ml as checkedML,dbo.crm_sale_checkedbegin.counterworkerCompany as checkedCounterworkerCompany,  
                      dbo.crm_sale_checkedbegin.counterworkerProduct as checkedCounterworkerProduct,dbo.crm_sale_checkedbegin.moneyTypeID as checkedMoneyTypeID,dbo.crm_sale_checkedbegin.ProducttYpeID as checkedProducttYpeID,  
                      dbo.crm_sale_checkedbegin.k3TypeID as checkedK3TypeID,checked_ass.cName AS checkedMoneyType,checked_ass_1.cName AS checkedProducttYpe,dbo.crm_sale_begin.counterIDList  
FROM         dbo.crm_sale_begin LEFT OUTER JOIN  
                      dbo.sys_ass ON dbo.crm_sale_begin.moneyTypeID = dbo.sys_ass.aID LEFT OUTER JOIN  
                      dbo.crm_companySource ON dbo.crm_sale_begin.sourceID = dbo.crm_companySource.aID LEFT OUTER JOIN  
                      dbo.sys_ass AS sys_ass_1 ON dbo.crm_sale_begin.ProducttYpeID = sys_ass_1.aID LEFT OUTER JOIN  
                      dbo.hr_employee_v AS hr_employee_v_1 ON dbo.crm_sale_begin.insertUserID = hr_employee_v_1.userID LEFT OUTER JOIN  
                      dbo.hr_employee_v ON dbo.crm_sale_begin.userID = dbo.hr_employee_v.userID LEFT OUTER JOIN  
                      dbo.crm_person_v ON dbo.crm_sale_begin.personID = dbo.crm_person_v.personID LEFT OUTER JOIN  
                      dbo.crm_saleBeginType ON dbo.crm_sale_begin.saleTypeID = dbo.crm_saleBeginType.aID LEFT OUTER JOIN   
                      dbo.crm_sale_checkedbegin ON dbo.crm_sale_begin.saleID = dbo.crm_sale_checkedbegin.saleID and dbo.crm_sale_checkedbegin.insertDate in (select max(insertDate) from dbo.crm_sale_checkedbegin group by saleID)  
                      LEFT OUTER JOIN dbo.sys_ass as checked_ass ON dbo.crm_sale_checkedbegin.moneyTypeID = checked_ass.aID LEFT OUTER JOIN  
                      dbo.sys_ass as checked_ass_1 ON dbo.crm_sale_checkedbegin.ProducttYpeID = checked_ass_1.aID  
  
GO
select * from crm_sale_begin_v
--已关闭商机
CREATE TABLE [dbo].[crm_sale_close](
	[closeID] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[closeDate] [datetime] NULL CONSTRAINT [DF_crm_sale_close_closeDate]  DEFAULT (getdate()),
	[remark] [text] NULL,
	[insertUserID] [int] NULL CONSTRAINT [DF_crm_sale_close_insertUserID]  DEFAULT ((0)),
	[closeTypeName] [varchar](50) NULL,
	[saleID] [int] NULL CONSTRAINT [DF_crm_sale_close_saleID]  DEFAULT ((0))
)
select * from crm_sale_close

--
CREATE TABLE [dbo].[crm_sale_part](
	[salepartID] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[partUserID] [int] NULL CONSTRAINT [DF_crm_sale_part_partUserID]  DEFAULT ((0)),
	[saleID] [int] NULL CONSTRAINT [DF_crm_sale_part_saleID]  DEFAULT ((0)),
	[partEmpName] [varchar](50) NULL,
	[partTYpeID] [int] NULL CONSTRAINT [DF_crm_sale_part_partTYpeID]  DEFAULT ((0))
)
set identity_insert [crm_sale_part] on
insert into [crm_sale_part]([salepartID],[partUserID],[saleID],[partEmpName],[partTYpeID])
	select * from opendatasource(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[crm_sale_part]
set identity_insert [crm_sale_part] off
select * from crm_sale_part

--
CREATE TABLE [dbo].[crm_sale_counter](
	[counterID] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[saleID] [int] NULL CONSTRAINT [DF_crm_sale_counter_saleID]  DEFAULT ((0)),
	[pName] [varchar](500) NULL,
	[cName] [varchar](500) NULL,
	[pcName] [varchar](500) NULL,
	[price] [decimal](18, 0) NULL CONSTRAINT [DF_crm_sale_counter_price]  DEFAULT ((0)),
	[note] [varchar](5000) NULL,
	[insertDate] [datetime] NULL CONSTRAINT [DF_crm_sale_counter_insertDate]  DEFAULT (getdate()),
	[is_del] [int] NULL CONSTRAINT [DF_crm_sale_counter_is_del]  DEFAULT ((0)),
	[setPrice] [decimal](18, 0) NULL CONSTRAINT [DF_crm_sale_counter_setPrice]  DEFAULT ((0)),
	[brandID] [int] NULL
)
set identity_insert [crm_sale_counter] on
insert into [crm_sale_counter]([counterID],[saleID],[pName],[cName],[pcName],[price],[note],[insertDate],[is_del],[setPrice],[brandID])
	select * from opendatasource(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[crm_sale_counter]
set identity_insert [crm_sale_counter] off
select * from  crm_sale_counter

--
CREATE TABLE [dbo].[crm_sale_delay](
	[dID] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[saleID] [int] NULL CONSTRAINT [DF_crm_sale_delay_saleID]  DEFAULT ((0)),
	[dNum] [int] NULL CONSTRAINT [DF_crm_sale_delay_dNum]  DEFAULT ((0)),
	[oldsuccessDate] [datetime] NULL CONSTRAINT [DF_crm_sale_delay_oldsuccessDate]  DEFAULT (getdate()),
	[nowsuccessDate] [datetime] NULL CONSTRAINT [DF_crm_sale_delay_nowsuccessDate]  DEFAULT (getdate()),
	[insertDate] [datetime] NULL CONSTRAINT [DF_crm_sale_delay_insertDate]  DEFAULT (getdate()),
	[insertUserID] [int] NULL CONSTRAINT [DF_crm_sale_delay_insertUserID]  DEFAULT ((0)),
	[a1] [int] NULL,
	[a2] [int] NULL,
	[b1] [varchar](200) NULL,
	[b2] [varchar](200) NULL,
	[c1] [datetime] NULL,
	[c2] [datetime] NULL
)
set identity_insert [crm_sale_delay] on
insert into [crm_sale_delay]([dID],[saleID],[dNum],[oldsuccessDate],[nowsuccessDate],[insertDate],[insertUserID],
		[a1],[a2],[b1],[b2],[c1],[c2])
	select * from opendatasource(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[crm_sale_delay]
set identity_insert [crm_sale_delay] off
select * from  crm_sale_delay
go





go
/*
CREATE VIEW [dbo].[crm_sale_all_v]  
AS  
SELECT a.mobileTel, a.saleType, a.saleID, a.personID, a.price, a.userID, a.counterworkerCompany, a.counterworkerProduct, 
		a.insertDate, a.successDate, a.successPercent, a.saleTypeID, a.empName,a.oragName, a.insertUserID, a.isGo, a.remark, 
		a.QQ, a.MSN, a.officeTel, a.mobileTel AS Expr1, a.deptName, a.perYypeName, a.companyName, a.email, a.pTypeName, a.pName, 
		a.xmgw, a.deptID, a.typeID, a.insertEmpName, a.userIDList, a.orgIDList, a.departmentID, a.ProducttYpeID, a.checkTypeID,  a.assName, a.sourceID, a.sourceName, dbo.crm_sale_close.closeDate,   
        dbo.crm_sale_close.remark AS closeRemark, ISNULL(dbo.crm_sale_close.closeTypeName, '未关闭') AS closeState, 
		a.noticeUserIDList, a.noticeUserName, a.moneyTypeID, a.moneyType, a.saleCollide, a.kingdeeCollide, 
		(CASE WHEN EXISTS (SELECT TOP 1 saleID FROM crm_sale_part WHERE partUserID <> a.userID AND saleID = a.saleID) THEN '合伙销售' 
		ELSE '个人销售' END) AS salemodel, a.companyID, a.groupID, a.employeeID, a.cusID, a.isSalePlan, a.ml, a.k3TypeID,   
        c.fName AS k3saleTypeName, a.wage_type_ID, a.address, a.companyxz, a.bossName,a.isAll,a.isOrder,a.this_checkState, 
		a.checkedPrice,a.checkedML,a.checkedCounterworkerCompany,a.checkedCounterworkerProduct,a.checkedMoneyTypeID,
		a.checkedProducttYpeID,a.checkedK3TypeID,a.checkedMoneyType,a.checkedProducttYpe,checked_c.fName AS checkedK3saleTypeName,
		a.this_checkState as isAgree,a.counterIDList,isnull(dbo.crm_sale_delay.oldsuccessDate,a.successDate)oldsuccessDate,
		(select count(saleID) from dbo.crm_sale_delay where dbo.crm_sale_delay.saleID=a.saleID)delayNum,  
        (CASE WHEN c.fParentID<=0 THEN c.fItemID ELSE c.fParentID END) fParentID  
        --,isnull(z.ml,0) lastml,isnull(z.price,0) lastPrice  
FROM dbo.crm_sale_begin_v AS a LEFT OUTER JOIN  
     dbo.crm_sale_close ON a.saleID = dbo.crm_sale_close.saleID LEFT OUTER JOIN  
     (SELECT oaItmeID, fItemID, fName, fParentID, fClassID, dbID, lev FROM dbo.cw_tItem WHERE (dbID = 6) AND (fClassID = 4) 
		AND (lev < 3)) AS c ON a.k3TypeID = c.fItemID LEFT OUTER JOIN  
     (SELECT oaItmeID, fItemID, fName, fParentID, fClassID, dbID, lev FROM dbo.cw_tItem WHERE (dbID = 6) AND (fClassID = 4) 
		AND (lev < 3)) AS checked_c ON a.checkedK3TypeID = checked_c.fItemID LEFT JOIN  
     dbo.crm_sale_delay ON a.saleID=dbo.crm_sale_delay.saleID 
*/
select * from crm_sale_all_v
go



GO
--售前项目视图2
create view PreSale_Apply_v2
	as
	select t2.* from PreSale_NewApply_v2 t2
		where t2.PreSale_ID in (select t1.PreSale_ID from PreSale_Support_people_workCount t1 group by t1.PreSale_ID)
go
---------------------------------------------------------
select * from PreSale_Apply_v2
--实施项目
CREATE TABLE [dbo].[Project_Imp_Apply](
	[Project_ID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[saleID] [int] NULL,
	[insert_people] [int] NULL,
	[support_people] [varchar](1000) NULL,
	[insert_date] [datetime] NULL,
	[project_establishment] [datetime] NULL,
	[informationRemark] [varchar](1000) NULL,
	[isAll] [int] NULL,
	[isOrder] [int] NULL,
	[this_checkState] [int] NULL,
	[project_Name] [varchar](1000) NULL,
	[support_Date_beg] [datetime] NULL,
	[support_Date_end] [datetime] NULL,
	[support_people_main_Check] [varchar](1000) NULL,
	[support_people_other_Check] [varchar](1000) NULL,
	[support_Date_beg_check] [datetime] NULL,
	[support_Date_end_check] [datetime] NULL,
	[Project_ItemMainstate] [int] NULL,
	[saleType] [int] NULL,
	[Txt_phone] [varchar](1000) NULL,
	[Useramount] [varchar](1000) NULL,
	[Imp_projecttype] [int] NULL,
	[Isonserver] [int] NULL,
	[Delivery] [int] NULL,
	[Contractsigning] [int] NULL,
	[Signdays] [varchar](1000) NULL,
	[Signmoney] [varchar](1000) NULL,
	[Financing] [varchar](1000) NULL,
	[Txt_ssdays] [varchar](1000) NULL,
	[Txt_allowdays] [varchar](1000) NULL,
	[Imp_effect] [int] NULL,
	[Customerdevelopment] [int] NULL,
	[Imp_method] [int] NULL,
	[Imp_payment] [int] NULL,
	[Imp_free] [int] NULL,
	[Leadership] [int] NULL,
	[It] [int] NULL,
	[Sys_equipment] [int] NULL,
	[Pro_manager] [int] NULL,
	[Sta_positions] [int] NULL,
	[Data_preparation] [int] NULL,
	[Txt_problem] [varchar](1000) NULL,
	[Payment] [int] NULL,
	[ProductName] [varchar](1000) NULL,
	[ProductInfo] [varchar](1000) NULL,
	[Contract_ID] [int] NULL,
	[Crm_PersionID] [int] NULL,
	[Crm_CompanyID] [int] NULL,
	[Close_Reason] [varchar](1000) NULL,
	[Project_MainstateTime] [datetime] NULL
)
select * from Project_Imp_Apply
alter table Project_Imp_Apply drop column PreSale_ID
sp_rename 'Project_Imp_Apply.PreSale_Type','saleType','column'
CREATE TABLE [dbo].[crm_personType](
	[aID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[cName] [nchar](10) NULL,
	[isdel] [int] NULL DEFAULT ((0)),
	[orderID] [int] NULL DEFAULT ((0))
)
CREATE TABLE [dbo].[crm_person](
	[personID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[companyID] [int] NULL DEFAULT ((0)),
	[typeID] [int] NULL DEFAULT ((0)),
	[mobileTel] [varchar](50) NULL,
	[officeTel] [varchar](50) NULL,
	[houseTel] [varchar](50) NULL,
	[QQ] [varchar](50) NULL,
	[MSN] [varchar](50) NULL,
	[birthday] [datetime] NULL DEFAULT ('1900-1-1') ,
	[remark] [text] NULL,
	[pName] [varchar](500) NULL DEFAULT ((0)),
	[email] [varchar](50) NULL,
	[likes] [varchar](50) NULL,
	[states] [int] NULL DEFAULT ((0)),
	[mobileTel2] [varchar](50) NULL,
	[officeTel2] [varchar](50) NULL,
	[deptID] [int] NULL DEFAULT ((0)),
	[fax] [varchar](50) NULL,
	[insertUserID] [int] NULL DEFAULT ((0)),
	[userIDList] [varchar](8000) NULL DEFAULT ((0)),
	[orgIDList] [varchar](8000) NULL DEFAULT ((0)),
	[empNameList] [varchar](8000) NULL,
	[orgNameList] [varchar](8000) NULL,
	[insertDate] [datetime] NULL DEFAULT (getdate()),
	[pGender] [varchar](50) NULL,
	[typeIDList] [varchar](8000) NULL,
	[typeNameList] [varchar](8000) NULL,
	[customerName] [varchar](200) NULL,
	[sfzNO] [varchar](50) NULL,
	[homeAddress] [varchar](500) NULL,
	[ownerUserID] [int] NULL,
	[ownerUserName] [varchar](50) NULL,
	[is_using] [int] NULL DEFAULT ((0)),
	[is_del] [int] NULL DEFAULT ((0)),
	[delUserID] [int] NULL DEFAULT ((0)),
	[is_import] [int] NULL DEFAULT ((0)),
	[updateTime] [datetime] NULL
)


CREATE TABLE [dbo].[cw_tItem](
	[oaItmeID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[fItemID] [int] NULL,
	[fName] [varchar](50) NULL,
	[fParentID] [int] NULL,
	[fClassID] [int] NULL,
	[dbID] [int] NULL DEFAULT ((0)),
	[lev] [int] NOT NULL DEFAULT ((0))
)

                      


CREATE VIEW [dbo].[crm_person_v]  
AS  
SELECT     dbo.crm_person.personID, dbo.crm_person.companyID, dbo.crm_person.typeID, dbo.crm_person.mobileTel, dbo.crm_person.officeTel, dbo.crm_person.houseTel, dbo.crm_person.QQ,dbo.crm_person.updateTime,   
                      dbo.crm_person.MSN, dbo.crm_person.birthday, dbo.crm_person.remark, dbo.crm_person.pName, dbo.crm_person.email, dbo.crm_person.likes, dbo.crm_personType.cName AS pTypeName,   
                      dbo.crm_person.states, dbo.crm_person.mobileTel2, dbo.crm_person.officeTel2, dbo.crm_person.fax, dbo.crm_person.deptID, dbo.crm_personDept.cName AS deptName,   
                      (CASE WHEN CONVERT(varchar(50), year(crm_person.birthday)) = '1900' THEN '' WHEN CONVERT(varchar(50), year(crm_person.birthday)) <> '1900' THEN CONVERT(varchar(50),   
                      month(crm_person.birthday)) + '-' + CONVERT(varchar(50), day(crm_person.birthday)) END) AS birthday2, dbo.crm_person.insertUserID, dbo.crm_person.userIDList, dbo.crm_person.orgIDList,   
                      dbo.crm_person.empNameList, dbo.crm_person.orgNameList, isnull(dbo.hr_users_v.departmentID,0)departmentID, dbo.crm_company_v.companyName, dbo.crm_company_v.industryName,   
                      dbo.crm_company_v.companyTypeName, dbo.crm_company_v.typeNameList as perYypeName, dbo.crm_person.insertDate, dbo.hr_users_v.empName, dbo.crm_person.pGender, dbo.crm_person.typeIDList,   
                      dbo.crm_person.typeNameList AS typeNameList, dbo.crm_company_v.areaName, dbo.crm_person.sfzNO, dbo.crm_person.homeAddress, dbo.crm_company_v.address,dbo.crm_company_v.fromName,   
                      dbo.crm_company_v.mailNo, dbo.crm_company_v.workZoneName, dbo.crm_company_v.workZoneID, dbo.crm_company_v.industry, dbo.crm_company_v.companyxz, dbo.crm_company_v.companyxzID,  
                      dbo.crm_company_v.bossName,isnull(dbo.crm_person.ownerUserID,dbo.crm_person.insertUserID) as ownerUserID,isnull(dbo.crm_person.ownerUserName, dbo.hr_users_v.empName) as ownerUserName,  
                      dbo.crm_company_v.subCompanyName,dbo.crm_company_v.iscus,isnull(dbo.crm_company_v.is_get,0)is_get,dbo.crm_company_v.capital,dbo.crm_company_v.capitalTo,dbo.crm_company_v.capitalFrom,  
                      dbo.crm_company_v.bossTel,dbo.crm_company_v.scope,dbo.crm_person.is_import,dbo.crm_person.is_using,dbo.crm_person.is_del,dbo.crm_company_v.is_import company_import  
FROM         dbo.crm_personType RIGHT OUTER JOIN  
                      dbo.crm_person LEFT OUTER JOIN  
                      dbo.crm_company_v ON dbo.crm_person.companyID = dbo.crm_company_v.companyID LEFT OUTER JOIN  
                      dbo.hr_users_v ON dbo.crm_person.insertUserID = dbo.hr_users_v.userID LEFT OUTER JOIN  
                      dbo.crm_personDept ON dbo.crm_person.deptID = dbo.crm_personDept.aID ON dbo.crm_personType.aID = dbo.crm_person.typeID  

CREATE TABLE [dbo].[kingdee_contract_main](
	[contract_id] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[contract_class_id] [int] NOT NULL,
	[contract_item_name] [nvarchar](100) NULL,
	[contract_support] [nvarchar](50) NULL,
	[contract_support_address] [nvarchar](100) NULL,
	[contract_support_area] [nvarchar](200) NULL,
	[contract_code] [varchar](100) NULL,
	[contract_payment] [nvarchar](50) NULL,
	[Contract_customer_id] [int] NULL,
	[Contract_customer_companyname] [nvarchar](50) NULL,
	[Contract_customer_linkman] [nvarchar](50) NULL,
	[Contract_start_date] [datetime] NULL,
	[Contract_end_date] [datetime] NULL,
	[Contract_sign_date] [datetime] NULL,
	[Contract_state] [nvarchar](50) NULL,
	[Contract_sum] [decimal](18, 2) NULL,
	[Contract_inserter] [nvarchar](50) NULL,
	[Contract_signer] [nvarchar](50) NULL,
	[contract_plan_date] [int] NULL,
	[contract_plan_percent_cost] [decimal](18, 2) NULL,
	[contract_support_type] [nvarchar](50) NULL,
	[contract_support_cost] [decimal](18, 2) NULL,
	[Contract_text] [text] NULL,
	[Contract_customerName] [nvarchar](200) NULL,
	[Contract_version] [varchar](50) NULL,
	[Contract_Series] [varchar](100) NULL,
	[Contract_secret] [nvarchar](50) NULL,
	[Contract_signerID] [int] NULL,
	[Contract_free_expire] [varchar](50) NULL,
	[Contract_manage_area] [nvarchar](50) NULL,
	[contract_code2] [varchar](50) NULL,
	[FNUM] [int] NULL DEFAULT ((0)),
	[insertDate] [datetime] NULL DEFAULT (getdate()),
	[mainType] [int] NULL DEFAULT ((0))
)

CREATE TABLE [dbo].[kingdee_contract_class](
	[id] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[parentID] [int] NOT NULL DEFAULT ((0)),
	[Contract_class_name] [nvarchar](50) NOT NULL,
	[Contract_class_remark] [nvarchar](200) NULL,
	[Contract_code] [varchar](50) NOT NULL,
	[Order_id] [int] NOT NULL,
	[typeID] [int] NOT NULL DEFAULT ((0))
)

CREATE TABLE [dbo].[kingdee_contract_main_plus](
	[fuwuContractID] [int] NOT NULL,
	[contractID] [int] NOT NULL,
	[plus_start] [datetime] NULL,
	[plus_end] [datetime] NULL,
	[plus_pay] [decimal](18, 2) NULL
)

CREATE TABLE [dbo].[kingdee_contract_up](
	[aid] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[kingdee_contract_id] [int] NOT NULL,
	[refer_value] [nvarchar](1000) NULL,
	[Contract_customer_id] [int] NULL DEFAULT ((0)),
	[Contract_customerName] [varchar](500) NULL,
	[upNum] [int] NULL DEFAULT ((1)),
	[type] [int] NULL DEFAULT ((0)),
	[up_date] [datetime] NULL DEFAULT (getdate()),
	[is_Del] [int] NULL DEFAULT ((0))
)

CREATE TABLE [dbo].[kingdee_contract_refer](
	[kingdee_contract_id] [int] NOT NULL,
	[refer_value] [nvarchar](1000) NULL
) 

CREATE TABLE [dbo].[kingdee_contract_merg](
	[aid] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[kingdee_contract_id] [int] NOT NULL,
	[refer_value] [nvarchar](1000) NULL,
	[Contract_customer_id] [int] NULL,
	[Contract_customerName] [varchar](500) NULL,
	[up_date] [datetime] NULL DEFAULT (getdate()),
	[is_Del] [int] NULL DEFAULT ((0))
)

CREATE VIEW [dbo].[kingdee_contract_main_v]
AS
SELECT     TOP (100) PERCENT a.contract_id, a.contract_class_id, a.contract_item_name, a.contract_support, a.contract_support_address, a.contract_support_area, a.contract_code, a.contract_payment, 
                      a.Contract_customer_id, a.Contract_customer_companyname, a.Contract_customer_linkman, a.Contract_start_date, a.Contract_end_date, a.Contract_sign_date, a.Contract_state, a.Contract_sum, 
                      a.Contract_inserter, a.Contract_signer, a.contract_plan_date, a.contract_plan_percent_cost, a.contract_support_type, a.contract_support_cost, a.Contract_text, a.Contract_customerName, 
                      a.Contract_version, a.Contract_Series, a.Contract_secret, a.Contract_signerID, a.Contract_free_expire, b.address, b.faxNo, b.tel, a.Contract_manage_area,
                          (SELECT     Contract_class_name
                            FROM          dbo.kingdee_contract_class
                            WHERE      (id = a.contract_class_id)) AS Contract_class_name, a.contract_code2,
                            isnull((select Contract_signer from 
                            (select c.contract_id,c.Contract_signer,d.contractID,max(d.fuwuContractID) as fuwuContractID  from kingdee_contract_main c 
                            left join dbo.kingdee_contract_main_plus as d on c.contract_id = d.contractID  
                            where d.contractID = a.contract_id 
                            group by  contract_id,c.Contract_signer,d.contractID)as e),'') as fuwu_Contract_signer,
                            --(select sum(isnull(Contract_sum,0)) from kingdee_contract_main where contract_id in (select result from Split((select max(refer_value) from kingdee_contract_up where kingdee_contract_up.kingdee_contract_id=a.contract_id)))and mainType in (0,1)) as customer_sum_up_money
                            --,(select sum(isnull(Contract_sum,0)) from kingdee_contract_main where contract_id in (select result from Split((select max(refer_value) from kingdee_contract_refer where kingdee_contract_refer.kingdee_contract_id=a.contract_id)))) as customer_sum_fuwuu_money,
                            isnull((select sum(isnull(Contract_sum,0)) from kingdee_contract_main where contract_id in (select result from Split((select max(refer_value) from kingdee_contract_up where kingdee_contract_up.kingdee_contract_id=a.contract_id)))),isnull((select sum(isnull(Contract_sum,0)) from kingdee_contract_main where contract_id in (select result from Split((select refer_value from kingdee_contract_refer where kingdee_contract_refer.kingdee_contract_id=a.contract_id)))),Contract_sum)) as sum,
                            --(select sum(isnull(Contract_sum,0)) from kingdee_contract_main where contract_id in (select result from Split((select max(refer_value) from kingdee_contract_merg where kingdee_contract_merg.kingdee_contract_id=a.contract_id)))and mainType = 2) as customer_sum_merge_money,
                            isnull((select sum(isnull(Contract_sum,0)) from kingdee_contract_main where contract_id in (select result from Split((select max(refer_value) from kingdee_contract_merg where kingdee_contract_merg.kingdee_contract_id=a.contract_id)))and mainType = 2),
                            isnull((select sum(isnull(Contract_sum,0)) from kingdee_contract_main where contract_id in (select result from Split((select max(refer_value) from kingdee_contract_up where kingdee_contract_up.kingdee_contract_id=a.contract_id)))),
                            isnull((select sum(isnull(Contract_sum,0)) from kingdee_contract_main where contract_id in (select result from Split((select refer_value from kingdee_contract_refer where kingdee_contract_refer.kingdee_contract_id=a.contract_id)))),
                            Contract_sum))) endSum
FROM         dbo.kingdee_contract_main AS a LEFT OUTER JOIN
                      dbo.crm_company_v AS b ON a.Contract_customer_id = b.companyID
GO

CREATE TABLE [dbo].[Project_Imp_PushState](
	[Project_psId] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[Project_ID] [int] NULL,
	[pushstate_time] [datetime] NULL,
	[pushstate_name] [int] NULL,
	[pushstate_remark] [varchar](1000) NULL,
	[isEff] [int] NULL
)
  
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

--实施项目视图
create view Project_Imp_Apply_v   
as  
select t1.Project_ID, t1.saleID, t1.insert_people, t1.support_people, t1.project_establishment,
	t1.insert_date,t1.Close_Reason,t1.Txt_phone,t1.Useramount,t1.Imp_projecttype,t1.Isonserver,t1.Delivery,
	t1.Contractsigning,t1.Signdays,t1.Signmoney,t1.Financing,t1.Txt_ssdays,t1.Txt_allowdays,t1.Imp_effect,
	t1.Customerdevelopment,t1.Imp_method,t1.Imp_payment,t1.Imp_free,t1.Leadership,t1.It,t1.Sys_equipment,
	t1.Pro_manager,t1.Sta_positions,t1.Data_preparation,t1.Txt_problem,t1.Payment,t2.employeeID, t2.departmentID, 
	t2.companyID, t2.groupID, t2.empName, t2.posname, t2.deptname,t1.Contract_ID,t1.ProductName,t1.ProductInfo,
	t1.isAll, t1.isOrder, t1.this_checkState,t1.Crm_PersionID,t1.Crm_CompanyID,   
    (case when t1.this_checkState = 2 then '待审' when t1.this_checkState = 1 then '拒绝' else '同意' end)   
    as this_checkStateName,t1.informationRemark, t1.project_Name,t1.saleType,t1.support_Date_beg, 
    t1.support_Date_end, t1.support_people_main_Check, t1.support_people_other_Check,t1.support_Date_beg_check, 
    t1.support_Date_end_check, t1.Project_ItemMainstate, sa.cName,p.pName,p.deptName as crm_deptName,p.pTypeName,
    p.email,com.companyName,com.address as companyAddress,k.contract_code2,k.Contract_sign_date,k.Contract_start_date,
    k.Contract_end_date,k.Contract_signer,k.Contract_class_name,k.contract_id as con_id,
    (select top(1) pushstate_time from Project_Imp_PushState where Project_ID = t1.Project_ID  
		order by pushstate_time, Project_psId) as actualStartDate, t1.Project_MainstateTime,  
    (select top(1) sy.cName from Project_Imp_PushState pn inner join sys_ass sy on sy.aID = pn.pushstate_name  
		where pn.Project_ID = t1.Project_ID order by pn.pushstate_time desc, pn.Project_psId desc) as 当前状态,  
    (select top(1) pushstate_name from Project_Imp_PushState ppn where Project_ID = t1.Project_ID 
		order by pushstate_time desc, Project_psId desc) as 当前状态ID,  
    (select isnull(pushState, '') as Expr1 from project_template pt where t1.saleType = saleType 
		and menu = 'Implementation') as pushStates,  
    (select isnull(pushState, '') as Expr1 from project_template where templateName = '实施项目默认模板' 
		and menu = 'Implementation') as commonStates,  
    (select sum(isAgree) as Expr1 from common_checkOperation as cco where mainID = t1.Project_ID 
		AND checkType = 703) AS allState,  
    (select dbo.get_DeptString(t1.support_people_main_Check,'|')) as DeptId_Main,  
    (select dbo.get_DeptString(t1.support_people_other_Check,'|')) as DeptId_Other  
from Project_Imp_Apply t1 left outer join  
     hr_userAll_v t2 on t1.insert_people = t2.userID left outer join 
     sys_ass sa on sa.aID = t1.saleType left outer join 
     crm_person_v as p on p.personID = t1.Crm_PersionID left outer join
     crm_Company as com on com.companyID = t1.Crm_CompanyID left outer join 
     kingdee_contract_main_v as k on k.contract_id = t1.Contract_ID   
-------------------------------------------------------------------------------------------------
select * from Project_Imp_Apply_v
drop view Project_Imp_Apply_v

--创建售前项目工作量视图
create view PreSale_WorkCount_v
	as
	select pspw.PreSale_spwID 工作记录ID,pav.*,pspw.support_people 顾问ID,hv.employeeID 顾问员工ID,
		support_people_name as 顾问姓名,support_people_type 顾问来源,
		pspw.PreSale_psId 推进记录ID,pspw.pushState 推进状态ID,sa.cName 推进状态,
		pspw.workCount 工作量,pspw.actual_date_beg 实际开始时间,
		pspw.actual_date_end 实际结束时间,pspw.create_time 记录时间,
		(select empName from hr_users_v where userID=pspw.record_people) as 记录人,
		(select pushstate_time from PreSale_pushstate_New ppn where ppn.PreSale_psId=pspw.PreSale_psId) as 推进日期,
		(select pushstate_remark from PreSale_pushstate_New ppn where ppn.PreSale_psId=pspw.PreSale_psId) as 备注,
		(select isEff from PreSale_pushstate_New ppn where ppn.PreSale_psId=pspw.PreSale_psId) as 是否有效
	from PreSale_Support_people_workCount pspw 
		inner join PreSale_Apply_v pav on pav.PreSale_ID=pspw.PreSale_ID 
		inner join sys_ass sa on pspw.pushState=sa.aID
		left outer join hr_users_v hv on pspw.support_people = hv.userID
--查询工作记录信息视图
select * from PreSale_WorkCount_v where 1=1 order by 记录时间 desc;
drop view PreSale_WorkCount_v
--实施工作
CREATE TABLE [dbo].[Project_Imp_WorkCount](
	[Project_spwID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[Project_ID] [int] NULL,
	[support_people] [int] NULL,
	[workCount] [decimal](8, 4) NULL,
	[create_time] [datetime] NULL DEFAULT (getdate()),
	[record_people] [int] NULL,
	[actual_date_beg] [datetime] NULL,
	[actual_date_end] [datetime] NULL,
	[support_people_name] [varchar](1000) NULL,
	[support_people_type] [int] NULL,
	[pushState] [int] NULL,
	[Project_psId] [int] NULL
)
select * from Project_Imp_WorkCount
sp_help Project_Imp_WorkCount
alter table Project_Imp_WorkCount alter column workCount decimal(8,4) 
--实施工作视图
create view Imp_WorkCount_v  
as  
select pspw.Project_spwID AS 工作记录ID, pav.Project_ID, pav.saleID, pav.insert_people, 
	pav.support_people,pav.project_establishment, pav.insert_date, pav.Txt_phone,pav.departmentID, pav.Useramount,  
    pav.Imp_projecttype,pav.Isonserver,pav.Delivery,pav.Contractsigning,pav.Signdays,pav.Signmoney,  
    pav.Financing,pav.Txt_ssdays,pav.Txt_allowdays,pav.Imp_effect,pav.Customerdevelopment,pav.Imp_method,  
    pav.Imp_payment, pav.Imp_free,pav.Leadership,pav.It,pav.Sys_equipment,pav.Pro_manager,pav.Sta_positions,  
    pav.Data_preparation,pav.Txt_problem,pav.Payment,  
    pav.ProductName,pav.ProductInfo,pav.isAll, pav.isOrder, pav.this_checkState,pav.Crm_PersionID,pav.Crm_CompanyID,   
    pav.this_checkStateName,pav.informationRemark, pav.project_Name,pav.saleType,pav.Close_Reason,   
    pav.support_Date_beg, pav.support_Date_end, pav.support_people_main_Check, pav.support_people_other_Check,   
    pav.support_Date_beg_check, pav.support_Date_end_check, pav.Project_ItemMainstate,   
    pspw.support_people 顾问ID, pspw.support_people_name 顾问姓名, pspw.support_people_type 顾问来源, 
    pspw.Project_psId 推进记录ID, pspw.pushState 推进状态ID, sa.cName 推进状态, pspw.workCount 工作量, 
    pspw.actual_date_beg 实际开始时间, pspw.actual_date_end 实际结束时间, pspw.create_time 记录时间,  
    (select ntAccount from hr_users_v where userID = pspw.record_people) as 记录人,  
    (select pushstate_time from Project_Imp_PushState ppn where Project_psId = pspw.Project_psId) as 推进日期,  
    (select pushstate_remark from Project_Imp_PushState ppn where Project_psId = pspw.Project_psId) as 备注,  
    (select isEff from Project_Imp_PushState where Project_psId = pspw.Project_psId) as 是否有效  
from  Project_Imp_WorkCount pspw inner join 
      Project_Imp_Apply_v pav on pav.Project_ID = pspw.Project_ID inner join  
      sys_ass sa on pspw.pushState = sa.aID
--------------------------------------------------------------------------------------------
select * from Imp_WorkCount_v
drop view Imp_WorkCount_v

--创建推进阶段信息视图
create view PreSale_pushstate_v
	as
	select ppn.PreSale_psId 推进记录ID,pav.*,sa.cName 推进状态,
		ppn.pushstate_time 推进时间,ppn.pushstate_remark 备注,ppn.isEff 是否有效
	from PreSale_pushstate_New ppn 
		inner join PreSale_NewApply_v pav on pav.PreSale_ID=ppn.PreSale_ID
		inner join sys_ass sa on sa.aID = ppn.pushstate_name;
select * from PreSale_pushstate_v where PreSale_ID=55
--实施推进
select * from Project_Imp_PushState
--实施推进视图
create view Imp_pushstate_v
	as
	select ppn.Project_psId 推进记录ID,ppn.Project_ID,sa.cName 推进状态,
		ppn.pushstate_time 推进时间,ppn.pushstate_remark 备注,ppn.isEff 是否有效
	from Project_Imp_PushState ppn 
		inner join sys_ass sa on sa.aID = ppn.pushstate_name;
-----------------------------------------------------------------------------------
select * from Imp_pushstate_v
drop view Imp_pushstate_v

--创建点评记录信息视图
create view PreSale_Comments_v
	as
	select pc.CommentID,pc.PreSale_spwID,
		convert(varchar(100),pc.CommentDate, 23) CommentDate,
		pc.CommentContent,pc.CommentPeople,pspw.工作记录ID,pav.*,pspw.顾问ID,pspw.顾问姓名,
		pspw.顾问来源,pspw.推进状态,pspw.工作量,pspw.实际开始时间,pspw.实际结束时间,pspw.记录时间,
		pspw.记录人,(select empName from hr_users_v where userID=pc.CommentPeople) as 点评人,
		pspw.是否有效
	from PreSale_Comments pc 
		inner join PreSale_WorkCount_v pspw on pc.PreSale_spwID=pspw.工作记录ID
		inner join PreSale_Apply_v pav on pav.PreSale_ID=pspw.PreSale_ID 
------------------------------------------------------------------------------
select * from PreSale_Comments_v
drop view PreSale_Comments_v
--实施点评
select * from Project_Imp_Comments
--实施点评视图
create view Imp_Comments_v  
as                     
select pc.CommentID,pc.Project_spwID,
		convert(varchar(100),pc.CommentDate, 23) CommentDate,
		pc.CommentContent,pc.CommentPeople,pspw.工作记录ID,pav.*,pspw.顾问ID,pspw.顾问姓名,
		pspw.顾问来源,pspw.推进状态,pspw.工作量,pspw.实际开始时间,pspw.实际结束时间,pspw.记录时间,
		pspw.记录人,(select empName from hr_users_v where userID=pc.CommentPeople) as 点评人,
		pspw.是否有效
from Project_Imp_Comments pc inner join  
     Imp_WorkCount_v pspw on pc.Project_spwID = pspw.工作记录ID inner join  
     Project_Imp_Apply_v pav on pav.Project_ID = pspw.Project_ID
-------------------------------------------------------------------------------------
select * from Imp_Comments_v
drop view Imp_Comments_v

--售前文档视图
create view PreSale_NewDocument_v
as
	select pn.documentID,pn.title,pn.contents,pn.sortID,pn.insertUserID,
		convert(varchar(100),pn.sDate, 23) sDate,pc.className,pc.remark,pc.ERPFormID,
		hv.empName,pl.Project_ID,pl.Project_psID,
		pl.PushState_Name,sa.cName,pl.Project_dtID,ps.isEff
	from Project_NewDocument pn 
	left outer join project_class pc on pn.sortID = pc.classID
	left outer join hr_userAll_v hv on pn.insertUserID = hv.userID
	inner join Project_Doc_Link pl on pn.documentID = pl.documentID and pl.Menu='PreSale'
	left outer join PreSale_pushstate_New ps on pl.Project_psID = ps.PreSale_psId
	left outer join sys_ass sa on pl.pushstate_name = sa.aID
-------------------------------------------------------------------------------------------------
select * from PreSale_NewDocument_v order by documentID
drop view PreSale_NewDocument_v
--实施文档视图
create view Imp_NewDocument_v
as
	select pn.documentID,pn.title,pn.contents,pn.sortID,pn.insertUserID,
		convert(varchar(100),pn.sDate, 23) sDate,pc.className,pc.remark,pc.ERPFormID,
		hv.empName,pl.Project_ID,pl.Project_psID,
		pl.PushState_Name,sa.cName,pl.Project_dtID,ps.isEff
	from Project_NewDocument pn 
	left outer join project_class pc on pn.sortID = pc.classID
	left outer join hr_userAll_v hv on pn.insertUserID = hv.userID
	inner join Project_Doc_Link pl on pn.documentID = pl.documentID and pl.Menu='Implementation'
	left outer join Project_Imp_PushState ps on pl.Project_psID = ps.Project_psID
	left outer join sys_ass sa on pl.pushstate_name = sa.aID
-------------------------------------------------------------------------------------------------
select * from Imp_NewDocument_v order by documentID
drop view Imp_NewDocument_v
-- 附件上传  
create procedure [dbo].[project_accessories_add]    
(    
	@insertUserID int, --上传附件用户ID    
	@thesisID int,  --附属主题   
	@whatType varchar(60)--模块名 
)     
AS    
begin tran    
	if exists(select 'r' from tempUpload  where userID= @insertUserID) --存在上传(临时)附件   
	begin    
	-- 从临时表中读取用户上传的附件    
	insert into project_accessories(trueName,fileSize,serverName,serverPath,thesisID,whatType)    
		select uploadFileName as trueName,uploadFileSize as fileSize,serverName,serverPath,
			@thesisID as thesisID,@whatType as whatType
		from tempUpload  where userID= @insertUserID  
	--删除临时表附件    
	delete from tempUpload where userID= @insertUserID  
	end    
if @@error !=0    
begin    
	rollback    
	return 0 --保存失败    
end    
else    
begin    
	commit    
	return 1 --保存成功    
end 
--------------------------------------------
drop proc project_accessories_add
-- 项目文档添加   
create proc [dbo].[project_doc_add]    
(    
	@sortID int,    
	@title varchar(1000),    
	@contents text,    
	@doUserID int, 
	@whatType varchar(60),  
	@docID int output    
)    
as     
begin tran    
	insert into Project_NewDocument(title,contents,sortID,insertUserID,sDate) 
		values(@title,@contents,@sortID,@doUserID,getdate())     
	set @docID=@@identity    
	--insert into project_document_plus(documentID,users,roles) values(@docID,@users,@roles)   
	--调用_公共过程:附件附加到相应的主题下    
	exec project_accessories_add  @doUserID,@docID,@whatType 
if @@error!=0    
begin    
	rollback    
	return 0 --保存失败    
end    
else    
begin    
	commit    
	return 1 --保存成功    
end 
--------------------------------------------
drop proc project_doc_add
-- 项目文档更新    
create proc [dbo].[product_doc_upd]    
(    
	@documentID int,  
	@title varchar(200),  
	@contents text,  
	@insertUserID int,
	@whatType varchar(60)--模块名 
)    
as    
begin tran    
	--保存文档正文    
	update Project_NewDocument set title=@title,contents=@contents,
		insertUserID=@insertUserID,sDate=getdate()  
	where documentID=@documentID    
	--调用_公共过程:附件附加到相应的主题下    
	exec project_accessories_add  @insertUserID,@documentID,@whatType  
if @@error !=0    
begin    
	rollback    
	return 0 --修改失败    
end    
else    
begin    
	commit    
	return 1 --修改成功    
end
---------------------------------------------------
drop proc product_doc_upd

--售前项目文档关联视图
CREATE VIEW PreSale_Doc_Link_v
AS
SELECT pl.*,ps.isEff
	FROM Project_Doc_Link pl
	LEFT OUTER JOIN PreSale_pushstate_New ps ON pl.Project_psID = ps.PreSale_psId
	WHERE pl.Menu = 'PreSale'
--------------------------------------------------------------------------------------------------------------
SELECT * FROM PreSale_Doc_Link_v WHERE isEFF = 1 OR isEFF IS NULL
DROP VIEW PreSale_Doc_Link_v
--实施项目文档关联视图
CREATE VIEW Imp_Doc_Link_v
AS
SELECT pl.*,ps.isEff
	FROM Project_Doc_Link pl
	LEFT OUTER JOIN Project_Imp_PushState ps ON pl.Project_psID = ps.Project_psId
	WHERE pl.Menu = 'Implementation'
--------------------------------------------------------------------------------------------------------------
SELECT * FROM Imp_Doc_Link_v WHERE isEFF = 1 OR isEFF IS NULL

--审批信息表
CREATE TABLE [dbo].[common_checkInfo](
	[InfoID] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[checkID] [int] NULL,
	[ID] [int] NULL CONSTRAINT [DF_common_checkInfo_userID]  DEFAULT ((0)),
	[IDtype] [int] NULL CONSTRAINT [DF_common_checkInfo_deptID]  DEFAULT ((0)),
	[checkType] [int] NULL CONSTRAINT [DF_common_checkInfo_checkType]  DEFAULT ((0)),
	[lev] [int] NULL CONSTRAINT [DF_common_checkInfo_lev]  DEFAULT ((0)),
	[checkUserID] [int] NULL CONSTRAINT [DF_common_checkInfo_checkUserID]  DEFAULT ((0))
)
set identity_insert [common_checkInfo] on
insert into [common_checkInfo]([InfoID],[checkID],[ID],[IDtype],[checkType],[lev],[checkUserID])
	select * from opendatasource(
			'SqlOleDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[common_checkInfo]
set identity_insert [common_checkInfo] off
select * from common_checkinfo where checktype=806
--某个申请人的审批设置信息
select * from common_check where checktype=806
--开发项目审批
CREATE TABLE [dbo].[project_check](
	[checkID] [int] IDENTITY(1,1) NOT NULL,
	[checkUserID] [int] NULL,
	[lev] [int] NULL,
	[saleType] [varchar](600) NULL,
	[checkType] [int] NULL,
	[userIDList] [text] NULL,
	[empNameList] [text] NULL,
	[deptIDList] [text] NULL,
	[deptNameList] [text] NULL,
	[checkName] [varchar](20) NULL
)
set identity_insert [project_check] on
insert into [project_check]([checkID],[checkUserID],[lev],[saleType],[checkType],[userIDList],[empNameList],
		[deptIDList],[deptNameList],[checkName])
	select * from opendatasource(
			'SqlOleDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[project_check]
set identity_insert [project_check] off
select * from project_check
--创建项目审批视图
CREATE VIEW dbo.project_check_v  
AS  
SELECT     pc.checkID, pc.checkUserID, pc.lev, pc.saleType, pc.checkType,   
                      pc.userIDList, pc.empNameList, pc.deptIDList, pc.deptNameList,   
                      pc.checkName, hv.empName, hv.departmentID, hv.companyID, hv.groupID,   
                      hv.deptname, hv.posname
FROM         dbo.project_check pc LEFT OUTER JOIN
                      dbo.hr_userAll_v hv ON pc.checkUserID = hv.userID  
---------------------------------------------------------------------------------------------
select * from project_check_v  	
--审批信息表 mainID:项目ID checkUserID:审批人 checkType:审批类型
-- isAgree, 0:同意, 1:拒绝, 2:待审
set identity_insert common_checkOperation on
insert into common_checkOperation([oID],[checkType],[mainID],[checkLev],[checkUserID],[checkDate],[remark],[userID],
		[deptID],[isAgree])
	select * from opendatasource(
			'SqlOleDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.common_checkOperation
set identity_insert common_checkOperation off
SELECT * FROM common_checkOperation WHERE checkType=703 ORDER BY checkDate
DELETE FROM common_checkOperation WHERE checkDate>'2015-09-29'
--审批类型
-- isAll=0 全部同意  isAll=1 最高级同意
-- isOrder, 0:顺签; 1:会签
set identity_insert common_checkType2 on
insert into common_checkType2(tID,isOrder,isAll,checkType)
	select * from opendatasource(
			'SqlOleDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.common_checkType2
set identity_insert common_checkType2 off
select * from common_checkType2 where checktype=806

--售前支持人员历史记录表
select * from PreSale_support_people_history where PreSale_ID=12

select * from Project_Imp_PushState
delete Project_Imp_PushState where Project_psId=3

--项目申请表
select * from Project_Imp_Application

--授权信息视图
select * from crm_acc_v where accUserID=293 and accType='pro_execution' 

--系统日志信息
select * from sys_log where contents in('进入系统') order by insertDate desc


--项目模板表
create table project_template(
	templateId int identity(1,1) primary key,
	saleType int,--项目类型(售前，实施项目中是产品类型，开发项目中是自定义类型)
	templateName varchar(60),--模板名称
	templateDesc varchar(200),--模板描述
	pushState varchar(600),--任务阶段字符串，用"|"分割
	menu varchar(60)
);
select * from project_template
--项目推进阶段和文档类型关联
create table Project_docType_Link(
	Project_dtID int identity(1,1) primary key,
	pushstate_name int,--推进阶段
	doctype_name int,--文档类型
	templateId int --项目模板ID
);
select * from Project_docType_Link;
--售前推进阶段关联文档类型视图
create view Project_docType_Link_v
	as 
	select pdl.*,sa.cName 推进阶段,pc.className 文档类型,pt.templateName,pt.templateDesc
	from Project_docType_Link pdl 
	left outer join project_template pt on pdl.templateId = pt.templateId
	left outer join sys_ass sa on pdl.pushstate_name = sa.aID
	left outer join project_class pc on pdl.doctype_name = pc.classID
-----------------------------------------------------------------------------
select * from Project_docType_Link_v
--项目模板视图
create view project_template_v
as
	select a1.*,a2.cName
	from project_template a1
	left outer join sys_ass a2 on a1.saleType=a2.aID
---------------------------------------------------------------------------
select * from project_template_v
--项目模板新增  
create procedure project_template_add  
(  
 @saleType int,
 @templateName varchar(60),  
 @templateDesc varchar(200),  
 @pushState varchar(600),  
 @menu varchar(60),  
 @templateId int output
)  
AS  
BEGIN  
begin tran  
 insert into project_template values(@saleType,@templateName,@templateDesc,@pushState,@menu)  
 set @templateId=@@identity 
 if @@error>0  
 begin  
 rollback  
 return 1  
 end  
else  
begin  
 commit  
 return 2  
end  
END
sp_helptext project_template_add

--项目模板更新
create procedure project_template_upd 
(  
 @templateName varchar(60),  
 @templateDesc varchar(200),  
 @pushState varchar(600),  
 @templateId int 
)  
AS  
BEGIN  
begin tran  
 update project_template 
	set templateName=@templateName,templateDesc=@templateDesc,pushState=@pushState
    where templateId=@templateId
 if @@error>0  
 begin  
 rollback  
 return 1  
 end  
else  
begin  
 commit  
 return 2  
end  
END
sp_helptext project_template_upd

--项目模板删除
create procedure project_template_del  
(   
 @templateId int
)  
AS  
BEGIN  
begin tran  
 delete project_template where templateId=@templateId
 delete PreSale_docType_Link where templateId=@templateId
if @@error>0  
 begin  
 rollback  
 return 1  
 end  
else  
begin  
 commit  
 return 2  
end  
END
sp_helptext project_template_del

--获取项目模板信息存储过程
CREATE proc project_template_get  
(  
	@templateId int
)  
as  
begin
select (select templateId from project_template where templateId=@templateId) as templateId, 
	(select templateName from project_template where templateId=@templateId) as templateName,
	(select templateDesc from project_template where templateId=@templateId) as templateDesc,
	a1.result as pushstate,a2.cName
	from Split1((select pushState from  project_template where templateId=@templateId)) a1
	inner join sys_ass a2 on a1.result = a2.aID
end

sp_helptext project_template_get

--获取项目模板的阶段
CREATE proc project_template_pushState  
(  
	@pushState varchar(600)
)  
as  
begin
select a1.result as pushstate,a2.cName from Split1(@pushState) a1
	inner join sys_ass a2 on a1.result = a2.aID
end
--------------------------------------------------------------------------
sp_helptext project_template_pushState

--表单类型
select * from ERPFormType
--表单模板
select * from ERPForm
select * from ERPForm_v
--项目模版视图
create view Project_Class_v
as
select pc.classID,pc.parentID,pc.className,pc.remark,pc.ERPFormID,
	ev.FormName,ev.FormTypeName,ev.ShiYongUserList,
	ev.TimeStr,ev.UserName,ev.TiaoJianList,ev.ContentStr
	from project_class pc left outer join 
	ERPForm_v ev on pc.ERPFormID=ev.ID
--------------------------------------------------------------------------
select * from Project_Class_v

--项目双周计划表
create table Project_DoubleWeekPlan(
	Project_2wPlanID int identity(1,1) primary key,
	title varchar(60),--标题(0_模板：代表这条记录只是设置关联关系)
	contents text,--内容
	Project_ID int,--项目ID
	ERPFormID int,--自定义表单模版ID
	userID int,--创建用户
	createDate datetime default getdate(),--创建时间
	menu varchar(10)--模块名(PreSale/Project)
);
select * from Project_DoubleWeekPlan;
--项目单日计划表
create table Project_OneDayPlan(
	Project_1dPlanID int identity(1,1) primary key,
	title varchar(60),--标题(0_模板：代表这条记录只是设置关联关系)
	contents text,--内容
	Project_ID int,--项目ID
	ERPFormID int,--自定义表单模版ID
	userID int,--创建用户
	createDate datetime default getdate(),--创建时间
	menu varchar(10)--模块名(PreSale/Project)
);
select * from Project_OneDayPlan
--项目双周计划视图
create view Project_DoubleWeekPlan_v
as 
	select pd.Project_2wPlanID 双周计划ID,pd.Project_ID 项目ID,pd.title 标题,pd.contents 内容,
		pd.ERPFormID 使用表单ID,pd.menu 模块名,hv.empName 创建用户,pd.createDate 创建时间,
		pnv.companyName 客户名称,pnv.project_Name 项目名称,pnv.cName 项目类型,
		ef.FormName 表单名称,ef.ContentStr 表单内容
	from Project_DoubleWeekPlan pd 
	left outer join Project_Imp_Apply_v pnv on pd.Project_ID=pnv.Project_ID
	left outer join ERPForm ef on pd.ERPFormID = ef.ID
	left outer join hr_users_v hv on pd.userID = hv.userID
select * from Project_DoubleWeekPlan_v
--项目单日计划视图
create view Project_OneDayPlan_v
as 
	select pd.Project_1dPlanID 单日计划ID,pd.Project_ID 项目ID,pd.title 标题,pd.contents 内容,
		pd.ERPFormID 使用表单ID,pd.menu 模块名,hv.empName 创建用户,pd.createDate 创建时间,
		pnv.companyName 客户名称,pnv.project_Name 项目名称,pnv.cName 项目类型,
		ef.FormName 表单名称,ef.ContentStr 表单内容
	from Project_OneDayPlan pd 
	left outer join Project_Imp_Apply_v pnv on pd.Project_ID=pnv.Project_ID
	left outer join ERPForm ef on pd.ERPFormID = ef.ID
	left outer join hr_users_v hv on pd.userID = hv.userID
select * from Project_OneDayPlan_v
--部门授权信息表
select * from crm_acc
--客户服务表
select * from customer_service_consult_register where comingPeopleID='80106'
SELECT * FROM sys.sysindexes WHERE id=object_id('customer_service_consult_register')
--实施项目视图
select * from Project_Imp_Apply_v
--实施项目工作信息视图
select * from Imp_WorkCount_v where Project_ID=77
sp_helptext Imp_WorkCount_v
--实施项目视图2
create view Project_Imp_Apply_v2
	as
	select t2.* from Project_Imp_Apply_v t2
		where t2.Project_ID in (select t1.Project_ID from Imp_WorkCount_v t1 group by t1.Project_ID)
go
---------------------------------------------------------------------------------------------------
select * from Project_Imp_Apply_v2 where companyName like '%无锡市方舟%'
--创建开发申请表
create table Develop_Apply(
	Develop_ID int identity(1,1) primary key,
	Customer_Name varchar(60),--客户名称
	Project_Name varchar(60),--项目名称
	Other_Project varchar(60),--相关项目
	Apply_People int,--申请人
	Apply_Date datetime default getdate(),--申请时间
	Support_People varchar(60),--支持人员
	Support_People_Check varchar(60),--审批支持人员
	Stop_Date datetime,--需要日期
	Stop_Date_Check datetime,--审批需要日期
	Module_Desc varchar(600), --功能描述
	Module_Desc_Check varchar(600), --审批功能描述
	saleType int, --项目类型
	Develop_ItemMainstate int,--项目执行状态(0:进行中 1:成功 2:暂停 3:失败)
	Develop_stopTime datetime,--项目完成时间
	Close_Reason varchar(600),--失败或暂停原因
	isAll int,--0:全部同意; 1:最高级同意
	isOrder int,--0:顺签; 1:会签
	this_checkState int --0:同意;1:拒绝;2:待审
);
SELECT * FROM Develop_Apply
--暂无使用，功能清单信息表
create table Develop_Function(
	Develop_Function_ID int identity(1,1) primary key,
	Apply_Module varchar(60),--应用模块
	Main_Function_Module varchar(60),--主功能模块
	Child_Function_Module varchar(60),--子功能模块
	Tree_Structure varchar(60),--树结构
	Main_Buttons varchar(60),--主要按钮
	Main_TagPages varchar(60),--主要页签
	Main_Pages varchar(60),--主要页面
	Main_ListItems varchar(60),--列表主要项目
	Search_Condition varchar(60),--查询条件
	Integration_Project varchar(200),--集成项目
	Predict_Workload int,--工作量预估(小时)
	Develop_ID int --关联开发项目
);
--开发项目视图
create view Develop_Apply_v
as
select da.Develop_ID,da.Project_Name,da.Other_Project,CONVERT(varchar(100), da.Apply_Date, 23) Apply_Date,
	da.Apply_People,hv.empName,da.Support_People,da.Support_People_Check,hv.departmentID, hv.deptname,hv.posname,
	CONVERT(varchar(100), da.Stop_Date, 23) Stop_Date,CONVERT(varchar(100), da.Stop_Date_Check, 23) Stop_Date_Check,
	da.Customer_Name,da.Module_Desc,da.Module_Desc_Check,da.isAll,da.isOrder, da.Close_Reason, da.this_checkState,
	(case when da.this_checkState = 2 then '待审' when da.this_checkState = 1 then '拒绝' else '同意' end) as checkState,
	da.saleType,sa.cName,da.Develop_ItemMainstate,
	(select top 1 isnull(ppn.pushstate_name,'') from Develop_pushstate_New ppn where ppn.Develop_ID=da.Develop_ID 
		and isEff=1 order by ppn.recode_time desc,Develop_psId desc) as currentStateID,
	(case when da.Develop_ItemMainstate = 0 then '进行中' when da.Develop_ItemMainstate = 1 then '成功' when da.Develop_ItemMainstate = 2 then '暂停' else '失败' end) as Mainstate,
	pt.pushState as pushStates,
	(select isnull(pushState,'') from project_template where saleType=0 and menu='Develop') as commonStates,
	(select sum(cco.isAgree) from common_checkOperation cco where cco.mainID=da.Develop_ID and checktype=805) as allCheckState,
	(select top 1 cco.isAgree from common_checkOperation cco where cco.mainID=da.Develop_ID and checktype=805 order by checkLev desc) as maxLevCheckState
from Develop_Apply da 
	left outer join hr_userAll_v hv on da.Apply_People=hv.userID
	left outer join sys_ass sa on da.saleType = sa.aID
	left outer join project_template pt on da.saleType = pt.saleType and pt.menu = 'Develop'
------------------------------------------------------------------------------------------------------------
select * from Develop_Apply_v 
	where Apply_Date>='2014/10/26 0:00:00' 
	and Apply_Date<='2015/10/26 23:59:59' 
	and Develop_ItemMainstate=0 
	and ((isAll=0 and allCheckState=0) or (isAll=1 and maxLevCheckState=0))
	
--任务状态完成信息表
create table Develop_pushstate_New(
	Develop_psId int identity(1,1) primary key,
	Develop_ID int not null,
	pushstate_time datetime not null,
	recode_time datetime default getdate(),
	pushstate_name int not null,
	pushstate_remark varchar(1000),
	isEff bit
);
select * from Develop_pushstate_New

--创建推进阶段信息视图
create view Develop_pushstate_v
	as
	select dpn.Develop_psId 推进记录ID, dpn.Develop_ID 项目ID, dpn.pushstate_name 推进状态ID, sa.cName 推进状态名称, 
		CONVERT(varchar(100), dpn.pushstate_time, 23) 推进时间, dpn.recode_time 推进记录时间, dpn.pushstate_remark 推进备注, dpn.isEff 推进是否有效,
		dav.Project_Name 项目名称,dav.Customer_Name 客户名称,dav.cName 项目类型,
		CONVERT(varchar(100), dav.Stop_Date_Check, 23) 需要完成时间
	from Develop_pushstate_New dpn 
		left outer join sys_ass sa on sa.aID = dpn.pushstate_name
		left outer join Develop_Apply_v dav on dpn.Develop_ID = dav.Develop_ID
select * from Develop_pushstate_v

--创建开发项目支持人员工作量表
create table Develop_Support_people_workCount(
	Develop_workID int IDENTITY(1,1) NOT NULL,
	Develop_ID int not null,--项目ID
	Develop_psId int not null,--推进记录ID
	support_people int not null,--支持人员
	support_people_name varchar(30),--支持人员姓名
	support_people_type int,--支持人员来源(外来，内部)
	workCount decimal(8,4) null,--工作时间（小时）
	actual_date_beg datetime,--实际开始时间
	actual_date_end datetime,--实际结束时间
	record_people int not null,--记录人
	create_time datetime default getdate()--创建时间
);
select * from Develop_Support_people_workCount
--创建项目工作量视图
create view Develop_WorkCount_v
	as
	select dw.Develop_workID 工作记录ID,dw.Develop_ID 项目ID,dw.support_people 顾问ID,dw.support_people_name as 顾问姓名,dw.support_people_type 顾问来源,
		dw.Develop_psId 推进记录ID,dp.pushstate_name 推进状态ID,sa.cName 推进状态名称,dw.workCount 工作时间,
		dw.actual_date_beg 实际开始时间,dw.actual_date_end 实际结束时间,dw.create_time 记录时间,da.Module_Desc_Check 工作内容,
		hv.empName as 记录人,dp.pushstate_time as 推进日期,dp.pushstate_remark as 备注,dp.isEff as 是否有效
	from Develop_Support_people_workCount dw 
		left outer join Develop_Apply da on da.Develop_ID=dw.Develop_ID 
		left outer join Develop_pushstate_New dp on dp.Develop_psId = dw.Develop_psId
		left outer join sys_ass sa on dp.pushstate_name=sa.aID
		left outer join hr_users_v hv on dw.record_people=hv.userID
select * from Develop_WorkCount_v

CREATE TABLE Project_ECR(
	ECR_ID INT IDENTITY(1,1) NOT NULL,
	Theme_ID INT NOT NULL,--主题ID
	ECR_People INT NOT NULL,--申请人
	ECR_Time DATETIME,--申请时间
	ECR_Reason VARCHAR(600),--变更原因
	Menu VARCHAR(10),--模块名
	isAll INT,--0:全部同意; 1:最高级同意
	isOrder INT,--0:顺签; 1:会签
	this_checkState INT --0:同意;1:拒绝;2:待审
);
SELECT * FROM Project_ECR

--需求变更视图
CREATE VIEW Develop_ECR_v
AS
SELECT pe.*, da.Project_Name,hv.empName
FROM Project_ECR pe 
	LEFT OUTER JOIN hr_userAll_v hv on pe.ECR_People=hv.userID
	LEFT OUTER JOIN Develop_Apply da on pe.Theme_ID = da.Develop_ID and pe.menu = 'Develop'
------------------------------------------------------------------------------------------------------------
SELECT * FROM Develop_ECR_v

--版本信息表
CREATE TABLE Develop_VerInfo(
	VerInfo_ID INT IDENTITY(1,1) NOT NULL,
	ECR_ID INT NOT NULL,--变更请求ID
	Develop_ID INT NOT NULL,--开发项目ID
	VersionID varchar(1) default 'A',--大版本
	IterationID varchar(2) default '1',--小版本
	Module_Desc varchar(600),--开发需求
	Module_Desc_Check varchar(600)--审核开发需求
);
SELECT * FROM Develop_VerInfo
--需求变更视图2
CREATE VIEW Develop_ECR_v2
AS
SELECT pe.*, da.Customer_Name, da.Project_Name,hv.empName,dv.VersionID,dv.Module_Desc,dv.Module_Desc_Check
FROM Project_ECR pe 
	LEFT OUTER JOIN hr_userAll_v hv ON pe.ECR_People=hv.userID
	LEFT OUTER JOIN Develop_Apply da ON pe.Theme_ID = da.Develop_ID AND pe.menu = 'Develop'
	LEFT OUTER JOIN Develop_VerInfo dv ON pe.ECR_ID = dv.ECR_ID AND pe.menu = 'Develop'
--------------------------------------------------------------------------------------------------
SELECT * FROM Develop_ECR_v2
GO
SP_HELPTEXT model_menu_Get
CREATE TABLE [dbo].[model_menu](
	[id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[modeID] [int] NULL,
	[menuID_list] [varchar](4000) NULL
)
SET IDENTITY_INSERT [model_menu] ON
INSERT INTO [model_menu]([id],[modeID],[menuID_list])
	SELECT * FROM OPENDATASOURCE(
			'SQLOLEDB','Data Source=192.168.0.252;User ID=saigeoA;Password=saige.aaa123456' 
		).SaigeOA.dbo.[model_menu]
SET IDENTITY_INSERT [model_menu] OFF
SELECT * FROM  model_menu


--角色主菜单
SELECT * FROM hr_employeeContract_v
--角色主菜单
SELECT * FROM role_group
--用户主菜单
SELECT * FROM role_usermenu
--用户信息视图
SELECT * FROM hr_users_v
GO
--用户签名信息表
SELECT * FROM user_signature
GO
--用户签名更新
SP_HELPTEXT user_signature_u
GO
--获取用户自定义邮箱
SP_HELPTEXT mail_mailTypeListDefine
SELECT typeName,typeID,orderID,tp,icos,Email,
		isnull((select isnull(typeName,'') from mail_mailtype where typeID=a.parentID),'') AS parName 
	FROM mail_MailType a 
GO
--邮件数
SP_HELPTEXT mail_MailCount
GO
--未读邮件
SP_HELPTEXT mail_getUnreadMailName
GO
--超时用户规则
SP_HELPTEXT sys_onLineSetting_select
GO
--超时分钟
SP_HELPTEXT sys_onLineUser_del
GO
--在线人员查询
SP_HELPTEXT sys_onLineUser_selectByuserID
GO
--是否存在临时附件
SP_HELPTEXT tempUpload_isHave_select
GO
--某个用户的临时附件
SP_HELPTEXT tempUpload_selectByUserID
GO
--附件附加到相应的主题下
SP_HELPTEXT soa_accessories_add
GO
SP_HELPTEXT soa_accessories_add_1
GO
--发送邮件
SP_HELPTEXT mail_main_add
GO
--接收外网邮件
SP_HELPTEXT mail_netmain_add
GO
--最新新闻获取
SP_HELPTEXT knowledge_news_hot
GO
--文档获取
SP_HELPTEXT knowledge_document_get
GO
--操作日志新增
SP_HELPTEXT sys_log_add
GO
--组织结构树
SP_HELPTEXT hr_organizetree
GO
--分页
SP_HELPTEXT sp_PageList2005
GO
--用户操作权限
SP_HELPTEXT role_user_role
GO
--用户菜单权限
SP_HELPTEXT Role_UserMenuList
GO
--用户系统设置权限
SP_HELPTEXT Role_ControlMenuList
GO
SP_HELPTEXT Role_AdminControlMenuList
GO
--得到页面所有按键FID
SP_HELPTEXT GetButtonFID
GO
--根据组织结构ID获取人员编制
SP_HELPTEXT hr_GetDeptCntByOrgID
GO
--获取员工类型
SP_HELPTEXT hr_employeeType_select
GO
SP_HELPTEXT hr_userID_employee
GO
--修改超级管理员密码
SP_HELPTEXT hr_admin_changepwd
GO
--根据员工ID找到user
SP_HELPTEXT hr_users_findByEmployeeID
GO
--用户信息更新
SP_HELPTEXT hr_users_update
GO
--根据id找到对应的部门
SP_HELPTEXT hr_department_findbyid
GO
SP_HELPTEXT hr_employee_selectbyid
GO
--授权
SP_HELPTEXT hr_employee_accredit
GO
--注销员工的oa权限
SP_HELPTEXT hr_employee_logout
GO
--user删除
SP_HELPTEXT hr_users_del
GO
--根据userID获取用户信息
SP_HELPTEXT hr_userID_employeeID
GO
--授权
SP_HELPTEXT hr_employee_accredit
GO
SP_HELPTEXT role_user_Edit
GO
SP_HELPTEXT hr_RoleUserList
GO
SP_HELPTEXT role_menu_User
GO
SP_HELPTEXT GetUserRoleName
GO
SP_HELPTEXT GetUserRoles
GO
--判断是否有邮件权限
SP_HELPTEXT maiRoleUser_isLook_all
GO
SP_HELPTEXT GetUserControl
GO
SP_HELPTEXT hr_user_selectByUserID
GO
-- 导出人事资料
SP_HELPTEXT GetEmployeeExport
GO
--员工入职
SP_HELPTEXT hr_employeeAdd_isSucceed
GO
--根据employeeID 得到照片记录
SP_HELPTEXT hr_employeePhoto_selectByID
GO
SP_HELPTEXT hr_employee_add
GO
--员工照片的新增
SP_HELPTEXT hr_employeePhoto_add 
GO
--根据组织机构id找到usrid
SP_HELPTEXT hr_user_getUserIDByOrgID
GO
SP_HELPTEXT hr_employee_updateNew
GO
--员工照片的删除
SP_HELPTEXT hr_employeePhoto_del
GO
--员工的删除
CREATE PROCEDURE [dbo].[hr_employee_del]
(
	@employeeID int
)
AS
declare @userid int
begin
	begin tran
	update  hr_employee set Leave=1 where employeeID= @employeeID
	update hr_users set disabled='1' , ntAccount=null where UID= @employeeID 
	select @userid=userID from hr_users where UID=@employeeID
	delete role_user where userID=@userid
	delete role_usermenu where userID=@userid
	if @@error > 0
		begin 
		rollback tran
		return 1
		end
	else
		commit tran
		return 0
end
GO
--监管职位
select * from hr_employeeVicePosition
GO
--根据userID 查到该员工的合同
CREATE PROCEDURE [dbo].[hr_employeeContract_selectByUserID] 
(
	@userID int
)
AS
BEGIN
	select * from hr_empContarct where userID=@userID
END
GO
--员工合同的查询
CREATE PROCEDURE [dbo].[hr_employeeContract_selectByID] 
(
	@empContratID int	
)
AS
BEGIN
  select * from  hr_empContarct where empContratID=@empContratID
END
GO

--员工合同的新增
CREATE PROCEDURE [dbo].[hr_employeeContract_add]
(
	@userID int,
	@contractNO varchar(50),
	@startDate	datetime,
	@endDate	datetime,
	@insertDate	datetime,
	@remark    text,
	@insuranceNO  varchar(50)
)
AS
declare @empContratID int
if exists(select top 1 insuranceNO from hr_empContarct where insuranceNO=@insuranceNO and insuranceNO<>'')
begin
	return 4
end
else
begin
if exists(select top 1 userID from hr_empContarct where ((@startDate between startDate and endDate) or (@endDate between startDate and endDate)) and userID=@userID)
begin
return 0
end
if exists(select top 1 userID from hr_empContarct where contractNO=@contractNO)
begin
	return 1
end
else
BEGIN
	begin tran
   insert into hr_empContarct(userID,contractNO,startDate,endDate,insertDate,years,remark,insuranceNO) values(@userID,@contractNO,@startDate,@endDate,@insertDate,datediff(year,@startDate,@endDate),  @remark,@insuranceNO)
   set @empContratID=@@identity
   exec soa_accessories_add @userID,@empContratID,'HR_empContract'	
	if @@error>0
	begin
		rollback
		return 2
	end
	else
	begin
		commit
		return 3
	end
END
end
GO

--员工合同的修改
CREATE PROCEDURE [dbo].[hr_employeeContract_update]
(
	@empContratID	int,
	@userID int,
	@contractNO varchar(50),
	@startDate	datetime,
	@endDate	datetime,
	@insertDate	datetime,
	@remark    text,
	@insuranceNO varchar(50)
)
AS
if exists(select top 1 insuranceNO from hr_empContarct where insuranceNO=@insuranceNO and insuranceNO<>'' and userID<>@userID)
begin
	return 4
end
else
begin
if exists(select top 1 userID from hr_empContarct where((@startDate between startDate and endDate) or (@endDate between startDate and endDate)) and userID=@userID and empContratID<>@empContratID)
BEGIN
	return 0
end
if exists(select top 1 userID from hr_empContarct where contractNO=@contractNO and empContratID<>@empContratID)
begin
	return 1
end
else
begin
	begin tran
	update hr_empContarct set contractNO=@contractNO,startDate=@startDate,endDate=@endDate,insertDate=@insertDate,years=datediff(year,@startDate,@endDate), remark=@remark ,insuranceNO=@insuranceNO 
	where empContratID=@empContratID
	exec soa_accessories_add @userID,@empContratID,'HR_empContract'	
	if @@error>0
	begin
		rollback
		return 2
	end
	else
	begin
		commit
		return 3
	end
END
end
GO

--表添加两个字段oldPosID,newPosID modified by yulan zhang 2015-2-3
--人员移动
CREATE PROCEDURE [dbo].[hr_employee_move] 
(
	@employeeID int,
	@newDeptID  int,
	@insertDate datetime,
	@remark    varchar(50),
	@newPosID int
)
AS
declare @oldDeptID int
declare @oldPosID int
BEGIN
	begin tran
	select @oldDeptID=departmentID,@oldPosID=positionID from hr_employee where employeeID=@employeeID
	update hr_employee set departmentID= @newDeptID,positionID =@newPosID where employeeID=@employeeID
	insert into hr_employeeRedeploy(employeeID,oldDeptID,newDeptID,insertDate,typeName,remark,newPosID)
values(@employeeID,@oldDeptID,@newDeptID,@insertDate,'部门调动',@remark,@newPosID)
	if @@error>0
	begin
		rollback
		return 1
	end
	else
	begin
		commit
		return 2
	end
END
GO

--
CREATE PROCEDURE [dbo].[hr_employee_redeploy_selectByID] 
@employeeID int
AS
BEGIN
	select * from hr_employee_redeploy_v where employeeID=@employeeID
END
GO
--根据员工id找到对应的离职员工信息
CREATE PROCEDURE [dbo].[hr_employeeLeave_selectByID]
(
	@employeeID int
)
AS
BEGIN
	select * from hr_employeeLeave where employeeID=@employeeID
END
GO

--转正人员的新增remark
create PROCEDURE [dbo].[hr_employeeBegin_selectByID]
(
	@employeeID int
)
AS
begin
select * from hr_employeeBegin where employeeID=@employeeID
end
GO

-- 按员工userID找到该员工的请假记录
CREATE PROCEDURE [dbo].[hr_employeeHoliday_selectPerson] 
(
	@userID int,
	@year int
)
AS
BEGIN
	select a.*,b.empName from hr_employeeHoliday a ,hr_users_v b where a.userID=b.userID and a.userID=@userID  and year(a.insertDate)=@year
END
GO

--根据员工id查找入职前资料
CREATE PROCEDURE [dbo].[hr_employee_resume_selectByEmployeeID]
(
	@employeeID int
)
AS
BEGIN
select * from hr_resume_v where employeeID=@employeeID
END
GO




--主菜单
select * from role_menu where menuName like '%劳动合同%' HR/Employee/frmEmpContract.aspx
--控制面板
select * from Tab_Control where menuName like '%密码管理%'
update Tab_Control set menuUrl='userManage.aspx' where CID=95
select * from login_ui
select * from module_setting
go
--开启或关闭登陆页面模式(单栏/双栏)
sp_helptext login_ui_program_EnableChange
go
--根据ID获取登陆样式
sp_helptext login_ui_program_getbyid
go
--
sp_helptext module_setting_select
go
--获取主菜单
sp_helptext Role_menulist
go
--获取父菜单下子菜单个数(主)
sp_helptext Role_menus_conut
go
--根据菜单ID获取菜单项
sp_helptext Role_menus_m
go
--更新主菜单
sp_helptext role_menu_update
go
--添加主菜单
sp_helptext role_menu_add
go
--主菜单项删除
sp_helptext role_menu_del
go
--系统菜单添加
sp_helptext role_Contmenu_add
go
--系统菜单删除
sp_helptext role_Contmenu_del
go
--系统菜单更新
sp_helptext role_Contmenu_update
go
--获取父菜单下子菜单个数(系统)
sp_helptext Role_Contmenus_conut
go
--根据菜单ID获取菜单项
sp_helptext Role_Contmenus_m
go
--页面按钮授权中使用的模块
sp_helptext hr_modulist
go
--页面按钮授权，根据模块名判断模块是否存在
sp_helptext Role_moduleExists
go
--页面按钮授权，增加模块
sp_helptext Role_moduleAdd
go
--删除模块
sp_helptext Role_moduledel
go
--停用模块、启用模块
sp_helptext Role_moduledelMa
go
--根据模块ID获取模块信息
sp_helptext hr_SControl
go
----页面按钮授权，根据按钮名判断按钮授权是否存在
sp_helptext Role_FunExists
go
--添加按钮授权
sp_helptext Role_FunAdd
go
--删除按钮授权
sp_helptext Role_Fundel
go
--公司安全ip新增
sp_helptext IP_company_update
go
--公司安全ip的删除
sp_helptext IP_company_del
go
--公司安全ip新增
sp_helptext IP_company_add
go
--公司安全ip查找
sp_helptext IP_company_selectByID
go
--公司安全ip修改
sp_helptext IP_company_update
go
sp_helptext IP_userInfo_v
go
--个人ip限制删除
sp_helptext ip_userInfo_del
go
--公司安全ip查询
sp_helptext IP_company_select
go
--个人ip限制新增
sp_helptext ip_userInfo_add
go
--个人ip设置的查找（根据infoID）
sp_helptext ip_userInfo_selectByInfoID
go
--个人ip限制新增
sp_helptext ip_userInfo_update
go 
--查询企业密码策略
sp_helptext hr_companyPWD_reader
go
--得到企业密码
sp_helptext hr_companyPWd_select
go
--定时修改密码设置
sp_helptext hr_companyPWD_update
go
--授权策略的Select
sp_helptext hr_employeeAccredit_select
go
--授权策略的Select
sp_helptext hr_employeeAccredit_select
go
sp_helptext Role_MenuIDMenuName
go
sp_helptext role_group_Edit
go
sp_helptext role_fun_Edit
go
sp_helptext ControlMenu_Role_Edit
go
sp_helptext GetControlMenuName
go
--查找角色权限
sp_helptext role_group_select
go
--取出指定省份的城市
sp_helptext hr_city_selectByproviceID
go
--所有省份集
sp_helptext hr_province_select
go
sp_helptext hr_position_selectAll
go
--附件表查询
sp_helptext sys_ass_select
go
--根据id找到省
sp_helptext hr_provinceID_selectByID
go
--根据id找到城市
sp_helptext hr_city_selectByID
go
--附件增加
sp_helptext soa_accessories_add





























