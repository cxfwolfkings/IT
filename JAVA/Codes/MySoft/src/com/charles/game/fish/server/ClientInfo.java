package com.charles.game.fish.server;
import java.io.*;
public class  ClientInfo{
     String address;
     int port;
     String init_time;
        public ClientInfo(String address,int port,String init_time)
        {
            this.address = address;
            this.port = port;
            this.init_time =  init_time;
            //System.out.println(id+" "+address+" "+port+" "+init_time);
        }
        public void output(){
            System.out.println("address:"+address+":"+port+"\n"+"init time:"+init_time);
        }
}