package com.colin.abstractfactory;

/**
 * 工厂接口
 * @author Colin Chen
 * @date   2018年7月24日 下午8:19:15
 */
public interface HumanFactory {
	/**
	 * 制造一个黄人
	 * @return
	 */
	public Human createYellowHuman();
	/**
	 * 制造一个白人
	 * @return
	 */
	public Human createWhiteHuman();
	/**
	 * 制造一个黑人
	 * @return
	 */
	public Human createBlackHuman();
}
