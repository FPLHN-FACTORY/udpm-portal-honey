package com.honeyprojects.core.student.model.response.archive;

import org.springframework.beans.factory.annotation.Value;

public interface StudentArchiveByUserResponse {

    @Value("#{target.idStudent}")
    String getIdStudent();

    @Value("#{target.idGift}")
    String getIdGift();

    @Value("#{target.image}")
    String getImage();

    @Value("#{target.nameGift}")
    String getNameGift();

}
