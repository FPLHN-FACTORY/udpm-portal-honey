package com.portalprojects.util;

import lombok.Synchronized;
import org.springframework.stereotype.Component;

@Component
public class AutomaticCode {

    @Synchronized
    public String autumaticCode(String text, String nearestCode) {
        Integer count = 0;
        try {
            if (nearestCode != null) {
                String[] splitStr = nearestCode.split("_");
                count = Integer.valueOf(splitStr[1]) + 1;
            } else {
                count = 1;
            }
        } catch (Exception e) {
            return null;
        }
        String newCode = text + "_" + count;
        return newCode;
    }
}
