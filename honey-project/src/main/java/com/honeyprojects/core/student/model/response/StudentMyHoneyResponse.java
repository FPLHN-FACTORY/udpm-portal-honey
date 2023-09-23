package com.honeyprojects.core.student.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface StudentMyHoneyResponse {

    @Value("#{target.name}")
    String getNameHoney();

    @Value("#{target.honey_point}")
    Integer getPoint();

}
