package com.colin.proxy.force;

public class GamePlayer implements IGamePlayer{
	private String name = "";
	// 我的代理是谁
	private IGamePlayer proxy = null;
	// 构造函数传递姓名
	public GamePlayer(String _name) {
		this.name = _name;
	}
	@Override
	public void login(String user, String password) {
		// TODO Auto-generated method stub
		if(this.isProxy()){
		    System.out.println("登录名为"+user+"的用户"+this.name+"登录成功！");
		}else{
			System.out.println("请使用指定的代理访问");
		}
	}

	@Override
	public void killBoss() {
		// TODO Auto-generated method stub
		if(this.isProxy()){
		    System.out.println(this.name+"在打怪！");
		}else{
			System.out.println("请使用指定的代理访问");
		}
	}

	@Override
	public void upgrade() {
		// TODO Auto-generated method stub
		if(this.isProxy()){
		    System.out.println(this.name+"又升了一级！");
		}else{
			System.out.println("请使用指定的代理访问");
		}
	}
	// 找到自己的代理
	@Override
	public IGamePlayer getProxy() {
		// TODO Auto-generated method stub
		this.proxy = new GamePlayerProxy(this);
		return this.proxy;
	}
	// 校验是否是代理访问
	private boolean isProxy() {
		if(this.proxy==null){
			return false;
		}else{
			return true;
		}
	}
}
