package com.honeyprojects.core.student.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface StudentArchiveResponse extends IsIdentified {
    @Value("#{target.code}")
    String getCode();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.status}")
    String getStatus();

    @Value("#{target.type}")
    String getType();

    @Value("#{target.to_date}")
    String getToDate();

    @Value("#{target.from_date}")
    String getFromDate();

    @Value("#{target.image}")
    String getImage();

}
