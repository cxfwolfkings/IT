/*
 * Created on 2006-4-25
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.charles.game.tetris.doubles;

import java.awt.Color;
import java.awt.Graphics;

import javax.swing.JPanel;
import javax.swing.border.EtchedBorder;

/**
 * @author Administrator
 * 
 * TODO To change the template for this generated type comment go to Window -
 * Preferences - Java - Code Style - Code Templates
 */
public class GameCanvas extends JPanel {
	// 默认的方块的颜色为桔黄色，背景颜色为黑色
	private Color backColor = Color.black, frontColor = Color.orange;

	private int rows, cols, score = 0, scoreForLevelUpdata = 0;

	private ErsBox[][] boxes;

	private int boxWidth, boxHeight;
	
	private int[][] canvasData;

	public final static int CANVAS_ROWS = 22;

	public final static int CANVAS_COLS = 13;

	// score：得分，scoreForLevelUpdata：上一次升级后的积分

	/**
	 * 画布类的第一个版本的构造函数
	 * 
	 * @param rows
	 *            int, 画布的行数
	 * @param cols
	 *            int, 画布的列数 行数和列数以方格为单位，决定着画布拥有方格的数目
	 */
	public GameCanvas() {
		this.rows = CANVAS_ROWS;
		this.cols = CANVAS_COLS;

		// 初始化rows*cols个ErsBox对象
		boxes = new ErsBox[rows][cols];
		canvasData = new int[rows][cols];
		for (int i = 0; i < boxes.length; i++) {
			for (int j = 0; j < boxes[i].length; j++) {
				boxes[i][j] = new ErsBox(false);
			}
		}

		// 设置画布的边界
		setBorder(new EtchedBorder(EtchedBorder.RAISED, Color.white, new Color(
				148, 145, 140)));
	}

	/**
	 * 画布类的第二个版本的构造函数
	 * 
	 * @param rows
	 *            与public GameCanvas(int rows, int cols)的rows相同
	 * @param cols
	 *            与public GameCanvas(int rows, int cols)的cols相同
	 * @param backColor
	 *            Color, 背景色
	 * @param frontColor
	 *            Color, 前景色
	 */
	public GameCanvas(int rows, int cols, Color backColor, Color frontColor) {
		this(); // 调用第一个版本的构造函数
		
		this.backColor = backColor;
		this.frontColor = frontColor;  // 通过参数设置背景和前景颜色
		
	}

	/**
	 * @param i
	 * @param j
	 */

	/**
	 * 设置游戏背景色彩
	 * 
	 * @param backColor
	 *            Color, 背景色彩
	 */
	public void setBackgroundColor(Color backColor) {
		this.backColor = backColor;
	}

	/**
	 * 取得游戏背景色彩
	 * 
	 * @return Color, 背景色彩
	 */
	public Color getBackgroundColor() {
		return backColor;
	}

	/**
	 * 设置游戏方块色彩
	 * 
	 * @param frontColor
	 *            Color, 方块色彩
	 */
	public void setBlockColor(Color frontColor) {
		this.frontColor = frontColor;
	}

	/**
	 * 取得游戏方块色彩
	 * 
	 * @return Color, 方块色彩
	 */
	public Color getBlockColor() {
		return frontColor;
	}

	/**
	 * 取得画布中方格的行数
	 * 
	 * @return int, 方格的行数
	 */
	public int getRows() {
		return rows;
	}

	/**
	 * 取得画布中方格的列数
	 * 
	 * @return int, 方格的列数
	 */
	public int getCols() {
		return cols;
	}

	/**
	 * 取得游戏成绩
	 * 
	 * @return int, 分数
	 */
	public int getScore() {
		return score;
	}

	/**
	 * 取得自上一次升级后的积分
	 * 
	 * @return int, 上一次升级后的积分
	 */
	public int getScoreForLevelUpdata() {
		return scoreForLevelUpdata;
	}

	/**
	 * 升级后，将上一次升级以来的积分清0
	 */
	public void resetScoreForLevelUpdata() {
		scoreForLevelUpdata -= ErsBlocksGame.PER_LEVEL_SCORE;
	}

	/**
	 * 得到某一行某一列的方格引用。
	 * 
	 * @param row
	 *            int, 要引用的方格所在的行
	 * @param col
	 *            int, 要引用的方格所在的列
	 * @return ErsBox, 在row行col列的方格的引用
	 */
	public ErsBox getBox(int row, int col) {
		if (row < 0 || row > boxes.length - 1 || col < 0
				|| col > boxes[0].length - 1)
			return null;
		return (boxes[row][col]);
	}

	public int[][] getCanvasData() {
		try {
			for (int i = 0; i < boxes.length; i++) {
				for (int j = 0; j < boxes[i].length; j++) {

					if (boxes[i][j].isColorBox()) {
						canvasData[i][j] = 1;
					} else {
						canvasData[i][j] = 0;
					}
				}
			}
		} catch (Exception e) {
			System.out.println(e.toString());
			
		}
		return canvasData;

	}

	public int currentRow() {

		int currentRow = 0;
		boolean sign = false;
		for (int i = GameCanvas.CANVAS_ROWS - 1; i >= 0; i--) {
			sign = true;
			for (int j = 0; j < GameCanvas.CANVAS_COLS; j++) {

				if (boxes[i][j].isColorBox()) {
					sign = false;
					break;
				}
			}
			if (sign) {
				currentRow = i + 1;
				break;
			}
		}
		return currentRow;
	}

	public ErsBox setAutoBox() {

		ErsBox box = null;
		if (Math.random() * 10 >= 5.0)
			box = new ErsBox(false);
		else
			box = new ErsBox(true);

		return box;
	}

	public boolean addNewRow(int num) {

		int currentRow = currentRow();
		if (currentRow <= num)
			return false;
		else {
			for (int i = currentRow; i < GameCanvas.CANVAS_ROWS; i++) {
				for (int j = 0; j < GameCanvas.CANVAS_COLS; j++) {
					boxes[i - num][j] = (ErsBox)boxes[i][j].clone();
				}
			}

			for (int i = GameCanvas.CANVAS_ROWS - 1; i > GameCanvas.CANVAS_ROWS - num -1; i--) {
				for (int j = 0; j < GameCanvas.CANVAS_COLS; j++) {
					boxes[i][j] = setAutoBox();
				}
			}
			repaint();
			return true;
		}

	}

	/**
	 * 覆盖JComponent类的函数，画组件。
	 * 
	 * @param g
	 *            图形设备环境 paint方法实际上把绘图的主要工作委派给paintComponent方法等方法
	 */
	public void paintComponent(Graphics g) {
		super.paintComponent(g);
		g.setColor(frontColor);

		for (int i = 0; i < boxes.length; i++) {
			for (int j = 0; j < boxes[i].length; j++) {

				// 用前景颜色或背景颜色绘制每个方块
				if (boxes[i][j].isColorBox()) {
					g.setColor(frontColor);
				} else {
					g.setColor(backColor);
				}
				g.fill3DRect(j * boxWidth, i * boxHeight, boxWidth, boxHeight,
						true);
			}
		}
	}

	/**
	 * 根据窗口的大小，自动调整方格的尺寸
	 */
	public void fanning() {
		boxWidth = getSize().width / cols;
		boxHeight = getSize().height / rows;
	}

	/**
	 * 当一行被游戏者叠满后，将此行清除，并为游戏者加分
	 * 
	 * @param row
	 *            int, 要清除的行，是由ErsBoxesGame类计算的
	 */
	public synchronized void removeLine(int row) {
		for (int i = row; i > 0; i--) {
			for (int j = 0; j < cols; j++)
				boxes[i][j] = (ErsBox) boxes[i - 1][j].clone();
		}

		score += ErsBlocksGame.PER_LINE_SCORE;
		scoreForLevelUpdata += ErsBlocksGame.PER_LINE_SCORE;
		repaint();
	}

	/**
	 * 重置画布，置积分为0
	 */
	public void reset() {
		score = 0;
		scoreForLevelUpdata = 0;
		for (int i = 0; i < boxes.length; i++) {
			for (int j = 0; j < boxes[i].length; j++)
				boxes[i][j].setColor(false);
		}
		repaint();
	}
}
