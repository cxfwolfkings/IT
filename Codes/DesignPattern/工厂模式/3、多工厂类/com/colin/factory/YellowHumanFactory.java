package com.colin.factory;

public class YellowHumanFactory extends AbstractHumanFactory {

	@Override
	public Human createHuman() {
		// TODO Auto-generated method stub
		return new YellowHuman();
	}

}
