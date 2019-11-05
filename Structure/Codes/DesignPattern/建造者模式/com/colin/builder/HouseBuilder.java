package com.colin.builder;

/**
 * An abstract Builder 抽象建造者角色
 * 
 * @author Charles
 * @date 2016年1月13日 上午9:08:54
 */
public abstract class HouseBuilder {
	public abstract void BuildRoom(int roomNo);

	public abstract void BuildDoor(int room1, int room2);

	public abstract House getHouse();
}