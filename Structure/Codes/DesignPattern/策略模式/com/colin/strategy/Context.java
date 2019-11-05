package com.colin.strategy;

/**
 *  The context user used
 *  算法使用环境角色
 */
public class Context  {
    private Strategy strategy = null;
    private int lineWidth;
    private int lineCount;
    private String text;
    
    public Context() {
        lineWidth = 10;
        lineCount = 0;
    }
    public void setStrategy(Strategy s) {
        if(s != null) {
            strategy = s;
        }
    }
    public void drawText() {
        strategy.drawText(text, lineWidth, lineCount);
    }
    public void setText(String str) {
        text = str;
    }
    public void setLineWidth(int width) {
        lineWidth = width;
    }
    public void setLineCount(int count) {
        lineCount = count;
    }
    public String getText() {
        return text;
    }
}