package com.winter.message;

import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RabbitListener(queues = {"mainQueue"})
public class Receiver {
    @RabbitHandler
    public void consumeMessage(String msg){
        try{
            System.out.println(msg);
            Integer.valueOf(msg);
        }
        catch (Exception e){
            System.out.println("exception ------ " +e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }
}
