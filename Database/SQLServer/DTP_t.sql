--用户详情
select * from Users
--登录用户
select * from LoginUser
--职位
select * from Position
--单位表
select * from Depart
insert into Depart values('HOS-000001','',0,1,N'无锡市中医院',N'无锡市滨湖区',N'三甲医院','','',1,1,'wxszyy','',GETDATE(),'admin',GETDATE(),'admin',null,'')
insert into Depart values('HOS-000002','',0,1,N'上海市第六人民医院',N'上海市',N'','','',1,2,'shdlrmyy','',GETDATE(),'admin',GETDATE(),'admin',null,'')
insert into Depart values('HOS-000003','',0,1,N'复旦大学附属肿瘤医院',N'上海市',N'','','',1,3,'fddxfszlyy','',GETDATE(),'admin',GETDATE(),'admin',null,'')
insert into Depart values('UNIT-000001','HOS-000001',1,1,N'心肺科',N'无锡市滨湖区',N'','','',1,1,'xfk','',GETDATE(),'admin',GETDATE(),'admin',null,'')
insert into Depart values('UNIT-000002','HOS-000001',1,1,N'胃肠科',N'无锡市滨湖区',N'','','',1,1,'wck','',GETDATE(),'admin',GETDATE(),'admin',null,'')
insert into Depart values('UNIT-000003','HOS-000001',1,1,N'五官科',N'无锡市滨湖区',N'','','',1,1,'wgk','',GETDATE(),'admin',GETDATE(),'admin',null,'')
insert into Depart values('UNIT-000004','HOS-000001',1,1,N'泌尿科',N'无锡市滨湖区',N'','','',1,1,'mnk','',GETDATE(),'admin',GETDATE(),'admin',null,'')
insert into Depart values('UNIT-000005','HOS-000001',1,1,N'皮肤科',N'无锡市滨湖区',N'','','',1,1,'pfk','',GETDATE(),'admin',GETDATE(),'admin',null,'')
insert into Depart values('UNIT-000006','HOS-000001',1,1,N'骨科',N'无锡市滨湖区',N'','','',1,1,'gk','',GETDATE(),'admin',GETDATE(),'admin',null,'')
insert into Depart values('DS-000001','',0,2,N'测试药店',N'天津市北辰区',N'','','',1,1,'csyd','',GETDATE(),'admin',GETDATE(),'admin',null,'')
--库存地点
select * from InvAddr
insert into InvAddr values
('INVA-00001', N'输注中心', 'HOS-000001', '', 1, '', 0, 'SZZX', '', 1, 1, GETDATE(), 'admin', GETDATE(), 'admin', null, null),
('INVA-00002', N'西药房', 'HOS-000001', '', 1, '', 0, 'XYF', '', 1, 1, GETDATE(), 'admin', GETDATE(), 'admin', null, null),
('INVA-00003', N'中药房', 'HOS-000001', '', 1, '', 0, 'ZYF', '', 1, 1, GETDATE(), 'admin', GETDATE(), 'admin', null, null);
--角色
select * from Roles
--用户角色关系
select * from RelUserRole
--模块表
select * from Module
--角色权限关系
select * from RelRoleModule
--药店服务医院关系
select * from RelStoreHospital
--预约登记信息
select * from RegistationInfo
--预约药品信息表
select * from RegistationMedicine
--订单
select * from dbo.[Order]
--订单详情
select * from OrderDrugDetail
--配送单
select * from Deliver
--配送单药品
select * from DeliverDrugDetail
--患者信息表
select * from Patient
--顾客
select * from Customer
alter table Customer alter column 关联用药人编号 varchar(32)
--配送员
select * from DeliverMan
insert into DeliverMan values('DELI-20170306-000001','DS-000001',N'戴宗','dz','',1,30,'1987-01-01','320183198701016515','18888888885',N'水泊梁山',N'梁山忠义堂','',N'神行太保快递',N'日行千里',1,'admin',GETDATE(),'admin',GETDATE())
--配送图片
select * from DeliverPhoto
--入出库记录
select * from InOutStorage
--入出库药品明细
select * from InOutStorageDrugDetail
--药品分类
select * from DrugCategory
insert into DrugCategory values('HOS-000001','DRST-000001',N'抗癌药',0,null,1,0,GETDATE(),'admin',null,null,null,null)
insert into DrugCategory values('HOS-000001','DRST-000001',N'感冒药',0,null,1,0,GETDATE(),'admin',null,null,null,null)
insert into DrugCategory values('HOS-000001','DRST-000001',N'肺癌药',1,null,1,0,GETDATE(),'admin',null,null,null,null)
insert into DrugCategory values('HOS-000001','DRST-000001',N'胃癌药',1,null,1,0,GETDATE(),'admin',null,null,null,null)
insert into DrugCategory values('HOS-000001','DRST-000001',N'肝癌药',1,null,1,0,GETDATE(),'admin',null,null,null,null)
insert into DrugCategory values('HOS-000001','DRST-000001',N'血癌药',1,null,1,0,GETDATE(),'admin',null,null,null,null)
--药品明细
select * from DrugDetail
alter table DrugDetail add DrugType nvarchar(32)
alter table DrugDetail add DrugBrand nvarchar(32)
insert into DrugDetail values('MED-000001','DRST-000001',N'赫赛汀','hst','','440mg/20ml',N'盒','','','',1,1,GETDATE(),'admin',GETDATE(),'admin','','',N'抗癌药',N'罗氏');
--药品单位
select * from DrugUnit
insert into DrugUnit values('MED-000001','HOS-000001','DRST-000001',1,N'测试单位',1,0.9,1,1,GETDATE(),'admin',GETDATE(),'admin','','');
--药品别名
CREATE TABLE [dbo].[DrugAlias](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[DrugID] [varchar](20) NOT NULL,
	[HospitalID] [varchar](32) NULL,
	[DrugStoreID] [varchar](32) NULL,
	[DrugAliasName] [nvarchar](50) NULL,
	[PYCode] [varchar](50) NULL,
	[WBCode] [varchar](50) NULL,
	[Status] [int] NULL,
	[OrderNum] [int] NULL,
	[CreateTime] [datetime] NULL,
	[Creator] [nvarchar](50) NULL,
	[ModifyTime] [datetime] NULL,
	[Modifier] [nvarchar](50) NULL,
	[DeleteTime] [datetime] NULL,
	[Deleter] [nvarchar](50) NULL,
 CONSTRAINT [PK_DrugAlias] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
select * from DrugAlias
--生产厂商
select * from FacDoc
--患者额度
select * from PatientDrugCredit
--盘点记录表
CREATE TABLE [dbo].[InventoryRecord](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[InventoryCode] [varchar](64) NOT NULL,
	[HospitalID] [varchar](32) NULL,
	[InvoAddrID] [varchar](32) NULL,
	[InventoryMakeTime] datetime NULL,
	[InventoryMaker] [varchar](32) NULL,
	[InventoryMakeDeptID] [varchar](32) NULL,
	[InventoryMakeMemo] [nvarchar](255) NULL,
	[InventoryAffectTime] [datetime] NULL,
	[InventoryAffectorID] [varchar](32) NULL,
	[InventoryAffectDeptID] [varchar](32) NULL,
	[InventoryAffectMemo] [nvarchar](255) NULL,
	[InventoryApprovalTime] [datetime] NULL,
	[InventoryApprover] [varchar](32) NULL,
	[InventoryApprovalMemo] [nvarchar](255) NULL,
	[InventoryStatus] [int] NULL,
	[Status] [int] NULL,
	[Creator] [nvarchar](50) NULL,
	[CreateTime] [datetime] NULL,
	[Modifier] [nvarchar](50) NULL,
	[ModifyTime] [datetime] NULL
 CONSTRAINT [PK_InventoryRecord] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
select * from InventoryRecord
--盘点药品明细表
select * from InventoryRecordDrugDetail
alter table InventoryRecordDrugDetail add RealAmount decimal(18,4)
--药品实时库存明细
select * from DrugRealInventoryDetail
insert into DrugRealInventoryDetail values('HOS-000001','INVA-00001','DRUG-20170320-000001',N'赫塞汀',1,'20ml/440ml','','PT-20170303-000001','','',0,34,1,N'盒',34,N'盒',0,'USERS-DS-000001',GETDATE(),'USERS-DS-000001',GETDATE());
--定时结转药品库存明细
select * from DrugCarryoverInventoryDetail
--领药申请
select * from [Apply]
--领药申请审批药品明细
select * from [ApplyDrugDetail]
--损耗知情同意书签署记录
select * from LossInformedConsent
--配药记录表
select * from Dispense
--配药药品明细
select * from DispenseDrugDetail
--损坏登记
select * from DamageRecord
--输注记录
select * from Infusion
--输注药品明细
select * from InfusionDrugDetail
--消息
select * from [Message]
--消息接收
select * from MessageSendReceive
--编码表
select * from CodeTable
insert into CodeTable values(null,null,6,N'配送状态',1,N'待确认',2,null,'','',0,GETDATE(),'admin',null,null,null,null,null)
insert into CodeTable values(null,null,6,N'配送状态',2,N'已配送',2,null,'','',0,GETDATE(),'admin',null,null,null,null,null)
insert into CodeTable values(null,null,6,N'配送状态',3,N'已收货',2,null,'','',0,GETDATE(),'admin',null,null,null,null,null)
insert into CodeTable values(null,null,6,N'配送状态',4,N'已拒收',2,null,'','',0,GETDATE(),'admin',null,null,null,null,null)
insert into CodeTable values(null,null,6,N'配送状态',5,N'已部分收货',2,null,'','',0,GETDATE(),'admin',null,null,null,null,null)
insert into CodeTable values(null,null,11,N'盘点状态',1,N'已保存',1,null,'','',0,GETDATE(),'admin',null,null,null,null,null)
insert into CodeTable values(null,null,11,N'盘点状态',2,N'已实盘',1,null,'','',0,GETDATE(),'admin',null,null,null,null,null)
insert into CodeTable values(null,null,11,N'盘点状态',3,N'已审核',1,null,'','',0,GETDATE(),'admin',null,null,null,null,null)
--系统参数
select * from SystemParam
--缓存基础
select * from DataCenterCacheConfig
--日志
select * from [Log]
--事件类型
select * from EventType
--序列
select * from SequenceRule
insert into SequenceRule values('ReservationNo', 'DS-000001', N'预约登记号', null, 1, GETDATE(), 'admin', 9999, GETDATE(), null, 3, 'RS<YYYY><MM><DD><XXX>', null, 0, 1, 2, 0);

declare @ReturnNum varchar(60)
exec SP_GetSeqence 'RegistationNo','DS-000001',@ReturnNum output,''
select @ReturnNum

/****** Object:  StoredProcedure [dbo].[SP_GetSeqence]    Script Date: 03/20/2017 11:12:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER PROCEDURE [dbo].[SP_GetSeqence]
		  @SeqCode varchar(60),				-- 规则代码
          @DeptID varchar(32) ,             -- 所属单位编码，如药店编码或医院编码
		  @ReturnNum varchar(40) OUTPUT,	-- 返回的流水号
		  @MessageCode varchar(800) OUTPUT	-- 异常消息等

AS
/* Exec SP_GetSeqence 'OrderNo','',''
*****************************************************************
功能描述：	获取数据表的主键流水号(INV, ASN, SO...)
	
主要思路：	1.取得最新流水号信息
			2.把所有固定的规则信息替换成具体值，其他保持不变
			eg:
			规则为：		PO<YYYY><YY><MM><XXX>
			当前日期为：	20160630
			当前流水号为：12
			最终流水号为：PO201606013
			
******************************************************************
*/


/*
* SET NOCOUNT ON 的作用:
* 不返回受影响行数
* 存储过程中包含的一些语句并不返回许多实际的数据，则该设置由于大量减少了网络流量，因此可显著提高性能。
* */
SET NOCOUNT ON

DECLARE @SeqNowNumStr VARCHAR(20)	--当前值字符类型	
DECLARE @SeqNowNum BIGINT			--当前值	
DECLARE @year CHAR(4)				--年 YYYY
DECLARE @month CHAR(2)				--月 MM
DECLARE @day CHAR(2)				--日 DD
DECLARE @Length INT					--流水号长度
DECLARE @DataFormat VARCHAR(50)		--流水号规则
DECLARE @IniValue INT				--归零值
DECLARE @ResetType VARCHAR(10)		--归零方式
DECLARE @LastDate	CHAR(8)			--日期最大值			
DECLARE @WorkFLowStr VARCHAR(20) 	--前一次调用流水号时的日期值
DECLARE @DataNow CHAR(8)			--当前日期
DECLARE @i INT						--转换变量,作用参照代码上下文
	

/*
* SET XACT_ABORT ON 的作用:
* 存储中的某个地方出了问题，整个事务中的语句都会回滚
* */
SET XACT_ABORT ON
BEGIN TRY

	/* 初始化变量 */
	 SET @MessageCode='999'
	 SET @ReturnNum = '0'
	 SET @Length=0
	 SET @SeqNowNum =0;
	 SET @DataNow=CONVERT(CHAR(8),GETDATE(),112) --得到 20160704 的时间格式
	 SET @year=SUBSTRING(@DataNow,1,4)
	 SET @month =SUBSTRING(@DataNow,5,2)
	 SET @day =SUBSTRING(@DataNow,7,2)
	 
	 Set @i=1 
	 
	 /***********如果有并发的正在运行,最多等待0.06秒,然后继续运行 Start*******/           
	 BEGIN TRANSACTION 
		 wait:
		 Update SequenceRule Set [IsRunning]='1' where SeqCode=@SeqCode and DeptID=@DeptID and IsRunning='0'
		If @@Rowcount=0	
		Begin
			Waitfor Delay '00:00:01'
			Set @i=@i+1
			If @i<6 goto wait
		End
	  
	 COMMIT TRANSACTION   
	 /***********如果有并发的正在运行,最多等待0.06秒,然后继续运行 End*******/           

	Select @Length = SeqLength,@SeqNowNum=NowSeqValue,@LastDate=DateMax,@DataFormat=DataFormat
		,@ResetType=ResetType,@IniValue =InitValue
			From SequenceRule where SeqCode=@SeqCode and DeptID=@DeptID
						if @SeqNowNum=0  --当前值正常情况下不可能是0
						begin
						   Set @MessageCode='100'  --当前值 错误代码
						   select @MessageCode,@DeptID
						   return
						END
						--@ResetType=1 不归零 2 按日归零   3 按月归零   4按年归零
	If (@ResetType=2 and @DataNow<>@LastDate  AND @IniValue>0)
		OR (@ResetType=3 and @year+@month<>SUBSTRING(@LastDate,1,6) AND @IniValue>0)
		OR (@ResetType=4 and @year<>SUBSTRING(@LastDate,1,4) AND @IniValue>0 )
	   BEGIN
   		SET @SeqNowNum=@IniValue
	   END 
	 SET  @i=@Length --@i 此时表示流水号的总长度
	      
	 /***********拼流水号格式 Start*******/           
	 SET @WorkFLowStr='<'
	 WHILE @Length>0 
	 BEGIN
 		SET @WorkFLowStr=@WorkFLowStr+'X'
 		SET @Length=@Length-1
	 END  
	 SET @WorkFLowStr=@WorkFLowStr+'>' 
	 /***********拼流水号格式 End*******/
	 
	 set @SeqNowNumStr=CONVERT(VARCHAR(20),@SeqNowNum)
	 SET @Length=@i-len(@SeqNowNumStr)  --@Length 要补零的位数(eg:@SeqNowNumStr=148 当前流水号是五位，最后流水号为00148，00 就是需要补的两位)
	 
	 /***********补零操作 Start*******/           
	 WHILE @Length>0 
	 BEGIN
 		SET @SeqNowNumStr='0'+@SeqNowNumStr
 		SET @Length=@Length-1
	 END
	 /***********补零操作 End*******/           
	 
	 SET @ReturnNum=REPLACE( @DataFormat,'<YYYY>',@year);			-- 把规则中<YYYY>替换成相应年
	 SET @ReturnNum=REPLACE( @ReturnNum,'<MM>',@month);				-- 把规则中<MM>替换成相应月
	 SET @ReturnNum=REPLACE( @ReturnNum,'<DD>',@day);				-- 把规则中<DD>替换成相应日
	 SET @ReturnNum=REPLACE( @ReturnNum,@WorkFLowStr,@SeqNowNumStr);-- 把规则中的形如<XXX>的替换成相应流水号，
	 
	 
	 /***********更新当前流水值为最大流水号、上一个流水号生成时间和运行标记(运行标记置为"0"(没有运行) ) Start*******/
	Begin transaction
	 
	 UPDATE SequenceRule SET NowSeqValue=@SeqNowNum+1,DateMax=@DataNow,ISRUNNING='0', ModifyTime=Getdate()
	 WHERE IsRunning='1' and DeptID=@DeptID AND  SeqCode=@SeqCode
	 --SELECT * FROM RUL_Sequence WHERE IsRunning='2' AND SeqCode=@SeqCode
	-- PRINT @SeqNowNum+1
	Commit transaction 
	 /***********更新当前流水值为最大流水号、上一个流水号生成时间和运行标记(运行标记置为"0"(没有运行) ) End*******/
   PRINT @ReturnNum
   SELECT @ReturnNum AS Number
	RETURN 

END TRY

--错误捕获
BEGIN   CATCH   
     ROLLBACK TRANSACTION  
  set @MessageCode='行号='+cast(ERROR_LINE() as varchar(10))+'错误信息'+ERROR_MESSAGE() 
  	+'['+ERROR_PROCEDURE()+']'
   IF @@ROWcount<=0 
      set @MessageCode='无此编号规则'+@MessageCode
    SELECT  @MessageCode
END   CATCH
