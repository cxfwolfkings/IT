package com.winter.listener;

import com.winter.utils.RedisUtil;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.ConfigurableApplicationContext;

/**
 1. 初始化redis缓存listener
 */
public class InitializeRedisCacheListener implements ApplicationListener<ApplicationReadyEvent> {

    @Override
    public void onApplicationEvent(ApplicationReadyEvent applicationReadyEvent) {
        ConfigurableApplicationContext applicationContext = applicationReadyEvent.getApplicationContext();
        RedisUtil redisUtil = applicationContext.getBean(RedisUtil.class);
        if(redisUtil != null){
            redisUtil.initializeRedisData();
        }
    }
}
