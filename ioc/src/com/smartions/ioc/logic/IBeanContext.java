package com.smartions.ioc.logic;

public interface IBeanContext {

	void scan(String apkPath);

	Object getBean(String beanId) ;
}
