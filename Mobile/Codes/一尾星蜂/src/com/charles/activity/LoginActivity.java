package com.charles.activity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.text.method.HideReturnsTransformationMethod;
import android.text.method.PasswordTransformationMethod;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.CompoundButton.OnCheckedChangeListener;
import android.widget.EditText;
import android.widget.Toast;

public class LoginActivity extends Activity {

	private Button btnLogin;
	private Button btnBack;
	private CheckBox checkShowPwd;
	private EditText txtPassword;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.setContentView(R.layout.activity_login);

		btnLogin = (Button) findViewById(R.id.btnLogin);
		btnBack = (Button) findViewById(R.id.btnBack);
		checkShowPwd = (CheckBox) findViewById(R.id.checkShowPwd);
		btnLogin.setOnClickListener(new ButtonListener(1));
		btnBack.setOnClickListener(new ButtonListener(0));
		checkShowPwd.setOnCheckedChangeListener(new CheckBoxListener());
		txtPassword = (EditText) findViewById(R.id.txtPassword);
	}

	private class CheckBoxListener implements OnCheckedChangeListener {
		@Override
		public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
			// TODO Auto-generated method stub
			if (isChecked) { // 明文显示
				txtPassword.setTransformationMethod(new HideReturnsTransformationMethod());
			} else { // 密文显示
				txtPassword.setTransformationMethod(new PasswordTransformationMethod());
			}
		}
	}

	private class ButtonListener implements OnClickListener {
		private int btnType;

		public ButtonListener(int btnType) {
			this.btnType = btnType;
		}

		@Override
		public void onClick(View v) {
			switch (btnType) {
			case 0:
				startActivity(new Intent(LoginActivity.this, IndexActivity.class));
				break;
			case 1:
				Toast.makeText(getApplicationContext(), "Success", Toast.LENGTH_SHORT).show();
				break;
			}
		}
	}
}