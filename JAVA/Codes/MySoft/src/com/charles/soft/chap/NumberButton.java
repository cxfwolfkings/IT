package com.charles.soft.chap;
import java.awt.Button;
import java.awt.Color;

//Download by http://www.codefans.net
public class NumberButton extends Button {
	
	private static final long serialVersionUID = -2013547013988461244L;
	int number;

	public NumberButton(int number) {
		super("" + number);
		this.number = number;
		setForeground(Color.blue);
	}

	public int getNumber() {
		return number;
	}
}
