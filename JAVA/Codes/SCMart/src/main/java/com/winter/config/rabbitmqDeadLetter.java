package com.winter.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class rabbitmqDeadLetter {
    //死信队列交换机名称
    final String DEAD_LETTER_EXCHANGE="dead_exchange";
    //死信队列路由键
    final String DEAD_LETTER_ROUTING_KEY="dead_routing_key";

    /**
     * 申明mainQueue队列并设置其死信队列相关参数
     * @return
     */
    @Bean
    public Queue maintainQueue() {
        Map<String,Object> args=new HashMap<>();
        // 设置该mainQueue的死信队列交换机
        args.put("x-dead-letter-exchange", this.DEAD_LETTER_EXCHANGE);
        // 设置mainQueue的死信队列路由键
        args.put("x-dead-letter-routing-key", DEAD_LETTER_ROUTING_KEY);

        return new Queue("mainQueue",true,false,false,args);
    }

    /**
     * 申明mainQueue队列交换机
     * @return
     */
    @Bean
    public DirectExchange directExchange(){
        return new DirectExchange("mainDirectExchange");
    }

    /**
     * 利用路由键将mainQueue与交换机绑定在一起
     * @return
     */
    @Bean
    public Binding maintainBinding() {
        return BindingBuilder.bind(maintainQueue()).to(directExchange())
                .with("mainQueue_routing_key");
    }

    /**
     * 申明死信队列
     * @return
     */
    @Bean
    public Queue deadLetterQueue(){
        return new Queue("dead_letter_queue");
    }

    /**
     * 申明死信队列交换机
     * @return
     */
    @Bean
    public DirectExchange deadLetterExchange() {
        return new DirectExchange(this.DEAD_LETTER_EXCHANGE, true, false);
    }

    /**
     * 利用路由键将dead_letter_queue与交换机绑定在一起
     * @return
     */
    @Bean
    public Binding deadLetterBindding(){
        return BindingBuilder.bind(deadLetterQueue()).to(deadLetterExchange()).
                with(this.DEAD_LETTER_ROUTING_KEY);
    }

}
