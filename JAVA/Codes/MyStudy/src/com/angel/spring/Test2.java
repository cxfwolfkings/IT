package com.angel.spring;


import org.junit.Test;

public class Test2 {
	//@Test
	public void testJDKProxy1() throws Exception{
		JDKProxyFactory proxyFactory=JDKProxyFactory.getInstance();
		DeptServiceImpl deptService=(DeptServiceImpl)proxyFactory.getProxy(DeptServiceImpl.class);
		System.out.println(deptService.getClass());
		deptService.update();
		deptService.add();
	}
	@Test
	public void testCglibProxy() throws Exception{
		CGLIBProxyFactory factory=CGLIBProxyFactory.getInstance();
		DeptServiceImpl dept=(DeptServiceImpl)factory.getProxy(DeptServiceImpl.class);
		dept.update();
		dept.add();
	}
}
