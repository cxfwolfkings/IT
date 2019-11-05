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
 * ������ʾ
 * @author Charles
 *
 */
public class ListActivity3 extends Activity {
	private int pic[] = new int[] { R.drawable.android_mldn_01,
			R.drawable.android_mldn_02, R.drawable.logo,
			R.drawable.mldn_3g, R.drawable.mldn_landscape, R.drawable.mldn_portrait };
	private String data[][] = new String[][] { { "Oracle���ݿ�", "ħ�ֿƼ�" },
			{ "Java SE�����γ�", "���˻�" }, { "Java WEB�ۺϿ���", "MLDN" },
			{ "Java EE�߼�����", "���˻�" }, { "AndroidǶ��ʽ����", "���˻�" },
			{ "Java ��Ϸ����", "����" } };

	private ListView datalist = null; // ����ListView���
	private List<Map<String, String>> list = new ArrayList<Map<String, String>>(); // ������ʾ�����ݰ�װ
	private SimpleAdapter simpleAdapter = null; // �������ݵ�ת������

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.setContentView(R.layout.list3);
		this.datalist = (ListView) super.findViewById(R.id.datalist); // ȡ�����
		for (int x = 0; x < this.data.length; x++) {
			Map<String, String> map = new HashMap<String, String>(); // ����Map���ϣ�����ÿһ������
			map.put("pic", String.valueOf(this.pic[x])); // ��data_list.xml�е�TextView���ƥ��
			map.put("title", this.data[x][0]); // ��data_list.xml�е�TextView���ƥ��
			map.put("author", this.data[x][1]); // ��data_list.xml�е�TextView���ƥ��
			map.put("type", "���");
			map.put("score", String.valueOf(R.drawable.ic_launcher));
			this.list.add(map); // ���������е�������
		} 
		this.simpleAdapter = new SimpleAdapter(this, this.list,
				R.layout.data_list2, new String[] { "pic", "title", "author",
						"type", "score" } // Map�е�key������
				, new int[] { R.id.pic, R.id.title, R.id.author, R.id.type,
						R.id.score }); // ��data_list.xml�ж�����������ԴID
		this.datalist.setAdapter(this.simpleAdapter);
	}
}