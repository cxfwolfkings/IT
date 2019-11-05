package com.winter.repository;

import com.winter.model.User;

public interface IUserRepository {
    /**
     * 注册用户信息
     * @param user
     */
    void registerUser(User user);
}
