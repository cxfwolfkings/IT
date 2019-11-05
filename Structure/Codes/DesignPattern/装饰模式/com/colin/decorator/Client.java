package com.colin.decorator;

/**
 *  A simple test
 */
public class Client  {
    public static void main(String[] args) {
        Component myComponent = new ConcreteComponent();
        myComponent.PrintString("A test String");
        Decorator myDecorator = new ConcreteDecorator(myComponent);
        myDecorator.PrintString("A test String");
    }
}