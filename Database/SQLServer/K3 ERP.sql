--��ͷ  sg_Table1
--��ͷ  sg_table1Entry

--�����ֵ�
--��ṹ
SELECT * from dbo.t_TableDescription 
SELECT * from dbo.t_TableDescription where FTableName like 't_ThirdPartyComponent'  
SELECT * from dbo.t_TableDescription where FDescription LIKE '%�˵�%'
--�ֶνṹ
SELECT * FROM dbo.t_FieldDescription WHERE FTableID=230005  
SELECT * FROM dbo.t_FieldDescription WHERE FTableID=17 and FDescription like '%��ע%' 
SELECT * FROM dbo.t_FieldDescription WHERE FTableID=17 and FDescription like '%��λ%'
 

--���۶����½��޸Ľ������Ӱ�ť
SELECT * FROM ICTransactionType AS it
SELECT * FROM t_ThirdPartyComponent AS ttpc WHERE ttpc.FTypeDetailID=81
INSERT INTO t_ThirdPartyComponent
( 
	FTypeDetailID,--��������
	FIndex,			--���ֵ��1���������˳��
	FComponentName,	--�ͻ��˲����������.������
	FComponentSrv,	--���������
	FDescription	--�������
)
VALUES
( 81,-18,'Sg_Ypg.DengLuTable','','YPK��Ʒ��½���ܱ�'
)
update t_ThirdPartyComponent set FComponentName='proj_wzg.YPK_SEOrder_Summary'
	where FTypeDetailID=81 and FIndex=-18 
delete t_ThirdPartyComponent where FTypeDetailID=81 and FIndex=-18


--���۶���ά���������Ӱ�ť
--��ť���ƣ���װƷ�뵥Ʒ��ȱ�
--��ťid��btnPeiBiTable
--����1ע��һ������˵�
select * from t_MenuToolBar where FToolID in(10000)
delete from t_MenuToolBar where FToolID=10000
insert into t_MenuToolBar ( FToolID,FName,FCaption,FCaption_CHT,FCaption_EN,FImageName,
		FToolTip,FToolTip_CHT,FToolTip_EN,FControlType,FVisible,FEnable,FChecked,FShortCut,
		FCBList,FCBList_CHT,FCBList_EN,FCBStyle,FCBWidth,FIndex,FToolCaption,FToolCaption_CHT,
		FToolCaption_EN) 
	values (10000,'btnPeiBiTable','��װƷ�뵥Ʒ��ȱ�','��װƷ�뵥Ʒ��ȱ�',
		'��װƷ�뵥Ʒ��ȱ�','12','��װƷ�뵥Ʒ��ȱ�','��װƷ�뵥Ʒ��ȱ�',
		'��װƷ�뵥Ʒ��ȱ�',0,0,1,0,0,'','','',0,0,0,'��װƷ�뵥Ʒ��ȱ�',
		'��װƷ�뵥Ʒ��ȱ�','��װƷ�뵥Ʒ��ȱ�')
--����2��ʾ����˵�
--select * from IclistTemplate where FName='���۶���'
--FID:32
--FMenuID��100
--H:ViewHookBill,HookBill,UnHookBill,ReHookBill,UnReHookBill,ViewCAV,ViewFee,KickBackBill,UndoKickBackBill,Union,MakeDown,ReMakeDown,Complete,ReComplete,UnionBill,SplitBill,MakeMaterialGet,MakeLowerBills,ViewVoucher,CheckBOM,ViewMaterialDiff,ViewMaterial|V:BizUnClosed,BizClosed,ViewSeOrderQuery|FModule:1088|FModelDetail:21|
Update IclistTemplate
set FLogicStr=FLogicStr+ Case When Right(FLogicStr,1)='|' then 'V:btnPeiBiTable' else '|V:btnPeiBiTable' end
where FID =32 and  FLogicStr not like '%btnPeiBiTable%'
--����3�ӵ��ļ��˵�����
--FID ��Ӧ�����FMenuID
--39:�༭ 40���鿴 41����ʽ 
select * from t_BandToolMapping where FID=100 order BY FBandID, findex
select * from t_BandToolMapping where FID=100 and FBandID=39 and FToolID=10000
delete from t_BandToolMapping where FID=100 and FBandID=39 and FToolID=10000
insert into t_BandToolMapping(FID,FBandID,FToolID,FSubBandID,FIndex,FComName,FBeginGroup) 
values(100,39,10000,0,100,'|Sg_Ypg.PeiBiTable',1)
update t_BandToolMapping set
     FComName = '|Sg_Ypg.PeiBiTable' where Ftoolid = '10000'
--48��������
--����4����
update t_dataflowtimestamp set fname=fname


--������ͷ
SELECT * FROM dbo.SEOrder  where fbillno LIKE 'SEORD000086'   
--��������
select * from dbo.SEOrderEntry WHERE FInterID=1130 
--������Ϣ��ͼ
select * from vw_SEOrderEntry

 --������������  
SELECT * from t_itemclass 
--�������ϱ�
SELECT * FROM t_item WHERE fitemclassid=1 AND fitemid=362 

--������λ��
select * from t_MeasureUnit where FMeasureUnitID='218'

--
select * from t_Base_ProjectItem


--���ϱ�
select * from t_icitem where FItemID='443' 
select i.* from t_icitem i 
	inner join SEOrderEntry se on i.FItemID=se.FItemID
	where se.FInterID=1145
--��Ӧ�̱�
select * from t_Supplier where FItemID='443'

--�û���
select * from t_User

--��ȱ�
create table YPK_IcitemLink(
	LinkId int identity(1,1) primary key,
	ParentId int not null,
	ParentCount int not null,
	ChildId int not null,
	ChildCount decimal(18,4) null,
	FDescription varchar(500),
	Modifier int not null,
	Checked bit null
) 
alter table YPK_IcitemLink add Modifier int null
alter table YPK_IcitemLink add Checked bit null
alter table YPK_IcitemLink alter column ChildCount decimal(18,4) 
alter table YPK_IcitemLink add ParentCount int not null
alter table YPK_IcitemLink ALTER column Modifier int not null
ALTER TABLE YPK_IcitemLink DROP COLUMN LinkId  
ALTER TABLE YPK_IcitemLink add LinkId int identity(1,1) primary key not null
select * from YPK_IcitemLink
select l.ChildCount,i.FNumber,i.FName,t.FName as FSource from YPK_IcitemLink l 
	inner join t_icitem i on l.ChildId=i.FItemID 
	inner join t_item t on i.FSource=t.FItemID and l.ParentId=443
select m.FName as ������λ,ParentCount from YPK_IcitemLink l 
	inner join t_icitem i on l.ParentId=i.FItemID 
	inner join t_MeasureUnit m on m.FMeasureUnitID=i.FUnitID 
	where ParentId='443'
select distinct i.FNumber,l.ParentId,l.ParentCount from YPK_IcitemLink l 
	inner join t_icitem i on l.ParentId=i.FItemID
select i.FNumber,l.ChildCount,l.FDescription from YPK_IcitemLink l 
	inner join t_icitem i on l.ChildId=i.FItemID 
	where l.ParentId=443
update YPK_IcitemLink set Checked = 0 where ParentId=443
update YPK_IcitemLink set FDescription = '�Ǹ���' where LinkId=197
update YPK_IcitemLink set Modifier=1
update YPK_IcitemLink set ChildCount=15,FDescription='good'
	where ParentId = 443 and ChildId = 453
delete YPK_IcitemLink where LinkId=122  
insert into YPK_IcitemLink(ParentId,ParentCount,ChildId,ChildCount,FDescription,Modifier,Checked) 
	values(443,1,454,20,'����һ��',16394,1)                              
drop table YPK_IcitemLink


--���ܱ�
--��װƷ��Ϣ��
create table t_YPK_ProductSummary(
	ProId int primary key identity(1,1),
	ZzpFNumber varchar(500) not null,--��װƷ���
	OrgName varchar(500) not null,--�ͻ�
	AssemblyPart int not null, --��װƷ��0��δѡ�У�1��ѡ��
	SinglePart int not null,   --��Ʒ
	Regulations int not null,  --�¹�
	Change int not null,       --���
	SalePrice int not null,    --���۵���
	PurchasePrice int not null,--���뵥��
	ProductName int not null,  --��Ʒ����
	ProductNumber int not null,--��Ʒ����
	UserName int not null,     --�ͻ���
	Supplier int not null,     --��Ӧ��
	PartCount int not null,    --��Ʒ��
	Process int not null,      --����
	Material int not null,     --����
	PrintContent int not null, --ӡˢ����
	Rest int not null,         --��������
	Immediately int not null,  --��ʱ
	Consumed int not null,     --�ڿ�������
	ChangeDate Datetime not null,  --�����ʼ��
	Delivery int not null,     --������ʼ
	OrderStart int not null,   --������ʼ
	Others int not null,       --����
	EspeciallyCredited varchar(500),--�ر����
	ChangeInfo varchar(500),   --�������
	ChangeReason varchar(500), --�������
	Disposal varchar(500),     --�˿�������Ĵ���
	CompanyInfo varchar(500),--��˾�ڲ�����
	RemarkOne varchar(500),
	RemarkTwo varchar(500),
	BanBen varchar(500)
)
select * from t_YPK_ProductSummary
delete t_YPK_ProductSummary
drop table t_YPK_ProductSummary

--��Ʒ��Ϣ��
create table t_YPK_IcitemLinkChange(
	ChangeId int identity(1,1) primary key,
    OrgNumber varchar(500) not null,
    OrgName varchar(500) not null,
    ZzpFNumber varchar(500) not null,--��װƷ���
    ZzpFName varchar(500) not null,
    ZzpSalePrice varchar(500) not null,
    ZzpOrderPrice varchar(500) not null,
    ChildFnumber varchar(500) not null,
    ChildFname varchar(500) not null,
    ProductClassification varchar(500) not null,
    MachiningA int not null,
    MachiningB int not null,
    Bps decimal(5,4) not null,
    SalePriceOne varchar(500),
    SalePriceTwo varchar(500),
    SalePriceThree varchar(500),
    OrderPriceOne varchar(500),
    OrderPriceTwo varchar(500),
    OrderPriceThree varchar(500),
    Supplier varchar(500) not null,
    EndDate datetime,
    process varchar(500),
    profit decimal(18,2),
    mark int not null,
    knife int not null,
    oppressive int not null,
    remark varchar(500),
    pressPlate varchar(500),
    mould varchar(500),
    BanBen varchar(500)             
)
select * from t_YPK_IcitemLinkChange
drop table t_YPK_IcitemLinkChange
alter table t_YPK_IcitemLinkChange add process varchar(500)
alter table t_YPK_IcitemLinkChange add pressPlate varchar(500)
alter table t_YPK_IcitemLinkChange add mould varchar(500)
select	���=row_number() over(order by il.ParentId),
		il.*,lc.*,
		(select i.FNumber from t_item i where il.ChildId = i.FItemID) as ��Ʒ����,
		(select i.FName from t_item i where il.ChildId = i.FItemID) as ��Ʒ����,
		(select ps.IsAssemblyPart from t_YPK_ProductSummary ps where ps.SaleOrderNumber='SEORD000086') as ��װƷ,
		(select ps.IsChange from t_YPK_ProductSummary ps where ps.SaleOrderNumber='SEORD000086') as ���,
		(select ps.ChangeSource from t_YPK_ProductSummary ps where ps.SaleOrderNumber='SEORD000086') as �����Դ,
		(select ps.IsImmediately from t_YPK_ProductSummary ps where ps.SaleOrderNumber='SEORD000086') as ��ʱ,
		(select ps.ChangeDate from t_YPK_ProductSummary ps where ps.SaleOrderNumber='SEORD000086') as �����ʼ��,
		(select ps.ChangeCondition from t_YPK_ProductSummary ps where ps.SaleOrderNumber='SEORD000086') as �������,
		(select ps.SpecialInput from t_YPK_ProductSummary ps where ps.SaleOrderNumber='SEORD000086') as �ر����,
		(select ps.ChangeContent from t_YPK_ProductSummary ps where ps.SaleOrderNumber='SEORD000086') as �������,
		(select ps.ChangeReason from t_YPK_ProductSummary ps where ps.SaleOrderNumber='SEORD000086') as �������,
		(select ps.CustomerProductManage from t_YPK_ProductSummary ps where ps.SaleOrderNumber='SEORD000086') as �˿�������Ĵ���,
		(select ps.CompanyCode from t_YPK_ProductSummary ps where ps.SaleOrderNumber='SEORD000086') as ��˾�ڲ�����
	from YPK_IcitemLink il
	left outer join t_YPK_IcitemLinkChange lc on il.ChildId = lc.ChildID
	where il.ParentId='2012'

--����̨�Զ���˵���
select * from t_UserDetailFunc





