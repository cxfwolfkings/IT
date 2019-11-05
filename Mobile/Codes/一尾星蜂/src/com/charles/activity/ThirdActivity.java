package com.charles.activity;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.ActionMode;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.Toast;

/**
 * ÑùÊ½±í
 * @author Charles
 *
 */
public class ThirdActivity extends Activity {
	
	ActionMode mActionMode;
	LinearLayout thirdLay;
	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.third);
		thirdLay = (LinearLayout)findViewById(R.id.thirdLay);
		
		thirdLay.setOnLongClickListener(new View.OnLongClickListener() {
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

	    // Called each time the action mode is shown. Always called after onCreateActionMode, but
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
	            	changeActivity(ThirdActivity.this, FirstActivity.class);
	            	break;
	            case R.id.prev:
	            	Toast.makeText(getApplicationContext(), "Prev", Toast.LENGTH_SHORT).show();
	            	changeActivity(ThirdActivity.this, SecondActivity.class);
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
	
	public void changeActivity(Context packageContext, Class<?> className){
		Intent intent = new Intent(packageContext, className);
		startActivity(intent);
	}
}