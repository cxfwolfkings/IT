package com.angel.socket;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.io.Writer;
import java.net.Socket;
import java.net.UnknownHostException;

public class ClientHelper {

	/**
	 * 
	 * @param host
	 * @param port
	 * @throws UnknownHostException
	 * @throws IOException
	 */
	public static void startClientPort(String host,int port) throws UnknownHostException, IOException {
		// 为了简单起见，所有的异常都直接往外抛
		// String host = "127.0.0.1"; // 要连接的服务端IP地址
		// int port = 8899; // 要连接的服务端对应的监听端口
		// 与服务端建立连接
		Socket client = new Socket(host, port);
		// 建立连接后就可以往服务端写数据了
		Writer writer = new OutputStreamWriter(client.getOutputStream());
		writer.write("Hello Server.");
		writer.flush();// 写完后要记得flush
		writer.close();
		client.close();
	}
	
	/**
	 * 代码中我们先是给服务端发送了一段数据，之后读取服务端返回来的数据，
	 * 跟之前的服务端一样在读的过程中有可能导致程序一直挂在那里，永远跳不出while循环。
	 * 这段代码配合服务端的第一段代码就正好让我们分析服务端永远在那里接收数据，
	 * 永远跳不出while循环，也就没有之后的服务端返回数据给客户端，
	 * 客户端也就不可能接收到服务端返回的数据。解决方法如服务端第二段代码所示，
	 * 在客户端发送数据完毕后，往输出流里面写入结束标记告诉服务端数据已经发送完毕了，
	 * 同样服务端返回数据完毕后也发一个标记告诉客户端。
	 * 我们日常使用的比较多的都是这种客户端发送数据给服务端，
	 * 服务端接收数据后再返回相应的结果给客户端这种形式。
	 * 只是客户端和服务端之间不再是这种一对一的关系
	 * @param host
	 * @param port
	 * @throws UnknownHostException
	 * @throws IOException
	 */
	public static void startClient(String host, int port)
			throws UnknownHostException, IOException {
		// 为了简单起见，所有的异常都直接往外抛
		// String host = "127.0.0.1"; // 要连接的服务端IP地址
		// int port = 8899; // 要连接的服务端对应的监听端口
		// 与服务端建立连接
		Socket client = new Socket(host, port);
		// 建立连接后就可以往服务端写数据了
		Writer writer = new OutputStreamWriter(client.getOutputStream());
		writer.write("Hello Server.");
		writer.write("eof");  
		writer.flush();
		// 写完以后进行读操作
		Reader reader = new InputStreamReader(client.getInputStream());
		char chars[] = new char[64];
		int len;
		StringBuffer sb = new StringBuffer();
		String temp;
		int index;  
		while ((len = reader.read(chars)) != -1) {
			temp = new String(chars, 0, len);  
			if ((index = temp.indexOf("eof")) != -1) {  
				sb.append(temp.substring(0, index));  
				break;  
			} 
			sb.append(temp);
		}
		System.out.println("from server: " + sb);
		writer.close();
		reader.close();
		client.close();
	}  

}
