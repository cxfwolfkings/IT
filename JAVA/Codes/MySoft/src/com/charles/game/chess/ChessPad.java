package com.charles.game.chess;

import java.awt.*;
import java.awt.event.*;
import java.io.*;
import java.net.*;

/**
 * 显示棋盘的Panel
 * 此Panel实现了鼠标监听器
 * @author Charles
 * @date   2016年6月23日 上午5:39:26
 */
public class ChessPad extends Panel implements MouseListener {

	private static final long serialVersionUID = -793030520806652714L;
	public int chessPoint_x = -1, chessPoint_y = -1, chessColor = 1;
	int chessBlack_x[] = new int[200];// 黑子的x坐标
	int chessBlack_y[] = new int[200];// 黑子的y坐标
	int chessWhite_x[] = new int[200];// 白子的x坐标
	int chessWhite_y[] = new int[200];// 白子的y坐标
	int chessBlackCount = 0, chessWhiteCount = 0;
	int chessBlackWin = 0, chessWhiteWin = 0;
	public boolean isMouseEnabled = false, isWin = false, isInGame = false;
	public Label statusLabel = new Label("客户端状态");
	public TextField statusText = new TextField("请先连接服务器");// 显示客户端状态的文本框
	public Socket chessSocket;
	DataInputStream inData;
	DataOutputStream outData;
	public String chessSelfName = null;// 己方的名字
	public String chessPeerName = null;// 对方的名字
	public String host = null; // 服务器ip地址
	public int port = 4331; // 连接的端口号
	public ChessThread chessthread = new ChessThread(this);

	/**
	 * 棋盘Panel的构造函数
	 */
	public ChessPad() {
		// 设置大小
		setSize(440, 440);
		// 设置布局
		setLayout(null);
		// 背景颜色
		setBackground(new Color(204, 204, 204));
		// 添加鼠标监听器
		addMouseListener(this);
		// 添加状态Label
		add(statusLabel);
		// 设置状态Label大小
		statusLabel.setBounds(30, 5, 70, 24);
		// 显示客户端状态的文本框
		add(statusText);
		statusText.setBounds(100, 5, 300, 24);
		// 设置为不可编辑
		statusText.setEditable(false);
	}

	/**
	 * 和服务器通信的函数
	 */
	public boolean connectServer(String ServerIP, int ServerPort)
			throws Exception {
		try {
			// 利用参数创建一个Socket的实例来完成和服务器之间的信息交换
			// 连接服务器.
			chessSocket = new Socket(ServerIP, ServerPort);
			inData = new DataInputStream(chessSocket.getInputStream());
			outData = new DataOutputStream(chessSocket.getOutputStream());
			// 启动一个用户线程
			chessthread.start();
			return true;
		} catch (IOException ex) {
			statusText.setText("chessPad:connectServer:无法连接 \n");
		}
		return false;
	}

	/**
	 * 一方获胜时的对棋局的处理
	 */
	public void chessVictory(int chessColorWin) {
		// 清除所有的棋子
		this.removeAll();
		// 将保存所有黑棋和白棋的位置坐标的数组清空，为新一盘棋做准备。
		for (int i = 0; i <= chessBlackCount; i++) {
			chessBlack_x[i] = 0;
			chessBlack_y[i] = 0;
		}
		for (int i = 0; i <= chessWhiteCount; i++) {
			chessWhite_x[i] = 0;
			chessWhite_y[i] = 0;
		}
		// 白棋、黑棋数量清空
		chessBlackCount = 0;
		chessWhiteCount = 0;
		// 重新添加状态信息
		add(statusText);
		statusText.setBounds(40, 5, 360, 24);
		// 如果黑棋获胜，计算双方获胜盘数，将双方的战绩比在状态文本框显示出来。
		if (chessColorWin == 1) {
			chessBlackWin++;// 黑棋获胜次数+1
			statusText.setText("黑棋胜,黑:白为" + chessBlackWin + ":" + chessWhiteWin
					+ ",重新开局,等待白棋下子...");
		}
		// 白棋获胜，同上。
		else if (chessColorWin == -1) {
			chessWhiteWin++;
			statusText.setText("白棋胜,黑:白为" + chessBlackWin + ":" + chessWhiteWin
					+ ",重新开局,等待黑棋下子...");
		}
	}

	/**
	 * 将各个棋子的坐标保存在数组里
	 */
	public void getLocation(int a, int b, int color) {

		if (color == 1) {// 黑子
			chessBlack_x[chessBlackCount] = a * 20;
			chessBlack_y[chessBlackCount] = b * 20;
			chessBlackCount++;
		} else if (color == -1) {// 白子
			chessWhite_x[chessWhiteCount] = a * 20;
			chessWhite_y[chessWhiteCount] = b * 20;
			chessWhiteCount++;
		}
	}

	/**
	 * 依据五子棋的行棋规则判断某方获胜。具体就是判断横、竖、左斜、右斜方向特定颜色的棋子连接的总数是否超过5个，如果超过5个就为赢。
	 * 在每个方向的判断又分为对正向、和反向分别统计计数。
	 */
	public boolean checkWin(int a, int b, int checkColor) {
		int step = 1, chessLink = 1, chessLinkTest = 1, chessCompare = 0;
		if (checkColor == 1) {// 黑棋方
			chessLink = 1;// 连子个数
			// ////////////////////////////
			// 以下两个大的循环判断竖直方向棋子连接总数
			// ////////////////////////////
			// 向下的方向连子个数
			for (step = 1; step <= 4; step++) {
				// 下层循环判断竖直向下第step个位置是否有白子
				for (chessCompare = 0; chessCompare <= chessBlackCount; chessCompare++) {
					// 如果有黑子
					if (((a + step) * 20 == chessBlack_x[chessCompare])
							&& ((b * 20) == chessBlack_y[chessCompare])) {
						chessLink = chessLink + 1;
						if (chessLink == 5) {
							return (true);
						}
					}
				}
				if (chessLink == (chessLinkTest + 1))// 竖直向下还有黑色棋子
					chessLinkTest++;
				else
					break;
			}
			// 向上的连子个数
			for (step = 1; step <= 4; step++) {
				// 下层循环判断竖直向上第step个位置是否有黑子
				for (chessCompare = 0; chessCompare <= chessBlackCount; chessCompare++) {
					// 如果有黑子（其实这里可以break出来）
					if (((a - step) * 20 == chessBlack_x[chessCompare])
							&& (b * 20 == chessBlack_y[chessCompare])) {
						chessLink++;
						if (chessLink == 5) {
							return (true);
						}
					}
				}
				// 如果下个位置还有黑色棋子（可以换用标志符判断）
				if (chessLink == (chessLinkTest + 1))
					chessLinkTest++;
				else
					// 如果没有，则终止，退出循环
					break;
			}
			// /////////////////////////////
			// 以下两个大的循环统计横向的连子个数
			// /////////////////////////////
			chessLink = 1;
			chessLinkTest = 1;
			// 横向右边的连子数统计
			for (step = 1; step <= 4; step++) {
				// 右侧第step个位置是否有同色棋子
				for (chessCompare = 0; chessCompare <= chessBlackCount; chessCompare++) {
					// 如果有的话（读者可以思考，这里可否break出来）
					if ((a * 20 == chessBlack_x[chessCompare])
							&& ((b + step) * 20 == chessBlack_y[chessCompare])) {
						chessLink++;
						if (chessLink == 5) {
							return (true);
						}
					}
				}
				if (chessLink == (chessLinkTest + 1))// 下个位置是否找到棋子
					chessLinkTest++;
				else
					break;
			}
			// 横向左侧的连子数统计
			for (step = 1; step <= 4; step++) {
				// 左侧第step个位置是否有同色棋子
				for (chessCompare = 0; chessCompare <= chessBlackCount; chessCompare++) {
					// 如果找到同色棋子
					if ((a * 20 == chessBlack_x[chessCompare])
							&& ((b - step) * 20 == chessBlack_y[chessCompare])) {
						chessLink++;
						if (chessLink == 5) {
							return (true);
						}
					}
				}
				if (chessLink == (chessLinkTest + 1))
					chessLinkTest++;
				else
					break;
			}

			// /////////////////////////////
			// 以下两个大的循环统计左斜方向的连子个数
			// /////////////////////////////
			chessLink = 1;
			chessLinkTest = 1;
			// 正如统计横向和竖向连接棋子个数一样，左斜方向也分正、反两个方向统计
			// 然后累计这两个方向的连子个数，得到整个方向的连子个数
			for (step = 1; step <= 4; step++) {
				for (chessCompare = 0; chessCompare <= chessBlackCount; chessCompare++) {
					if (((a - step) * 20 == chessBlack_x[chessCompare])
							&& ((b + step) * 20 == chessBlack_y[chessCompare])) {
						chessLink++;
						if (chessLink == 5) {
							return (true);
						}
					}
				}
				if (chessLink == (chessLinkTest + 1))
					chessLinkTest++;
				else
					break;
			}
			for (step = 1; step <= 4; step++) {
				for (chessCompare = 0; chessCompare <= chessBlackCount; chessCompare++) {
					if (((a + step) * 20 == chessBlack_x[chessCompare])
							&& ((b - step) * 20 == chessBlack_y[chessCompare])) {
						chessLink++;
						if (chessLink == 5) {
							return (true);
						}
					}
				}
				if (chessLink == (chessLinkTest + 1))
					chessLinkTest++;
				else
					break;
			}
			// ////////////////////////////////
			// 以下两个大的循环统计右斜方向的连子个数
			// ///////////////////////////////
			chessLink = 1;
			chessLinkTest = 1;
			// 正如统计横向和竖向连接棋子个数一样，右斜方向也分正、反两个方向统计
			// 然后累计这两个方向的连子个数，得到整个方向的连子个数
			for (step = 1; step <= 4; step++) {
				for (chessCompare = 0; chessCompare <= chessBlackCount; chessCompare++) {
					if (((a + step) * 20 == chessBlack_x[chessCompare])
							&& ((b + step) * 20 == chessBlack_y[chessCompare])) {
						chessLink++;
						if (chessLink == 5) {
							return (true);
						}
					}
				}
				if (chessLink == (chessLinkTest + 1))
					chessLinkTest++;
				else
					break;
			}
			for (step = 1; step <= 4; step++) {
				for (chessCompare = 0; chessCompare <= chessBlackCount; chessCompare++) {
					if (((a - step) * 20 == chessBlack_x[chessCompare])
							&& ((b - step) * 20 == chessBlack_y[chessCompare])) {
						chessLink++;
						if (chessLink == 5) {
							return (true);
						}
					}
				}
				if (chessLink == (chessLinkTest + 1))
					chessLinkTest++;
				else
					break;
			}
		} else if (checkColor == -1) {
			// 如果是白色棋子，同黑色棋子一样，对横、竖、左斜、右斜
			// 几个方向统计，如果有任何一个方向连子个数超过5个，则为赢。
			// 只不过检查下个特定位置是否有特定颜色棋子时，要使用白棋对应坐标数组。
			// 其他同对黑棋的判断一摸一样：），注释可以参考对黑棋判断部分。
			// //////////////////////////////////
			// 竖向统计
			// //////////////////////////////////
			chessLink = 1;
			for (step = 1; step <= 4; step++) {
				for (chessCompare = 0; chessCompare <= chessWhiteCount; chessCompare++) {
					if (((a + step) * 20 == chessWhite_x[chessCompare])
							&& (b * 20 == chessWhite_y[chessCompare])) {
						chessLink++;
						if (chessLink == 5) {
							return (true);
						}
					}
				}
				if (chessLink == (chessLinkTest + 1))
					chessLinkTest++;
				else
					break;
			}
			for (step = 1; step <= 4; step++) {
				for (chessCompare = 0; chessCompare <= chessWhiteCount; chessCompare++) {
					if (((a - step) * 20 == chessWhite_x[chessCompare])
							&& (b * 20 == chessWhite_y[chessCompare])) {
						chessLink++;
						if (chessLink == 5) {
							return (true);
						}
					}
				}
				if (chessLink == (chessLinkTest + 1))
					chessLinkTest++;
				else
					break;
			}
			// //////////////////////////////////
			// 横向统计
			// //////////////////////////////////
			chessLink = 1;
			chessLinkTest = 1;
			for (step = 1; step <= 4; step++) {
				for (chessCompare = 0; chessCompare <= chessWhiteCount; chessCompare++) {
					if ((a * 20 == chessWhite_x[chessCompare])
							&& ((b + step) * 20 == chessWhite_y[chessCompare])) {
						chessLink++;
						if (chessLink == 5) {
							return (true);
						}
					}
				}
				if (chessLink == (chessLinkTest + 1))
					chessLinkTest++;
				else
					break;
			}
			for (step = 1; step <= 4; step++) {
				for (chessCompare = 0; chessCompare <= chessWhiteCount; chessCompare++) {
					if ((a * 20 == chessWhite_x[chessCompare])
							&& ((b - step) * 20 == chessWhite_y[chessCompare])) {
						chessLink++;
						if (chessLink == 5) {
							return (true);
						}
					}
				}
				if (chessLink == (chessLinkTest + 1))
					chessLinkTest++;
				else
					break;
			}
			// //////////////////////////////////
			// 左斜方向统计
			// //////////////////////////////////
			chessLink = 1;
			chessLinkTest = 1;
			for (step = 1; step <= 4; step++) {
				for (chessCompare = 0; chessCompare <= chessWhiteCount; chessCompare++) {
					if (((a - step) * 20 == chessWhite_x[chessCompare])
							&& ((b + step) * 20 == chessWhite_y[chessCompare])) {
						chessLink++;
						if (chessLink == 5) {
							return (true);
						}
					}
				}
				if (chessLink == (chessLinkTest + 1))
					chessLinkTest++;
				else
					break;
			}
			for (step = 1; step <= 4; step++) {
				for (chessCompare = 0; chessCompare <= chessWhiteCount; chessCompare++) {
					if (((a + step) * 20 == chessWhite_x[chessCompare])
							&& ((b - step) * 20 == chessWhite_y[chessCompare])) {
						chessLink++;
						if (chessLink == 5) {
							return (true);
						}
					}
				}
				if (chessLink == (chessLinkTest + 1))
					chessLinkTest++;
				else
					break;
			}
			// //////////////////////////////////
			// 右斜方向统计
			// //////////////////////////////////
			chessLink = 1;
			chessLinkTest = 1;
			for (step = 1; step <= 4; step++) {
				for (chessCompare = 0; chessCompare <= chessWhiteCount; chessCompare++) {
					if (((a + step) * 20 == chessWhite_x[chessCompare])
							&& ((b + step) * 20 == chessWhite_y[chessCompare])) {
						chessLink++;
						if (chessLink == 5) {
							return (true);
						}
					}
				}
				if (chessLink == (chessLinkTest + 1))
					chessLinkTest++;
				else
					break;
			}
			for (step = 1; step <= 4; step++) {
				for (chessCompare = 0; chessCompare <= chessWhiteCount; chessCompare++) {
					if (((a - step) * 20 == chessWhite_x[chessCompare])
							&& ((b - step) * 20 == chessWhite_y[chessCompare])) {
						chessLink++;
						if (chessLink == 5) {
							return (true);
						}
					}
				}
				if (chessLink == (chessLinkTest + 1))
					chessLinkTest++;
				else
					break;
			}
		}
		// 如果任何方向都没有连子超过5个，则尚不能分出胜负
		return (false);
	}

	/**
	 * 绘制棋盘，将棋盘绘制成19*19的格子并将棋盘上应有的五个基准点绘制上去。
	 */
	public void paint(Graphics g) {
		// 棋盘的方格线
		for (int i = 40; i <= 380; i = i + 20) {
			g.drawLine(40, i, 400, i);
		}
		g.drawLine(40, 400, 400, 400);
		for (int j = 40; j <= 380; j = j + 20) {
			g.drawLine(j, 40, j, 400);
		}
		g.drawLine(400, 40, 400, 400);
		// 五个基准点
		g.fillOval(97, 97, 6, 6);
		g.fillOval(337, 97, 6, 6);
		g.fillOval(97, 337, 6, 6);
		g.fillOval(337, 337, 6, 6);
		g.fillOval(217, 217, 6, 6);
	}

	/**
	 * 落子的时候在特定位置绘制特定颜色的棋子
	 */
	public void chessPaint(int chessPoint_a, int chessPoint_b, int color) {
		chessPoint_black chesspoint_black = new chessPoint_black(this);
		chessPoint_white chesspoint_white = new chessPoint_white(this);

		if (color == 1 && isMouseEnabled) {
			// 当黑子落子时，记下此子的位置
			getLocation(chessPoint_a, chessPoint_b, color);
			// 判断是否获胜
			isWin = checkWin(chessPoint_a, chessPoint_b, color);
			if (isWin == false) {
				// 如果没有获胜，向对方发送落子信息，并绘制棋子
				chessthread.sendMessage("/" + chessPeerName + " /chess "
						+ chessPoint_a + " " + chessPoint_b + " " + color);
				this.add(chesspoint_black);
				chesspoint_black.setBounds(chessPoint_a * 20 - 7,
						chessPoint_b * 20 - 7, 16, 16);
				// 在状态文本框显示行棋信息
				statusText.setText("黑(第" + chessBlackCount + "步)"
						+ chessPoint_a + " " + chessPoint_b + ",请白棋下子");
				isMouseEnabled = false;
			} else {
				// 如果获胜，直接调用chessVictory完成后续工作
				chessthread.sendMessage("/" + chessPeerName + " /chess "
						+ chessPoint_a + " " + chessPoint_b + " " + color);
				this.add(chesspoint_black);
				chesspoint_black.setBounds(chessPoint_a * 20 - 7,
						chessPoint_b * 20 - 7, 16, 16);
				chessVictory(1);
				isMouseEnabled = false;
			}
		}
		// 白棋落子，同黑棋类似处理
		else if (color == -1 && isMouseEnabled) {
			getLocation(chessPoint_a, chessPoint_b, color);
			isWin = checkWin(chessPoint_a, chessPoint_b, color);
			if (isWin == false) {
				chessthread.sendMessage("/" + chessPeerName + " /chess "
						+ chessPoint_a + " " + chessPoint_b + " " + color);
				this.add(chesspoint_white);
				chesspoint_white.setBounds(chessPoint_a * 20 - 7,
						chessPoint_b * 20 - 7, 16, 16);
				statusText.setText("白(第" + chessWhiteCount + "步)"
						+ chessPoint_a + " " + chessPoint_b + ",请黑棋下子");
				isMouseEnabled = false;
			} else {
				chessthread.sendMessage("/" + chessPeerName + " /chess "
						+ chessPoint_a + " " + chessPoint_b + " " + color);
				this.add(chesspoint_white);
				chesspoint_white.setBounds(chessPoint_a * 20 - 7,
						chessPoint_b * 20 - 7, 16, 16);
				chessVictory(-1);
				isMouseEnabled = false;
			}
		}
	}

	/**
	 * 落子时在对方客户端绘制棋子。 对方接受到发送来的落子信息，调用此函数绘制棋子，显示落子状态等等
	 */
	public void netChessPaint(int chessPoint_a, int chessPoint_b, int color) {
		// 黑色棋子和白色棋子对象。
		chessPoint_black chesspoint_black = new chessPoint_black(this);
		chessPoint_white chesspoint_white = new chessPoint_white(this);
		getLocation(chessPoint_a, chessPoint_b, color);
		if (color == 1) { // 黑棋是否胜出
			isWin = checkWin(chessPoint_a, chessPoint_b, color);
			if (isWin == false) { // 如果没有胜出
				// 将黑色棋子加到棋盘
				this.add(chesspoint_black);
				// 设置位置
				chesspoint_black.setBounds(chessPoint_a * 20 - 7,
						chessPoint_b * 20 - 7, 16, 16);
				// 更新状态信息
				statusText.setText("黑(第" + chessBlackCount + "步)"
						+ chessPoint_a + " " + chessPoint_b + ",请白棋下子");
				// 在这里激活鼠标
				isMouseEnabled = true;
			} else {// 如果已经胜出
				// 在点击位置添加黑色棋子
				this.add(chesspoint_black);
				chesspoint_black.setBounds(chessPoint_a * 20 - 7,
						chessPoint_b * 20 - 7, 16, 16);
				// 处理胜出状态---负责清空棋盘等工作
				chessVictory(1);
				isMouseEnabled = true;
			}
		} else if (color == -1) {// 白色棋子
			// 白色棋子是否胜出
			isWin = checkWin(chessPoint_a, chessPoint_b, color);
			if (isWin == false) {// 白色棋子没有胜出
				// 将白色棋子添加到Panel,并设定显示位置
				this.add(chesspoint_white);
				chesspoint_white.setBounds(chessPoint_a * 20 - 7,
						chessPoint_b * 20 - 7, 16, 16);
				// 更新状态信息,激活鼠标
				statusText.setText("白(第" + chessWhiteCount + "步)"
						+ chessPoint_a + " " + chessPoint_b + ",请黑棋下子");
				isMouseEnabled = true;
			} else {// 白棋胜出
				// 发送胜利信息
				chessthread.sendMessage("/" + chessPeerName + " /victory "
						+ color);
				// 添加白色棋子
				this.add(chesspoint_white);
				chesspoint_white.setBounds(chessPoint_a * 20 - 7,
						chessPoint_b * 20 - 7, 16, 16);
				chessVictory(-1);
				isMouseEnabled = true;
			}
		}
	}

	/**
	 * 当鼠标按下时响应的动作。记下当前鼠标点击的位置，即当前落子的位置。 如果点击在棋盘内,则在特定位置绘制棋子.
	 */
	public void mousePressed(MouseEvent e) {
		if (e.getModifiers() == InputEvent.BUTTON1_MASK) {
			chessPoint_x = (int) e.getX();
			chessPoint_y = (int) e.getY();
			// 归一化到棋盘方格位置
			int a = (chessPoint_x + 10) / 20, b = (chessPoint_y + 10) / 20;
			// 如果点击不在棋盘内,忽略...
			if (chessPoint_x / 20 < 2 || chessPoint_y / 20 < 2
					|| chessPoint_x / 20 > 19 || chessPoint_y / 20 > 19) {
			} else {
				// 绘制棋子在特定位置....
				chessPaint(a, b, chessColor);
			}
		}
	}

	// 不响应该事件
	public void mouseReleased(MouseEvent e) {
	}

	// 不响应该事件
	public void mouseEntered(MouseEvent e) {
	}

	// 不响应该事件
	public void mouseExited(MouseEvent e) {
	}

	// 不响应该事件
	public void mouseClicked(MouseEvent e) {
	}

}

/**
 * 表示黑子的类
 */

class chessPoint_black extends Canvas {
	ChessPad chesspad = null;

	chessPoint_black(ChessPad p) {
		setSize(20, 20);
		chesspad = p;
	}

	// 绘制一个黑色棋子。。。
	public void paint(Graphics g) {
		g.setColor(Color.black);
		g.fillOval(0, 0, 14, 14);
	}

}

/**
 * 表示白子的类
 */

class chessPoint_white extends Canvas {
	ChessPad chesspad = null;

	chessPoint_white(ChessPad p) {
		setSize(20, 20);
		chesspad = p;
	}

	// 绘制一个白色棋子。。。。。
	public void paint(Graphics g) {
		g.setColor(Color.white);
		g.fillOval(0, 0, 14, 14);
	}

}
