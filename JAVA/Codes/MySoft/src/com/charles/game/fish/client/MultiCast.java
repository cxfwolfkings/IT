package com.charles.game.fish.client;
import java.net.*;
import java.io.*;

public class MultiCast{

InetAddress inet;
private InetAddress ser_inet = null;
protected DatagramSocket socket;

     public MultiCast(String msg)
     {
       try{
            socket=new DatagramSocket(5000);
            }catch(SocketException e){
            e.printStackTrace();
            }
            try{
            inet = InetAddress.getLocalHost();
            byte[] buf=new byte[7];
            //创建缓冲区
            //String dString="request";
            buf=msg.getBytes();
            InetAddress group=InetAddress.getByName("230.0.0.1");
            //得到230.0.0.1的地址信息
            DatagramPacket packet=new DatagramPacket(buf,buf.length,group,5004);
            //根据缓冲区，广播地址，和端口号创建DatagramPacket对象
            socket.send(packet); //发送该Packet
            packet = new DatagramPacket(buf,buf.length);
            //接收回复消息
            socket.setSoTimeout(1000);
            try{
            socket.receive(packet);
            String received = new String(packet.getData());
            //根据回复消息得到服务器地址、端口
            if(received.equals("connect"))
                {
                ser_inet = packet.getAddress();
                NetState.b_connect = true;
                }
            if(received.equals("cutlink"))
                {
                NetState.b_connect = false;
                }

            }catch(SocketTimeoutException e)
            {
               e.printStackTrace();
               socket.close();
            }


         }catch(IOException  e){ //异常处理
                         e.printStackTrace( ); //打印错误栈
                        }
        socket.close();
     }
     public InetAddress  GetServerAddr()
     {
      return ser_inet;
     }

}