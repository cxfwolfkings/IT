package com.charles.activity;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

/**
 * �����¼�
 * @author Charles
 *
 */
public class ClickActivity1 extends Activity {
	private EditText edit = null;
	private Button but = null;
	private TextView showView = null;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.setContentView(R.layout.click1);
		this.but = (Button) super.findViewById(R.id.mybut); // ȡ�ð�ť
		this.edit = (EditText) super.findViewById(R.id.myed); // ȡ�ñ༭���
		this.showView = (TextView) super.findViewById(R.id.mytext); // ȡ���ı����
		this.but.setOnClickListener(new ShowListener()); // �����¼�
		/**
		 * �����ڲ��� 
		 * 
		this.but.setOnClickListener(new OnClickListener(){
			public void onClick(View v) {
				String info = MyClickDemo.this.edit.getText().toString() ;	// ȡ�����������
				MyClickDemo.this.showView.setText("����������ǣ�" + info) ;	// �����ı���ʾ�������
			}
		}); // �����¼�
		*/
	}

	private class ShowListener implements OnClickListener {
		public void onClick(View v) {
			String info = ClickActivity1.this.edit.getText().toString() ;	// ȡ�����������
			ClickActivity1.this.showView.setText("����������ǣ�" + info) ;	// �����ı���ʾ�������
		}
	}
}