package com.smartions.ioc.logic;

import java.io.File;
import java.io.InputStream;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import org.xmlpull.v1.XmlPullParser;
import org.xmlpull.v1.XmlPullParserException;

import android.util.Xml;

import com.smartions.ioc.aop.IAdvice;
import com.smartions.ioc.bean.XmlBean;
import com.smartions.ioc.log.IOCLogger;

public class XmlParser implements IXmlParse {
	private HashMap<String, XmlBean> relationPool;

	@Override
	public void setRelationPool(HashMap<String, XmlBean> relationPool) {
		this.relationPool = relationPool;
	}

	private String lastModel = "";
	private String lastBeanId;

	@Override
	public void scan(String apkPath) throws Exception {
		ZipFile zipFile = null;
		InputStream is = null;
		zipFile = new ZipFile(new File(apkPath));
		Enumeration<ZipEntry> en = (Enumeration<ZipEntry>) zipFile.entries();
		while (en.hasMoreElements()) {
			ZipEntry entry = en.nextElement();
			if (!entry.isDirectory()) {
				if (entry.getName().indexOf(IOC_FILTER_NAME) != -1) {
					IOCLogger.log("fileName:" + entry.getName());
					is = zipFile.getInputStream(entry);
					parseXml(is);
					is.close();
				}

			}
		}
	}

	protected void parseXml(InputStream is) throws Exception {

		XmlPullParser l_xml_parser = Xml.newPullParser();
		l_xml_parser.setInput(is, ENCODE);
		int l_int_eventType = l_xml_parser.getEventType();
		while (l_int_eventType != XmlPullParser.END_DOCUMENT) {

			switch (l_int_eventType) {
			case XmlPullParser.START_DOCUMENT:
				break;
			case XmlPullParser.START_TAG:
				String l_str_nodeName = l_xml_parser.getName();
				saveRelation(l_str_nodeName, l_xml_parser);
				break;
			case XmlPullParser.END_TAG:
				break;
			default:
				break;
			}
			l_int_eventType = l_xml_parser.next();
		}

	}

	protected void saveRelation(String l_str_nodeName,
			XmlPullParser l_xml_parser) throws Exception {
		if (MODEL_TAG.equals(l_str_nodeName)) {
			lastModel = l_xml_parser.getAttributeValue(null, ID_TAG) + "_";
		}
		if (BEAN_TAG.equals(l_str_nodeName)) {
			lastBeanId = lastModel
					+ l_xml_parser.getAttributeValue(null, ID_TAG);
			XmlBean xmlBean = new XmlBean();
			xmlBean.setId(lastBeanId);
			xmlBean.setLayzFlag(Boolean.parseBoolean(l_xml_parser
					.getAttributeValue(null, LAYZ_TAG)));
			xmlBean.setClsName(l_xml_parser.getAttributeValue(null, CLASS_TAG));
			relationPool.put(lastBeanId, xmlBean);
		}
		if (REF_TAG.equals(l_str_nodeName)) {
			relationPool.get(lastBeanId).setPropery(
					l_xml_parser.getAttributeValue(null, NAME_TAG),
					l_xml_parser.getAttributeValue(null, VALUE_TAG));
			relationPool.get(lastBeanId).setProperClassMap(
					l_xml_parser.getAttributeValue(null, NAME_TAG),
					l_xml_parser.getAttributeValue(null, CLASS_TAG));
			IOCLogger.log("proper1Name:" + l_xml_parser.getAttributeValue(null, NAME_TAG));
			IOCLogger.log("properclsName:" + l_xml_parser.getAttributeValue(null, CLASS_TAG));
		}
		if (ADVICE_TAG.equals(l_str_nodeName)) {
			relationPool.get(lastBeanId).setAdvice(

					(IAdvice) Class.forName(
							l_xml_parser.getAttributeValue(null, VALUE_TAG))
							.newInstance());
		}
	}

}
