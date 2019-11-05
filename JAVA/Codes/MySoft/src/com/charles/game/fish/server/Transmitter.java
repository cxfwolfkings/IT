package com.charles.game.fish.server;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.ObjectInputStream;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;
import java.net.UnknownHostException;

import com.charles.game.fish.fishinfo.FishInfo;


public class Transmitter extends Thread {
     private DatagramPacket packet;
     private DatagramSocket socket;
     byte[] recvBuf = new byte[500];
     FishInfo  fishinfo;
     InetAddress dest_inet;
     boolean running;
     int i;

     public Transmitter(){
       start();
       }
     public void start()
     {
      running = true;
      try{
      socket = new DatagramSocket(5003);
      }catch(SocketException e)
      {e.printStackTrace();}
      super.start();
     }
     public void run()
     {
     while(running)
     {
     try{
       //创建udp包以接受数据。
       packet = new DatagramPacket(recvBuf,recvBuf.length);

       //创建接受方的udp端口以接收数据

        socket.receive(packet);

        ByteArrayInputStream byteStream = new
                           ByteArrayInputStream(recvBuf);
        ObjectInputStream is = new ObjectInputStream(new
                           BufferedInputStream(byteStream));
        Object o = is.readObject();
        fishinfo = (FishInfo)o;
        System.out.println(o);
        is.close();
        InetAddress inet = packet.getAddress();
        String addr = inet.getHostAddress();
        //转发数据报
        for(i = 0;i < ClientList.list.size();i++)
                     {
                       ClientInfo clientinfo = (ClientInfo)ClientList.list.get(i);
                       if(clientinfo.address.equals(addr))
                         break;
                     }
        if(fishinfo.right == 1)
          dest_inet = getNext(i);
         else
          dest_inet = getPrior(i);

          if(dest_inet != null)
          {
             packet = new DatagramPacket(recvBuf,recvBuf.length,dest_inet,5001);
             socket.send(packet);
          }
        System.out.println("data sent!\n from:"+addr+" to "+dest_inet.getHostAddress());
       }
       catch(Throwable t) {
            t.printStackTrace();
       }
       }
     }
     private InetAddress getNext(int i)
     {
       ClientInfo clientinfo;
       String dest_addr;
       InetAddress dest_inet = null;


       if(i < ClientList.list.size()-1)
          {
           clientinfo = (ClientInfo)ClientList.list.get(i+1);
           dest_addr = clientinfo.address;

          }
       else
       {
          clientinfo = (ClientInfo)ClientList.list.getFirst();
          dest_addr = clientinfo.address;
       }
        try{
               dest_inet =  InetAddress.getByName(dest_addr);
               }catch(UnknownHostException e)
               {e.printStackTrace();}
       return dest_inet;
     }
     private InetAddress getPrior(int i)
     {
     ClientInfo clientinfo;
     String dest_addr;
     InetAddress dest_inet = null;

     if(i > 0)
          {
           clientinfo = (ClientInfo)ClientList.list.get(i-1);
           dest_addr = clientinfo.address;
          }
       else
       {
          clientinfo = (ClientInfo)ClientList.list.getLast();
          dest_addr = clientinfo.address;
       }
        try{
               dest_inet = InetAddress.getByName(dest_addr);
               }catch(UnknownHostException e)
               {e.printStackTrace();}
        return dest_inet;
     }
}