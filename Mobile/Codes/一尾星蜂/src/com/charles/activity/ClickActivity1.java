package com.charles.activity;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

/**
 * 单击事件
 * @author Charles
 *
 */
public class ClickActivity1 extends Activity {
	private EditText edit = null;
	private Button but = null;
	private TextView showView = null;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.setContentView(R.layout.click1);
		this.but = (Button) super.findViewById(R.id.mybut); // 取得按钮
		this.edit = (EditText) super.findViewById(R.id.myed); // 取得编辑组件
		this.showView = (TextView) super.findViewById(R.id.mytext); // 取得文本组件
		this.but.setOnClickListener(new ShowListener()); // 设置事件
		/**
		 * 匿名内部类 
		 * 
		this.but.setOnClickListener(new OnClickListener(){
			public void onClick(View v) {
				String info = MyClickDemo.this.edit.getText().toString() ;	// 取得输入的内容
				MyClickDemo.this.showView.setText("输入的内容是：" + info) ;	// 更新文本显示组件内容
			}
		}); // 设置事件
		*/
	}

	private class ShowListener implements OnClickListener {
		public void onClick(View v) {
			String info = ClickActivity1.this.edit.getText().toString() ;	// 取得输入的内容
			ClickActivity1.this.showView.setText("输入的内容是：" + info) ;	// 更新文本显示组件内容
		}
	}
}