package com.winter.repository;

import com.winter.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IUserRepositoryJpa extends JpaRepository<User, Integer> {
    User findByName(String name);

    @Modifying
    @Query(value = "update user set age = ?1 where id = ?2", nativeQuery = true)
    void updateUserInfoByUserId(Integer userAge, Integer userId);

    @Query(value = "select * from user where id = ?1", nativeQuery = true)
    User queryUserInfoByUserId(Integer userId);

    @Query(value = "select age, count(*) from user where age < ?1 group by age", nativeQuery = true)
    List<Object[]> getUserCount(Integer age);
}
