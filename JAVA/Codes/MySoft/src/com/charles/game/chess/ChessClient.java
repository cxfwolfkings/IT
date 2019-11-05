package com.charles.game.chess;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Frame;
import java.awt.Panel;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.net.Socket;
import java.util.StringTokenizer;

/**
 * 五子棋客户端框架，实现了动作监听器和键盘监听器
 */
public class ChessClient extends Frame implements ActionListener, KeyListener {

	private static final long serialVersionUID = 3504658524115147906L;
	UserPad userpad = new UserPad();// 用户列表Panel
	ChatPad chatpad = new ChatPad();// 聊天信息Panel
	ControlPad controlpad = new ControlPad();// 控制Panel
	ChessPad chesspad = new ChessPad();// 棋盘Panel
	InputPad inputpad = new InputPad();// 信息输入Panel
	Socket chatSocket;
	DataInputStream in;
	DataOutputStream out;
	String chessClientName = null;
	String host = null;
	int port = 4331;
	boolean isOnChat = false; // 是否在聊天
	boolean isOnChess = false; // 是否在下棋
	boolean isGameConnected = false; // 是否下棋的客户端连接
	boolean isServer = false; // 是否建立游戏的主机
	boolean isClient = false; // 是否加入游戏的客户端
	Panel northPanel = new Panel();
	Panel centerPanel = new Panel();
	Panel eastPanel = new Panel();

	/**
	 * 五子棋客户端框架的构造函数。用来初始化一些对象、布局和为按钮添加监听器。
	 */
	public ChessClient() {
		// 窗口标题
		super("五子棋客户端");
		// 设置布局
		setLayout(new BorderLayout());
		// 获取服务器ip地址
		host = controlpad.inputIP.getText();
		// 右侧的Panel,向里面添加用户列表和聊天信息列表的Panel
		// 设置eastPanel布局
		eastPanel.setLayout(new BorderLayout());
		// 在其上添加用于列表
		eastPanel.add(userpad, BorderLayout.NORTH);
		// 在其上添加聊天信息窗口
		eastPanel.add(chatpad, BorderLayout.CENTER);
		// 设定背景色
		eastPanel.setBackground(new Color(204, 204, 204));

		// 对编辑输出信息窗口添加事件监听器..
		inputpad.inputWords.addKeyListener(this);
		// 设置棋盘Panel所需的服务器地址
		chesspad.host = controlpad.inputIP.getText();
		// 向centerPanel中添加棋盘和用户输入消息panel,并设定背景颜色
		centerPanel.add(chesspad, BorderLayout.CENTER);
		centerPanel.add(inputpad, BorderLayout.SOUTH);
		centerPanel.setBackground(new Color(204, 204, 204));

		// 为controlpad中的按钮们添加事件监听...
		controlpad.connectButton.addActionListener(this);
		controlpad.creatGameButton.addActionListener(this);
		controlpad.joinGameButton.addActionListener(this);
		controlpad.cancelGameButton.addActionListener(this);
		controlpad.exitGameButton.addActionListener(this);

		// 初始设定这几个按钮为非激活状态..
		controlpad.creatGameButton.setEnabled(false);
		controlpad.joinGameButton.setEnabled(false);
		controlpad.cancelGameButton.setEnabled(false);
		// 添加controlpad到northPanel---最上端的panel
		northPanel.add(controlpad, BorderLayout.CENTER);
		northPanel.setBackground(new Color(204, 204, 204));
		
		// 添加窗口监听器，当窗口关闭时，关闭用于通讯的Socket。
		addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent e) {
				if (isOnChat) { // 如果聊天连接已建立，则释放
					try {
						chatSocket.close();
					} catch (Exception ed) {
					}
				}
				if (isOnChess || isGameConnected) { // 如果下棋连接已建立，则释放
					try {
						chesspad.chessSocket.close();
					} catch (Exception ee) {
					}
				}
				System.exit(0);
			}
		});
		
		// 添加这些panel到frame，组成最终窗口
		add(eastPanel, BorderLayout.EAST);
		add(centerPanel, BorderLayout.CENTER);
		add(northPanel, BorderLayout.NORTH);
		// 设置大小等
		setSize(670, 560);
		setVisible(true);
		setResizable(true);
		validate();
	}

	/**
	 * 和服务器建立连接并通信的函数。
	 * 
	 * @return true 如果连接成功, false 如果连接失败..
	 */
	public boolean connectServer(String serverIP, int serverPort) throws Exception {
		try {
			// 建立聊天socket
			chatSocket = new Socket(serverIP, serverPort);
			// 由socket得到输入输出流.
			in = new DataInputStream(chatSocket.getInputStream());
			out = new DataOutputStream(chatSocket.getOutputStream());
			// 创建线程
			clientThread clientthread = new clientThread(this);
			clientthread.start();
			isOnChat = true;
			return true;
		} catch (IOException ex) {// 连接不成功
			chatpad.chatLineArea.setText("chessClient:connectServer:无法连接,建议重新启动程序 \n");
		}
		return false;
	}

	/**
	 * 动作监听器，响应按钮点击动作。
	 */
	public void actionPerformed(ActionEvent e) {
		// 如果点击的是“连接主机”按钮，则用获取的服务器主机名连接服务器。
		if (e.getSource() == controlpad.connectButton) {
			host = chesspad.host = controlpad.inputIP.getText();
			try {
				if (connectServer(host, port)) {
					// 连接成功
					chatpad.chatLineArea.setText("");
					// 连接按钮设置为非激活态..
					controlpad.connectButton.setEnabled(false);
					// 激活创建,加入游戏按钮
					controlpad.creatGameButton.setEnabled(true);
					controlpad.joinGameButton.setEnabled(true);
					chesspad.statusText.setText("连接成功，请创建游戏或加入游戏");
				}

			} catch (Exception ei) { // 连接失败
				chatpad.chatLineArea.setText("controlpad.connectButton:无法连接,建议重新启动程序 \n");
			}
		}
		// 如果点击的是“关闭程序”按钮，则关闭正在进行通信的Socekt并退出游戏。
		if (e.getSource() == controlpad.exitGameButton) {
			if (isOnChat) { // 如果聊天连接建立则释放
				try {
					chatSocket.close();
				} catch (Exception ed) {
				}
			}
			if (isOnChess || isGameConnected) {// 如果下棋连接建立,则释放
				try {
					chesspad.chessSocket.close();
				} catch (Exception ee) {
				}
			}
			System.exit(0);

		}
		// 如果点击的是“加入游戏”按钮，则先判断选定的加入的目标是否有效。
		// 如果选定的目标为空或正在下棋或为其本身，则认为目标无效。
		if (e.getSource() == controlpad.joinGameButton) {
			// 得到选择的用户
			String selectedUser = userpad.userList.getSelectedItem();
			if (selectedUser == null || selectedUser.startsWith("[inchess]") || selectedUser.equals(chessClientName)) {
				chesspad.statusText.setText("必须先选定一个有效用户");
			} else {
				try {
					// 如果未建立与服务器的连接，创建连接，设定用户的当前状态。
					// 此外还要对按钮作一些处理，将“创建连接”按钮和“加入游戏按钮”设为不可用。
					if (!isGameConnected) {
						if (chesspad.connectServer(chesspad.host, chesspad.port)) {
							isGameConnected = true;
							isOnChess = true;
							isClient = true;
							controlpad.creatGameButton.setEnabled(false);
							controlpad.joinGameButton.setEnabled(false);
							controlpad.cancelGameButton.setEnabled(true);
							// 向服务器发送用户加入游戏的消息
							chesspad.chessthread.sendMessage(
									"/joingame " + userpad.userList.getSelectedItem() + " " + chessClientName);
						}
					}
					// 如果已建立连接，省去建立连接的操作。
					else {
						isOnChess = true;
						isClient = true;
						controlpad.creatGameButton.setEnabled(false);
						controlpad.joinGameButton.setEnabled(false);
						controlpad.cancelGameButton.setEnabled(true);
						// 向服务器发送用户加入游戏的消息
						chesspad.chessthread
								.sendMessage("/joingame " + userpad.userList.getSelectedItem() + " " + chessClientName);
					}
				} catch (Exception ee) {// 加入游戏 失败。。
					isGameConnected = false;
					isOnChess = false;
					isClient = false;
					controlpad.creatGameButton.setEnabled(true);
					controlpad.joinGameButton.setEnabled(true);
					controlpad.cancelGameButton.setEnabled(false);
					chatpad.chatLineArea.setText("chesspad.connectServer无法连接 \n" + ee);
				}

			}
		}
		// 如果点击的是“创建游戏”按钮，设定用户状态、按钮状态，然后与服务器通讯。
		if (e.getSource() == controlpad.creatGameButton) {
			try {
				// 未建立连接时的操作。
				if (!isGameConnected) {
					if (chesspad.connectServer(chesspad.host, chesspad.port)) {
						isGameConnected = true;
						isOnChess = true;
						isServer = true;
						controlpad.creatGameButton.setEnabled(false);
						controlpad.joinGameButton.setEnabled(false);
						controlpad.cancelGameButton.setEnabled(true);
						chesspad.chessthread.sendMessage("/creatgame " + "[inchess]" + chessClientName);
					}
				}
				// 建立连接时的操作。
				else {
					isOnChess = true;
					isServer = true;
					controlpad.creatGameButton.setEnabled(false);
					controlpad.joinGameButton.setEnabled(false);
					controlpad.cancelGameButton.setEnabled(true);
					chesspad.chessthread.sendMessage("/creatgame " + "[inchess]" + chessClientName);
				}
			} catch (Exception ec) {
				isGameConnected = false;
				isOnChess = false;
				isServer = false;
				controlpad.creatGameButton.setEnabled(true);
				controlpad.joinGameButton.setEnabled(true);
				controlpad.cancelGameButton.setEnabled(false);
				ec.printStackTrace();
				chatpad.chatLineArea.setText("chesspad.connectServer无法连接 \n" + ec);
			}

		}
		// 如果点击的是“取消游戏”按钮，同样要修改按钮状态。
		if (e.getSource() == controlpad.cancelGameButton) {
			// 如果棋局正在进行，判定退出游戏的一方输
			if (isOnChess) {
				chesspad.chessthread.sendMessage("/giveup " + chessClientName);
				chesspad.chessVictory(-1 * chesspad.chessColor);
				controlpad.creatGameButton.setEnabled(true);
				controlpad.joinGameButton.setEnabled(true);
				controlpad.cancelGameButton.setEnabled(false);
				chesspad.statusText.setText("请建立游戏或者加入游戏");
			}
			if (!isOnChess) {
				controlpad.creatGameButton.setEnabled(true);
				controlpad.joinGameButton.setEnabled(true);
				controlpad.cancelGameButton.setEnabled(false);
				chesspad.statusText.setText("请建立游戏或者加入游戏");
			}
			isClient = isServer = false;
		}
	}

	/**
	 * 键盘监听器，响应“回车按下”事件. 发送消息..
	 */
	public void keyPressed(KeyEvent e) {
		/*
		 * TextField inputWords = (TextField) e.getSource();
		 * //如果选择向所有人发消息，则将所发消息直接发给服务器 if (e.getKeyCode() == KeyEvent.VK_ENTER)
		 * { if (inputpad.userChoice.getSelectedItem().equals("所有人")) { try {
		 * out.writeUTF(inputWords.getText()); inputWords.setText(""); } catch
		 * (Exception ea) { chatpad.chatLineArea .setText(
		 * "chessClient:KeyPressed无法连接,建议重新连接 \n");
		 * userpad.userList.removeAll(); inputpad.userChoice.removeAll();
		 * inputWords.setText(""); controlpad.connectButton.setEnabled(true); }
		 * } //如果选择向一个人发消息，则将所发消息封装成一定格式发给服务器 else { try { out.writeUTF("/" +
		 * inputpad.userChoice.getSelectedItem() + " " + inputWords.getText());
		 * inputWords.setText(""); } catch (Exception ea) { chatpad.chatLineArea
		 * .setText("chessClient:KeyPressed无法连接,建议重新连接 \n");
		 * userpad.userList.removeAll(); inputpad.userChoice.removeAll();
		 * inputWords.setText(""); controlpad.connectButton.setEnabled(true); }
		 * } }
		 */

	}

	public void keyTyped(KeyEvent e) {// 忽略该事件...
	}

	public void keyReleased(KeyEvent e) {// 忽略不处理该事件
	}

	public static void main(String args[]) {// 主函数,创建客户端
		ChessClient chessClient = new ChessClient();
	}
}

class clientThread extends Thread {
	ChessClient chessclient;

	clientThread(ChessClient chessclient) {
		this.chessclient = chessclient;
	}

	/**
	 * 客户端线程对接收到的信息进行处理的函数
	 */
	public void acceptMessage(String recMessage) {
		if (recMessage.startsWith("/userlist ")) {
			// 如果接收到的信息以"/userlist "开头，将其后的用户名提取出来，添加到
			// 输入信息Panel左边的用户列表中。
			StringTokenizer userToken = new StringTokenizer(recMessage, " ");
			int userNumber = 0;
			chessclient.userpad.userList.removeAll();
			chessclient.inputpad.userChoice.removeAll();
			chessclient.inputpad.userChoice.addItem("所有人");
			while (userToken.hasMoreTokens()) {
				String user = (String) userToken.nextToken(" ");
				if (userNumber > 0 && !user.startsWith("[inchess]")) {
					chessclient.userpad.userList.add(user);
					chessclient.inputpad.userChoice.addItem(user);
				}
				userNumber++;
			}
			chessclient.inputpad.userChoice.select("所有人");
		}
		// 如果如果接收到的信息以"/yourname "开头,将用户名显示在客户端对话框标题栏。
		else if (recMessage.startsWith("/yourname ")) {
			// 之所以是10因为“/yourname ”正好10个字符，后面的是用户名。。
			chessclient.chessClientName = recMessage.substring(10);
			chessclient.setTitle("五子棋客户端 " + "当前用户名:" + chessclient.chessClientName);
		}
		// 如果如果接收到的信息以"/reject"开头，在状态栏显示拒绝加入游戏。
		else if (recMessage.equals("/reject")) {
			try {
				chessclient.chesspad.statusText.setText("不能加入游戏");
				// 更新按钮状态
				chessclient.controlpad.cancelGameButton.setEnabled(false);
				chessclient.controlpad.joinGameButton.setEnabled(true);
				chessclient.controlpad.creatGameButton.setEnabled(true);
			} catch (Exception ef) {
				chessclient.chatpad.chatLineArea.setText("chessclient.chesspad.chessSocket.close无法关闭");
			}
			chessclient.controlpad.joinGameButton.setEnabled(true);
		}
		// 如果如果接收到的信息以"/peer"开头,则记下对方的名字，然后进入等待状态
		else if (recMessage.startsWith("/peer ")) {
			// 同理,因为/peer 六个字符,所以是6
			chessclient.chesspad.chessPeerName = recMessage.substring(6);
			if (chessclient.isServer) {// 黑子先行
				chessclient.chesspad.chessColor = 1;
				chessclient.chesspad.isMouseEnabled = true;
				chessclient.chesspad.statusText.setText("请黑棋下子");
			} else if (chessclient.isClient) {
				chessclient.chesspad.chessColor = -1;
				chessclient.chesspad.statusText.setText("已加入游戏，等待对方下子...");
			}

		} else if (recMessage.equals("/youwin")) {
			chessclient.isOnChess = false;
			chessclient.chesspad.chessVictory(chessclient.chesspad.chessColor);
			chessclient.chesspad.statusText.setText("对方退出，请点放弃游戏退出连接");
			chessclient.chesspad.isMouseEnabled = false;
		} else if (recMessage.equals("/OK")) {
			chessclient.chesspad.statusText.setText("创建游戏成功，等待别人加入...");
		} else if (recMessage.equals("/error")) {
			chessclient.chatpad.chatLineArea.append("传输错误：请退出程序，重新加入 \n");
		} else {// 普通聊天
			chessclient.chatpad.chatLineArea.append(recMessage + "\n");
			chessclient.chatpad.chatLineArea.setCaretPosition(chessclient.chatpad.chatLineArea.getText().length());
		}
	}

	public void run() {
		String message = "";
		try {
			while (true) {
				// 同chessface.chessThread类一样，这里利用socket读取会阻塞。。。
				message = chessclient.in.readUTF();
				acceptMessage(message);
			}
		} catch (IOException es) {
			// 读取异常..读者可以试着添加相应处理,不如像服务器发回相应的信息提示等,
			// 从而可提高程序运行可靠性。
		}
	}

}