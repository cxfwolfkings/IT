package com.winter.config;

import com.winter.constants.CommonConstants;
import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitmqConfig {
    private static final String DIRECT_ROUTING_KEY_RED = "color_red";
    private static final String DIRECT_ROUTING_KEY_BLACK = "color_black";
    private static final String TOPIC_ROUTING_COLOR = "message.color";
    private static final String TOPIC_ROUTING_COLORS = "message.colors";

    @Bean
    public Queue queue(){
        return new Queue(CommonConstants.RABBITMQ_QUEUE_NAME);
    }

    @Bean
    public Queue redQueue(){
        return new Queue("redQueue");
    }


    @Bean
    public Queue blackQueue(){
        return new Queue("blackQueue");
    }

    @Bean
    DirectExchange exchange() {
        return new DirectExchange("directExchange");
    }

    @Bean
    Binding bindingRedDirectExchange(Queue redQueue, DirectExchange exchange) {
        return BindingBuilder.bind(redQueue).to(exchange).with(this.DIRECT_ROUTING_KEY_RED);
    }

    @Bean
    Binding bindingBlackDirectExchange(Queue blackQueue, DirectExchange exchange) {
        return BindingBuilder.bind(blackQueue).to(exchange).with(this.DIRECT_ROUTING_KEY_BLACK);
    }


    @Bean
    public Queue queueMessageColor() {
        return new Queue("messageColor");
    }

    @Bean
    public Queue queueMessageColors() {
        return new Queue("messageColors");
    }

    @Bean
    TopicExchange topicExchange() {
        return new TopicExchange("topicExchange");
    }

    @Bean
    Binding bindingTopicColorExchange(Queue queueMessageColor, TopicExchange topicExchange) {
        return BindingBuilder.bind(queueMessageColor).to(topicExchange).with(TOPIC_ROUTING_COLOR);
    }

    @Bean
    Binding bindingTopicColorsExchange(Queue queueMessageColors, TopicExchange topicExchange) {
        return BindingBuilder.bind(queueMessageColors).to(topicExchange).with("message.#");
    }
}
