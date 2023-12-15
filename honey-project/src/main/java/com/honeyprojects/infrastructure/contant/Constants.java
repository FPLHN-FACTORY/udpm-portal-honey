package com.honeyprojects.infrastructure.contant;

public class Constants {

    private Constants(){

    }

    public static final String VERSION = "v1.0.0";

    public static final String ENCODING_UTF8 = "UTF-8";

    public class FileProperties {
        private FileProperties() {
        }

        public static final String PROPERTIES_APPLICATION = "application.properties";
        public static final String PROPERTIES_VALIDATION = "messages.properties";
        public static final String PROPERTIES_CONFIGURATIONS = "configurations.properties";
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
    public static final int MAX_CONTENT_LENGTH = 255; // Điều chỉnh độ dài theo nhu cầu

    public static String TITLE_NOTIFICATION_SYSTEM = "THÔNG BÁO TỪ HỆ THỐNG";

    public static String TITLE_NOTIFICATION_TEACHER = "THÔNG BÁO TỪ GIẢNG VIÊN";

    public static String TITLE_NOTIFICATION_PRESIDENT = "THÔNG BÁO TỪ CHỦ TỊCH XƯỞNG";

    public static String TITLE_NOTIFICATION_PRESIDENT_TO_ADMIN = "Chủ tích xưởng đã gửi một danh sách phê duyệt";

    public static String TITLE_NOTIFICATION_TEACHER_TO_ADMIN = " đã gửi một danh sách phê duyệt";

    public static String CONTENT_NOTIFICATION_SYSTEM = "Hệ thống đã tặng cho bạn: ";

    public static String CONTENT_NOTIFICATION_LAB = "Xưởng thực hành đã tặng bạn: ";

    public static String CONTENT_NOTIFICATION_TEACHER= "Bạn vừa nhận được: ";

    public static String CONTENT_NOTIFICATION_PRESIDENT = "Chủ tịch đã tặng bạn: ";

    public static String CONTENT_NOTIFICATION_MODULE_LAB_REPORT = "Xưởng dự án đã tặng bạn: ";

    // Đặt một constant cho cỡ cột
    public static final int COLUMN_WIDTH = 25 * 256;

    public static final class MODULE {
        public static final String MODULE_LAB_REPORT_APP = "bên xưởng dự án đã gửi 1 danh sách phê duyệt";
        public static final String MODULE_EVENT = "Sự kiện đã gửi 1 danh sách phê duyệt";

    }

}
