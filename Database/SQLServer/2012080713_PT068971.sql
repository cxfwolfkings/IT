--添加PLM字段，默认为否'N'
  
IF NOT Exists(select * from syscolumns where id=object_id('t_routing') and name='isplm') 
     Begin
delete from ICTemplate where FId='Z02' and FCaption='是否PLM:'
Insert Into ICTemplate
(FID,FLookUpType,FCtlIndex,FTabIndex,FCaption,FCaption_CHT,FCaption_EN,FCtlType,FLookUpCls,FNeedSave,FValueType,FSaveValue,FFieldName,FLeft,FTop,FWidth,FHeight,FEnable,FRelateOutTbl,FPrint,FFontName,FFontSize,FSelBill,FMustInput,FFilter,FRelationID,FAction,FLockA,FROB,FDefaultCtl,FVisForBillType,FVBACtlType, FFormat,FInEntryForSPrint,FDefaultValue,FMaxValue,FMinValue,FItemClassID,FUserDefineClassID,FAllowCopy)
    Values('Z02',2,9,10,'是否PLM:','是否PLM','IsPLM:',2,244,-1,0,1,'IsPLM',3695,1820,2510,560,0,0,0,'宋体',9,0,0,'','','',0,3,1,31,'kdtext','',0,'1059','','',0,0,0)
end
--if not exists (SELECT * FROM sysobjects t1 ,syscolumns t2 where t1.id=t2.id and t1.name='T_Routing'  
--and t2.Name='IsPLM')
--Alter Table T_Routing  Add IsPLM VARCHAR(255) NULL  
EXEC p_AlterTableAddColumns @TableName = 'T_Routing',@Fields = 'IsPLM int default(1059) NULL'
 DELETE FROM  GLNoteCitation WHERE FCode='IsPLM' AND  FTemplateID='Z02' AND FRelationID IN (1,2,3,20)
Insert Into GLNoteCitation
(FTemplateID,FID,FNoteTypeID,FCitationName,FInEntry,FIsMoney,FCode,FCtlIndex,FIsSum,FKeyFieldName,FExtFieldName,FTableName,FRelationID,FCitationName_CHT,FCitationName_EN) values ('Z02',50 ,301,'是否PLM:$',0,0 ,'IsPLM',9,0,'IsPLM','', '', 1,'是否PLM$','IsPLM:$')

delete from ICChatBillTitle where FInterID=1100 and FColCaption='是否PLM:$'
Insert Into ICChatBillTitle
(FInterID,FTypeID,FColCaption,FColCaption_CHT,FColCaption_EN,FMergeable,FColName,FName,FTableName,FTableAlias,FColType,FItemClassID,FReturnDataType,FCtlIndex,FStatistical,FNeedCount,FCountPriceType, 

FVisForQuest,FVisForOrder,FFormat)Values(1100,0,'是否PLM:$','是否PLM$','IsPLM:$',1,'IsPLM','IsPLM','T_Routing','v1',1,-1,0,9,1,0,0,1,1,'')

UPDATE ICChatBillTitle SET FVisForOrder=1 WHERE FTypeID=0 AND FColName ='IsPLM'
 IF NOT Exists(Select t2.* From t_TableDescription t1, t_FieldDescription t2  Where 

t1.FTableID=t2.FTableID And t1.FTableName ='T_Routing' And t2.FFieldName ='IsPLM') 
     Begin 
         INSERT INTO t_FieldDescription(FTableID,FFieldName,FFieldType,
         FDescription,FDescription_CHT,FDescription_EN,FFieldNote,FFieldNote_CHT,FFieldNote_EN) 
         Select t1.FTableID,'IsPLM','STRING',
         '是否PLM:','是否PLM','IsPLM:',
         '是否PLM:','是否PLM','IsPLM:' 
         From t_TableDescription t1 
         Where t1.FTableName ='T_Routing' 
     End 
GO

Update t_routing set IsPLM = 1059 Where IsPLM is null
GO

Declare @BillID as int

IF Not Exists(Select 1 from t_routinggroup Where FNumber ='PLM')
Begin
	Exec GetICMaxNum 't_routinggroup', @BillID output,1,16394
	Insert Into t_routinggroup(FinterID,FParentID,FNumber,FName)
	Values(@BillID,0,'PLM','PLM')
End
GO

EXEC p_AlterTableAddColumns @TableName = 'ICSubsItem_Head',@Fields = 'IsPLMDefualt tinyInt default(0) NULL'
GO

 