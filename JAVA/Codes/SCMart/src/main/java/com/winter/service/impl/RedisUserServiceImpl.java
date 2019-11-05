package com.winter.service.impl;

import com.winter.model.User;
import com.winter.service.IRedisUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service("redisUserService")
public class RedisUserServiceImpl implements IRedisUserService {
    @Autowired
    private RedisTemplate redisTemplate;

    @Override
    public User getUserInfo(String uuid) {
        String realKey = (String) redisTemplate.opsForValue().get(uuid);
        return (User) redisTemplate.opsForValue().get(realKey);
    }

    @Override
    public String saveUserInfo(User user) {
        redisTemplate.opsForValue().set(user.getUuid(), user);
        return user.getUuid();
    }
}
