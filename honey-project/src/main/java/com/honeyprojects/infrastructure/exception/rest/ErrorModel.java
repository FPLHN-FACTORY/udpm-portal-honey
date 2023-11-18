package com.honeyprojects.infrastructure.exception.rest;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
public class ErrorModel {

    private String fieldError;

    private String message;

    @Override
    public String toString() {
        return "{\"name\": \""+fieldError+"\",\n" +
               "\"errors\": \""+message+"\"}";
    }
}

