package com.charles.activity;

import android.app.Activity;
import android.os.Bundle;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.FrameLayout;
import android.widget.ImageView;

/**
 * ���򴴽���ܲ���
 * @author Charles
 *
 */
public class FrameLayout2 extends Activity {
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		FrameLayout layout = new FrameLayout(this); // ����֡���ֹ�����
		FrameLayout.LayoutParams layoutParam = new FrameLayout.LayoutParams(
				ViewGroup.LayoutParams.MATCH_PARENT,
				ViewGroup.LayoutParams.MATCH_PARENT); // ���岼�ֹ������Ĳ���
		FrameLayout.LayoutParams viewParam = new FrameLayout.LayoutParams(
				ViewGroup.LayoutParams.WRAP_CONTENT,
				ViewGroup.LayoutParams.WRAP_CONTENT); // ������ʾ����Ĳ���
		ImageView img = new ImageView(this); // ����ͼƬ���
		img.setImageResource(R.drawable.mldn_3g); // ������ʾ��ͼƬ
		EditText edit = new EditText(this); // �����ı��������
		edit.setText("��������������..."); // ������ʾ������
		Button but = new Button(this); // ���尴ť
		but.setText("����"); // ���ð�ť������
		layout.addView(img, viewParam); // �������
		layout.addView(edit, viewParam); // �������
		layout.addView(but, viewParam); // �������
		super.setContentView(layout, layoutParam); // ����Ļ�����Ӳ��ֹ�����
	}
}