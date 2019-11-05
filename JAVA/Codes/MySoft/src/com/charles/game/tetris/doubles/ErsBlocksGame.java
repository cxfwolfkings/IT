/**
 * File: ErsBlocksGame.java
 * User: Administrator
 * Date: Dec 15, 2003
 * Describe: 俄罗斯方块的 Java 实现
 */
package com.charles.game.tetris.doubles;

import java.awt.BorderLayout;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.ServerSocket;
import java.net.Socket;

import javax.swing.JDialog;
import javax.swing.JLabel;
import javax.swing.JOptionPane;

/**
 * 游戏主类，继承JFrame类，负责游戏的全局控制。 内含 1, 一个GameCanvas画布类的实例引用， 2,
 * 一个保存当前活动块(ErsBlock)实例的引用， 3, 一个保存当前控制面板（ControlPanel）实例的引用;
 */
public class ErsBlocksGame extends GameMenu {
	/**
	 * 每填满一行计多少分
	 */
	public final static int PER_LINE_SCORE = 100;

	/**
	 * 积多少分以后能升级
	 */
	public final static int PER_LEVEL_SCORE = PER_LINE_SCORE * 20;

	/**
	 * 最大级数是10级
	 */
	public final static int MAX_LEVEL = 10;

	/**
	 * 默认级数是5
	 */
	public final static int DEFAULT_LEVEL = 5;

	public static int selfFail = 0;

	public static int otherFail = 0;
	

	// 一个GameCanvas画布类的实例引用，
	private GameCanvas canvas;

	// 一个保存当前活动块(ErsBlock)实例的引用，
	private ErsBlock block;

	// 一个保存当前控制面板（ControlPanel）实例的引用;
	private ControlPanel ctrlPanel;

	private boolean playing = false;

	/**
	 * 主游戏类的构造函数
	 * 
	 * @param title
	 *            String，窗口标题
	 */
	public ErsBlocksGame(String title) {
		super(title);

		// 初始窗口的大小，用户可调控
		setSize(315, 392);

		Dimension scrSize = Toolkit.getDefaultToolkit().getScreenSize();

		// 将游戏窗口置于屏幕中央
		setLocation((scrSize.width - getSize().width) / 2,
				(scrSize.height - getSize().height) / 2);

		Container container = getContentPane();

		// 布局的水平构件之间有6个象素的距离
		container.setLayout(new BorderLayout(6, 0));

		// 建立20个方块高，12个方块宽的游戏画布
		canvas = new GameCanvas();

		// 建立一个控制面板
		ctrlPanel = new ControlPanel(this);
		ctrlPanel.setPlayButtonEnable(false);

		// 游戏画布和控制面板之间左右摆放
		container.add(canvas, BorderLayout.CENTER);
		container.add(ctrlPanel, BorderLayout.EAST);

		// 增加窗口监听器
		addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent we) {
				System.exit(0);
			}
		});
		show(); // setVisiable

		// 根据窗口的大小，自动调整方格的尺寸
		canvas.fanning();
		setResizable(false);

	}

	/**
	 * 让游戏“复位”
	 */
	public void reset() {
		ctrlPanel.reset(); // 控制窗口复位
		canvas.reset(); // 游戏画板复位

	}

	public void gameReset() {

		ctrlPanel.setPlayButtonEnable(false);
		// ctrlPanel.setPauseButtonLabel(true);
		getMGame().setEnabled(true);
		getMControl().setEnabled(true);
		getMInfo().setEnabled(true);
		getMiNewGame().setEnabled(true);
		getMiConnectGame().setEnabled(true);
	}

	/**
	 * 判断游戏是否还在进行
	 * 
	 * @return boolean, true-还在运行，false-已经停止
	 */
	public boolean isPlaying() {
		return playing;
	}

	/**
	 * 得到当前活动的块
	 * 
	 * @return ErsBlock, 当前活动块的引用
	 */
	public ErsBlock getCurBlock() {
		return block;
	}

	/**
	 * 得到当前画布
	 * 
	 * @return GameCanvas, 当前画布的引用
	 */
	public GameCanvas getCanvas() {
		return canvas;
	}

	/**
	 * 开始游戏
	 */
	public void playGame() {
		play();
		ctrlPanel.setPlayButtonEnable(false);
		// miPlay.setEnabled(false);
		ctrlPanel.requestFocus();
	}

	/**
	 * 得到当前游戏者设置的游戏难度
	 * 
	 * @return int, 游戏难度1－MAX_LEVEL＝10
	 */
	public int getLevel() {
		return ctrlPanel.getLevel();
	}

	/**
	 * 让用户设置游戏难度系数
	 * 
	 * @param level
	 *            int, 游戏难度系数为1－MAX_LEVEL＝10
	 */
	public void setLevel(int level) {
		if (level < 11 && level > 0)
			ctrlPanel.setLevel(level);
	}

	/**
	 * 得到游戏积分
	 * 
	 * @return int, 积分。
	 */
	public int getScore() {
		if (canvas != null)
			return canvas.getScore();
		return 0;
	}

	/**
	 * 得到自上次升级以来的游戏积分，升级以后，此积分清零
	 * 
	 * @return int, 积分。
	 */
	public int getScoreForLevelUpdate() {
		if (canvas != null)
			return canvas.getScoreForLevelUpdata();
		return 0;
	}

	/**
	 * 当分数累计到一定的数量时，升一次级
	 * 
	 * @return boolean, ture-更新成功, false-更新失败
	 */
	public boolean levelUpdate() {
		int curLevel = getLevel();
		if (curLevel < MAX_LEVEL) {
			setLevel(curLevel + 1);
			canvas.resetScoreForLevelUpdata();
			return true;
		}
		return false;
	}

	/**
	 * 游戏开始
	 */
	private void play() {
		reset();
		playing = true;
		Thread thread = new Thread(new Game());
		thread.start();
	}

	private void reportGameWin() {
		JOptionPane.showMessageDialog(this, "你赢了");
	}

	private void reportGameLose() {
		JOptionPane.showMessageDialog(this, "你输了");
	}

	/**
	 * 一轮游戏过程，实现了Runnable接口 一轮游戏是一个大循环，在这个循环中，每隔100毫秒， 检查游戏中的当前块是否已经到底了，如果没有，
	 * 就继续等待。如果到底了，就看有没有全填满的行， 如果有就删除它，并为游戏者加分，同时随机产生一个 新的当前块，让它按所定级别的速度，自动下落。
	 * 当新产生一个块时，先检查画布最顶端的一行是否已经 被占了，如果是，可以显示“游戏结束”了。
	 */

	private JDialog serverSuc() {

		JDialog dialog = new JDialog(this, "提示信息", false);
		JLabel label = new JLabel("            端口有效，等待其他玩家中......");
		dialog.getContentPane().setLayout(new BorderLayout());
		dialog.setSize(300, 90);
		dialog.setResizable(false);
		dialog.getContentPane().add(label);
		Dimension scrSize = Toolkit.getDefaultToolkit().getScreenSize();
		dialog.setLocation((scrSize.width - getSize().width) / 2,
				(scrSize.height - getSize().height) / 2);
		return dialog;
	}

	private JDialog socketSuc() {

		JDialog dialog = new JDialog(this, "提示信息", false);
		JLabel label = new JLabel("与玩家连接建立成功，10s后开始游戏！");
		dialog.getContentPane().setLayout(new BorderLayout());
		dialog.setSize(300, 90);
		dialog.setResizable(false);
		dialog.getContentPane().add(label);
		Dimension scrSize = Toolkit.getDefaultToolkit().getScreenSize();
		dialog.setLocation((scrSize.width - getSize().width) / 2,
				(scrSize.height - getSize().height) / 2);
		return dialog;
	}

	private JDialog showException(Exception e) {

		JDialog dialog = new JDialog(this, "提示信息", false);
		JLabel label = new JLabel(e.toString());
		dialog.getContentPane().setLayout(new BorderLayout());
		dialog.setSize(300, 90);
		dialog.setResizable(false);
		dialog.getContentPane().add(label);
		Dimension scrSize = Toolkit.getDefaultToolkit().getScreenSize();
		dialog.setLocation((scrSize.width - getSize().width) / 2,
				(scrSize.height - getSize().height) / 2);
		return dialog;
	}

	private class Game implements Runnable {
		public void run() {

			int col = canvas.getCols() - 8;

			int style = ErsBlock.STYLES[(int) (Math.random() * 7)][(int) (Math
					.random() * 4)];

			ServerSocket server = getServer();
			JDialog serverSuc = serverSuc();
			JDialog socketSuc = socketSuc();
			Socket socketOut = null;
			Socket socketIn = null;
			ObjectInputStream in = null;
			ObjectOutputStream out = null;

			selfFail = 0;
			otherFail = 0;
			int numLose = 0;
			boolean serverSign = false;
			boolean clienSign = false;
			int[][] failData;

			if (getAddress() != null) {

				serverSign = false;
				clienSign = true;
				try {

					socketIn = new Socket(getAddress(), getPortNum());
					socketOut = new Socket(getAddress(), getPortNum());

					in = new ObjectInputStream(socketIn.getInputStream());
					out = new ObjectOutputStream(socketOut.getOutputStream());
				} catch (Exception e) {
					System.out.println(e.toString());

					// TODO: handle exception
				}

			} else {
				if (server != null) {
					serverSign = true;
					clienSign = false;
					try {
						serverSuc.setVisible(true);
						// Thread.sleep (1000*3);

						socketOut = server.accept();
						socketIn = server.accept();
						Thread.sleep(1000 * 2);

						serverSuc.setVisible(false);

						socketSuc.setVisible(true);
						Thread.sleep(1000 * 2);
						socketSuc.setVisible(false);
						out = new ObjectOutputStream(socketOut
								.getOutputStream());
						in = new ObjectInputStream(socketIn.getInputStream());

					} catch (Exception e) {
						showException(e).setVisible(true);
					}
				}
			}
			while (playing) {
				if (otherFail == 1) {

					try {
						
					} catch (Exception e) {
						System.out.println("对方玩家失败");
						System.out.println(e.toString());
					}
					reportGameWin();
					try {
						if (in != null)
							in.close();
						if (out != null)
							out.close();
						if (serverSign) {
							if (server != null) {
								server.close();
								getServer().close();
							}
						}
						if (socketIn != null)
							socketIn.close();
						if (socketOut != null)
							socketOut.close();
						setAddress(null);
						setServer(null);
					} catch (Exception e) {
					}
					gameReset();
					reset();
					return;
				}
				if (selfFail == 1) {
					failData = new int[GameCanvas.CANVAS_ROWS][GameCanvas.CANVAS_COLS];
					try {
						out.writeObject(new Data(failData, selfFail,0));

					} catch (Exception e) {
						System.out.println(e.toString());
					}
					reportGameLose();
				
					try {
						if (in != null)
							in.close();
						if (out != null)
							out.close();
						if (serverSign) {
							if (server != null) {
								server.close();
								getServer().close();
							}
						}
						if (socketIn != null)
							socketIn.close();
						if (socketOut != null)
							socketOut.close();
						setAddress(null);
						setServer(null);
					} catch (Exception e) {
						
					}
					gameReset();
					reset();
					return;
				}
				if (block != null) { // 第一次循环时，block为空
					if (block.isAlive()) {
						try {
							Thread.currentThread().sleep(100);
						} catch (InterruptedException ie) {
							ie.printStackTrace();
						}
						continue;
					}
				}

				numLose = checkFullLine(); // 检查是否有全填满的行

				if (isGameOver()) { // 检查游戏是否应该结束了
					
					selfFail = 1;
				}
				// 创建一个游戏块

				block = new ErsBlock(style, -1, col, getLevel(), canvas,
						ctrlPanel, in, out,numLose);

				// 作为线程开始运行
				block.start();

				// 随机生成下一个块的初始列的位置
				// 随机生成下一个块的初始形态（28种之一）
				style = ErsBlock.STYLES[(int) (Math.random() * 7)][(int) (Math
						.random() * 4)];

				// 在控制面板中提示下一个块的形状
				ctrlPanel.setTipStyle(style);
			}
		}

		/**
		 * 检查画布中是否有全填满的行，如果有就删除之
		 */
		public int checkFullLine() {
			int num = 0;
			for (int i = 0; i < canvas.getRows(); i++) {
				int row = -1;
				boolean fullLineColorBox = true;
				for (int j = 0; j < canvas.getCols(); j++) {
					// 检查第i行，第j列是否为彩色方块
					if (!canvas.getBox(i, j).isColorBox()) {
						// 非彩色方块，
						fullLineColorBox = false;
						break;
						// 退出内循环，检查下一行
					}
				}
				if (fullLineColorBox) {
					row = i--;
					canvas.removeLine(row);
					num++;
					// 该行已填满，移去
				}
			}
			return num;
		}

		/**
		 * 根据最顶行是否被占，判断游戏是否已经结束了。
		 * 
		 * @return boolean, true-游戏结束了，false-游戏未结束
		 */
		private boolean isGameOver() {
			for (int i = 0; i < canvas.getCols(); i++) {
				ErsBox box = canvas.getBox(0, i);
				if (box.isColorBox())
					return true;
			}
			return false;
		}
	}

	/**
	 * 程序入口函数
	 * 
	 * @param args
	 *            String[], 附带的命令行参数，该游戏 不需要带命令行参数
	 */
	public static void main(String[] args) {
		new ErsBlocksGame("俄罗斯方块游戏");
	}

	public void actionPerformed(ActionEvent e) {
		super.actionPerformed(e);
		if (e.getSource() == miNewGame || e.getSource() == miConnectGame) {
			ctrlPanel.setPlayButtonEnable(true);
		}
	}
}