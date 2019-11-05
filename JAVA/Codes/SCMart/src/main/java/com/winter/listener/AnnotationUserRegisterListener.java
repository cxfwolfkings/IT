package com.winter.listener;

import com.winter.event.UserRegisterEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

/**
 * 监听器代码
 * 利用@EventListener注解监听用户注册事件
 */
@Component
public class AnnotationUserRegisterListener {
    @EventListener
    public void sendMailToUser(UserRegisterEvent userRegisterEvent){
        System.out.println("利用@EventListener注解监听用户注册事件并向用户发送邮件");
        System.out.println("注册用户名：" + userRegisterEvent.getUser().getName());
    }
}
