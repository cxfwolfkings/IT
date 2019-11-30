package com.colin.observer;

/**
 * A concrete subject
 * 具体目标角色
 */
public class ConcreteSubject extends Subject {

	/**
	 * 具体的业务
	 */
	public void doSomething() {
		// ...
		super.sendNotify();
	}
}