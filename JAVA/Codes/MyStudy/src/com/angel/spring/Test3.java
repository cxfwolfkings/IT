package com.angel.spring;


import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Test3 {
	private static final String[] CONFIGS=new String[]{"tarena/demo3/applicationContext.xml"};
	public static void main(String[] args) {
		//默认情况下 MyBean在 Spring容器创建时就会创建
		//ApplicationContext ac=new ClassPathXmlApplicationContext(CONFIGS);
		//延迟创建时会在调用时创建
		//MyBean bean1=(MyBean)ac.getBean("mybean");
		//MyBean bean2=(MyBean)ac.getBean("mybean");
		//Spring容器默认是通过单例模式创建Bean对象的,多线程并发访问时会有风险
		//System.out.println(bean1==bean2);//true
		AbstractApplicationContext ac=new ClassPathXmlApplicationContext(CONFIGS);
		MyBean bean=(MyBean)ac.getBean("mybean");//创建对象后调用初始化方法
		ac.close();//Spring容器关闭后销毁对象,只对单例模式有效
	}
}
