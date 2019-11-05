package com.colin.datastructure.tree;

/**
 * 线索二叉树的二叉链表结点结构定义 在实际问题中，
 * 如果所用的二叉树需经常遍历或查找结点时需要某种遍历序列中的前驱和后继，那么采用线索二叉链表的存储结构就是非常不错的选择。
 * 
 * @author Colin Chen
 * @create 2019年3月16日 下午10:58:59
 * @modify 2019年3月16日 下午10:58:59
 * @version A.1
 */
public class SCClueNode {
	private Object data; // 结点数据
	private SCClueNode lNode; // 左孩子（前驱）结点
	private SCClueNode rNode; // 右孩子（后继）结点
	private boolean isLChild; // 左结点是孩子还是前驱
	private boolean isRChild; // 右结点是孩子还是后继

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public SCClueNode getlNode() {
		return lNode;
	}

	public void setlNode(SCClueNode lNode) {
		this.lNode = lNode;
	}

	public SCClueNode getrNode() {
		return rNode;
	}

	public void setrNode(SCClueNode rNode) {
		this.rNode = rNode;
	}

	public boolean isLChild() {
		return isLChild;
	}

	public void setLChild(boolean isLChild) {
		this.isLChild = isLChild;
	}

	public boolean isRChild() {
		return isRChild;
	}

	public void setRChild(boolean isRChild) {
		this.isRChild = isRChild;
	}
}
