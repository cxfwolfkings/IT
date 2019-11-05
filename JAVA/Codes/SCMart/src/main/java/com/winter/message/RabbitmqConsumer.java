package com.winter.message;

import com.winter.constants.CommonConstants;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RabbitListener(queues = {CommonConstants.RABBITMQ_QUEUE_NAME})
public class RabbitmqConsumer {

    @RabbitHandler
    public void consumeMessage(String msg) throws Exception{
        Thread.sleep(5000);
        System.out.println("接受到的消息:-----"+ msg);
    }
}
