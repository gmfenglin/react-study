package com.smartions.ioc.aop;

import java.lang.reflect.Method;

import com.smartions.ioc.log.IOCLogger;

public abstract class BaseAdvice implements IAdvice {
	private Object targetObject;
	private Object proxy;

	public Object getProxy() {
		return proxy;
	}

	public void setProxy(Object proxy) {
		this.proxy = proxy;

	}

	public void setTargetObject(Object targetObject) {
		this.targetObject = targetObject;
	}

	@Override
	public synchronized Object invoke(Object proxy, Method method, Object[] args)
			throws Throwable {
		Object result = null;

		try {
			if (method.isAnnotationPresent(DoBefore.class)) {
				doBefore(targetObject, method, args);
			}

			result = method.invoke(targetObject, args);
			if (method.isAnnotationPresent(DoAfter.class)) {
				doAfter(targetObject, method, args);
			}

		} catch (Exception e) {
			if (method.isAnnotationPresent(DoException.class)) {
				doException(targetObject, method, args, e);
			}

		} finally {
			if (method.isAnnotationPresent(DoEnd.class)) {
				doEnd(targetObject, method, args);
			}

		}

		return result;
	}

	protected void doEnd(Object targetObject2, Method method, Object[] args) {
		IOCLogger.log(method.getName() + ":-->end");
	}

	protected void doException(Object targetObject2, Method method,
			Object[] args, Exception e) {
		IOCLogger.log(method.getName() + ":-->exception");
	}

	protected void doAfter(Object targetObject2, Method method, Object[] args) {
		IOCLogger.log(method.getName() + ":-->after");
	}

	protected void doBefore(Object targetObject2, Method method, Object[] args) {
		IOCLogger.log(method.getName() + ":-->before");
	}

}
