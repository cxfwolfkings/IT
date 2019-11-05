--以下脚本在K3数据库执行；中文为需要具体填写的PLM数据库连接信息

EXEC sp_addlinkedserver '远程PLM数据库的IP或主机名',N'SQL Server'
GO
EXEC sp_addlinkedsrvlogin '远程PLM数据库的IP或主机名', 'false', NULL, '登录名', '密码'
GO
Update b  set b.FPLMMaterialVerID = m.BaseId from
t_Item a inner join t_ICItemMaterial b
on a.FItemID =  b.FItemID
inner join [远程PLM数据库的IP或主机名].[PLM数据库名].[dbo].[Mat_materialversion] m  
on a.FNumber = m.CODE
GO
exec sp_droplinkedsrvlogin '远程PLM数据库的IP或主机名',null
Go
exec sp_dropserver '远程PLM数据库的IP或主机名'
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