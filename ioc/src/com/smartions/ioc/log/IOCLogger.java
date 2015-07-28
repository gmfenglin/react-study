package com.smartions.ioc.log;

public class IOCLogger {
	private static final boolean DEV = false;
	private static final String VERSION = "1.0";

	public static final void log(String text) {
		if (DEV) {
			System.out.println("IOCLogger--" + VERSION + "-->:" + text);
		}
	}
}
