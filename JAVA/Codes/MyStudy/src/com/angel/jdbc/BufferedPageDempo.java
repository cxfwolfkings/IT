package com.angel.jdbc;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class BufferedPageDempo {

	public static void main(String[] args) {
		getDate("aaa",5);
	}
	public static void getDate(String page,int pagesize){
		
		int intpage = 1;
		try{
		intpage = Integer.parseInt(page);
		}catch(Exception e){
		
		}
		if(intpage < 1){
			intpage = 1;
		}
		int totalpage = getTotalPage(pagesize);
		if(intpage>totalpage){
			intpage = totalpage;
		}
		getDate(intpage,pagesize);
	}
	private static int getTotalPage(int pagesize) {
		// TODO Auto-generated method stub
		int totalpage = 0;
		int totalcount = getTotalCount();
		if(totalcount%pagesize==0){
			totalpage = totalcount/pagesize;
		}else {
			totalpage = totalcount/pagesize+1;
		}
		return totalpage;
	}
	private static int getTotalCount() {
		// TODO Auto-generated method stub
		int totalcount = 0;
		String sql = "select count(*) from my_temp_luzhen";
		Connection conn = ConnectionUtils.getConnection();
		Statement stmt = null;
		ResultSet rs = null;
		try {
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);
			while(rs.next()){
				totalcount = rs.getInt(1);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			ConnectionUtils.close(rs);
			ConnectionUtils.close(stmt);
			ConnectionUtils.close(conn);
		}
		
		return totalcount;
	}
	private static void getDate(int page, int pagesize) {
		// TODO Auto-generated method stub
		String sql = "select * from my_temp_luzhen";
		int begin = (page - 1)*pagesize+1;
		Connection conn = ConnectionUtils.getConnection();
		Statement stmt = null;
		ResultSet rs = null;
		try {
			stmt = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			rs = stmt.executeQuery(sql);
			rs.absolute(begin);
			for(int i=0;i<pagesize;i++){
				System.out.println(rs.getInt(1));
				if(!rs.next()){
					break;
				}	
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
}
