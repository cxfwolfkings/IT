package com.charles.activity;

import android.app.Activity;
import android.os.Bundle;
import android.view.ViewGroup;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;

/**
 * 代码创建表格布局
 * @author Charles
 *
 */
public class TableActivity4 extends Activity {
	private String titleData[][] = new String[][] {
			{ "ID", "姓名", "EMAIL", "地址" },
			{ "MLDN", "魔乐科技", "mldnkf@163.com",
					"北京西城区甲11号德外大街德胜科技园美江大厦 A座 - 6层 —— MLDN魔乐科技" },
			{ "LXH", "李兴华", "mldnqa@163.com", "天津" } }; // 定义要显示的数据

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		TableLayout layout = new TableLayout(this); // 定义表格布局
		TableLayout.LayoutParams layoutParam = new TableLayout.LayoutParams(
				ViewGroup.LayoutParams.FILL_PARENT,
				ViewGroup.LayoutParams.FILL_PARENT); // 定义布局管理器的参数
		layout.setBackgroundResource(R.drawable.logo); // 定义背景图片
		for (int x = 0; x < this.titleData.length; x++) { // 循环设置表格行
			TableRow row = new TableRow(this); // 定义表格行
			for (int y = 0; y < this.titleData[x].length; y++) {
				TextView text = new TextView(this);
				text.setText(this.titleData[x][y]); // 设置文本内容
				row.addView(text, y); // 加入一个编号
			}
			layout.addView(row); // 向表格之中增加若干个表格行
		}
		super.setContentView(layout, layoutParam); // 设置显示
	}
}