package com.winter.listener;

import com.winter.event.UserRegisterEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
public class AsyncAnnotationUserRegisterListener {
    @Async
    @EventListener
    public void sendMailToUser(UserRegisterEvent userRegisterEvent) {
        try {
            Thread.sleep(5000);
        } catch (Exception e) {

        }
        System.out.println("利用@EventListener注解监听用户注册事件并异步向用户发送邮件");
    }
}
