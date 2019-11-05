package com.charles.activity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import android.app.ListActivity;
import android.os.Bundle;
import android.widget.SimpleAdapter;
 
/**
 * ʹ��ListActivity
 * @author Charles
 *
 */
public class ListActivity4 extends ListActivity {	// �̳���ListActivity��
	private String data[][] = { { "001", "����ħ�ֿƼ�" },
			{ "002", "www.mldnjava.cn" }, { "003", "��ʦ�����˻�" },
			{ "004", "�й���У��ʦ����" }, { "005", "www.jiangker.com" },
			{ "006", "��ѯ���䣺mldnqa@163.com" }, { "007", "�ͻ�����mldnkf@163.com" },
			{ "008", "�ͻ��绰��(010) 51283346" }, { "009", "ħ��������bbs.mldn.cn" },
			{ "010", "����Ա��Ƹ����http://www.javajob.cn/" } }; // ׼�������ɸ���Ϣ����Щ��Ϣ

	private List<Map<String, String>> list = new ArrayList<Map<String, String>>(); // ������ʾ�����ݰ�װ
	private SimpleAdapter simpleAdapter = null; // �������ݵ�ת������
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		for (int x = 0; x < this.data.length; x++) {
			Map<String, String> map = new HashMap<String, String>(); // ����Map���ϣ�����ÿһ������
			map.put("_id", this.data[x][0]); // ��data_list.xml�е�TextView���ƥ��
			map.put("name", this.data[x][1]); // ��data_list.xml�е�TextView���ƥ��
			this.list.add(map); // ���������е�������
		}
		this.simpleAdapter = new SimpleAdapter(this, this.list,
				R.layout.data_list2, new String[] { "_id", "name" } // Map�е�key������
				, new int[] { R.id._id, R.id.name }); // ��data_list.xml�ж�����������ԴID
		super.setListAdapter(this.simpleAdapter); // �����б���ʾ
	}
}