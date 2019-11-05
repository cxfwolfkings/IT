package com.charles.activity;

import android.app.Activity;
import android.os.Bundle;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.FrameLayout;
import android.widget.ImageView;

/**
 * 程序创建框架布局
 * @author Charles
 *
 */
public class FrameLayout2 extends Activity {
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		FrameLayout layout = new FrameLayout(this); // 定义帧布局管理器
		FrameLayout.LayoutParams layoutParam = new FrameLayout.LayoutParams(
				ViewGroup.LayoutParams.MATCH_PARENT,
				ViewGroup.LayoutParams.MATCH_PARENT); // 定义布局管理器的参数
		FrameLayout.LayoutParams viewParam = new FrameLayout.LayoutParams(
				ViewGroup.LayoutParams.WRAP_CONTENT,
				ViewGroup.LayoutParams.WRAP_CONTENT); // 定义显示组件的参数
		ImageView img = new ImageView(this); // 定义图片组件
		img.setImageResource(R.drawable.mldn_3g); // 定义显示的图片
		EditText edit = new EditText(this); // 定义文本输入组件
		edit.setText("请输入您的姓名..."); // 设置显示的文字
		Button but = new Button(this); // 定义按钮
		but.setText("按我"); // 设置按钮的文字
		layout.addView(img, viewParam); // 增加组件
		layout.addView(edit, viewParam); // 增加组件
		layout.addView(but, viewParam); // 增加组件
		super.setContentView(layout, layoutParam); // 向屏幕上增加布局管理器
	}
}