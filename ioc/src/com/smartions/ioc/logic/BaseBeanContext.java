package com.smartions.ioc.logic;

import java.util.HashMap;
import java.util.Set;

import com.smartions.ioc.bean.XmlBean;
import com.smartions.ioc.log.IOCLogger;

public abstract class BaseBeanContext implements IBeanContext {
	protected HashMap<String, Object> beanPool = new HashMap<String, Object>();
	protected HashMap<String, XmlBean> relationPool = new HashMap<String, XmlBean>();
	private IBeanFactory beanFactory = new BeanFactory();
	private IXmlParse xmlParse;


	private boolean scanFlag;

	public void setXmlParse(IXmlParse xmlParse) {

		xmlParse.setRelationPool(relationPool);
		this.xmlParse = xmlParse;
	}

	protected void init() {
		beanPool.clear();
		relationPool.clear();
		beanFactory.setRelationPool(relationPool);
		beanFactory.setBeanContext(this);

	}

	@Override
	public void scan(String apkPath) {
		if (!scanFlag) {
			init();
			try {
				xmlParse.scan(apkPath);
				createBean();
				IOCLogger.log("beanPool size:" + beanPool.size());
				scanFlag = true;
			} catch (Exception e) {
				scanFlag = false;
				e.printStackTrace();
				IOCLogger.log("exception:" + e.getLocalizedMessage());
			}
		}

	}

	@Override
	public Object getBean(String beanId) {
		if (!beanPool.containsKey(beanId)) {
			try {
				beanPool.put(beanId, beanFactory.newInstance(beanId));
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return beanPool.get(beanId);
	}

	private void createBean() {
		Set<String> keySet = relationPool.keySet();
		for (String key : keySet) {
			if (relationPool.get(key).isLayzFlag()) {
				continue;
			}
			if (beanPool.get(key) != null) {
				continue;
			} else {
				try {
					getBean(key);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}

	}

}
