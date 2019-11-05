package com.charles.game.fish.client;

import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.ObjectOutputStream;
import java.net.BindException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

import com.charles.game.fish.fishinfo.FishInfo;

public class Sender{

       //private DatagramSocket socket;
       //private DatagramPacket packet;
       InetAddress ser_inet;
       FishInfo info;

       public Sender(FishInfo  info,InetAddress ser_inet){
          this.ser_inet = ser_inet;
          this.info = info;
          send();
       }
       private synchronized void  send()
       {
       try {
            DatagramSocket socket;
            DatagramPacket packet;
          ByteArrayOutputStream byteStream = new ByteArrayOutputStream(500);
            ObjectOutputStream os = new ObjectOutputStream(new
                                    BufferedOutputStream(byteStream));
            os.flush();
            os.writeObject(info);
            os.flush();
            byte[] sendBuf = byteStream.toByteArray();

           //创建udp数据包以发送数据
           System.out.println("send data to:"+ser_inet.getHostAddress());
           packet = new  DatagramPacket(sendBuf,sendBuf.length,
                                        ser_inet,5003);
           //创建发送udp套接字，指定套接字口。
           //绑定端口5002，发送通信数据
           //如果该端口已绑定，则等待片刻后，重新绑定
           while(true)
           {
           try{
           socket = new DatagramSocket(5002);
           break;
           }
           catch(BindException be)
           {
             Thread.sleep(20);
             continue;
           }
           }
           os.close();
           //绑定成功后，发送通通信数据
           socket.send(packet);
           //发送完毕关闭套接字。
           socket.close();
           }catch(Throwable t) {
            t.printStackTrace();
        }
       }
}