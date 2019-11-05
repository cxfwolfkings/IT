package com.angel.spring;


public class MyBean {
	public MyBean(){
		System.out.println("创建MyBean对象");
	}
	public void myinit(){
		System.out.println("执行MyBean对象的初始化");
	}
	public void mydestroy(){
		System.out.println("执行Mybean对象的销毁，释放资源");
	}
}
