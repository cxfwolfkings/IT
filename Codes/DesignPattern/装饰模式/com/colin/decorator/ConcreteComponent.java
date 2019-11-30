package com.colin.decorator;

/**
 * A Concrete Component
 * 具体构件角色
 * @author Charles
 * @date   2016年1月14日 下午3:20:23
 */
public class ConcreteComponent implements Component {
    public ConcreteComponent() {
    	
    }
    public void PrintString(String s) {
        System.out.println("Input String is:" + s);
    }
}