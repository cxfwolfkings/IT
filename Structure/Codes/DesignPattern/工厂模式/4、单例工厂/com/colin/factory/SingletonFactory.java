package com.colin.factory;

import java.lang.reflect.Constructor;

import com.colin.model.Singleton;

/**
 * 单例工厂
 * @author Colin Chen
 * @date   2018年7月18日 下午8:57:34
 */
public class SingletonFactory {
	private static Singleton singleton;
	/**
	 * 静态方法块，类加载时执行一次
	 * 当然，其他类也可以通过反射的方式建立一个单例对象，确实如此，但是一个项目或团队是有章程和规范的，何况已经提供了一个获得单例对象的方法，为什么还要重新创建一个新对象呢？除非是有人作恶。
	 */
	static{
		try {
		    Class cl = Class.forName(Singleton.class.getName());
	        // 获得元参构造
	        Constructor constructor = cl.getDeclaredConstructor();
	        // 设置元参构造是可访问的
	        constructor.setAccessible(true);
	        // 产生一个实例对象
	        singleton = (Singleton)constructor.newInstance();
		} catch (Exception e) {
		
		}
	}
	
	public static Singleton getSingleton() {
	    return singleton;
	}
}
