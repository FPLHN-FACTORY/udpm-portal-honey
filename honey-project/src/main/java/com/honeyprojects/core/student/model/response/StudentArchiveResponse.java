package com.honeyprojects.core.student.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface StudentArchiveResponse extends IsIdentified {

    @Value("#{target.stt}")
    String getStt();

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.idGift}")
    String getIdGift();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.status}")
    String getStatus();

    @Value("#{target.to_date}")
    String getToDate();

    @Value("#{target.type}")
    String getType();

    @Value("#{target.from_date}")
    String getFromDate();

    @Value("#{target.image}")
    String getImage();

    @Value("#{target.quantity}")
    String getQuantity();

}
