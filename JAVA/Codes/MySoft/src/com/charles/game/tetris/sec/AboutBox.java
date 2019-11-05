/**
 * File: AboutBox.java
 * User: 吴永坚
 * Date: 2006.11.8
 * Describe: 俄罗斯方块的 Java 实现
 */

package com.charles.game.tetris.sec;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.*;
import java.awt.event.*;

/**
 * 关于窗口类，继承自JDialog类。
 */
public class AboutBox extends JDialog implements ActionListener {
    JPanel panel1 = new JPanel();
    JPanel panel2 = new JPanel();
    JPanel insetsPanel1 = new JPanel();
    JPanel insetsPanel2 = new JPanel();
    JPanel insetsPanel3 = new JPanel();
    JButton button1 = new JButton();
    JLabel imageLabel = new JLabel();
    JLabel label1 = new JLabel();
    JLabel label2 = new JLabel();
    JLabel label3 = new JLabel();
    JLabel label4 = new JLabel();
    JLabel label5 = new JLabel();
    ImageIcon image1 = new ImageIcon();
    BorderLayout borderLayout1 = new BorderLayout();
    BorderLayout borderLayout2 = new BorderLayout();
    FlowLayout flowLayout1 = new FlowLayout();
    GridLayout gridLayout1 = new GridLayout();
    String product = "";
    String version = "1.0";
    String copyright = "Copyright (c) 2006";
    String comments = "By YongjianWu";
    // String com		= "";
    
    /**
	 * 处理退出窗口的类
	 */
    private class WindowCloser extends WindowAdapter{
		public void windowclosing(WindowEvent we){
			AboutBox.this.hide();
		}
	}
    
    /**
	 * 关于窗口类的构造函数
	 * @param parent Frame, 框架
	 */
    public AboutBox(Frame parent) {
        super(parent);
        try {
            setDefaultCloseOperation(DISPOSE_ON_CLOSE);
            jbInit();
            button1.addActionListener(this);
			addWindowListener(new WindowCloser());
			setResizable(false);
			pack();
			show();
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }
    
    /**
	 * 关于窗口类的构造函数
	 */
    public AboutBox() {
        this(null);
    }

    /**
	 * 关于窗口的界面设置
	 */
    private void jbInit() throws Exception {
    	
    	Dimension scrSize = Toolkit.getDefaultToolkit().getScreenSize();
		setLocation((scrSize.width - getSize().width)/2,
		        (scrSize.height - getSize().height)/2);
        image1 = new ImageIcon(ErsBlocksGame.class.getResource("about.png"));
        imageLabel.setIcon(image1);
        setTitle("关于");
        panel1.setLayout(borderLayout1);
        panel2.setLayout(borderLayout2);
        insetsPanel1.setLayout(flowLayout1);
        insetsPanel2.setLayout(flowLayout1);
        insetsPanel2.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
        gridLayout1.setRows(4);
        gridLayout1.setColumns(1);
        label1.setText(product);
        label2.setText(version);
        label3.setText(copyright);
        label4.setText(comments);
        //label5.setText(com);
        insetsPanel3.setLayout(gridLayout1);
        insetsPanel3.setBorder(BorderFactory.createEmptyBorder(10, 60, 10, 10));
        button1.setText("OK");
        button1.addActionListener(this);
        insetsPanel2.add(imageLabel, null);
        panel2.add(insetsPanel2, BorderLayout.WEST);
        getContentPane().add(panel1, null);
        insetsPanel3.add(label1, null);
        insetsPanel3.add(label2, null);
        insetsPanel3.add(label3, null);
        insetsPanel3.add(label4, null);
        //insetsPanel3.add(label5, null);
        panel2.add(insetsPanel3, BorderLayout.CENTER);
        insetsPanel1.add(button1, null);
        panel1.add(insetsPanel1, BorderLayout.SOUTH);
        panel1.add(panel2, BorderLayout.NORTH);
        setResizable(true);
        
    }
    
    /**
	 * 处理按钮事件
	 */
    public void actionPerformed(ActionEvent actionEvent) {
        if (actionEvent.getSource() == button1) {
            dispose();
        }
    }
}

