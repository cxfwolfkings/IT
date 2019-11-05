--是否为PLM导入
DECLARE @lPropID INT
DECLARE @iOrder	 INT
SELECT @lPropID = MAX(FPropID),@iOrder= MAX(FOrder) FROM t_ItemPropDesc WHERE FItemClassID = 4
IF NOT EXISTS(SELECT 1 FROM t_ItemPropDesc WHERE FItemClassID = 4 AND FSQLColumnName = 'FIsPLM')
BEGIN
  SET @lPropID = @lPropID+1
  SET @iOrder = @iOrder + 1
	INSERT INTO t_ItemPropDesc(FItemClassID,FPropID,FName,FName_Cht,FName_en,FSQLColumnName,FDataType,FPrecision,FScale,
	FActualType,FActualSize,FBehavior,FBrNo,FSearch,FAction,FSaveRule,FDefaultValue,FSrcTable,FSrcField,FDisplayField,
	FViewMask,FFilterField,	FPageName,FPageName_Cht,FPageName_en,FComCall,FIsShownList,FIsInput,FIsDisplay,FOrder)
	VALUES(4,@lPropID,'PLM同步','PLM同步','PLM Synchro','FIsPLM',11,0,0,11,0,1,0,0,'',
	'',0,NULL,NULL,NULL,0,0,'01.基本资料','01.基本資料','01.Basic Data','',0,0,0,@iOrder)
END
GO

IF NOT EXISTS(SELECT 1 FROM SYSCOLUMNS WHERE [ID]=OBJECT_ID('t_ICItemMaterial') AND [NAME]='FIsPLM')
BEGIN
	EXEC p_AlterTableAddColumns	@TableName = 't_ICItemMaterial',@Fields = 'FIsPLM INT DEFAULT(0)'
    EXEC SP_CREATE_ICItem_VIEW
    EXEC SP_CREATE_ICItem_TRIGGER
END
GO

--PLM内码
DECLARE @lPropID INT
DECLARE @iOrder	 INT
SELECT @lPropID = MAX(FPropID),@iOrder= MAX(FOrder) FROM t_ItemPropDesc WHERE FItemClassID = 4
IF NOT EXISTS(SELECT FPropID FROM t_ItemPropDesc WHERE FItemClassID = 4 AND FSQLColumnName = 'FPLMMaterialVerID')
BEGIN
  SET @lPropID = @lPropID+1
  SET @iOrder = @iOrder + 1
	INSERT INTO t_ItemPropDesc(FItemClassID,FPropID,FName,FName_Cht,FName_en,FSQLColumnName,FDataType,FPrecision,FScale,
	FActualType,FActualSize,FBehavior,FBrNo,FSearch,FAction,FSaveRule,FDefaultValue,FSrcTable,FSrcField,FDisplayField,
	FViewMask,FFilterField,	FPageName,FPageName_Cht,FPageName_en,FComCall,FIsShownList,FIsInput,FIsDisplay,FOrder)
	VALUES(4,@lPropID,'PLM内码','PLM內碼','PLM GUID','FPLMMaterialVerID',200,36,0,200,36,1,0,NULL,NULL,
	NULL,NULL,NULL,NULL,NULL,16,0,'01.基本资料','01.基本資料','01.Basic Data','',0,0,0,@iOrder)
END
GO

IF NOT EXISTS(SELECT id FROM SYSCOLUMNS WHERE [ID]=OBJECT_ID('t_ICItemMaterial') AND [NAME]='FPLMMaterialVerID')
BEGIN
	EXEC p_AlterTableAddColumns	@TableName = 't_ICItemMaterial',@Fields = 'FPLMMaterialVerID VARCHAR(36)'
    EXEC SP_CREATE_ICItem_VIEW
    EXEC SP_CREATE_ICItem_TRIGGER
END
GO

--修正以下数据
UPDATE t_ItemPropDesc SET FIsInput = 1 WHERE FItemClassID=4 AND FSQLColumnName='FUnitID'
UPDATE t_ItemPropDesc SET FIsInput = 1 WHERE FItemClassID=4 AND FSQLColumnName='FCtrlType'
UPDATE t_ItemPropDesc SET FIsInput = 1,FPrecision = 10,FActualSize = 10 WHERE FItemClassID=4 AND FSQLColumnName='FPlanMode'
UPDATE t_ItemPropDesc SET FPrecision = 10,FActualSize = 10 WHERE FItemClassID=4 AND FSQLColumnName='FAuxClassID'
UPDATE t_ItemPropDesc SET FPrecision = 10,FActualSize = 10 WHERE FItemClassID=4 AND FSQLColumnName='FTypeID'
UPDATE t_ItemPropDesc SET FPrecision = 10,FActualSize = 10 WHERE FItemClassID=4 AND FSQLColumnName='FUnitGroupID'
UPDATE t_ItemPropDesc SET FPrecision = 10,FActualSize = 10 WHERE FItemClassID=4 AND FSQLColumnName='FAdminAcctID'
UPDATE t_ItemPropDesc SET FPrecision = 10,FActualSize = 10 WHERE FItemClassID=4 AND FSQLColumnName='FBatchSplitDays'
UPDATE t_ItemPropDesc SET FPrecision = 10,FActualSize = 10 WHERE FItemClassID=4 AND FSQLColumnName='FCBAppendProject'
UPDATE t_ItemPropDesc SET FPrecision = 10,FActualSize = 10 WHERE FItemClassID=4 AND FSQLColumnName='FOutMachFeeProject'
UPDATE t_ItemPropDesc SET FPrecision = 10,FActualSize = 10 WHERE FItemClassID=4 AND FSQLColumnName='FHSNumber'
UPDATE t_ItemPropDesc SET FPrecision = 10,FActualSize = 10 WHERE FItemClassID=4 AND FSQLColumnName='FLenDecimal'
UPDATE t_ItemPropDesc SET FPrecision = 10,FActualSize = 10 WHERE FItemClassID=4 AND FSQLColumnName='FCubageDecimal'
UPDATE t_ItemPropDesc SET FPrecision = 10,FActualSize = 10 WHERE FItemClassID=4 AND FSQLColumnName='FWeightDecimal'
GO
