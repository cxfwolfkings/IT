package com.colin.datastructure;

import com.colin.datastructure.tree.SCClueNode;
import com.colin.datastructure.tree.SCNode;

/**
 * 二叉树帮助程序
 * @author  Colin Chen
 * @create  2019年3月16日 下午10:57:48
 * @modify  2019年3月16日 下午10:57:48
 * @version A.1
 */
public class SCTreeHelper {
	/**
	 * 二叉树的前序遍历递归算法
	 * @param node 节点
	 */
    public void PreOrderTraverse(SCNode node) {
    	if(node == null) {
    		return;
    	}
    	// 显示结点数据，可以更改为其它自定义操作
    	System.out.println(node); 
    	// 先遍历左子树
    	PreOrderTraverse(node.getlChild());
    	// 再遍历右子树
    	PreOrderTraverse(node.getrChild());
    }
    
    /**
	 * 二叉树的中序遍历递归算法
	 * @param node 节点
	 */
    public void InOrderTraverse(SCNode node) {
    	if(node == null) {
    		return;
    	}
    	// 先遍历左子树
    	InOrderTraverse(node.getlChild());
    	// 显示结点数据，可以更改为其它自定义操作
    	System.out.println(node); 
    	// 再遍历右子树
    	InOrderTraverse(node.getrChild());
    }
    
    /**
	 * 二叉树的后序遍历递归算法
	 * @param node 节点
	 */
    public void PostOrderTraverse(SCNode node) {
    	if(node == null) {
    		return;
    	}
    	// 先遍历左子树
    	InOrderTraverse(node.getlChild());
    	// 再遍历右子树
    	InOrderTraverse(node.getrChild());
    	// 显示结点数据，可以更改为其它自定义操作
    	System.out.println(node); 
    }
    
    // 前序序列的当前索引值
    int preOrderQueueIndex = 0;
    /**
     * 根据前序序列创建二叉树
     * 示例：AB#D##C##
     * @param PreOrderQueue 前序序列
     */
    public SCNode CreateSCTree(String PreOrderQueue) {
    	char letter = PreOrderQueue.charAt(preOrderQueueIndex);
    	if (preOrderQueueIndex == PreOrderQueue.length() - 1) { // 序列结尾，一定是#
    		// 重置序列
    		preOrderQueueIndex = 0;
    		// 退出
    		return null;
    	}
		// 序列自增1
    	preOrderQueueIndex++;
		if (letter != '#') { // #代表空结点，只做占位符用
			// 创建节点
			SCNode node = new SCNode();
			// 设置数据，可以客制化
			node.setData(letter);
			// 创建左子结点
			node.setlChild(CreateSCTree(PreOrderQueue));
			// 创建右子结点
			node.setlChild(CreateSCTree(PreOrderQueue));
			return node;
		}
		return null;
    }
    
    // 全局变量，中序线索化时刚刚遍历过的结点
    public SCClueNode preClueNode;
    /**
     * 中序遍历线索化
     * @param node 已经创建好的树结构
     */
    public void InOrderClue(SCClueNode node) {
        if (node != null) {
        	InOrderClue(node.getlNode()); // 递归左子树线索化
        	if (node.getlNode() == null) { // 没有有左孩子
        		node.setLChild(false);
        		node.setlNode(preClueNode); // 第一个结点没有左孩子也没有前驱
        	}
        	if (preClueNode != null && preClueNode.getrNode() == null) { // 前驱没有右孩子
        		preClueNode.setRChild(false);
        		preClueNode.setrNode(node); 
        	}
        	preClueNode = node;
        	InOrderClue(node.getrNode()); // 递归右子树线索化
        }
    }
    
    /**
     * node指向头结点，头结点左链lchild指向根结点，头结点右链rchild指向中序遍历的最后一个结点。中序遍历二叉线索链表示的二叉树
     * @param node
     */
    public void InOrderTraverseCLue(SCClueNode head) {
    	SCClueNode node = head.getlNode(); // 获取根结点
    	while(node != head) {
    		while(node.isLChild()) { // 如果有左子结点，循环到第一个结点
    			node = node.getlNode();
    		}
    		System.out.println(node.getData()); // 显示结点数据，可以客制化
    		while(!node.isRChild() && node.getrNode() != head) { // 如果是后继结点则显示
    			node = node.getrNode();
    			System.out.println(node.getData());
    		}
    		node = node.getrNode(); // 推进至其右子树根
    	}
    }
}
