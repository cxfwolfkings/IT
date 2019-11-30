package com.colin.datastructure.list.stack;

import java.io.Serializable;
import java.util.Stack;

/**
 * 栈的链式实现
 * 
 * @author  Colin Chen
 * @create  2019年5月21日 上午5:27:43
 * @modify  2019年5月21日 上午5:27:43
 * @version A.1
 */
public class LinkedStack<T> extends Stack<T> implements Serializable{
	private static final long serialVersionUID = 1911829302658328353L;

    private Node<T> top;

    private int size;

    public LinkedStack(){
        this.top = new Node<T>();
    }

    public int size(){
        return size;
    }

    @Override
    public boolean isEmpty() {
        return top == null || top.data == null;
    }

    @Override
    public T push(T data) {
        if (data == null){
            try {
				throw new StackException("data can\'t be null");
			} catch (StackException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        }
        if(this.top == null) { // 调用 pop() 后 top 可能为 null
            this.top = new Node<T>(data);
        } else if (this.top.data == null){
            this.top.data = data;
        }else {
            Node<T> p = new Node<T>(data, this.top);
            top = p; // 更新栈顶
        }
        size++;
        return data;
    }

    @Override
    public T peek()  {
        if(isEmpty()){
            try {
				throw new EmptyStackException("Stack empty");
			} catch (EmptyStackException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        }

        return top.data;
    }

    @Override
    public T pop() {
        if(isEmpty()){
            try {
				throw new EmptyStackException("Stack empty");
			} catch (EmptyStackException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        }

        T data = top.data;
        top = top.next;
        size--;
        return data;
    }

}

class Node<T> {
	T data;
	Node<T> next;
	
	public Node() {
		this.data = null;
	}
	
	public Node(T d) {
		this.data = d;
	}
	
	public Node(T d, Node<T> n) {
		this.data = d;
		this.next = n;
	}
}

class StackException extends Exception {
	private static final long serialVersionUID = 3328207731423399383L;
	
	public StackException(String string) {
		// TODO Auto-generated constructor stub
		super(string);
	}
}

class EmptyStackException extends Exception {
	private static final long serialVersionUID = -3686071954060906999L;
	
	public EmptyStackException(String string) {
		// TODO Auto-generated constructor stub
		super(string);
	}
}
