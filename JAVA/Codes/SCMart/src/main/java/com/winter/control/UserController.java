package com.winter.control;

import com.winter.model.User;
import com.winter.service.IUserService;
import com.winter.service.IRedisUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * 用户注册控制类
 */
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private IUserService userService;
    @Autowired
    private IRedisUserService redisUserService;
    @Autowired
    private RedisTemplate redisTemplate;

    @RequestMapping("/register")
    public String registerUser(@NotNull String userName, @NotNull Integer age) {
        String msg = "success";
        try {
            userService.registerUser(new User(userName, age));
        } catch (Exception e) {
            msg = "error";
        }
        return msg;
    }

    @RequestMapping("/queryUserByName")
    public User queryUserByName(@RequestParam("name") String name) {
        return userService.queryUserByName(name);
    }

    @RequestMapping(value = "/addUser", method = RequestMethod.GET)
    public String queryUserByName(@RequestParam("name") String name, @RequestParam("age") Integer age) {
        userService.addUser(new User(name, age));
        return "Success";
    }

    @RequestMapping("/queryAllUser")
    public List<User> queryAllUser(){
        return userService.findAllUser();
    }

    @RequestMapping("/queryUserByPageAndPageSize")
    public List<User> queryAllUser(int page, int pageSize) {
        return userService.findUserByPageAndPageSize(page, pageSize);
    }

    @RequestMapping("/updateUserAgeById")
    public String updateUserAgeById(Integer age, Integer userId) {
        userService.updateUserAgeByUserId(age, userId);
        return "success";
    }

    @RequestMapping("/queryUserByUserId")
    public User queryUserByUserId(Integer userId) {
        return userService.getUserInfoByUserId(userId);
    }

    @RequestMapping("/queryUserCountByAge")
    public List<Map<String, Object>> queryUserCountByAge(Integer age) {
        return userService.queryUserCountByAge(age);
    }

    @RequestMapping("/saveUserInfoIntoRedis")
    public String saveUserInfoIntoRedis(String name,Integer age){
        User user = new User(name,age);
        user.setUuid(UUID.randomUUID().toString());
        return redisUserService.saveUserInfo(user);
    }

    @RequestMapping("/getUserInfoFromRedis")
    public User getUserInfoFromRedis(String uuid){
        String realKey = (String) redisTemplate.opsForValue().get(uuid);
        return redisUserService.getUserInfo(realKey);
    }
}
