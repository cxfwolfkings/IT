select * from T_User

select * from T_Role

select * from T_UserRole 

select * from (select row_number()over(order by u.ID desc) rownumber,u.ID, u.UserName,r.Role RoleName from T_User u
        inner join T_UserRole ur on ur.UserID = u.ID
        inner join T_Role r on ur.RoleID = r.ID) a where a.rownumber between 1 and 10