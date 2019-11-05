package com.colin.datastructure.set;

import java.util.Comparator;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;
import java.util.TreeSet;

/**
 * HashSet示例
 * 
 * @author  Colin Chen
 * @create  2019年5月19日 上午7:27:22
 * @modify  2019年5月19日 上午7:27:22
 * @version A.1
 */
public class SetDemo {
	public static void main(String[] args) {
		test2();
	}
	
	/**
	 * HashSet示例：
	 *   1、不能添加相同项。（先比较HashCode，再调用equals）
	 *   2、读取和存入顺序不一致。（HashCode顺序）
	 */
	public static void test1() {
		// Set集合存和取的顺序不一致。
		Set<String> hs = new HashSet<String>();
		hs.add("世界军事");
		hs.add("兵器知识");
		hs.add("舰船知识");
		hs.add("汉和防务");
		 
		// 返回此 set 中的元素的数量
		System.out.println(hs.size()); // 4
		 
		// 如果此 set 尚未包含指定元素，则返回 true
		boolean add = hs.add("世界军事"); // false
		System.out.println(add);
		 
		// 返回此 set 中的元素的数量
		System.out.println(hs.size());// 4
		Iterator<String> it = hs.iterator();
		while (it.hasNext()) {
			System.out.println(it.next());
		}
	}
	
	/**
	 * TreeSet示例：
	 *   1、默认按自然排序存储，读取
	 *   2、自定义类自身具有比较性
	 *   3、自定义类自身没有比较性，给集合容器指定比较器
	 */
	public static void test2() {
		// 1、String对象的默认排序
		TreeSet<String> ts = new TreeSet<String>();
		ts.add("ccc");
		ts.add("aaa");
		ts.add("ddd");
		ts.add("bbb");
		System.out.println(ts); // [aaa, bbb, ccc, ddd]
		for (String item : ts) {
			System.out.println(item + "：" + item.hashCode());
		}
		
		// 2、自定义类自身具有比较性
		TreeSet<Person> ts1 = new TreeSet<Person>();
		ts1.add(new Person("aa", 20, "男"));
		ts1.add(new Person("bb", 18, "女"));
		ts1.add(new Person("cc", 17, "男"));
		ts1.add(new Person("dd", 17, "女"));
		ts1.add(new Person("dd", 15, "女"));
		ts1.add(new Person("dd", 15, "女"));
 
		System.out.println(ts);
		System.out.println(ts.size());
		
		// 3、自定义类自身没有比较性，给集合容器指定比较器
		TreeSet<Book> ts2 = new TreeSet<Book>(new MyComparator());
		ts2.add(new Book("think in java", 100));
		ts2.add(new Book("java 核心技术", 75));
		ts2.add(new Book("现代操作系统", 50));
		ts2.add(new Book("java就业教程", 35));
		ts2.add(new Book("think in java", 100));
		ts2.add(new Book("ccc in java", 100));
 
		System.out.println(ts); 
	}
}

/**
 * 自身具备比较性
 * @author  Colin Chen
 * @create  2019年5月19日 上午8:52:58
 * @modify  2019年5月19日 上午8:52:58
 * @version A.1
 */
class Person implements Comparable<Object> {
	private String name;
	private int age;
	private String gender;
 
	public Person() {
 
	}
 
	public Person(String name, int age, String gender) {
 
		this.name = name;
		this.age = age;
		this.gender = gender;
	}
 
	public String getName() {
		return name;
	}
 
	public void setName(String name) {
		this.name = name;
	}
 
	public int getAge() {
		return age;
	}
 
	public void setAge(int age) {
		this.age = age;
	}
 
	public String getGender() {
		return gender;
	}
 
	public void setGender(String gender) {
		this.gender = gender;
	}
 
	@Override
	public int hashCode() {
		return name.hashCode() + age * 37;
	}
 
	@Override
	public boolean equals(Object obj) {
		System.err.println(this + "equals: " + obj);
		if (!(obj instanceof Person)) {
			return false;
		}
		Person p = (Person) obj;
		return this.name.equals(p.name) && this.age == p.age;
	}
 
	public String toString() {
		return "Person [name=" + name + ", age=" + age + ", gender=" + gender
				+ "]";
	}
 
	@Override
	public int compareTo(Object obj) {
		Person p = (Person) obj;
		System.out.println(this + " compareTo: " + p);
		if (this.age > p.age) {
			return 1;
		}
		if (this.age < p.age) {
			return -1;
		}
		return this.name.compareTo(p.name);
	}

}

/**
 * 自定义比较器
 * @author  Colin Chen
 * @create  2019年5月19日 上午8:58:43
 * @modify  2019年5月19日 上午8:58:43
 * @version A.1
 */
class MyComparator implements Comparator<Object> {
	 
	public int compare(Object o1, Object o2) {
		Book b1 = (Book) o1;
		Book b2 = (Book) o2;
		System.out.println(b1 + " comparator " + b2);
		if (b1.getPrice() > b2.getPrice()) {
			return 1;
		}
		if (b1.getPrice() < b2.getPrice()) {
			return -1;
		}
		return b1.getName().compareTo(b2.getName());
	}
 
}
 
/**
 * 自身没有比较性
 * @author  Colin Chen
 * @create  2019年5月19日 上午8:58:17
 * @modify  2019年5月19日 上午8:58:17
 * @version A.1
 */
class Book {
	private String name;
	private double price;
 
	public Book() {
 
	}
 
	public String getName() {
		return name;
	}
 
	public void setName(String name) {
		this.name = name;
	}
 
	public double getPrice() {
		return price;
	}
 
	public void setPrice(double price) {
		this.price = price;
	}
 
	public Book(String name, double price) {
 
		this.name = name;
		this.price = price;
	}
 
	@Override
	public String toString() {
		return "Book [name=" + name + ", price=" + price + "]";
	}
 
}
