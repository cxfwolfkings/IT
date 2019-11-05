package com.charles.activity;

import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Gallery;
import android.widget.ImageView;

public class ImageGalleryAdapter extends BaseAdapter{
	private Context context = null;
	//��������з�����ʾ���ǿ��Ը���ָ������ʾͼƬ������,����ÿ��ͼƬ�Ĵ���
	private int[] imgRes = new int[]{
			R.drawable.android_mldn_01,R.drawable.android_mldn_02,R.drawable.mldn_3g,
			R.drawable.mldn_landscape,R.drawable.mldn_portrait
	};//��Щ����Ҫ��ʾͼƬ����Դ
	
	public ImageGalleryAdapter(Context context){
		this.context = context;
	}
	
	@Override
	public int getCount() {//ȡ��Ҫ��ʾ�����ݵ�����
		// TODO Auto-generated method stub
		return this.imgRes.length;//��Դ������
	}

	@Override
	public Object getItem(int position) {
		// TODO Auto-generated method stub
		return this.imgRes[position];
	}

	@Override
	public long getItemId(int position) {//ȡ�����ID
		// TODO Auto-generated method stub
		return this.imgRes[position];
	}

	//����Դ���õ�һ�����֮��,����������������ImageView
	@Override
	public View getView(int position, View convertView, ViewGroup parent) {
		// TODO Auto-generated method stub
		ImageView img = new ImageView(this.context);
		img.setBackgroundColor(0xFFFFFFFF);
		img.setImageResource(this.imgRes[position]);//��ָ������Դ���õ�ImageView��
		img.setScaleType(ImageView.ScaleType.CENTER);//������ʾ
		img.setLayoutParams(new Gallery.LayoutParams(Gallery.LayoutParams.WRAP_CONTENT,Gallery.LayoutParams.WRAP_CONTENT));
		return img;
	}

}
