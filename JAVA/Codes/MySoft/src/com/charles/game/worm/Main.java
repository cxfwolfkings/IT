package com.charles.game.worm;

import java.util.Scanner;

import com.charles.game.worm.WormPane.Worm;

public class Main {
	public static void main(String[] args) {
		WormPane pane = new WormPane();
		Worm worm = pane.getWorm();
		Scanner sc = new Scanner(System.in);
		while (true) {
			pane.print();
			System.out.println(worm);
			String cmd = sc.nextLine();
			if ("w".equalsIgnoreCase(cmd)) {
				worm.step(Worm.UP);
			} else if ("s".equalsIgnoreCase(cmd)) {
				worm.step(Worm.DOWN);
			} else if ("a".equalsIgnoreCase(cmd)) {
				worm.step(Worm.LEFT);
			} else if ("d".equalsIgnoreCase(cmd)) {
				worm.step(Worm.RIGHT);
			} else if ("q".equalsIgnoreCase(cmd)) {
				System.out.println("c u");
				break;
			} else {
				worm.step();
			}
		}
		sc.close();
	}
}
