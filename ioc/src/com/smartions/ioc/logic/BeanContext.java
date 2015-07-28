package com.smartions.ioc.logic;


public final class BeanContext extends BaseBeanContext {
	private BeanContext() {
	}

	private static final class Instance {
		private static final IBeanContext instance = new BeanContext();
	}

	public static final IBeanContext getInstance() {
		return Instance.instance;
	}

	@Override
	protected void init() {

		super.init();
		this.setXmlParse(new XmlParser());
	}
}
