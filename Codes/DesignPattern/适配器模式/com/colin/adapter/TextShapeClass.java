package com.colin.adapter;

/**
 *  The Class Adapter in this sample 
 *  适配器角色(类适配模式：通过继承实现)
 */
public class TextShapeClass  extends Text implements Shape {
    public TextShapeClass() {
    }
    public void Draw() {
        System.out.println("Draw a shap ! Impelement Shape interface !");
    }
    public void Border() {
        System.out.println("Set the border of the shap ! Impelement Shape interface !");
    }
    public static void main(String[] args) {
        TextShapeClass myTextShapeClass = new TextShapeClass();
        myTextShapeClass.Draw();
        myTextShapeClass.Border();
        myTextShapeClass.SetContent("A test text !");
        System.out.println("The content in Text Shape is :" + myTextShapeClass.GetContent());
    }
}