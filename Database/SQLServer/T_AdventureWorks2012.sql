USE AdventureWorks2012;  
GO 

SELECT * FROM Production.ProductModel

SELECT ProductModelID, Instructions.query(
	'declare namespace PI="http://schemas.microsoft.com/sqlserver/2004/07/adventure-works/ProductModelManuInstructions";
	/PI:root/PI:Location/PI:step') AS Steps
FROM Production.ProductModel
WHERE ProductModelID = 66

WITH XMLNAMESPACES ('http://schemas.microsoft.com/sqlserver/2004/07/adventure-works/ProductModelManuInstructions' AS PI)
SELECT ProductModelID, Instructions.query('/PI:root/PI:Location/PI:step' ) AS Steps
FROM Production.ProductModel
WHERE ProductModelID = 66;

SELECT XML_SCHEMA_NAMESPACE('Production', 'ProductDescriptionSchemaCollection')

SELECT * FROM HumanResources.Employee
SELECT JobTitle, HireDate FROM HumanResources.Employee WHERE BusinessEntityID = 250
GO

SELECT 
  physical_memory_in_use_kb/1024 AS sql_physical_memory_in_use_MB, 
    large_page_allocations_kb/1024 AS sql_large_page_allocations_MB, 
    locked_page_allocations_kb/1024 AS sql_locked_page_allocations_MB,
    virtual_address_space_reserved_kb/1024 AS sql_VAS_reserved_MB, 
    virtual_address_space_committed_kb/1024 AS sql_VAS_committed_MB, 
    virtual_address_space_available_kb/1024 AS sql_VAS_available_MB,
    page_fault_count AS sql_page_fault_count,
    memory_utilization_percentage AS sql_memory_utilization_percentage, 
    process_physical_memory_low AS sql_process_physical_memory_low, 
    process_virtual_memory_low AS sql_process_virtual_memory_low
FROM sys.dm_os_process_memory;  

-- �ۼ����� 
-- Create a new table with three columns.  
CREATE TABLE dbo.TestTable  
    (TestCol1 int NOT NULL,  
     TestCol2 nchar(10) NULL,  
     TestCol3 nvarchar(50) NULL);  
GO  
-- Create a clustered index called IX_TestTable_TestCol1  
-- on the dbo.TestTable table using the TestCol1 column.  
CREATE CLUSTERED INDEX IX_TestTable_TestCol1   
    ON dbo.TestTable (TestCol1);   
GO  

-- �Ǿۼ�����
-- Find an existing index named IX_ProductVendor_VendorID and delete it if found.   
IF EXISTS (SELECT name FROM sys.indexes  
            WHERE name = N'IX_ProductVendor_VendorID')   
    DROP INDEX IX_ProductVendor_VendorID ON Purchasing.ProductVendor;   
GO  
-- Create a nonclustered index called IX_ProductVendor_VendorID   
-- on the Purchasing.ProductVendor table using the BusinessEntityID column.   
CREATE NONCLUSTERED INDEX IX_ProductVendor_VendorID   
    ON Purchasing.ProductVendor (BusinessEntityID);   
GO  

-- Ψһ���� 
-- Find an existing index named AK_UnitMeasure_Name and delete it if found  
IF EXISTS (SELECT name from sys.indexes  
           WHERE name = N'AK_UnitMeasure_Name')   
   DROP INDEX AK_UnitMeasure_Name ON Production.UnitMeasure;   
GO  
-- Create a unique index called AK_UnitMeasure_Name  
-- on the Production.UnitMeasure table using the Name column.  
CREATE UNIQUE INDEX AK_UnitMeasure_Name   
   ON Production.UnitMeasure (Name);   
GO  

-- ɸѡ����
-- Looks for an existing filtered index named "FIBillOfMaterialsWithEndDate"  
-- and deletes it from the table Production.BillOfMaterials if found.   
IF EXISTS (SELECT name FROM sys.indexes  
    WHERE name = N'FIBillOfMaterialsWithEndDate'  
    AND object_id = OBJECT_ID (N'Production.BillOfMaterials'))  
DROP INDEX FIBillOfMaterialsWithEndDate  
    ON Production.BillOfMaterials  
GO  

-- Creates a filtered index "FIBillOfMaterialsWithEndDate"  
-- on the table Production.BillOfMaterials   
-- using the columms ComponentID and StartDate.  
CREATE NONCLUSTERED INDEX FIBillOfMaterialsWithEndDate  
    ON Production.BillOfMaterials (ComponentID, StartDate)  
    WHERE EndDate IS NOT NULL ;  
GO  

-- ����ɸѡ�����������ѯ�����Ч  
SELECT ProductAssemblyID, ComponentID, StartDate   
FROM Production.BillOfMaterials  
WHERE EndDate IS NOT NULL   
    AND ComponentID = 5   
    AND StartDate > '01/01/2008' ;  
GO  
-- ȷ���� SQL ��ѯ��ʹ��ɸѡ����
SELECT ComponentID, StartDate FROM Production.BillOfMaterials  
    WITH ( INDEX ( FIBillOfMaterialsWithEndDate ) )   
WHERE EndDate IN ('20000825', '20000908', '20000918');   
GO  
select * from Production.BillOfMaterials

-- �������а����е�����
-- Creates a nonclustered index on the Person.Address table with four included (nonkey) columns.   
-- index key column is PostalCode and the nonkey columns are  
-- AddressLine1, AddressLine2, City, and StateProvinceID.  
CREATE NONCLUSTERED INDEX IX_Address_PostalCode  
ON Person.Address (PostalCode)  
INCLUDE (AddressLine1, AddressLine2, City, StateProvinceID);  
GO  

-- ɾ������
-- delete the IX_ProductVendor_BusinessEntityID index  
-- from the Purchasing.ProductVendor table  
DROP INDEX IX_ProductVendor_BusinessEntityID   
    ON Purchasing.ProductVendor;  
GO  

-- �޸�����
-- ��ʾ��ʹ�� DROP_EXISTING ѡ���� Production.WorkOrder ��� ProductID ����ɾ�������´������������� �������� FILLFACTOR �� PAD_INDEX ѡ�
CREATE NONCLUSTERED INDEX IX_WorkOrder_ProductID
    ON Production.WorkOrder(ProductID)
    WITH (FILLFACTOR = 80,
        PAD_INDEX = ON,
        DROP_EXISTING = ON);
GO
SELECT * FROM Production.WorkOrder
-- �����ʾ��ʹ�� ALTER INDEX Ϊ���� AK_SalesOrderHeader_SalesOrderNumber�����˼���ѡ�
ALTER INDEX AK_SalesOrderHeader_SalesOrderNumber ON
    Sales.SalesOrderHeader
SET (
    STATISTICS_NORECOMPUTE = ON,
    IGNORE_DUP_KEY = ON,
    ALLOW_PAGE_LOCKS = ON
    ) ;
GO

-- �����������ƶ��������ļ���
-- Creates the TransactionsFG1 filegroup on the AdventureWorks2012 database  
ALTER DATABASE AdventureWorks2012  
ADD FILEGROUP TransactionsFG1;  
GO  
/* Adds the TransactionsFG1dat3 file to the TransactionsFG1 filegroup. Please note that you will have to change the filename parameter in this statement to execute it without errors.  
*/  
ALTER DATABASE AdventureWorks2012   
ADD FILE   
(  
    NAME = TransactionsFG1dat3,  
    FILENAME = 'C:\Program Files\Microsoft SQL Server\MSSQL13\MSSQL\DATA\TransactionsFG1dat3.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP TransactionsFG1;  
GO  
/*Creates the IX_Employee_OrganizationLevel_OrganizationNode index  
  on the TransactionsPS1 filegroup and drops the original IX_Employee_OrganizationLevel_OrganizationNode index.  
*/  
CREATE NONCLUSTERED INDEX IX_Employee_OrganizationLevel_OrganizationNode  
    ON HumanResources.Employee (OrganizationLevel, OrganizationNode)  
    WITH (DROP_EXISTING = ON)  
    ON TransactionsFG1;  
GO  

-- ����ʱ���I/Oͳ��
SET STATISTICS io ON 
SET STATISTICS time ON 
-- �鿴�������ִ�й���
SET STATISTICS PROFILE ON
/*
Rows����ʾ��һ��ִ�в����У��������ļ�¼����������ʵ���ݣ���Ԥ�ڣ�
Executes����ʾĳ��ִ�в��豻ִ�еĴ���������ʵ���ݣ���Ԥ�ڣ�
StmtText����ִ�еĲ�����ϸ������һ������ڲ����⿴��
EstimateRows����ʾҪԤ�ڷ��ض��������ݡ�
*/
GO 
SELECT *
    FROM Person.Person 
    WHERE FirstName = 'Helen' 
        AND LastName = 'Meyer'; 
GO 
IF EXISTS (SELECT * FROM sys.indexes WHERE OBJECT_ID = OBJECT_ID('Person.Person') AND name = 'FullName') 
	DROP INDEX Person.Person.FullName; 
GO 
CREATE NONCLUSTERED INDEX FullName ON Person.Person (LastName, FirstName); 
GO 

select p.FirstName+' '+p.MiddleName+' '+p.LastName as fullName, t.PhoneNumber from Person.Person p
inner join Person.PersonPhone t on p.BusinessEntityID=t.BusinessEntityID
order by p.BusinessEntityID

select p.FirstName, t.PhoneNumber from Person.Person p
inner join Person.PersonPhone t on p.BusinessEntityID=t.BusinessEntityID
order by p.BusinessEntityID

select * from sys.partitions p
inner join sys.system_internals_allocation_units u on p.partition_id=u.allocation_unit_id
where index_id=0

select b.* from sys.sysobjects a, sys.sysindexes b where a.id = b.id  and a.name = 'Person' and b.rows <>0

SELECT ��������=a.name, ����=c.name, �����ֶ���=d.name, �����ֶ�λ��=d.colid, b.keyno ˳���
FROM sysindexes a
JOIN sysindexkeys b ON a.id=b.id AND a.indid=b.indid
JOIN sysobjects c ON b.id=c.id
JOIN syscolumns d ON b.id=d.id AND b.colid=d.colid
WHERE a.indid NOT IN(0,255)
-- and c.xtype='U' and c.status>0 --�������û���  
AND c.name='PurchaseOrderDetail' --��ָ����  


SELECT RejectedQty, ((RejectedQty/OrderQty)*100) AS RejectionRate,  
    ProductID, DueDate  
FROM Purchasing.PurchaseOrderDetail  
ORDER BY RejectedQty DESC, ProductID ASC; 

CREATE NONCLUSTERED INDEX IX_PurchaseOrderDetail_RejectedQty  
ON Purchasing.PurchaseOrderDetail  
    (RejectedQty DESC, ProductID ASC, DueDate, OrderQty); 
	













   
     













  






  