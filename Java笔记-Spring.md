# 目录

- Spring
- SSH
- SSM
- SpringBoot



## Spring

![x](http://viyitech.cn/public/images/spring_frm.png)

Spring MVC 框架的工作流程图及注释：

![x](http://viyitech.cn/public/images/spring_mvc.gif)

MyBatis 的结构图：

![x](http://viyitech.cn/public/images/mybatis.png)





## SpringBoot

Spring Boot未出现之前，我们利用Spring、Spring MVC进行项目开发时，整个项目从引入依赖Jar包，书写配置文件，打包部署到开发环境、测试环境、生产环境都需要大量人力，但是最终的效果仍不尽如人意，甚至还会给一个项目组带来项目延期的风险等。

随着敏捷开发思想被越来越多的人接受以及开发者对开发效率的不断追求，最终推出了具有颠覆和划时代意义的框架Spring Boot。

Spring Boot首先遵循 **习惯优于配置** 原则，言外之意即是尽量使用自动配置让开发者从繁琐的书写配置文件的工作中解放出来；Spring Boot另外一个比较明显的特点就是尽量不使用原来 Spring 框架中的 XML 配置，而主要使用 **注解** 代替。

Spring Boot由 Spring、Spring MVC演化而来，注解也继承自两者。下面我们看下Spring MVC中常用的注解：

1.	@Controller：该注解用于类上，其表明该类是Spring MVC的 Controller；
2.	@RequestMapping：该注解主要用来映射Web请求，其可以用于类或者方法上；
3.	@RequestParam：该注解主要用于将请求参数数据映射到功能处理方法的参数上；
4.	@ResponseBody：该注解的作用是将方法的返回值放在Response中，而不是返回一个页面，其可以用于方法上或者方法返回值前；
5.	@RequestBody：用于读取HTTP请求的内容（字符串），通过Spring MVC提供的HttpMessageConverter接口将读到的内容转换为JSON、XML等格式的数据并绑定到Controller方法的参数上；
6.	@PathVariable：用于接收请求路径参数，将其绑定到方法参数上；
7.	@RestController：该注解是一个组合注解，只能用于类上，其作用与@Controller、@ResponseBody一起用于类上等价。

注：在Spring 4.3中引进了@GetMapping、@PostMapping、@PutMapping、@DeleteMapping、@PatchMapping。

```java
@RestController
@RequestMapping("/springmvc")
public class TestAnnotationController {
    @RequestMapping(value = "/setUserInfo", method = RequestMethod.GET)
    public String setUserInfo(@RequestParam(name = "userName") String userName){
        System.out.println(userName);
        return "success";
    }
}
```

以上是运用Spring MVC注解的一个简单实例，下面对其发送请求到结果返回的整个流程进行简要分析

1、调用类 `DispatcherServlet` 中 `doService` 方法对请求进行处理，该方法主要就进一步调用 `doDispatch` 方法对请求进行处理，源码如下：





**开发流程**

从软件项目开发的基本流程讲起，一个项目从开始立项到项目完成一般包含这么几个过程：

- 可行性分析：从市场、政策、经济、技术、人员等各方面因素来分析这个软件项目开发的可实行性。
- 需求分析：做市场调研，通过请教行业专家或者分析市场同类型的产品，来判断这个项目的开发是否有发展前景。
- 系统设计：确定软件的体系结构、数据结构、算法、模块功能，以及用户界面的设计等等，如果这些事情没有设计好，接下来的设计可能会变得一团糟。
- 程序设计：根据以上几点进行软件编码，将软件设计转换成计算机能够识别的程序语言。
- 测试与调整：一款软件从开发出来到正式的发布，一定需要经过不断的测试，才能尽可能地发现更多的错误，然后做出相应的修改，而且修改之后还需要重新测试。
- 系统维护：系统维护主要是根据用户在使用过程遇到的错误，或者由于硬件设备不断更新等外部因素引发的问题，或者为了完善用户的体验度等等而做出的相应的完善和维护。

下面，主要带大家掌握Spring Boot开发时所需要的以下技能：

- 简单的RESTful风格接口开发；
- 多环境配置文件动态切换，并读取配置文件内容；
- Listener的使用；
- Filter的使用；
- Interceptor的使用。

### 开发简单的RESTful风格接口

首先，我们访问：http://start.spring.io/，选择构建工具Maven，采用编程语言Java，下载项目压缩包。将下载的项目压缩包解压后，导入idea中，然后在此基础项目结构中进行开发即可。为了能够开发RESTful风格的接口，需要在pom.xml文件中添加如下依赖：

```xml
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

接下来编写Controller：

```C#
@RestController
@RequestMapping(value = "/restful")
public class TestRestfulInterfaceController{
    @RequestMapping("/test")
    public String testRestfulInterface(@RequestParam("name") String name) {
        return "hello" + name;
    }
}
```

将程序启动起来，并利用Postman进行测试(http://localhost:8080/restful/test?name=Colin)，可以查看输出结果。

### 多环境配置文件动态切换并读取配置文件内容

利用Spring Boot进行微服务开发时，配置文件既可以利用*.properties文件格式，又可以利用*.yml格式文件。不过在开发中，通常选择利用yml格式配置文件，该格式文件可读性更好。

下面分别新建application.yml、application-dev.yml、application-test.yml、application-prod.yml 四个配置文件。

将配置文件(application.yml)换到测试环境：

```yml
server:
  contextpath: /

spring:
  profiles:
    active: text
```

读取配置文件中的配置项，分别在dev、test、prod对应配置文件中添加student相关配置信息，在程序中读取配置文件并将其内容打印出来。

```yml
server:
  port: 8100

student:
  name: test-winter
  age: 40
```

读取配置文件内容代码：

```java
package com.winter.model;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class StudentConfig {

    @Value("${student.name}")
    private String name;

    @Value("${student.age}")
    private Integer age;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }
}
```

打印学生信息代码：

```java
package com.winter.control;

import com.winter.model.StudentConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/restful")
public class TestRestfulInterfaceController{

    @Autowired
    private StudentConfig studentConfig;

    @RequestMapping("/test")
    public String testRestfulInterface(@RequestParam("name") String name) {
        return "hello" + name;
    }

    @RequestMapping("/printStudentInfo")
    public String getStudentInfo(){
        return "studentName:" + studentConfig.getName() +
                "   studentAge:" + studentConfig.getAge();
    }

}
```

将配置文件切换到测试环境并启动程序后，程序监听的端口变为8100。

### 监听器Listener的使用

Listener是Spring为开发人员提供的一种监听、订阅实现机制，其实现原理是设计模式之观察者模式，设计的初衷是为了系统业务之间进行解耦，以便提高系统可扩展性、可维护性。

Listener主要包括定义事件、事件监听、事件发布。

1、定义用户注册事件

```java
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

}
```

2、用户注册服务实现类

```java
package com.winter.service;

import com.winter.event.UserRegisterEvent;
import com.winter.model.User;
import com.winter.service.iface.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

/**
 * 用户注册服务实现类
 */
@Service("userService")
public class UserServiceImpl implements IUserService {
    @Autowired
    private ApplicationContext applicationContext;

    /**
     * 用户注册
     * @param user
     */
    @Override
    public void registerUser(User user) {
        if (user != null) {
            //调用持久层注册用户

            //发布用户注册事件
            applicationContext.publishEvent(new UserRegisterEvent(this, user));
        }
    }
}
```

3、用户注册控制类

```java
package com.winter.control;

import com.winter.model.User;
import com.winter.service.iface.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotNull;

/**
 * 用户注册控制类
 */
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private IUserService userService;

    @RequestMapping("/register")
    public String registerUser(@NotNull String userName, @NotNull Integer age) {
        String msg = "success";
        try {
            userService.registerUser(new User(userName, age));
        } catch (Exception e) {
            msg = "error";
        }
        return msg;
    }
}
```

4、监听器代码

事件监听方法：

1）利用@EventListener实现监听用户注册事件：

```java
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
```
2）利用接口ApplicationListener实现监听用户注册事件：

```java
package com.winter.listener;

import com.winter.event.UserRegisterEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

/**
 * 利用接口 ApplicationListener 实现监听用户注册事件
 */
@Component
public class RegisterUserApplicationListener implements ApplicationListener<UserRegisterEvent> {
    @Override
    public void onApplicationEvent(UserRegisterEvent userRegisterEvent) {
        System.out.println("实现接口ApplicationListener监听用户注册事件并向用户发送邮件");
        System.out.println("注册用户名：" + userRegisterEvent.getUser().getName());
    }
}
```

3）利用接口SmartApplicationListener实现监听用户注册事件

```java
package com.winter.listener;

import com.winter.event.UserRegisterEvent;
import com.winter.service.UserServiceImpl;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.event.SmartApplicationListener;
import org.springframework.stereotype.Component;

/**
 * 利用接口 SmartApplicationListener 实现监听用户注册事件
 */
@Component
public class RegisterUserSmartApplicationListener implements SmartApplicationListener {

    @Override
    public boolean supportsEventType(Class<? extends ApplicationEvent> aClass) {
        return aClass == UserRegisterEvent.class;
    }

    /**
     * 注意此处aClass不能与IUserService.class比较
     * @param aClass
     * @return
     */
    @Override
    public boolean supportsSourceType(Class<?> aClass) {
        return aClass == UserServiceImpl.class;
    }

    @Override
    public void onApplicationEvent(ApplicationEvent applicationEvent) {
        UserRegisterEvent userRegisterEvent = (UserRegisterEvent) applicationEvent;

        System.out.println("实现接口SmartApplicationListener监听用户注册事件并向用户发送邮件");
        System.out.println("注册用户名：" + userRegisterEvent.getUser().getName());
    }

    /**
     * 返回值越小监听越靠前
     * @return
     */
    @Override
    public int getOrder() {
        return 1;
    }
}
```

 利用Postman调用接口：http://localhost:8100/user/register?userName=huangchaobing&age=32，实现用户注册，控制台输出监听相关信息

以上三种监听都属于同步监听，必须等监听逻辑处理完成之后，用户的某个业务逻辑才算完成。然而这样，当有用户操作时，会让用户进行等待，给用户的体验不太好，因此我们用 `@Async` 注解实现异步监控。

5、为异步监听器设置异步线程池对象：

```java
package com.winter.lib;

import org.springframework.aop.interceptor.AsyncUncaughtExceptionHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

@Configuration
@EnableAsync
public class AsyncListenerConfiguration implements AsyncConfigurer {
    /**
     * 获取异步线程池执行对象
     * @return
     */
    @Override
    public Executor getAsyncExecutor() {
        ThreadPoolTaskExecutor threadPoolTaskExecutor = new ThreadPoolTaskExecutor();

        // 设置线程数量
        threadPoolTaskExecutor.setCorePoolSize(10);
        threadPoolTaskExecutor.setMaxPoolSize(10);
        threadPoolTaskExecutor.setQueueCapacity(50);
        threadPoolTaskExecutor.initialize();

        return threadPoolTaskExecutor;
    }

    @Override
    public AsyncUncaughtExceptionHandler getAsyncUncaughtExceptionHandler() {
        return null;
    }
}
```

6、在需要执行异步监听方法上面添加 `@Async` 注解：

```java
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
```

7、发送注册用户请求，测试异步监听

以上是自定义事件、发布事件、监听事件的常用开发方式。为了方便开发者开发，在Spring Boot 2.0以后，为开发者定义了如下事件：

- ApplicationFailedEvent：Spring Boot启动失败时触发；
- ApplicationPreparedEvent：上下文Context准备时触发；
- ApplicationReadyEvent：上下文准备完毕的时触发；
- ApplicationStartedEvent：Spring Boot启动监听类；
- SpringApplicationEvent：获取SpringApplication；
- ApplicationEnvironmentPreparedEvent：装配完参数和环境后触发的事件。

在工作中我们经常在程序上下文和Bean创建成功后做一些比如初始化缓存、缓存预热等操作，这时，便会通过监听 `ApplicationReadyEvent` 事件完成，该过程分两步完成。

8、定义监听器

```java
package com.winter.listener;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.ConfigurableApplicationContext;

/**
 1. 初始化redis缓存listener
 */
public class InitializeRedisCacheListener implements ApplicationListener<ApplicationReadyEvent> {
    @Override
    public void onApplicationEvent(ApplicationReadyEvent applicationReadyEvent) {
        ConfigurableApplicationContext applicationContext = applicationReadyEvent.getApplicationContext();
        RedisUtil redisUtil = applicationContext.getBean(RedisUtil.class);
        if(redisUtil != null){
            redisUtil.initializeRedisData();
        }
    }
}
```

9、注册监听器Listener：

```java
package com.winter.demo;

import com.winter.listener.InitializeRedisCacheListener;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.ComponentScan;

/**
 * 运行成功，访问不了(404)原因：
 * 一 spring boot的启动类不能直接放在main(src.java.main)这个包下面，把它放在有包的里面就可以了。
 * 二 正常启动了，但是我写了一个controller，用的@RestController注解去配置的controller。
 *    然后路径也搭好了，但是浏览器一直报404.最后原因是，spring boot只会扫描启动类当前包和以下的包。
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
}
```

启动程序后，开始初始化Redis缓存数据

### 过滤器Filter的使用

Filter通常用于在请求过程中对用户身份进行认证、过滤等操作。可以通过3种方式实现：

1. 继承Filter接口定义过滤器
2. 在程序启动类加上注解@ServletComponentScan，将过滤器加入过滤器链
3. 在程序启动类中加入@Bean注解将Filter加入过滤器链

### 拦截器Interceptor使用

利用拦截器Interceptor可以完成请求过滤、记录请求日志、判断用户是否登录等操作。实现自定义拦截器需要如下三步：

1. 实现接口HandlerInterceptor并根据需要重载其方法。其方法主要有：
- preHandle：该方法在处理器方法执行之前执行；
- postHandle：该方法在处理器方法执行之后执行；
- afterCompletion：该方法在视图渲染之后被执行；
2. 创建自定义类继承于WebMvcConfigurerAdapter，重写其addInterceptors方法，将自定义拦截器加入拦截器链中
3. 启动应用程序，访问接口，查看自定义拦截器输出

## 整合常用技术框架

前面，演示了在工作中常用的Spring Boot基础知识，接下来继续讲解Spring Boot微服务开发中会用到的各大主流技术框架，主要包括如下技术框架：

1.	关系型数据库访问框架 Spring Data JPA；
2.	NoSQL数据库 Redis、MongoDB；
3.	消息中间件 RabbitMQ；
4.	主要用于搜索、统计的ES框架。

接下来，我们分别讨论下，Spring Boot如何整合以上框架。

### 整合Spring Data JPA

首先，添加依赖，代码如下：

```xml
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
   <groupId>mysql</groupId>
   <artifactId>mysql-connector-java</artifactId>
   <scope>runtime</scope>
</dependency>
```

然后，添加配置文件，代码如下：

```yml
spring:
  datasource:
    driver-class-name: com.mysql.jdbc.Driver
    url: jdbc:mysql://localhost:3306/test?useSSL=false
    username: root
    password: root
    ##初始化连接数
    initialSize: 5
    ##最小连接数
    minIdle: 5
    ##最大连接数
    maxActive: 20
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
```

`spring.jpa.hibernate.ddl-auto`属性可以取以下值，其含义如下：

- create：每次加载Hibernate时都会删除上一次生成的表，然后根据你的实体类再重新生成新表；
- create-drop：每次加载Hibernate时根据实体类生成表，但是sessionFactory一关闭，表就自动删除；
- update：最常用的属性（推荐属性），第一次加载Hibernate时根据实体类会自动建立起表的结构（前提是先建立好数据库），以后加载Hibernate时根据实体类自动更新表结构。即使表结构改变了，但表中的行仍然存在，不会删除以前的行。要注意的是当部署到服务器后，表结构是不会被马上建立起来的，要等应用第一次运行起来后才会创建；
- validate：每次加载Hibernate时，验证创建数据库表结构，只会和数据库中的表进行比较，不会创建新表，但会插入新值。

接着，我们添加实体类，代码如下：

```java
package com.winter.model;

import javax.persistence.*;

@Table(name = "user")
@Entity
public class User {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "user_name",length = 16,nullable = false)
    private String name;

    @Column(name = "age",nullable = false)
    private Integer age;

    @Transient
    private String address;

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }
}
```

注意：当在实体类中定义的属性不需要映射到对应数据库表中时，只需要在实体类属性字段上添加 `@transient` 注解即可。

Spring Boot 整合 JPA 访问数据库非常方便，这也是其被广泛用于操作数据库的主要原因。开发过程中，通常我们会直接继承 JpaRepository 接口实现对数据库表的操作。继承该接口，操作数据库时，只需要让接口中定义的方法名称满足一定的规则，JPA 框架便能根据方法名自动解析产生 SQL 语句。示例代码如下：

```java
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByName(String name);
}
```

如上定义的 `findByName` 方法经过JPA框架解析之后，会自动生成一条按照用户名称查询用户的SQL语句，并发送到数据库执行查询操作。

编写userService接口和实现类：

```java
public interface IUserService {
    void registerUser(User user);
    User queryUserByName(String name);
    void addUser(User user);
}

package com.winter.service;

import com.winter.event.UserRegisterEvent;
import com.winter.model.User;
import com.winter.service.iface.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

/**
 * 用户注册服务实现类
 */
@Service("userService")
public class UserServiceImpl implements IUserService {
    @Autowired
    private ApplicationContext applicationContext;
    @Autowired
    private UserRepository userDao;

    /**
     * 用户注册
     * @param user
     */
    @Override
    public void registerUser(User user) {
        if (user != null) {
            //调用持久层注册用户
            //发布用户注册事件
            applicationContext.publishEvent(new UserRegisterEvent(this, user));
        }
    }

    @Override
    public User queryUserByName(String name) {
        return null;
    }

    @Override
    public void addUser(User user) {

    }
}
```

 编写Controller：

```java
/**
 * 用户注册控制类
 */
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private IUserService userService;

    @RequestMapping("/register")
    public String registerUser(@NotNull String userName, @NotNull Integer age) {
        String msg = "success";
        try {
            userService.registerUser(new User(userName, age));
        } catch (Exception e) {
            msg = "error";
        }
        return msg;
    }

    @RequestMapping("/queryUserByName")
    public User queryUserByName(@RequestParam("name") String name) {
        return userService.queryUserByName(name);
    }

    @RequestMapping(value = "/addUser", method = RequestMethod.GET)
    public String queryUserByName(@RequestParam("name") String name, @RequestParam("age") Integer age) {
        userService.addUser(new User(name, age));
        return "Success";
    }

}
```

利用Postman向数据库user表中插入三条数据。

然后在Postman输入请求地址：http://localhost:8080/user/queryUserByName?name=xxx 对查询接口进行测试。

看了上面的实例，相信各位已了解了JPA功能的强大之处，不过上面只是一个简单的实例，[官网](https://docs.spring.io/spring-data/jpa/docs/2.0.8.RELEASE/reference/html/)提供了JPA规范命名方法名到SQL语句映射的实例，如下图所示：

![x](http://viyitech.cn/public/images/jpa.png)

看了上面官网给出的JPA持久层方法名称到SQL语句的映射之后，相信各位又进一步了解了JPA的强大之处。不过对于一些特殊功能，如排序、分页等，需要开发者做一些特殊处理。下面分别讲讲如何利用JPA实现排序和分页功能。

**根据用户年龄的降序排列查询所有用户信息**

在用户信息服务层中添加接口：

```java
@Override
public List<User> findAllUser() {
    return userDao.findAll(new Sort(Sort.Direction.DESC,"age"));
}
```

在Controller层中添加接口：

```java
@RequestMapping("/queryAllUser")
public List<User> queryAllUser(){
    return userService.findAllUser();
}
```

启动程序，利用Postman测试结果

**分页查询**

为了让读者看清楚分页相关功能，我这边调用新增用户接口向用户表插入100条数据。在用户持久层添加根据用户年龄降序排列，然后实现分页查询功能。

在用户服务层定义接口并在实现类中实现接口：

```java
/**
 * 对用户年龄降序排列并实现分页查询
 * @param currentPage
 * @param pageSize
 * @return
 */
@Override
public List<User> findUserByPageAndPageSize(int currentPage, int pageSize) {
    Sort ageSort = new Sort(Sort.Direction.DESC,"age");
    Pageable pageable = PageRequest.of(currentPage,pageSize,ageSort);
    Page<User> page = userDao.findAll(pageable);
    if (page != null) {
        return page.getContent();
    }
    return null;
}
```

JPA框架除了能够根据方法名称映射为SQL语句操作数据库之外，还为开发者提供了直接利用SQL语句操作数据库的功能。

利用本地SQL语句对用户表数据进行修改、查询。

在用户持久层接口中，添加根据用户id修改用户信息，根据用户id查询用户信息接口，代码如下：

```java
@Modifying
@Query(value = "update user set age = ?1 where id = ?2",nativeQuery = true)
void updateUserInfoByUserId(Integer userAge, Integer userId);

@Query(value = "select * from user where id = ?1",nativeQuery = true)
User queryUserInfoByUserId(Integer userId);
```

在用户服务层中，新增根据用户 id 修改用户年龄，根据用户 id 查询用户信息接口定义、实现。接口定义如下：

```java
void updateUserAgeByUserId(Integer age,Integer userId);
User getUserInfoByUserId(Integer userId);
```

接口实现，代码如下：

```java
@Override
@Transactional
public void updateUserAgeByUserId(Integer age, Integer userId) {
    userDao.updateUserInfoByUserId(age, userId);
}

@Override
public User getUserInfoByUserId(Integer userId) {
    return userDao.queryUserInfoByUserId(userId);
}
```

在控制层新增接口：

```java
@RequestMapping("/updateUserAgeById")
public String updateUserAgeById(Integer age, Integer userId) {
    userService.updateUserAgeByUserId(age, userId);
    return "success";
}

@RequestMapping("/queryUserByUserId")
public User queryUserByUserId(Integer userId) {
    return userService.getUserInfoByUserId(userId);
}
```

启动程序，利用Postman分别对修改用户年龄、根据用户id查询用户信息接口进行测试

通过上面的实例，相信各位读者已经注意到，我在 `updateUserAgeById` 方法上加了注解 `@Transactional`，原因是JPA在对数据库进行更新操作时默认需要开启事务，假如不开启事务，程序会报如下错误：

`javax.persistence.TransactionRequiredException: Executing an update/delete query;`

当开发者直接用本地SQL语句操作数据库时，需要在 `@Query` 注解属性中将 `nativeQuery` 设置为true，当本地SQL语句对数据库表进行写操作时（包括Update、Delete），还需要在方法上添加 `@Modifying` 注解。

需要注意的是，如果用本地SQL语句或者JPQL查询结果集并非Entity时，可以用 `Object[]` 数组代替，如查询用户信息表中年龄小于指定岁数且对应岁数的人数。

在持久层中添加接口：

```java
@Query(value = "select age,count(*) from user where age < ?1 group by age", nativeQuery = true)
List<Object[]> getUserCount(Integer age);
```

​    在服务接口层定义接口，服务实现类中实现接口如下：

```java
@Override
public List<Map<String, Object>> queryUserCountByAge(int age) {
    List<Object[]> list = userDao.getUserCount(age);
    if (!CollectionUtils.isEmpty(list)) {
        List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();
        for(Object[] objects : list){
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("age", objects[0]);
            map.put("userCount", objects[1]);
            mapList.add(map);
        }
        return mapList;
    }
    return null;
}
```

控制层接口定义如下：

```java
@RequestMapping("/queryUserCountByAge")
public List<Map<String, Object>> updateUserAgeById(Integer age) {
    return userService.queryUserCountByAge(age);
}
```

启动程序，利用Postman测试。

### 整合Redis

为了演示Spring Boot整合Redis相关实例，首先安装Redis

1、在pom文件中添加依赖

```xml
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-redis</artifactId>
   <version>1.4.7.RELEASE</version>
</dependency>
```

项目中，spring boot是用的2.0.4版本。spring-boot-starter-redis在springboot 1.4.7版本后，改为了spring-boot-starter-data-redis，所以如果想集成redis，应该引用spring-boot-starter-data-redis。如果就是想用前者，那么就应该加上版本号。

2、在配置文件中添加如下内容：

```yml
spring:
  redis:
    #设置数据库索引
    database: 0
    #Redis服务器地址
    host: 192.168.1.120
    #Redis服务器连接端口
    port: 6379
    #Redis服务器连接密码（默认为空）
    password: hcb13579
    #连接池最大连接数（使用负值表示没有限制）
    pool:
      max-active: 10
      #连接池最大阻塞等待时间（使用负值表示没有限制）
      max-wait: -1
      #连接池中的最大空闲连接
      max-idle: 10
      #连接池中的最小空闲连接
      min-idle: 0
    #连接超时时间（毫秒）
    timeout:  60000
```

3、添加操作Redis服务层接口：

```c#
/**
 * 利用Redis持久化用户信息
 */
public interface RedisUserService {

    /**
     * 根据用户uuid获取用户信息
     * @param uuid
     * @return
     */
    User getUserInfo(String uuid);

    /**
     * 将用户信息存入Redis
     * @param user
     */
    String saveUserInfo(User user);
}
```

4、添加操作Redis服务实现类：

```c#
@Service("redisUserService")
public class RedisUserServiceImpl implements RedisUserService {
    @Autowired
    private RedisTemplate redisTemplate;

    @Override
    public User getUserInfo(String uuid) {
        return (User) redisTemplate.opsForValue().get(uuid);
    }

    @Override
    public String saveUserInfo(User user) {
        redisTemplate.opsForValue().set(user.getUuid(),user);
        return user.getUuid();
    }
}
```

5、在控制层中添加将用户信息存入Redis、从Redis中查询用户信息的接口：

```c#
@RequestMapping("/saveUserInfoIntoRedis")
public String saveUserInfoIntoRedis(String name,Integer age){
    User user = new User(name,age);
    user.setUuid(UUID.randomUUID().toString());
    return redisUserService.saveUserInfo(user);
}

@RequestMapping("/getUserInfoFromRedis")
public User getUserInfoFromRedis(String uuid){
    String realKey = (String) redisTemplate.opsForValue().get(uuid);
    return redisUserService.getUserInfo(realKey);
}
```

6、启动程序，利用Postman测试

实际工作中，Redis除了用于实现缓存功能之外，其发布、订阅功能也比较重要。

下面讲解如何使用这些功能。

首先说一个Redis订阅、发布功能在实际工作中的应用场景。在未用Redis发布、订阅功能之前，我同事发送一个消息到消息中间件RabbitMQ中的某一个队列中，消息包括了能够代表本次请求的唯一UUID，利用服务器端上另一个运行Python脚本的容器监听该队列，然后消费消息，接着将Python脚本处理后的结果放在Redis中。

Redis中的key用来存放消息中间件的UUID，value存放Python处理的结果，而在微服务端循环地利用UUID去Redis中查询Python处理的结果。该种处理方式会在发送消息端一直循环，并同步查询结果，在我们不知道Python端处理请求需要多长时间时，该种处理方式就显得不太恰当了。

当类似的请求和用户之间有交互时，更是会严重影响用户体验。经过我们代码调研，最后建议将其改为Redis订阅、发布功能。这样处理的话，当服务调用方向消息中间件发送消息之后，会及时返回，等Python端处理完之后将结果放入Redis中，异步处理即可。

下面就为各位演示下Redis发布订阅功能如何实现。

1、定义监听器：

```c#
public class RedisChannelListener implements MessageListener {
    @Override
    public void onMessage(Message message, byte[] bytes) {
        byte[] channelBytes = message.getChannel();
        byte[] bs = message.getBody();
        try {
            String content = new String(bs, "UTF-8");
            String channel = new String(channelBytes, "UTF-8");
            System.out.println("channel:" + channel + "---" + "message:" + content);
        }
        catch (Exception e){
            System.out.println(e.getMessage());
        }
    }
}
```

2、设置监听器：

```c#
@Configuration
public class MessageListenerConfig {
    @Bean
    public MessageListenerAdapter listenerAdapter() {
        return new MessageListenerAdapter(new RedisChannelListener());
    }

    @Bean
    public RedisMessageListenerContainer container(RedisConnectionFactory redisConnectionFactory){
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(redisConnectionFactory);
        container.addMessageListener(listenerAdapter(), new PatternTopic("redis.news.*"));
        return container;
    }
}
```

3、添加控制器：

```c#
@RequestMapping("/redis")
@RestController
public class RedisController {
    @Autowired
    @Qualifier("publishRedisMessage")
    private PublishRedisMessage publishRedisMessage;

    @RequestMapping("/publishMessage")
    public String publishRedisMessage(String channel, String msg){
        return  publishRedisMessage.publishMessage(channel, msg);
    }
}
```

4、启动程序利用Postman进行测试即可。

### 整合MongoDB

MongoDB 是一个基于分布式文件存储的数据库，它是一个介于关系数据库和非关系数据库之间的产品，其主要以 key、value 方式存储数据；其支持的数据结构非常松散，是类似 JSON 的 BJSON 格式，因此其存储数据非常灵活。随着近几年软件行业的蓬勃发展，用户的需求、业务的多样化，引发了软件系统自身数据的多样化，从而使 MongoDB 成为 NoSQL 数据库中的皎皎者。

传统关系数据库主要由数据库、表、记录三个层次概念组成，而 MongoDB 是由数据库、集合、文档三个层次组成。MongoDB 相对于关系型数据库里的表，但是集合中没有列、行和关系概念，这体现了其存储数据非常灵活的特点。

MongoDB 适合对大量或者无固定格式的数据进行存储，如日志、缓存等。对事物支持较弱，不适用于复杂的多集合的级联查询。

### 整合RabbitMQ

RabbitMQ 是由 Erlang 语言编写的实现了高级消息队列协议(AMQP)的开源消息代理软件（也可称为面向消息的中间件）。其支持 Windows、Linux/Unix、MAC OS 等操作系统和包括 Java 在内的多种编程语言。

AMQP，即 Advanced Message Queuing Protocol，一个提供统一消息服务的应用层标准高级消息队列协议，是应用层协议的一个开放标准，为面向消息的中间件设计；基于此协议的客户端与消息中间件可传递消息，并不受客户端、中间件不同产品，不同的开发语言等条件的限制。

RabbitMQ 的重要概念有以下几个：

- Broker：接收消息，分发消息应用；
- Exchange：消息交换机；指定消息按照什么规则路由到哪个队列 Queue；
- Queue：消息队列，存储消息的载体；
- Binding：Exchange 和 Queue 之间的虚拟连接；Binding 中可以包含 RoutingKey，其信息被保存到 Exchange 中的查询表中，作为 Message 的分发依据；
- RoutingKey：路由关键字，Exchange 根据 RoutingKey 将消息投递到对应的队列中；
- Vhost：虚拟主机，一个 Broker 可以有多个虚拟主机，用作不同用户的权限分离；一个虚拟主机持有一组 Exchange、Queue 和 Binding；
- Producer：消息生产者，主要将消息投递到对应的 Exchange 上面；
- Consumer：消息消费者，消息的接收者，一般是独立的程序；
- Channel：消息通道，也称信道。在客户端的每个连接里可以建立多个 Channel，每个 Channel 代表一个会话任务。

### 整合Elasticsearch

Elasticsearch（简称 ES），是一个全文搜索引擎，同时可以作为 NoSQL 数据库，存储任意格式的文档和数据，也可以用于大数据的分析与统计。

ES是 Apache 开源的产品，其主要具有以下特点：

1.	以 Lucene 为底层进行封装，为用户提供了一套简单、易用、风格一致的 RESTful 风格的 API 接口；
2.	它以一种分布式的搜索引擎架构为用户提供服务，可以很容易的扩展到上百个节点，甚至更多，使系统具备高可用、高并发等特性；
3.	支持 PB 级别数据查询，其主要用于大数据的查询、搜索、统计分析等。

通常用来操作 ES 的客户端有如下几种：

1.	TransportClient
2.	JestClient
3.	Spring Data Elasticsearch
4.	HttpClient

其中 HttpClient 主要是利用 ES 的原生 API 对其进行操作，在开发中不是太灵活，因此通常情况下不会选择其对 ES 进行操作。

利用 TransportClient、Spring Data Elasticsearch 对 ES 操作很方便。但随着 ES 版本的变更，相关的 API 也在不断的调整，因此有 ES 服务端版本变更之后，客户端的代码也要随之进行重新编写。

JestClient 对 ES 进行了封装，填补了 ES 在 HTTP Rest 接口客户端上的空白，它适用于 ES 2.0 以上的版本，无需因为 ES 服务端版本更改而对代码进行修改。







## 参考

- Demo源代码：https://github.com/huangchaobing
- spring-boot源码：https://github.com/spring-projects/spring-boot
- spring-boot文档：https://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/html/getting-started.html#getting-started-installing-spring-boot

现在四个比较流行的 HTML/CSS 框架：

- Bootstrap
- EasyUI
- Layui
- Semantic UI

基于 BootStrap 的成品后台模板：

- AdminLTE
- Hui
- Ace Admin
- Metronic
- H+ UI(hplus)

分页插件：

- JqGrid

常见弹框技术：

- BootStrap Modal 模态框
- Custombox

上传插件：

- WebUpload