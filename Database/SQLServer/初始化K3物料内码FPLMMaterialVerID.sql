--���½ű���K3���ݿ�ִ�У�����Ϊ��Ҫ������д��PLM���ݿ�������Ϣ

EXEC sp_addlinkedserver 'Զ��PLM���ݿ��IP��������',N'SQL Server'
GO
EXEC sp_addlinkedsrvlogin 'Զ��PLM���ݿ��IP��������', 'false', NULL, '��¼��', '����'
GO
Update b  set b.FPLMMaterialVerID = m.BaseId from
t_Item a inner join t_ICItemMaterial b
on a.FItemID =  b.FItemID
inner join [Զ��PLM���ݿ��IP��������].[PLM���ݿ���].[dbo].[Mat_materialversion] m  
on a.FNumber = m.CODE
GO
exec sp_droplinkedsrvlogin 'Զ��PLM���ݿ��IP��������',null
Go
exec sp_dropserver 'Զ��PLM���ݿ��IP��������'
Go

--EXEC sp_addlinkedserver '192.168.15.241',N'SQL Server'
--GO
--EXEC sp_addlinkedsrvlogin '192.168.15.241', 'false', NULL, 'sa', '1'
--GO
--Update b  set b.FPLMMaterialVerID = m.BaseId from
--t_Item a inner join t_ICItemMaterial b
--on a.FItemID =  b.FItemID
--inner join [192.168.15.241].[PLM].[dbo].[Mat_materialversion] m  
--on a.FNumber = m.CODE AND m.CODE = 'XX'
--GO
--exec sp_droplinkedsrvlogin '192.168.15.241',null
--Go
--exec sp_dropserver '192.168.15.241'
--Go