package com.charles.activity;

import android.app.Activity;
import android.os.Bundle;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.RelativeLayout;

/**
 * ����������Բ��ֹ�����
 * @author Charles
 *
 */
public class RelativeActivity2 extends Activity {
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.setContentView(R.layout.first); // Ҫ��ȡ�Ѿ����ڵĲ��ֹ�����
		RelativeLayout rl = (RelativeLayout) super.findViewById(R.id.mylayout); // �ҵ����ֹ�����
		RelativeLayout.LayoutParams param = new RelativeLayout.LayoutParams(
				ViewGroup.LayoutParams.FILL_PARENT,
				ViewGroup.LayoutParams.FILL_PARENT); // �������
		param.addRule(RelativeLayout.BELOW, R.id.mybut); // �µ��������mybut���֮��
		param.addRule(RelativeLayout.RIGHT_OF, R.id.imga); // ���ڵ�һ��ͼƬ���ұ�
		EditText text = new EditText(this); // �����ı�
		rl.addView(text, param); // ����һ�����ֹ�����֮���������
	}
}