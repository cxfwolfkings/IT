package com.colin.proxy.dynamic;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

public class GamePlayIH implements InvocationHandler {
    // 被代理者
	Class cls = null;
	// 被代理的实例
	Object obj = null;
	// 我要代理谁
	public GamePlayIH(Object _obj) {
		// TODO Auto-generated constructor stub
		this.obj = _obj;
	}
	@Override
	public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
		// TODO Auto-generated method stub
		Object result = method.invoke(this.obj, args);
		// 如果是登录方法，则发送消息
		if(method.getName().equalsIgnoreCase("login")){
			System.out.println("有人在用我的账号登录！");
		}
		return result;
	}

}
