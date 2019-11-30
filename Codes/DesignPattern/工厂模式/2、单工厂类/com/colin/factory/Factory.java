package com.colin.factory;

import com.colin.model.*;

/**
 * 工厂角色（这里省略了抽象工厂类）
 * 
 * @author Charles
 * @date 2016年1月24日 上午8:07:25
 * @version A.1
 */
public class Factory {
	public Window CreateWindow(String type) {
		if (type.equals("Big")) {
			return new WindowBig();
		} else if (type.equals("Small")) {
			return new WindowSmall();
		} else {
			return new WindowBig();
		}
	}
}
