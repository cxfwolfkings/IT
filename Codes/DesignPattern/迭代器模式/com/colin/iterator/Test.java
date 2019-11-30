package com.colin.iterator;

import java.io.InputStream;

/**
 * 客户角色
 */
public class Test {
	public static void main(String[] args) {
		InputStream fileName = Test.class.getResourceAsStream("data.txt");
		DataVector dataVector = new DataVector(fileName);
		Iterator iVector = dataVector.CreateIterator();
		for (iVector.First(); !iVector.IsDone(); iVector.Next()) {
			iVector.CurrentItem();
		}
	}
}