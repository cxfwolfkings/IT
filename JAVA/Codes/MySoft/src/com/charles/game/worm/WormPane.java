package com.charles.game.worm;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

public class WormPane {
	private Set<Node> foods = new HashSet<Node>();
	private Worm worm;
	private int rows = 15;
	private int cols = 40;

	public WormPane() {
		worm = new Worm();
		initFoods(5);
	}

	public void initFoods(int n) {
		Random random = new Random();
		while (true) {
			int i = random.nextInt(rows - 2) + 1;
			int j = random.nextInt(cols - 2) + 1;
			if (worm.contains(i, j))
				continue;
			Node food = new Node(i, j);
			foods.add(food);
			if (foods.size() == n)
				break;
		}
	}

	public Worm getWorm() {
		return worm;
	}

	// 面板输出
	public void print() {
		for (int i = 0; i < rows; i++) {
			for (int j = 0; j < cols; j++) {
				if (worm.contains(i, j)) {
					System.out.print("#");
				} else if (i == 0 || i == rows - 1) {
					System.out.print("-");
				} else if (foods.contains(new Node(i, j))) {
					System.out.print("o");
				} else if (j == 0 || j == cols - 1) {
					System.out.print("|");
				} else {
					System.out.print(" ");
				}
			}
			System.out.println();
		}
	}

	public class Worm {
		public static final int UP = -10;
		public static final int DOWN = 10;
		public static final int LEFT = -1;
		public static final int RIGHT = 1;
		private List<Node> nodes = new ArrayList<Node>();
		private int dir;

		public Worm() {
			nodes.add(new Node(3, 9));
			nodes.add(new Node(4, 9));
			nodes.add(new Node(5, 9));
			nodes.add(new Node(5, 10));
			nodes.add(new Node(5, 11));
			nodes.add(new Node(6, 11));
			nodes.add(new Node(7, 11));
			this.dir = RIGHT;
		}

		public int getDir() {
			return dir;
		}

		public void setDir(int dir) {
			this.dir = dir;
		}

		public List<Node> getNodes() {
			return nodes;
		}

		public void setNodes(List<Node> nodes) {
			this.nodes = nodes;
		}

		public void step() {
			Node head = nodes.get(0);
			int i = head.getI() + this.dir / 10;
			int j = head.getJ() + this.dir % 10;
			if (i == 0 || i == rows-1 || j == 0 || j == cols-1) {
				throw new RuntimeException("撞墙啦");
			}
			head = new Node(i, j);
			nodes.add(0, head);
			if (foods.remove(head)) {
				initFoods(5);
				return;
			}
			if (foods.contains(head)) {
				foods.remove(head);
				return;
			}
			nodes.remove(nodes.size() - 1);
		}

		public void step(int dir) {
			if (this.dir + dir == 0) {
				throw new RuntimeException("不能反向行走");
			}
			this.dir = dir;
			step();
		}

		public boolean contains(int i, int j) {
			return nodes.contains(new Node(i, j));
		}

		@Override
		public String toString() {
			return nodes.toString();
		}
	}
}
