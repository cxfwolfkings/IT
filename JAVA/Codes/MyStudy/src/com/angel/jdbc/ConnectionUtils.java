package com.angel.jdbc;
import java.sql.*;
import java.util.*;
import java.io.*;
public class ConnectionUtils {
    private static String driver;
    private static String url;
    private static String dbUser;
    private static String dbPwd;
    static{
    	String filename = "db_oracle.properties";
    	Properties props = new Properties();
    	File file = new File(filename);
    	try {
			props.load(new FileInputStream(file));
			driver = props.getProperty("driver");
			url = props.getProperty("url");
			dbUser = props.getProperty("dbUser");
			dbPwd = props.getProperty("dbPwd");
			//System.out.println(driver);
			} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
  //  public static void main(String[] args) {
	//	new ConnectionUtils();
	//}
    public static Connection getConnection(){
    	Connection conn = null;
    	try {
			Class.forName(driver);
			conn = DriverManager.getConnection(url,dbUser,dbPwd);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	return conn;
    }
    public static void close(ResultSet rs){
    	if(rs !=null){
    		try {
				rs.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
    	}
    }
    public static void close(Statement stmt){
    	if(stmt !=null){
    		try {
				stmt.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
    	}
    }
    public static void close(Connection conn){
    	if(conn !=null){
    		try {
				conn.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
    	}
    }
}
