package com.angel.spring;


import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Test {
	private static final String[] CONFIGS={"tarena/demo4/applicationContext.xml"};
	public static void main(String[] args) {
		ApplicationContext ac=new ClassPathXmlApplicationContext(CONFIGS);
//		A a=(A)ac.getBean("a");
//		a.print();
		CollectionBean bean=(CollectionBean)ac.getBean("collectionbean");
		bean.show();
	}
}