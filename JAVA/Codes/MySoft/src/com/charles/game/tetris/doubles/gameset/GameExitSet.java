/*
 * Created on 2006-4-25
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.charles.game.tetris.doubles.gameset;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

import javax.swing.JButton;
import javax.swing.JDialog;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;

/**
 * @author Administrator
 * 
 * TODO To change the template for this generated type comment go to Window -
 * Preferences - Java - Code Style - Code Templates
 */
public class GameExitSet extends JDialog {

    /**
     *  
     */
    private JButton ok = new JButton ("是");

    private JButton no = new JButton ("否");

    private JLabel label = new JLabel ("                    你真的要退出游戏吗?");

    private JPanel panel = new JPanel ();

    public GameExitSet (JFrame menu) {

        super (menu, "退出对话框", true);
        getContentPane ().setLayout (new BorderLayout ());
        setSize (300, 90);
        setResizable (false);
        Dimension scrSize = Toolkit.getDefaultToolkit ().getScreenSize ();

        setLocation ( (scrSize.width - getSize ().width) / 2, (scrSize.height - getSize ().height) / 2);

        addWindowListener (new WindowAdapter () {
            public void windowClosing (WindowEvent e) {
                show (false);
            }
        });
        panel.add (ok);
        panel.add (no);

        panel.setLayout (new FlowLayout ());
        getContentPane ().add (panel, "South");
        getContentPane ().add (label, "North");
        ok.addActionListener (new isok ());
        no.addActionListener (new isno ());
        show (true); //show(true)不能放在响应事件前
    }

    private class isok implements ActionListener {
        public void actionPerformed (ActionEvent e) {
            System.exit (0);
        }

    }

    private class isno implements ActionListener {
        public void actionPerformed (ActionEvent e) {
            show (false);
        }
    }
}