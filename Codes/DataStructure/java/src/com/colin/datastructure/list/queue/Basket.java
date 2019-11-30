package com.colin.datastructure.list.queue;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * 定义装苹果的篮子
 * LinkedList: 双向链表。LinkedList继承于AbstractSequentialList。
 *             内部维护了3个成员变量，一个是当前链表的头节点，一个是尾部节点，还有链表长度。
 * PriorityQueue: 实质上维护了一个有序列表。加入到 Queue 中的元素根据它们的天然排序（通过其 java.util.Comparable 实现）
 *                或者根据传递给构造函数的 java.util.Comparator 实现来定位
 * ConcurrentLinkedQueue: 基于链接节点的、线程安全的队列。并发访问不需要同步。因为它在队列的尾部添加元素并从头部删除它们，
 *                        所以只要不需要知道队列的大小，ConcurrentLinkedQueue 对公共集合的共享访问就可以工作得很好。
 *                        收集关于队列大小的信息会很慢，需要遍历队列。
 * 
 * @author Colin Chen
 * @create 2019年5月20日 下午10:32:28
 * @modify 2019年5月20日 下午10:32:28
 * @version A.1
 */
public class Basket {
	// 篮子，能够容纳3个苹果
	BlockingQueue<String> basket = new ArrayBlockingQueue<String>(3);

	/**
	 * 生产苹果，放入篮子
	 * @throws InterruptedException
	 */
	public void produce() throws InterruptedException {
		// put方法放入一个苹果，若basket满了，等到basket有位置
		basket.put("An apple");
	}

	/**
	 * 消费苹果，从篮子中取走
	 * @return
	 * @throws InterruptedException
	 */
	public String consume() throws InterruptedException {
		// get方法取出一个苹果，若basket为空，等到basket有苹果为止
		String apple = basket.take();
		return apple;
	}

	public int getAppleNumber() {
		return basket.size();
	}

	/**
	 * 测试方法
	 */
	public static void testBasket() {
		// 建立一个装苹果的篮子
		final Basket basket = new Basket();
		// 定义苹果生产者
		class Producer implements Runnable {
			public void run() {
				try {
					while (true) {
						// 生产苹果
						System.out.println("生产者准备生产苹果：" + System.currentTimeMillis());
						basket.produce();
						System.out.println("生产者生产苹果完毕：" + System.currentTimeMillis());
						System.out.println("生产完后有苹果：" + basket.getAppleNumber() + "个");
						// 休眠300ms
						Thread.sleep(300);
					}
				} catch (InterruptedException ex) {
				}
			}
		}
		// 定义苹果消费者
		class Consumer implements Runnable {
			public void run() {
				try {
					while (true) {
						// 消费苹果
						System.out.println("消费者准备消费苹果：" + System.currentTimeMillis());
						basket.consume();
						System.out.println("消费者消费苹果完毕：" + System.currentTimeMillis());
						System.out.println("消费完后有苹果：" + basket.getAppleNumber() + "个");
						// 休眠1000ms
						Thread.sleep(1000);
					}
				} catch (InterruptedException ex) {
				}
			}
		}

		ExecutorService service = Executors.newCachedThreadPool();
		Producer producer = new Producer();
		Consumer consumer = new Consumer();
		service.submit(producer);
		service.submit(consumer);
		// 程序运行10s后，所有任务停止
		try {
			Thread.sleep(10000);
		} catch (InterruptedException e) {
		}
		service.shutdownNow();
	}

	public static void main(String[] args) {
		Basket.testBasket();
	}
}
