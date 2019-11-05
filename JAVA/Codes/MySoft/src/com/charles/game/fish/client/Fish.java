package com.charles.game.fish.client;
class Fish extends Thread
 {
 	 int id;
     int x,		  //该鱼的x坐标
 	    y,		  //该鱼的y坐标
 	    width,	  //该鱼使用的图片的宽度
 	    height;	  //该鱼使用的图片的高度

	int space_mul  = 40,  //控制v值的一个乘数
	    space_plus = 10,  //控制v值的一个加数
	    lean_mul  = 10,  //控制l值的一个乘数
	    x1_mul = 1800,//控制x1值的一个乘数
	    y1_mul = 800; //控制y1值的一个乘数

 	//随机产生鱼初始游的方向
 	//int down = (int)(Math.random()*10)%2;	//down=1 : 向下游
 	//int right= (int)(Math.random()*10)%2;	//right=1: 向右游
 	int down,
 	    right;
 	int space = (int)(Math.random()*space_mul)+space_plus;//space用来控制刷新周期,space越小,两次刷新之间的时间间隔就越小,从而速度就越快
 	int lean_angle = (int)(Math.random()*lean_mul);	//随机产生斜游角度比x:y=lean_angle,即在x方向上游动l次之后才在y方向上移动一次

	//随机产生鱼上下左右游动的最大上限，即振幅
 	int x1 = (int)(Math.random()*x1_mul);   //值在0~1800之间
 	int y1 = (int)(Math.random()*y1_mul);    // 0~800

 	int i,	//鱼的标志：第i条鱼(本程序中共有8条鱼)
 	    count_x1 = 0,//x方向上振幅计数
 	    count_y1 = 0;//y方向上振幅计数


 	boolean running = true;
 	boolean end = false;
 	FishPanel fishpanel;

 	public Fish(FishPanel _fishpanel, int _x, int _y, int _width, int _height, int _i,int _down,int _right)
 	{
 		fishpanel = _fishpanel;
 		        x = _x;
 		        y = _y;
 		    width = _width;
 		   height = _height;
 		        i = _i;
                down = _down;
                right = _right;
 		start();
 	}

 	public void start()
 	{
 		running = true;
 		super.start();
 	}

 	public void run()
 	{
        while(running)
 		{
 			if(end)
 			    return;
            computeX();
 			computeY();
 			try
 			{
 				sleep(space);//v
 			}catch(Exception e){}
 			fishpanel.repaint();
 		}
 	}

 	public void halt()
 	{
 		running = false;
 	}

 	public void computeX()
 	{
         if(right == 1)
 		{
 			if(x >= fishpanel.getWidth()-width)
 			{//判断是否到右端边框或达到最大振幅
 				  //如果已连接到网络，则需将此鱼从面板上删除
                  if(NetState.b_connect)
 				 {
                    //从本机上删除此对象
                    fishpanel.delFish(this.id);
 				 }
                  else
 				 {
                     x = 0;
                     reset('x');
                 }
 			}
 			else if(count_x1 == x1)
 			    right = 0;
 			x++;
 		}
 		else
 		{
 			 if(x <= 0)
 			 {//判断是否到左端边框或达到最大振幅
 			 	//如果已连接到网络，则需将此鱼从面板上删除
                  if(NetState.b_connect)
 				 {
                    //从本机上删除此对象
                    fishpanel.delFish(this.id);
 				 }
 				 else
 				 {
                     x = fishpanel.getWidth()-width;
                     reset('x');
 			     }
              }
              else if(count_x1 == x1)
 			    right = 1;
 			 x--;
 		}
 		count_x1++;
 	}

 	public void computeY()
 	{//计算鱼的上下游动
 		if(lean_angle != 0)//判断随机数lean_angle是否为0，是则水平游动，否则计算角度
 		if(down == 1 && count_x1%lean_angle == 0)//x former
 		{//down=1表示向下游且当x++或x--了lean_angle次后，y++
 			if(y >= fishpanel.getHeight()-height || count_y1 == y1)
 			{//判断是否到底或上下振幅游满否
 				down=0; reset('y');
 			}
 			y++;
 		}
 		else if(count_x1%lean_angle == 0 || count_y1 == y1)//x former
 		{//当向上游且当x++或x--了l次之后,y--
 			if(y <= 0)
 			{
 				down=1; reset('y');
 			}
 			y--;
 		}
 		count_y1++;
 	}

 	public void reset(char xory)
 	{//鱼游动状态改变后重新生成各项数值
 		if(xory == 'x')
 		{
            x1 = (int)(Math.random()*x1_mul);//重新生成新的左右振幅(判断依据：x)
 			count_x1 = 0; //左右振幅计数清0
 		}
 		else
 		{
 			y1 = (int)(Math.random()*y1_mul);//重新生成新的上下振幅(判断依据：y)
 			count_y1 = 0;//上下振幅计数清0
 		}
 		space = (int)(Math.random()*space_mul)+space_plus;//重新生成新的速度
 		lean_angle = (int)(Math.random()*lean_mul);//重新生成新的角度比
 	}
 }