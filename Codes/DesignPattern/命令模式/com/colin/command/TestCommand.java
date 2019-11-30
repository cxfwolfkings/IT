package com.colin.command;

/**
 * <p>Title: 命令模式</p>
 * <p>Description: 客户角色</p>
 * <p>Copyright: Copyright (c) 2016</p>
 * <p>Company: Saige</p>
 * @author Charles
 * @version 0.5
 */
public class TestCommand {
	public static void main(String[] args) {
		// 定义接收者
		Light testLight = new Light();
		// 定义发送给接收者的命令
		LightOnCommand testLOC = new LightOnCommand(testLight);
		LightOffCommand testLFC = new LightOffCommand(testLight);
		// 定义请求者
		Switch testSwitch = new Switch(testLOC, testLFC);
		testSwitch.flipUp();
		testSwitch.flipDown();
		Fan testFan = new Fan();
		FanOnCommand foc = new FanOnCommand(testFan);
		FanOffCommand ffc = new FanOffCommand(testFan);
		Switch ts = new Switch(foc, ffc);
		ts.flipUp();
		ts.flipDown();
	}
}
