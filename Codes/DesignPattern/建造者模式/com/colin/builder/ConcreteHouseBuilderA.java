package com.colin.builder;

/**
 * 具体建造者角色
 * 
 * @author Charles
 * @date 2016年1月13日 上午9:06:03
 */
public class ConcreteHouseBuilderA extends HouseBuilder {
	private House house;

	public ConcreteHouseBuilderA() {
		house = new House();
	}

	public void BuildRoom(int roomNo) {
		// you can create a new Room added to a House
		house.roomNumber++;
	}

	public void BuildDoor(int room1, int room2) {
		// you can create a new door assotiated with 2 room and added this door
		// into a house
		house.doorNumber++;
	}

	public House getHouse() {
		return house;
	}
}