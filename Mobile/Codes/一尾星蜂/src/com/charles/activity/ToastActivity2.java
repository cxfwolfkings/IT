package com.charles.activity;


import android.app.Activity;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.Toast;

/**
 * �Զ�����Ϣ��ʾ��
 * @author Charles
 *
 */
public class ToastActivity2 extends Activity{
	private Button but = null;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		super.setContentView(R.layout.toast1);
		this.but = (Button)findViewById(R.id.but);
		this.but.setOnClickListener(new OnClickListenerImp());
	}
	
	private class OnClickListenerImp implements OnClickListener{
		@Override
		public void onClick(View arg0) {
			// TODO Auto-generated method stub
			Toast myToast = Toast.makeText(ToastActivity2.this, "ħ�ֿƼ����ѧԺ", Toast.LENGTH_LONG);
			myToast.setGravity(Gravity.CENTER, 60, 30);
			LinearLayout myToastView = (LinearLayout)myToast.getView();//���Բ���
			ImageView img = new ImageView(ToastActivity2.this);
			img.setImageResource(R.drawable.android_mldn_01);
			myToastView.addView(img, 0);//������ǰ��
			myToast.show();
		}
	}
	
}
