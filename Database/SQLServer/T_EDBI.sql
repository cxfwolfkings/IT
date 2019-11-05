use BDIS_EDBI_DB
go

select DB_ID('BDIS_EDBI_DB')

select * from T_DEF_FieldType

select * from T_DEF_Rule

select * from T_CFG_View

-- 模板上传日志
select l.*,t.TemplateName from (select *,row_number() over(order by RID) as rowIndex from T_Template_Upload_Log) l inner join T_Template t on l.TemplateKID = t.KID  where l.rowIndex between 1 and 10

select * from T_Entity_Province

select * from T_Entity_City

select * from T_Entity_ProvinceMapCity

select p.ProvinceName, c.CityName from T_Entity_Province p
	inner join T_Entity_ProvinceMapCity pc on pc.ProvinceKID = p.KID
	inner join T_Entity_City c on c.KID = pc.CityKID

-- 
select * from T_Entity_HospitalAlias where HospitalAlias = N'李军诊所'

select * from ocm_biz_Hospital

select * from T_Template

select top 20 * from (
select a.RID,a.KID,a.MappingID,a.DealerCode,a.DealerName,a.HospitalAlias,a.Address,a.CityName,b.HospitalCode as SDMCode,b.NameCn as SDMName, b.KID as HsopitalKID
	from T_Entity_HospitalAlias a left join ocm_biz_Hospital b on a.HospitalKID=b.KID 
    where a.IsDelete=0) alias 
	where RID not in (select top 20 RID from T_Entity_HospitalAlias order by RID) order by alias.RID

select * from T_Template_Upload_Log
delete from T_Template_Upload_Log where TemplateKID = 0
select l.*,t.TemplateName from (select *,row_number() over(order by CreateOn desc) as rowIndex from T_Template_Upload_Log) l inner join T_Template t on l.TemplateKID = t.KID  where l.rowIndex between 1 and 20