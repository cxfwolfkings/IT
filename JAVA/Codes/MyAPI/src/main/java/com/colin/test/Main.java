package com.colin.test;

public class Main {
	public static void main(String[] args) {
		System.out.println("Hello World");
		/*JDBCHelper dbHelper = new JDBCHelper("db_sqlserver.properties");
		String sql = "select Html from T_PdfContent where ID = 20";
		String html = "";
		try {
			Connection conn = dbHelper.getConnection();
			ResultSet rs = dbHelper.query(conn, sql);
			if (rs.next()) {
				// 结果集中的列索引从1开始
				html = rs.getString(1);
			}
			FileHelper.createFile("D:\\Colin\\TestReport.html", html);
			System.out.println("Go");
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}*/
	}
}