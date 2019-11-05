package com.colin.decorator;

/**
 * The Decorator
 * 装饰角色
 * @author Charles
 * @date   2016年1月14日 下午3:21:33
 */
public class Decorator implements Component {
    private Component component;
    public Decorator(Component c) {
        component = c;
    }
    public void PrintString(String s) {
        component.PrintString(s);
    }
}