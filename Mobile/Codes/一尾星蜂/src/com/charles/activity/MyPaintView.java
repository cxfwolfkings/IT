package com.charles.activity;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Point;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.view.View;

public class MyPaintView extends View {
	private List<Point> allPoint = new ArrayList<Point>(); // 保存所有的操作坐标

	public MyPaintView(Context context, AttributeSet attrs) { // 接收Context，同时接收属性集合
		super(context, attrs); // 调用父类的构造
		super.setOnTouchListener(new OnTouchListenerImpl());
	}

	private class OnTouchListenerImpl implements OnTouchListener {
		public boolean onTouch(View v, MotionEvent event) {
			Point p = new Point((int) event.getX(), (int) event.getY()); // 将坐标保存在Point类
			if (event.getAction() == MotionEvent.ACTION_DOWN) { // 按下，表示重新开始保存点
				MyPaintView.this.allPoint = new ArrayList<Point>(); // 重绘
				MyPaintView.this.allPoint.add(p); // 保存点
			} else if (event.getAction() == MotionEvent.ACTION_UP) { // 用户松开
				MyPaintView.this.allPoint.add(p); // 记录坐标点
				MyPaintView.this.postInvalidate(); // 重绘图形
			} else if (event.getAction() == MotionEvent.ACTION_MOVE) { // 用户移动
				MyPaintView.this.allPoint.add(p); // 记录坐标点
				MyPaintView.this.postInvalidate(); // 重绘图形
			}
			return true; // 表示下面的操作不再执行了。
		}
	}

	@Override
	protected void onDraw(Canvas canvas) { // 进行绘图
		Paint p = new Paint(); // 依靠此类开始画线
		p.setColor(Color.RED);// 定义图的颜色
		if (MyPaintView.this.allPoint.size() > 1) { // 现在有坐标点保存的时候可以开始进行绘图
			Iterator<Point> iter = MyPaintView.this.allPoint.iterator();
			Point first = null;
			Point last = null;
			while (iter.hasNext()) {
				if (first == null) {
					first = (Point) iter.next(); // 取出坐标
				} else {
					if (last != null) { // 前一阶段已经完成了
						first = last; // 重新开始下一阶段
					}
					last = (Point) iter.next(); // 结束点坐标
					canvas.drawLine(first.x, first.y, last.x, last.y, p);
				}
			}
		}
	}

}
