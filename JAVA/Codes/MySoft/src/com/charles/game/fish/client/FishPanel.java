package com.charles.game.fish.client;

import java.awt.Graphics;
import java.awt.Image;
import java.awt.Toolkit;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.io.IOException;
import java.util.LinkedList;

import javax.swing.JPanel;

import com.charles.game.fish.fishinfo.FishInfo;


public class FishPanel extends JPanel implements MouseListener
 {
 	private Image Background;		//背景图片
 	private Image imageFish[] = new Image[8];	//8张鱼图片
 	private int fishTotal = 8;			//鱼的总数为8条
 	//Fish fish[] = new Fish[fishTotal];	//8条鱼,即8个线程
    LinkedList fish_list = new LinkedList();
  	private boolean k = false;		//标志,响应鼠标事件会用到
  	public FishClient  client = null;

 	public FishPanel()
 	{
 		setSize(600, 468);
 		addMouseListener(this);
 		//Background = Toolkit.getDefaultToolkit().getImage("./Pics/sea.jpg");
        Background = Toolkit.getDefaultToolkit().getImage("./pics/sea2.jpg");
 		for(int i=0; i<8; i++)
                imageFish[i]= Toolkit.getDefaultToolkit().getImage("./pics/fish0"+i+".gif");

 		int x,		//鱼的x坐标
 		    y,		//鱼的y坐标
 		    width=64,	//鱼图片的宽度(所有图片宽度都为64)
 		    height = 0;	//鱼图片的宽度(各图片高度不一致)
 		for(int i=0; i<fishTotal; i++)
 		{//初始化每条鱼（线程）的状态
 			switch(i/2)
 			{//不同的鱼对应的图片高度不一致
 				case 0: height = 56; break;		//0-1两张图片高度为56
 				case 1: case 2: height = 53; break;	//2-5四张图片高度为53
 				case 3: height = 37; break;		//6-7两张图片高度为37
 			}

 			//随机产生鱼初始出现的位置
 			x = (int)(Math.random()*(600 - width));
 			y = (int)(Math.random()*(468 - height));

 			int down = (int)(Math.random()*10)%2;	//down=1 : 向下游
 	        int right= (int)(Math.random()*10)%2;	//right=1: 向右游

 			//线程实例化
 			Fish fish = new Fish(this,x,y,width,height,i,down,right);
 			fish.id = i; //为该对象分配号码，方便以后删除
 			fish_list.add(fish);
 		}
 	}

 	public void initClient()
 	{
 	   try{
           client = new FishClient(this);
           }catch(IOException ie){ie.printStackTrace();}
 	}
 	public void endClient()
 	{
 	  client.Disconnect();
 	   client = null;
 	}
 	public void delFish(int id)
 	{
       int new_x;
       Fish fish = (Fish)fish_list.get(id);
       //保存要删除的对象信息
       if(fish.x <= 0)
           new_x = this.getWidth() - fish.width;
       else
           new_x = 0;
       FishInfo fishinfo = new FishInfo(new_x,fish.y,fish.width,
                           fish.height,fish.i,fish.down,fish.right);
 	   fish.end = true; //结束该对象线程
       fish_list.remove(id); //从链表中删除此对象
       for(int i=id;i<fish_list.size();i++)
       {
        fish = (Fish)fish_list.get(i);
        fish.id = i;
       }
       //将本机上游出去的鱼的信息发送到服务器
       client.send(fishinfo);
 	}
 	public void addFish(FishInfo fishinfo)
 	{
 	    Fish fish = new Fish(this,fishinfo.x,fishinfo.y,fishinfo.width,
 	                        fishinfo.height,fishinfo.i,fishinfo.down,fishinfo.right);
 	    fish_list.add(fish);
 	}

  	public void mouseClicked(MouseEvent e)
	{//响应鼠标点击事件
	/*
		if(k)
		{
			k = !k;
			for(int i=0; i<fishTotal; i++)
			{
				fish[i] = new Fish(this,fish[i].x,fish[i].y,fish[i].width,fish[i].height,i);
			}
   		}
		else
		{
			k = !k;
			for(int i=0; i<fishTotal; i++)
				fish[i].halt();
		} */
	}
  	public void mouseExited(MouseEvent e){}
	public void mouseEntered(MouseEvent e){}
  	public void mousePressed(MouseEvent e){}
  	public void mouseReleased(MouseEvent e){}

 	public void paintComponent(Graphics g)
 	{
 		super.paintComponent(g);
 		//g.drawImage(Background,0,0,getWidth(),getHeight(),this);
 		g.drawImage(Background,0,0,getWidth(),getHeight(),this);
 		try
 		{//加载背景图片后,等待30微妙
 			Thread.sleep(30);
 		}catch(InterruptedException e){}
 		for(int i=0; i<fish_list.size(); i++)
 		{
 			Fish fish;
 			fish = (Fish)fish_list.get(i);
             //鱼向左、右游动时,显示的图片不同
 			if(fish.right == 1)
 			    g.drawImage(imageFish[(fish.i/2)*2],fish.x,fish.y,this);//标志right=1表示向右游，画鱼
 			else
 			    g.drawImage(imageFish[(fish.i/2)*2+1],fish.x,fish.y,this);
 		}
 	}

}