package com.angel.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class TexBatch {
public static void main(String[] args) {
	batch(305,"l");
}
public static void batch(int i,String name){
	String sql = "insert into my_temp_luzhen values(?,?)";
	Connection conn = ConnectionUtils.getConnection();
	PreparedStatement stmt = null;
	try {
		conn.setAutoCommit(false);
		stmt = conn.prepareStatement(sql);
		for(i=200;i<=305;i++){
			stmt.setInt(1, i);
			stmt.setString(2, name);
			stmt.addBatch();
			if(i%10==0){
				stmt.executeBatch();
				stmt.clearBatch();
			}
		}
		System.out.print(i+"\t");
		stmt.executeBatch();
		conn.commit();
	} catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}finally{
		ConnectionUtils.close(stmt);
		ConnectionUtils.close(conn);
	}
}
}
