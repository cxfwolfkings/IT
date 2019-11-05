package com.angel.spring;


import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateUtil {
	
	private static ThreadLocal<Session> tl = new ThreadLocal<Session>();
	private static Configuration conf;
	private static SessionFactory sessionFactory;
	
	static {
		// conf对象只要加载一次就行
		conf = new Configuration();
		// 默认加载src下的hibernate.cfg.xml
		conf.configure();
		// 获取Session对象工厂
		sessionFactory = conf.buildSessionFactory();
	}

	/**
	 * 线程单例
	 * @return
	 */
	public static Session getSession() {
		//sessionFactory.getCurrentSession();
		Session session = tl.get();
		if(session==null){
			//创建Session
			session = sessionFactory.openSession();
			tl.set(session);
		}
		return session;
	}
	
	public static void closeSession(){
		Session session = tl.get();
		if(session!=null){
			session.close();
			tl.set(null);
		}
	}

}
