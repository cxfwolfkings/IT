package com.colin.facade;

/**
 * A very simple test
 * �ͻ���ɫ
 * @author Charles
 * @date   2016��1��21�� ����11:16:15
 */
public class Test  {
    public static void main(String[] args) {
        FacadeRoom room = new FacadeRoom();
        room.CreateRoom();
    }
}

/**
 * ��ϵͳ��ɫ
 */
class Wall {
    public Wall() {
        System.out.println("Create a wall !");
    }
}

/**
 * ��ϵͳ��ɫ
 */
class Door {
    public Door() {
        System.out.println("Create a door !");
    }
}

/**
 * �����ɫ
 * һ������(4��ǽ��һ����)
 */
class FacadeRoom {
    public void CreateRoom() {
        Wall wall1 = new Wall();
        Wall wall2 = new Wall();
        Wall wall3 = new Wall();
        Wall wall4 = new Wall();
        Door door = new Door();
    }
}