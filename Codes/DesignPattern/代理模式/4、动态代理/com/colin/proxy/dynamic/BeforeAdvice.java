package com.colin.proxy.dynamic;

public class BeforeAdvice implements IAdvice {

	@Override
	public void exec() {
		// TODO Auto-generated method stub
		System.out.println("我是前置通知，我被执行了！");
	}

}
