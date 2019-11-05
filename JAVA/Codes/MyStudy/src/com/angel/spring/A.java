package com.angel.spring;


public class A {
	private IB b;
	private String name;
	/**
	 * 构造方式注入，必须在配置文件中出现，否则出错
	 * @param b
	 */
//	public A(IB b,String name){
//		this.b=b;
//		this.name=name;
//	}
	
	public void print(){
		System.out.println("----打印输出----");
		b.show();
		System.out.println("名字："+name);
	}
	/**
	 * set方式注入，使用的较多
	 * @param b
	 */
	public void setB(IB b) {
		this.b = b;
	}

	public void setName(String name) {
		this.name = name;
	}
	
}
