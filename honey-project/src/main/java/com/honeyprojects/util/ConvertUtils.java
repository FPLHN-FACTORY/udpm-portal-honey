package com.honeyprojects.util;


import java.text.SimpleDateFormat;
import java.util.Date;

public final class ConvertUtils {
    public static String removeVietnameseChars(String input) {
        // Loại bỏ ký tự tiếng Việt
        String output = input.replaceAll("[àáạảãâầấậẩẫăằắặẳẵ]", "a")
                .replaceAll("[èéẹẻẽêềếệểễ]", "e")
                .replaceAll("[ìíịỉĩ]", "i")
                .replaceAll("[òóọỏõôồốộổỗơờớợởỡ]", "o")
                .replaceAll("[ùúụủũưừứựửữ]", "u")
                .replaceAll("[ỳýỵỷỹ]", "y")
                .replaceAll("[đ]", "d")
                .replaceAll("[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]", "A")
                .replaceAll("[ÈÉẸẺẼÊỀẾỆỂỄ]", "E")
                .replaceAll("[ÌÍỊỈĨ]", "I")
                .replaceAll("[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]", "O")
                .replaceAll("[ÙÚỤỦŨƯỪỨỰỬỮ]", "U")
                .replaceAll("[ỲÝỴỶỸ]", "Y")
                .replaceAll("[Đ]", "D");

        return output;
    }

    public static String replaceSpacesWithUnderscores(String input) {
        return input.replaceAll("\\s+", "_");
    }

    public static String replaceSpecialCharacters(String input) {
        // Thay thế tất cả các ký tự không phải chữ cái hoặc số bằng dấu gạch dưới
        String output = input.replaceAll("[^a-zA-Z0-9]", "_");

        return output;
    }

    public static String convertDateNowToString() {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        Date currentDate = new Date();
        String formattedDate = simpleDateFormat.format(currentDate);
        return formattedDate;
    }

}
