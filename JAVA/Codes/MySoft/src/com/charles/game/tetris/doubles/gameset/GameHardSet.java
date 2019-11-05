/*
 * Created on 2006-4-25
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.charles.game.tetris.doubles.gameset;


import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.GridLayout;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

import javax.swing.JButton;
import javax.swing.JDialog;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;

import com.charles.game.tetris.doubles.GameMenu;

/**
 * @author Administrator
 * 
 * TODO To change the template for this generated type comment go to Window -
 * Preferences - Java - Code Style - Code Templates
 */
public class GameHardSet extends JDialog {

	/**
	 * 
	 */
	private JLabel hard = new JLabel("    难度级别（1-10）：");

	private JTextField text = new JTextField("0005");

	private JButton ok = new JButton("完成");

	private int gamehard = 0005;// 保存游戏难度

	private JPanel panel1 = new JPanel();

	private JPanel panel2 = new JPanel();
	private GameMenu menu;

	public GameHardSet(final  GameMenu menu) {
		super(menu, "游戏难度设定", true);
		setSize(280, 85);
		Dimension scrSize = Toolkit.getDefaultToolkit().getScreenSize();

		setLocation((scrSize.width - getSize().width) / 2,
				(scrSize.height - getSize().height) / 2);
		getContentPane().setLayout(new BorderLayout());
		getContentPane().add("Center",panel1);
		getContentPane().add("South",panel2);
		setResizable(false);
		text.requestFocus();
		text.setText(new Integer(menu.getGameHard()).toString());
		gamehard = menu.getGameHard();

		panel1.setLayout(new GridLayout(1, 2));
		panel1.add(hard);
		panel1.add(text);
		panel2.add(ok);
		ok.addActionListener(new isOk());
		addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent e) {
				show(false);
			}
		});
		show(true);
	}

	private class isOk implements ActionListener {
		public void actionPerformed(ActionEvent e) {
			gamehard = Integer.parseInt(text.getText());
			show(false);

		}
	}

	public int getgameHard() {
		return gamehard;
	}

}
