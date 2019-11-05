package com.colin.strategy;

/**
 *  A test client
 *  客户端角色
 */
public class Client {
	public static void main(String[] args) {
        int lineCount = 4;
        int lineWidth = 12;
        
        Context myContext = new Context();
        StrategyA strategyA = new StrategyA();
        StrategyB strategyB = new StrategyB();
        String s = "This is a test string ! This is a test string ! This is a test string ! This is a test string ! This is a test string ! This is a test string !";
        myContext.setText(s);
        myContext.setLineWidth(lineWidth);
        myContext.setStrategy(strategyA);
        myContext.drawText();

        myContext.setLineCount(lineCount);
        myContext.setStrategy(strategyB);
        myContext.drawText();
        
        
        // 策略枚举
        Calculator.ADD.exec(4, 5);
        Calculator.SUB.exec(4, 5);
    }
}
