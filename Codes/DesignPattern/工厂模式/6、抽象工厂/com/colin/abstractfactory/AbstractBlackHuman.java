package com.colin.abstractfactory;

public abstract class AbstractBlackHuman implements Human{

	@Override
	public void getColor() {
		// TODO Auto-generated method stub
		System.out.println("黑色人种的皮肤颜色是黑色的！");
	}

	@Override
	public void talk() {
		// TODO Auto-generated method stub
		System.out.println("黑色人种会说话，一般人听不懂！");
	}

}
