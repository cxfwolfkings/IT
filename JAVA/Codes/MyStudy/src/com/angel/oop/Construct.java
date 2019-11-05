package com.angel.oop;

public class Construct {

	public static void main(String[] args) {
		A ab = new B();
		System.out.println();
		ab = new B();
	}
}

class A {
	static {
		System.out.print("1");
	}

	public A() {
		System.out.print("2");
	}
}

class B extends A {
	static {
		System.out.print("a");
	}

	public B() {
		System.out.print("b");
	}
}
