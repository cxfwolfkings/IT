# Technology & Management

## 目录

1. [架构演进](#架构演进)
2. [Spring](#Spring)
3. [开发流程](#开发流程)
4. [参考](#参考)

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
- [Custombox](http://dixso.github.io/custombox/)

上传插件：

- WebUpload

## 架构演进

### 单体架构(Monolithic)

十年前左右，我去公司面试时，面试官问我的第一个问题是让我简要介绍下软件设计中的三层设计模型（表示层、业务逻辑处理层、数据访问层）：

- 表示层：通常理解为用于和用户交互的视图层；
- 业务逻辑处理层：用户提交请求，经过业务逻辑层处理后，对用户请求作出响应；
- 数据库访问层：主要用于操作数据库。

尽管在软件设计过程中，架构师或者程序设计者遵守了流行一时的经典的三层模型，但由于并未按照业务场景进行划分，使得最终的系统应用将所有的业务场景的表示层、业务逻辑处理层、数据访问层放在一个Project中，然后经过编译、打包并部署到一台服务器上。

这种架构适用于用户业务不复杂、访问量较小的时候，甚至可以将应用服务、数据库、文件服务器部署在一台服务器上。但随着用户业务场景变得越来越复杂，单体架构的局限性就很快暴露出来了，主要体现在如下几方面：

- 随着业务越来越复杂，单体应用代码量急剧膨胀，最终导致代码可读性、可维护性和可扩展性得不到保证；
- 随着用户访问量增加，单体应用的并发能力有限；
- 随着系统代码量的剧增，当修改应用程序或者新增需求时，测试难度成指数级增长；
- 部署效率低下；
- 技术选型单一。

### SOA架构(Service Oriented Architecture)

SOA是一种粗粒度、松耦合服务架构，服务之间通过简单、精确定义接口进行通讯，不涉及底层编程接口和通讯模型。SOA可以看作是B/S模型、XML（标准通用标记语言的子集）/WebService技术之后的自然延伸。

**主要优点：**

- 把模块（即服务）拆分，使用接口通信，降低模块之间的耦合度；
- 把项目拆分成若干个子项目，不同的团队负责不同的子项目；
- 增加功能时只需要再增加一个子项目，调用其它系统的接口就可以；
- 可以灵活的进行分布式部署。

**主要缺点：**

- 和单体架构相比，增加了系统复杂度，系统整体性能有较大影响；
- 多服务数据通信协议之间转换过程复杂，容易造成ESB(Enterprise Service Bus)性能瓶颈。

### 微服务架构(MicroServices)

微服务的概念是Martin Flower在2014年写的一篇论文《MicroServices》中提出来的。

**主要特点：**

- 每个服务按照业务划分；
- 服务之间通过轻量级API调用；
- 可以使用不同语言开发；
- 可以使用不同的数据存储技术；
- 可独立部署，服务之间互相不影响；
- 可针对用户访问流量大的服务单独扩展，从而能够节约资源；
- 管理自动化。

**主要挑战：**

- 微服务粒度大小难以划分，需要设计人员对业务有很好的掌握；
- 分布式复杂性，主要体现在分布式事务、网络延迟、系统容错等问题解决难度较大；
- 微服务之间通信成本较高，对微服务之间网络稳定性、通信速度要求较高；
- 由于微服务数量较大，运维人员运维、部署有较大的挑战。

## Spring

## SpringBoot

Spring Boot未出现之前，我们利用Spring、Spring MVC进行项目开发时，整个项目从引入依赖Jar包，书写配置文件，打包部署到开发环境、测试环境、生产环境都需要大量人力，但是最终的效果仍不尽如人意，甚至还会给一个项目组带来项目延期的风险等。

随着敏捷开发思想被越来越多的人接受以及开发者对开发效率的不断追求，最终推出了具有颠覆和划时代意义的框架Spring Boot。

Spring Boot首先遵循“习惯优于配置”原则，言外之意即是尽量使用自动配置让开发者从繁琐的书写配置文件的工作中解放出来；Spring Boot另外一个比较明显的特点就是尽量不使用原来 Spring 框架中的 XML 配置，而主要使用注解代替。

Spring Boot由 Spring、Spring MVC演化而来，注解也继承自两者。下面我们看下Spring MVC中常用的注解：

1. @Controller：该注解用于类上，其表明该类是Spring MVC的 Controller；
2. @RequestMapping：该注解主要用来映射Web请求，其可以用于类或者方法上；
3. @RequestParam：该注解主要用于将请求参数数据映射到功能处理方法的参数上；
4. @ResponseBody：该注解的作用是将方法的返回值放在Response中，而不是返回一个页面，其可以用于方法上或者方法返回值前；
5. @RequestBody：用于读取HTTP请求的内容（字符串），通过Spring MVC提供的HttpMessageConverter接口将读到的内容转换为JSON、XML等格式的数据并绑定到Controller方法的参数上；
6. @PathVariable：用于接收请求路径参数，将其绑定到方法参数上；
7. @RestController：该注解是一个组合注解，只能用于类上，其作用与@Controller、@ResponseBody一起用于类上等价。

注：在Spring 4.3中引进了@GetMapping、@PostMapping、@PutMapping、@DeleteMapping、@PatchMapping。

简单使用，如下代码所示：

## 开发流程

从软件项目开发的基本流程讲起，一个项目从开始立项到项目完成一般包含这么几个过程：

- 可行性分析：从市场、政策、经济、技术、人员等各方面因素来分析这个软件项目开发的可实行性。
- 需求分析：做市场调研，通过请教行业专家或者分析市场同类型的产品，来判断这个项目的开发是否有发展前景。
- 系统设计：确定软件的体系结构、数据结构、算法、模块功能，以及用户界面的设计等等，如果这些事情没有设计好，接下来的设计可能会变得一团糟。
- 程序设计：根据以上几点进行软件编码，将软件设计转换成计算机能够识别的程序语言。
- 测试与调整：一款软件从开发出来到正式的发布，一定需要经过不断的测试，才能尽可能地发现更多的错误，然后做出相应的修改，而且修改之后还需要重新测试。
- 系统维护：系统维护主要是根据用户在使用过程遇到的错误，或者由于硬件设备不断更新等外部因素引发的问题，或者为了完善用户的体验度等等而做出的相应的完善和维护。

## 参考

- Demo源代码：[https://github.com/huangchaobing](https://github.com/huangchaobing)
- spring-boot源码：[https://github.com/spring-projects/spring-boot](https://github.com/spring-projects/spring-boot)
- spring-boot文档：[https://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/html/getting-started.html#getting-started-installing-spring-boot](https://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/html/getting-started.html#getting-started-installing-spring-boot)
