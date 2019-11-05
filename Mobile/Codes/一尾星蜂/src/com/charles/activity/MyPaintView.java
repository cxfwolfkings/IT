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
	private List<Point> allPoint = new ArrayList<Point>(); // �������еĲ�������

	public MyPaintView(Context context, AttributeSet attrs) { // ����Context��ͬʱ�������Լ���
		super(context, attrs); // ���ø���Ĺ���
		super.setOnTouchListener(new OnTouchListenerImpl());
	}

	private class OnTouchListenerImpl implements OnTouchListener {
		public boolean onTouch(View v, MotionEvent event) {
			Point p = new Point((int) event.getX(), (int) event.getY()); // �����걣����Point��
			if (event.getAction() == MotionEvent.ACTION_DOWN) { // ���£���ʾ���¿�ʼ�����
				MyPaintView.this.allPoint = new ArrayList<Point>(); // �ػ�
				MyPaintView.this.allPoint.add(p); // �����
			} else if (event.getAction() == MotionEvent.ACTION_UP) { // �û��ɿ�
				MyPaintView.this.allPoint.add(p); // ��¼�����
				MyPaintView.this.postInvalidate(); // �ػ�ͼ��
			} else if (event.getAction() == MotionEvent.ACTION_MOVE) { // �û��ƶ�
				MyPaintView.this.allPoint.add(p); // ��¼�����
				MyPaintView.this.postInvalidate(); // �ػ�ͼ��
			}
			return true; // ��ʾ����Ĳ�������ִ���ˡ�
		}
	}

	@Override
	protected void onDraw(Canvas canvas) { // ���л�ͼ
		Paint p = new Paint(); // �������࿪ʼ����
		p.setColor(Color.RED);// ����ͼ����ɫ
		if (MyPaintView.this.allPoint.size() > 1) { // ����������㱣���ʱ����Կ�ʼ���л�ͼ
			Iterator<Point> iter = MyPaintView.this.allPoint.iterator();
			Point first = null;
			Point last = null;
			while (iter.hasNext()) {
				if (first == null) {
					first = (Point) iter.next(); // ȡ������
				} else {
					if (last != null) { // ǰһ�׶��Ѿ������
						first = last; // ���¿�ʼ��һ�׶�
					}
					last = (Point) iter.next(); // ����������
					canvas.drawLine(first.x, first.y, last.x, last.y, p);
				}
			}
		}
	}

}
