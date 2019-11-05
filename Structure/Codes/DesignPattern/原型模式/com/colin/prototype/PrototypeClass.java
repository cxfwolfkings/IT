package com.colin.prototype;

/**
 * 原型模式通用源码
 * @author Colin Chen
 * @date   2018年8月21日 下午8:40:38
 */
public class PrototypeClass implements Cloneable{

	@Override
	protected PrototypeClass clone() {
		// TODO Auto-generated method stub
		PrototypeClass prototypeClass = null;
		try {
			prototypeClass = (PrototypeClass)super.clone();
		} catch (Exception e) {
			// TODO: handle exception
		}
		return prototypeClass;
	}

}
