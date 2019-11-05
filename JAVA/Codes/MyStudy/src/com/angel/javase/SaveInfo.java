package com.angel.javase;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.PrintWriter;
import java.util.LinkedList;
import java.util.Scanner;

/**
 * 从控制台输入信息，保存到硬盘上，使用异步保存文件
 */
public class SaveInfo extends Thread {
	public static void main(String[] args) throws FileNotFoundException {
		final LinkedList<String> list = new LinkedList<String>();
		final PrintWriter out = new PrintWriter(
				new FileOutputStream("info.txt"));
		final Thread writer = new Thread() {
			@Override
			public void run() {
				while (true) {
					if (list.isEmpty()) {
						try {
							out.flush();
							Thread.sleep(5000);
						} catch (InterruptedException e) {
						}
						continue;
					}
					String str = list.removeFirst();
					out.println(str);
					out.flush();
				}
			}
		};
		writer.setDaemon(true);
		Thread reader = new Thread() {
			@Override
			public void run() {
				Scanner sc = new Scanner(System.in);
				while (true) {
					String info = sc.nextLine();
					if (info.equals("exit")) {
						writer.interrupt();
						break;
					}
					list.addLast(info);
				}
			}
		};
		reader.start();
		writer.start();
	}
}
