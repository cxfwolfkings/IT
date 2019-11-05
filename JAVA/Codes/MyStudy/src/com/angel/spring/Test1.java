package com.angel.spring;


import org.junit.Test;

public class Test1 {
	//@Test
	public void test1(){
		UserService userService=new UserServiceImpl();
		userService.save();
		userService.delete();
	}
	@Test
	public void testJDKProxy() throws Exception{
		JDKProxyFactory proxyFactory=JDKProxyFactory.getInstance();
		UserService userService=(UserService)proxyFactory.getProxy(UserServiceImpl.class);
		System.out.println(userService.getClass());
		userService.delete();
		userService.save();
	}
}
