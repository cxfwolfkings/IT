package com.charles.activity;


import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.Toast;

/**
 * ������Ϣ��ʾ��
 * @author Charles
 *
 */
public class ToastActivity1 extends Activity{
	private Button butA = null;
	private Button butB = null;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		super.setContentView(R.layout.toast1);
		this.butA = (Button)findViewById(R.id.butA);
		this.butB = (Button)findViewById(R.id.butB);
		this.butA.setOnClickListener(new OnClickListenerImpLong());
		this.butB.setOnClickListener(new OnClickListenerImpShort());
	}
	
	private class OnClickListenerImpLong implements OnClickListener{
		@Override
		public void onClick(View arg0) {
			// TODO Auto-generated method stub
			Toast.makeText(ToastActivity1.this, "��ʱ����ʾ��Toast��Ϣ��ʾ��", Toast.LENGTH_LONG).show();
		}
	}
	
	private class OnClickListenerImpShort implements OnClickListener{
		@Override
		public void onClick(View arg0) {
			// TODO Auto-generated method stub
			Toast.makeText(ToastActivity1.this, "��ʱ����ʾ��Toast��Ϣ��ʾ��", Toast.LENGTH_SHORT).show();
		}
	}
}
