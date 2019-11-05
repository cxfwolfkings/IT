--���½ű���K3���ݿ�ִ�У�����Ϊ��Ҫ������д��PLM���ݿ�������Ϣ

EXEC sp_addlinkedserver 'Զ��PLM���ݿ��IP��������',N'SQL Server'
GO
EXEC sp_addlinkedsrvlogin 'Զ��PLM���ݿ��IP��������', 'false', NULL, 'sa', 'sa'
GO

--PLM��Ӧ��Ϊʹ��״̬BOM
declare @UseStatusBom table (FNumber nvarchar(80), FBOMNumber nvarchar(300))

insert into @UseStatusBom
select b.FNumber, a.FBOMNumber
from ICbom a 
inner join t_Item b on a.FItemID =  b.FItemID
inner join [Զ��PLM���ݿ��IP��������].[PLM���ݿ���].[dbo].[Mat_materialversion] m on b.FNumber = m.CODE
Where  a.FUseStatus = 1072 --ʹ��״̬

----������ʹ��״̬��BOM
Update mb  set mb.K3BOMNumber = a.FBOMNumber 
from
@UseStatusBom a 
inner join [Զ��PLM���ݿ��IP��������].[PLM���ݿ���].[dbo].[Mat_materialversion] m on a.FNumber = m.CODE
inner join [Զ��PLM���ݿ��IP��������].[PLM���ݿ���].[dbo].[Mat_materialBase] mb on m.BaseId = mb.BaseId
Where mb.K3BOMNumber = '' or mb.K3BOMNumber is null

--����û��ʹ��״̬��BOM��ȡ���BOM����
Update mb  set mb.K3BOMNumber = t.FBOMNumber  
from 
(select b.FNumber, max(a.FBOMNumber) as FBOMNumber  from ICbom a 
inner join t_Item b on a.FItemID =  b.FItemID
inner join [Զ��PLM���ݿ��IP��������].[PLM���ݿ���].[dbo].[Mat_materialversion] m on b.FNumber = m.CODE
Where  b.FNumber not in (select FNumber from @UseStatusBom) 
group by b.FNumber
) t
inner join [Զ��PLM���ݿ��IP��������].[PLM���ݿ���].[dbo].[Mat_materialversion] m on t.FNumber = m.CODE
inner join [Զ��PLM���ݿ��IP��������].[PLM���ݿ���].[dbo].[Mat_materialBase] mb on m.BaseId = mb.BaseId
Where mb.K3BOMNumber = '' or mb.K3BOMNumber is null

exec sp_droplinkedsrvlogin 'Զ��PLM���ݿ��IP��������',null
Go
exec sp_dropserver 'Զ��PLM���ݿ��IP��������'
Go