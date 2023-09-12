package com.honeyprojects.infrastructure.contant;

import com.honeyprojects.util.PropertiesReader;

public enum Message {

    SUCCESS("Success"),


// viết các lỗi ở đây


    CATEGORY_NOT_EXIST(PropertiesReader.getProperty(PropertyKeys.CATEGORY_NOT_EXIST));

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
