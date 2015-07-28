package com.smartions.ioc.bean;

import java.util.HashMap;

import com.smartions.ioc.aop.IAdvice;

public class XmlBean {
	public XmlBean() {
		properyMap.clear();
		properClassMap.clear();
	}

	public String getProperClassMap(String key) {
		return properClassMap.get(key);
	}

	public void setProperClassMap(String properName,String clsPar) {
		this.properClassMap.put(properName, clsPar);
	}

	private String id;
	private String clsName;
	private boolean layzFlag;

	public boolean isLayzFlag() {
		return layzFlag;
	}

	public void setLayzFlag(boolean layzFlag) {
		this.layzFlag = layzFlag;
	}

	private HashMap<String, String> properyMap = new HashMap<String, String>();
	private HashMap<String, String> properClassMap = new HashMap<String, String>();
	private IAdvice advice;

	public HashMap<String, String> getProperyMap() {
		return properyMap;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getClsName() {
		return clsName;
	}

	public void setClsName(String clsName) {
		this.clsName = clsName;
	}

	public void setPropery(String properName, String beanId) {
		properyMap.put(properName, beanId);
	}

	public IAdvice getAdvice() {
		return advice;
	}

	public void setAdvice(IAdvice advice) {
		this.advice = advice;
	}

}
