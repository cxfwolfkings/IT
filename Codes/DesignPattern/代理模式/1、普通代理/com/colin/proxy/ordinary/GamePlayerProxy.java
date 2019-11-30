package com.colin.proxy.ordinary;

public class GamePlayerProxy implements IGamePlayer{
	private IGamePlayer gamePlayer = null;
	// 通过构造函数传递要对谁进行代练
	public GamePlayerProxy(String name) {
		// TODO Auto-generated constructor stub
		gamePlayer = new GamePlayer(name);
	}
	@Override
	public void login(String user, String password) {
		// TODO Auto-generated method stub
		this.gamePlayer.login(user, password);
	}

	@Override
	public void killBoss() {
		// TODO Auto-generated method stub
		this.gamePlayer.killBoss();
	}

	@Override
	public void upgrade() {
		// TODO Auto-generated method stub
		this.gamePlayer.upgrade();
	}

}
