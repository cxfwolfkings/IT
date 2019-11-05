package com.charles.game.fish.client;
import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.ObjectInputStream;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.SocketException;

import com.charles.game.fish.fishinfo.FishInfo;


public class Receiver extends Thread{

       private DatagramPacket packet;
       private DatagramSocket socket;
       byte[] recvBuf = new byte[500];
       FishInfo  fishinfo;
       FishPanel  fishpanel;
       boolean running = true;

       public Receiver(FishPanel  fishpanel){
       super();

       try{
       socket = new DatagramSocket(5001);
       }catch(SocketException e)
       {e.printStackTrace();}

       this.fishpanel = fishpanel;

       start();
       }
       public void run(){
       while(running)
       {
       try{
       //创建udp包以接受数据。

       packet = new DatagramPacket(recvBuf,recvBuf.length);
        socket.receive(packet);
        ByteArrayInputStream byteStream = new
                           ByteArrayInputStream(recvBuf);
        ObjectInputStream is = new ObjectInputStream(new
                           BufferedInputStream(byteStream));
        Object o = is.readObject();
        fishinfo = (FishInfo)o;
        fishpanel.addFish(fishinfo); //将接收到的'游鱼'加入面板中
       is.close();
       //调用面板类，根据收到的消息，添加鱼
       }
         catch(Throwable t) {
            t.printStackTrace();
       }
       }
       }
}