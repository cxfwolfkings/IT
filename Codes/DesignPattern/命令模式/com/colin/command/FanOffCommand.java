package com.colin.command;

/**
 * 具体命令角色
 * @author Charles
 * @date   2016年1月13日 下午4:05:14
 */
public class FanOffCommand implements Command {
	private Fan myFan;
	public FanOffCommand(Fan F) {
		myFan = F;
	}
	public void execute() {
		myFan.stopRotate();
	}
}
