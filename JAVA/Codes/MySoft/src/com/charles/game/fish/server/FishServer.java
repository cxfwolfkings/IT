package com.charles.game.fish.server;

/**
 *<p>
 * * Copyright (C),2007
 * by huanghao
 * Desctiptoin: 网络游鱼服务器端
 * </p>
 *
 */
import java.io.*;
import java.net.*;
import java.util.*;
public class FishServer {

       Transmitter  transmit;
       public FishServer()
       {
        transmit = new Transmitter();
        //创建4446端口的广播套接字
        try{
            MulticastSocket socket=new MulticastSocket(5004);
            InetAddress address;
            //客户信息列表
            //得到230.0.0.1的地址信息
            try{
                address=InetAddress.getByName("230.0.0.1");
                //使用joinGroup()将多播套接字绑定到地址上
                socket.joinGroup(address);
                }catch(UnknownHostException e)
                {e.printStackTrace();}

            DatagramPacket packet;
            boolean bn = true;
             System.out.println("begin recieve message");
             while(bn){
                  byte[] buf=new byte[7];
                  int i;
                  /***********************************************
                  * 接收来在客户端的请求连接消息
                  **********************************************/
                  packet=new DatagramPacket(buf,buf.length);
                  socket.receive(packet); //接收
                  String received = new String(packet.getData());
                  InetAddress inet =   packet.getAddress();
                  String addr = inet.getHostAddress();
                  int port = packet.getPort();

                    for(i = 0;i < ClientList.list.size();i++)
                     {
                       ClientInfo clientinfo = (ClientInfo)ClientList.list.get(i);
                       if(clientinfo.address.equals(addr))
                         //System.out.println("same to :"+i);
                         break;
                     }
                  if(received.equals("request"))
                  {

                     //如果该客户端还不在客户信息表中，则将其加入可续信息表
                     if(i >= ClientList.list.size())
                     {
                        ClientInfo client_info = new ClientInfo(addr,port,new Date().toString());
                        ClientList.list.add(client_info);
                        System.out.println("link apply from:"+addr+":"+port);
                        /***********************************************
                        * 向客户端回执消息
                        **********************************************/
                        String msg = "connect";
                        buf = msg.getBytes();
                        packet = new DatagramPacket(buf,buf.length,inet,port);
                        socket.send(packet);
                     }
                  }
                  else if(received.equals("cutlink"))
                  {
                     if(i < ClientList.list.size())
                     {
                       ClientList.list.remove(i);
                        System.out.println("\""+received+"\" message  from:"+addr+":"+port);
                        /***********************************************
                        * 向客户端回执消息
                        **********************************************/
                        String msg = "cutlink";
                        buf = msg.getBytes();
                        packet = new DatagramPacket(buf,buf.length,inet,port);
                        socket.send(packet);
                     }
                  }
                  System.out.println("client list now:");
                  for(i = 0;i < ClientList.list.size();i++)
                  {
                     ClientInfo clientinfo = (ClientInfo)ClientList.list.get(i);
                     System.out.println("address:"+clientinfo.address+" port:"+clientinfo.port);
                  }
                }
        //把广播套接字从地址上解除绑定
        socket.close(); //关闭广播套接字
        }catch(IOException e)
        {e.printStackTrace();}
        }
   public static void main(String args[]) throws IOException
   {
     new FishServer();
     }
}