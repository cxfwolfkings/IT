package com.charles.activity;

import android.app.Activity;
import android.content.pm.ActivityInfo;
import android.content.res.Configuration;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.ImageView;

/**
 * �ı���Ļ����
 * @author Charles
 * 
 */
public class ClickActivity3 extends Activity {
	private Button change = null;
	private ImageView img = null;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.setContentView(R.layout.click4);
		this.change = (Button) super.findViewById(R.id.change); // ȡ�ð�ť
		this.img = (ImageView) super.findViewById(R.id.img); // ȡ��ͼƬ
		this.change.setOnClickListener(new MyOnClickListenerImpl()); // ���ü�������
	}

	private class MyOnClickListenerImpl implements OnClickListener { // �����¼�
		public void onClick(View v) {
			if (ClickActivity3.this.getRequestedOrientation() == ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED) {// �޷����л������ת
				ClickActivity3.this.change.setText("�����޷��ı���Ļ����");
			} else {
				if (ClickActivity3.this.getRequestedOrientation() == ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE) { // ���ڵķ����Ǻ�����ʾ
					ClickActivity3.this
							.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT); // ��Ϊ������ʾ
				} else if (ClickActivity3.this.getRequestedOrientation() == ActivityInfo.SCREEN_ORIENTATION_PORTRAIT) { // ���Ϊ������ʾ
					ClickActivity3.this
							.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE); // ��Ϊ������ʾ
				}
			}
		}
	}

	@Override
	public void onConfigurationChanged(Configuration newConfig) { // ��ʾ����ϵͳ�����޸ĵ�ʱ�򴥷�
		if (newConfig.orientation == Configuration.ORIENTATION_LANDSCAPE) { // ���ڵ���Ļ�����Ǻ���
			ClickActivity3.this.change.setText("�ı���Ļ����Ϊ������ʾ����ǰΪ������ʾ��");
			ClickActivity3.this.img.setImageResource(R.drawable.mldn_landscape);// ��ʾ����ͼƬ
		} else if (newConfig.orientation == Configuration.ORIENTATION_PORTRAIT) { // ��������
			ClickActivity3.this.change.setText("�ı���Ļ����Ϊ������ʾ����ǰΪ������ʾ��");
			ClickActivity3.this.img.setImageResource(R.drawable.mldn_portrait);// ��ʾ����ͼƬ
		}
		super.onConfigurationChanged(newConfig);
	}

}