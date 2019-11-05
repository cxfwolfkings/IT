package com.charles.activity;

import android.app.Activity;
import android.os.Bundle;

/**
 * 配置文件创建框架布局
 * @author Charles
 *
 */
public class FrameLayout1 extends Activity {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.frame);
    }
}