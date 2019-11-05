package com.charles.activity;

import android.app.Activity;
import android.os.Bundle;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

/**
 * 程序创建线性布局
 * @author Charles
 *
 */
public class LinearLayout2 extends Activity {
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		LinearLayout layout = new LinearLayout(this); // 定义线性布局管理器
		LinearLayout.LayoutParams param = new LinearLayout.LayoutParams(
				ViewGroup.LayoutParams.MATCH_PARENT,
				ViewGroup.LayoutParams.MATCH_PARENT); // 先定义布局管理器的参数
		layout.setOrientation(LinearLayout.VERTICAL); // 所有组件采用垂直方式摆放

		// 下面要定义显示组件的布局管理器，为了简单，本次只定义一个TextView组件
		LinearLayout.LayoutParams txtParam = new LinearLayout.LayoutParams(
				ViewGroup.LayoutParams.MATCH_PARENT,
				ViewGroup.LayoutParams.WRAP_CONTENT);// 定义组件的布局管理器参数
		TextView txt = new TextView(this); // 定义文本显示组件
		txt.setLayoutParams(txtParam); // 配置文本显示组件的参数
		txt.setText("北京魔乐科技软件学院（MLDN）"); // 配置显示文字
		txt.setTextSize(20);
		layout.addView(txt, txtParam); // 增加组件
		super.setContentView(layout, param); // 增加新的布局管理器
	}

}
