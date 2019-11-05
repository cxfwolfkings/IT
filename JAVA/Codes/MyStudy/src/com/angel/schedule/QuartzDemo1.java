package com.angel.schedule;

import static org.quartz.JobBuilder.newJob;
import static org.quartz.SimpleScheduleBuilder.simpleSchedule;
import static org.quartz.TriggerBuilder.newTrigger;

import java.util.Date;

import org.quartz.Job;
import org.quartz.JobDetail;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.Scheduler;
import org.quartz.Trigger;
import org.quartz.impl.StdSchedulerFactory;

/**
 * 这个例子很好的覆盖了Quartz最重要的3个基本要素：
 * ● Scheduler：调度器。所有的调度都是由它控制。
 * ● Trigger： 定义触发的条件。例子中，它的类型是SimpleTrigger，每隔1秒中执行一次（什么是SimpleTrigger下面会有详述）。
 * ● JobDetail & Job： JobDetail 定义的是任务数据，而真正的执行逻辑是在Job中，例子中是HelloQuartz。 
 *                    为什么设计成JobDetail + Job，不直接使用Job？
 *                    这是因为任务是有可能并发执行，如果Scheduler直接使用Job，就会存在对同一个Job实例并发访问的问题。
 *                    而JobDetail & Job 方式，sheduler每次执行，都会根据JobDetail创建一个新的Job实例，这样就可以规避并发访问的问题。
 *                    
 * Quartz的API的风格在2.x以后，采用的是DSL风格（通常意味着fluent interface风格），就是示例中newTrigger()那一段东西。
 * 它是通过Builder实现的，就是上面 import static 几个。（** 下面大部分代码都要引用这些Builder ** )
 * DSL风格写起来会更加连贯，畅快，而且由于不是使用setter的风格，语义上会更容易理解一些。
 *                    
 * @author  Colin Chen
 * @create  2019年7月14日 上午4:11:32
 * @modify  2019年7月14日 上午4:11:32
 * @version A.1
 */
public class QuartzDemo1 {
	public static void main(String[] args) {
        try {
            // 创建scheduler
            Scheduler scheduler = StdSchedulerFactory.getDefaultScheduler();

            // 定义一个Trigger
            Trigger trigger = newTrigger().withIdentity("trigger1", "group1") // 定义name/group
                .startNow() // 一旦加入scheduler，立即生效
                .withSchedule(simpleSchedule() // 使用SimpleTrigger
                    .withIntervalInSeconds(1) // 每隔一秒执行一次
                    .repeatForever()) // 一直执行，奔腾到老不停歇
                .build();
            
            //SimpleTriggerImpl trigger=new SimpleTriggerImpl("trigger1","group1");
            //trigger.setStartTime(new Date());
            //trigger.setRepeatInterval(1);
            //trigger.setRepeatCount(-1);     

            // 定义一个JobDetail
            JobDetail job = newJob(HelloQuartz.class) // 定义Job类为HelloQuartz类，这是真正的执行逻辑所在
                .withIdentity("job1", "group1") // 定义name/group
                .usingJobData("name", "quartz") // 定义属性
                .build();
            
            //JobDetail jobDetail=new JobDetailImpl("jobDetail1","group1",HelloQuartz.class);
            //jobDetail.getJobDataMap().put("name", "quartz");

            // 加入这个调度
            scheduler.scheduleJob(job, trigger);

            // 启动
            scheduler.start();

            // 运行一段时间后关闭
            Thread.sleep(10000);
            scheduler.shutdown(true);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

class HelloQuartz implements Job {
    public void execute(JobExecutionContext context) throws JobExecutionException {
        JobDetail detail = context.getJobDetail();
        String name = detail.getJobDataMap().getString("name");
        System.out.println("say hello to " + name + " at " + new Date());
    }
}
