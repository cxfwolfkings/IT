package com.angel.nio;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;
import java.nio.charset.Charset;
import java.nio.charset.CharsetEncoder;
import java.util.Iterator;
import java.util.Set;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ServerMain {
	private int num = 0;
	public static Selector sel;
	private ServerSocketChannel server;
	private ExecutorService pool;
	public ServerMain(int port, int num) throws IOException {
		sel = Selector.open();// 选择器(多路复用器)
		pool = Executors.newFixedThreadPool(num);
		server = ServerSocketChannel.open();
		server.socket().bind(new InetSocketAddress(port));
		server.configureBlocking(false);// 非阻塞
		server.register(sel, SelectionKey.OP_ACCEPT);// 注册
		this.run();
	}
	public void run() {
		System.out.println("listen to port...");
		try {
			for (;;) {
				sel.select(); //在这里会阻塞
				Set<SelectionKey> readyKeys = sel.selectedKeys();
				Iterator<SelectionKey> iterator = readyKeys.iterator();
				while (iterator.hasNext()){
					SelectionKey key = iterator.next();
					iterator.remove();
					this.process(key);
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	public void process(SelectionKey key) throws IOException {
		if (key.isAcceptable()) {
			ServerSocketChannel server = (ServerSocketChannel)key.channel();
			SocketChannel client = server.accept();
			client.configureBlocking(false);
			client.register(ServerMain.sel, SelectionKey.OP_WRITE);
		} else if (key.isWritable()) {
			System.out.println(++num);
			CharsetEncoder encoder = Charset.forName("UTF-8").newEncoder();
			SocketChannel channel = (SocketChannel) key.channel();  
            ByteBuffer block = encoder.encode(CharBuffer.wrap("connect to server..."));
            channel.write(block);
            if(key.isValid()) key.cancel(); // 注意,注销key否则selector一直选择
            pool.execute(new TCPHandler());
		}
	}
	
	public static void main(String[] args) throws IOException {
		new ServerMain(8888,200).run();
	}
}
