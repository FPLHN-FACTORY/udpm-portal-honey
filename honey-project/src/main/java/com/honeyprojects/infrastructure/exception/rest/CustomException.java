package com.honeyprojects.infrastructure.exception.rest;

import com.honeyprojects.infrastructure.contant.Message;

public class CustomException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    private String message;

    public CustomException() {
    }

    public CustomException(Message statusCode) {
        this.message = statusCode.getMessage();
    }

    public CustomException(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}


