package com.honeyprojects.infrastructure.contant;

import com.honeyprojects.util.PropertiesReader;

public enum Message {

    SUCCESS("Success"),


// viết các lỗi ở đây
    MA_NGUOI_NHAN_KHONG_HOP_LE("Người giao dịch không hợp lệ"),

    HONEY_NOT_EXIST(PropertiesReader.getProperty(PropertyKeys.HONEY_NOT_EXIST)),

    VERIFICATION_NOT_EXIST(PropertiesReader.getProperty(PropertyKeys.VERIFICATION_NOT_EXIST)),
    HISTORY_NOT_EXIST(PropertiesReader.getProperty(PropertyKeys.VERIFICATION_NOT_EXIST)),
    ARCHIVE_GIFT_NOT_EXIST(PropertiesReader.getProperty(PropertyKeys.ARCHIVE_GIFT_NOT_EXIST)),
    CATEGORY_NOT_EXIST(PropertiesReader.getProperty(PropertyKeys.CATEGORY_NOT_EXIST)),
    CATEGORY_EXIST(PropertiesReader.getProperty(PropertyKeys.CATEGORY_EXIST)),
    GIFT_EXIST(PropertiesReader.getProperty(PropertyKeys.GIFT_EXIST)),
    SEMESTER_ALREADY_EXIST(PropertiesReader.getProperty(PropertyKeys.SEMESTER_ALREADY_EXIST)),
    AUCTION_NOT_EXISTS(PropertiesReader.getProperty(PropertyKeys.AUCTION_NOT_EXISTS));
    private String message;

    Message(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
