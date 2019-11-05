package com.colin.util;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

/**
 * JDBC帮助类
 * @author colin.chen
 * @since 2018-01-16
 */
public class JDBCHelper {

	private String driver;
	private String url;
	private String dbUser;
	private String dbPwd;

	public JDBCHelper(String fileName){
		Properties props = new Properties();
		try {
			/**
			 * getResourceAsStream()返回的是当前类的目录
			 * 参数可以是绝对路径或相对路径
			 */
			props.load(this.getClass().getResourceAsStream(fileName));
			driver = props.getProperty("driver");
			url = props.getProperty("url");
			dbUser = props.getProperty("dbUser");
			dbPwd = props.getProperty("dbPwd");
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	/**
	 * 获取连接 
	 * @return
	 */
	public Connection getConnection() {
		Connection conn = null;
		try {
			Class.forName(driver);
			conn = DriverManager.getConnection(url, dbUser, dbPwd);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return conn;
	}

	/**
	 * 关闭数据库占用资源项 
	 * @param conn
	 * @param stmt
	 * @param rs
	 */
	public void closeResource(Connection conn, Statement stmt, ResultSet rs) {
		try {
			if (rs != null) {
				rs.close();
			}
			if (stmt != null) {
				stmt.close();
			}
			if (conn != null) {
				conn.close();
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	/**
	 * 查询操作，得到结果集
	 * @param con
	 * @param sql
	 * @return
	 */
	public ResultSet query(Connection conn, String sql) {
		ResultSet rs = null;
		try {
			if (conn == null) {
				throw new Exception("database connection can't use!");
			}
			if (sql == null)
				throw new Exception("check your parameter: 'sql'! don't input null!");
			// 声明语句
			Statement stmt = conn.createStatement();
			// 执行查询
			rs = stmt.executeQuery(sql);
			// ResultSetMetaData rMeta = rs.getMetaData();
			// 获得数据字段个数
			// int numColumns = rMeta.getColumnCount();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return rs;
	}
	
	/**
	 * 自动执行更、删、改操作
	 * @param con
	 * @param sql
	 * @return
	 */
	public int executeAuto(Connection conn, String sql) {
		try {
			if (conn == null)
				return -1;
			Statement stmt = conn.createStatement();
			return stmt.executeUpdate(sql);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}
	
	/**
	 * 手动提交更、删、改操作
	 * @param conn
	 * @param sql
	 */
	public void executeManu(Connection conn, String sql){
		try {
			if (conn == null)
				return;
			conn.setAutoCommit(false);
			Statement stmt = conn.createStatement();
			stmt.executeUpdate(sql);
			conn.commit();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 调用存储过程
	 * （待完善）
	 * @param conn
	 */
	public void execute(Connection conn, String procName, Object[] params) {
		CallableStatement callableStatement = null;
		try {
			conn.setAutoCommit(false);
			// 调用存储过程
			callableStatement = conn.prepareCall("{call " + procName + "(?)}");
			// 传递参数给存储过程
			callableStatement.setInt(1, 6);
			// 执行存储过程
			callableStatement.executeQuery();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 获取元数据
	 * @param conn
	 */
	public void getTableMeta(Connection conn, String tableName){
		try {
			DatabaseMetaData dbmd = conn.getMetaData();
			//获取驱动名
		    String dataName = dbmd.getDriverName();
		    String dataURL = dbmd.getURL();
		    //获取数据库最大支持字节数
		    int dataMaxSize = dbmd.getMaxRowSize();
		    //获取数据库表信息
		    String[] types = new String[1];
		    types[0] = "TABLE"; 
		    ResultSet tableResult = dbmd.getTables(null, null, "%", types);
		    //获取表主键信息
		    ResultSet pkResult = dbmd.getPrimaryKeys(null, null, tableName);
		    //获取表外键信息
		    ResultSet fkResult  = dbmd.getImportedKeys(null, null, tableName);
		}catch(Exception ex){
			ex.printStackTrace();
		}
	}
	
	/**
	 * 获取结果集元数据
	 * @param conn
	 * @param tableName
	 */
	public void getResultMeta(ResultSet rs) {
		try {
			ResultSetMetaData rsInfo = rs.getMetaData();
			// 获取数据列数
			int columnCount = rsInfo.getColumnCount();
			// 获取数据列类型
			for (int i = 1; i < columnCount + 1; i++) {
				String columeName = rsInfo.getColumnName(i);
				String columeType = rsInfo.getColumnTypeName(i);
				boolean autocol = rsInfo.isAutoIncrement(i);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
