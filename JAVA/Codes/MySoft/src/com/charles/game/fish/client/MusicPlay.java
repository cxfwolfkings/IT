package com.charles.game.fish.client;
/**
 * <p>
 * Copyright (C),2006
 * Originally created 张成峰
 * Revised by huanghao
 *
 * Desctiptoin:   主要描述声音循环播放
 * Functoin List:
 *          <Name>             <Desc>
 * 1、      构造方法          线程启动
 * 2、       run               线程运行
 * 3、       main         创建实例，主函数运行
 * </p>
 *
 * @version 1.00
 * @see     Sprite
 */
import java.io.FileInputStream;
import sun.audio.AudioStream;
public class MusicPlay extends Thread{
 FileInputStream music;//声明文件流对象
 private static final int SleepTime = 1500;
 int i;
 public boolean  play = true;

 AudioStream play_music;//声明音频流对象
 /*
  *构造方法，线程启动
  */
 MusicPlay(){
  this.start();
 }

 /*
  *线程运行
  */
 public void run(){

  //循环播放
  while(play){
   try{
    i = (int)Math.floor(Math.random()*2);
    music=new FileInputStream("./sound/bubble"+i+".wav");//创建文件流对象
    //music=new FileInputStream("../windmusic.wav");
    play_music=new sun.audio.AudioStream(music);//创建音频流对象
   }catch(Exception e){System.out.println(e);}

   sun.audio.AudioPlayer.player.start(play_music);//开始播放
   try{
    if(i == 0)
    Thread.sleep(6000);//音频播放时间
    else
    Thread.sleep(3000);
   }catch(Exception e){System.out.println(e);}
  }
  return;
 }
 /*
  *主函数运行。
  */
/* public static void main(String[] args){
  new MusicPlay();
 } */
}