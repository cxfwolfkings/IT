package com.colin.datastructure.tree;

/**
 * 二叉树的二叉链表结点结构定义，如果再增加一个指向双亲的结点则称为三叉链表
 * 
 * @author Colin Chen
 * @create 2019年3月16日 下午10:58:59
 * @modify 2019年3月16日 下午10:58:59
 * @version A.1
 */
public class SCNode {
	private Object data; // 结点数据
	private SCNode lChild; // 左孩子结点
	private SCNode rChild; // 右孩子结点

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public SCNode getlChild() {
		return lChild;
	}

	public void setlChild(SCNode lChild) {
		this.lChild = lChild;
	}

	public SCNode getrChild() {
		return rChild;
	}

	public void setrChild(SCNode rChild) {
		this.rChild = rChild;
	}
}
