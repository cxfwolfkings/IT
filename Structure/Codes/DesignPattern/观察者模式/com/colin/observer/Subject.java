package com.colin.observer;

import java.util.*;

import com.colin.observer.Observer;
/**
 *  Subject interface
 *  In this interface, we can only declare top 3 function, 
 *  other function we can define in an abstract class which implements this interface
 *  抽象目标角色
 */
public abstract class Subject  {
	// 定义一个观察者数组
	private Vector<Observer> obsVector = new Vector<Observer>();
	
	/**
	 * 增加一个观察者
	 * @param o
	 */
    public void attach(Observer o) {
    	obsVector.add(o);
    }
    
    /**
     * 删除一个观察者
     * @param o
     */
    public void detach(Observer o) {
    	obsVector.remove(o);
    }
    
    /**
     * 通知所有观察者
     */
    public void sendNotify() {
    	for (Observer o : this.obsVector) {
    		o.update();
    	}
    }

}