package com.charles.activity;

import android.app.Activity;
import android.os.Bundle;
import android.view.ViewGroup;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;

/**
 * ���봴����񲼾�
 * @author Charles
 *
 */
public class TableActivity4 extends Activity {
	private String titleData[][] = new String[][] {
			{ "ID", "����", "EMAIL", "��ַ" },
			{ "MLDN", "ħ�ֿƼ�", "mldnkf@163.com",
					"������������11�ŵ����ֵ�ʤ�Ƽ�԰�������� A�� - 6�� ���� MLDNħ�ֿƼ�" },
			{ "LXH", "���˻�", "mldnqa@163.com", "���" } }; // ����Ҫ��ʾ������

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		TableLayout layout = new TableLayout(this); // �����񲼾�
		TableLayout.LayoutParams layoutParam = new TableLayout.LayoutParams(
				ViewGroup.LayoutParams.FILL_PARENT,
				ViewGroup.LayoutParams.FILL_PARENT); // ���岼�ֹ������Ĳ���
		layout.setBackgroundResource(R.drawable.logo); // ���屳��ͼƬ
		for (int x = 0; x < this.titleData.length; x++) { // ѭ�����ñ����
			TableRow row = new TableRow(this); // ��������
			for (int y = 0; y < this.titleData[x].length; y++) {
				TextView text = new TextView(this);
				text.setText(this.titleData[x][y]); // �����ı�����
				row.addView(text, y); // ����һ�����
			}
			layout.addView(row); // ����֮���������ɸ������
		}
		super.setContentView(layout, layoutParam); // ������ʾ
	}
}