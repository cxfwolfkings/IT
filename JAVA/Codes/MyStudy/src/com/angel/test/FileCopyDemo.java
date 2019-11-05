package com.angel.test;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class FileCopyDemo {

	public static void main(String[] args) {
		try {
			for(int i = 2; i < 5; i++){
				String fileName = "ProductIcon_03_" + i;
				for(int j = 4; j < 64; j++){			
					FileInputStream input = new FileInputStream("C:\\Users\\colin.chen\\Desktop\\" + fileName + ".jpg");
					String copyFileName = "ProductIcon_" + String.format("%02d", j) + "_" + i;
					FileOutputStream output = new FileOutputStream("C:\\Users\\colin.chen\\Desktop\\Copy\\" + copyFileName + ".jpg");
					int in = input.read();
					while (in != -1) {
						output.write(in);
						in = input.read();
					}
					output.close();
					input.close();
				}
			}
			System.out.println("OK");
		} catch (IOException e) {
			System.out.println(e.toString());
		}
	}

}
