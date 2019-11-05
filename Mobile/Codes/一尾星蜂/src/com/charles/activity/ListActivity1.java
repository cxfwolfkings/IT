package com.charles.activity;

import android.app.Activity;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.ListView;

/**
 * ArrayAdapter
 * @author Charles
 *
 */
public class ListActivity1 extends Activity {
	private String data[] = { "北京魔乐科技", "www.mldnjava.cn", "讲师：李兴华",
			"中国高校讲师联盟", "www.jiangker.com", "咨询邮箱：mldnqa@163.com",
			"客户服务：mldnkf@163.com", "客户电话：(010) 51283346", "魔乐社区：bbs.mldn.cn",
			"程序员招聘网：http://www.javajob.cn/" }; // 准备出若干个信息而这些信息以后将通过程序加入到内嵌的线性布局文件之中
	private ListView listView = null; // 定义ListView组件

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		this.listView = new ListView(this); // 实例化组件
		this.listView.setAdapter(new ArrayAdapter<String>(this,
				android.R.layout.simple_list_item_1, this.data)); // 为ListView组件设置内容
		/* 更改显示风格
		this.listView.setAdapter(new ArrayAdapter<String>(this,
				android.R.layout.simple_expandable_list_item_1, this.data)); // 为ListView组件设置内容 
		*/
		super.setContentView(this.listView) ;	// 显示组件
	} 
}