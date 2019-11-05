package com.angel.javase;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Arrays;

/**
 * 反射示例
 * @author  colin.chen
 * @version 1.0.0
 * @date    2018年8月22日 下午1:39:23
 */
public class ReflectDemo {
	public static void main(String[] args) {
		reflect(new Foo());
		call(new Foo(), "look", new Class[] { String.class, int.class },
				new Object[] { "wo", 18 });
		System.out.println(fieldValue(new Foo(), "a") + " "
				+ fieldValue(new Foo(), "b"));
		Object obj = create("test.reflect.Foo");
		Foo foo = (Foo) obj;
		foo.print();
	}

	/**
	 * 通过类的一个实例得到这个类的属性，方法，构造器
	 * 
	 * @param object
	 *            类的实例
	 */
	public static void reflect(Object object) {
		Class<?> obj = object.getClass();
		Field[] fields = obj.getDeclaredFields();
		System.out.println("显示属性:");
		for (Field field : fields) {
			System.out.println(field.getType() + " " + field.getName());
		}
		Method[] methods = obj.getDeclaredMethods();
		System.out.println("显示方法:");
		for (Method method : methods) {
			System.out.println(method.getReturnType() + " " + method.getName()
					+ Arrays.toString(method.getParameterTypes()));
		}
		Constructor<?>[] constructors = obj.getDeclaredConstructors();
		System.out.println("显示构造体:");
		for (Constructor<?> constructor : constructors) {
			System.out.println(constructor.getName()
					+ Arrays.toString(constructor.getParameterTypes()));
		}
	}

	/**
	 * 通过方法的名字，调用这个方法: 1.确定调用哪个对象 2.确定调用的方法名字是什么 3.确定参数列表中每个参数的类型的顺序 4.确定实际的参数值
	 */
	public static Object call(Object object, String methodName,
			Class<?>[] paramTypes, Object[] params) {
		try {
			Class<?> obj = object.getClass();
			Method method = obj.getDeclaredMethod(methodName, paramTypes);// 方法名，形参类型
			Object o = method.invoke(object, params);// 调用对象，实参
			return o;
		} catch (Exception e) {
		}
		return null;
	}

	/**
	 * 通过属性的名字，获取属性的值 1.确定从哪个对象中获取属性 2.确定属性的名字 3.从Class中获取给定名字的属性Field
	 * 4.根据Field获取所描述的属性的值 Student stu = new Student(); int id = stu.stuid;
	 */
	public static Object fieldValue(Object object, String fieldName) {
		try {
			Class<?> obj = object.getClass();
			Field field = obj.getDeclaredField(fieldName);
			Object o = field.get(object);
			return o;
		} catch (Exception e) {
		}
		return null;
	}

	/**
	 * 通过类名字实例化一个对象
	 */
	public static Object create(String className) {
		try {
			Class<?> obj = Class.forName(className);
			Object o = obj.newInstance();
			return o;
		} catch (Exception e) {
			System.out.println("创建对象失败!");
		}
		return null;
	}
}

class Foo {
	int a = 6;
	int b = 9;

	public Foo() {
	};

	public Foo(int a, int b) {
		this.a = a;
		this.b = b;
	}

	public int add(int a) {
		return a + b + this.a;
	}

	public void look(int a, String str) {
		System.out.println(a + str);
	}

	public void look(String str, int a) {
		System.out.println(str + a);
	}

	public void print() {
		System.out.println("OK");
	}
}