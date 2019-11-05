package com.colin.builder;

/**
 * A house as a concrete(具体) product we got finally 产品角色
 * 
 * @author Charles
 * @date 2016年1月13日 上午9:04:26
 */
public class House {
	int roomNumber;
	int doorNumber;

	public House() {
		roomNumber = 0;
		doorNumber = 0;
	}

	public int getRoomNumber() {
		return roomNumber;
	}

	public int getDoorNumber() {
		return doorNumber;
	}
}