package com.angel.spring;


import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class JDKProxyFactory implements InvocationHandler{
	
	private Object target;
	//单例模式
	private JDKProxyFactory(){}
	public static JDKProxyFactory getInstance(){
		return new JDKProxyFactory();
	}
	/**
	 * @param clazz 目标对象类型
	 * @return      代理对象
	 */
	public Object getProxy(Class clazz) throws Exception{
		//获取目标类型的实例对象
		target=clazz.newInstance();
		//根据目标类型对象创建代理对象
		Object proxy=Proxy.newProxyInstance(clazz.getClassLoader(),clazz.getInterfaces(),this);
		return proxy;
	}
	/**
	 * 每次通过代理对象调用目标方法时，执行该方法
	 */
	public Object invoke(Object proxy, Method method, Object[] params) throws Throwable {
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
