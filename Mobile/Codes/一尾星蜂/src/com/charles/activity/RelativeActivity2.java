package com.charles.activity;

import android.app.Activity;
import android.os.Bundle;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.RelativeLayout;

/**
 * 代码配置相对布局管理器
 * @author Charles
 *
 */
public class RelativeActivity2 extends Activity {
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.setContentView(R.layout.first); // 要读取已经存在的布局管理器
		RelativeLayout rl = (RelativeLayout) super.findViewById(R.id.mylayout); // 找到布局管理器
		RelativeLayout.LayoutParams param = new RelativeLayout.LayoutParams(
				ViewGroup.LayoutParams.FILL_PARENT,
				ViewGroup.LayoutParams.FILL_PARENT); // 定义参数
		param.addRule(RelativeLayout.BELOW, R.id.mybut); // 新的组件放在mybut组件之下
		param.addRule(RelativeLayout.RIGHT_OF, R.id.imga); // 放在第一张图片的右边
		EditText text = new EditText(this); // 输入文本
		rl.addView(text, param); // 是向一个布局管理器之中增加组件
	}
}