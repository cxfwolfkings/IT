package com.angel.javase;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Arrays;

/**
 * ����ʾ��
 * @author  colin.chen
 * @version 1.0.0
 * @date    2018��8��22�� ����1:39:23
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
	 * ͨ�����һ��ʵ���õ����������ԣ�������������
	 * 
	 * @param object
	 *            ���ʵ��
	 */
	public static void reflect(Object object) {
		Class<?> obj = object.getClass();
		Field[] fields = obj.getDeclaredFields();
		System.out.println("��ʾ����:");
		for (Field field : fields) {
			System.out.println(field.getType() + " " + field.getName());
		}
		Method[] methods = obj.getDeclaredMethods();
		System.out.println("��ʾ����:");
		for (Method method : methods) {
			System.out.println(method.getReturnType() + " " + method.getName()
					+ Arrays.toString(method.getParameterTypes()));
		}
		Constructor<?>[] constructors = obj.getDeclaredConstructors();
		System.out.println("��ʾ������:");
		for (Constructor<?> constructor : constructors) {
			System.out.println(constructor.getName()
					+ Arrays.toString(constructor.getParameterTypes()));
		}
	}

	/**
	 * ͨ�����������֣������������: 1.ȷ�������ĸ����� 2.ȷ�����õķ���������ʲô 3.ȷ�������б���ÿ�����������͵�˳�� 4.ȷ��ʵ�ʵĲ���ֵ
	 */
	public static Object call(Object object, String methodName,
			Class<?>[] paramTypes, Object[] params) {
		try {
			Class<?> obj = object.getClass();
			Method method = obj.getDeclaredMethod(methodName, paramTypes);// ���������β�����
			Object o = method.invoke(object, params);// ���ö���ʵ��
			return o;
		} catch (Exception e) {
		}
		return null;
	}

	/**
	 * ͨ�����Ե����֣���ȡ���Ե�ֵ 1.ȷ�����ĸ������л�ȡ���� 2.ȷ�����Ե����� 3.��Class�л�ȡ�������ֵ�����Field
	 * 4.����Field��ȡ�����������Ե�ֵ Student stu = new Student(); int id = stu.stuid;
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
	 * ͨ��������ʵ����һ������
	 */
	public static Object create(String className) {
		try {
			Class<?> obj = Class.forName(className);
			Object o = obj.newInstance();
			return o;
		} catch (Exception e) {
			System.out.println("��������ʧ��!");
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