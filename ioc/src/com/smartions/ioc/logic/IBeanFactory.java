package com.smartions.ioc.logic;

import java.util.HashMap;

import com.smartions.ioc.aop.IAdvice;
import com.smartions.ioc.bean.XmlBean;

public interface IBeanFactory {
	Object newInstance(String beanId) throws Exception;

	void setRelationPool(HashMap<String, XmlBean> relationPool);


	void setBeanContext(IBeanContext baseBeanContext);

}
