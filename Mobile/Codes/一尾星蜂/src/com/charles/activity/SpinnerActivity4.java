package com.charles.activity;

import java.util.ArrayList;
import java.util.List;

import android.app.Activity;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.Spinner;

/**
 * 动态生成下拉内容
 * @author Charles
 *
 */
public class SpinnerActivity4 extends Activity {
	private Spinner spiColor = null; // 表示要读取的颜色列表框
	private Spinner spiEdu = null; // 定义下拉列表
	private ArrayAdapter<CharSequence> adapterColor = null; // 所有的数据都是String
	private ArrayAdapter<CharSequence> adapterEdu = null; // 所有的数据肯定是字符串
	private List<CharSequence> dataEdu = null; // 定义一个集合数据

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.setContentView(R.layout.spinner4);
		this.spiColor = (Spinner) super.findViewById(R.id.mycolor); // 取得颜色的下拉框
		this.spiColor.setPrompt("请选择您喜欢的颜色：");
		this.adapterColor = ArrayAdapter.createFromResource(this,
				R.array.color_labels, android.R.layout.simple_spinner_item); // 实例化了ArrayAdapter
		this.adapterColor
				.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item); // 换个风格
		this.spiColor.setAdapter(this.adapterColor); // 设置显示信息

		// 配置List集合包装的下拉框内容
		this.dataEdu = new ArrayList<CharSequence>();
		this.dataEdu.add("大学");
		this.dataEdu.add("研究生");
		this.dataEdu.add("高中");

		this.spiEdu = (Spinner) super.findViewById(R.id.myedu); // 取得下拉框
		this.spiEdu.setPrompt("请选择您喜欢的学历：");
		this.adapterEdu = new ArrayAdapter<CharSequence>(this,
				android.R.layout.simple_spinner_item, this.dataEdu); // 准备好下拉列表框的内容
		this.adapterEdu 
				.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item); // 换个风格
		this.spiEdu.setAdapter(this.adapterEdu);

	}
}