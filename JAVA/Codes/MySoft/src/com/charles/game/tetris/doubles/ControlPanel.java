/**
 * File: ControlPanel.java
 * User: Administrator
 * Date: Dec 15, 2004
 * Describe: 俄罗斯方块游戏的控制部分的实现
 */
package com.charles.game.tetris.doubles;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;

import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.Timer;
import javax.swing.border.Border;
import javax.swing.border.EtchedBorder;

/**
 * 控制面板类，继承JPanel. 上边安放预显即将出现的方块类型的窗口、难度级别、得分、控制按钮 主要用来控制游戏进程。
 */
class ControlPanel extends JPanel {
	// 用一个文本域显示难度级别
	private JTextField tfLevel = new JTextField(""
			+ ErsBlocksGame.DEFAULT_LEVEL),
	// 用一个文本域显示玩家得分
			tfScore = new JTextField("0");

	// 声明一组控制按钮
	private JButton btPlay = new JButton("开始"), btPause = new JButton("");

	
	/**
	 * 构造几个面板,分别摆放不同类型的构件
	 */

	// 提示下一个游戏块的面板
	private JPanel plTip = new JPanel(new BorderLayout());

	private TipPanel plTipBlock = new TipPanel();

	// 显示对方玩家游戏的面板
	private JPanel useInfo = new JPanel(new BorderLayout());

	private ShowPanel infoBlock = new ShowPanel();

	// 显示游戏当前信息的面板，4行1列
	private JPanel plInfo = new JPanel(new GridLayout(4, 1));

	private Timer timer;

	// 当前的游戏局
	private ErsBlocksGame game;

	// 设置突出的EtchedBorder类型的边框
	private Border border = new EtchedBorder(EtchedBorder.RAISED, Color.white,
			new Color(148, 145, 140));

	/**
	 * 主控制面板类的构造函数
	 * 
	 * @param game
	 *            ErsBlocksGame, ErsBoxesGame类的一个实例引用， 方便直接控制ErsBoxesGame类的行为。
	 */
	public ControlPanel(final ErsBlocksGame game) {
		// 整个控制面板有3个子面板，摆放在1列，
		// 每行的间距为4
		setLayout(new GridLayout(3, 1, 0, 4));
		this.game = game;

		// 预提示面板的两个构件及边界
		plTip.add(new JLabel("  下一个方块"), BorderLayout.NORTH);
		plTip.add(plTipBlock);
		plTip.setBorder(border);

		// 提示对方玩家面板的两个构件及边界
		useInfo.add(new JLabel("   对方玩家  "), BorderLayout.NORTH);
		useInfo.add(infoBlock);
		// useInfo.setBorder(border);

		// 游戏信息显示面板的两个标签和两个文本域及边界
		plInfo.add(btPlay);
		plInfo.add(btPause);
		plInfo.add(new JLabel("     得分      "));
		plInfo.add(tfScore);
		plInfo.setBorder(border);

		// 两个文本域都是不可编辑的，只用于显示信息

		tfScore.setEditable(false);

		// 将3个合成面板加入到主面板中
		add(plTip);
		add(plInfo);
		add(useInfo);

		// 增加键盘的监听器
		addKeyListener(new ControlKeyListener());

		// 增加按钮的监听器
		btPlay.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {
				game.getMGame().setEnabled(false);
				game.getMControl().setEnabled(false);
				game.getMInfo().setEnabled(false);
				game.playGame();
			}
		});
		/**
		 * Timer类的对象可以以一定的时间间隔触发一个或多个事件 建立一个定时器要创建一个Timer对象，注册一个或多个动作监听器
		 * 并用start方法启动定时器 此处的时间间隔为500毫秒，显示玩家的得分，难度级别
		 */
		timer = new Timer(500, new ActionListener() {
			public void actionPerformed(ActionEvent ae) {
				// 显示玩家的得分
				tfScore.setText("" + game.getScore());
				// 按得分晋升难度级别
				int scoreForLevelUpdate = game.getScoreForLevelUpdate();
				// 显示更新后的难度级别
				if (scoreForLevelUpdate >= ErsBlocksGame.PER_LEVEL_SCORE
						&& scoreForLevelUpdate > 0)
					game.levelUpdate();
			}
		});
		timer.start();// 启动定时器
	}

	/**
	 * 设置预显窗口的样式，
	 * 
	 * @param style
	 *            int,对应ErsBlock类的STYLES中的28个值
	 */
	public void setTipStyle(int style) {
		plTipBlock.setStyle(style);
	}

	public void setUseInfo(int[][] date) {
		infoBlock.setInfo(date);
	}

	/**
	 * 取得用户设置的游戏等级。
	 * 
	 * @return int, 难度等级，1 － ErsBlocksGame.MAX_LEVEL
	 */
	public int getLevel() {
		int level = 0;
		try {
			level = Integer.parseInt(tfLevel.getText());
		} catch (NumberFormatException e) {
		}
		return level;
	}

	/**
	 * 让用户修改游戏难度等级。
	 * 
	 * @param level
	 *            修改后的游戏难度等级
	 */
	public void setLevel(int level) {
		if (level > 0 && level < 11)
			tfLevel.setText("" + level);
	}

	/**
	 * 设置"开始"按钮的状态。
	 */
	public void setPlayButtonEnable(boolean enable) {
		btPlay.setEnabled(enable);
	}

	/**
	 * 重置控制面板，得分置为0
	 */
	public void reset() {
		tfScore.setText("0");
		plTipBlock.setStyle(0);
		infoBlock.resetInfo(0);

	}

	/**
	 * 重新计算TipPanel里的boxes[][]里的方块的大小
	 */
	public void fanning() {
		plTipBlock.fanning();
	}

	/**
	 * 提示信息面板的实现细节类
	 */
	private class TipPanel extends JPanel {

		// 提示信息面板的前景和背景颜色
		private Color backColor = Color.darkGray, frontColor = Color.lightGray;

		// 创建设定的行数和列数的俄罗斯方块
		private ErsBox[][] boxes = new ErsBox[ErsBlock.BOXES_ROWS][ErsBlock.BOXES_COLS];

		// 块的形态、宽度和高度
		private int style, boxWidth, boxHeight;

		// isTiled是否平铺
		private boolean isTiled = false;

		/**
		 * 预提示窗口类构造函数
		 */
		public TipPanel() {
			for (int i = 0; i < boxes.length; i++) {
				for (int j = 0; j < boxes[i].length; j++)
					boxes[i][j] = new ErsBox(false);
			}
		}

		/**
		 * 预提示窗口类构造函数
		 * 
		 * @param backColor
		 *            Color, 窗口的背景色
		 * @param frontColor
		 *            Color, 窗口的前景色
		 */
		public TipPanel(Color backColor, Color frontColor) {
			this();
			this.backColor = backColor;
			this.frontColor = frontColor;
		}

		/**
		 * 设置预显窗口的方块样式
		 * 
		 * @param style
		 *            int,对应ErsBlock类的STYLES中的28个值
		 */
		public void setStyle(int style) {
			this.style = style;
			repaint();
		}

		/**
		 * 覆盖JComponent类的函数，画组件。
		 * 
		 * @param g
		 *            图形设备环境
		 */
		public void paintComponent(Graphics g) {
			super.paintComponent(g);

			if (!isTiled)
				fanning();

			int key = 0x8000;
			for (int i = 0; i < boxes.length; i++) {
				for (int j = 0; j < boxes[i].length; j++) {
					Color color = (((key & style) != 0) ? frontColor
							: backColor);
					g.setColor(color);
					g.fill3DRect(j * boxWidth, i * boxHeight, boxWidth,
							boxHeight, true);
					key >>= 1;
				}
			}
		}

		/**
		 * 根据窗口的大小，自动调整方格的大小
		 */
		public void fanning() {
			boxWidth = getSize().width / ErsBlock.BOXES_COLS;
			boxHeight = getSize().height / ErsBlock.BOXES_ROWS;
			isTiled = true;
		}
	}

	private class ShowPanel extends JPanel {

		// 提示信息面板的前景和背景颜色
		private Color backColor = Color.darkGray, frontColor = Color.lightGray;

		// private int rows ,clos;

		// 创建设定的行数和列数的俄罗斯方块
		private ErsBox[][] boxes = new ErsBox[GameCanvas.CANVAS_ROWS][GameCanvas.CANVAS_COLS];

		// 块的形态、宽度和高度
		private int boxWidth, boxHeight;

		// isTiled是否平铺
		private boolean isTiled = false;

		private int[][] date = new int[GameCanvas.CANVAS_ROWS][GameCanvas.CANVAS_COLS];

		/**
		 * 预提示窗口类构造函数
		 */
		public ShowPanel() {

			for (int i = 0; i < boxes.length; i++) {
				for (int j = 0; j < boxes[i].length; j++)
					boxes[i][j] = new ErsBox(false);
			}
		}

		/**
		 * 预提示窗口类构造函数
		 * 
		 * @param backColor
		 *            Color, 窗口的背景色
		 * @param frontColor
		 *            Color, 窗口的前景色
		 */
		public ShowPanel(Color backColor, Color frontColor) {
			this();
			this.backColor = backColor;
			this.frontColor = frontColor;
		}

		/**
		 * 设置预显窗口的方块样式
		 * 
		 * @param style
		 *            int,对应ErsBlock类的STYLES中的28个值
		 */
		/*
		 * public void setStyle(int style) { this.style = style; repaint(); }
		 */
		public void setInfo(int[][] date) {
			this.date = date;
			repaint();
		}

		public void resetInfo(int style) {
			for (int i = 0; i < boxes.length; i++) {
				for (int j = 0; j < boxes[i].length; j++) {
					date[i][j] = style;
				}
			}
			repaint();
		}

		/**
		 * 覆盖JComponent类的函数，画组件。
		 * 
		 * @param g
		 *            图形设备环境
		 */
		public void paintComponent(Graphics g) {
			super.paintComponent(g);

			if (!isTiled)
				fanning();

			for (int i = 0; i < boxes.length; i++) {
				for (int j = 0; j < boxes[i].length; j++) {
					Color color = ((date[i][j] == 1) ? frontColor : backColor);
					g.setColor(color);
					g.fill3DRect(j * boxWidth, i * boxHeight, boxWidth,
							boxHeight, true);
				}
			}
		}

		/**
		 * 根据窗口的大小，自动调整方格的大小
		 */
		public void fanning() {
			boxWidth = getSize().width / GameCanvas.CANVAS_COLS;
			boxHeight = getSize().height / GameCanvas.CANVAS_ROWS;
			isTiled = true;
		}

	}

	// 游戏的按钮控制键的监听器
	private class ControlKeyListener extends KeyAdapter {
		public void keyPressed(KeyEvent ke) {
			if (!game.isPlaying())
				return;

			ErsBlock block = game.getCurBlock();
			if (ke.getKeyCode() == game.getUp()) {
				block.turnNext();
				return;
			}
			if (ke.getKeyCode() == game.getDown()) {
				block.moveDown();
				return;
			}
			if (ke.getKeyCode() == game.getLeft()) {
				block.moveLeft();
				return;
			}
			if (ke.getKeyCode() == game.getRight()) {
				block.moveRight();
				return;
			}
		}
	}
}
