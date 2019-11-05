package com.charles.game.chess;

import java.awt.Button;
import java.awt.Color;
import java.awt.FlowLayout;
import java.awt.Label;
import java.awt.Panel;
import java.awt.TextField;

/**
 * 控制Panel
 * 此Panel上的按钮如其名，完成相应的功能
 * @author Charles
 * @date   2016年6月23日 上午5:37:05
 */
public class ControlPad extends Panel {

	private static final long serialVersionUID = -7061394710289057124L;
	public Label IPlabel = new Label("服务器IP:", Label.LEFT);
	public TextField inputIP = new TextField("localhost", 10);
	public Button connectButton = new Button("连接主机");
	public Button creatGameButton = new Button("建立游戏");
	public Button joinGameButton = new Button("加入游戏");
	public Button cancelGameButton = new Button("放弃游戏");
	public Button exitGameButton = new Button("关闭程序");

	// 构造函数，负责Panel的初始布局。
	public ControlPad() {
		// 设置布局管理器,和背景颜色
		setLayout(new FlowLayout(FlowLayout.LEFT));
		setBackground(new Color(204, 204, 204));
		// 添加相应控件
		add(IPlabel);
		add(inputIP);
		add(connectButton);
		add(creatGameButton);
		add(joinGameButton);
		add(cancelGameButton);
		add(exitGameButton);
	}
}
