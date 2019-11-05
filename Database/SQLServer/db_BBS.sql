use db_BBS
GO

create table tb_User( --�û���Ϣ��
	UserId bigint primary key, --�û�ID
	UserLoginName char(10) not null,--�û���¼��
	UserSex char(10),--�û��Ա�
	UserPwd char(10) not null,--�û���¼����
	UserName char(10),--�û���ʵ����
	UserQuePwd varchar(50),--������ʾ����
	UserAnsPwd varchar(50),--��ʾ�����
	UserTel char(10),--�û��绰
	UserEmail varchar(50),--�û�Email��ַ
	UserAddress varchar(50),--�û���ַ
	UserPostCode char(10),--�û��ʱ�
	UserIP varchar(25),--�û�IP��ַ
	UserQQ char(10),--�û�QQ
	MarkID bigint,--���ֶ�ӦID
	UserMark bigint,--�û�����
	UserDate datetime --�û�ע������
)

create table tb_Admin( --����Ա��Ϣ��
	AdminID bigint primary key,--����ԱID
	AdminName char(10) not null,--����Ա��¼��
	AdminPwd char(10) not null --����Ա����
) 

create table tb_Module( --ģ����Ϣ��
	ModuleID bigint primary key,--ģ��ID
	ModuleName varchar(50),--ģ������
	ModuleDate datetime --����ģ������
)

create table tb_Card( --������Ϣ��
	CardID bigint primary key,--����ID
	UserID bigint,--������
	ModuleID bigint,--����ģ��
	CardName char(10),--���ӱ���
	CardContent varchar(16),--��������
	CardIsPride char(10),--�����Ƿ�Ϊ������
	CardDate datetime --���ӷ�������
)

create table tb_Mark( --�û����ֱ�
	MarkID bigint primary key,--ͷ��ID
	MarkName char(50),--ͷ������
	Mark char(50) --�������
)

create table tb_Help( --������Ϣ��
	HelpID bigint primary key,--�����б�ID
	HelpName char(10),--�����б�
	HelpContent varchar(16) --��Ӧ����
)

create table tb_RevertCard( --������Ϣ��
	RevertCardID bigint primary key,--����ID
	CardId bigint,--��������
	RevertCardContent varchar(16),--��������
	RevertCardDate datetime --��������
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





