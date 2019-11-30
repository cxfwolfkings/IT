package com.colin.strategy;

/**
 * 具体策略角色
 * @author  Charles
 * @date    2016年2月28日 上午6:32:40
 * @version A.1
 */
public class StrategyB implements Strategy {
    public StrategyB() {
    }
    public void drawText(String text, int lineWidth, int lineCount) {
        if(lineCount > 0) {
            int len = text.length();
            lineWidth = (int)Math.ceil(len/lineCount) + 1;
            int start = 0;
            System.out.println("-----  There are " + lineCount + " Line, " + lineWidth + "char per line -----");
            while(len > 0) {
                if(len <= lineWidth) {
                    System.out.println(text.substring(start));
                } else {
                    System.out.println(text.substring(start, start+lineWidth));
                }
                len = len - lineWidth;
                start += lineWidth;
            }
        } else {
            System.out.println("line count can not < 1 !");
        }
    }
}