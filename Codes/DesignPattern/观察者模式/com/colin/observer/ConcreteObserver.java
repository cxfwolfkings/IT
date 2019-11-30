package com.colin.observer;

/**
 * A concrete observer 
 * This concrete observer can change subject through call a
 * concrete subject setState function
 * 具体观察者角色
 */
public class ConcreteObserver extends Observer {
	/**
	 * 实现更新方法
	 */
	public void update() {
		System.out.println("接收到消息，并进行处理！");		
	}
	
}
