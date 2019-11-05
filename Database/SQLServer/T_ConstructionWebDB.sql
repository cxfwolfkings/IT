use ConstructionWebDB
go
select * from T_Construction
alter table T_Construction add ApprovalDate datetime
alter table T_Construction add Remarks nvarchar(4000)
alter table T_Construction add Attachment nvarchar(200)
alter table T_Construction add Contractor_Name nvarchar(200)
alter table T_Construction add Archive_No nvarchar(60)

select * from T_ConstructionWorker
alter table T_ConstructionWorker add Leave_Date datetime
select top 10 * from T_ConstructionWorker where CW_ID >
      isnull((select max(CW_ID) from (select top ((2 - 1) * 10) CW_ID from T_ConstructionWorker where Construction_ID = 3 order by CW_ID) a),0)
	  and Construction_ID = 3
      order by CW_ID

update T_Contract set Child_Contract_Flag = 1 where SR_No like N'%'+ 'LX-2019-0001' +'%' and (
select count(Contract_ID) from T_Contract where 1=1
and SR_No like N'%LX-2019-0001%') > 1
select * from T_Contract where SR_No like N'%'+ 'LX-2019-0001' +'%'
Alter Table T_Contract Add Constraint UQ_Contract_No unique(Contract_No) 
alter table T_Contract add Contract_Month varchar(10)
alter table T_Contract add Attachment nvarchar(200)
alter table T_Contract add Old_Archive_No nvarchar(60)

select * from T_ContractProgress

select * from T_Demand
delete from T_Demand where Inquiry_ID > 27
Alter Table T_Demand Add Constraint UQ_Inquiry_No unique(Inquiry_No) 

alter table T_Demand add Attachment nvarchar(200)

select * from T_DemandProgress

select * from T_Feedback
Alter Table T_Feedback Add Constraint UQ_FB_Code unique(FB_Code) 
alter table T_Feedback add Penalty_Date datetime
alter table T_Feedback add Attachment nvarchar(200)
alter table T_Feedback add Archive_No nvarchar(60)

select * from T_ServiceRequestion
Alter Table T_ServiceRequestion Add Constraint UQ_SR_No unique(SR_No) 
alter table T_ServiceRequestion add Attachment nvarchar(200)
alter table T_ServiceRequestion add Receive_Time datetime

select * from T_ServiceRequestionProgress

select * from TM_Contractor

select * from TM_Dept
delete from TM_Dept where Dept_ID = 375
update TM_Dept set Valid = 1

select * from TM_Dictionary where Data_Type = N'立项类型'
update TM_Dictionary set Valid = 0 where Data_Name in (N'改建', N'扩建')
delete from TM_Dictionary where Data_Type = N'立项单类型'
insert into TM_Dictionary(Data_Name, Data_Type,Valid) values
(N'改扩建',N'需求任务类型',1),
(N'$',N'币种',1)


select * from TM_Menu
insert into TM_Menu(Menu_Name,Menu_Parent,Menu_Route,Valid) values
(N'开工报表',7,'/Report/ConstructionIndex',1)

select * from TM_Progress
delete from TM_Progress where Process_ID = 63
SET IDENTITY_INSERT [dbo].[TM_Progress] ON 
insert into TM_Progress(Process_ID, Process_Code, Process_Name, [Type], Order_No, Valid) values
(28,'P100',N'接收任务',N'需求单',1,1)
SET IDENTITY_INSERT [dbo].[TM_Progress] OFF

select * from TM_RoleAuthority 
update TM_RoleAuthority set Role = N'内业组' where Role = N'业内组'
insert into TM_RoleAuthority([Role],Authority,Updater,Update_Time) values
(N'业内组',N'字典维护',N'Admin',GETDATE())

select * from TM_Staff 

/*
truncate table TM_Contractor
truncate table TM_Dept
truncate table TM_Dictionary
truncate table TM_Progress
truncate table TM_Staff

truncate table T_Construction
truncate table T_ConstructionWorker
truncate table T_Contract
truncate table T_ContractProgress
truncate table T_Demand
truncate table T_DemandProgress
truncate table T_Feedback
truncate table T_ServiceRequestion
truncate table T_ServiceRequestionProgress
*/

select * from (select ROW_NUMBER() OVER(ORDER BY Contract_No desc) as rownumber,c.*, (
      case when Contract_Settlement_Amount is not null then Contract_Settlement_Amount - isnull(Paid_Amount, 0)
      when Contract_Amount is not null then Contract_Amount - isnull(Paid_Amount, 0)
      else ''
      end
      ) as UnPaid_Amount from T_Contract c
      left join TM_Staff s on c.Staff_Name = s.Staff_Name and s.Valid = 1 
) as a





