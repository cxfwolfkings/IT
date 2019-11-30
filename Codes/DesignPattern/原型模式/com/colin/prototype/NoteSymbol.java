package com.colin.prototype;

/**
 *  A concrete prototype to draw a note
 *  具体原型角色
 */
public class NoteSymbol extends Graphic {

	private static final long serialVersionUID = -1874763967481270732L;

	public NoteSymbol() {
    }

	@Override
    public void DoSomething() {
        System.out.println("I am used to draw a note !");
    }
}