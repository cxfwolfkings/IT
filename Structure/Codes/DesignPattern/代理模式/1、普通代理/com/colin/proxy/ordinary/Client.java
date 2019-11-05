package com.colin.proxy.ordinary;

public class Client {
	public static void main(String[] args) {
		IGamePlayer proxy = new GamePlayerProxy("露西");
		proxy.login("Lucy", "123456");
		proxy.killBoss();
		proxy.upgrade();
	}
}
