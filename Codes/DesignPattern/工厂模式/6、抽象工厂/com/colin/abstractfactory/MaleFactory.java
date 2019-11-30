package com.colin.abstractfactory;

/**
 * 生产男性工厂类
 * @author Colin Chen
 * @date   2018年7月25日 上午6:39:50
 */
public class MaleFactory implements HumanFactory {

	@Override
	public Human createYellowHuman() {
		// TODO Auto-generated method stub
		return new MaleYellowHuman();
	}

	@Override
	public Human createWhiteHuman() {
		// TODO Auto-generated method stub
		return new MaleWhiteHuman();
	}

	@Override
	public Human createBlackHuman() {
		// TODO Auto-generated method stub
		return new MaleBlackHuman();
	}

}
