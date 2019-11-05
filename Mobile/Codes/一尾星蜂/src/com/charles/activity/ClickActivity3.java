package com.charles.activity;

import android.app.Activity;
import android.content.pm.ActivityInfo;
import android.content.res.Configuration;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.ImageView;

/**
 * 改变屏幕方向
 * @author Charles
 * 
 */
public class ClickActivity3 extends Activity {
	private Button change = null;
	private ImageView img = null;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.setContentView(R.layout.click4);
		this.change = (Button) super.findViewById(R.id.change); // 取得按钮
		this.img = (ImageView) super.findViewById(R.id.img); // 取得图片
		this.change.setOnClickListener(new MyOnClickListenerImpl()); // 设置监听操作
	}

	private class MyOnClickListenerImpl implements OnClickListener { // 单击事件
		public void onClick(View v) {
			if (ClickActivity3.this.getRequestedOrientation() == ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED) {// 无法进行画面的旋转
				ClickActivity3.this.change.setText("错误：无法改变屏幕方向。");
			} else {
				if (ClickActivity3.this.getRequestedOrientation() == ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE) { // 现在的方向是横屏显示
					ClickActivity3.this
							.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT); // 变为竖屏显示
				} else if (ClickActivity3.this.getRequestedOrientation() == ActivityInfo.SCREEN_ORIENTATION_PORTRAIT) { // 如果为竖屏显示
					ClickActivity3.this
							.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE); // 变为横屏显示
				}
			}
		}
	}

	@Override
	public void onConfigurationChanged(Configuration newConfig) { // 表示的是系统设置修改的时候触发
		if (newConfig.orientation == Configuration.ORIENTATION_LANDSCAPE) { // 现在的屏幕方向是横屏
			ClickActivity3.this.change.setText("改变屏幕方向为竖屏显示（当前为横屏显示）");
			ClickActivity3.this.img.setImageResource(R.drawable.mldn_landscape);// 显示横屏图片
		} else if (newConfig.orientation == Configuration.ORIENTATION_PORTRAIT) { // 现在竖屏
			ClickActivity3.this.change.setText("改变屏幕方向为竖屏显示（当前为横屏显示）");
			ClickActivity3.this.img.setImageResource(R.drawable.mldn_portrait);// 显示竖屏图片
		}
		super.onConfigurationChanged(newConfig);
	}

}