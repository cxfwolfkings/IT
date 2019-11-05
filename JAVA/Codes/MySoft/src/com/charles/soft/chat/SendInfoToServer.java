package com.charles.soft.chat;

import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.util.Scanner;

/**
 * 这个线程的作用是获取键盘输入的内容通过输出流发送给服务端
 */
public class SendInfoToServer extends Thread {
	private OutputStream out;

	public SendInfoToServer(OutputStream out) {
		this.out = out;
	}

	@Override
	public void run() {
		try {
			Scanner scanner = new Scanner(System.in);
			OutputStreamWriter writer = new OutputStreamWriter(out);
			PrintWriter pw = new PrintWriter(writer);
			String info;
			while ((info = scanner.nextLine()) != null) {
				pw.println(info);
				pw.flush();
			}
		} catch (Exception e) {
		}
	}
}
