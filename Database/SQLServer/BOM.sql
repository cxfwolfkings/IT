--添加PLM字段，默认为否'N'
--BOM单表头增加IsPLM字段
DECLARE @FCtlIndex INT, @FTabIndex INT, @FLeft INT, @FTop INT  

IF NOT EXISTS(SELECT * FROM syscolumns WHERE id=object_id('ICBOM') and name='FIsPLM') 
BEGIN
	DELETE FROM ICTemplate WHERE FID='Z01' AND FFieldName='FIsPLM'
	SELECT @FCtlIndex = MAX(FCtlIndex) + 1, @FTabIndex = MAX(FTabIndex) + 1 FROM ICTemplate WHERE FID='Z01'
	SELECT @FLeft = FLeft FROM ICTemplate WHERE FID = 'Z01' AND FFieldName = 'FRoutingID'
	SELECT @FTop = FTop FROM ICTemplate WHERE FID = 'Z01' AND FFieldName = 'FRoutingName'
	INSERT INTO ICTemplate
	(FID,FLookUpType,FCtlIndex,FTabIndex,FCaption,FCaption_CHT,FCaption_EN,FCtlType,FLookUpCls,FNeedSave,FValueType,FSaveValue,FFieldName,FLeft,FTop,FWidth,FHeight,FEnable,FRelateOutTbl,FPrint,FFontName,FFontSize,FSelBill,FMustInput,FFilter,FRelationID,FAction,FLockA,FROB,FDefaultCtl,FVisForBillType,FVBACtlType, FFormat,FInEntryForSPrint,FDefaultValue,FMaxValue,FMinValue,FItemClassID,FUserDefineClassID)
	Values('Z01',2,@FCtlIndex,@FTabIndex,'IsPLM:','IsPLM:','IsPLM:',2,244,-1,0,1,'FIsPLM',@FLeft,@FTop,2250,390,0,0,0,'宋体',9,0,0,'','','',0,3,1,31,'kdtext','',0,'1059','','',0,0)
END
GO

p_AlterTableAddColumns @TableName = 'ICBOM',
                       @Fields = 'FIsPLM INT NOT NULL DEFAULT(1059)',
                       @Delimeter = '|'
GO

--套打BOM单增加IsPLM字段
DECLARE @FID INT, @GFCtlIndex INT
DELETE FROM  GLNoteCitation WHERE FCode='FIsPLM' AND  FTemplateID = 'Z01'
SELECT @FID = MAX(FID) + 1 FROM GLNoteCitation WHERE FTemplateID = 'Z01'
SELECT @GFCtlIndex = MAX(FCtlIndex) + 1 FROM GLNoteCitation WHERE FTemplateID = 'Z01'
INSERT INTO GLNoteCitation
(FTemplateID,FID,FNoteTypeID,FCitationName,FInEntry,FIsMoney,FCode,FCtlIndex,FIsSum,FKeyFieldName,FExtFieldName,FTableName,FRelationID,FCitationName_CHT,FCitationName_EN) 
VALUES('Z01',@FID ,261,'IsPLM:$',0,0 ,'FIsPLM',@GFCtlIndex,0,'FIsPLM','', '', 1,'IsPLM:$','IsPLM:$')
GO

--叙事簿增加IsPLM字段
DECLARE @FInterID INT
DELETE FROM ICChatBillTitle WHERE FTypeID = 634 AND FColName = 'FIsPLM'
SELECT @FInterID = MAX(FInterID) + 1 FROM ICChatBillTitle WHERE FTypeID = 634
Insert Into ICChatBillTitle
(FInterID,FTypeID,FColCaption,FColCaption_CHT,FColCaption_EN,FMergeable,FColName,FName,FTableName,FTableAlias,FColType,FItemClassID,FReturnDataType,FCtlIndex,FStatistical,FNeedCount,FCountPriceType, FVisForQuest,FVisForOrder,FFormat)
Values(@FInterID,634,'IsPLM:$','IsPLM:$','IsPLM:$',0,'FIsPLM','FIsPLM','ICBOM','v1',1,-1,0,1,0,0,1,1,1,'')
UPDATE ICChatBillTitle SET FVisForOrder=1 WHERE FTypeID = 634 AND FColName = 'FIsPLM'
GO

--万能报表增加IsPLM字段
IF NOT EXISTS(SELECT t2.* FROM t_TableDescription t1, t_FieldDescription t2  WHERE t1.FTableID=t2.FTableID AND t1.FTableName ='ICBOM' And t2.FFieldName ='FIsPLM') 
BEGIN 
	INSERT INTO t_FieldDescription(FTableID,FFieldName,FFieldType,
	FDescription,FDescription_CHT,FDescription_EN,FFieldNote,FFieldNote_CHT,FFieldNote_EN) 
	SELECT t1.FTableID,'FIsPLM','STRING',
	'IsPLM:','IsPLM','IsPLM:',
	'IsPLM:','IsPLM','IsPLM:' 
	FROM t_TableDescription t1 
	WHERE t1.FTableName ='ICBOM' 
END 
GO