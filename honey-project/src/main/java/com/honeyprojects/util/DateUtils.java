package com.honeyprojects.util;

import javax.xml.datatype.XMLGregorianCalendar;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;

public class DateUtils {

	private DateUtils() {

	}

	public static String convertDateXMLToString(XMLGregorianCalendar xmlDate) {
		if (xmlDate == null) {
			return null;
		}

		Date date = xmlDate.toGregorianCalendar().getTime();
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ");
		return df.format(date);
	}

	public static String convertDateToStringByPattern(Date date) {
		SimpleDateFormat datefm = new SimpleDateFormat("yyyy/MM/dd");
		return datefm.format(date);
	}

	public static String convertDateToString(Date date, String pattern) {
		if (date == null) {
			return "";
		}
		SimpleDateFormat datefm = new SimpleDateFormat(pattern);
		return datefm.format(date);
	}

	public static Date truncDate(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		cal.set(Calendar.MILLISECOND, 0);
		return cal.getTime();
	}

	public static Date truncDateMonth(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.DAY_OF_MONTH, 1);
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		cal.set(Calendar.MILLISECOND, 0);
		return cal.getTime();
	}

	public static Date getStartOfDay(Date date) {
		if (date == null) {
			return null;
		}

		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		int year = calendar.get(Calendar.YEAR);
		int month = calendar.get(Calendar.MONTH);
		int day = calendar.get(Calendar.DATE);
		calendar.set(year, month, day, 0, 0, 0);
		return calendar.getTime();
	}

	/**
	 * lay cuoi ngay
	 * 
	 * @param date
	 * @return
	 */
	public static Date getEndOfDay(Date date) {
		if (date == null) {
			return null;
		}

		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		int year = calendar.get(Calendar.YEAR);
		int month = calendar.get(Calendar.MONTH);
		int day = calendar.get(Calendar.DATE);
		calendar.set(year, month, day, 23, 59, 59);
		return calendar.getTime();
	}

	// Thangpn lay ra so ngay giua hai ngay date2 - date1
	@SuppressWarnings("deprecation")
	public static long daysBetween2Dates(Date date1, Date date2) throws Exception {
		try {
			Calendar c1 = Calendar.getInstance(); // new GregorianCalendar();
			Calendar c2 = Calendar.getInstance(); // new GregorianCalendar();
			c1.set(date1.getYear(), date1.getMonth(), date1.getDate());
			c2.set(date2.getYear(), date2.getMonth(), date2.getDate());
			long daysBetween2Dates = (c2.getTime().getTime() - c1.getTime().getTime()) / (24 * 3600 * 1000);
			return daysBetween2Dates;
		} catch (Exception ex) {
			throw ex;
		}
	}

	/**
	 * @param value Date
	 * @return String
	 */
	public static String date2yyyyMMddHHMMssNoSlash(Date value) {
		if (value != null) {
			SimpleDateFormat dateTimeNoSlash = new SimpleDateFormat("ddMMyyyyHHmmss");
			return dateTimeNoSlash.format(value);
		}
		return "";
	}

	public static Date str2dateyyyyMMdd(String value) throws Exception {
		if (value != null) {
			try {
				SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd");
				return formatter.parse(value);
			} catch (Exception ex) {
				throw ex;
			}
		}
		return null;
	}

	public static Date str2dateyyyyMMddHHmmss(String value) throws Exception {
		if (value != null) {
			try {
				SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
				return formatter.parse(value);
			} catch (Exception ex) {
				throw ex;
			}
		}
		return null;
	}

	public static String dateToStringWithPattern(Date date, String pattern) {
		try {
			SimpleDateFormat sdf = new SimpleDateFormat(pattern);
			return sdf.format(date);
		} catch (Exception var4) {
			SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
			return sdf.format(date);
		}
	}

	public static LocalDate convertToLocalDate(Date date) {
		Instant instant = date.toInstant();
		ZoneId zoneId = ZoneId.systemDefault();
		return instant.atZone(zoneId).toLocalDate();
	}
}
