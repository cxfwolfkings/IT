package com.colin.command;

/**
 * 请求者角色
 * @author Charles
 * @date   2016年1月13日 下午4:08:33
 */
public class Switch {
	private Command UpCommand, DownCommand;
	public Switch(Command Up, Command Down) {
		UpCommand = Up;
		DownCommand = Down;
	}
	void flipUp() {
		UpCommand.execute();
	}
	void flipDown() {
		DownCommand.execute();
	}
}
