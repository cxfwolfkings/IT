package com.charles.activity;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemSelectedListener;
import android.widget.ArrayAdapter;
import android.widget.Spinner;

/**
 * �����˵�
 * @author Charles
 *
 */
public class SpinnerActivity2 extends Activity {
	private Spinner city = null; // �����б������
	private Spinner area = null; // �����б�
	private String[][] areaData = new String[][] {
			{ "����", "����", "����", "����", "ƽ��" }, // �����һ��������Ϣ
			{ "����", "����", "����" }, // ����ڶ���������Ϣ
			{ "����" } // ���������������Ϣ
	}; // �Ӳ˵���
	//����ArrayAdapter�Ĺ��캯��������ArrayAdapter����
	//��һ��������ָ�����Ķ���
	//�ڶ�������ָ���������˵�����ÿһ����Ŀ����ʽ
	//����������ָ����TextView�ؼ���ID
	//���ĸ�����Ϊ�����б��ṩ����
	private ArrayAdapter<CharSequence> adapterArea = null;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.setContentView(R.layout.spinner2);
		this.city = (Spinner) super.findViewById(R.id.city); // ȡ�������б��
		this.area = (Spinner) super.findViewById(R.id.area); // ȡ�������б��
		this.city.setOnItemSelectedListener(new OnItemSelectedListenerImpl());
	}

	private class OnItemSelectedListenerImpl implements OnItemSelectedListener {
		public void onItemSelected(AdapterView<?> parent, View view,
				int position, long id) { // ��ʾѡ��ı��ʱ�򴥷�
			SpinnerActivity2.this.adapterArea = new ArrayAdapter<CharSequence>(
					SpinnerActivity2.this,
					android.R.layout.simple_spinner_item,
					SpinnerActivity2.this.areaData[position]); // �������е��б���
			SpinnerActivity2.this.area
					.setAdapter(SpinnerActivity2.this.adapterArea);// ���ö��������б��ѡ������
		}

		public void onNothingSelected(AdapterView<?> arg0) { // ��ʾû��ѡ���ʱ�򴥷�
			// һ��˷������ڲ�����
		}
	}
}