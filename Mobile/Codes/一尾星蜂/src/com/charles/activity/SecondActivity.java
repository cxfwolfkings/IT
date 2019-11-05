package com.charles.activity;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.ActionMode;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.LinearLayout;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Toast;

/**
 * 链接
 * 
 * @author Charles
 *
 */
public class SecondActivity extends Activity {

	ActionMode mActionMode;
	LinearLayout secondLay;
	/** Called when the activity is first created. */
	// 对控件对象进行声明
	private RadioGroup genderGroup = null;
	private RadioButton femaleButton = null;
	private RadioButton maleButton = null;
	private CheckBox swimBox = null;
	private CheckBox runBox = null;
	private CheckBox readBox = null;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.second);

		// 通过控件的ID来得到代表控件的对象
		genderGroup = (RadioGroup) findViewById(R.id.genderGroup);
		femaleButton = (RadioButton) findViewById(R.id.femaleButton);
		maleButton = (RadioButton) findViewById(R.id.maleButton);
		swimBox = (CheckBox) findViewById(R.id.swim);
		runBox = (CheckBox) findViewById(R.id.run);
		readBox = (CheckBox) findViewById(R.id.read);

		// 为RadioGroup设置监听器，需要注意的是，这里的监听器和Button控件的监听器有所不同
		genderGroup.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
			@Override
			public void onCheckedChanged(RadioGroup group, int checkedId) {
				// TODO Auto-generated method stub
				if (femaleButton.getId() == checkedId) {
					System.out.println("famale");
					Toast.makeText(SecondActivity.this, "famle", Toast.LENGTH_SHORT).show();
				} else if (maleButton.getId() == checkedId) {
					System.out.println("male");
				}
			}
		});

		// 为多选按钮添加监听器
		swimBox.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
			@Override
			public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
				// TODO Auto-generated method stub
				if (isChecked) {
					System.out.println("swim is checked");
				} else {
					System.out.println("swim is unchecked");
				}
			}
		});

		runBox.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
			@Override
			public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
				// TODO Auto-generated method stub
				if (isChecked) {
					System.out.println("run is checked");
				} else {
					System.out.println("run is unchecked");
				}
			}
		});

		readBox.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
			@Override
			public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
				// TODO Auto-generated method stub
				if (isChecked) {
					System.out.println("read is checked");
				} else {
					System.out.println("read is unchecked");
				}
			}
		});
	}

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
				changeActivity(SecondActivity.this, ThirdActivity.class);
				break;
			case R.id.prev:
				Toast.makeText(getApplicationContext(), "Prev", Toast.LENGTH_SHORT).show();
				changeActivity(SecondActivity.this, FirstActivity.class);
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