package com.colin.proxy.dynamic;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

public class MyInvocationHandler implements InvocationHandler {
	// 被代理的对象
	private Object target = null;
	// 通过构造函数传递一个对象
	public MyInvocationHandler(Object _obj) {
		this.target = _obj;
	}
	// 代理方法
	@Override
	public Object invoke(Object arg0, Method arg1, Object[] arg2) throws Throwable {
		// TODO Auto-generated method stub
		return arg1.invoke(this.target, arg2);
	}

}
