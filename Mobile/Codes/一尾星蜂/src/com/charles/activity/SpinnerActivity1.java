package com.charles.activity;

import android.app.Activity;

import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemSelectedListener;
import android.widget.Spinner;
import android.widget.TextView;
/**
 * 下拉列表框
 * @author Charles
 *
 */
public class SpinnerActivity1 extends Activity {
	private Spinner city = null; // 下拉列表框内容
	private TextView info = null; // 以后事件发生之后取得下拉列表框的内容

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.setContentView(R.layout.spinner1);
		this.city = (Spinner) super.findViewById(R.id.city); // 取得下拉列表框
		this.info = (TextView) super.findViewById(R.id.info); // 取得文本显示组件
		this.city.setOnItemSelectedListener(new OnItemSelectedListenerImpl());
	}

	private class OnItemSelectedListenerImpl implements OnItemSelectedListener {
		public void onItemSelected(AdapterView<?> parent, View view,
				int position, long id) { // 表示选项改变的时候触发
			String value = parent.getItemAtPosition(position).toString(); // 取得选中的选项
			SpinnerActivity1.this.info.setText("您喜欢的城市是：" + value); // 设置文本组件内容
		}

		public void onNothingSelected(AdapterView<?> arg0) { // 表示没有选项的时候触发
			// 一般此方法现在不关心
		}
	}
}