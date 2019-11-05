package com.charles.activity;

import org.apache.cordova.DroidGap;

import android.app.DatePickerDialog;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.ActionMode;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.LinearLayout;
import android.widget.Toast;

public class FirstActivity extends DroidGap {

	/** Called when the activity is first created. */
	private Button showDatePickerButton = null;
	// 该常量用于标识DatePickerDialog
	// private static final int DATE_PICKER_ID = 1;
	private DatePickerDialog datePickerDialog;

	ActionMode mActionMode;
	LinearLayout mylayout;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.first);
		//super.loadUrl("file:///android_asset/www/index.html");
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.context_menu, menu);
		showDatePickerButton = (Button) findViewById(R.id.showDatePickerButton);
		showDatePickerButton.setOnClickListener(new ButtonListener());
		datePickerDialog = new DatePickerDialog(this, onDateSetListener, 2010, 11, 25);
		mylayout = (LinearLayout) findViewById(R.id.mylayout);

		mylayout.setOnLongClickListener(new View.OnLongClickListener() {
			// Called when the user long-clicks on someView
			public boolean onLongClick(View view) {
				if (mActionMode != null) {
					return false;
				}
				// Start the CAB using the ActionMode.Callback defined above
				mActionMode = startActionMode(mActionModeCallback);
				view.setSelected(true);
				return true;
			}
		});
		return true;
	}

	private class ButtonListener implements OnClickListener {
		@Override
		public void onClick(View v) {
			// 此方法用于显示DatePickerDialog
			// showDialog(DATE_PICKER_ID);//这个方法已经过时
			datePickerDialog.show();
		}
	}

	// 监听器，用户监听用户点下DatePikerDialog的set按钮时，所设置的年月日
	DatePickerDialog.OnDateSetListener onDateSetListener = new DatePickerDialog.OnDateSetListener() {
		@Override
		public void onDateSet(DatePicker view, int year, int monthOfYear, int dayOfMonth) {
			System.out.println(year + "-" + monthOfYear + "-" + dayOfMonth);
		}
	};

	private ActionMode.Callback mActionModeCallback = new ActionMode.Callback() {
		// Called when the action mode is created; startActionMode() was called
		@Override
		public boolean onCreateActionMode(ActionMode mode, Menu menu) {
			// Inflate a menu resource providing context menu items
			MenuInflater inflater = mode.getMenuInflater();
			inflater.inflate(R.menu.context_menu, menu);
			return true;
		}

		// Called each time the action mode is shown. Always called after
		// onCreateActionMode, but
		// may be called multiple times if the mode is invalidated.
		@Override
		public boolean onPrepareActionMode(ActionMode mode, Menu menu) {
			return false; // Return false if nothing is done
		}

		// Called when the user selects a contextual menu item
		@Override
		public boolean onActionItemClicked(ActionMode mode, MenuItem item) {
			switch (item.getItemId()) {
			case R.id.next:
				Toast.makeText(getApplicationContext(), "Next", Toast.LENGTH_SHORT).show();
				changeActivity(FirstActivity.this, SecondActivity.class);
				break;
			case R.id.prev:
				Toast.makeText(getApplicationContext(), "Prev", Toast.LENGTH_SHORT).show();
				changeActivity(FirstActivity.this, ThirdActivity.class);
				break;
			case R.id.exit:
				Toast.makeText(getApplicationContext(), "Exit", Toast.LENGTH_SHORT).show();
				break;
			default:
				return false;
			}
			mode.finish(); // Action picked, so close the CAB
			return true;
		}

		// Called when the user exits the action mode
		@Override
		public void onDestroyActionMode(ActionMode mode) {
			mActionMode = null;
		}
	};

	public void changeActivity(Context packageContext, Class<?> className) {
		Intent intent = new Intent(packageContext, className);
		startActivity(intent);
	}

}
