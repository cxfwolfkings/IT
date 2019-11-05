package com.angel.jdbc;

import java.sql.*;

public class JDBCDemo {
	public static void main(String[] args) {
		textSelect();
	}

	private static void textSelect() {
		// TODO Auto-generated method stub
		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
			String url = "jdbc:oracle:thin:@192.168.10.205:1521:tarena";
			String dbUser = "openlab";
			String dbPwd = "open123";
			try {
				Connection conn = DriverManager.getConnection(url, dbUser,
						dbPwd);
				String sql = "select * from student_lzh";
				Statement stmt = conn.createStatement();
				ResultSet rs = stmt.executeQuery(sql);
				while (rs.next()) {
					int id = rs.getInt(1);
					String name = rs.getString(2);
					System.out.println(id + " " + name);
				}
				rs.close();
				stmt.close();
				conn.close();

			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
