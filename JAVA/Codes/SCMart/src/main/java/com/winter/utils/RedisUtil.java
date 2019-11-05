package com.winter.utils;

import org.springframework.stereotype.Component;

@Component
public class RedisUtil {
    /**
     * 初始化redis缓存数据
     */
    public void initializeRedisData(){
        System.out.println("正在初始化redis数据");
        try {
            Thread.sleep(5000);
        }
        catch (Exception e){

        }
    }
}
