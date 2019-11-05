package com.charles.activity;

import android.app.Activity;
import android.os.Bundle;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

/**
 * ���򴴽����Բ���
 * @author Charles
 *
 */
public class LinearLayout2 extends Activity {
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		LinearLayout layout = new LinearLayout(this); // �������Բ��ֹ�����
		LinearLayout.LayoutParams param = new LinearLayout.LayoutParams(
				ViewGroup.LayoutParams.MATCH_PARENT,
				ViewGroup.LayoutParams.MATCH_PARENT); // �ȶ��岼�ֹ������Ĳ���
		layout.setOrientation(LinearLayout.VERTICAL); // ����������ô�ֱ��ʽ�ڷ�

		// ����Ҫ������ʾ����Ĳ��ֹ�������Ϊ�˼򵥣�����ֻ����һ��TextView���
		LinearLayout.LayoutParams txtParam = new LinearLayout.LayoutParams(
				ViewGroup.LayoutParams.MATCH_PARENT,
				ViewGroup.LayoutParams.WRAP_CONTENT);// ��������Ĳ��ֹ���������
		TextView txt = new TextView(this); // �����ı���ʾ���
		txt.setLayoutParams(txtParam); // �����ı���ʾ����Ĳ���
		txt.setText("����ħ�ֿƼ����ѧԺ��MLDN��"); // ������ʾ����
		txt.setTextSize(20);
		layout.addView(txt, txtParam); // �������
		super.setContentView(layout, param); // �����µĲ��ֹ�����
	}

}
