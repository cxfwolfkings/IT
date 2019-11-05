package com.colin.bridge;

/**
 * The ConcreteImplementor
 * 具体实现角色
 * @author Charles
 * @date   2016�?1�?8�? 上午9:32:07
 */
public class TextImpLinux implements TextImp {
    public TextImpLinux() {
    }
    public void DrawTextImp() {
        System.out.println("The text has a Linux style !");
    }
}