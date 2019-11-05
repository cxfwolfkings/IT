package com.winter.demo;

import com.winter.filter.LoginFilter;
import com.winter.listener.InitializeRedisCacheListener;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

import javax.servlet.Filter;

/**
 * 运行成功，访问不了(404)原因：
 * 一 spring boot的启动类不能直接放在main(src.java.main)这个包下面，把它放在有包的里面就可以了。
 * 二 正常启动了，但是我写了一个controller，用的@RestController注解去配置的controller，
 *    然后路径也搭好了，但是浏览器一直报404.最后原因是，spring boot只会扫描启动类当前包和以下的包 。
 *    如果将spring boot放在包com.dai.controller里面的话，它会扫描com.dai.controller和com.dai.controller.*里面的所有的； 
 *    还有一种解决方案是在启动类的上面添加 @ComponentScan(basePackages = {"com.dai.*"})
 */
@SpringBootApplication
@ServletComponentScan
@ComponentScan(basePackages = { "com.winter" })
public class DemoApplication {

	public static void main(String[] args) {
	    // SpringApplication.run(DemoApplication.class, args);
		SpringApplication springApplication = new SpringApplication(DemoApplication.class);
		springApplication.addListeners(new InitializeRedisCacheListener());
		springApplication.run(args);
	}

	@Bean
	public FilterRegistrationBean securityFilter() {
		FilterRegistrationBean registration = new FilterRegistrationBean();
		Filter loginFilter = new LoginFilter();
		registration.setFilter(loginFilter);
		registration.addUrlPatterns("/*");
		registration.setName("loginFilter");
		registration.setOrder(1);
		return registration;
	}
}
