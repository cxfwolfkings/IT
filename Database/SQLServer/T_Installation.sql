use Installation
go

SELECT * FROM T_Employee
update T_Employee set CreatedBy='Admin',CreatedDate=GETDATE() where EmployeeId>1182
SELECT * FROM T_EmployeeProvince
SELECT * FROM T_EmployeeProductType

insert into T_EmployeeRole(EmployeeId,RoleId,CreatedBy,CreatedDate)
	select EmployeeId,12,'Admin',GETDATE() from T_Employee where EmployeeId>1182

select * from T_EmployeeRole

SELECT * FROM T_Role
insert into T_Role values('Watcher', N'观察者',1,1,'system',GETDATE(), 'system',GETDATE())

select * from T_Menu where ParentMenuId=5
delete T_Menu where ParentMenuId=5

select * from T_RoleMenu
begin tran
delete T_RoleMenu from T_RoleMenu rm inner join T_Menu m on rm.MenuId = m.MenuId and rm.RoleId >=13
commit

SELECT * FROM T_PoStatus
SELECT * FROM T_POSN
SELECT * FROM T_SoStatus
SELECT * FROM T_WBSWaterflow
SELECT * FROM T_Delivery
SELECT * FROM T_EquipmentConfigItem


select * from T_Province

drop table T_Equipment
go
create table T_Equipment(
  Id int primary key identity(1,1),
  [SN] [varchar](25) NOT NULL,
  Province [varchar](15),
  Distribution [varchar](15),
  QuoteNr nvarchar(50),
  [PO] [varchar](50),
  [GV] [varchar](25),
  [SO] [nvarchar](50),
  [WBS] [varchar](50),
  [Defer] [varchar](10),
  [DealerNo] [varchar](15),
  DealerNameEN varchar(200),
  DealerCN nvarchar(50),
  ShiptoPartyNameEN varchar(200),
  ShiptoPartyCN nvarchar(50),
  ShiptoPartyNo varchar(15),
  CustomCN nvarchar(50),
  CustomerNo varchar(15),
  SalesChannel nvarchar(20),
  OIAmount [decimal](18, 2),
  TOAmount [decimal](18, 2),
  FiscalYear varchar(10),
  Period varchar(10),
  [Quarter] varchar(10),
  DetailPeriod varchar(20),
  Region varchar(20),
  MaterialDescription varchar(20), -- 对应ProductType
  MarketSegment varchar(10),
  [WBSInstallation] [varchar](50),
  [WBSApplication] [varchar](50),
  WBSClassroom [nvarchar](50),
  DeliveryDate datetime,
  WarrantyTerm [varchar](20),
  WBSPOS [nvarchar](50),
  POSMonths int,
  ExchRate decimal(18, 6),
  POSAmount decimal(18, 2),
  WBSPM [varchar](50),
  PMAmount decimal(18, 2),
  [Status] int,
  [CreatedBy] [nvarchar](50) NOT NULL,
  [CreatedDate] [datetime] NOT NULL,
  [ModifiedBy] [nvarchar](50) NULL,
  [ModifiedDate] [datetime] NULL,
);
select * from T_Equipment

select * from T_EquipmentStatus

select * from T_LogTracking

select * from T_Province

select * from T_Product

delete T_InstRequestWorkflow
delete T_InstRequestMain
delete T_InstRequestHistory
DROP TABLE T_SoStatus
truncate table T_LogTracking

select * from T_InstRequestMain
	where Deleted = 'false'
select * from T_InstRequestWorkflow where RequestId=141
update T_InstRequestWorkflow set RequestStatus=4 where RequestId=141
select * from T_InstRequestHistory
select * from T_InstRequestStatus
select * from T_EndUser

select object_name(a.parent_object_id) 'tables'
	from sys.foreign_keys a
	where a.referenced_object_id=object_id('T_InstRequestMain')

select * from T_Equipment e where exists(
	select EmployeeId from T_EmployeeProductType ept
	 inner join T_Product p on p.ProductId=ept.ProductTypeId
	 where p.Product=e.MaterialDescription
	 and EPT.EmployeeId=1147)
select * from T_Equipment e where exists(
	select EmployeeId from T_EmployeeProvince ept
	 where ept.ProvinceName=e.Province
	 and EPT.EmployeeId=1147)

select * from T_MailTask
delete T_MailTask where MailTo = 'm'
update T_MailTask set MailTo = MailTo+'m' where RIGHT(MailTo,1)!='m'