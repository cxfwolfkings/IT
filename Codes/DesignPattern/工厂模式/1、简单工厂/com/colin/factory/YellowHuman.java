package com.colin.factory;

import com.colin.factory.Human;

public class YellowHuman implements Human {

	@Override
	public void getColor() {
		// TODO Auto-generated method stub
        System.out.println("黄色人种的皮肤颜色是黄色的！");
	}

	@Override
	public void talk() {
		// TODO Auto-generated method stub
		System.out.println("黄人会说话，一般说的是双字节。");
	}

}
