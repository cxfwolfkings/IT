package com.charles.game.chess;

import java.awt.Choice;
import java.awt.Color;
import java.awt.FlowLayout;
import java.awt.Label;
import java.awt.Panel;
import java.awt.TextField;

/**
 * 输入信息Panel。Panel左边的下拉列表中列出了所有用户的名字。 右边的文本框可以输入聊天信息，点击回车信息被发送。 此外还可以
 * 在文本框中输入命令如changename、list等。
 */

public class InputPad extends Panel {
	public TextField inputWords = new TextField("点击回车发送信息", 20);

	// 选择发送信息的用户
	public Choice userChoice = new Choice();

	public Label chatLabel = new Label("输入发送信息:");

	public InputPad() {
		// 设置布局管理器和背景颜色(亮灰色)
		setLayout(new FlowLayout(FlowLayout.LEFT));
		setBackground(new Color(204, 204, 204));
		// 添加连接用户状态(连接上限为30个用户)
		for (int i = 0; i < 30; i++) {
			userChoice.addItem(i + "." + "当前暂无用户");
		}
		userChoice.setSize(60, 24);
		// 将相应控件添加到Panel
		add(userChoice);
		add(chatLabel);
		add(inputWords);
	}

}