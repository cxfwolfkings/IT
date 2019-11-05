package com.charles.activity;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

/**
 * 简易计算器
 * @author Charles
 *
 */
public class ClickActivity2 extends Activity {
	private TextView showView = null;
	private TextView note = null;
	private EditText editNum1 = null;
	private EditText editNum2 = null;
	private Button butAdd = null;
	private Button butSub = null;
	private Button butMul = null;
	private Button butDiv = null;
	private int num1 = 0; // 保存输入的数字
	private int num2 = 0; // 保存输入的数字

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.setContentView(R.layout.click3);
		this.showView = (TextView) super.findViewById(R.id.mytext); // 取得显示结果
		this.editNum1 = (EditText) super.findViewById(R.id.myeda); // 取得输入的内容
		this.editNum2 = (EditText) super.findViewById(R.id.myedb); // 取得输入的内容
		this.butAdd = (Button) super.findViewById(R.id.mybutadd); // 取得操作功能按钮
		this.butSub = (Button) super.findViewById(R.id.mybutsub); // 取得操作功能按钮
		this.butMul = (Button) super.findViewById(R.id.mybutmul); // 取得操作功能按钮
		this.butDiv = (Button) super.findViewById(R.id.mybutdiv); // 取得操作功能按钮
		this.note = (TextView) super.findViewById(R.id.note); // 取得操作的形式
		this.butAdd.setOnClickListener(new AddListener());
		this.butSub.setOnClickListener(new SubListener());
		this.butMul.setOnClickListener(new MulListener());
		this.butDiv.setOnClickListener(new DivListener());
		this.editNum1.setOnClickListener(new OnClickListener() {
			public void onClick(View v) {
				ClickActivity2.this.editNum1.setText("");
			}
		});
		this.editNum2.setOnClickListener(new OnClickListener() {
			public void onClick(View v) {
				ClickActivity2.this.editNum2.setText("");
			}

		});
	}

	private class AddListener implements OnClickListener {
		public void onClick(View v) {
			ClickActivity2.this.num1 = Integer.parseInt(ClickActivity2.this.editNum1
					.getText().toString()); // 取得第一个数字
			ClickActivity2.this.num2 = Integer.parseInt(ClickActivity2.this.editNum2
					.getText().toString()); // 取得第一个数字
			ClickActivity2.this.note.setText(" + "); // 更新操作的符号
			ClickActivity2.this.showView.setText(String.valueOf(num1 + num2)); // 显示结果
		} // 加法操作
	}

	private class SubListener implements OnClickListener {
		public void onClick(View v) {
			ClickActivity2.this.num1 = Integer.parseInt(ClickActivity2.this.editNum1
					.getText().toString()); // 取得第一个数字
			ClickActivity2.this.num2 = Integer.parseInt(ClickActivity2.this.editNum2
					.getText().toString()); // 取得第一个数字
			ClickActivity2.this.note.setText(" - "); // 更新操作的符号
			ClickActivity2.this.showView.setText(String.valueOf(num1 - num2)); // 显示结果
		} // 加法操作
	}

	private class MulListener implements OnClickListener {
		public void onClick(View v) {
			ClickActivity2.this.num1 = Integer.parseInt(ClickActivity2.this.editNum1
					.getText().toString()); // 取得第一个数字
			ClickActivity2.this.num2 = Integer.parseInt(ClickActivity2.this.editNum2
					.getText().toString()); // 取得第一个数字
			ClickActivity2.this.note.setText(" * "); // 更新操作的符号
			ClickActivity2.this.showView.setText(String.valueOf(num1 * num2)); // 显示结果
		} // 加法操作
	}

	private class DivListener implements OnClickListener {
		public void onClick(View v) {
			ClickActivity2.this.num1 = Integer.parseInt(ClickActivity2.this.editNum1
					.getText().toString()); // 取得第一个数字
			ClickActivity2.this.num2 = Integer.parseInt(ClickActivity2.this.editNum2
					.getText().toString()); // 取得第一个数字
			ClickActivity2.this.note.setText(" ÷ "); // 更新操作的符号
			ClickActivity2.this.showView.setText(String.valueOf(num1 / num2)); // 显示结果
		} // 加法操作
	}
}