package com.colin.decorator;

/**
 * The Concrete Decorator
 * 具体装饰角色
 * @author Charles
 * @date   2016年1月14日 下午3:20:48
 */
public class ConcreteDecorator extends Decorator {
    public ConcreteDecorator(Component c) {
        super(c);
    }
    public void PrintString(String s) {
        super.PrintString(s);
        PrintStringLen(s);
    }
    public void PrintStringLen(String s) {
        System.out.println("The length of string is:" + s.length());
    }
}