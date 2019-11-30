package com.colin.factory;

public class WhiteHumanFactory extends AbstractHumanFactory {

	@Override
	public Human createHuman() {
		// TODO Auto-generated method stub
		return new WhiteHuman();
	}

}
