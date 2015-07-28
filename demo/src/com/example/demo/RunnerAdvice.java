package com.example.demo;

import java.lang.reflect.Method;

import com.smartions.ioc.aop.BaseAdvice;

public class RunnerAdvice extends BaseAdvice {

	@Override
	protected void doAfter(Object targetObject2, Method method, Object[] args) {
		super.doAfter(targetObject2, method, args);
		System.out.println("after");
	}

	@Override
	protected void doBefore(Object targetObject2, Method method, Object[] args) {
		super.doBefore(targetObject2, method, args);
		System.out.println("before");
	}

	@Override
	protected void doEnd(Object targetObject2, Method method, Object[] args) {
		super.doEnd(targetObject2, method, args);
		System.out.println("end");
	}

	@Override
	protected void doException(Object targetObject2, Method method,
			Object[] args, Exception e) {
		super.doException(targetObject2, method, args, e);
		System.out.println("exception");
	}

}
