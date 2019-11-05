use WechatFoundationDB;
go

select * from [dbo].[TestSalesReport]

update [dbo].[TestSalesReport] set MonthRate=LTRIM(CAST(convert(float,MonthRate)*100 as decimal(5,2)))+'%',
	LastMonthRate=LTRIM(CAST(convert(float,LastMonthRate)*100 as decimal(5,2)))+'%',
	DayRate=LTRIM(CAST(convert(float,DayRate)*100 as decimal(5,2)))+'%',
	LastDayRate=LTRIM(CAST(convert(float,LastDayRate)*100 as decimal(5,2)))+'%'

--企业号
select * from T_WechatAccount
update T_WechatAccount set [Type] = N'企业号' where ID = 1
--企业号设置
select * from T_WechatAccountConfig
update T_WechatAccountConfig set CorpID = 'wxac9f1336104f190a'
--企业号应用
select * from T_App
update T_App set WechatAccountID=1
select * from T_AppConfig
update T_App set AgentID='1000022' where ID=9
update T_AppConfig set SecretKey='81YbusCuhu246gwNiBiqkjZnDe8V2mlFzqrSEfdrCGE' where AppID=9
select * from T_AppDomain
select * from T_AppDomainDynamic
select * from T_AppDomainStatic

select * from V_AppWechatAccountInfo

select * from T_AppUser
--用户
select * from T_User
update T_User set [Status]=1 where ChrisID='colin.chen'
select * from T_IntranetApp_Employee
delete from T_User where ID = 40
--用户角色
select * from T_RoleOperator where OperatorID = 13514
insert into T_RoleOperator values
(5,6,null,null,0)
delete from T_RoleOperator where OperatorID not in(13514,13515)
update T_RoleOperator set WechatAccountID = 1 where OperatorID = 13514
--职员
select * from T_IntranetApp_Employee
delete T_IntranetApp_Employee where KeyID=15
select * from V_User where Sex in (N'M',N'F') and City in (N'上海市')
select * from V_BackendUser
update T_User set ParentPerson='christmas.mao' where ID=17
--角色
select * from T_Role
select * from T_RolePermission where RoleId=5
select * from T_Permission
-- select * from T_PermissionUrl
select * from T_Object
select * from T_Action

select * from T_SyncUserLog

select * from T_Location
select * from T_LocationBranch
select * from T_LocationOperator
select * from V_Location

select * from T_Group
select * from T_GroupDynamic
truncate table T_GroupDynamic
select * from T_GroupOperator
select * from T_GroupStatic
truncate table T_GroupStatic
select * from V_GroupStatic

select * from V_AppUser

select * from V_Category

select * from T_SiteService_Type
select * from T_Menu
select * from V_Content where EnContentTitle like '%123123%'
select * from T_Category
update T_Category set AppID=3 where CategoryID=2
select * from T_Content where CategoryID=3 and MessageCoverImageId!=0
update T_Content set ContentCoverImageId=MessageCoverImageId,MessageCoverImageId=0 where CategoryID=3 and MessageCoverImageId!=0
select * from T_ContentCategory
select * from T_ContentUser
select * from T_ContentFile
select * from T_ContentStatus
select * from T_ContentLanguage
select * from T_Tag
select * from V_Tag
select * from T_File
select * from T_FileFacilityMapping
select * from T_UserComment
select * from T_AdminComment
select * from V_UserComment
select * from V_ContentFiles

select * from T_ContentUser
select * from T_ContentUserLikeMapping

select * from V_ServiceUser
select * from T_ServiceUser

select * from T_Message
select * from T_MessageItem
select * from T_MessageItemLanguage
select * from T_MessageGroupRecipient
select * from T_MessageUserRecipient
select * from T_MessageUserRecipientSelected
select * from V_Message where Creator=6

select * from T_Log_UserAccessFoundation

go
create view V_Tag
as
select t.*, c.NameCn CategoryName from T_Tag t
inner join T_Category c on t.CategoryId=c.CategoryID

select * from V_User

exec P_GroupUser_GetListByAppID 1,65


SELECT  v1.Id AS UserID FROM V_User v1
	WHERE EXISTS (SELECT * FROM T_AppUser t1
	    WHERE v1.Id = t1.UserID AND t1.IsDisabled = 0)
		and Department='INFRA'

go
drop FUNCTION F_StrSplit
go
CREATE FUNCTION F_StrSplit ( @str VARCHAR(100) )
RETURNS NVARCHAR(600)
AS
    BEGIN
        SET @str = @str + ','
		DECLARE @returnStr NVARCHAR(600)
        DECLARE @insertStr NVARCHAR(50) --截取后的第一个字符串
        DECLARE @newstr NVARCHAR(600) --截取第一个字符串后剩余的字符串
        SET @insertStr = LEFT(@str, CHARINDEX(',', @str) - 1)
        SET @newstr = STUFF(@str, 1, CHARINDEX(',', @str), '')
		set @returnStr='N'''+@insertStr+''''
        WHILE ( LEN(@newstr) > 0 )
            BEGIN
                SET @insertStr = LEFT(@newstr, CHARINDEX(',', @newstr) - 1)
                set @returnStr= @returnStr + ',' + 'N'''+@insertStr+''''
                SET @newstr = STUFF(@newstr, 1, CHARINDEX(',', @newstr), '')
            END
        RETURN @returnStr
    END

	select dbo.F_StrSplit('INFRA,人力资源部')


-- 创建用户
set identity_insert dbo.T_IntranetApp_Employee on
INSERT INTO dbo.T_IntranetApp_Employee (KeyID, EmployeeID, EmployeeType, EmploymentDate, EmployeeStatus, AD, CName, PinYin, EName, FirstName, LastName, Sex, PositionCode, Birthday, LegalEntity, Division, Department, CostCenterCode, FTECostCenter, Region, Branch, ReportTo, FunctionalMgr, HomeBased, Position, Pnationality, IDType, IDCard, FieldForce, GMLevel, BranchCode, City, Email, WorkPhone, MobilePhone, ChrisID, JobLevel, IsTUMember, RegionId, Photo, [State], MobilePhone2)
VALUES (51, 'shanshan.li', NULL, NULL, NULL, 'shanshan.li', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'shanshan.li', NULL, NULL, NULL, NULL, '未关注', NULL)
set identity_insert dbo.T_IntranetApp_Employee off
update dbo.T_IntranetApp_Employee set LegalEntity='1760' where EmployeeID='shanshan.li'
update dbo.T_IntranetApp_Employee set EmployeeType='P',CName=N'李珊珊' where EmployeeID='shanshan.li'
GO
set identity_insert dbo.T_User on
INSERT INTO dbo.T_User (ID, ChrisID, CreationTime, WechatID, FollowTime, UnfollowTime, FollowStatus, Email, MobilePhone, EmployeeName, EmployeeStatus, Language, WechatAccountID, IsDisabled, TencentUserId, TencentOpenid, TencentUnionId, EmployeeId, CustomId, IsDeptManager, IsBack, ParentPerson, Status, WorkYears)
VALUES (48, 'shanshan.li', getdate(), NULL, getdate(), getdate(), 1, getdate(), '18762658479', 'Test', 'E', 2, 1, 0, NULL, NULL, NULL, NULL, NULL, 1, 1, 'ben.liu', 1, 10)
set identity_insert dbo.T_User off
GO
set identity_insert dbo.T_AppUser on
INSERT INTO dbo.T_AppUser (ID, AppID, UserID, IsDisabled, CreationTime)
VALUES (15, 3, 48, 0, getdate())
set identity_insert dbo.T_AppUser off
INSERT INTO dbo.T_AppUser (AppID, UserID, IsDisabled, CreationTime)
select ID, 3, 0, getdate() from T_App where ID > 3
select * from dbo.T_AppUser
GO
insert into T_RoleOperator values (5,48,null,null,0)

