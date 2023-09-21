package com.honeyprojects.core.teacher.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface TeacherConvertionHoneyResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.email}")
    String getEmail();

    @Value("#{target.honey_point}")
    Integer getHoneyPoint();

}
