package com.charles.soft.chat;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

/**
 * 用于获取来自客户端信息的线程，这个线程的作用是监听来自客户端的内容，打印到服务端的控制台上
 */
public class GetClientInfoThread extends Thread {
	// 这个属性是由ServerSocket给予的
	private InputStream in;

	// GetClientInfoThread t = new GetClientInfoThread();
	public GetClientInfoThread(InputStream in) {
		this.in = in;
	}

	@Override
	public void run() {
		InputStreamReader reader = new InputStreamReader(in);
		BufferedReader br = new BufferedReader(reader);
		String info;
		try {
			while ((info = br.readLine()) != null) {
				System.out.println("客户端说:" + info);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
