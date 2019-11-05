package com.winter.listener;

import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;

/**
 * Redis消息监听实现类
 */
public class RedisChannelListener implements MessageListener {
    @Override
    public void onMessage(Message message, byte[] bytes) {
        byte[] channelBytes = message.getChannel();
        byte[] bs = message.getBody();
        try {
            String content = new String(bs,"UTF-8");
            String channel = new String(channelBytes,"UTF-8");
            System.out.println("channel:" + channel + "---" + "message:" + content);
        }
        catch (Exception e){
            System.out.println(e.getMessage());
        }
    }
}
