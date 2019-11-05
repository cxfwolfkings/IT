package com.charles.activity;

import android.app.Activity;
import android.os.Bundle;
import android.text.method.HideReturnsTransformationMethod;
import android.text.method.PasswordTransformationMethod;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.CheckBox;
import android.widget.EditText;
/**
 * ��������ʾ����
 * @author Charles
 *
 */
public class ClickActivity4 extends Activity {
	private EditText password = null;
	private CheckBox show = null;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.setContentView(R.layout.click2);
		this.password = (EditText) super.findViewById(R.id.password);
		this.show = (CheckBox) super.findViewById(R.id.show);
		this.show.setOnClickListener(new OnClickListenerImpl());
	}

	private class OnClickListenerImpl implements OnClickListener {
		public void onClick(View v) {
			if (ClickActivity4.this.show.isChecked()) { // ��ѡ�У�Ӧ�ò������ĵķ�ʽ��ʾ
				ClickActivity4.this.password
						.setTransformationMethod(HideReturnsTransformationMethod
								.getInstance()); // ���ı������������Ϊ������ʾ
			} else { // �������ĵķ�ʽ��ʾ
				ClickActivity4.this.password
						.setTransformationMethod(PasswordTransformationMethod
								.getInstance()); // �����ĵķ�ʽ��ʾ
			}
		}

	}
}