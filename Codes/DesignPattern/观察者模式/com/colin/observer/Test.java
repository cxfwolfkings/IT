package com.colin.observer;

/**
 *  A test client
 */
public class Test  {
    public static void main(String[] args) {
    	// 创建一个被观察者
    	ConcreteSubject mySub = new ConcreteSubject();
        // 创建一个观察者
        Observer myObserver = new ConcreteObserver();
        // 观察者观察被观察者
        mySub.attach(myObserver);
        // 被观察者开始行动
        mySub.doSomething();
    }
}
