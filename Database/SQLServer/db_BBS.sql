use db_BBS
GO

create table tb_User( --用户信息表
	UserId bigint primary key, --用户ID
	UserLoginName char(10) not null,--用户登录名
	UserSex char(10),--用户性别
	UserPwd char(10) not null,--用户登录密码
	UserName char(10),--用户真实姓名
	UserQuePwd varchar(50),--密码提示问题
	UserAnsPwd varchar(50),--提示问题答案
	UserTel char(10),--用户电话
	UserEmail varchar(50),--用户Email地址
	UserAddress varchar(50),--用户地址
	UserPostCode char(10),--用户邮编
	UserIP varchar(25),--用户IP地址
	UserQQ char(10),--用户QQ
	MarkID bigint,--积分对应ID
	UserMark bigint,--用户积分
	UserDate datetime --用户注册日期
)

create table tb_Admin( --管理员信息表
	AdminID bigint primary key,--管理员ID
	AdminName char(10) not null,--管理员登录名
	AdminPwd char(10) not null --管理员密码
) 

create table tb_Module( --模块信息类
	ModuleID bigint primary key,--模块ID
	ModuleName varchar(50),--模块名称
	ModuleDate datetime --加入模块日期
)

create table tb_Card( --帖子信息类
	CardID bigint primary key,--帖子ID
	UserID bigint,--发帖人
	ModuleID bigint,--所属模块
	CardName char(10),--帖子标题
	CardContent varchar(16),--帖子内容
	CardIsPride char(10),--帖子是否为精华帖
	CardDate datetime --帖子发表日期
)

create table tb_Mark( --用户积分表
	MarkID bigint primary key,--头衔ID
	MarkName char(50),--头衔名称
	Mark char(50) --所需积分
)

create table tb_Help( --帮助信息表
	HelpID bigint primary key,--帮助列表ID
	HelpName char(10),--帮助列表
	HelpContent varchar(16) --相应内容
)

create table tb_RevertCard( --回帖信息表
	RevertCardID bigint primary key,--回帖ID
	CardId bigint,--所属帖子
	RevertCardContent varchar(16),--回帖内容
	RevertCardDate datetime --回帖日期
)

CREATE VIEW UserInfo_View
AS
SELECT dbo.tb_User.UserID, dbo.tb_User.UserLoginName, dbo.tb_User.UserSex, 
      dbo.tb_User.UserTel, dbo.tb_User.UserEmail, dbo.tb_User.UserAddress, 
      dbo.tb_User.UserPostCode, dbo.tb_User.UserIP, dbo.tb_User.UserQQ, 
      dbo.tb_User.UserMark, dbo.tb_Mark.MarkName, dbo.tb_User.UserDate, 
      dbo.tb_Card.UserID AS Expr1
FROM dbo.tb_Card INNER JOIN
      dbo.tb_User ON dbo.tb_Card.UserID = dbo.tb_User.UserID INNER JOIN
      dbo.tb_Module ON dbo.tb_Card.ModuleID = dbo.tb_Module.ModuleID INNER JOIN
      dbo.tb_Mark ON dbo.tb_User.MarkID = dbo.tb_Mark.MarkID
      
CREATE VIEW ModuleInfo_View
AS
SELECT dbo.tb_Module.ModuleID, dbo.tb_Module.ModuleName, dbo.tb_Card.CardName, 
      dbo.tb_Module.ModuleDate
FROM dbo.tb_Card INNER JOIN
      dbo.tb_Module ON dbo.tb_Card.ModuleID = dbo.tb_Module.ModuleID
      
CREATE VIEW CardInfo_View
AS
SELECT dbo.tb_Card.CardID, dbo.tb_Card.ModuleID, dbo.tb_Card.UserID, 
      dbo.tb_Card.CardName, dbo.tb_Card.CardContent, dbo.tb_Card.CardDate, 
      dbo.tb_RevertCard.RevertCardContent, dbo.tb_RevertCard.RevertCardDate
FROM dbo.tb_Card INNER JOIN
      dbo.tb_RevertCard ON dbo.tb_Card.CardID = dbo.tb_RevertCard.CardID





