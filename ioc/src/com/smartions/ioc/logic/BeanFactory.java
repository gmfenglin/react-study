package com.smartions.ioc.logic;

import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.HashMap;
import java.util.Map.Entry;
import java.util.Set;

import com.smartions.ioc.aop.IAdvice;
import com.smartions.ioc.bean.XmlBean;
import com.smartions.ioc.log.IOCLogger;

public class BeanFactory implements IBeanFactory {
	private HashMap<String, XmlBean> relationPool;
	private IBeanContext baseBeanContext;

	@Override
	public Object newInstance(String beanId) throws Exception {

		XmlBean xmlBean = relationPool.get(beanId);
		Class cls = Class.forName(xmlBean.getClsName());

		IOCLogger.log("class:" + xmlBean.getClsName());

		Object service = cls.newInstance();

		HashMap<String, String> properyMap = xmlBean.getProperyMap();
		Set<Entry<String, String>> properySet = properyMap.entrySet();
		for (Entry<String, String> entry : properySet) {

			String methodName = "set";
			String properName = entry.getKey();

			methodName += properName.substring(0, 1).toUpperCase()
					+ properName.substring(1, properName.length());
			IOCLogger.log("method:" + methodName);
			IOCLogger.log("properName:" + properName);
			IOCLogger.log("par type:" + xmlBean.getProperClassMap(properName));
			Method method = service.getClass().getMethod(
					methodName,
					new Class[] { Class.forName(xmlBean
							.getProperClassMap(properName)) });
			Object ot = baseBeanContext.getBean(entry.getValue());
			method.invoke(service, ot);

		}
		if (xmlBean.getAdvice() != null) {
			xmlBean.getAdvice().setTargetObject(service);
			return Proxy.newProxyInstance(service.getClass().getClassLoader(),
					service.getClass().getInterfaces(), xmlBean.getAdvice());
		}
		return service;
	}

	@Override
	public void setRelationPool(HashMap<String, XmlBean> relationPool) {
		this.relationPool = relationPool;
	}

	@Override
	public void setBeanContext(IBeanContext baseBeanContext) {
		this.baseBeanContext = baseBeanContext;

	}

}
