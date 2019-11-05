package com.charles.activity;

import android.app.Activity;
import android.os.Bundle;

/**
 * 相对布局管理器
 * @author Charles
 *
 */
public class RelativeActivity1 extends Activity {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.first);
    }
}