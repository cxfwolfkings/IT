package com.charles.game.worm;

public class Node {
	private int i;
	private int j;

	public Node() {}

	public Node(int i, int j) {
		super();
		this.i = i;
		this.j = j;
	}

	public int getI() {
		return i;
	}

	public void setI(int i) {
		this.i = i;
	}

	public int getJ() {
		return j;
	}

	public void setJ(int j) {
		this.j = j;
	}

	@Override
	public String toString() {
		return "[" + i + "," + j + "]";
	}

	@Override
	public boolean equals(Object obj) {
		if (obj == null)
			return false;
		if (obj == this)
			return true;
		if (obj instanceof Node) {
			Node o = (Node) obj;
			return this.i == o.i && this.j == o.j;
		}
		return false;
	}

	@Override
	public int hashCode() {
		return i * 1000 + j;
	}
}
