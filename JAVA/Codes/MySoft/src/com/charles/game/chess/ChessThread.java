package com.charles.game.chess;

import java.io.IOException;
import java.util.StringTokenizer;

/**
 * 一个客户端用户线程
 * 处理用户落子的点击事件处理,及消息发送
 * @author Charles
 * @date   2016年6月23日 上午5:42:01
 */
public class ChessThread extends Thread {
	ChessPad chesspad;

	public ChessThread(ChessPad chesspad) {
		this.chesspad = chesspad;
	}

	/**
	 * 发送消息
	 */
	public void sendMessage(String sndMessage) {
		try {
			// 利用由socket提供的输出流向服务器发送信息
			chesspad.outData.writeUTF(sndMessage);
		} catch (Exception ea) {
			System.out.println("chessThread.sendMessage:" + ea);
		}
	}

	/**
	 * 接收消息,具体就是落子信息,包括落子位置,颜色等.
	 */
	public void acceptMessage(String recMessage) {
		// 如果收到的消息以“/chess”开头，将其中的坐标信息和颜色信息提取出来
		if (recMessage.startsWith("/chess ")) {
			StringTokenizer userToken = new StringTokenizer(recMessage, " ");
			String chessToken;
			String[] chessOpt = { "-1", "-1", "0" };
			int chessOptNum = 0;
			// 使用Tokenizer将空格分隔的字符串分成三段
			while (userToken.hasMoreTokens()) {
				chessToken = (String) userToken.nextToken(" ");
				if (chessOptNum >= 1 && chessOptNum <= 3) {
					chessOpt[chessOptNum - 1] = chessToken;
				}
				chessOptNum++;
			}
			// 将己方的走棋信息如棋子摆放的位置、棋子的颜色为参数，使用netChessPaint函数
			// 是对方客户端也看到己方的落子位置。
			chesspad.netChessPaint(Integer.parseInt(chessOpt[0]),
					Integer.parseInt(chessOpt[1]),
					Integer.parseInt(chessOpt[2]));

		} else if (recMessage.startsWith("/yourname ")) {
			chesspad.chessSelfName = recMessage.substring(10);
		} else if (recMessage.equals("/error")) {
			chesspad.statusText.setText("错误:没有这个用户，请退出程序，重新加入");
		}
	}

	public void run() {
		String message = "";
		try {
			while (true) {
				// 之所以要开线程、是因为这里socket读取服务器发来的信息会阻塞。。
				message = chesspad.inData.readUTF();
				// 解析处理消息
				acceptMessage(message);
			}
		} catch (IOException es) {
			// 读取异常..读者可以试着添加相应处理,比如像服务器发回相应的信息提示等,
			// 从而可提高程序运行可靠性
		}
	}

}
