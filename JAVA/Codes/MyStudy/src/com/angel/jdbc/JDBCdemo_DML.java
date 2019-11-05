package com.angel.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;

/*
 * 
 * 
 */
public class JDBCdemo_DML {

	public static void main(String[] args) {
		System.out.println(changePwd(1001, "1234") ? "success" : "error");
		// System.out.println(deleteUser(1004)?"success":"error");
		// System.out.println(createUser(1004,"asfd","1234","1234324235","1@qq.com")?"success":"error");
	}
	
	private static boolean changePwd(int id, String pwd) {
		// TODO Auto-generated method stub
		String sql = "update luzz" + " set pwd = " + pwd + " where id = " + id;
		// System.out.println(sql);
		boolean flag = false;
		Connection conn = ConnectionUtils.getConnection();
		Statement stmt = null;
		try {
			stmt = conn.createStatement();
			int n = stmt.executeUpdate(sql);// ******
			if (n == 1) {// ?
				flag = true;
			}
		} catch (SQLException e) {
			// TODO: handle exception
			e.printStackTrace();
		} finally {
			ConnectionUtils.close(stmt);
			ConnectionUtils.close(conn);
		}
		return flag;
	}

	public static boolean deleteUser(int id) {
		String sql = "delete from luzz" + " where id = " + id;
		boolean flag = false;
		Connection conn = ConnectionUtils.getConnection();
		Statement stmt = null;
		try {
			stmt = conn.createStatement();
			int n = stmt.executeUpdate(sql);// ******
			if (n == 1) {
				flag = true;
			}
		} catch (SQLException e) {
			// TODO: handle exception
			e.printStackTrace();
		} finally {
			ConnectionUtils.close(stmt);
			ConnectionUtils.close(conn);
		}
		return flag;

	}

	public static boolean createUser(int id, String name, String pwd,
			String phone, String email) {
		// String sql = "insert into user_lz values(" + id + ",'"+name+"','"+
		// pwd +"','"+phone+"','"+email+"')";
		String sql = "insert into luzz values(?,?,?,?,?)";
		boolean flag = false;
		Connection conn = ConnectionUtils.getConnection();
		PreparedStatement stmt = null;
		try {
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, id);
			stmt.setString(2, name);
			stmt.setString(3, pwd);
			stmt.setString(4, phone);
			stmt.setString(5, email);
			int n = stmt.executeUpdate();
			if (n == 1) {
				flag = true;
			}
		} catch (SQLException e) {
			// TODO: handle exception
			e.printStackTrace();
		} finally {
			ConnectionUtils.close(stmt);
			ConnectionUtils.close(conn);
		}
		return flag;
	}
}