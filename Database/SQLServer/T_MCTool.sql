select * from AbpUsers
select * from AbpUserAccounts
select * from AbpUserLogins
select * from AbpUserLoginAttempts
select * from AbpUserOrganizationUnits
select * from AbpUserRoles
select * from AbpRoles


select * from Contracts where Id='c43f788a-f7c9-45bc-b234-a19b0c6560ca'
select * from Quotations where Id='412adfad-7bfa-488c-914f-0b7a62c96776'
select Id, [Version], ContractID, TotalConrtactPrice from Quotations where Id='412adfad-7bfa-488c-914f-0b7a62c96776'
select * from ContractLineItems
select * from ContractLineItemChild

select c.Id, c.[Version], c.QuotationID, c.ChargeID, c.BottomPrice
	, cc.FixedCRP, cc.CRP, cc.DiscontListPrice, cc.DiscontRate, cc.Discont, cc.Margin
from ContractLineItems c
left join ContractLineItemChild cc on c.MCApprovalID = cc.Id
where c.QuotationID='412adfad-7bfa-488c-914f-0b7a62c96776'

select c.Id, c.[Version], c.QuotationID, c.ChargeID, cc.FixedCRP, cc.CRP, cc.InvolvedInCalculation from ContractLineItems c
left join ContractLineItemChild cc on c.RevenueAllocationID = cc.Id
where c.QuotationID='412adfad-7bfa-488c-914f-0b7a62c96776'
Go

-- 322.09325478
with ChargeIds as (
    select c.ChargeID from ContractLineItems c
    where c.QuotationID='412adfad-7bfa-488c-914f-0b7a62c96776' and c.ChargeID is not null
)
select sum(cc.CRP) from ContractLineItems c
left join ContractLineItemChild cc on c.MCApprovalID = cc.Id
where c.Id not in (select * from ChargeIds)
and c.QuotationID='412adfad-7bfa-488c-914f-0b7a62c96776'
and c.[Version] != 3

-- 324.51823792
with ChargeIds as (
    select c.ChargeID from ContractLineItems c
    where c.QuotationID='412adfad-7bfa-488c-914f-0b7a62c96776' and c.ChargeID is not null
)
select sum(cc.CRP) from ContractLineItems c
left join ContractLineItemChild cc on c.RevenueAllocationID = cc.Id
where c.Id not in (select * from ChargeIds)
and c.QuotationID='412adfad-7bfa-488c-914f-0b7a62c96776'
and c.[Version] != 3