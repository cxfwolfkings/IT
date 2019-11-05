package com.charles.activity;

import android.app.Activity;
import android.os.Bundle;
import android.widget.RatingBar;

public class RatingBarActivity extends Activity {
    /** Called when the activity is first created. */
	private RatingBar ratingBar = null;
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.ratingbar);
        ratingBar = (RatingBar)findViewById(R.id.ratingbarId);
        ratingBar.setOnRatingBarChangeListener(new RatingBarListener());
    }
    
    private class RatingBarListener implements RatingBar.OnRatingBarChangeListener{
		@Override
		public void onRatingChanged(RatingBar ratingBar, float rating, boolean fromUser) {
			System.out.println("rating--->" + rating);
		}
    }
}