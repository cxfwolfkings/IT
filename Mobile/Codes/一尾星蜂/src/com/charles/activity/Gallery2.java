package com.charles.activity;

import android.app.Activity;
import android.database.Cursor;
import android.os.Bundle;
import android.provider.Contacts.People;
import android.widget.Gallery;
import android.widget.SimpleCursorAdapter;
import android.widget.SpinnerAdapter;

public class Gallery2 extends Activity{
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.gallery);
		// Get a cursor with all people
		Cursor c = getContentResolver().query(People.CONTENT_URI, null, null,null, null);
		startManagingCursor(c);
		SpinnerAdapter adapter = new SimpleCursorAdapter(this,
				// Use a template that displays a text view
				android.R.layout.simple_gallery_item,
				// Give the cursor to the list adatper
				c,
				// Map the NAME column in the people database to...
				new String[] { People.NAME },
				// The "text1" view defined in the XML template
				new int[] { android.R.id.text1 });
		Gallery g = (Gallery) findViewById(R.id.myGallery);
		g.setAdapter(adapter);
	}
}
