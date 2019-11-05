package com.colin.chain;

/**
 *  The interface of the chain
 *  You can use AddChain function to modify the chain dynamically
 *  抽象处理者角色
 */
public interface Chain  {
    public abstract void addChain(Chain c);
    public abstract void sendToChain(String mesg);
    public abstract Chain getChain();
}