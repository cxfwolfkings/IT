--表头  sg_Table1
--表头  sg_table1Entry

--数据字典
--表结构
SELECT * from dbo.t_TableDescription 
SELECT * from dbo.t_TableDescription where FTableName like 't_ThirdPartyComponent'  
SELECT * from dbo.t_TableDescription where FDescription LIKE '%菜单%'
--字段结构
SELECT * FROM dbo.t_FieldDescription WHERE FTableID=230005  
SELECT * FROM dbo.t_FieldDescription WHERE FTableID=17 and FDescription like '%备注%' 
SELECT * FROM dbo.t_FieldDescription WHERE FTableID=17 and FDescription like '%单位%'
 

--销售订单新建修改界面增加按钮
SELECT * FROM ICTransactionType AS it
SELECT * FROM t_ThirdPartyComponent AS ttpc WHERE ttpc.FTypeDetailID=81
INSERT INTO t_ThirdPartyComponent
( 
	FTypeDetailID,--单据类型
	FIndex,			--最大值加1（插件调用顺序）
	FComponentName,	--客户端插件（工程名.类名）
	FComponentSrv,	--服务器插件
	FDescription	--插件描述
)
VALUES
( 81,-18,'Sg_Ypg.DengLuTable','','YPK产品登陆汇总表'
)
update t_ThirdPartyComponent set FComponentName='proj_wzg.YPK_SEOrder_Summary'
	where FTypeDetailID=81 and FIndex=-18 
delete t_ThirdPartyComponent where FTypeDetailID=81 and FIndex=-18


--销售订单维护界面增加按钮
--按钮名称：组装品与单品配比表
--按钮id：btnPeiBiTable
--步骤1注册一个插件菜单
select * from t_MenuToolBar where FToolID in(10000)
delete from t_MenuToolBar where FToolID=10000
insert into t_MenuToolBar ( FToolID,FName,FCaption,FCaption_CHT,FCaption_EN,FImageName,
		FToolTip,FToolTip_CHT,FToolTip_EN,FControlType,FVisible,FEnable,FChecked,FShortCut,
		FCBList,FCBList_CHT,FCBList_EN,FCBStyle,FCBWidth,FIndex,FToolCaption,FToolCaption_CHT,
		FToolCaption_EN) 
	values (10000,'btnPeiBiTable','组装品与单品配比表','组装品与单品配比表',
		'组装品与单品配比表','12','组装品与单品配比表','组装品与单品配比表',
		'组装品与单品配比表',0,0,1,0,0,'','','',0,0,0,'组装品与单品配比表',
		'组装品与单品配比表','组装品与单品配比表')
--步骤2显示插件菜单
--select * from IclistTemplate where FName='销售订单'
--FID:32
--FMenuID：100
--H:ViewHookBill,HookBill,UnHookBill,ReHookBill,UnReHookBill,ViewCAV,ViewFee,KickBackBill,UndoKickBackBill,Union,MakeDown,ReMakeDown,Complete,ReComplete,UnionBill,SplitBill,MakeMaterialGet,MakeLowerBills,ViewVoucher,CheckBOM,ViewMaterialDiff,ViewMaterial|V:BizUnClosed,BizClosed,ViewSeOrderQuery|FModule:1088|FModelDetail:21|
Update IclistTemplate
set FLogicStr=FLogicStr+ Case When Right(FLogicStr,1)='|' then 'V:btnPeiBiTable' else '|V:btnPeiBiTable' end
where FID =32 and  FLogicStr not like '%btnPeiBiTable%'
--步骤3加到文件菜单下面
--FID 对应上面的FMenuID
--39:编辑 40：查看 41：格式 
select * from t_BandToolMapping where FID=100 order BY FBandID, findex
select * from t_BandToolMapping where FID=100 and FBandID=39 and FToolID=10000
delete from t_BandToolMapping where FID=100 and FBandID=39 and FToolID=10000
insert into t_BandToolMapping(FID,FBandID,FToolID,FSubBandID,FIndex,FComName,FBeginGroup) 
values(100,39,10000,0,100,'|Sg_Ypg.PeiBiTable',1)
update t_BandToolMapping set
     FComName = '|Sg_Ypg.PeiBiTable' where Ftoolid = '10000'
--48：工具栏
--步骤4更新
update t_dataflowtimestamp set fname=fname


--订单表头
SELECT * FROM dbo.SEOrder  where fbillno LIKE 'SEORD000086'   
--订单表体
select * from dbo.SEOrderEntry WHERE FInterID=1130 
--订单信息视图
select * from vw_SEOrderEntry

 --基础资料类别表  
SELECT * from t_itemclass 
--基础资料表
SELECT * FROM t_item WHERE fitemclassid=1 AND fitemid=362 

--计量单位表
select * from t_MeasureUnit where FMeasureUnitID='218'

--
select * from t_Base_ProjectItem


--物料表
select * from t_icitem where FItemID='443' 
select i.* from t_icitem i 
	inner join SEOrderEntry se on i.FItemID=se.FItemID
	where se.FInterID=1145
--供应商表
select * from t_Supplier where FItemID='443'

--用户表
select * from t_User

--配比表
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
select m.FName as 计量单位,ParentCount from YPK_IcitemLink l 
	inner join t_icitem i on l.ParentId=i.FItemID 
	inner join t_MeasureUnit m on m.FMeasureUnitID=i.FUnitID 
	where ParentId='443'
select distinct i.FNumber,l.ParentId,l.ParentCount from YPK_IcitemLink l 
	inner join t_icitem i on l.ParentId=i.FItemID
select i.FNumber,l.ChildCount,l.FDescription from YPK_IcitemLink l 
	inner join t_icitem i on l.ChildId=i.FItemID 
	where l.ParentId=443
update YPK_IcitemLink set Checked = 0 where ParentId=443
update YPK_IcitemLink set FDescription = '是个人' where LinkId=197
update YPK_IcitemLink set Modifier=1
update YPK_IcitemLink set ChildCount=15,FDescription='good'
	where ParentId = 443 and ChildId = 453
delete YPK_IcitemLink where LinkId=122  
insert into YPK_IcitemLink(ParentId,ParentCount,ChildId,ChildCount,FDescription,Modifier,Checked) 
	values(443,1,454,20,'测试一下',16394,1)                              
drop table YPK_IcitemLink


--汇总表
--组装品信息表
create table t_YPK_ProductSummary(
	ProId int primary key identity(1,1),
	ZzpFNumber varchar(500) not null,--组装品编号
	OrgName varchar(500) not null,--客户
	AssemblyPart int not null, --组装品，0：未选中，1：选中
	SinglePart int not null,   --单品
	Regulations int not null,  --新规
	Change int not null,       --变更
	SalePrice int not null,    --销售单价
	PurchasePrice int not null,--购入单价
	ProductName int not null,  --产品名称
	ProductNumber int not null,--产品代码
	UserName int not null,     --客户名
	Supplier int not null,     --供应商
	PartCount int not null,    --部品数
	Process int not null,      --工艺
	Material int not null,     --材质
	PrintContent int not null, --印刷内容
	Rest int not null,         --其他（）
	Immediately int not null,  --即时
	Consumed int not null,     --在库消耗完
	ChangeDate Datetime not null,  --变更开始日
	Delivery int not null,     --交货开始
	OrderStart int not null,   --订单开始
	Others int not null,       --其他
	EspeciallyCredited varchar(500),--特别记入
	ChangeInfo varchar(500),   --变更内容
	ChangeReason varchar(500), --变更理由
	Disposal varchar(500),     --顾客所有物的处置
	CompanyInfo varchar(500),--公司内部代码
	RemarkOne varchar(500),
	RemarkTwo varchar(500),
	BanBen varchar(500)
)
select * from t_YPK_ProductSummary
delete t_YPK_ProductSummary
drop table t_YPK_ProductSummary

--单品信息表
create table t_YPK_IcitemLinkChange(
	ChangeId int identity(1,1) primary key,
    OrgNumber varchar(500) not null,
    OrgName varchar(500) not null,
    ZzpFNumber varchar(500) not null,--组装品编号
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
select	序号=row_number() over(order by il.ParentId),
		il.*,lc.*,
		(select i.FNumber from t_item i where il.ChildId = i.FItemID) as 单品代码,
		(select i.FName from t_item i where il.ChildId = i.FItemID) as 单品名称,
		(select ps.IsAssemblyPart from t_YPK_ProductSummary ps where ps.SaleOrderNumber='SEORD000086') as 组装品,
		(select ps.IsChange from t_YPK_ProductSummary ps where ps.SaleOrderNumber='SEORD000086') as 变更,
		(select ps.ChangeSource from t_YPK_ProductSummary ps where ps.SaleOrderNumber='SEORD000086') as 变更来源,
		(select ps.IsImmediately from t_YPK_ProductSummary ps where ps.SaleOrderNumber='SEORD000086') as 即时,
		(select ps.ChangeDate from t_YPK_ProductSummary ps where ps.SaleOrderNumber='SEORD000086') as 变更开始日,
		(select ps.ChangeCondition from t_YPK_ProductSummary ps where ps.SaleOrderNumber='SEORD000086') as 变更条件,
		(select ps.SpecialInput from t_YPK_ProductSummary ps where ps.SaleOrderNumber='SEORD000086') as 特别计入,
		(select ps.ChangeContent from t_YPK_ProductSummary ps where ps.SaleOrderNumber='SEORD000086') as 变更内容,
		(select ps.ChangeReason from t_YPK_ProductSummary ps where ps.SaleOrderNumber='SEORD000086') as 变更理由,
		(select ps.CustomerProductManage from t_YPK_ProductSummary ps where ps.SaleOrderNumber='SEORD000086') as 顾客所有物的处置,
		(select ps.CompanyCode from t_YPK_ProductSummary ps where ps.SaleOrderNumber='SEORD000086') as 公司内部代码
	from YPK_IcitemLink il
	left outer join t_YPK_IcitemLinkChange lc on il.ChildId = lc.ChildID
	where il.ParentId='2012'

--主控台自定义菜单表
select * from t_UserDetailFunc





