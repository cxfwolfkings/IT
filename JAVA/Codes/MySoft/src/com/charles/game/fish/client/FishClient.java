package com.charles.game.fish.client;

/**
 *<p>
 * * Copyright (C),200
 * by huanghao
 * Desctiptoin: 负责客户端UDP广播发送
 * </p>
 *
 */
import java.io.IOException;
import java.net.InetAddress;

import com.charles.game.fish.fishinfo.FishInfo;


public class FishClient{

       InetAddress inet;
       InetAddress ser_inet;
       FishPanel  fishpanel;
       MultiCast cast = null;

     public FishClient(FishPanel fishpanel) throws IOException
     {
       this.fishpanel = fishpanel;
       //如果找到服务器端，启动数据接收线程
       cast = new MultiCast("request");

       if(NetState.b_connect)
       {
          this.ser_inet = cast.GetServerAddr();
          new Receiver(fishpanel);
          System.out.println("linked to the server:"+ser_inet.getHostAddress());

       }
      }
      public void send(FishInfo info)
      {
         if(ser_inet != null)
         new Sender(info,ser_inet);
      }
      public void  Disconnect()
      {
         MultiCast cast = new MultiCast("cutlink");
      }
}