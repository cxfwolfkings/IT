/**
 * File: ErsSelectOpt.java
 * User: 吴永坚
 * Date: 2006.11.8
 * Describe: 俄罗斯方块的 Java 实现
 */

package com.charles.game.tetris.sec;
/**
 * 选择最优走法类。
 * 主要根据正在下落的俄罗斯方块和下一个俄罗斯方块
 * 确定当前俄罗斯方块的旋转状态和下来位置。
 */
public class ErsSelectOpt {
	
	private int curType;
	private int nextType;
	private int rotType;
	private int leftPos;
	private int putY = 0;
	private int HEIGHT = 20;
	private int WIDTH = 10;
	private int BLOCKTYPE = 7;
	private int ROTTYPE = 4;
	private int[] gHeight = new int[WIDTH];
	public int[][] gState = new int[HEIGHT][WIDTH];
	private int[][] gOriState = new int[HEIGHT][WIDTH];
	private int[][] gTmpState = new int[HEIGHT][WIDTH];
	
	public final static int[] blockTypeNum = 
    {1, 2, 4, 4, 4, 2, 2};
	
	public final static int[][] blockHeight = 
	{
		{2},
		{1, 4},
		{2, 3, 2, 3},
		{2, 3, 2, 3},
		{2, 3, 2, 3},
		{2, 4},
		{2, 4}
	};
	
	public final static int[][] dy =
	{
		{0},
		{0, 0},
		{0, 0, -1, -1},
		{-1, 0, 0, 0},
		{0, -2, 0, 0},
		{-1, 0},
		{0, -1}
	};
	
	public final static int[][] blockWidth = 
	{
		{2},
		{4, 1},
		{3, 2, 3, 2},
		{3, 2, 3, 2},
		{3, 2, 3, 2},
		{4, 2},
		{4, 2}
	};
	
	public final static int[][][][] blockType= 
	{
		{
			{
				{0, 0, 0, 0}, 
				{0, 0, 0, 0}, 
				{1, 1, 0, 0}, 
				{1, 1, 0, 0}
			},
		},		//1
		{
			{
				{0, 0, 0, 0}, 
				{0, 0, 0, 0}, 
				{0, 0, 0, 0}, 
				{1, 1, 1, 1}
			},
			{
				{1, 0, 0, 0}, 
				{1, 0, 0, 0}, 
				{1, 0, 0, 0}, 
				{1, 0, 0, 0}
			}
			
		},		//2
		{
			{
				{0, 0, 0, 0},
				{0, 0, 0, 0},
				{0, 1, 0, 0},
				{1, 1, 1, 0},
			},
			{
				{0, 0, 0, 0},
				{1, 0, 0, 0},
				{1, 1, 0, 0},
				{1, 0, 0, 0},
			},
			{
				{0, 0, 0, 0},
				{0, 0, 0, 0},
				{1, 1, 1, 0},
				{0, 1, 0, 0},
			},
			{
				{0, 0, 0, 0},
				{0, 1, 0, 0},
				{1, 1, 0, 0},
				{0, 1, 0, 0},
			}
		},		//3
		{
			{
				{0, 0, 0, 0},
				{0, 0, 0, 0},
				{1, 1, 1, 0},
				{0, 0, 1, 0},
			},
			{
				{0, 0, 0, 0},
				{0, 1, 0, 0},
				{0, 1, 0, 0},
				{1, 1, 0, 0},
			},
			{
				{0, 0, 0, 0},
				{0, 0, 0, 0},
				{1, 0, 0, 0},
				{1, 1, 1, 0},
			},
			{
				{0, 0, 0, 0},
				{1, 1, 0, 0},
				{1, 0, 0, 0},
				{1, 0, 0, 0},
			}
		},		//4
		{
			{
				{0, 0, 0, 0},
				{0, 0, 0, 0},
				{1, 1, 1, 0},
				{1, 0, 0, 0},
			},
			{
				{0, 0, 0, 0},
				{1, 1, 0, 0},
				{0, 1, 0, 0},
				{0, 1, 0, 0},
			},
			{
				{0, 0, 0, 0},
				{0, 0, 0, 0},
				{0, 0, 1, 0},
				{1, 1, 1, 0},
			},
			{
				{0, 0, 0, 0},
				{1, 0, 0, 0},
				{1, 0, 0, 0},
				{1, 1, 0, 0},
			}
		},		//5
		{
			{
				{0, 0, 0, 0},
				{0, 0, 0, 0},
				{1, 1, 0, 0},
				{0, 1, 1, 0},
			},
			{
				{0, 0, 0, 0},
				{0, 1, 0, 0},
				{1, 1, 0, 0},
				{1, 0, 0, 0},
			}
		},		//6
		{
			{
				{0, 0, 0, 0},
				{0, 0, 0, 0},
				{0, 1, 1, 0},
				{1, 1, 0, 0},
			},
			{
				{0, 0, 0, 0},
				{1, 0, 0, 0},
				{1, 1, 0, 0},
				{0, 1, 0, 0},
			}
		}	//7
	};
	
	/**
	 * 选择最优走法类构造函数。
	 * 主要对状态二维数祖gState和存储每一列的高度数祖gHeight
	 * 进行初始化。
	 */
	public ErsSelectOpt(){
		int i;
		int j;
		for(i = 0; i < HEIGHT; i++){
			for(j = 0; j < WIDTH; j++){
				gState[i][j] = 0;
			}
		}
		for(i = 0; i < WIDTH; i++){
			gHeight[i] = 0;
		}
	}
	
	/**
	 * 选择最优走法类构造函数。
	 * @param curType int, 当前正在下落俄罗斯方块类型
	 * @param nextType int, 下一个俄罗斯方块的方块类型
	 */
	public ErsSelectOpt(int curType, int nextType){
		this();
		this.curType = curType;
		this.nextType = nextType;
	}
	
	/**
	 * 设置当前俄罗斯方块和下一个俄罗斯方块类型
	 * @param curType int, 当前正在下落俄罗斯方块类型
	 * @param nextType int, 下一个俄罗斯方块的方块类型
	 */
	public void setBlockType(int curType, int nextType){
		this.curType = curType;
		this.nextType = nextType;
	}
	
	/**
	 * 取的当前俄罗斯方块的旋转状态
	 */
	public int getRotType(){
		return rotType;
	}
	
	/**
	 * 取得当前俄罗斯方块的放置位置
	 */
	public int getLeftPos(){
		return leftPos;
	}
	
	/**
	 * 重新设置存储每列高度的数祖gHeight
	 */
	private void resetHeight()
	{
		int i;
		int j;

		for(i = 0; i < WIDTH; i++){
			for(j = HEIGHT-1; j >=0; j--){
				if(gState[j][i] == 1){
					gHeight[i] = j+1;
					break;
				}
			}
			if(j < 0) gHeight[i] = 0;
		}
		return ;
	}
	
	/**
	 * 根据当前局面消除横行
	 */
	int delFullRow()
	{
		int i;
		int j;
		int k;
		int l;
		int lines = 0;

		for(j = HEIGHT-1; j >= 0; j--){
			for(i = 0; i < WIDTH; i++){
				if(gState[j][i] == 0) break;
			}
			if(i >= WIDTH){
				lines++;
				if(j == HEIGHT-1){
					for(k = 0; k < WIDTH; k++)
						gState[j][k] = 0;
				}
				else{
					for(l = j; l < HEIGHT-1; l++){
						for(k = 0; k < WIDTH; k++)
							gState[l][k] = gState[l+1][k];
					}
				}
			}
		}

		return lines;
	}
	
	/**
	 * 判断是否可以放置当前的俄罗斯方块
	 * @param x int, 俄罗斯方块的最左边的位置的横坐标值
	 * @param deltaY int, 纵坐标上的delta值
	 * @param currentType int, 俄罗斯方块的类型
	 * @param rotateType int, 俄罗斯方块的旋转类型
	 * @param height int, 俄罗斯方块的高度
	 * @param width int, 俄罗斯方块的宽度
	 * @return true, 可以放置当前的俄罗斯方块
	 * @return false, 不可以放置当前的俄罗斯方块
	 */
	private boolean canPlace(int x, 
							 int deltaY, 
							 int currentType, 
			                 int rotateType,  
			                 int height, 
			                 int width)
	{
		int i;
		int j;
		int k;
		int max = -1;
		boolean flag = false;

		putY = 0;

		if(x+width-1 >= WIDTH)
			return false;

		for(i = x; i < x+width; i++){
			if(max < gHeight[i]) max = gHeight[i];
		}

		for(i = max; i >= gHeight[x]+deltaY; i--){
			if(i < 0) 
				break;
			if(i+height > HEIGHT) continue;

			flag = true;

			for(j = 3; j >= 0; j--){
				for(k = 0; k < 4; k++){
					if((blockType[currentType][rotateType][j][k] == 1) 
					&& (gState[i+(3-j)][x+k] == 1)){
						flag = false;
						break;
					}
				}
				if(flag == false) break;
			}
			
			if(flag == false) break;
		}
		
		if(i+height-1 >= HEIGHT){
			return false;
		}
		else if((flag == false) || (i < gHeight[x]+deltaY)){
			if(i+height >= HEIGHT){
				return false;
			}
			putY = i+1;
			return true;
		}
		return false;
	}
	
	/**
	 * 放置当前的俄罗斯方块到游戏的容器中
	 * @param x int, 俄罗斯方块放置的最左边的横坐标值
	 * @param y int, 俄罗斯方块放置的最下边的位置的纵坐标值
	 * @param currentType int, 俄罗斯方块的类型
	 * @param rotateType int, 俄罗斯方块的旋转类型
	 * @param height int, 俄罗斯方块的高度
	 * @param width int, 俄罗斯方块的宽度
	 */
	private void placeBlock(int x, 
							int y, 
							int currentType, 
							int rotateType, 
							int height, 
							int width)
	{
		int i;
		int j;
		
		for(i = y; i < y+height; i++){
			for(j = x; j < x+width; j++){
				if(gState[i][j] == 0){
					gState[i][j] = blockType[currentType][rotateType][3-(i-y)][j-x];
				}
			}
		}
		
		return ;
	}
	
	/**
	 * 对当前局面进行估价
	 * @param delLines int, 该局面可以消除的横行数目
	 * @return double, 当前局面估价值
	 */
	private double evaluateFun(int delLines)
	{
		int i;
		int j;
		int hole = 0;
		int score = 0;
		double eval = 0;
		double aveHeight = 0;

		for(i = 0; i < WIDTH; i++){
			aveHeight += (double)gHeight[i];
		}
		aveHeight /= WIDTH;
		
		for(i = 0; i < WIDTH; i++){
			eval += (gHeight[i]-aveHeight)*(gHeight[i]-aveHeight);
		}
		
		for(i = 0; i < WIDTH; i++){
			for(j = gHeight[i]-1; j>=0; j--) if(gState[j][i] == 0){
				hole++;
			}
		}

		switch(delLines){
			case 1:
				score = 0;
				break;
			case 2:
				score = -30;
				break;
			case 3:
				score = -60;
				break;
			case 4:
				score = -120;
				break;
			default:
				score = 0;
				break;
		}

		return (score*1000000+100000*eval+hole*1200000);
	}
	
	/**
	 * 察看当前局面情况
	 * @param state int[][], 存储当前局面状态数祖
	 */
	public void viewBlock(int state[][])
	{
		int i;
		int j;
		
		for(j = HEIGHT-1; j >= 0; j--){
			for(i = 0; i < WIDTH; i++){
				System.out.printf("%d", state[j][i]);
			}
			System.out.println();
		}
		for(i = 0 ; i < WIDTH; i++){
			System.out.printf("%d ", gHeight[i]);
		}
		System.out.println();
		System.out.println();
		return ;
	}
	
	/**
	 * 俄罗斯方块的搜索算法：
	 * (I)	枚举当前俄罗斯方块的旋转情况，枚举是否完毕，完毕至(VI)；否则至(II)。
	 * (II)	枚举当前俄罗斯方块的放置位置，枚举是否完毕，完毕至(I)；否则至(III)。
	 * (III)枚举下一个俄罗斯方块的旋转情况，枚举是否完毕，完毕至(II)；否则至(IV)。
	 * (IV)	枚举下一个俄罗斯方块的放置位置，枚举是否完毕，完毕至(III)；否则至(V)。
	 * (V)	根据枚举情况放置当前俄罗斯方块和下一个俄罗斯方块得到新的局面，对该局面进行估价，
	 *      纪录最大评价的局面。返回至(IV)。
	 * (VI)	根据最大评价的局面的俄罗斯方块的旋转情况和放置位置对当前的俄罗斯方块进行放置。
	 */
	public void selectBest(){
		int i;
		int j;
		int ii;
		int jj;
		int m;
		int n;
		int delLines;
		double max = 1e20;
		double tmpEval;
		int[][] blockStore = new int[HEIGHT][WIDTH];
		
		resetHeight();
		for(i = 0 ; i < WIDTH; i++){
			for(j = 0; j < blockTypeNum[curType]; j++){
		
				if(canPlace(i,  
							dy[curType][j], 
							curType,	
							j,
							blockHeight[curType][j], 
							blockWidth[curType][j]) == true){
					
					for(m = 0; m < HEIGHT; m++){
						for(n = 0; n < WIDTH; n++){
							gOriState[m][n] = gState[m][n];
						}
					}
				
					placeBlock(i, 
						       putY, 
						       curType, 
						       j, 
							   blockHeight[curType][j], 
							   blockWidth[curType][j]);
					
					resetHeight();
					
					for(m = 0; m < HEIGHT; m++){
						for(n = 0; n < WIDTH; n++){
							gTmpState[m][n] = gState[m][n];
						}
					}
					
					for(ii = 0; ii < WIDTH; ii++){
						for(jj = 0; jj < blockTypeNum[nextType]; jj++){
							if(canPlace(ii,
										dy[nextType][jj],
										nextType,
										jj,
										blockHeight[nextType][jj],
										blockWidth[nextType][jj]) == true){
							
								placeBlock(ii, 
								           putY, 
								           nextType,
								           jj,
										   blockHeight[nextType][jj], 
										   blockWidth[nextType][jj]);
									
								delLines = delFullRow();
								resetHeight();
					
								tmpEval = evaluateFun(delLines);
						
								if(tmpEval < max){
									max = tmpEval;
									rotType = j;
									leftPos = i;
									for(m = 0; m < HEIGHT; m++){
										for(n = 0; n < WIDTH; n++){
											blockStore[m][n] = gTmpState[m][n];
										}
									}
								}
								
								for(m = 0; m < HEIGHT; m++){
									for(n = 0; n < WIDTH; n++){
										gState[m][n] = gTmpState[m][n];
									}
								}
								resetHeight();
							}
						}
					} // place next block

					for(m = 0; m < HEIGHT; m++){
						for(n = 0; n < WIDTH; n++){
							gState[m][n] = gOriState[m][n];
						}
					}
					resetHeight();
				}
			}
		} // place current block

		for(m = 0; m < HEIGHT; m++){
			for(n = 0; n < WIDTH; n++){
				gState[m][n] = blockStore[m][n];
			}
		}
		delFullRow();
		resetHeight();
		//viewBlock(gState);
		
		return ;
	}
}
