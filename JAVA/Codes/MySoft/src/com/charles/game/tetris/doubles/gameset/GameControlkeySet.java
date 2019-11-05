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
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
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
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class GameControlkeySet extends JDialog {

    /**
     *  
     */
    private JLabel label = new JLabel ("游戏控制键设定：");

    private JPanel panel1 = new JPanel ();

    private JLabel labelup = new JLabel ("       向上：");

    private JTextField textup = new JTextField ("");

    private JLabel labeldown = new JLabel ("       向下：");

    private JTextField textdown = new JTextField ("");

    private JLabel labelleft = new JLabel ("       向左：");

    private JTextField textleft = new JTextField ("");

    private JLabel labelright = new JLabel ("       向右：");;

    private JTextField textright = new JTextField ("");

    private JPanel panel2 = new JPanel ();

    private JButton button = new JButton ("完成");

    private int up ;

    private int down;

    private int left;

    private int right ;
    private GameMenu menu;

    public GameControlkeySet (final GameMenu menu) {
        super (menu, "游戏控制键设置", true);
        this.menu = menu;
        setSize (300, 150);
        Dimension scrSize = Toolkit.getDefaultToolkit ().getScreenSize ();

        setLocation ( (scrSize.width - getSize ().width) / 2, (scrSize.height - getSize ().height) / 2);

        setResizable (false);
        getContentPane ().setLayout (new BorderLayout ());

        getContentPane ().add (BorderLayout.NORTH, label);

        panel1.setLayout (new GridLayout (2, 4, 5, 5));
        panel1.add (labelup);
        panel1.add (textup);
        panel1.add (labeldown);
        panel1.add (textdown);
        panel1.add (labelleft);
        panel1.add (textleft);
        panel1.add (labelright);
        panel1.add (textright);
        getContentPane ().add (BorderLayout.CENTER, panel1);

        panel2.add (button);
        getContentPane ().add (BorderLayout.SOUTH, panel2);

        addWindowListener (new WindowAdapter () {
            public void windowClosing (WindowEvent e) {
                show (false);
            }
        });
        button.addActionListener (new Click ());
        
        textup.setText(KeyEvent.getKeyText (menu.getUp()));
        textdown.setText(KeyEvent.getKeyText (menu.getDown()));
        textleft.setText(KeyEvent.getKeyText (menu.getLeft()));
        textright.setText(KeyEvent.getKeyText (menu.getRight()));
        up = menu.getUp();
        down = menu.getDown();
        left = menu.getLeft();
        right = menu.getRight();
        textup.addKeyListener (new UPkey ());
        textdown.addKeyListener (new DOWNkey ());
        textleft.addKeyListener (new LEFTkey ());
        textright.addKeyListener (new RIGHTkey ());
        show (true);
    }

    private class Click implements ActionListener {
        public void actionPerformed (ActionEvent e) {           
            show (false);
        }
    }

    private class UPkey extends KeyAdapter {
       
        public void keyReleased (KeyEvent e) {
            if (e.getKeyCode () != down && e.getKeyCode () != left && e.getKeyCode () != right) {
                up = e.getKeyCode ();
                textup.setText (KeyEvent.getKeyText (up));               
            }else{
                textup.setText (KeyEvent.getKeyText (up));
            }
        }
    }

    private class DOWNkey extends KeyAdapter {
        public void keyReleased (KeyEvent e) {
            if (e.getKeyCode () != up && e.getKeyCode () != left && e.getKeyCode () != right) {
                down = e.getKeyCode ();
                textdown.setText (KeyEvent.getKeyText (down));
            }else{
                textdown.setText (KeyEvent.getKeyText (down));
            }

        }

    }

    private class LEFTkey extends KeyAdapter {
        public void keyReleased (KeyEvent e) {
            if (e.getKeyCode () != up && e.getKeyCode () != down && e.getKeyCode () != right) {
                left = e.getKeyCode ();
                textleft.setText (KeyEvent.getKeyText (left));
            }else{
                textleft.setText (KeyEvent.getKeyText (left));
            }

        }
    }

    private class RIGHTkey extends KeyAdapter {
        public void keyReleased (KeyEvent e) {
            if (e.getKeyCode () != up && e.getKeyCode () != down && e.getKeyCode () != left) {
                right = e.getKeyCode ();
                textright.setText (KeyEvent.getKeyText (right));
            }else{
                textright.setText (KeyEvent.getKeyText (right));
            }

        }
    }

    public int getUP () {
        return up;
    }

    public int getDOWN () {
        return down;
    }

    public int getLEFT () {
        return left;
    }

    public int getRIGHT () {
        return right;
    }
}
