package com.angel.nio;

import java.util.concurrent.TimeUnit;

class TCPHandler implements Runnable {
	public void run() {
		if (Num.num == 0) {
			Num.start = System.currentTimeMillis();
		}
		try {
			TimeUnit.SECONDS.sleep(1L); // 休眠1秒
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		Num.add();
		if (Num.num == 1999) {
			Num.end = System.currentTimeMillis();
			System.out.println("处理共用时: " + (Num.end - Num.start) / 1000 + "秒");
		}

	}
}