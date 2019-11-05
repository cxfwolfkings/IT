package com.angel.nio;

import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.SocketChannel;
import java.nio.charset.Charset;
import java.nio.charset.CharsetEncoder;
import java.util.Iterator;
import java.util.Set;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ClientMain implements Runnable {

	static int SIZE = 10;
	static InetSocketAddress url = new InetSocketAddress("127.0.0.1", 8888);
	static CharsetEncoder encoder = Charset.forName("UTF-8").newEncoder();
	String msg = "";

	public void run() {
		try{
			SocketChannel client = SocketChannel.open();
			client.configureBlocking(false);
			Selector selector = Selector.open();
			client.register(selector, SelectionKey.OP_CONNECT);
			client.connect(url);
			ByteBuffer buffer = ByteBuffer.allocate(8 * 1024);
			int total = 0;

			for (;;) {
				selector.select();
				Set<SelectionKey>  set = selector.selectedKeys();
				Iterator<SelectionKey> iter = set.iterator();

				while (iter.hasNext()) {
					SelectionKey key = iter.next();
					iter.remove();
					if (key.isConnectable()) {
						SocketChannel channel = (SocketChannel) key.channel();
						if (channel.isConnectionPending())
							channel.finishConnect();
						channel.register(selector, SelectionKey.OP_READ);
					} else if (key.isReadable()) {
						SocketChannel channel = (SocketChannel) key.channel();
						int count = channel.read(buffer);
						if (count > 0) {
							total += count;
							buffer.flip();

							while (buffer.remaining() > 0) {
								byte b = buffer.get();
								msg += (char) b;

							}
							buffer.clear();
						}
						System.out.println(msg);
						selector.close();
						return;
					}
				}
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static void main(String[] args) {
		ExecutorService pool = Executors.newFixedThreadPool(200);
		int i = 2000;
		while (i-- > 0) {
			try {
				pool.execute(new ClientMain());
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		pool.shutdown();
	}

}