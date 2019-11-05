package com.colin.proxy.dynamic;

import java.lang.reflect.InvocationHandler;

/**
 * 具体业务的动态代理
 * @author Colin Chen
 * @date   2018年8月21日 下午8:02:04
 */
public class SubjectDynamicProxy extends DynamicProxy {
    public static<T> T newProxyInstance(Subject subject) {
    	// 获得ClassLoader
		ClassLoader loader = subject.getClass().getClassLoader();
		// 获得接口数组
		Class<?>[] classes = subject.getClass().getInterfaces();
		// 获得handler
		InvocationHandler handler = new MyInvocationHandler(subject);
		return newProxyInstance(loader, classes, handler);
	}
}
