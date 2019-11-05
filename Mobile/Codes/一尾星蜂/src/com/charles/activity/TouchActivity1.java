package com.charles.activity;

import android.app.Activity;
import android.os.Bundle;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnTouchListener;
import android.widget.TextView;

public class TouchActivity1 extends Activity {
	private TextView info = null;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.setContentView(R.layout.touch1);
		this.info = (TextView) super.findViewById(R.id.info);
		this.info.setOnTouchListener(new OnTouchListenerImpl());
	}

	private class OnTouchListenerImpl implements OnTouchListener {

		public boolean onTouch(View v, MotionEvent event) {
			TouchActivity1.this.info.setText("X = " + event.getX() + "£¨Y = "
					+ event.getY()); // …Ë÷√Œƒ±æ
			return false;
		}
	}
}