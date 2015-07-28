package com.example.demo;

import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;

import com.smartions.ioc.logic.BeanContext;
import com.smartions.ioc.logic.IBeanContext;

public class MainActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		final IBeanContext beanContext = BeanContext.getInstance();

		beanContext.scan(this.getApplicationInfo().sourceDir);
		((IRunner) beanContext.getBean("demo_test")).print();
		
	}

}
