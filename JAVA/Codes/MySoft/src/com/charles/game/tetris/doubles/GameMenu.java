/*
 * Created on 2006-4-25
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.charles.game.tetris.doubles;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.net.ServerSocket;
import java.net.Socket;

import javax.swing.JFrame;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;

import com.charles.game.tetris.doubles.gameset.GameClienSocketSet;
import com.charles.game.tetris.doubles.gameset.GameControlkeySet;
import com.charles.game.tetris.doubles.gameset.GameExitSet;
import com.charles.game.tetris.doubles.gameset.GameHardSet;
import com.charles.game.tetris.doubles.gameset.GameServerSocketSet;

/**
 * @author Administrator
 * 
 * TODO To change the template for this generated type comment go to Window -
 * Preferences - Java - Code Style - Code Templates
 */
public class GameMenu extends JFrame implements ActionListener {
    private JMenuBar bar = new JMenuBar ();

    //菜单条包含4个菜单
    private JMenu mGame = new JMenu ("游戏");

    private JMenu mControl = new JMenu ("控制");

    private JMenu mInfo = new JMenu ("帮助");

    //4个菜单中分别包含的菜单项
    protected  JMenuItem miNewGame = new JMenuItem ("建立新游戏");

    protected  JMenuItem miConnectGame = new JMenuItem ("连接游戏");

    protected JMenuItem miExit = new JMenuItem ("退出");

    protected JMenuItem miHardset = new JMenuItem ("游戏难度设置");

    protected JMenuItem miControlkey = new JMenuItem ("控制键设置");

    protected JMenuItem miAuthor = new JMenuItem ("作者 : Java游戏设计组");

    protected JMenuItem miSourceInfo = new JMenuItem ("版本：1.0");

    /**
     * 保存建立的SOCKET
     */
    private Socket socket ;

    private ServerSocket server = null;

    private int  portNum = 8081;

    private String address =null;
    

    /**
     * 保存设定的游戏难度
     */
    private  int gamehard = 0005;

    /**
     * 保存设定的游戏向上控制键
     */

    private  int up = KeyEvent.VK_UP;

    /**
     * 保存设定的游戏向下控制键
     */
    private int down = KeyEvent.VK_DOWN;

    /**
     * 保存设定的游戏向左控制键
     */
    private int left = KeyEvent.VK_LEFT;

    /**
     * 保存设定的游戏向右控制键
     */
    private int right = KeyEvent.VK_RIGHT;

    public GameMenu (String s) {
        super (s);
        bar.add (mGame);
        bar.add (mControl);
        bar.add (mInfo);

        mGame.add (miNewGame);
        miNewGame.addActionListener (this);
       
        mGame.addSeparator ();

        mGame.add (miConnectGame);
        miConnectGame.addActionListener (this);

        mGame.addSeparator ();

        mGame.add (miExit);
        miExit.addActionListener (this);

        mControl.add (miControlkey);
        miControlkey.addActionListener (this);
        mControl.addSeparator ();

        mControl.add (miHardset);
        miHardset.addActionListener (this);
        
        mInfo.add (miAuthor);
        miAuthor.addActionListener (this);
        mInfo.addSeparator ();

        mInfo.add (miSourceInfo);
        miSourceInfo.addActionListener (this);

        setJMenuBar (bar);
        show (true);
        addWindowListener (new WindowAdapter () {
            public void windowClosing (WindowEvent e) {
                System.exit (1);
            }
        });
    }

   

    public void actionPerformed (ActionEvent e) {
        if (e.getSource () == miNewGame) {
            GameServerSocketSet newgameset = new GameServerSocketSet (this);
            portNum = newgameset.getportNum ();
            server = newgameset.getServerSocket ();
        }else
        if (e.getSource () == miConnectGame) {       	
            GameClienSocketSet newgameset = new GameClienSocketSet (this);
            portNum = newgameset.getPortNum ();
            address = newgameset.getAddr ();
        }else
        if (e.getSource () == miExit) {
            GameExitSet gameexit = new GameExitSet (this);
           }else
        if (e.getSource () == miControlkey) {
            GameControlkeySet keycontrol = new GameControlkeySet (this);
            // 取出原设置控制键的值
            up = keycontrol.getUP ();
            down = keycontrol.getDOWN ();
            left = keycontrol.getLEFT ();
            right = keycontrol.getRIGHT ();

        }else
        if (e.getSource () == miHardset) {
            GameHardSet gamehardset = new GameHardSet (this);
            gamehard = gamehardset.getgameHard ();
        }else
        if (e.getSource () == miAuthor) {

        }else
        if (e.getSource () == miSourceInfo) {

        }
    } 

    public int getGameHard () {
        return gamehard;

    }

   

    public int getPortNum () {
        return portNum;
    }

    public int getDown () {
        return down;
    }

    public int getLeft () {
        return left;
    }

    public int getRight () {
        return right;
    }

    public int getUp () {
        return up;
    }
    
    

    public JMenu getMControl() {
		return mControl;
	}

	public JMenu getMGame() {
		return mGame;
	}

	public JMenu getMInfo() {
		return mInfo;
	}
    
	public JMenuItem getMiAuthor() {
		return miAuthor;
	}

	public JMenuItem getMiConnectGame() {
		return miConnectGame;
	}

	public JMenuItem getMiControlkey() {
		return miControlkey;
	}

	public JMenuItem getMiExit() {
		return miExit;
	}

	public JMenuItem getMiHardset() {
		return miHardset;
	}

	public JMenuItem getMiNewGame() {
		return miNewGame;
	}

	public JMenuItem getMiSourceInfo() {
		return miSourceInfo;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public ServerSocket getServer() {
		return server;
	}

	public void setServer(ServerSocket server) {
		this.server = server;
	}

}
