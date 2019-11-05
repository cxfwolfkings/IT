/******************************************************************************
 * ID:                 PLM项目于ERP集成                                            *
 * DESCRIPTION:        PLM根据BOM编号和PLM物料内码获取变更影响                              *
 * BY:                 yang_y_liu                                              *
 * DATE:               2013-01-05                                             *
******************************************************************************/
--PLM根据BOM编号和PLM物料内码获取变更影响
IF EXISTS(SELECT 1 FROM sysobjects WHERE id = object_id(N'sp_PLMGetChangeInfo') AND OBJECTPROPERTY(id, N'IsProcedure') = 1)
BEGIN
    DROP PROCEDURE sp_PLMGetChangeInfo
END
GO
CREATE PROCEDURE sp_PLMGetChangeInfo --'BOM000059',null
	@BomNumber VARCHAR(MAX) = '',--BOM编码,多个BOM编码用逗号分隔
	@ItemNumber VARCHAR(MAX) = ''--PLM物料内码，多个物料内码用逗号分隔
AS
BEGIN
	set nocount on
	create table #TempICECN(
		[FIndex] [int] NOT NULL DEFAULT (0), --排序字段
		[FECNNo] [varchar](250) NOT NULL DEFAULT (''), --变更单编号
		[FItemNo] [varchar](250) NOT NULL DEFAULT (''), --物料代码
		[FItemName] [varchar](250) NOT NULL DEFAULT (''),
		[FModel] [varchar](250) NULL ,  --规格型号
		[FBOMNo] [varchar](250) NOT NULL DEFAULT (''),  --变更BOM号
		[FBillType] [varchar](250) NOT NULL DEFAULT (''), --单据类型
		[FBillNo] [varchar](250) NOT NULL DEFAULT (''), --单据编号
		[FBillStatus] [varchar](250) NOT NULL DEFAULT (''), --单据状态
		[FEntry] [varchar](250) NOT NULL DEFAULT (''), --分录号
		[FUnitName] [varchar](250) NOT NULL DEFAULT (''), --基本单位
		[FStockQty] [decimal](23, 10) NOT NULL DEFAULT (''), --库存/计划数量
		[FFinishQty] [decimal](23, 10) NULL , --完工数量
		[FStartDate] [datetime] NULL , --计划采购/开工日期
		[FEndDate] [datetime] NULL , --计划到货/完工日期
		[FTranType] [int] NOT NULL DEFAULT (0), --单据类型ID
		[FInterID] [int] NOT NULL DEFAULT (0), --单据内码
		[FSumSort] [int] NOT NULL DEFAULT (0),--非合计行
		[FClassTypeID] [int] Not Null Default(0),   --新单的单据类型
		[FSwitch] [tinyint] Default(0)  --0-老单；1-新单
	)
	create table #TempCustBOM(
		[FItemID] [int] NOT NULL, --
		[FBOMInterID] [int] NOT NULL , --
		[FBOMNumber] [varchar](250) NOT NULL DEFAULT (''),
	)
	
	insert into #TempCustBOM(FItemID,FBOMInterID,FBOMNumber)
	select distinct u1.FItemID,u2.FInterID FBOMInterID,u2.FBOMNumber from ICBOM u1
	inner join t_ICItem t4 on u1.FItemID=t4.FItemID
	inner join icbom u2 on u2.FItemID=u1.FItemID and u2.FParentID=u1.FInterID and u2.FBOMType=3
	where t4.FErpClsID=7 and u1.FBOMNumber IN(SELECT FValue AS FBOMNumber from fn_SplitStringToTable(@BomNumber,','))
	Union
	select distinct u1.FItemID,u2.FInterID FBOMInterID,u2.FBOMNumber from
	(select v2.FItemID,v1.FInterID from ICBOMChild v1
	inner join ICBOM v2 on v1.FInterID=v2.FInterID and v2.FBOMNumber IN(SELECT FValue AS FBOMNumber from fn_SplitStringToTable(@BomNumber,',')) ) u1
	inner join t_ICItem t4 on u1.FItemID=t4.FItemID
	inner join icbom u2 on u2.FItemID=u1.FItemID and u2.FParentID=u1.FInterID and u2.FBOMType=3
	Where t4.FErpClsID = 7

	insert into #TempICECN (FECNNo,FItemNo,FItemName,FModel,FBOMNo,FBillType,FBillNo,FBillStatus,FEntry,FUnitName,FStockQty,FFinishQty,FStartDate,FEndDate,FTranType,FInterID,FClassTypeID,FSwitch)
	select '',t4.FNumber,t4.FName,t4.FModel,v.FBOMNumber,N'生产任务单',u1.FBillNo,case when u1.FStatus = 0 then N'计划' else ( case when  u1.FStatus = 1 then N'下达' else  N'确认' end) end,'',t7.FName,u1.FQty,u1.FStockQty,u1.FPlanCommitDate,u1.FPlanFinishDate,u1.FTrantype,u1.FInterID,u1.FTrantype,0 from ICMO u1
	inner join t_ICItem t4 on u1.FItemID=t4.FItemID
	inner join t_MeasureUnit t7 on t7.FMeasureUnitID=t4.FUnitID
	inner join #TempCustBOM v on v.FItemID=u1.FItemID and v.FBOMInterID=u1.FBomInterID
	where u1.FTranType=85 and u1.FCanCellation=0 and (u1.FStatus in (1,2,5) or  (u1.FPlanConfirmed=1 and u1.FStatus=0) ) 
	insert into #TempICECN (FECNNo,FItemNo,FItemName,FModel,FBOMNo,FBillType,FBillNo,FBillStatus,FEntry,FUnitName,FStockQty,FFinishQty,FStartDate,FEndDate,FTranType,FInterID,FClassTypeID,FSwitch)
	select '',t4.FNumber,t4.FName,t4.FModel,v.FBOMNumber,N'重复生产计划单',u1.FBillNo,N'审核','',t7.FName,u1.FQty,u1.FReleasedQty,u1.FPlanCommitDate,u1.FPlanFinishDate,u1.FTrantype,u1.FInterID,u1.FTrantype,0 from ICMO u1
	inner join t_ICItem t4 on u1.FItemID=t4.FItemID
	inner join t_MeasureUnit t7 on t7.FMeasureUnitID=t4.FUnitID
	inner join #TempCustBOM v on v.FItemID=u1.FItemID and v.FBOMInterID=u1.FBomInterID
	Where u1.FTranType = 54 And u1.FCanCellation = 0 And u1.FStatus = 1
	insert into #TempICECN (FECNNo,FItemNo,FItemName,FModel,FBOMNo,FBillType,FBillNo,FBillStatus,FEntry,FUnitName,FStockQty,FFinishQty,FStartDate,FEndDate,FTranType,FInterID,FClassTypeID,FSwitch)
	select '',t4.FNumber,t4.FName,t4.FModel,v.FBOMNumber,N'委外订单',v1.FBillNo,N'审核',u1.FEntryID,t7.FName,u1.FQty,u1.FCommitQty,u1.FPayShipDate,u1.FFetchDate,v1.FClassTypeID,u1.FInterID,v1.FClassTypeID,1 from ICSubContractentry u1
	inner join ICSubContract v1 on u1.FInterID=v1.FInterID
	inner join t_ICItem t4 on t4.FItemID=u1.FItemID
	inner join t_MeasureUnit t7 on t7.FMeasureUnitID=t4.FUnitID
	inner join #TempCustBOM v on v.FItemID=u1.FItemID and v.FBOMInterID=u1.FBomInterID
	Where v1.FCanCellation = 0 And u1.FMrpClosed = 0 And v1.FClassTypeID = 1007105 And IsNull(v1.FCheckerID, 0) > 0
	insert into #TempICECN (FECNNo,FItemNo,FItemName,FModel,FBOMNo,FBillType,FBillNo,FBillStatus,FEntry,FUnitName,FStockQty,FFinishQty,FStartDate,FEndDate,FTranType,FInterID,FClassTypeID,FSwitch)
	select '',t4.FNumber,t4.FName,t4.FModel,v.FBOMNumber,N'销售订单',v1.FBillNo,N'审核',u1.FEntryID,t7.FName,u1.FQty,u1.FStockQty,null,u1.FAdviceConsignDate,v1.FTrantype,u1.FInterID,v1.FTrantype,0 from SeorderEntry u1
	inner join Seorder v1 on u1.FInterID=v1.FInterID
	inner join t_ICItem t4 on t4.FItemID=u1.FItemID
	inner join t_MeasureUnit t7 on t7.FMeasureUnitID=t4.FUnitID
	inner join #TempCustBOM v on v.FItemID=u1.FItemID and v.FBOMInterID=u1.FBomInterID
	Where v1.FCanCellation = 0 And u1.FMrpClosed = 0 And v1.FTranType = 81 And v1.FClassTypeID = 0 And IsNull(v1.FCheckerID, 0) > 0
	insert into #TempICECN (FECNNo,FItemNo,FItemName,FModel,FBOMNo,FBillType,FBillNo,FBillStatus,FEntry,FUnitName,FStockQty,FFinishQty,FStartDate,FEndDate,FTranType,FInterID,FClassTypeID,FSwitch)
	select '',t4.FNumber,t4.FName,t4.FModel,v.FBOMNumber,N'外销订单',v1.FBillNo,N'审核',u1.FEntryID,t7.FName,u1.FQty,u1.FStockQty,null,u1.FAdviceConsignDate,v1.FTrantype,u1.FInterID,v1.FTrantype,0 from SeorderEntry u1
	inner join Seorder v1 on u1.FInterID=v1.FInterID
	inner join t_ICItem t4 on t4.FItemID=u1.FItemID
	inner join t_MeasureUnit t7 on t7.FMeasureUnitID=t4.FUnitID
	inner join #TempCustBOM v on v.FItemID=u1.FItemID and v.FBOMInterID=u1.FBomInterID
	Where v1.FCanCellation = 0 And u1.FMrpClosed = 0 And v1.FTranType = 81 And v1.FClassTypeID = 1007100 And IsNull(v1.FCheckerID, 0) > 0
	insert into #TempICECN (FECNNo,FItemNo,FItemName,FModel,FBOMNo,FBillType,FBillNo,FBillStatus,FEntry,FUnitName,FStockQty,FFinishQty,FStartDate,FEndDate,FTranType,FInterID,FClassTypeID,FSwitch)
	select '',t4.FNumber,t4.FName,t4.FModel,v.FBOMNumber,N'产品预测单',v1.FBillNo,N'审核',u1.FEntryID,t7.FName,u1.FQty,u1.FSaleQty,null,u1.FNeedDate,v1.FTrantype,u1.FInterID,v1.FTrantype,0 from PPOrderEntry u1
	inner join PPOrder v1 on u1.FInterID=v1.FInterID
	inner join t_ICItem t4 on t4.FItemID=u1.FItemID
	inner join t_MeasureUnit t7 on t7.FMeasureUnitID=t4.FUnitID
	inner join #TempCustBOM v on v.FItemID=u1.FItemID and v.FBOMInterID=u1.FBomInterID
	Where u1.FOrderClosed = 0 And v1.FCanCellation = 0 And IsNull(v1.FCheckerID, 0) > 0 And v1.FTranType = 87
	insert into #TempICECN (FECNNo,FItemNo,FItemName,FModel,FBOMNo,FBillType,FBillNo,FBillStatus,FEntry,FUnitName,FStockQty,FFinishQty,FStartDate,FEndDate,FTranType,FInterID,FClassTypeID,FSwitch)
	select '',t4.FNumber,t4.FName,t4.FModel,v.FBOMNumber,N'计划订单',u1.FBillNo,N'审核','',t7.FName,u1.FPlanQty,0,u1.FPlanBeginDate,u1.FPlanEndDate,u1.FTrantype,u1.FInterID,u1.Ftrantype,0 from ICMrpResult u1
	inner join t_ICItem t4 on t4.FItemID=u1.FItemID
	inner join t_MeasureUnit t7 on t7.FMeasureUnitID=t4.FUnitID
	inner join #TempCustBOM v on v.FItemID=u1.FItemID and v.FBOMInterID=u1.FBOM
	Where u1.FStatus <> 3 And IsNull(u1.FCheckerID, 0) > 0
	create table #TempBOM(
		[FItemID] [int] NOT NULL, --
		[FBOMInterID] [int] NOT NULL , --
		[FBOMNumber] [varchar](250) NOT NULL DEFAULT (''),
	)

	insert into #TempBOM(FItemID,FBOMInterID,FBOMNumber)
	select distinct u1.FItemID,u1.FInterID FBOMInterID,u1.FBOMNumber from ICBOM u1
	inner join t_ICItem t4 on u1.FItemID=t4.FItemID
	where t4.FErpClsID<>7 and u1.FBOMNumber IN(SELECT FValue AS FBOMNumber from fn_SplitStringToTable(@BomNumber,','))
	Union
	select distinct u1.FItemID,u2.FInterID FBOMInterID,u2.FBOMNumber from
	(select v2.FItemID,v1.FInterID from ICBOMChild v1
	inner join ICBOM v2 on v1.FInterID=v2.FInterID and v2.FBOMNumber IN(SELECT FValue AS FBOMNumber from fn_SplitStringToTable(@BomNumber,','))
	)u1
	inner join t_ICItem t4 on u1.FItemID=t4.FItemID
	inner join icbom u2 on u2.FItemID=u1.FItemID and u2.FInterID=u1.FInterID
	Where t4.FErpClsID <> 7

	insert into #TempICECN (FECNNo,FItemNo,FItemName,FModel,FBOMNo,FBillType,FBillNo,FBillStatus,FEntry,FUnitName,FStockQty,FFinishQty,FStartDate,FEndDate,FTranType,FInterID,FClassTypeID,FSwitch)
	select '',t4.FNumber,t4.FName,t4.FModel,v.FBOMNumber,N'生产任务单',u1.FBillNo,case when u1.FStatus = 0 then N'计划' else ( case when  u1.FStatus = 1 then N'下达' else  N'确认' end) end,'',t7.FName,u1.FQty,u1.FStockQty,u1.FPlanCommitDate,u1.FPlanFinishDate,u1.FTrantype,u1.FInterID,u1.FTrantype,0 from ICMO u1
	inner join t_ICItem t4 on u1.FItemID=t4.FItemID
	inner join t_MeasureUnit t7 on t7.FMeasureUnitID=t4.FUnitID
	inner join #TempBOM v on v.FItemID=u1.FItemID and v.FBOMInterID=u1.FBomInterID
	where u1.FTranType=85 and u1.FCanCellation=0 and (u1.FStatus in (1,2,5) or  (u1.FPlanConfirmed=1 and u1.FStatus=0) )
	insert into #TempICECN (FECNNo,FItemNo,FItemName,FModel,FBOMNo,FBillType,FBillNo,FBillStatus,FEntry,FUnitName,FStockQty,FFinishQty,FStartDate,FEndDate,FTranType,FInterID,FClassTypeID,FSwitch)
	select '',t4.FNumber,t4.FName,t4.FModel,v.FBOMNumber,N'重复生产计划单',u1.FBillNo,N'审核','',t7.FName,u1.FQty,u1.FReleasedQty,u1.FPlanCommitDate,u1.FPlanFinishDate,u1.FTrantype,u1.FInterID,u1.FTrantype,0 from ICMO u1
	inner join t_ICItem t4 on u1.FItemID=t4.FItemID
	inner join t_MeasureUnit t7 on t7.FMeasureUnitID=t4.FUnitID
	inner join #TempBOM v on v.FItemID=u1.FItemID and v.FBOMInterID=u1.FBomInterID
	Where u1.FTranType = 54 And u1.FCanCellation = 0 And u1.FStatus = 1
	insert into #TempICECN (FECNNo,FItemNo,FItemName,FModel,FBOMNo,FBillType,FBillNo,FBillStatus,FEntry,FUnitName,FStockQty,FFinishQty,FStartDate,FEndDate,FTranType,FInterID,FClassTypeID,FSwitch)
	select '',t4.FNumber,t4.FName,t4.FModel,v.FBOMNumber,N'委外订单',v1.FBillNo,N'审核',u1.FEntryID,t7.FName,u1.FQty,u1.FCommitQty,u1.FPayShipDate,u1.FFetchDate,v1.FClassTypeID,u1.FInterID,v1.FClassTypeID,1 from ICSubContractentry u1
	inner join ICSubContract v1 on u1.FInterID=v1.FInterID
	inner join t_ICItem t4 on t4.FItemID=u1.FItemID
	inner join t_MeasureUnit t7 on t7.FMeasureUnitID=t4.FUnitID
	inner join #TempBOM v on v.FItemID=u1.FItemID and v.FBOMInterID=u1.FBomInterID
	Where v1.FCanCellation = 0 And u1.FMRPClosed = 0 And v1.FClassTypeID = 1007105 And IsNull(v1.FCheckerID, 0) > 0
	insert into #TempICECN (FECNNo,FItemNo,FItemName,FModel,FBOMNo,FBillType,FBillNo,FBillStatus,FEntry,FUnitName,FStockQty,FFinishQty,FStartDate,FEndDate,FTranType,FInterID,FClassTypeID,FSwitch)
	select '',t4.FNumber,t4.FName,t4.FModel,v.FBOMNumber,N'计划订单',u1.FBillNo,N'审核','',t7.FName,u1.FPlanQty,0,u1.FPlanBeginDate,u1.FPlanEndDate,u1.FTrantype,u1.FInterID,u1.FTrantype,0 from ICMrpResult u1
	inner join t_ICItem t4 on t4.FItemID=u1.FItemID
	inner join t_MeasureUnit t7 on t7.FMeasureUnitID=t4.FUnitID
	inner join #TempBOM v on v.FItemID=u1.FItemID and v.FBOMInterID=u1.FBOM
	Where u1.FStatus <> 3 And IsNull(u1.FCheckerID, 0) > 0
	create table #TempCustBOMItem(
	[FItemID] [int] NOT NULL, 
	[FErpClsID] [int] NOT NULL
	)

	insert into #TempCustBOMItem(FItemID,FErpClsID)
	select distinct u1.FItemID,t4.FErpClsID from ICBOM u1 inner join t_ICItem t4 on u1.FItemID=t4.FItemID where u1.FBOMNumber IN(SELECT FValue AS FBOMNumber from fn_SplitStringToTable(@BomNumber,','))
	Union
	select distinct u2.FItemID,t4.FErpClsID from ICBOMChild u1 inner join ICBOM u2 on u1.FInterID=u2.FInterID
	inner join t_ICItem t4 on u2.FItemID=t4.FItemID where u2.FBOMNumber IN(SELECT FValue AS FBOMNumber from fn_SplitStringToTable(@BomNumber,','))

	insert into #TempICECN (FECNNo,FItemNo,FItemName,FModel,FBOMNo,FBillType,FBillNo,FBillStatus,FEntry,FUnitName,FStockQty,FFinishQty,FStartDate,FEndDate,FTranType,FInterID,FClassTypeID,FSwitch)
	select '',t4.FNumber,t4.FName,t4.FModel,'',N'采购申请单',v1.FBillNo,case when v1.FStatus = 0 then N'计划' else N'审核' end,u1.FEntryID,t7.FName,u1.FQty,u1.FOrderQty,null,u1.FFetchTime,v1.FTrantype,u1.FInterID,v1.FTrantype,0 from POrequestEntry u1
	inner join POrequest v1 on u1.FInterID=v1.FInterID
	inner join t_ICItem t4 on t4.FItemID=u1.FItemID
	inner join t_MeasureUnit t7 on t7.FMeasureUnitID=t4.FUnitID
	inner join #TempCustBOMItem v on v.FItemID=u1.FItemID
	Where v1.FPlanConfirmed = 1 And v1.FCanCellation = 0 And v1.FTrantype = 70 And u1.FMrpClosed = 0
	insert into #TempICECN (FECNNo,FItemNo,FItemName,FModel,FBOMNo,FBillType,FBillNo,FBillStatus,FEntry,FUnitName,FStockQty,FFinishQty,FStartDate,FEndDate,FTranType,FInterID,FClassTypeID,FSwitch)
	select '',t4.FNumber,t4.FName,t4.FModel,'',N'采购订单',v1.FBillNo,N'审核',u1.FEntryID,t7.FName,u1.FQty,u1.FStockQty,v1.FCheckDate,u1.FDate,v1.FTrantype,u1.FInterID,v1.FTrantype,0 from PoorderEntry u1
	inner join Poorder v1 on u1.FInterID=v1.FInterID
	inner join t_ICItem t4 on t4.FItemID=u1.FItemID
	inner join t_MeasureUnit t7 on t7.FMeasureUnitID=t4.FUnitID
	inner join #TempCustBOMItem v on v.FItemID=u1.FItemID
	Where v1.FCanCellation = 0 And u1.FMrpClosed = 0 And v1.FTrantype = 71 And IsNull(v1.FCheckerID, 0) > 0 And v1.FClassTypeID = 0
	insert into #TempICECN (FECNNo,FItemNo,FItemName,FModel,FBOMNo,FBillType,FBillNo,FBillStatus,FEntry,FUnitName,FStockQty,FFinishQty,FStartDate,FEndDate,FTranType,FInterID,FClassTypeID,FSwitch)
	select '',t4.FNumber,t4.FName,t4.FModel,'',N'进口订单',v1.FBillNo,N'审核',u1.FEntryID,t7.FName,u1.FQty,u1.FStockQty,v1.FCheckDate,u1.FDate,v1.FClassTypeID,u1.FInterID,v1.FClassTypeID,1 from PoorderEntry u1
	inner join Poorder v1 on u1.FInterID=v1.FInterID
	inner join t_ICItem t4 on t4.FItemID=u1.FItemID
	inner join t_MeasureUnit t7 on t7.FMeasureUnitID=t4.FUnitID
	inner join #TempCustBOMItem v on v.FItemID=u1.FItemID
	Where v1.FCanCellation = 0 And u1.FMrpClosed = 0 And v1.FTrantype = 71 And IsNull(v1.FCheckerID, 0) > 0 And v1.FClassTypeID = 1007101
	insert into #TempICECN (FECNNo,FItemNo,FItemName,FModel,FBOMNo,FBillType,FBillNo,FBillStatus,FEntry,FUnitName,FStockQty,FFinishQty,FStartDate,FEndDate,FTranType,FInterID,FClassTypeID,FSwitch)
	select '',t4.FNumber,t4.FName,t4.FModel,isnull(u2.FBOMNumber,''),N'销售订单',v1.FBillNo, N'审核',u1.FEntryID,t7.FName,u1.FQty,u1.FStockQty,null,u1.FAdviceConsignDate,v1.FTrantype,u1.FInterID,v1.FTrantype,0 from SeorderEntry u1
	inner join Seorder v1 on u1.FInterID=v1.FInterID
	inner join t_ICItem t4 on t4.FItemID=u1.FItemID
	inner join t_MeasureUnit t7 on t7.FMeasureUnitID=t4.FUnitID
	inner join (select distinct FItemID from #TempCustBOMItem where FErpClsID<>7 ) v on v.FItemID=u1.FItemID
	left join ICBOM u2 on u2.FInterID=u1.FBomInterID
	Where v1.FCanCellation = 0 And u1.FMrpClosed = 0 And v1.FTrantype = 81 And v1.FClassTypeID = 0 And IsNull(v1.FCheckerID, 0) > 0
	insert into #TempICECN (FECNNo,FItemNo,FItemName,FModel,FBOMNo,FBillType,FBillNo,FBillStatus,FEntry,FUnitName,FStockQty,FFinishQty,FStartDate,FEndDate,FTranType,FInterID,FClassTypeID,FSwitch)
	select '',t4.FNumber,t4.FName,t4.FModel,isnull(u2.FBOMNumber,''),N'外销订单',v1.FBillNo,N'审核',u1.FEntryID,t7.FName,u1.FQty,u1.FStockQty,null,u1.FAdviceConsignDate,v1.FTrantype,u1.FInterID,v1.FTrantype,0 from SeorderEntry u1
	inner join Seorder v1 on u1.FInterID=v1.FInterID
	inner join t_ICItem t4 on t4.FItemID=u1.FItemID
	inner join t_MeasureUnit t7 on t7.FMeasureUnitID=t4.FUnitID
	inner join (select distinct FItemID from #TempCustBOMItem where FErpClsID<>7 ) v on v.FItemID=u1.FItemID
	left join ICBOM u2 on u2.FInterID=u1.FBomInterID
	Where v1.FCanCellation = 0 And u1.FMrpClosed = 0 And v1.FTrantype = 81 And v1.FClassTypeID = 1007100 And IsNull(v1.FCheckerID, 0) > 0
	insert into #TempICECN (FECNNo,FItemNo,FItemName,FModel,FBOMNo,FBillType,FBillNo,FBillStatus,FEntry,FUnitName,FStockQty,FFinishQty,FStartDate,FEndDate,FTranType,FInterID,FClassTypeID,FSwitch)
	select '',t4.FNumber,t4.FName,t4.FModel,isnull(u2.FBOMNumber,''),N'产品预测单',v1.FBillNo,N'审核',u1.FEntryID,t7.FName,u1.FQty,u1.FSaleQty,null,u1.FNeedDate,v1.FTrantype,u1.FInterID,v1.FTrantype,0 from PPOrderEntry u1
	inner join PPOrder v1 on u1.FInterID=v1.FInterID
	inner join t_ICItem t4 on t4.FItemID=u1.FItemID
	inner join t_MeasureUnit t7 on t7.FMeasureUnitID=t4.FUnitID
	left join ICBOM u2 on u2.FInterID=u1.FBomInterID
	inner join (select distinct FItemID from #TempCustBOMItem where FErpClsID<>7 ) v on v.FItemID=u1.FItemID
	Where u1.FOrderClosed = 0 And v1.FCanCellation = 0 And IsNull(v1.FCheckerID, 0) > 0 And v1.FTrantype = 87
	
	insert into #TempICECN (FECNNo,FItemNo,FItemName,FModel,FBOMNo,FBillType,FBillNo,FBillStatus,FEntry,FUnitName,FStockQty,FFinishQty,FStartDate,FEndDate,FTranType,FInterID,FClassTypeID,FSwitch)
	select '',t4.FNumber,t4.FName,t4.FModel,isnull(u2.FBOMNumber,''),N'生产任务单',u1.FBillNo,case when u1.FStatus = 0 then N'计划' else ( case when  u1.FStatus = 1 then N'下达' else  N'确认' end) end,'',t7.FName,u1.FQty,u1.FStockQty,u1.FPlanCommitDate,u1.FPlanFinishDate,u1.FTrantype,u1.FInterID,u1.FTrantype,0 from ICMO u1
	inner join t_ICItem t4 on u1.FItemID=t4.FItemID
	inner join t_MeasureUnit t7 on t7.FMeasureUnitID=t4.FUnitID
	left join ICBOM u2 on u2.FInterID=u1.FBomInterID
	--inner join (select distinct u1.FItemID from ICBOMChild u1 inner join ICBOM u3 on u1.FInterID = u3.FInterID where u3.FBOMNumber IN(SELECT FValue AS FBOMNumber from fn_SplitStringToTable(@BomNumber,','))) v on v.FItemID=u1.FItemID
	where u1.FTranType=85 and u1.FCanCellation=0 and (u1.FStatus in (1,2,5) or  (u1.FPlanConfirmed=1 and u1.FStatus=0) )
	and t4.FPLMMaterialVerID in (SELECT FValue AS FPLMMaterialVerID from fn_SplitStringToTable(@ItemNumber,','))	

	insert into #TempICECN (FECNNo,FItemNo,FItemName,FModel,FBOMNo,FBillType,FBillNo,FBillStatus,FEntry,FUnitName,FStockQty,FFinishQty,FStartDate,FEndDate,FTranType,FInterID,FClassTypeID,FSwitch)
	select '',t4.FNumber,t4.FName,t4.FModel,isnull(u2.FBOMNumber,''),N'重复生产计划单',u1.FBillNo,N'审核','',t7.FName,u1.FQty,u1.FReleasedQty,u1.FPlanCommitDate,u1.FPlanFinishDate,u1.FTrantype,u1.FInterID,u1.FTrantype,0 from ICMO u1
	inner join t_ICItem t4 on u1.FItemID=t4.FItemID
	inner join t_MeasureUnit t7 on t7.FMeasureUnitID=t4.FUnitID
	--inner join (select distinct u1.FItemID from ICBOMChild u1 inner join ICBOM u3 on u1.FInterID = u3.FInterID where u3.FBOMNumber IN(SELECT FValue AS FBOMNumber from fn_SplitStringToTable(@BomNumber,','))) v on v.FItemID=u1.FItemID
	left join ICBOM u2 on u2.FInterID=u1.FBomInterID
	Where u1.FTranType = 54 And u1.FCanCellation = 0 And u1.FStatus = 1
	and t4.FPLMMaterialVerID in (SELECT FValue AS FPLMMaterialVerID from fn_SplitStringToTable(@ItemNumber,','))

	insert into #TempICECN (FECNNo,FItemNo,FItemName,FModel,FBOMNo,FBillType,FBillNo,FBillStatus,FEntry,FUnitName,FStockQty,FFinishQty,FStartDate,FEndDate,FTranType,FInterID,FClassTypeID,FSwitch)
	select '',t4.FNumber,t4.FName,t4.FModel,isnull(u2.FBOMNumber,''),N'委外订单',v1.FBillNo,N'审核',u1.FEntryID,t7.FName,u1.FQty,u1.FCommitQty,u1.FPayShipDate,u1.FFetchDate,v1.FClassTypeID,u1.FInterID,v1.FClassTypeID,1 from ICSubContractentry u1
	inner join ICSubContract v1 on u1.FInterID=v1.FInterID
	inner join t_ICItem t4 on t4.FItemID=u1.FItemID
	inner join t_MeasureUnit t7 on t7.FMeasureUnitID=t4.FUnitID
	--inner join (select distinct u.FItemID from ICBOMChild u inner join ICBOM u3 on u.FInterID = u3.FInterID where u3.FBOMNumber IN(SELECT FValue AS FBOMNumber from fn_SplitStringToTable(@BomNumber,','))) v on v.FItemID=u1.FItemID
	left join ICBOM u2 on u2.FInterID=u1.FBomInterID
	Where v1.FCanCellation = 0 And u1.FMrpClosed = 0 And v1.FClassTypeID = 1007105 And IsNull(v1.FCheckerID, 0) > 0
	and t4.FPLMMaterialVerID in (SELECT FValue AS FPLMMaterialVerID from fn_SplitStringToTable(@ItemNumber,','))

	insert into #TempICECN (FECNNo,FItemNo,FItemName,FModel,FBOMNo,FBillType,FBillNo,FBillStatus,FEntry,FUnitName,FStockQty,FFinishQty,FStartDate,FEndDate,FTranType,FInterID,FClassTypeID,FSwitch)
	select '',t4.FNumber,t4.FName,t4.FModel,isnull(u2.FBOMNumber,''),N'计划订单',u1.FBillNo,N'审核','',t7.FName,u1.FPlanQty,0,u1.FPlanBeginDate,u1.FPlanEndDate,u1.FTrantype,u1.FInterID,u1.FTrantype,0 from ICMrpResult u1
	inner join t_ICItem t4 on t4.FItemID=u1.FItemID
	inner join t_MeasureUnit t7 on t7.FMeasureUnitID=t4.FUnitID
	--inner join (select distinct u.FItemID from ICBOMChild u inner join ICBOM u3 on u.FInterID = u3.FInterID where u3.FBOMNumber IN(SELECT FValue AS FBOMNumber from fn_SplitStringToTable(@BomNumber,','))) v on v.FItemID=u1.FItemID
	left join ICBOM u2 on u2.FInterID=u1.FBOM
	Where u1.FStatus <> 3 And IsNull(u1.FCheckerID, 0) > 0
	and t4.FPLMMaterialVerID in (SELECT FValue AS FPLMMaterialVerID from fn_SplitStringToTable(@ItemNumber,','))

	insert into #TempICECN (FECNNo,FItemNo,FItemName,FModel,FBOMNo,FBillType,FBillNo,FBillStatus,FEntry,FUnitName,FStockQty,FFinishQty,FStartDate,FEndDate,FTranType,FInterID,FClassTypeID,FSwitch)
	select '',t4.FNumber,t4.FName,t4.FModel,'',N'采购申请单',v1.FBillNo,case when v1.FStatus = 0 then N'计划' else N'审核' end,u1.FEntryID,t7.FName,u1.FQty,u1.FOrderQty,null,u1.FFetchTime,v1.FTrantype,u1.FInterID,v1.FTrantype,0 from POrequestEntry u1
	inner join POrequest v1 on u1.FInterID=v1.FInterID
	inner join t_ICItem t4 on t4.FItemID=u1.FItemID
	inner join t_MeasureUnit t7 on t7.FMeasureUnitID=t4.FUnitID
	--inner join (select distinct u.FItemID from ICBOMChild u inner join ICBOM u3 on u.FInterID = u3.FInterID where u3.FBOMNumber IN(SELECT FValue AS FBOMNumber from fn_SplitStringToTable(@BomNumber,','))) v on v.FItemID=u1.FItemID
	Where v1.FPlanConfirmed = 1 And v1.FCanCellation = 0 And v1.FTranType = 70 And u1.FMrpClosed = 0
	and t4.FPLMMaterialVerID in (SELECT FValue AS FPLMMaterialVerID from fn_SplitStringToTable(@ItemNumber,','))	

	insert into #TempICECN (FECNNo,FItemNo,FItemName,FModel,FBOMNo,FBillType,FBillNo,FBillStatus,FEntry,FUnitName,FStockQty,FFinishQty,FStartDate,FEndDate,FTranType,FInterID,FClassTypeID,FSwitch)
	select '',t4.FNumber,t4.FName,t4.FModel,'',N'采购订单',v1.FBillNo,N'审核',u1.FEntryID,t7.FName,u1.FQty,u1.FStockQty,v1.FCheckDate,u1.FDate,v1.FTrantype,u1.FInterID,v1.FTrantype,0 from PoorderEntry u1
	inner join Poorder v1 on u1.FInterID=v1.FInterID
	inner join t_ICItem t4 on t4.FItemID=u1.FItemID
	inner join t_MeasureUnit t7 on t7.FMeasureUnitID=t4.FUnitID
	--inner join (select distinct u.FItemID from ICBOMChild u inner join ICBOM u3 on u.FInterID = u3.FInterID where u3.FBOMNumber IN(SELECT FValue AS FBOMNumber from fn_SplitStringToTable(@BomNumber,','))) v on v.FItemID=u1.FItemID
	Where v1.FCanCellation = 0 And u1.FMrpClosed = 0 And v1.FTranType = 71 And IsNull(v1.FCheckerID, 0) > 0 And v1.FClassTypeID = 0
	and t4.FPLMMaterialVerID in (SELECT FValue AS FPLMMaterialVerID from fn_SplitStringToTable(@ItemNumber,','))	

	insert into #TempICECN (FECNNo,FItemNo,FItemName,FModel,FBOMNo,FBillType,FBillNo,FBillStatus,FEntry,FUnitName,FStockQty,FFinishQty,FStartDate,FEndDate,FTranType,FInterID,FClassTypeID,FSwitch)
	select '',t4.FNumber,t4.FName,t4.FModel,'',N'进口订单',v1.FBillNo,N'审核',u1.FEntryID,t7.FName,u1.FQty,u1.FStockQty,v1.FCheckDate,u1.FDate,v1.FClassTypeID,u1.FInterID,v1.FClassTypeID,1 from PoorderEntry u1
	inner join Poorder v1 on u1.FInterID=v1.FInterID
	inner join t_ICItem t4 on t4.FItemID=u1.FItemID
	inner join t_MeasureUnit t7 on t7.FMeasureUnitID=t4.FUnitID
	--inner join (select distinct u.FItemID from ICBOMChild u inner join ICBOM u3 on u.FInterID = u3.FInterID where u3.FBOMNumber IN(SELECT FValue AS FBOMNumber from fn_SplitStringToTable(@BomNumber,','))) v on v.FItemID=u1.FItemID
	Where v1.FCanCellation = 0 And u1.FMrpClosed = 0 And v1.FTranType = 71 And IsNull(v1.FCheckerID, 0) > 0 And v1.FClassTypeID = 1007101
	and t4.FPLMMaterialVerID in (SELECT FValue AS FPLMMaterialVerID from fn_SplitStringToTable(@ItemNumber,','))	

	insert into #TempICECN (FECNNo,FItemNo,FItemName,FModel,FBOMNo,FBillType,FBillNo,FBillStatus,FEntry,FUnitName,FStockQty,FFinishQty,FStartDate,FEndDate,FTranType,FInterID,FClassTypeID,FSwitch)
	select '',t4.FNumber,t4.FName,t4.FModel,isnull(u2.FBOMNumber,''),N'销售订单',v1.FBillNo,N'审核',u1.FEntryID,t7.FName,u1.FQty,u1.FStockQty,null,u1.FAdviceConsignDate,v1.FTrantype,u1.FInterID,v1.FTrantype,0 from SeorderEntry u1
	inner join Seorder v1 on u1.FInterID=v1.FInterID
	inner join t_ICItem t4 on t4.FItemID=u1.FItemID
	inner join t_MeasureUnit t7 on t7.FMeasureUnitID=t4.FUnitID
	--inner join (select distinct u.FItemID from ICBOMChild u inner join ICBOM u3 on u.FInterID = u3.FInterID where u3.FBOMNumber IN(SELECT FValue AS FBOMNumber from fn_SplitStringToTable(@BomNumber,','))) v on v.FItemID=u1.FItemID
	left join ICBOM u2 on u2.FInterID=u1.FBomInterID
	Where v1.FCanCellation = 0 And u1.FMrpClosed = 0 And v1.FTranType = 81 And v1.FClassTypeID = 0 And IsNull(v1.FCheckerID, 0) > 0
	and t4.FPLMMaterialVerID in (SELECT FValue AS FPLMMaterialVerID from fn_SplitStringToTable(@ItemNumber,','))
	
	insert into #TempICECN (FECNNo,FItemNo,FItemName,FModel,FBOMNo,FBillType,FBillNo,FBillStatus,FEntry,FUnitName,FStockQty,FFinishQty,FStartDate,FEndDate,FTranType,FInterID,FClassTypeID,FSwitch)
	select '',t4.FNumber,t4.FName,t4.FModel,isnull(u2.FBOMNumber,''),N'外销订单',v1.FBillNo,N'审核',u1.FEntryID,t7.FName,u1.FQty,u1.FStockQty,null,u1.FAdviceConsignDate,v1.FTrantype,u1.FInterID,v1.FTrantype,0 from SeorderEntry u1
	inner join Seorder v1 on u1.FInterID=v1.FInterID
	inner join t_ICItem t4 on t4.FItemID=u1.FItemID
	inner join t_MeasureUnit t7 on t7.FMeasureUnitID=t4.FUnitID
	--inner join (select distinct u.FItemID from ICBOMChild u inner join ICBOM u3 on u.FInterID = u3.FInterID where u3.FBOMNumber IN(SELECT FValue AS FBOMNumber from fn_SplitStringToTable(@BomNumber,','))) v on v.FItemID=u1.FItemID
	left join ICBOM u2 on u2.FInterID=u1.FBomInterID
	Where v1.FCanCellation = 0 And u1.FMrpClosed = 0 And v1.FTranType = 81 And v1.FClassTypeID = 1007100 And IsNull(v1.FCheckerID, 0) > 0
	and t4.FPLMMaterialVerID in (SELECT FValue AS FPLMMaterialVerID from fn_SplitStringToTable(@ItemNumber,','))	

	insert into #TempICECN (FECNNo,FItemNo,FItemName,FModel,FBOMNo,FBillType,FBillNo,FBillStatus,FEntry,FUnitName,FStockQty,FFinishQty,FStartDate,FEndDate,FTranType,FInterID,FClassTypeID,FSwitch)
	select '',t4.FNumber,t4.FName,t4.FModel,isnull(u2.FBOMNumber,''),N'产品预测单',v1.FBillNo,N'审核',u1.FEntryID,t7.FName,u1.FQty,u1.FSaleQty,null,u1.FNeedDate,v1.FTrantype,u1.FInterID,v1.FTrantype,0 from PPOrderEntry u1
	inner join PPOrder v1 on u1.FInterID=v1.FInterID
	inner join t_ICItem t4 on t4.FItemID=u1.FItemID
	inner join t_MeasureUnit t7 on t7.FMeasureUnitID=t4.FUnitID
	--inner join (select distinct u.FItemID from ICBOMChild u inner join ICBOM u3 on u.FInterID = u3.FInterID where u3.FBOMNumber IN(SELECT FValue AS FBOMNumber from fn_SplitStringToTable(@BomNumber,','))) v on v.FItemID=u1.FItemID
	left join ICBOM u2 on u2.FInterID=u1.FBomInterID
	Where u1.FOrderClosed = 0 And v1.FCanCellation = 0 And IsNull(v1.FCheckerID, 0) > 0 And v1.FTranType = 87
	and t4.FPLMMaterialVerID in (SELECT FValue AS FPLMMaterialVerID from fn_SplitStringToTable(@ItemNumber,','))

	create table #TempICMO(
	   [FItemID] [int] NOT NULL,
	   [FInterID] [int] NOT NULL,
	   [FBOMInterID] [int] NOT NULL ,
	   [FBillNo] [varchar](250) NOT NULL DEFAULT (''),
	   [FCanCellation] [int] NOT NULL,
	   [FTrantype] [int] NOT NULL,
	   [FStatus] [int] NOT NULL,
	   [FEntryID] [int] NOT NULL,
	   [FQtyMust] [decimal](28, 10) NOT NULL DEFAULT (''),
	   [FQtySupply] [decimal](28, 10) NULL ,
	   [FStockQty] [decimal](28, 10) NULL ,
	   [FSendItemDate] [datetime] NULL ,
	)
	insert into #TempICMO(FBillNo,FInterID,FItemID,FBOMInterID,FCanCellation,FTrantype,FStatus,FEntryID,FQtyMust,FQtySupply,FStockQty,FSendItemDate)
	select u2.FBillNo,u1.FInterID,u1.FItemID,u2.FBOMInterID,u2.FCanCellation,u2.FTrantype,u2.FStatus,u1.FEntryID,u1.FQtyMust,u1.FQtySupply,u1.FStockQty,u1.FSendItemDate
	from PPBOMEntry u1 inner join (
	select t1.FInterID,t1.FBillNO,t2.FBOMInterID,t1.FCanCellation,t1.FTrantype,t1.FStatus from PPBOM t1 inner join ICSubContractEntry t2 on t1.FICMOInterID=t2.FInterID and t1.FOrderEntryID=t2.FEntryID --where t1.FSelTrantype=1007105
	Union
	select t1.FInterID,t1.FBillNO,t2.FBOMInterID,t1.FCanCellation,t1.FTrantype,t1.FStatus from PPBOM t1 inner join ICMO t2 on t1.FICMOInterID=t2.FInterID --where t1.FSelTrantype in (1002533,85)
	) u2 on u1.FInterID=u2.FInterID
	
	insert into #TempICECN (FECNNo,FItemNo,FItemName,FModel,FBOMNo,FBillType,FBillNo,FBillStatus,FEntry,FUnitName,FStockQty,FFinishQty,FStartDate,FEndDate,FTranType,FInterID,FClassTypeID,FSwitch)
	select '',t4.FNumber,t4.FName,t4.FModel,isnull(t1.FBOMNumber,''),N'生产投料单',u.FBillNo,case when u.FStatus = 0 then N'计划' else ( case when  u.FStatus = 1 then N'审核' else  N'确认' end) end,u.FEntryID,t7.FName,u.FQtyMust+u.FQtySupply,u.FStockQty,null,u.FSendItemDate,u.FTrantype,u.FInterID,u.Ftrantype,0
	from #TempICMO u
	inner join t_ICItem t4 on t4.FItemID=u.FItemID
	inner join t_MeasureUnit t7 on t7.FMeasureUnitID=t4.FUnitID
--	inner join (select distinct u1.FItemID,u2.FInterID FBOMInterID,u2.FBOMNumber from ICBOMChild u1
--			   inner join t_ICItem t4 on u1.FItemID=t4.FItemID
--			   inner join icbom u2 on u2.FParentID=u1.FInterID and u2.FBOMType=3
--			   where u2.FBOMNumber IN(SELECT FValue AS FBOMNumber from fn_SplitStringToTable(@BomNumber,','))) v on u.FItemID=v.FItemID and u.FBOMInterID=v.FBOMInterID
	left join ICBOM t1 on t1.FInterID=u.FBomInterID
	where u.FCanCellation=0 and u.FTrantype=88 and u.FStatus in (0,1,5)
	and t4.FPLMMaterialVerID in (SELECT FValue AS FPLMMaterialVerID from fn_SplitStringToTable(@ItemNumber,','))
	
	insert into #TempICECN (FECNNo,FItemNo,FItemName,FModel,FBOMNo,FBillType,FBillNo,FBillStatus,FEntry,FUnitName,FStockQty,FFinishQty,FStartDate,FEndDate,FTranType,FInterID,FClassTypeID,FSwitch)
	select '',t4.FNumber,t4.FName,t4.FModel,isnull(t1.FBOMNumber,''),N'生产投料单',u.FBillNo,case when u.FStatus = 0 then N'计划' else ( case when  u.FStatus = 1 then N'审核' else  N'确认' end) end,u.FEntryID,t7.FName,u.FQtyMust+u.FQtySupply,u.FStockQty,null,u.FSendItemDate,u.FTrantype,u.FInterID,u.Ftrantype,0
	from #TempICMO u
	inner join t_ICItem t4 on t4.FItemID=u.FItemID
	inner join t_MeasureUnit t7 on t7.FMeasureUnitID=t4.FUnitID
--	inner join (select distinct u1.FItemID,u2.FInterID FBOMInterID,u2.FBOMNumber from ICBOMChild u1
--			   inner join t_ICItem t4 on u1.FItemID=t4.FItemID
--			   inner join icbom u2 on u2.FInterID=u1.FInterID
--			   where u2.FBOMNumber IN(SELECT FValue AS FBOMNumber from fn_SplitStringToTable(@BomNumber,','))) v on u.FItemID=v.FItemID and u.FBOMInterID=v.FBOMInterID
	left join ICBOM t1 on t1.FInterID=u.FBomInterID
	where u.FCanCellation=0 and u.FTrantype=88 and u.FStatus in (0,1,5)
	and t4.FPLMMaterialVerID in (SELECT FValue AS FPLMMaterialVerID from fn_SplitStringToTable(@ItemNumber,','))
	
	insert into #TempICECN (FECNNo,FItemNo,FItemName,FModel,FBOMNo,FBillType,FBillNo,FBillStatus,FEntry,FUnitName,FStockQty,FFinishQty,FStartDate,FEndDate,FTranType,FInterID,FClassTypeID,FSwitch)
	select '',t4.FNumber,t4.FName,t4.FModel,'',N'库存','','','',t7.FName,u1.FQty,null,null,null,0,0,0,0 from
	(select u1.FItemID,sum(u1.FQty) FQty from icinventory u1 inner join t_stock t5 on u1.FStockID=t5.FItemID where t5.FMRPAvail=1 group by u1.FItemID) u1
	inner join t_ICItem t4 on t4.FItemID=u1.FItemID
	inner join t_MeasureUnit t7 on t7.FMeasureUnitID=t4.FUnitID
--	inner join (select distinct ICBOMChild.FItemID from ICBOMChild inner join ICBOM on ICBOMChild.FInterID = ICBOM.FInterID where ICBOM.FBOMNumber IN(SELECT FValue AS FBOMNumber from fn_SplitStringToTable(@BomNumber,',')) 
--				union select distinct FItemID from ICBOM where FBOMNumber IN(SELECT FValue AS FBOMNumber from fn_SplitStringToTable(@BomNumber,','))
--		) e on e.FItemID=u1.FItemID
	and t4.FPLMMaterialVerID in (SELECT FValue AS FPLMMaterialVerID from fn_SplitStringToTable(@ItemNumber,','))

	CREATE TABLE #TempOrderBOMDiff (
	   FID                [int] NOT NULL --订单BOM内码
	   ,FSrcOrderTranType [int] NOT NULL --销售订单 81
	   ,FSrcOrderInterID  [int] NOT NULL--销售订单内码
	   ,FSrcOrderEntryID  [int] NOT NULL --销售订单行号
	   ,FParentBOMInterID [int] NOT NULL --为父项物料指定的BOM
	   ,FParentItemID  [int] NOT NULL --为父项物料指定的BOM
	   ,FOrderBOMStatus   [int] NOT NULL --订单BOM状态:36830 未配置 36831 配置中 36832 已
	   ,FItemID           [int] NOT NULL --配置过的物料内码
	   ,FItemID2          [int] NOT NULL --替换后的物料内码
	   ,FOperationType    [int] NOT NULL)
	insert into  #TempOrderBOMDiff(FID,FSrcOrderTranType,FSrcOrderInterID, 
	FSrcOrderEntryID,FParentBOMInterID,FParentItemID,FOrderBOMStatus,FItemID,FItemID2,FOperationType) 
	select t1.FID,t1.FSrcOrderTranType,FSrcOrderInterID,FSrcOrderEntryID,FParentBOMInterID,FParentItemID,FOrderBOMStatus  
	,t2.FItemID,FItemID2,FOperationType from  ICPlan_OrderBOMDiff t1 
	inner join ICPlan_OrderBOMDiffEntry t2  on t1.FID =t2.FID   
	
	insert into #TempICECN (FECNNo,FItemNo,FItemName,FModel,FBOMNo,FBillType,FBillNo,FBillStatus,FEntry,FUnitName,FStockQty,FFinishQty,FStartDate,FEndDate,FTranType,FInterID,FClassTypeID,FSwitch)
	( select distinct '',t4.FNumber,t4.FName,t4.FModel,isnull(t7.FBOMNumber,'') 
	,N'订单BOM',t6.FBillNo,t9.FName,t1.FSrcOrderEntryID,t5.FName,t3.FQty, 
	t3.FStockQty,null,t3.FAdviceConsignDate,t1.FSrcOrderTranType,t3.FInterID, 
	FSrcOrderTranType,0 from #TempOrderBOMDiff t1 inner join ICBOMChild t2  
	on t1.FParentBOMInterID=t2.FInterID
	and t1.FItemID2 =t2.FItemID and t1.FOperationType =11021 
	inner join SeorderEntry t3 on t1.FSrcOrderInterID=t3.FInterID and t1.FSrcOrderEntryID =t3.FEntryID and t3.FMrpClosed = 0 
	inner join t_ICItem t4 on t4.FItemID=t1.FItemID2 
	inner join t_MeasureUnit t5 on t5.FMeasureUnitID=t4.FUnitID 
	inner join Seorder t6 on t6.FInterID =t1.FSrcOrderInterID 
	inner join ICBOM t7 on t7.FInterID=t1.FParentBOMInterID
	inner join t_ICItem t8 on t8.FItemID=t1.FParentItemID and t8.FErpClsID in (2,3,5)  
	inner join t_SubMessage t9 on t9.FInterID=t1.FOrderBOMStatus
	where t4.FPLMMaterialVerID in (SELECT FValue AS FPLMMaterialVerID from fn_SplitStringToTable(@ItemNumber,','))  )  	

	insert into #TempICECN (FECNNo,FItemNo,FItemName,FModel,FBOMNo,FBillType,FBillNo,FBillStatus,FEntry,FUnitName,FStockQty,FFinishQty,FStartDate,FEndDate,FTranType,FInterID,FClassTypeID,FSwitch)
	(select distinct '',t4.FNumber,t4.FName,t4.FModel,isnull(t7.FBOMNumber,''), 
	N'订单BOM',t6.FBillNo,t9.FName,t1.FSrcOrderEntryID,t5.FName,t3.FQty, 
	t3.FStockQty,null,t3.FAdviceConsignDate,t1.FSrcOrderTranType,t3.FInterID, 
	t1.FSrcOrderTranType,0 from #TempOrderBOMDiff t1 inner join ICBOMChild t2
	on t1.FParentBOMInterID=t2.FInterID 
	and t1.FItemID =t2.FItemID and t1.FOperationType in(11022,11024)  
	inner join SeorderEntry t3 on t1.FSrcOrderInterID=t3.FInterID and t1.FSrcOrderEntryID =t3.FEntryID  and t3.FMrpClosed = 0 
	inner join t_ICItem t4 on t4.FItemID=t1.FItemID inner join t_MeasureUnit t5 on t5.FMeasureUnitID=t4.FUnitID 
	inner join Seorder t6 on t6.FInterID =t1.FSrcOrderInterID  inner join ICBOM t7 on t7.FInterID=t1.FParentBOMInterID
	inner join t_ICItem t8 on t8.FItemID=t1.FParentItemID and t8.FErpClsID in (2,3,5)  
	inner join t_SubMessage t9 on t9.FInterID=t1.FOrderBOMStatus
	where t4.FPLMMaterialVerID in (SELECT FValue AS FPLMMaterialVerID from fn_SplitStringToTable(@ItemNumber,','))  ) 

	update #TempICECN set FIndex=1 where FTrantype=0
	update #TempICECN set FIndex=2 where FTrantype=81
	update #TempICECN set FIndex=3 where FTrantype=1007100
	update #TempICECN set FIndex=4 where FTrantype=87
	update #TempICECN set FIndex=5 where FTrantype=500
	update #TempICECN set FIndex=6 where FTrantype=85
	update #TempICECN set FIndex=8 where FTrantype=54
	update #TempICECN set FIndex=9 where FTrantype=88
	update #TempICECN set FIndex=10 where FTrantype=70
	update #TempICECN set FIndex=11 where FTrantype=1007105
	update #TempICECN set FIndex=12 where FTrantype=71
	update #TempICECN set FIndex=13 where FTrantype=1007101
	update #TempICECN set FIndex=14 where FTrantype=1002533

	select distinct a.FECNNo,--工程变更单号 无用
					a.FItemNo,--物料编码
					a.FItemName,--物料名称
					a.FModel,--规格型号
					a.FBOMNo,--变更BOM
					a.FBillType,--单据类型
					a.FBillNo,--单据编号
					a.FBillStatus,--单据状态
					a.FEntry,--分录号
					a.FUnitName,--基本单位
					LTRIM(STR(a.FStockQty,10,b.FQtyDecimal)) as FStockQty,--库存/计划数量
					LTRIM(STR(a.FFinishQty,10,b.FQtyDecimal)) as FFinishQty,--完工数量
					case when a.FStartDate is null then a.FStartDate else CONVERT(DATETIME,CONVERT(VARCHAR(10),a.FStartDate,20),20) end as FStartDate,--计划采购/开工日期
					case when a.FEndDate is null then a.FEndDate else CONVERT(DATETIME,CONVERT(VARCHAR(10),a.FEndDate,20),20) end as FEndDate,--计划到货/完工日期
					a.FTrantype,--单据类型ID（老单）
					a.FInterID,--单据内码
					a.FSumSort,--合计排序
					a.FClassTypeID,--单据类型ID（新单）
					a.FSwitch,
					a.FIndex
	from #TempICECN a
	inner join t_ICItem b on a.FItemNo = b.FNumber
	order by FECNNo,FItemNo,FIndex,FEndDate,FBillNo,FBomNo
	drop table #TempCustBOM
	drop table #TempCustBOMItem
	drop table #TempICMO
	drop table #TempBOM
	drop table #TempICECN
	drop table #TempOrderBOMDiff
END
GO