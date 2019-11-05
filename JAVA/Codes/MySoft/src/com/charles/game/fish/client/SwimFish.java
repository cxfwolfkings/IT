package com.charles.game.fish.client;

/***********************************
 *SwimFish_1.java
 *
 *Originally created by Wenbin Lian
 *Revised by Zifei Zhong
 *
 *Dept. of Computer Science
 *Wuhan University
 *Wuhan 430072 China
 ***********************************/

 import java.awt.*;
 import javax.swing.*;
 import java.awt.event.*;
 import java.util.LinkedList;
 import java.io.IOException;


  /**********************************************
 * 主类：SwimFish
 * ********************************************/
 public class SwimFish extends JFrame  implements ActionListener
 {
 	 private  MenuItem file_connect = new MenuItem("Connet");
 	 private  MenuItem file_exit = new MenuItem("Exit");
 	 private  MenuItem op_sound = new MenuItem("Disable Sound");
 	 private  MenuItem help_about = new MenuItem("About");
 	 private  MusicPlay  music;

 	 private  boolean  b_play = true;
 	 private  FishPanel fishpanel;

     public SwimFish()
 	{
 		setTitle("Swimming Fishes with Network");

        Menu file = new Menu("File");
 		file.add(file_connect);
 		file.add(file_exit);
        file.addSeparator();

        Menu options = new Menu("Options");
        options.add(op_sound);
        options.addSeparator();

        Menu help = new Menu("Help");
        help.add(help_about);
        help.addSeparator();

        MenuBar bar = new MenuBar();
        bar.add(file);
        bar.add(options);
        bar.add(help);
        setMenuBar(bar);

        file_connect.addActionListener(this);
        file_exit.addActionListener(this);
        op_sound.addActionListener(this);
        help_about.addActionListener(this);

 		setSize(600,468);
 		setResizable(false);
 		fishpanel = new FishPanel();
 		Container contentpane = getContentPane();
 		contentpane.add(fishpanel);
 		setVisible(true);
 		music = new MusicPlay();
 		enableEvents(AWTEvent.WINDOW_EVENT_MASK);
 	}

 	protected void processWindowEvent(WindowEvent e) {
         if (e.getID() == WindowEvent.WINDOW_CLOSING) {

            if(NetState.b_connect)
                fishpanel.endClient();
             System.exit(0);

          }else{
           super.processWindowEvent(e);
           }
        }

 /**********************************************
 * 菜单命令消息处理
 * ********************************************/
    public void actionPerformed(ActionEvent e)
 	{
 	    if(e.getSource()== file_connect)
 	    {
 	        //响应"连接"或者"断开连接"消息
 	        if(NetState.b_connect == false && fishpanel.client == null)
 	        {

               fishpanel.initClient();
               if(NetState.b_connect)
 	            {
 	           //将菜单项改为"disable connect"

 	            file_connect.setLabel("disable connect");
 	            }
 	        }
 	        else
 	        {
               //将菜单项改为"connect"
               file_connect.setLabel("connect");
               fishpanel.endClient();
 	        }
 	    }
 	    if(e.getSource()== file_exit)
 	    {
 	         if(NetState.b_connect)
                fishpanel.endClient();
             System.exit(0);
 	    }
 	    if(e.getSource()== op_sound)
 	    {
 	         if(b_play)
 	         {
              music.play = false;
              op_sound.setLabel("enable sound");
              b_play = !b_play;
 	         }
 	         else
 	         {
 	           music = new MusicPlay();
 	         op_sound.setLabel("disable sound");
 	         b_play = !b_play;
 	         }
 	    }
 	    if(e.getSource()== help_about)
 	    {
 	       new AboutDialog(this);
 	    }
 	}
 	public static void main(String args[])
 	{
 		new SwimFish();
 	}
 }