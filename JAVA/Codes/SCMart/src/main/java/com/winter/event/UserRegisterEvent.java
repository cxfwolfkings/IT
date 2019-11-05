package com.winter.event;

import com.winter.model.User;
import org.springframework.context.ApplicationEvent;

/**
 *事件定义类
 */
public class UserRegisterEvent extends ApplicationEvent {
    private User user;

    /**
     * source 表示事件源对象
     * user表示注册用户对象
     * @param source
     * @param user
     */
    public UserRegisterEvent(Object source, User user) {
        super(source);
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
