package com.colin.chain;

/**
 *  The end of the chain
 *  The resposibility of Others is handle exeception 
 *  具体处理者角色（最后一位）
 */
public class Others implements Chain {
    private Chain nextChain = null; 
    public Others() {
    }
    public void addChain(Chain c) {
        nextChain = c;
    }
    public Chain getChain() {
        return nextChain;
    }
    public void sendToChain(String mesg) {
            System.out.println("No one can handle -->  " + mesg);
    }
}