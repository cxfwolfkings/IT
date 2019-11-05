/*
 * Created on 2006-5-4
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.charles.game.tetris.doubles.gameset;

/**
 * @author Administrator
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.FlowLayout;
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
public class GameClienSocketSet extends JDialog implements ActionListener {
    private JLabel port = new JLabel ("           端口号:");

    private JTextField text = new JTextField ("01234");

    private JLabel address = new JLabel ("        主机地址:");

    private JTextField addressText = new JTextField ("127.0.0.1");

    private JButton ok = new JButton ("完成");

    private JPanel panel = new JPanel ();
    
    private JPanel panel1 = new JPanel ();
    private int portNum = 1234;//存储端口号
    private String addr = null;

    private GameMenu menu;

    public GameClienSocketSet (final GameMenu menu) {
        super (menu, "connect", true);
        this.menu = menu;
        setSize(400,100);
        setResizable(false);
        Dimension scrSize = Toolkit.getDefaultToolkit ().getScreenSize ();

        setLocation ( (scrSize.width - getSize ().width) / 2, (scrSize.height - getSize ().height) / 2);

        getContentPane ().setLayout (new BorderLayout ());
        
        
        panel.setLayout(new GridLayout(1,4));
        panel.add(address);
        panel.add(addressText);
        panel.add(port);
        panel.add(text);
        text.setText(new Integer(menu.getPortNum()).toString());
        portNum = menu.getPortNum();
        addressText.setText(menu.getAddress());
        addr = menu.getAddress();
        
        panel1.setLayout(new FlowLayout());
        panel1.add(ok);
        
        getContentPane ().add ("North", panel);
        getContentPane ().add ("South", panel1);
        
        ok.addActionListener(this);
        addWindowListener (new WindowAdapter () {
            public void windowClosing (WindowEvent e) {               
                show (false);
            }
        });
        
        show(true);

    }
    public void actionPerformed (ActionEvent e) {     
    	menu.getMiNewGame().setEnabled(false);
        portNum = Integer.parseInt (text.getText ());
        addr = addressText.getText();
        setVisible (false);
        System.out.println ("建立端口成功！端口号是:");
        System.out.println (portNum);
        System.out.println (addr);
        setVisible (false);
        }
    
    
    /**
     * @return Returns the addr.
     */
    public String getAddr () {
        return addr;
    }
    /**
     * @param addr The addr to set.
     */
    public void setAddr (String addr) {
        this.addr = addr;
    }
    /**
     * @return Returns the portNum.
     */
    public int getPortNum () {
        return portNum;
    }
    /**
     * @param portNum The portNum to set.
     */
    public void setPortNum (int portNum) {
        this.portNum = portNum;
    }
}
