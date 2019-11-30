package com.colin.proxy.force;

public class Client {
	public static void main(String[] args) {
		IGamePlayer player = new GamePlayer("张三");
		IGamePlayer proxy = player.getProxy();
		proxy.login("ZhangSan", "123456");
		proxy.killBoss();
		proxy.upgrade();
	}
}
