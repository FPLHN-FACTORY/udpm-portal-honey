package com.honeyprojects.core.student.model.response.archive;

import org.springframework.beans.factory.annotation.Value;

public interface StudentArchiveByUserResponse {

    @Value("#{target.stt}")
    String getStt();

    @Value("#{target.idStudent}")
    String getIdStudent();

    @Value("#{target.idGift}")
    String getIdGift();

    @Value("#{target.image}")
    byte[] getImage();

    @Value("#{target.nameGift}")
    String getNameGift();

    @Value("#{target.idCategory}")
    String getIdCategory();


}
