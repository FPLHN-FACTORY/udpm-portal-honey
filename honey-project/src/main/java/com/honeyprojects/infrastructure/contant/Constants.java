package com.honeyprojects.infrastructure.contant;

public class Constants {

    private Constants(){

    }

    public static final String VERSION = "v1.0.0";

    public static final String ENCODING_UTF8 = "UTF-8";

    public class FileProperties{
        private FileProperties(){

        }

        public static final String PROPERTIES_APPLICATION = "application.properties";
        public static final String PROPERTIES_VALIDATION = "messages.properties";
    }

    public static final String REGEX_EMAIL_FE = "\\w+@fe.edu.vn";

    public static final String REGEX_EMAIL_FPT  = "\\w+@fpt.edu.vn";

    public static final class TYPE_HONEY_HISTORY {
        public static final String GIFT_HISTORY = "GIFT";
        public static final String APPROVED_HISTORY = "APPROVED";
    }
    public static String TOKEN = "token";

    public static final class SEQUENCE {
        public static final String CATEGORY_SEQ = "category_seq";
    }
}
