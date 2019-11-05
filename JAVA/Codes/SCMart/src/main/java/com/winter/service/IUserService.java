package com.winter.service;

import com.winter.model.User;

import java.util.List;
import java.util.Map;

public interface IUserService {
    /**
     * 注册用户
     * @param user
     */
    void registerUser(User user);
    User queryUserByName(String name);
    void addUser(User user);
    List<User> findAllUser();
    List<User> findUserByPageAndPageSize(int currentPage, int pageSize);
    void updateUserAgeByUserId(Integer age, Integer userId);
    User getUserInfoByUserId(Integer userId);
    List<Map<String, Object>> queryUserCountByAge(int age);
}
