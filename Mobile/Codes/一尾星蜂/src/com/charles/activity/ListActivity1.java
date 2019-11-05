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
	private String data[] = { "����ħ�ֿƼ�", "www.mldnjava.cn", "��ʦ�����˻�",
			"�й���У��ʦ����", "www.jiangker.com", "��ѯ���䣺mldnqa@163.com",
			"�ͻ�����mldnkf@163.com", "�ͻ��绰��(010) 51283346", "ħ��������bbs.mldn.cn",
			"����Ա��Ƹ����http://www.javajob.cn/" }; // ׼�������ɸ���Ϣ����Щ��Ϣ�Ժ�ͨ��������뵽��Ƕ�����Բ����ļ�֮��
	private ListView listView = null; // ����ListView���

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		this.listView = new ListView(this); // ʵ�������
		this.listView.setAdapter(new ArrayAdapter<String>(this,
				android.R.layout.simple_list_item_1, this.data)); // ΪListView�����������
		/* ������ʾ���
		this.listView.setAdapter(new ArrayAdapter<String>(this,
				android.R.layout.simple_expandable_list_item_1, this.data)); // ΪListView����������� 
		*/
		super.setContentView(this.listView) ;	// ��ʾ���
	} 
}