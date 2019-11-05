package com.charles.game.chess.sec;

import org.eclipse.swt.SWT;
import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Group;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.Text;

public class Help {

	protected Shell shell;

	/**
	 * Launch the application
	 * @param args
	 */
	public static void main(String[] args) {
		try {
			Image image = new Image(Display.getDefault(),"bk.jpg");

			Help window = new Help();
			window.open();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	/**
	 * Open the window
	 */
	public void open() {
		final Display display = Display.getDefault();
		createContents();
		shell.open();
		shell.layout();
		while (!shell.isDisposed()) {
			if (!display.readAndDispatch())
				display.sleep();
		}
	}

	/**
	 * Create contents of the window
	 */
	protected void createContents() {
		shell = new Shell(SWT.APPLICATION_MODAL | SWT.TITLE | SWT.BORDER | SWT.CLOSE);
		shell.setSize(340, 240);
		shell.setText("五子棋--无禁手");
        Color color = new Color(Display.getDefault(),0,150,150);
		shell.setBackground(color);
		color.dispose();
		final Label label = new Label(shell, SWT.NONE);
		label.setText("五子棋无禁手   版本V1.0");
		label.setBounds(81, 10, 140, 15);

		final Label label_1 = new Label(shell, SWT.NONE);
		label_1.setText("导师： 朱福喜 教授  Wuhan Univ.");
		label_1.setBounds(116, 167, 195, 15);

		final Label label_2 = new Label(shell, SWT.NONE);
		label_2.setText("编码： 杨宝奎");
		label_2.setBounds(10, 167, 100, 15);

		final Group group = new Group(shell, SWT.NONE);
		group.setText("基本算法");
		group.setBounds(10, 31, 314, 130);

		final Label label_3 = new Label(group, SWT.NONE);
		label_3.setText("采用博弈比较常用的策略。 ");
		label_3.setBounds(10, 20, 150, 15);

		final Label label_4 = new Label(group, SWT.WRAP | SWT.SHADOW_NONE);
		label_4.setText("   计算机下子前，分别对玩家和电脑棋型进行评估，然后根据棋型对每一位置打分（玩家和电脑在同一点的分数不同），比如活三100分，冲四1000分等，然后根据每个落子点分数进行选择。采用极大极小值策略，进行多步计算。");
		label_4.setBounds(10, 40, 294, 64);

		final Label label_5 = new Label(group, SWT.NONE);
		label_5.setText("详细算法，请与本人联系：） ybknet@163.com");
		label_5.setBounds(31, 108, 250, 15);

		final Label label_6 = new Label(shell, SWT.NONE);
		label_6.setText("不保留版权，免费拷贝！！");
		label_6.setBounds(10, 188, 145, 15);
		//
	}

}
