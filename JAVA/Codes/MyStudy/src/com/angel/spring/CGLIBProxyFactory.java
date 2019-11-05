package com.angel.spring;


import java.lang.reflect.Method;

import net.sf.cglib.proxy.Enhancer;
import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;

public class CGLIBProxyFactory implements MethodInterceptor{
	private Object target;
	private CGLIBProxyFactory(){}
	public static CGLIBProxyFactory getInstance(){
		return new CGLIBProxyFactory();
	}
	public Object getProxy(Class clazz) throws Exception{
		target=clazz.newInstance();
		Enhancer enhancer=new Enhancer();
		enhancer.setSuperclass(clazz);
		enhancer.setCallback(this);
		return enhancer.create();
	}
	public Object intercept(Object proxy, Method method, Object[] params,MethodProxy methodProxy) throws Throwable {
		Object retVal=null;
		try {
			System.out.println("调用前置通知");
			//调用目标对象处理
			retVal=method.invoke(target,params);
			System.out.println("调用后置通知");
		} catch (Exception e) {
			System.out.println("调用异常通知");
		}finally{
			System.out.println("调用最终通知");
		}
		return retVal;
	}
	
}
