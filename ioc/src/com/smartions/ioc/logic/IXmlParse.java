package com.smartions.ioc.logic;

import java.util.HashMap;

import com.smartions.ioc.bean.XmlBean;

public interface IXmlParse {
	String IOC_FILTER_NAME = ".ioc.xml";
	String ENCODE = "utf-8";
	String MODEL_TAG = "model";
	String ID_TAG = "id";
	String BEAN_TAG = "bean";
	String CLASS_TAG = "class";
	String LAYZ_TAG = "layz";
	String NAME_TAG = "name";
	String VALUE_TAG = "value";
	String REF_TAG = "ref";
	String ADVICE_TAG="advice";

	void setRelationPool(HashMap<String, XmlBean> relationPool);

	void scan(String apkPath) throws Exception;

}
