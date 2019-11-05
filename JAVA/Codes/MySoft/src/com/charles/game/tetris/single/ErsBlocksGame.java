package com.charles.game.tetris.single;
/**
 * File: ErsBlocksGame.java
 * User: Administrator
 * Date: Dec 15, 2003
 * Describe: 俄罗斯方块的 Java 实现
 */

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

/**
 * 游戏主类，继承JFrame类，负责游戏的全局控制。
 * 内含
 * 1, 一个GameCanvas画布类的实例引用，
 * 2, 一个保存当前活动块(ErsBlock)实例的引用，
 * 3, 一个保存当前控制面板（ControlPanel）实例的引用;
 */
public class ErsBlocksGame extends JFrame {

	private static final long serialVersionUID = -3915087305720920223L;
	/**
	 *  每填满一行计多少分
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


   //一个GameCanvas画布类的实例引用，
 
 
	private GameCanvas canvas;
   // 一个保存当前活动块(ErsBlock)实例的引用，
	private ErsBlock block;
	
    // 一个保存当前控制面板（ControlPanel）实例的引用;
	private ControlPanel ctrlPanel;
    
	private boolean playing = false;
	
	private JMenuBar bar = new JMenuBar();
	//菜单条包含4个菜单
	private JMenu
	        mGame = new JMenu("游戏"),
			mControl = new JMenu("控制"),
			mWindowStyle = new JMenu("窗口风格"),
			mInfo = new JMenu("帮助");

	//4个菜单中分别包含的菜单项
	private JMenuItem
	        miNewGame = new JMenuItem("新游戏"),
			miSetBlockColor = new JMenuItem("设置方块颜色"),
			miSetBackColor = new JMenuItem("设置背景颜色"),
			miTurnHarder = new JMenuItem("增加难度"),
			miTurnEasier = new JMenuItem("降低难度"),
			miExit = new JMenuItem("退出"),

			miPlay = new JMenuItem("开始"),
			miPause = new JMenuItem("暂停"),
			miResume = new JMenuItem("继续"),
			miStop = new JMenuItem("停止"),

			miAuthor = new JMenuItem("作者 : Java游戏设计组"),
			miSourceInfo = new JMenuItem("版本：1.0");

         //设置窗口风格的菜单

        	private JCheckBoxMenuItem
	        miAsWindows = new JCheckBoxMenuItem("Windows"),
			miAsMotif = new JCheckBoxMenuItem("Motif"),
			miAsMetal = new JCheckBoxMenuItem("Metal", true);

	/**
	 * 主游戏类的构造函数
	 * @param title String，窗口标题
	 */
	public ErsBlocksGame(String title) {
		super(title);

	//初始窗口的大小，用户可调控
		setSize(315, 392);
		Dimension scrSize = Toolkit.getDefaultToolkit().getScreenSize();
    
	 //将游戏窗口置于屏幕中央
		setLocation((scrSize.width - getSize().width) / 2,
		        (scrSize.height - getSize().height) / 2);
      
	//创建菜单
		createMenu();

		Container container = getContentPane();
	
	// 布局的水平构件之间有6个象素的距离
		container.setLayout(new BorderLayout(6, 0));
    
	 // 建立20个方块高，12个方块宽的游戏画布
		canvas = new GameCanvas(20, 12);
	 
	 //建立一个控制面板
		ctrlPanel = new ControlPanel(this);

	 //游戏画布和控制面板之间左右摆放
		container.add(canvas, BorderLayout.CENTER);
		container.add(ctrlPanel, BorderLayout.EAST);
    
	//增加窗口监听器
		addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent we) {
				stopGame();
				System.exit(0);
			}
		});

    //增加构件的适配器，一旦构件改变大小，就调用
	//fanning()方法，自动调整方格的尺寸
		addComponentListener(new ComponentAdapter() {
			public void componentResized(ComponentEvent ce) {
				canvas.fanning();
			}
		});

		show();    //setVisiable
		
		// 根据窗口的大小，自动调整方格的尺寸
		canvas.fanning();
		
	}

	/**
	 * 让游戏“复位”
	 */
	public void reset() {
		ctrlPanel.reset();     //控制窗口复位
		canvas.reset();        //游戏画板复位

	}

	/**
	 * 判断游戏是否还在进行
	 * @return boolean, true-还在运行，false-已经停止
	 */
	public boolean isPlaying() {
		return playing;
	}

	/**
	 * 得到当前活动的块
	 * @return ErsBlock, 当前活动块的引用
	 */
	public ErsBlock getCurBlock() {
		return block;
	}

	/**
	 * 得到当前画布
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
		miPlay.setEnabled(false);
		ctrlPanel.requestFocus();
	}

	/**
	 * 游戏暂停
	 */
	public void pauseGame() {
		if (block != null) block.pauseMove();

		ctrlPanel.setPauseButtonLabel(false);
		miPause.setEnabled(false);
		miResume.setEnabled(true);
	}

	/**
	 * 让暂停中的游戏继续
	 */
	public void resumeGame() {
		if (block != null) block.resumeMove();
		ctrlPanel.setPauseButtonLabel(true);
		miPause.setEnabled(true);
		miResume.setEnabled(false);
		ctrlPanel.requestFocus();
	}

	/**
	 * 用户停止游戏
	 */
	public void stopGame() {
		playing = false;
		if (block != null) block.stopMove();
		miPlay.setEnabled(true);
		miPause.setEnabled(true);
		miResume.setEnabled(false);
		ctrlPanel.setPlayButtonEnable(true);
		ctrlPanel.setPauseButtonLabel(true);
	}

	/**
	 * 得到当前游戏者设置的游戏难度
	 * @return int, 游戏难度1－MAX_LEVEL＝10
	 */
	public int getLevel() {
		return ctrlPanel.getLevel();
	}

	/**
	 * 让用户设置游戏难度系数
	 * @param level int, 游戏难度系数为1－MAX_LEVEL＝10
	 */
	public void setLevel(int level) {
		if (level < 11 && level > 0) ctrlPanel.setLevel(level);
	}

	/**
	 * 得到游戏积分
	 * @return int, 积分。
	 */
	public int getScore() {
		if (canvas != null) return canvas.getScore();
		return 0;
	}

	/**
	 * 得到自上次升级以来的游戏积分，升级以后，此积分清零
	 * @return int, 积分。
	 */
	public int getScoreForLevelUpdate() {
		if (canvas != null) return canvas.getScoreForLevelUpdate();
		return 0;
	}

	/**
	 * 当分数累计到一定的数量时，升一次级
	 * @return boolean, ture-更新成功, false-更新失败
	 */
	public boolean levelUpdate() {
		int curLevel = getLevel();
		if (curLevel < MAX_LEVEL) {
			setLevel(curLevel + 1);
			canvas.resetScoreForLevelUpdate();
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

	/**
	 * 报告游戏结束了
	 */
	private void reportGameOver() {
		JOptionPane.showMessageDialog(this, "游戏结束!");
	}

	/**
	 * 建立并设置窗口菜单
	 */
	private void createMenu() {
		bar.add(mGame);
		bar.add(mControl);
		bar.add(mWindowStyle);
		bar.add(mInfo);

		mGame.add(miNewGame);
		mGame.addSeparator();
		mGame.add(miSetBlockColor);
		mGame.add(miSetBackColor);
		mGame.addSeparator();
		mGame.add(miTurnHarder);
		mGame.add(miTurnEasier);
		mGame.addSeparator();
		mGame.add(miExit);

		mControl.add(miPlay);
		mControl.add(miPause);
		mControl.add(miResume);
		mControl.add(miStop);

		mWindowStyle.add(miAsWindows);
		mWindowStyle.add(miAsMotif);
		mWindowStyle.add(miAsMetal);

		mInfo.add(miAuthor);
		mInfo.add(miSourceInfo);

		setJMenuBar(bar);

		miPause.setAccelerator(
		        KeyStroke.getKeyStroke(KeyEvent.VK_P, KeyEvent.CTRL_MASK));
		miResume.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_ENTER, 0));

		miNewGame.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {
				stopGame();
				reset();
				setLevel(DEFAULT_LEVEL);
			}
		});
        //JColorChooser类提供一个标准的Gui构件，让用户选择色彩
		//使用JColorChooser的方法选择方块的颜色
		miSetBlockColor.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {
				Color newFrontColor =
				        JColorChooser.showDialog(ErsBlocksGame.this,
				                "设置方块颜色", canvas.getBlockColor());
				if (newFrontColor != null)
					canvas.setBlockColor(newFrontColor);
			}
		}); 
	
	    //使用JColorChooser的方法选择游戏面板的背景颜色
		miSetBackColor.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {
				Color newBackColor =
				        JColorChooser.showDialog(ErsBlocksGame.this,
				                "设置背景颜色", canvas.getBackgroundColor());
				if (newBackColor != null)
					canvas.setBackgroundColor(newBackColor);
			}
		});

		//使游戏的难度级别增加的菜单项
		miTurnHarder.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {
				int curLevel = getLevel();
				if (curLevel < MAX_LEVEL) setLevel(curLevel + 1);
			}
		});
		//使游戏的难度级别降低的菜单项
		miTurnEasier.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {
				int curLevel = getLevel();
				if (curLevel > 1) setLevel(curLevel - 1);
			}
		});
        //退出游戏的菜单项
		miExit.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {
				System.exit(0);
			}
		});
        //开始游戏的菜单项
		miPlay.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {
				playGame();
			}
		});
		
		//暂停游戏的菜单项
		miPause.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {
				pauseGame();
			}
		});
		
		//恢复游戏的菜单项
		miResume.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {
				resumeGame();
			}
		});
		//停止游戏的菜单项
		miStop.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {
				stopGame();
			}
		});
        
		//设置整个游戏的窗口风格的三个菜单项
		miAsWindows.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {
				String plaf = "com.sun.java.swing.plaf.windows.WindowsLookAndFeel";
				setWindowStyle(plaf);
				canvas.fanning();
				ctrlPanel.fanning();
				miAsWindows.setState(true);
				miAsMetal.setState(false);
				miAsMotif.setState(false);
			}
		});
		miAsMotif.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {
				String plaf = "com.sun.java.swing.plaf.motif.MotifLookAndFeel";
				setWindowStyle(plaf);
				canvas.fanning();
				ctrlPanel.fanning();
				miAsWindows.setState(false);
				miAsMetal.setState(false);
				miAsMotif.setState(true);
			}
		});
		miAsMetal.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {
				String plaf = "javax.swing.plaf.metal.MetalLookAndFeel";
				setWindowStyle(plaf);
				canvas.fanning();
				ctrlPanel.fanning();
				miAsWindows.setState(false);
				miAsMetal.setState(true);
				miAsMotif.setState(false);
			}
		});
	}

	/**
	 * 根据字串设置窗口外观
	 * @param plaf String, 窗口外观的描述
	 */
	private void setWindowStyle(String plaf) {
		try {
          //设定用户界面的外观
			UIManager.setLookAndFeel(plaf);
   
		 //将用户界面改成当前设定的外观
			SwingUtilities.updateComponentTreeUI(this);
		} catch (Exception e) {
		}
	}

	/**
	 * 一轮游戏过程，实现了Runnable接口
	 * 一轮游戏是一个大循环，在这个循环中，每隔100毫秒，
	 * 检查游戏中的当前块是否已经到底了，如果没有，
	 * 就继续等待。如果到底了，就看有没有全填满的行，
	 * 如果有就删除它，并为游戏者加分，同时随机产生一个
	 * 新的当前块，让它按所定级别的速度，自动下落。
	 * 当新产生一个块时，先检查画布最顶端的一行是否已经
	 * 被占了，如果是，可以显示“游戏结束”了。
	 */
	private class Game implements Runnable {
		public void run() {
			//随机生成块的初始列的位置
			//随机生成块的初始形态（28种之一）
			int col = (int) (Math.random() * (canvas.getCols() - 3)),
			    style = ErsBlock.STYLES[(int) (Math.random() * 7)][(int) (Math.random() * 4)];

			while (playing) {
				if (block != null) {    //第一次循环时，block为空
					if (block.isAlive()) {
						try {
							Thread.currentThread().sleep(100);
						} catch (InterruptedException ie) {
							ie.printStackTrace();
						}
						continue;
					}
				}

				checkFullLine();        //检查是否有全填满的行

				if (isGameOver()) {     //检查游戏是否应该结束了
					miPlay.setEnabled(true);
					miPause.setEnabled(true);
					miResume.setEnabled(false);
					ctrlPanel.setPlayButtonEnable(true);
					ctrlPanel.setPauseButtonLabel(true);

					reportGameOver();
					return;
				}
                //创建一个游戏块
				block = new ErsBlock(style, -1, col, getLevel(), canvas);

				//作为线程开始运行
				block.start();
	
			//随机生成下一个块的初始列的位置
			//随机生成下一个块的初始形态（28种之一）
				col = (int) (Math.random() * (canvas.getCols() - 3));
				style = ErsBlock.STYLES[(int) (Math.random() * 7)][(int) (Math.random() * 4)];

			//在控制面板中提示下一个块的形状
				ctrlPanel.setTipStyle(style);
			}
		}

		/**
		 * 检查画布中是否有全填满的行，如果有就删除之
		 */
		public void checkFullLine() {
			for (int i = 0; i < canvas.getRows(); i++) {
				int row = -1;
				boolean fullLineColorBox = true;
				for (int j = 0; j < canvas.getCols(); j++) {
                           //检查第i行，第j列是否为彩色方块
					if (!canvas.getBox(i, j).isColorBox()) {
						   //非彩色方块，
						fullLineColorBox = false;
						break;
						//退出内循环，检查下一行
					}
				}
				if (fullLineColorBox) {
					row = i--;
					canvas.removeLine(row);
					//该行已填满，移去
				}
			}
		}

		/**
		 * 根据最顶行是否被占，判断游戏是否已经结束了。
		 * @return boolean, true-游戏结束了，false-游戏未结束
		 */
		private boolean isGameOver() {
			for (int i = 0; i < canvas.getCols(); i++) {
				ErsBox box = canvas.getBox(0, i);
				if (box.isColorBox()) return true;
			}
			return false;
		}
	}

	/**
	 * 程序入口函数
	 * @param args String[], 附带的命令行参数，该游戏
	 * 不需要带命令行参数
	 */
	public static void main(String[] args) {
		new ErsBlocksGame("俄罗斯方块游戏");
	}
}


///**
// * File: ErsBox.java
// * User: Administrator
// * Date: Dec 15, 2003
// * Describe: 俄罗斯方格的 Java 实现
// */
//
///**
// * 方格类，是组成俄罗斯方块的基本元素，用自己的颜色来表示块的外观
// * 一个类实现Cloneable接口，就意味着可以合法地使用Object.clone()方法
// * 域到域地拷贝类对象，否则这种拷贝将会导致异常
// */
//class ErsBox implements Cloneable {
//	private boolean isColor;
//	private Dimension size = new Dimension();
//
//	/**
//	 * 方格类的构造函数
//	 * @param isColor 是不是用前景色来为此方格着色，
//	 *      true前景色，false用背景色
//	 */
//	public ErsBox(boolean isColor) {
//		this.isColor = isColor;
//	}
//
//	/**
//	 * 此方格是不是用前景色表现
//	 * @return boolean,true用前景色表现，false用背景色表现
//	 */
//	public boolean isColorBox() {
//		return isColor;
//	}
//
//	/**
//	 * 设置方格的颜色，
//	 * @param isColor boolean,true用前景色表现，false用背景色表现
//	 */
//	public void setColor(boolean isColor) {
//		this.isColor = isColor;
//	}
//
//	/**
//	 * 得到此方格的尺寸
//	 * @return Dimension,方格的尺寸
//	 */
//	public Dimension getSize() {
//		return size;
//	}
//
//	/**
//	 * 设置方格的尺寸
//	 * @param size Dimension,方格的尺寸
//	 */
//	public void setSize(Dimension size) {
//		this.size = size;
//	}
//
//	/**
//	 * 覆盖Object的Object clone()，实现克隆
//	 * @return Object,克隆的结果
//	 */
//	public Object clone() {
//		Object cloned = null;
//		try {
//			cloned = super.clone();
//		} catch (Exception ex) {
//			ex.printStackTrace();
//		}
//
//		return cloned;
//	}
//}

///**
// * File: ErsBlock.java
// * User: Administrator
// * Date: Dec 15, 2004
// * Describe: 俄罗斯方块的 Java 实现
// */
//
///**
// * 块类，继承自线程类（Thread）
// * 由 4 * 4 个方格（ErsBox）构成一个块，
// * 控制块的移动、下落、变形等
// */
//class ErsBlock extends Thread {
//	/**
//	 * 一个块占的行数是4行
//	 */
//	public final static int BOXES_ROWS = 4;
//	/**
//	 * 一个块占的列数是4列
//	 */
//	public final static int BOXES_COLS = 4;
//	/**
//	 * 让升级变化平滑的因子，避免最后几级之间的速度相差近一倍
//	 */
//	public final static int LEVEL_FLATNESS_GENE = 3;
//	/**
//	 * 相近的两级之间，块每下落一行的时间差别为多少(毫秒)
//	 */
//	public final static int BETWEEN_LEVELS_DEGRESS_TIME = 50;
//	/**
//	 * 方块的样式数目为7
//	 */
//	private final static int BLOCK_KIND_NUMBER = 7;
//	/**
//	 * 每一个样式的方块的反转状态种类为4
//	 */
//	private final static int BLOCK_STATUS_NUMBER = 4;
//	/**
//	 * 分别对应对7种模型的反转得到的28种状态
//	 */
//	public final static int[][] STYLES = {// 共28种状态
//		{0x0f00, 0x4444, 0x0f00, 0x4444}, // 长条型的四种状态
//		{0x04e0, 0x0464, 0x00e4, 0x04c4}, // 'T'型的四种状态
//		{0x4620, 0x6c00, 0x4620, 0x6c00}, // 反'Z'型的四种状态
//		{0x2640, 0xc600, 0x2640, 0xc600}, // 'Z'型的四种状态
//		{0x6220, 0x1700, 0x2230, 0x0740}, // '7'型的四种状态
//		{0x6440, 0x0e20, 0x44c0, 0x8e00}, // 反'7'型的四种状态
//		{0x0660, 0x0660, 0x0660, 0x0660}, // 方块的四种状态
//	};
//
//	private GameCanvas canvas;
//	private ErsBox[][] boxes = new ErsBox[BOXES_ROWS][BOXES_COLS];
//	private int style, y, x, level;
//	private boolean pausing = false, moving = true;
//
//	/**
//	 * 构造函数，产生一个特定的块
//	 * @param style 块的样式，对应STYLES的28个值中的一个
//	 * @param y 起始位置，左上角在canvas中的行坐标
//	 * @param x 起始位置，左上角在canvas中的列坐标
//	 * @param level 游戏等级，控制块的下落速度
//	 * @param canvas 画板
//	 */
//	public ErsBlock(int style, int y, int x, int level, GameCanvas canvas) {
//		this.style = style;
//		this.y = y;
//		this.x = x;
//		this.level = level;
//		this.canvas = canvas;
//
//		int key = 0x8000;
//		for (int i = 0; i < boxes.length; i++) {
//			for (int j = 0; j < boxes[i].length; j++) {
//				boolean isColor = ((style & key) != 0);
//				boxes[i][j] = new ErsBox(isColor);
//				key >>= 1;
//			}
//		}
//
//		display();
//	}
//
//	/**
//	 * 线程类的run()函数覆盖，下落块，直到块不能再下落
//	 */
//	public void run() {
//		while (moving) {
//			try {
//				sleep(BETWEEN_LEVELS_DEGRESS_TIME
//				        * (ErsBlocksGame.MAX_LEVEL - level + LEVEL_FLATNESS_GENE));
//			} catch (InterruptedException ie) {
//				ie.printStackTrace();
//			}
//			//后边的moving是表示在等待的100毫秒间，moving没被改变
//			if (!pausing) moving = (moveTo(y + 1, x) && moving);
//		}
//	}
//
//	/**
//	 * 块向左移动一格
//	 */
//	public void moveLeft() {
//		moveTo(y, x - 1);
//	}
//
//	/**
//	 * 块向右移动一格
//	 */
//	public void moveRight() {
//		moveTo(y, x + 1);
//	}
//
//	/**
//	 * 块向下落一格
//	 */
//	public void moveDown() {
//		moveTo(y + 1, x);
//	}
//
//	/**
//	 * 块变型
//	 */
//	public void turnNext() {
//		for (int i = 0; i < BLOCK_KIND_NUMBER; i++) {
//			for (int j = 0; j < BLOCK_STATUS_NUMBER; j++) {
//				if (STYLES[i][j] == style) {
//					int newStyle = STYLES[i][(j + 1) % BLOCK_STATUS_NUMBER];
//					turnTo(newStyle);
//					return;
//				}
//			}
//		}
//	}
//
//	/**
//	 * 暂停块的下落，对应游戏暂停
//	 */
//	public void pauseMove() {
//		pausing = true;
//	}
//
//	/**
//	 * 继续块的下落，对应游戏继续
//	 */
//	public void resumeMove() {
//		pausing = false;
//	}
//
//	/**
//	 * 停止块的下落，对应游戏停止
//	 */
//	public void stopMove() {
//		moving = false;
//	}
//
//	/**
//	 * 将当前块从画布的对应位置抹去，要等到下次重画画布时才能反映出来
//	 */
//	private void earse() {
//		for (int i = 0; i < boxes.length; i++) {
//			for (int j = 0; j < boxes[i].length; j++) {
//				if (boxes[i][j].isColorBox()) {
//					ErsBox box = canvas.getBox(i + y, j + x);
//					if (box == null) continue;
//					box.setColor(false);
//				}
//			}
//		}
//	}
//
//	/**
//	 * 让当前块在画布的对应位置上显示出来，要等到下次重画画布时才能看见
//	 */
//	private void display() {
//		for (int i = 0; i < boxes.length; i++) {
//			for (int j = 0; j < boxes[i].length; j++) {
//				if (boxes[i][j].isColorBox()) {
//					ErsBox box = canvas.getBox(y + i, x + j);
//					if (box == null) continue;
//					box.setColor(true);
//				}
//			}
//		}
//	}
//
//	/**
//	 * 当前块能否移动到newRow/newCol所指定的位置
//	 * @param newRow int, 目的地所在行
//	 * @param newCol int, 目的地所在列
//	 * @return boolean, true-能移动，false-不能
//	 */
//	private boolean isMoveAble(int newRow, int newCol) {
//		earse();
//		for (int i = 0; i < boxes.length; i++) {
//			for (int j = 0; j < boxes[i].length; j++) {
//				if (boxes[i][j].isColorBox()) {
//					ErsBox box = canvas.getBox(newRow + i, newCol + j);
//	                //如果当前位置不能是方块或已有填充的方块，则不能移动
//					if (box == null || (box.isColorBox())) {
//						display();
//						return false;
//					}
//				}
//			}
//		}
//		display();
//		return true;
//	}
//
//	/**
//	 * 将当前画移动到newRow/newCol所指定的位置
//	 * @param newRow int, 目的地所在行
//	 * @param newCol int, 目的地所在列
//	 * @return boolean, true-移动成功，false-移动失败
//	 */
//	private synchronized boolean moveTo(int newRow, int newCol) {
//		//如果在新的行不能移动或停止移动则返回假
//		if (!isMoveAble(newRow, newCol) || !moving) return false;
//        //抹掉旧的的痕迹
//		earse();
//		//在新的位置重画
//		y = newRow;
//		x = newCol;
//
//		display();
//		canvas.repaint();
//
//		return true;
//	}
//
//	/**
//	 * 当前块能否变成newStyle所指定的块样式，主要是要考虑
//	 * 边界以及被其它块挡住、不能移动的情况
//	 * @param newStyle int,希望改变的块样式，对应STYLES的28个值中的一个
//	 * @return boolean,true-能改变，false-不能改变
//	 */
//	private boolean isTurnAble(int newStyle) {
//		int key = 0x8000;
//		earse();
//		for (int i = 0; i < boxes.length; i++) {
//			for (int j = 0; j < boxes[i].length; j++) {
//				//检查4×4的格子内，新模式的格子是否为填充块
//				if ((newStyle & key) != 0) {
//					//检查当前格子是否为在面板内并且不是填充块
//					//是则不能转动
//					ErsBox box = canvas.getBox(y + i, x + j);
//					if (box == null || box.isColorBox()) {
//						display();
//						return false;
//					}
//				}
//				key >>= 1;
//			}
//		}
//		display();
//		return true;
//	}
//
//	/**
//	 * 将当前块变成newStyle所指定的块样式
//	 * @param newStyle int,将要改变成的块样式，对应STYLES的28个值中的一个
//	 * @return boolean,true-改变成功，false-改变失败
//	 */
//	private boolean turnTo(int newStyle) {
//		if (!isTurnAble(newStyle) || !moving) return false;
//
//		earse();
//		int key = 0x8000;
//		for (int i = 0; i < boxes.length; i++) {
//			for (int j = 0; j < boxes[i].length; j++) {
//				boolean isColor = ((newStyle & key) != 0);
//				boxes[i][j].setColor(isColor);
//				key >>= 1;
//			}
//		}
//		style = newStyle;
//
//		display();
//		canvas.repaint();
//
//		return true;
//	}
//}

//////////////////////////////
///**
// * File: ControlPanel.java
// * User: Administrator
// * Date: Dec 15, 2004
// * Describe: 俄罗斯方块游戏的控制部分的实现
// */
//
//import javax.swing.*;
//import javax.swing.border.Border;
//import javax.swing.border.EtchedBorder;
//import java.awt.*;
//import java.awt.event.*;

///**
// * 控制面板类，继承JPanel.
// * 上边安放预显即将出现的方块类型的窗口、难度级别、得分、控制按钮
// * 主要用来控制游戏进程。
// */
//class ControlPanel extends JPanel {
//	//用一个文本域显示难度级别
//	private JTextField
//	        tfLevel = new JTextField("" + ErsBlocksGame.DEFAULT_LEVEL),
//    //用一个文本域显示玩家得分
//	tfScore = new JTextField("0");
//
//    //声明一组控制按钮
//	private JButton
//	        btPlay = new JButton("开始"),
//	        btPause = new JButton("暂停"),
//	        btStop = new JButton("停止"),
//	        btTurnLevelUp = new JButton("增加难度"),
//	        btTurnLevelDown = new JButton("降低难度");
//
//	/**构造几个面板,分别摆放不同类型的构件
//	*/
//
//	//提示下一个游戏块的面板
//	private JPanel plTip = new JPanel(new BorderLayout());
//	private TipPanel plTipBlock = new TipPanel();
//	
//	//显示游戏当前信息的面板，4行1列
//	private JPanel plInfo = new JPanel(new GridLayout(4, 1));
//    
//	//存放控制按钮的面板，5行1列
//	private JPanel plButton = new JPanel(new GridLayout(5, 1));
//   
//	private Timer timer;
//
//	//当前的游戏局
//	private ErsBlocksGame game;
//    
//	//设置突出的EtchedBorder类型的边框
//	private Border border = new EtchedBorder(
//	        EtchedBorder.RAISED, Color.white, new Color(148, 145, 140));
//
//	/**
//	 * 主控制面板类的构造函数
//	 * @param game ErsBlocksGame, ErsBoxesGame类的一个实例引用，
//	 * 方便直接控制ErsBoxesGame类的行为。
//	 */
//	public ControlPanel(final ErsBlocksGame game) {
//		//整个控制面板有3个子面板，摆放在1列，
//		//每行的间距为4
//		setLayout(new GridLayout(3, 1, 0, 4));
//		this.game = game;
//
//		//预提示面板的两个构件及边界
//		plTip.add(new JLabel("下一个方块"), BorderLayout.NORTH);
//		plTip.add(plTipBlock);
//		plTip.setBorder(border);
//
//        //游戏信息显示面板的两个标签和两个文本域及边界
//		plInfo.add(new JLabel("难度级别"));
//		plInfo.add(tfLevel);
//		plInfo.add(new JLabel("得分"));
//		plInfo.add(tfScore);
//		plInfo.setBorder(border);
//
//		//两个文本域都是不可编辑的，只用于显示信息
//		tfLevel.setEditable(false);
//		tfScore.setEditable(false);
//        
//		//按钮面板的五个按钮及边界
//		plButton.add(btPlay);
//		plButton.add(btPause);
//		plButton.add(btStop);
//		plButton.add(btTurnLevelUp);
//		plButton.add(btTurnLevelDown);
//		plButton.setBorder(border);
//
//		//将3个合成面板加入到主面板中
//		add(plTip);
//		add(plInfo);
//		add(plButton);
//
//		//增加键盘的监听器		
//		addKeyListener(new ControlKeyListener());
//        
//		//增加按钮的监听器
//		btPlay.addActionListener(new ActionListener() {
//			public void actionPerformed(ActionEvent ae) {
//				game.playGame();
//			}
//		});
//		btPause.addActionListener(new ActionListener() {
//			public void actionPerformed(ActionEvent ae) {
//				if (btPause.getText().equals(new String("暂停"))) {
//					game.pauseGame();
//				} else {
//					game.resumeGame();
//				}
//			}
//		});
//		btStop.addActionListener(new ActionListener() {
//			public void actionPerformed(ActionEvent ae) {
//				game.stopGame();
//			}
//		});
//		btTurnLevelUp.addActionListener(new ActionListener() {
//			public void actionPerformed(ActionEvent ae) {
//				try {
//					int level = Integer.parseInt(tfLevel.getText());
//					if (level < ErsBlocksGame.MAX_LEVEL)
//						tfLevel.setText("" + (level + 1));
//				} catch (NumberFormatException e) {
//				}
//				requestFocus();
//			}
//		});
//		btTurnLevelDown.addActionListener(new ActionListener() {
//			public void actionPerformed(ActionEvent ae) {
//				try {
//					int level = Integer.parseInt(tfLevel.getText());
//					if (level > 1)
//						tfLevel.setText("" + (level - 1));
//				} catch (NumberFormatException e) {
//				}
//				requestFocus();
//			}
//		});
//
//		addComponentListener(new ComponentAdapter() {
//			public void componentResized(ComponentEvent ce) {
//				plTipBlock.fanning();
//			}
//		});
//    /**
//	 *Timer类的对象可以以一定的时间间隔触发一个或多个事件
//	 *建立一个定时器要创建一个Timer对象，注册一个或多个动作监听器
//	 *并用start方法启动定时器
//	 *此处的时间间隔为500毫秒，显示玩家的得分，难度级别
//	 */
//		timer = new Timer(500, new ActionListener() {
//			public void actionPerformed(ActionEvent ae) {
//				//显示玩家的得分
//				tfScore.setText("" + game.getScore());
//				//按得分晋升难度级别
//				int scoreForLevelUpdate =
//				        game.getScoreForLevelUpdate();
//	            //显示更新后的难度级别
//				if (scoreForLevelUpdate >= ErsBlocksGame.PER_LEVEL_SCORE
//				        && scoreForLevelUpdate > 0)
//					game.levelUpdate();
//			}
//		});
//		timer.start();//启动定时器
//	}
//
//	/**
//	 * 设置预显窗口的样式，
//	 * @param style int,对应ErsBlock类的STYLES中的28个值
//	 */
//	public void setTipStyle(int style) {
//		plTipBlock.setStyle(style);
//	}
//
//	/**
//	 * 取得用户设置的游戏等级。
//	 * @return int, 难度等级，1　－　ErsBlocksGame.MAX_LEVEL
//	 */
//	public int getLevel() {
//		int level = 0;
//		try {
//			level = Integer.parseInt(tfLevel.getText());
//		} catch (NumberFormatException e) {
//		}
//		return level;
//	}
//
//	/**
//	 * 让用户修改游戏难度等级。
//	 * @param level 修改后的游戏难度等级
//	 */
//	public void setLevel(int level) {
//		if (level > 0 && level < 11) tfLevel.setText("" + level);
//	}
//
//	/**
//	 * 设置"开始"按钮的状态。
//	 */
//	public void setPlayButtonEnable(boolean enable) {
//		btPlay.setEnabled(enable);
//	}
//
//    //根据pause的值设置按钮的显示标签
//	public void setPauseButtonLabel(boolean pause) {
//		btPause.setText(pause ? "暂停" : "继续");
//	}
//
//	/**
//	 * 重置控制面板，得分置为0
//	 */
//	public void reset() {
//		tfScore.setText("0");
//		plTipBlock.setStyle(0);
//	}
//
//	/**
//	 * 重新计算TipPanel里的boxes[][]里的方块的大小
//	 */
//	public void fanning() {
//		plTipBlock.fanning();
//	}
//
//	/**
//	 * 提示信息面板的实现细节类
//	 */
//	private class TipPanel extends JPanel {
//
//		//提示信息面板的前景和背景颜色
//		private Color backColor = Color.darkGray, frontColor = Color.lightGray;
//        
//		//创建设定的行数和列数的俄罗斯方块
//		private ErsBox[][] boxes =
//		        new ErsBox[ErsBlock.BOXES_ROWS][ErsBlock.BOXES_COLS];
//        
//        //块的形态、宽度和高度
//		private int style, boxWidth, boxHeight;
//		
//		//isTiled是否平铺
//		private boolean isTiled = false;
//
//		/**
//		 * 预提示窗口类构造函数
//		 */
//		public TipPanel() {
//			for (int i = 0; i < boxes.length; i++) {
//				for (int j = 0; j < boxes[i].length; j++)
//					boxes[i][j] = new ErsBox(false);
//			}
//		}
//
//		/**
//		 * 预提示窗口类构造函数
//		 * @param backColor Color, 窗口的背景色
//		 * @param frontColor Color, 窗口的前景色
//		 */
//		public TipPanel(Color backColor, Color frontColor) {
//			this();
//			this.backColor = backColor;
//			this.frontColor = frontColor;
//		}
//
//		/**
//		 * 设置预显窗口的方块样式
//		 * @param style int,对应ErsBlock类的STYLES中的28个值
//		 */
//		public void setStyle(int style) {
//			this.style = style;
//			repaint();
//		}
//
//		/**
//		 * 覆盖JComponent类的函数，画组件。
//		 * @param g 图形设备环境
//		 */
//		public void paintComponent(Graphics g) {
//			super.paintComponent(g);
//
//			if (!isTiled) fanning();
//
//			int key = 0x8000;
//			for (int i = 0; i < boxes.length; i++) {
//				for (int j = 0; j < boxes[i].length; j++) {
//					Color color = (((key & style) != 0) ? frontColor : backColor);
//					g.setColor(color);
//					g.fill3DRect(j * boxWidth, i * boxHeight,
//					        boxWidth, boxHeight, true);
//					key >>= 1;
//				}
//			}
//		}
//
//		/**
//		 * 根据窗口的大小，自动调整方格的大小
//		 */
//		public void fanning() {
//			boxWidth = getSize().width / ErsBlock.BOXES_COLS;
//			boxHeight = getSize().height / ErsBlock.BOXES_ROWS;
//			isTiled = true;
//		}
//	}
//
//	//游戏的按钮控制键的监听器
//	private class ControlKeyListener extends KeyAdapter {
//		public void keyPressed(KeyEvent ke) {
//			if (!game.isPlaying()) return;
//
//			ErsBlock block = game.getCurBlock();
//			switch (ke.getKeyCode()) {
//				case KeyEvent.VK_DOWN:
//					block.moveDown();
//					break;
//				case KeyEvent.VK_LEFT:
//					block.moveLeft();
//					break;
//				case KeyEvent.VK_RIGHT:
//					block.moveRight();
//					break;
//				case KeyEvent.VK_UP:
//					block.turnNext();
//					break;
//				default:
//					break;
//			}
//		}
//	}
//}


///////////////////////////////
///**
// * File: GameCanvas.java
// * User: Administrator
// * Date: Dec 15, 2003
// * Describe: 俄罗斯方块的每一个方块的绘制
// */
//
//import javax.swing.*;
//import javax.swing.border.EtchedBorder;
//             //EtchedBorder为swing包中的突出或凹进的边框
//import java.awt.*;
//
///**
// * 画布类，内有<行数> * <列数>个方格类的实例。
// * 继承JPanel类。
// * ErsBlock线程类动态改变画布类的方格颜色，画布类通过
// * 检查方格颜色来体现ErsBlock块的移动情况。
// */
//class GameCanvas extends JPanel {
//    //默认的方块的颜色为桔黄色，背景颜色为黑色
//	private Color backColor = Color.black, frontColor = Color.orange;
//	private int rows, cols, score = 0, scoreForLevelUpdate = 0;
//	private ErsBox[][] boxes;
//	private int boxWidth, boxHeight;
//
//	//score：得分，scoreForLevelUpdate：上一次升级后的积分
//
//	/**
//	 * 画布类的第一个版本的构造函数
//	 * @param rows int, 画布的行数
//	 * @param cols int, 画布的列数
//	 * 行数和列数以方格为单位，决定着画布拥有方格的数目
//	 */
//	public GameCanvas(int rows, int cols) {
//		this.rows = rows;
//		this.cols = cols;
//        
//		//初始化rows*cols个ErsBox对象
//		boxes = new ErsBox[rows][cols];
//		for (int i = 0; i < boxes.length; i++) {
//			for (int j = 0; j < boxes[i].length; j++) {
//				boxes[i][j] = new ErsBox(false);
//			}
//		}
//    
//        //设置画布的边界
//		setBorder(new EtchedBorder(
//		        EtchedBorder.RAISED, Color.white, new Color(148, 145, 140)));
//	}
//
//	/**
//	 * 画布类的第二个版本的构造函数
//	 * @param rows 与public GameCanvas(int rows, int cols)的rows相同
//	 * @param cols 与public GameCanvas(int rows, int cols)的cols相同
//	 * @param backColor Color, 背景色
//	 * @param frontColor Color, 前景色
//	 */
//	public GameCanvas(int rows, int cols,
//	                  Color backColor, Color frontColor) {
//		this(rows, cols);
//                           //调用第一个版本的构造函数
//		this.backColor = backColor;
//		this.frontColor = frontColor;
//		                  //通过参数设置背景和前景颜色
//	}
//
//	/**
//	 * 设置游戏背景色彩
// 	 * @param backColor Color, 背景色彩
//	 */
//	public void setBackgroundColor(Color backColor) {
//		this.backColor = backColor;
//	}
//
//	/**
//	 * 取得游戏背景色彩
// 	 * @return Color, 背景色彩
//	 */
//	public Color getBackgroundColor() {
//		return backColor;
//	}
//
//	/**
//	 * 设置游戏方块色彩
// 	 * @param frontColor Color, 方块色彩
//	 */
//	public void setBlockColor(Color frontColor) {
//		this.frontColor = frontColor;
//	}
//
//	/**
//	 * 取得游戏方块色彩
// 	 * @return Color, 方块色彩
//	 */
//	public Color getBlockColor() {
//		return frontColor;
//	}
//
//	/**
//	 * 取得画布中方格的行数
//	 * @return int, 方格的行数
//	 */
//	public int getRows() {
//		return rows;
//	}
//
//	/**
//	 * 取得画布中方格的列数
//	 * @return int, 方格的列数
//	 */
//	public int getCols() {
//		return cols;
//	}
//
//	/**
//	 * 取得游戏成绩
//	 * @return int, 分数
//	 */
//	public int getScore() {
//		return score;
//	}
//
//	/**
//	 * 取得自上一次升级后的积分
//	 * @return int, 上一次升级后的积分
//	 */
//	public int getScoreForLevelUpdate() {
//		return scoreForLevelUpdate;
//	}
//
//	/**
//	 * 升级后，将上一次升级以来的积分清0
//	 */
//	public void resetScoreForLevelUpdate() {
//		scoreForLevelUpdate -= ErsBlocksGame.PER_LEVEL_SCORE;
//	}
//
//	/**
//	 * 得到某一行某一列的方格引用。
//	 * @param row int, 要引用的方格所在的行
//	 * @param col int, 要引用的方格所在的列
//	 * @return ErsBox, 在row行col列的方格的引用
//	 */
//	public ErsBox getBox(int row, int col) {
//		if (row < 0 || row > boxes.length - 1
//		        || col < 0 || col > boxes[0].length - 1)
//			return null;
//		return (boxes[row][col]);
//	}
//
//	/**
//	 * 覆盖JComponent类的函数，画组件。
//	 * @param g 图形设备环境
//	 * paint方法实际上把绘图的主要工作委派给paintComponent方法等方法
//	 */
//	public void paintComponent(Graphics g) {
//		super.paintComponent(g);
//
//		g.setColor(frontColor);
//		for (int i = 0; i < boxes.length; i++) {
//			for (int j = 0; j < boxes[i].length; j++) {
//                //用前景颜色或背景颜色绘制每个方块
//				g.setColor(boxes[i][j].isColorBox() ? frontColor : backColor);
//				g.fill3DRect(j * boxWidth, i * boxHeight,
//				        boxWidth, boxHeight, true);
//			}
//		}
//	}
//
//	/**
//	 * 根据窗口的大小，自动调整方格的尺寸
//	 */
//	public void fanning() {
//		boxWidth = getSize().width / cols;
//		boxHeight = getSize().height / rows;
//	}
//
//	/**
//	 * 当一行被游戏者叠满后，将此行清除，并为游戏者加分
//	 * @param row int, 要清除的行，是由ErsBoxesGame类计算的
//	 */
//	public synchronized void removeLine(int row) {
//		for (int i = row; i > 0; i--) {
//			for (int j = 0; j < cols; j++)
//				boxes[i][j] = (ErsBox) boxes[i - 1][j].clone();
//		}
//
//		score += ErsBlocksGame.PER_LINE_SCORE;
//		scoreForLevelUpdate += ErsBlocksGame.PER_LINE_SCORE;
//		repaint();
//	}
//
//	/**
//	 * 重置画布，置积分为0
//	 */
//	public void reset() {
//		score = 0;
//		scoreForLevelUpdate = 0;
//		for (int i = 0; i < boxes.length; i++) {
//			for (int j = 0; j < boxes[i].length; j++)
//				boxes[i][j].setColor(false);
//		}
//
//		repaint();
//	}
//}


