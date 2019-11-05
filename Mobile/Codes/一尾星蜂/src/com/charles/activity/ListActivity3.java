package com.charles.activity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import android.app.Activity;
import android.os.Bundle;
import android.widget.ListView;
import android.widget.SimpleAdapter;

/**
 * 复杂显示
 * @author Charles
 *
 */
public class ListActivity3 extends Activity {
	private int pic[] = new int[] { R.drawable.android_mldn_01,
			R.drawable.android_mldn_02, R.drawable.logo,
			R.drawable.mldn_3g, R.drawable.mldn_landscape, R.drawable.mldn_portrait };
	private String data[][] = new String[][] { { "Oracle数据库", "魔乐科技" },
			{ "Java SE基础课程", "李兴华" }, { "Java WEB综合开发", "MLDN" },
			{ "Java EE高级开发", "李兴华" }, { "Android嵌入式开发", "李兴华" },
			{ "Java 游戏开发", "李祺" } };

	private ListView datalist = null; // 定义ListView组件
	private List<Map<String, String>> list = new ArrayList<Map<String, String>>(); // 定义显示的内容包装
	private SimpleAdapter simpleAdapter = null; // 进行数据的转换操作

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.setContentView(R.layout.list3);
		this.datalist = (ListView) super.findViewById(R.id.datalist); // 取得组件
		for (int x = 0; x < this.data.length; x++) {
			Map<String, String> map = new HashMap<String, String>(); // 定义Map集合，保存每一行数据
			map.put("pic", String.valueOf(this.pic[x])); // 与data_list.xml中的TextView组加匹配
			map.put("title", this.data[x][0]); // 与data_list.xml中的TextView组加匹配
			map.put("author", this.data[x][1]); // 与data_list.xml中的TextView组加匹配
			map.put("type", "免费");
			map.put("score", String.valueOf(R.drawable.ic_launcher));
			this.list.add(map); // 保存了所有的数据行
		} 
		this.simpleAdapter = new SimpleAdapter(this, this.list,
				R.layout.data_list2, new String[] { "pic", "title", "author",
						"type", "score" } // Map中的key的名称
				, new int[] { R.id.pic, R.id.title, R.id.author, R.id.type,
						R.id.score }); // 是data_list.xml中定义的组件的资源ID
		this.datalist.setAdapter(this.simpleAdapter);
	}
}