package com.charles.activity;

import android.app.Activity;
import android.os.Bundle;
import android.view.ContextMenu;
import android.view.ContextMenu.ContextMenuInfo;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.AdapterView.AdapterContextMenuInfo;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.Gallery;
import android.widget.Toast;

public class MyGalleryDemo extends Activity{

	private Gallery gallery = null;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		super.setContentView(R.layout.gallery);
		this.gallery = (Gallery)findViewById(R.id.myGallery);
		this.gallery.setAdapter(new ImageGalleryAdapter(this));
		gallery.setOnItemClickListener(new OnItemClickListener() {  
            public void onItemClick(AdapterView parent, View v, int position, long id) {  
                Toast.makeText(MyGalleryDemo.this, "" + position, Toast.LENGTH_SHORT).show();  
            }  
        });  
        //注册长按弹出选项的功能
        registerForContextMenu(gallery);  
	}
	
	@Override  
    public void onCreateContextMenu(ContextMenu menu, View v, ContextMenuInfo menuInfo) {  
        menu.add(R.string.gallery_2_text);  
    }  
      
    @Override  
    public boolean onContextItemSelected(MenuItem item) {  
        AdapterContextMenuInfo info = (AdapterContextMenuInfo) item.getMenuInfo();  
        Toast.makeText(this, "Longpress: " + info.position, Toast.LENGTH_SHORT).show();  
        return true;  
    }  
	
}
