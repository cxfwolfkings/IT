package com.colin.singleton;

import java.util.*;

/**
 * A new Singleton use registry 在集合中注册的单例模式
 */
public class SingletonB {
	static private Hashtable<String, Object> registry = new Hashtable<String, Object>();
	
	// static private SingletonB instance;

	public static void Register(String name, SingletonB aInstance) {
		registry.put(name, aInstance);
	}

	public static SingletonB GetInstance(String name) {
		return (SingletonB) registry.get(name);
	}
}

/**
 * A user defined exception
 */
class SingletonException extends RuntimeException {

	private static final long serialVersionUID = 5924467193049864288L;

	public SingletonException() {
		super();
	}

	public SingletonException(String s) {
		super(s);
	}

}