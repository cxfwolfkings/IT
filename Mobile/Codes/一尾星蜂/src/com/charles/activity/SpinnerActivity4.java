package com.charles.activity;

import java.util.ArrayList;
import java.util.List;

import android.app.Activity;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.Spinner;

/**
 * ��̬������������
 * @author Charles
 *
 */
public class SpinnerActivity4 extends Activity {
	private Spinner spiColor = null; // ��ʾҪ��ȡ����ɫ�б��
	private Spinner spiEdu = null; // ���������б�
	private ArrayAdapter<CharSequence> adapterColor = null; // ���е����ݶ���String
	private ArrayAdapter<CharSequence> adapterEdu = null; // ���е����ݿ϶����ַ���
	private List<CharSequence> dataEdu = null; // ����һ����������

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.setContentView(R.layout.spinner4);
		this.spiColor = (Spinner) super.findViewById(R.id.mycolor); // ȡ����ɫ��������
		this.spiColor.setPrompt("��ѡ����ϲ������ɫ��");
		this.adapterColor = ArrayAdapter.createFromResource(this,
				R.array.color_labels, android.R.layout.simple_spinner_item); // ʵ������ArrayAdapter
		this.adapterColor
				.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item); // �������
		this.spiColor.setAdapter(this.adapterColor); // ������ʾ��Ϣ

		// ����List���ϰ�װ������������
		this.dataEdu = new ArrayList<CharSequence>();
		this.dataEdu.add("��ѧ");
		this.dataEdu.add("�о���");
		this.dataEdu.add("����");

		this.spiEdu = (Spinner) super.findViewById(R.id.myedu); // ȡ��������
		this.spiEdu.setPrompt("��ѡ����ϲ����ѧ����");
		this.adapterEdu = new ArrayAdapter<CharSequence>(this,
				android.R.layout.simple_spinner_item, this.dataEdu); // ׼���������б�������
		this.adapterEdu 
				.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item); // �������
		this.spiEdu.setAdapter(this.adapterEdu);

	}
}