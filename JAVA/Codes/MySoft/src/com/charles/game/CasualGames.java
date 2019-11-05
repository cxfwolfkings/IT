package com.charles.game;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;

import javax.swing.BorderFactory;
import javax.swing.JDialog;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.JTextField;
import javax.swing.KeyStroke;
import javax.swing.border.Border;

/**
 * 开发一个休闲游戏管理平台 主面板控制类
 * 
 * @author Charles
 * @date 2016-05-23
 */
public class CasualGames extends JFrame {

	private static final long serialVersionUID = -6799504992718560718L;
	private static CasualGames games;
	// 菜单栏
	private JMenuBar bar = new JMenuBar();
	// 菜单条包含4个菜单
	private JMenu mGame = new JMenu("游戏"), mControl = new JMenu("控制"), mInfo = new JMenu("帮助");

	// 4个菜单中分别包含的菜单项
	private JMenuItem miErsBlock = new JMenuItem("俄罗斯方块"), 
			miSave = new JMenuItem("存档"), miLoad = new JMenuItem("读档"),
			miAuthor = new JMenuItem("作者 : Charles"), miSourceInfo = new JMenuItem("版本：1.0");

	public static void main(String[] args) {
		games = new CasualGames();
	}

	public CasualGames() {
		super("休闲游戏管理平台");
		//初始窗口的大小，用户可调控
		setSize(315, 392);
		//将游戏窗口置于屏幕中央
		Dimension scrSize = Toolkit.getDefaultToolkit().getScreenSize();
		setLocation((scrSize.width - getSize().width) / 2, (scrSize.height - getSize().height) / 2);
		//创建菜单
		createMenu();
		Container container = getContentPane();
		// 布局的水平构件之间有6个象素的距离
		container.setLayout(new BorderLayout(6, 0));

		super.setVisible(true);//setVisiable
	}
	
	/**
	 * 建立并设置窗口菜单
	 */
	private void createMenu() {
		bar.add(mGame);
		bar.add(mControl);
		bar.add(mInfo);

		mGame.add(miErsBlock);
		//mGame.addSeparator();

		mControl.add(miSave);
		mControl.add(miLoad);;

		mInfo.add(miAuthor);
		mInfo.add(miSourceInfo);

		setJMenuBar(bar);

		miSave.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_S, KeyEvent.CTRL_MASK));
		miLoad.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_ENTER, 0));
		
		miSave.addActionListener(new ActionListener() {	
			@Override
			public void actionPerformed(ActionEvent e) {
				// TODO Auto-generated method stub
				JDialog dialog = new JDialog(games, "系统信息", true);
				dialog.setSize(60, 60);
				dialog.setLayout(new BorderLayout());
				JLabel label = new JLabel("哈哈");
				label.setHorizontalAlignment(JTextField.CENTER);
				label.setBorder(BorderFactory.createLineBorder(Color.blue, 1));
				dialog.add(new JLabel("哈哈"), BorderLayout.CENTER);
				dialog.setVisible(true);
			}
		});
	}

}