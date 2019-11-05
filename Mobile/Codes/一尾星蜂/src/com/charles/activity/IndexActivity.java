package com.charles.activity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.GridView;
import android.widget.SimpleAdapter;
import android.widget.Toast;

public class IndexActivity extends Activity {

	private GridView mGridView; // MyGridView
	// ����ͼ������
	private int[] imageRes = { R.drawable.clock, R.drawable.dir, R.drawable.draw, R.drawable.mail, R.drawable.music,
			R.drawable.note, R.drawable.office, R.drawable.tool, R.drawable.computer };
	// �����������
	private String[] itemName = { "����", "�ļ���", "��ͼ", "�ʼ�", "����", "�ʼ�", "�칫��", "����", "����" };

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		// ����Activity���ⲻ��ʾ
		this.requestWindowFeature(Window.FEATURE_NO_TITLE);
		// ����ȫ����ʾ
		this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
				WindowManager.LayoutParams.FLAG_FULLSCREEN);

		super.setContentView(R.layout.activity_index);

		mGridView = (GridView) findViewById(R.id.MyGridView);
		List<HashMap<String, Object>> data = new ArrayList<HashMap<String, Object>>();
		int length = itemName.length;
		for (int i = 0; i < length; i++) {
			HashMap<String, Object> map = new HashMap<String, Object>();
			map.put("ItemImageView", imageRes[i]);
			map.put("ItemTextView", itemName[i]);
			data.add(map);
		}
		// Ϊitme.xml���������
		SimpleAdapter simpleAdapter = new SimpleAdapter(IndexActivity.this, data, R.layout.item,
				new String[] { "ItemImageView", "ItemTextView" }, new int[] { R.id.ItemImageView, R.id.ItemTextView });
		mGridView.setAdapter(simpleAdapter);
		// ΪmGridView��ӵ���¼�������
		mGridView.setOnItemClickListener(new GridViewItemOnClick());
	}

	// �������¼�������
	public class GridViewItemOnClick implements OnItemClickListener {
		@Override
		public void onItemClick(AdapterView<?> arg0, View view, int position, long arg3) {
			Toast.makeText(getApplicationContext(), itemName[position], Toast.LENGTH_SHORT).show();
			switch (position) {
				case 8:
					changeActivity(IndexActivity.this, LoginActivity.class);
					break;
			}
		}
	}

	public void changeActivity(Context packageContext, Class<?> className) {
		Intent intent = new Intent(packageContext, className);
		startActivity(intent);
	}
}