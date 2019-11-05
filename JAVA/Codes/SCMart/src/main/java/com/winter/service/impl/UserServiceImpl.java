package com.winter.service.impl;

import com.winter.repository.IUserRepository;
import com.winter.repository.IUserRepositoryJpa;
import com.winter.event.UserRegisterEvent;
import com.winter.model.User;
import com.winter.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 用户注册服务实现类
 */
@Service("userService")
public class UserServiceImpl implements IUserService {
    @Autowired
    private ApplicationContext applicationContext;
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private IUserRepositoryJpa userDao;

    /**
     * 用户注册
     * @param user
     */
    @Override
    public void registerUser(User user) {
        if (user != null) {
            userRepository.registerUser(user);
            // 发布用户注册事件
            applicationContext.publishEvent(new UserRegisterEvent(this, user));
            System.out.println("用户注册完成");
        }
    }

    @Override
    public User queryUserByName(String name) {
        return null;
    }

    @Override
    public void addUser(User user) {

    }

    @Override
    public List<User> findAllUser() {
        return userDao.findAll(new Sort(Sort.Direction.DESC,"age"));
    }

    /**
     * 对用户年龄降序排列并实现分页查询
     * @param currentPage
     * @param pageSize
     * @return
     */
    @Override
    public List<User> findUserByPageAndPageSize(int currentPage, int pageSize) {
        Sort ageSort = new Sort(Sort.Direction.DESC,"age");
        Pageable pageable = PageRequest.of(currentPage, pageSize, ageSort);
        Page<User> page = userDao.findAll(pageable);
        if (page != null) {
            return page.getContent();
        }
        return null;
    }

    @Override
    @Transactional
    public void updateUserAgeByUserId(Integer age, Integer userId) {
        userDao.updateUserInfoByUserId(age, userId);
    }

    @Override
    public User getUserInfoByUserId(Integer userId) {
        return userDao.queryUserInfoByUserId(userId);
    }

    @Override
    public List<Map<String, Object>> queryUserCountByAge(int age) {
        List<Object[]> list = userDao.getUserCount(age);
        if (!CollectionUtils.isEmpty(list)) {
            List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();
            for(Object[] objects : list){
                Map<String, Object> map = new HashMap<String, Object>();
                map.put("age", objects[0]);
                map.put("userCount", objects[1]);
                mapList.add(map);
            }
            return mapList;
        }
        return null;
    }
}
