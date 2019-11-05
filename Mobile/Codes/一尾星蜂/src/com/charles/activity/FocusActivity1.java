package com.charles.activity;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnFocusChangeListener;
import android.widget.EditText;
import android.widget.TextView;

/**
 * 焦点事件
 * @author Charles
 *
 */
public class FocusActivity1 extends Activity {
	private EditText edit = null; // 在此组件上设置焦点事件
	private TextView txt = null; // 用于信息提示

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.setContentView(R.layout.focus1);
		this.edit = (EditText) super.findViewById(R.id.edit); // 取得组件
		this.txt = (TextView) super.findViewById(R.id.txt); // 取得组件
		this.edit.setOnFocusChangeListener(new OnFocusChangeListenerImpl());
	}

	private class OnFocusChangeListenerImpl implements OnFocusChangeListener {
		public void onFocusChange(View v, boolean hasFocus) { // 表示操作的组件，而hasFocus表示是否获得焦点
			if (hasFocus) { // 已经获得了焦点
				FocusActivity1.this.txt.setText("文本输入组件获得焦点。") ;
			} else {
				FocusActivity1.this.txt.setText("文本输入组件失去焦点。") ;
			}
		}
	}
}