package com.winter.control;

import com.winter.message.PublishRedisMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/redis")
@RestController
public class RedisController {
    @Autowired
    @Qualifier("publishRedisMessage")
    private PublishRedisMessage publishRedisMessage;

    @RequestMapping("/publishMessage")
    public String publishRedisMessage(String channel, String msg){
        return  publishRedisMessage.publishMessage(channel, msg);
    }
}
