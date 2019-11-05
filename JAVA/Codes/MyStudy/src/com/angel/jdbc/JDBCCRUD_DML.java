package com.angel.jdbc;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Calendar;

public class JDBCCRUD_DML {
	public static void main(String[] args) {
		// Date d = new Date(System.currentTimeMillis());
		Calendar c = Calendar.getInstance();
		c.set(2012, 5, 2);
		Date d = new Date(c.getTimeInMillis());
		addEmp(1236, "lhhu", "man", d);
	}

	private static void addEmp(int empno, String ename, String job,
			Date hiredate) {
		// TODO Auto-generated method stub
		Connection conn = ConnectionUtils.getConnection();
		PreparedStatement stmt = null;
		try {
			String sql = "insert into emp_xie(empno,ename,job,hiredate) values(?,?,?,?)";
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, empno);
			stmt.setString(2, ename);
			stmt.setString(3, job);
			stmt.setDate(4, hiredate);
			stmt.executeUpdate();
			System.out.println("nnn");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			ConnectionUtils.close(stmt);
			ConnectionUtils.close(conn);
		}
	}

}
