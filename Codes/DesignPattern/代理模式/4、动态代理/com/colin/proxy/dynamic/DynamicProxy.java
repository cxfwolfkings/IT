package com.colin.proxy.dynamic;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Proxy;

/**
 * 一个通用代理框架。
 * 如果你想设计自己的AOP框架，完全可以在此基础上扩展，我们设计的是一个通用代理，只要有一个接口， 一个实现类，就可以使用该代理， 完成代理的所有功效。
 * @author Colin Chen
 * @date   2018年8月21日 下午8:08:55
 * @param <T>
 */
public class DynamicProxy<T> {
	public static <T> T newProxyInstance(ClassLoader loader, Class<?>[] interfaces, InvocationHandler h) {
		// 寻找JoinPoint连接点，AOP框架使用元数据定义
		if (true) {
			// 执行一个前置通知
			(new BeforeAdvice()).exec();
		}
		// interfaces查找该类所有接口，然后实现接口的所有方法
		return (T)Proxy.newProxyInstance(loader, interfaces, h);
	}
}
