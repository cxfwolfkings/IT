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
 * SimpleAdapter�б�
 * @author Charles
 *
 */
public class ListActivity2 extends Activity {
	private String data[][] = { { "001", "����ħ�ֿƼ�" },
			{ "002", "www.mldnjava.cn" }, { "003", "��ʦ�����˻�" },
			{ "004", "�й���У��ʦ����" }, { "005", "www.jiangker.com" },
			{ "006", "��ѯ���䣺mldnqa@163.com" }, { "007", "�ͻ�����mldnkf@163.com" },
			{ "008", "�ͻ��绰��(010) 51283346" }, { "009", "ħ��������bbs.mldn.cn" },
			{ "010", "����Ա��Ƹ����http://www.javajob.cn/" } }; // ׼�������ɸ���Ϣ����Щ��Ϣ�Ժ�ͨ��������뵽��Ƕ�����Բ����ļ�֮��
	private ListView datalist = null; // ����ListView���
	private List<Map<String, String>> list = new ArrayList<Map<String, String>>(); // ������ʾ�����ݰ�װ
	private SimpleAdapter simpleAdapter = null; // �������ݵ�ת������

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.setContentView(R.layout.list2);
		this.datalist = (ListView) super.findViewById(R.id.datalist); // ȡ�����
		for (int x = 0; x < this.data.length; x++) {
			Map<String, String> map = new HashMap<String, String>(); // ����Map���ϣ�����ÿһ������
			map.put("_id", this.data[x][0]); // ��data_list.xml�е�TextView���ƥ��
			map.put("name", this.data[x][1]); // ��data_list.xml�е�TextView���ƥ��
			this.list.add(map); // ���������е�������
		}
		this.simpleAdapter = new SimpleAdapter(this, this.list,
				R.layout.data_list1, new String[] { "_id", "name" } // Map�е�key������
				, new int[] { R.id._id, R.id.name }); // ��data_list.xml�ж�����������ԴID
		this.datalist.setAdapter(this.simpleAdapter);
	}
}