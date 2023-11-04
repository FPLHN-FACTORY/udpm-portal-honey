package com.honeyprojects.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.apache.commons.compress.utils.Lists;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

public class DataUtils {
    private static final Logger log = LoggerFactory.getLogger(DataUtils.class);

    public static String getFirstDayOfMonth() {
        LocalDate currDate = LocalDate.now();
        return currDate.withDayOfMonth(1).toString();
    }

    public static Long parseToLong(Object value) {
        return parseToLong(value, null);
    }

    public static Long parseToLong(Object value, Long defaultVal) {
        try {
            if (value == null) {
                return defaultVal;
            }
            String str = parseToString(value);
            if (nullOrEmpty(str)) {
                return defaultVal;
            }
            return Long.parseLong(str);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return defaultVal;
        }
    }

    public static String parseToString(Object value) {
        return parseToString(value, "");
    }

    public static boolean nullOrEmpty(String value) {
        return value == null || "".equalsIgnoreCase(value);
    }

    public static String parseToString(Object value, String defaultVal) {
        try {
            if (value == null) {
                return defaultVal;
            }
            return String.valueOf(value);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return defaultVal;
        }
    }

    public static boolean isNullOrEmpty(CharSequence cs) {
        return nullOrEmpty(cs);
    }

    public static boolean isNullOrEmpty(Object[] collection) {
        return collection == null || collection.length == 0;
    }

    public static boolean isNullOrEmpty(final Collection<?> collection) {
        return collection == null || collection.isEmpty();
    }

    public static boolean nullOrEmpty(CharSequence cs) {
        int strLen;
        if (cs == null || (strLen = cs.length()) == 0) {
            return true;
        }
        for (int i = 0; i < strLen; i++) {
            if (!Character.isWhitespace(cs.charAt(i))) {
                return false;
            }
        }
        return true;
    }

    public static BigDecimal safeToBigDecimal(Object obj1) {
        BigDecimal result = BigDecimal.ZERO;
        if (obj1 == null) {
            return result;
        }
        try {
            result = new BigDecimal(obj1.toString());
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
        }

        return result;
    }

    /**
     * safeToInt
     *
     * @param obj1
     * @param defaultValue
     * @return int
     */
    public static int safeToInt(Object obj1, int defaultValue) {
        int result = defaultValue;
        if (obj1 != null) {
            try {
                result = Integer.parseInt(obj1.toString());
            } catch (Exception ex) {
                log.error(ex.getMessage(), ex);
            }
        }

        return result;
    }

    /**
     * safeToInt
     *
     * @param obj1 Object
     * @return int
     */
    public static int safeToInt(Object obj1) {
        return safeToInt(obj1, 0);
    }

    public static boolean safeEqual(Object obj1, Object obj2) {
        return ((obj1 != null) && (obj2 != null) && obj2.toString().equals(obj1.toString()));
    }

    public static BigDecimal sum(BigDecimal var1, BigDecimal var2) {
        return var1.add(var2);
    }

    public static BigDecimal sum(double var1, double var2) {
        return sum(toBigDecimal(var1), toBigDecimal(var2));
    }

    public static BigDecimal minus(BigDecimal var1, BigDecimal var2) {
        return var1.subtract(var2);
    }

    public static BigDecimal minus(double var1, double var2) {
        return minus(toBigDecimal(var1), toBigDecimal(var2));
    }

    public static BigDecimal mul(BigDecimal var1, BigDecimal var2) {
        return var1.multiply(var2);
    }

    public static BigDecimal mul(double var1, double var2) {
        return mul(toBigDecimal(var1), toBigDecimal(var2));
    }

    public static BigDecimal div(BigDecimal var1, BigDecimal var2) {
        return var1.divide(var2);
    }

    public static BigDecimal div(double var1, double var2) {
        return div(toBigDecimal(var1), toBigDecimal(var2));
    }

    public static int compare(BigDecimal var1, BigDecimal var2) {
        return var1.compareTo(var2);
    }

    public static int compare(Double var1, Double var2) {
        if (var1 == null || var2 == null)
            return -1;
        return compare(BigDecimal.valueOf(var1), BigDecimal.valueOf(var2));
    }

    public static int compare(Float var1, Float var2) {
        if (var1 == null || var2 == null)
            return -1;
        return compare(new BigDecimal(var1.toString()), new BigDecimal(var2.toString()));
    }

    public static int compare(Float var1, Double var2) {
        if (var1 == null || var2 == null)
            return -1;
        return compare(new BigDecimal(var1.toString()), new BigDecimal(var2.toString()));
    }

    public static int compare(Double var1, Float var2) {
        if (var1 == null || var2 == null)
            return -1;
        return compare(new BigDecimal(var1.toString()), new BigDecimal(var2.toString()));
    }

    public static BigDecimal toBigDecimal(double var1) {
        return BigDecimal.valueOf(var1);
    }

    public static BigDecimal trailingZeros(BigDecimal var1) {
        return var1.stripTrailingZeros();
    }

    public static String trailingZeros(String amount) {
        return trailingZeros(new BigDecimal(amount)).toPlainString();
    }

    public static String getFormatMoney(String money, String format, char decimalSeparator, char groupingSeparator) {
        try {
            money = trailingZeros(money);
            DecimalFormatSymbols symbols = new DecimalFormatSymbols();
            symbols.setDecimalSeparator(decimalSeparator);
            symbols.setGroupingSeparator(groupingSeparator);
            DecimalFormat decimalFormat = new DecimalFormat(format, symbols);
            BigDecimal bigDecimal = new BigDecimal(money);
            return decimalFormat.format(bigDecimal.doubleValue());
        } catch (NumberFormatException ex) {
            log.error(ex.getMessage(), ex);
        }
        return "";
    }

    public static final String MONEY_FORMAT_DEFAULT = "###,###.###";

    public static String getFormatMoney(String money, String format) {
        return getFormatMoney(money, format, '.', ',');
    }

    public static String getFormatMoney(String money) {
        return getFormatMoney(money, MONEY_FORMAT_DEFAULT);
    }

    private static final int ROUND_DEFAULT = 3;

    public static BigDecimal round(BigDecimal var1, int i, RoundingMode mode) {
        return var1.setScale(i, mode);
    }

    public static BigDecimal roundCeil(BigDecimal var1, int i) {
        return round(var1, i, RoundingMode.CEILING);
    }

    public static BigDecimal roundCeil(BigDecimal var1) {
        return roundCeil(var1, ROUND_DEFAULT);
    }

    public static BigDecimal roundFloor(BigDecimal var1, int i) {
        return round(var1, i, RoundingMode.FLOOR);
    }

    public static BigDecimal roundFloor(BigDecimal var1) {
        return roundFloor(var1, ROUND_DEFAULT);
    }

    public static BigDecimal roundAuto(BigDecimal var1, int i) {
        return round(var1, i, RoundingMode.HALF_UP);
    }

    public static BigDecimal roundAuto(BigDecimal var1) {
        return roundAuto(var1, ROUND_DEFAULT);
    }

    public static boolean isFullZeroAlterDot(BigDecimal var1) {
        return compare(var1.doubleValue(), var1.toBigInteger().doubleValue()) == 0;
    }

    /**
     * @param var1 : input is BigDecimal
     * @return remove all zero alter dot 0.1200 -> 0.12, and alter remove all dot
     *         012 -> 12
     */
    public static BigInteger removeDot(BigDecimal var1) {
        return trailingZeros(var1).unscaledValue();
    }

    /**
     * @param var1 : input is BigDecimal
     * @param i    : 10^i
     * @return value = var1 * 10^i;
     */
    public static BigDecimal mul10(BigDecimal var1, int i) {
        return var1.movePointRight(i);
    }

    /**
     * @param var1 : input is BigDecimal
     * @param i    : 10^i
     * @return value = var1 / 10^i;
     */
    public static BigDecimal div10(BigDecimal var1, int i) {
        return var1.movePointLeft(i);
    }

    public static Integer parseToInt(String value, Integer defaultVal) {
        try {
            return Integer.parseInt(value);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return defaultVal;
        }
    }

    public static Integer parseToInt(String value) {
        return parseToInt(value, null);
    }

    public static Integer parseToInt(Object value) {
        return parseToInt(parseToString(value), null);
    }

    public static Date convertStringToDate(String date, String pattern) {
        try {
            if (date == null || "".equals(date.trim())) {
                return null;
            }
            SimpleDateFormat dateFormat = new SimpleDateFormat(pattern);
            return dateFormat.parse(date);
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            return null;
        }
    }

    public static final String DATETIME_FORMAT = "yyyy-MM-dd HH:mm:ss";

    public static String convertLocalDatetimeToString(LocalDateTime localDateTime, String pattern) {
        if (localDateTime == null) {
            return null;
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
        return localDateTime.format(formatter);
    }

    public static String convertLocalDatetimeToString(LocalDateTime localDateTime) {
        return convertLocalDatetimeToString(localDateTime, DATETIME_FORMAT);
    }

    public static <T> Optional<T> jsonToObject(String json, Class<T> classOutput) {
        ObjectMapper mapper = new ObjectMapper();
        if (json == null || json.isEmpty()) {
            return Optional.empty();
        }
        try {
            T t = mapper.readValue(json, classOutput);
            return Optional.of(t);
        } catch (IOException e) {
            log.error(e.getMessage(), e);
            return Optional.empty();
        }
    }

//    public static <T> T jsonToObject(String json, Class<T> classOutput) {
//        ObjectMapper mapper = new ObjectMapper();
//        if (json == null || json.isEmpty()) {
//            return null;
//        }
//        try {
//            return mapper.readValue(json, classOutput);
//        } catch (IOException e) {
//            log.error(e.getMessage(), e);
//            return null;
//        }
//    }

    public static <T> T jsonToObject(File file, Class<T> classOutput) {
        ObjectMapper mapper = new ObjectMapper();
        if (file == null || !file.exists()) {
            return null;
        }
        try {
            return mapper.readValue(file, classOutput);
        } catch (IOException e) {
            log.error(e.getMessage(), e);
            return null;
        }
    }

    public static Double parseToDouble(Object value) {
        return parseToDouble(value, null);
    }

    public static Double parseToDouble(Object value, Double defaultVal) {
        try {
            if (value == null) {
                return defaultVal;
            }
            String str = parseToString(value);
            if (nullOrEmpty(str)) {
                return defaultVal;
            }
            return Double.parseDouble(str);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return defaultVal;
        }
    }

    public static boolean isYml(String pathFile) {
        return pathFile.endsWith(".yml") || pathFile.endsWith(".yaml");
    }

    public static int getNum(long count, long offset) {
        return (int) Math.ceil((double) count / offset);
    }

    public static <T> String objToJson(T obj) {
        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        try {
            String json = ow.writeValueAsString(obj);
            return json;
        } catch (JsonProcessingException e) {
            log.error(e.getMessage(), e);
            return null;
        }
    }

    public static boolean isMobile(String isdn) {
        return isdn.matches("[0-9]+");
    }

    public static void sleep(long second) {
        try {
            TimeUnit.SECONDS.sleep(second);
        } catch (InterruptedException e) {
            log.error(e.getMessage(), e);
            Thread.currentThread().interrupt();
        }
    }

    /**
     * @param obj1 Object
     * @return String
     */
    public static String safeToString(Object obj1, String defaultValue) {
        if (obj1 == null) {
            return defaultValue;
        }

        return obj1.toString();
    }

    /**
     * @param obj1 Object
     * @return String
     */
    public static String safeToString(Object obj1) {
        return safeToString(obj1, "");
    }

    public static Long safeToLong(Object obj1, Long defaultValue) {
        Long result = defaultValue;
        if (obj1 != null) {
            if (obj1 instanceof BigDecimal) {
                return ((BigDecimal) obj1).longValue();
            }
            if (obj1 instanceof BigInteger) {
                return ((BigInteger) obj1).longValue();
            }
            try {
                result = Long.parseLong(obj1.toString());
            } catch (Exception ignored) {
            }
        }

        return result;
    }

    /**
     * @param obj1 Object
     * @return Long
     */
    public static Long safeToLong(Object obj1) {
        return safeToLong(obj1, 0L);
    }

    public static Date longToDate(Object obj1) {
        Long value = safeToLong(obj1);
        if (value == 0l) {
            return null;
        }

        return new Date(value);
    }

    @SuppressWarnings("rawtypes")
    public static boolean isNullObject(Object obj1) {
        if (obj1 == null) {
            return true;
        }
        if (obj1 instanceof String) {
            return isNullOrEmpty(obj1.toString());
        }
        if (obj1 instanceof List) {
            return ((List) obj1).isEmpty();
        }
        return false;
    }

    public static Double safeToDouble(Object obj1, Double defaultValue) {
        Double result = defaultValue;
        if (obj1 != null) {
            try {
                result = Double.parseDouble(obj1.toString());
            } catch (Exception e) {
                log.error(e.getMessage(), e);
            }
        }

        return result;
    }

    public static Double safeToDouble(Object obj1) {
        return safeToDouble(obj1, 0.0);
    }

    public static boolean isNumber(String string) {
        return !isNullOrEmpty((CharSequence) string) && string.trim().matches("^\\d+$");
    }

    public static String validPath(String strPath) {
        if (!strPath.endsWith("/")) {
            strPath = strPath + "/";
        }

        return strPath;
    }

}