package com.angel.socket;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.Scanner;

public class ClientSocketDemo {
	public static void main(String[] args) throws Exception {
		final Socket socket = new Socket("localhost", 8000);
		System.out.println("客户端创建成功，连接服务端!");
		Thread getInfo = new Thread() {
			public void run() {
				try {
					InputStream in = socket.getInputStream();
					InputStreamReader reader = new InputStreamReader(in);
					BufferedReader br = new BufferedReader(reader);
					String info;
					while ((info = br.readLine()) != null) {
						System.out.println("服务端说:" + info);
					}
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		};
		getInfo.start();
		OutputStream out = socket.getOutputStream();
		OutputStreamWriter writer = new OutputStreamWriter(out);
		PrintWriter pw = new PrintWriter(writer);
		String str;
		Scanner console = new Scanner(System.in);
		while ((str = console.nextLine()) != null) {
			pw.println(str);
			pw.flush();
		}
	}
}
