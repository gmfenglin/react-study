package com.smartions.ioc.aop;

import java.lang.reflect.InvocationHandler;

public interface IAdvice extends InvocationHandler {
	void setTargetObject(Object targetObject);

	void setProxy(Object proxy);
	 Object getProxy() ;
}
