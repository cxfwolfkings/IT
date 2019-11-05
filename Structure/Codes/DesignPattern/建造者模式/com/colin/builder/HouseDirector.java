package com.colin.builder;

/**
 * This class is a Director 指导者角色
 * 
 * @author Charles
 * @date 2016年1月13日 上午9:09:27
 */
public class HouseDirector {
	public void CreateHouse(HouseBuilder concreteBuilder) {
		concreteBuilder.BuildRoom(1);
		concreteBuilder.BuildRoom(2);
		concreteBuilder.BuildDoor(1, 2);
	}
}