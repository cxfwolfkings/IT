package com.winter.message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;

/**
 * Redis发布消息类
 */
@Component("publishRedisMessage")
public class PublishRedisMessage {
    @Autowired
    @Qualifier("redisTemplate")
    private RedisTemplate redisClient;

    public String publishMessage(String channel,String message){
        redisClient.convertAndSend(channel,message);
        return "publish successfully";
    }
}
