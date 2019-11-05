package com.angel.nio;

public class Num {
	public static long start;
	public static long end;
	public static int num = 0;
	public static synchronized void add() {
		num ++;
	}
}
