package com.colin.proxy.dynamic;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Proxy;

public class Client {
    public static void main(String[] args) {
    	// 游戏场景
	    IGamePlayer player = new GamePlayer("张三");
	    InvocationHandler handler = new GamePlayIH(player);
	    ClassLoader cl = player.getClass().getClassLoader();
	    IGamePlayer proxy = (IGamePlayer)Proxy.newProxyInstance(cl, new Class[] { IGamePlayer.class }, handler);
	    proxy.login("ZhangSan", "123456");
	    proxy.killBoss();
	    proxy.upgrade();
	    
	    // 通用场景
	    Subject subject = new RealSubject();
	    //InvocationHandler handler2 = new MyInvocationHandler(subject);
	    //Subject proxy2 = DynamicProxy.newProxyInstance(subject.getClass().getClassLoader(), subject.getClass().getInterfaces(), handler2);
	    Subject proxy2 = SubjectDynamicProxy.newProxyInstance(subject);
	    proxy2.doSomething("Finish");
    }
}
