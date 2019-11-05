package com.angel.test;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.util.Scanner;

public class Test {
	
	/**
	 * �Ʋ���������: ��һ�����ӣ��ӳ�����3������ÿ���¶���1�����ӣ�
	 * С���ӳ����������º�ÿ��������һ�����ӣ��������Ӷ�������
	 * ��ÿ���µ����Ӹ���Ϊ���٣�
	 */
	public static void test01() {
		System.out.println("��1���µ����Ӷ���:1");
		System.out.println("��2���µ����Ӷ���:1");
		int f1 = 1, f2 = 1, f, M=24;
		for(int i=3; i<=M; i++) {
			f = f2;
		    f2 = f1 + f2;
		    f1 = f;
		    System.out.println("��" + i +"���µ����Ӷ���: "+f2);
		}
	}
	
	/**
	 * �ж�101-200֮���ж��ٸ����������������������
	 */
	public static void test02(){
		for (int i = 101; i < 200; i += 2) {
			int j;
			for (j = 2; j <= i; j++) {
				if (i % j == 0)
					break;
			}
			if (i == j) {
				System.out.print(i + " ");
			}
		}
	}
	
	/**
	 * ��ӡ�����е� "ˮ�ɻ��� "��
	 * ��ν "ˮ�ɻ��� "��ָһ����λ�������λ���������͵��ڸ�������
	 * ���磺153��һ�� "ˮ�ɻ��� "����Ϊ153=1�����η���5�����η���3�����η���
	 */
	public static void test03(){
		int b1, b2, b3; 
		for(int m=101; m<1000; m++) { 
			b3 = m / 100;
		    b2 = m % 100 / 10;
		    b1 = m %    10;
		    if((b3*b3*b3 + b2*b2*b2 + b1*b1*b1) == m) {
		    	System.out.println(m+"��һ��ˮ�ɻ���");
		    }
		}
	}
	
	/**
	 * ��һ���������ֽ������������磺����90,��ӡ��90=2*3*3*5��
	 */
	public static void test04(){
		Scanner console = new Scanner(System.in);
		while (true) {
			int i = 2;
			System.out.println("����һ������");
			int num = console.nextInt();
			if (num == 0) {
				System.out.println("�˳�!");
				return;
			}
			if (num < i && num != 0) {
				System.out.println("�������");
				continue;
			}
			System.out.print(num + "=");
			while (num >= i) {
				if (num == i) {
					System.out.print(i);
					System.out.println();
					break;
				}
				if (num % i == 0) {
					System.out.print(i + "*");
					num /= i;
				} else
					i++;
			}
		}
	}
	
	/**
	 * ���������������Ƕ������ɴ��⣺ѧϰ�ɼ�> =90�ֵ�ͬѧ��A��ʾ��60-89��֮�����B��ʾ��60�����µ���C��ʾ��
	 */
	public static void test05(){
		int x;
		char grade;
		Scanner s = new Scanner(System.in);
		System.out.print("������һ���ɼ�: ");
		x = s.nextInt();
		grade = x >= 90 ? 'A' : x >= 60 ? 'B' : 'C';
		System.out.println("�ȼ�Ϊ��" + grade);
	}
	
	/**
	 * ��������������m��n���������Լ������С��������
	 * ��ѭ���У�ֻҪ����������0���ýϴ������Խ�С��������С��һ������Ϊ��һ��ѭ���Ĵ�����
	 * ȡ�õ�������Ϊ��һ��ѭ���Ľ�С���������ѭ��ֱ����С������ֵΪ0�����ؽϴ������������Ϊ���Լ����
	 * ��С������Ϊ����֮���������Լ��
	 */
	public static void test06() {
		int a, b, m;
		Scanner s = new Scanner(System.in);
		System.out.print("����һ�������� ");
		a = s.nextInt();
		System.out.print("�ټ���һ�������� ");
		b = s.nextInt();
		deff cd = new deff();
		m = cd.deff(a, b);
		int n = a * b / m;
		System.out.println("���Լ��: " + m);
		System.out.println("��С������: " + n);
	}
	
	/**
	 * ����һ���ַ����ֱ�ͳ�Ƴ�����Ӣ����ĸ���ո����ֺ������ַ��ĸ���
	 */
	public static void test07() {
		int digital = 0;
		int character = 0;
		int other = 0;
		int blank = 0;
		char[] ch = null;
		Scanner sc = new Scanner(System.in);
		String s = sc.nextLine();
		ch = s.toCharArray();
		for (int i = 0; i < ch.length; i++) {
			if (ch[i] >= '0' && ch[i] <= '9') {
				digital++;
			} else if ((ch[i] >= 'a' && ch[i] <= 'z') || ch[i] > 'A' && ch[i] <= 'Z') {
				character++;
			} else if (ch[i] == ' ') {
				blank++;
			} else {
				other++;
			}
		}
		System.out.println("���ָ���: " + digital);
		System.out.println("Ӣ����ĸ����: " + character);
		System.out.println("�ո����: " + blank);
		System.out.println("�����ַ�����:" + other);
	}
	
	/**
	 * ��s=a+aa+aaa+aaaa+aa...a��ֵ������a��һ�����֡�
	 * ����2+22+222+2222+22222(��ʱ����5�������)������������м��̿���
	 */
	public static void test08() {
		long a, b = 0, sum = 0;
		Scanner s = new Scanner(System.in);
		System.out.print("��������a��ֵ�� ");
		a = s.nextInt();
		System.out.print("������ӵ�������");
		int n = s.nextInt();
		int i = 0;
		while (i < n) {
			b = b + a;
			sum = sum + b;
			a = a * 10;
			++i;
		}
		System.out.println(sum);
	}
	
	/**
	 * һ�������ǡ�õ�����������֮�ͣ�������ͳ�Ϊ "���� "��
	 * ����6=1��2��3.���     
	 * �ҳ�1000���ڵ���������
	 */
	public static void test09() {
		System.out.println("1��1000�������У� ");
		for (int i = 1; i < 1000; i++) {
			int t = 0;
			for (int j = 1; j <= i / 2; j++) {
				if (i % j == 0) {
					t = t + j;
				}
			}
			if (t == i) {
				System.out.print(i + "     ");
			}
		}
	}
	     
	/**
	 * һ���100�׸߶��������£�ÿ����غ�����ԭ�߶ȵ�һ�룻 �����£������ڵ�10�����ʱ�������������ף���10�η�����ߣ�
	 */
	public static void test10() {
		double h = 100, s = 100;
		for (int i = 1; i < 10; i++) {
			s = s + h;
			h = h / 2;
		}
		System.out.println("����·�̣�" + s);
		System.out.println("�����߶ȣ�" + h / 2);
	}
	
	/**
	 * ��1��2��3��4�ĸ����֣�����ɶ��ٸ�������ͬ�����ظ����ֵ���λ�������Ƕ��٣�
	 */
	public static void test11() {
		int count = 0;
		for (int x = 1; x < 5; x++) {
			for (int y = 1; y < 5; y++) {
				for (int z = 1; z < 5; z++) {
					if (x != y && y != z && x != z) {
						count++;
						System.out.println(x * 100 + y * 10 + z);
					}
				}
			}
		}
		System.out.println("����" + count + "����λ��");
	}
	
	/**
	 * ��ҵ���ŵĽ������������ɡ�����(I)���ڻ����10��Ԫʱ���������10%��
	 * �������10��Ԫ������20��Ԫʱ������10��Ԫ�Ĳ��ְ�10%��ɣ�����10��Ԫ�Ĳ��֣��ɿ����7.5%��
	 * 20��40��֮��ʱ������20��Ԫ�Ĳ��֣������5%��
	 * 40��60��֮��ʱ����40��Ԫ�Ĳ��֣������3%��
	 * 60��100��֮��ʱ������60��Ԫ�Ĳ��֣������1.5%��
	 * ����100��Ԫʱ������100��Ԫ�Ĳ��ְ�1%��ɣ��Ӽ������뵱��������Ӧ���Ž���������
	 */
	public static void test12() {
		double x = 0, y = 0;
		System.out.print("���뵱�������򣩣�");
		Scanner s = new Scanner(System.in);
		x = s.nextInt();
		if (x > 0 && x <= 10) {
			y = x * 0.1;
		} else if (x > 10 && x <= 20) {
			y = 10 * 0.1 + (x - 10) * 0.075;
		} else if (x > 20 && x <= 40) {
			y = 10 * 0.1 + 10 * 0.075 + (x - 20) * 0.05;
		} else if (x > 40 && x <= 60) {
			y = 10 * 0.1 + 10 * 0.075 + 20 * 0.05 + (x - 40) * 0.03;
		} else if (x > 60 && x <= 100) {
			y = 20 * 0.175 + 20 * 0.05 + 20 * 0.03 + (x - 60) * 0.015;
		} else if (x > 100) {
			y = 20 * 0.175 + 40 * 0.08 + 40 * 0.015 + (x - 100) * 0.01;
		}
		System.out.println("Ӧ����ȡ�Ľ����� " + y + "��");
	}
	
	/**
	 * һ��������������100����һ����ȫƽ�������ټ���168����һ����ȫƽ���������ʸ����Ƕ��٣�
	 * ������ѭ��Ӧ�ô�-100��ʼ���������������������������㣩���������һ��������������-99��
	 * �����ҿ����󲿷��˽������Ŀʱ�������еġ���������������������Ҳ��������ˡ�
	 */
	public static void test13() {
		for (int x = 1; x < 100000; x++) {
			if (Math.sqrt(x + 100) % 1 == 0) {
				if (Math.sqrt(x + 268) % 1 == 0) {
					System.out.println(x + "��100��һ����ȫƽ�������ټ�168����һ����ȫƽ����");
				}
			}
		}
	}
	
	/**
	 * ����ĳ��ĳ��ĳ�գ��ж���һ������һ��ĵڼ��죿
	 */
	public static void test14() {
		int year, month, day;
		int days = 0;
		int d = 0;
		int e;
		input fymd = new input();
		do {
			e = 0;
			System.out.print("�����꣺");
			year = fymd.input();
			System.out.print("�����£�");
			month = fymd.input();
			System.out.print("�����죺");
			day = fymd.input();
			if (year < 0 || month < 0 || month > 12 || day < 0 || day > 31) {
				System.out.println("����������������룡");
				e = 1;
			}
		} while (e == 1);
		for (int i = 1; i < month; i++) {
			switch (i) {
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
				days = 31;
				break;
			case 4:
			case 6:
			case 9:
			case 11:
				days = 30;
				break;
			case 2:
				if ((year % 400 == 0) || (year % 4 == 0 && year % 100 != 0)) {
					days = 29;
				} else {
					days = 28;
				}
				break;
			}
			d += days;
		}
		System.out.println(year + "-" + month + "-" + day + "������ĵ�" + (d + day)
				+ "�졣");
	}
	
	/**
	 * ������������x,y,z���������������С���������
	 */
	public static void test15() {
		input fnc = new input();
		int x = 0, y = 0, z = 0;
		System.out.print("�����һ�����֣�");
		x = fnc.input();
		System.out.print("����ڶ������֣�");
		y = fnc.input();
		System.out.print("������������֣�");
		z = fnc.input();
		if (x > y) {
			int t = x;
			x = y;
			y = t;
		}
		if (x > z) {
			int t = x;
			x = z;
			z = t;
		}
		if (y > z) {
			int t = y;
			y = z;
			z = t;
		}
		System.out.println("����������С��������Ϊ�� " + x + " " + y + " " + z);
	}
	
	/**
	 * ���9*9�ھ�
	 */
	public static void test16() {
		for (int i = 1; i < 10; i++) {
			for (int j = 1; j <= i; j++) {
				System.out.print(j + "*" + i + "=" + j * i + "    ");
				if (j * i < 10) {
					System.out.print(" ");
				}
			}
			System.out.println();
		}
	}
	
	/**
	 * ���ӳ������⣺���ӵ�һ��ժ�����ɸ����ӣ���������һ�룬����񫣬�ֶ����һ��     
	 * �ڶ��������ֽ�ʣ�µ����ӳԵ�һ�룬�ֶ����һ����
	 * �Ժ�ÿ�����϶�����ǰһ��ʣ�µ�һ����һ����
	 * ����10���������ٳ�ʱ����ֻʣ��һ�������ˡ����һ�칲ժ�˶��١� 
	 */
	public static void test17() {
		int x = 1;
		for (int i = 2; i <= 10; i++) {
			x = (x + 1) * 2;
		}
		System.out.println("���ӵ�һ��ժ�� " + x + " ������");
	}
	
	/**
	 * ����ƹ����ӽ��б������������ˡ�
	 * �׶�Ϊa,b,c���ˣ��Ҷ�Ϊx,y,z���ˡ��ѳ�ǩ��������������
	 * �������Ա����������������a˵������x�ȣ�c˵������x,z�ȣ��������ҳ��������ֵ������� 
	 */
	public static void test18() {
		char[] m = { 'a', 'b', 'c' };
		char[] n = { 'x', 'y', 'z' };
		for (int i = 0; i < m.length; i++) {
			for (int j = 0; j < n.length; j++) {
				if (m[i] == 'a' && n[j] == 'x') {
					continue;
				} else if (m[i] == 'a' && n[j] == 'y') {
					continue;
				} else if ((m[i] == 'c' && n[j] == 'x')
						|| (m[i] == 'c' && n[j] == 'z')) {
					continue;
				} else if ((m[i] == 'b' && n[j] == 'z')
						|| (m[i] == 'b' && n[j] == 'y')) {
					continue;
				} else
					System.out.println(m[i] + " vs " + n[j]);
			}
		}
	}
	
	/**
	 * ��ӡ������ͼ�������Σ�
	 *     *   
	 *    ***   
     *   *****   
     *  *******   
     *   *****   
     *    ***   
     *     *   
	 */
	public static void test19() {
		int H = 7, W = 7;// �ߺͿ��������ȵ�����
		for (int i = 0; i < (H + 1) / 2; i++) {
			for (int j = 0; j < W / 2 - i; j++) {
				System.out.print(" ");
			}
			for (int k = 1; k < (i + 1) * 2; k++) {
				System.out.print('*');
			}
			System.out.println();
		}
		for (int i = 1; i <= H / 2; i++) {
			for (int j = 1; j <= i; j++) {
				System.out.print(" ");
			}
			for (int k = 1; k <= W - 2 * i; k++) {
				System.out.print('*');
			}
			System.out.println();
		}
	}
	
	/**
	 * ��һ�������У�2/1��3/2��5/3��8/5��13/8��21/13...���������е�ǰ20��֮��
	 */
	public static void test20() {
		int x = 2, y = 1, t;
		double sum = 0;
		for (int i = 1; i <= 20; i++) {
			sum = sum + (double) x / y;
			t = y;
			y = x;
			x = y + t;
		}
		System.out.println("ǰ20�����֮���ǣ� " + sum);
	}
	
	/**
	 * ��1+2!+3!+...+20!�ĺ�
	 */
	public static void test21() {
		long sum = 0;
		long fac = 1;
		for (int i = 1; i <= 20; i++) {
			fac = fac * i;
			sum += fac;
		}
		System.out.println(sum);
	}
	
	/**
	 * ���õݹ鷽����5!
	 */
	public static void test22() {
		int n = 5;
		rec fr = new rec();
		System.out.println(n + "! = " + fr.rec(n));
	}
	
	/**
	 * ��5��������һ���ʵ�����˶����꣬��˵�ȵ�4���˴�2�ꡣ
	 * �ʵ�4������������˵�ȵ�3���˴�2�ꡣ�ʵ������ˣ���˵�ȵ�2�˴����ꡣ
	 * �ʵ�2���ˣ�˵�ȵ�һ���˴����ꡣ����ʵ�һ���ˣ���˵��10�ꡣ
	 * ���ʵ�����˶��  
	 */
	public static void test23() {
		int age = 10;
		for (int i = 2; i <= 5; i++) {
			age = age + 2;
		}
		System.out.println(age);
	}
	
	/**
	 * ��һ��������5λ����������Ҫ��һ�������Ǽ�λ�������������ӡ����λ���֡�
	 */
	public static void test24() {
		Scanner s = new Scanner(System.in);
		System.out.print("������һ����������");
		long a = s.nextLong();
		String ss = Long.toString(a);
		char[] ch = ss.toCharArray();
		int j = ch.length;
		System.out.println(a + "��һ��" + j + "λ����");
		System.out.print("����������ǣ�");
		for (int i = j - 1; i >= 0; i--) {
			System.out.print(ch[i]);
		}
	}
	
	/**
	 * һ��5λ�����ж����ǲ��ǻ���������12321�ǻ���������λ����λ��ͬ��ʮλ��ǧλ��ͬ��
	 */
	public static void test25() {
		Scanner s = new Scanner(System.in);
		int a;
		do {
			System.out.print("������һ��5λ��������");
			a = s.nextInt();
		} while (a < 10000 || a > 99999);
		String ss = String.valueOf(a);
		char[] ch = ss.toCharArray();
		if (ch[0] == ch[4] && ch[1] == ch[3]) {
			System.out.println("����һ��������");
		} else {
			System.out.println("�ⲻ��һ��������");
		}
	}
	//������ã�����λ��
	public static void test25b() {
		Scanner s = new Scanner(System.in);
		boolean is = true;
		System.out.print("������һ����������");
		long a = s.nextLong();
		String ss = Long.toString(a);
		char[] ch = ss.toCharArray();
		int j = ch.length;
		for (int i = 0; i < j / 2; i++) {
			if (ch[i] != ch[j - i - 1]) {
				is = false;
			}
		}
		if (is == true) {
			System.out.println("����һ��������");
		} else {
			System.out.println("�ⲻ��һ��������");
		}
	}
	
	/**
	 * ���������ڼ��ĵ�һ����ĸ���ж�һ�������ڼ���
	 * �����һ����ĸһ����������жϵڶ�����ĸ��
	 */
	public static void test26() {
		getChar tw = new getChar();
		System.out.println("���������ڵĵ�һ����д��ĸ��");
		char ch = tw.getChar();
		switch (ch) {
		case 'M':
			System.out.println("Monday");
			break;
		case 'W':
			System.out.println("Wednesday");
			break;
		case 'F':
			System.out.println("Friday");
			break;
		case 'T': {
			System.out.println("���������ڵĵڶ�����ĸ��");
			char ch2 = tw.getChar();
			if (ch2 == 'U') {
				System.out.println("Tuesday");
			} else if (ch2 == 'H') {
				System.out.println("Thursday");
			} else {
				System.out.println("�޴�д����");
			}
		}
			;
			break;
		case 'S': {
			System.out.println("���������ڵĵڶ�����ĸ��");
			char ch2 = tw.getChar();
			if (ch2 == 'U') {
				System.out.println("Sunday");
			} else if (ch2 == 'A') {
				System.out.println("Saturday");
			} else {
				System.out.println("�޴�д����");
			}
		}
			;
			break;
		default:
			System.out.println("�޴�д����");
		}
	}
	
	/**
	 * ��100֮�ڵ�����
	 */
	public static void test27() {
		boolean b = false;
		System.out.print(2 + " ");
		System.out.print(3 + " ");
		for (int i = 3; i < 100; i += 2) {
			for (int j = 2; j <= Math.sqrt(i); j++) {
				if (i % j == 0) {
					b = false;
					break;
				} else {
					b = true;
				}
			}
			if (b == true) {
				System.out.print(i + " ");
			}
		}
	}
	//�ó���ʹ�ó�1λ������2λ����������Ч�ʸ�ͨ���Բ�
	public static void test27b() {
		int[] a = new int[] { 2, 3, 5, 7 };
		for (int j = 0; j < 4; j++)
			System.out.print(a[j] + " ");
		boolean b = false;
		for (int i = 11; i < 100; i += 2) {
			for (int j = 0; j < 4; j++) {
				if (i % a[j] == 0) {
					b = false;
					break;
				} else {
					b = true;
				}
			}
			if (b == true) {
				System.out.print(i + " ");
			}
		}
	}
	
	/**
	 * ��10������������
	 */
	public static void test28() {
		Scanner s = new Scanner(System.in);
		int[] a = new int[10];
		System.out.println("������10��������");
		for (int i = 0; i < 10; i++) {
			a[i] = s.nextInt();
		}
		for (int i = 0; i < 10; i++) {
			for (int j = i + 1; j < 10; j++) {
				if (a[i] > a[j]) {
					int t = a[i];
					a[i] = a[j];
					a[j] = t;
				}
			}
		}
		for (int i = 0; i < 10; i++) {
			System.out.print(a[i] + " ");
		}
	}
	
	/**
	 * ��һ��3*3����Խ���Ԫ��֮�� 
	 */
	public static void test29() {
		Scanner s = new Scanner(System.in);
		int[][] a = new int[3][3];
		System.out.println("������9��������");
		for (int i = 0; i < 3; i++) {
			for (int j = 0; j < 3; j++) {
				a[i][j] = s.nextInt();
			}
		}
		System.out.println("�����3 * 3 ������:");
		for (int i = 0; i < 3; i++) {
			for (int j = 0; j < 3; j++) {
				System.out.print(a[i][j] + " ");
			}
			System.out.println();
		}
		int sum = 0;
		for (int i = 0; i < 3; i++) {
			for (int j = 0; j < 3; j++) {
				if (i == j) {
					sum += a[i][j];
				}
			}
		}
		System.out.println("�Խ���֮���ǣ�" + sum);
	}
	
	/**
	 * ��һ���Ѿ��ź�������顣������һ������Ҫ��ԭ���Ĺ��ɽ������������С�
	 */
	public static void test30() {
		//�˳��򲻺ã�û��ʹ���۰���Ҳ���
		int[] a = new int[] { 1, 2, 6, 14, 25, 36, 37, 55 };
		int[] b = new int[a.length + 1];
		int i = 0;
		Scanner s = new Scanner(System.in);
		System.out.print("������һ��������");
		int num = s.nextInt();
		if (num >= a[a.length - 1]) {
			b[b.length - 1] = num;
			for (i = 0; i < a.length; i++) {
				b[i] = a[i];
			}
		} else {
			for (i = 0; i < a.length; i++) {
				if (num >= a[i]) {
					b[i] = a[i];
				} else {
					b[i] = num;
					break;
				}
			}
			for (int j = i + 1; j < b.length; j++) {
				b[j] = a[j - 1];
			}
		}
		for (i = 0; i < b.length; i++) {
			System.out.print(b[i] + " ");
		}
	}
	
	/**
	 * ��һ�������������
	 */
	public static void test31() {
		Scanner s = new Scanner(System.in);
		int a[] = new int[20];
		System.out.println("��������������������-1��ʾ��������");
		int i = 0, j;
		do {
			a[i] = s.nextInt();
			i++;
		} while (a[i - 1] != -1);
		System.out.println("�����������Ϊ��");
		for (j = 0; j < i - 1; j++) {
			System.out.print(a[j] + "   ");
		}
		System.out.println("\n�����������Ϊ��");
		for (j = i - 2; j >= 0; j = j - 1) {
			System.out.print(a[j] + "   ");
		}
	}
	
	/**
	 * ȡһ������a���Ҷ˿�ʼ��4��7λ
	 */
	public static void test32() {
		Scanner s = new Scanner(System.in);
		System.out.print("������һ��7λ���ϵ���������");
		long a = s.nextLong();
		String ss = Long.toString(a);
		char[] ch = ss.toCharArray();
		int j = ch.length;
		if (j < 7) {
			System.out.println("�������");
		} else {
			System.out.println("��ȡ���Ҷ˿�ʼ��4��7λ�ǣ�" + ch[j - 7] + ch[j - 6]
					+ ch[j - 5] + ch[j - 4]);
		}
	}
	
	/**
	 * ��ӡ�����������(Ҫ���ӡ��10��)
	 */
	public static void test33() {
		int[][] a = new int[10][10];
		for (int i = 0; i < 10; i++) {
			a[i][i] = 1;
			a[i][0] = 1;
		}
		for (int i = 2; i < 10; i++) {
			for (int j = 1; j < i; j++) {
				a[i][j] = a[i - 1][j - 1] + a[i - 1][j];
			}
		}
		for (int i = 0; i < 10; i++) {
			for (int k = 0; k < 2 * (10 - i) - 1; k++) {
				System.out.print(" ");
			}
			for (int j = 0; j <= i; j++) {
				System.out.print(a[i][j] + "   ");
			}
			System.out.println();
		}
	}
	
	/**
	 * ����3����a,b,c������С˳�������
	 */
	public static void test34() {
		Scanner s = new Scanner(System.in);
		System.out.println("������3��������");
		int a = s.nextInt();
		int b = s.nextInt();
		int c = s.nextInt();
		if (a < b) {
			int t = a;
			a = b;
			b = t;
		}
		if (a < c) {
			int t = a;
			a = c;
			c = t;
		}
		if (b < c) {
			int t = b;
			b = c;
			c = t;
		}
		System.out.println("�Ӵ�С��˳�����:");
		System.out.println(a + " " + b + " " + c);
	}
	
	/**
	 * �������飬�������һ��Ԫ�ؽ�������С�������һ��Ԫ�ؽ������������
	 */
	public static void test35() {
		int N = 8;
		int[] a = new int[N];
		Scanner s = new Scanner(System.in);
		int idx1 = 0, idx2 = 0;
		System.out.println("������8��������");
		for (int i = 0; i < N; i++) {
			a[i] = s.nextInt();
		}
		System.out.println("�����������Ϊ��");
		for (int i = 0; i < N; i++) {
			System.out.print(a[i] + " ");
		}
		int max = a[0], min = a[0];
		for (int i = 0; i < N; i++) {
			if (a[i] > max) {
				max = a[i];
				idx1 = i;
			}
			if (a[i] < min) {
				min = a[i];
				idx2 = i;
			}
		}
		if (idx1 != 0) {
			int temp = a[0];
			a[0] = a[idx1];
			a[idx1] = temp;
		}
		if (idx2 != N - 1) {
			int temp = a[N - 1];
			a[N - 1] = a[idx2];
			a[idx2] = temp;
		}
		System.out.println("\n�����������Ϊ��");
		for (int i = 0; i < N; i++) {
			System.out.print(a[i] + " ");
		}
	}
	
	/**
	 * ��n��������ʹ��ǰ�����˳�������m��λ�ã����m���������ǰ���m����
	 */
	public static void test36() {
		int N = 10;
		int[] a = new int[N];
		Scanner s = new Scanner(System.in);
		System.out.println("������10��������");
		for (int i = 0; i < N; i++) {
			a[i] = s.nextInt();
		}
		System.out.print("�����������Ϊ��");
		for (int i = 0; i < N; i++) {
			System.out.print(a[i] + " ");
		}
		System.out.print("\n����������ƶ���λ����");
		int m = s.nextInt();
		int[] b = new int[m];
		for (int i = 0; i < m; i++) {
			b[i] = a[N - m + i];
		}
		for (int i = N - 1; i >= m; i--) {
			a[i] = a[i - m];
		}
		for (int i = 0; i < m; i++) {
			a[i] = b[i];
		}
		System.out.print("λ�ƺ�������ǣ�");
		for (int i = 0; i < N; i++) {
			System.out.print(a[i] + " ");
		}
	}
	
	/**
	 * ��n����Χ��һȦ��˳���źš��ӵ�һ���˿�ʼ��������1��3��������
	 * ������3�����˳�Ȧ�ӣ���������µ���ԭ���ڼ��ŵ���λ
	 */
	public static void test37() {
		Scanner s = new Scanner(System.in);
		System.out.print("�������ų�һȦ��������");
		int n = s.nextInt();
		boolean[] arr = new boolean[n];
		for (int i = 0; i < arr.length; i++) {
			arr[i] = true;
		}
		int leftCount = n;
		int countNum = 0;
		int index = 0;
		while (leftCount > 1) {
			if (arr[index] == true) {
				countNum++;
				if (countNum == 3) {
					countNum = 0;
					arr[index] = false;
					leftCount--;
				}
			}
			index++;
			if (index == n) {
				index = 0;
			}
		}
		for (int i = 0; i < n; i++) {
			if (arr[i] == true) {
				System.out.println("ԭ���ڵ�" + (i + 1) + "λ���������ˡ�");
			}
		}
	}
	
	/**
	 * дһ����������һ���ַ����ĳ��ȣ���main�����������ַ�����������䳤��
	 */
	public static void test38() {
		Scanner s = new Scanner(System.in);
		System.out.println("������һ���ַ�����");
		String str = s.nextLine();
		System.out.println("�ַ����ĳ����ǣ�" + str.length());
	}
	
	/**
	 * ��дһ������������nΪż��ʱ�����ú�����1/2+1/4+...+1/n,������nΪ����ʱ�����ú���1/1+1/3+...+1/n(����ָ�뺯��) 
	 */
	public static void test39() {
		Scanner s = new Scanner(System.in);
		System.out.print("������һ�������� n= ");
		int n = s.nextInt();
		System.out.println("��Ӧ���еĺ�Ϊ��" + sum(n));
	}
	public static double sum(int n) {
		double res = 0;
		if (n % 2 == 0) {
			for (int i = 2; i <= n; i += 2) {
				res += (double) 1 / i;
			}
		} else {
			for (int i = 1; i <= n; i += 2) {
				res += (double) 1 / i;
			}
		}
		return res;
	}
	
	/**
	 * �ַ�������
	 */
	public static void test40() {
		int N = 5;
		String temp = null;
		String[] s = new String[N];
		s[0] = "matter";
		s[1] = "state";
		s[2] = "solid";
		s[3] = "liquid";
		s[4] = "gas";
		for (int i = 0; i < N; i++) {
			for (int j = i + 1; j < N; j++) {
				if (compare(s[i], s[j]) == false) {
					temp = s[i];
					s[i] = s[j];
					s[j] = temp;
				}
			}
		}
		for (int i = 0; i < N; i++) {
			System.out.println(s[i]);
		}
	}
	static boolean compare(String s1, String s2) {
		boolean result = true;
		for (int i = 0; i < s1.length() && i < s2.length(); i++) {
			if (s1.charAt(i) > s2.charAt(i)) {
				result = false;
				break;
			} else if (s1.charAt(i) < s2.charAt(i)) {
				result = true;
				break;
			} else {
				if (s1.length() < s2.length()) {
					result = true;
				} else {
					result = false;
				}
			}
		}
		return result;
	}
	
	/**
	 * ��̲����һ�����ӣ���ֻ�������֡�
	 * ��һֻ���Ӱ��������ƾ�ݷ�Ϊ��ݣ�����һ������ֻ���ӰѶ��һ�����뺣�У�������һ�ݡ�
	 * �ڶ�ֻ���Ӱ�ʣ�µ�������ƽ���ֳ���ݣ��ֶ���һ������ͬ���Ѷ��һ�����뺣�У�������һ�ݣ�
	 * ���������ġ�����ֻ���Ӷ����������ģ��ʺ�̲��ԭ�������ж��ٸ����ӣ�
	 */
	public static void test41() {
		int i, m, j = 0, k, count;
		for (i = 4; i < 10000; i += 4) {
			count = 0;
			m = i;
			for (k = 0; k < 5; k++) {
				j = i / 4 * 5 + 1;
				i = j;
				if (j % 4 == 0)
					count++;
				else
					break;
			}
			i = m;
			if (count == 4) {
				System.out.println("ԭ������ " + j + " ��");
				break;
			}
		}
	}
	
	/**
	 * 809*??=800*??+9*??+1    
	 * ����??�������λ��,8*??�Ľ��Ϊ��λ����9*??�Ľ��Ϊ3λ����
	 * ��??�������λ������809*??��Ľ����
	 */
	public static void test42() {
		// ��Ŀ���ˣ�809x=800x+9x+1 �����ķ����޽⡣ȥ���Ǹ�1���н��ˡ�
		int a = 809, b, i;
		for (i = 10; i < 13; i++) {
			b = i * a;
			if (8 * i < 100 && 9 * i >= 100)
				System.out.println("809*" + i + "=" + "800*" + i + "+" + "9*"
						+ i + "=" + b);
		}
	}
	
	/**
	 * ��0��7������ɵ�����������
	 * ���1λ����4����
	 * ���2λ����7*4����
	 * ���3λ����7*8*4����
	 * ���4λ����7*8*8*4����
	 * ......
	 */
	public static void test43() {
		int sum = 4;
		int j;
		System.out.println("���1λ���� " + sum + " ��");
		sum = sum * 7;
		System.out.println("���2λ���� " + sum + " ��");
		for (j = 3; j <= 9; j++) {
			sum = sum * 8;
			System.out.println("���" + j + "λ���� " + sum + " ��");
		}
	}
	
	/**
	 * һ��ż�����ܱ�ʾΪ��������֮��
	 */
	public static void test44() {
		//�����ó�sqrt(n)�ķ������������������2��3��
		//������ж��Ƿ���������������Ϊ�����һ��3��
		Scanner s = new Scanner(System.in);
		int n, i;
		do {
			System.out.print("������һ�����ڵ���6��ż����");
			n = s.nextInt();
		} while (n < 6 || n % 2 != 0); // �ж������Ƿ���>=6ż��,����,��������
		fun fc = new fun();
		for (i = 2; i <= n / 2; i++) {
			if ((fc.fun(i)) == 1 && (fc.fun(n - i) == 1)) {
				int j = n - i;
				System.out.println(n + " = " + i + " + " + j);
			} // ������п��ܵ�������
		}
	}
	public static void test44b() {
		Scanner s = new Scanner(System.in);
		int n;
		do {
			System.out.print("������һ�����ڵ���6��ż����");
			n = s.nextInt();
		} while (n < 6 || n % 2 != 0); // �ж������Ƿ���>=6ż��,����,��������
		for (int i = 3; i <= n / 2; i += 2) {
			if (fun(i) && fun(n - i)) {
				System.out.println(n + " = " + i + " + " + (n - i));
			} // ������п��ܵ�������
		}
	}
	static boolean fun(int a) { // �ж��Ƿ��������ĺ���
		boolean flag = false;
		if (a == 3) {
			flag = true;
			return (flag);
		}
		for (int i = 2; i <= Math.sqrt(a); i++) {
			if (a % i == 0) {
				flag = false;
				break;
			} else
				flag = true;
		}
		return (flag);
	}
	
	/**
	 * �ж�һ�������ܱ�����9����
	 */
	public static void test45() {
		//��Ŀ���˰ɣ��ܱ�9�����ľͲ��������ˣ����Ըĳ������ˡ�
		Scanner s = new Scanner(System.in);
		System.out.print("������һ��������");
		int num = s.nextInt();
		int tmp = num;
		int count = 0;
		for (; tmp % 9 == 0;) {
			tmp = tmp / 9;
			count++;
		}
		System.out.println(num + " �ܹ��� " + count + " ��9������");
	}
	
	/**
	 * �����ַ������ӳ���
	 */
	public static void test46() {
		Scanner s = new Scanner(System.in);
		System.out.print("������һ���ַ�����");
		String str1 = s.nextLine();
		System.out.print("��������һ���ַ�����");
		String str2 = s.nextLine();
		String str = str1 + str2;
		System.out.println("���Ӻ���ַ����ǣ�" + str);
	}
	
	/**
	 * ��ȡ7������1��50��������ֵ��ÿ��ȡһ��ֵ�������ӡ����ֵ������*
	 */
	public static void test47() {
		Scanner s = new Scanner(System.in);
		int n = 1, num;
		while (n <= 7) {
			do {
				System.out.print("������һ��1--50֮���������");
				num = s.nextInt();
			} while (num < 1 || num > 50);
			for (int i = 1; i <= num; i++) {
				System.out.print("*");
			}
			System.out.println();
			n++;
		}
	}
	
	/**
	 * ĳ����˾���ù��õ绰�������ݣ���������λ��������
	 * �ڴ��ݹ������Ǽ��ܵģ����ܹ������£�
	 * ÿλ���ֶ�����5,Ȼ���úͳ���10��������������֣��ٽ���һλ�͵���λ�������ڶ�λ�͵���λ����
	 */
	public static void test48() {
		Scanner s = new Scanner(System.in);
		int num = 0, temp;
		do {
			System.out.print("������һ��4λ��������");
			num = s.nextInt();
		} while (num < 1000 || num > 9999);
		int a[] = new int[4];
		a[0] = num / 1000; // ȡǧλ������
		a[1] = (num / 100) % 10; // ȡ��λ������
		a[2] = (num / 10) % 10; // ȡʮλ������
		a[3] = num % 10; // ȡ��λ������
		for (int j = 0; j < 4; j++) {
			a[j] += 5;
			a[j] %= 10;
		}
		for (int j = 0; j <= 1; j++) {
			temp = a[j];
			a[j] = a[3 - j];
			a[3 - j] = temp;
		}
		System.out.print("���ܺ������Ϊ��");
		for (int j = 0; j < 4; j++)
			System.out.print(a[j]);
	}
	
	/**
	 * �����ַ������Ӵ����ֵĴ��� 
	 */
	public static void test49() {
		Scanner s = new Scanner(System.in);
		System.out.print("�������ַ�����");
		String str1 = s.nextLine();
		System.out.print("�������Ӵ���");
		String str2 = s.nextLine();
		int count = 0;
		if (str1.equals("") || str2.equals("")) {
			System.out.println("��û�������ַ������Ӵ�,�޷��Ƚ�!");
			System.exit(0);
		} else {
			for (int i = 0; i <= str1.length() - str2.length(); i++) {
				if (str2.equals(str1.substring(i, str2.length() + i)))
					// ���ֱȷ������⣬���"aaa"������2��"aa"�Ӵ���
					count++;
			}
			System.out.println("�Ӵ����ַ����г���: " + count + " ��");
		}
	}
	
	/**
	 * �����ѧ����ÿ��ѧ����3�ſεĳɼ����Ӽ���������������(����ѧ���ţ����������ſγɼ���
	 * �����ƽ���ɼ�����ԭ�е����ݺͼ������ƽ����������ڴ����ļ� "stud "�С�
	 */
	public static void test50() {
		Scanner ss = new Scanner(System.in);
		String[][] a = new String[5][6];
		for (int i = 1; i < 6; i++) {
			System.out.print("�������" + i + "��ѧ����ѧ�ţ�");
			a[i - 1][0] = ss.nextLine();
			System.out.print("�������" + i + "��ѧ����������");
			a[i - 1][1] = ss.nextLine();
			for (int j = 1; j < 4; j++) {
				System.out.print("�������ѧ���ĵ�" + j + "���ɼ���");
				a[i - 1][j + 1] = ss.nextLine();
			}
			System.out.println("\n");
		}
		// ���¼���ƽ����
		float avg;
		int sum;
		for (int i = 0; i < 5; i++) {
			sum = 0;
			for (int j = 2; j < 5; j++) {
				sum = sum + Integer.parseInt(a[i][j]);
			}
			avg = (float) sum / 3;
			a[i][5] = String.valueOf(avg);
		}
		// ����д�����ļ�
		String s1;
		try {
			File f = new File("C:\\stud");
			if (f.exists()) {
				System.out.println("�ļ�����");
			} else {
				System.out.println("�ļ������ڣ����ڴ����ļ�");
				f.createNewFile();// �������򴴽�
			}
			BufferedWriter output = new BufferedWriter(new FileWriter(f));
			for (int i = 0; i < 5; i++) {
				for (int j = 0; j < 6; j++) {
					s1 = a[i][j] + "\r\n";
					output.write(s1);
				}
			}
			output.close();
			System.out.println("������д��c���ļ�stud�У�");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}

class deff {
	public int deff(int x, int y) {
		int t;
		if (x < y) {
			t = x;
			x = y;
			y = t;
		}
		while (y != 0) {
			if (x == y)
				return x;
			else {
				int k = x % y;
				x = y;
				y = k;
			}
		}
		return x;
	}
} 

class input {
	public int input() {
		int value = 0;
		Scanner s = new Scanner(System.in);
		value = s.nextInt();
		return value;
	}
}

class rec {
	public long rec(int n) {
		long value = 0;
		if (n == 1) {
			value = 1;
		} else {
			value = n * rec(n - 1);
		}
		return value;
	}
} 

class getChar {
	public char getChar() {
		Scanner s = new Scanner(System.in);
		String str = s.nextLine();
		char ch = str.charAt(0);
		if (ch < 'A' || ch > 'Z') {
			System.out.println("�����������������");
			ch = getChar();
		}
		return ch;
	}
}  

class fun {
	public int fun(int a) // �ж��Ƿ��������ĺ���
	{
		int i, flag = 0;
		if (a == 3) {
			flag = 1;
			return (flag);
		}
		for (i = 2; i <= Math.sqrt(a); i++) {
			if (a % i == 0) {
				flag = 0;
				break;
			} else
				flag = 1;
		}
		return (flag);// ��������,����0,������,����1
	}
}

