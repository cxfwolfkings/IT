package com.colin.factory;

public class BlackHumanFactory extends AbstractHumanFactory {

	@Override
	public Human createHuman() {
		// TODO Auto-generated method stub
		return new BlackHuman();
	}

}
