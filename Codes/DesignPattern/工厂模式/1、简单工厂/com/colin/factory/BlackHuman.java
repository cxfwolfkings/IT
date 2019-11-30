package com.colin.factory;

import com.colin.factory.Human;

public class BlackHuman implements Human {

	@Override
	public void getColor() {
		// TODO Auto-generated method stub
        System.out.println("黑色人种的皮肤颜色是黑色的！");
	}

	@Override
	public void talk() {
		// TODO Auto-generated method stub
		System.out.println("黑人会说话，一般人听不懂。");
	}

}
