package com.colin.factory;

import com.colin.model.Window;

/**
 * 功能测试
 * @author Colin Chen
 * @date   2018年7月18日 下午8:18:51
 */
public class Test {
	public static void main(String[] args) {
		Factory myFactory = new Factory();
		Window myBigWindow = myFactory.CreateWindow("Big");
		myBigWindow.func();

		Window mySmallWindow = myFactory.CreateWindow("Small");
		mySmallWindow.func();
	}
}
