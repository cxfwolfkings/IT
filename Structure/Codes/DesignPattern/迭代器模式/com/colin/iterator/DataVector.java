package com.colin.iterator;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Vector;

/**
 * Data stored in a vector 
 * 具体容器角色
 */
public class DataVector implements Aggregate {
	private Vector<Object> data = new Vector<Object>();

	public DataVector(InputStream fileName) {
		try {
			BufferedReader f = new BufferedReader(new InputStreamReader(fileName));
			String s = f.readLine();
			while (s != null) {
				if (s.trim().length() > 0) {
					data.add(s);
				}
				s = f.readLine();
			}
			f.close();
		} catch (FileNotFoundException e) {
			System.out.println("Can not find such file !");
		} catch (IOException e) {
			System.out.println("I/O Error !");
			System.exit(0);
		}
	}

	public Iterator CreateIterator() {
		return new VectorIterator(data);
	}

}