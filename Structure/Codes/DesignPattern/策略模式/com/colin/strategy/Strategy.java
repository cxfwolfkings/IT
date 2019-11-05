package com.colin.strategy;

/**
 *  The public interface to support varies arithmetic
 *  抽象策略角色
 */
public interface Strategy {
    public void drawText(String s, int lineWidth, int lineCount);
}