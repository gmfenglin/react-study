package com.example.demo;

import com.smartions.ioc.aop.DoAfter;
import com.smartions.ioc.aop.DoBefore;
import com.smartions.ioc.aop.DoEnd;

public interface IComputer {
	@DoBefore
	@DoAfter
	@DoEnd
	void sys();
}
