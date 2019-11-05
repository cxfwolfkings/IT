if not Exists(select * from SM_ResourceGroup where GroupId='PCARDFOLDER')
insert into SM_ResourceGroup(GroupId,GroupName,Remark,GroupCode,Flags)
values('PCARDFOLDER',N'工艺文件夹',N'工艺文件夹','PCARDFOLDER',0)

go

if not Exists(select * from SM_ResourceGroup where GroupId='PCARDGROUP')
insert into SM_ResourceGroup(GroupId,GroupName,Remark,GroupCode,Flags)
values('PCARDGROUP',N'工艺卡片',N'工艺卡片','PCARDGROUP',0)

go

if not Exists(select * from SM_Resources where ResourceId='EB92CDA4-2098-4A8D-90F1-A0C9A151180B')
Insert Into SM_Resources(ResourceId,ResourceCode,ParentResource,GroupId,ResourceName) Values
(N'EB92CDA4-2098-4A8D-90F1-A0C9A151180B',N'ProcessCard'
,NULL,N'9D96FD30-DBC6-4CA7-B2A1-6737FCA27A5E'
,N'')

if not Exists(select * from SM_Resources where ResourceId='9391AA01-DCFD-48A2-9C7A-A6B4D291701F')
Insert Into SM_Resources(ResourceId,ResourceCode,ParentResource,GroupId,ResourceName) Values
(N'9391AA01-DCFD-48A2-9C7A-A6B4D291701F',N'ProcessCard01'
,N'EB92CDA4-2098-4A8D-90F1-A0C9A151180B',N'9D96FD30-DBC6-4CA7-B2A1-6737FCA27A5E'
,N'')

if not Exists(select * from SM_Resources where ResourceId='732F8DC1-563B-42AB-80DE-BBC16939EF4F')
Insert Into SM_Resources(ResourceId,ResourceCode,ParentResource,GroupId,ResourceName) Values
(N'732F8DC1-563B-42AB-80DE-BBC16939EF4F',N'ProcessCard02'
,N'EB92CDA4-2098-4A8D-90F1-A0C9A151180B',N'9D96FD30-DBC6-4CA7-B2A1-6737FCA27A5E'
,N'')

if not Exists(select * from SM_Resources where ResourceId='F884FFD2-4828-44FE-87AA-A904D5B638B8')
Insert Into SM_Resources(ResourceId,ResourceCode,ParentResource,GroupId,ResourceName) Values
(N'F884FFD2-4828-44FE-87AA-A904D5B638B8',N'ProcessCard03'
,N'EB92CDA4-2098-4A8D-90F1-A0C9A151180B',N'9D96FD30-DBC6-4CA7-B2A1-6737FCA27A5E'
,N'')

if not Exists(select * from SM_Resources where ResourceId='D124F85C-8062-4EC7-839A-CA07BBB5EB10')
Insert Into SM_Resources(ResourceId,ResourceCode,ParentResource,GroupId,ResourceName) Values
(N'D124F85C-8062-4EC7-839A-CA07BBB5EB10',N'ProcessCard04'
,N'EB92CDA4-2098-4A8D-90F1-A0C9A151180B',N'9D96FD30-DBC6-4CA7-B2A1-6737FCA27A5E'
,N'')

go

if not Exists(select * from SM_Menus where ResourceId='EB92CDA4-2098-4A8D-90F1-A0C9A151180B')
Insert Into SM_Menus(ResourceId,MenuName,MenuUrl,TargetName,AccessParas,IsItem,Area,DisplaySeq,IsSpecial) Values
(N'EB92CDA4-2098-4A8D-90F1-A0C9A151180B',N'工艺文件管理'
,N'',N''
,N'',0
,N'System',5
,0)

go

if not Exists(select * from SM_Menus where ResourceId='9391AA01-DCFD-48A2-9C7A-A6B4D291701F')
Insert Into SM_Menus(ResourceId,MenuName,MenuUrl,TargetName,AccessParas,IsItem,Area,DisplaySeq,IsSpecial) Values
(N'9391AA01-DCFD-48A2-9C7A-A6B4D291701F',N'工艺文件查询'
,N'javascript:OpenPage(''Process/Assist/ProcessCardSearch.aspx'',''{0}'');',N''
,N'',1
,N'',1
,0)

go

if not Exists(select * from SM_Menus where ResourceId='732F8DC1-563B-42AB-80DE-BBC16939EF4F')
Insert Into SM_Menus(ResourceId,MenuName,MenuUrl,TargetName,AccessParas,IsItem,Area,DisplaySeq,IsSpecial) Values
(N'732F8DC1-563B-42AB-80DE-BBC16939EF4F',N'工艺文件-工作区'
,N'javascript:OpenPage(''Process/Assist/ProcessCardFrame.aspx?position=workspace'',''{0}'');',N''
,N'',1
,N'',2
,0)

go

if not Exists(select * from SM_Menus where ResourceId='F884FFD2-4828-44FE-87AA-A904D5B638B8')
Insert Into SM_Menus(ResourceId,MenuName,MenuUrl,TargetName,AccessParas,IsItem,Area,DisplaySeq,IsSpecial) Values
(N'F884FFD2-4828-44FE-87AA-A904D5B638B8',N'工艺文件-归档区'
,N'javascript:OpenPage(''Process/Assist/ProcessCardFrame.aspx?position=filespace'',''{0}'');',N''
,N'',1
,N'',3
,0)

go

if not Exists(select * from SM_Menus where ResourceId='D124F85C-8062-4EC7-839A-CA07BBB5EB10')
Insert Into SM_Menus(ResourceId,MenuName,MenuUrl,TargetName,AccessParas,IsItem,Area,DisplaySeq,IsSpecial) Values
(N'D124F85C-8062-4EC7-839A-CA07BBB5EB10',N'工艺文件-发布区'
,N'javascript:OpenPage(''Process/Assist/ProcessCardFrame.aspx?position=pubspace'',''{0}'');',N''
,N'',1
,N'',4
,0)

go

if not Exists(select * from SM_ResourceDic where DicId='09D5048B-9074-418E-87CF-038D0ADC349F')
Insert Into SM_ResourceDic(DicId,ResourceId,ResourceDesc,LanguageId) Values
(N'09D5048B-9074-418E-87CF-038D0ADC349F',N'732F8DC1-563B-42AB-80DE-BBC16939EF4F'
,N'工艺文件-工作区',2
)

if not Exists(select * from SM_ResourceDic where DicId='0E0FDBBE-7DAE-494C-B95C-1283EBB16E63')
Insert Into SM_ResourceDic(DicId,ResourceId,ResourceDesc,LanguageId) Values
(N'0E0FDBBE-7DAE-494C-B95C-1283EBB16E63',N'EB92CDA4-2098-4A8D-90F1-A0C9A151180B'
,N'工艺文件管理',2
)

if not Exists(select * from SM_ResourceDic where DicId='22EF17F4-5C06-43B7-9001-1C3E435802AE')
Insert Into SM_ResourceDic(DicId,ResourceId,ResourceDesc,LanguageId) Values
(N'22EF17F4-5C06-43B7-9001-1C3E435802AE',N'F884FFD2-4828-44FE-87AA-A904D5B638B8'
,N'工艺文件-归档区',1
)

if not Exists(select * from SM_ResourceDic where DicId='34338590-109F-4657-9F45-7D33B3FE4BD9')
Insert Into SM_ResourceDic(DicId,ResourceId,ResourceDesc,LanguageId) Values
(N'34338590-109F-4657-9F45-7D33B3FE4BD9',N'D124F85C-8062-4EC7-839A-CA07BBB5EB10'
,N'工艺文件-发布区',-1
)

if not Exists(select * from SM_ResourceDic where DicId='51908FD9-FC41-4C7F-AE20-144F6C293B54')
Insert Into SM_ResourceDic(DicId,ResourceId,ResourceDesc,LanguageId) Values
(N'51908FD9-FC41-4C7F-AE20-144F6C293B54',N'EB92CDA4-2098-4A8D-90F1-A0C9A151180B'
,N'工艺文件管理',-1
)

if not Exists(select * from SM_ResourceDic where DicId='73040973-88BF-4D88-9469-12982C62D4A6')
Insert Into SM_ResourceDic(DicId,ResourceId,ResourceDesc,LanguageId) Values
(N'73040973-88BF-4D88-9469-12982C62D4A6',N'9391AA01-DCFD-48A2-9C7A-A6B4D291701F'
,N'工艺文件查询',0
)

if not Exists(select * from SM_ResourceDic where DicId='7EEEF3EE-9B3B-496A-95EF-0416E773DA53')
Insert Into SM_ResourceDic(DicId,ResourceId,ResourceDesc,LanguageId) Values
(N'7EEEF3EE-9B3B-496A-95EF-0416E773DA53',N'732F8DC1-563B-42AB-80DE-BBC16939EF4F'
,N'工艺文件-工作区',-1
)

if not Exists(select * from SM_ResourceDic where DicId='828F6024-5DC0-4AC7-8171-79FAB59BCD3E')
Insert Into SM_ResourceDic(DicId,ResourceId,ResourceDesc,LanguageId) Values
(N'828F6024-5DC0-4AC7-8171-79FAB59BCD3E',N'D124F85C-8062-4EC7-839A-CA07BBB5EB10'
,N'工艺文件-发布区',0
)

if not Exists(select * from SM_ResourceDic where DicId='90B2B411-DD81-4EFE-A9EF-BD3BF6983EA3')
Insert Into SM_ResourceDic(DicId,ResourceId,ResourceDesc,LanguageId) Values
(N'90B2B411-DD81-4EFE-A9EF-BD3BF6983EA3',N'9391AA01-DCFD-48A2-9C7A-A6B4D291701F'
,N'工艺文件查询',-1
)

if not Exists(select * from SM_ResourceDic where DicId='9C5DAF91-3489-4DB4-8CD6-8AD225BF75C2')
Insert Into SM_ResourceDic(DicId,ResourceId,ResourceDesc,LanguageId) Values
(N'9C5DAF91-3489-4DB4-8CD6-8AD225BF75C2',N'D124F85C-8062-4EC7-839A-CA07BBB5EB10'
,N'工艺文件-发布区',1
)

if not Exists(select * from SM_ResourceDic where DicId='A6C2ADF6-B38B-41F2-836D-EEA5F3CBD371')
Insert Into SM_ResourceDic(DicId,ResourceId,ResourceDesc,LanguageId) Values
(N'A6C2ADF6-B38B-41F2-836D-EEA5F3CBD371',N'EB92CDA4-2098-4A8D-90F1-A0C9A151180B'
,N'工艺文件管理',0
)

if not Exists(select * from SM_ResourceDic where DicId='BDAFCB6B-24C2-4E15-990B-18F3DBA8D527')
Insert Into SM_ResourceDic(DicId,ResourceId,ResourceDesc,LanguageId) Values
(N'BDAFCB6B-24C2-4E15-990B-18F3DBA8D527',N'732F8DC1-563B-42AB-80DE-BBC16939EF4F'
,N'工艺文件-工作区',1
)

if not Exists(select * from SM_ResourceDic where DicId='C367CC95-AD83-47B4-AB57-78A781B5645F')
Insert Into SM_ResourceDic(DicId,ResourceId,ResourceDesc,LanguageId) Values
(N'C367CC95-AD83-47B4-AB57-78A781B5645F',N'F884FFD2-4828-44FE-87AA-A904D5B638B8'
,N'工艺文件-归档区',0
)

if not Exists(select * from SM_ResourceDic where DicId='D1BA9E2D-3C4B-40A8-A49E-E2F8AF35EC5C')
Insert Into SM_ResourceDic(DicId,ResourceId,ResourceDesc,LanguageId) Values
(N'D1BA9E2D-3C4B-40A8-A49E-E2F8AF35EC5C',N'9391AA01-DCFD-48A2-9C7A-A6B4D291701F'
,N'工艺文件查询',2
)

if not Exists(select * from SM_ResourceDic where DicId='D645763E-155C-4201-BE4A-2FD4CFCD981E')
Insert Into SM_ResourceDic(DicId,ResourceId,ResourceDesc,LanguageId) Values
(N'D645763E-155C-4201-BE4A-2FD4CFCD981E',N'9391AA01-DCFD-48A2-9C7A-A6B4D291701F'
,N'工艺文件查询',1
)

if not Exists(select * from SM_ResourceDic where DicId='E9534936-EA29-4611-83F1-2B02DA127383')
Insert Into SM_ResourceDic(DicId,ResourceId,ResourceDesc,LanguageId) Values
(N'E9534936-EA29-4611-83F1-2B02DA127383',N'F884FFD2-4828-44FE-87AA-A904D5B638B8'
,N'工艺文件-归档区',2
)

if not Exists(select * from SM_ResourceDic where DicId='EA811039-1948-4874-A3DD-6E9F8DBC354D')
Insert Into SM_ResourceDic(DicId,ResourceId,ResourceDesc,LanguageId) Values
(N'EA811039-1948-4874-A3DD-6E9F8DBC354D',N'EB92CDA4-2098-4A8D-90F1-A0C9A151180B'
,N'工艺文件管理',1
)

if not Exists(select * from SM_ResourceDic where DicId='EB0330AB-2190-4A85-9B19-261C1AE12FA5')
Insert Into SM_ResourceDic(DicId,ResourceId,ResourceDesc,LanguageId) Values
(N'EB0330AB-2190-4A85-9B19-261C1AE12FA5',N'732F8DC1-563B-42AB-80DE-BBC16939EF4F'
,N'工艺文件-工作区',0
)

if not Exists(select * from SM_ResourceDic where DicId='EC186088-32B8-40BB-BF8A-FFD377426206')
Insert Into SM_ResourceDic(DicId,ResourceId,ResourceDesc,LanguageId) Values
(N'EC186088-32B8-40BB-BF8A-FFD377426206',N'D124F85C-8062-4EC7-839A-CA07BBB5EB10'
,N'工艺文件-发布区',2
)

if not Exists(select * from SM_ResourceDic where DicId='FC8EEC0E-DB5C-43B4-B40C-4719139EEE75')
Insert Into SM_ResourceDic(DicId,ResourceId,ResourceDesc,LanguageId) Values
(N'FC8EEC0E-DB5C-43B4-B40C-4719139EEE75',N'F884FFD2-4828-44FE-87AA-A904D5B638B8'
,N'工艺文件-归档区',-1
)
go

if not Exists(select * from SM_Permissions where PermissionID='3A3DA2AA-BC5A-4A31-AC13-CF534309E974')
Insert Into SM_Permissions(PermissionID,OperateId,ResourceId) Values
(N'3A3DA2AA-BC5A-4A31-AC13-CF534309E974',N'91C7B54E-646D-4509-B354-09D882893414'
,N'EB92CDA4-2098-4A8D-90F1-A0C9A151180B')

if not Exists(select * from SM_Permissions where PermissionID='1C60583B-FB06-448F-B091-5172A69B79C9')
Insert Into SM_Permissions(PermissionID,OperateId,ResourceId) Values
(N'1C60583B-FB06-448F-B091-5172A69B79C9',N'91C7B54E-646D-4509-B354-09D882893414'
,N'9391AA01-DCFD-48A2-9C7A-A6B4D291701F')

if not Exists(select * from SM_Permissions where PermissionID='DE3FB559-F5B6-45E5-8087-036CAC2384C9')
Insert Into SM_Permissions(PermissionID,OperateId,ResourceId) Values
(N'DE3FB559-F5B6-45E5-8087-036CAC2384C9',N'91C7B54E-646D-4509-B354-09D882893414'
,N'732F8DC1-563B-42AB-80DE-BBC16939EF4F')

if not Exists(select * from SM_Permissions where PermissionID='9DEF935D-4378-4E40-B40A-90B5CFA2B0BE')
Insert Into SM_Permissions(PermissionID,OperateId,ResourceId) Values
(N'9DEF935D-4378-4E40-B40A-90B5CFA2B0BE',N'91C7B54E-646D-4509-B354-09D882893414'
,N'F884FFD2-4828-44FE-87AA-A904D5B638B8')

if not Exists(select * from SM_Permissions where PermissionID='DA0662DA-0232-469C-B572-95FCBAA1F42E')
Insert Into SM_Permissions(PermissionID,OperateId,ResourceId) Values
(N'DA0662DA-0232-469C-B572-95FCBAA1F42E',N'91C7B54E-646D-4509-B354-09D882893414'
,N'D124F85C-8062-4EC7-839A-CA07BBB5EB10')

go

if not Exists(select * from SM_AssignedPermission where ObjectId='2F58249F-8748-4FE1-B077-5543E86DD3BD' and PermissionId='1C60583B-FB06-448F-B091-5172A69B79C9')
Insert Into SM_AssignedPermission(ObjectId,PermissionId) Values
(N'2F58249F-8748-4FE1-B077-5543E86DD3BD',N'1C60583B-FB06-448F-B091-5172A69B79C9'
)

if not Exists(select * from SM_AssignedPermission where ObjectId='2F58249F-8748-4FE1-B077-5543E86DD3BD' and PermissionId='DE3FB559-F5B6-45E5-8087-036CAC2384C9')
Insert Into SM_AssignedPermission(ObjectId,PermissionId) Values
(N'2F58249F-8748-4FE1-B077-5543E86DD3BD',N'DE3FB559-F5B6-45E5-8087-036CAC2384C9'
)

if not Exists(select * from SM_AssignedPermission where ObjectId='2F58249F-8748-4FE1-B077-5543E86DD3BD' and PermissionId='9DEF935D-4378-4E40-B40A-90B5CFA2B0BE')
Insert Into SM_AssignedPermission(ObjectId,PermissionId) Values
(N'2F58249F-8748-4FE1-B077-5543E86DD3BD',N'9DEF935D-4378-4E40-B40A-90B5CFA2B0BE'
)

if not Exists(select * from SM_AssignedPermission where ObjectId='2F58249F-8748-4FE1-B077-5543E86DD3BD' and PermissionId='DA0662DA-0232-469C-B572-95FCBAA1F42E')
Insert Into SM_AssignedPermission(ObjectId,PermissionId) Values
(N'2F58249F-8748-4FE1-B077-5543E86DD3BD',N'DA0662DA-0232-469C-B572-95FCBAA1F42E'
)

if not Exists(select * from SM_AssignedPermission where ObjectId='2F58249F-8748-4FE1-B077-5543E86DD3BD' and PermissionId='3A3DA2AA-BC5A-4A31-AC13-CF534309E974')
Insert Into SM_AssignedPermission(ObjectId,PermissionId) Values
(N'2F58249F-8748-4FE1-B077-5543E86DD3BD',N'3A3DA2AA-BC5A-4A31-AC13-CF534309E974'
)

go

--基础资源库菜单
if not Exists(select * from SM_Resources where ResourceId='1DD0AA0A-74B3-48C4-B9B5-A89E165F7224')
Insert Into SM_Resources(ResourceId,ResourceCode,ParentResource,GroupId,ResourceName) Values
(N'1DD0AA0A-74B3-48C4-B9B5-A89E165F7224',N'ProcessCard05'
,N'EB92CDA4-2098-4A8D-90F1-A0C9A151180B',N'9D96FD30-DBC6-4CA7-B2A1-6737FCA27A5E'
,N'')

go

if not Exists(select * from SM_Menus where ResourceId='1DD0AA0A-74B3-48C4-B9B5-A89E165F7224')
Insert Into SM_Menus(ResourceId,MenuName,MenuUrl,TargetName,AccessParas,IsItem,Area,DisplaySeq,IsSpecial) Values
(N'1DD0AA0A-74B3-48C4-B9B5-A89E165F7224',N'基础资源库'
,N'javascript:OpenPage(''Process/Assist/BaseResourceFrame.aspx'',''{0}'');',N''
,N'',1
,N'',5
,0)

go

if not Exists(select * from SM_ResourceDic where DicId='6D13EB89-4101-4F47-80AD-DF65E5461FE5')
Insert Into SM_ResourceDic(DicId,ResourceId,ResourceDesc,LanguageId) Values
(N'6D13EB89-4101-4F47-80AD-DF65E5461FE5',N'1DD0AA0A-74B3-48C4-B9B5-A89E165F7224'
,N'基础资源库',-1
)
go
if not Exists(select * from SM_ResourceDic where DicId='D7E08FDC-248A-4120-AF6E-FA9ABC6A4826')
Insert Into SM_ResourceDic(DicId,ResourceId,ResourceDesc,LanguageId) Values
(N'D7E08FDC-248A-4120-AF6E-FA9ABC6A4826',N'1DD0AA0A-74B3-48C4-B9B5-A89E165F7224'
,N'基础资源库',0
)
go
if not Exists(select * from SM_ResourceDic where DicId='A41D0459-80B7-4026-9E5A-ABC110DC94CF')
Insert Into SM_ResourceDic(DicId,ResourceId,ResourceDesc,LanguageId) Values
(N'A41D0459-80B7-4026-9E5A-ABC110DC94CF',N'1DD0AA0A-74B3-48C4-B9B5-A89E165F7224'
,N'基础资源库',1
)
go
if not Exists(select * from SM_ResourceDic where DicId='E2769592-C00E-45B5-A1BA-FA68ABCD4F34')
Insert Into SM_ResourceDic(DicId,ResourceId,ResourceDesc,LanguageId) Values
(N'E2769592-C00E-45B5-A1BA-FA68ABCD4F34',N'1DD0AA0A-74B3-48C4-B9B5-A89E165F7224'
,N'基础资源库',2
)

go

if not Exists(select * from SM_Permissions where PermissionID='0D6AD61B-A365-42ED-B0C8-9615D4250E4B')
Insert Into SM_Permissions(PermissionID,OperateId,ResourceId) Values
(N'0D6AD61B-A365-42ED-B0C8-9615D4250E4B',N'91C7B54E-646D-4509-B354-09D882893414'
,N'1DD0AA0A-74B3-48C4-B9B5-A89E165F7224')

go

if not Exists(select * from SM_AssignedPermission where ObjectId='2F58249F-8748-4FE1-B077-5543E86DD3BD' 
and PermissionId='0D6AD61B-A365-42ED-B0C8-9615D4250E4B')
Insert Into SM_AssignedPermission(ObjectId,PermissionId) Values
(N'2F58249F-8748-4FE1-B077-5543E86DD3BD',N'0D6AD61B-A365-42ED-B0C8-9615D4250E4B'
)

go

if not Exists(select * from SM_Resources where ResourceId='2202FE40-A2A0-4668-894B-13576CBE6A9D')
insert into SM_Resources(ResourceId,ResourceCode,ParentResource,GroupId,ResourceName)
values('2202FE40-A2A0-4668-894B-13576CBE6A9D','工艺文件夹',null,'PCARDFOLDER','工艺文件夹')

go

IF NOT EXISTS (  
 SELECT 1 FROM SYSOBJECTS T1  
  INNER JOIN SYSCOLUMNS T2 ON T1.ID=T2.ID  
 WHERE T1.NAME='Mat_MaterialColItem' AND T2.NAME='Seq'  
 ) 
alter table Mat_MaterialColItem add Seq int
GO

/****** Object:  Table [dbo].[CardManager]    Script Date: 10/12/2013 14:33:48 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[CardManager]') 
and OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [dbo].[CardManager]
CREATE TABLE [dbo].[CardManager](
	[ProcessModuleId] [uniqueidentifier] NOT NULL,
	[BusinessId] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Type] [smallint] NOT NULL,
	[ParentNode] [int] NOT NULL,
	[CurrentNode] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_CardManager] PRIMARY KEY CLUSTERED 
(
	[ProcessModuleId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

/****** Object:  Table [dbo].[MaterialCardRelation]    Script Date: 10/12/2013 14:36:02 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[MaterialCardRelation]') 
and OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [dbo].[MaterialCardRelation]
CREATE TABLE [dbo].[MaterialCardRelation](
	[MaterialCardRelationId] [uniqueidentifier] NOT NULL,
	[MaterialId] [uniqueidentifier] NOT NULL,
	[ProcessCardId] [uniqueidentifier] NOT NULL,
	[CardSort] [int] NULL,
	[FolderId] [char](36) NULL,
	[Type] [int] NULL,
 CONSTRAINT [PK_MaterialCardRelation] PRIMARY KEY CLUSTERED 
(
	[MaterialCardRelationId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[MaterialCardRelation] ADD  CONSTRAINT [DF_MaterialCardRelation_MaterialCardId]  DEFAULT (newid()) FOR [MaterialCardRelationId]
GO

/****** Object:  Table [dbo].[MaterialQuota]    Script Date: 10/12/2013 14:37:06 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[MaterialQuota]') 
and OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [dbo].[MaterialQuota]
CREATE TABLE [dbo].[MaterialQuota](
	[Id] [uniqueidentifier] NOT NULL,
	[Code] [nvarchar](100) NULL,
	[Property] [nvarchar](200) NULL,
	[Proportion] [numeric](16, 8) NULL,
	[WeightUnit] [nvarchar](10) NULL,
	[LengthUnit] [nvarchar](10) NULL,
	[ValidDigits] [int] NULL,
	[Formula] [nvarchar](300) NULL,
	[Quota] [numeric](16, 8) NULL
) ON [PRIMARY]

GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'编码' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'MaterialQuota', @level2type=N'COLUMN',@level2name=N'Code'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'材料特性' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'MaterialQuota', @level2type=N'COLUMN',@level2name=N'Property'
GO

/****** Object:  Table [dbo].[PlanningCardRelation]    Script Date: 10/12/2013 14:38:01 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[PlanningCardRelation]') 
and OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [dbo].[PlanningCardRelation]
CREATE TABLE [dbo].[PlanningCardRelation](
	[PlanningCardRelationId] [uniqueidentifier] NOT NULL,
	[ProcessPlanningId] [uniqueidentifier] NOT NULL,
	[ProcessCardId] [uniqueidentifier] NOT NULL,
	[CardSort] [int] NULL,
 CONSTRAINT [PK_PlanningCardRelation] PRIMARY KEY CLUSTERED 
(
	[PlanningCardRelationId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[PlanningCardRelation] ADD  CONSTRAINT [DF_PlanningCardRelation_PlanningCardId]  DEFAULT (newid()) FOR [PlanningCardRelationId]
GO

/****** Object:  Table [dbo].[ProcessCardModule]    Script Date: 10/12/2013 14:39:08 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[ProcessCardModule]') 
and OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [dbo].[ProcessCardModule]
CREATE TABLE [dbo].[ProcessCardModule](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[CardModuleXML] [xml] NOT NULL,
	[FixedMapValues] [nvarchar](500) NULL,
	[DetailMapValues] [nvarchar](500) NULL,
	[TitleMapValues] [nvarchar](500) NULL,
	[CreateTime] [datetime] NULL,
	[CreateBy] [nvarchar](50) NULL,
	[UpdateTime] [datetime] NULL,
	[IsDelete] [smallint] NULL,
	[IsCheckout] [bit] NULL,
 CONSTRAINT [PK_ProcessCardModule] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

/****** Object:  Table [dbo].[TypicalProcess]    Script Date: 10/12/2013 14:42:15 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[TypicalProcess]') 
and OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [dbo].[TypicalProcess]
CREATE TABLE [dbo].[TypicalProcess](
	[TypicalProcessId] [uniqueidentifier] NOT NULL,
	[BussinessId] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Type] [smallint] NOT NULL,
	[ParentNode] [int] NOT NULL,
	[CurrentNode] [int] IDENTITY(1,1) NOT NULL,
	[Sort] [int] NULL
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[TypicalProcess] ADD  CONSTRAINT [DF_TypicalProcess_TypicalProcessId]  DEFAULT (newid()) FOR [TypicalProcessId]
GO

ALTER TABLE [dbo].[TypicalProcess] ADD  CONSTRAINT [DF_TypicalProcess_Sort]  DEFAULT ((1)) FOR [Sort]
GO

/****** Object:  Table [dbo].[ProcessCard]    Script Date: 10/12/2013 14:42:49 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[ProcessCard]') 
and OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [dbo].[ProcessCard]
CREATE TABLE [dbo].[ProcessCard](
	[Id] [uniqueidentifier] NOT NULL,
	[CardModuleId] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[CardXml] [xml] NOT NULL,
	[CreateTime] [datetime] NOT NULL,
	[CreateBy] [nvarchar](50) NULL,
	[UpdateTime] [datetime] NULL,
	[IsDelete] [smallint] NOT NULL,
	[IsCheckOut] [bit] NOT NULL,
	[Type] [int] NULL,
 CONSTRAINT [PK_ProcessCard] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[ProcessCard] ADD  CONSTRAINT [DF_ProcessCard_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO

ALTER TABLE [dbo].[ProcessCard] ADD  CONSTRAINT [DF_ProcessCard_UpdateTime]  DEFAULT (getdate()) FOR [UpdateTime]
GO

ALTER TABLE [dbo].[ProcessCard] ADD  CONSTRAINT [DF_ProcessCard_IsDelete]  DEFAULT ((0)) FOR [IsDelete]
GO

ALTER TABLE [dbo].[ProcessCard] ADD  CONSTRAINT [DF_ProcessCard_IsCheckOut]  DEFAULT ((0)) FOR [IsCheckOut]
GO

/****** Object:  Table [dbo].[ProcessPlanning]    Script Date: 10/12/2013 14:39:51 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[ProcessPlanning]') 
and OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [dbo].[ProcessPlanning]
CREATE TABLE [dbo].[ProcessPlanning](
	[ProcessPlanningId] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Sort] [int] IDENTITY(1,1) NOT NULL,
	[CreateTime] [datetime] NULL,
	[CreateBy] [nvarchar](50) NULL,
	[UpdateTime] [datetime] NULL,
	[IsDelete] [smallint] NULL,
	[IsCheckOut] [bit] NULL,
 CONSTRAINT [PK_ProcessPlanning] PRIMARY KEY CLUSTERED 
(
	[ProcessPlanningId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[ProcessPlanning] ADD  CONSTRAINT [DF_ProcessPlanning_ProcessPlanningId]  DEFAULT (newid()) FOR [ProcessPlanningId]
GO

ALTER TABLE [dbo].[ProcessPlanning] ADD  CONSTRAINT [DF_ProcessPlanning_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO

ALTER TABLE [dbo].[ProcessPlanning] ADD  CONSTRAINT [DF_ProcessPlanning_IsDelete]  DEFAULT ((0)) FOR [IsDelete]
GO

ALTER TABLE [dbo].[ProcessPlanning] ADD  CONSTRAINT [DF_ProcessPlanning_IsCheckOut]  DEFAULT ((0)) FOR [IsCheckOut]
GO

/****** Object:  Table [dbo].[ProcessPlanningModule]    Script Date: 10/12/2013 14:40:23 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[ProcessPlanningModule]') 
and OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [dbo].[ProcessPlanningModule]
CREATE TABLE [dbo].[ProcessPlanningModule](
	[ProcessPlanningModuleId] [uniqueidentifier] NOT NULL,
	[BussinessId] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Type] [smallint] NOT NULL,
	[ParentNode] [int] NOT NULL,
	[CurrentNode] [int] IDENTITY(1,1) NOT NULL,
	[Sort] [int] NULL
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[ProcessPlanningModule] ADD  CONSTRAINT [DF_ProcessPlanningModule_ProcessPlaningModuleId]  DEFAULT (newid()) FOR [ProcessPlanningModuleId]
GO

ALTER TABLE [dbo].[ProcessPlanningModule] ADD  CONSTRAINT [DF_ProcessPlanningModule_Sort]  DEFAULT ((1)) FOR [Sort]
GO

/****** Object:  Table [dbo].[PP_PCFolderRelation]    Script Date: 08/06/2013 14:03:30 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO
    
if exists (select * from sysobjects where id = object_id(N'[dbo].[PP_PCFolderRelation]') 
and OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [dbo].[PP_PCFolderRelation]
CREATE TABLE [dbo].[PP_PCFolderRelation](
	[RelationId] [char] (36) NOT NULL,
	[RelationType] [int] NULL,
	[ParentId] [char] (36) NULL,
	[ChildId] [char] (46) NULL,
 CONSTRAINT [PK_PP_PCFolderRelation] PRIMARY KEY NONCLUSTERED 
(
	[RelationId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

/****** Object:  Table [dbo].[PP_ProcessCard]    Script Date: 08/06/2013 14:10:50 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[PP_ProcessCard]') 
and OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [dbo].[PP_ProcessCard]    
CREATE TABLE [dbo].[PP_ProcessCard](
	[Id] [char](36) NOT NULL,
	[CardModuleId] [char](36) NOT NULL,
	[Name] [nvarchar] (300) NOT NULL,
 CONSTRAINT [PK_PP_ProcessCard] PRIMARY KEY NONCLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

/****** Object:  Table [dbo].[PP_PCVersion]    Script Date: 08/06/2013 16:27:02 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[PP_PCVersion]') 
and OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [dbo].[PP_PCVersion]
CREATE TABLE [dbo].[PP_PCVersion](
	[VerId] [char](36) NOT NULL,
	[BaseId] [char](36) NULL,
	[VerCode] [nvarchar](40) NULL,
	[VerName] [nvarchar](300) NULL,
	[Code] [nvarchar](40) NULL,
	[Name] [nvarchar](300) NULL,
	[CategoryId] [char](36) NULL,
	[MajorVer] [int] NULL,
	[MinorVer] [int] NULL,
	[State] [int] NULL,
	[Creator] [char](36) NULL,
	[CreateDate] [varchar](19) NULL,
	[Updater] [varchar](36) NULL,
	[UpdateDate] [varchar](19) NULL,
	[CheckOutPerson] [varchar](36) NULL,
	[CheckOutDate] [varchar](19) NULL,
	[ArchiveDate] [varchar](19) NULL,
	[ReleaseDate] [varchar](19) NULL,
	[Remark] [nvarchar](2000) NULL,
	[IsChange] [bit] NULL,
	[IsEffective] [bit] NULL,
	[IsInFlow] [bit] NULL,
	[IsShow] [int] NULL,
	[FolderId] [char](36) NOT NULL,
	[ObjectStatePath] [varchar](50) NULL,
	[ObjectIconPath] [varchar](50) NULL,
 CONSTRAINT [PK_PP_PCVersion] PRIMARY KEY NONCLUSTERED 
(
	[VerId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

/****** Object:  UserDefinedFunction [dbo].[GetChildCount]   Script Date: 08/07/2013 10:53:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('GetChildCount') IS NOT NULL
  DROP FUNCTION [GetChildCount]
GO

/****** Object:  UserDefinedFunction [dbo].[GetChildCount]    Script Date: 11/28/2013 12:17:05 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create                    
FUNCTION [dbo].[GetChildCount] (@ParentVerId varchar(40), @LayerNo varchar(100), @IsCollect bit, @SearchLayer int)  
RETURNS @t_result 
table (OrderNo int IDENTITY(1, 1), RelationId char(36), ParentVerId char(36), VerId char(36), ChildCount numeric(16,8), LayerNo varchar(100))
as
BEGIN
	DECLARE @t_temp TABLE(RelationId char(36), ParentVerId char(36), VerId char(36), ChildCount numeric(16,8), LayerNo varchar(100), Layer int)
	DECLARE @Layer int, --记录层数
		@Length int --记录位数
	DECLARE @count numeric(16,8) --最顶层父物料用量
	DECLARE @childCount numeric(16,8) --子物料用量
	
	IF (@LayerNo <> '')--如果父物料没有层次号，则不返回父物料
		INSERT INTO @t_result (RelationId, ParentVerId, VerId, ChildCount, LayerNo) VALUES ('', '', @ParentVerId, 0, @LayerNo)

	SET @Layer = 0
	SELECT @Length = len(cast(childcount AS varchar(10))) FROM mat_materialversion t1 with(nolock) WHERE t1.materialverid = @ParentVerId --计算当前数量长度
	
	Select @count = 1 --ChildCount from mat_materialversion where MaterialVerId= @ParentVerId
			
	INSERT INTO @t_temp
	SELECT 
	RelationId,
	ParentVerId,
	ChildVerId,
	ChildCount,
	space(@Length - len(DisplaySeq)) + 
	CASE @LayerNo
	WHEN '' THEN cast(DisplaySeq AS varchar(10))
	WHEN '0' THEN cast(DisplaySeq AS varchar(10))
	ELSE @LayerNo + '.' + cast(DisplaySeq AS varchar(10))
	END, --当位数不足时向左补空白，用于最后排序时修正字符串排序的缺陷。如：1.1.1与11.1.1会并列的缺陷
	1
	FROM MAT_MaterialRelation t1 with(nolock)
	WHERE t1.ParentVerId = @ParentVerId

	WHILE (@@ROWCOUNT > 0)
	BEGIN
		SET @Layer = @Layer + 1

		IF (@Layer > 20)--预防BOM中存在循环结构，当层数超过此数时，就认为是死循环，结束搜索
		RETURN

		IF (@Layer < @SearchLayer OR @SearchLayer = 0)
		BEGIN		
			Select @childCount = t2.ChildCount from MAT_MaterialRelation t1 with(nolock)
			INNER JOIN @t_temp t2 ON t2.Layer = @Layer AND t1.ParentVerId = t2.VerId	
			
			INSERT INTO @t_temp
			SELECT 	t1.RelationId,
				t1.ParentVerId,
				t1.ChildVerId,				
				t1.ChildCount * @childCount  as ChildCount,
				t2.LayerNo + '.' + 
				(SELECT space(len(cast(t3.childcount AS varchar(10))) - len(t1.DisplaySeq)) FROM MAT_Materialversion t3 with(nolock) WHERE t3.materialVerId = t2.VerId)
				 + cast(t1.DisplaySeq AS varchar(10)),
				@Layer + 1
			FROM MAT_MaterialRelation t1 with(nolock)
			INNER JOIN @t_temp t2 ON t2.Layer = @Layer AND t1.ParentVerId = t2.VerId		
		END		
	END

	--如果是汇总操作，则只显示最前的记录
	IF (@IsCollect = 1)
	BEGIN
		INSERT INTO @t_result (RelationId, ParentVerId, VerId, ChildCount, LayerNo)
		SELECT RelationId, ParentVerId, VerId, @count * ChildCount ChildCount, replace(LayerNo, ' ', '')
		FROM @t_temp t1
		WHERE t1.LayerNo = (SELECT MIN(t2.LayerNo) FROM @t_temp t2 WHERE t1.VerId = t2.VerId)
		ORDER BY LayerNo
	END
	ELSE
		INSERT INTO @t_result (RelationId, ParentVerId, VerId, ChildCount, LayerNo)
		SELECT RelationId, ParentVerId, VerId, @count * ChildCount ChildCount, replace(LayerNo, ' ', '')
		FROM @t_temp
		ORDER BY LayerNo
RETURN

END


GO


IF NOT EXISTS (  
 SELECT 1 FROM SYSOBJECTS T1  
  INNER JOIN SYSCOLUMNS T2 ON T1.ID=T2.ID  
 WHERE T1.NAME='PS_BusinessCategory' AND T2.NAME='MeterWeight'  
 ) 
 alter table PS_BusinessCategory add MeterWeight numeric(9,3)
 GO

if exists(select 1 from sysobjects where id=object_id('[dbo].[GetParentPCFolder]') 
	and objectproperty(id,'IsInlineFunction')=0)
drop function [dbo].[GetParentPCFolder]
GO

/****** Object:  UserDefinedFunction [dbo].[GetParentPCFolder]    Script Date: 08/07/2013 10:53:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

Create Function [dbo].[GetParentPCFolder](@FolderId varchar(40))    
returns @t table (ParentId varchar(40))        
/*    
功能说明：获取当前资源的所有上层文件夹    
创建人：jason.tang  
创建时间：2013-08-07    
*/    
as        
begin     

declare @ParentId varchar(40)       
  
declare @tempResourceId varchar(36)    
select @tempResourceId= FolderId From PP_PCFolder where FolderId=@FolderId    
    
    if @tempResourceId is null    
 begin  
  select top 1 @FolderId= ParentId from PP_PCFolderRelation where ChildId=@FolderId and RelationType=1    
  insert into @t values(@FolderId)    
 end  
      
select @ParentId=fol.ParentFolder from PP_PCFolder fol        
 where fol.FolderId=@FolderId    
      
While @ParentId >'' and  @@ROWCOUNT>0    
begin        
insert into @t values(@ParentId)    
    
select @ParentId=fol.ParentFolder from PP_PCFolder fol        
where fol.FolderId=@ParentId  and fol.ParentFolder not in (select ParentId From @t)      
      
end        
    
return    
end    

GO

IF EXISTS (SELECT * FROM sys.views WHERE object_id = object_id('[dbo].[v_Doc_CallBackObject]'))
drop view [dbo].[v_Doc_CallBackObject]
GO

/****** Object:  View [dbo].[v_Doc_CallBackObject]    Script Date: 11/15/2013 15:09:17 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create view [dbo].[v_Doc_CallBackObject]                          
as                          
/*                    
 功能：显示回收对象                          
 创建人：陈海明                          
 创建时间：2007-07-09   
 修改：贤 2010-08-18    
 修改：高放 2012-08-16                  
*/             
                
select a.KeyId,a.CallBackId,a.ObjectId,a.ObjectOption,b.FileExtension as Icon, a.Explain,a.ObjectMode, b.FileName,              
        
cast(b.StateId as varchar(2)) as ObjectState,case len(isnull(b.CheckOutDate,'')) when 0 then 0 else 1 end CheckOutState,                 
--case a.ObjectOption when 0 then '文档' end as [ObjectType]  
SV.OptionName AS [ObjectType]  
,e.StateName,                
b.DocCode as [ObjectCode] ,b.DocName as [ObjectName],d.CategoryName ,SV.LanguageId              
from Doc_CallBackObject a                 
inner join Doc_DocumentVersion b on a.ObjectId=b.VerId                
inner join doc_docobject c on b.docid = c.docid                      
inner join ps_businesscategory d on c.CategoryId = d.CategoryId                 
inner join doc_documentstate e on e.StateId = b.StateId INNER JOIN Sys_ValueOption SV ON SV.TypeName='7' AND a.ObjectOption = CONVERT(int,SV.OptionCode)      
where a.ObjectOption=0        
    
union                 
select a.KeyId,a.CallBackId,a.ObjectId,a.ObjectOption,dbo.f_MAT_GetObjectIcon(a.ObjectId) as Icon,    a.Explain,a.ObjectMode,[FileName]=null,                
dbo.GetMatCycleState(a.ObjectId) as ObjectState,[CheckOutState]=0,                 
--case a.ObjectOption when 1 then '物料' end as [ObjectType]  
SV.OptionName AS [ObjectType]  
,e.StateName,                
b.Code as [ObjectCode],b.Name as [ObjectName],d.CategoryName ,SV.LanguageId                
from Doc_CallBackObject a                 
inner join MAT_MaterialVersion b on a.ObjectId=b.MaterialVerId                
inner join MAT_MaterialBase c on  b.BaseId=c.BaseId                      
inner join ps_businesscategory d on c.CategoryId=d.CategoryId                   
inner join doc_documentstate e on e.StateId = b.DesignCycle INNER JOIN Sys_ValueOption SV ON SV.TypeName='7' AND a.ObjectOption = CONVERT(int,SV.OptionCode)                
where a.ObjectOption=1    
            
union                
select a.KeyId,a.CallBackId,a.ObjectId,a.ObjectOption,[Icon]=null,  a.Explain,a.ObjectMode, [FileName]=null,                 
cast(b.State as varchar(2)) as ObjectState,[CheckOutState]=0,                 
--case a.ObjectOption when 5 then '业务表单' end as [ObjectType]  
SV.OptionName AS [ObjectType]  
,e.StateName,                
b.InstanceCode as [ObjectCode],b.InstanceName as [ObjectName],d.CategoryName ,SV.LanguageId               
from Doc_CallBackObject a                 
inner join PF_Instances b on a.ObjectId=b.VerId                
inner join PF_Templates c on b.TemplateId=c.TemplateId                        
inner join ps_businesscategory d on c.CategoryId=d.CategoryId                   
inner join doc_documentstate e on e.StateId = b.State 
INNER JOIN Sys_ValueOption SV ON SV.TypeName='7' AND a.ObjectOption = CONVERT(int,SV.OptionCode)                
where a.ObjectOption=5   

union                
select a.KeyId,a.CallBackId,a.ObjectId,a.ObjectOption,[Icon]=null,  a.Explain,a.ObjectMode, [FileName]=null,                 
cast(b.State as varchar(2)) as ObjectState,[CheckOutState]=0,                 
--case a.ObjectOption when 30 then '工艺文件' end as [ObjectType]  
SV.OptionName AS [ObjectType]  
,e.StateName,                
b.Code as [ObjectCode],b.Name as [ObjectName],d.CategoryName ,SV.LanguageId               
from Doc_CallBackObject a                 
inner join PP_PCVersion b on a.ObjectId=b.VerId                
--inner join PF_Templates c on b.TemplateId=c.TemplateId                        
inner join ps_businesscategory d on b.CategoryId=d.CategoryId                   
inner join doc_documentstate e on e.StateId = b.State 
INNER JOIN Sys_ValueOption SV ON SV.TypeName='7' AND sv.OptionCode='36'                
where a.ObjectOption=30  

union                
select a.KeyId,a.CallBackId,a.ObjectId,a.ObjectOption, b.ObjectIconPath as [ObjectIconPath],  a.Explain,a.ObjectMode, [FileName]=null,                 
cast(b.Status as varchar(2)) as ObjectState,[CheckOutState]=0,                 
--case a.ObjectOption when 5 then '业务表单' end as [ObjectType]  
SV.OptionName AS [ObjectType]  
,SV1.OptionName as [StateName],                
c.GroupId as [ObjectCode],d.Code+'('+d.Name+')' as [ObjectName],e.CategoryName ,SV.LanguageId               
from Doc_CallBackObject a   
INNER JOIN  dbo.PP_PBOMVer b with(nolock) ON  (b.VerId = a.ObjectId)
INNER JOIN  dbo.PP_PBOM c with(nolock) ON b.PbomId=c.PbomId   and c.CurrentVer=b.Ver
left join MAT_MaterialVersion d on c.ObjectId = d.BaseId and d.IsEffect = 1               
left JOIN PS_BusinessCategory e ON e.CategoryId = c.CategoryId         
INNER JOIN Sys_ValueOption SV ON SV.TypeName='7' AND a.ObjectOption = CONVERT(int,SV.OptionCode)
left join Sys_ValueOption SV1 on SV1.OptionCode = cast(b.Status as nvarchar(2)) and SV1.TypeName = '142' and sv.LanguageId=SV1.LanguageId                           
where a.ObjectOption=11
  
  
  
GO


IF EXISTS (SELECT * FROM sys.views WHERE object_id = object_id('[dbo].[v_PP_PCVersion]'))
drop view [dbo].[v_PP_PCVersion]
GO

/****** Object:  View [dbo].[v_PP_PCVersion]    Script Date: 08/07/2013 09:35:36 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

--功能：    工艺文件视图[v_PP_PCVersion]
--编写人：	jason.tang
--编写时间:	2013-08-06
create VIEW [dbo].[v_PP_PCVersion]
AS
SELECT t1.VerId, t1.CreateDate, t1.BaseId, t1.State, t1.CategoryId, t1.CheckOutPerson, 
      t1.Code, t1.Name, 
      (select UserName from SM_Users where UserId = t1.CheckOutPerson) AS CheckOutPersonName, 
      t1.CheckOutDate, t2.UserName AS Creator, t1.Remark, --t3.TemplateName, 
      t1.VerName, t1.VerCode,
      (select UserName from SM_Users where UserId = t1.Updater) AS Updater, 
      t1.UpdateDate, t1.ObjectIconPath, t1.ObjectStatePath, t1.IsInFlow,
      t1.FolderId, 
      case when (select top 1 RelationType from PP_PCFolderRelation where ChildId = t1.BaseId) IS null or 
      (select top 1 RelationType from PP_PCFolderRelation where ChildId = t1.BaseId) = '' then 1 
      else 
      (select top 1 RelationType from PP_PCFolderRelation where ChildId = t1.BaseId) end AS RelationType, 
      t7.CategoryName,t1.IsShow,t1.IsEffective
FROM dbo.PP_PCVersion t1 INNER JOIN
      dbo.SM_Users t2 ON t1.Creator = t2.UserId INNER JOIN
      --dbo.PF_Templates t3 ON t1.TemplateId = t3.TemplateId LEFT OUTER JOIN
      --dbo.SM_Users t4 ON t1.CheckOutPerson = t4.UserId LEFT OUTER JOIN
      --dbo.SM_Users t5 ON t1.Updater = t5.UserId RIGHT JOIN
      --dbo.PP_PCFolderRelation t6 ON t1.BaseId = t6.ChildId inner join
      dbo.PS_BusinessCategory t7 on t1.CategoryId = t7.CategoryId
GO

IF EXISTS (SELECT * FROM sys.views WHERE object_id = object_id('[dbo].[v_PP_PCReleaseBrowse]'))
drop view [dbo].[v_PP_PCReleaseBrowse]
/****** Object:  View [dbo].[v_PP_PCReleaseBrowse]    Script Date: 08/07/2013 09:39:13 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

--功能：		工艺文件(发布区)视图[v_PP_PCReleaseBrowse]
--编写人：       jason.tang
--编写时间：     2013-08-06
create               VIEW [dbo].[v_PP_PCReleaseBrowse]
AS
SELECT t1.VerId, t1.CreateDate, t1.BaseId, t1.State, t1.CategoryId, t1.CheckOutPerson, 
      t1.Code, t1.Name, 
      (select UserName from SM_Users where UserId = t1.CheckOutPerson) AS CheckOutPersonName, 
      t1.CheckOutDate, t2.UserName AS Creator, t1.Remark, --t3.TemplateName, 
      t1.VerName, 
      (select UserName from SM_Users where UserId = t1.Updater) AS Updater,
      t1.UpdateDate, t1.ObjectIconPath, t1.ObjectStatePath, t1.IsInFlow,
      t6.ParentId AS FolderId, t6.RelationType,t7.CategoryName,t2.UserId
FROM dbo.PP_PCVersion t1 INNER JOIN
      dbo.SM_Users t2 ON t1.Creator = t2.UserId INNER JOIN
      --dbo.PF_Templates t3 ON t1.TemplateId = t3.TemplateId LEFT OUTER JOIN
      --dbo.SM_Users t4 ON t1.CheckOutPerson = t4.UserId LEFT OUTER JOIN
      --dbo.SM_Users t5 ON t1.Updater = t5.UserId right JOIN
      dbo.PP_PCFolderRelation t6 ON t1.BaseId = t6.ChildId inner join
      dbo.PS_BusinessCategory t7 on t1.CategoryId = t7.CategoryId
      
      --inner join PF_Folder m on m.FolderId=t6.ParentId 
--CAPP Canceled                      
--inner join   
--(   
--SELECT b.UserId, sa.ResourceId FROM                   
--( SELECT ass.ObjectId AS ParticipantId, per.ResourceId FROM SM_Permissions per                  
-- INNER JOIN SM_AssignedPermission ass ON per.PermissionId = ass.PermissionId            
-- INNER JOIN SM_Operaties op ON per.OperateId = op.OperateId                  
-- WHERE op.GroupId = '6FA2BE86-5400-4F94-955E-1036CBEA0362'                   
--  AND op.OperateCode = 'Browse'                     
--) sa               
--INNER JOIN                   
-- v_Participant_User b ON sa.ParticipantId = b.ParticipantId group by b.UserId, sa.ResourceId )      
--as  pm on t1.VerId = pm.ResourceId     
where t1.State=4



GO

/****** Object:  Table [dbo].[PP_PCFolder]    Script Date: 10/12/2013 15:28:29 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[PP_PCFolder]') 
and OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [dbo].[PP_PCFolder]
CREATE TABLE [dbo].[PP_PCFolder](
	[FolderId] [char](36) NOT NULL,
	[ParentFolder] [varchar](36) NULL,
	[FolderName] [nvarchar](300) NOT NULL,
	[FolderCode] [nvarchar](300) NULL,
	[FolderPath] [nvarchar](300) NULL,
	[Creator] [char](36) NOT NULL,
	[CreateDate] [char](19) NOT NULL,
	[Updater] [varchar](36) NULL,
	[UpdateDate] [varchar](19) NULL,
	[Remark] [nvarchar](2000) NULL,
	[DisplaySeq] [int] NULL,
	[ChildCount] [int] NULL,
	[FolderType] [int] NOT NULL,
 CONSTRAINT [PK_PP_PCFOLDER] PRIMARY KEY CLUSTERED 
(
	[FolderId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

/****** Object:  UserDefinedFunction [dbo].[GetUserPermission]    Script Date: 08/07/2013 10:32:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--获取用户对资源的权限        
ALTER   Function [dbo].[GetUserPermission](@UserId varchar(36),@ResourceId varchar(36),@Now datetime)        
returns @t table(OperateCode varchar(50))        
as        
begin        
  
declare @t2 table(OperateCode varchar(50))        
--获取资源本身的权限        
insert into @t2        
 Select OperateCode From SM_Operaties where OperateId in        
 (Select OperateId From SM_AssignedPermission ap        
 inner join SM_Permissions p on ap.PermissionId=p.PermissionId and p.ResourceId=@ResourceId        
 inner join CreateParticipantByUserId(@UserId) pu on ap.ObjectId=pu.ParticipantId      
    
 where not exists(select 1 from SM_ResourceAssign where ResourceId=p.ResourceId and ap.ObjectId=ParticipantId           
   and ExpiredDate>'' and ExpiredDate<dateadd(d,-1,@Now)))        
        
    
declare @GroupId varchar(36)    
select @GroupId=GroupId from SM_Resources where ResourceId=@ResourceId    
    
--获取资源继承的权限        
    
if(@GroupId='97B14923-C081-4EC2-8E23-75B792B6AD43')    
begin    
    
--获取文档库文件夹的权限        
 insert into @t2        
 Select OperateCode From SM_Operaties where OperateId in        
 (Select OperateId From SM_AssignedPermission ap        
 inner join SM_Permissions p on ap.PermissionId=p.PermissionId         
 inner join GetParentDocFolder(@ResourceId) po on po.ParentId=p.ResourceId    
 inner join CreateParticipantByUserId(@UserId) pu on ap.ObjectId=pu.ParticipantId      
 where not exists(select 1 from SM_ResourceAssign where ResourceId=p.ResourceId and ap.ObjectId=ParticipantId           
   and ExpiredDate>'' and ExpiredDate<dateadd(d,-1,@Now)))      
end    
else if(@GroupId='CLIENTFORMGROUP')    
begin    
    
--获取表单文件夹的权限        
 insert into @t2        
 Select OperateCode From SM_Operaties where OperateId in        
 (Select OperateId From SM_AssignedPermission ap        
 inner join SM_Permissions p on ap.PermissionId=p.PermissionId         
 inner join GetParentCFFolder(@ResourceId) po on po.ParentId=p.ResourceId    
 inner join CreateParticipantByUserId(@UserId) pu on ap.ObjectId=pu.ParticipantId      
 where not exists(select 1 from SM_ResourceAssign where ResourceId=p.ResourceId and ap.ObjectId=ParticipantId           
   and ExpiredDate>'' and ExpiredDate<dateadd(d,-1,@Now)))      
end    
else if(@GroupId='PCARDGROUP')    
begin    
    
--获取工艺文件的权限        
 insert into @t2        
 Select OperateCode From SM_Operaties where OperateId in        
 (Select OperateId From SM_AssignedPermission ap        
 inner join SM_Permissions p on ap.PermissionId=p.PermissionId         
 inner join GetParentPCFolder(@ResourceId) po on po.ParentId=p.ResourceId    
 inner join CreateParticipantByUserId(@UserId) pu on ap.ObjectId=pu.ParticipantId      
 where not exists(select 1 from SM_ResourceAssign where ResourceId=p.ResourceId and ap.ObjectId=ParticipantId           
   and ExpiredDate>'' and ExpiredDate<dateadd(d,-1,@Now)))      
end   
else if(@GroupId='BC29E871-2951-4531-9B7C-919E249376CD')    
begin    
    
--获取物料业务类型的权限        
 insert into @t2        
 Select OperateCode From SM_Operaties where OperateId in        
 (Select OperateId From SM_AssignedPermission ap        
 inner join SM_Permissions p on ap.PermissionId=p.PermissionId         
 inner join GetParentCategory(@ResourceId) po on po.ParentId=p.ResourceId    
 inner join CreateParticipantByUserId(@UserId) pu on ap.ObjectId=pu.ParticipantId      
 where not exists(select 1 from SM_ResourceAssign where ResourceId=p.ResourceId and ap.ObjectId=ParticipantId           
   and ExpiredDate>'' and ExpiredDate<dateadd(d,-1,@Now)))      
end  
else if(@GroupId='1BF89353-15B8-4265-8D5B-6A4C69ADB89A')    
begin    
    
--获取产品文件夹的权限        
 insert into @t2        
 Select OperateCode From SM_Operaties where OperateId in        
 (Select OperateId From SM_AssignedPermission ap        
 inner join SM_Permissions p on ap.PermissionId=p.PermissionId         
 inner join GetParentProductFolder(@ResourceId) po on po.ParentId=p.ResourceId    
 inner join CreateParticipantByUserId(@UserId) pu on ap.ObjectId=pu.ParticipantId      
 where not exists(select 1 from SM_ResourceAssign where ResourceId=p.ResourceId and ap.ObjectId=ParticipantId           
   and ExpiredDate>'' and ExpiredDate<dateadd(d,-1,@Now)))      
end  
else if(@GroupId='PROJECTFOLDER')    
begin    
    
--获取项目文件夹的权限        
 insert into @t2        
 Select OperateCode From SM_Operaties where OperateId in        
 (Select OperateId From SM_AssignedPermission ap        
 inner join SM_Permissions p on ap.PermissionId=p.PermissionId         
 inner join GetParentProjectFolder(@ResourceId) po on po.ParentId=p.ResourceId    
 inner join CreateParticipantByUserId(@UserId) pu on ap.ObjectId=pu.ParticipantId      
 where not exists(select 1 from SM_ResourceAssign where ResourceId=p.ResourceId and ap.ObjectId=ParticipantId           
   and ExpiredDate>'' and ExpiredDate<dateadd(d,-1,@Now)))      
end 
else if(@GroupId='PROBLEMFOLDER')                    
begin
--判断问题文件夹继承的权限
 insert into @t2            
 Select OperateCode From SM_Operaties where OperateId in        
 (Select OperateId From SM_AssignedPermission ap        
 inner join SM_Permissions p on ap.PermissionId=p.PermissionId         
 inner join GetParentProblemFolder(@ResourceId) po on po.ParentId=p.ResourceId    
 inner join CreateParticipantByUserId(@UserId) pu on ap.ObjectId=pu.ParticipantId      
 where not exists(select 1 from SM_ResourceAssign where ResourceId=p.ResourceId and ap.ObjectId=ParticipantId           
   and ExpiredDate>'' and ExpiredDate<dateadd(d,-1,@Now)))                         
                    
end 
else if(@GroupId='PBOMFOLDER')      --判断PBOM文件夹继承的权限                
begin      
--判断问题文件夹继承的权限
 insert into @t2            
 Select OperateCode From SM_Operaties where OperateId in        
 (Select OperateId From SM_AssignedPermission ap        
 inner join SM_Permissions p on ap.PermissionId=p.PermissionId         
 inner join GetParentPBOMFolder(@ResourceId) po on po.ParentId=p.ResourceId    
 inner join CreateParticipantByUserId(@UserId) pu on ap.ObjectId=pu.ParticipantId      
 where not exists(select 1 from SM_ResourceAssign where ResourceId=p.ResourceId and ap.ObjectId=ParticipantId           
   and ExpiredDate>'' and ExpiredDate<dateadd(d,-1,@Now)))                              
                      
end  


insert into @t        
select OperateCode from @t2 group by OperateCode        
        
return        
end    

GO

/****** Object:  Table [dbo].[PP_ProcessCardMark]    Script Date: 08/12/2013 16:08:54 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[PP_ProcessCardMark]') 
and OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [dbo].[PP_ProcessCardMark]
CREATE TABLE [dbo].[PP_ProcessCardMark](
	[Id] [char](36) NOT NULL,
	[ProcessCardId] [char](36) NOT NULL,
	[MarkType] [int] NOT NULL,
	[Title] [nvarchar](300) NULL,
	[M_Width] [int] NOT NULL,
	[M_Height] [int] NOT NULL,
	[MarkContent] [nvarchar](2000) NULL,
	[MarkLeft] [int] NOT NULL,
	[MarkTop] [int] NOT NULL,
	[MarkWidth] [int] NULL,
	[MarkHeight] [int] NULL,
	[Creator] [char](36) NOT NULL,
	[CreateDate] [datetime] NOT NULL,
 CONSTRAINT [PK_PP_ProcessCardMark] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'工艺卡片ID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'PP_ProcessCardMark', @level2type=N'COLUMN',@level2name=N'ProcessCardId'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'标注类型(0-标注详情 1-文字标注 2-矩形标注 3-椭圆形标注)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'PP_ProcessCardMark', @level2type=N'COLUMN',@level2name=N'MarkType'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'详情标题' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'PP_ProcessCardMark', @level2type=N'COLUMN',@level2name=N'Title'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'详情内容' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'PP_ProcessCardMark', @level2type=N'COLUMN',@level2name=N'MarkContent'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'标注的左位置' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'PP_ProcessCardMark', @level2type=N'COLUMN',@level2name=N'MarkLeft'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'标注的上位置' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'PP_ProcessCardMark', @level2type=N'COLUMN',@level2name=N'MarkTop'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'创建人' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'PP_ProcessCardMark', @level2type=N'COLUMN',@level2name=N'Creator'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'创建时间' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'PP_ProcessCardMark', @level2type=N'COLUMN',@level2name=N'CreateDate'
GO

IF NOT EXISTS (  
 SELECT 1 FROM SYSOBJECTS T1  
  INNER JOIN SYSCOLUMNS T2 ON T1.ID=T2.ID  
 WHERE T1.NAME='MAT_MaterialVersion' AND T2.NAME='MeterWeight'  
 ) 
alter table dbo.MAT_MaterialVersion add MeterWeight numeric(9,3)

GO

/****** Object:  UserDefinedFunction [dbo].[TF_Doc_ReleaseObject]    Script Date: 08/13/2013 09:24:24 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER Function [dbo].[TF_Doc_ReleaseObject](@ReleaseId varchar(36),@LanguageId varchar(2))          
returns @t table          
(KeyId varchar(40),          
ReleaseId varchar(40),          
ObjectId varchar(40),          
ObjectOption int,          
Icon nvarchar(2000),          
Explain nvarchar(200),          
VerExplain nvarchar(200),   
MajorVer nvarchar(10),          
MajorIndex varchar(10),          
ObjectMode int,          
[FileName] nvarchar(256),          
VerName nvarchar(30),          
ObjectState varchar(2),          
CheckOutState int,          
ObjectType nvarchar(20),          
StateName nvarchar(8),          
ObjectCode nvarchar(50),          
ObjectName nvarchar(300),          
CategoryName nvarchar(300)          
)          
          
as                              
/*                        
 功能：获取发布对象                              
 创建人：林衍慎          
 创建时间：2009-04-21                         
*/                    
begin            
insert into @t                    
select a.KeyId,a.ReleaseId,a.ObjectId,a.ObjectOption,b.FileExtension as Icon, a.Explain,a.VerExplain,a.MajorVer,a.MajorIndex,a.ObjectMode,b.FileName,b.VerName + '.' + Convert(nvarchar, cp.CopyNo) as [VerName],                    
cast(b.StateId as varchar(2)) as ObjectState,case len(isnull(b.CheckOutDate,'')) when 0 then 0 else 1 end CheckOutState,                     
--case a.ObjectOption when 0 then '文档' end as [ObjectType],      
SV.OptionName AS [ObjectType],  
--e.StateName,   
SV1.OptionName AS StateName,                    
b.DocCode as [ObjectCode] ,b.DocName as [ObjectName],d.CategoryName                     
from Doc_ReleaseObject a                     
inner join Doc_DocumentVersion b on a.ObjectId=b.VerId         
inner join Doc_DocumentCopy cp on b.VerID = cp.VerID                 
inner join doc_docobject c on b.docid = c.docid                          
inner join ps_businesscategory d on c.CategoryId = d.CategoryId                     
--inner join doc_documentstate e on e.StateId = b.StateId       
INNER JOIN Sys_ValueOption SV ON SV.TypeName='7' AND SV.OptionCode = '0' AND SV.LanguageId=@LanguageId   
INNER JOIN Sys_ValueOption SV1 ON SV1.TypeName='101' AND b.StateId = cast(SV1.OptionCode as int) AND SV1.LanguageId=SV.LanguageId             
where ReleaseId=@ReleaseId and a.ObjectOption=0 and cp.Isactive =1          
--union                     
          
insert into @t                    
select a.KeyId,a.ReleaseId,a.ObjectId,a.ObjectOption,dbo.f_MAT_GetObjectIcon(a.ObjectId) as Icon,    a.Explain,a.VerExplain,a.MajorVer,a.MajorIndex,a.ObjectMode, [FileName]=null, b.VerCode as [VerName],                  
dbo.GetMatCycleState(a.ObjectId) as ObjectState,[CheckOutState]=0,                     
--case a.ObjectOption when 1 then '物料' end as [ObjectType],      
SV.OptionName AS [ObjectType],  
--e.StateName,   
SV1.OptionName AS StateName,                   
b.Code as [ObjectCode],b.Name as [ObjectName],d.CategoryName                     
from Doc_ReleaseObject a                     
inner join MAT_MaterialVersion b on a.ObjectId=b.MaterialVerId                    
inner join MAT_MaterialBase c on  b.BaseId=c.BaseId                          
inner join ps_businesscategory d on c.CategoryId=d.CategoryId                       
--inner join doc_documentstate e on e.StateId = b.DesignCycle       
INNER JOIN Sys_ValueOption SV ON SV.TypeName='7' AND SV.OptionCode = '1' AND SV.LanguageId=@LanguageId   
INNER JOIN Sys_ValueOption SV1 ON SV1.TypeName='101' AND b.DesignCycle = cast(SV1.OptionCode as int) AND SV1.LanguageId=SV.LanguageId                             
where ReleaseId=@ReleaseId  and a.ObjectOption=1          
--union                    
          
insert into @t           
select a.KeyId,a.ReleaseId,a.ObjectId,a.ObjectOption,[Icon]=null,  a.Explain,a.VerExplain,a.MajorVer,a.MajorIndex,a.ObjectMode, [FileName]=null, b.VerName as [VerName],                     
cast(b.State as varchar(2)) as ObjectState,[CheckOutState]=0,                     
--case a.ObjectOption when 5 then '业务表单' end as [ObjectType],      
SV.OptionName AS [ObjectType],  
--e.StateName,  
SV1.OptionName AS StateName,                    
b.InstanceCode as [ObjectCode],b.InstanceName as [ObjectName],d.CategoryName                    
from Doc_ReleaseObject a                     
inner join PF_Instances b on a.ObjectId=b.VerId                    
inner join PF_Templates c on b.TemplateId=c.TemplateId                            
inner join ps_businesscategory d on c.CategoryId=d.CategoryId                       
--inner join doc_documentstate e on e.StateId = b.State      
INNER JOIN Sys_ValueOption SV ON SV.TypeName='7' AND SV.OptionCode = '5' AND SV.LanguageId=@LanguageId   
INNER JOIN Sys_ValueOption SV1 ON SV1.TypeName='101' AND b.State = cast(SV1.OptionCode as int) AND SV1.LanguageId=SV.LanguageId                    
where ReleaseId=@ReleaseId  and a.ObjectOption=5    

--工艺文件
insert into @t  
select a.KeyId,a.ReleaseId,a.ObjectId,a.ObjectOption,[Icon]=null,  
a.Explain,a.VerExplain,a.MajorVer,a.MajorIndex,a.ObjectMode, [FileName]=null, 
b.VerName as [VerName],                     
cast(b.State as varchar(2)) as ObjectState,[CheckOutState]=0,                     
SV.OptionName AS [ObjectType],  
--e.StateName,  
SV1.OptionName AS StateName,                    
b.Code as [ObjectCode],b.Name as [ObjectName],d.CategoryName                    
from Doc_ReleaseObject a                     
inner join PP_PCVersion b on a.ObjectId=b.VerId                    
--inner join PF_Templates c on b.TemplateId=c.TemplateId                            
inner join ps_businesscategory d on b.CategoryId=d.CategoryId                       
--inner join doc_documentstate e on e.StateId = b.State      
INNER JOIN Sys_ValueOption SV ON SV.TypeName='7' AND SV.OptionCode = '36' 
AND SV.LanguageId=@LanguageId    
INNER JOIN Sys_ValueOption SV1 ON SV1.TypeName='101' AND 
b.State = cast(SV1.OptionCode as int) AND SV1.LanguageId=SV.LanguageId                    
where ReleaseId=@ReleaseId  and a.ObjectOption=30  

--PBOM
insert into @t                    
select a.KeyId,a.ReleaseId,a.ObjectId,a.ObjectOption,t1.ObjectIconPath as Icon,    
a.Explain,a.VerExplain,a.MajorVer,a.MajorIndex,a.ObjectMode, [FileName]=null, t1.VerCode as [VerName],                  
cast(t1.Status as varchar(2)) as ObjectState,[CheckOutState]=0,                     
--case a.ObjectOption when 1 then '物料' end as [ObjectType],      
SV.OptionName AS [ObjectType],  
--e.StateName,   
t8.OptionName AS StateName,                   
t2.GroupId as [ObjectCode],t3.Code+'('+t3.Name+')' as [ObjectName],t4.CategoryName                     
from Doc_ReleaseObject a                     
INNER JOIN  dbo.PP_PBOMVer t1 with(nolock) ON  (t1.VerId = a.ObjectId)
INNER JOIN  dbo.PP_PBOM t2 with(nolock) ON t1.PbomId=t2.PbomId   and t2.CurrentVer=t1.Ver
left join MAT_MaterialVersion t3 on t2.ObjectId = t3.BaseId and t3.IsEffect = 1               
left JOIN PS_BusinessCategory t4 ON t4.CategoryId = t2.CategoryId         
INNER JOIN Sys_ValueOption SV ON SV.TypeName='7' AND a.ObjectOption = CONVERT(int,SV.OptionCode)  AND SV.LanguageId=@LanguageId 
left join Sys_ValueOption t8 on t8.OptionCode = cast(t1.Status as nvarchar(2)) and t8.TypeName = '142' and sv.LanguageId=t8.LanguageId                           
where ReleaseId=@ReleaseId  and a.ObjectOption=11  
   
return          
end           

   
GO

/****** Object:  View [dbo].[v_WF_Object]    Script Date: 08/14/2013 16:41:48 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER View [dbo].[v_WF_Object]                                                    
as                                                    
/*                                    
 功能：显示流程里的审核对象                                          
 创建人：陈海明                                          
 创建时间：2009-02-20                                     
*/                                            
select a.KeyId,a.BaseId,a.ObjectId,a.ObjectOption,a.Status,b.FileName, b.IsCheckOut,b.ObjectIconPath,                                  
cast(b.StateId as varchar(2)) as ObjectState,         
case IsReturnObj when 1 then (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=1 and languageId=SV.LanguageId  )        
else (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=0 and languageId=SV.LanguageId  ) end as IsReturnObj,                                         
--case a.ObjectOption when 0 then '文档' end as [ObjectType],                      
SV.OptionName AS [ObjectType],                
--e.StateName,                
SV1.OptionName AS StateName,                                          
b.DocCode as [ObjectCode] ,b.DocName as [ObjectName],b.DocName as [ObjName],d.CategoryName ,case len(IsNull(b.Marker,'')) when 0 then 0 else 1  end IsMark                              
,dbo.GetSourceName(b.SourceType,b.SourceId,SV.LanguageId) as SourceName,b.VerName as Ver,b.VerDesc,SV.LanguageId                            
,b.MaterialSpec as Spec,b.MaterialModel as Model,b.MaterialSubstance as Substance,        
b.MaterialGrossWeight as GrossWeight,b.MaterialCost as Cost,b.MaterialWeight as [Weight],        
b.MaterialUnit as MaterialBOMUnit,        
'' as MaterialStockUnit,'' as MaterialUnit,'' as MaterialWeightUnit        
,a.RelationMark, b.MaterialDrawNumber as DrawNumber,b.MaterialName as MaterialName       
,b.UpdateDate   
,b.FilePath  
,f.UserName as Updater  
,dbo.GetFileSize(b.FileSize) as FileSize  
,g.FileTypeName as FileTypeName  
,b.MaterialDrawNumber  
,b.MaterialEnglishName  
from WF_Object a                                           
inner join Doc_DocumentVersion b on a.ObjectId=b.VerId                                          
inner join doc_docobject c on b.docid = c.docid                                                
inner join ps_businesscategory d on c.CategoryId = d.CategoryId                                           
--inner join doc_documentstate e on e.StateId = b.StateId                       
INNER JOIN Sys_ValueOption SV ON SV.TypeName='7' AND SV.OptionCode = '0'                 
INNER JOIN Sys_ValueOption SV1 ON SV1.TypeName='101' AND b.StateId = cast(SV1.OptionCode as int) AND SV1.LanguageId=SV.LanguageId                                  
left join SM_Users f on f.UserId = b.Updater  
left join PS_FileType g on g.FileTypeId = b.FileType  
where a.ObjectOption =0                          
union all    
                                         
select a.KeyId,a.BaseId,a.ObjectId,a.ObjectOption,a.Status,[FileName]=null, b.IsCheckOut,b.ObjectIconPath,                                        
dbo.GetMatCycleState(a.ObjectId) as ObjectState,         
case IsReturnObj when 1 then (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=1 and languageId=SV.LanguageId  )        
else (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=0 and languageId=SV.LanguageId  ) end as IsReturnObj,                                         
--case a.ObjectOption when 1 then '物料' end as [ObjectType],                      
SV.OptionName AS [ObjectType],                
--e.StateName,                
SV1.OptionName AS StateName,                                           
b.Code as [ObjectCode],b.Name as [ObjectName],b.Name as [ObjName],d.CategoryName ,0 as IsMark                                          
,dbo.GetSourceName(b.SourceType,b.SourceId,SV.LanguageId) as SourceName,b.VerCode as Ver,b.VerDesc,SV.LanguageId         
,b.Spec as Spec,b.Model as Model,b.Substance as Substance,b.GrossWeight as GrossWeight,b.Cost as Cost,b.Weight as [Weight],        
(SELECT Content  FROM   PS_BaseData   WHERE parentDataId='Data06' and DataId = b.BOMUnit) AS  MaterialBOMUnit,        
(SELECT Content  FROM   PS_BaseData   WHERE parentDataId='Data06' and DataId = b.StockUnit) AS  MaterialStockUnit,        
(SELECT Content  FROM   PS_BaseData   WHERE parentDataId='Data06' and DataId = b.Unit) AS  MaterialUnit,        
(SELECT Content  FROM   PS_BaseData   WHERE parentDataId='Data01' and DataId = b.WeightUnit) AS  MaterialWeightUni      
,a.RelationMark, b.DrawNumber ,b.Name as MaterialName    
,b.UpdateDate      
,'' as FilePath  
,'' as Updater  
,'' as FileSize  
,'' as FileTypeName  
,'' as MaterialDrawNumber  
,'' as MaterialEnglishName    
from WF_Object a                                           
inner join MAT_MaterialVersion b on a.ObjectId=b.MaterialVerId                                          
inner join MAT_MaterialBase c on  b.BaseId=c.BaseId                                                
inner join ps_businesscategory d on c.CategoryId=d.CategoryId                                             
--inner join doc_documentstate e on e.StateId = b.DesignCycle                      
INNER JOIN Sys_ValueOption SV ON SV.TypeName='7' AND SV.OptionCode = '1'                 
INNER JOIN Sys_ValueOption SV1 ON SV1.TypeName='101' AND b.DesignCycle = cast(SV1.OptionCode as int) AND SV1.LanguageId=SV.LanguageId                                        
WHERE a.ObjectOption = 1                              
                          
union  all    
select a.KeyId,a.BaseId,a.ObjectId,a.ObjectOption,a.Status,[FileName]=null, b.IsCheckOut,b.ObjectIconPath,                                       
cast(b.State as varchar(2)) as ObjectState,        
case IsReturnObj when 1 then (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=1 and languageId=SV.LanguageId  )        
else (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=0 and languageId=SV.LanguageId  ) end as IsReturnObj,                                         
SV.OptionName AS [ObjectType],                
--e.StateName,                  
SV1.OptionName AS StateName,                                        
b.InstanceCode as [ObjectCode],b.InstanceName as [ObjectName],b.InstanceName as [ObjName],d.CategoryName,0 as IsMark                                          
,dbo.GetSourceName(b.SourceType,b.SourceId,SV.LanguageId) as SourceName,b.VerName as Ver,'' as VerDesc,SV.LanguageId        
,'' as Spec,'' as Model,'' as Substance,null as GrossWeight,null as Cost,null as [Weight],        
'' as MaterialBOMUnit,'' as MaterialStockUnit,'' as MaterialUnit,'' as MaterialWeightUnit      
,a.RelationMark ,'' as DrawNumber  ,'' as MaterialName    
,b.UpdateDate    
,'' as FilePath  
,'' as Updater  
,'' as FileSize  
,'' as FileTypeName  
,'' as MaterialDrawNumber  
,'' as MaterialEnglishName    
from WF_Object a                                           
inner join PF_Instances b on a.ObjectId=b.VerId                                          
inner join PF_Templates c on b.TemplateId=c.TemplateId                                      
inner join ps_businesscategory d on c.CategoryId=d.CategoryId                           
--inner join doc_documentstate e on e.StateId = b.State                      
INNER JOIN Sys_ValueOption SV ON SV.TypeName='7' AND SV.OptionCode = '5'                  
INNER JOIN Sys_ValueOption SV1 ON SV1.TypeName='101' AND b.State = cast(SV1.OptionCode as int) AND SV1.LanguageId=SV.LanguageId                                                           
where a.ObjectOption =5 
and a.ObjectId not in (Select VerId from WF_ProcessBind pb,WF_Base base where pb.ProcessId=base.ProcessId and base.BaseId=a.BaseId and TemplateType=1)

--Added by jason.tang 2013-08-14  Begin
union  all    
select a.KeyId,a.BaseId,a.ObjectId,a.ObjectOption,a.Status,[FileName]=null, 
case when CheckOutPerson is null or CheckOutPerson = '' then 0
else 1 end IsCheckOut,
b.ObjectIconPath,                                       
cast(b.State as varchar(2)) as ObjectState,        
case IsReturnObj when 1 then (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=1 and languageId=SV.LanguageId  )        
else (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=0 and languageId=SV.LanguageId  ) end as IsReturnObj,                                         
SV.OptionName AS [ObjectType],                
--e.StateName,                  
SV1.OptionName AS StateName,                                        
b.Code as [ObjectCode],b.VerName as [ObjectName],b.Name as [ObjName],d.CategoryName,0 as IsMark                                          
,'' as SourceName,b.VerName as Ver,'' as VerDesc,SV.LanguageId        
,'' as Spec,'' as Model,'' as Substance,null as GrossWeight,null as Cost,null as [Weight],        
'' as MaterialBOMUnit,'' as MaterialStockUnit,'' as MaterialUnit,'' as MaterialWeightUnit      
,a.RelationMark ,'' as DrawNumber  ,'' as MaterialName    
,b.UpdateDate    
,'' as FilePath  
,'' as Updater  
,'' as FileSize  
,'' as FileTypeName  
,'' as MaterialDrawNumber  
,'' as MaterialEnglishName    
from WF_Object a                                           
inner join PP_PCVersion b on a.ObjectId=b.VerId                                          
--inner join PF_Templates c on b.TemplateId=c.TemplateId                                      
inner join ps_businesscategory d on b.CategoryId=d.CategoryId                           
--inner join doc_documentstate e on e.StateId = b.State                      
INNER JOIN Sys_ValueOption SV ON SV.TypeName='7' AND SV.OptionCode = '36'                  
INNER JOIN Sys_ValueOption SV1 ON SV1.TypeName='101' 
AND b.State = cast(SV1.OptionCode as int) AND SV1.LanguageId=SV.LanguageId                                                           
where a.ObjectOption =30 
and a.ObjectId not in (Select VerId from WF_ProcessBind pb,WF_Base base where pb.ProcessId=base.ProcessId and base.BaseId=a.BaseId and TemplateType=1)
--End 

union  all    
select a.KeyId,a.BaseId,a.ObjectId,a.ObjectOption,a.Status,[FileName]=null,[IsCheckOut]=0,b.ObjectIconPath,                                       
cast(b.State as varchar(2)) as ObjectState,         
case IsReturnObj when 1 then (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=1 and languageId=SV.LanguageId  )        
else (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=0 and languageId=SV.LanguageId  ) end as IsReturnObj,                                         
--case a.ObjectOption when 2 then '项目' when 3 then '任务' end as [ObjectType],                      
SV.OptionName AS [ObjectType],                                          
--case b.State when 0 then '未启动' when 1 then '启动' when 2 then '结束' when 3 then '冻结' when 4 then '终止' end  AS [StateName],                      
SV1.OptionName AS [StateName],                                          
b.WorkCode as [ObjectCode],b.WorkName as [ObjectName],b.WorkName as [ObjName],c.CategoryName ,0 as IsMark                                         
,'' as SourceName,'' as Ver,'' as VerDesc ,SV.LanguageId                           
,'' as Spec,'' as Model,'' as Substance,null as GrossWeight,null as Cost,null as [Weight],        
'' as MaterialBOMUnit,'' as MaterialStockUnit,'' as MaterialUnit,'' as MaterialWeightUnit      
,a.RelationMark ,'' as DrawNumber ,'' as MaterialName    
,b.UpdateDate     
,'' as FilePath  
,'' as Updater  
,'' as FileSize  
,'' as FileTypeName  
,'' as MaterialDrawNumber  
,'' as MaterialEnglishName    
from WF_Object a                                           
inner join PJ_WorkPiece b on a.ObjectId=b.WorkId                                               
inner join ps_businesscategory c on b.CategoryId=c.CategoryId                      
INNER JOIN Sys_ValueOption SV ON SV.TypeName='7' AND SV.OptionCode = cast(a.ObjectOption AS varchar)                      
INNER JOIN Sys_ValueOption SV1 ON SV1.TypeName='15' AND b.State = cast(SV1.OptionCode as int) AND SV1.LanguageId=SV.LanguageId                                
where a.ObjectOption in (2,3)                              
/*                                  
union                                    
select a.KeyId,a.BaseId,a.ObjectId,a.ObjectOption,[Icon]=null, b.AttachmentName as [FileName],                                          
[ObjectState]='0',[CheckOutState]=0,                                           
case a.ObjectOption when 9 then '附件' end as [ObjectType],[StateName]=null,                                          
[ObjectCode]=null ,b.AttachmentName as [ObjectName],b.AttachmentName as [ObjName],[CategoryName]=null                                           
from WF_Object a                                           
inner join DOC_Attachment b on a.ObjectId=b.AttachmentId                                   
*/                                  
union  all    
select a.KeyId,a.BaseId,a.ObjectId,a.ObjectOption,a.Status,[FileName]=null,[IsCheckOut]=0,[ObjectIconPath]='../skins/DataGrid/select.gif',                                           
cast(b.State as varchar(2)) as ObjectState,         
case IsReturnObj when 1 then (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=1 and languageId=SV.LanguageId  )        
else (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=0 and languageId=SV.LanguageId  ) end as IsReturnObj,                                         
--case a.ObjectOption when 7 then '问题表单' end as [ObjectType],                      
SV.OptionName AS [ObjectType],                                  
--case b.State when 0 then '提交' when 1 then '处理中' when 2 then '完成' when 3 then '冻结'  end  AS [StateName],                      
SV1.OptionName AS [StateName],                                                 
--b.QuestionCode as [ObjectCode],b.Subject as [ObjectName],b.Subject as [ObjName],c.CategoryName,0 as IsMark                  
b.Code as [ObjectCode],b.Title as [ObjectName],b.Title as [ObjName],c.CategoryName,0 as IsMark                  
,'' as SourceName,'' as Ver,'' as VerDesc  ,SV.LanguageId            
,'' as Spec,'' as Model,'' as Substance,null as GrossWeight,null as Cost,null as [Weight],        
'' as MaterialBOMUnit,'' as MaterialStockUnit,'' as MaterialUnit,'' as MaterialWeightUnit      
,a.RelationMark,'' as DrawNumber  ,'' as MaterialName     
,'' as UpdateDate     
,'' as FilePath  
,'' as Updater  
,'' as FileSize  
,'' as FileTypeName  
,'' as MaterialDrawNumber  
,'' as MaterialEnglishName    
from WF_Object  a                                           
--inner join PJ_QuestionForm b on a.ObjectId=b.QuestionId                  
inner join PM_Problem b on a.ObjectId=b.ProblemId                                                     
inner join ps_businesscategory c on b.CategoryId=c.CategoryId                      
INNER JOIN Sys_ValueOption SV ON SV.TypeName='7' AND SV.OptionCode = '7'                      
INNER JOIN Sys_ValueOption SV1 ON SV1.TypeName='79' AND b.State = cast(SV1.OptionCode as int) AND SV1.LanguageId=SV.LanguageId                                   
where a.ObjectOption =7                          
                                  
union  all    
select a.KeyId,a.BaseId,a.ObjectId,a.ObjectOption,a.Status,[FileName]=null,[IsCheckOut]=0,[ObjectIconPath]='../skins/Exchanges/exchange.png',                                  
cast(b.State as varchar(2)) as ObjectState,         
case IsReturnObj when 1 then (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=1 and languageId=SV.LanguageId  )        
else (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=0 and languageId=SV.LanguageId  ) end as IsReturnObj,                                         
--case a.ObjectOption when 6 then '变更' end as [ObjectType],              
SV.OptionName AS [ObjectType],                                  
--case b.State when 0 then '未启动' when 1 then '进行中' when 2 then '冻结' when 3 then '完成' end  AS [StateName],                      
SV1.OptionName AS [StateName],                                             
b.ApplyCode as [ObjectCode],b.ApplyName as [ObjectName],b.ApplyName as [ObjName],c.CategoryName,0 as IsMark                                 
,'' as SourceName,'' as Ver,'' as VerDesc ,SV.LanguageId                           
,'' as Spec,'' as Model,'' as Substance,null as GrossWeight,null as Cost,null as [Weight],        
'' as MaterialBOMUnit,'' as MaterialStockUnit,'' as MaterialUnit,'' as MaterialWeightUnit      
,a.RelationMark ,'' as DrawNumber  ,'' as MaterialName     
,'' as UpdateDate      
,'' as FilePath  
,'' as Updater  
,'' as FileSize  
,'' as FileTypeName  
,'' as MaterialDrawNumber  
,'' as MaterialEnglishName    
from WF_Object  a                                           
inner join EC_ChangeApply b on a.ObjectId=b.ApplyId                                                   
inner join ps_businesscategory c on b.CategoryId=c.CategoryId                       
INNER JOIN Sys_ValueOption SV ON SV.TypeName='7' AND SV.OptionCode = '6'                      
INNER JOIN Sys_ValueOption SV1 ON SV1.TypeName='72' AND b.State = cast(SV1.OptionCode as int) AND SV1.LanguageId=SV.LanguageId                                  
where a.ObjectOption =6                          
                                  
union  all    
select a.KeyId,a.BaseId,a.ObjectId,a.ObjectOption,a.Status,[FileName]=null,[IsCheckOut]=0,[ObjectIconPath]='../skins/Exchanges/exchange.png',                                  
cast(b.State as varchar(2)) as ObjectState,         
case IsReturnObj when 1 then (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=1 and languageId=SV.LanguageId  )        
else (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=0 and languageId=SV.LanguageId  ) end as IsReturnObj,                                         
--case a.ObjectOption when 18 then '项目变更' end as [ObjectType],                      
SV.OptionName AS [ObjectType],                                  
--case b.State when 0 then '未启动' when 1 then '进行中' when 2 then '完成'  end  AS [StateName],                      
SV1.OptionName AS [StateName],                                          
'' as [ObjectCode],b.ApplyName as [ObjectName],b.ApplyName as [ObjName],'' as CategoryName,0 as IsMark                                    
,'' as SourceName,'' as Ver,'' as VerDesc,SV.LanguageId                           
,'' as Spec,'' as Model,'' as Substance,null as GrossWeight,null as Cost,null as [Weight],        
'' as MaterialBOMUnit,'' as MaterialStockUnit,'' as MaterialUnit,'' as MaterialWeightUnit      
,a.RelationMark,'' as DrawNumber  ,'' as MaterialName    
,b.ApplyDate as UpdateDate      
,'' as FilePath  
,'' as Updater  
,'' as FileSize  
,'' as FileTypeName  
,'' as MaterialDrawNumber  
,'' as MaterialEnglishName    
from WF_Object  a                                           
inner join PJ_ChangeApply b on  a.ObjectId=b.ApplyId                      
INNER JOIN Sys_ValueOption SV ON SV.TypeName='7' AND SV.OptionCode = '18'                      
INNER JOIN Sys_ValueOption SV1 ON SV1.TypeName='73' AND b.State = cast(SV1.OptionCode as int) AND SV1.LanguageId=SV.LanguageId                                  
where a.ObjectOption =18                          
                              
union  all    
select a.KeyId,a.BaseId,a.ObjectId,a.ObjectOption,a.Status,[FileName]=null,[IsCheckOut]=0,[ObjectIconPath]='../skins/ObjectIcon/ApplicationForm.gif',                                     
cast(b.State as varchar(2)) as ObjectState,        
case IsReturnObj when 1 then (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=1 and languageId=SV.LanguageId  )        
else (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=0 and languageId=SV.LanguageId  ) end as IsReturnObj,                                         
--case a.ObjectOption when 19 then '物料申请单' end as [ObjectType],                      
SV.OptionName AS [ObjectType],                                 
--case b.State when 0 then '创建' when 1 then '完成'  end  AS [StateName],                      
SV1.OptionName AS [StateName],                                                    
b.FormCode  as [ObjectCode],'' as [ObjectName],'' as [ObjName],'' as CategoryName,0 as IsMark         
,'' as SourceName,'' as Ver,'' as VerDesc ,SV.LanguageId                   
,'' as Spec,'' as Model,'' as Substance,null as GrossWeight,null as Cost,null as [Weight],        
'' as MaterialBOMUnit,'' as MaterialStockUnit,'' as MaterialUnit,'' as MaterialWeightUnit      
,a.RelationMark ,'' as DrawNumber  ,'' as MaterialName    
,'' as UpdateDate    
,'' as FilePath  
,'' as Updater  
,'' as FileSize  
,'' as FileTypeName  
,'' as MaterialDrawNumber  
,'' as MaterialEnglishName    
from WF_Object  a                                           
inner join AF_Form b on a.ObjectId=b.FormId                       
INNER JOIN Sys_ValueOption SV ON SV.TypeName='7' AND SV.OptionCode = '19'                      
INNER JOIN Sys_ValueOption SV1 ON SV1.TypeName='74' AND b.State = cast(SV1.OptionCode as int) + 1 AND SV1.LanguageId=SV.LanguageId                                     
where a.ObjectOption =19                          
                              
union  all    
select a.KeyId,a.BaseId,a.ObjectId,a.ObjectOption,a.Status,[FileName]=null, b.IsCheckOut,[ObjectIconPath]='../skins/DataGrid/select.gif',                                        
dbo.GetMatCycleState(a.ObjectId) as ObjectState,         
case IsReturnObj when 1 then (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=1 and languageId=SV.LanguageId  )        
else (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=0 and languageId=SV.LanguageId  ) end as IsReturnObj,                                         
--case a.ObjectOption when 20 then 'BOM扩展' end as [ObjectType],                      
SV.OptionName AS [ObjectType],                              
'' AS StateName,                                          
b.Code as [ObjectCode],                              
b.Name as [ObjectName],                              
b.Name as [ObjName],                              
d.CategoryName ,0 as IsMark                              
,'' as SourceName,b.VerCode as Ver,b.VerDesc,SV.LanguageId                         
,'' as Spec,'' as Model,'' as Substance,null as GrossWeight,null as Cost,null as [Weight],        
'' as MaterialBOMUnit,'' as MaterialStockUnit,'' as MaterialUnit,'' as MaterialWeightUnit      
,a.RelationMark,'' as DrawNumber  ,'' as MaterialName   
,b.UpdateDate      
,'' as FilePath  
,'' as Updater  
,'' as FileSize  
,'' as FileTypeName  
,'' as MaterialDrawNumber  
,'' as MaterialEnglishName    
from WF_Object a                  
inner join MAT_MaterialVersion b on a.ObjectId=b.MaterialVerId                                          
inner join MAT_MaterialBase c on  b.BaseId=c.BaseId                                                
inner join ps_businesscategory d on c.CategoryId=d.CategoryId                       
INNER JOIN Sys_ValueOption SV ON SV.TypeName='7' AND SV.OptionCode = '20'                             
WHERE a.ObjectOption = 20                              
                              
union  all    
select a.KeyId,a.BaseId,a.ObjectId,a.ObjectOption,a.Status,[FileName]=null,[IsCheckOut]=0,[ObjectIconPath]='../skins/ObjectIcon/DriverForm.gif',                                     
'' as ObjectState,         
case IsReturnObj when 1 then (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=1 and languageId=SV.LanguageId  )        
else (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=0 and languageId=SV.LanguageId  ) end as IsReturnObj,                                         
--case a.ObjectOption when 21 then '驱动表单' end as [ObjectType],                      
SV.OptionName AS [ObjectType],                                 
--case b.IsFinish when 0 then '创建' when 1 then '完成'  end  AS [StateName],                      
SV1.OptionName AS [StateName],                              
''  as [ObjectCode],b.Name as [ObjectName],b.Name as [ObjName],'' as CategoryName,0 as IsMark                              
,'' as SourceName, '' as Ver,'' as VerDesc  ,SV.LanguageId                   
,'' as Spec,'' as Model,'' as Substance,null as GrossWeight,null as Cost,null as [Weight],        
'' as MaterialBOMUnit,'' as MaterialStockUnit,'' as MaterialUnit,'' as MaterialWeightUnit      
,a.RelationMark ,'' as DrawNumber  ,'' as MaterialName     
,'' as UpdateDate     
,'' as FilePath  
,'' as Updater  
,'' as FileSize  
,'' as FileTypeName  
,'' as MaterialDrawNumber  
,'' as MaterialEnglishName    
from WF_Object  a                                    
inner join MAT_DriverForm b on a.ObjectId=b.FormId                      
INNER JOIN Sys_ValueOption SV ON SV.TypeName='7' AND SV.OptionCode = '21'                      
INNER JOIN Sys_ValueOption SV1 ON SV1.TypeName='74' AND b.IsFinish = cast(SV1.OptionCode as int) AND SV1.LanguageId=SV.LanguageId                              
WHERE a.ObjectOption = 21                              
                              
union  all    
select a.KeyId,a.BaseId,a.ObjectId,a.ObjectOption,a.Status,[FileName]=null,[IsCheckOut]=0,[ObjectIconPath]='../skins/ObjectIcon/UpdateForm.gif',                                     
'' as ObjectState,         
case IsReturnObj when 1 then (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=1 and languageId=SV.LanguageId  )        
else (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=0 and languageId=SV.LanguageId  ) end as IsReturnObj,                                         
--case a.ObjectOption when 22 then '属性变更单' end as [ObjectType],                      
SV.OptionName AS [ObjectType],                                 
--case b.IsFinish when 0 then '创建' when 1 then '完成'  end  AS [StateName],                      
SV1.OptionName AS [StateName],                              
'' as [ObjectCode], b.FormName as [ObjectName], b.FormName as [ObjName],'' as CategoryName,0 as IsMark                              
,'' as SourceName, '' as Ver,'' as VerDesc ,SV.LanguageId                           
,'' as Spec,'' as Model,'' as Substance,null as GrossWeight,null as Cost,null as [Weight],        
'' as MaterialBOMUnit,'' as MaterialStockUnit,'' as MaterialUnit,'' as MaterialWeightUnit      
,a.RelationMark ,'' as DrawNumber  ,'' as MaterialName   
,b.ExecutionDate as UpdateDate     
,'' as FilePath  
,'' as Updater  
,'' as FileSize  
,'' as FileTypeName  
,'' as MaterialDrawNumber  
,'' as MaterialEnglishName    
from WF_Object  a                                           
inner join MAT_UpdateForm b on a.ObjectId=b.FormId                       
INNER JOIN Sys_ValueOption SV ON SV.TypeName='7' AND SV.OptionCode = '22'                      
INNER JOIN Sys_ValueOption SV1 ON SV1.TypeName='74' AND b.IsFinish = cast(SV1.OptionCode as int) AND SV1.LanguageId=SV.LanguageId                             
where a.ObjectOption =22                          
                              
union  all    
select a.KeyId,a.BaseId,a.ObjectId,a.ObjectOption,a.Status,[FileName]=null,[IsCheckOut]=0,[ObjectIconPath]='../skins/ObjectIcon/ClientForm.gif',                                     
'' as ObjectState,         
case IsReturnObj when 1 then (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=1 and languageId=SV.LanguageId  )        
else (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=0 and languageId=SV.LanguageId  ) end as IsReturnObj,                                         
--case a.ObjectOption when 23 then 'ECR' end as [ObjectType],                      
SV.OptionName AS [ObjectType],                                 
--case b.State when 0 then '创建' when 1 then '否决' when 2 then '批准'  when 3 then '执行中'  when 4 then '完成'  end  AS [StateName],                       
SV1.OptionName AS [StateName],                             
b.ECRCode as [ObjectCode], b.ECRName as [ObjectName], b.ECRName as [ObjName],d.CategoryName,0 as IsMark                              
,'' as SourceName, '' as Ver,'' as VerDesc ,SV.LanguageId                        
,'' as Spec,'' as Model,'' as Substance,null as GrossWeight,null as Cost,null as [Weight],        
'' as MaterialBOMUnit,'' as MaterialStockUnit,'' as MaterialUnit,'' as MaterialWeightUnit      
,a.RelationMark ,'' as DrawNumber  ,'' as MaterialName     
,'' as UpdateDate    
,'' as FilePath  
,'' as Updater  
,'' as FileSize  
,'' as FileTypeName  
,'' as MaterialDrawNumber  
,'' as MaterialEnglishName    
from WF_Object  a                                           
inner join EC_ECRObject b on a.ObjectId=b.ECRId                              
inner join ps_businesscategory d on b.CategoryId=d.CategoryId                      
INNER JOIN Sys_ValueOption SV ON SV.TypeName='7' AND SV.OptionCode = '23'                      
INNER JOIN Sys_ValueOption SV1 ON SV1.TypeName='75' AND b.State = cast(SV1.OptionCode as int) AND SV1.LanguageId=SV.LanguageId                              
where a.ObjectOption =23                          
                            
union  all    
select a.KeyId,a.BaseId,a.ObjectId,a.ObjectOption,a.Status,[FileName]=null,[IsCheckOut]=0,[ObjectIconPath]='../skins/ObjectIcon/PBOM.gif',                            
cast(b.Status as varchar(2)) as ObjectState,         
case IsReturnObj when 1 then (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=1 and languageId=SV.LanguageId  )        
else (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=0 and languageId=SV.LanguageId  ) end as IsReturnObj,                                         
--case a.ObjectOption when 11 then 'PBOM' end as [ObjectType],                      
SV.OptionName AS [ObjectType],                                 
--e.StateName as [StateName],                
SV1.OptionName AS StateName,                               
f.Code as [ObjectCode], f.Name as [ObjectName], c.groupid as [ObjName],'' as CategoryName,0 as IsMark                              
,'' as SourceName, cast(b.Ver as varchar(40)) as Ver,'' as VerDesc ,SV.LanguageId                
,'' as Spec,'' as Model,'' as Substance,null as GrossWeight,null as Cost,null as [Weight],        
'' as MaterialBOMUnit,'' as MaterialStockUnit,'' as MaterialUnit,'' as MaterialWeightUnit      
,a.RelationMark ,'' as DrawNumber  ,'' as MaterialName   
,'' as UpdateDate   
,'' as FilePath  
,'' as Updater  
,'' as FileSize  
,'' as FileTypeName  
,'' as MaterialDrawNumber  
,'' as MaterialEnglishName    
from WF_Object  a           
inner join pp_pbomver b on a.ObjectId=b.VerId                                  
inner join PP_PBom c on b.PBomId  = c.PBomId                                       
inner join MAT_MaterialVersion f on f.baseid=c.objectid and f.iseffect = 1      
INNER JOIN Sys_ValueOption SV ON SV.TypeName='7' AND SV.OptionCode = '11'                 
INNER JOIN Sys_ValueOption SV1 ON SV1.TypeName='142' AND b.Status= cast(SV1.OptionCode as int) AND SV1.LanguageId=SV.LanguageId                          
where a.ObjectOption =11                              
                              
union  all    
                          
select a.KeyId,a.BaseId,a.ObjectId,a.ObjectOption,a.Status,[FileName]=null,                          
[IsCheckOut]=0,b.ObjectStatePath as [ObjectIconPath],                            
cast(b.State as varchar(2)) as ObjectState,        
case IsReturnObj when 1 then (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=1 and languageId=SV.LanguageId  )        
else (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=0 and languageId=SV.LanguageId  ) end as IsReturnObj,                                         
--case a.ObjectOption when 25 then '客户需求' end as [ObjectType],                      
SV.OptionName AS [ObjectType],                                 
--case (b.State) when 0 then '创建' when 1 then '接受' when 2 then '交付中' when 3 then '已交付' end as [StateName],                      
SV1.OptionName AS [StateName],                              
b.Code as [ObjectCode], b.Title as [ObjectName], b.Title as [ObjName],d.CategoryName,0 as IsMark                              
,c.Content as SourceName,b.VerCode as Ver,'' as VerDesc,SV.LanguageId                      
,'' as Spec,'' as Model,'' as Substance,null as GrossWeight,null as Cost,null as [Weight],        
'' as MaterialBOMUnit,'' as MaterialStockUnit,'' as MaterialUnit,'' as MaterialWeightUnit      
,a.RelationMark ,'' as DrawNumber  ,'' as MaterialName      
,b.UpdateDate   
,'' as FilePath  
,'' as Updater  
,'' as FileSize  
,'' as FileTypeName  
,'' as MaterialDrawNumber  
,'' as MaterialEnglishName    
from WF_Object  a                                           
inner join RQ_CustmorRequest b  on a.ObjectId=b.CustmorRequestId                          
inner join PS_BaseData c on b.SourceId=c.DataId                                                    
inner join PS_BusinessCategory d on b.CategoryId=d.CategoryId                      
INNER JOIN Sys_ValueOption SV ON SV.TypeName='7' AND SV.OptionCode = '25'                      
INNER JOIN Sys_ValueOption SV1 ON SV1.TypeName='76' AND b.State = cast(SV1.OptionCode as int) AND SV1.LanguageId=SV.LanguageId                          
where a.ObjectOption =25                           
                          
union  all    
                          
select a.KeyId,a.BaseId,a.ObjectId,a.ObjectOption,a.Status,[FileName]=null,                          
[IsCheckOut]=0,b.ObjectStatePath as [ObjectIconPath],                            
cast(b.State as varchar(2)) as ObjectState,         
case IsReturnObj when 1 then (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=1 and languageId=SV.LanguageId  )        
else (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=0 and languageId=SV.LanguageId  ) end as IsReturnObj,                                         
--case a.ObjectOption when 26 then '交付' end as [ObjectType],                      
SV.OptionName AS [ObjectType],                                 
--case (b.State) when 0 then '创建' when 1 then '已交付' end as [StateName],                      
SV1.OptionName AS [StateName],                         
b.Code as [ObjectCode], b.Title as [ObjectName], b.Title as [ObjName],'' as CategoryName,0 as IsMark                              
,'' as SourceName,'' as Ver,'' as VerDesc ,SV.LanguageId                       
,'' as Spec,'' as Model,'' as Substance,null as GrossWeight,null as Cost,null as [Weight],        
'' as MaterialBOMUnit,'' as MaterialStockUnit,'' as MaterialUnit,'' as MaterialWeightUnit      
,a.RelationMark ,'' as DrawNumber  ,'' as MaterialName      
,b.UpdateDate  
,'' as FilePath  
,'' as Updater  
,'' as FileSize  
,'' as FileTypeName  
,'' as MaterialDrawNumber  
,'' as MaterialEnglishName    
from WF_Object  a                                           
inner join RQ_Delivery b  on a.ObjectId=b.DeliveryId              
INNER JOIN Sys_ValueOption SV ON SV.TypeName='7' AND SV.OptionCode = '26'                      
INNER JOIN Sys_ValueOption SV1 ON SV1.TypeName='77' AND b.State = cast(SV1.OptionCode as int) AND SV1.LanguageId=SV.LanguageId                           
where a.ObjectOption =26         
    
union  all    
                          
select a.KeyId,a.BaseId,a.ObjectId,ObjectOption,a.Status,[FileName]=null,                          
[IsCheckOut]=0,b.ObjectIconPath as [ObjectIconPath],                            
cast(b.StateId as varchar(2)) as ObjectState,         
case IsReturnObj when 1 then (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=1 and languageId=SV.LanguageId  )        
else (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=0 and languageId=SV.LanguageId  ) end as IsReturnObj,                                         
--case a.ObjectOption when 28 then '交付' end as [ObjectType],                      
SV.OptionName AS [ObjectType],                                 
--case (b.State) when 0 then '创建' when 1 then '已交付' end as [StateName],                      
SV1.OptionName AS [StateName],                         
b.Code as [ObjectCode], b.Name as [ObjectName], b.Name as [ObjName],'' as CategoryName,0 as IsMark                              
,'' as SourceName,'' as Ver,'' as VerDesc ,SV.LanguageId                       
,'' as Spec,'' as Model,'' as Substance,null as GrossWeight,null as Cost,null as [Weight],        
'' as MaterialBOMUnit,'' as MaterialStockUnit,'' as MaterialUnit,'' as MaterialWeightUnit      
,a.RelationMark ,'' as DrawNumber  ,'' as MaterialName      
,b.UpdateDate  
,'' as FilePath  
,'' as Updater  
,'' as FileSize  
,'' as FileTypeName  
,'' as MaterialDrawNumber  
,'' as MaterialEnglishName    
from WF_Object  a                                           
inner join Quo_QuoteVersion b  on a.ObjectId=b.QuoteId              
INNER JOIN Sys_ValueOption SV ON SV.TypeName='7' AND SV.OptionCode = '28'                      
INNER JOIN Sys_ValueOption SV1 ON SV1.TypeName='77' AND b.Iseffective = cast(SV1.OptionCode as int) AND SV1.LanguageId=SV.LanguageId                           
where a.ObjectOption =28      
GO

/****** Object:  View [dbo].[V_PP_RoutingAttachment]    Script Date: 09/17/2013 14:48:59 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


  
ALTER VIEW [dbo].[V_PP_RoutingAttachment]  
AS  
SELECT A.KeyId,  
       A.SrcObjectId,  
       A.DesObjectId,  
       A.ObjectId,  
       A.Name,  
       A.Code,  
       A.ObjectOption,  
       A.RelationType,  
       A.CategoryId,  
       B.CategoryName,  
       A.State,  
       A.CheckOutState,  
       A.ObjectIconPath,  
       A.OriginalMode,  
       A.VerCode,  
       A.ObjectStatePath
FROM     
(  
 --文档正方向链接  
           SELECT t0.*,  
                  t1.VerId AS [ObjectId],  
                  t1.DocName AS [Name],  
                  t1.DocCode AS [Code],  
                  '0' AS [ObjectOption],  
                  t2.CategoryId,  
                  t1.StateId AS [State],  
                  CASE len(isnull(t1.CheckOutDate, ''))  
                  WHEN 0 THEN '0'  
                  ELSE '1'  
                  END AS [CheckOutState],  
                  t1.ObjectIconPath,  
                t1.VerName + '.' + Convert(nvarchar, cp.CopyNo) AS VerCode,
                t1.ObjectStatePath    
           FROM   SYS_RelationObject t0   
           INNER JOIN   DOC_DocumentVersion t1 ON (t0.SrcObjectType = 0 AND t0.SrcObjectId = t1.VerId)   
           INNER JOIN   Doc_DocumentCopy cp with(nolock) On t1.Verid = cp.Verid   
           INNER JOIN   doc_docobject t2 ON t1.docid = t2.docid   
       
where cp.IsActive =1 and Exists  
(select VerId From Doc_DocumentVersion   
inner join   
(select max(CreateDate) as CreateDate,DocId from sys_relationobject  
inner join DOC_DocumentVersion on VerId=SrcObjectId  
where DesObjectId=t0.DesObjectId  
group by DocId) as t  
on t.DocId=Doc_DocumentVersion.DocId and t.CreateDate=Doc_DocumentVersion.CreateDate  
where VerId=t0.SrcObjectId)  
  
           UNION  
  
           SELECT t0.*,  
                  t1.MaterialVerId AS [ObjectId],  
                  t1.Name AS [Name],  
                  t1.Code AS [Code],  
                  '1' AS [ObjectOption],  
                  t2.CategoryId,  
                  t1.DesignCycle AS [State],  
                  '0' AS [CheckOutState],  
                  t1.ObjectIconPath,  
                  t1.VerCode AS VerCode  ,
                  t1.ObjectStatePath
 from SYS_RelationObject t0      
 INNER JOIN MAT_MaterialVersion t1 ON t0.SrcObjectId = t1.MaterialVerId            
 inner join MAT_MaterialBase t2 on  t1.BaseId=t2.BaseId  
where Exists  
(SELECT MaterialVerId  
 FROM   Mat_MaterialVersion   
 INNER  
 JOIN   (  
            SELECT max(CreateDate) AS CreateDate,  
                   BaseId  
            FROM   sys_relationobject  
            INNER  
            JOIN   MAT_MaterialVersion  
              ON   MaterialVerId = SrcObjectId  
            WHERE  DesObjectId = t0.DesObjectId  
            GROUP BY  
                   baseid  
        ) AS t  
   ON   t.BaseId = Mat_MaterialVersion.BaseId  
  AND   t.CreateDate = Mat_MaterialVersion.CreateDate  
 WHERE  MaterialVerId = t0.SrcObjectId)   
  
UNION   
           --表单正方向链接  
           SELECT t0.*,  
                  t1.VerId AS [ObjectId],  
                  t1.InstanceName AS [Name],  
                  t1.InstanceCode AS [Code],  
                  '5' AS [ObjectOption],  
                  t2.CategoryId,  
                  t1.State AS [State],  
                  CASE len(isnull(t1.CheckOutDate,''))  
                  WHEN 0 THEN 0  
                  ELSE 1  
                  END [CheckOutState],  
                  t1.ObjectIconPath,  
                  t1.VerName AS VerCode,
                  t1.ObjectStatePath  
           FROM   SYS_RelationObject t0   
           INNER JOIN   PF_Instances t1 ON (t0.SrcObjectType = 5 AND t0.SrcObjectId = t1.VerId)  
           INNER JOIN   PF_Templates t2 ON   t1.TemplateId = t2.TemplateId    
  
          where Exists  
(select VerId From PF_Instances  
inner join   
(select max(CreateDate) as CreateDate,InstanceId from sys_relationobject  
inner join PF_Instances on VerId=SrcObjectId  
where DesObjectId=t0.DesObjectId  
group by InstanceId) as t  
on t.InstanceId=PF_Instances.InstanceId and t.CreateDate=PF_Instances.CreateDate  
where VerId=t0.SrcObjectId)    
           UNION    
           
           --工艺卡片正方向链接  
           SELECT t0.*,  
                  t1.VerId AS [ObjectId],  
                  t1.Name AS [Name],  
                  t1.Code AS [Code],  
                  '30' AS [ObjectOption],  
                  t1.CategoryId,  
                  t1.State AS [State],  
                  CASE len(isnull(t1.CheckOutDate,''))  
                  WHEN 0 THEN 0  
                  ELSE 1  
                  END [CheckOutState],  
                  case charindex('../../',t1.ObjectIconPath) when  0 then
					t1.ObjectIconPath
					else
					substring(t1.ObjectIconPath,4, LEN(t1.ObjectIconPath) - 3)
					end ObjectIconPath,  
                  t1.VerName AS VerCode,
                  t1.ObjectStatePath  
           FROM   SYS_RelationObject t0   
           INNER JOIN   PP_PCVersion t1 ON (t0.SrcObjectType = 30 AND t0.SrcObjectId = t1.VerId)  
  
          where Exists  
(select VerId From PP_PCVersion  
inner join   
(select max(CreateDate) as CreateDate,BaseId from sys_relationobject  
inner join PP_PCVersion on VerId=SrcObjectId  
where DesObjectId=t0.DesObjectId  
group by BaseId) as t  
on t.BaseId=PP_PCVersion.BaseId and t.CreateDate=PP_PCVersion.CreateDate  
where VerId=t0.SrcObjectId)  

           UNION
              
           --邮件正方向链接  
           SELECT t0.*,  
     t1.EmailId AS [ObjectId],  
                  t1.Subject AS [Name],  
                  '' AS [Code],  
                  '8' AS [ObjectOption],  
                  '' AS [CategoryId],  
                  '1' AS [State],  
                  '0' AS [CheckOutState],  
                  '../skins/ObjectIcon/Email.gif' AS [ObjectIconPath],  
                  ''  AS VerCode ,
                  '' as ObjectStatePath 
           FROM   SYS_RelationObject t0   
           INNER JOIN   dbo.Mail_Email t1 ON  (t0.SrcObjectType = 8 AND t0.SrcObjectId = t1.EmailId)   
       
           /******************************************************************************************************/  
           UNION  
             
            --文档反方向链接  
           SELECT t0.*,  
                  t1.VerId AS [ObjectId],  
                  t1.DocName AS [Name],  
                  t1.DocCode AS [Code],  
                  '0' AS [ObjectOption],  
                  t2.CategoryId,  
                  t1.StateId AS [State],  
                  CASE len(isnull(t1.CheckOutDate, ''))  
                  WHEN 0 THEN '0'  
                  ELSE '1'  
                  END AS [CheckOutState],  
                  t1.ObjectIconPath,  
                  t1.VerName + '.' + Convert(nvarchar, cp.CopyNo) AS VerCode  ,
                  t1.ObjectStatePath  
           FROM   SYS_RelationObject t0   
           INNER JOIN   DOC_DocumentVersion t1 ON (t0.DesObjectType = 0 AND t0.DesObjectId = t1.VerId)  
           INNER JOIN   Doc_DocumentCopy cp with(nolock) On t1.Verid = cp.Verid   
           INNER JOIN   doc_docobject t2 ON t1.docid = t2.docid   
  
           where cp.IsActive =1 and Exists  
(select VerId From Doc_DocumentVersion   
inner join   
(select max(CreateDate) as CreateDate,DocId from sys_relationobject  
inner join DOC_DocumentVersion on VerId=DesObjectId  
where SrcObjectId=t0.SrcObjectId  
group by DocId) as t  
on t.DocId=Doc_DocumentVersion.DocId and t.CreateDate=Doc_DocumentVersion.CreateDate  
where VerId=t0.DesObjectId)  
           UNION  
  
           SELECT t0.*,  
                  t1.MaterialVerId AS [ObjectId],  
                  t1.Name AS [Name],  
                  t1.Code AS [Code],  
                  '1' AS [ObjectOption],  
                  t2.CategoryId,  
                  t1.DesignCycle AS [State],  
                  '0' AS [CheckOutState],  
                  t1.ObjectIconPath,  
                  t1.VerCode AS VerCode  ,
                  t1.ObjectStatePath
 from SYS_RelationObject t0      
 INNER JOIN MAT_MaterialVersion t1 ON t0.DesObjectId = t1.MaterialVerId            
 INNER join MAT_MaterialBase t2 on  t1.BaseId=t2.BaseId  
where Exists  
(select MaterialVerId From Mat_MaterialVersion   
inner join   
(select max(CreateDate) as CreateDate,BaseId from sys_relationobject  
inner join MAT_MaterialVersion on MaterialVerId=DesObjectId  
where SrcObjectId=t0.SrcObjectId  
group by baseid) as t  
on t.BaseId=Mat_MaterialVersion.BaseId and t.CreateDate=Mat_MaterialVersion.CreateDate  
where MaterialVerId=t0.DesObjectId)   
  
 UNION  
           --表单反方向链接  
           SELECT t0.*,  
                  t1.VerId AS [ObjectId],  
                  t1.InstanceName AS [Name],  
                  t1.InstanceCode AS [Code],  
                  '5' AS [ObjectOption],  
                  t2.CategoryId,  
                  t1.State AS [State],  
                  CASE len(isnull(t1.CheckOutDate,''))  
                  WHEN 0 THEN 0  
                  ELSE 1  
                  END [CheckOutState],  
                  t1.ObjectIconPath,  
                  t1.VerName  AS VerCode ,
                  t1.ObjectStatePath 
           FROM   SYS_RelationObject t0   
           INNER JOIN   PF_Instances t1 ON (t0.DesObjectType = 5 AND t0.DesObjectId = t1.VerId)  
           INNER JOIN   PF_Templates t2 ON   t1.TemplateId = t2.TemplateId    
             
where Exists  
(select VerId From PF_Instances  
inner join   
(select max(CreateDate) as CreateDate,InstanceId from sys_relationobject  
inner join PF_Instances on VerId=DesObjectId  
where SrcObjectId=t0.SrcObjectId  
group by InstanceId) as t  
on t.InstanceId=PF_Instances.InstanceId and t.CreateDate=PF_Instances.CreateDate  
where VerId=t0.DesObjectId)    

		UNION
		
		--工艺卡片反方向链接  
           SELECT t0.*,  
                  t1.VerId AS [ObjectId],  
                  t1.Name AS [Name],  
                  t1.Code AS [Code],  
                  '30' AS [ObjectOption],  
                  t1.CategoryId,  
                  t1.State AS [State],  
                  CASE len(isnull(t1.CheckOutDate,''))  
                  WHEN 0 THEN 0  
                  ELSE 1  
                  END [CheckOutState],  
                  case charindex('../../',t1.ObjectIconPath) when  0 then
					t1.ObjectIconPath
					else
					substring(t1.ObjectIconPath,4, LEN(t1.ObjectIconPath) - 3)
					end ObjectIconPath,  
                  t1.VerName  AS VerCode ,
                  t1.ObjectStatePath 
           FROM   SYS_RelationObject t0   
           INNER JOIN   PP_PCVersion t1 ON (t0.DesObjectType = 30 AND t0.DesObjectId = t1.VerId)  
             
where Exists  
(select VerId From PP_PCVersion  
inner join   
(select max(CreateDate) as CreateDate,BaseId from sys_relationobject  
inner join PP_PCVersion on VerId=DesObjectId  
where SrcObjectId=t0.SrcObjectId  
group by BaseId) as t  
on t.BaseId=PP_PCVersion.BaseId and t.CreateDate=PP_PCVersion.CreateDate  
where VerId=t0.DesObjectId)
  
           UNION    
              
           --邮件反方向链接  
           SELECT t0.*,  
                  t1.EmailId AS [ObjectId],  
                  t1.Subject AS [Name],  
                  '' AS [Code],  
                  '8' AS [ObjectOption],  
                  '' AS [CategoryId],  
                  '1' AS [State],  
                  '0' AS [CheckOutState],  
                  '../skins/ObjectIcon/Email.gif' AS [ObjectIconPath],  
                  ''  AS VerCode ,
                  '' as ObjectStatePath 
           FROM   SYS_RelationObject t0   
           INNER JOIN   dbo.Mail_Email t1 ON (t0.DesObjectType = 8 AND t0.DesObjectId = t1.EmailId)  
              
)A     
LEFT JOIN   dbo.PS_BusinessCategory B ON A.CategoryId = B.CategoryId      
  
   

GO

/****** Object:  View [dbo].[V_Mat_RelationObject_New]    Script Date: 09/17/2013 14:53:50 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



  
ALTER VIEW [dbo].[V_Mat_RelationObject_New]        
AS  
SELECT A.KeyId,      
       A.SrcObjectId,      
       A.DesObjectId,      
       A.ObjectId,      
       A.Name,      
       A.Code,      
       A.ObjectOption,      
       A.RelationType,      
       A.CategoryId,      
       B.CategoryName,      
       A.State,      
       A.CheckOutState,      
       A.ObjectIconPath,      
       A.OriginalMode,      
       A.VerCode      
FROM         
(      
 --文档正方向链接      
           SELECT t0.*,      
                  t1.VerId AS [ObjectId],      
                  t1.DocName AS [Name],      
                  t1.DocCode AS [Code],      
                  '0' AS [ObjectOption],      
                  t2.CategoryId,      
                  t1.StateId AS [State],      
                  CASE len(isnull(t1.CheckOutDate, ''))      
                  WHEN 0 THEN '0'      
                  ELSE '1'      
                  END AS [CheckOutState],      
                  t1.ObjectIconPath,      
                  t1.VerName + '.' + Convert(nvarchar, cp.CopyNo) AS VerCode      
           FROM   SYS_RelationObject t0 with(nolock)      
           INNER JOIN   DOC_DocumentVersion t1 with(nolock) ON (t0.SrcObjectType = 0 AND t0.SrcObjectId = t1.VerId)       
           INNER JOIN   Doc_DocumentCopy cp with(nolock) On t1.Verid = cp.Verid     
           INNER JOIN   doc_docobject t2 with(nolock) ON t1.docid = t2.docid       
           
where t0.SrcObjectType=0 and cp.IsActive =1    
and t1.CreateDate=(    
select max(dv.CreateDate) from DOC_DocumentVersion dv  with(nolock)  
inner join sys_relationobject ro with(nolock) on  ro.SrcObjectId=dv.verid where    
 dv.DocId=t1.DocId   
--cjf 当前物料版本有关系的文档版本中取最大时间，而不是在有关联的文档的所有版本中取最大时间  
and ((ro.DesObjectId = t0.DesObjectId) or (ro.SrcObjectId = t0.SrcObjectId))  
)   
 AND t1.IsVirtual = 0    
      
UNION   all    
           --表单正方向链接      
           SELECT t0.*,      
                  t1.VerId AS [ObjectId],      
                  t1.InstanceName AS [Name],      
                  t1.InstanceCode AS [Code],      
                  '5' AS [ObjectOption],      
                  t2.CategoryId,      
                  t1.State AS [State],      
                  CASE len(isnull(t1.CheckOutDate,''))      
                  WHEN 0 THEN 0      
                  ELSE 1      
                  END [CheckOutState],      
                  t1.ObjectIconPath,      
                  t1.VerName AS VerCode      
           FROM   SYS_RelationObject t0 with(nolock)      
           INNER JOIN   PF_Instances t1 with(nolock) ON (t0.SrcObjectType = 5 AND t0.SrcObjectId = t1.VerId)      
           INNER JOIN   PF_Templates t2 with(nolock) ON   t1.TemplateId = t2.TemplateId        
      
 where t0.SrcObjectType=5    
and t1.CreateDate=(    
select max(dv.CreateDate) from sys_relationobject ro with(nolock) inner join PF_Instances dv with(nolock) on  ro.SrcObjectId=dv.verid where    
 dv.InstanceId=t1.InstanceId)     
           UNION    all   
           
           ----工艺卡片正方向链接      
           SELECT t0.*,      
                  t1.VerId AS [ObjectId],      
                  t1.Name AS [Name],      
                  t1.Code AS [Code],      
                  '30' AS [ObjectOption],      
                  t1.CategoryId,      
                  t1.State AS [State],      
                  CASE len(isnull(t1.CheckOutDate,''))      
                  WHEN 0 THEN 0      
                  ELSE 1      
                  END [CheckOutState],      
                  case charindex('../../',t1.ObjectIconPath) when  0 then
					t1.ObjectIconPath
					else
					substring(t1.ObjectIconPath,4, LEN(t1.ObjectIconPath) - 3)
					end ObjectIconPath,       
                  t1.VerName AS VerCode      
           FROM   SYS_RelationObject t0 with(nolock)      
           INNER JOIN   PP_PCVersion t1 with(nolock) ON (t0.SrcObjectType = 30 AND t0.SrcObjectId = t1.VerId)      
      
      
 where t0.SrcObjectType=30    
and t1.CreateDate=(    
select max(dv.CreateDate) from sys_relationobject ro with(nolock) inner join PP_PCVersion dv with(nolock) on  ro.SrcObjectId=dv.verid where    
 dv.BaseId=t1.BaseId)   
	
		UNION all 
                  
           --邮件正方向链接      
           SELECT t0.*,      
                  t1.EmailId AS [ObjectId],      
                  t1.Subject AS [Name],      
                  '' AS [Code],      
                  '8' AS [ObjectOption],      
                  '' AS [CategoryId],      
                  '1' AS [State],      
                  '0' AS [CheckOutState],      
                  '../skins/ObjectIcon/Email.gif' AS [ObjectIconPath],      
                  ''  AS VerCode      
           FROM   SYS_RelationObject t0  with(nolock)     
           INNER JOIN   dbo.Mail_Email t1 with(nolock) ON  (t0.SrcObjectType = 8 AND t0.SrcObjectId = t1.EmailId)       
      
           UNION all       
                  
           --工装正方向链接      
           SELECT t0.*,      
                  t1.ToolId AS [ObjectId],      
                  t1.ToolName AS [Name],      
                  t1.ToolNo AS [Code],      
                  '13' AS [ObjectOption],      
                  t1.CategoryId,      
                  '1' AS [State],      
                  '0' AS [CheckOutState],      
                  '../skins/ObjectIcon/tool.gif' AS [ObjectIconPath],      
                  ''  AS VerCode      
           FROM   SYS_RelationObject t0 with(nolock)      
           INNER JOIN  dbo.Tool_Tool t1 with(nolock) ON  (t0.SrcObjectType = 13 AND t0.SrcObjectId = t1.ToolId)  
           
           UNION all       
                  
           --PBOM正方向链接      
           SELECT t0.*,      
                  t1.VerId AS [ObjectId],      
                  t3.Code+'('+t3.Name+')' AS [Name],      
                  t2.GroupId AS [Code],      
                  '11' AS [ObjectOption],      
                  t2.CategoryId,      
                  t1.Status AS [State],      
                  '0' AS [CheckOutState],      
                  '../skins/ObjectIcon/PBOM.gif' AS [ObjectIconPath],      
                  t1.VerCode  AS VerCode      
           FROM   SYS_RelationObject t0 with(nolock)      
           INNER JOIN  dbo.PP_PBOMVer t1 with(nolock) ON  (t0.SrcObjectType = 11 AND t0.SrcObjectId = t1.VerId)  
           INNER JOIN  dbo.PP_PBOM t2 with(nolock) ON t1.PbomId=t2.PbomId  and t2.CurrentVer=t1.Ver
           left join MAT_MaterialVersion t3 on t2.ObjectId = t3.BaseId and t3.IsEffect = 1      
           /******************************************************************************************************/      
           UNION all     
                 
            --文档反方向链接      
           SELECT t0.*,      
                  t1.VerId AS [ObjectId],      
                  t1.DocName AS [Name],      
                  t1.DocCode AS [Code],      
                  '0' AS [ObjectOption],      
                  t2.CategoryId,      
                  t1.StateId AS [State],      
                  CASE len(isnull(t1.CheckOutDate, ''))      
                  WHEN 0 THEN '0'      
                  ELSE '1'      
                  END AS [CheckOutState],      
                  t1.ObjectIconPath,      
                  t1.VerName + '.' + Convert(nvarchar, cp.CopyNo) AS VerCode     
           FROM   SYS_RelationObject t0  with(nolock)     
           INNER JOIN   DOC_DocumentVersion t1 with(nolock) ON (t0.DesObjectType = 0 AND t0.DesObjectId = t1.VerId)      
           INNER JOIN   Doc_DocumentCopy cp with(nolock) On t1.Verid = cp.Verid     
           INNER JOIN   doc_docobject t2 with(nolock) ON t1.docid = t2.docid       
      
where t0.DesObjectType=0 and cp.IsActive =1    
and t1.CreateDate=(    
select max(dv.CreateDate) from DOC_DocumentVersion dv  with(nolock)  
inner join sys_relationobject ro with(nolock) on  ro.DesObjectId=dv.verid where    
 dv.DocId=t1.DocId   
--cjf 当前物料版本有关系的文档版本中取最大时间，而不是在有关联的文档的所有版本中取最大时间  
and ((ro.DesObjectId = t0.DesObjectId) or (ro.SrcObjectId = t0.SrcObjectId))  
)   
 AND t1.IsVirtual = 0    
      
 UNION  all    
           --表单反方向链接      
           SELECT t0.*,      
                  t1.VerId AS [ObjectId],      
                  t1.InstanceName AS [Name],      
                  t1.InstanceCode AS [Code],      
                  '5' AS [ObjectOption],      
                  t2.CategoryId,      
                  t1.State AS [State],      
                  CASE len(isnull(t1.CheckOutDate,''))      
                  WHEN 0 THEN 0      
                  ELSE 1      
                  END [CheckOutState],      
                  t1.ObjectIconPath,      
                  t1.VerName  AS VerCode      
           FROM   SYS_RelationObject t0 with(nolock)      
           INNER JOIN   PF_Instances t1 with(nolock) ON (t0.DesObjectType = 5 AND t0.DesObjectId = t1.VerId)      
           INNER JOIN   PF_Templates t2 with(nolock) ON   t1.TemplateId = t2.TemplateId        
                 
where t0.DesObjectType=5    
and t1.CreateDate=(    
select max(dv.CreateDate) from sys_relationobject ro with(nolock) inner join PF_Instances dv with(nolock) on  ro.DesObjectId=dv.verid where    
 dv.InstanceId=t1.InstanceId)      
      UNION all
       
 --工艺卡片反方向链接      
           SELECT t0.*,      
                  t1.VerId AS [ObjectId],      
                  t1.Name AS [Name],      
                  t1.Code AS [Code],      
                  '30' AS [ObjectOption],      
                  t1.CategoryId,      
                  t1.State AS [State],      
                  CASE len(isnull(t1.CheckOutDate,''))      
                  WHEN 0 THEN 0      
                  ELSE 1      
                  END [CheckOutState],      
                  case charindex('../../',t1.ObjectIconPath) when  0 then
					t1.ObjectIconPath
					else
					substring(t1.ObjectIconPath,4, LEN(t1.ObjectIconPath) - 3)
					end ObjectIconPath,       
                  t1.VerName  AS VerCode      
           FROM   SYS_RelationObject t0 with(nolock)      
           INNER JOIN   PP_PCVersion t1 with(nolock) ON (t0.DesObjectType = 30 AND t0.DesObjectId = t1.VerId)      
    
                 
where t0.DesObjectType=30    
and t1.CreateDate=(    
select max(dv.CreateDate) from sys_relationobject ro with(nolock) inner join PP_PCVersion dv with(nolock) on  ro.DesObjectId=dv.verid where    
 dv.BaseId=t1.BaseId)  
 
           UNION all     
                  
           --邮件反方向链接      
           SELECT t0.*,      
                  t1.EmailId AS [ObjectId],      
                  t1.Subject AS [Name],      
                  '' AS [Code],      
                  '8' AS [ObjectOption],      
                  '' AS [CategoryId],      
                  '1' AS [State],      
                  '0' AS [CheckOutState],      
                  '../skins/ObjectIcon/Email.gif' AS [ObjectIconPath],      
                  ''  AS VerCode      
           FROM   SYS_RelationObject t0 with(nolock)      
           INNER JOIN   dbo.Mail_Email t1 with(nolock)ON (t0.DesObjectType = 8 AND t0.DesObjectId = t1.EmailId)      
       
           UNION all     
       
           --工装反方向链接      
           SELECT t0.*,      
                  t1.ToolId AS [ObjectId],      
                  t1.ToolName AS [Name],      
                  t1.ToolNo AS [Code],      
                  '13' AS [ObjectOption],      
            t1.CategoryId,      
                  '1' AS [State],      
                  '0' AS [CheckOutState],      
                  '../skins/ObjectIcon/tool.gif' AS [ObjectIconPath],      
                  ''  AS VerCode      
           FROM   SYS_RelationObject t0 with(nolock)      
           INNER JOIN  dbo.Tool_Tool t1 with(nolock) ON  (t0.DesObjectType = 13 AND t0.DesObjectId = t1.ToolId)   
           
           UNION all     
       
           --PBOM反方向链接      
           SELECT t0.*,      
                  t1.VerId AS [ObjectId],      
                  t3.Code+'('+t3.Name+')' AS [Name],      
                  t2.GroupId AS [Code],      
                  '11' AS [ObjectOption],      
                  t2.CategoryId,      
                  t1.Status AS [State],      
                  '0' AS [CheckOutState],      
                  '../skins/ObjectIcon/PBOM.gif' AS [ObjectIconPath],      
                  t1.VerCode  AS VerCode      
           FROM   SYS_RelationObject t0 with(nolock)      
           INNER JOIN  dbo.PP_PBOMVer t1 with(nolock) ON  (t0.DesObjectType = 11 AND t0.DesObjectId = t1.VerId)  
           INNER JOIN  dbo.PP_PBOM t2 with(nolock) ON t1.PbomId=t2.PbomId   and t2.CurrentVer=t1.Ver
           left join MAT_MaterialVersion t3 on t2.ObjectId = t3.BaseId and t3.IsEffect = 1       
                 
)A         
LEFT JOIN   dbo.PS_BusinessCategory B with(nolock)ON A.CategoryId = B.CategoryId 

 


GO

/****** Object:  Table [dbo].[PP_BaseResource]    Script Date: 09/26/2013 14:27:43 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[PP_BaseResource]') 
and OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [dbo].[PP_BaseResource]
CREATE TABLE [dbo].[PP_BaseResource](
	[ResourceId] [char](36) NOT NULL,
	[FieldCode] [nvarchar](40) NULL,
	[FieldName] [nvarchar](300) NULL,
	[ParentField] [nvarchar](36) NULL,	
	[ChildCount] [int] NULL,
 CONSTRAINT [PK_PP_BaseResource] PRIMARY KEY NONCLUSTERED 
(
	[ResourceId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

/****** Object:  Table [dbo].[PP_BaseResource]    Script Date: 09/26/2013 14:27:43 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

if exists (select * from sysobjects where id = object_id(N'[dbo].[PP_BaseResourceField]') 
and OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [dbo].[PP_BaseResourceField]
CREATE TABLE [dbo].[PP_BaseResourceField](
	[FieldId] [char](36) NOT NULL,
	[FieldCode] [nvarchar](40) NULL,
	[FieldName] [nvarchar](300) NULL,
	[FieldDescription] [nvarchar](300) NULL,
	[ParentField] [nvarchar](36) NOT NULL
 CONSTRAINT [PK_PP_BaseResourceField] PRIMARY KEY NONCLUSTERED 
(
	[FieldId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

/****** Object:  View [dbo].[v_MAT_MaterialVersion]    Script Date: 09/26/2013 17:12:37 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


ALTER view [dbo].[v_MAT_MaterialVersion]                                      
/*                                              
 功能：   没有权限控制的物料版本列表                                              
 创建人： 林衍慎                                            
 创建时间： 2007-10-16                                             
*/          
as        
SELECT           
t1.MaterialVerId,          
       t1.BaseId,          
       t7.Code,          
       t7.Name,          
       t1.EnglishName,          
       t1.Spec,          
       t1.Model,          
       t1.Color,          
       t1.Substance,          
       t1.VerCode,          
       t1.VerDesc,          
       t1.UsedDate,          
       t1.UnusedDate,          
       t1.IsEffect,          
       t1.UsedFor,          
       t1.Patent,          
       dbo.f_clsZero(cast(t1.Cost AS varchar)) AS Cost,          
       dbo.f_clsZero(cast(t1.Weight AS varchar)) AS Weight,          
       dbo.f_clsZero(cast(t1.GrossWeight AS varchar)) AS GrossWeight,          
       t1.DrawNumber,          
       t1.OldCode,          
       t1.Surface,          
       t1.StorePlace,          
       t1.Drawing,          
       t1.PaperCount,          
       t1.IsVirtualDesign,          
       t1.IsVirtualAssembly,          
       t1.IsFrozen,          
       CASE t1.IsRoHs          
       WHEN 1 THEN 'Y'          
       ELSE 'N'          
       END AS IsRoHs,          
       t1.StockSize,          
       (          
           SELECT Content          
           FROM   PS_BaseData          
           WHERE  DataId = t1.Unit          
       ) AS Unit,     
       t1.Unit AS UnitID,
       t1.BomUnit AS BomUnitID,
       t1.StockUnit AS StockUnitID,
       (          
           SELECT Content          
           FROM   PS_BaseData          
           WHERE  DataId = t1.BomUnit          
       ) AS BomUnit,          
       (          
           SELECT Content          
           FROM   PS_BaseData          
           WHERE  DataId = t1.StockUnit          
       ) AS StockUnit,          
       t7.CreateDate,          
       t1.UpdateDate,          
       t1.Remark,          
       t1.LastArchive,          
       t1.ArchiveDate,          
       t6.Content AS LevelName,          
       --CASE t2.TypeId        
       --WHEN '1' THEN '通用件'        
       --WHEN '2' THEN '标准件'        
       --WHEN '3' THEN '专用件'        
       --end AS TypeName,      
       SV.OptionName AS [TypeName],          
       t8.Name AS ProductName,          
       t3.UserName AS Creator,          
       t5.UserName AS Updater,          
       t4.UserName AS ArchivePerson,          
       t7.TypeId,          
       t7.CategoryId,          
       t9.CategoryName,   
       t9.K3MaterialCode,    
       t9.CategoryCode,t9.K3CategoryCode,t9.K3BOMGroup as BCK3BOMGroup, t2.K3BOMGroup,t2.K3BOMNumber, t1.IntegrationMode,      
       t1.ArticleType,          
       t1.MaterialType,          
       t1.TechnicsCycle,          
       t1.QualityCycle,          
       t1.DesignCycle,          
       t1.ProductMode,          
       --CASE t1.MaterialType          
       --     WHEN 0 THEN '产品'          
       --     WHEN 1 THEN '原材料'          
       --     WHEN 2 THEN '毛坯'          
       --     WHEN 3 THEN '零件'          
       --END AS [IntMaterialType],      
       (SELECT TOP 1 SV2.OptionName FROM Sys_ValueOption SV2 with(nolock) WHERE SV2.TypeName='22' AND t1.MaterialType = CONVERT(int,SV2.OptionCode) AND SV2.LanguageId=SV.LanguageId) AS [IntMaterialType],      
       --CASE t1.TechnicsCycle          
       --     WHEN 1 THEN '未处理'          
       --     WHEN 2 THEN '工艺提交'          
       --     WHEN 3 THEN '工艺归档'          
       --     WHEN 4 THEN '工艺发布'          
       --END AS [IntTechnicsCycle],      
       (SELECT TOP 1 SV1.OptionName FROM Sys_ValueOption SV1 with(nolock) WHERE SV1.TypeName='25' AND t1.TechnicsCycle = CONVERT(int,SV1.OptionCode) AND SV1.LanguageId=SV.LanguageId) AS [IntTechnicsCycle],          
       --CASE t1.QualityCycle          
       --     WHEN 1 THEN '未处理'          
       --     WHEN 2 THEN '品质提交'          
       --     WHEN 3 THEN '品质归档'          
       --     WHEN 4 THEN '品质发布'          
       --END AS [IntQualityCycle],      
       (SELECT TOP 1 SV3.OptionName FROM Sys_ValueOption SV3 with(nolock) WHERE SV3.TypeName='24' AND t1.QualityCycle = CONVERT(int,SV3.OptionCode) AND SV3.LanguageId=SV.LanguageId) AS [IntQualityCycle],                  
       --CASE t1.DesignCycle          
       --     WHEN 1 THEN '创建'          
       --     WHEN 2 THEN '设计提交'          
       --     WHEN 3 THEN '设计归档'          
       --     WHEN 4 THEN '设计发布'          
       --     WHEN 5 THEN '设计报废'          
  --END AS [IntDesignCycle],      
       (SELECT TOP 1 SV4.OptionName FROM Sys_ValueOption SV4 with(nolock) WHERE SV4.TypeName='21' AND t1.DesignCycle = CONVERT(int,SV4.OptionCode) AND SV4.LanguageId=SV.LanguageId) AS [IntDesignCycle],                    
       --CASE t1.ProductMode          
       --     WHEN 0 THEN '自产'          
       --     WHEN 1 THEN '外购'          
       --     WHEN 2 THEN '客供'          
       --     WHEN 3 THEN '外协'          
       --     WHEN 4 THEN '回收'        
       --     WHEN 5 THEN '虚拟'        
       --     WHEN 6 THEN '自产加外购'        
       --END AS [IntProductMode],      
       (SELECT TOP 1 SV5.OptionName FROM Sys_ValueOption SV5 with(nolock) WHERE SV5.TypeName='23' AND t1.ProductMode = CONVERT(int,SV5.OptionCode) AND SV5.LanguageId=SV.LanguageId) AS [IntProductMode],          
       CASE           
            WHEN t1.DesignCycle=t1.TechnicsCycle AND t1.DesignCycle=t1.QualityCycle AND t1.DesignCycle=1 THEN 11          
            WHEN t1.DesignCycle>t1.TechnicsCycle AND t1.DesignCycle>t1.QualityCycle THEN t1.DesignCycle+10          
            WHEN t1.TechnicsCycle>t1.QualityCycle THEN t1.TechnicsCycle+20          
            ELSE t1.QualityCycle+30          
       END AS intImage,          
       t1.IsShow,        
       t1.IsChange,   
    t1.ChangingApply,  
       t1.IsCreateNew,         
       t1.ObjectIconPath,          
       t10.IsChange AS IsShowChange,          
       t1.IsInFlow,          
       t1.DisginStateIconPath,          
       t1.TechnicsStateIconPath,          
t1.QualityStateIconPath,          
       t1.FactoryId,          
--       t11.Content as FactoryName,          
--       t11.Code as FactoryCode,          
       isnull(t1.ChildCount,0) as [Count],        
       t2.FolderId,        
       t12.FullPath,        
       t2.IsUseForProduct,        
       case t2.IsUseForProduct when 1 then 'Y' else 'N' end as IsUseForProductText,               
       case t2.IsImportERP when 1 then (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=1 and languageId=SV.LanguageId  )
else (select OptionName from Sys_ValueOption  where typename='62' and OptionCode=0 and languageId=SV.LanguageId  ) end as IsImportERP,
       t14.UserName AS ImportUser,        
       t13.UserName AS ImportUserByObject,        
       t1.ImportDate,     
       t1.Isdump, 
       t1.WeightUnit,  
       t2.ImportDate as ImportDateByObject,        
       t2.IsImportERP as IsImportERPByObject,         
       t7.CategoryId_TypeId,        
       '' as MicroImage ,SV.LanguageId ,    
    t1.MemberSpec,
    t1.MeterWeight      
FROM   MAT_MaterialVersion t1 with(nolock)        
inner join MAT_MaterialBase t2 with(nolock) on t1.BaseId=t2.BaseId        
--inner join MAT_CommonType t7 on t1.TypeId=t7.TypeId        
INNER JOIN MAT_Auxiliary t7 with(nolock) ON t1.MaterialVerId = t7.MaterialVerId        
inner join PS_BusinessCategory t9 with(nolock) on t9.CategoryId=t7.CategoryId        
LEFT JOIN MAT_MaterialVersion t8 with(nolock) ON t8.baseid = t1.ProductId AND t8.IsEffect = 1        
LEFT JOIN MAT_MaterialVersion t10 with(nolock) ON t1.BaseId = t10.BaseId AND t10.IsChange = 1        
--left join PS_BaseData t11 on t1.FactoryId = t11.DataId          
LEFT join  SM_Users t3 with(nolock) on t1.Creator=t3.UserId        
LEFT join  SM_Users t4 with(nolock) on t1.ArchivePerson=t4.UserId        
LEFT join  SM_Users t5 with(nolock) on t1.Updater=t5.UserId        
LEFT JOIN PS_BaseData t6 with(nolock) ON t1.LevelId = t6.DataId AND t6.parentDataId = 'MaterialLevel'        
LEFT join MAT_Folder t12 with(nolock) on t2.FolderId = t12.FolderId        
LEFT JOIN SM_Users t13 with(nolock) on t2.ImportUser=t13.UserId        
left join SM_Users t14 with(nolock) on t1.ImportUser=t14.UserId      
INNER JOIN Sys_ValueOption SV with(nolock) ON SV.TypeName='65' AND t7.TypeId = SV.OptionCode        
WHERE t1.IsProcessTemplate = 0  
 

GO

if not exists(select * from SM_Resources where ResourceId='F1F9F97C-DFBF-46FD-B66A-4BDBC2057441')
INSERT INTO [dbo].[SM_Resources]
           ([ResourceId]
           ,[ResourceCode]
           ,[ParentResource]
           ,[GroupId]
           ,[ResourceName])
     VALUES
           ('F1F9F97C-DFBF-46FD-B66A-4BDBC2057441'
           ,'工艺卡片'
           ,null
           ,'PCARDGROUP'
           ,'工艺卡片')
GO

if not exists(select * from SM_Resources where ResourceId='D2496960-EA57-4888-A7F0-5B3C0AB292BD')
INSERT INTO [dbo].[SM_Resources]
           ([ResourceId]
           ,[ResourceCode]
           ,[ParentResource]
           ,[GroupId]
           ,[ResourceName])
     VALUES
           ('D2496960-EA57-4888-A7F0-5B3C0AB292BD'
           ,'工艺文件夹'
           ,null
           ,'PCARDFOLDER'
           ,'工艺文件夹')
GO

if not exists(select * from PS_BusinessCategory where CategoryId='ceff050d-31bd-47dd-b282-3a68729db064')
INSERT INTO [dbo].[PS_BusinessCategory]
           ([CategoryId]
           ,[ParentCategory]
           ,[CategoryCode]
           ,[CategoryName]
           ,[Remark]
           ,[CodeRuleId]
           ,[DisplaySeq]
           ,[DeleteFlag]
           ,[MajorFormat]
           ,[MinorFormat]
           ,[Separate]
           ,[ObjectOption]
           ,[CommonType]
           ,[IsShared]
           ,[IsShareAll]
           ,[IsUseForProduct]
           ,[Creator]
           ,[FolderId]
           ,[ArtificialCost]
           ,[ProcessCostRadix]
           ,[ProcessCost]
           ,[AssisCost]
           ,[ArtificialCostType]
           ,[DocFolderId]
           ,[IsFlowByEA]
           ,[IsFlowByPStart]
           ,[IsFlowByPEnd]
           ,[IsShowPic]
           ,[IsBOMChange]
           ,[ProjectPrefixMode]
           ,[IsShowOldVersion]
           ,[FreezeCanFinish]
           ,[ECNCFFolderId]
           ,[ECNDocFolderId]
           ,[ProcessId]
           ,[ECNBandProcessId]
           ,[ChildCount]
           ,[IsAddTaskName]
           ,[K3CategoryCode]
           ,[ImportByK3]
           ,[LinkageExtend]
           ,[ProjectChangeMan]
           ,[K3MaterialCode]
           ,[ShowExtend]
           ,[K3BOMGroup]
           ,[MeterWeight])
     VALUES
           ('ceff050d-31bd-47dd-b282-3a68729db064'
           ,'3fd03475-4988-47ca-9cda-b54091231397'
           ,N'工艺文件'
           ,N'工艺文件'
           ,''
           ,'2d26ed22-8487-40ed-8b93-191460f1849d'
           ,4
           ,0
           ,'2e3f6c2c-69ef-4e74-a446-ae7944537bb9'
           ,'2e3f6c2c-69ef-4e74-a446-ae7944537bb7'
           ,0
           ,0
           ,null
           ,0
           ,0
           ,0
           ,'FFB0AC2D-C1B5-49E2-89B2-F4058523DF18'
           ,''
           ,0
           ,0
           ,0
           ,0
           ,1
           ,''
           ,0
           ,0
           ,0
           ,1
           ,0
           ,''
           ,0
           ,0
           ,''
           ,''
           ,''
           ,''
           ,0
           ,0
           ,''
           ,''
           ,1
           ,null
           ,null
           ,0
           ,''
           ,null)
GO


if not exists(select * from Sys_ValueOption where TypeDesc=N'工艺文件对象' and OptionCode='36'
and TypeName='7' and OptionName=N'工艺文件' and LanguageId='0')
INSERT INTO [dbo].[Sys_ValueOption]
           ([OptionId]
           ,[OptionCode]
           ,[OptionName]
           ,[LanguageId]
           ,[Flags]
           ,[TypeName]
           ,[TypeDesc])
     VALUES
           (NEWID()
           ,36
           ,N'工艺文件'
           ,0
           ,0
           ,7
           ,N'工艺文件对象')
GO

if not exists(select * from Sys_ValueOption where TypeDesc=N'工艺文件对象' and OptionCode='36'
and TypeName='7' and OptionName=N'工藝文件' and LanguageId='1')
INSERT INTO [dbo].[Sys_ValueOption]
           ([OptionId]
           ,[OptionCode]
           ,[OptionName]
           ,[LanguageId]
           ,[Flags]
           ,[TypeName]
           ,[TypeDesc])
     VALUES
           (NEWID()
           ,36
           ,N'工藝文件'
           ,1
           ,0
           ,7
           ,N'工艺文件对象')
GO

if not exists(select * from Sys_ValueOption where TypeDesc=N'工艺文件对象' and OptionCode='36'
and TypeName='7' and OptionName=N'ProcessCard' and LanguageId='2')
INSERT INTO [dbo].[Sys_ValueOption]
           ([OptionId]
           ,[OptionCode]
           ,[OptionName]
           ,[LanguageId]
           ,[Flags]
           ,[TypeName]
           ,[TypeDesc])
     VALUES
           (NEWID()
           ,36
           ,'ProcessCard'
           ,2
           ,0
           ,7
           ,N'工艺文件对象')
GO

if not exists(select * from WFT_ProcessType where TypeName=N'工艺文件审核流程' and [Description]=N'工艺文件审核流程'
and CodeRuleId='75f546f4-438e-4efd-96c5-60c6b08109ba')
INSERT INTO [dbo].[WFT_ProcessType]
           ([TypeId]
           ,[TypeName]
           ,[Description]
           ,[ParentType]
           ,[CodeRuleId]
           ,[IsExtern])
     VALUES
           ('06597F1A-BDB3-4CB4-BCC4-F9F20BD4F82A'
           ,N'工艺文件审核流程'
           ,N'工艺文件审核流程'
           ,''
           ,N'75f546f4-438e-4efd-96c5-60c6b08109ba'
           ,0)
GO

if not exists (select * from WFT_Process where TypeId='06597F1A-BDB3-4CB4-BCC4-F9F20BD4F82A' and ProcessName=N'工艺文件审批流程')
INSERT INTO [dbo].[WFT_Process]
           ([ProcessId]
           ,[TypeId]
           ,[ProcessName]
           ,[Description]
           ,[DocFolderId]
           ,[CFormFolderId]
           ,[IsExtern]
           ,[TemplateId]
           ,[ObjDocFolderId]
           ,[ObjCFormFolderId]
           ,[AbortMyWF]
           ,[CategoryId]
           ,[CanOpen]
           ,[MustSubject]
           ,[NotEditName]
           ,[DocCategoryId]
           ,[PlanMinutes]
           ,[FinishUserId]
           ,[FinishRoleId]
           ,[RunUserId]
           ,[RunRoleId]
           ,[IsMultiSignAutocad])
     VALUES
           (NEWID()
           ,N'06597F1A-BDB3-4CB4-BCC4-F9F20BD4F82A'
           ,N'工艺文件审批流程'
           ,''
           ,''
           ,''
           ,0
           ,''
           ,''
           ,''
           ,0
           ,''
           ,0
           ,0
           ,0
           ,''
           ,NULL
           ,''
           ,''
           ,''
           ,''
           ,0)
GO

if not exists (select * from SM_VisitRight where ParentResource='A2CE7BBA-5C05-4EBB-AC0D-DA19B31D4D99')
INSERT INTO [dbo].[SM_VisitRight]
           ([VisitRightId]
           ,[ParentResource]
           ,[ChildResource]
           ,[SourceMode]
           ,[ObjectType]
           ,[Author]
           ,[Authorized]
           ,[AuthorDate])
     VALUES
           (NEWID()
           ,N'A2CE7BBA-5C05-4EBB-AC0D-DA19B31D4D99'
           ,''
           ,0
           ,0
           ,N'FFB0AC2D-C1B5-49E2-89B2-F4058523DF18'
           ,N'FFB0AC2D-C1B5-49E2-89B2-F4058523DF18'
           ,GETDATE())
GO


if not exists (select * from PS_ColDefine where ColDefineId='C3528577-8223-40C7-AD2E-864D1E1CD887')
INSERT INTO [dbo].[PS_ColDefine]
           ([ColDefineId]
           ,[TableName]
           ,[ColCode]
           ,[ColName]
           ,[ColType]
           ,[ColLength]
           ,[Fixed]
           ,[ObjectOption]
           ,[Mandatory]
           ,[DataSourceType]
           ,[DataSource]
           ,[Paras]
           ,[DataTable]
           ,[DataValueField]
           ,[DataDisplayField]
           ,[ReadOnly]
           ,[DataType]
           ,[AssociateFlags]
           ,[Url]
           ,[ColSequence]
           ,[CanLimit]
           ,[Maxlength]
           ,[Currentlength]
           ,[ColTranditionalName]
           ,[ColEnglishName]
           ,[ColSimpleName])
     VALUES
           ('C3528577-8223-40C7-AD2E-864D1E1CD887'
           ,'Proway.PLM.Material.MaterialVersion'
           ,'MeterWeight'
           ,N'米重量'
           ,2
           ,9
           ,0
           ,1
           ,0
           ,''
           ,''
           ,''
           ,''
           ,''
           ,''
           ,0
           ,'Numberic'
           ,0
           ,''
           ,70
           ,0
           ,0
           ,0
           ,N'米重量'
           ,'Meter Weight'
           ,N'米重量')
GO


if not exists (select * from PS_ColDefineDic where ColDefineId='C3528577-8223-40C7-AD2E-864D1E1CD887' and LanguageId='0')
INSERT INTO [dbo].[PS_ColDefineDic]
           ([DicId]
           ,[ColDefineId]
           ,[ColDefineDesc]
           ,[LanguageId])
     VALUES
           (NEWID()
           ,'C3528577-8223-40C7-AD2E-864D1E1CD887'
           ,N'米重量'
           ,0)
GO

if not exists (select * from PS_ColDefineDic where ColDefineId='C3528577-8223-40C7-AD2E-864D1E1CD887' and LanguageId='-1')
INSERT INTO [dbo].[PS_ColDefineDic]
           ([DicId]
           ,[ColDefineId]
           ,[ColDefineDesc]
           ,[LanguageId])
     VALUES
           (NEWID()
           ,'C3528577-8223-40C7-AD2E-864D1E1CD887'
           ,N'米重量'
           ,-1)
GO

if not exists (select * from PS_ColDefineDic where ColDefineId='C3528577-8223-40C7-AD2E-864D1E1CD887' and LanguageId='1')
INSERT INTO [dbo].[PS_ColDefineDic]
           ([DicId]
           ,[ColDefineId]
           ,[ColDefineDesc]
           ,[LanguageId])
     VALUES
           (NEWID()
           ,'C3528577-8223-40C7-AD2E-864D1E1CD887'
           ,N'米重量'
           ,1)
GO

if not exists (select * from PS_ColDefineDic where ColDefineId='C3528577-8223-40C7-AD2E-864D1E1CD887' and LanguageId='2')
INSERT INTO [dbo].[PS_ColDefineDic]
           ([DicId]
           ,[ColDefineId]
           ,[ColDefineDesc]
           ,[LanguageId])
     VALUES
           (NEWID()
           ,'C3528577-8223-40C7-AD2E-864D1E1CD887'
           ,N'Meter Weight'
           ,2)
GO

if not exists (select * from [WFT_Application] where ApplicationId='A0066')
INSERT INTO [dbo].[WFT_Application]
           ([ApplicationId]
           ,[ApplicationName]
           ,[ApplicationType]
           ,[Path]
           ,[Method]
           ,[Url]
           ,[EnventType]
           ,[NodeStartProc]
           ,[NodeRollBackProc]
           ,[ObjectOption])
     VALUES
           ('A0066'
           ,'工艺文件归档'
           ,0
           ,'Proway.PLM.BLL,Proway.PLM.FlowBase.ReleaseBaseManager'
           ,'ProcessArchive'
           ,NULL
           ,1
           ,NULL
           ,NULL
           ,0)
GO

if not exists (select * from [WFT_Application] where ApplicationId='A0067')
INSERT INTO [dbo].[WFT_Application]
           ([ApplicationId]
           ,[ApplicationName]
           ,[ApplicationType]
           ,[Path]
           ,[Method]
           ,[Url]
           ,[EnventType]
           ,[NodeStartProc]
           ,[NodeRollBackProc]
           ,[ObjectOption])
     VALUES
           ('A0067'
           ,'工艺文件发布'
           ,0
           ,'Proway.PLM.BLL,Proway.PLM.FlowBase.ReleaseBaseManager'
           ,'ProcessRelease'
           ,'Document/DocumentRelease.aspx'
           ,1
           ,'CreateProcessCardRelease'
           ,'DestoryRelease'
           ,0)
GO

if not exists (select * from [WFT_Application] where ApplicationId='A0068')
INSERT INTO [dbo].[WFT_Application]
           ([ApplicationId]
           ,[ApplicationName]
           ,[ApplicationType]
           ,[Path]
           ,[Method]
           ,[Url]
           ,[EnventType]
           ,[NodeStartProc]
           ,[NodeRollBackProc]
           ,[ObjectOption])
     VALUES
           ('A0068'
           ,'工艺文件签字'
           ,0
           ,'Proway.PLM.BLL,Proway.PLM.FlowBase.ReleaseBaseManager'
           ,'ProcessSign'
           ,''
           ,1
           ,''
           ,''
           ,0)
GO





--测试
--查询用户
SELECT * FROM SM_Users

