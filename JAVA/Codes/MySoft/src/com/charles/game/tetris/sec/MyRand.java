/**
 * File: MyRand.java
 * User: 吴永坚
 * Date: 2006.11.8
 * Describe: 俄罗斯方块的 Java 实现
 */

package com.charles.game.tetris.sec;

/**
 * 随机生成类。
 * 主要按照设定的概率生成俄罗斯方块
 */
public class MyRand {
	private double[] pro = new double[7];
	
	/**
	 * 随机生成类的构造函数
	 */
	public MyRand(){		
	}
	
	/**
	 * 随机生成类的构造函数
	 * @param p1 double, 第一个俄罗斯方块的出现概率 
	 * @param p2 double, 第二个俄罗斯方块的出现概率
	 * @param p3 double, 第三个俄罗斯方块的出现概率
	 * @param p4 double, 第四个俄罗斯方块的出现概率
	 * @param p5 double, 第五个俄罗斯方块的出现概率
	 * @param p6 double, 第六个俄罗斯方块的出现概率
	 * @param p7 double, 第七个俄罗斯方块的出现概率
	 */
	public MyRand(double p1, 
				  double p2, 
				  double p3, 
				  double p4, 
				  double p5, 
				  double p6, 
				  double p7){
		this();
		pro[0] = p1;
		pro[1] = p2;
		pro[2] = p3;
		pro[3] = p4;
		pro[4] = p5;
		pro[5] = p6;
		pro[6] = p7;
		
	}
	
	/**
	 * 设置每一个方块出现概率值
	 * @param p1 double, 第一个俄罗斯方块的出现概率 
	 * @param p2 double, 第二个俄罗斯方块的出现概率
	 * @param p3 double, 第三个俄罗斯方块的出现概率
	 * @param p4 double, 第四个俄罗斯方块的出现概率
	 * @param p5 double, 第五个俄罗斯方块的出现概率
	 * @param p6 double, 第六个俄罗斯方块的出现概率
	 * @param p7 double, 第七个俄罗斯方块的出现概率
	 */
	public void setProbality(double p1, 
			  				 double p2, 
			  				 double p3, 
			  				 double p4, 
			  				 double p5, 
			  				 double p6, 
			  				 double p7){
		pro[0] = p1;
		pro[1] = p2;
		pro[2] = p3;
		pro[3] = p4;
		pro[4] = p5;
		pro[5] = p6;
		pro[6] = p7;
	}
	
	/**
	 * 按照设定的概率随机生成0~6的俄罗斯方块的编号
	 * @return i, 省城的俄罗斯方块的编号
	 */
	public int getRandom(){
		int i;
		double sum = 0.0;
		double rand = Math.random();
		
		for(i = 0; i < 7; i++){
			sum += pro[i];
			if(rand < sum+1e-8)
				break;
		}
		return i;
	}
}
