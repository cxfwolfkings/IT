package com.winter.control;

import com.winter.constants.CommonConstants;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/rabbitmq")
public class RabbitmqController {
    @Autowired
    private AmqpTemplate amqpTemplate;

    @Resource
    private RabbitTemplate rabbitTemplate;

    @RequestMapping("/sendMessage")
    public String sendMessageToMq(String msg) {
        amqpTemplate.convertAndSend(CommonConstants.RABBITMQ_QUEUE_NAME, msg);
        return "send message successfully";
    }

    @RequestMapping("/sendSecondMessage")
    public String sendSecondMessage(String msg) {
        amqpTemplate.convertAndSend(CommonConstants.RABBITMQ_QUEUE_NAME, "生产者2：" + msg);
        return "send message successfully";
    }

    @RequestMapping("/sendRedColorMessage")
    public String sendRedColorMessage(String msg) {
        amqpTemplate.convertAndSend("directExchange", "color_red", msg);
        return "send message successfully";
    }

    @RequestMapping("/sendBlackColorMessage")
    public String sendBlackColorMessage(String msg) {
        amqpTemplate.convertAndSend("directExchange", "color_black", msg);
        return "send message successfully";
    }

    @RequestMapping("/sendTopicColorMessage")
    public String sendTopicColorMessage(String msg) {
        amqpTemplate.convertAndSend("topicExchange","message.color",msg);
        return "send message successfully";
    }

    @RequestMapping("/sendTopicColorsMessage")
    public String sendTopicColorsMessage(String msg) {
        amqpTemplate.convertAndSend("topicExchange", "message.colors", msg);
        return "send message successfully";
    }

    @RequestMapping("/sendMessageToMainQueue")
    public String sendMessageToMainQueue(){
        amqpTemplate.convertAndSend("mainDirectExchange",
                "mainQueue_routing_key","testMessage");
        return "success";
    }
}
