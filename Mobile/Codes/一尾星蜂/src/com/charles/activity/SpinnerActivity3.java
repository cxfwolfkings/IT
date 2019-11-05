package com.charles.activity;

import android.app.Activity;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.Spinner;

public class SpinnerActivity3 extends Activity {
	private Spinner spiColor = null; // ��ʾҪ��ȡ����ɫ�б��
	private ArrayAdapter<CharSequence> adapterColor = null; // ���е����ݶ���String

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.setContentView(R.layout.spinner3);
		this.spiColor = (Spinner) super.findViewById(R.id.mycolor); // ȡ����ɫ��������
		this.spiColor.setPrompt("��ѡ����ϲ������ɫ��");
		//ͨ��createFromResource��������һ��ArrayAdapter����
		//��һ��������ָ�����Ķ���
		//�ڶ�������������strings.xml�ļ����ж����String����
		//����������������ָ��Spinner����ʽ����һ�������ļ�ID���ò����ļ���Androidϵͳ�ṩ��Ҳ���滻Ϊ�Լ�����Ĳ����ļ�
		this.adapterColor = ArrayAdapter.createFromResource(this,
				R.array.color_labels, android.R.layout.simple_spinner_item); // ʵ������ArrayAdapter
		//����Spinner����ÿ����Ŀ����ʽ��ͬ��������һ��Androidϵͳ�ṩ�Ĳ����ļ�
		this.adapterColor 
				.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item); // �������
		this.spiColor.setAdapter(this.adapterColor); // ������ʾ��Ϣ
	}
}