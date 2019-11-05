package com.colin.datastructure.list.stack;

/**
 * 
 * @author  Colin Chen
 * @create  2019年5月21日 上午4:58:52
 * @modify  2019年5月21日 上午4:58:52
 * @version A.1
 */
public class StackDemo {
	public static void main(String[] args){
        
    }

	/**
	 * 顺序栈示例
	 */
	public static void test1() {
		SeqStack<String> s = new SeqStack<>();
        s.push("A");
        s.push("B");
        s.push("C");
        System.out.println("size->" + s.size());
        int l = s.size(); // size 在减少，必须先记录
        for (int i = 0; i < l; i++){
            System.out.println("s.pop->" + s.pop());
        }

        System.out.println("s.peek->" + s.peek());
	}
	
	/**
	 * 链式栈示例
	 */
	public static void test2() {
		LinkedStack<String> sl = new LinkedStack<>();
        sl.push("A");
        sl.push("B");
        sl.push("C");
        int length = sl.size();
        for (int i = 0; i < length; i++) {
            System.out.println("sl.pop->" + sl.pop());
        }
	}
}
