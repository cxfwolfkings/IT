package com.winter.repository.impl;

import com.winter.model.User;
import com.winter.repository.IUserRepository;
import org.springframework.stereotype.Repository;

@Repository("userRepository")
public class UserRepository implements IUserRepository {

    @Override
    public void registerUser(User user) {
        //模拟用户注册
        try {
            Thread.sleep(5000);
        } catch (Exception e) {

        }
        System.out.println("用户信息持久化完成");
    }
}
