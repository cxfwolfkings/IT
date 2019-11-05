package com.charles.activity;

import android.app.Activity;
import android.os.Bundle;

/**
 * android:shrinkColumns="3"
 * 第4列被尽量填充;表现出来的效果就是:表格第3列中的长字符串换行
 * @author Charles
 *
 */
public class TableActivity3 extends Activity {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.table3);
    }
}