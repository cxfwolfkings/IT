/**
 * File: ErsBlocksGame.java
 * User: 吴永坚
 * Date: 2006.11.8
 * Describe: 俄罗斯方块的 Java 实现
 */

package com.charles.game.tetris.sec;
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

/**
 * 游戏主类，继承自JFrame类，负责游戏的全局控制。
 * 内含
 * 1, 一个GameCanvas画布类的实例引用，
 * 2, 一个保存当前活动块(ErsBlock)实例的引用，
 * 3, 一个保存当前控制面板（ControlPanel）实例的引用;
 */
public class ErsBlocksGame extends JFrame {
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
	/**
	 * 默认慢速休息时间是200ms
	 */
	public final static int SLOW_SLEEP_TIME = 200;
	/**
	 * 默认中速休息时间是100ms
	 */
	public final static int MIDDLE_SLEEP_TIME = 100;
	/**
	 * 默认快速休息时间是0ms
	 */
	public final static int FAST_SLEEP_TIME = 0;
	
	public int delLine1 = 0;
	public int delLine2 = 0;
	public int delLine3 = 0;
	public int delLine4 = 0;
	public boolean autoPlay = false;
	private int showSleepTime;
	private Thread thread;
	private MyRand myRand = new MyRand(0.2, 0.2, 0.15, 0.15, 0.15, 0.075, 0.075);
	private GameCanvas canvas;
	private ErsBlock block;
	private boolean playing = false;
	private ControlPanel ctrlPanel;

	private JMenuBar bar = new JMenuBar();
	private JMenu
	        mGame = new JMenu("游戏"),
			mControl = new JMenu("控制"),
			mWindowStyle = new JMenu("风格"),
			mInfo = new JMenu("作者"),
			mSpeed = new JMenu("演示速度设置");
	private JMenuItem
	        miNewGame = new JMenuItem("新游戏"),
			miSetBlockColor = new JMenuItem("设置方块颜色"),
			miSetBackColor = new JMenuItem("设置背景颜色"),
			miTurnHarder = new JMenuItem("增加难度"),
			miTurnEasier = new JMenuItem("降低难度"),
			miExit = new JMenuItem("退出"),

			miHplay = new JMenuItem("人工游戏"),
			miCplay = new JMenuItem("电脑游戏"),
			miPause = new JMenuItem("暂停游戏"),
			miResume = new JMenuItem("恢复游戏"),
			miStop = new JMenuItem("结束游戏"),
			
			miSetFast = new JMenuItem("快速"),
			miSetMiddle = new JMenuItem("中速"),
			miSetSlow = new JMenuItem("慢速"),
			
			miAuthor = new JMenuItem("关于智能俄罗斯");

	private JCheckBoxMenuItem
	        miAsWindows = new JCheckBoxMenuItem("Windows"),
			miAsMotif = new JCheckBoxMenuItem("Motif"),
			miAsMetal = new JCheckBoxMenuItem("Metal", true);
	private ErsSelectOpt selectOpt;
	
	/**
	 * 主游戏类的构造函数
	 * @param title String，窗口标题
	 */
	public ErsBlocksGame(String title) {
		super(title);
		
		delLine1 = 0;
		delLine2 = 0;
		delLine3 = 0;
		delLine4 = 0;
		autoPlay = false;
		
		setSize(315, 400);
		Dimension scrSize = Toolkit.getDefaultToolkit().getScreenSize();
		setLocation((scrSize.width - getSize().width) / 2,
		        (scrSize.height - getSize().height) / 2);

		createMenu();

		Container container = getContentPane();
		container.setLayout(new BorderLayout());

		//canvas = new GameCanvas(20, 12);
		canvas = new GameCanvas(20, 10);
		ctrlPanel = new ControlPanel(this);

		container.add(canvas, BorderLayout.CENTER);
		container.add(ctrlPanel, BorderLayout.EAST);

		addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent we) {
				stopGame();
				System.exit(0);
			}
		});

		addComponentListener(new ComponentAdapter() {
			public void componentResized(ComponentEvent ce) {
				canvas.fanning();
			}
		});

		show();
		canvas.fanning();
	}

	/**
	 * 让游戏“复位”
	 */
	public void reset() {
		delLine1 = 0;
		delLine2 = 0;
		delLine3 = 0;
		delLine4 = 0;
		showSleepTime = 200;
		ctrlPanel.reset();
		canvas.reset();
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
	 * 电脑开始游戏
	 */
	public void computerPlayGame() {
		autoPlay = true;
		computerPlay();
		ctrlPanel.setComputerPlayButtonEnabled(false);
		ctrlPanel.setHumanPlayButtonEnabled(false);
		miCplay.setEnabled(false);
		miHplay.setEnabled(false);
		ctrlPanel.requestFocus();
	}
	
	/**
	 * 电脑开始游戏
	 */
	public void humanPlayGame() {
		autoPlay = false;
		humanPlay();
		ctrlPanel.setComputerPlayButtonEnabled(false);
		ctrlPanel.setHumanPlayButtonEnabled(false);
		miCplay.setEnabled(false);
		miHplay.setEnabled(false);
		ctrlPanel.requestFocus();
	}

	/**
	 * 游戏暂停
	 */
	public void pauseGame() {
		if (block != null && autoPlay == false){ 
			block.pauseMove();
		}
		else if(block != null && autoPlay == true){
			thread.suspend();
		}
		ctrlPanel.setPauseButtonEnabled(false);
		ctrlPanel.setResumeButtonEnabled(true);
		miPause.setEnabled(false);
		miResume.setEnabled(true);
	}

	/**
	 * 让暂停中的游戏继续
	 */
	public void resumeGame() {
		if (block != null && autoPlay == false){
			block.resumeMove();
		}
		else if(block != null && autoPlay == true){
			thread.resume();
		}
		ctrlPanel.setPauseButtonEnabled(true);
		ctrlPanel.setResumeButtonEnabled(false);
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
		miCplay.setEnabled(true);
		miHplay.setEnabled(true);
		miPause.setEnabled(true);
		miResume.setEnabled(false);
		ctrlPanel.setComputerPlayButtonEnabled(true);
		ctrlPanel.setHumanPlayButtonEnabled(true);
		ctrlPanel.setPauseButtonEnabled(true);
		ctrlPanel.setResumeButtonEnabled(false);
	}

	/**
	 * 得到当前游戏者设置的游戏难度
	 * @return int, 游戏难度1－MAX_LEVEL
	 */
	public int getLevel() {
		return ctrlPanel.getLevel();
	}

	/**
	 * 让用户设置游戏难度
	 * @param level int, 游戏难度1－MAX_LEVEL
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
	 * 得到消去1行的总数
	 * @return int, 消去1行的总数。
	 */
	public int getDelLine1() {
		return delLine1;
	}
	
	/**
	 * 得到消去2行的总数
	 * @return int, 消去2行的总数。
	 */
	public int getDelLine2() {
		return delLine2;
	}
	
	/**
	 * 得到消去3行的总数
	 * @return int, 消去3行的总数。
	 */
	public int getDelLine3() {
		return delLine3;
	}
	
	/**
	 * 得到消去4行的总数
	 * @return int, 消去4行的总数。
	 */
	public int getDelLine4() {
		return delLine4;
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
	 * @return boolean, ture-update successufl, false-update fail
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
	 * 电脑智能玩游戏开始
	 */
	private void computerPlay() {
		reset();
		playing = true;
		thread = new Thread(new Game());
		thread.start();
	}
	
	/**
	 * 人工玩游戏开始
	 */
	private void humanPlay() {
		reset();
		playing = true;
		thread = new Thread(new Game());
		thread.start();
	}
	
	/**
	 * 报告游戏结束了
	 */
	private void reportGameOver() {
		String msg = "游戏结束\n一共消去行数为: ";
		msg += String.valueOf(delLine1+delLine2*2+delLine3*3+delLine4*4);
		msg += "\n";
		JOptionPane.showMessageDialog(this, msg);
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

		mControl.add(miCplay);
		mControl.add(miHplay);
		mControl.add(miPause);
		mControl.add(miResume);
		mControl.add(miStop);
		mControl.add(mSpeed);
		mSpeed.add(miSetFast);
		mSpeed.add(miSetMiddle);
		mSpeed.add(miSetSlow);
		
		mWindowStyle.add(miAsWindows);
		mWindowStyle.add(miAsMotif);
		mWindowStyle.add(miAsMetal);

		mInfo.add(miAuthor);
		
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
		miSetBlockColor.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {
				Color newFrontColor =
				        JColorChooser.showDialog(ErsBlocksGame.this,
				                "设置方块颜色", canvas.getBlockColor());
				if (newFrontColor != null)
					canvas.setBlockColor(newFrontColor);
			}
		});
		miSetBackColor.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {
				Color newBackColor =
				        JColorChooser.showDialog(ErsBlocksGame.this,
				                "设置背景颜色", canvas.getBackgroundColor());
				if (newBackColor != null)
					canvas.setBackgroundColor(newBackColor);
			}
		});
		miTurnHarder.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {
				int curLevel = getLevel();
				if (curLevel < MAX_LEVEL) setLevel(curLevel + 1);
			}
		});
		miTurnEasier.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {
				int curLevel = getLevel();
				if (curLevel > 1) setLevel(curLevel - 1);
			}
		});
		miSetFast.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent ae) {
				showSleepTime = FAST_SLEEP_TIME;
			}
		});
		miSetMiddle.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent ae) {
				showSleepTime = MIDDLE_SLEEP_TIME;
			}
		});
		miSetSlow.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent ae) {
				showSleepTime = SLOW_SLEEP_TIME;
			}
		});
		miExit.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {
				System.exit(0);
			}
		});
		miCplay.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {
				computerPlayGame();
			}
		});
		miHplay.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {
				humanPlayGame();
			}
		});
		miPause.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {
				pauseGame();
			}
		});
		miResume.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {
				resumeGame();
			}
		});
		miStop.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {
				stopGame();
			}
		});
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
		miAuthor.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent ae){
				AboutBox about = new AboutBox();
			}
		});
	}

	/**
	 * 根据字串设置窗口外观
	 * @param plaf String, 窗口外观的描述
	 */
	private void setWindowStyle(String plaf) {
		try {
			UIManager.setLookAndFeel(plaf);
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
	 * 新的当前块，让它自动下落。
	 * 当新产生一个块时，先检查画布最顶上的一行是否已经
	 * 被占了，如果是，可以判断Game Over了。
	 */
	private class Game implements Runnable {
		public void run() {
			
			int col = (int) (Math.random() * (canvas.getCols() - 3));
			int curType = myRand.getRandom();//(int)(Math.random()*7);
			int nextType;
			int style = ErsBlock.STYLES[curType][(int)(Math.random()*4)]; 
			selectOpt = new ErsSelectOpt();
			
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
					miHplay.setEnabled(true);
					miCplay.setEnabled(true);
					miPause.setEnabled(true);
					miResume.setEnabled(false);
					ctrlPanel.setComputerPlayButtonEnabled(true);
					ctrlPanel.setHumanPlayButtonEnabled(true);
					ctrlPanel.setPauseButtonEnabled(true);
					ctrlPanel.setResumeButtonEnabled(false);
					reportGameOver();
					return;
				}
				
				nextType = myRand.getRandom();//(int)(Math.random()*7);
				block = new ErsBlock(style, -1, col, getLevel(), curType, nextType, selectOpt, canvas);
				block.setAutoPlay(autoPlay);
				if(autoPlay == true){
					block.setShowSleepTime(showSleepTime);
				}
				
				col = (int) (Math.random() * (canvas.getCols() - 3));
				style = ErsBlock.STYLES[nextType][(int)(Math.random()*4)];
				ctrlPanel.setTipStyle(style);
				block.start();
				curType = nextType;
			}
		}

		/**
		 * 检查画布中是否有全填满的行，如果有就删除之
		 */
		public void checkFullLine() {
			int delLines = 0;
			for (int i = 0; i < canvas.getRows(); i++) {
				int row = -1;
				boolean fullLineColorBox = true;
				for (int j = 0; j < canvas.getCols(); j++) {
					if (!canvas.getBox(i, j).isColorBox()) {
						fullLineColorBox = false;
						break;
					}
				}
				if (fullLineColorBox) {
					delLines++;
					row = i--;
					canvas.removeLine(row);
				}
			}
			switch(delLines){
				case 0:
					break;
				case 1:
					delLine1++;
					break;
				case 2:
					delLine2++;
					break;
				case 3:
					delLine3++;
					break;
				case 4:
					delLine4++;
					break;
				default:
					break;
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
	 * @param args String[], 附带的命令行参数
	 */
	public static void main(String[] args) {
		new ErsBlocksGame("智能俄罗斯方块");
	}
}
