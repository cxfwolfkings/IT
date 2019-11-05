package com.charles.activity;

import android.app.Activity;

import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemSelectedListener;
import android.widget.Spinner;
import android.widget.TextView;
/**
 * �����б��
 * @author Charles
 *
 */
public class SpinnerActivity1 extends Activity {
	private Spinner city = null; // �����б������
	private TextView info = null; // �Ժ��¼�����֮��ȡ�������б�������

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.setContentView(R.layout.spinner1);
		this.city = (Spinner) super.findViewById(R.id.city); // ȡ�������б��
		this.info = (TextView) super.findViewById(R.id.info); // ȡ���ı���ʾ���
		this.city.setOnItemSelectedListener(new OnItemSelectedListenerImpl());
	}

	private class OnItemSelectedListenerImpl implements OnItemSelectedListener {
		public void onItemSelected(AdapterView<?> parent, View view,
				int position, long id) { // ��ʾѡ��ı��ʱ�򴥷�
			String value = parent.getItemAtPosition(position).toString(); // ȡ��ѡ�е�ѡ��
			SpinnerActivity1.this.info.setText("��ϲ���ĳ����ǣ�" + value); // �����ı��������
		}

		public void onNothingSelected(AdapterView<?> arg0) { // ��ʾû��ѡ���ʱ�򴥷�
			// һ��˷������ڲ�����
		}
	}
}