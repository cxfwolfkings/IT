package com.colin.factory;

import com.colin.factory.Human;

public class WhiteHuman implements Human {

	@Override
	public void getColor() {
		// TODO Auto-generated method stub
        System.out.println("白色人种的皮肤颜色是白色的！");
	}

	@Override
	public void talk() {
		// TODO Auto-generated method stub
		System.out.println("白人会说话，一般说的是单字节。");
	}

}
