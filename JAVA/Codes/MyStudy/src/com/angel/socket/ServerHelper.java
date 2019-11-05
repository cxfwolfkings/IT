package com.angel.socket;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.io.Writer;
import java.net.ServerSocket;
import java.net.Socket;

public class ServerHelper {

	/**
	 * 
	 * @param port
	 * @throws IOException
	 */
	public static void startServerPort(int port) throws IOException {
		// 为了简单起见，所有的异常信息都往外抛
		// 定义一个ServerSocket监听在端口port上
		ServerSocket server = new ServerSocket(port);
		// server尝试接收其他Socket的连接请求，server的accept方法是阻塞式的
		Socket socket = server.accept();
		// 跟客户端建立好连接之后，我们就可以获取socket的InputStream，并从中读取客户端发过来的信息了。
		Reader reader = new InputStreamReader(socket.getInputStream());
		char chars[] = new char[64];
		int len;
		StringBuilder sb = new StringBuilder();
		while ((len = reader.read(chars)) != -1) {
			sb.append(new String(chars, 0, len));
		}
		System.out.println("from client: " + sb);
		reader.close();
		socket.close();
		server.close();
	}

	/**
	 * 代码中首先我们从输入流中读取客户端发送过来的数据，
	 * 接下来我们再往输出流里面写入数据给客户端，接下来关闭对应的资源文件。
	 * 而实际上上述代码可能并不会按照我们预先设想的方式运行，
	 * 因为从输入流中读取数据是一个阻塞式操作，在上述的while循环中当读到数据的时候就会执行循环体，
	 * 否则就会阻塞，这样后面的写操作就永远都执行不了了。
	 * 除非客户端对应的Socket关闭了阻塞才会停止，while循环也会跳出。
	 * 针对这种可能永远无法执行下去的情况的解决方法是while循环需要在里面有条件的跳出来，
	 * 纵观上述代码，在不断变化的也只有取到的长度len和读到的数据了，len已经是不能用的了，
	 * 唯一能用的就是读到的数据了。针对这种情况，通常我们都会约定一个结束标记，
	 * 当客户端发送过来的数据包含某个结束标记时就说明当前的数据已经发送完毕了，
	 * 这个时候我们就可以进行循环的跳出了。当服务端读取到客户端发送的结束标记，
	 * 即“eof”时就会结束数据的接收，终止循环，这样后续的代码又可以继续进行了。 
	 * @param port
	 * @throws IOException
	 */
	public static void startServer(int port) throws IOException {
		// 为了简单起见，所有的异常信息都往外抛
		// int port = 8899;
		// 定义一个ServerSocket监听在端口8899上
		ServerSocket server = new ServerSocket(port);
		// server尝试接收其他Socket的连接请求，server的accept方法是阻塞式的
		Socket socket = server.accept();
		// 跟客户端建立好连接之后，我们就可以获取socket的InputStream，并从中读取客户端发过来的信息了。
		Reader reader = new InputStreamReader(socket.getInputStream());
		char chars[] = new char[64];
		int len;
		StringBuilder sb = new StringBuilder();
		String temp;  
		int index; 
		while ((len = reader.read(chars)) != -1) {
			temp = new String(chars, 0, len);  
			if ((index = temp.indexOf("eof")) != -1) {//遇到eof时就结束接收  
				sb.append(temp.substring(0, index));  
				break;  
			}  
			sb.append(temp);
		}
		System.out.println("from client: " + sb);
		// 读完后写一句
		Writer writer = new OutputStreamWriter(socket.getOutputStream());
		writer.write("Hello Client.");
		writer.flush();
		writer.close();
		reader.close();
		socket.close();
		server.close();
	}

}
