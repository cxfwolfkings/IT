package com.charles.soft.chat;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.Socket;

/**
 * 定义客户端 
 * 1.创建Socket，指定服务端IP以及服务端的服务端口，创建好Socket的同时，实际上已经连接到了服务端 ，若没有创建成功是会报错的
 * 2.通过Socket对象获取输出流，用来发送消息给服务端 
 * 3.通过Socket对象获取输入流，用来读取来自服务端的消息
 */
public class MySocket {
	public static void main(String[] args) throws Exception {
		Socket socket = new Socket("localhost", 8088);
		OutputStream out = socket.getOutputStream();
		SendInfoToServer thread = new SendInfoToServer(out);
		thread.start();
		/**************************** 华丽分割线 ********************************/
		InputStream in = socket.getInputStream();
		InputStreamReader reader = new InputStreamReader(in);
		BufferedReader br = new BufferedReader(reader);
		String str;
		while ((str = br.readLine()) != null) {
			System.out.print("服务端说:");
			System.out.println(str);
		}
	}
}
