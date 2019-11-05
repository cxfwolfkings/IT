package com.charles.soft.chap;
import java.awt.Button;
import java.awt.Color;

//Download by http://www.codefans.net
public class OperationButton extends Button {
	
	private static final long serialVersionUID = -770298999916295931L;
	String ÔËËã·ûºÅ;

	public OperationButton(String s) {
		super(s);
		ÔËËã·ûºÅ = s;
		setForeground(Color.red);
	}

	public String getÔËËã·ûºÅ() {
		return ÔËËã·ûºÅ;
	}
}
