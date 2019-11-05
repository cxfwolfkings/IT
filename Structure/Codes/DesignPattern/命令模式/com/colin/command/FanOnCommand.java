package com.colin.command;

/**
 * 具体命令角色
 * @author Charles
 * @date   2016年1月13日 下午4:04:56
 */
public class FanOnCommand implements Command {
	private Fan myFan;
	public FanOnCommand(Fan F) {
		myFan = F;
	}
	public void execute() {
		myFan.startRotate();
	}
}
