package com.honeyprojects.core.teacher.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface TeacherFillCategoryResponse {

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.ratio}")
    Double getRatio();

}
