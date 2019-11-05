package com.charles.activity;

import android.app.Activity;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.Spinner;

public class SpinnerActivity3 extends Activity {
	private Spinner spiColor = null; // 表示要读取的颜色列表框
	private ArrayAdapter<CharSequence> adapterColor = null; // 所有的数据都是String

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.setContentView(R.layout.spinner3);
		this.spiColor = (Spinner) super.findViewById(R.id.mycolor); // 取得颜色的下拉框
		this.spiColor.setPrompt("请选择您喜欢的颜色：");
		//通过createFromResource方法创建一个ArrayAdapter对象
		//第一个参数是指上下文对象
		//第二参数引用了在strings.xml文件当中定义的String数组
		//第三个参数是用来指定Spinner的样式，是一个布局文件ID，该布局文件由Android系统提供，也可替换为自己定义的布局文件
		this.adapterColor = ArrayAdapter.createFromResource(this,
				R.array.color_labels, android.R.layout.simple_spinner_item); // 实例化了ArrayAdapter
		//设置Spinner当中每个条目的样式，同样是引用一个Android系统提供的布局文件
		this.adapterColor 
				.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item); // 换个风格
		this.spiColor.setAdapter(this.adapterColor); // 设置显示信息
	}
}