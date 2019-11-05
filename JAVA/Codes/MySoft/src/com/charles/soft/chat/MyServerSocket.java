package com.charles.soft.chat;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Scanner;

/**
 * 创建ServerSocket 
 * 1.创建ServerSocket实例，同时指定服务端口 
 * 2.等待客户端Socket连接
 * 3.连上后，获取Socket的输出流，用于发送信息；获取Socket的输入流，用于接受信息
 */
public class MyServerSocket {
	public static void main(String[] args) throws IOException {
		ServerSocket serverSocket = new ServerSocket(8088);
		System.out.println("ServerSocket创建完毕");
		System.out.println("ServerSocket等待客户端连接...");
		Socket socket = serverSocket.accept();
		System.out.println("一个客户端连接,准备发送问候语.");
		InputStream in = socket.getInputStream();
		GetClientInfoThread thread = new GetClientInfoThread(in);
		thread.start();
		/********************************** 华丽的分割线 **************************************/
		Scanner scanner = new Scanner(System.in);
		OutputStream out = socket.getOutputStream();
		OutputStreamWriter writer = new OutputStreamWriter(out);
		PrintWriter pw = new PrintWriter(writer);
		String info;
		while ((info = scanner.nextLine()) != null) {
			pw.println(info);
			pw.flush();
		}
		// pw.write("客户端，你好，我是服务端!");
		// pw.flush();
		System.out.println("问候语发送完毕，断开客户端");
		socket.close();
	}
}
