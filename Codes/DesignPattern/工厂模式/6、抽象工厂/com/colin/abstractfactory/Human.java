package com.colin.abstractfactory;

/**
 * 人类接口
 * @author Colin Chen
 * @date   2018年7月23日 下午9:10:35
 */
public interface Human {
	/**
	 * 每个人种的皮肤都有相应的颜色
	 */
    public void getColor();
    
    /**
     * 人类会说话
     */
    public void talk();
    
    /**
     * 每个人都有性别
     */
    public void getSex();
}
