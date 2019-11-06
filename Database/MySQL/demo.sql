-- 分页
/**
 * 获取门店列表
 */
CREATE PROCEDURE sp_get_shops_by_project(
    searchType INT,
    projId INT,
    userId INT,
    userType INT,
    pageIndex INT,
    pageSize INT,
    searchCondition VARCHAR(60)
) 
BEGIN 
DECLARE periodId INT;
DECLARE mbdName VARCHAR(60);
-- 获取总期数
-- SELECT COUNT(id) INTO totalRounds FROM t_period_master WHERE ProjectId = projId AND Preview = 0 AND has_data = 1 AND has_users = 1;
IF userType = 0 THEN -- 普通外部用户，需要根据mbd权限查看门店
    SELECT IFNULL(u.period_id, 0) into periodId 
    FROM t_user u
    WHERE u.id = userId;

    -- 下面的句式不能同时给多个参数赋值
    SELECT IFNULL(um.mbd_name, '') into mbdName
    FROM t_user u
    INNER JOIN t_user_mbd um ON u.id = um.user_id
    WHERE u.id = userId;

    IF searchCondition != '' THEN
        SET @searchTreeNodeAttrs = '';

        CALL sp_query_tree_nodes(
            searchCondition, 't_mbd_master', 'mbd_name', 'parent_name', 'id',
            CONCAT(' and project_id = ', projId, ' and period_id = ', periodId),
            1, 0, @searchTreeNodeAttrs
        );

        IF @searchTreeNodeAttrs IS NOT NULL AND @searchTreeNodeAttrs != '' THEN
            SET @dynamicWhere = CONCAT(' AND (m.mbd_name LIKE ''%',
            searchCondition, '%'' OR m.city LIKE ''%', searchCondition,
            '%'' OR m.mbd_code LIKE ''%', searchCondition,
            '%'' OR m.id IN (', @searchTreeNodeAttrs, '))');
        ELSE
            SET @dynamicWhere = CONCAT(' AND (m.mbd_name LIKE ''%',
            searchCondition, '%'' OR m.city LIKE ''%', searchCondition,
            '%'' OR m.mbd_code LIKE ''%', searchCondition,
            '%'')');
        END IF;
    ELSE
        SET @dynamicWhere = '';
    END IF;

    SET @treeNodeAttrs = '';

    CALL sp_query_tree_nodes(mbdName, 't_mbd_master', 'mbd_name',
    'parent_name', 'id',
    CONCAT(' and project_id = ', projId, ' and period_id = ', periodId),
    0, 0, @treeNodeAttrs);

    IF @treeNodeAttrs IS NOT NULL AND @treeNodeAttrs != '' THEN
        SET @mbdQuery = CONCAT(' AND m.id IN (', @treeNodeAttrs, ')');
    ELSE
        SET @mbdQuery = '';
    END IF;

    IF searchType = 1 THEN
        SET @sql = CONCAT(
        'SELECT COUNT(m.mbd_code)',
        -- INTO @totalShops',
        ' FROM t_mbd_master m',
        ' LEFT JOIN t_cubedata_01 c ON m.mbd_name = c.mbd_name AND m.project_id = c.project_id AND m.period_id = c.period_id',
        ' WHERE m.level = 2 AND m.project_id = ', projId,
        ' AND c.fact_name = ''平均分''',
        ' AND m.period_id = ', periodId,
        @mbdQuery, @dynamicWhere
    );
    PREPARE tempQuery FROM @sql;
    EXECUTE tempQuery;
    DEALLOCATE PREPARE tempQuery;
    ELSE -- SET totalShops = @totalShops; 
        SET @sql = CONCAT(
        'SELECT m.mbd_code mbdCode, m.mbd_name mbdName, m.mbd_title mbdTitle, c.fact_value factValue',
        ' FROM t_mbd_master m',
        ' LEFT JOIN t_cubedata_01 c ON m.mbd_name = c.mbd_name AND m.project_id = c.project_id AND m.period_id = c.period_id',
        ' WHERE m.level = 2 AND m.project_id = ', projId,
        ' AND c.fact_name = ''平均分''',
        ' AND m.period_id = ', periodId,
        @mbdQuery, @dynamicWhere,
        ' ORDER BY m.period_id, m.id LIMIT ', pageSize, ' OFFSET ', pageIndex
        );
        PREPARE tempQuery FROM @sql;
        EXECUTE tempQuery;
        DEALLOCATE PREPARE tempQuery;
    END IF;
ELSE -- 超级用户
    SELECT IFNULL(id, 0) INTO periodId
    FROM t_period_master
    WHERE ProjectId = projId
    AND Preview <> 1
    AND has_users = 1
    ORDER BY update_time DESC
    LIMIT 1;

    IF searchCondition != '' THEN
        SET @searchTreeNodeAttrs = '';

CALL sp_query_tree_nodes(
    searchCondition,
    't_mbd_master',
    'mbd_name',
    'parent_name',
    'id',
    CONCAT(
        ' and project_id = ',
        projId,
        ' and period_id = ',
        periodId
    ),
    1,
    0,
    @searchTreeNodeAttrs
);

IF @searchTreeNodeAttrs IS NOT NULL
AND @searchTreeNodeAttrs != '' THEN
SET
    @dynamicWhere = CONCAT(
        ' AND (m.mbd_name LIKE ''%',
        searchCondition,
        '%'' OR m.city LIKE ''%',
        searchCondition,
        '%'' OR m.mbd_code LIKE ''%',
        searchCondition,
        '%'' OR m.id IN (',
        @searchTreeNodeAttrs,
        '))'
    );

ELSE
SET
    @dynamicWhere = CONCAT(
        ' AND (m.mbd_name LIKE ''%',
        searchCondition,
        '%'' OR m.city LIKE ''%',
        searchCondition,
        '%'' OR m.mbd_code LIKE ''%',
        searchCondition,
        '%'')'
    );

END IF;

ELSE
SET
    @dynamicWhere = '';

END IF;

IF searchType = 1 THEN
SET
    @sql = CONCAT(
        'SELECT COUNT(m.mbd_code)',
        -- INTO @totalShops',
        ' FROM t_mbd_master m',
        ' LEFT JOIN t_cubedata_01 c ON m.mbd_name = c.mbd_name AND m.project_id = c.project_id AND m.period_id = c.period_id',
        ' WHERE m.level = 2 AND m.project_id = ',
        projId,
        ' AND c.fact_name = ''平均分''',
        ' AND m.period_id = ',
        periodId,
        @dynamicWhere
    );

PREPARE tempQuery
FROM
    @sql;

EXECUTE tempQuery;

DEALLOCATE PREPARE tempQuery;

ELSE -- SET totalShops = @totalShops; 
SET
    @sql = CONCAT(
        'SELECT m.mbd_code mbdCode, m.mbd_name mbdName, m.mbd_title mbdTitle, c.fact_value factValue',
        ' FROM t_mbd_master m',
        ' LEFT JOIN t_cubedata_01 c ON m.mbd_name = c.mbd_name AND m.project_id = c.project_id AND m.period_id = c.period_id',
        ' WHERE m.level = 2 AND m.project_id = ',
        projId,
        ' AND c.fact_name = ''平均分''',
        ' AND m.period_id = ',
        periodId,
        @dynamicWhere,
        ' ORDER BY m.period_id, m.id LIMIT ',
        pageSize,
        ' OFFSET ',
        pageIndex
    );

PREPARE tempQuery
FROM
    @sql;

    EXECUTE tempQuery;
    DEALLOCATE PREPARE tempQuery;
    END IF;
END IF;
END 
-- 调用
CALL sp_get_shops_by_project(1, 1, 1, 0, 0, 900, '');

-- 临时表
/**
 * 查询单店报表数据，使用中
 */
CREATE PROCEDURE sp_get_stores_list(
    columnConfig VARCHAR(2000),
    -- 查询字段 
    whereCondition VARCHAR(2000),
    -- 查询条件
    orderCondition VARCHAR(50),
    projectCode VARCHAR(50),
    pageSize INT,
    -- pageSize为0时，不分页，供导出使用
    startIndex INT
) BEGIN DECLARE confirmFields VARCHAR(200);

DECLARE pageQuery VARCHAR(200);

SET
    confirmFields = '';

SET
    pageQuery = '';

SET
    @sql = CONCAT(
        'CREATE TEMPORARY TABLE tmp_CanShowComplainDays',
        ' SELECT MIN(sd.Date_Code) DateCode, sd.DataRound DataRoundCode FROM ',
        '(SELECT Date_Code, DataRound FROM ',
        projectCode,
        '_t_storedata GROUP BY DataRound, Date_Code) sd',
        ' LEFT JOIN t_disputeconfig dc ON sd.DataRound = dc.DataRoundCode ',
        'AND dc.ProjectCode = ''',
        projectCode,
        ''' WHERE TIMESTAMPDIFF(DAY, sd.Date_Code, CURDATE()) <= ',
        'dc.CanShowComplainDays - 1 + (SELECT COUNT(*) FROM t_holidays',
        'WHERE sd.Date_Code <= holidays AND CURDATE() >= holidays ',
        'AND years = YEAR(CURDATE())) GROUP BY sd.DataRound'
    );

PREPARE tmpData
FROM
    @sql;

DROP TABLE IF EXISTS tmp_CanShowComplainDays;

EXECUTE tmpData;

DEALLOCATE PREPARE tmpData;

SET
    @sql = CONCAT(
        'CREATE TEMPORARY TABLE tmp_ComplainDays',
        ' SELECT MIN(sd.Date_Code) DateCode, sd.DataRound DataRoundCode FROM (',
        'SELECT Date_Code, DataRound FROM ',
        projectCode,
        '_t_storedata GROUP BY DataRound, Date_Code) sd',
        ' LEFT JOIN t_disputeconfig dc ON sd.DataRound = dc.DataRoundCode ',
        'AND dc.ProjectCode = ''',
        projectCode,
        ''' WHERE TIMESTAMPDIFF(DAY, sd.Date_Code, CURDATE()) <= ',
        'dc.ComplainDays - 1 + (SELECT COUNT(*) FROM t_holidays ',
        'WHERE sd.Date_Code <= holidays AND CURDATE() >= holidays ',
        'AND years = YEAR(CURDATE())) GROUP BY sd.DataRound'
    );

PREPARE tmpData
FROM
    @sql;

DROP TABLE IF EXISTS tmp_ComplainDays;

EXECUTE tmpData;

DEALLOCATE PREPARE tmpData;

IF pageSize != 0 THEN
SET
    confirmFields = ' DATE_FORMAT(sd.Date_Code, ''%Y-%m-%d'') 上传时间, sm.客户号 客户编号, sd.DataRound 轮次, sm.客户标准名称 客户名称, (CASE WHEN sd.Date_Code >= tc.DateCode THEN 0 ELSE 1 END) 能否申诉';

SET
    pageQuery = CONCAT(' LIMIT ', pageSize, ' OFFSET ', startIndex);

IF columnConfig != ''
AND columnConfig IS NOT NULL THEN
SET
    columnConfig = CONCAT(columnConfig, ',');

END IF;

END IF;

SET
    @sql = CONCAT(
        'SELECT ',
        columnConfig,
        confirmFields,
        ' FROM ',
        ProjectCode,
        '_t_storedata sd',
        ' INNER JOIN ',
        ProjectCode,
        '_t_storemaster sm ON sm.客户号 = sd.Store_Code',
        ' LEFT JOIN tmp_CanShowComplainDays ts ON sd.DataRound = ts.DataRoundCode',
        ' LEFT JOIN tmp_ComplainDays tc ON sd.DataRound = tc.DataRoundCode',
        whereCondition,
        ' AND sd.Date_Code >= ts.DateCode',
        ' AND NOT EXISTS(SELECT Store_Code FROM t_storecomplain WHERE Project_Code = ''',
        ProjectCode,
        ''' AND DateRound = sd.DataRound AND Store_Code = sd.Store_Code)',
        orderCondition,
        pageQuery
    );

PREPARE tmpData
FROM
    @sql;

EXECUTE tmpData;

DEALLOCATE PREPARE tmpData;

END;

--
CALL sp_get_stores_list(
    '客户号,客户标准名称,客户简称,客户总部名称,地址,周围标志性建筑物,联络人,电话,全国,渠道类型,DSR_PSR_DWR,客户性质,客户级别,直辖市,城市代码,地级市,县级市,办事处,OTC总部,OTC_CODE,大区总监,大区总监编号,本级岗位_大区总监,大区总监负责人,MUDID_2,大区总监负责人MUDID,大区,大区编号,本级岗位_大区,大区负责人,MUDID_3,大区MUDID,所属团队,所属团队编号,本级岗位_团队代表,所属团队代表,MUDID_4,所属团队代表MUDID,销售代表,销售代表编号,本级岗位_销售代表,MUDID_5,销售代表MUDID,地区,工作地,报备,OTC_001,OTC_002,OTC_003,OTC_004,OTC_005,OTC_006,OTC_007,OTC_008,OTC_009,OTC_010,OTC_011,OTC_012',
    ' where 1 = 1 and ((全国 = ''全国''))',
    ' order by 客户号 ASC',
    'p01',
    10,
    0
) -- 字符串转成行
/**
 * 字符串转换成数组行
 */
CREATE PROCEDURE sp_str_transform_rows(
    toSplitString Text,
    splitChar VARCHAR(2)
) BEGIN -- DROP TABLE IF EXISTS tmp_filter;  
CREATE TEMPORARY TABLE tmp_filter(splitString VARCHAR(200));

SET
    @splitValue = toSplitString;

SET
    @counts = LENGTH(toSplitString) - LENGTH(REPLACE(toSplitString, splitChar, ''));

-- SELECT @counts;
SET
    @i = 1;

WHILE @i <= @counts DO
INSERT INTO
    tmp_filter
VALUES
    (SUBSTRING_INDEX(@splitValue, splitChar, 1));

SET
    @splitValue = SUBSTRING_INDEX(@splitValue, splitChar, @i - @counts -1);

SET
    @i = @i + 1;

END WHILE;

INSERT INTO
    tmp_filter
values
    (@splitValue);

SELECT
    *
FROM
    tmp_filter;

DROP TABLE tmp_filter;

END CALL sp_str_transform_rows('1,2,3', ',') -- 分支
/**
 * App用户登录，变量和参数同名有影响
 */
CREATE PROCEDURE sp_login_by_app_user(
    userName VARCHAR(255),
    `passwords` VARCHAR(255),
    `language` VARCHAR(2)
) BEGIN DECLARE user_id INT DEFAULT 0;

-- 默认用户id为0
DECLARE newUserId INT DEFAULT 0;

-- 获取最新轮次的用户
SELECT
    IFNULL(id, 0) into newUserId
FROM
    t_user
WHERE
    `NAME` = userName
ORDER BY
    period_id DESC
LIMIT
    1;

SELECT
    IFNULL(id, 0) into user_id
FROM
    t_user
WHERE
    id = newUserId
    AND `PASSWORD` = `passwords`;

IF user_id = 0 THEN
SELECT
    IFNULL(id, 0) INTO user_id
FROM
    t_manager
WHERE
    `NAME` = userName
    AND `PASSWORD` = `passwords`
    AND `status` = 1
    AND role = 2
LIMIT
    1;

IF user_id > 0 THEN
SELECT
    id,
    `name`,
    '' AS roundId,
    '' AS mbdName,
    '' AS customName,
    'SuperUser' AS role,
    token
FROM
    t_manager
WHERE
    id = user_id;

END IF;

ELSE
SELECT
    u.id,
    u.`name`,
    u.period_id AS roundId,
    um.mbd_name mbdName,
    (
        CASE
            `language`
            WHEN 'en' THEN c.e_name
            ELSE c.c_name
        END
    ) AS customName,
    'ClientUser' AS role,
    u.token
FROM
    t_user u
    LEFT JOIN t_user_mbd um ON u.id = um.user_id
    LEFT JOIN t_project p ON u.project_id = p.id
    LEFT JOIN t_customer c ON p.customer_id = c.id
WHERE
    u.id = user_id;

END IF;

END -- 循环
/**
 * 获取时间段内的假期天数
 */
CREATE FUNCTION GetHolidaysCount(
    holidays VARCHAR(2000),
    beginDate datetime,
    endDate datetime
) RETURNS int BEGIN DECLARE beginDateValue DOUBLE;

DECLARE endDateValue DOUBLE;

DECLARE holiday DOUBLE;

DECLARE counts INT;

DECLARE itemIndex int;

SET
    counts = 0;

SET
    beginDateValue = DATE_FORMAT(beginDate, '%m.%d') - 0.00;

SET
    endDateValue = DATE_FORMAT(endDate, '%m.%d') - 0.00;

SET
    itemIndex = INSTR(holidays, ',');

WHILE itemIndex > 0 DO
SET
    holiday = LEFT(holidays, itemIndex - 1) - 0.00;

SET
    holidays = SUBSTRING(
        holidays
        FROM
            itemIndex + 1
    );

SET
    itemIndex = INSTR(holidays, ',');

IF holiday >= beginDateValue
AND holiday <= endDateValue THEN
SET
    counts = counts + 1;

END IF;

END WHILE;

IF holidays >= beginDateValue
AND holidays <= endDateValue THEN
SET
    counts = counts + 1;

END IF;

RETURN counts;

END -- 游标
/**
 * 查询单店报表数据
 */
CREATE PROCEDURE GetStoreTable(
    masterColumnQuery VARCHAR(2000),
    dataColumnQuery VARCHAR(2000),
    masterWhereCondition VARCHAR(2000),
    dataWhereCondition VARCHAR(2000),
    orderCondition VARCHAR(50),
    ProjectCode VARCHAR(50),
    PageSize INT,
    StartIndex INT,
    OUT totalCount INT
) BEGIN DECLARE t_beginDate DATE;

DECLARE t_dateround VARCHAR(50);

DECLARE t_storecode VARCHAR(50) DEFAULT '';

DECLARE maxCnt INT DEFAULT 0;

DECLARE i INT DEFAULT 0;

DECLARE cursorDone INT DEFAULT 0;

DECLARE cur CURSOR FOR
SELECT
    MIN(ts.Date_Code),
    ts.DataRound
FROM
    tmp_DataRound ts
    LEFT JOIN t_disputeconfig dc ON ts.DataRound = dc.DataRoundCode
    AND dc.ProjectCode = ProjectCode
WHERE
    TIMESTAMPDIFF(DAY, ts.Date_Code, curdate()) <= dc.CanShowComplainDays - 1 + (
        SELECT
            count(*)
        FROM
            t_holidays
        WHERE
            ts.Date_Code <= holidays
            AND CURDATE() >= holidays
            AND years = YEAR(CURDATE())
    )
GROUP BY
    ts.DataRound;

DECLARE curRound CURSOR FOR
SELECT
    DISTINCT DateRound
FROM
    t_storecomplain
WHERE
    Project_Code = ProjectCode;

DECLARE CONTINUE HANDLER FOR SQLSTATE '02000'
SET
    cursorDone = 1;

-- 单店Master表处理
SET
    @sql = CONCAT(
        'CREATE TEMPORARY TABLE tmp_MasterTable SELECT ',
        masterColumnQuery,
        ' 客户号 客户编号 FROM ',
        ProjectCode,
        '_t_storemaster ',
        masterWhereCondition
    );

PREPARE storeMaster
FROM
    @sql;

DROP TABLE IF EXISTS tmp_MasterTable;

EXECUTE storeMaster;

-- 单店Data表处理
SET
    @sql = CONCAT(
        'CREATE TEMPORARY TABLE tmp_DataRound ',
        'SELECT Date_Code,DataRound FROM ',
        ProjectCode,
        '_t_storedata GROUP BY DataRound, Date_Code ORDER BY DataRound, Date_Code'
    );

PREPARE tmpData
FROM
    @sql;

DROP TABLE IF EXISTS tmp_DataRound;

EXECUTE tmpData;

SET
    @sql = CONCAT(
        'CREATE TEMPORARY TABLE tmp_StoreTable SELECT ',
        dataColumnQuery,
        ' Store_Code StoreCode,DATE_FORMAT(Date_Code, ''%Y-%m-%d'') 上传时间,',
        'DataRound 轮次 FROM ',
        ProjectCode,
        '_t_storedata WHERE 1 = 1 AND'
    );

OPEN cur;

cursorLoop :LOOP FETCH cur INTO t_beginDate,
t_dateround;

IF cursorDone = 1 THEN LEAVE cursorLoop;

END IF;

SET
    @sql = CONCAT(
        @sql,
        ' (DataRound = ''',
        t_dateround,
        ''' AND Date_Code > ''',
        t_beginDate,
        ''') OR'
    );

END LOOP;

CLOSE cur;

IF RIGHT(@sql, 2) = 'OR' THEN
SET
    @sql = MID(@sql, 1, CHAR_LENGTH(@sql) -3);

ELSEIF RIGHT(@sql, 3) = 'AND' THEN
SET
    @sql = MID(@sql, 1, CHAR_LENGTH(@sql) -4);

END IF;

DROP TABLE IF EXISTS Gather_Data_Tmp;

CREATE TEMPORARY TABLE Gather_Data_Tmp(
    Tmp_Id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    Store_Code VARCHAR(50) NOT NULL,
    DateRound VARCHAR(8192) NOT NULL,
    PRIMARY KEY (Tmp_Id)
) ENGINE = MyISAM DEFAULT CHARSET = utf8;

SET
    @cond = ' AND (';

SET
    @cond1 = '';

OPEN curRound;

cursorLoop :LOOP FETCH curRound INTO t_dateround;

SET
    @cond = CONCAT(
        @cond,
        '(DataRound=''',
        t_dateround,
        ''' AND Store_Code NOT IN ('
    );

SET
    @cond1 = CONCAT(
        @cond1,
        'DataRound <> ''',
        t_dateround,
        ''' AND '
    );

TRUNCATE TABLE Gather_Data_Tmp;

INSERT INTO
    Gather_Data_Tmp (Store_Code, DateRound)
SELECT
    DISTINCT Store_Code,
    DateRound
FROM
    t_storecomplain
WHERE
    Project_Code = ProjectCode
    AND DateRound = t_dateround
GROUP BY
    DateRound,
    Store_Code;

SELECT
    MIN(Tmp_Id) INTO i
FROM
    Gather_Data_Tmp;

SELECT
    MAX(Tmp_Id) INTO maxCnt
FROM
    Gather_Data_Tmp;

WHILE i <= maxCnt DO
SELECT
    Store_Code INTO t_storecode
FROM
    Gather_Data_Tmp
WHERE
    Tmp_Id = i;

SET
    @cond = CONCAT(@cond, '''', t_storecode, ''',');

SET
    i = i + 1;

END WHILE;

IF RIGHT(@cond, 1) = ',' THEN
SET
    @cond = MID(@cond, 1, CHAR_LENGTH(@cond) -1);

END IF;

SET
    @cond = CONCAT(@cond, ')) OR ');

IF cursorDone = 1 THEN LEAVE cursorLoop;

END IF;

END LOOP;

CLOSE curRound;

IF RIGHT(@cond1, 4) = 'AND ' THEN
SET
    @cond1 = MID(@cond1, 1, CHAR_LENGTH(@cond1) -5);

END IF;

IF RIGHT(@cond, 1) = '(' THEN
SET
    @cond = '';

ELSEIF RIGHT(@cond, 3) = 'OR ' THEN
SET
    @cond = CONCAT(@cond, '(', @cond1, '))');

END IF;

SET
    @sql = CONCAT(@sql, @cond, dataWhereCondition);

-- SELECT @sql;
PREPARE storeData
FROM
    @sql;

DROP TABLE IF EXISTS tmp_StoreTable;

EXECUTE storeData;

-- 两个临时表关联
SET
    @sql = 'ALTER TABLE tmp_MasterTable ADD INDEX tmp_MasterTable_客户编号 (客户编号);';

PREPARE addIndex1
FROM
    @sql;

EXECUTE addIndex1;

SET
    @sql = 'ALTER TABLE tmp_StoreTable ADD INDEX tmp_StoreTable_StoreCode (StoreCode);';

PREPARE addIndex2
FROM
    @sql;

EXECUTE addIndex2;

SELECT
    COUNT(tm.客户编号)
FROM
    tmp_MasterTable tm
    INNER JOIN tmp_StoreTable ts ON tm.客户编号 = ts.StoreCode INTO totalCount;

SET
    @sql = CONCAT(
        'SELECT tm.*,ts.* FROM tmp_MasterTable tm ',
        'INNER JOIN tmp_StoreTable ts ON tm.客户编号 = ts.StoreCode ',
        orderCondition,
        ' LIMIT ',
        PageSize,
        ' OFFSET ',
        StartIndex
    );

PREPARE selectStore
FROM
    @sql;

EXECUTE selectStore;

END;

-- 调用
CALL GetStoreTable(
    '客户号,客户标准名称,客户简称,客户总部名称,地址,周围标志性建筑物,联络人,电话,全国,渠道类型,DSR_PSR_DWR,客户性质,客户级别,直辖市,城市代码,地级市,县级市,办事处,OTC总部,OTC_CODE,大区总监,大区总监编号,本级岗位_大区总监,大区总监负责人,MUDID_2,大区总监负责人MUDID,大区,大区编号,本级岗位_大区,大区负责人,MUDID_3,大区MUDID,所属团队,所属团队编号,本级岗位_团队代表,所属团队代表,MUDID_4,所属团队代表MUDID,销售代表,销售代表编号,本级岗位_销售代表,MUDID_5,销售代表MUDID,地区,工作地,报备,',
    'OTC_001,OTC_002,OTC_003,OTC_004,OTC_005,OTC_006,OTC_007,OTC_008,OTC_009,OTC_010,OTC_011,OTC_012,',
    ' where 1 = 1 and ((全国 = ''全国''))',
    ' and DataRound = ''2016Q3''',
    ' order by 客户号 ASC',
    'p01',
    10,
    1,
    @totalCount
)
SELECT
    @totalCount;

-- 遍历父节点
CREATE PROCEDURE sp_query_tree_nodes_up(
    node VARCHAR(10),
    -- 查询的某个节点值
    tableName VARCHAR(20),
    -- 查询表名
    childAttr VARCHAR(20),
    -- 子字段
    parentAttr VARCHAR(20),
    -- 父子段
    searchAttr VARCHAR(20),
    -- 查询字段
    `condition` VARCHAR(200),
    -- 查询条件
    searchType INT,
    -- 0:精确查找  1:模糊匹配
    deepLevel INT,
    -- 遍历层数，用于实现只取某一层级的节点
    OUT treeNodes Text -- 返回查询字段
) BEGIN DECLARE sTemp Text;

DECLARE sTempChd Text;

DECLARE sTempChdOfCondition Text;

DECLARE beginTag INT;

DECLARE deeps INT;

SET
    sTemp = '';

SET
    sTempChd = node;

SET
    beginTag = 1;

SET
    deeps = 1;

IF searchType = 0 THEN
SET
    @whereQuery = CONCAT(' WHERE ', childAttr, ' = ''', sTempChd, '''');

ELSE
SET
    @whereQuery = CONCAT(
        ' WHERE ',
        childAttr,
        ' LIKE ''%',
        sTempChd,
        '%'''
    );

END IF;

-- 包含当前节点的值
SET
    @sql = CONCAT(
        'SELECT ',
        searchAttr,
        ' INTO @s1 FROM ',
        tableName,
        @whereQuery,
        `condition`
    );

PREPARE tempQuery
FROM
    @sql;

EXECUTE tempQuery;

DEALLOCATE PREPARE tempQuery;

SET
    sTempChdOfCondition = @s1;

SET
    sTemp = CONCAT(sTemp, sTempChdOfCondition, ',');

out_label :BEGIN WHILE sTempChd IS NOT NULL
AND sTempChd <> ''
AND sTempChd <> '0' DO IF beginTag = 1 THEN
SET
    @sql = CONCAT(
        'SELECT ',
        parentAttr,
        ' INTO @s1 FROM ',
        tableName,
        @whereQuery,
        `condition`
    );

ELSE
SET
    @sql = CONCAT(
        'SELECT ',
        parentAttr,
        ' INTO @s1 FROM ',
        tableName,
        ' WHERE ',
        childAttr,
        ' = ''',
        sTempChd,
        '''',
        `condition`
    );

END IF;

-- SELECT @sql;
PREPARE tempQuery
FROM
    @sql;

-- SET @s = sTempChd;
EXECUTE tempQuery
/*USING @s*/
;

DEALLOCATE PREPARE tempQuery;

SET
    sTempChd = @s1;

IF sTempChd IS NOT NULL
AND sTempChd <> ''
AND sTempChd <> '0' THEN
SET
    @sql = CONCAT(
        'SELECT ',
        searchAttr,
        ' INTO @s1 FROM ',
        tableName,
        ' WHERE ',
        childAttr,
        ' = ''',
        sTempChd,
        '''',
        `condition`
    );

PREPARE tempQuery
FROM
    @sql;

EXECUTE tempQuery;

DEALLOCATE PREPARE tempQuery;

SET
    sTempChdOfCondition = @s1;

IF sTempChdOfCondition IS NOT NULL
AND sTempChdOfCondition <> '' THEN IF deepLevel = 0 THEN
SET
    sTemp = CONCAT(sTemp, sTempChdOfCondition, ',');

ELSE IF deepLevel = deeps THEN
SET
    sTemp = CONCAT(sTemp, sTempChdOfCondition, ',');

LEAVE out_label;

END IF;

END IF;

END IF;

END IF;

SET
    beginTag = beginTag + 1;

SET
    deeps = deeps + 1;

END WHILE;

END out_label;

IF RIGHT(sTemp, 1) = ',' THEN
SET
    sTemp = MID(sTemp, 1, CHAR_LENGTH(sTemp) -1);

END IF;

SET
    treeNodes = sTemp;

END CALL sp_query_tree_nodes_up(
    '福州路店',
    't_mbd_master',
    'mbd_name',
    'parent_name',
    'id',
    ' and project_id = 1 and period_id = 2',
    0,
    0,
    @treeNodes
);

SELECT
    @treeNodes -- 遍历子节点
    CREATE PROCEDURE sp_query_tree_nodes(
        node VARCHAR(100),
        -- 查询的某个节点值
        tableName VARCHAR(20),
        -- 查询表名
        childAttr VARCHAR(20),
        -- 子字段
        parentAttr VARCHAR(20),
        -- 父子段
        searchAttr VARCHAR(20),
        -- 查询字段
        `condition` VARCHAR(200),
        -- 查询条件
        searchType INT,
        -- 0:精确查找  1:模糊匹配
        deepLevel INT,
        -- 遍历层数，用于实现只取某一层级的节点，为0时，获取整个结构
        OUT treeNodes Text -- 返回查询字段
    ) BEGIN DECLARE sTemp Text;

DECLARE sTempChd Text;

DECLARE sTempChdOfCondition Text;

DECLARE beginTag INT;

DECLARE deeps INT;

SET
    sTemp = '';

SET
    sTempChd = node;

-- 初始为当前节点值
SET
    beginTag = 1;

-- 查询第一层的标识，精确匹配和模糊匹配都是对应于第一层
SET
    deeps = 1;

IF searchType = 0 THEN -- 精确查找
SET
    @whereQuery = CONCAT(
        ' WHERE FIND_IN_SET(',
        parentAttr,
        ',''',
        sTempChd,
        ''') > 0'
    );

ELSE -- 模糊查找
SET
    @whereQuery = CONCAT(
        ' WHERE ',
        parentAttr,
        ' LIKE ''%',
        sTempChd,
        '%'''
    );

END IF;

SET
    GLOBAL group_concat_max_len = 600000;

-- 返回的数结构中加上当前节点
SET
    @sql = CONCAT(
        'SELECT ',
        searchAttr,
        ' INTO @s1 FROM ',
        tableName,
        ' WHERE ',
        childAttr,
        ' = ''',
        node,
        ''' ',
        `condition`
    );

PREPARE tempQuery
FROM
    @sql;

EXECUTE tempQuery;

DEALLOCATE PREPARE tempQuery;

SET
    sTempChdOfCondition = @s1;

SET
    sTemp = CONCAT(sTemp, sTempChdOfCondition, ',');

out_label :BEGIN WHILE sTempChd IS NOT NULL
AND sTempChd <> '' DO IF beginTag = 1 THEN -- 查询子一层
SET
    @sql = CONCAT(
        'SELECT GROUP_CONCAT(',
        childAttr,
        ') INTO @s1 FROM ',
        tableName,
        @whereQuery,
        `condition`
    );

ELSE -- 查询其它层
SET
    @sql = CONCAT(
        'SELECT GROUP_CONCAT(',
        childAttr,
        ') INTO @s1 FROM ',
        tableName,
        ' WHERE FIND_IN_SET(',
        parentAttr,
        ',''',
        sTempChd,
        ''') > 0',
        `condition`
    );

END IF;

-- SELECT @sql;
PREPARE tempQuery
FROM
    @sql;

-- SET @s = sTempChd;
EXECUTE tempQuery
/*USING @s*/
;

DEALLOCATE PREPARE tempQuery;

SET
    sTempChd = @s1;

IF sTempChd IS NOT NULL
AND sTempChd <> '' THEN -- 如果存在子节点，就获取子节点的值
SET
    @sql = CONCAT(
        'SELECT GROUP_CONCAT(',
        searchAttr,
        ') INTO @s1 FROM ',
        tableName,
        ' WHERE FIND_IN_SET(',
        childAttr,
        ',''',
        sTempChd,
        ''') > 0',
        `condition`
    );

PREPARE tempQuery
FROM
    @sql;

EXECUTE tempQuery;

DEALLOCATE PREPARE tempQuery;

SET
    sTempChdOfCondition = @s1;

IF sTempChdOfCondition IS NOT NULL
AND sTempChdOfCondition <> '' THEN IF deepLevel = 0 THEN -- 获取整个结构
SET
    sTemp = CONCAT(sTemp, sTempChdOfCondition, ',');

ELSE -- 获取特定一层的节点，主观感受使用
IF deepLevel = deeps THEN
SET
    sTemp = CONCAT(sTemp, sTempChdOfCondition, ',');

LEAVE out_label;

END IF;

END IF;

END IF;

END IF;

SET
    beginTag = beginTag + 1;

SET
    deeps = deeps + 1;

-- 执行一次，层数+1
END WHILE;

END out_label;

IF RIGHT(sTemp, 1) = ',' THEN -- 删除最后一个逗号
SET
    sTemp = MID(sTemp, 1, CHAR_LENGTH(sTemp) -1);

END IF;

SET
    treeNodes = sTemp;

END CALL sp_query_tree_nodes(
    '',
    't_mbd_master',
    'mbd_name',
    'parent_name',
    'id',
    ' and project_id = 1 and period_id = 2',
    1,
    0,
    @treeNodes
);

SELECT
    @treeNodes SHOW VARIABLES LIKE "group_concat_max_len";

SET
    GLOBAL group_concat_max_len = 60000;

-- 4、动态拼接
/**
 * App用户获取项目列表
 */
CREATE PROCEDURE sp_get_project_by_app_user(
    userId INT,
    userType INT,
    pageIndex INT,
    pageSize INT,
    projectName VARCHAR(60),
    `language` VARCHAR(2)
) BEGIN DECLARE customerQuery VARCHAR(60);

DECLARE projectQuery VARCHAR(60);

DECLARE roundQuery VARCHAR(200);

SET
    @sql = 'SELECT p.id projectId,';

-- 项目号
SET
    @searchCondition = '';

IF `language` = 'en' THEN
SET
    customerQuery = 'ifnull(c.e_name, c.c_name) customerName,';

SET
    projectQuery = 'ifnull(p.e_name, p.c_name) projectName,';

SET
    roundQuery = '(SELECT ifnull(pm.e_name, pm.c_name) FROM t_period_master pm WHERE pm.ProjectId = p.id AND pm.Preview <> 1 AND pm.has_data = 1 AND pm.has_users = 1 ORDER BY pm.update_time DESC LIMIT 1) roundName';

IF projectName != '' THEN
SET
    @searchCondition = CONCAT(
        ' AND ifnull(p.e_name, p.c_name) like ''%',
        projectName,
        '%'''
    );

END IF;

ELSE
SET
    customerQuery = 'ifnull(c.c_name, c.e_name) customerName,';

SET
    projectQuery = 'ifnull(p.c_name, p.e_name) projectName,';

SET
    roundQuery = '(SELECT ifnull(pm.c_name, pm.e_name) FROM t_period_master pm WHERE pm.ProjectId = p.id AND pm.Preview <> 1 AND pm.has_data = 1 AND pm.has_users = 1 ORDER BY pm.update_time DESC LIMIT 1) roundName';

IF projectName != '' THEN
SET
    @searchCondition = CONCAT(
        ' AND ifnull(p.c_name, p.e_name) like ''%',
        projectName,
        '%'''
    );

END IF;

END IF;

SET
    @sql = CONCAT(
        @sql,
        customerQuery,
        -- 客户名
        projectQuery,
        -- 项目名
        ' DATE_FORMAT(p.update_time, ''%Y-%m-%d'') updateTime,',
        -- 更新时间
        roundQuery,
        -- 最新轮次
        ' FROM t_project p',
        ' LEFT JOIN t_customer c ON p.customer_id = c.id'
    );

IF userType = 1 THEN -- 超级用户获取项目列表
SET
    @sql = CONCAT(@sql, ' WHERE 1 = 1');

ELSE -- 普通用户获取项目列表
SET
    @sql = CONCAT(
        @sql,
        ' INNER JOIN t_user u ON u.project_id = p.id ',
        ' WHERE u.id = ',
        userId
    );

END IF;

SET
    @sql = CONCAT(
        @sql,
        @searchCondition,
        ' AND p.deleted = 0',
        -- 项目未删除
        ' AND ((p.c_des IS NOT NULL AND p.c_des != '''') OR (p.e_des IS NOT NULL AND p.e_des != '''')) ',
        -- 项目介绍已提交
        ' AND ((p.c_method IS NOT NULL AND p.c_method != '''') OR (p.e_method IS NOT NULL AND p.e_method != '''')) ',
        -- 测评方法已提交
        ' AND (SELECT COUNT(r.id) FROM t_report r WHERE r.project_id = p.id AND r.status = 1) > 0 ',
        -- 趋势分析已提交
        ' AND (SELECT COUNT(pe.id) FROM t_period_master pe WHERE pe.ProjectId = p.id AND pe.Preview <> 1 AND pe.has_data = 1 AND pe.has_users = 1) > 0'
    );

SET
    @sql = CONCAT(
        @sql,
        ' ORDER BY p.update_time DESC LIMIT ',
        pageSize,
        ' OFFSET ',
        pageIndex
    );

PREPARE projectList
FROM
    @sql;

EXECUTE projectList;

END


-- 临时表和游标性能对比：

CREATE DEFINER=`root`@`%` PROCEDURE `debug`(
    IN `beginTime` int,
    IN `checkTime` int
)
BEGIN  
DECLARE t_id VARCHAR(64) DEFAULT '';  
DECLARE t_item TINYINT DEFAULT 0;  
DECLARE t_result VARCHAR(8192) DEFAULT '';  

DECLARE cursorDone INT DEFAULT 0;  
DECLARE cur CURSOR FOR
  SELECT Asset_Id, Check_Item, Check_Result
  from IDC_Gather_Info
  WHERE Check_Time > beginTime
  AND Check_Time <= checkTime;  

DECLARE CONTINUE HANDLER FOR SQLSTATE '02000' SET cursorDone = 1;

OPEN cur;  
cursorLoop:LOOP  
  FETCH cur INTO t_id, t_item, t_result;  
  IF cursorDone = 1 THEN  
    LEAVE cursorLoop;  
  END IF;  
END LOOP;  
CLOSE cur;  
END

测试结果：

1. 数据量15万，存储过程执行失败，提示错误：Incorrect key file for table '/tmp/#sql_3044_0.MYI';try to repair it
2. 数据量5万，执行成功，耗时31.051s
3. 数据量1万，执行成功，耗时1.371s

使用临时表替换游标：

CREATE DEFINER=`root`@`%` PROCEDURE `debug`(
    IN `beginTime` int, 
    IN `checkTime` int
) 
BEGIN
DECLARE t_id VARCHAR(64) DEFAULT '';  
DECLARE t_item TINYINT DEFAULT 0;  
DECLARE t_result VARCHAR(8192) DEFAULT '';  

DECLARE maxCnt INT DEFAULT 0;  
DECLARE i INT DEFAULT 0;  
	  
DROP TABLE IF EXISTS Gather_Data_Tmp;  
CREATE TEMPORARY TABLE Gather_Data_Tmp(  
    `Tmp_Id` INT UNSIGNED NOT NULL AUTO_INCREMENT,  
    `Asset_Id` VARCHAR(16) NOT NULL,  
    `Check_Item` TINYINT(1) NOT NULL,  
    `Check_Result` VARCHAR(8192) NOT NULL,  
    PRIMARY KEY (`Tmp_Id`)  
)ENGINE=MyISAM DEFAULT CHARSET=utf8;  
	  
SET @tSql = CONCAT('INSERT INTO Gather_Data_Tmp (`Asset_Id`, `Check_Item`, `Check_Result`)
SELECT Asset_Id, Check_Item, Check_Result   
FROM IDC_Gather_Info   
WHERE Check_Time > ', beginTime,
' AND Check_Time <= ', checkTime);  

PREPARE gatherData FROM @tSql;  
EXECUTE gatherData;  
	  
SELECT MIN(`Tmp_Id`) INTO i FROM Gather_Data_Tmp;  
SELECT MAX(`Tmp_Id`) INTO maxCnt FROM Gather_Data_Tmp;  
	  
WHILE i <= maxCnt DO
    -- 变量赋值
    SELECT Asset_Id, Check_Item, Check_Result 
    INTO t_id, t_item, t_result 
    FROM Gather_Data_Tmp 
    WHERE Tmp_Id = i;  

    SET i = i + 1;  
END WHILE;  
END

1. 数据量15万，执行成功，耗时8.928s
2. 数据量5万，执行成功，耗时2.994s
3. 数据量1万，执行成功，耗时0.634s

可以看到Mysql的游标在处理大一点的数据量时还是比较乏力的，仅适合用于操作几百上千的小数据量。
