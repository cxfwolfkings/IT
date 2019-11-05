--以下脚本在K3数据库执行；中文为需要具体填写的PLM数据库连接信息

EXEC sp_addlinkedserver '远程PLM数据库的IP或主机名',N'SQL Server'
GO
EXEC sp_addlinkedsrvlogin '远程PLM数据库的IP或主机名', 'false', NULL, 'sa', 'sa'
GO

--PLM对应的为使用状态BOM
declare @UseStatusBom table (FNumber nvarchar(80), FBOMNumber nvarchar(300))

insert into @UseStatusBom
select b.FNumber, a.FBOMNumber
from ICbom a 
inner join t_Item b on a.FItemID =  b.FItemID
inner join [远程PLM数据库的IP或主机名].[PLM数据库名].[dbo].[Mat_materialversion] m on b.FNumber = m.CODE
Where  a.FUseStatus = 1072 --使用状态

----更新是使用状态的BOM
Update mb  set mb.K3BOMNumber = a.FBOMNumber 
from
@UseStatusBom a 
inner join [远程PLM数据库的IP或主机名].[PLM数据库名].[dbo].[Mat_materialversion] m on a.FNumber = m.CODE
inner join [远程PLM数据库的IP或主机名].[PLM数据库名].[dbo].[Mat_materialBase] mb on m.BaseId = mb.BaseId
Where mb.K3BOMNumber = '' or mb.K3BOMNumber is null

--更新没有使用状态的BOM，取最大BOM单号
Update mb  set mb.K3BOMNumber = t.FBOMNumber  
from 
(select b.FNumber, max(a.FBOMNumber) as FBOMNumber  from ICbom a 
inner join t_Item b on a.FItemID =  b.FItemID
inner join [远程PLM数据库的IP或主机名].[PLM数据库名].[dbo].[Mat_materialversion] m on b.FNumber = m.CODE
Where  b.FNumber not in (select FNumber from @UseStatusBom) 
group by b.FNumber
) t
inner join [远程PLM数据库的IP或主机名].[PLM数据库名].[dbo].[Mat_materialversion] m on t.FNumber = m.CODE
inner join [远程PLM数据库的IP或主机名].[PLM数据库名].[dbo].[Mat_materialBase] mb on m.BaseId = mb.BaseId
Where mb.K3BOMNumber = '' or mb.K3BOMNumber is null

exec sp_droplinkedsrvlogin '远程PLM数据库的IP或主机名',null
Go
exec sp_dropserver '远程PLM数据库的IP或主机名'
Go