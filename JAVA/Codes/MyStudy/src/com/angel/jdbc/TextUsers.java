package com.angel.jdbc;

import java.sql.*;

public class TextUsers {
	public static void main(String[] args) {
		System.out.println(login(1001,2) ? "没有账户" : "登录成功");
		listAll();
		addUser(1001,1,1);
	}

	public static boolean login(int sid,int cid) {
		boolean flag = false;
		Connection conn = ConnectionUtils.getConnection();
		Statement stmt = null;
		ResultSet rs = null;
		String sql = "select * from stu_cour_lzh "+"where sid = "+sid+"and cid = "+cid;
		try {
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);
			if (rs.next()) {
				flag = true;
				System.out.println(rs.getInt("cid"));
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			ConnectionUtils.close(rs);
			ConnectionUtils.close(stmt);
			ConnectionUtils.close(conn);
		}
		return flag;
	}
	public static void listAll(){
		Connection conn = ConnectionUtils.getConnection();
		Statement stmt = null;
		ResultSet rs = null;
		String sql = "select * from stu_cour_lzh";
		try {
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);
			while(rs.next()){
				int sid = rs.getInt(1);
				int cid = rs.getInt(2);
				int score = rs.getInt("score");
				System.out.println(sid+","+cid+","+score);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			ConnectionUtils.close(rs);
			ConnectionUtils.close(stmt);
			ConnectionUtils.close(conn);
		}
		
	}
	public static void addUser(int sid,int cid,int score){
		Connection conn = ConnectionUtils.getConnection();
		PreparedStatement stmt = null;
		String sql = "insert into stu_cour_lzh values(?,?,?)";
		try {
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1,sid);
			stmt.setInt(2,cid);
			stmt.setInt(3,score);
			int n = stmt.executeUpdate();
			if(n==1){
				System.out.println("ok");
			}else{
				System.out.println("no");
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			ConnectionUtils.close(stmt);
			ConnectionUtils.close(conn);
		}
		
		
	}
}
