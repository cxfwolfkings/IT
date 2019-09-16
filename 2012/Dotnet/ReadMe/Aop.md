# Aop

## 目录

## 简介

- AOP（ASPect-Oriented Programming，面向方面编程），它是OOP（Object-Oriented Programing，面向对象编程）的补充和完善。我们把软件系统分为两个部分：核心关注点和横切关注点。业务处理的主要流程是核心关注点，与之关系不大的部分是横切关注点。横切关注点的一个特点是，他们经常发生在核心关注点的多处，而各处都基本相似。比如权限认证、日志、异常捕获、事务处理、缓存等。

  目前在.Net下实现AOP的方式分为两大类：

  一是采用动态代理技术，利用截取消息的方式，对该消息进行装饰，以取代或修饰原有对象行为的执行，例如Castle的AspectSharp；

  二是采用静态织入的方式，引入特定的语法创建“方面”，从而使得编译器可以在编译期间织入有关“方面”的代码。

  动态代理实现方式利用.Net的Attribute和.Net Remoting的代理技术，对对象执行期间的上下文消息进行截取，并以消息传递的方式执行，从而可以在执行期间加入相关处理逻辑实现面向方面的功能;而静态织入的方式实现一般是要依靠一些第三方框架提供特定的语法，例如PostSharp，它的实现方式是采用 MSIL Injection和MSBuild Task在编译时置入方面的代码，从而实现AOP。