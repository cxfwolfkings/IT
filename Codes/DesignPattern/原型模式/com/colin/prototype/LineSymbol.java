package com.colin.prototype;

/**
 *  A concrete prototype to draw a line
 *  具体原型角色
 */
public class LineSymbol extends Graphic {

	private static final long serialVersionUID = -2160528783186315635L;

	public LineSymbol() {
    }
	
	@Override
    public void DoSomething() {
        System.out.println("I am used to draw a line !");
    }
}