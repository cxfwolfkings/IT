package com.colin.proxy.ordinary;

public class GamePlayer implements IGamePlayer{
	private String name = "";
	// 构造函数传递姓名
	public GamePlayer(String _name) {
		this.name = _name;
	}
	@Override
	public void login(String user, String password) {
		// TODO Auto-generated method stub
		System.out.println("登录名为"+user+"的用户"+this.name+"登录成功！");
	}

	@Override
	public void killBoss() {
		// TODO Auto-generated method stub
		System.out.println(this.name+"在打怪！");
	}

	@Override
	public void upgrade() {
		// TODO Auto-generated method stub
		System.out.println(this.name+"又升了一级！");
	}

}
