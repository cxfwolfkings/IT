package com.charles.game.fish.fishinfo;
/**
 *<p>
 * * Copyright (C),200
 * by huanghao
 * Desctiptoin: 通信时需要发送的数据
 * </p>
 *
 */
import  java.io.Serializable;
public class FishInfo implements Serializable{
    public
	int x,		  //该鱼的x坐标
 	    y,		  //该鱼的y坐标
 	    width,	  //该鱼使用的图片的宽度
 	    height,	  //该鱼使用的图片的高度
 	    i,
        down,
        right;
 	public FishInfo(int x,int y,int width,int height,
                    int i,int down,int right)
                    {
                    this.x = x;
                    this.y= y;
                    this.width = width;
                    this.height =height;
                    this.i = i;
                    this.down = down;
                    this.right = right;
                    }
}