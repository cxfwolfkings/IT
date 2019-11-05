package com.colin.builder;

/**
 * A test client to create a house but we do not know how the room and door be created
 * 
 * @author Charles
 * @date 2016年1月13日 上午9:10:47
 */
public class TestClient {
	public static void main(String[] args) {
		ConcreteHouseBuilderA myHouseBuilder = new ConcreteHouseBuilderA();
		HouseDirector myHouseDirector = new HouseDirector();
		myHouseDirector.CreateHouse(myHouseBuilder);
		House myHouse = myHouseBuilder.getHouse();
		System.out.println("My house has room :" + myHouse.getRoomNumber());
		System.out.println("My house has door :" + myHouse.getDoorNumber());
	}
}