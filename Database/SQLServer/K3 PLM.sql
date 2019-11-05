--Cad图片信息表
create table Plugin_Epm(
	pngId int identity(1,1) primary key,
	epmId varchar(100), --图文档ID
	pngPath varchar(300), --图片路径
	cad image, --cad图片
	imgId varchar(100),--网页上img元素的标识(设置),
	epmUpdateTime datetime, --epm更新时间，从文档表中读取
	createTime datetime default getDate() --创建时间
)
go
select * from Plugin_Epm order by epmId
update Plugin_Epm set imgId = '固晶压焊图' where pngId=2
go
--表单实例和Cad图片关联	
create table Plugin_Form_Link(	
	formId varchar(100), --表单实例ID
	imgId varchar(100),--网页上img元素的ID
	imgValue varchar(100), --网页上img元素的值
	cad image, --cad图片
	createTime datetime default getDate() --创建时间
)	
go
select * from Plugin_Form_Link
--获取系统中全部Cad文档
select * from DOC_DocumentVersion 
	where IsEffective=1
	and IsBlankOut=0
	and IsChange=0
	and IsCheckOut=0
	and FileExtension='dwg'
	and (select top 1 ObjectId
			from V_Doc_RelationObject_New
			where ObjectOption = 1 
			and LanguageId=0 
			and SrcObjectId=DOC_DocumentVersion.VerId) is not null
Go
select * from plugin_sys
Go
select * from plugin_log
Go
--删除多余日志的存储过程
create proc deleteRecords
as
begin
	declare @records table(logId varchar(100))
	insert into @records
		select logId from (select row_number()over(order by createTime desc) rn,* from plugin_Log) r where rn>1000
	delete from plugin_Log where logId in (select logId from @records)
end
GO
--删除多余表单关联关系
create proc deleteForms
as
begin
	declare @froms table(formId varchar(100))
	insert into @froms
		select max(pl.formId) formId from Plugin_Form_Link pl
			left outer join PF_Instances pf on pl.formId=pf.VerId
			where pf.VerId is null
	delete from Plugin_Form_Link where formId in (select formId from @froms)
end
go
select * from V_Doc_RelationObject_New where LanguageId=0 
go
sp_helptext Mat_GetRelationDocByBOM
go
sp_helptext Mat_GetRelationDocById
go
if exists(select * from sysobjects where id = object_id(N'[Mat_GetRelationDocByBOM]') 
				and OBJECTPROPERTY(id, N'IsProcedure') = 1)
	drop proc Mat_GetRelationDocByBOM
Go
--根据产品模具号获取BOM中关联的CAD文档
alter proc Mat_GetRelationDocByBOM(
    @id varchar(100)
)
as
begin
  declare @tempTable table(ID int identity(1,1), MaterialVerId varchar(100))
	declare @epm table(PartID varchar(100), EPMDocumentID varchar(100), EPMUpdateTime datetime);
	with Materials as(
		select top 1 MaterialVerId  from MAT_MaterialVersion 
			where VerDesc = @id and MaterialType=0
		union all 
		select mr.ChildVerId from Materials, MAT_MaterialRelation mr 
			where Materials.MaterialVerId = mr.ParentVerId
	)
	--获取产品关联文档
	insert into @tempTable
		select MaterialVerId from Materials
	declare @i int  
	declare @j int  
	declare @VerId varchar(100) 
	set @i = 0  
	select @j = MAX(ID) from @tempTable  
	while @i < @j 
	begin  
		set @i = @i+1   
		select @VerId=MaterialVerId from @tempTable where ID = @i  	
		insert into @epm  
			exec Mat_GetRelationDocById @VerId
	end
	select * from @epm 
end
go
select * from MAT_MaterialVersion
Go
--游标的性能很差，所以使用Table变量代替游标
--根据物料Id获取关联CAD文档
create proc Mat_GetRelationDocById(
    @MaterialVerId varchar(100)
)
as
begin
	declare @tempTable table(ID int identity(1,1), EpmDocumentId varchar(100))
	declare @EPMDocument Table(PartID varchar(100),EPMDocumentID varchar(100),EPMUpdateTime datetime)
	declare @EpmDocumentId varchar(100),@EPMUpdateTime datetime
	insert into @tempTable
		select SrcObjectId from V_Doc_RelationObject_New
			where ObjectOption = 1 and ObjectId = @MaterialVerId and LanguageId=0
	declare @i int  
	declare @j int  
	set @i = 0  
	select @j = MAX(ID) from @tempTable  
	while @i < @j 
	begin  
		set @i = @i+1   
		select @EpmDocumentId=EpmDocumentId from @tempTable where ID = @i  	
		select @EPMUpdateTime=UpdateDate from DOC_DocumentVersion where VerId=@EpmDocumentId
		insert into @EPMDocument  
			values (@MaterialVerId, @EpmDocumentId, @EPMUpdateTime);
	end
	select * from @EPMDocument
end
GO
exec Mat_GetRelationDocByBOM 'ARK141205-1'
Go

select * from v_MAT_BOM 
	where 模具编号='ARK141205-1' 
	and ERP业务类型 in('02.01.02','02.02.03','02.05.03','02.05.04','02.11') 
	ORDER BY Seq

go
create view v_test1
as
select * from PP_PBOM
go
select * from MAT_MaterialVersion
select Code,Name from MAT_MaterialVersion where MaterialVerId in
(
select mr.ChildVerId from MAT_MaterialVersion  mv
	inner join MAT_MaterialRelation mr on mv.MaterialVerId = mr.ParentVerId
	where mv.VerDesc = 'ARK141205-1'
	)

select * from MAT_MaterialVersion where VerDesc='ARK141205-1'
go
sp_helptext v_MAT_getMaterial
--主数据源
alter view v_MAT_getMaterial
as
  select Code 产品编号,Name 产品名称, VerDesc 模具号, Spec 规格 from MAT_MaterialVersion
go

